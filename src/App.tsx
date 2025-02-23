import { useRef, useState, useEffect } from "react";
import "./App.css";
import Ticker from "./Ticker";
import Slider from "./Slider";
import Buttons from "./Buttons";
import { startMetronome, stopMetronome, scheduler } from "./metronome";

function App() {
  const [bpm, setBPM] = useState(180);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tick, setTick] = useState(0);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);
  const nextNoteTimeRef = useRef<number>(0);

  useEffect(() => {
    if (isPlaying) {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
      nextNoteTimeRef.current = audioContextRef.current!.currentTime;
      scheduler(
        bpm,
        nextNoteTimeRef,
        audioContextRef,
        setTick,
        beatsPerMeasure
      );
    }
  }, [bpm]);

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
      <button
        onClick={() =>
          startMetronome(
            isPlaying,
            setIsPlaying,
            audioContextRef,
            nextNoteTimeRef,
            scheduler,
            bpm,
            setTick,
            beatsPerMeasure
          )
        }
      >
        Play
      </button>
      <button
        onClick={() =>
          stopMetronome(
            isPlaying,
            setIsPlaying,
            intervalRef,
            audioContextRef,
            setTick
          )
        }
      >
        Stop
      </button>
      <Ticker tick={tick} beatsPerMeasure={beatsPerMeasure} />
      <Buttons setBeatsPerMeasure={setBeatsPerMeasure} />
    </>
  );
}

export default App;
