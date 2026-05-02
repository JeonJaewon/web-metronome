export const BEAT_OPTIONS = [2, 3, 4, 5, 6] as const;
export type BeatOption = (typeof BEAT_OPTIONS)[number];
