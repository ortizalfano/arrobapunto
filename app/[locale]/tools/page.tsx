import { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import { locales } from "@/lib/locales";
import { ToolsLanding } from "@/components/tools/tools-landing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonicalUrl = createCanonical(locale, "/tools");

  return {
    title: "Herramientas gratuitas para creadores",
    description:
      "Compresor de imágenes, formatter, generador de gradientes y más utilidades diseñadas para diseñadores y desarrolladores.",
    alternates: {
      canonical: canonicalUrl,
      languages: buildAlternates("/tools"),
    },
    openGraph: {
      title: "Herramientas gratuitas para creadores",
      description:
        "Utilidades gratuitas para tu flujo de trabajo: optimiza imágenes, formatea código y prototipa gradientes.",
      url: canonicalUrl,
    },
  };
}

export default async function ToolsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const toolsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Compresor de Imágenes",
        description: "Optimiza y convierte imágenes web en segundos.",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Formatter Express",
        description: "Formatea y minifica JSON, CSS y JS con un clic.",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Generador de Gradients",
        description: "Crea gradientes y glassmorphism listos para usar.",
      },
    ],
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsSchema) }}
      />
      <ToolsLanding locale={locale} />
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

