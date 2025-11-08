"use client";

export function StatsSection() {
  const stats = [
    {
      value: "98",
      label: "Score de Pagespeed",
    },
    {
      value: "99",
      label: "SEO",
    },
    {
      value: "100%",
      label: "Satisfacción",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-transparent text-white relative">
      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/20" />
      
      <div className="container max-w-6xl px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-accent2 mb-2">
                {stat.value}
              </div>
              <div className="text-sm sm:text-base text-white/70 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


