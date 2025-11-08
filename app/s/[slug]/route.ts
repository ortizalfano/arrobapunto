import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const link = await prisma.link.findUnique({
      where: { slug },
    });

    if (!link) {
      return NextResponse.redirect("/es");
    }

    // Get user agent para estadísticas
    const userAgent = request.headers.get("user-agent") || "";
    const uaSample = userAgent.substring(0, 100);

    // Increment clicks and update lastHitAt
    await prisma.link.update({
      where: { slug },
      data: {
        clicks: { increment: 1 },
        lastHitAt: new Date(),
        uaSample,
      },
    });

    // Redirect with 301 (permanent redirect)
    return NextResponse.redirect(link.url, { status: 301 });
  } catch (error) {
    console.error("Error redirecting:", error);
    return NextResponse.redirect("/es");
  }
}







