import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const root = style({
  background: vars.color.displayBg,
  color: vars.color.accent,
  borderRadius: vars.radius.xl,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontFamily: vars.font.mono,
  width: "100%",
});

export const sizes = styleVariants({
  small: {
    padding: "14px 18px",
  },
  medium: {
    padding: "18px 22px",
  },
  large: {
    padding: "22px 26px",
  },
});

export const numerals = style({
  fontWeight: 500,
  letterSpacing: "0.02em",
  lineHeight: 1,
  fontVariantNumeric: "tabular-nums",
  display: "flex",
});

export const numeralSizes = styleVariants({
  small: { fontSize: "56px" },
  medium: { fontSize: "72px" },
  large: { fontSize: "84px" },
});

export const dim = style({
  opacity: 0.22,
});

export const meta = style({
  textAlign: "right",
  color: vars.color.displayDim,
  display: "flex",
  flexDirection: "column",
});

export const metaLabel = style({
  letterSpacing: "0.24em",
  textTransform: "uppercase",
});

export const metaLabelSizes = styleVariants({
  small: { fontSize: "9px" },
  medium: { fontSize: "10px" },
  large: { fontSize: "11px" },
});

export const meter = style({
  color: vars.color.accent,
  fontWeight: 500,
  fontVariantNumeric: "tabular-nums",
});

export const meterSizes = styleVariants({
  small: { fontSize: "16px", marginTop: "5px" },
  medium: { fontSize: "20px", marginTop: "6px" },
  large: { fontSize: "24px", marginTop: "8px" },
});

export const tempo = style({
  letterSpacing: "0.24em",
  textTransform: "uppercase",
});

export const tempoSizes = styleVariants({
  small: { fontSize: "9px", marginTop: "5px" },
  medium: { fontSize: "10px", marginTop: "6px" },
  large: { fontSize: "11px", marginTop: "8px" },
});
