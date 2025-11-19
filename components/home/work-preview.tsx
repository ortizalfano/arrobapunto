"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, TrendingUp, Zap, TrendingDown, Eye } from "lucide-react";
import { fadeUp, stagger, scaleIn } from "@/lib/motion";

const featuredProjects = [
  {
    id: 1,
    title: "Marketplace Premium",
    sector: "ARAP - Gobierno de Panamá",
    description: "Marketplace para conectar vendedores y productores de recursos acuáticos con compradores.",
    image: "🎨",
    metrics: [
      { label: "Conversión", value: "+34%", icon: TrendingUp },
      { label: "LCP", value: "0.8s", icon: Zap },
      { label: "Rebote", value: "-22%", icon: TrendingDown },
    ],
    color: "from-purple-500/20 to-pink-500/20",
    tags: ["PHP", "PagueloFacil", "MySQL"],
  },
  {
    id: 2,
    title: "E-Commerce Corporativo",
    sector: "Healthinfoods",
    description: "Plataforma E-commerce para la visualización y reserva de productos",
    image: "🚀",
    metrics: [
      { label: "Usuarios", value: "+125%", icon: TrendingUp },
      { label: "Retención", value: "89%", icon: Eye },
      { label: "Velocidad", value: "0.9s", icon: Zap },
    ],
    color: "from-blue-500/20 to-cyan-500/20",
    tags: ["PHP", "HTML y CSS", "MySQL", "JavaScript"],
  },
  {
    id: 3,
    title: "Cotizador Online de Seguros",
    sector: "Travel Guardian Assist",
    description: "Plataforma de Seguros con Cotizador, Calculadora Online y Pasarela de Pagos",
    image: "✨",
    metrics: [
      { label: "Reconocimiento", value: "+67%", icon: TrendingUp },
      { label: "Engagement", value: "4.2x", icon: Eye },
      { label: "Memorabilidad", value: "91%", icon: TrendingUp },
    ],
    color: "from-amber-500/20 to-orange-500/20",
    tags: ["MySQL", "PHP y JavaScript", "Integraciones de API"],
  },
];

export function WorkPreview() {
  const badgeText = "Casos de éxito";
  const titleLead = "Trabajos que";
  const titleHighlight = "transforman negocios";
  const subtitle = "Cada proyecto es una historia de crecimiento, innovación y resultados medibles.";

  return (
    <section className="w-full pt-0 pb-12 sm:pb-16 relative overflow-hidden" style={{ contain: "layout style" }}>
      <div className="container px-4 sm:px-8 mx-auto relative z-[5]">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-12"
        >
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent2/10 border border-accent2/20 mb-6 backdrop-blur-sm">
              <TrendingUp className="h-4 w-4 text-accent2" />
              <span className="text-sm text-accent2">{badgeText}</span>
            </div>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4"
          >
            <span className="text-white">{titleLead} </span>
            <span className="bg-gradient-to-r from-white via-accent2 to-white bg-clip-text text-transparent">
              {titleHighlight}
            </span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-lg text-white/70 max-w-2xl mx-auto mb-12">
            {subtitle}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-10">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={scaleIn}
              custom={index}
              className="relative"
              style={{ minHeight: "400px", contain: "layout style" }}
            >
              <div className="relative p-[2px] rounded-[16px] bg-gradient-to-br from-[#90F3E6] via-[#E8DCC7] to-[#D7B980] bg-[length:200%_200%] animate-gradient-shift h-full">
                <Card className="h-full relative z-10 border-0 bg-[#1A1A1A] rounded-[14px] shadow-lg backdrop-blur-sm overflow-hidden group flex flex-col">
                  <div
                    className={`aspect-video bg-gradient-to-br ${project.color} flex items-center justify-center text-6xl`}
                  >
                    {project.image}
                  </div>

                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <CardTitle className="text-xl text-white group-hover:text-accent2 transition-colors">
                          {project.title}
                        </CardTitle>
                        <p className="text-xs text-gray-400 font-medium mt-1">{project.sector}</p>
                      </div>
                      <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-accent2 transition-colors" />
                    </div>
                    <CardDescription className="leading-relaxed text-white">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4 flex flex-col flex-1">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {project.metrics.map((metric, i) => {
                        const Icon = metric.icon;
                        return (
                          <div
                            key={i}
                            className="p-3 rounded-lg bg-transparent border border-white/20 group-hover:border-accent2/30 transition-colors flex items-start gap-2"
                          >
                            <Icon className="h-4 w-4 text-white mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-bold text-white leading-tight">{metric.value}</p>
                              <p className="text-xs text-white/70">{metric.label}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-full bg-transparent border border-white/20 text-white/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

