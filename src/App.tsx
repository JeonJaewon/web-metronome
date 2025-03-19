import { useRef, useState, useEffect, useCallback } from "react";
import "./App.css";
import Ticker from "./Ticker";
import Slider from "./Slider";
import Buttons from "./Buttons";
import Stopwatch from "./components/Stopwatch";
import { MetronomeScheduler } from "./metronome";

function App() {
  const [bpm, setBPM] = useState(100);
  const [beatIndicatorIndex, setBeatIndicatorIndex] = useState(0);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);

  const onTick = useCallback(() => {
    setBeatIndicatorIndex((prev) => (prev + 1) % beatsPerMeasure); // Update tick for visual tracking
  }, [beatsPerMeasure]);

  const schedulerRef = useRef<MetronomeScheduler>(
    new MetronomeScheduler(bpm, onTick)
  );

  useEffect(() => {
    schedulerRef.current.setBPM(bpm);
  }, [bpm]);

  useEffect(() => {
    schedulerRef.current.setOnTick(onTick);
  }, [onTick]);

  useEffect(() => {
    schedulerRef.current.setVolume(volume);
  }, [volume]);

  return (
    <>
      <div className="bpm-controller">
        <button onClick={() => setBPM((bpm) => bpm - 1)}>-</button>
        <Slider bpm={bpm} setBPM={setBPM} />
        <button onClick={() => setBPM((bpm) => bpm + 1)}>+</button>
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
              schedulerRef.current?.stopMetronome();
              setBeatIndicatorIndex(0);
              setIsPlaying(false);
            } else {
              schedulerRef.current?.startMetronome();
              setIsPlaying(true);
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
