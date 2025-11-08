"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type ImageFormat = "image/jpeg" | "image/webp";

type SelectedFile = {
  file: File;
  previewUrl: string;
};

type CompressedFile = {
  name: string;
  originalSize: number;
  compressedSize: number;
  blob: Blob;
  downloadUrl: string;
  mimeType: ImageFormat;
};

interface ImageCompressorModalProps {
  open: boolean;
  onClose: () => void;
}

const QUALITY_PRESETS = [
  {
    id: "high",
    quality: 75,
    label: "Alta (75%)",
    helper: "Mejor calidad · ahorro ligero (~30-40%)",
  },
  {
    id: "medium",
    quality: 55,
    label: "Media (55%)",
    helper: "Equilibrada · buen ahorro (~45-60%)",
  },
  {
    id: "low",
    quality: 35,
    label: "Baja (35%)",
    helper: "Agresiva · máximo ahorro (~65-75%)",
  },
] as const;

type QualityPresetId = (typeof QUALITY_PRESETS)[number]["id"] | "custom";

export function ImageCompressorModal({ open, onClose }: ImageCompressorModalProps) {
  const [preset, setPreset] = useState<QualityPresetId>("medium");
  const [quality, setQuality] = useState<number>(
    QUALITY_PRESETS.find((item) => item.id === "medium")?.quality ?? 55
  );
  const [format, setFormat] = useState<ImageFormat>("image/jpeg");
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const [compressedFiles, setCompressedFiles] = useState<CompressedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const copy = useMemo(
    () => ({
      title: "Compresor de imágenes",
      description: "Sube tus imágenes, ajusta la calidad y descarga versiones optimizadas en segundos.",
      selectLabel: "Selecciona imágenes",
      selectHelp: "Formatos soportados: PNG, JPG, JPEG, WEBP. Tamaño máximo por archivo: 20MB.",
      qualityLabel: "Calidad",
      qualityHint: "Recomendado: 50% - 70%",
      outputLabel: "Formato de salida",
      previewTitle: "Vista previa",
      emptyList: "Aún no subes archivos. Súbelos para comenzar.",
      resultsTitle: "Resultados",
      download: "Descargar",
      downloadAll: "Descargar todas",
      compress: "Comprimir imágenes",
      compressing: "Comprimiendo...",
      emptySelection: "Selecciona al menos una imagen para comprimir.",
      genericError: "Error al comprimir las imágenes",
      savingsLabel: "% de ahorro",
      noSavings: "Sin ahorro (se mantiene el original)",
      presetsTitle: "Presets rápidos",
      presetsCustom: "Personalizada",
      presetsCustomHint: "Ajusta el slider manualmente para afinar la calidad.",
      errors: {
        context: "No fue posible obtener el contexto del canvas",
        compress: "No fue posible comprimir la imagen",
        process: "No fue posible procesar el archivo",
      },
    }),
    []
  );

  const resetState = useCallback(() => {
    setSelectedFiles((prev) => {
      prev.forEach((entry) => URL.revokeObjectURL(entry.previewUrl));
      return [];
    });
    setCompressedFiles((prev) => {
      prev.forEach((entry) => URL.revokeObjectURL(entry.downloadUrl));
      return [];
    });
    setIsProcessing(false);
    setError(null);
    setPreset("medium");
    setQuality(QUALITY_PRESETS.find((item) => item.id === "medium")?.quality ?? 55);
    setFormat("image/jpeg");
  }, []);

  useEffect(() => {
    if (!open) {
      resetState();
    }
  }, [open, resetState]);

  const handleFileSelection = useCallback((filesList: FileList | null) => {
    if (!filesList) return;

    const entries: SelectedFile[] = [];
    for (const file of Array.from(filesList)) {
      if (!file.type.startsWith("image/")) continue;
      const previewUrl = URL.createObjectURL(file);
      entries.push({ file, previewUrl });
    }

    setSelectedFiles((prev) => {
      prev.forEach((entry) => URL.revokeObjectURL(entry.previewUrl));
      return entries;
    });
    setCompressedFiles((prev) => {
      prev.forEach((entry) => URL.revokeObjectURL(entry.downloadUrl));
      return [];
    });
    setError(null);
  }, []);

  const qualityValue = useMemo(() => quality / 100, [quality]);

  const compressImage = useCallback(
    (file: File): Promise<CompressedFile> =>
      new Promise((resolve, reject) => {
        const image = new Image();
        const objectUrl = URL.createObjectURL(file);
        image.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;

          const context = canvas.getContext("2d");
          if (!context) {
            reject(new Error(copy.errors.context));
            return;
          }

          context.drawImage(image, 0, 0);

          const attemptCompression = (currentQuality: number, attemptsLeft: number) => {
            canvas.toBlob(
              (blob) => {
                if (!blob) {
                  reject(new Error(copy.errors.compress));
                  return;
                }

                if (blob.size >= file.size && attemptsLeft > 0) {
                  const nextQuality = Math.max(0.05, currentQuality * 0.85);
                  attemptCompression(nextQuality, attemptsLeft - 1);
                  return;
                }

                const finalBlob = blob.size >= file.size ? file : blob;
                const downloadUrl = URL.createObjectURL(finalBlob);
                resolve({
                  name: file.name.replace(/\.[^.]+$/, format === "image/jpeg" ? ".jpg" : ".webp"),
                  originalSize: file.size,
                  compressedSize: finalBlob.size,
                  blob: finalBlob,
                  downloadUrl,
                  mimeType: format,
                });
                URL.revokeObjectURL(objectUrl);
              },
              format,
              currentQuality
            );
          };

          attemptCompression(qualityValue, 6);
        };

        image.onerror = () => {
          URL.revokeObjectURL(objectUrl);
          reject(new Error(copy.errors.process));
        };

        image.src = objectUrl;
      }),
    [copy.errors.compress, copy.errors.context, copy.errors.process, format, qualityValue]
  );

  const handleCompress = useCallback(async () => {
    if (!selectedFiles.length) {
      setError(copy.emptySelection);
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const results: CompressedFile[] = [];
      for (const entry of selectedFiles) {
        const compressed = await compressImage(entry.file);
        results.push(compressed);
      }

      setCompressedFiles((prev) => {
        prev.forEach((item) => URL.revokeObjectURL(item.downloadUrl));
        return results;
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : copy.genericError;
      setError(message);
    } finally {
      setIsProcessing(false);
    }
  }, [compressImage, copy.emptySelection, copy.genericError, selectedFiles]);

  const handleDownloadAll = useCallback(() => {
    compressedFiles.forEach((file) => {
      const link = document.createElement("a");
      link.href = file.downloadUrl;
      link.download = file.name;
      link.click();
    });
  }, [compressedFiles]);

  const computeSavings = useCallback(
    (original: number, compressed: number) => {
      if (!original) return "";
      if (compressed >= original) return copy.noSavings;
      const savings = ((1 - compressed / original) * 100).toFixed(1);
      return `${savings}${copy.savingsLabel}`;
    },
    [copy.noSavings, copy.savingsLabel]
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-center justify-center px-4 py-6">
      <div className="relative w-full max-w-4xl rounded-2xl border border-white/10 bg-[#0D1217] shadow-2xl overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-aurora-edge" />
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <div>
            <h2 className="text-2xl font-semibold text-white">{copy.title}</h2>
            <p className="text-sm text-white/60">{copy.description}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white/60 hover:text-white">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="px-6 py-5 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">{copy.selectLabel}</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(event) => handleFileSelection(event.target.files)}
                  className="block w-full rounded-lg border border-white/10 bg-[#0a0f13] px-4 py-3 text-sm text-white/80 focus:outline-none focus:ring-2 focus:ring-accent2/60"
                />
                <p className="text-xs text-white/50">{copy.selectHelp}</p>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium text-white/80">{copy.presetsTitle}</p>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                  {QUALITY_PRESETS.map((item) => {
                    const isActive = preset === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setPreset(item.id);
                          setQuality(item.quality);
                        }}
                        className={`rounded-xl border px-3 py-2 text-left transition ${
                          isActive
                            ? "border-accent bg-accent/10 text-white"
                            : "border-white/10 bg-[#101823] text-white/70 hover:border-accent/40 hover:text-white"
                        }`}
                      >
                        <span className="block text-sm font-semibold">{item.label}</span>
                        <span className="block text-xs text-white/60">{item.helper}</span>
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    onClick={() => setPreset("custom")}
                    className={`rounded-xl border px-3 py-2 text-left transition md:col-span-3 ${
                      preset === "custom"
                        ? "border-accent bg-accent/10 text-white"
                        : "border-white/10 bg-[#101823] text-white/70 hover:border-accent/40 hover:text-white"
                    }`}
                  >
                    <span className="block text-sm font-semibold">{copy.presetsCustom}</span>
                    <span className="block text-xs text-white/60">{copy.presetsCustomHint}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                <div className="sm:col-span-2 space-y-2">
                  <label className="flex items-center justify-between text-sm text-white/80">
                    <span>
                      {copy.qualityLabel} ({quality}%)
                    </span>
                    <span className="text-white/50">{copy.qualityHint}</span>
                  </label>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    value={quality}
                    onChange={(event) => {
                      setPreset("custom");
                      setQuality(Number(event.target.value));
                    }}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/80 mb-2">{copy.outputLabel}</label>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant={format === "image/jpeg" ? "gold" : "ghost"}
                      size="sm"
                      onClick={() => setFormat("image/jpeg")}
                    >
                      JPG
                    </Button>
                    <Button
                      type="button"
                      variant={format === "image/webp" ? "gold" : "ghost"}
                      size="sm"
                      onClick={() => setFormat("image/webp")}
                    >
                      WEBP
                    </Button>
                  </div>
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/30 rounded-lg px-4 py-2">
                  {error}
                </p>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <Button onClick={handleCompress} disabled={isProcessing} className="sm:w-auto w-full">
                  {isProcessing ? copy.compressing : copy.compress}
                </Button>
                {compressedFiles.length > 0 && (
                  <Button variant="ghost" onClick={handleDownloadAll} className="sm:w-auto w-full">
                    {copy.downloadAll}
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border border-white/10 bg-[#111820] p-4 space-y-3">
                <h3 className="text-sm font-medium text-white/80">{copy.previewTitle}</h3>
                {selectedFiles.length === 0 ? (
                  <p className="text-xs text-white/50">{copy.emptyList}</p>
                ) : (
                  <div className="space-y-3">
                    {selectedFiles.map((entry) => (
                      <div
                        key={entry.previewUrl}
                        className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-[#131c28] p-3"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white truncate">{entry.file.name}</p>
                          <p className="text-xs text-white/50">{formatBytes(entry.file.size)}</p>
                        </div>
                        <img
                          src={entry.previewUrl}
                          alt={entry.file.name}
                          className="h-14 w-14 rounded-lg object-cover border border-white/10 flex-shrink-0"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {compressedFiles.length > 0 && (
                <div className="space-y-3 rounded-xl border border-white/10 bg-[#111820] p-4">
                  <h3 className="text-sm font-medium text-white/80">{copy.resultsTitle}</h3>
                  <div className="space-y-3">
                    {compressedFiles.map((file) => (
                      <div
                        key={file.downloadUrl}
                        className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-lg border border-white/10 bg-[#131c28] p-3"
                      >
                        <div>
                          <p className="text-sm font-semibold text-white">{file.name}</p>
                          <p className="text-xs text-white/60">
                            {formatBytes(file.originalSize)} → {formatBytes(file.compressedSize)} (
                            {computeSavings(file.originalSize, file.compressedSize)})
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" asChild size="sm" className="border-white/20 text-white">
                            <a href={file.downloadUrl} download={file.name} target="_blank" rel="noreferrer">
                              {copy.download}
                            </a>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = parseFloat((bytes / Math.pow(k, i)).toFixed(2));
  return `${value} ${sizes[i]}`;
}

