import { useState, useRef, useLayoutEffect } from "react";
import BeatVisualizer from "../BeatVisualizer/BeatVisualizer";
import { HalfCircleVisualizer } from "../HalfCircleVisualizer/HalfCircleVisualizer";
import styles from "./VisualizerSwitch.module.css";
import { useMetronomeScheduler } from "@/lib/metronome";

enum VisualizerType {
  HalfCircle = "HalfCircle",
  Beat = "Beat",
}

export const VisualizerSwitch = () => {
  const { startMetronome, stopMetronome } = useMetronomeScheduler();
  const [selected, setSelected] = useState<VisualizerType>(
    VisualizerType.HalfCircle
  );
  const halfRef = useRef<HTMLButtonElement>(null);
  const beatRef = useRef<HTMLButtonElement>(null);
  const [sliderStyle, setSliderStyle] = useState<{
    left: number;
    width: number;
  }>({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const ref = selected === VisualizerType.HalfCircle ? halfRef : beatRef;
    if (ref.current) {
      const { offsetLeft, offsetWidth } = ref.current;
      setSliderStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [selected]);

  const onClickVisualizer = (visualizerType: VisualizerType) => {
    if (selected !== visualizerType) {
      stopMetronome();
      startMetronome();
    } else {
      startMetronome();
    }
    setSelected(visualizerType);
  };

  return (
    <div>
      <div className={styles.segmentedControl}>
        <button
          ref={halfRef}
          className={`${styles.button} ${
            selected === VisualizerType.HalfCircle ? styles.active : ""
          }`}
          onClick={() => onClickVisualizer(VisualizerType.HalfCircle)}
          aria-label="HalfCircle Visualizer"
        >
          <HalfCircleIcon />
        </button>
        <button
          ref={beatRef}
          className={`${styles.button} ${
            selected === VisualizerType.Beat ? styles.active : ""
          }`}
          onClick={() => onClickVisualizer(VisualizerType.Beat)}
          aria-label="Beat Visualizer"
        >
          <BeatIcon />
        </button>
        <div
          className={styles.slider}
          style={{
            left: sliderStyle.left,
            width: sliderStyle.width,
          }}
        />
      </div>
      <div className={styles.visualizerContainer}>
        {selected === VisualizerType.HalfCircle ? (
          <HalfCircleVisualizer />
        ) : (
          <BeatVisualizer />
        )}
      </div>
    </div>
  );
};

const HalfCircleIcon = () => (
  <svg width="32" height="24" viewBox="0 0 32 24">
    {/* 반원 궤도 */}
    <path
      d="M4 20a12 12 0 0 1 24 0"
      fill="none"
      stroke="#bbb"
      strokeWidth="2"
    />
    {/* 반원 위의 작은 원 */}
    <circle
      cx="16"
      cy="8"
      r="3"
      fill="currentColor"
      stroke="dodgerblue"
      strokeWidth="1"
    />
  </svg>
);

const BeatIcon = () => (
  <svg width="24" height="24" viewBox="0 0 48 24">
    <circle cx="8" cy="12" r="6" fill="dodgerblue" />
    <circle cx="24" cy="12" r="6" fill="#bbb" />
    <circle cx="40" cy="12" r="6" fill="#bbb" />
  </svg>
);
