import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";
import { SITE_URL, METADATA_BASE } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ArrobaPunto.com - Diseño y Desarrollo Web Premium",
    template: "%s | ArrobaPunto.com",
  },
  applicationName: "ArrobaPunto.com",
  description: "Agencia de diseño y desarrollo web premium. Webs que venden con rendimiento de clase mundial.",
  keywords: ["diseño web", "desarrollo web", "SEO", "ecommerce", "branding"],
  authors: [{ name: "ArrobaPunto" }],
  creator: "ArrobaPunto",
  publisher: "ArrobaPunto.com",
  category: "technology",
  metadataBase: METADATA_BASE,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: "ArrobaPunto",
    title: "ArrobaPunto.com - Diseño y Desarrollo Web Premium",
    description: "Webs que venden. Diseño boutique con rendimiento de clase mundial.",
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
    description: "Webs que venden. Diseño boutique con rendimiento de clase mundial.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ArrobaPunto.com",
    url: SITE_URL,
    logo: `${SITE_URL}/logos/logo1.png`,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "hola@arrobapunto.com",
        areaServed: ["ES", "PA", "US"],
        availableLanguage: ["es", "en"],
      },
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ArrobaPunto.com",
    url: SITE_URL,
    inLanguage: "es",
  };

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0B0F14" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd, websiteJsonLd]),
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${manrope.variable} font-sans antialiased dark`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

