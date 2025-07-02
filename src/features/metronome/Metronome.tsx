import { useFeatureContext } from "@/contexts/featureContext";
import * as styles from "@/features/metronome/Metronome.css";
import { AccentToggleController } from "@/features/metronome/components/AccentToggleController/AccentToggleController";
import { BPMController } from "@/features/metronome/components/BPMController/BPMController";
import { BeatSelector } from "@/features/metronome/components/BeatSelector/BeatSelector";
import { PlayButton } from "@/features/metronome/components/PlayButton/PlayButton";
import { Stopwatch } from "@/features/metronome/components/Stopwatch/Stopwatch";
import { VisualizerSwitch } from "@/features/metronome/components/VisualizerSwitch/VisualizerSwitch";
import { VolumeController } from "@/features/metronome/components/VolumeController/VolumeController";
import { Flex } from "@mantine/core";
import { motion } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";

export const Metronome = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { focusedFeature } = useFeatureContext();
  const [targetY, setTargetY] = useState(0);

  useLayoutEffect(() => {
    if (focusedFeature !== "metronome" && ref.current) {
      // focusedFeature가 metronome으로 변경된 후 실제 DOM 변경이 완료되면 위치 계산
      const rect = ref.current.getBoundingClientRect();
      setTargetY(-rect.top);
    } else {
      setTargetY(0);
    }
  }, [focusedFeature]);

  return (
    <motion.div
      ref={ref}
      className={styles.wrapper}
      initial={{ y: 0, scale: 1 }}
      animate={
        focusedFeature !== "metronome"
          ? {
              y: targetY + 60,
              scale: 0.8,
            }
          : {
              y: 0,
              scale: 1,
            }
      }
      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
    >
      {focusedFeature === "metronome" && <VisualizerSwitch />}
      <BPMController />
      {focusedFeature === "metronome" && (
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
      )}
      {focusedFeature === "metronome" ? (
        <Flex gap="sm" mt="xl">
          <PlayButton />
          <VolumeController />
        </Flex>
      ) : (
        <PlayButton />
      )}

      {focusedFeature === "metronome" && <Stopwatch />}
    </motion.div>
  );
};
