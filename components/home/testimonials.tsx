"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { fadeUp, stagger, scaleIn } from "@/lib/motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "María García",
    role: "CEO, startup tecnológica",
    content:
      "El equipo de ArrobaPunto transformó completamente nuestra presencia online. El resultado superó todas nuestras expectativas.",
    rating: 5,
    avatar: "MG",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "Juan Pérez",
    role: "Director de marketing",
    content:
      "Rendimiento excepcional y atención al detalle impecable. El sitio carga increíblemente rápido y tiene un diseño elegante.",
    rating: 5,
    avatar: "JP",
    gradient: "from-emerald-500 to-teal-500",
  },
];

export function Testimonials() {
  const heading = "Lo que dicen nuestros clientes";
  const subheading = "Experiencias reales de marcas que confían en nosotros.";

  return (
    <section className="py-12 sm:py-16 bg-transparent text-white">
      <div className="container px-4 sm:px-8">
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={stagger}
          className="text-center mb-10"
      >
        <motion.h2
          variants={fadeUp}
            className="text-3xl md:text-5xl font-display font-bold mb-4"
        >
            {heading}
        </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-white/70 max-w-2xl mx-auto">
            {subheading}
          </motion.p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={scaleIn}
            custom={index}
          >
              <Card className="border border-white/10 bg-white/5 backdrop-blur-sm">
              <CardContent className="pt-8">
                <Quote className="h-8 w-8 text-accent mb-6" />
                  <p className="mb-6 text-white/80 leading-relaxed italic">
                  &quot;{testimonial.content}&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold shadow-lg`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                      <p className="font-semibold text-white">{testimonial.name}</p>
                      <p className="text-sm text-white/60">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        </div>
      </div>
    </section>
  );
}

