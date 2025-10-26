import * as styles from "@/features/guitarScales/components/FretCell.css";
import clsx from "clsx";

interface FretCellProps {
  isMarked: boolean;
  isRoot: boolean;
  stringIndex: number;
}

export const FretCell = ({ isMarked, isRoot, stringIndex }: FretCellProps) => {
  return (
    <div
      className={clsx(
        styles.cellButton,
        stringIndex === 0 && styles.firstString,
        stringIndex === 5 && styles.sixthString
      )}
    >
      {isMarked && <div className={clsx(styles.circle, isRoot && styles.rootCircle)} />}
    </div>
  );
};
