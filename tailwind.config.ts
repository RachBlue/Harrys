import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        harrysNavy: "#112142",
        harrysOrange: "#ff6a13",
        harrysCream: "#fffdf5",
      },
    },
  },
  plugins: [],
} satisfies Config;