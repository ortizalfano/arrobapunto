"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, TrendingUp, Zap, Eye, Play } from "lucide-react";
import { fadeUp, stagger, scaleIn } from "@/lib/motion";
import { useState, useRef } from "react";
import { ProjectModal, type ProjectData } from "./project-modal";

const featuredProjects: ProjectData[] = [
  {
    id: 1,
    title: "Sistema de Chatbots (Saas)",
    sector: "Kônsul Digital",
    description: "Desarrollo y Diseño de Sistema de Creación e Integración de Chatbot con Inteligencia Artificial.",
    fullDescription: "Plataforma SaaS integral que permite a las empresas diseñar, entrenar y desplegar asistentes virtuales inteligentes. Utiliza modelos de lenguaje avanzados para comprender la intención del usuario y automatizar procesos complejos de atención al cliente las 24 horas.",
    features: [
      "Constructor de flujos visual (No-Code)",
      "Entrenamiento con documentos y URLs",
      "Integración nativa con WhatsApp y Web",
      "Panel de analíticas y sentimientos"
    ],
    image: "🤖",
    videoUrl: "/videos/chatbot-video.mp4",
    metrics: [
      { label: "Automatización", value: "95%", icon: Zap },
      { label: "T. Respuesta", value: "< 0.5s", icon: TrendingUp },
      { label: "Retención", value: "+40%", icon: Eye },
    ],
    color: "from-purple-500/20 to-blue-500/20",
    tags: ["TypeScript", "Node.js", "PostgreSQL", "OpenAI"],
    estimatedCost: "$7,500",
    serviceType: "custom",
  },

  {
    id: 3,
    title: "Sitio Web Corporativo",
    sector: "2Ble (Luxury Real Estate)",
    description: "Sitio web corporativo del sector inmobiliario de lujo con herramientas financieras.",
    fullDescription: "Plataforma digital premium desarrollada para el sector inmobiliario. Integra soluciones avanzadas como un Cotizador Online, Calculadora Inmobiliaria (Krêdit) y asistentes de IA para maximizar la captación de leads cualificados.",
    features: [
      "Calculadora Inmobiliaria (Krêdit)",
      "Cotizador Online Integrado",
      "Asistentes de IA",
      "Diseño UX/UI Premium"
    ],
    image: "🏛️",
    videoUrl: "/videos/video-invierte.mp4",
    metrics: [
      { label: "Leads", value: "+210%", icon: TrendingUp },
      { label: "Conversión", value: "4.8%", icon: Zap },
      { label: "Retención", value: "3m+", icon: Eye },
    ],
    color: "from-amber-500/20 to-yellow-500/20",
    tags: ["TypeScript", "JavaScript", "Node.js", "PostgreSQL"],
    estimatedCost: "$8,000",
    serviceType: "web",
  },
  {
    id: 4,
    title: "Sistema de Ticketing (Help Desk)",
    sector: "Next Step Financial",
    description: "Sistema automatizado de gestión de tickets con IA para soporte financiero.",
    fullDescription: "Plataforma inteligente que centraliza y automatiza la resolución de incidencias para una firma financiera. Integra la API de Gemini para clasificar tickets, sugerir respuestas y detectar urgencias en tiempo real, reduciendo drásticamente los tiempos de espera.",
    features: [
      "Clasificación automática con Gemini",
      "Base de datos vectorizada (Neon)",
      "Dashboard de métricas en tiempo real",
      "Respuestas sugeridas por IA"
    ],
    image: "⚡️",
    videoUrl: "/videos/video-nextstep.mp4",
    metrics: [
      { label: "T. Resolución", value: "-80%", icon: Zap },
      { label: "Soporte", value: "24/7", icon: TrendingUp },
      { label: "Precisión", value: "92%", icon: Eye },
    ],
    color: "from-emerald-500/20 to-teal-500/20",
    tags: ["TypeScript", "Neon (Postgres)", "Gemini API"],
    estimatedCost: "$6,500",
    serviceType: "custom",
  },
];

const ProjectCard = ({ project, index, openModal }: { project: ProjectData, index: number, openModal: (project: ProjectData) => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch((e: any) => console.log("Video play failed", e));
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      key={project.id}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={scaleIn}
      custom={index}
      className="relative cursor-pointer group"
      onClick={() => openModal(project)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ minHeight: "400px", contain: "layout style" }}
    >
      <div className="relative p-[2px] rounded-[16px] bg-gradient-to-br from-[#90F3E6] via-[#E8DCC7] to-[#D7B980] bg-[length:200%_200%] animate-gradient-shift h-full transition-transform duration-300 group-hover:scale-[1.02]">
        <Card className="h-full relative z-10 border-0 bg-[#1A1A1A] rounded-[14px] shadow-lg backdrop-blur-sm overflow-hidden flex flex-col transition-colors group-hover:bg-[#222]">
          <div
            className={`aspect-video bg-gradient-to-br ${project.color} flex items-center justify-center text-6xl relative overflow-hidden`}
          >
            {/* Video Background */}
            {/* Video Background */}
            {project.videoUrl ? (
              <div className="absolute inset-0 z-0">
                <video
                  ref={videoRef}
                  src={project.videoUrl}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                />
                {/* Overlay to ensure text readability if needed */}
                <div className="absolute inset-0 bg-black/20" />
              </div>
            ) : (
              <span className="group-hover:scale-110 transition-transform duration-500 relative z-10">
                {project.image}
              </span>
            )}

            {/* Overlay para indicar que es 'clickable' o tiene video - Solo mostrar si NO hay video, o cambiar lógica */}
            {!project.videoUrl && (
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                <div className="bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20">
                  <Play className="h-8 w-8 text-white fill-white" />
                </div>
              </div>
            )}
          </div>

          <CardHeader className="relative z-10">
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

          <CardContent className="space-y-4 flex flex-col flex-1 relative z-10">
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
  );
};


export function WorkPreview() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project: ProjectData) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const badgeText = "Casos de éxito";
  const titleLead = "Trabajos que";
  const titleHighlight = "transforman negocios";
  const subtitle = "Cada proyecto es una historia de crecimiento, innovación y resultados medibles.";

  return (
    <>
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
              <ProjectCard key={project.id} project={project} index={index} openModal={openModal} />
            ))}
          </div>
        </div>
      </section>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
      />
    </>
  );
}
