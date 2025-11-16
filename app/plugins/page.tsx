import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

const products = [
  {
    title: "xInvoice",
    description: "Sistema de facturación inteligente para freelancers y pequeñas empresas",
    image: "/img/xInvoice-Plugin.jpg",
  },
  {
    title: "xProjects",
    description: "Gestión de proyectos con Kanban y herramientas colaborativas",
    image: "/img/xProjects-Plugin.jpg",
  },
  {
    title: "xLogin",
    description: "Plugin para rediseñar y personalizar la página de inicio de sesión de WordPress",
    image: "/img/xLogin-Plugin.jpg",
  },
];

export const metadata: Metadata = {
  title: "Plugins de WordPress y laboratorio digital",
  description:
    "Descubre los plugins experimentales de ArrobaPunto.com para automatización, facturación y experiencias personalizadas en WordPress.",
  alternates: {
    canonical: `${SITE_URL}/plugins`,
  },
  openGraph: {
    title: "Plugins de WordPress y laboratorio digital",
    description:
      "Plugins experimentales para creadores: facturación inteligente, tableros de proyectos y flujos de login personalizados.",
    url: `${SITE_URL}/plugins`,
  },
};

export default function PluginsPage() {
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productsSchema) }} />

      <section className="relative py-8 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent2/5 via-transparent to-accent/5" />
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent2/10 border border-accent2/20 mb-4">
                <Sparkles className="h-4 w-4 text-accent2" />
                <span className="text-sm text-accent2">Plugins de WordPress</span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
              <span className="bg-gradient-to-r from-content via-accent2 to-content bg-clip-text text-transparent">
                Plugins
              </span>
              <span className="bg-gradient-to-r from-accent via-accent2 to-accent bg-clip-text text-transparent">
                &amp; Labs
              </span>
            </h1>
            <p className="text-xl text-muted max-w-2xl mx-auto leading-relaxed">
              Plugins para WordPress, por desarrolladores para desarrolladores.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 bg-[#0D1217]">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.title} className="h-full group border border-accent2/20 bg-[#0D1217] relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-aurora-edge opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                </div>

                <CardHeader>
                  <div className="flex items-start gap-4 mb-4">
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
                  <p className="text-sm text-muted-foreground font-medium">En desarrollo</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}






