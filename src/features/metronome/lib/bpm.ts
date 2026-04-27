export const MIN_BPM = 40;
export const MAX_BPM = 208;

export const BEAT_OPTIONS = [2, 3, 4, 5, 6] as const;
export type BeatOption = (typeof BEAT_OPTIONS)[number];

export const clampBpm = (value: number): number =>
  Math.max(MIN_BPM, Math.min(MAX_BPM, Math.round(value)));

export const secondsPerBeat = (bpm: number): number => 60 / bpm;
