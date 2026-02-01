"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useContactModal } from "@/components/contact/contact-modal-provider";
import { useEffect, useRef, useState } from "react";

export function Navbar() {
  const { open } = useContactModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevenir scroll del body cuando el menú está abierto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border/50 bg-bg/80 backdrop-blur-md supports-[backdrop-filter]:bg-bg/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-2xl font-bold text-content hover:text-accent transition-colors">
            @P
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/services" className="text-sm text-content/70 hover:text-accent transition-colors">
              Servicios
            </Link>
            <HubMenu />
            <Link href="/studio" className="text-sm text-content/70 hover:text-accent transition-colors">
              Studio
            </Link>
            <Link href="/blog" className="text-sm text-content/70 hover:text-accent transition-colors">
              Blog
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" onClick={() => open()} className="hidden sm:inline-flex">
              Contacto
            </Button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-content/70 hover:bg-white/5 hover:text-content transition-colors md:hidden"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setMobileMenuOpen(true);
              }}
              aria-label="Abrir menú"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay oscuro - solo visible en móvil */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            closeMobileMenu();
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            closeMobileMenu();
          }}
          aria-hidden="true"
        />
      )}

      {/* Menú lateral móvil */}
      <div
        className={`fixed top-0 right-0 z-[70] h-full w-80 max-w-[85vw] transform bg-[#0E141B] border-l border-white/20 shadow-2xl transition-transform duration-300 ease-out md:hidden ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        style={{ pointerEvents: mobileMenuOpen ? "auto" : "none" }}
      >
        <div className="flex h-full flex-col">
          {/* Header del menú */}
          <div className="flex h-16 items-center justify-between border-b border/50 px-4">
            <span className="text-lg font-semibold text-content">Menú</span>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-content/70 hover:bg-white/5 hover:text-content transition-colors"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                closeMobileMenu();
              }}
              aria-label="Cerrar menú"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Contenido del menú */}
          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <div className="flex flex-col gap-1">
              <MobileNavLink href="/services" onClick={closeMobileMenu}>
                Servicios
              </MobileNavLink>

              {/* Hub para Creadores con submenú */}
              <div className="flex flex-col">
                <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-content/50">
                  Hub para Creadores
                </div>
                <MobileNavLink href="/tools" onClick={closeMobileMenu} className="pl-6">
                  Herramientas
                </MobileNavLink>
                <MobileNavLink href="/plugins" onClick={closeMobileMenu} className="pl-6">
                  Plugins
                </MobileNavLink>
              </div>

              <MobileNavLink href="/studio" onClick={closeMobileMenu}>
                Studio
              </MobileNavLink>

              <MobileNavLink href="/blog" onClick={closeMobileMenu}>
                Blog
              </MobileNavLink>
            </div>
          </nav>

          {/* Footer del menú con botón de contacto */}
          <div className="border-t border/50 p-4">
            <Button
              className="w-full"
              onClick={() => {
                closeMobileMenu();
                open();
              }}
            >
              Contacto
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

function MobileNavLink({
  href,
  onClick,
  children,
  className = "",
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block rounded-lg px-3 py-2.5 text-sm font-medium text-content/80 transition-colors hover:bg-white/5 hover:text-accent active:bg-white/10 ${className}`}
    >
      {children}
    </Link>
  );
}

function HubMenu() {
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
    <div className="relative" onMouseEnter={handleOpen} onMouseLeave={handleDelayedClose}>
      <button
        type="button"
        className="relative inline-flex items-center gap-2 overflow-hidden rounded-full px-4 py-1 text-sm font-medium text-white transition"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent via-accent2 to-accent opacity-80" />
        Hub para Creadores
        <span className="text-xs opacity-80">▾</span>
      </button>
      {open && (
        <div
          className="absolute left-0 top-full mt-3 w-56 overflow-hidden rounded-xl border border-white/10 bg-[#0B1116] shadow-lg"
          onMouseEnter={handleOpen}
          onMouseLeave={handleDelayedClose}
        >
          <Link
            href="/tools"
            className="block px-4 py-2 text-sm text-content/70 hover:bg-white/5 hover:text-accent transition-colors"
            onClick={() => setOpen(false)}
          >
            Herramientas
          </Link>
          <Link
            href="/plugins"
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
