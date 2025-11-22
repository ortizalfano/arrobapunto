"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImageIcon, Sparkles, QrCode, Zap, Code, AlignJustify } from "lucide-react";
import { ImageCompressorModal } from "@/components/tools/image-compressor-modal";
import { FormatterModal } from "@/components/tools/formatter-modal";
import { GradientModal } from "@/components/tools/gradient-modal";
import { QRGeneratorModal } from "@/components/tools/qr-generator-modal";

const baseTools = [
  {
    icon: ImageIcon,
    title: "Compresor de Imágenes",
    description: "Optimiza y convierte tus imágenes en segundos. Reduce peso sin perder calidad.",
    features: ["JPG, PNG, WEBP", "Batch processing", "ZIP download", "100% gratuito"],
    href: "/tools/image",
    gradient: "from-purple-500/20 to-pink-500/20",
    image: "/img/tools/image-compressor.svg",
    action: "compressor" as const,
  },
  {
    icon: AlignJustify,
    title: "Formatter Express",
    description: "Formatea y minifica JSON, CSS o JS usando Prettier en segundos.",
    features: ["JSON, CSS, JS", "Modo minify", "Detección automática", "Copiar resultado"],
    href: "/tools/format",
    gradient: "from-indigo-500/20 to-purple-500/20",
    image: "/img/tools/formatter.svg",
    action: "formatter" as const,
  },
  {
    icon: Zap,
    title: "Generador de Gradients",
    description: "Diseña gradientes y glassmorphism con previsualización y código listo.",
    features: ["Lineales y radiales", "Glassmorphism", "Copiar CSS", "Random presets"],
    href: "/tools/gradients",
    gradient: "from-purple-500/20 via-pink-500/20 to-blue-500/20",
    image: "/img/tools/gradient-generator.svg",
    action: "gradient" as const,
  },
  {
    icon: QrCode,
    title: "Generador de Códigos QR",
    description: "Crea códigos QR personalizados para URLs, texto o cualquier contenido. Descarga en PNG o SVG.",
    features: ["PNG y SVG", "Múltiples tamaños", "Descarga instantánea", "100% gratuito"],
    href: "/tools/qr",
    gradient: "from-emerald-500/20 to-teal-500/20",
    image: "/img/tools/qr-generator.svg",
    action: "qr" as const,
  },
  {
    icon: Code,
    title: "Optimizador SVG (Próximamente)",
    description: "Optimiza archivos SVG removiendo código innecesario y reduciendo tamaño.",
    features: ["Minificación", "Auto-cleanup", "Compresión", "Próximamente"],
    href: "/tools/svg",
    gradient: "from-amber-500/20 to-orange-500/20",
    emoji: "⚡",
    image: undefined,
    comingSoon: true,
  },
];

