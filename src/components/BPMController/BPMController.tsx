import styles from "@/components/BPMController/BPMController.module.css";
import { useMetronomeScheduler } from "@/lib/metronome";
import { useKeyControl } from "@/lib/useKeyControl";
import { Box, Flex, Slider, Text } from "@mantine/core";

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
    <Box w="80%" m="0 auto">
      <Text fw={700} size="34px">
        {bpm} BPM
      </Text>
      <Flex mt="12px" justify="space-between" align="center">
        <div className={styles.buttonsContainer}>
          <button onClick={() => setBPM(bpm - 10)}>-10</button>
          <button onClick={() => setBPM(bpm - 1)}>-1</button>
        </div>
        <div className={styles.buttonsContainer}>
          <button onClick={() => setBPM(bpm + 1)}>+1</button>
          <button onClick={() => setBPM(bpm + 10)}>+10</button>
        </div>
      </Flex>
      <Slider
        mt="md"
        value={bpm}
        min={MIN_BPM}
        max={MAX_BPM}
        step={1}
        onChange={(value) => setBPM(value)}
        label={(value) => `${value} BPM`}
      />
    </Box>
  );
}
