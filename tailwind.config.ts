import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-elev-1": "var(--bg-elev-1)",
        "bg-elev-2": "var(--bg-elev-2)",
        content: "var(--content)",
        muted: "var(--muted)",
        border: "var(--border)",
        accent: "var(--accent)",
        accent2: "var(--accent-2)",
        "accent-ink": "var(--accent-ink)",
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
        xl: "var(--radius-xl)",
        pill: "999px",
      },
      boxShadow: {
        soft: "var(--shadow-1)",
        deep: "var(--shadow-2)",
        glow: "var(--shadow-glow)",
      },
      backgroundImage: {
        "gold-ribbon": "linear-gradient(100deg, #F6EFD7, #EBD8B5 38%, #D7B980 70%, #BFA167)",
        "noir-mist": "radial-gradient(1200px 600px at 50% -300%, #12202C 0%, #0B0F14 55%)",
        "aurora-edge": "linear-gradient(180deg, rgba(144, 243, 230, 0.8), rgba(144, 243, 230, 0))",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-geist)", "var(--font-manrope)", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;

