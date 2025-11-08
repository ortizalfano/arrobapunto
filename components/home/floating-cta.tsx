"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useContactModal } from "@/components/contact/contact-modal-provider";
import { usePathname } from "next/navigation";

export function FloatingCTA() {
  const [show, setShow] = useState(false);
  const { open } = useContactModal();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'es';
  const isEnglish = locale === 'en';

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = 
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      // Mostrar después del 30% del scroll
      setShow(scrollPercent > 30 && scrollPercent < 95);
    };

    window.addEventListener("scroll", handleScroll);
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
          className="fixed bottom-6 right-6 z-50 flex gap-3"
        >
          <Button
            onClick={scrollToTop}
            size="icon"
            className="w-12 h-12 rounded-full shadow-glow bg-accent2 hover:bg-accent2/80"
            aria-label={isEnglish ? "Scroll back to top" : "Volver arriba"}
          >
            ↑
          </Button>

          <Button
            variant="gold"
            className="shadow-glow"
            onClick={open}
          >
            {isEnglish ? "Request a quote" : "Cotizar proyecto"}
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


