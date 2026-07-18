/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  presets: [require("@relume_io/relume-tailwind")],
  theme: {
    // Override Relume's container.screens (sm/md were "100%" → invalid @media that
    // lightningcss rejects). Keep only the valid breakpoints; same effective layout.
    container: {
      center: true,
      screens: { lg: "992px", xl: "1280px" },
    },
    extend: {
      gradientColorStops: ({ theme }) => theme("colors"),
      fontFamily: {
        sans: ['"Space Grotesk"', "system-ui", "sans-serif"],
        body: ['Inter', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      fontSize: {
        h1: ["4rem", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        h2: ["3rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        h3: ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        h4: ["1.75rem", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
        h5: ["1.375rem", { lineHeight: "1.35", letterSpacing: "-0.01em" }],
        h6: ["1.125rem", { lineHeight: "1.4", letterSpacing: "-0.01em" }],
        large: ["1.25rem", { lineHeight: "1.5" }],
        medium: ["1.125rem", { lineHeight: "1.5" }],
        regular: ["1rem", { lineHeight: "1.5" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
        tiny: ["0.75rem", { lineHeight: "1.5" }],
      },
      colors: {
        amber: { DEFAULT: "#c98500", ink: "#171717" },
        scheme: {
          background: "#ffffff", foreground: "#ffffff",
          text: "#171717", border: "#171717", "btn-text": "#ffffff",
        },
      },
      borderRadius: {
        button: "0.625rem", card: "1rem", image: "1rem", form: "0.625rem",
        badge: "9999px", checkbox: "0.25rem", carousel: "1rem", dropdown: "0.75rem",
      },
    },
  },
};
