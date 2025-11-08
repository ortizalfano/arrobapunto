"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useContactModal } from "@/components/contact/contact-modal-provider";
import { useEffect, useRef, useState } from "react";

export function Navbar() {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const { open } = useContactModal();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border/50 bg-bg/80 backdrop-blur-md supports-[backdrop-filter]:bg-bg/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link
          href={`/${locale}`}
          className="text-2xl font-bold text-content hover:text-accent transition-colors"
        >
          @P
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link
            href={`/${locale}/services`}
            className="text-sm text-content/70 hover:text-accent transition-colors"
          >
            {t("services")}
          </Link>
          <HubMenu locale={locale} />
          <Link
            href={`/${locale}/studio`}
            className="text-sm text-content/70 hover:text-accent transition-colors"
          >
            {t("studio")}
          </Link>
          <Link
            href={`/${locale}/blog`}
            className="text-sm text-content/70 hover:text-accent transition-colors"
          >
            {t("blog")}
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" onClick={open}>
            {t("contact")}
          </Button>
      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu className="h-5 w-5" />
      </Button>
        </div>
      </div>
    </nav>
  );
}

function HubMenu({ locale }: { locale: string }) {
  const isEnglish = locale === "en";
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimeoutRef = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleOpen = () => {
    clearTimeoutRef();
    setOpen(true);
  };

  const handleDelayedClose = () => {
    clearTimeoutRef();
    timeoutRef.current = setTimeout(() => setOpen(false), 400);
  };

  useEffect(() => {
    return () => {
      clearTimeoutRef();
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={handleOpen}
      onMouseLeave={handleDelayedClose}
    >
      <button
        type="button"
        className="relative inline-flex items-center gap-2 overflow-hidden rounded-full px-4 py-1 text-sm font-medium text-white transition"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent via-accent2 to-accent opacity-80" />
        {isEnglish ? "Creator Hub" : "Hub para Creadores"}
        <span className="text-xs opacity-80">▾</span>
      </button>
      {open && (
        <div
          className="absolute left-0 top-full mt-3 w-56 overflow-hidden rounded-xl border border-white/10 bg-[#0B1116] shadow-lg"
          onMouseEnter={handleOpen}
          onMouseLeave={handleDelayedClose}
        >
          <Link
            href={`/${locale}/tools`}
            className="block px-4 py-2 text-sm text-content/70 hover:bg-white/5 hover:text-accent transition-colors"
            onClick={() => setOpen(false)}
          >
            {isEnglish ? "Tools" : "Herramientas"}
          </Link>
          <Link
            href={`/${locale}/plugins`}
            className="block px-4 py-2 text-sm text-content/70 hover:bg-white/5 hover:text-accent transition-colors"
            onClick={() => setOpen(false)}
          >
            Plugins
          </Link>
        </div>
      )}
    </div>
  );
}

