import * as styles from "@/features/metronome/components/HeroPlay/HeroPlay.css";
import { PlayPauseIcon } from "@/components/PlayPauseIcon/PlayPauseIcon";
import { useMetronomeScheduler } from "@/features/metronome/lib/useMetronomeScheduler";
import { useKeyControl } from "@/hooks/useKeyControl";
import clsx from "clsx";

type Props = {
  height?: number;
  showLabel?: boolean;
};

export const HeroPlay = ({ height = 84, showLabel = true }: Props) => {
  const { isPlaying, toggleMetronome } = useMetronomeScheduler();

  useKeyControl(" ", toggleMetronome);

  const iconSize = Math.round(height * 0.32);
  const radius = Math.round(height * 0.22);
  const fontSize = Math.round(height * 0.22);

  return (
    <button
      type="button"
      onClick={toggleMetronome}
      aria-label={isPlaying ? "Stop" : "Start"}
      className={clsx(styles.root, isPlaying && styles.running)}
      style={{ height, borderRadius: radius, fontSize }}
    >
      <PlayPauseIcon playing={isPlaying} size={iconSize} />
      {showLabel && (
        <span className={styles.label}>{isPlaying ? "Stop" : "Start"}</span>
      )}
    </button>
  );
};
