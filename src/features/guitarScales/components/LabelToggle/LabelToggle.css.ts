import { style } from "@vanilla-extract/css";
import { vars } from "@/features/metronome/theme.css";

export const root = style({
  display: "inline-flex",
  padding: "3px",
  background: vars.color.bg,
  borderRadius: "9px",
  border: `1px solid ${vars.color.hair}`,
});

export const button = style({
  padding: "6px 12px",
  border: "none",
  borderRadius: "7px",
  background: "transparent",
  color: vars.color.mute,
  fontFamily: vars.font.sans,
  fontSize: "11px",
  fontWeight: 500,
  cursor: "pointer",
  transition: "background .12s, color .12s, box-shadow .12s",
});

export const active = style({
  background: "#ffffff",
  color: vars.color.ink,
  boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
});
