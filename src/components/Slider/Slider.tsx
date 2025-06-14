import React from "react";
import "./Slider.css";

interface SliderProps {
  bpm: number;
  setBPM: (bpm: number) => void;
  maxBPM: number;
  minBPM: number;
}

const Slider: React.FC<SliderProps> = ({ bpm, setBPM, maxBPM, minBPM }) => {
  return (
    <div className="slider-container">
      <div className="bpm-display">{bpm} BPM</div>
      <input
        type="range"
        min={minBPM}
        max={maxBPM}
        value={bpm}
        onChange={(e) => setBPM(Number(e.target.value))}
        className="slider"
      />
    </div>
  );
};

export default Slider;
