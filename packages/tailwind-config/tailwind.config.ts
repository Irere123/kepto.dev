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
  },
  plugins: [require("tailwind-scrollbar")],
};
export default config;
