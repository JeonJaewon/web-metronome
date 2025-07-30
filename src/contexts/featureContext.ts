import { createSafeContext } from "dogu-utils";

export type Feature = "metronome" | "guitarScales";

type FeatureContextValue = {
  focusedFeature: Feature;
  setFocusedFeature: (feature: Feature) => void;
};

export const [FeatureContextProvider, useFeatureContext] =
  createSafeContext<FeatureContextValue>();
