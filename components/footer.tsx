"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { useContactModal } from "@/components/contact/contact-modal-provider";

export function Footer() {
  const locale = useLocale();
  const { open } = useContactModal();

  return (
    <footer className="border-t border/50 bg-bg-elev-2">
      <div className="container px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-4 text-content">ArrobaPunto</h3>
            <p className="text-sm text-muted leading-relaxed">
              Diseño y desarrollo web premium con rendimiento de clase mundial.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-content">Sedes</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-muted">Panamá 🇵🇦</li>
              <li className="text-muted">Madrid 🇪🇸</li>
              <li className="text-muted">Portugal 🇵🇹</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-content">Servicios</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`/${locale}/services`} className="text-muted hover:text-accent transition-colors">
                  Branding
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services`} className="text-muted hover:text-accent transition-colors">
                  Desarrollo Web
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services`} className="text-muted hover:text-accent transition-colors">
                  E-commerce
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services`} className="text-muted hover:text-accent transition-colors">
                  SEO & Marketing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-content">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`/${locale}/studio`} className="text-muted hover:text-accent transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={open}
                  className="text-muted hover:text-accent transition-colors"
                >
                  {locale === "en" ? "Contact" : "Contacto"}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border/50 text-center text-sm text-muted">
          © {new Date().getFullYear()} ArrobaPunto. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

