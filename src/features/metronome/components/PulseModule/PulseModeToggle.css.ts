import { style } from "@vanilla-extract/css";
import { vars } from "@/features/metronome/theme.css";

export const wrap = style({
  display: "inline-flex",
  background: "transparent",
  border: `1px solid ${vars.color.hair}`,
  borderRadius: vars.radius.sm,
  padding: "2px",
});

export const button = style({
  width: "28px",
  height: "22px",
  border: "none",
  borderRadius: "6px",
  background: "transparent",
  color: vars.color.mute,
  cursor: "pointer",
  padding: 0,
  display: "grid",
  placeItems: "center",
  transition: "background .15s, color .15s",
});

export const active = style({
  background: vars.color.onAccent,
  color: vars.color.ink,
});
