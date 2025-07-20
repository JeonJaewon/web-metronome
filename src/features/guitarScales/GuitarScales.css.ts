import { style, styleVariants } from "@vanilla-extract/css";

export const fretboard = style({
  display: "grid",
  gridTemplateRows: "repeat(6, 32px)",
  gridTemplateColumns: "repeat(13, 40px)",
  gap: "2px",
  background: "#222",
  borderRadius: "8px", padding: "16px 8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  width: "max-content",
});

export const stringRow = style({
  display: "contents",
});

export const fret = style({
  background: "#444",
  border: "1px solid #666",
  borderRadius: "4px",
  width: "36px",
  height: "28px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.9rem",
  color: "#eee",
  position: "relative",
  transition: "background 0.2s",
});

export const marker = style({
  position: "absolute",
  bottom: "2px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  background: "#fff",
  opacity: 0.5,
});

export const note = styleVariants({
  root: [
    fret,
    {
      background: "#2e7d32",
      color: "#fff",
      fontWeight: "bold",
      boxShadow: "0 0 0 2px #81c784",
    },
  ],
  rootNote: [
    fret,
    {
      background: "#c62828",
      color: "#fff",
      fontWeight: "bold",
      boxShadow: "0 0 0 2px #ff8a65",
    },
  ],
});
