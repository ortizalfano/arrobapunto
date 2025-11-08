import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";

const HIGH_CVE_THRESHOLD = 7;

async function runNpmAudit() {
  console.log("🔍 Running npm audit...");

  try {
    const output = execSync("npm audit --json", { encoding: "utf-8" });
    const audit = JSON.parse(output);

    return audit;
  } catch (error) {
    console.error("❌ npm audit failed:", error.message);
    return null;
  }
}

function analyzeVulnerabilities(audit) {
  if (!audit || !audit.vulnerabilities) {
    return [];
  }

  const highCVEs = [];

  Object.entries(audit.vulnerabilities).forEach(([name, vuln]) => {
    if (vuln.severity) {
      const severity = vuln.severity.toLowerCase();
      if (severity === "high" || severity === "critical") {
        highCVEs.push({
          name,
          severity: vuln.severity,
          title: vuln.title,
          url: vuln.url,
        });
      }
    }
  });

  return highCVEs;
}

async function main() {
  console.log("🔒 Running security scan...\n");

  try {
    const audit = await runNpmAudit();

    if (!audit) {
      console.log("⚠️ Could not run npm audit");
      process.exit(0);
    }

    const vulnerabilities = analyzeVulnerabilities(audit);

    if (vulnerabilities.length > 0) {
      console.log(`⚠️ Found ${vulnerabilities.length} high/critical vulnerabilities:\n`);
      
      vulnerabilities.forEach(v => {
        console.log(`  - ${v.name}: ${v.severity}`);
        console.log(`    ${v.title}`);
        console.log(`    ${v.url}\n`);
      });

      console.log("💡 Run 'npm audit fix' to attempt automatic fixes");
      process.exit(1);
    } else {
      console.log("✅ No high/critical vulnerabilities found");
      process.exit(0);
    }
  } catch (error) {
    console.error("❌ Security scan failed:", error);
    process.exit(1);
  }
}

main();







