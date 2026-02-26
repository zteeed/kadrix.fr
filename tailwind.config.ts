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
        kadrix: {
          dark: "#0f172a",
          primary: "#0ea5e9",
          accent: "#06b6d4",
          muted: "#64748b",
          light: "#f8fafc",
        },
      },
      fontFamily: {
        sans: ["system-ui", "sans-serif"],
        display: ["ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
