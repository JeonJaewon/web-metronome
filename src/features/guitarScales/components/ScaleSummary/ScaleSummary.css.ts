import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "@/features/metronome/theme.css";

export const root = style({
  display: "flex",
  alignItems: "baseline",
  gap: "8px",
  fontFamily: vars.font.serif,
});

export const rootNote = style({
  fontWeight: 400,
  color: vars.color.accent,
  letterSpacing: "-0.02em",
});

export const scaleName = style({
  fontWeight: 300,
  color: vars.color.ink,
  letterSpacing: "-0.01em",
});

export const rootSizes = styleVariants({
  sm: { fontSize: "26px" },
  md: { fontSize: "32px" },
  lg: { fontSize: "44px" },
});

export const scaleSizes = styleVariants({
  sm: { fontSize: "20px" },
  md: { fontSize: "25px" },
  lg: { fontSize: "34px" },
});
