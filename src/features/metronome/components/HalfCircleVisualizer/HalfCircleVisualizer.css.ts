
import { style, globalStyle } from "@vanilla-extract/css";

export const halfCircleVisualizer = style({
  marginBottom: "20px",
});

globalStyle(`${halfCircleVisualizer}`, {
  animation: "fadeIn 0.1s ease-in",
});
