import { style } from "@vanilla-extract/css";
import { vars } from "@/features/metronome/theme.css";

export const root = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: vars.color.panel,
  border: `1px solid ${vars.color.hair}`,
  borderRadius: vars.radius.lg,
  padding: "12px 18px",
  width: "100%",
  fontFamily: vars.font.sans,
  cursor: "pointer",
  userSelect: "none",
});

export const label = style({
  fontFamily: vars.font.mono,
  fontSize: "10px",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: vars.color.mute,
});

export const switchTrack = style({
  width: "32px",
  height: "18px",
  borderRadius: "999px",
  background: vars.color.hair,
  position: "relative",
  transition: "background .15s",
  flexShrink: 0,
});

export const switchTrackActive = style({
  background: vars.color.accent,
});

export const switchThumb = style({
  position: "absolute",
  top: "2px",
  left: "2px",
  width: "14px",
  height: "14px",
  borderRadius: "50%",
  background: "#fff",
  boxShadow: "0 1px 2px rgba(0,0,0,0.18)",
  transition: "transform .15s",
});

export const switchThumbActive = style({
  transform: "translateX(14px)",
});

export const hiddenInput = style({
  position: "absolute",
  width: 0,
  height: 0,
  opacity: 0,
  pointerEvents: "none",
});
