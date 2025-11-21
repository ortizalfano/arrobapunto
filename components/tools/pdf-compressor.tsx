"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Download, X, Loader2, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { PDFDocument } from "pdf-lib";

interface PdfFile {
  file: File;
  originalSize: number;
  compressed?: Blob;
  compressedSize?: number;
  compressionRatio?: number;
}

export function PdfCompressor() {
  const [pdfFile, setPdfFile] = useState<PdfFile | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Por favor, selecciona un archivo PDF");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setError("El archivo es demasiado grande. Máximo 50MB para procesamiento en el navegador.");
      return;
    }

    setError(null);
    setPdfFile({
      file,
      originalSize: file.size,
    });
  };

  const removeFile = () => {
    if (pdfFile?.compressed) {
      URL.revokeObjectURL(URL.createObjectURL(pdfFile.compressed));
    }
    setPdfFile(null);
    setError(null);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const compressPdf = async () => {
    if (!pdfFile) return;

    setIsProcessing(true);
    setError(null);

    try {
      // Leer el PDF original
      const arrayBuffer = await pdfFile.file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // Optimizar: remover metadatos innecesarios
      pdfDoc.setTitle("");
      pdfDoc.setAuthor("");
      pdfDoc.setSubject("");
      pdfDoc.setKeywords([]);
      pdfDoc.setProducer("");
      pdfDoc.setCreator("");

      // Optimizar imágenes dentro del PDF (si las hay)
      // Nota: pdf-lib no comprime imágenes directamente, pero podemos optimizar la estructura
      
      // Generar PDF optimizado
      const pdfBytes = await pdfDoc.save({
        useObjectStreams: true, // Habilita compresión de objetos
        addDefaultPage: false,
      });

      // Convertir Uint8Array a Blob (TypeScript-safe)
      const compressedBlob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      const compressedSize = compressedBlob.size;
      const compressionRatio = ((pdfFile.originalSize - compressedSize) / pdfFile.originalSize) * 100;

      setPdfFile({
        ...pdfFile,
        compressed: compressedBlob,
        compressedSize,
        compressionRatio,
      });
    } catch (err) {
      console.error("Error comprimiendo PDF:", err);
      setError("Error al procesar el PDF. Asegúrate de que el archivo no esté corrupto.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadCompressed = () => {
    if (!pdfFile?.compressed) return;

    const url = URL.createObjectURL(pdfFile.compressed);
    const link = document.createElement("a");
    link.href = url;
    link.download = pdfFile.file.name.replace(/\.pdf$/i, "_optimizado.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
          pdfFile
            ? "border-accent2/30 bg-accent2/5"
            : "border-muted-foreground/25 hover:border-accent2/50 bg-muted/30"
        )}
      >
        {!pdfFile ? (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="rounded-full bg-accent2/10 p-4">
                <FileText className="h-8 w-8 text-accent2" />
              </div>
            </div>
            <div>
              <label
                htmlFor="pdf-upload"
                className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-accent2 text-accent-ink rounded-lg hover:bg-accent2/90 transition-colors font-medium"
              >
                <Upload className="h-5 w-5" />
                Seleccionar PDF
              </label>
              <input
                id="pdf-upload"
                type="file"
                accept="application/pdf"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Arrastra un PDF aquí o haz clic para seleccionar
            </p>
            <p className="text-xs text-muted-foreground">
              Máximo 50MB • Se procesa en tu navegador (privacidad garantizada)
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-accent2" />
                <div className="text-left">
                  <p className="font-medium">{pdfFile.file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Tamaño original: {formatFileSize(pdfFile.originalSize)}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={removeFile}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {pdfFile.compressed && (
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Card className="p-4 bg-muted/30">
                  <p className="text-sm text-muted-foreground mb-1">Original</p>
                  <p className="text-lg font-semibold">{formatFileSize(pdfFile.originalSize)}</p>
                </Card>
                <Card className="p-4 bg-accent2/10 border-accent2/20">
                  <p className="text-sm text-muted-foreground mb-1">Optimizado</p>
                  <p className="text-lg font-semibold text-accent2">
                    {formatFileSize(pdfFile.compressedSize!)}
                  </p>
                  {pdfFile.compressionRatio && pdfFile.compressionRatio > 0 && (
                    <p className="text-xs text-accent2 mt-1">
                      -{Math.round(pdfFile.compressionRatio)}% de reducción
                    </p>
                  )}
                </Card>
              </div>
            )}

            {!pdfFile.compressed && (
              <Button
                onClick={compressPdf}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-accent via-accent2 to-accent hover:shadow-lg hover:shadow-accent2/30"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Optimizando PDF...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Optimizar PDF
                  </>
                )}
              </Button>
            )}

            {pdfFile.compressed && (
              <Button
                onClick={downloadCompressed}
                className="w-full bg-gradient-to-r from-accent via-accent2 to-accent hover:shadow-lg hover:shadow-accent2/30"
              >
                <Download className="mr-2 h-4 w-4" />
                Descargar PDF Optimizado
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
          {error}
        </div>
      )}

      {/* Info */}
      <div className="p-4 bg-muted/30 rounded-lg text-sm text-muted-foreground">
        <p className="font-medium mb-2">ℹ️ ¿Qué hace esta herramienta?</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>Remueve metadatos innecesarios del PDF</li>
          <li>Optimiza la estructura interna del documento</li>
          <li>Comprime objetos internos para reducir el tamaño</li>
          <li>Todo se procesa en tu navegador (100% privado)</li>
        </ul>
        <p className="mt-2 text-xs">
          Nota: La compresión de imágenes dentro del PDF es limitada en el navegador. Para archivos
          con muchas imágenes, considera usar herramientas profesionales.
        </p>
      </div>
    </div>
  );
}

