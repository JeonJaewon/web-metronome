import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "@/features/metronome/theme.css";

export const root = style({
  background: vars.color.panel,
  border: `1px solid ${vars.color.hair}`,
  borderRadius: vars.radius.xl,
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  fontFamily: vars.font.sans,
  width: "100%",
});

export const sizes = styleVariants({
  small: { padding: "16px" },
  medium: { padding: "18px" },
  large: { padding: "22px 24px" },
});

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const label = style({
  fontFamily: vars.font.mono,
  fontSize: "10px",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: vars.color.mute,
});

export const body = style({
  display: "grid",
  placeItems: "center",
  padding: "8px 0",
  flex: 1,
  minHeight: 0,
});

export const bodyPendulum = style({
  padding: "6px 0 2px",
});
