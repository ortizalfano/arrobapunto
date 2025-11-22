"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Download, X, Loader2, FileText } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { cn } from "@/lib/utils";

interface PdfCompressorModalProps {
  open: boolean;
  onClose: () => void;
}

interface PdfFile {
  file: File;
  originalSize: number;
  compressed?: Blob;
  compressedSize?: number;
  compressionRatio?: number;
  processingMode?: "client" | "server";
}

export function PdfCompressorModal({ open, onClose }: PdfCompressorModalProps) {
  const [pdfFile, setPdfFile] = useState<PdfFile | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      // Reset cuando se cierra el modal
      if (pdfFile?.compressed) {
        URL.revokeObjectURL(URL.createObjectURL(pdfFile.compressed));
      }
      setPdfFile(null);
      setError(null);
      setIsProcessing(false);
    }
  }, [open, pdfFile]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Por favor, selecciona un archivo PDF");
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setError("El archivo es demasiado grande. Máximo 15MB.");
      return;
    }

    setError(null);
    setPdfFile({
      file,
      originalSize: file.size,
    });
  }, []);

  const removeFile = useCallback(() => {
    if (pdfFile?.compressed) {
      URL.revokeObjectURL(URL.createObjectURL(pdfFile.compressed));
    }
    setPdfFile(null);
    setError(null);
  }, [pdfFile]);

  const formatFileSize = useCallback((bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  }, []);

  // Compresión client-side (para PDFs pequeños)
  const compressPdfClient = useCallback(async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);

    // Remover metadatos
    pdfDoc.setTitle("");
    pdfDoc.setAuthor("");
    pdfDoc.setSubject("");
    pdfDoc.setKeywords([]);
    pdfDoc.setProducer("");
    pdfDoc.setCreator("");

    const pdfBytes = await pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false,
    });

    return new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
  }, []);

  // Compresión server-side (para PDFs con imágenes)
  const compressPdfServer = useCallback(async (file: File): Promise<Blob> => {
    const formData = new FormData();
    formData.append("pdf", file);

    const response = await fetch("/api/tools/pdf/compress", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Error al comprimir PDF en el servidor");
    }

    return await response.blob();
  }, []);

  const compressPdf = useCallback(async () => {
    if (!pdfFile) return;

    setIsProcessing(true);
    setError(null);

    try {
      const fileSizeMB = pdfFile.originalSize / (1024 * 1024);
      let compressedBlob: Blob;
      let processingMode: "client" | "server";

      // Estrategia híbrida: client-side para <5MB, server para 5-15MB
      if (fileSizeMB < 5) {
        // Client-side: rápido y gratis
        processingMode = "client";
        compressedBlob = await compressPdfClient(pdfFile.file);
      } else {
        // Server-side: mejor compresión para PDFs con imágenes
        processingMode = "server";
        compressedBlob = await compressPdfServer(pdfFile.file);
      }

      const compressedSize = compressedBlob.size;
      const compressionRatio = ((pdfFile.originalSize - compressedSize) / pdfFile.originalSize) * 100;

      setPdfFile({
        ...pdfFile,
        compressed: compressedBlob,
        compressedSize,
        compressionRatio,
        processingMode,
      });
    } catch (err) {
      console.error("Error comprimiendo PDF:", err);
      const errorMessage = err instanceof Error ? err.message : "Error al procesar el PDF";
      setError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  }, [pdfFile, compressPdfClient, compressPdfServer]);

  const downloadCompressed = useCallback(() => {
    if (!pdfFile?.compressed) return;

    const url = URL.createObjectURL(pdfFile.compressed);
    const link = document.createElement("a");
    link.href = url;
    link.download = pdfFile.file.name.replace(/\.pdf$/i, "_optimizado.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [pdfFile]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-center justify-center px-4 py-6">
      <div className="relative w-full max-w-4xl rounded-2xl border border-white/10 bg-[#0D1217] shadow-2xl overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-aurora-edge" />
        
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <div>
            <h2 className="text-2xl font-semibold text-white">Compresor de PDFs</h2>
            <p className="text-sm text-white/60">
              Optimiza y reduce el tamaño de tus PDFs sin perder calidad. Procesado en tu navegador o servidor.
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white/60 hover:text-white">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="px-6 py-5 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Upload Area */}
          <div
            className={cn(
              "border-2 border-dashed rounded-xl p-8 text-center transition-colors",
              pdfFile
                ? "border-accent2/30 bg-accent2/5"
                : "border-white/20 hover:border-accent2/50 bg-white/5"
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
                    htmlFor="pdf-upload-modal"
                    className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent via-accent2 to-accent hover:shadow-lg hover:shadow-accent2/30 transition-all font-medium rounded-lg text-white"
                  >
                    <Upload className="h-5 w-5" />
                    Seleccionar PDF
                  </label>
                  <input
                    id="pdf-upload-modal"
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
                <p className="text-sm text-white/60">
                  Arrastra un PDF aquí o haz clic para seleccionar
                </p>
                <p className="text-xs text-white/50">
                  Máximo 15MB • PDFs pequeños se procesan en tu navegador (100% privado)
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-accent2" />
                    <div className="text-left">
                      <p className="font-medium text-white">{pdfFile.file.name}</p>
                      <p className="text-sm text-white/60">
                        Tamaño original: {formatFileSize(pdfFile.originalSize)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={removeFile}
                    className="text-white/60 hover:text-white hover:bg-white/10"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {pdfFile.compressed && (
                  <div className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-xl border border-white/10 bg-[#101823] p-4">
                        <p className="text-sm text-white/60 mb-1">Original</p>
                        <p className="text-lg font-semibold text-white">{formatFileSize(pdfFile.originalSize)}</p>
                      </div>
                      <div className="rounded-xl border border-accent2/20 bg-accent2/10 p-4">
                        <p className="text-sm text-white/60 mb-1">Optimizado</p>
                        <p className="text-lg font-semibold text-accent2">
                          {formatFileSize(pdfFile.compressedSize!)}
                        </p>
                        {pdfFile.compressionRatio && pdfFile.compressionRatio > 1 && (
                          <p className="text-xs text-accent2 mt-1">
                            -{Math.round(pdfFile.compressionRatio)}% de reducción
                          </p>
                        )}
                      </div>
                    </div>
                    {pdfFile.compressionRatio !== undefined && pdfFile.compressionRatio <= 1 && (
                      <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                        <p className="text-xs text-yellow-400 font-medium mb-1">ℹ️ Reducción mínima</p>
                        <p className="text-xs text-white/70">
                          Este PDF no se redujo significativamente. Los PDFs con muchas imágenes pueden requerir 
                          herramientas profesionales para mejor compresión.
                        </p>
                      </div>
                    )}
                    {pdfFile.processingMode === "server" && (
                      <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <p className="text-xs text-blue-400 font-medium mb-1">✓ Procesado en servidor</p>
                        <p className="text-xs text-white/70">
                          Este PDF fue optimizado en el servidor para mejor compresión de imágenes.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {!pdfFile.compressed && (
                  <Button
                    onClick={compressPdf}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-accent via-accent2 to-accent hover:shadow-lg hover:shadow-accent2/30 text-white"
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
                    className="w-full bg-gradient-to-r from-accent via-accent2 to-accent hover:shadow-lg hover:shadow-accent2/30 text-white"
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
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Info */}
          <div className="rounded-xl border border-white/10 bg-[#101823] p-4 space-y-2">
            <p className="text-sm font-medium text-white">ℹ️ ¿Cómo funciona?</p>
            <ul className="space-y-1 text-xs text-white/70 list-disc list-inside">
              <li>PDFs pequeños (&lt;5MB): se procesan en tu navegador (100% privado)</li>
              <li>PDFs medianos (5-15MB): se optimizan en el servidor con compresión avanzada de imágenes</li>
              <li>Remueve metadatos innecesarios y optimiza la estructura del documento</li>
              <li>Todo es gratuito y sin límites de uso</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
