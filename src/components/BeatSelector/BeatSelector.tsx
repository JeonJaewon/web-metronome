import styles from "@/components/BeatSelector/BeatSelector.module.css";
import { useMetronomeScheduler } from "@/lib/metronome";

export const BeatSelector = () => {
  const { setBeatsPerMeasure } = useMetronomeScheduler();

  return (
    <div className={styles.beatSelector}>
      <select>
        {[2, 3, 4, 5, 6].map((beats) => (
          <option key={beats} onClick={() => setBeatsPerMeasure(beats)}>
            {beats} Beats
          </option>
        ))}
      </select>
    </div>
  );
};
