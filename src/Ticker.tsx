import React from "react";
import "./Ticker.css";

interface TickerProps {
  tick: number;
}

const Ticker: React.FC<TickerProps> = ({ tick }) => {
  return (
    <div className="ticker">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className={`tick ${i === tick ? "active" : ""}`}></div>
      ))}
    </div>
  );
};

export default Ticker;