export function ToolsLanding() {
  const [isCompressorOpen, setIsCompressorOpen] = useState(false);
  const [isFormatterOpen, setIsFormatterOpen] = useState(false);
  const [isGradientOpen, setIsGradientOpen] = useState(false);
  const [isQROpen, setIsQROpen] = useState(false);

  const heroBadge = "Herramientas gratuitas";
  const heroTitlePrimary = "Hub para";
  const heroTitleAccent = "creadores";
  const heroSubtitle = "Herramientas profesionales gratis para diseñadores y desarrolladores. Úsalas sin límites.";
  const infoTitle = "100% gratuito y sin registros";
  const infoDescription = "Todas estas herramientas son completamente gratuitas. No guardamos tus datos personales.";

  return (
    <div className="min-h-screen">
      <section className="relative py-8 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent2/5 via-transparent to-accent/5" />
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent2/10 border border-accent2/20 mb-4">
                <Sparkles className="h-4 w-4 text-accent2" />
                <span className="text-sm text-accent2">{heroBadge}</span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
              <span className="bg-gradient-to-r from-content via-accent2 to-content bg-clip-text text-transparent">
                {heroTitlePrimary}{" "}
              </span>
              <span className="bg-gradient-to-r from-accent via-accent2 to-accent bg-clip-text text-transparent">
                {heroTitleAccent}
              </span>
            </h1>
            <p className="text-xl text-muted max-w-2xl mx-auto leading-relaxed">{heroSubtitle}</p>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 bg-[#0D1217]">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {baseTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <div key={tool.title}>
                  <Card
                    className={`h-full group border-accent/10 bg-gradient-to-br from-bg-elev-1 to-bg-elev-2 relative overflow-hidden ${
                      tool.comingSoon ? "opacity-60" : ""
                    }`}
                  >
                    {tool.comingSoon && (
                      <div className="absolute top-4 right-4 z-10">
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-accent2/20 text-accent2 border border-accent2/30">
                          Próximamente
                        </span>
                      </div>
                    )}
                    <div className="absolute top-0 left-0 right-0 h-px bg-aurora-edge opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className={`aspect-video bg-gradient-to-br ${tool.gradient} flex items-center justify-center overflow-hidden relative`}>
                      {tool.image ? (
                        <Image
                          src={tool.image}
                          alt={tool.title}
                          fill
                          className="object-cover opacity-80"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <span className="text-8xl">{tool.emoji}</span>
                      )}
                    </div>

                    <CardHeader>
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center`}>
                          <Icon className="h-6 w-6 text-accent2" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-2xl mb-2 group-hover:text-accent2 transition-colors">
                            {tool.title}
                          </CardTitle>
                          <CardDescription className="text-base leading-relaxed">
                            {tool.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        {tool.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-muted">
                            <Zap className="h-4 w-4 text-accent2 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                      <div>
                        {tool.action === "compressor" && !tool.comingSoon ? (
                          <Button variant="gold" className="w-full" onClick={() => setIsCompressorOpen(true)}>
                            Abrir compresor
                          </Button>
                        ) : tool.action === "formatter" && !tool.comingSoon ? (
                          <Button variant="gold" className="w-full" onClick={() => setIsFormatterOpen(true)}>
                            Abrir formatter
                          </Button>
                        ) : tool.action === "gradient" && !tool.comingSoon ? (
                          <Button variant="gold" className="w-full" onClick={() => setIsGradientOpen(true)}>
                            Abrir generador
                          </Button>
                        ) : tool.action === "qr" && !tool.comingSoon ? (
                          <Button variant="gold" className="w-full" onClick={() => setIsQROpen(true)}>
                            Generar QR
                          </Button>
                        ) : (
                          <Button
                            asChild
                            variant={tool.comingSoon ? "ghost" : "gold"}
                            disabled={tool.comingSoon}
                            className="w-full"
                          >
                            <Link href={tool.href}>{tool.comingSoon ? "Próximamente" : "Usar herramienta"}</Link>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>

          <div className="mt-12">
            <Card className="max-w-3xl mx-auto border-accent/20 bg-gradient-to-br from-bg-elev-1 to-bg-elev-2 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-aurora-edge" />
              <CardHeader>
                <CardTitle className="text-xl bg-gradient-to-r from-content to-accent2 bg-clip-text text-transparent">
                  {infoTitle}
                </CardTitle>
                <CardDescription className="text-base">{infoDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-lg bg-bg-elev-2 border border/50">
                    <p className="text-3xl font-bold text-accent2 mb-1">100%</p>
                    <p className="text-xs text-muted">Gratis</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-bg-elev-2 border border/50">
                    <p className="text-3xl font-bold text-accent2 mb-1">0</p>
                    <p className="text-xs text-muted">Registros</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-bg-elev-2 border border/50">
                    <p className="text-3xl font-bold text-accent2 mb-1">∞</p>
                    <p className="text-xs text-muted">Sin límites</p>
                  </div>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <ImageCompressorModal open={isCompressorOpen} onClose={() => setIsCompressorOpen(false)} />
      <FormatterModal open={isFormatterOpen} onClose={() => setIsFormatterOpen(false)} />
      <GradientModal open={isGradientOpen} onClose={() => setIsGradientOpen(false)} />
      <QRGeneratorModal open={isQROpen} onClose={() => setIsQROpen(false)} />
    </div>
  );
}


