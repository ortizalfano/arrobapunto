import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, TrendingUp, Eye, Zap, TrendingDown } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

const projects = [
  {
    id: 1,
    title: "E-commerce Premium",
    sector: "Retail",
    description: "Tienda online de lujo con carrito avanzado y checkout optimizado",
    image: "🎨",
    metrics: [
      { label: "Conversión", value: "+34%", icon: TrendingUp },
      { label: "LCP", value: "0.8s", icon: Zap },
      { label: "Rebote", value: "-22%", icon: TrendingDown },
    ],
    color: "from-purple-500/20 to-pink-500/20",
    tags: ["Next.js", "Stripe", "Prisma"],
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
      { label: "Reconocimiento de marca", value: "+67%", icon: TrendingUp },
      { label: "Engagement", value: "4.2x", icon: Eye },
      { label: "Recordación", value: "91%", icon: TrendingUp },
    ],
    color: "from-amber-500/20 to-orange-500/20",
    tags: ["MySQL", "PHP y JavaScript", "Integraciones de API"],
  },
  {
    id: 4,
    title: "Marketplace Global",
    sector: "E-commerce",
    description: "Plataforma multi-vendor con pagos internacionales",
    image: "🌍",
    metrics: [
      { label: "GMV", value: "$2.5M", icon: TrendingUp },
      { label: "Vendors", value: "+450", icon: TrendingUp },
      { label: "Países", value: "42", icon: Eye },
    ],
    color: "from-emerald-500/20 to-teal-500/20",
    tags: ["Platform", "Multi-tenant", "International"],
  },
  {
    id: 5,
    title: "Fintech App",
    sector: "Finance",
    description: "App móvil de inversiones con tracking en tiempo real",
    image: "💳",
    metrics: [
      { label: "DAU", value: "+340%", icon: TrendingUp },
      { label: "ARPU", value: "$45", icon: TrendingUp },
      { label: "Churn", value: "2.1%", icon: TrendingDown },
    ],
    color: "from-indigo-500/20 to-blue-500/20",
    tags: ["React Native", "Tiempo real", "Blockchain"],
  },
  {
    id: 6,
    title: "AI Content Platform",
    sector: "Media",
    description: "Generación de contenido con IA integrada",
    image: "🤖",
    metrics: [
      { label: "Contenido generado", value: "+890%", icon: TrendingUp },
      { label: "Calidad", value: "94%", icon: Eye },
      { label: "Tiempo", value: "2 min", icon: Zap },
    ],
    color: "from-violet-500/20 to-purple-500/20",
    tags: ["AI/ML", "GPT-4", "Automatización"],
  },
];

export const metadata: Metadata = {
  title: "Casos de éxito",
  description: "Selección de ecommerce, SaaS y plataformas impulsadas por IA creadas por ArrobaPunto.com.",
  alternates: {
    canonical: `${SITE_URL}/work`,
  },
  openGraph: {
    title: "Casos de éxito",
    description: "Proyectos que elevaron conversión, velocidad y retención para nuestros clientes.",
    url: `${SITE_URL}/work`,
  },
};

export default function WorkPage() {
  const projectsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.title,
      description: project.description,
    })),
  };

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }} />

      <section className="relative py-8 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent2/5 via-transparent to-accent/5" />
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent2/10 border border-accent2/20 mb-4">
                <TrendingUp className="h-4 w-4 text-accent2" />
                <span className="text-sm text-accent2">Casos de Éxito</span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
              <span className="bg-gradient-to-r from-content via-accent2 to-content bg-clip-text text-transparent">
                Trabajos que{" "}
              </span>
              <span className="bg-gradient-to-r from-accent via-accent2 to-accent bg-clip-text text-transparent">
                transforman negocios
              </span>
            </h1>
            <p className="text-xl text-muted max-w-2xl mx-auto leading-relaxed">
              Cada proyecto es una historia de crecimiento, innovación y resultados medibles.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 pattern-dots">
        <div className="container max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id}>
                <Card className="h-full group overflow-hidden border-accent/10">
                  <div className={`aspect-video bg-gradient-to-br ${project.color} rounded-t-xl flex items-center justify-center text-6xl mb-4`}>
                    {project.image}
                  </div>

                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <CardTitle className="text-xl group-hover:text-accent2 transition-colors">
                          {project.title}
                        </CardTitle>
                        <p className="text-xs text-accent2 font-medium mt-1">{project.sector}</p>
                      </div>
                      <ExternalLink className="h-5 w-5 text-muted group-hover:text-accent2 transition-colors" />
                    </div>
                    <CardDescription className="leading-relaxed">{project.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {project.metrics.map((metric, i) => {
                        const Icon = metric.icon;
                        return (
                          <div
                            key={i}
                            className="p-3 rounded-lg bg-bg-elev-2 border border/50 text-center group-hover:border-accent2/30 transition-colors"
                          >
                            <Icon className="h-4 w-4 mx-auto mb-1 text-accent2" />
                            <p className="text-xs font-semibold text-content">{metric.value}</p>
                            <p className="text-[10px] text-muted">{metric.label}</p>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 text-xs rounded-full bg-bg-elev-2 border border/50 text-muted">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Card className="max-w-2xl mx-auto border-accent/20 bg-gradient-to-br from-bg-elev-1 to-bg-elev-2 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-aurora-edge" />
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl bg-gradient-to-r from-content to-accent2 bg-clip-text text-transparent">
                  ¿Listo para tu próximo proyecto?
                </CardTitle>
                <CardDescription className="text-base">
                  Trabajemos juntos para crear algo extraordinario
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3 justify-center">
                  <Link
                    href="/play"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gold-ribbon text-accent-ink rounded-lg font-semibold hover:shadow-glow transition-all"
                  >
                    Empezar Brief Express
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}


