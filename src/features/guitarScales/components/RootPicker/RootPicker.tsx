import * as styles from "@/features/guitarScales/components/RootPicker/RootPicker.css";
import { Note, NOTES } from "@/features/guitarScales/scale";
import clsx from "clsx";

type Props = {
  value: Note;
  onChange: (value: Note) => void;
  compact?: boolean;
};

export const RootPicker = ({ value, onChange, compact = false }: Props) => (
  <div className={styles.root}>
    {NOTES.map((n) => {
      const active = n === value;
      const isSharp = n.includes("#");
      return (
        <button
          type="button"
          key={n}
          onClick={() => onChange(n)}
          className={clsx(
            styles.button,
            compact && styles.buttonCompact,
            !active && isSharp && styles.sharp,
            active && styles.active
          )}
        >
          {n}
        </button>
      );
    })}
  </div>
);
