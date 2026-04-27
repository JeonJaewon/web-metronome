import * as styles from "@/features/metronome/components/BeatVisualizer/BeatVisualizer.css";
import { useMetronomeScheduler } from "@/features/metronome/lib/useMetronomeScheduler";
import clsx from "clsx";

type Props = {
  dotSize?: number;
  gap?: number;
};

const BeatVisualizer = ({ dotSize = 14, gap = 18 }: Props) => {
  const { beatsPerMeasure, currentBeat } = useMetronomeScheduler();
  return (
    <div className={styles.wrap} style={{ gap }}>
      {Array.from({ length: beatsPerMeasure }, (_, index) => {
        const beatNumber = index + 1;
        const isActive = beatNumber === currentBeat;
        const isFirst = beatNumber === 1;
        return (
          <div
            key={beatNumber}
            className={clsx(
              styles.dot,
              isActive && styles.dotActive,
              isActive && (isFirst ? styles.dotActiveAccent : styles.dotActiveInk)
            )}
            style={{ width: dotSize, height: dotSize }}
          />
        );
      })}
    </div>
  );
};

export default BeatVisualizer;
