import { Hero } from "@/components/home/hero";
import { TrustBar } from "@/components/home/trust-bar";
import { WorkPreview } from "@/components/home/work-preview";
import { ServicesPreview } from "@/components/home/services-preview";
import { StatsSection } from "@/components/home/stats-section";
import { FloatingCTA } from "@/components/home/floating-cta";
import { AnimatedStars } from "@/components/home/animated-stars";
import Calculator from "@/components/services/calculator";
import { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import { locales } from "@/lib/locales";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEnglish = locale === "en";
  const canonicalUrl = createCanonical(locale, "");

  return {
    title: isEnglish ? "Premium web design & development" : "Diseño y desarrollo web premium",
    description: isEnglish
      ? "AI-assisted boutique studio creating high-performance websites, ecommerce and digital products."
      : "Estudio boutique que crea webs de alto rendimiento, ecommerce y productos digitales impulsados por IA.",
    alternates: {
      canonical: canonicalUrl,
      languages: buildAlternates(""),
    },
    openGraph: {
      title: isEnglish ? "Premium web design & development" : "Diseño y desarrollo web premium",
      description: isEnglish
        ? "Partner with ArrobaPunto.com for conversion-driven design, blazing performance and SEO."
        : "Trabaja con ArrobaPunto.com para lograr diseño que convierte, rendimiento extremo y SEO técnico.",
      url: canonicalUrl,
    },
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const canonicalUrl = createCanonical(locale, "");

  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "ArrobaPunto.com",
    url: canonicalUrl,
    description:
      "Agencia boutique de diseño y desarrollo web premium especializada en rendimiento y SEO.",
    inLanguage: locale === "en" ? "en" : "es",
  };

  return (
    <div className="relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <div className="absolute inset-0 -z-20 bg-noir-mist" />
      <AnimatedStars />
      <div className="relative flex flex-col">
        <Hero />
        <WorkPreview />
        <ServicesPreview />
        <StatsSection />
        <CalculatorSection locale={locale} />
        <TrustBar />
        <FloatingCTA />
      </div>
    </div>
  );
}

function createCanonical(locale: string, path: string) {
  const cleanPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  return `${SITE_URL}/${locale}${cleanPath}`;
}

function buildAlternates(path: string) {
  const alternateMap: Record<string, string> = {};
  locales.forEach((locale) => {
    alternateMap[locale] = createCanonical(locale, path);
  });
  return alternateMap;
}

function CalculatorSection({ locale }: { locale: string }) {
  const isEnglish = locale === "en";

  return (
    <section id="calculadora" className="py-12 sm:py-16 bg-transparent text-white">
      <div className="container max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-4">
            <span className="text-sm text-white">
              {isEnglish ? "Project calculator" : "Calculadora de proyecto"}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-white via-accent2 to-white bg-clip-text text-transparent">
            {isEnglish ? "Estimate your budget" : "Calcula tu presupuesto"}
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            {isEnglish
              ? "Answer a few simple questions and get an instant estimate."
              : "Responde unas preguntas simples y obtén una estimación instantánea."}
          </p>
        </div>

        <Calculator />
      </div>
    </section>
  );
}

