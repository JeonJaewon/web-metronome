import * as styles from "@/features/guitarScales/components/MiniMetronomeBar/MiniMetronomeBar.css";
import { PlayPauseIcon } from "@/components/PlayPauseIcon/PlayPauseIcon";
import {
  MAX_BPM,
  MIN_BPM,
  secondsPerBeat,
} from "@/features/metronome/lib/bpm";
import { useMetronomeScheduler } from "@/features/metronome/lib/useMetronomeScheduler";
import { useKeyControl } from "@/hooks/useKeyControl";
import clsx from "clsx";

export const MiniMetronomeBar = () => {
  const { isPlaying, bpm, toggleMetronome, setBPM } = useMetronomeScheduler();

  useKeyControl(" ", toggleMetronome);
  useKeyControl("ArrowRight", () => setBPM(Math.min(bpm + 1, MAX_BPM)));
  useKeyControl("ArrowLeft", () => setBPM(Math.max(bpm - 1, MIN_BPM)));

  return (
    <div className={styles.root}>
      <span
        className={clsx(styles.dot, isPlaying && styles.dotRunning)}
        style={{ animationDuration: `${secondsPerBeat(bpm)}s` }}
      />
      <span className={styles.bpm}>{bpm}</span>
      <span className={styles.bpmLabel}>BPM</span>
      <button
        type="button"
        onClick={toggleMetronome}
        aria-label={isPlaying ? "Pause" : "Play"}
        className={clsx(styles.playButton, isPlaying && styles.playButtonRunning)}
      >
        <PlayPauseIcon playing={isPlaying} size={10} />
      </button>
    </div>
  );
};
