import { useMetronomeScheduler } from "@/features/metronome/lib/useMetronomeScheduler";
import * as styles from "@/features/metronome/components/BeatVisualizer/BeatVisualizer.css";

const BeatVisualizer = () => {
  const { beatsPerMeasure, currentBeat } = useMetronomeScheduler();
  return (
    <div className={styles.beatVisualizer}>
      {Array.from({ length: beatsPerMeasure }, (_, index) => {
        const beatNumber = index + 1;
        const isActive = beatNumber === currentBeat;
        return (
          <div
            key={beatNumber}
            className={`${styles.beatCircle} ${
              isActive ? styles.beatCircleActive : ""
            }`}
          ></div>
        );
      })}
    </div>
  );
};

export default BeatVisualizer;
