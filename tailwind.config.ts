import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: "#f4efe6",
        "aged-paper": "#ede6d8",
        moss: "#5c6b4d",
        forest: "#3f4f3a",
        rust: "#9b4b3f",
        "faded-brown": "#7a5a44",
        ink: "#2a2a2a",
        "warm-cream": "#faf6ee",
      },
      fontFamily: {
        heading: ["Playfair Display", "Cormorant", "EB Garamond", "serif"],
        body: ["Spectral", "Libre Baskerville", "serif"],
        handwritten: ["Caveat", "Kalam", "cursive"],
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "ink-draw": "inkDraw 1.2s ease-out forwards",
        "paper-slide": "paperSlide 0.5s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        inkDraw: {
          "0%": { strokeDashoffset: "100%" },
          "100%": { strokeDashoffset: "0%" },
        },
        paperSlide: {
          "0%": { opacity: "0", transform: "translateX(-10px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
