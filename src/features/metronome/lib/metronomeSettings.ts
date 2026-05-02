import { useSyncExternalStore } from "react";
import { clampBpm } from "@/lib/bpm";

type MetronomeSettings = {
  bpm: number;
  volume: number;
  beatsPerMeasure: number;
  accentedBeatEnabled: boolean;
};

let state: MetronomeSettings = {
  bpm: 100,
  volume: 0.5,
  beatsPerMeasure: 4,
  accentedBeatEnabled: true,
};

const listeners = new Set<() => void>();

const set = (next: MetronomeSettings) => {
  state = next;
  for (const listener of listeners) listener();
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const metronomeSettings = {
  getSnapshot: () => state,
  subscribe,
  setBPM: (bpm: number) => set({ ...state, bpm: clampBpm(bpm) }),
  setVolume: (volume: number) => set({ ...state, volume }),
  setBeatsPerMeasure: (beats: number) =>
    set({ ...state, beatsPerMeasure: beats }),
  toggleAccentEnabled: () =>
    set({ ...state, accentedBeatEnabled: !state.accentedBeatEnabled }),
};

export const useBPM = (): number =>
  useSyncExternalStore(subscribe, () => state.bpm);
export const useVolume = (): number =>
  useSyncExternalStore(subscribe, () => state.volume);
export const useBeatsPerMeasure = (): number =>
  useSyncExternalStore(subscribe, () => state.beatsPerMeasure);
export const useAccentEnabled = (): boolean =>
  useSyncExternalStore(subscribe, () => state.accentedBeatEnabled);
