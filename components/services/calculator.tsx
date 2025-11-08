"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useContactModal } from "@/components/contact/contact-modal-provider";
import { sendEmail, isEmailJsReady } from "@/lib/email";
import { usePathname } from "next/navigation";

type Option = {
  id: string;
  label: string;
  description: string;
  price: number;
  weeks: number;
};

const projectOptions: Option[] = [
  {
    id: "marketing",
    label: "Marketing website",
    description: "Sitio informativo con foco en conversiones",
    price: 300,
    weeks: 1.5,
  },
  {
    id: "ecommerce",
    label: "E-commerce store",
    description: "Catálogo, checkout y pasarela de pago",
    price: 500,
    weeks: 2,
  },
  {
    id: "mobile",
    label: "Mobile app",
    description: "Experiencia completa para iOS/Android",
    price: 1500,
    weeks: 4,
  },
  {
    id: "custom",
    label: "Custom build",
    description: "Integraciones y lógica a medida",
    price: 700,
    weeks: 2,
  },
];

const pagesOptions: Option[] = [
  { id: "1-5", label: "1-5 páginas", description: "Landing o sitio compacto", price: 150, weeks: 0.5 },
  { id: "6-10", label: "6-10 páginas", description: "Sitio corporativo", price: 300, weeks: 0.5 },
  { id: "11-20", label: "11-20 páginas", description: "Contenido extenso", price: 600, weeks: 1 },
  { id: "20+", label: "20+ páginas", description: "Portal completo", price: 900, weeks: 1 },
];

const usersOptions: Option[] = [
  { id: "none", label: "Sin cuentas", description: "Contenido público", price: 0, weeks: 0 },
  { id: "login", label: "Login básico", description: "Registro y perfiles", price: 250, weeks: 0.2 },
  { id: "roles", label: "Roles avanzados", description: "Permisos y dashboards", price: 500, weeks: 1 },
];

const integrationsOptions: Option[] = [
  { id: "none", label: "Sin integraciones", description: "Todo in-house", price: 0, weeks: 0 },
  { id: "1-2", label: "1-2 integraciones", description: "Pago, CRM o newsletter", price: 600, weeks: 0.5 },
  { id: "3-5", label: "3-5 integraciones", description: "Automatizaciones avanzadas", price: 900, weeks: 1 },
  { id: "5+", label: "5+ integraciones", description: "Ecosistema completo", price: 1400, weeks: 1 },
];

const designOptions: Option[] = [
  { id: "standard", label: "Plantilla / estándar", description: "Basado en sistema existente", price: 0, weeks: 0 },
  { id: "premium", label: "Diseño premium", description: "UI personalizada", price: 250, weeks: 0.5 },
  { id: "boutique", label: "Experiencia boutique", description: "Motion y microinteracciones", price: 600, weeks: 0.5 },
];

const steps: Array<{
  id: keyof CalculatorState;
  title: string;
  subtitle: string;
  options: Option[];
}> = [
  {
    id: "project",
    title: "¿Qué tipo de proyecto necesitas?",
    subtitle: "Selecciona la opción que mejor se ajusta",
    options: projectOptions,
  },
  {
    id: "pages",
    title: "¿Cuántas páginas o vistas?",
    subtitle: "Un estimado nos ayuda a calcular el esfuerzo",
    options: pagesOptions,
  },
  {
    id: "users",
    title: "Gestión de usuarios",
    subtitle: "Define el nivel de autenticación",
    options: usersOptions,
  },
  {
    id: "integrations",
    title: "Integraciones externas",
    subtitle: "Selecciona cuántas integraciones necesitaremos",
    options: integrationsOptions,
  },
  {
    id: "design",
    title: "Experiencia de diseño",
    subtitle: "Personaliza el acabado visual",
    options: designOptions,
  },
];

type CalculatorState = {
  project?: Option;
  pages?: Option;
  users?: Option;
  integrations?: Option;
  design?: Option;
};

const marketingMin = { price: 1500, weeks: 2 };
const ecommerceMin = { price: 2200, weeks: 2 };
const customMin = { price: 2500, weeks: 2 };

