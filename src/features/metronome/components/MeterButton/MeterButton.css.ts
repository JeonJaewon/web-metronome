import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const root = style({
  width: "100%",
  background: "transparent",
  border: `1px solid ${vars.color.hair}`,
  color: vars.color.ink,
  borderRadius: vars.radius.lg,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontFamily: vars.font.sans,
});

export const sizes = styleVariants({
  small: { padding: "12px 18px" },
  medium: { padding: "14px 18px" },
  large: { padding: "16px 22px" },
});

export const label = style({
  fontFamily: vars.font.mono,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: vars.color.mute,
});

export const labelSizes = styleVariants({
  small: { fontSize: "9px" },
  medium: { fontSize: "10px" },
  large: { fontSize: "11px" },
});

export const value = style({
  fontFamily: vars.font.mono,
  fontWeight: 500,
  fontVariantNumeric: "tabular-nums",
  color: vars.color.ink,
});

export const valueSizes = styleVariants({
  small: { fontSize: "14px" },
  medium: { fontSize: "16px" },
  large: { fontSize: "18px" },
});
