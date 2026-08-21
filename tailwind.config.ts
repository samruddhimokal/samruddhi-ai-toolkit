import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Pace Labz brand system v2 (locked)
        obsidian: "#0A0A0A",
        bone: "#FAFAF7",
        amethyst: "#6B5DD3",
        dusk: "#9B8FE0",
        stone: "#6B6B6B",
        "soft-white": "#E8E6F2",
        "dark-border": "#1F1F1F",
        "light-border": "#E5E5E0",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      borderRadius: {
        // Sharp corners only. Max 4px.
        DEFAULT: "3px",
        sm: "2px",
        md: "3px",
        lg: "4px",
      },
      letterSpacing: {
        eyebrow: "0.2em",
      },
      maxWidth: {
        shell: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
