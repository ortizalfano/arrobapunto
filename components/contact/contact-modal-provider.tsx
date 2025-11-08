"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { sendEmail } from "@/lib/email";

type ContactModalContextValue = {
  open: () => void;
  close: () => void;
};

const ContactModalContext = createContext<ContactModalContextValue | undefined>(undefined);

type ContactModalProviderProps = {
  children: React.ReactNode;
};

const serviceOptions = [
  { value: "web", label: "Desarrollo web" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "custom", label: "Desarrollo personalizado" },
  { value: "consulting", label: "Estrategia y consultoría" },
];

export function ContactModalProvider({ children }: ContactModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const contextValue = useMemo(() => ({ open, close }), [open, close]);

  return (
    <ContactModalContext.Provider value={contextValue}>
      {children}
      <ContactModal isOpen={isOpen} onClose={close} />
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (!context) {
    throw new Error("useContactModal must be used within a ContactModalProvider");
  }
  return context;
}

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const locale = "es";
  const [service, setService] = useState<string>(serviceOptions[0]?.value ?? "web");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasBudget, setHasBudget] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    if (!isOpen) {
      setService(serviceOptions[0]?.value ?? "web");
      setIsSubmitting(false);
      setHasBudget(false);
      setSubmitStatus("idle");
    }
  }, [isOpen]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = event.currentTarget;
      const formData = new FormData(form);

      const selectedService = serviceOptions.find((option) => option.value === service);

      const payload = {
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        service: selectedService?.label ?? service,
        message: String(formData.get("message") ?? ""),
        hasBudget: hasBudget ? "Sí" : "No",
        budgetRange: hasBudget ? String(formData.get("budgetRange") ?? "") : "Sin presupuesto definido",
        locale,
      };

      setIsSubmitting(true);
      setSubmitStatus("idle");

      try {
        await sendEmail("contact", payload);
        setSubmitStatus("success");
        form.reset();
        setService(serviceOptions[0]?.value ?? "web");
        setHasBudget(false);
        setTimeout(() => {
          onClose();
          setSubmitStatus("idle");
        }, 1200);
      } catch (error) {
        console.error("Error sending contact form:", error);
        setSubmitStatus("error");
      } finally {
        setIsSubmitting(false);
      }
    },
    [hasBudget, locale, onClose, service]
  );

  const serviceLabel = useMemo(() => "¿Qué servicio te interesa?", []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-xl rounded-3xl bg-bg-elev-2 border border-white/10 shadow-2xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Formulario de contacto"
          >
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/5 via-transparent to-white/5" />
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/70 transition hover:bg-white/20 hover:text-white"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative p-8 space-y-6">
              <header className="text-center space-y-2">
                <p className="inline-flex items-center gap-2 px-3 py-1 text-xs uppercase tracking-wider rounded-full border border-white/10 text-white/60">
                  Construyamos juntos
                </p>
                <h2 className="text-3xl font-semibold text-white">
                  Cuéntanos sobre tu idea
                </h2>
                <p className="text-sm text-white/70 max-w-lg mx-auto">
                  Compártenos algunos detalles y te responderemos en menos de un día hábil.
                </p>
              </header>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name" className="text-white/80">
                      Nombre completo
                    </Label>
                    <Input
                      id="contact-name"
                      name="name"
                      required
                      placeholder="Tu nombre"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email" className="text-white/80">
                      Email
                    </Label>
                    <Input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      placeholder="you@email.com"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-service" className="text-white/80">
                    {serviceLabel}
                  </Label>
                  <select
                    id="contact-service"
                    value={service}
                    name="service"
                    onChange={(event) => setService(event.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent2/50"
                  >
                    {serviceOptions.map((option) => (
                      <option key={option.value} value={option.value} className="bg-[#0B0F14] text-white">
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="inline-flex items-center gap-3 text-white/80 text-sm">
                    <input
                      type="checkbox"
                      name="hasBudget"
                      checked={hasBudget}
                      onChange={(event) => setHasBudget(event.target.checked)}
                      className="h-4 w-4 rounded border border-white/20 bg-white/10 text-accent focus:ring-accent"
                    />
                    ¿Tienes un presupuesto pensado?
                  </label>

                  {hasBudget && (
                    <select
                      name="budgetRange"
                      defaultValue="500-800"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent2/50"
                    >
                      <option value="500-800" className="bg-[#0B0F14] text-white">
                        $500 - $800 USD
                      </option>
                      <option value="800-1200" className="bg-[#0B0F14] text-white">
                        $800 - $1,200 USD
                      </option>
                      <option value="1200-1800" className="bg-[#0B0F14] text-white">
                        $1,200 - $1,800 USD
                      </option>
                      <option value="1800-3000" className="bg-[#0B0F14] text-white">
                        $1,800 - $3,000 USD
                      </option>
                    </select>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-message" className="text-white/80">
                    Cuéntanos sobre tu proyecto
                  </Label>
                  <Textarea
                    id="contact-message"
                    rows={5}
                    name="message"
                    required
                    placeholder="¿Qué te gustaría construir?"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-accent via-accent2 to-accent hover:shadow-lg hover:shadow-accent2/30"
                >
                  {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                </Button>
                {submitStatus === "success" && (
                  <p className="text-sm text-emerald-400 text-center">
                    Mensaje enviado correctamente.
                  </p>
                )}
                {submitStatus === "error" && (
                  <p className="text-sm text-red-400 text-center">
                    No pudimos enviar el mensaje. Inténtalo nuevamente.
                  </p>
                )}
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


