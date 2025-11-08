import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { locales, type Locale } from "@/lib/locales";
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

  const isLocale = (value: string): value is Locale => locales.includes(value as Locale);

  if (!isLocale(locale)) {
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

