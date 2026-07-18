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
        bg: "#ffffff",
        surface: "#f6f6f4",
        border: "#e7e7e3",
        ink: "#16160f",
        muted: "#6b6b64",
        faint: "#9c9c93",
        terminal: "#171717",
        amber: "#e8a55d",
      },
    },
  },
};
