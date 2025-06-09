import styles from "@/components/VolumeController/VolumeController.module.css";
import { useMetronomeScheduler } from "@/lib/metronome";

const VOLUME_MIN = 0;
const VOLUME_MAX = 0.5;
const VOLUME_STEP = 0.005;

export function VolumeController() {
  const { volume, setVolume } = useMetronomeScheduler();

  const getVolumePercentage = (value: number) => {
    return Math.round((value / VOLUME_MAX) * 100);
  };

  return (
    <div className={styles.volumeController}>
      <label htmlFor="volume">Volume: {getVolumePercentage(volume)}%</label>
      <input
        id="volume"
        type="range"
        min={VOLUME_MIN}
        max={VOLUME_MAX}
        step={VOLUME_STEP}
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
      />
    </div>
  );
}
