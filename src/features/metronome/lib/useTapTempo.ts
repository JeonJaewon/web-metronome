import { useCallback, useRef } from "react";
import { metronomeSettings } from "@/features/metronome/lib/metronomeSettings";

const TAP_WINDOW_MS = 2000;

export const useTapTempo = () => {
  const taps = useRef<number[]>([]);

  return useCallback(() => {
    const now = performance.now();
    taps.current = taps.current.filter((t) => now - t < TAP_WINDOW_MS);
    taps.current.push(now);
    if (taps.current.length >= 2) {
      const arr = taps.current;
      const avg = (arr[arr.length - 1] - arr[0]) / (arr.length - 1);
      metronomeSettings.setBPM(60000 / avg);
    }
  }, []);
};
