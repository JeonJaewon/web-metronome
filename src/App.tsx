import * as styles from "@/App.css";
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
      <Flex
        mt="xl"
        p="lg"
        gap="40px"
        bd="1px solid #ddd"
        bdrs={8}
        justify="center"
        align="centejr"
      >
        <BeatSelector />
        <AccentToggleController />
      </Flex>
      <Flex gap="sm" mt="xl">
        <PlayButton />
        <VolumeController />
      </Flex>
      <Stopwatch />
    </div>
  );
}

export default App;
