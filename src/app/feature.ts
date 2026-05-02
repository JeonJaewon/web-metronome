import { useSyncExternalStore } from "react";

export type Feature = "metronome" | "guitarScales";

let state: Feature = "metronome";
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const featureStore = {
  getSnapshot: () => state,
  subscribe,
  setFocusedFeature: (next: Feature) => {
    if (state === next) return;
    state = next;
    for (const listener of listeners) listener();
  },
};

export const useFocusedFeature = (): Feature =>
  useSyncExternalStore(subscribe, () => state);
