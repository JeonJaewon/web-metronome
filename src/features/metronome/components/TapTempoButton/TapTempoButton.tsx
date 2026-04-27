import * as styles from "@/features/metronome/components/TapTempoButton/TapTempoButton.css";
import { useTapTempo } from "@/features/metronome/lib/useTapTempo";
import { useKeyControl } from "@/hooks/useKeyControl";
import clsx from "clsx";

type Size = "small" | "medium" | "large";

type Props = {
  size?: Size;
  filled?: boolean;
};

export const TapTempoButton = ({ size = "medium", filled }: Props) => {
  const tap = useTapTempo();
  useKeyControl("t", tap);
  useKeyControl("T", tap);
  return (
    <button
      type="button"
      onClick={tap}
      aria-label="Tap tempo"
      className={clsx(styles.root, styles.sizes[size], filled && styles.filled)}
    >
      Tap tempo · T
    </button>
  );
};
