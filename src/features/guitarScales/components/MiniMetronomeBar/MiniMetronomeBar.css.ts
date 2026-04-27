import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "@/features/metronome/theme.css";

export const root = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  padding: "8px 8px 8px 14px",
  background: "#ffffff",
  border: `1px solid ${vars.color.hair}`,
  borderRadius: "999px",
  fontFamily: vars.font.sans,
});

export const dot = style({
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  background: "#c9c2b3",
  flexShrink: 0,
});

export const pulse = keyframes({
  "0%": { transform: "scale(1)", opacity: 1 },
  "50%": { transform: "scale(1.3)", opacity: 0.6 },
  "100%": { transform: "scale(1)", opacity: 1 },
});

export const dotRunning = style({
  background: vars.color.accent,
  animationName: pulse,
  animationTimingFunction: "ease-in-out",
  animationIterationCount: "infinite",
});

export const bpm = style({
  fontFamily: vars.font.mono,
  fontSize: "14px",
  fontWeight: 600,
  fontVariantNumeric: "tabular-nums",
  color: vars.color.ink,
});

export const bpmLabel = style({
  fontFamily: vars.font.mono,
  fontSize: "9px",
  letterSpacing: "0.18em",
  color: vars.color.mute,
  textTransform: "uppercase",
});

export const playButton = style({
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  border: "none",
  background: vars.color.dotInk,
  color: "#ffffff",
  cursor: "pointer",
  display: "grid",
  placeItems: "center",
  marginLeft: "2px",
  flexShrink: 0,
  transition: "background .15s",
});

export const playButtonRunning = style({
  background: vars.color.accent,
});
