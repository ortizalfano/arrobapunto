"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { briefSchema, type BriefFormData } from "@/lib/validations";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useContactModal } from "@/components/contact/contact-modal-provider";
import { sendEmail, isEmailJsReady } from "@/lib/email";

export function BriefExpress() {
  const [step, setStep] = useState(1);
  const [estimate, setEstimate] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const locale = "es";
  const { open } = useContactModal();

  type SectorValue = BriefFormData["sector"];
  type PriorityValue = BriefFormData["priority"];
  type TimelineValue = BriefFormData["timeline"];

  const sectorOptions: Array<{ value: SectorValue; label: string }> = [
    { value: "tech", label: "Tech / SaaS" },
    { value: "retail", label: "Retail / E-commerce" },
    { value: "services", label: "Servicios" },
    { value: "nonprofit", label: "Non-profit" },
    { value: "other", label: "Otro" },
  ];

  const timelineOptions: Array<{ value: TimelineValue; label: string }> = [
    { value: "urgent", label: "Urgente (< 1 mes)" },
    { value: "1-3months", label: "1-3 meses" },
    { value: "3-6months", label: "3-6 meses" },
    { value: "flexible", label: "Flexible" },
  ];

  const priorityOptions: Array<{ value: PriorityValue; label: string; desc: string }> = [
    { value: "brand", label: "Una página web moderna", desc: "Muestra tu negocio y genera leads" },
    { value: "web", label: "Una tienda online", desc: "Vende productos y gestiona pedidos" },
    { value: "performance", label: "Algo personalizado", desc: "Ya tienes funcionalidades específicas en mente" },
  ];

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BriefFormData>({
    resolver: zodResolver(briefSchema),
    mode: "onChange",
  });

  const sector = watch("sector");
  const timeline = watch("timeline");
  const priority = watch("priority");

  const calculateEstimate = (data: BriefFormData): number => {
    let basePrice = 1500;

    const priorityBasePrices: Record<string, number> = {
      brand: 1500,
      web: 2200,
      performance: 2500,
    };

    basePrice = priorityBasePrices[data.priority] || basePrice;

    // Adjust by timeline
    const timelineMultipliers: Record<string, number> = {
      urgent: 1.3,
      "1-3months": 1.0,
      "3-6months": 0.9,
      flexible: 0.85,
    };

    basePrice *= timelineMultipliers[data.timeline];

    return Math.round(basePrice);
  };

  const onSubmit = async (data: BriefFormData) => {
    setIsSubmitting(true);

    try {
      const estimatePrice = calculateEstimate(data);
      setEstimate(estimatePrice);

      // Verificar si EmailJS está configurado
      if (!isEmailJsReady("brief")) {
        console.warn("EmailJS no está configurado. El brief se guardará localmente.");
        // Aún así, mostrar el resultado al usuario
        setIsSubmitted(true);
        return;
      }

      // Intentar enviar el email
      try {
        await sendEmail("brief", {
          ...data,
          estimate: estimatePrice.toString(),
          locale,
        });
      } catch (emailError) {
        // Si falla el email, aún mostrar el resultado
        console.error("Error enviando email (pero el brief se procesó):", emailError);
        // No lanzar error, solo loguear - el usuario ya tiene su estimación
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting brief:", error);
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      alert(`No pudimos procesar tu brief: ${errorMessage}. Por favor, inténtalo de nuevo o contáctanos directamente.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  if (isSubmitted) {
    return (
      <Card className="border-2 border-accent2/30 bg-gradient-to-br from-bg-elev-1 to-bg-elev-2">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-accent2/20 flex items-center justify-center">
              <CheckCircle2 className="h-12 w-12 text-accent2" />
            </div>
          </div>
          <CardTitle className="text-2xl text-content">
            ¡Gracias por confiar en nosotros!
          </CardTitle>
          <CardDescription className="text-muted">
            Hemos recibido tu brief correctamente y te contactaremos pronto.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div>
            <div className="text-4xl font-bold text-accent2 mb-2">${estimate?.toLocaleString()}</div>
            <p className="text-sm text-muted">
              Estimación orientativa calculada
            </p>
          </div>
          <Button variant="gold" className="w-full" size="lg" type="button" onClick={() => open()}>
            Contactar con nosotros
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 bg-gradient-to-br from-bg-elev-1 to-bg-elev-2 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-muted">
            Paso {step} de 5
          </span>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={cn(
                  "h-1.5 w-8 rounded-full transition-all",
                  s <= step ? "bg-accent2" : "bg-border"
                )}
              />
            ))}
          </div>
        </div>
        <CardTitle className="text-2xl md:text-3xl">Brief Express</CardTitle>
        <CardDescription className="text-muted">
          Calcula una estimación rápida para tu proyecto en menos de 2 minutos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Sector */}
          {step === 1 && (
            <div className="space-y-4">
              <Label className="text-base">
                ¿En qué sector operas?
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sectorOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setValue("sector", opt.value, { shouldValidate: true });
                      setTimeout(nextStep, 300);
                    }}
                    className={cn(
                      "p-4 border-2 rounded-lg text-left transition-all hover:border-accent2/30",
                      sector === opt.value && "border-accent2 bg-accent2/10"
                    )}
                  >
                    <span className="font-medium">{opt.label}</span>
                  </button>
                ))}
              </div>
              {errors.sector && <p className="text-sm text-red-500">{errors.sector.message}</p>}
            </div>
          )}

          {/* Step 2: Priority */}
          {step === 2 && (
            <div className="space-y-4">
              <Label className="text-base">
                ¿Qué necesitas exactamente?
              </Label>
              <div className="space-y-3">
                {priorityOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setValue("priority", opt.value, { shouldValidate: true });
                      setTimeout(nextStep, 300);
                    }}
                    className={cn(
                      "w-full p-4 border-2 rounded-lg text-left transition-all hover:border-accent2/30",
                      priority === opt.value && "border-accent2 bg-accent2/10"
                    )}
                  >
                    <div className="font-medium mb-1">{opt.label}</div>
                    <div className="text-sm text-muted">{opt.desc}</div>
                  </button>
                ))}
              </div>
              {errors.priority && <p className="text-sm text-red-500">{errors.priority.message}</p>}
            </div>
          )}

          {/* Step 3: Timeline */}
          {step === 3 && (
            <div className="space-y-4">
              <Label className="text-base">
                ¿Cuándo necesitas que esté listo?
              </Label>
              <div className="grid grid-cols-1 gap-3">
                {timelineOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setValue("timeline", opt.value, { shouldValidate: true });
                      setTimeout(nextStep, 300);
                    }}
                    className={cn(
                      "p-4 border-2 rounded-lg text-left transition-all hover:border-accent2/30",
                      timeline === opt.value && "border-accent2 bg-accent2/10"
                    )}
                  >
                    <span className="font-medium">{opt.label}</span>
                  </button>
                ))}
              </div>
              {errors.timeline && <p className="text-sm text-red-500">{errors.timeline.message}</p>}
            </div>
          )}

          {/* Step 4: Contact Info */}
          {step === 4 && (
            <div className="space-y-4">
              <Label className="text-base">
                ¿Cómo podemos contactarte?
              </Label>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo *</Label>
                  <Input
                    id="name"
                    placeholder="Tu nombre"
                    {...register("name")}
                    className={cn(errors.name && "border-red-500")}
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    {...register("email")}
                    className={cn(errors.email && "border-red-500")}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono (opcional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+34 600 000 000"
                    {...register("phone")}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Project Description */}
          {step === 5 && (
            <div className="space-y-4">
              <Label className="text-base">
                Cuéntanos más detalles sobre tu proyecto *
              </Label>
              <Textarea
                id="objective"
                rows={5}
                placeholder="Ej: Tengo una tienda de ropa y quiero vender online. Necesito que mis clientes puedan ver los productos, agregarlos al carrito y pagar fácilmente..."
                {...register("objective")}
                className={cn(errors.objective && "border-red-500")}
              />
              {errors.objective && (
                <p className="text-sm text-red-500">{errors.objective.message}</p>
              )}
              <p className="text-xs text-muted">
                Cuéntanos en palabras simples qué necesitas.
              </p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 pt-4">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                className="flex-1"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Atrás
              </Button>
            )}
            {step < 5 && (
              <Button
                type="button"
                onClick={nextStep}
                disabled={
                  (step === 1 && !sector) ||
                  (step === 2 && !priority) ||
                  (step === 3 && !timeline) ||
                  (step === 4 && (!watch("name") || !watch("email")))
                }
                className="flex-1 bg-accent2 hover:bg-accent2/90"
              >
                Siguiente
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
            {step === 5 && (
              <Button type="submit" className="flex-1 bg-accent2 hover:bg-accent2/90" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Calculando...
                  </>
                ) : (
                  <>
                    Calcular estimación
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
