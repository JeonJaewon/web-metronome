import * as styles from "@/features/metronome/components/BPMController/BPMController.css";
import { useFeatureContext } from "@/contexts/featureContext";
import { useMetronomeScheduler } from "@/features/metronome/lib/useMetronomeScheduler";
import { useKeyControl } from "@/hooks/useKeyControl";
import { Box, Flex, Slider, Text } from "@mantine/core";

const MIN_BPM = 40;
const MAX_BPM = 240;

export function BPMController() {
  const { bpm, setBPM } = useMetronomeScheduler();
  const { focusedFeature } = useFeatureContext();

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
      <Flex
        mt={focusedFeature === "metronome" ? "12px" : "-30px"}
        justify="space-between"
        align="center"
      >
        <div className={styles.buttonsContainer}>
          <button
            className={styles.bpmAdjustButton}
            onClick={() => setBPM(bpm - 10)}
          >
            -10
          </button>
          <button
            className={styles.bpmAdjustButton}
            onClick={() => setBPM(bpm - 1)}
          >
            -1
          </button>
        </div>
        <div className={styles.buttonsContainer}>
          <button
            className={styles.bpmAdjustButton}
            onClick={() => setBPM(bpm + 1)}
          >
            +1
          </button>
          <button
            className={styles.bpmAdjustButton}
            onClick={() => setBPM(bpm + 10)}
          >
            +10
          </button>
        </div>
      </Flex>
      {focusedFeature === "metronome" && (
        <Slider
          mt="md"
          value={bpm}
          min={MIN_BPM}
          max={MAX_BPM}
          step={1}
          onChange={(value) => setBPM(value)}
          label={(value) => `${value} BPM`}
        />
      )}
    </Box>
  );
}
