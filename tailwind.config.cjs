/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"Roboto Mono"', "ui-monospace", "Menlo", "monospace"],
      },
      colors: {
        canvas: "#100f0d",
        plinth: "#1a1815",
        rule: "#262320",
        ink: "#f3efe8",
        body: "#c9c4bb",
        muted: "#8a857c",
        faint: "#55514a",
        terminal: "#171717",
        amber: "#e8a55d",
      },
    },
  },
};
