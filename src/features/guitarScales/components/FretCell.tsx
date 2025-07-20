import clsx from "clsx";
import * as styles from "./FretCell.css";

interface FretCellProps {
  isMarked: boolean;
  stringIndex: number;
}

export const FretCell = ({ isMarked, stringIndex }: FretCellProps) => {
  return (
    <div
      className={clsx(
        styles.cellButton,
        stringIndex === 0 && styles.firstString,
        stringIndex === 5 && styles.sixthString
      )}
    >
      {isMarked && <div className={styles.circle} />}
    </div>
  );
};
