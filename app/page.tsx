import { Hero } from "@/components/home/hero";
import { WorkPreview } from "@/components/home/work-preview";
import dynamic from "next/dynamic";
import { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

// Lazy load componentes pesados (no críticos para LCP)
const AnimatedStars = dynamic(() => import("@/components/home/animated-stars").then((mod) => ({ default: mod.AnimatedStars })), {
  loading: () => null,
});

const ServicesPreview = dynamic(() => import("@/components/home/services-preview").then((mod) => ({ default: mod.ServicesPreview })), {
  loading: () => <div className="py-12 sm:py-16" style={{ minHeight: "400px" }} />,
});

const StatsSection = dynamic(() => import("@/components/home/stats-section").then((mod) => ({ default: mod.StatsSection })), {
  loading: () => <div className="py-12 sm:py-16" style={{ minHeight: "200px" }} />,
});

const Calculator = dynamic(() => import("@/components/services/calculator"), {
  loading: () => <div className="py-12 sm:py-16" style={{ minHeight: "600px" }} />,
});

const FloatingCTA = dynamic(() => import("@/components/home/floating-cta").then((mod) => ({ default: mod.FloatingCTA })), {
  loading: () => null,
});


export const metadata: Metadata = {
  title: "Diseño y desarrollo web premium",
  description:
    "Estudio boutique que crea webs de alto rendimiento, ecommerce y productos digitales impulsados por IA.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Diseño y desarrollo web premium",
    description: "Trabaja con ArrobaPunto.com para lograr diseño que convierte, rendimiento extremo y SEO técnico.",
    url: SITE_URL,
  },
};

export default function Home() {
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "ArrobaPunto.com",
    url: SITE_URL,
    description: "Agencia boutique de diseño y desarrollo web premium especializada en rendimiento y SEO.",
    inLanguage: "es",
  };

  return (
    <div className="relative overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }} />
      <div className="absolute inset-0 -z-20 bg-noir-mist" />
      <AnimatedStars />
      <div className="relative flex flex-col">
        <Hero />
        <WorkPreview />
        <ServicesPreview />
        <StatsSection />
        <CalculatorSection />
        <FloatingCTA />
      </div>
    </div>
  );
}

function CalculatorSection() {
  return (
    <section id="calculadora" className="py-12 sm:py-16 bg-transparent text-white">
      <div className="container max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-4">
            <span className="text-sm text-white">Calculadora de proyecto</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-white via-accent2 to-white bg-clip-text text-transparent">
            Calcula tu presupuesto
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Responde unas preguntas simples y obtén una estimación instantánea.
          </p>
        </div>

        <Calculator />
      </div>
    </section>
  );
}

