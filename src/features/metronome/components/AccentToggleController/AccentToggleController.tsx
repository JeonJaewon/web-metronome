import * as styles from "@/features/metronome/components/AccentToggleController/AccentToggleController.css";
import { useMetronomeScheduler } from "@/features/metronome/lib/useMetronomeScheduler";

export function AccentToggleController() {
  const { accentedBeatEnabled, toggleAccentEnabled } = useMetronomeScheduler();
  return (
    <div className={styles.accentToggleController}>
      <input
        id="accent-toggle"
        type="checkbox"
        checked={accentedBeatEnabled}
        onChange={toggleAccentEnabled}
      />
      <label htmlFor="accent-toggle">Accent First Beat</label>
    </div>
  );
}
