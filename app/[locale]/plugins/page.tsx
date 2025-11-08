import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Receipt, FolderKanban, Wrench, Sparkles } from "lucide-react";
import { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import { locales } from "@/lib/locales";

const products = [
  {
    icon: Receipt,
    title: "xInvoice",
    description: "Sistema de facturación inteligente para freelancers y pequeñas empresas",
    image: "/img/xInvoice-Plugin.jpg",
  },
  {
    icon: FolderKanban,
    title: "xProjects",
    description: "Gestión de proyectos con Kanban y herramientas colaborativas",
    image: "/img/xProjects-Plugin.jpg",
  },
  {
    icon: Wrench,
    title: "xLogin",
    description: "Plugin para rediseñar y personalizar la página de inicio de sesión de WordPress",
    image: "/img/xLogin-Plugin.jpg",
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonicalUrl = createCanonical(locale, "/plugins");

  return {
    title: "Plugins de WordPress y laboratorio digital",
    description:
      "Descubre los plugins experimentales de ArrobaPunto.com para automatización, facturación y experiencias personalizadas en WordPress.",
    alternates: {
      canonical: canonicalUrl,
      languages: buildAlternates("/plugins"),
    },
    openGraph: {
      title: "Plugins de WordPress y laboratorio digital",
      description:
        "Plugins experimentales para creadores: facturación inteligente, tableros de proyectos y flujos de login personalizados.",
      url: canonicalUrl,
    },
  };
}

export default async function PluginsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  const badgeText = "Plugins de WordPress";
  const titlePrimary = "Plugins";
  const titleAccent = "& Labs";
  const subtitle = "Plugins para WordPress, por desarrolladores para desarrolladores";

  const productsSchema = {
    "@context": "https://schema.org",
    "@graph": products.map((product) => ({
      "@type": "SoftwareApplication",
      name: product.title,
      operatingSystem: "WordPress",
      applicationCategory: "DeveloperApplication",
      description: product.description,
      offers: {
        "@type": "Offer",
        price: 0,
        priceCurrency: "USD",
        availability: "https://schema.org/PreOrder",
      },
      creator: {
        "@type": "Organization",
        name: "ArrobaPunto.com",
      },
    })),
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsSchema) }}
      />
      {/* Hero */}
      <section className="relative py-8 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent2/5 via-transparent to-accent/5" />
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent2/10 border border-accent2/20 mb-4">
                <Sparkles className="h-4 w-4 text-accent2" />
                <span className="text-sm text-accent2">{badgeText}</span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
              <span className="bg-gradient-to-r from-content via-accent2 to-content bg-clip-text text-transparent">
                {titlePrimary}{" "}
              </span>
              <span className="bg-gradient-to-r from-accent via-accent2 to-accent bg-clip-text text-transparent">
                {titleAccent}
              </span>
            </h1>
            <p className="text-xl text-muted max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-8 sm:py-12 bg-[#0D1217]">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => {
              const Icon = product.icon;
              return (
                <div key={product.title}>
                  <Card className="h-full group border border-accent2/20 bg-[#0D1217] relative overflow-hidden flex flex-col">
                    <div className="absolute top-0 left-0 right-0 h-px bg-aurora-edge opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>

                    <CardHeader>
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4">
                        <Icon className="h-7 w-7 text-accent2" />
                      </div>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <CardTitle className="text-2xl mb-2 group-hover:text-accent2 transition-colors">
                            {product.title}
                          </CardTitle>
                          <CardDescription className="text-base leading-relaxed">
                            {product.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="mt-auto">
                      <p className="text-sm text-muted-foreground font-medium">
                        En desarrollo
                      </p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
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






