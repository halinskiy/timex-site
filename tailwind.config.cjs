/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Schibsted Grotesk"', "system-ui", "sans-serif"],
        sans: ['"Hanken Grotesk"', "system-ui", "sans-serif"],
        body: ['"Hanken Grotesk"', "system-ui", "sans-serif"],
        mono: ['"Roboto Mono"', "ui-monospace", "Menlo", "monospace"],
      },
      colors: {
        bg: "#0c0b0a",
        surface: "#131210",
        border: "#26241f",
        ink: "#ece7dd",
        muted: "#9b938a",
        faint: "#5f5951",
        terminal: "#171717",
        amber: "#e8a55d",
      },
    },
  },
};
