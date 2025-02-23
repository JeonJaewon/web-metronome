import React from "react";
import "./Buttons.css";

interface ButtonsProps {
  setBeatsPerMeasure: (beats: number) => void;
}

const Buttons: React.FC<ButtonsProps> = ({ setBeatsPerMeasure }) => {
  return (
    <div className="buttons-container">
      {[2, 3, 4, 5, 6].map((beats) => (
        <button key={beats} onClick={() => setBeatsPerMeasure(beats)}>
          {beats} Beats
        </button>
      ))}
    </div>
  );
};

export default Buttons;
