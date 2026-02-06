import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      // ==========================================
      // Custom Colors
      // ==========================================
      colors: {
        // Primary Colors
        "stark-bg": "#050505",
        "stark-card": "rgba(255, 255, 255, 0.03)",
        "arc-cyan": "#00F0FF",
        "jarvis-orange": "#FF9900",
        cyan: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
          950: "#083344",
        },
        purple: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87",
          950: "#3b0764",
        },
        pink: {
          50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fbcfe8",
          300: "#f9a8d4",
          400: "#f472b6",
          500: "#ec4899",
          600: "#db2777",
          700: "#be185d",
          800: "#9d174d",
          900: "#831843",
          950: "#500724",
        },
        indigo: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b",
        },
        // Background Colors
        dark: {
          DEFAULT: "#030712",
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#030712",
        },
        light: {
          DEFAULT: "#f8fafc",
          50: "#030712",
          100: "#0f172a",
          200: "#1e293b",
          300: "#334155",
          400: "#475569",
          500: "#64748b",
          600: "#94a3b8",
          700: "#cbd5e1",
          800: "#e2e8f0",
          900: "#f1f5f9",
          950: "#f8fafc",
        },
        // Accent Colors for special effects
        neon: {
          cyan: "#00ffff",
          purple: "#bf00ff",
          pink: "#ff00ff",
          blue: "#0080ff",
        },
        // Glass colors
        glass: {
          white: "rgba(255, 255, 255, 0.05)",
          dark: "rgba(0, 0, 0, 0.5)",
          border: "rgba(255, 255, 255, 0.1)",
        },
      },

      // ==========================================
      // Custom Fonts
      // ==========================================
      fontFamily: {
        space: ["var(--font-space)", "Space Grotesk", "sans-serif"],
        inter: ["var(--font-inter)", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        heading: ["var(--font-space)", "Space Grotesk", "sans-serif"],
        serif: ["var(--font-serif)", "Playfair Display", "serif"],
      },

      // ==========================================
      // Custom Animations
      // ==========================================
      animation: {
        // Float animations
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "float-fast": "float-fast 4s ease-in-out infinite",
        "float-reverse": "float-reverse 7s ease-in-out infinite",

        // Glow animations
        glow: "glow 2s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "glow-slow": "glow-slow 4s ease-in-out infinite",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",

        // Shimmer animations
        shimmer: "shimmer 2s linear infinite",
        "shimmer-slow": "shimmer-slow 3s linear infinite",

        // Spin animations
        "spin-slow": "spin 20s linear infinite",
        "spin-slower": "spin 30s linear infinite",
        "spin-reverse": "spin-reverse 15s linear infinite",

        // Bounce animations
        "bounce-slow": "bounce-slow 3s ease-in-out infinite",
        "bounce-soft": "bounce-soft 2s ease-in-out infinite",

        // Fade animations
        "fade-in": "fade-in 0.5s ease-out forwards",
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
        "fade-in-down": "fade-in-down 0.5s ease-out forwards",
        "fade-in-left": "fade-in-left 0.5s ease-out forwards",
        "fade-in-right": "fade-in-right 0.5s ease-out forwards",

        // Slide animations
        "slide-up": "slide-up 0.5s ease-out forwards",
        "slide-down": "slide-down 0.5s ease-out forwards",
        "slide-left": "slide-left 0.5s ease-out forwards",
        "slide-right": "slide-right 0.5s ease-out forwards",

        // Scale animations
        "scale-in": "scale-in 0.3s ease-out forwards",
        "scale-out": "scale-out 0.3s ease-out forwards",
        "scale-pulse": "scale-pulse 2s ease-in-out infinite",

        // Special effects
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-ring": "pulse-ring 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
        flicker: "flicker 4s linear infinite",
        "gradient-shift": "gradient-shift 3s ease infinite",
        "text-reveal": "text-reveal 1s ease-out forwards",
        wiggle: "wiggle 1s ease-in-out infinite",
      },

      keyframes: {
        // Float keyframes
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "25%": { transform: "translateY(-10px) rotate(1deg)" },
          "50%": { transform: "translateY(-20px) rotate(0deg)" },
          "75%": { transform: "translateY(-10px) rotate(-1deg)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-30px)" },
        },
        "float-fast": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "float-reverse": {
          "0%, 100%": { transform: "translateY(-20px)" },
          "50%": { transform: "translateY(0)" },
        },

        // Glow keyframes
        glow: {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(6, 182, 212, 0.3), 0 0 40px rgba(6, 182, 212, 0.1)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(6, 182, 212, 0.6), 0 0 80px rgba(6, 182, 212, 0.3)",
          },
        },
        "pulse-slow": {
          "0%, 100%": {
            transform: "translateX(-100%)",
          },
          "50%": {
            transform: "translateX(100%)",
          },
        },
        "glow-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 5px var(--tw-shadow-color, #06b6d4), 0 0 10px var(--tw-shadow-color, #06b6d4)",
          },
          "50%": {
            boxShadow: "0 0 20px var(--tw-shadow-color, #06b6d4), 0 0 40px var(--tw-shadow-color, #06b6d4)",
          },
        },
        "glow-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },

        // Shimmer keyframes
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "shimmer-slow": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },

        // Spin reverse
        "spin-reverse": {
          from: { transform: "rotate(360deg)" },
          to: { transform: "rotate(0deg)" },
        },

        // Bounce keyframes
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-25px)" },
        },
        "bounce-soft": {
          "0%, 100%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(-15px)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },

        // Fade keyframes
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-down": {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-left": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "fade-in-right": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },

        // Slide keyframes
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-left": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-right": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },

        // Scale keyframes
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "scale-out": {
          "0%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(0.9)" },
        },
        "scale-pulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },

        // Special effect keyframes
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(1.5)", opacity: "0" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
          "52%": { opacity: "1" },
          "54%": { opacity: "0.9" },
          "56%": { opacity: "1" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "text-reveal": {
          "0%": { clipPath: "inset(0 100% 0 0)" },
          "100%": { clipPath: "inset(0 0 0 0)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },

      // ==========================================
      // Custom Backdrop Blur
      // ==========================================
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
        "3xl": "40px",
        "4xl": "64px",
      },

      // ==========================================
      // Custom Box Shadows with Colored Glows
      // ==========================================
      boxShadow: {
        // Basic shadows
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        
        // Glow shadows
        "glow-sm": "0 0 10px rgba(6, 182, 212, 0.3)",
        "glow-md": "0 0 20px rgba(6, 182, 212, 0.4)",
        "glow-lg": "0 0 30px rgba(6, 182, 212, 0.5)",
        "glow-xl": "0 0 40px rgba(6, 182, 212, 0.6)",
        
        // Colored glow shadows
        "glow-cyan": "0 0 20px rgba(6, 182, 212, 0.4), 0 0 40px rgba(6, 182, 212, 0.2)",
        "glow-purple": "0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(168, 85, 247, 0.2)",
        "glow-pink": "0 0 20px rgba(236, 72, 153, 0.4), 0 0 40px rgba(236, 72, 153, 0.2)",
        "glow-indigo": "0 0 20px rgba(99, 102, 241, 0.4), 0 0 40px rgba(99, 102, 241, 0.2)",
        
        // Intense glow shadows
        "glow-cyan-intense": "0 0 30px rgba(6, 182, 212, 0.6), 0 0 60px rgba(6, 182, 212, 0.4), 0 0 90px rgba(6, 182, 212, 0.2)",
        "glow-purple-intense": "0 0 30px rgba(168, 85, 247, 0.6), 0 0 60px rgba(168, 85, 247, 0.4), 0 0 90px rgba(168, 85, 247, 0.2)",
        "glow-pink-intense": "0 0 30px rgba(236, 72, 153, 0.6), 0 0 60px rgba(236, 72, 153, 0.4), 0 0 90px rgba(236, 72, 153, 0.2)",
        
        // Mixed gradient glow
        "glow-gradient": "0 0 20px rgba(6, 182, 212, 0.3), 0 0 40px rgba(168, 85, 247, 0.2), 0 0 60px rgba(236, 72, 153, 0.1)",
        
        // Neon effect shadows
        "neon-cyan": "0 0 5px #06b6d4, 0 0 10px #06b6d4, 0 0 20px #06b6d4, 0 0 40px #06b6d4",
        "neon-purple": "0 0 5px #a855f7, 0 0 10px #a855f7, 0 0 20px #a855f7, 0 0 40px #a855f7",
        "neon-pink": "0 0 5px #ec4899, 0 0 10px #ec4899, 0 0 20px #ec4899, 0 0 40px #ec4899",
        
        // Card shadows
        "card-dark": "0 4px 30px rgba(0, 0, 0, 0.3), 0 0 1px rgba(255, 255, 255, 0.1)",
        "card-hover": "0 8px 40px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.15), 0 0 30px rgba(6, 182, 212, 0.1)",
        
        // Inner shadows
        "inner-glow": "inset 0 0 20px rgba(6, 182, 212, 0.2)",
        "inner-dark": "inset 0 2px 4px rgba(0, 0, 0, 0.3)",
      },

      // ==========================================
      // Extended Spacing
      // ==========================================
      spacing: {
        "13": "3.25rem",
        "15": "3.75rem",
        "17": "4.25rem",
        "18": "4.5rem",
        "19": "4.75rem",
        "21": "5.25rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
        "38": "9.5rem",
        "42": "10.5rem",
        "50": "12.5rem",
        "54": "13.5rem",
        "58": "14.5rem",
        "62": "15.5rem",
        "68": "17rem",
        "72": "18rem",
        "84": "21rem",
        "88": "22rem",
        "92": "23rem",
        "100": "25rem",
        "108": "27rem",
        "116": "29rem",
        "128": "32rem",
        "144": "36rem",
      },

      // ==========================================
      // Custom Border Radius
      // ==========================================
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        "6xl": "3rem",
      },

      // ==========================================
      // Extended Sizing (Width/Height)
      // ==========================================
      width: {
        "128": "32rem",
        "144": "36rem",
        "160": "40rem",
        "176": "44rem",
        "192": "48rem",
        "screen-90": "90vw",
        "screen-80": "80vw",
      },
      height: {
        "128": "32rem",
        "144": "36rem",
        "160": "40rem",
        "screen-90": "90vh",
        "screen-80": "80vh",
      },
      minHeight: {
        "screen-50": "50vh",
        "screen-75": "75vh",
        "screen-80": "80vh",
        "screen-90": "90vh",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
        "screen-xl": "1280px",
        "screen-2xl": "1536px",
      },

       // ==========================================
      // Z-Index
      // ==========================================
      zIndex: {
        "60": "60",
        "70": "70",
        "80": "80",
        "90": "90",
        "100": "100",
        "999": "999",
        "9999": "9999",
      },

      // ==========================================
      // Custom Utilities
      // ==========================================
      extend: {},

      // ==========================================
      // Background Image (Patterns)
      // ==========================================
      backgroundImage: {
        // Grid patterns
        "grid-pattern": `
          linear-gradient(to right, rgba(6, 182, 212, 0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(6, 182, 212, 0.03) 1px, transparent 1px)
        `,
        "grid-pattern-light": `
          linear-gradient(to right, rgba(99, 102, 241, 0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(99, 102, 241, 0.08) 1px, transparent 1px)
        `,
        "grid-pattern-dense": `
          linear-gradient(to right, rgba(6, 182, 212, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(6, 182, 212, 0.05) 1px, transparent 1px)
        `,
        
        // Dot patterns
        "dot-pattern": "radial-gradient(rgba(6, 182, 212, 0.15) 1px, transparent 1px)",
        "dot-pattern-light": "radial-gradient(rgba(99, 102, 241, 0.2) 1px, transparent 1px)",
        
        // Gradient backgrounds
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-mesh": `
          radial-gradient(at 40% 20%, rgba(6, 182, 212, 0.3) 0px, transparent 50%),
          radial-gradient(at 80% 0%, rgba(168, 85, 247, 0.3) 0px, transparent 50%),
          radial-gradient(at 0% 50%, rgba(99, 102, 241, 0.3) 0px, transparent 50%),
          radial-gradient(at 80% 50%, rgba(236, 72, 153, 0.3) 0px, transparent 50%),
          radial-gradient(at 0% 100%, rgba(6, 182, 212, 0.3) 0px, transparent 50%)
        `,
        
        // Shimmer gradient
        shimmer: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)",
        
        // Hero gradients
        "hero-gradient": "linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(168, 85, 247, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)",
        "hero-glow": "radial-gradient(ellipse at center, rgba(6, 182, 212, 0.15) 0%, transparent 70%)",
      },

      // ==========================================
      // Background Size (for patterns)
      // ==========================================
      backgroundSize: {
        "grid-sm": "20px 20px",
        "grid-md": "40px 40px",
        "grid-lg": "60px 60px",
        "grid-xl": "80px 80px",
        "dot-sm": "16px 16px",
        "dot-md": "24px 24px",
        "dot-lg": "32px 32px",
        "200%": "200% 100%",
        "300%": "300% 100%",
      },

      // ==========================================
      // Typography
      // ==========================================
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
        "10xl": ["10rem", { lineHeight: "1" }],
        "11xl": ["12rem", { lineHeight: "1" }],
        "12xl": ["14rem", { lineHeight: "1" }],
      },
      letterSpacing: {
        tightest: "-0.075em",
        "extra-wide": "0.2em",
        "super-wide": "0.3em",
      },
      lineHeight: {
        "extra-tight": "1.1",
        "extra-loose": "2.5",
      },

      // ==========================================
      // Transitions
      // ==========================================
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "900": "900ms",
        "2000": "2000ms",
        "3000": "3000ms",
      },
      transitionTimingFunction: {
        "bounce-in": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "smooth-out": "cubic-bezier(0.25, 0.1, 0.25, 1)",
        "expo-out": "cubic-bezier(0.19, 1, 0.22, 1)",
      },

      // ==========================================
      // Screen Breakpoints (extended)
      // ==========================================
      screens: {
        xs: "475px",
        "3xl": "1920px",
        "4xl": "2560px",
      },
    },
  },
  plugins: [],
};

export default config;
