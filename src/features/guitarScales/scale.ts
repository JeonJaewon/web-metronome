export const GuitarScale = {
  MajorPentatonic: "MajorPentatonic",
  MinorPentatonic: "MinorPentatonic",
  Major: "Major",
  Minor: "Minor",
  Blues: "Blues",
} as const;

export type GuitarScaleType = keyof typeof GuitarScale;

export const NOTES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
] as const;

export const OPEN_NOTES = ["E", "A", "D", "G", "B", "E"] as const;

export type Note = (typeof NOTES)[number];
export type OpenNote = (typeof OPEN_NOTES)[number];

export const isGuitarScaleType = (value: unknown): value is GuitarScaleType => {
  return typeof value === "string" && value in GuitarScale;
};

export const isNote = (value: unknown): value is Note => {
  return typeof value === "string" && NOTES.includes(value as Note);
};

type ScaleDefinition = {
  name: string;
  intervals: number[];
  degrees: string[];
};

export const SCALE_DEFINITIONS: Record<GuitarScaleType, ScaleDefinition> = {
  MajorPentatonic: {
    name: "Major Pentatonic",
    intervals: [0, 2, 4, 7, 9],
    degrees: ["1", "2", "3", "5", "6"],
  },
  MinorPentatonic: {
    name: "Minor Pentatonic",
    intervals: [0, 3, 5, 7, 10],
    degrees: ["1", "b3", "4", "5", "b7"],
  },
  Major: {
    name: "Major",
    intervals: [0, 2, 4, 5, 7, 9, 11],
    degrees: ["1", "2", "3", "4", "5", "6", "7"],
  },
  Minor: {
    name: "Minor",
    intervals: [0, 2, 3, 5, 7, 8, 10],
    degrees: ["1", "2", "b3", "4", "5", "b6", "b7"],
  },
  Blues: {
    name: "Blues",
    intervals: [0, 3, 5, 6, 7, 10],
    degrees: ["1", "b3", "4", "b5", "5", "b7"],
  },
};

export const SCALE_LIST = Object.keys(SCALE_DEFINITIONS) as GuitarScaleType[];

export const TUNING_PCS = OPEN_NOTES.map((n) => NOTES.indexOf(n as Note));

export type LabelMode = "note" | "degree";

export const getScaleNotes = (root: Note, type: GuitarScaleType): Note[] => {
  const idx = NOTES.indexOf(root);
  return SCALE_DEFINITIONS[type].intervals.map(
    (i) => NOTES[(idx + i) % NOTES.length]
  );
};

export const scalePitchClasses = (root: Note, type: GuitarScaleType): number[] => {
  const rootPc = NOTES.indexOf(root);
  return SCALE_DEFINITIONS[type].intervals.map((iv) => (rootPc + iv) % 12);
};

export const pcToDegree = (
  pc: number,
  root: Note,
  type: GuitarScaleType
): string | null => {
  const rootPc = NOTES.indexOf(root);
  const offset = (pc - rootPc + 12) % 12;
  const ix = SCALE_DEFINITIONS[type].intervals.indexOf(offset);
  return ix >= 0 ? SCALE_DEFINITIONS[type].degrees[ix] : null;
};

export const pcToName = (pc: number): Note => NOTES[((pc % 12) + 12) % 12];
