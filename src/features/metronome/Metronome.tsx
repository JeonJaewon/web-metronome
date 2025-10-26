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
import clsx from "clsx";
import { AnimatePresence, motion, TargetAndTransition } from "motion/react";
import { useRef } from "react";

export const Metronome = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { focusedFeature } = useFeatureContext();

  const metronomeAnimationProps: TargetAndTransition =
    focusedFeature === "metronome"
      ? {
          scale: 1,
        }
      : {
          y: -40,
          scale: 0.8,
        };

  return (
    <motion.div
      ref={ref}
      className={clsx(
        styles.wrapper,
        focusedFeature === "metronome" ? styles.active : styles.inactive
      )}
      animate={metronomeAnimationProps}
    >
      <AnimatePresence>
        {focusedFeature === "metronome" && (
          <motion.div exit={{ opacity: 0, height: 0 }}>
            <VisualizerSwitch />
          </motion.div>
        )}
      </AnimatePresence>
      <BPMController />
      <AnimatePresence>
        {focusedFeature === "metronome" && (
          <motion.div exit={{ opacity: 0, height: 0 }}>
            <div className={styles.rhythmSection}>
              <BeatSelector />
              <AccentToggleController />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
