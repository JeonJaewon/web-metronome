import { style } from "@vanilla-extract/css";

export const wrapper = style({
  maxWidth: "600px",
  padding: "20px",
  margin: "0 auto",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow:
    "rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset",
});
