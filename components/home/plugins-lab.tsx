"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Receipt, FolderKanban, Wrench } from "lucide-react";
import { fadeUp, stagger, scaleIn } from "@/lib/motion";

const plugins = [
  {
    icon: Receipt,
    title: "xInvoice",
    description: "Gestión de facturas inteligente para freelancers y pequeñas empresas",
    href: "/plugins",
  },
  {
    icon: FolderKanban,
    title: "Projects",
    description: "Organiza tus proyectos con estilo y colaboración en tiempo real",
    href: "/plugins",
  },
  {
    icon: Wrench,
    title: "Tools",
    description: "Herramientas gratuitas para diseñadores y desarrolladores",
    href: "/tools",
  },
];

export function PluginsLab() {
  return (
    <section className="bg-bg-elev-2/30 py-10 pattern-dots">
      <div className="container px-4 sm:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-8"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-5xl font-display font-bold mb-4 text-content"
          >
            Plugins & Labs
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted max-w-2xl mx-auto text-lg">
            Productos propios diseñados para hacer tu vida más fácil
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plugins.map((plugin, index) => {
            const Icon = plugin.icon;
            return (
              <motion.div
                key={plugin.title}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={scaleIn}
                custom={index}
              >
                <Card className="h-full group">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent2/10 transition-colors">
                      <Icon className="h-6 w-6 text-accent group-hover:text-accent2 transition-colors" />
                    </div>
                    <CardTitle className="text-xl">{plugin.title}</CardTitle>
                    <CardDescription className="text-muted leading-relaxed">
                      {plugin.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={plugin.href}>Ver más</Link>
                    </Button>
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

