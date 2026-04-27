import { keyframes, style } from "@vanilla-extract/css";

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const wrap = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  animation: `${fadeIn} 0.1s ease-in`,
});
