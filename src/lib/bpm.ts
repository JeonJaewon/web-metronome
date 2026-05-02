export const MIN_BPM = 40;
export const MAX_BPM = 240;

export const clampBpm = (value: number): number =>
  Math.max(MIN_BPM, Math.min(MAX_BPM, Math.round(value)));

export const secondsPerBeat = (bpm: number): number => 60 / bpm;
