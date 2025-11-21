"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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

    if (file.size > 50 * 1024 * 1024) {
      setError("El archivo es demasiado grande. Máximo 50MB para procesamiento en el navegador.");
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

  const compressPdf = useCallback(async () => {
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
  }, [pdfFile]);

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

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-2xl rounded-3xl bg-[#0D1217] border border-accent2/20 shadow-2xl overflow-hidden mx-4 max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Compresor de PDFs"
          >
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-accent2/5 via-transparent to-accent/5" />

            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/70 transition hover:bg-white/20 hover:text-white"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative p-8 space-y-6">
              <header className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent2/10 mb-2">
                  <FileText className="h-6 w-6 text-accent2" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">Compresor de PDFs</h2>
                <p className="text-sm text-white/70 max-w-lg mx-auto">
                  Optimiza y reduce el tamaño de tus PDFs sin perder calidad. Procesado 100% en tu navegador.
                </p>
              </header>

              {/* Upload Area */}
              <div
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
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
                        className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent via-accent2 to-accent text-white rounded-lg hover:shadow-lg hover:shadow-accent2/30 transition-all font-medium"
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
                      Máximo 50MB • Se procesa en tu navegador (privacidad garantizada)
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
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <Card className="p-4 bg-white/5 border-white/10">
                          <p className="text-sm text-white/60 mb-1">Original</p>
                          <p className="text-lg font-semibold text-white">{formatFileSize(pdfFile.originalSize)}</p>
                        </Card>
                        <Card className="p-4 bg-accent2/10 border-accent2/20">
                          <p className="text-sm text-white/60 mb-1">Optimizado</p>
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
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                  {error}
                </div>
              )}

              {/* Info */}
              <div className="p-4 bg-white/5 border border-white/10 rounded-lg text-sm text-white/70">
                <p className="font-medium mb-2 text-white">ℹ️ ¿Qué hace esta herramienta?</p>
                <ul className="space-y-1 list-disc list-inside text-sm">
                  <li>Remueve metadatos innecesarios del PDF</li>
                  <li>Optimiza la estructura interna del documento</li>
                  <li>Comprime objetos internos para reducir el tamaño</li>
                  <li>Todo se procesa en tu navegador (100% privado)</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

