import * as styles from "@/features/metronome/components/PlayButton/PlayButton.css";
import { useMetronomeScheduler } from "@/features/metronome/lib/useMetronomeScheduler";
import { useKeyControl } from "@/hooks/useKeyControl";

const SPACEBAR_KEY = " ";

export const PlayButton = () => {
  const { isPlaying, startMetronome, stopMetronome } = useMetronomeScheduler();

  useKeyControl(SPACEBAR_KEY, () => {
    if (isPlaying) {
      stopMetronome();
    } else {
      startMetronome();
    }
  });

  return (
    <button
      className={styles.metronomeController}
      onClick={() => {
        if (isPlaying) {
          stopMetronome();
        } else {
          startMetronome();
        }
      }}
    >
      {isPlaying ? <PauseIcon /> : <PlayIcon />}
      {isPlaying ? "Pause" : "Play"}
    </button>
  );
};

const PlayIcon = () => (
  <svg
    stroke="currentColor"
    fill="none"
    stroke-width="2"
    viewBox="0 0 24 24"
    stroke-linecap="round"
    stroke-linejoin="round"
    height="20px"
    width="20px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);

const PauseIcon = () => (
  <svg
    stroke="currentColor"
    fill="none"
    stroke-width="2"
    viewBox="0 0 24 24"
    stroke-linecap="round"
    stroke-linejoin="round"
    height="20px"
    width="20px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="6" y="4" width="4" height="16"></rect>
    <rect x="14" y="4" width="4" height="16"></rect>
  </svg>
);
