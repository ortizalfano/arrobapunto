import { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import { ToolsLanding } from "@/components/tools/tools-landing";

export const metadata: Metadata = {
  title: "Herramientas gratuitas para creadores",
  description:
    "Compresor de imágenes, generador de códigos QR, formatter, generador de gradientes y más utilidades diseñadas para diseñadores y desarrolladores. 100% gratuito y sin registros.",
  alternates: {
    canonical: `${SITE_URL}/tools`,
  },
  openGraph: {
    title: "Herramientas gratuitas para creadores",
    description:
      "Utilidades gratuitas para tu flujo de trabajo: optimiza imágenes, genera códigos QR, formatea código y prototipa gradientes.",
    url: `${SITE_URL}/tools`,
  },
  keywords: [
    "herramientas gratuitas",
    "generador QR",
    "compresor imágenes",
    "formatter código",
    "generador gradientes",
    "utilidades desarrolladores",
    "herramientas diseño",
  ],
};

export default function ToolsPage() {
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
      {
        "@type": "ListItem",
        position: 4,
        name: "Generador de Códigos QR",
        description: "Crea códigos QR personalizados para URLs o texto. Descarga en PNG o SVG.",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Compresor de PDFs",
        description: "Optimiza y reduce el tamaño de tus PDFs sin perder calidad.",
      },
    ],
  };

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsSchema) }} />
      <ToolsLanding />
    </div>
  );
}

