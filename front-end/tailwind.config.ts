import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#FF3850",
          dark: "#FF4D63",
        },
        yellow: {
          DEFAULT: "#FFD84D",
          50: "#FFFBF0",
          100: "#FFE7B3",
          200: "#FFD84D",
          dark: {
            DEFAULT: "#FFE066",
            50: "#1A1A0A",
            100: "#332D0A",
            200: "#FFE066",
          },
        },
        gray: {
          DEFAULT: "#2D2D2D",
          50: "#F7F7F7",
          100: "#E6E6E6",
          200: "#CCCCCC",
          300: "#B3B3B3",
          400: "#999999",
          500: "#808080",
          600: "#666666",
          700: "#4D4D4D",
          800: "#333333",
          900: "#2D2D2D",
          dark: {
            DEFAULT: "#E6E6E6",
            50: "#1A1A1A",
            100: "#2D2D2D",
            200: "#404040",
            300: "#4D4D4D",
            400: "#666666",
            500: "#808080",
            600: "#999999",
            700: "#B3B3B3",
            800: "#CCCCCC",
            900: "#E6E6E6",
          },
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 0.5s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
