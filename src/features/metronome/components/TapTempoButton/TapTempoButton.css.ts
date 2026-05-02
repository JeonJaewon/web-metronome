import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const root = style({
  width: "100%",
  background: "transparent",
  border: `1px solid ${vars.color.hair}`,
  color: vars.color.ink,
  borderRadius: vars.radius.lg,
  cursor: "pointer",
  fontFamily: vars.font.mono,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  selectors: {
    "&:active": {
      background: vars.color.panel,
    },
  },
});

export const sizes = styleVariants({
  small: { padding: "12px 14px", fontSize: "11px" },
  medium: { padding: "14px 22px", fontSize: "12px" },
  large: { padding: "0 22px", fontSize: "11px", height: "72px" },
});

export const filled = style({
  background: vars.color.panel,
});
