import styles from "@/components/Slider/Slider.module.css";

interface SliderProps {
  bpm: number;
  setBPM: (bpm: number) => void;
  maxBPM: number;
  minBPM: number;
}

const Slider: React.FC<SliderProps> = ({ bpm, setBPM, maxBPM, minBPM }) => {
  return (
    <div className={styles.sliderContainer}>
      <div className={styles.bpmDisplay}>{bpm} BPM</div>
      <input
        type="range"
        min={minBPM}
        max={maxBPM}
        value={bpm}
        onChange={(e) => setBPM(Number(e.target.value))}
        className={styles.slider}
      />
    </div>
  );
};

export default Slider;
