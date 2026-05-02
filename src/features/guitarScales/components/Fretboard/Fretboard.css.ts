import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const root = style({
  position: "relative",
  width: "100%",
  background: vars.color.fretboardBg,
  border: `1px solid ${vars.color.hair}`,
  borderRadius: "12px",
  overflow: "hidden",
  cursor: "pointer",
  userSelect: "none",
  touchAction: "none",
});
