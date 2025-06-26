
import { style } from "@vanilla-extract/css";

export const beatSelector = style({
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  selectors: {
    "& select": {
      backgroundColor: "#f9f9f9",
      color: "black",
    },
  },
});
