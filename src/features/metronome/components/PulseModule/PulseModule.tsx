import * as styles from "@/features/metronome/components/PulseModule/PulseModule.css";
import * as toggleStyles from "@/features/metronome/components/PulseModule/PulseModeToggle.css";
import BeatVisualizer from "@/features/metronome/components/BeatVisualizer/BeatVisualizer";
import { HalfCircleVisualizer } from "@/features/metronome/components/HalfCircleVisualizer/HalfCircleVisualizer";
import clsx from "clsx";
import { useState } from "react";

type PulseMode = "dots" | "pendulum";

type Size = "small" | "medium" | "large";

type Props = {
  size?: Size;
  pendulumHeight?: number;
  dotSize?: number;
  dotGap?: number;
};

export const PulseModule = ({
  size = "medium",
  pendulumHeight = 110,
  dotSize = 14,
  dotGap = 18,
}: Props) => {
  const [mode, setMode] = useState<PulseMode>("dots");

  return (
    <div className={clsx(styles.root, styles.sizes[size])}>
      <div className={styles.header}>
        <span className={styles.label}>Pulse</span>
        <div className={toggleStyles.wrap} role="tablist" aria-label="Pulse mode">
          <button
            type="button"
            role="tab"
            aria-selected={mode === "dots"}
            aria-label="Dots"
            onClick={() => setMode("dots")}
            className={clsx(
              toggleStyles.button,
              mode === "dots" && toggleStyles.active
            )}
          >
            <DotsIcon />
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "pendulum"}
            aria-label="Pendulum"
            onClick={() => setMode("pendulum")}
            className={clsx(
              toggleStyles.button,
              mode === "pendulum" && toggleStyles.active
            )}
          >
            <PendulumIcon />
          </button>
        </div>
      </div>
      <div
        className={clsx(styles.body, mode === "pendulum" && styles.bodyPendulum)}
      >
        {mode === "pendulum" ? (
          <HalfCircleVisualizer height={pendulumHeight} />
        ) : (
          <BeatVisualizer dotSize={dotSize} gap={dotGap} />
        )}
      </div>
    </div>
  );
};

const DotsIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12">
    <circle cx="2" cy="6" r="1.4" fill="currentColor" />
    <circle cx="6" cy="6" r="1.4" fill="currentColor" />
    <circle cx="10" cy="6" r="1.4" fill="currentColor" />
  </svg>
);

const PendulumIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12">
    <path
      d="M1 9 A 5 5 0 0 1 11 9"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    />
    <circle cx="9" cy="5.5" r="1.6" fill="currentColor" />
  </svg>
);
