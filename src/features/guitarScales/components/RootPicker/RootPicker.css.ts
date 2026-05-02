import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const root = style({
  display: "grid",
  gridTemplateColumns: "repeat(12, 1fr)",
  gap: "4px",
  padding: "4px",
  background: vars.color.bg,
  borderRadius: "10px",
  border: `1px solid ${vars.color.hair}`,
});

export const button = style({
  padding: "8px 0",
  border: "none",
  borderRadius: "6px",
  background: "transparent",
  color: vars.color.ink,
  fontFamily: vars.font.mono,
  fontSize: "11px",
  fontWeight: 500,
  cursor: "pointer",
  letterSpacing: "0.04em",
  transition: "background .12s, color .12s",
});

export const buttonCompact = style({
  padding: "6px 0",
  fontSize: "10px",
});

export const sharp = style({
  color: vars.color.mute,
});

export const active = style({
  background: vars.color.accent,
  color: vars.color.onAccent,
  fontWeight: 600,
});
