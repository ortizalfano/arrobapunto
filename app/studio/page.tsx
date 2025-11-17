import { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import { StudioLanding } from "@/components/studio/studio-landing";

export const metadata: Metadata = {
  title: "Conoce nuestro estudio boutique",
  description:
    "Somos ArrobaPunto.com, un estudio boutique de diseño y desarrollo enfocado en experiencias digitales con rendimiento extremo.",
  alternates: {
    canonical: `${SITE_URL}/studio`,
  },
  openGraph: {
    title: "Conoce nuestro estudio boutique",
    description: "Cultura, valores e hitos de nuestro estudio distribuido en España, Panamá y Portugal.",
    url: `${SITE_URL}/studio`,
  },
};

export default function StudioPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "ArrobaPunto.com Studio",
    description:
      "Estudio boutique de diseño y desarrollo web especializado en experiencias premium y alto rendimiento.",
    url: `${SITE_URL}/studio`,
    mainEntity: {
      "@type": "Organization",
      name: "ArrobaPunto.com",
      address: [
        {
          "@type": "PostalAddress",
          streetAddress: "Calle Gran Vía, 28",
          addressLocality: "Madrid",
          addressCountry: "ES",
        },
        {
          "@type": "PostalAddress",
          streetAddress: "Calle 50, Torre B",
          addressLocality: "Panamá",
          addressCountry: "PA",
        },
      ],
      areaServed: ["Spain", "Latin America", "United States"],
    },
  };

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
      <StudioLanding />
    </div>
  );
}


