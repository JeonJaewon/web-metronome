import styles from "@/components/BPMController/BPMController.module.css";
import Slider from "@/components/Slider/Slider";
import { useMetronomeScheduler } from "@/lib/metronome";

export function BPMController() {
  const { bpm, setBPM } = useMetronomeScheduler();
  return (
    <div className={styles.bpmController}>
      <button onClick={() => setBPM(bpm - 1)}>-</button>
      <Slider bpm={bpm} setBPM={setBPM} />
      <button onClick={() => setBPM(bpm + 1)}>+</button>
    </div>
  );
}
