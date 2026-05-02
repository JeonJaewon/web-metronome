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

export const metronomeSettings = {
  getSnapshot: () => state,
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  setBPM: (bpm: number) => set({ ...state, bpm: clampBpm(bpm) }),
  setVolume: (volume: number) => set({ ...state, volume }),
  setBeatsPerMeasure: (beats: number) =>
    set({ ...state, beatsPerMeasure: beats }),
  toggleAccentEnabled: () =>
    set({ ...state, accentedBeatEnabled: !state.accentedBeatEnabled }),
};
