import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/tools/internal-slider";
import { X, Shuffle, Copy, Check } from "lucide-react";

type GradientType = "linear" | "radial";

interface GradientStop {
  id: string;
  color: string;
  position: number; // 0 - 100
}

interface GlassSettings {
  blur: number;
  opacity: number;
  border: number;
}

interface GradientModalProps {
  open: boolean;
  onClose: () => void;
}

const defaultStops: GradientStop[] = [
  { id: "stop-1", color: "#6EE7B7", position: 0 },
  { id: "stop-2", color: "#3B82F6", position: 50 },
  { id: "stop-3", color: "#9333EA", position: 100 },
];

const presets: GradientStop[][] = [
  [
    { id: "stop-1", color: "#f97316", position: 0 },
    { id: "stop-2", color: "#facc15", position: 60 },
    { id: "stop-3", color: "#22d3ee", position: 100 },
  ],
  [
    { id: "stop-1", color: "#22c55e", position: 0 },
    { id: "stop-2", color: "#3b82f6", position: 40 },
    { id: "stop-3", color: "#a855f7", position: 75 },
    { id: "stop-4", color: "#f472b6", position: 100 },
  ],
  [
    { id: "stop-1", color: "#0ea5e9", position: 0 },
    { id: "stop-2", color: "#6366f1", position: 45 },
    { id: "stop-3", color: "#ec4899", position: 100 },
  ],
];

