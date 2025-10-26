import { STRING_COUNT } from "@/features/guitarScales/components/GuitarFretboard";
import { style } from "@vanilla-extract/css";

export const fretboard = style({
  display: "grid",
  width: "80%",
  margin: "20px auto 0 auto",
  justifyContent: "center",
  gridTemplateRows: `repeat(${STRING_COUNT}, 1fr)`,
});

export const fretMarker = style({
  width: "60px",
  textAlign: "center",
  fontSize: "18px",
  fontWeight: "bold",
});

export const string = style({
  display: "flex",
  position: "relative",
  borderLeft: "2px solid #ccc",
});

export const firstString = style({
  selectors: {
    "&::before": {
      content: '""',
      position: "absolute",
      left: "-2px",
      top: 0,
      width: "2px",
      height: "15px",
      background: "white",
    },
  },
});

export const sixthString = style({
  selectors: {
    "&::before": {
      content: '""',
      position: "absolute",
      left: "-2px",
      bottom: 0,
      width: "2px",
      height: "15px",
      background: "white",
    },
  },
});
