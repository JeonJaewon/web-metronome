import styles from "@/App.module.css";
import { AccentToggleController } from "@/components/AccentToggleController/AccentToggleController";
import { BeatSelector } from "@/components/BeatSelector/BeatSelector";
import { BPMController } from "@/components/BPMController/BPMController";
import { PlayButton } from "@/components/PlayButton/PlayButton";
import { Stopwatch } from "@/components/Stopwatch/Stopwatch";
import { PentatonicScaleDisplay } from "@/components/PentatonicScaleDisplay/PentatonicScaleDisplay";
import { VisualizerSwitch } from "@/components/VisualizerSwitch/VisualizerSwitch";
import { VolumeController } from "@/components/VolumeController/VolumeController";

function App() {
  return (
    <div className={styles.wrapper}>
      <VisualizerSwitch />
      <PentatonicScaleDisplay />
      <BPMController />
      <VolumeController />
      <BeatSelector />
      <AccentToggleController />
      <PlayButton />
      <Stopwatch />
    </div>
  );
}

export default App;
