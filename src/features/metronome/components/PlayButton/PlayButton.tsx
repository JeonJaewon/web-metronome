import { useFeatureContext } from "@/contexts/featureContext";
import * as styles from "@/features/metronome/components/PlayButton/PlayButton.css";
import { useMetronomeScheduler } from "@/features/metronome/lib/useMetronomeScheduler";
import { useKeyControl } from "@/hooks/useKeyControl";

const SPACEBAR_KEY = " ";

export const PlayButton = () => {
  const { focusedFeature } = useFeatureContext();
  const { isPlaying, startMetronome, stopMetronome } = useMetronomeScheduler();

  const toggleMetronome = () => {
    if (isPlaying) {
      stopMetronome();
    } else {
      startMetronome();
    }
  };

  useKeyControl(SPACEBAR_KEY, toggleMetronome);

  const preventSpaceKeyToggle = (
    event: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (event.key === SPACEBAR_KEY) {
      event.preventDefault();
    }
  };

  if (focusedFeature === "metronome") {
    return (
      <button
        className={styles.metronomeController}
        onClick={toggleMetronome}
        onKeyDown={preventSpaceKeyToggle}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
        {isPlaying ? "Pause" : "Play"}
      </button>
    );
  }

  return (
    <button className={styles.unfocusedPlayButton}>
      {isPlaying ? <PauseIcon /> : <PlayIcon />}
    </button>
  );
};

const PlayIcon = () => (
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
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
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    height="20px"
    width="20px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="6" y="4" width="4" height="16"></rect>
    <rect x="14" y="4" width="4" height="16"></rect>
  </svg>
);
