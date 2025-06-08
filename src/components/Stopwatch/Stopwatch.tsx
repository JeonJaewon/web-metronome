import React, { useEffect, useState } from "react";
import styles from "@/components/Stopwatch/Stopwatch.module.css";

interface StopwatchProps {
  isPlaying: boolean;
}

const Stopwatch: React.FC<StopwatchProps> = ({ isPlaying }) => {
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

  return <div className={styles.timer}>Playing Time: {formatTime(time)}</div>;
};

export default Stopwatch;
