import * as styles from "@/features/metronome/components/DisplayModule/DisplayModule.css";
import { tempoName } from "@/features/metronome/lib/tempoName";
import { useMetronomeScheduler } from "@/features/metronome/lib/useMetronomeScheduler";
import clsx from "clsx";

type Size = "small" | "medium" | "large";

type Props = {
  size?: Size;
};

export const DisplayModule = ({ size = "medium" }: Props) => {
  const { bpm, beatsPerMeasure } = useMetronomeScheduler();
  const display = String(Math.max(0, Math.min(999, bpm))).padStart(3, "0");
  const [d0, d1, d2] = display;

  return (
    <div className={clsx(styles.root, styles.sizes[size])}>
      <div className={clsx(styles.numerals, styles.numeralSizes[size])}>
        <span className={d0 === "0" ? styles.dim : undefined}>{d0}</span>
        <span className={d0 === "0" && d1 === "0" ? styles.dim : undefined}>
          {d1}
        </span>
        <span>{d2}</span>
      </div>
      <div className={styles.meta}>
        <div className={clsx(styles.metaLabel, styles.metaLabelSizes[size])}>
          BPM
        </div>
        <div className={clsx(styles.meter, styles.meterSizes[size])}>
          {beatsPerMeasure}/4
        </div>
        <div className={clsx(styles.tempo, styles.tempoSizes[size])}>
          {tempoName(bpm)}
        </div>
      </div>
    </div>
  );
};
