import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        canvas: {
          light: "#FBF9F5",
          sand: "#F4EFE6",
          dark: "#0C0C0F",
          charcoal: "#16161C",
        },
        warm: {
          50: "#FAF7F2",
          100: "#F3ECE1",
          200: "#E6D9C5",
          300: "#D4C2A3",
          400: "#BEA77F",
          500: "#A88D61",
        },
        peach: {
          50: "#FFF6F3",
          100: "#FFE9E2",
          200: "#FFD4C6",
          300: "#FFB8A2",
          400: "#FF906E",
          500: "#F97316",
        },
        accent: {
          ember: "#E25822",
          terracotta: "#C85A32",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Plus Jakarta Sans", "sans-serif"],
        serif: ["var(--font-serif)", "Instrument Serif", "Georgia", "serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      borderRadius: {
        "3xl": "1.75rem",
        "4xl": "2.25rem",
      },
      boxShadow: {
        "glass-subtle": "0 8px 32px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.02)",
        "glass-card": "0 20px 40px -15px rgba(0, 0, 0, 0.06), 0 0 1px 1px rgba(255, 255, 255, 0.6) inset",
        "glow-peach": "0 0 40px -10px rgba(255, 144, 110, 0.25)",
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
