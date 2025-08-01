import { style } from "@vanilla-extract/css";

export const featureTabs = style({
  position: "fixed",
  bottom: 0,
  left: "50%",
  maxWidth: "600px",
  width: "100%",
  transform: "translateX(-50%)",
  height: "80px",
  backgroundColor: "white",
  zIndex: 3,
  opacity: 0.9,
});

export const featureTab = style({
  fontSize: "18px",
  flex: 1,
});
