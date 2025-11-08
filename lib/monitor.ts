import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import { sendBriefEmail } from "./mailer";

interface LighthouseMetrics {
  performance: number;
  accessibility: number;
  "best-practices": number;
  seo: number;
  "cumulative-layout-shift": number;
  "first-contentful-paint": number;
  "speed-index": number;
  timestamp: string;
}

const THRESHOLD = 90;

async function runLighthouseAudit(url: string): Promise<LighthouseMetrics> {
  try {
    console.log(`🔍 Running Lighthouse audit for ${url}...`);
    
    const chromePath = process.env.CHROME_PATH || "google-chrome-stable";
    const output = execSync(
      `lighthouse ${url} --output=json --chrome-flags="--headless" --quiet`,
      { encoding: "utf-8" }
    );

    const report = JSON.parse(output);
    const categories = report.categories;
    const audits = report.audits;

    const metrics: LighthouseMetrics = {
      performance: Math.round(categories.performance.score * 100),
      accessibility: Math.round(categories.accessibility.score * 100),
      "best-practices": Math.round(categories["best-practices"].score * 100),
      seo: Math.round(categories.seo.score * 100),
      "cumulative-layout-shift": audits["cumulative-layout-shift"].numericValue,
      "first-contentful-paint": audits["first-contentful-paint"].numericValue,
      "speed-index": audits["speed-index"].numericValue,
      timestamp: new Date().toISOString(),
    };

    return metrics;
  } catch (error) {
    console.error("Error running Lighthouse:", error);
    throw error;
  }
}

function saveMetrics(metrics: LighthouseMetrics) {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const metricsPath = path.join(dataDir, "metrics.json");
  const existing = fs.existsSync(metricsPath) 
    ? JSON.parse(fs.readFileSync(metricsPath, "utf-8"))
    : [];

  existing.push(metrics);
  
  // Keep only last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const filtered = existing.filter((m: LighthouseMetrics) => {
    const metricDate = new Date(m.timestamp);
    return metricDate >= thirtyDaysAgo;
  });

  fs.writeFileSync(metricsPath, JSON.stringify(filtered, null, 2));
  console.log(`✅ Metrics saved to ${metricsPath}`);
}

async function checkThresholds(metrics: LighthouseMetrics): Promise<boolean> {
  const lowScores: string[] = [];

  if (metrics.performance < THRESHOLD) {
    lowScores.push(`Performance: ${metrics.performance}`);
  }
  if (metrics.accessibility < THRESHOLD) {
    lowScores.push(`Accessibility: ${metrics.accessibility}`);
  }
  if (metrics["best-practices"] < THRESHOLD) {
    lowScores.push(`Best Practices: ${metrics["best-practices"]}`);
  }
  if (metrics.seo < THRESHOLD) {
    lowScores.push(`SEO: ${metrics.seo}`);
  }

  if (lowScores.length > 0) {
    console.warn("⚠️ Some metrics below threshold:");
    lowScores.forEach(score => console.warn(`  - ${score}`));

    // Send notification
    const inbox = process.env.BRIEF_INBOX;
    if (inbox) {
      await sendBriefEmail({
        name: "System Alert",
        email: "monitor@arrobapunto.com",
        answers: {
          subject: "Lighthouse Metrics Alert",
          message: `The following metrics are below ${THRESHOLD}:\n${lowScores.join("\n")}`,
        },
        estimate: 0,
      }).catch(console.error);
    }

    return false;
  }

  return true;
}

export async function monitorPerformance() {
  const url = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  
  console.log("🚀 Starting performance monitoring...");
  console.log(`Target URL: ${url}\n`);

  try {
    const metrics = await runLighthouseAudit(url);
    saveMetrics(metrics);
    
    const passed = await checkThresholds(metrics);
    
    if (passed) {
      console.log("✅ All metrics above threshold");
      process.exit(0);
    } else {
      console.log("❌ Some metrics below threshold");
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ Monitoring failed:", error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  monitorPerformance();
}







