import { style } from "@vanilla-extract/css";

export const metronomeController = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flex: 2,
  border: "1px solid #ddd",
  backgroundColor: "white",
  gap: "4px",
});

export const unfocusedPlayButton = style({
  width: "80%",
  margin: "20px auto 0 auto",
});
