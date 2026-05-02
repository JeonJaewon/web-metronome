import * as styles from "@/features/metronome/components/MeterButton/MeterButton.css";
import { BEAT_OPTIONS } from "@/features/metronome/lib/beatsPerMeasure";
import {
  metronomeSettings,
  useBeatsPerMeasure,
} from "@/features/metronome/lib/metronomeSettings";
import clsx from "clsx";

type Size = "small" | "medium" | "large";

type Props = {
  size?: Size;
};

export const MeterButton = ({ size = "medium" }: Props) => {
  const beatsPerMeasure = useBeatsPerMeasure();
  const cycle = () => {
    const idx = (BEAT_OPTIONS as readonly number[]).indexOf(beatsPerMeasure);
    const next = BEAT_OPTIONS[(idx + 1) % BEAT_OPTIONS.length];
    metronomeSettings.setBeatsPerMeasure(next);
  };
  return (
    <button
      type="button"
      onClick={cycle}
      aria-label="Time signature"
      className={clsx(styles.root, styles.sizes[size])}
    >
      <span className={clsx(styles.label, styles.labelSizes[size])}>Meter</span>
      <span className={clsx(styles.value, styles.valueSizes[size])}>
        {beatsPerMeasure}/4
      </span>
    </button>
  );
};
