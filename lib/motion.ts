export const fadeUp = {
  initial: { y: 12, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.38, ease: [0.2, 0.8, 0.2, 1] },
  },
};

export const scaleIn = {
  initial: { scale: 0.98, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
  },
};

export const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

export const hoverLift = {
  whileHover: {
    y: -2,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  whileTap: {
    y: 0,
    transition: { duration: 0.1 },
  },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
};

export const slideIn = {
  initial: { x: -20, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
};










