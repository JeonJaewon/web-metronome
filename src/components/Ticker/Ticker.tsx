import React from "react";
import styles from "./Ticker.module.css";

interface TickerProps {
  tick: number;
  beatsPerMeasure: number;
}

const Ticker: React.FC<TickerProps> = ({ tick, beatsPerMeasure }) => {
  return (
    <div className={styles.wrapper}>
      {Array.from({ length: beatsPerMeasure }, (_, i) => (
        <div
          key={i}
          className={i === tick ? styles.current_tick : styles.default_tick}
        />
      ))}
    </div>
  );
};

export default Ticker;
