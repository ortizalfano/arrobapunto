"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";

// Carga logos nombrados como /public/logos/logo1.png, logo2.png, ...
const LOGO_COUNT = 6; // ajusta este número si añades más logos
const clients = Array.from({ length: LOGO_COUNT }, (_, i) => ({
  name: `Logo ${i + 1}`,
  logo: `/logos/logo${i + 1}.png`,
}));

export function TrustBar() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'es';
  const isEnglish = locale === 'en';

  return (
    <section className="py-12 bg-white text-black">
      <div className="container px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-10"
        >
          <span className="text-black">{isEnglish ? "Trusted " : "Confían "}</span>
          <span className="bg-gradient-to-r from-accent via-accent2 to-accent bg-clip-text text-transparent">
            {isEnglish ? "by leading teams" : "en nosotros"}
          </span>
        </motion.h2>
        <div className="flex flex-wrap items-center justify-center gap-12">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex items-center justify-center"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={120}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

