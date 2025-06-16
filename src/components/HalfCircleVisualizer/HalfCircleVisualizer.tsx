import { useMetronomeScheduler } from "@/lib/metronome";
import { useEffect, useRef } from "react";
import { useProgressReducer } from "@/components/HalfCircleVisualizer/useProgressReducer";
import styles from "@/components/HalfCircleVisualizer/HalfCircleVisualizer.module.css";

const RADIUS = 100;
const CENTER = 120;
const MILLISECONDS_PER_MINUTE = 60000;

function getPointOnArc(angleDeg: number): { x: number; y: number } {
  const angleRad = (Math.PI * angleDeg) / 180;
  return {
    x: CENTER + RADIUS * Math.cos(angleRad),
    y: CENTER - RADIUS * Math.sin(angleRad),
  };
}

export const HalfCircleVisualizer = () => {
  const { bpm, isPlaying } = useMetronomeScheduler();
  const [{ angle }, dispatch] = useProgressReducer();
  const rafRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);

  const { x, y } = getPointOnArc(angle);

  useEffect(() => {
    if (!isPlaying) {
      dispatch({ type: "CLEAR_STATE" });
      return;
    }
    const durationPerBeat = MILLISECONDS_PER_MINUTE / bpm;
    let lastTick = performance.now();

    const animate = (now: number) => {
      const elapsed = now - lastTick;
      let localProgress = elapsed / durationPerBeat;

      if (localProgress >= 1) {
        localProgress = 1;
        dispatch({ type: "TOGGLE_DIRECTION", progress: localProgress });
        lastTick += durationPerBeat;
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      dispatch({ type: "SET_PROGRESS", progress: localProgress });
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) {
        dispatch({ type: "CLEAR_STATE" });
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [bpm, isPlaying, dispatch]);

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