export function GradientModal({ open, onClose }: GradientModalProps) {
  const locale = useLocale();
  const isEnglish = locale === "en";
  const [gradientType, setGradientType] = useState<GradientType>("linear");
  const [angle, setAngle] = useState(120);
  const [stops, setStops] = useState<GradientStop[]>(defaultStops);
  const [glassEnabled, setGlassEnabled] = useState(true);
  const [glass, setGlass] = useState<GlassSettings>({ blur: 12, opacity: 0.25, border: 1 });
  const [copied, setCopied] = useState(false);

  const copy = useMemo(
    () => ({
      title: isEnglish ? "Gradient Generator" : "Generador de Gradients",
      description: isEnglish
        ? "Create modern gradients and glassmorphism effects with live preview."
        : "Crea gradientes modernos y efectos glassmorphism con vista previa en vivo.",
      typeLabel: isEnglish ? "Type" : "Tipo",
      typeOptions: {
        linear: isEnglish ? "Linear" : "Lineal",
        radial: isEnglish ? "Radial" : "Radial",
      },
      angleLabel: (value: number) => (isEnglish ? `Angle (${value}°)` : `Ángulo (${value}°)`),
      stopsLabel: isEnglish ? "Color stops" : "Color stops",
      addStop: isEnglish ? "Add stop" : "Añadir stop",
      positionLabel: (value: number) => (isEnglish ? `Position: ${value}%` : `Posición: ${value}%`),
      glassLabel: isEnglish ? "Glassmorphism" : "Glassmorphism",
      glassToggleActive: isEnglish ? "On" : "Activo",
      glassToggleInactive: isEnglish ? "Off" : "Inactivo",
      blurLabel: (value: number) => (isEnglish ? `Blur (${value}px)` : `Blur (${value}px)`),
      opacityLabel: (value: number) =>
        isEnglish ? `Opacity (${Math.round(value * 100)}%)` : `Opacidad (${Math.round(value * 100)}%)`,
      borderLabel: (value: number) => (isEnglish ? `Border (${value}px)` : `Borde (${value}px)`),
      randomPreset: isEnglish ? "Random preset" : "Preset aleatorio",
      preview: {
        glassTitle: isEnglish ? "Gradient preview" : "Vista del gradiente",
        glassDescription: isEnglish
          ? "Adjust the values to design cards with glassmorphism effect."
          : "Ajusta los valores para diseñar tarjetas con efecto glassmorphism.",
        plainTitle: isEnglish ? "Preview" : "Vista previa",
        plainDescription: isEnglish
          ? "The gradient applies to the full background."
          : "El gradiente se aplica al fondo completo.",
      },
      cssLabel: isEnglish ? "Generated CSS" : "CSS generado",
      copyLabel: isEnglish ? "Copy" : "Copiar",
      copiedLabel: isEnglish ? "Copied" : "Copiado",
    }),
    [isEnglish]
  );

  useEffect(() => {
    if (!open) {
      setGradientType("linear");
      setAngle(120);
      setStops(defaultStops);
      setGlassEnabled(true);
      setGlass({ blur: 12, opacity: 0.25, border: 1 });
      setCopied(false);
    }
  }, [open]);

  const gradientCss = useMemo(() => {
    const sortedStops = [...stops].sort((a, b) => a.position - b.position);
    const stopsString = sortedStops.map((stop) => `${stop.color} ${stop.position}%`).join(", ");

    if (gradientType === "linear") {
      return `linear-gradient(${angle}deg, ${stopsString})`;
    }
    return `radial-gradient(circle at center, ${stopsString})`;
  }, [angle, gradientType, stops]);

  const containerStyle = useMemo(() => {
    const base: React.CSSProperties = {
      backgroundImage: gradientCss,
      borderRadius: "16px",
      padding: "48px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "24px",
    };

    return base;
  }, [gradientCss]);

  const glassCardStyle = useMemo(() => {
    if (!glassEnabled) return undefined;
    return {
      backdropFilter: `blur(${glass.blur}px)`,
      background: `rgba(255, 255, 255, ${glass.opacity})`,
      border: `${glass.border}px solid rgba(255,255,255,0.2)`,
      borderRadius: "20px",
      padding: "32px",
      color: "rgba(13, 18, 23, 0.85)",
      minWidth: "240px",
      textAlign: "center" as const,
      boxShadow: "0 16px 40px -24px rgba(15, 23, 42, 0.6)",
    };
  }, [glass, glassEnabled]);

  const cssOutput = useMemo(() => {
    const base = `background: ${gradientCss};`;
    if (!glassEnabled) return base;
    return `${base}
backdrop-filter: blur(${glass.blur}px);
background: rgba(255, 255, 255, ${glass.opacity});
border: ${glass.border}px solid rgba(255,255,255,0.3);`;
  }, [glass, glassEnabled, gradientCss]);

  const handleRandom = useCallback(() => {
    const preset = presets[Math.floor(Math.random() * presets.length)];
    setStops(preset.map((stop, index) => ({ ...stop, id: `preset-${index}` })));
  }, []);

  const addStop = () => {
    if (stops.length >= 6) return;
    setStops((prev) => [...prev, { id: `stop-${Date.now()}`, color: "#ffffff", position: 50 }]);
  };

  const updateStop = (id: string, data: Partial<GradientStop>) => {
    setStops((prev) => prev.map((stop) => (stop.id === id ? { ...stop, ...data } : stop)));
  };

  const removeStop = (id: string) => {
    if (stops.length <= 2) return;
    setStops((prev) => prev.filter((stop) => stop.id !== id));
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(cssOutput)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        // ignore
      });
  };

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

        <div className="px-6 py-5 space-y-6 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-white/80">{copy.typeLabel}</Label>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={gradientType === "linear" ? "gold" : "outline"}
                    className="border-white/20 text-white"
                    onClick={() => setGradientType("linear")}
                  >
                    {copy.typeOptions.linear}
                  </Button>
                  <Button
                    size="sm"
                    variant={gradientType === "radial" ? "gold" : "outline"}
                    className="border-white/20 text-white"
                    onClick={() => setGradientType("radial")}
                  >
                    {copy.typeOptions.radial}
                  </Button>
                </div>
              </div>

              {gradientType === "linear" && (
                <div className="space-y-2">
                  <Label className="text-white/80">{copy.angleLabel(angle)}</Label>
                  <Slider value={[angle]} min={0} max={360} onValueChange={([value]) => setAngle(value)} />
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-white/80">{copy.stopsLabel}</Label>
                  <Button size="sm" variant="outline" className="border-white/20 text-white" onClick={addStop}>
                    {copy.addStop}
                  </Button>
                </div>
                <div className="space-y-3">
                  {stops.map((stop) => (
                    <div key={stop.id} className="rounded-xl border border-white/10 bg-[#111820] p-3 space-y-3">
                      <div className="flex items-center gap-3">
                        <Input
                          type="color"
                          value={stop.color}
                          onChange={(event) => updateStop(stop.id, { color: event.target.value })}
                          className="h-10 w-14 cursor-pointer border-white/20 bg-transparent"
                        />
                        <div className="flex-1">
                          <Label className="text-xs text-white/60">{copy.positionLabel(stop.position)}</Label>
                          <Slider
                            value={[stop.position]}
                            min={0}
                            max={100}
                            step={1}
                            onValueChange={([value]) => updateStop(stop.id, { position: value })}
                          />
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-white/40 hover:text-red-400"
                          onClick={() => removeStop(stop.id)}
                          disabled={stops.length <= 2}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-white/80">{copy.glassLabel}</Label>
                  <Button
                    size="sm"
                    variant={glassEnabled ? "gold" : "outline"}
                    className="border-white/20 text-white"
                    onClick={() => setGlassEnabled((prev) => !prev)}
                  >
                    {glassEnabled ? copy.glassToggleActive : copy.glassToggleInactive}
                  </Button>
                </div>

                {glassEnabled && (
                  <div className="space-y-3 rounded-xl border border-white/10 bg-[#111820] p-4">
                    <div>
                      <Label className="text-xs text-white/60">{copy.blurLabel(glass.blur)}</Label>
                      <Slider value={[glass.blur]} min={0} max={40} onValueChange={([value]) => setGlass((prev) => ({ ...prev, blur: value }))} />
                    </div>
                    <div>
                      <Label className="text-xs text-white/60">{copy.opacityLabel(glass.opacity)}</Label>
                      <Slider
                        value={[glass.opacity]}
                        min={0}
                        max={0.8}
                        step={0.05}
                        onValueChange={([value]) => setGlass((prev) => ({ ...prev, opacity: Number(value.toFixed(2)) }))}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-white/60">{copy.borderLabel(glass.border)}</Label>
                      <Slider
                        value={[glass.border]}
                        min={0}
                        max={4}
                        step={0.5}
                        onValueChange={([value]) => setGlass((prev) => ({ ...prev, border: Number(value.toFixed(1)) }))}
                      />
                    </div>
                  </div>
                )}

                <Button variant="outline" className="border-white/20 text-white" onClick={handleRandom}>
                  <Shuffle className="mr-2 h-4 w-4" /> {copy.randomPreset}
                </Button>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="rounded-2xl border border-white/10 bg-[#0a0f13] p-6">
                <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden rounded-xl" style={containerStyle}>
                  {glassEnabled ? (
                    <div style={glassCardStyle}>
                      <h3 className="text-lg font-semibold">{copy.preview.glassTitle}</h3>
                      <p className="mt-2 text-sm opacity-80">{copy.preview.glassDescription}</p>
                    </div>
                  ) : (
                    <div className="text-center text-white/80">
                      <h3 className="text-xl font-semibold">{copy.preview.plainTitle}</h3>
                      <p className="mt-2 text-sm">{copy.preview.plainDescription}</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-white/80">{copy.cssLabel}</Label>
                    <Button size="sm" variant="outline" className="border-white/20 text-white" onClick={handleCopy}>
                      {copied ? (
                        <span className="flex items-center gap-2">
                          <Check className="h-4 w-4" /> {copy.copiedLabel}
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Copy className="h-4 w-4" /> {copy.copyLabel}
                        </span>
                      )}
                    </Button>
                  </div>
                  <Textarea value={cssOutput} readOnly rows={8} className="bg-[#111820] border-white/10 text-sm text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

