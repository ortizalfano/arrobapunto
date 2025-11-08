import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, Check, X } from "lucide-react";
import prettier from "prettier/standalone";
import parserBabel from "prettier/plugins/babel";
import parserEstree from "prettier/plugins/estree";
import parserPostcss from "prettier/plugins/postcss";
import parserHtml from "prettier/plugins/html";

type FormatterLanguage = "auto" | "json" | "javascript" | "css";

interface FormatterModalProps {
  open: boolean;
  onClose: () => void;
}

export function FormatterModal({ open, onClose }: FormatterModalProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [useMinify, setUseMinify] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const copy = useMemo(
    () => ({
      title: "Formatter Express",
      description: "Limpia y minifica JSON, CSS o JavaScript en segundos usando Prettier.",
      languageLabel: "Lenguaje",
      modeLabel: "Modo",
      autoLabel: "Auto",
      autoDescription: "Detectamos el lenguaje automáticamente según el contenido.",
      minifyDescription: "La minificación elimina saltos de línea y espacios extra.",
      formatButton: "Formatear",
      minifyButton: "Minificar",
      actionButton: "Formatear",
      actionProcessing: "Procesando...",
      inputLabel: "Entrada",
      inputPlaceholder: "Pega tu código aquí...",
      outputLabel: "Resultado",
      copy: "Copiar",
      copied: "Copiado",
      errors: {
        empty: "Introduce un código antes de formatear",
        format: "No se pudo formatear el código",
        copy: "No se pudo copiar. Intenta manualmente.",
      },
    }),
    []
  );

  useEffect(() => {
    if (!open) {
      setInput("");
      setOutput("");
      setUseMinify(false);
      setIsProcessing(false);
      setError(null);
      setCopied(false);
    }
  }, [open]);

  const detectedLanguage = useMemo<FormatterLanguage>(() => {
    const trimmed = input.trim();
    if (!trimmed) return "javascript";

    if (trimmed.startsWith("{") || trimmed.startsWith("[") || trimmed.startsWith("\"")) {
      try {
        JSON.parse(trimmed);
        return "json";
      } catch {
        // fallthrough
      }
    }

    if (trimmed.includes("function") || trimmed.includes("=>") || trimmed.includes("const") || trimmed.includes("let")) {
      return "javascript";
    }

    if (trimmed.includes("{") && trimmed.includes(":") && trimmed.includes(";")) {
      return "css";
    }

    return "javascript";
  }, [input]);

  const formatCode = useCallback(async () => {
    if (!input.trim()) {
      setError(copy.errors.empty);
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      let parser: "json" | "babel" | "css" = "babel";

      if (detectedLanguage === "json") {
        parser = "json";
      } else if (detectedLanguage === "css") {
        parser = "css";
      }

      const formatted = await prettier.format(input, {
        parser,
        plugins: [parserBabel, parserEstree, parserPostcss, parserHtml],
        semi: !useMinify,
        singleQuote: true,
        printWidth: useMinify ? Infinity : 80,
        tabWidth: 2,
        trailingComma: useMinify ? "none" : "es5",
        bracketSpacing: !useMinify,
        useTabs: false,
      });

      setOutput(useMinify ? formatted.replace(/\n+/g, "") : formatted);
      setCopied(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : copy.errors.format;
      setError(message);
    } finally {
      setIsProcessing(false);
    }
  }, [copy.errors.empty, copy.errors.format, detectedLanguage, input, useMinify]);

  const handleCopy = useCallback(() => {
    if (!output) return;
    navigator.clipboard
      .writeText(output)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        setError(copy.errors.copy);
      });
  }, [copy.errors.copy, output]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-center justify-center px-4 py-6">
      <div className="relative w-full max-w-5xl rounded-2xl border border-white/10 bg-[#0D1217] shadow-2xl overflow-hidden">
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

        <div className="px-6 py-5 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-white/80">{copy.languageLabel}</Label>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/70 mt-2 ml-3">
                <span className="text-white/50">{copy.modeLabel}</span>
                <span className="inline-flex h-7 items-center rounded-full bg-white/10 px-3 font-medium text-white">
                  {copy.autoLabel}
                </span>
              </div>
              <p className="text-xs text-white/50">{copy.autoDescription}</p>
            </div>

            <div className="space-y-2">
              <Label className="text-white/80">{copy.modeLabel}</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant={!useMinify ? "gold" : "outline"}
                  className="border-white/20 text-white"
                  onClick={() => setUseMinify(false)}
                >
                  {copy.formatButton}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={useMinify ? "gold" : "outline"}
                  className="border-white/20 text-white"
                  onClick={() => setUseMinify(true)}
                >
                  {copy.minifyButton}
                </Button>
              </div>
              <p className="text-xs text-white/50">{copy.minifyDescription}</p>
            </div>

            <div className="flex items-end">
              <Button onClick={formatCode} disabled={isProcessing} className="w-full md:w-auto">
                {isProcessing ? copy.actionProcessing : copy.actionButton}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label className="text-white/80">{copy.inputLabel}</Label>
              <Textarea
                placeholder={copy.inputPlaceholder}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                rows={18}
                className="bg-[#0a0f13] border-white/10 text-white placeholder:text-white/30"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-white/80">{copy.outputLabel}</Label>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="border-white/20 text-white"
                  onClick={handleCopy}
                  disabled={!output}
                >
                  {copied ? (
                    <span className="flex items-center gap-2">
                      <Check className="h-4 w-4" /> {copy.copied}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Copy className="h-4 w-4" /> {copy.copy}
                    </span>
                  )}
                </Button>
              </div>
              <Textarea value={output} readOnly rows={18} className="bg-[#0a0f13] border-white/10 text-white" />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

