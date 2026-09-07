import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1320px",
      },
    },
    extend: {
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        sans: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        abyss: {
          950: "#050810",
          900: "#080c18",
          800: "#0c1220",
          700: "#111a2c",
          600: "#182238",
        },
        signal: {
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
        },
        current: {
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
        },
        champion: "#38bdf8",
        challenger: "#a78bfa",
        online: "#34d399",
        offline: "#fb7185",
        warn: "#fbbf24",
      },
      backgroundImage: {
        "grid-line":
          "linear-gradient(to right, rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.06) 1px, transparent 1px)",
        "hull-gradient":
          "radial-gradient(120% 120% at 10% 0%, rgba(14,165,233,0.16) 0%, rgba(5,8,16,0) 55%), radial-gradient(100% 100% at 90% 10%, rgba(34,211,238,0.12) 0%, rgba(5,8,16,0) 50%)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(2, 6, 23, 0.45)",
        glow: "0 0 40px -8px rgba(56, 189, 248, 0.45)",
        "glow-violet": "0 0 40px -8px rgba(167, 139, 250, 0.45)",
      },
      keyframes: {
        "drift-slow": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(3%, -4%) scale(1.05)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%": { transform: "scale(1.6)", opacity: "0" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fin-rise": {
          "0%": { transform: "translateY(12px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "drift-slow": "drift-slow 18s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.2s cubic-bezier(0.4,0,0.6,1) infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "fin-rise": "fin-rise 0.6s cubic-bezier(0.16,1,0.3,1) both",
      },
    },
  },
  plugins: [animate],
};

export default config;
