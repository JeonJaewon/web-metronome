import styles from "@/components/AccentToggleController/AccentToggleController.module.css";
import { useMetronomeScheduler } from "@/lib/metronome";

export function AccentToggleController() {
  const { accentedBeatEnabled, toggleAccentEnabled } = useMetronomeScheduler();
  return (
    <div className={styles.accentToggleController}>
      <label htmlFor="accent-toggle">Accent First Beat</label>
      <input
        id="accent-toggle"
        type="checkbox"
        checked={accentedBeatEnabled}
        onChange={toggleAccentEnabled}
      />
    </div>
  );
}
