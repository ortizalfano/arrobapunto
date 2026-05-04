"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Smartphone, 
  Search, 
  ShieldCheck, 
  BarChart3,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { fadeUp, stagger, scaleIn } from "@/lib/motion";
import { useContactModal } from "@/components/contact/contact-modal-provider";
import dynamic from "next/dynamic";
import Link from "next/link";

// Lazy load heavy components
const Calculator = dynamic(() => import("@/components/services/calculator"), {
  loading: () => <div className="py-12 sm:py-16" style={{ minHeight: "600px" }} />,
});

const AnimatedStars = dynamic(() => import("@/components/home/animated-stars").then((mod) => ({ default: mod.AnimatedStars })), {
  loading: () => null,
});

const benefits = [
  {
    title: "Diseño Boutique Premium",
    description: "No usamos plantillas. Creamos una identidad única que posiciona tu marca por encima de la competencia.",
    icon: Sparkles,
    color: "text-accent2"
  },
  {
    title: "Velocidad Extrema (Performance)",
    description: "Webs que cargan en menos de 1 segundo. Menos espera significa más ventas.",
    icon: Zap,
    color: "text-blue-400"
  },
  {
    title: "Responsive & PWA",
    description: "Tu web se verá perfecta en cualquier móvil y podrá instalarse como una App nativa.",
    icon: Smartphone,
    color: "text-emerald-400"
  },
  {
    title: "SEO Técnico & IA Ready",
    description: "Optimizada para aparecer en Google y ser entendida por IAs como ChatGPT y Gemini.",
    icon: Search,
    color: "text-amber-400"
  },
  {
    title: "Seguridad y Estabilidad",
    description: "Infraestructura de clase mundial protegida contra ataques y caídas.",
    icon: ShieldCheck,
    color: "text-purple-400"
  },
  {
    title: "Enfoque en Conversión",
    description: "Diseñamos con psicología de ventas para convertir visitantes en clientes reales.",
    icon: BarChart3,
    color: "text-rose-400"
  }
];

export default function LandingPage() {
  const { open } = useContactModal();

  return (
    <div className="relative overflow-hidden bg-noir-mist text-white">
      <AnimatedStars />
      
      {/* Minimal Header */}
      <header className="container relative z-50 flex items-center justify-between py-6">
        <Link href="/" className="text-2xl font-bold tracking-tighter">
          ArrobaPunto<span className="text-accent2">.com</span>
        </Link>
        <Button variant="outline" size="sm" onClick={() => open()}>
          Hablar con un experto
        </Button>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
        <div className="container relative z-10 text-center">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8 backdrop-blur-md">
              <span className="text-sm font-medium text-accent2 uppercase tracking-widest">Soluciones Digitales de Clase Mundial</span>
            </motion.div>
            
            <motion.h1 
              variants={fadeUp}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-8 leading-tight"
            >
              Tu negocio merece una web que <span className="bg-gradient-to-r from-accent via-accent2 to-accent bg-clip-text text-transparent">Venda</span>, no solo que se vea bien.
            </motion.h1>

            <motion.p 
              variants={fadeUp}
              className="text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Creamos sitios web premium y aplicaciones móviles en España y Panamá con rendimiento extremo, diseño boutique y SEO estratégico.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" onClick={() => open()} className="text-lg px-10 h-14">
                Empezar mi proyecto <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="ghost" size="xl" asChild className="text-lg h-14">
                <Link href="#calculadora">Calcular presupuesto</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 opacity-30">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent2/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px]" />
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 bg-white/5 backdrop-blur-sm border-y border-white/10">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">¿Por qué elegir ArrobaPunto?</h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              No somos una agencia más. Somos tu socio tecnológico enfocado en resultados medibles y diseño de élite.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={scaleIn}
                custom={i}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-accent2/30 transition-all group"
              >
                <div className={`w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <benefit.icon className={`h-6 w-6 ${benefit.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-white/60 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section className="py-24 relative">
        <div className="container text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-12">Nuestra obsesión: <span className="text-accent2">La Perfección</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="p-6">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">99%</div>
              <div className="text-sm text-white/50 uppercase tracking-widest">Performance</div>
            </div>
            <div className="p-6">
              <div className="text-4xl md:text-5xl font-bold text-accent2 mb-2">100%</div>
              <div className="text-sm text-white/50 uppercase tracking-widest">SEO Técnico</div>
            </div>
            <div className="p-6">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">+50</div>
              <div className="text-sm text-white/50 uppercase tracking-widest">Proyectos Premium</div>
            </div>
            <div className="p-6">
              <div className="text-4xl md:text-5xl font-bold text-accent2 mb-2">24/7</div>
              <div className="text-sm text-white/50 uppercase tracking-widest">Soporte Elite</div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculadora" className="py-24 bg-accent/5">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Calcula tu inversión</h2>
            <p className="text-white/60 text-lg">Obtén una estimación instantánea para tu proyecto web o móvil.</p>
          </div>
          <Calculator />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="container relative z-10 text-center">
          <div className="max-w-3xl mx-auto p-12 rounded-[40px] bg-gradient-to-br from-white/10 to-transparent border border-white/20 backdrop-blur-xl">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-8 leading-tight">
              ¿Listo para llevar tu negocio al siguiente nivel?
            </h2>
            <p className="text-xl text-white/70 mb-10">
              Estamos en España y Panamá. Hablemos hoy mismo sobre tu visión.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" onClick={() => open()} className="text-lg px-10 h-14 shadow-[0_0_20px_rgba(215,185,128,0.3)]">
                Agendar Consultoría Gratuita
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-12 border-t border-white/10 text-center">
        <div className="container">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} ArrobaPunto.com - Diseño Web Premium España & Panamá
          </p>
        </div>
      </footer>
    </div>
  );
}
