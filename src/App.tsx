import { useState } from "react";
import "./App.css";
import Buttons from "@/components/Buttons/Buttons";
import Stopwatch from "@/components/Stopwatch/Stopwatch";
import { useMetronomeScheduler } from "@/lib/metronome";
import Slider from "@/components/Slider/Slider";
import Ticker from "@/components/Ticker/Ticker";

function App() {
  const [beatIndicatorIndex, setBeatIndicatorIndex] = useState(0);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const [beatAnnouncement, setBeatAnnouncement] = useState("");

  const updateBeatIndicator = () => {
    setBeatIndicatorIndex((prev) => {
      const newBeatIndex = (prev + 1) % beatsPerMeasure;
      setBeatAnnouncement(`Beat ${newBeatIndex + 1}`);
      return newBeatIndex;
    });
  };

  const {
    bpm,
    isPlaying,
    volume,
    startMetronome,
    setBPM,
    setVolume,
    stopMetronome,
  } = useMetronomeScheduler(updateBeatIndicator);

  const handleSetBeatsPerMeasure = (newBeats: number) => {
    setBeatsPerMeasure(newBeats);
    setBeatAnnouncement(`Beats per measure set to ${newBeats}`);
    setBeatIndicatorIndex(0); // Reset beat indicator
  };

  return (
    <main>
      <div className="bpm-controller">
        <button onClick={() => setBPM(bpm - 1)} aria-label="Decrease BPM">-</button>
        <Slider bpm={bpm} setBPM={setBPM} />
        <button onClick={() => setBPM(bpm + 1)} aria-label="Increase BPM">+</button>
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
          aria-pressed={isPlaying} // Directly use the boolean isPlaying state
        >
          {isPlaying ? "Stop" : "Play"}
        </button>
      </div>
      <Stopwatch isPlaying={isPlaying} />
      <div className="beat-indicator">
        <Ticker tick={beatIndicatorIndex} beatsPerMeasure={beatsPerMeasure} />
        <Buttons setBeatsPerMeasure={handleSetBeatsPerMeasure} />
      </div>
      <div aria-live="polite" className="visually-hidden">
        {beatAnnouncement}
      </div>
    </main>
  );
}

export default App;
