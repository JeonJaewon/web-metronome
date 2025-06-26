
import { style } from "@vanilla-extract/css";

export const volumeController = style({
  display: "flex",
  alignItems: "center",
  flex: 1,
  borderRadius: "8px",
  border: "1px solid #ddd",
  padding: "14px",
});

export const slider = style({
  transition: "width 0.3s, transform 0.3s",
});

export const sliderHidden = style([slider, {
  width: 0,
}]);

export const sliderVisible = style([slider, {
  width: "100%",
}]);
