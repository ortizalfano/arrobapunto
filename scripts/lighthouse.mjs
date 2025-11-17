import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import * as fs from "fs";

const THRESHOLDS = {
  performance: 95,
  accessibility: 95,
  "best-practices": 95,
  seo: 95,
  "cumulative-layout-shift": 0.05,
  "first-contentful-paint": 1800,
  "speed-index": 3000,
  "total-blocking-time": 200,
};

const URL = process.env.LH_URL || "http://localhost:3000";

async function runLighthouse() {
  console.log("🔍 Starting Lighthouse audit...\n");
  console.log(`📡 URL: ${URL}\n`);

  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
  const options = {
    logLevel: "info",
    output: "json",
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    port: chrome.port,
  };

  try {
    const result = await lighthouse(URL, options);
    const runnerResult = result.lhr;

    // Extract scores
    const categories = runnerResult.categories;
    const audits = runnerResult.audits;

    console.log("📊 Results:\n");
    console.log("Categories:");
    Object.keys(categories).forEach((key) => {
      const score = Math.round(categories[key].score * 100);
      const threshold = THRESHOLDS[key];
      const status = score >= threshold ? "✅" : "❌";
      console.log(`  ${status} ${categories[key].title}: ${score} (threshold: ${threshold})`);
    });

    console.log("\nMetrics:");
    const metrics = [
      "cumulative-layout-shift",
      "first-contentful-paint",
      "speed-index",
      "total-blocking-time",
    ];

    metrics.forEach((metric) => {
      const audit = audits[metric];
      if (audit) {
        const value = audit.numericValue;
        const unit = audit.numericUnit;
        const threshold = THRESHOLDS[metric] * (unit === "s" ? 1000 : 1);
        const status = value <= threshold ? "✅" : "❌";
        console.log(`  ${status} ${audit.title}: ${value}${unit} (threshold: ${threshold}${unit})`);
      }
    });

    // Check if all thresholds are met
    let allPassed = true;

    Object.keys(categories).forEach((key) => {
      const score = Math.round(categories[key].score * 100);
      if (score < THRESHOLDS[key]) {
        allPassed = false;
      }
    });

    metrics.forEach((metric) => {
      const audit = audits[metric];
      if (audit && audit.numericValue) {
        const threshold = THRESHOLDS[metric] * (audit.numericUnit === "s" ? 1000 : 1);
        if (audit.numericValue > threshold) {
          allPassed = false;
        }
      }
    });

    // Save report
    const reportDir = "./reports";
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir);
    }

    const reportPath = `${reportDir}/lighthouse-${Date.now()}.json`;
    fs.writeFileSync(reportPath, JSON.stringify(runnerResult, null, 2));
    console.log(`\n📄 Report saved to ${reportPath}`);

    if (!allPassed) {
      console.log("\n❌ Some thresholds were not met");
      process.exit(1);
    } else {
      console.log("\n✅ All thresholds passed!");
      process.exit(0);
    }
  } catch (error) {
    console.error("Error running Lighthouse:", error);
    process.exit(1);
  } finally {
    await chrome.kill();
  }
}

runLighthouse();










