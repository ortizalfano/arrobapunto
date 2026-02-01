"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Users, MapPin, TrendingUp, Heart, Sparkles, Target, Zap } from "lucide-react";
import { useContactModal } from "@/components/contact/contact-modal-provider";
import Link from "next/link";
import { TrustBar } from "@/components/home/trust-bar";

const timeline = [
  {
    year: "2018",
    title: "Fundación",
    description:
      "Empezamos como un pequeño equipo con una visión clara: crear webs que realmente funcionen para nuestros clientes.",
    icon: Sparkles,
  },
  {
    year: "2020",
    title: "Expansión Internacional",
    description: "Apertura de oficina en Panamá para servir a clientes de LATAM y Estados Unidos.",
    icon: MapPin,
  },
  {
    year: "2021",
    title: "Primer Cliente Internacional",
    description: "Expandimos nuestros servicios a Estados Unidos, trabajando con startups tecnológicas.",
    icon: Target,
  },
  {
    year: "2022",
    title: "Hub de Herramientas",
    description: "Lanzamos nuestro hub gratuito de herramientas para la comunidad de desarrolladores.",
    icon: Zap,
  },
  {
    year: "2023",
    title: "100+ Proyectos Completados",
    description: "Alcanzamos un hito importante sirviendo a clientes de 10 países diferentes.",
    icon: TrendingUp,
  },
  {
    year: "2024",
    title: "Nuevos Horizontes",
    description: "Expandimos nuestra presencia con nuevas sedes y una comunidad creciente.",
    icon: Award,
  },
];

const values = [
  {
    title: "Rendimiento",
    description: "Cada pixel optimizado. Cada segundo cuenta.",
    icon: Zap,
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Diseño",
    description: "Belleza funcional que convierte visitantes en clientes.",
    icon: Sparkles,
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "Resultados",
    description: "No medimos likes, medimos crecimiento real.",
    icon: TrendingUp,
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    title: "Pasión",
    description: "Amamos lo que hacemos y se nota en cada proyecto.",
    icon: Heart,
    gradient: "from-amber-500/20 to-orange-500/20",
  },
];

const locations = [
  {
    city: "Madrid",
    country: "España",
    address: "Calle Gran Vía, 28",
    phone: "+34 910 123 456",
    timezone: "GMT+1",
    icon: "🇪🇸",
    color: "from-blue-500/20 to-indigo-500/20",
  },
  {
    city: "Panamá",
    country: "Panamá",
    address: "Calle 50, Torre B",
    phone: "+507 6334 5678",
    timezone: "GMT-5",
    icon: "🇵🇦",
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    city: "Lisboa",
    country: "Portugal",
    address: "Rua Augusta, 123",
    phone: "+351 910 123 456",
    timezone: "GMT+0",
    icon: "🇵🇹",
    color: "from-amber-500/20 to-orange-500/20",
  },
];

const stats = [
  { label: "Proyectos completados", value: "85+", icon: Target },
  { label: "Clientes satisfechos", value: "100%", icon: Heart },
  { label: "Años de experiencia", value: "6", icon: Award },
  { label: "Países", value: "10+", icon: MapPin },
];

