import styles from "@/App.module.css";
import { AccentToggleController } from "@/components/AccentToggleController/AccentToggleController";
import { BeatSelector } from "@/components/BeatSelector/BeatSelector";
import { BPMController } from "@/components/BPMController/BPMController";
import { PlayButton } from "@/components/PlayButton/PlayButton";
import { Stopwatch } from "@/components/Stopwatch/Stopwatch";
import { VisualizerSwitch } from "@/components/VisualizerSwitch/VisualizerSwitch";
import { VolumeController } from "@/components/VolumeController/VolumeController";
import { Flex } from "@mantine/core";

function App() {
  return (
    <div className={styles.wrapper}>
      <VisualizerSwitch />
      <BPMController />
      <BeatSelector />
      <AccentToggleController />
      <Flex gap="sm" mt="xl">
        <PlayButton />
        <VolumeController />
      </Flex>
      <Stopwatch />
    </div>
  );
}

export default App;
