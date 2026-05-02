import {
  Note,
  noteToPitchClass,
  PitchClass,
} from "@/features/guitarScales/scale";

export const FRET_COUNT = 12;
export const STRING_COUNT = 6;
export const POSITION_WIDTH = 4;

export const OPEN_NOTES: readonly Note[] = ["E", "A", "D", "G", "B", "E"];
export const TUNING: readonly PitchClass[] = OPEN_NOTES.map(noteToPitchClass);

export const INLAY_FRETS: readonly number[] = [3, 5, 7, 9, 12];

export const clampFretPosition = (n: number): number =>
  Math.max(0, Math.min(FRET_COUNT - POSITION_WIDTH, Math.round(n)));
