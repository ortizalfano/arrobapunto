"use server";

import { PDFDocument, rgb } from "pdf-lib";
import { briefSchema } from "@/lib/validations";

export async function createBriefPDF(answers: any) {
  try {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4

      // Header
      const font = await pdfDoc.embedFont("Helvetica-Bold");
      const fontRegular = await pdfDoc.embedFont("Helvetica");

      page.drawText("Brief Express", {
        x: 72,
        y: 750,
        size: 24,
        font,
        color: rgb(0.91, 0.86, 0.78), // accent color
      });

      page.drawText("arrobapunto.com", {
        x: 72,
        y: 710,
        size: 12,
        font: fontRegular,
        color: rgb(0.6, 0.65, 0.74), // muted
      });

      // Border
      page.drawRectangle({
        x: 72,
        y: 690,
        width: 451,
        height: 2,
        color: rgb(0.91, 0.86, 0.78),
      });

      // Content
      let yPos = 650;

      page.drawText("Proyecto", {
        x: 72,
        y: yPos,
        size: 14,
        font,
      });
      yPos -= 30;

      const fields = [
        { label: "Sector", value: answers.sector || "N/A" },
        { label: "Objetivo", value: answers.objective || "N/A" },
        { label: "Timeline", value: answers.timeline || "N/A" },
        { label: "Prioridad", value: answers.priority || "N/A" },
      ];

      for (const field of fields) {
        page.drawText(`${field.label}:`, {
          x: 80,
          y: yPos,
          size: 10,
          font,
        });

        // Wrap text si es largo
        const wrappedText = wrapText(field.value, 400);
        page.drawText(wrappedText, {
          x: 150,
          y: yPos,
          size: 10,
          font: fontRegular,
          color: rgb(0.4, 0.45, 0.55),
        });

        yPos -= 40;
      }

      yPos -= 20;

      page.drawText("Estimación Orientativa", {
        x: 72,
        y: yPos,
        size: 14,
        font,
      });

      yPos -= 30;
      page.drawText("Basada en las respuestas, el rango estimado es:", {
        x: 72,
        y: yPos,
        size: 11,
        font: fontRegular,
      });

      yPos -= 30;
      page.drawText("€2,500 - €8,500", {
        x: 72,
        y: yPos,
        size: 18,
        font,
        color: rgb(0.91, 0.86, 0.78),
      });

      // Footer
      page.drawText("Este es un documento confidencial", {
        x: 72,
        y: 72,
        size: 8,
        font: fontRegular,
        color: rgb(0.5, 0.5, 0.5),
      });

      const pdfBytes = await pdfDoc.save();
      return pdfBytes;
  } catch (error) {
    console.error("Error creating PDF:", error);
    throw new Error("Failed to create PDF");
  }
}

function wrapText(text: string, maxWidth: number): string {
  // Simple text wrapping
  if (text.length <= 60) return text;
  return text.substring(0, 60) + "...";
}







