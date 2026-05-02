import { useCallback, useRef } from "react";
import { useMetronomeScheduler } from "@/features/metronome/lib/useMetronomeScheduler";

const TAP_WINDOW_MS = 2000;

export const useTapTempo = () => {
  const { setBPM } = useMetronomeScheduler();
  const taps = useRef<number[]>([]);

  return useCallback(() => {
    const now = performance.now();
    taps.current = taps.current.filter((t) => now - t < TAP_WINDOW_MS);
    taps.current.push(now);
    if (taps.current.length >= 2) {
      const arr = taps.current;
      const avg = (arr[arr.length - 1] - arr[0]) / (arr.length - 1);
      setBPM(60000 / avg);
    }
  }, [setBPM]);
};
