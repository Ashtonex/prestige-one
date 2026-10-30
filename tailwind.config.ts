import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        flectere: {
          navy: "#0F2043",
          navyDark: "#0A1630",
          navyLight: "#1A3668",
          crimson: "#B41E2D",
          crimsonLight: "#FDE8EA",
          slate: "#708090",
          slateLight: "#E8ECF0",
          light: "#F5F7FA",
          gold: "#B88B36",
          goldLight: "#F8F3E8",
          green: "#267058",
          greenLight: "#E8F4F0",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
