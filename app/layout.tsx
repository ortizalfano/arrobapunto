import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactModalProvider } from "@/components/contact/contact-modal-provider";
import Script from "next/script";
import { SITE_URL, METADATA_BASE } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: {
    default: "ArrobaPunto.com - Diseño y Desarrollo Web Premium en España y Panamá",
    template: "%s | ArrobaPunto.com",
  },
  applicationName: "ArrobaPunto.com",
  description: "Agencia boutique de diseño y desarrollo web premium. Especialistas en páginas web de alto rendimiento, aplicaciones móviles y SEO técnico en España y Panamá. Webs que venden con diseño de clase mundial.",
  keywords: [
    "diseño web", 
    "desarrollo web", 
    "páginas web España", 
    "páginas web Panamá", 
    "cómo hacer una página web", 
    "diseño aplicaciones móviles", 
    "desarrollo de apps",
    "SEO técnico", 
    "ecommerce premium", 
    "branding digital"
  ],
  authors: [{ name: "ArrobaPunto" }],
  creator: "ArrobaPunto",
  publisher: "ArrobaPunto.com",
  category: "technology",
  metadataBase: METADATA_BASE,
  alternates: {
    canonical: SITE_URL,
    languages: {
      "es-ES": SITE_URL,
      "es-PA": SITE_URL,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: "ArrobaPunto",
    title: "ArrobaPunto.com - Diseño y Desarrollo Web Premium",
    description: "Creamos las mejores páginas web y aplicaciones móviles en España y Panamá. Rendimiento extremo y SEO para dominar Google y buscadores de IA.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "ArrobaPunto.com - Diseño y Desarrollo Web Premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ArrobaPunto.com - Diseño y Desarrollo Web Premium",
    description: "Diseño boutique, rendimiento de clase mundial y SEO estratégico para tu negocio en España y Panamá.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/icon-192.png",
  },
  verification: {
    google: "82Z8jOT0x633_NGB2urdazXCuMdS5w5Fnl4y-Crrx-o",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ArrobaPunto.com",
    "alternateName": "ArrobaPunto",
    "url": SITE_URL,
    "logo": `${SITE_URL}/logos/logo1.png`,
    "sameAs": [
      "https://www.instagram.com/arrobapunto",
      "https://www.linkedin.com/company/arrobapunto"
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "sales",
        "email": "hola@arrobapunto.com",
        "areaServed": ["ES", "PA", "US"],
        "availableLanguage": ["es", "en"],
      },
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "ArrobaPunto - Diseño y Desarrollo Web",
    "image": `${SITE_URL}/og-image.svg`,
    "url": SITE_URL,
    "telephone": "",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Madrid",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoShape",
      "addressCountry": ["ES", "PA"]
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "priceRange": "$$$",
    "description": "Expertos en diseño y desarrollo de páginas web premium y aplicaciones móviles en España y Panamá."
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ArrobaPunto.com",
    "url": SITE_URL,
    "inLanguage": "es",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SITE_URL}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0B0F14" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="ArrobaPunto" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#0B0F14" />
        <meta name="msapplication-tap-highlight" content="no" />

        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icon-192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icon-192.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icon-192.png" />

        {/* Preconnect para recursos críticos */}
        {/* Preconnect para analytics (si se usa) */}
        <link rel="dns-prefetch" href="https://plausible.io" />
        {/* Preload de fuentes críticas */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd, websiteJsonLd, serviceJsonLd]),
          }}
        />
        {/* Google Tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-736336184"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-736336184');
          `}
        </Script>
      </head>
      <body suppressHydrationWarning className={`${inter.variable} ${manrope.variable} font-sans antialiased dark`}>
        <ThemeProvider>
          <ContactModalProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </ContactModalProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

