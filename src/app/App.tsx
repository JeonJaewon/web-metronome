import * as styles from "@/app/App.css";
import { AccentToggleController } from "@/features/metronome/components/AccentToggleController/AccentToggleController";
import { BeatSelector } from "@/features/metronome/components/BeatSelector/BeatSelector";
import { BPMController } from "@/features/metronome/components/BPMController/BPMController";
import { PlayButton } from "@/features/metronome/components/PlayButton/PlayButton";
import { Stopwatch } from "@/features/metronome/components/Stopwatch/Stopwatch";
import { VisualizerSwitch } from "@/features/metronome/components/VisualizerSwitch/VisualizerSwitch";
import { VolumeController } from "@/features/metronome/components/VolumeController/VolumeController";
import { useFeatureContext } from "@/contexts/featureContext";
import { Flex } from "@mantine/core";
import { motion } from "motion/react";

export default function App() {
  const { focusedFeature, setFocusedFeature } = useFeatureContext();

  return (
    <>
      <button onClick={() => setFocusedFeature("guitarScales")}>
        Switch to Guitar Scales
      </button>
      <motion.div
        className={styles.wrapper}
        initial={{ y: 0, scale: 1 }}
        animate={
          focusedFeature !== "metronome"
            ? { y: -300, scale: 0.8 }
            : { y: 0, scale: 1 }
        }
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      >
        {focusedFeature === "metronome" && <VisualizerSwitch />}
        <BPMController />
        <Flex
          mt="xl"
          p="lg"
          gap="20px"
          direction="column"
          bd="1px solid #ddd"
          bdrs={8}
          justify="center"
          align="center"
        >
          <BeatSelector />
          <AccentToggleController />
        </Flex>
        <Flex gap="sm" mt="xl">
          <PlayButton />
          <VolumeController />
        </Flex>
        <Stopwatch />
      </motion.div>
    </>
  );
}
