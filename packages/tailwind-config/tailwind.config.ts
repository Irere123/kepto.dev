import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        xl: `calc(var(--radius) + 4px)`,
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
    },
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
    animation: {
      // Modal
      "scale-in": "scale-in 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
      "fade-in": "fade-in 0.3s ease-out forwards",

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
