import * as styles from "@/features/metronome/components/HeroPlay/HeroPlay.css";
import { PlayPauseIcon } from "@/components/PlayPauseIcon/PlayPauseIcon";
import { scheduler, useIsPlaying } from "@/features/metronome/lib/scheduler";
import { useKeyControl } from "@/hooks/useKeyControl";
import clsx from "clsx";

type Props = {
  height?: number;
  showLabel?: boolean;
};

export const HeroPlay = ({ height = 84, showLabel = true }: Props) => {
  const isPlaying = useIsPlaying();

  useKeyControl(" ", scheduler.toggle);

  const iconSize = Math.round(height * 0.32);
  const radius = Math.round(height * 0.22);
  const fontSize = Math.round(height * 0.22);

  return (
    <button
      type="button"
      onClick={scheduler.toggle}
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
