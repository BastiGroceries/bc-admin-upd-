import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
  prefix: "",
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
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Blood Cloud theme colors
        blood: {
          50: "hsl(var(--blood-50))",
          100: "hsl(var(--blood-100))",
          200: "hsl(var(--blood-200))",
          300: "hsl(var(--blood-300))",
          400: "hsl(var(--blood-400))",
          500: "hsl(var(--blood-500))",
          600: "hsl(var(--blood-600))",
          700: "hsl(var(--blood-700))",
          800: "hsl(var(--blood-800))",
          900: "hsl(var(--blood-900))",
        },
        neon: {
          red: "hsl(var(--neon-red))",
          blue: "hsl(var(--neon-blue))",
          purple: "hsl(var(--neon-purple))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backdropBlur: {
        'xs': '2px',
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "blood-drop": {
          "0%": {
            transform: "translateY(-100vh) scale(0.1)",
            opacity: "0"
          },
          "10%": {
            opacity: "1"
          },
          "90%": {
            transform: "translateY(calc(100vh + 100px)) scale(1)",
            opacity: "0.8"
          },
          "100%": {
            transform: "translateY(calc(100vh + 100px)) scale(1.2)",
            opacity: "0"
          },
        },
        "glitch": {
          "0%, 100%": {
            transform: "translate(0)",
            filter: "hue-rotate(0deg)"
          },
          "20%": {
            transform: "translate(-2px, 2px)",
            filter: "hue-rotate(90deg)"
          },
          "40%": {
            transform: "translate(-2px, -2px)",
            filter: "hue-rotate(180deg)"
          },
          "60%": {
            transform: "translate(2px, 2px)",
            filter: "hue-rotate(270deg)"
          },
          "80%": {
            transform: "translate(2px, -2px)",
            filter: "hue-rotate(360deg)"
          },
        },
        "neon-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 5px hsl(var(--neon-red)), 0 0 10px hsl(var(--neon-red)), 0 0 15px hsl(var(--neon-red))"
          },
          "50%": {
            boxShadow: "0 0 10px hsl(var(--neon-red)), 0 0 20px hsl(var(--neon-red)), 0 0 30px hsl(var(--neon-red))"
          },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "blood-drop": "blood-drop 3s ease-in infinite",
        "glitch": "glitch 2s infinite",
        "neon-pulse": "neon-pulse 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