export function StudioLanding() {
  const { open } = useContactModal();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-8 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent2/5 via-transparent to-accent/5" />
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent2/10 border border-accent2/20 mb-4">
                <Users className="h-4 w-4 text-accent2" />
                <span className="text-sm text-accent2">Nuestro Estudio</span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
              <span className="bg-gradient-to-r from-content via-accent2 to-content bg-clip-text text-transparent">
                Arte, código{" "}
              </span>
              <span className="bg-gradient-to-r from-accent via-accent2 to-accent bg-clip-text text-transparent">
                y resultados
              </span>
            </h1>
            <p className="text-xl text-muted max-w-2xl mx-auto leading-relaxed">
              Somos un equipo boutique de diseñadores y desarrolladores apasionados por crear experiencias digitales
              que realmente funcionen para tu negocio.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 sm:py-12 bg-gradient-muted pattern-dots">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label}>
                  <Card className="text-center border-accent/10 bg-gradient-to-br from-bg-elev-1 to-bg-elev-2 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 right-0 h-px bg-aurora-edge opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardHeader className="pb-3">
                      <div className="w-12 h-12 rounded-xl bg-accent2/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-accent2/20 transition-colors">
                        <Icon className="h-6 w-6 text-accent2" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-accent2 mb-1">{stat.value}</p>
                      <p className="text-sm text-muted">{stat.label}</p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="py-8 sm:py-12 bg-gradient-gold pattern-lines">
        <div className="container max-w-5xl">
          <div className="text-center mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
                <Heart className="h-4 w-4 text-accent" />
                <span className="text-sm text-accent">Nuestra Filosofía</span>
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold">
              <span className="bg-gradient-to-r from-content to-accent2 bg-clip-text text-transparent">Manifiesto Boutique</span>
            </h2>
          </div>

          <Card className="border-accent/20 bg-gradient-to-br from-bg-elev-1 to-bg-elev-2 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-aurora-edge" />
            <CardContent className="p-8 md:p-12">
              <div className="space-y-6 text-base md:text-lg leading-relaxed text-muted">
                <p className="text-xl font-semibold text-content mb-4">No somos una agencia tradicional.</p>
                <p>
                  Creamos <span className="text-accent2 font-semibold">experiencias digitales boutique</span> que combinan diseño
                  excepcional con rendimiento de clase mundial. Cada proyecto es único, cada detalle importa.
                </p>
                <p>
                  Creemos que <span className="text-accent font-semibold">la belleza y la funcionalidad</span> no son opuestos. Que
                  un sitio web debe ser tanto una obra de arte visual como una máquina de conversión perfectamente optimizada.
                </p>
                <p>Trabajamos con proyectos selectos, dando a cada uno el tiempo y atención que merece.</p>
                <p className="text-accent2 text-sm mt-6">
                  &ldquo;El diseño no es lo que ves, es lo que sientes.&rdquo;
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Values */}
      <section className="py-8 sm:py-12 pattern-grid">
        <div className="container max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold">
              <span className="bg-gradient-to-r from-content to-accent2 bg-clip-text text-transparent">Nuestros Valores</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title}>
                  <Card className="h-full group border-accent/10 bg-gradient-to-br from-bg-elev-1 to-bg-elev-2 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-px bg-aurora-edge opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardHeader>
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-4`}>
                        <Icon className="h-7 w-7 text-accent2" />
                      </div>
                      <CardTitle className="text-xl mb-2 group-hover:text-accent2 transition-colors">{value.title}</CardTitle>
                      <CardDescription className="text-base leading-relaxed">{value.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-8 sm:py-12 bg-gradient-accent pattern-dots">
        <div className="container max-w-5xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-2">
              <span className="bg-gradient-to-r from-content to-accent2 bg-clip-text text-transparent">Nuestro Viaje</span>
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">De un pequeño equipo a una agencia con presencia internacional</p>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent2/50 via-accent2/30 to-transparent hidden md:block" />

            <div className="space-y-8">
              {timeline.map((item, index) => {
                const Icon = item.icon;
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={item.year}
                    className={`relative group flex flex-col gap-4 md:gap-6 md:items-start ${isEven ? "md:flex-row" : "md:flex-row-reverse md:pr-0"}`}
                  >
                    <div className="relative z-10 flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-accent2/20 to-accent2/10 border-2 border-accent2/30 flex items-center justify-center mx-auto md:mx-0 transition-colors group-hover:border-accent2/50">
                      <Icon className="h-6 w-6 md:h-8 md:w-8 text-accent2" />
                    </div>

                    <div className={`flex-1 w-full ${isEven ? "md:pr-8" : "md:pl-8"}`}>
                      <Card className="border-accent/10 bg-gradient-to-br from-bg-elev-1 to-bg-elev-2 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 right-0 h-px bg-aurora-edge opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl font-bold text-accent2">{item.year}</span>
                            <span className="h-px flex-1 bg-accent2/20" />
                          </div>
                          <CardTitle className="text-xl mb-2 group-hover:text-accent2 transition-colors">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-base leading-relaxed">{item.description}</CardDescription>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-8 sm:py-12 bg-gradient-gold">
        <div className="container max-w-6xl">
          <div className="text-center mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent2/10 border border-accent2/20 mb-4">
                <MapPin className="h-4 w-4 text-accent2" />
                <span className="text-sm text-accent2">Nuestras Sedes</span>
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold">
              <span className="bg-gradient-to-r from-content to-accent2 bg-clip-text text-transparent">Oficinas Globales</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {locations.map((location) => (
              <div key={location.city}>
                <Card className="h-full group border-accent/10 bg-gradient-to-br from-bg-elev-1 to-bg-elev-2 relative overflow-hidden text-center">
                  <div className="absolute top-0 left-0 right-0 h-px bg-aurora-edge opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className={`aspect-video bg-gradient-to-br ${location.color} flex items-center justify-center text-6xl mb-4`}>
                    {location.icon}
                  </div>

                  <CardHeader>
                    <CardTitle className="text-2xl mb-2 group-hover:text-accent2 transition-colors">{location.city}</CardTitle>
                    <CardDescription className="text-base">{location.country}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted justify-center">
                      <MapPin className="h-4 w-4 text-accent2" />
                      {location.address}
                    </div>
                    <div className="text-sm text-muted">{location.timezone}</div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <TrustBar />

      {/* CTA */}
      <section className="py-8 sm:py-12">
        <div className="container max-w-4xl">
          <Card className="border-accent/20 bg-gradient-to-br from-bg-elev-1 to-bg-elev-2 relative overflow-hidden text-center">
            <div className="absolute top-0 left-0 right-0 h-px bg-aurora-edge" />
            <CardHeader className="p-8 md:p-12">
              <CardTitle className="text-2xl md:text-3xl mb-4 bg-gradient-to-r from-content to-accent2 bg-clip-text text-transparent">
                ¿Listo para trabajar juntos?
              </CardTitle>
              <CardDescription className="text-base max-w-2xl mx-auto mb-4">
                Cada proyecto es único. Cada cliente es especial. Trabajemos juntos para crear algo extraordinario.
              </CardDescription>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div>
                  <Link
                    href={`/es/play`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gold-ribbon text-accent-ink rounded-lg font-semibold hover:shadow-glow transition-all"
                  >
                    Empezar Brief Express
                  </Link>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => open()}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent2/10 hover:bg-accent2/20 text-accent2 font-semibold rounded-lg transition-all border border-accent2/20 hover:border-accent2/40"
                  >
                    Contactar
                  </button>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      </section>
    </div>
  );
}


