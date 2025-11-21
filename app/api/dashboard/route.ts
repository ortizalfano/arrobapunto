import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";

const DASHBOARD_KEY = process.env.DASHBOARD_KEY || "changeme";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (key !== DASHBOARD_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const dataDir = path.join(process.cwd(), "data");

    // Read metrics
    let metrics = null;
    const metricsPath = path.join(dataDir, "metrics.json");
    if (fs.existsSync(metricsPath)) {
      const metricsArray = JSON.parse(fs.readFileSync(metricsPath, "utf-8"));
      metrics = metricsArray[metricsArray.length - 1] || null;
    }

    // Read last 100 events
    let events = [];
    const eventsPath = path.join(dataDir, "events.log");
    if (fs.existsSync(eventsPath)) {
      const fileContent = fs.readFileSync(eventsPath, "utf-8");
      events = fileContent
        .split("\n")
        .filter(line => line.trim())
        .map(line => JSON.parse(line))
        .slice(-10); // Last 10 events
    }

    // Check if backups exist
    const backupsDir = path.join(process.cwd(), "backups");
    let latestBackup = null;
    if (fs.existsSync(backupsDir)) {
      const files = fs.readdirSync(backupsDir);
      const backupFiles = files.filter(f => f.startsWith("db-"));
      if (backupFiles.length > 0) {
        latestBackup = backupFiles.sort().reverse()[0];
      }
    }

    return NextResponse.json({
      metrics,
      events,
      latestBackup,
    });
  } catch (error) {
    console.error("Error reading dashboard data:", error);
    return NextResponse.json({ error: "Failed to read data" }, { status: 500 });
  }
}















