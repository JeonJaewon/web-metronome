import * as styles from "@/components/BeatSelector/BeatSelector.css";
import { useMetronomeScheduler } from "@/lib/metronome";
import { Select } from "@mantine/core";

const toMantineSelectValue = (value: number) => value.toString();

export const BeatSelector = () => {
  const { setBeatsPerMeasure, beatsPerMeasure } = useMetronomeScheduler();
  return (
    <div className={styles.beatSelector}>
      <Select
        label="Beat Options"
        placeholder="Select beats"
        data={[2, 3, 4, 5, 6].map((value) => ({
          value: toMantineSelectValue(value),
          label: `${value} Beats`,
        }))}
        value={toMantineSelectValue(beatsPerMeasure)}
        onChange={(value) => setBeatsPerMeasure(Number(value))}
      />
    </div>
  );
};
