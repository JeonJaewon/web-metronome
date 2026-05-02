import * as styles from "@/features/metronome/components/Stopwatch/Stopwatch.css";
import { usePlaybackElapsed } from "@/features/metronome/lib/playbackClock";

const formatTime = (seconds: number) => {
  const total = Math.floor(seconds);
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

export const Stopwatch = () => {
  const elapsed = usePlaybackElapsed();
  return (
    <div className={styles.root}>
      <span className={styles.label}>Elapsed</span>
      <span className={styles.value}>{formatTime(elapsed)}</span>
    </div>
  );
};
