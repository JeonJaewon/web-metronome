import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const wrap = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
  width: "100%",
});

export const dot = style({
  borderRadius: "50%",
  backgroundColor: vars.color.dotIdle,
  transform: "scale(1)",
  transition:
    "transform .3s ease-out, background-color .3s, box-shadow .3s",
  flexShrink: 0,
});

export const dotActive = style({
  transform: "scale(1.35)",
  transition:
    "transform .04s ease-out, background-color .04s, box-shadow .04s",
});

export const dotActiveAccent = style({
  backgroundColor: vars.color.accent,
  boxShadow: `0 0 0 4px ${vars.color.accentRing}`,
});

export const dotActiveInk = style({
  backgroundColor: vars.color.dotInk,
});
