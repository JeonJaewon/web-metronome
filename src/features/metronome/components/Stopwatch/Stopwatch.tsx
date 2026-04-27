import * as styles from "@/features/metronome/components/Stopwatch/Stopwatch.css";
import { useMetronomeScheduler } from "@/features/metronome/lib/useMetronomeScheduler";
import { useEffect, useState } from "react";

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

export const Stopwatch = () => {
  const { isPlaying } = useMetronomeScheduler();
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className={styles.root}>
      <span className={styles.label}>Elapsed</span>
      <span className={styles.value}>{formatTime(time)}</span>
    </div>
  );
};
