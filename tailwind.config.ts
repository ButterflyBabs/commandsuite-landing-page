import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        indigo: {
          DEFAULT: "#1F315B", // Deep Indigo
          deep: "#16233F",
        },
        plum: "#5E3B6C", // Royal Plum
        teal: "#2E7C83", // Sacred Teal
        gold: {
          DEFAULT: "#D4AF63", // Warm Gold
          soft: "#E4C888",
        },
        lavender: "#C9BEDD", // Soft Lavender
        ivory: "#FBF7EF", // Ivory
      },
      fontFamily: {
        serif: ["Fraunces", "Georgia", "Cambria", "serif"],
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        soft: "0 20px 60px -20px rgba(31, 49, 91, 0.35)",
        card: "0 10px 40px -12px rgba(31, 49, 91, 0.22)",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        fadeUp: "fadeUp 0.8s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
