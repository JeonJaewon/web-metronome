import React from "react";
import "./Buttons.css";

interface ButtonsProps {
  setBeatsPerMeasure: (beats: number) => void;
}

const Buttons: React.FC<ButtonsProps> = ({ setBeatsPerMeasure }) => {
  return (
    <fieldset className="buttons-container">
      <legend>Select beats per measure</legend>
      {[2, 3, 4, 5, 6].map((beats) => (
        <button key={beats} onClick={() => setBeatsPerMeasure(beats)}>
          {beats} Beats
        </button>
      ))}
    </fieldset>
  );
};

export default Buttons;
