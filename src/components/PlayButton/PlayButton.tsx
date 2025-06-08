import styles from "@/components/PlayButton/PlayButton.module.css";
import { useMetronomeScheduler } from "@/lib/metronome";

export const PlayButton = () => {
  const { isPlaying, startMetronome, stopMetronome } = useMetronomeScheduler();
  return (
    <div className={styles.metronomeController}>
      <button
        onClick={() => {
          if (isPlaying) {
            stopMetronome();
          } else {
            startMetronome();
          }
        }}
      >
        {isPlaying ? "Stop" : "Play"}
      </button>
    </div>
  );
};
