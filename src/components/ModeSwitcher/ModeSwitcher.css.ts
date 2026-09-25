import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const wrap = style({
  display: "inline-flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "4px",
  maxWidth: "100%",
});

export const tab = style({
  display: "inline-flex",
  alignItems: "center",
  minHeight: "40px",
  padding: "6px 8px",
  borderBottom: "2px solid transparent",
  color: vars.color.ink,
  fontFamily: vars.font.sans,
  fontWeight: 500,
  letterSpacing: "-0.01em",
  textDecoration: "none",
  whiteSpace: "nowrap",
  borderRadius: "6px 6px 0 0",
  transition: "background .15s, border-color .15s",
  selectors: {
    "&:hover": {
      background: vars.color.panel,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.accent}`,
      outlineOffset: "3px",
    },
  },
});

export const tabSizes = styleVariants({
  sm: { fontSize: "13px" },
  md: { fontSize: "14px" },
  lg: { fontSize: "16px" },
});

export const tabActive = style({
  borderBottomColor: vars.color.accent,
  fontWeight: 600,
});

export const dot = style({
  width: "8px",
  height: "8px",
  marginInline: "4px",
  borderRadius: "50%",
  background: vars.color.accent,
  flexShrink: 0,
  transition: "box-shadow .15s",
});

export const dotRunning = style({
  boxShadow: `0 0 0 3px ${vars.color.accentRing}`,
});
