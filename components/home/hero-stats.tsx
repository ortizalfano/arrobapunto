"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

interface HeroStatsProps {
  locale: string;
}

function AnimatedNumber({ value, duration = 2000, prefix = "", suffix = "" }: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(easeOutQuart * value);

      setDisplayValue(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="inline-block">
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

export function HeroStats({ locale }: HeroStatsProps) {
  const isEnglish = locale === 'en';
  const stats = isEnglish
    ? [
        { label: "Projects delivered", value: 25, suffix: "+" },
        { label: "Client satisfaction", value: 100, suffix: "%" },
        { label: "Years of experience", value: 6, suffix: "+" },
      ]
    : [
  { label: "Proyectos", value: 25, suffix: "+" },
  { label: "Satisfacción", value: 100, suffix: "%" },
  { label: "Años", value: 6, suffix: "+" },
];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.2 }}
      className="flex flex-wrap justify-center gap-8 sm:gap-12 mt-8 pt-8 border-t border/20"
    >
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="text-3xl sm:text-4xl font-bold text-accent2 mb-2">
            <AnimatedNumber value={stat.value} suffix={stat.suffix} />
          </div>
          <div className="text-sm text-muted">{stat.label}</div>
        </div>
      ))}
    </motion.div>
  );
}




