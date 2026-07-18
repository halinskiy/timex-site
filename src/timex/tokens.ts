// Timex visual tokens — transcribed 1:1 from the app source.
// Source: /Applications/Timex.app/Contents/Resources/timex.py  (TimexApp.CSS, Constants)
//         .../templates/app_index.html  (window bg + terminal font)
// When Timex changes these, re-sync here. See TIMEX-REPLICA.md.

export const TX = {
  color: {
    bg: "#171717", // Screen background
    panelBorder: "#333333", // DIMMER — panel/timeline borders
    inputBg: "#1e1e1e", // #task-input background
    text: "#d4d4d4", // TEXT_COLOR
    dim: "#555555", // DIM — timestamps, footer, placeholder
    separator: "#222222", // SEPARATOR — task divider rule
    accent: "#e8a55d", // DEFAULT_ACCENT — REC, focus border, current task
    accentHover: "#f0b978",
    paused: "#888888", // PAUSED indicator + past durations
    white: "#ffffff",
  },
  // Terminal font is Roboto Mono in the real webview (app_index.html).
  font: `"Roboto Mono", ui-monospace, Menlo, monospace`,
  glyph: {
    rec: "●", // ●
    idle: "○", // ○
    pause: "❚❚", // ❚❚
    clock: "⏱︎", // ⏱ forced to text (monochrome) presentation
    arrow: "◄", // ◄ current task marker
    thinking: "⏳︎", // ⏳
    sep: "─", // ─
    ellipsis: "…", // …
  },
} as const;
