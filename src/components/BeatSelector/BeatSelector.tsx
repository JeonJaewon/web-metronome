import styles from "@/components/BeatSelector/BeatSelector.module.css";
import { useMetronomeScheduler } from "@/lib/metronome";

export const BeatSelector = () => {
  const { setBeatsPerMeasure, beatsPerMeasure } = useMetronomeScheduler();
  return (
    <div className={styles.beatSelector}>
      <select
        onChange={(e) => setBeatsPerMeasure(Number(e.target.value))}
        value={beatsPerMeasure}
      >
        {[2, 3, 4, 5, 6].map((beats) => (
          <option key={beats} value={beats}>
            {beats} Beats
          </option>
        ))}
      </select>
    </div>
  );
};
