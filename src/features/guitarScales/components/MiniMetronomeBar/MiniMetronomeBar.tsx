import * as styles from "@/features/guitarScales/components/MiniMetronomeBar/MiniMetronomeBar.css";
import { PlayPauseIcon } from "@/components/PlayPauseIcon/PlayPauseIcon";
import {
  useBpmKeyControl,
  useTogglePlayKeyControl,
} from "@/features/metronome/lib/keyboardControls";
import { useBPM } from "@/features/metronome/lib/metronomeSettings";
import { scheduler, useIsPlaying } from "@/features/metronome/lib/scheduler";
import { secondsPerBeat } from "@/lib/bpm";
import clsx from "clsx";

export const MiniMetronomeBar = () => {
  const isPlaying = useIsPlaying();
  const bpm = useBPM();

  useTogglePlayKeyControl();
  useBpmKeyControl();

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
        onClick={scheduler.toggle}
        aria-label={isPlaying ? "Pause" : "Play"}
        className={clsx(styles.playButton, isPlaying && styles.playButtonRunning)}
      >
        <PlayPauseIcon playing={isPlaying} size={10} />
      </button>
    </div>
  );
};
