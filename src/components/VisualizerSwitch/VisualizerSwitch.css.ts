import { style } from "@vanilla-extract/css";

export const segmentedControl = style({
  position: "relative",
  display: "flex",
  width: "220px",
  background: "#e0e0e0",
  borderRadius: "12px",
  margin: "0 auto 16px auto",
  overflow: "hidden",
  height: "40px",
});

export const button = style({
  flex: 1,
  background: "none",
  border: "none",
  outline: "none",
  zIndex: 1,
  fontSize: "16px",
  cursor: "pointer",
  color: "#555",
  transition: "color 0.2s",
  height: "100%",
});

export const active = style({
  color: "#fff",
});

export const slider = style({
  position: "absolute",
  top: 0,
  height: "100%",
  background: "#2196f3",
  borderRadius: "12px",
  transition: "left 0.2s",
  zIndex: 0,
});

export const visualizerContainer = style({
  marginTop: "24px",
  display: "flex",
  justifyContent: "center",
  height: "200px",
});
