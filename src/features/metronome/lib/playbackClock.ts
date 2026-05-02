import { useSyncExternalStore } from "react";
import { audioContext } from "@/features/metronome/lib/oscillator";

const REFRESH_INTERVAL_MS = 250;

let startedAt: number | null = null;
let accumulated = 0;
let cachedSnapshot = 0;
let tickTimer: ReturnType<typeof setInterval> | undefined;
const listeners = new Set<() => void>();

const updateSnapshot = () => {
  cachedSnapshot =
    startedAt !== null
      ? accumulated + (audioContext.currentTime - startedAt)
      : accumulated;
};

const notify = () => {
  updateSnapshot();
  for (const listener of listeners) listener();
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const playbackClock = {
  start: () => {
    if (startedAt !== null) return;
    startedAt = audioContext.currentTime;
    if (!tickTimer) tickTimer = setInterval(notify, REFRESH_INTERVAL_MS);
    notify();
  },
  stop: () => {
    if (startedAt === null) return;
    accumulated += audioContext.currentTime - startedAt;
    startedAt = null;
    if (tickTimer) {
      clearInterval(tickTimer);
      tickTimer = undefined;
    }
    notify();
  },
};

export const usePlaybackElapsed = (): number =>
  useSyncExternalStore(subscribe, () => cachedSnapshot);
