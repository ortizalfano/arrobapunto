"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  opacity: number;
  color: 'cyan' | 'white' | 'gold';
}

export function AnimatedStars() {
  const [stars, setStars] = useState<Star[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const newStars: Star[] = [];
    const colors: ('cyan' | 'white' | 'gold')[] = ['cyan', 'white', 'gold'];
    
    const baseCount =
      typeof window !== "undefined" && window.innerWidth > 1600 ? 260 : 200;
    // Aumentar 20% más de estrellas: baseCount * 1.15 * 1.20 = baseCount * 1.38
    const totalStars = Math.round(baseCount * 1.38);

    for (let i = 0; i < totalStars; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 0.6,
        duration: Math.random() * 25 + 8,
        opacity: Math.random() * 0.6 + 0.25,
        color,
      });
    }
    setStars(newStars);
  }, []);

  useEffect(() => {
    let ticking = false;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setMousePos({
            x: e.clientX,
            y: e.clientY,
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden z-[1] pointer-events-none">
      {stars.map((star) => {
        // Calcular posición relativa de la estrella
        const starAbsX = (star.x / 100) * (typeof window !== 'undefined' ? window.innerWidth : 1920);
        const starAbsY = (star.y / 100) * (typeof window !== 'undefined' ? window.innerHeight : 1080);
        
        // Calcular distancia al mouse
        const dx = mousePos.x - starAbsX;
        const dy = mousePos.y - starAbsY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 240;
        
        // Calcular fuerza de repulsión
        let repelX = 0;
        let repelY = 0;
        if (distance < maxDistance && distance > 0) {
          const force = (1 - distance / maxDistance) * 40;
          repelX = -(force * (dx / distance));
          repelY = -(force * (dy / distance));
        }

        // Definir colores y efectos según el tipo de estrella
        const getStarStyle = (color: string) => {
          switch (color) {
            case 'cyan':
              return {
                background: `radial-gradient(circle, rgba(144, 243, 230, 0.9) 0%, rgba(144, 243, 230, 0.3) 50%, transparent 100%)`,
                boxShadow: `0 0 ${star.size * 3}px rgba(144, 243, 230, 0.6)`,
              };
            case 'white':
              return {
                background: `radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)`,
                boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.4)`,
              };
            case 'gold':
              return {
                background: `radial-gradient(circle, rgba(232, 220, 199, 0.9) 0%, rgba(232, 220, 199, 0.3) 50%, transparent 100%)`,
                boxShadow: `0 0 ${star.size * 3}px rgba(232, 220, 199, 0.5)`,
              };
            default:
              return {
                background: `radial-gradient(circle, rgba(144, 243, 230, 0.9) 0%, rgba(144, 243, 230, 0.3) 50%, transparent 100%)`,
                boxShadow: `0 0 ${star.size * 3}px rgba(144, 243, 230, 0.6)`,
              };
          }
        };

        const starStyle = getStarStyle(star.color);

        return (
          <motion.div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              ...starStyle,
            }}
            animate={{
              x: repelX,
              y: repelY,
              opacity: star.opacity,
              scale: [1, 1.1, 1], // Pequeño pulso
            }}
            transition={{
              x: { type: "spring", stiffness: 400, damping: 30 },
              y: { type: "spring", stiffness: 400, damping: 30 },
              opacity: { duration: 0.3 },
              scale: { 
                duration: star.duration * 0.1, 
                repeat: Infinity, 
                ease: "easeInOut" 
              },
            }}
          />
        );
      })}
    </div>
  );
}

