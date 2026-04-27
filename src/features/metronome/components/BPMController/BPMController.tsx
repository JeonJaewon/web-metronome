import * as styles from "@/features/metronome/components/BPMController/BPMController.css";
import { useMetronomeScheduler } from "@/features/metronome/lib/useMetronomeScheduler";
import { useKeyControl } from "@/hooks/useKeyControl";

const MIN_BPM = 40;
const MAX_BPM = 240;
const SLIDER_MIN = 40;
const SLIDER_MAX = 208;

export function BPMController() {
  const { bpm, setBPM } = useMetronomeScheduler();

  useKeyControl("ArrowRight", () => {
    setBPM(Math.min(bpm + 1, MAX_BPM));
  });

  useKeyControl("ArrowLeft", () => {
    setBPM(Math.max(bpm - 1, MIN_BPM));
  });

  const clamped = Math.max(SLIDER_MIN, Math.min(SLIDER_MAX, bpm));
  const frac = (clamped - SLIDER_MIN) / (SLIDER_MAX - SLIDER_MIN);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <span className={styles.label}>BPM · 40–208</span>
        <div className={styles.stepRow}>
          <button
            type="button"
            className={styles.stepBtn}
            aria-label="Decrease BPM"
            onClick={() => setBPM(Math.max(bpm - 1, MIN_BPM))}
          >
            –
          </button>
          <button
            type="button"
            className={styles.stepBtn}
            aria-label="Increase BPM"
            onClick={() => setBPM(Math.min(bpm + 1, MAX_BPM))}
          >
            +
          </button>
        </div>
      </div>
      <div className={styles.slider}>
        <input
          type="range"
          min={SLIDER_MIN}
          max={SLIDER_MAX}
          step={1}
          value={clamped}
          onChange={(e) => setBPM(Number(e.target.value))}
          className={styles.range}
          aria-label="BPM"
        />
        <div className={styles.fill} style={{ width: `${frac * 100}%` }} />
        <div className={styles.thumb} style={{ left: `${frac * 100}%` }} />
      </div>
    </div>
  );
}
