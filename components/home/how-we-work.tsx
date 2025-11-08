"use client";

import { motion } from "framer-motion";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Code2, Rocket } from "lucide-react";
import { fadeUp, scaleIn, stagger } from "@/lib/motion";

const steps = [
  {
    icon: Lightbulb,
    title: "Descubrimiento",
    description: "Investigamos tu audiencia, definimos objetivos y analizamos la competencia.",
  },
  {
    icon: Code2,
    title: "Prototipo",
    description: "Diseñamos y construimos con tecnología moderna, optimizada para velocidad.",
  },
  {
    icon: Rocket,
    title: "Entrega & Growth",
    description: "Desplegamos con monitoreo continuo y estrategias de crecimiento.",
  },
];

export function HowWeWork() {
  return (
    <section className="w-full pt-0 pb-10 bg-white">
      <div className="container px-4 sm:px-8 mx-auto">
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={stagger}
          className="text-center mb-12"
      >
        <motion.h2
          variants={fadeUp}
          className="text-3xl md:text-5xl font-display font-bold mb-4 text-black"
        >
          Cómo Trabajamos
        </motion.h2>
        <motion.p variants={fadeUp} className="text-muted max-w-2xl mx-auto text-lg">
          Un proceso probado en 3 pasos para llevar tu proyecto al éxito
        </motion.p>
      </motion.div>

        <div className="max-w-5xl mx-auto">
        {/* Primera fila: pasos 1 y 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {steps.slice(0, 2).map((step, index) => {
          const Icon = step.icon;
            const stepNumber = index + 1;
            
          return (
            <motion.div
              key={step.title}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={scaleIn}
              custom={index}
                className="relative"
            >
                <Card className="h-full border-0 bg-gradient-to-br from-bg-elev-1 to-bg-elev-2 rounded-[16px] shadow-lg backdrop-blur-sm">
                <CardHeader>
                    <div className="flex items-start gap-4">
                      {/* Número del paso */}
                      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-accent2/20 to-accent/20 border-2 border-accent2/30 flex items-center justify-center group-hover:border-accent2/60 transition-colors">
                        <span className="text-2xl font-bold text-accent2 group-hover:text-white transition-colors">
                          {stepNumber}
                        </span>
                      </div>
                      
                      {/* Contenido */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent2/10 transition-colors">
                            <Icon className="h-5 w-5 text-accent group-hover:text-accent2 transition-colors" />
                          </div>
                          <CardTitle className="text-xl text-white">{step.title}</CardTitle>
                  </div>
                        <CardDescription className="leading-relaxed text-white/70">
                    {step.description}
                  </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
              </Card>
            </motion.div>
          );
        })}
        </div>

        {/* Segunda fila: paso 3 centrado */}
        <div className="flex justify-center">
          {(() => {
            const step = steps[2];
            const Icon = step.icon;
            const stepNumber = 3;
            
            return (
              <motion.div
                key={step.title}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={scaleIn}
                custom={2}
                className="relative w-full md:w-[calc(50%-1rem)]"
              >
                <Card className="h-full border-0 bg-gradient-to-br from-bg-elev-1 to-bg-elev-2 rounded-[16px] shadow-lg backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      {/* Número del paso */}
                      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-accent2/20 to-accent/20 border-2 border-accent2/30 flex items-center justify-center group-hover:border-accent2/60 transition-colors">
                        <span className="text-2xl font-bold text-accent2 group-hover:text-white transition-colors">
                          {stepNumber}
                        </span>
                      </div>
                      
                      {/* Contenido */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent2/10 transition-colors">
                            <Icon className="h-5 w-5 text-accent group-hover:text-accent2 transition-colors" />
                          </div>
                          <CardTitle className="text-xl text-white">{step.title}</CardTitle>
                        </div>
                        <CardDescription className="leading-relaxed text-white/70">
                          {step.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            );
          })()}
        </div>
      </div>
      </div>
    </section>
  );
}

