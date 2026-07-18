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
        paper: "#f1f3f2",
        snow: "#fbfcfb",
        ink: "#17191b",
        graphite: "#565a5e",
        mist: "#9ba1a3",
        hairline: "#e1e4e1",
        terminal: "#171717",
        amber: "#e8a55d",
      },
    },
  },
};
