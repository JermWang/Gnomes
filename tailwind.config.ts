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
        "gnome-red": "#ff2b2b",
        "gnome-purple": "#7b3cff",
        "gnome-purple-light": "#a06bff",
        "gnome-yellow": "#ffe95c",
        "gnome-bg": "#f2f2f2",
        "gnome-dark": "#0b0b10",
      },
      fontFamily: {
        impact: ["Impact", "Arial Black", "sans-serif"],
        mono: ["Courier New", "monospace"],
        comic: ["Comic Sans MS", "cursive"],
        condensed: ["Arial Narrow", "sans-serif"],
      },
      animation: {
        blink: "blink 1s step-end infinite",
        marquee: "marquee 12s linear infinite",
        shake: "shake 0.5s ease-in-out",
        float: "float 3s ease-in-out infinite",
        pulse_orb: "pulse_orb 2s ease-in-out infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        shake: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-2deg)" },
          "75%": { transform: "rotate(2deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        pulse_orb: {
          "0%, 100%": { boxShadow: "0 0 20px 5px rgba(123, 60, 255, 0.4)" },
          "50%": { boxShadow: "0 0 40px 15px rgba(123, 60, 255, 0.8)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
