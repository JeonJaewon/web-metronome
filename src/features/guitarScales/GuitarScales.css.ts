import { style } from "@vanilla-extract/css";
import { vars, breakpoints } from "@/features/metronome/theme.css";

export const wrapper = style({
  width: "100%",
  margin: "0 auto",
  paddingBottom: "32px",
  fontFamily: vars.font.sans,
  color: vars.color.ink,
});

export const consoleMobile = style({
  background: vars.color.bg,
  width: "100%",
  maxWidth: "440px",
  margin: "16px auto 0",
  padding: "18px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  borderRadius: vars.radius.xl,
  "@media": {
    [breakpoints.tablet]: { display: "none" },
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
  gap: "18px",
  borderRadius: vars.radius.xl,
  "@media": {
    [breakpoints.tablet]: { display: "flex" },
    [breakpoints.desktop]: { display: "none" },
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
    [breakpoints.desktop]: { display: "flex" },
  },
});

export const headerRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
});

export const headerActions = style({
  display: "flex",
  alignItems: "center",
  gap: "14px",
});

export const nowShowing = style({
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  marginTop: "4px",
});

export const subLabel = style({
  fontFamily: vars.font.mono,
  fontSize: "10px",
  letterSpacing: "0.16em",
  color: vars.color.mute,
  textTransform: "uppercase",
});

export const card = style({
  background: vars.color.panel,
  border: `1px solid ${vars.color.hair}`,
  borderRadius: vars.radius.xl,
  padding: "14px",
});

export const cardHeader = style({
  fontFamily: vars.font.mono,
  fontSize: "10px",
  letterSpacing: "0.22em",
  color: vars.color.mute,
  textTransform: "uppercase",
  marginBottom: "8px",
});

export const sectionLabel = style({
  fontFamily: vars.font.mono,
  fontSize: "10px",
  letterSpacing: "0.22em",
  color: vars.color.mute,
  textTransform: "uppercase",
});

export const summaryRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
});

export const fillBottom = style({
  marginTop: "auto",
  display: "flex",
  justifyContent: "flex-end",
});

export const tabletBody = style({
  display: "grid",
  gridTemplateColumns: "1fr 220px",
  gap: "18px",
  flex: 1,
  minHeight: 0,
});

export const tabletLeft = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export const tabletSidePanel = style({
  background: vars.color.panel,
  border: `1px solid ${vars.color.hair}`,
  borderRadius: vars.radius.xl,
  padding: "14px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const desktopBody = style({
  display: "grid",
  gridTemplateColumns: "1.6fr 1fr",
  gap: "24px",
  flex: 1,
  minHeight: 0,
});

export const desktopLeft = style({
  display: "flex",
  flexDirection: "column",
  gap: "18px",
});

export const desktopRight = style({
  background: vars.color.panel,
  border: `1px solid ${vars.color.hair}`,
  borderRadius: vars.radius.xl,
  padding: "22px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

export const desktopFooter = style({
  marginTop: "auto",
  paddingTop: "16px",
  borderTop: `1px solid ${vars.color.hair}`,
});

export const notesList = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "6px",
  marginTop: "10px",
});

export const noteChip = style({
  padding: "6px 10px",
  borderRadius: "8px",
  background: vars.color.bg,
  color: vars.color.ink,
  fontFamily: vars.font.mono,
  fontSize: "12px",
  fontWeight: 500,
  letterSpacing: "0.04em",
});

export const noteChipRoot = style({
  background: vars.color.accent,
  color: vars.color.onAccent,
});

export const sectionGap = style({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

