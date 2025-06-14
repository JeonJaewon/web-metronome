import styles from "@/components/PlayButton/PlayButton.module.css";
import { useMetronomeScheduler } from "@/lib/metronome";
import { useKeyControl } from "@/lib/useKeyControl";

const SPACE_KEY = " ";

export const PlayButton = () => {
  const { isPlaying, startMetronome, stopMetronome } = useMetronomeScheduler();

  useKeyControl(SPACE_KEY, () => {
    if (isPlaying) {
      stopMetronome();
    } else {
      startMetronome();
    }
  });

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
