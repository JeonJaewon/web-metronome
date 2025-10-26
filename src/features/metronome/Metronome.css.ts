import { style } from "@vanilla-extract/css";

export const wrapper = style({
  maxWidth: "600px",
  padding: "80px 20px 0px 20px",
  width: "100%",
  margin: "0 auto",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

export const active = style({
  paddingBottom: "140px",
});

export const inactive = style({
  paddingBottom: "0px",
});

export const rhythmSection = style({
  display: "flex",
  marginTop: "32px",
  padding: "20px",
  gap: "20px",
  flexDirection: "column",
  border: "1px solid #ddd",
  borderRadius: "8px",
  justifyContent: "center",
  alignItems: "center",
});
