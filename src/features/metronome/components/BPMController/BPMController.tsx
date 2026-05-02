import * as styles from "@/features/metronome/components/BPMController/BPMController.css";
import { useBpmKeyControl } from "@/features/metronome/lib/keyboardControls";
import {
  metronomeSettings,
  useBPM,
} from "@/features/metronome/lib/metronomeSettings";
import { MAX_BPM, MIN_BPM } from "@/lib/bpm";

export function BPMController() {
  const bpm = useBPM();
  useBpmKeyControl();

  const frac = (bpm - MIN_BPM) / (MAX_BPM - MIN_BPM);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <span className={styles.label}>BPM · {MIN_BPM}–{MAX_BPM}</span>
        <div className={styles.stepRow}>
          <button
            type="button"
            className={styles.stepBtn}
            aria-label="Decrease BPM"
            onClick={() => metronomeSettings.setBPM(bpm - 1)}
          >
            –
          </button>
          <button
            type="button"
            className={styles.stepBtn}
            aria-label="Increase BPM"
            onClick={() => metronomeSettings.setBPM(bpm + 1)}
          >
            +
          </button>
        </div>
      </div>
      <div className={styles.slider}>
        <input
          type="range"
          min={MIN_BPM}
          max={MAX_BPM}
          step={1}
          value={bpm}
          onChange={(e) => metronomeSettings.setBPM(Number(e.target.value))}
          className={styles.range}
          aria-label="BPM"
        />
        <div className={styles.fill} style={{ width: `${frac * 100}%` }} />
        <div className={styles.thumb} style={{ left: `${frac * 100}%` }} />
      </div>
    </div>
  );
}
