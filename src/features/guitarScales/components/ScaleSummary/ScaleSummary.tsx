import * as styles from "@/features/guitarScales/components/ScaleSummary/ScaleSummary.css";
import {
  GuitarScaleType,
  Note,
  SCALE_DEFINITIONS,
} from "@/features/guitarScales/scale";
import clsx from "clsx";

type Size = "sm" | "md" | "lg";

type Props = {
  rootNote: Note;
  scaleType: GuitarScaleType;
  size?: Size;
};

export const ScaleSummary = ({ rootNote, scaleType, size = "md" }: Props) => (
  <div className={styles.root}>
    <span className={clsx(styles.rootNote, styles.rootSizes[size])}>
      {rootNote}
    </span>
    <span className={clsx(styles.scaleName, styles.scaleSizes[size])}>
      {SCALE_DEFINITIONS[scaleType].name}
    </span>
  </div>
);
