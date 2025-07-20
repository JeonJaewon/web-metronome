import { FeatureTabs } from "@/components/FeatureTabs/FeatureTabs";
import { GuitarScales } from "@/features/guitarScales/GuitarScales";
import { Metronome } from "@/features/metronome/Metronome";

export default function App() {
  return (
    <div style={{ height: "100dvh", width: "100%" }}>
      <Metronome />
      <GuitarScales />
      <FeatureTabs />
    </div>
  );
}
