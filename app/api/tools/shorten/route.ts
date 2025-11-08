import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { linkSchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rate-limit";
import { slugify } from "@/lib/utils";

// Lista de dominios bloqueados
const BLOCKED_DOMAINS = [
  "arrobapunto.com",
  "www.arrobapunto.com",
  "localhost",
  "127.0.0.1",
];

function validateSlug(slug: string): boolean {
  // Permitir solo letras minúsculas, números y guiones
  return /^[a-z0-9-]{3,40}$/.test(slug);
}

function normalizeURL(url: string): string {
  try {
    const urlObj = new URL(url);
    urlObj.protocol = "https:"; // Force HTTPS
    return urlObj.toString();
  } catch {
    return url;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Honeypot check
    if (body._website) {
      // Sleep to slow down bots
      await new Promise((resolve) => setTimeout(resolve, 250));
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const validated = linkSchema.parse(body);

    // Get IP address for rate limiting
    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Check rate limit
    const rateLimitCheck = await checkRateLimit(ipAddress);
    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        { error: "Rate limit exceeded", remaining: rateLimitCheck.remaining },
        { status: 429 }
      );
    }

    // Normalize URL
    const normalizedURL = normalizeURL(validated.url);

    // Block internal URLs to prevent redirect loops
    const urlObj = new URL(normalizedURL);
    if (BLOCKED_DOMAINS.includes(urlObj.hostname.toLowerCase())) {
      return NextResponse.json({ error: "Cannot shorten internal URLs" }, { status: 400 });
    }

    // Generate or validate slug
    let slug = validated.slug?.toLowerCase().trim() || slugify(normalizedURL.substring(0, 20));

    // Validate slug format
    if (!validateSlug(slug)) {
      return NextResponse.json({ error: "Invalid slug format" }, { status: 400 });
    }

    // Check if slug is unique
    const existing = await prisma.link.findUnique({
      where: { slug },
    });

    if (existing) {
      slug = `${slug}-${Date.now().toString(36).slice(-5)}`;
    }

    // Create the link
    const link = await prisma.link.create({
      data: {
        slug,
        url: normalizedURL,
        ipAddress,
        uaSample: request.headers.get("user-agent")?.substring(0, 100),
      },
    });

    return NextResponse.json({ slug: link.slug, url: link.url });
  } catch (error) {
    console.error("Error creating short URL:", error);
    return NextResponse.json({ error: "Failed to create short URL" }, { status: 500 });
  }
}

