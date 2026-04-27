import { style } from "@vanilla-extract/css";
import { vars } from "@/features/metronome/theme.css";

export const root = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: "transparent",
  border: `1px dashed ${vars.color.hair}`,
  borderRadius: vars.radius.lg,
  padding: "10px 18px",
  width: "100%",
  fontFamily: vars.font.mono,
  color: vars.color.ink,
});

export const label = style({
  fontSize: "10px",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: vars.color.mute,
});

export const value = style({
  fontSize: "14px",
  fontVariantNumeric: "tabular-nums",
});
