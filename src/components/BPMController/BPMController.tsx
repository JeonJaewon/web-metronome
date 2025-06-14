import styles from "@/components/BPMController/BPMController.module.css";
import Slider from "@/components/Slider/Slider";
import { useMetronomeScheduler } from "@/lib/metronome";
import { useKeyControl } from "@/lib/useKeyControl";

const MIN_BPM = 40;
const MAX_BPM = 240;

export function BPMController() {
  const { bpm, setBPM } = useMetronomeScheduler();

  useKeyControl("ArrowRight", () => {
    setBPM(Math.min(bpm + 1, MAX_BPM));
  });

  useKeyControl("ArrowLeft", () => {
    setBPM(Math.max(bpm - 1, MIN_BPM));
  });

  return (
    <div className={styles.bpmController}>
      <div className={styles.buttonsContainer}>
        <button onClick={() => setBPM(bpm - 10)}>-10</button>
        <button onClick={() => setBPM(bpm - 1)}>-1</button>
      </div>
      <Slider bpm={bpm} setBPM={setBPM} maxBPM={MAX_BPM} minBPM={MIN_BPM} />
      <div className={styles.buttonsContainer}>
        <button onClick={() => setBPM(bpm + 1)}>+1</button>
        <button onClick={() => setBPM(bpm + 10)}>+10</button>
      </div>
    </div>
  );
}
