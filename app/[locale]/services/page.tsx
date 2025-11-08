import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, Zap, CheckCircle2, Code2, ShoppingCart, Wrench } from "lucide-react";
import { Calculator } from "@/components/services/calculator";
import { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import { locales } from "@/lib/locales";

const services = [
  {
    title: "Desarrollo Web",
    icon: Code2,
    description: "Webs modernas, rápidas y escalables",
    price: "Desde $1,500",
    schema: {
      price: 1500,
      currency: "USD",
    },
    deliverables: [
      "Next.js 15 optimizado",
      "Performance 95+ Lighthouse",
      "SEO técnico completo",
      "PWA configurado",
      "Integraciones API",
    ],
    gradient: "from-blue-500/20 to-cyan-500/20",
    duration: "6-10 semanas",
    cta: "quote",
  },
  {
    title: "E-commerce",
    icon: ShoppingCart,
    description: "Tiendas online que convierten",
    price: "Desde $2,200",
    schema: {
      price: 2200,
      currency: "USD",
    },
    deliverables: [
      "Carrito y checkout optimizado",
      "Pasarela de pagos integrada",
      "Dashboard de administración",
      "Gestión de inventario",
      "Analytics avanzado",
    ],
    gradient: "from-emerald-500/20 to-teal-500/20",
    duration: "8-12 semanas",
    cta: "quote",
  },
  {
    title: "Desarrollo Personalizado",
    icon: Wrench,
    description: "Experiencias a medida como páginas de login personalizadas para WordPress y flujos únicos.",
    price: null,
    schema: {
      price: null,
      currency: "USD",
    },
    deliverables: [
      "Branding y UX en la pantalla de acceso",
      "Flujos y campos personalizados",
      "Integración con plugins y APIs",
      "Seguridad reforzada con 2FA",
      "Soporte y mejoras continuas",
    ],
    gradient: "from-amber-500/20 to-orange-500/20",
    duration: "A medida",
    cta: "brief",
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEnglish = locale === "en";
  const canonicalUrl = createCanonical(locale, "/services");

  return {
    title: isEnglish ? "Premium web services" : "Servicios premium de desarrollo web",
    description: isEnglish
      ? "Productized websites, ecommerce and custom builds crafted for performance and conversion."
      : "Servicios boutique de desarrollo web, ecommerce y proyectos personalizados con foco en rendimiento y conversión.",
    alternates: {
      canonical: canonicalUrl,
      languages: buildAlternates("/services"),
    },
    openGraph: {
      title: isEnglish ? "Premium web services" : "Servicios premium de desarrollo web",
      description: isEnglish
        ? "Productized websites, ecommerce and custom builds crafted for performance and conversion."
        : "Servicios boutique de desarrollo web, ecommerce y proyectos personalizados con foco en rendimiento y conversión.",
      url: canonicalUrl,
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEnglish = locale === "en";
  const defaultCtaLabel = isEnglish ? "Request quote" : "Solicitar presupuesto";
  const briefCtaLabel = isEnglish ? "Create Brief Express" : "Crear Brief Express";
  const playHref = `/${locale}/play`;

  const servicesSchema = {
    "@context": "https://schema.org",
    "@graph": services.map((service) => {
      const offer =
        service.schema.price !== null
          ? {
              "@type": "Offer",
              price: service.schema.price,
              priceCurrency: service.schema.currency,
              availability: "https://schema.org/InStock",
            }
          : undefined;

      return {
        "@type": "Service",
        name: service.title,
        description: service.description,
        areaServed: ["Spain", "Latin America", "United States"],
        provider: {
          "@type": "Organization",
          name: "ArrobaPunto.com",
        },
        offers: offer,
      };
    }),
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      {/* Hero */}
      <section className="relative py-8 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent2/5 via-transparent to-accent/5" />
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent2/10 border border-accent2/20 mb-4">
                <Sparkles className="h-4 w-4 text-accent2" />
                <span className="text-sm text-accent2">Servicios</span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
              <span className="bg-gradient-to-r from-content via-accent2 to-content bg-clip-text text-transparent">
                Soluciones{" "}
              </span>
              <span className="bg-gradient-to-r from-accent via-accent2 to-accent bg-clip-text text-transparent">
                premium
              </span>
            </h1>
            <p className="text-xl text-muted max-w-2xl mx-auto leading-relaxed">
              Cada servicio diseñado para impulsar crecimiento real y resultados medibles
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-8 sm:py-12 bg-[#0D1217]">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={service.title}>
                  <Card className={`h-full group border-accent/10 bg-gradient-to-br from-bg-elev-1 to-bg-elev-2 relative overflow-hidden`}>
                    <div className="absolute top-0 left-0 right-0 h-px bg-aurora-edge opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <CardHeader>
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4`}>
                        <Icon className="h-7 w-7 text-accent2" />
                      </div>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <CardTitle className="text-2xl mb-2 group-hover:text-accent2 transition-colors">
                            {service.title}
                          </CardTitle>
                          <CardDescription className="text-base leading-relaxed">
                            {service.description}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted sm:gap-4">
                        {service.price && (
                          <p className="text-2xl font-bold text-accent2 text-left text-balance">{service.price}</p>
                        )}
                        {service.price && service.duration && <span>•</span>}
                        {service.duration && <p>{service.duration}</p>}
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-content mb-2">Incluye:</p>
                        {service.deliverables.map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-muted">
                            <CheckCircle2 className="h-4 w-4 text-accent2 flex-shrink-0" />
                            {item}
                          </div>
                        ))}
                      </div>
                      <div>
                        <Button asChild className="w-full" variant="gold">
                          <Link href={playHref}>
                            {service.cta === "brief" ? briefCtaLabel : defaultCtaLabel}
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section id="calculadora" className="py-8 sm:py-12 bg-gradient-accent pattern-lines">
        <div className="container max-w-3xl">
          <div className="text-center mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent2/10 border border-accent2/20 mb-4">
                <Zap className="h-4 w-4 text-accent2" />
                <span className="text-sm text-accent2">Calculadora de Proyecto</span>
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
              <span className="bg-gradient-to-r from-content to-accent2 bg-clip-text text-transparent">
                Calcula tu{" "}
              </span>
              <span className="bg-gradient-to-r from-accent via-accent2 to-accent bg-clip-text text-transparent">
                presupuesto
              </span>
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Responde unas preguntas simples y obtén una estimación instantánea
            </p>
          </div>

          <Calculator />
        </div>
      </section>

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

