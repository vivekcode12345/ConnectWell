/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: "#0d1b1e",
        mint: "#7ce3c8",
        sand: "#f7f2e7",
        coral: "#ff7b6b",
        sky: "#a9d9ff",
        leaf: "#2e7d6b",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Space Grotesk", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 3px rgba(124, 227, 200, 0.25)",
      },
    },
  },
  plugins: [],
};
