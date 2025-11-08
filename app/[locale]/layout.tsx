import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { locales } from "@/lib/locales";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactModalProvider } from "@/components/contact/contact-modal-provider";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Validate locale
  if (!locales.includes(locale as any)) {
    return null;
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ContactModalProvider>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      </ContactModalProvider>
    </NextIntlClientProvider>
  );
}

