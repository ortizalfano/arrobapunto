"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useContactModal } from "@/components/contact/contact-modal-provider";

export function FloatingCTA() {
  const [show, setShow] = useState(false);
  const { open } = useContactModal();

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPercent = 
            (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
          
          // Mostrar después del 30% del scroll
          setShow(scrollPercent > 30 && scrollPercent < 95);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 z-50 flex flex-col sm:flex-row gap-3 sm:items-center"
        >
          <Button
            onClick={scrollToTop}
            className="h-12 rounded-full shadow-glow bg-accent2 hover:bg-accent2/80 w-full sm:w-12 sm:px-0 font-semibold"
            aria-label="Volver arriba"
          >
            <span className="sm:hidden">Volver arriba</span>
            <span className="hidden sm:inline">↑</span>
          </Button>

          <Button
            variant="gold"
            className="shadow-glow w-full sm:w-auto justify-center"
            onClick={open}
          >
            Cotizar proyecto
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


