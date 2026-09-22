import { type Feature, featureStore, useFocusedFeature } from "@/app/feature";
import { pages } from "@/seo/pages";
import * as styles from "@/components/ModeSwitcher/ModeSwitcher.css";
import { useIsPlaying } from "@/features/metronome/lib/scheduler";
import clsx from "clsx";

type Size = "sm" | "md" | "lg";

type Props = {
  size?: Size;
};

const MODES: { key: Feature; label: string }[] = [
  { key: "metronome", label: "Metronome" },
  { key: "guitarScales", label: "Guitar scales" },
];

export const ModeSwitcher = ({ size = "md" }: Props) => {
  const focusedFeature = useFocusedFeature();
  const isPlaying = useIsPlaying();

  return (
    <nav className={styles.wrap} aria-label="Tool mode">
      <span
        aria-hidden="true"
        className={clsx(styles.dot, isPlaying && styles.dotRunning)}
      />
      {MODES.map(({ key, label }) => (
        <a
          key={key}
          href={pages[key].path}
          aria-current={key === focusedFeature ? "page" : undefined}
          className={clsx(
            styles.tab,
            styles.tabSizes[size],
            key === focusedFeature && styles.tabActive
          )}
          onClick={(event) => {
            if (
              event.button !== 0 || event.metaKey || event.ctrlKey ||
              event.shiftKey || event.altKey
            ) return;
            event.preventDefault();
            featureStore.setFocusedFeature(key);
          }}
        >
          {label}
        </a>
      ))}
    </nav>
  );
};
