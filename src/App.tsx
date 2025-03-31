import { useState } from "react";
import "./App.css";
import Buttons from "./Buttons";
import Stopwatch from "./components/Stopwatch";
import { useMetronomeScheduler } from "./metronome";
import Slider from "./Slider";
import Ticker from "./Ticker";

function App() {
  const [beatIndicatorIndex, setBeatIndicatorIndex] = useState(0);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const {
    bpm,
    isPlaying,
    volume,
    startMetronome,
    setBPM,
    setVolume,
    stopMetronome,
  } = useMetronomeScheduler();

  return (
    <>
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
      <div className="metronome-controller">
        <button
          onClick={() => {
            if (isPlaying) {
              stopMetronome();
              setBeatIndicatorIndex(0);
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
        <Ticker tick={beatIndicatorIndex} beatsPerMeasure={beatsPerMeasure} />
        <Buttons setBeatsPerMeasure={setBeatsPerMeasure} />
      </div>
    </>
  );
}

export default App;
