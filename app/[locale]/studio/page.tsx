import { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import { locales } from "@/lib/locales";
import { StudioLanding } from "@/components/studio/studio-landing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonicalUrl = createCanonical(locale, "/studio");

  return {
    title: "Conoce nuestro estudio boutique",
    description:
      "Somos ArrobaPunto.com, un estudio boutique de diseño y desarrollo enfocado en experiencias digitales con rendimiento extremo.",
    alternates: {
      canonical: canonicalUrl,
      languages: buildAlternates("/studio"),
    },
    openGraph: {
      title: "Conoce nuestro estudio boutique",
      description: "Cultura, valores e hitos de nuestro estudio distribuido en España, Panamá y Portugal.",
      url: canonicalUrl,
    },
  };
}

export default async function StudioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const canonicalUrl = createCanonical(locale, "/studio");

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "ArrobaPunto.com Studio",
    description:
      "Estudio boutique de diseño y desarrollo web especializado en experiencias premium y alto rendimiento.",
    url: canonicalUrl,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <StudioLanding locale={locale} />
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


