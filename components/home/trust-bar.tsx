"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Carga logos nombrados como /public/logos/logo1.png, logo2.png, ...
const LOGO_COUNT = 6; // ajusta este número si añades más logos
const clients = Array.from({ length: LOGO_COUNT }, (_, i) => ({
  name: `Logo ${i + 1}`,
  logo: `/logos/logo${i + 1}.png`,
}));

export function TrustBar() {
  return (
    <section className="py-10 sm:py-12 bg-white text-black">
      <div className="container px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-10"
        >
          <span className="text-black">Confían </span>
          <span className="bg-gradient-to-r from-accent via-accent2 to-accent bg-clip-text text-transparent">
            en nosotros
          </span>
        </motion.h2>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex items-center justify-center"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={120}
                height={40}
                className="h-8 sm:h-10 w-auto object-contain opacity-80"
                loading="lazy"
                fetchPriority={index < 3 ? "high" : "low"}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

