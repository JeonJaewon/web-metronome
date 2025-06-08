import styles from "@/components/VolumeController/VolumeController.module.css";
import { useMetronomeScheduler } from "@/lib/metronome";

export function VolumeController() {
  const { volume, setVolume } = useMetronomeScheduler();
  return (
    <div className={styles.volumeController}>
      <label htmlFor="volume">Volume</label>
      <input
        id="volume"
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
      />
    </div>
  );
}
