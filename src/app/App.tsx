import { FeatureTabs } from "@/components/FeatureTabs/FeatureTabs";
import { Metronome } from "@/features/metronome/Metronome";

export default function App() {
  return (
    <div>
      <Metronome />
      <FeatureTabs />
    </div>
  );
}
