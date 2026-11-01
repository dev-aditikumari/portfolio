import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: "#000010",
        navy: "#06062a",
        panel: "#0c0c33",
        edge: "#2a2a5e",
        copy: "#d5d7e8",
        quiet: "#a3a6c4",
        brand: "#e5192b",
        brandHover: "#c1121f",
        royal: "#1f1fd1",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      keyframes: {
        slide: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        slideBack: {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
      },
      animation: {
        slide: "slide 30s linear infinite",
        slideBack: "slideBack 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
