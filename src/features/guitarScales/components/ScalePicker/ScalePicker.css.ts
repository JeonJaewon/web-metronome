import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const wrapList = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "6px",
});

export const chip = style({
  padding: "8px 12px",
  border: `1px solid ${vars.color.hair}`,
  borderRadius: "999px",
  background: "transparent",
  color: vars.color.ink,
  fontFamily: vars.font.sans,
  fontSize: "12px",
  fontWeight: 500,
  cursor: "pointer",
  whiteSpace: "nowrap",
  transition: "background .12s, color .12s, border-color .12s",
});

export const chipActive = style({
  borderColor: vars.color.accent,
  background: vars.color.accent,
  color: "#ffffff",
});

export const list = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

export const listItem = style({
  textAlign: "left",
  padding: "12px 14px",
  border: `1px solid ${vars.color.hair}`,
  borderRadius: "10px",
  background: "transparent",
  color: vars.color.mute,
  fontFamily: vars.font.sans,
  fontSize: "13px",
  fontWeight: 400,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  transition: "background .12s, color .12s, border-color .12s",
});

export const listItemActive = style({
  borderColor: vars.color.accent,
  background: "#ffffff",
  color: vars.color.ink,
  fontWeight: 500,
});

export const listDot = style({
  width: "6px",
  height: "6px",
  borderRadius: "50%",
  background: vars.color.accent,
});

export const selectWrap = style({
  position: "relative",
});

export const selectButton = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 14px",
  background: "#ffffff",
  color: vars.color.ink,
  border: `1px solid ${vars.color.hair}`,
  borderRadius: "10px",
  fontFamily: vars.font.sans,
  fontSize: "14px",
  fontWeight: 500,
  cursor: "pointer",
});

export const caret = style({
  color: vars.color.mute,
  transition: "transform .15s",
});

export const caretOpen = style({
  transform: "rotate(180deg)",
});

export const popover = style({
  position: "absolute",
  top: "calc(100% + 6px)",
  left: 0,
  right: 0,
  zIndex: 10,
  background: "#ffffff",
  border: `1px solid ${vars.color.hair}`,
  borderRadius: "10px",
  boxShadow: "0 12px 40px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.06)",
  padding: "4px",
  display: "flex",
  flexDirection: "column",
  gap: "2px",
});

export const popoverItem = style({
  textAlign: "left",
  padding: "10px 12px",
  border: "none",
  borderRadius: "7px",
  background: "transparent",
  color: vars.color.ink,
  fontFamily: vars.font.sans,
  fontSize: "13px",
  fontWeight: 400,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  selectors: {
    "&:hover": {
      background: vars.color.panel,
    },
  },
});

export const popoverItemActive = style({
  background: vars.color.panel,
  fontWeight: 500,
});

export const popoverDot = style({
  width: "6px",
  height: "6px",
  borderRadius: "50%",
  background: vars.color.accent,
});
