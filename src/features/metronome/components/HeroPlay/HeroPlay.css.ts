import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const root = style({
  width: "100%",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "14px",
  fontFamily: vars.font.sans,
  fontWeight: 500,
  letterSpacing: "0.04em",
  background: vars.color.dotInk,
  color: "#f5f3ee",
  boxShadow: "0 8px 20px rgba(0,0,0,0.18)",
  transition: "background .2s, box-shadow .2s, transform .15s",
  selectors: {
    "&:active": {
      transform: "scale(0.985)",
    },
  },
});

export const running = style({
  background: vars.color.accent,
  color: "#fff",
  boxShadow: `0 0 0 6px ${vars.color.accentRing}, 0 8px 24px ${vars.color.accentGlow}`,
});

export const label = style({
  fontFamily: "inherit",
});
