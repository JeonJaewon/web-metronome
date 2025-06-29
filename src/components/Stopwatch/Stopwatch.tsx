import * as styles from "@/components/Stopwatch/Stopwatch.css";
import { useMetronomeScheduler } from "@/lib/metronome";
import { useEffect, useState } from "react";

export const Stopwatch = () => {
  const { isPlaying } = useMetronomeScheduler();
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isPlaying) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isPlaying && interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className={styles.stopwatch}>Playing Time: {formatTime(time)}</div>
  );
};
