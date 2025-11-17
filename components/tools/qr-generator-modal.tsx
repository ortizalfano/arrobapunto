"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Download, Copy, Check, QrCode } from "lucide-react";
import QRCode from "qrcode";

interface QRGeneratorModalProps {
  open: boolean;
  onClose: () => void;
}

type QRFormat = "png" | "svg";
type QRSize = "small" | "medium" | "large";

const sizeOptions = {
  small: { size: 200, margin: 1 },
  medium: { size: 300, margin: 1 },
  large: { size: 400, margin: 1 },
};

export function QRGeneratorModal({ open, onClose }: QRGeneratorModalProps) {
  const [input, setInput] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [format, setFormat] = useState<QRFormat>("png");
  const [size, setSize] = useState<QRSize>("medium");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const copy = useMemo(
    () => ({
      title: "Generador de Códigos QR",
      description: "Crea códigos QR personalizados para URLs, texto o cualquier contenido. Descarga en PNG o SVG.",
      inputLabel: "Contenido",
      inputPlaceholder: "https://ejemplo.com o cualquier texto...",
      formatLabel: "Formato",
      sizeLabel: "Tamaño",
      previewLabel: "Vista previa",
      generateButton: "Generar QR",
      generatingButton: "Generando...",
      downloadButton: "Descargar",
      copyButton: "Copiar imagen",
      copiedButton: "Copiado",
      errors: {
        empty: "Introduce un texto o URL para generar el QR",
        invalid: "Error al generar el código QR. Intenta de nuevo.",
        copy: "No se pudo copiar. Intenta descargar la imagen.",
      },
    }),
    []
  );

  useEffect(() => {
    if (!open) {
      setInput("");
      setQrDataUrl("");
      setFormat("png");
      setSize("medium");
      setError(null);
      setCopied(false);
      setIsGenerating(false);
    }
  }, [open]);

  const generateQR = async () => {
    if (!input.trim()) {
      setError(copy.errors.empty);
      return;
    }

    setIsGenerating(true);
    setError(null);
    setCopied(false);

    try {
      const options = {
        width: sizeOptions[size].size,
        margin: sizeOptions[size].margin,
        color: {
          dark: "#E6EAF0", // text-content color
          light: "#0B0F14", // bg color (inverted for QR)
        },
        errorCorrectionLevel: "M" as const,
      };

      let dataUrl: string;

      if (format === "svg") {
        dataUrl = await QRCode.toString(input.trim(), {
          ...options,
          type: "svg",
        });
      } else {
        dataUrl = await QRCode.toDataURL(input.trim(), options);
      }

      setQrDataUrl(dataUrl);
    } catch (err) {
      console.error("Error generating QR:", err);
      setError(copy.errors.invalid);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQR = () => {
    if (!qrDataUrl) return;

    try {
      if (format === "svg") {
        const blob = new Blob([qrDataUrl], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `qr-code-${Date.now()}.svg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else {
        const link = document.createElement("a");
        link.href = qrDataUrl;
        link.download = `qr-code-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      console.error("Error downloading QR:", err);
      setError(copy.errors.copy);
    }
  };

  const copyQR = async () => {
    if (!qrDataUrl || format === "svg") {
      setError("Solo se puede copiar imágenes PNG. Usa el formato PNG para copiar.");
      return;
    }

    try {
      const response = await fetch(qrDataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error copying QR:", err);
      setError(copy.errors.copy);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-center justify-center px-4 py-6">
      <div className="bg-bg-elev-1 border border-white/10 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
              <QrCode className="h-5 w-5 text-accent2" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-content">{copy.title}</h2>
              <p className="text-sm text-muted">{copy.description}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white/60 hover:text-white">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="qr-input" className="text-content mb-2 block">
                {copy.inputLabel}
              </Label>
              <Textarea
                id="qr-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={copy.inputPlaceholder}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40 min-h-[100px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    generateQR();
                  }
                }}
              />
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-content mb-2 block">{copy.formatLabel}</Label>
                <div className="flex gap-2">
                  <Button
                    variant={format === "png" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFormat("png")}
                    className="flex-1"
                  >
                    PNG
                  </Button>
                  <Button
                    variant={format === "svg" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFormat("svg")}
                    className="flex-1"
                  >
                    SVG
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-content mb-2 block">{copy.sizeLabel}</Label>
                <div className="flex gap-2">
                  <Button
                    variant={size === "small" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSize("small")}
                    className="flex-1"
                  >
                    Pequeño
                  </Button>
                  <Button
                    variant={size === "medium" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSize("medium")}
                    className="flex-1"
                  >
                    Mediano
                  </Button>
                  <Button
                    variant={size === "large" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSize("large")}
                    className="flex-1"
                  >
                    Grande
                  </Button>
                </div>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <Button
              onClick={generateQR}
              disabled={isGenerating || !input.trim()}
              className="w-full"
              variant="gold"
            >
              {isGenerating ? copy.generatingButton : copy.generateButton}
            </Button>
          </div>

          {/* Preview Section */}
          {qrDataUrl && (
            <div className="space-y-4">
              <Label className="text-content">{copy.previewLabel}</Label>
              <div className="flex flex-col items-center gap-4 p-6 rounded-lg bg-white/5 border border-white/10">
                {format === "svg" ? (
                  <div
                    className="bg-white p-4 rounded-lg"
                    dangerouslySetInnerHTML={{ __html: qrDataUrl }}
                  />
                ) : (
                  <img
                    src={qrDataUrl}
                    alt="Código QR generado"
                    className="max-w-full h-auto rounded-lg"
                  />
                )}
                <div className="flex gap-3 w-full sm:w-auto">
                  <Button
                    onClick={downloadQR}
                    variant="default"
                    className="flex-1 sm:flex-initial"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {copy.downloadButton}
                  </Button>
                  {format === "png" && (
                    <Button
                      onClick={copyQR}
                      variant="outline"
                      className="flex-1 sm:flex-initial"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          {copy.copiedButton}
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          {copy.copyButton}
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

