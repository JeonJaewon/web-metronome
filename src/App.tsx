import { useRef, useState, useEffect } from "react";
import "./App.css";
import Ticker from "./Ticker";
import Slider from "./Slider";
import Buttons from "./Buttons";

function App() {
  const [bpm, setBPM] = useState(180);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tick, setTick] = useState(0);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);
  const nextNoteTimeRef = useRef<number>(0);

  const calculateIntervalByBPM = (bpm: number) => {
    return 60 / bpm;
  };

  const scheduleNote = (time: number) => {
    const osc = audioContextRef.current!.createOscillator();
    osc.connect(audioContextRef.current!.destination);
    osc.start(time);
    osc.stop(time + 0.1);
    setTick((prev) => (prev + 1) % beatsPerMeasure); // Update tick for visual tracking
  };

  const scheduler = () => {
    while (
      nextNoteTimeRef.current <
      audioContextRef.current!.currentTime + 0.1
    ) {
      scheduleNote(nextNoteTimeRef.current);
      nextNoteTimeRef.current += calculateIntervalByBPM(bpm);
    }
    intervalRef.current = window.setTimeout(scheduler, 25);
  };

  const startMetronome = () => {
    if (!isPlaying) {
      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      nextNoteTimeRef.current = audioContextRef.current.currentTime;
      scheduler();
      setIsPlaying(true);
    }
  };

  const stopMetronome = () => {
    if (isPlaying) {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
      audioContextRef.current?.close();
      audioContextRef.current = null;
      setIsPlaying(false);
      setTick(0); // Reset tick when stopping
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
      audioContextRef.current?.close();
    };
  }, []);

  return (
    <>
      <Slider bpm={bpm} setBPM={setBPM} />
      <button onClick={startMetronome}>Play</button>
      <button onClick={stopMetronome}>Stop</button>
      <Ticker tick={tick} beatsPerMeasure={beatsPerMeasure} />
      <Buttons setBeatsPerMeasure={setBeatsPerMeasure} />
    </>
  );
}

export default App;
