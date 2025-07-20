import { useFeatureContext } from "@/contexts/featureContext";
import { GuitarFretboard } from "./components/GuitarFretboard";

export const GuitarScales = () => {
  const { focusedFeature } = useFeatureContext();

  if (focusedFeature !== "guitarScales") {
    return null;
  }

  return <GuitarFretboard />;
};
