import Buttons from "@/components/Buttons/Buttons";
import { HalfCircleVisualizer } from "@/components/HalfCircleVisualizer/HalfCircleVisualizer";
import Slider from "@/components/Slider/Slider";
import Stopwatch from "@/components/Stopwatch/Stopwatch";
import { useMetronomeScheduler } from "@/lib/metronome";
import "./App.css";

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
    <>
      <HalfCircleVisualizer />
      <div className="bpm-controller">
        <button onClick={() => setBPM(bpm - 1)}>-</button>
        <Slider bpm={bpm} setBPM={setBPM} />
        <button onClick={() => setBPM(bpm + 1)}>+</button>
      </div>
      <div className="volume-controller">
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
      <div className="accent-toggle-controller">
        <label htmlFor="accent-toggle">Accent First Beat</label>
        <input
          id="accent-toggle"
          type="checkbox"
          checked={accentedBeatEnabled}
          onChange={toggleAccentEnabled}
        />
      </div>
      <div className="metronome-controller">
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
      <div className="beat-indicator">
        <Buttons setBeatsPerMeasure={setBeatsPerMeasure} />
      </div>
    </>
  );
}

export default App;
