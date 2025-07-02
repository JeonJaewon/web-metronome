import { useFeatureContext } from "@/contexts/featureContext";
import { Metronome } from "@/features/metronome/Metronome";

export default function App() {
  const { setFocusedFeature } = useFeatureContext();

  return (
    <>
      <button onClick={() => setFocusedFeature("guitarScales")}>
        Switch to Guitar Scales
      </button>
      <Metronome />
    </>
  );
}
