import { style } from "@vanilla-extract/css";

export const beatVisualizer = style({
  display: "flex",
  gap: "10px",
  justifyContent: "center",
  alignItems: "center",
});

export const beatCircle = style({
  width: "20px",
  height: "20px",
  borderRadius: "50%",
  backgroundColor: "lightgray",
  transition: "background-color 0.3s ease",
});

export const beatCircleActive = style({
  backgroundColor: "dodgerblue",
});
