import * as styles from "@/features/metronome/components/AccentToggleController/AccentToggleController.css";
import {
  metronomeSettings,
  useAccentEnabled,
} from "@/features/metronome/lib/metronomeSettings";
import clsx from "clsx";

export function AccentToggleController() {
  const accentedBeatEnabled = useAccentEnabled();
  return (
    <label className={styles.root}>
      <span className={styles.label}>Accent · 1st beat</span>
      <input
        type="checkbox"
        className={styles.hiddenInput}
        checked={accentedBeatEnabled}
        onChange={metronomeSettings.toggleAccentEnabled}
      />
      <span
        className={clsx(
          styles.switchTrack,
          accentedBeatEnabled && styles.switchTrackActive
        )}
      >
        <span
          className={clsx(
            styles.switchThumb,
            accentedBeatEnabled && styles.switchThumbActive
          )}
        />
      </span>
    </label>
  );
}
