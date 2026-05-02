import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const root = style({
  background: vars.color.panel,
  border: `1px solid ${vars.color.hair}`,
  borderRadius: vars.radius.xl,
  padding: "14px 18px",
  width: "100%",
  fontFamily: vars.font.sans,
});

export const header = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px",
});

export const label = style({
  fontFamily: vars.font.mono,
  fontSize: "10px",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: vars.color.mute,
});

export const stepRow = style({
  display: "flex",
  gap: "6px",
});

export const stepBtn = style({
  width: "26px",
  height: "22px",
  border: `1px solid ${vars.color.hair}`,
  background: "transparent",
  color: vars.color.ink,
  borderRadius: "6px",
  cursor: "pointer",
  fontFamily: vars.font.mono,
  fontSize: "14px",
  lineHeight: 1,
  padding: 0,
  display: "grid",
  placeItems: "center",
});

export const slider = style({
  position: "relative",
  height: "2px",
  background: vars.color.hair,
  borderRadius: "1px",
  marginTop: "12px",
});

export const fill = style({
  position: "absolute",
  left: 0,
  top: 0,
  height: "2px",
  background: vars.color.accent,
});

export const thumb = style({
  position: "absolute",
  top: "-6px",
  width: "14px",
  height: "14px",
  borderRadius: "3px",
  background: vars.color.accent,
  transform: "translateX(-50%)",
  pointerEvents: "none",
});

export const range = style({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "28px",
  top: "-13px",
  opacity: 0,
  cursor: "pointer",
  margin: 0,
  padding: 0,
});
