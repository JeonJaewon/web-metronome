import * as styles from "@/features/metronome/components/VolumeController/VolumeController.css";
import { useMetronomeScheduler } from "@/features/metronome/lib/useMetronomeScheduler";
import { useKeyControl } from "@/hooks/useKeyControl";

const MIN_VOLUME_LEVEL = 0;
const MAX_VOLUME_LEVEL = 0.5;

const VOLUME_INPUT_STEP = MAX_VOLUME_LEVEL / 100;
const VOLUME_KEYBOARD_STEP = VOLUME_INPUT_STEP * 5;

const toPercent = (value: number) =>
  Math.round((value / MAX_VOLUME_LEVEL) * 100);

export function VolumeController() {
  const { volume, setVolume } = useMetronomeScheduler();

  useKeyControl("ArrowUp", () => {
    setVolume(Math.min(volume + VOLUME_KEYBOARD_STEP, MAX_VOLUME_LEVEL));
  });

  useKeyControl("ArrowDown", () => {
    setVolume(Math.max(volume - VOLUME_KEYBOARD_STEP, MIN_VOLUME_LEVEL));
  });

  const frac = volume / MAX_VOLUME_LEVEL;

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <span className={styles.label}>Volume</span>
        <span className={styles.label}>{toPercent(volume)}%</span>
      </div>
      <div className={styles.slider}>
        <input
          type="range"
          min={MIN_VOLUME_LEVEL}
          max={MAX_VOLUME_LEVEL}
          step={VOLUME_INPUT_STEP}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className={styles.range}
          aria-label="Volume"
        />
        <div className={styles.fill} style={{ width: `${frac * 100}%` }} />
        <div className={styles.thumb} style={{ left: `${frac * 100}%` }} />
      </div>
    </div>
  );
}
