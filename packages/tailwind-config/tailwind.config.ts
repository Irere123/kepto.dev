import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    fontFamily: {
      sans: [
        "Inter",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif",
      ],
      mono: ["Menlo", "Monaco", "Courier New", "monospace"],
    },
    colors: {
      primary: {
        bg: "var(--primary-bg)",
        fg: "var(--primary-fg)",
        "accents-1": "var(--primary-accents-1)",
        "accents-2": "var(--primary-accents-2)",
        "accents-3": "var(--primary-accents-3)",
        "accents-4": "var(--primary-accents-4)",
        "accents-5": "var(--primary-accents-5)",
        "accents-6": "var(--primary-accents-6)",
        "accents-7": "var(--primary-accents-7)",
        "accents-8": "var(--primary-accents-8)",
      },
      error: {
        lighter: "var(--error-lighter)",
        light: "var(--error-light)",
        DEFAULT: "var(--error)",
        dark: "var(--error-dark)",
      },
      success: {
        lighter: "var(--success-lighter)",
        light: "var(--success-light)",
        DEFAULT: "var(--success)",
        dark: "var(--success-dark)",
      },
      warning: {
        lighter: "var(--warning-lighter)",
        light: "var(--warning-light)",
        DEFAULT: "var(--warning)",
        dark: "var(--warning-dark)",
      },
      violet: {
        lighter: "var(--violet-lighter)",
        light: "var(--violet-light)",
        DEFAULT: "var(--violet)",
        dark: "var(--violet-dark)",
      },
      cyan: {
        lighter: "var(--cyan-lighter)",
        light: "var(--cyan-light)",
        DEFAULT: "var(--cyan)",
        dark: "var(--cyan-dark)",
      },
      highlight: {
        purple: "var(--highlight-purple)",
        magenta: "var(--highlight-magenta)",
        pink: "var(--highlight-pink)",
        yellow: "var(--highlight-yellow)",
      },
    },
    animation: {
      // Modal
      "scale-in": "scale-in 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
      "fade-in": "fade-in 0.3s ease-out forwards",
      // Input Select
      "input-select-slide-up":
        "input-select-slide-up 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
      "input-select-slide-down":
        "input-select-slide-down 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
      // Tooltip
      "slide-up-fade": "slide-up-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      "slide-right-fade": "slide-right-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      "slide-down-fade": "slide-down-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      "slide-left-fade": "slide-left-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      // Navigation menu
      "enter-from-right": "enter-from-right 0.25s ease",
      "enter-from-left": "enter-from-left 0.25s ease",
      "exit-to-right": "exit-to-right 0.25s ease",
      "exit-to-left": "exit-to-left 0.25s ease",
      "scale-in-content": "scale-in-content 0.2s ease",
      "scale-out-content": "scale-out-content 0.2s ease",
      // Accordion
      "accordion-down": "accordion-down 300ms cubic-bezier(0.87, 0, 0.13, 1)",
      "accordion-up": "accordion-up 300ms cubic-bezier(0.87, 0, 0.13, 1)",
      // Custom wiggle animation
      wiggle: "wiggle 0.75s infinite",
      // Custom spinner animation (for loading-spinner)
      spinner: "spinner 1.2s linear infinite",
      // Custom blink animation (for loading-dots)
      blink: "blink 1.4s infinite both",
    },
    keyframes: {
      // Modal
      "scale-in": {
        "0%": { transform: "scale(0.95)" },
        "100%": { transform: "scale(1)" },
      },
      "fade-in": {
        "0%": { opacity: "0" },
        "100%": { opacity: "1" },
      },
      // Input Select
      "input-select-slide-up": {
        "0%": { transform: "translateY(-342px)" },
        "100%": { transform: "translateY(-350px)" },
      },
      "input-select-slide-down": {
        "0%": { transform: "translateY(0px)" },
        "100%": { transform: "translateY(8px)" },
      },
      // Tooltip
      "slide-up-fade": {
        "0%": { opacity: "0", transform: "translateY(2px)" },
        "100%": { opacity: "1", transform: "translateY(0)" },
      },
      "slide-right-fade": {
        "0%": { opacity: "0", transform: "translateX(-2px)" },
        "100%": { opacity: "1", transform: "translateX(0)" },
      },
      "slide-down-fade": {
        "0%": { opacity: "0", transform: "translateY(-2px)" },
        "100%": { opacity: "1", transform: "translateY(0)" },
      },
      "slide-left-fade": {
        "0%": { opacity: "0", transform: "translateX(2px)" },
        "100%": { opacity: "1", transform: "translateX(0)" },
      },
      // Navigation menu
      "enter-from-right": {
        "0%": { transform: "translateX(200px)", opacity: "0" },
        "100%": { transform: "translateX(0)", opacity: "1" },
      },
      "enter-from-left": {
        "0%": { transform: "translateX(-200px)", opacity: "0" },
        "100%": { transform: "translateX(0)", opacity: "1" },
      },
      "exit-to-right": {
        "0%": { transform: "translateX(0)", opacity: "1" },
        "100%": { transform: "translateX(200px)", opacity: "0" },
      },
      "exit-to-left": {
        "0%": { transform: "translateX(0)", opacity: "1" },
        "100%": { transform: "translateX(-200px)", opacity: "0" },
      },
      "scale-in-content": {
        "0%": { transform: "rotateX(-30deg) scale(0.9)", opacity: "0" },
        "100%": { transform: "rotateX(0deg) scale(1)", opacity: "1" },
      },
      "scale-out-content": {
        "0%": { transform: "rotateX(0deg) scale(1)", opacity: "1" },
        "100%": { transform: "rotateX(-10deg) scale(0.95)", opacity: "0" },
      },
      // Accordion
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
      // Custom wiggle animation
      wiggle: {
        "0%, 100%": {
          transform: "translateX(0%)",
          transformOrigin: "50% 50%",
        },
        "15%": { transform: "translateX(-4px) rotate(-4deg)" },
        "30%": { transform: "translateX(6px) rotate(4deg)" },
        "45%": { transform: "translateX(-6px) rotate(-2.4deg)" },
        "60%": { transform: "translateX(2px) rotate(1.6deg)" },
        "75%": { transform: "translateX(-1px) rotate(-0.8deg)" },
      },
      // Custom spinner animation (for loading-spinner)
      spinner: {
        "0%": {
          opacity: "1",
        },
        "100%": {
          opacity: "0",
        },
      },
      // Custom blink animation (for loading-dots)
      blink: {
        "0%": {
          opacity: "0.2",
        },
        "20%": {
          opacity: "1",
        },
        "100%": {
          opacity: "0.2",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
export default config;
