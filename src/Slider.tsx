import React from "react";
import "./Slider.css";

interface SliderProps {
  bpm: number;
  setBPM: (bpm: number) => void;
}

const Slider: React.FC<SliderProps> = ({ bpm, setBPM }) => {
  return (
    <div className="slider-container">
      <input
        type="range"
        min="40"
        max="240"
        value={bpm}
        onChange={(e) => setBPM(Number(e.target.value))}
        className="slider"
      />
      <div className="bpm-display">{bpm} BPM</div>
    </div>
  );
};

export default Slider;
