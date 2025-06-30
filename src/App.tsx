import * as styles from "@/App.css";
import { AccentToggleController } from "@/components/AccentToggleController/AccentToggleController";
import { BeatSelector } from "@/components/BeatSelector/BeatSelector";
import { BPMController } from "@/components/BPMController/BPMController";
import { PlayButton } from "@/components/PlayButton/PlayButton";
import { Stopwatch } from "@/components/Stopwatch/Stopwatch";
import { VisualizerSwitch } from "@/components/VisualizerSwitch/VisualizerSwitch";
import { VolumeController } from "@/components/VolumeController/VolumeController";
import { Flex } from "@mantine/core";
import { motion } from "motion/react";
import { useState } from "react";

export default function App() {
  const [isIsland, setIsIsland] = useState(false);

  return (
    <>
      <button onClick={() => setIsIsland((v) => !v)}>to dynamic island</button>
      <motion.div
        className={styles.wrapper}
        initial={{ y: 0, scale: 1 }}
        animate={isIsland ? { y: -300, scale: 0.8 } : { y: 0, scale: 1 }}
        transition={{ type: "spring", bounce: 0.1, duration: 0.25 }}
      >
        {!isIsland && <VisualizerSwitch />}
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
