import * as styles from "@/features/guitarScales/components/LabelToggle/LabelToggle.css";
import { LabelMode } from "@/features/guitarScales/scale";
import clsx from "clsx";

type Props = {
  value: LabelMode;
  onChange: (value: LabelMode) => void;
};

const OPTIONS: { key: LabelMode; label: string }[] = [
  { key: "note", label: "Notes" },
  { key: "degree", label: "Degrees" },
];

export const LabelToggle = ({ value, onChange }: Props) => (
  <div className={styles.root} role="tablist">
    {OPTIONS.map(({ key, label }) => (
      <button
        type="button"
        role="tab"
        aria-selected={value === key}
        key={key}
        onClick={() => onChange(key)}
        className={clsx(styles.button, value === key && styles.active)}
      >
        {label}
      </button>
    ))}
  </div>
);
