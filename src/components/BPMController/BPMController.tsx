import styles from "@/components/BPMController/BPMController.module.css";
import { useMetronomeScheduler } from "@/lib/metronome";
import { useKeyControl } from "@/lib/useKeyControl";
import { Box, Slider, Text } from "@mantine/core";

const MIN_BPM = 40;
const MAX_BPM = 240;

export function BPMController() {
  const { bpm, setBPM } = useMetronomeScheduler();

  useKeyControl("ArrowRight", () => {
    setBPM(Math.min(bpm + 1, MAX_BPM));
  });

  useKeyControl("ArrowLeft", () => {
    setBPM(Math.max(bpm - 1, MIN_BPM));
  });

  return (
    <div className={styles.bpmController}>
      <div className={styles.buttonsContainer}>
        <button onClick={() => setBPM(bpm - 10)}>-10</button>
        <button onClick={() => setBPM(bpm - 1)}>-1</button>
      </div>
      <Box w="100%" px="md">
        <Text fw={700} size="xl">
          {bpm} BPM
        </Text>
        <Slider
          value={bpm}
          min={MIN_BPM}
          max={MAX_BPM}
          step={1}
          onChange={(value) => setBPM(value)}
          label={(value) => `${value} BPM`}
        />
      </Box>
      <div className={styles.buttonsContainer}>
        <button onClick={() => setBPM(bpm + 1)}>+1</button>
        <button onClick={() => setBPM(bpm + 10)}>+10</button>
      </div>
    </div>
  );
}
