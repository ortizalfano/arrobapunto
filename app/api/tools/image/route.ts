import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export const runtime = "nodejs";
export const maxDuration = 60;

// Rate limit simple in-memory (en producción usar Redis/KV)
const requests = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hora
  const limit = 60; // 60 req/hora

  const record = requests.get(ip);
  if (!record || now > record.resetTime) {
    requests.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    }

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    const targetFormat = (formData.get("format") as string) || "webp";
    const quality = parseInt((formData.get("quality") as string) || "80");

    if (files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    if (files.length > 10) {
      return NextResponse.json({ error: "Maximum 10 files per batch" }, { status: 400 });
    }

    const results = [];
    const processedImages: Buffer[] = [];
    const names: string[] = [];

    for (const file of files) {
      // Validar tamaño (25MB)
      if (file.size > 25 * 1024 * 1024) {
        continue; // Skipear archivo muy grande
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Procesar con Sharp
      let processed;
      if (targetFormat === "jpeg" || targetFormat === "jpg") {
        processed = await sharp(buffer).rotate().jpeg({ quality }).toBuffer();
      } else if (targetFormat === "png") {
        processed = await sharp(buffer).rotate().png({ quality }).toBuffer();
      } else {
        processed = await sharp(buffer).rotate().webp({ quality }).toBuffer();
      }

      const originalSize = file.size;
      const finalSize = processed.length;
      const reduction = ((originalSize - finalSize) / originalSize) * 100;

      results.push({
        originalName: file.name,
        format: targetFormat,
        originalSize,
        finalSize,
        reduction: Math.round(reduction * 10) / 10,
      });

      processedImages.push(processed);
      names.push(file.name.replace(/\.[^/.]+$/, "") + "." + targetFormat);
    }

    // Si hay múltiples archivos, crear ZIP
    if (processedImages.length > 1) {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();

      processedImages.forEach((image, index) => {
        zip.file(names[index], image);
      });

      const zipData = await zip.generateAsync({ type: "uint8array" });
      const zipArrayBuffer = zipData.buffer.slice(
        zipData.byteOffset,
        zipData.byteOffset + zipData.byteLength
      ) as ArrayBuffer;

      return new Response(zipArrayBuffer, {
        headers: {
          "Content-Type": "application/zip",
          "Content-Disposition": 'attachment; filename="images.zip"',
          "Cache-Control": "no-store",
        },
      });
    }

    // Si es un solo archivo, devolverlo directo
    const singleBuffer = processedImages[0];
    const singleArrayBuffer = singleBuffer.buffer.slice(
      singleBuffer.byteOffset,
      singleBuffer.byteOffset + singleBuffer.byteLength
    ) as ArrayBuffer;

    return new Response(singleArrayBuffer, {
      headers: {
        "Content-Type": `image/${targetFormat}`,
        "Content-Disposition": `attachment; filename="${names[0]}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Image processing error:", error);
    return NextResponse.json({ error: "Failed to process images" }, { status: 500 });
  }
}







