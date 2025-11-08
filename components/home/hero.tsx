
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { fadeUp, stagger } from "@/lib/motion";
import { HeroStats } from "./hero-stats";
import { useEffect, useState } from "react";
import { useContactModal } from "@/components/contact/contact-modal-provider";

export function Hero() {
  const locale = "es";
  const typedText = "Webs inteligentes impulsadas por IA.";
  const fullText = typedText;
  const { open } = useContactModal();

  const [displayedText, setDisplayedText] = useState(fullText);
  const subheading = "Diseño, velocidad y SEO en un solo equipo.";
  const primaryCta = "Calcular proyecto";
  const secondaryCta = "Contactar";

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setDisplayedText(fullText);
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let currentIndex = 0;

    const type = () => {
      timeoutId = setTimeout(() => {
        currentIndex += 1;
        setDisplayedText(fullText.slice(0, currentIndex));
        if (currentIndex < fullText.length) {
          type();
        }
      }, 85);
    };

    setDisplayedText("");
    type();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [fullText]);

  return (
    <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-4 py-12">
      <div className="absolute inset-0 -z-10 bg-noir-mist" />

      <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent2/20 rounded-full blur-3xl pointer-events-none z-[2]" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl pointer-events-none z-[2]" />

      <div className="container relative z-[5] text-center">
        <motion.div
          initial="initial"
          animate="animate"
          variants={stagger}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={fadeUp} className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
              <Sparkles className="h-8 w-8 text-accent2" />
            </div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold tracking-tight mb-6 sm:mb-8"
          >
            <span className="relative inline-flex items-center justify-center">
              <span className="sr-only">{fullText}</span>
              <span className="bg-gradient-to-r from-content via-accent2 to-content bg-clip-text text-transparent">
                {displayedText}
                {displayedText.length < fullText.length && <span className="animate-pulse">|</span>}
              </span>
            </span>{" "}
            <span className="bg-gradient-to-r from-accent via-accent2 to-accent bg-clip-text text-transparent">
              Rendimiento de clase mundial.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-muted mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            {subheading}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button asChild variant="gold" size="lg">
              <Link href={`/${locale}#calculadora`}>
                {primaryCta}
              </Link>
            </Button>
            <Button variant="ghost" size="lg" type="button" onClick={open}>
              {secondaryCta}
            </Button>
          </motion.div>

          <HeroStats />
        </motion.div>
      </div>
    </section>
  );
}

