import { style } from "@vanilla-extract/css";

export const cellButton = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  borderRight: "1px solid #ccc",
  cursor: "pointer",
  backgroundColor: "white",
  fontWeight: "normal",
  transition: "background 0.15s, font-weight 0.15s",
  width: "60px",
  selectors: {
    "&::before": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      top: "50%",
      height: "2px",
      background: "#bbb",
      transform: "translateY(-50%)",
      zIndex: 0,
    },
  },
});

export const firstString = style({
  selectors: {
    "&::after": {
      content: '""',
      position: "absolute",
      right: "-2px",
      top: 0,
      width: "2px",
      height: "15px",
      background: "white",
      zIndex: 0,
    },
  },
});

export const sixthString = style({
  selectors: {
    "&::after": {
      content: '""',
      position: "absolute",
      right: "-2px",
      bottom: 0,
      width: "2px",
      height: "15px",
      background: "white",
      zIndex: 0,
    },
  },
});

export const circle = style({
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  backgroundColor: "black",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
