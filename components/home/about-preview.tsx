"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Award, MapPin, Users, Zap, TrendingUp, Heart, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { fadeUp, stagger, scaleIn } from "@/lib/motion";

const stats = [
  { label: "Proyectos completados", value: "85+", icon: Target },
  { label: "Clientes satisfechos", value: "100%", icon: Heart },
  { label: "Años de experiencia", value: "6", icon: Award },
  { label: "Países", value: "10+", icon: MapPin },
];

const values = [
  {
    title: "Rendimiento",
    description: "Cada pixel optimizado",
    icon: Zap,
  },
  {
    title: "Diseño",
    description: "Belleza funcional",
    icon: Sparkles,
  },
  {
    title: "Resultados",
    description: "Crecimiento medible",
    icon: TrendingUp,
  },
];

export function AboutPreview() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'es';

  return (
    <section className="w-full py-12 sm:py-16 bg-white relative">
      <div className="container px-4 sm:px-8 mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={scaleIn}
                custom={index}
              >
                <Card className="h-full text-center border-0 bg-gradient-to-br from-bg-elev-1 to-bg-elev-2 relative overflow-hidden group shadow-lg">
                  <div className="absolute top-0 left-0 right-0 h-px bg-aurora-edge opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardHeader className="pb-3">
                    <div className="w-12 h-12 rounded-xl bg-accent2/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-accent2/20 transition-colors">
                      <Icon className="h-6 w-6 text-accent2" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-accent2 mb-1">{stat.value}</p>
                    <p className="text-sm text-muted">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* About text */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 border border-black/10 mb-6 backdrop-blur-sm">
              <Users className="h-4 w-4 text-black" />
              <span className="text-sm text-black font-medium">Sobre Nosotros</span>
            </div>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6"
          >
            <span className="text-black">Arte, código </span>
            <span className="bg-gradient-to-r from-gray-800 via-black to-gray-800 bg-clip-text text-transparent">
              y resultados
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-lg text-gray-700 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Somos un equipo boutique de diseñadores y desarrolladores apasionados por crear
            experiencias digitales que realmente funcionen para tu negocio.
          </motion.p>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  variants={scaleIn}
                  custom={index}
                  className="relative p-[2px] rounded-[16px] bg-gradient-to-br from-[#90F3E6] via-[#E8DCC7] to-[#D7B980] bg-[length:200%_200%] animate-gradient-shift"
                >
                  <Card className="h-full relative z-10 border-0 bg-gradient-to-br from-bg-elev-1 to-bg-elev-2 rounded-[14px] shadow-lg backdrop-blur-sm">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 rounded-xl bg-accent2/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-accent2" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                      <p className="text-white/70">{value.description}</p>
                    </CardHeader>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div variants={fadeUp}>
            <Button asChild variant="outline" size="lg" className="bg-white border-black/20 hover:bg-black/5">
              <Link href={`/${locale}/studio`}>Conoce más sobre nosotros</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