export function Calculator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [state, setState] = useState<CalculatorState>({});
  const { openContact } = useContactModal();
  const [shareForm, setShareForm] = useState({ name: "", email: "" });
  const [shareStatus, setShareStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "es";
  const isEnglish = locale === "en";

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleSelect = (option: Option) => {
    const step = steps[currentStep];
    setState((prev) => ({ ...prev, [step.id]: option }));
    if (currentStep < steps.length - 1) {
      setTimeout(() => setCurrentStep((prev) => prev + 1), 150);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const reset = () => {
    setState({});
    setCurrentStep(0);
  };

  const { totalPrice, totalWeeks, minInfo, showTightBudget } = useMemo(() => {
    const entries = Object.values(state).filter(Boolean) as Option[];
    const basePrice = 1200; // punto de partida estimado
    const baseWeeks = 1.5;

    let price = basePrice;
    let weeks = baseWeeks;

    entries.forEach((entry) => {
      price += entry.price;
      weeks += entry.weeks;
    });

    const projectId = state.project?.id;
    let min = { price: 0, weeks: 0 };

    if (projectId === "marketing") {
      if (price < marketingMin.price) price = marketingMin.price;
      if (weeks < marketingMin.weeks) weeks = marketingMin.weeks;
      min = marketingMin;
    } else if (projectId === "ecommerce") {
      if (price < ecommerceMin.price) price = ecommerceMin.price;
      if (weeks < ecommerceMin.weeks) weeks = ecommerceMin.weeks;
      min = ecommerceMin;
    } else if (projectId === "custom") {
      if (price < customMin.price) price = customMin.price;
      if (weeks < customMin.weeks) weeks = customMin.weeks;
      min = customMin;
    }

    const showBudget = min.price > 0 && price <= min.price + 200;

    return {
      totalPrice: Math.round(price / 10) * 10,
      totalWeeks: Math.max(weeks, 1.5).toFixed(1),
      minInfo: min.price > 0 ? min : null,
      showTightBudget: showBudget,
    };
  }, [state]);

  const completed = steps.every((step) => state[step.id]);

  const current = steps[currentStep];
  const summarySelections = useMemo(() => {
    return steps
      .map((step) => {
        const selection = state[step.id];
        if (!selection) return null;
        return `${step.title}: ${selection.label}`;
      })
      .filter(Boolean)
      .join("\n");
  }, [state]);

  const handleShareEstimate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!completed) {
      return;
    }
    if (!shareForm.email) {
      setShareStatus("error");
      return;
    }

    setShareStatus("sending");
    try {
      await sendEmail("calculator", {
        name: shareForm.name || (isEnglish ? "No name" : "Sin nombre"),
        email: shareForm.email,
        selections: summarySelections || (isEnglish ? "No selections" : "Sin selecciones"),
        total_price: totalPrice.toString(),
        total_weeks: totalWeeks.toString(),
        project_type:
          state.project?.label ?? state.project?.id ?? (isEnglish ? "No project type" : "Sin proyecto"),
        has_tight_budget: showTightBudget ? "true" : "false",
        locale,
      });
      setShareForm({ name: "", email: "" });
      setShareStatus("success");
      setTimeout(() => setShareStatus("idle"), 2000);
    } catch (error) {
      console.error("Error sending calculator summary:", error);
      setShareStatus("error");
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0D1217] p-6 shadow-xl">
      <div className="mb-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Calculadora rápida</h3>
            <p className="text-sm text-white/60">
              Completa las opciones y obtén un estimado de inversión y tiempo.
            </p>
          </div>
          <div className="text-sm text-white/60">
            Paso {currentStep + 1} de {steps.length}
          </div>
        </div>
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-gradient-to-r from-accent via-accent2 to-accent" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h4 className="text-xl font-semibold text-white">{current.title}</h4>
          <p className="text-sm text-white/60">{current.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {current.options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelect(option)}
              className={cn(
                "group rounded-xl border border-white/10 bg-white/5 p-4 text-left transition-all",
                state[current.id]?.id === option.id && "border-accent2/60 bg-accent2/10 shadow-[0_0_0_1px_rgba(56,189,248,0.4)]"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-white">{option.label}</span>
                <span className="text-sm text-white/50">
                  +${option.price.toLocaleString()} · {option.weeks.toFixed(1)} semanas
                </span>
              </div>
              <p className="mt-2 text-sm text-white/60">{option.description}</p>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2 pt-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={handlePrev} disabled={currentStep === 0}>
              Anterior
            </Button>
            <Button variant="outline" onClick={reset}>
              Reiniciar
            </Button>
          </div>
        </div>
      </div>

      {completed && (
        <div className="mt-8 space-y-4 rounded-xl border border-white/10 bg-white/5 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-wide text-accent2">Estimación</p>
              <h4 className="text-2xl font-bold text-white">${totalPrice.toLocaleString()}</h4>
            </div>
            <div>
              <p className="text-sm uppercase tracking-wide text-accent2">Tiempo estimado</p>
              <h4 className="text-2xl font-bold text-white">{totalWeeks} semanas</h4>
            </div>
          </div>

          {minInfo && (
            <p className="text-xs text-white/50">
              Nuestros proyectos {state.project?.label?.toLowerCase()} parten desde ${minInfo.price.toLocaleString()} y {minInfo.weeks} semanas.
              Tu estimado se ajusta según las opciones seleccionadas.
            </p>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button className="flex-1" onClick={() => openContact()}>
              Solicitar presupuesto exacto
            </Button>
            <Button variant="ghost" className="flex-1" onClick={reset}>
              Calcular otro proyecto
            </Button>
          </div>

          {isEmailJsReady("calculator") && (
            <form
              onSubmit={handleShareEstimate}
              className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto]"
            >
              <Input
                placeholder={isEnglish ? "Your name" : "Tu nombre"}
                value={shareForm.name}
                onChange={(event) =>
                  setShareForm((prev) => ({ ...prev, name: event.target.value }))
                }
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
              <Input
                type="email"
                placeholder={isEnglish ? "you@email.com" : "tu@email.com"}
                value={shareForm.email}
                onChange={(event) =>
                  setShareForm((prev) => ({ ...prev, email: event.target.value }))
                }
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
              <Button
                type="submit"
                disabled={shareStatus === "sending"}
                className="whitespace-nowrap bg-white/10 hover:bg-white/20 border border-white/10"
              >
                {shareStatus === "sending"
                  ? isEnglish ? "Sending..." : "Enviando..."
                  : isEnglish ? "Send summary" : "Enviar resumen"}
              </Button>
              {shareStatus === "success" && (
                <p className="sm:col-span-3 text-sm text-emerald-400">
                  {isEnglish ? "Summary sent, check your inbox." : "Resumen enviado, revisa tu correo."}
                </p>
              )}
              {shareStatus === "error" && (
                <p className="sm:col-span-3 text-sm text-red-400">
                  {isEnglish
                    ? "We couldn't send the summary. Please try again."
                    : "No pudimos enviar el resumen. Intenta de nuevo."}
                </p>
              )}
            </form>
          )}

          {showTightBudget && (
            <Button
              variant="outline"
              className="w-full border-accent2/40 text-accent2 hover:bg-accent2/10"
              onClick={() => openContact()}
            >
              Tengo un presupuesto ajustado
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default Calculator;

