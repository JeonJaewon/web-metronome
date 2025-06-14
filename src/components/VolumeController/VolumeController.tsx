import styles from "@/components/VolumeController/VolumeController.module.css";
import { useMetronomeScheduler } from "@/lib/metronome";
import { useKeyControl } from "@/lib/useKeyControl";

const MIN_VOLUME_LEVEL = 0;
const MAX_VOLUME_LEVEL = 0.5;

const VOLUME_INPUT_STEP = MAX_VOLUME_LEVEL / 100;
const VOLUME_KEYBOARD_STEP = VOLUME_INPUT_STEP * 5;

export function VolumeController() {
  const { volume, setVolume } = useMetronomeScheduler();

  const getVolumePercentage = (value: number) => {
    return Math.round((value / MAX_VOLUME_LEVEL) * 100);
  };

  useKeyControl("ArrowUp", () => {
    setVolume(Math.min(volume + VOLUME_KEYBOARD_STEP, MAX_VOLUME_LEVEL));
  });

  useKeyControl("ArrowDown", () => {
    setVolume(Math.max(volume - VOLUME_KEYBOARD_STEP, MIN_VOLUME_LEVEL));
  });

  return (
    <div className={styles.volumeController}>
      <label htmlFor="volume">Volume: {getVolumePercentage(volume)}%</label>
      <input
        id="volume"
        type="range"
        min={MIN_VOLUME_LEVEL}
        max={MAX_VOLUME_LEVEL}
        step={VOLUME_INPUT_STEP}
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
      />
    </div>
  );
}
