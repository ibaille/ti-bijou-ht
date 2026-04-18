import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: { cream: "#FFFBF6", "rose-poudre": "#F4A7BB", "rose-dark": "#E8819A", "bleu-ciel": "#A7D1F4", lavande: "#C4B1D4", menthe: "#A7F4D1", sable: "#F4D7A7", charcoal: "#333333" },
      fontFamily: { display: ["Quicksand", "sans-serif"], body: ["DM Sans", "sans-serif"] },
    },
  },
  plugins: [],
};
export default config;
