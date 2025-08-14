import { useMetronomeScheduler } from "@/features/metronome/lib/useMetronomeScheduler";
import { useEffect, useRef } from "react";
import { useProgressReducer } from "@/features/metronome/components/HalfCircleVisualizer/useProgressReducer";
import * as styles from "@/features/metronome/components/HalfCircleVisualizer/HalfCircleVisualizer.css";

const RADIUS = 100;
const CENTER = 120;

function getPointOnArc(angleDeg: number): { x: number; y: number } {
  const angleRad = (Math.PI * angleDeg) / 180;
  return {
    x: CENTER + RADIUS * Math.cos(angleRad),
    y: CENTER - RADIUS * Math.sin(angleRad),
  };
}

export const HalfCircleVisualizer = () => {
  const { isPlaying, getProgress } = useMetronomeScheduler();
  const [{ angle }, dispatch] = useProgressReducer();
  const rafRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);
  const lastProgressRef = useRef(0);

  const { x, y } = getPointOnArc(angle);

  useEffect(() => {
    if (!isPlaying) {
      dispatch({ type: "CLEAR_STATE" });
      return;
    }

    const animate = () => {
      const progress = getProgress();
      const last = lastProgressRef.current;
      if (progress < last) {
        dispatch({ type: "TOGGLE_DIRECTION", progress });
      } else {
        dispatch({ type: "SET_PROGRESS", progress });
      }
      lastProgressRef.current = progress;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) {
        dispatch({ type: "CLEAR_STATE" });
        cancelAnimationFrame(rafRef.current);
      }
      lastProgressRef.current = 0;
    };
  }, [isPlaying, getProgress, dispatch]);

  return (
    <div className={styles.halfCircleVisualizer}>
      <svg width={CENTER * 2} height={CENTER + 20}>
        <path
          d={`
          M ${getPointOnArc(180).x} ${getPointOnArc(180).y}
          A ${RADIUS} ${RADIUS} 0 0 1 ${getPointOnArc(0).x} ${
            getPointOnArc(0).y
          }
          `}
          fill="none"
          stroke="#888"
          strokeWidth="4"
        />
        <circle cx={x} cy={y} r="10" fill="dodgerblue" />
      </svg>
    </div>
  );
};
