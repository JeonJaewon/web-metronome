import { Feature, FeatureContextProvider } from "@/contexts/featureContext";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: Props) => {
  const [focusedFeature, setFocusedFeature] = useState<Feature>("metronome");
  return (
    <FeatureContextProvider value={{ focusedFeature, setFocusedFeature }}>
      {children}
    </FeatureContextProvider>
  );
};
