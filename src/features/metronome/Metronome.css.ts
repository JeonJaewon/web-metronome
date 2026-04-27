import { style } from "@vanilla-extract/css";
import { vars, breakpoints } from "@/features/metronome/theme.css";

export const wrapper = style({
  width: "100%",
  margin: "0 auto",
  fontFamily: vars.font.sans,
  color: vars.color.ink,
  display: "flex",
  flexDirection: "column",
  paddingBottom: "32px",
});

export const consoleMobile = style({
  background: vars.color.bg,
  width: "100%",
  maxWidth: "440px",
  margin: "0 auto",
  padding: "18px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  borderRadius: vars.radius.xl,
  marginTop: "16px",
  "@media": {
    [breakpoints.tablet]: {
      display: "none",
    },
  },
});

export const consoleTablet = style({
  display: "none",
  background: vars.color.bg,
  width: "100%",
  maxWidth: "880px",
  margin: "16px auto 0",
  padding: "28px",
  flexDirection: "column",
  gap: "16px",
  borderRadius: vars.radius.xl,
  "@media": {
    [breakpoints.tablet]: {
      display: "flex",
    },
    [breakpoints.desktop]: {
      display: "none",
    },
  },
});

export const consoleDesktop = style({
  display: "none",
  background: vars.color.bg,
  width: "100%",
  maxWidth: "1280px",
  margin: "20px auto 0",
  padding: "36px",
  flexDirection: "column",
  gap: "22px",
  borderRadius: vars.radius.xl,
  minHeight: "720px",
  "@media": {
    [breakpoints.desktop]: {
      display: "flex",
    },
  },
});

export const statusRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const statusLeft = style({
  display: "flex",
  alignItems: "center",
  gap: "10px",
});

export const statusDivider = style({
  width: "1px",
  height: "14px",
  background: vars.color.hair,
});

export const label = style({
  fontFamily: vars.font.mono,
  fontSize: "10px",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: vars.color.mute,
});

export const labelRight = style({
  textAlign: "right",
});

export const twoCol = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "14px",
});

export const desktopBody = style({
  display: "grid",
  gridTemplateColumns: "1.4fr 1fr",
  gap: "22px",
  flex: 1,
  minHeight: 0,
});

export const desktopLeft = style({
  display: "flex",
  flexDirection: "column",
  gap: "18px",
});

export const desktopRight = style({
  display: "flex",
  flexDirection: "column",
  gap: "14px",
});

export const desktopTransport = style({
  display: "flex",
  alignItems: "center",
  gap: "14px",
});

export const meterGrid = style({
  background: vars.color.panel,
  border: `1px solid ${vars.color.hair}`,
  borderRadius: vars.radius.xl,
  padding: "14px 18px",
  fontFamily: vars.font.sans,
});

export const meterGridList = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "6px",
  marginTop: "10px",
});

export const meterGridButton = style({
  padding: "10px 0",
  borderRadius: "8px",
  border: `1px solid ${vars.color.hair}`,
  background: "transparent",
  color: vars.color.ink,
  fontFamily: vars.font.mono,
  fontSize: "12px",
  fontWeight: 500,
  cursor: "pointer",
});

export const meterGridButtonActive = style({
  borderColor: vars.color.accent,
  background: vars.color.accentSoft,
  color: vars.color.accent,
});

export const shortcuts = style({
  marginTop: "auto",
  padding: "14px 18px",
  border: `1px dashed ${vars.color.hair}`,
  borderRadius: vars.radius.xl,
});

export const shortcutsGrid = style({
  marginTop: "10px",
  display: "grid",
  gridTemplateColumns: "1fr auto",
  rowGap: "6px",
  fontFamily: vars.font.mono,
  fontSize: "11px",
  color: vars.color.mute,
});

export const shortcutKey = style({
  color: vars.color.ink,
});
