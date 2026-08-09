import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FBF7EF",
          idli: "#FFF8ED",
          warm: "#F3E9D6",
        },
        gold: {
          DEFAULT: "#E8A33D",
          deep: "#C9862A",
        },
        terracotta: {
          DEFAULT: "#8B3A2F",
          deep: "#6E2C23",
        },
        leaf: {
          DEFAULT: "#4A7C59",
        },
        espresso: {
          DEFAULT: "#2B2118",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "-apple-system", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
