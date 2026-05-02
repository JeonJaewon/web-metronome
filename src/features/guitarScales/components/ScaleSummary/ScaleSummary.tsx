import * as styles from "@/features/guitarScales/components/ScaleSummary/ScaleSummary.css";
import { Scale } from "@/features/guitarScales/scale";
import clsx from "clsx";

type Size = "sm" | "md" | "lg";

type Props = {
  scale: Scale;
  size?: Size;
};

export const ScaleSummary = ({ scale, size = "md" }: Props) => (
  <div className={styles.root}>
    <span className={clsx(styles.rootNote, styles.rootSizes[size])}>
      {scale.root}
    </span>
    <span className={clsx(styles.scaleName, styles.scaleSizes[size])}>
      {scale.definition.name}
    </span>
  </div>
);
