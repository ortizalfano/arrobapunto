import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { briefSchema } from "@/lib/validations";
import { sendBriefEmail } from "@/lib/mailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = briefSchema.parse(body);

    // Calculate estimate (simple logic)
    let basePrice = 2000;
    const sectorMultipliers: Record<string, number> = {
      tech: 1.2,
      retail: 1.0,
      services: 0.9,
      nonprofit: 0.8,
      other: 1.0,
    };
    const priorityMultipliers: Record<string, number> = {
      brand: 1.5,
      web: 1.0,
      performance: 0.8,
    };
    const timelineMultipliers: Record<string, number> = {
      urgent: 1.5,
      "1-3months": 1.0,
      "3-6months": 0.9,
      flexible: 0.8,
    };

    basePrice *=
      (sectorMultipliers[validated.sector] || 1.0) *
      (priorityMultipliers[validated.priority] || 1.0) *
      (timelineMultipliers[validated.timeline] || 1.0);

    const estimate = Math.round(basePrice);

    // Save lead to database
    const lead = await prisma.lead.create({
      data: {
        name: validated.name,
        email: validated.email,
        phone: validated.phone || null,
        answers: JSON.stringify({
          sector: validated.sector,
          objective: validated.objective,
          timeline: validated.timeline,
          priority: validated.priority,
        }),
        projectType: validated.priority,
      },
    });

    // Send email notification (async, no block)
    sendBriefEmail({
      name: validated.name,
      email: validated.email,
      answers: {
        sector: validated.sector,
        objective: validated.objective,
        timeline: validated.timeline,
        priority: validated.priority,
      },
      estimate,
    }).catch(console.error);

    return NextResponse.json({ success: true, leadId: lead.id, estimate });
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json({ error: "Failed to create lead" }, { status: 500 });
  }
}

