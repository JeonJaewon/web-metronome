import { useRef, useState, useEffect, useCallback } from "react";
import "./App.css";
import Ticker from "./Ticker";
import Slider from "./Slider";
import Buttons from "./Buttons";
import { MetronomeScheduler } from "./metronome";

function App() {
  const [bpm, setBPM] = useState(180);
  const [beatIndicatorIndex, setBeatIndicatorIndex] = useState(0);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);

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

  return (
    <>
      <Slider bpm={bpm} setBPM={setBPM} />
      <button onClick={() => schedulerRef.current?.startMetronome()}>
        Play
      </button>
      <button
        onClick={() => {
          schedulerRef.current?.stopMetronome();
          setBeatIndicatorIndex(0);
        }}
      >
        Stop
      </button>
      <Ticker tick={beatIndicatorIndex} beatsPerMeasure={beatsPerMeasure} />
      <Buttons setBeatsPerMeasure={setBeatsPerMeasure} />
    </>
  );
}

export default App;
