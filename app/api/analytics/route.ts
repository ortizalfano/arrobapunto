import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";

export async function POST(request: NextRequest) {
  try {
    const event = await request.json();
    
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const eventsPath = path.join(dataDir, "events.log");
    
    // Append event to log
    fs.appendFileSync(
      eventsPath,
      JSON.stringify(event) + "\n"
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error logging event:", error);
    return NextResponse.json({ error: "Failed to log event" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), "data");
    const eventsPath = path.join(dataDir, "events.log");

    if (!fs.existsSync(eventsPath)) {
      return NextResponse.json([]);
    }

    const fileContent = fs.readFileSync(eventsPath, "utf-8");
    const events = fileContent
      .split("\n")
      .filter(line => line.trim())
      .map(line => JSON.parse(line))
      .slice(-100); // Last 100 events

    return NextResponse.json(events);
  } catch (error) {
    console.error("Error reading events:", error);
    return NextResponse.json({ error: "Failed to read events" }, { status: 500 });
  }
}







