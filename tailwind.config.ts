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
          navyDeep: "#060E1E",
          navyLight: "#1A3668",
          crimson: "#B41E2D",
          crimsonLight: "#FDE8EA",
          slate: "#708090",
          slateLight: "#E8ECF0",
          light: "#F5F7FA",
          gold: "#C5A059",
          goldDark: "#A8833C",
          goldLight: "#F8F3E8",
          green: "#267058",
          greenLight: "#E8F4F0",
        },
      },
      fontFamily: {
        sans: [
          "Plus Jakarta Sans",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        serif: [
          "Playfair Display",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
