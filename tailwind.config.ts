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
        primary: {
          DEFAULT: "#6B2D6B",
          light: "#9B4F9B",
          dark: "#4A1A4A",
        },
        accent: {
          gold: "#D4AF6A",
          rose: "#E8A0A0",
          blush: "#F5D5D5",
        },
        teal: {
          deep: "#2C5F6A",
          light: "#4A8F9E",
          pale: "#A8D4DC",
        },
        cream: "#FAF6F1",
        midnight: "#0D0A14",
        "text-primary": "#1A1025",
        "text-light": "#F5F0FF",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        display: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        accent: ["Montserrat", "system-ui", "sans-serif"],
        script: ["Great Vibes", "cursive"],
      },
      backgroundImage: {
        "gradient-plum": "linear-gradient(135deg, #6B2D6B 0%, #0D0A14 100%)",
        "gradient-rose": "linear-gradient(135deg, #FAF6F1 0%, #F5D5D5 100%)",
        "gradient-teal": "linear-gradient(135deg, #2C5F6A 0%, #0D0A14 100%)",
        "gradient-gold":
          "linear-gradient(135deg, #D4AF6A 0%, #6B2D6B 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-in-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.8" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glow: "0 0 30px rgba(107, 45, 107, 0.4)",
        "glow-gold": "0 0 30px rgba(212, 175, 106, 0.3)",
        "glow-rose": "0 0 20px rgba(232, 160, 160, 0.3)",
        glass: "0 8px 32px rgba(31, 10, 49, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
