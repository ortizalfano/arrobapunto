"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { scaleIn } from "@/lib/motion";

export function BriefExpress() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'es';
  
  return (
    <section className="container px-4 sm:px-8 py-10 bg-gradient-muted">
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={scaleIn}
        className="max-w-3xl mx-auto"
      >
        <Card className="relative overflow-hidden border-accent/20 bg-gradient-to-br from-bg-elev-1 to-bg-elev-2">
          {/* Aurora edge effect */}
          <div className="absolute top-0 left-0 right-0 h-px bg-aurora-edge" />

          <CardHeader className="text-center">
            <CardTitle className="text-3xl md:text-4xl mb-4 text-content">
              Brief Express
            </CardTitle>
            <CardDescription className="text-base text-muted leading-relaxed">
              Calcula una estimación rápida para tu proyecto en menos de 2 minutos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex items-center gap-3">
                <span className="text-accent2">✓</span>
                3-5 preguntas rápidas
              </li>
              <li className="flex items-center gap-3">
                <span className="text-accent2">✓</span>
                Estimación inmediata
              </li>
              <li className="flex items-center gap-3">
                <span className="text-accent2">✓</span>
                PDF con briefing completo
              </li>
              <li className="flex items-center gap-3">
                <span className="text-accent2">✓</span>
                CTA directo a tu calendario
              </li>
            </ul>
            <Button asChild variant="gold" className="w-full" size="lg">
              <Link href={`/${locale}/play`}>
                Empezar ahora
              </Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}

