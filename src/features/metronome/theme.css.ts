import { createGlobalTheme } from "@vanilla-extract/css";

export const vars = createGlobalTheme(":root", {
  color: {
    canvas: "#f0eee9",
    bg: "#e8e4db",
    panel: "#f3efe6",
    ink: "#14120f",
    displayBg: "#14120f",
    displayDim: "rgba(255,255,255,0.45)",
    mute: "#8a847a",
    hair: "#cfc9bb",
    dotIdle: "#e3dfd6",
    dotInk: "#0e0d0b",
    accent: "oklch(0.68 0.17 45)",
    accentSoft: "oklch(0.68 0.17 45 / 0.13)",
    accentRing: "oklch(0.68 0.17 45 / 0.22)",
    accentGlow: "oklch(0.68 0.17 45 / 0.33)",
    onAccent: "#ffffff",
    fretboardBg: "#f0eee5",
    fretboardInlay: "#d8d2c2",
    fretboardString: "#9a948a",
    fretboardNoteText: "#f5f3ee",
  },
  font: {
    sans: "'Inter Tight', system-ui, -apple-system, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
    serif: "'Fraunces', Georgia, 'Times New Roman', serif",
  },
  radius: {
    sm: "8px",
    md: "10px",
    lg: "12px",
    xl: "14px",
  },
});

export const breakpoints = {
  tablet: "(min-width: 768px)",
  desktop: "(min-width: 1200px)",
};
