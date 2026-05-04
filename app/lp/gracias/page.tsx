"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, Send } from "lucide-react";
import { fadeUp, stagger } from "@/lib/motion";
import Link from "next/link";
import dynamic from "next/dynamic";

const AnimatedStars = dynamic(() => import("@/components/home/animated-stars").then((mod) => ({ default: mod.AnimatedStars })), {
  loading: () => null,
});

export default function ThankYouPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-noir-mist text-white">
      <AnimatedStars />
      
      <div className="container relative z-10 px-4">
        <motion.div
          initial="initial"
          animate="animate"
          variants={stagger}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div 
            variants={fadeUp}
            className="w-24 h-24 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(16,185,129,0.2)]"
          >
            <CheckCircle className="h-12 w-12 text-emerald-500" />
          </motion.div>

          <motion.h1 
            variants={fadeUp}
            className="text-4xl md:text-6xl font-display font-bold mb-6"
          >
            ¡Mensaje Recibido!
          </motion.h1>

          <motion.p 
            variants={fadeUp}
            className="text-xl text-white/70 mb-12 leading-relaxed"
          >
            Gracias por confiar en <span className="text-white font-semibold">ArrobaPunto</span>. 
            Hemos recibido tu solicitud y un experto de nuestro equipo se pondrá en contacto contigo en las próximas <span className="text-accent2 font-bold">24 horas</span> para hablar de tu proyecto.
          </motion.p>

          <motion.div 
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" asChild className="px-8 h-14">
              <Link href="/">
                <ArrowLeft className="mr-2 h-5 w-5" /> Volver al Inicio
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="px-8 h-14">
              <Link href="/lp">
                Ver servicios de nuevo
              </Link>
            </Button>
          </motion.div>

          <motion.div 
            variants={fadeUp}
            className="mt-16 pt-8 border-t border-white/10"
          >
            <p className="text-sm text-white/40 uppercase tracking-widest flex items-center justify-center gap-2">
              <Send className="h-4 w-4" /> España & Panamá • Diseño Web Premium
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 opacity-30">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px]" />
      </div>
    </div>
  );
}
