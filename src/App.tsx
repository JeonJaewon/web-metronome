import { BeatSelector } from "@/components/BeatSelector/BeatSelector";
import { HalfCircleVisualizer } from "@/components/HalfCircleVisualizer/HalfCircleVisualizer";
import Slider from "@/components/Slider/Slider";
import Stopwatch from "@/components/Stopwatch/Stopwatch";
import { useMetronomeScheduler } from "@/lib/metronome";
import styles from "@/App.module.css";

function App() {
  const {
    bpm,
    isPlaying,
    volume,
    accentedBeatEnabled,
    startMetronome,
    setBPM,
    setVolume,
    stopMetronome,
    setBeatsPerMeasure,
    toggleAccentEnabled,
  } = useMetronomeScheduler();

  return (
    <div className={styles.wrapper}>
      <HalfCircleVisualizer />
      <div className={styles.bpmController}>
        <button onClick={() => setBPM(bpm - 1)}>-</button>
        <Slider bpm={bpm} setBPM={setBPM} />
        <button onClick={() => setBPM(bpm + 1)}>+</button>
      </div>
      <div className={styles.volumeController}>
        <label htmlFor="volume">Volume</label>
        <input
          id="volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
        />
      </div>
      <BeatSelector setBeatsPerMeasure={setBeatsPerMeasure} />
      <div className={styles.accentToggleController}>
        <label htmlFor="accent-toggle">Accent First Beat</label>
        <input
          id="accent-toggle"
          type="checkbox"
          checked={accentedBeatEnabled}
          onChange={toggleAccentEnabled}
        />
      </div>
      <div className={styles.metronomeController}>
        <button
          onClick={() => {
            if (isPlaying) {
              stopMetronome();
            } else {
              startMetronome();
            }
          }}
        >
          {isPlaying ? "Stop" : "Play"}
        </button>
      </div>
      <Stopwatch isPlaying={isPlaying} />
    </div>
  );
}

export default App;
