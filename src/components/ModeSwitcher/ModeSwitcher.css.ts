import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "@/features/metronome/theme.css";

export const wrap = style({
  position: "relative",
  display: "inline-flex",
});

export const trigger = style({
  display: "inline-flex",
  alignItems: "center",
  border: "none",
  background: "transparent",
  color: vars.color.ink,
  cursor: "pointer",
  fontFamily: vars.font.sans,
  fontWeight: 500,
  letterSpacing: "-0.01em",
  borderRadius: "10px",
  padding: "6px 10px 6px 4px",
  transition: "background .15s",
  selectors: {
    "&:hover": {
      background: vars.color.panel,
    },
  },
});

export const triggerSizes = styleVariants({
  sm: { fontSize: "15px", gap: "8px" },
  md: { fontSize: "16px", gap: "10px" },
  lg: { fontSize: "18px", gap: "12px" },
});

export const dot = style({
  borderRadius: "50%",
  background: vars.color.accent,
  marginLeft: "6px",
  flexShrink: 0,
  transition: "box-shadow .15s",
});

export const dotSizes = styleVariants({
  sm: { width: "8px", height: "8px" },
  md: { width: "10px", height: "10px" },
  lg: { width: "12px", height: "12px" },
});

export const dotRunning = styleVariants({
  sm: { boxShadow: `0 0 0 3px ${vars.color.accentRing}` },
  md: { boxShadow: `0 0 0 4px ${vars.color.accentRing}` },
  lg: { boxShadow: `0 0 0 5px ${vars.color.accentRing}` },
});

export const caret = style({
  marginTop: "2px",
  color: vars.color.mute,
  flexShrink: 0,
});

export const popover = style({
  position: "absolute",
  top: "calc(100% + 6px)",
  left: 0,
  background: "#ffffff",
  border: `1px solid ${vars.color.hair}`,
  borderRadius: "12px",
  boxShadow: "0 12px 32px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)",
  padding: "6px",
  minWidth: "200px",
  zIndex: 20,
  display: "flex",
  flexDirection: "column",
  fontFamily: vars.font.sans,
});

export const item = style({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  border: "none",
  background: "transparent",
  color: vars.color.ink,
  cursor: "pointer",
  padding: "10px 12px",
  borderRadius: "8px",
  fontFamily: "inherit",
  fontSize: "14px",
  fontWeight: 500,
  textAlign: "left",
  selectors: {
    "&:hover": {
      background: vars.color.panel,
    },
  },
});

export const itemActive = style({
  background: vars.color.panel,
});

export const itemIcon = style({
  color: vars.color.mute,
  display: "inline-flex",
  flexShrink: 0,
});

export const itemLabel = style({
  flex: 1,
});

export const itemCheck = style({
  color: vars.color.accent,
});
