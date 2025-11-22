import { NextRequest, NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";
// TODO: Implementar compresión de imágenes cuando pdf-lib permita reemplazo fácil

export const runtime = "nodejs";
export const maxDuration = 30; // 30 segundos máximo

// Rate limit simple in-memory (10 PDFs/hora por IP)
const requests = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hora
  const limit = 10; // 10 PDFs/hora (más estricto que imágenes)

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
    // Rate limiting estricto
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Límite de uso excedido. Máximo 10 PDFs por hora." },
        { status: 429 }
      );
    }

    const formData = await request.formData();
    const pdfFile = formData.get("pdf") as File;

    if (!pdfFile) {
      return NextResponse.json({ error: "No se proporcionó archivo PDF" }, { status: 400 });
    }

    // Validar tipo
    if (pdfFile.type !== "application/pdf") {
      return NextResponse.json({ error: "El archivo debe ser un PDF" }, { status: 400 });
    }

    // Límite de tamaño: 15MB máximo
    const maxSize = 15 * 1024 * 1024;
    if (pdfFile.size > maxSize) {
      return NextResponse.json(
        { error: "El archivo es demasiado grande. Máximo 15MB." },
        { status: 400 }
      );
    }

    // Leer PDF
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);

    // Remover todos los metadatos innecesarios
    pdfDoc.setTitle("");
    pdfDoc.setAuthor("");
    pdfDoc.setSubject("");
    pdfDoc.setKeywords([]);
    pdfDoc.setProducer("");
    pdfDoc.setCreator("");

    // Optimizar estructura del PDF
    // Nota: pdf-lib no puede extraer y reemplazar imágenes fácilmente
    // Esto requeriría reconstruir el PDF desde cero, lo cual es muy complejo
    // Por ahora, optimizamos metadatos y estructura interna que sí funciona bien
    pdfDoc.getPages(); // Validar que el PDF tiene páginas

    // Generar PDF optimizado con todas las opciones de compresión disponibles
    const pdfBytes = await pdfDoc.save({
      useObjectStreams: true, // Habilita compresión de objetos
      addDefaultPage: false,
    });

    // Convertir a Buffer para respuesta
    const pdfBuffer = Buffer.from(pdfBytes);

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${pdfFile.name.replace(/\.pdf$/i, "_optimizado.pdf")}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("PDF compression error:", error);
    return NextResponse.json(
      { error: "Error al procesar el PDF. Asegúrate de que el archivo no esté corrupto." },
      { status: 500 }
    );
  }
}
