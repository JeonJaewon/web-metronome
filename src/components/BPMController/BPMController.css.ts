import { style } from "@vanilla-extract/css";

export const buttonsContainer = style({
  display: "flex",
  alignItems: "center",
});

export const bpmAdjustButton = style({
  padding: "3px 12px",
  border: "1px solid #ddd",
  selectors: {
    "&:first-of-type": {
      borderRadius: "4px 0 0 4px",
    },
    "&:last-of-type": {
      borderLeft: "none",
      borderRadius: "0 4px 4px 0",
    },
  },
});
