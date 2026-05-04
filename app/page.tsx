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
  title: "Páginas Web Premium | Diseño y Desarrollo en España y Panamá",
  description:
    "Especialistas en cómo hacer una página web que convierte. Diseño boutique de sitios web de alto rendimiento, ecommerce y aplicaciones móviles impulsadas por IA.",
  keywords: [
    "como hacer una pagina web",
    "diseño de paginas web",
    "desarrollo de aplicaciones moviles",
    "paginas web españa",
    "paginas web panama",
    "agencia seo tecnico"
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Páginas Web Premium | ArrobaPunto.com",
    description: "Trabaja con ArrobaPunto.com para lograr el mejor diseño web, rendimiento extremo y SEO técnico en España y Panamá.",
    url: SITE_URL,
  },
};

export default function Home() {
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "ArrobaPunto - Diseño Web Premium",
    "url": SITE_URL,
    "description": "Agencia boutique especializada en diseño y desarrollo de páginas web y aplicaciones móviles de alto rendimiento en España y Panamá.",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Inicio",
          "item": SITE_URL
        }
      ]
    },
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Cómo hacer una página web profesional?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Para hacer una página web profesional se requiere un diseño enfocado en la experiencia de usuario (UX), un desarrollo técnico optimizado para velocidad y SEO, y una estrategia de conversión clara. En ArrobaPunto nos especializamos en crear sitios web de alto rendimiento en España y Panamá."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuál es el precio de una página web en España y Panamá?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El precio de una página web profesional varía según la complejidad, pero en ArrobaPunto ofrecemos soluciones premium desde $1,500, garantizando el mejor rendimiento y diseño del mercado."
        }
      }
    ],
    "inLanguage": "es",
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

