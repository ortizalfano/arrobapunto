"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Sparkles, Zap, TrendingUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { fadeUp, stagger, scaleIn } from "@/lib/motion";
import { useContactModal } from "@/components/contact/contact-modal-provider";

const servicesEn = [
  {
    title: "Marketing website",
    icon: Zap,
    description: "Modern, fast, and scalable websites.",
    features: [
      "Next.js 15 optimized",
      "Full technical SEO setup",
      "Performance scores 95+",
      "PWA ready",
    ],
    price: "From $1,500",
    gradient: "from-blue-500/10 to-cyan-500/10",
  },
  {
    title: "E-commerce",
    icon: TrendingUp,
    description: "Stores built to convert.",
    features: [
      "Optimized checkout experience",
      "Payments integration",
      "Inventory management",
      "Advanced analytics",
    ],
    price: "From $2,200",
    gradient: "from-emerald-500/10 to-teal-500/10",
  },
  {
    title: "Custom development",
    icon: CheckCircle2,
    description: "Tailored builds for unique requirements.",
    features: [
      "Personalized consulting",
      "Custom feature development",
      "Systems integration",
      "Ongoing support",
    ],
    price: null,
    gradient: "from-amber-500/10 to-orange-500/10",
  },
];

const servicesEs = [
  {
    title: "Desarrollo web",
    icon: Zap,
    description: "Webs modernas, rápidas y escalables.",
    features: [
      "Next.js 15 optimizado",
      "SEO técnico completo",
      "Performance 95+",
      "PWA lista",
    ],
    price: "Desde $1,500",
    gradient: "from-blue-500/10 to-cyan-500/10",
  },
  {
    title: "E-commerce",
    icon: TrendingUp,
    description: "Tiendas que convierten.",
    features: [
      "Checkout optimizado",
      "Integración de pagos",
      "Gestión de inventario",
      "Analytics avanzado",
    ],
    price: "Desde $2,200",
    gradient: "from-emerald-500/10 to-teal-500/10",
  },
  {
    title: "Desarrollo personalizado",
    icon: CheckCircle2,
    description: "Proyectos a medida según tus necesidades.",
    features: [
      "Consultoría personalizada",
      "Desarrollo a medida",
      "Integración de sistemas",
      "Soporte continuo",
    ],
    price: null,
    gradient: "from-amber-500/10 to-orange-500/10",
  },
];

export function ServicesPreview() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'es';
  const isEnglish = locale === 'en';
  const services = isEnglish ? servicesEn : servicesEs;
  const badgeText = isEnglish ? "Our services" : "Nuestros servicios";
  const titlePrimary = isEnglish ? "Solutions" : "Soluciones";
  const titleAccent = isEnglish ? "that scale" : "que escalan";
  const subtitle = isEnglish
    ? "Every service is designed to drive measurable results."
    : "Cada servicio está diseñado para impulsar resultados medibles.";
  const { open } = useContactModal();
  
  return (
    <section className="py-12 sm:py-16 bg-transparent relative text-white">
      <div className="container max-w-6xl relative z-10">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-8"
        >
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-white" />
              <span className="text-sm text-white font-medium">{badgeText}</span>
            </div>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4"
          >
            <span className="text-white">
              {titlePrimary}{" "}
            </span>
            <span className="bg-gradient-to-r from-white via-accent2/80 to-white bg-clip-text text-transparent">
              {titleAccent}
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-white/70 max-w-2xl mx-auto font-medium">
            {subtitle}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={scaleIn}
                custom={index}
                className="relative p-[2px] rounded-[16px] bg-gradient-to-br from-[#90F3E6]/60 via-[#E8DCC7]/40 to-[#D7B980]/60 bg-[length:200%_200%] animate-gradient-shift group"
              >
                <Card className={`h-full relative z-10 border border-white/10 bg-white/5 rounded-[14px] shadow-lg backdrop-blur-sm`}>
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4`}>
                      <Icon className="h-7 w-7 text-accent2" />
                    </div>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl mb-2 text-white group-hover:text-accent2 transition-colors">
                          {service.title}
                        </CardTitle>
                        <p className="text-white/70 leading-relaxed">{service.description}</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-white/70">
                          <CheckCircle2 className="h-4 w-4 text-accent2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4 border-t border-white/10">
                      {service.price && (
                        <p className="text-2xl font-bold text-accent mb-3">{service.price}</p>
                      )}
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        {service.price ? (
                          <button
                            type="button"
                            onClick={open}
                            className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all border border-white/20 hover:border-white/40"
                          >
                            {isEnglish ? "Request a quote" : "Solicitar presupuesto"}
                          </button>
                        ) : (
                        <Link
                            href={`/${locale}/play`}
                            className="block text-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all border border-white/20 hover:border-white/40"
                        >
                            {isEnglish ? "Start Brief Express" : "Crear Brief Express"}
                        </Link>
                        )}
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

