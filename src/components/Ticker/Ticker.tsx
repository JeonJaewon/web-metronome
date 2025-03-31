import React from "react";
import "./Ticker.css";

interface TickerProps {
  tick: number;
  beatsPerMeasure: number;
}

const Ticker: React.FC<TickerProps> = ({ tick, beatsPerMeasure }) => {
  return (
    <div className="ticker">
      {Array.from({ length: beatsPerMeasure }, (_, i) => (
        <div key={i} className={`tick ${i === tick ? "active" : ""}`}></div>
      ))}
    </div>
  );
};

export default Ticker;
