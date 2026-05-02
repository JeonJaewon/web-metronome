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

export type Note = (typeof NOTES)[number];

declare const __pitchClassBrand: unique symbol;
export type PitchClass = number & { readonly [__pitchClassBrand]: never };

export const pitchClass = (n: number): PitchClass =>
  (((n % 12) + 12) % 12) as PitchClass;

export const noteToPitchClass = (note: Note): PitchClass =>
  NOTES.indexOf(note) as PitchClass;

export const pitchClassToNote = (pc: PitchClass): Note => NOTES[pc];

export const GuitarScale = {
  MajorPentatonic: "MajorPentatonic",
  MinorPentatonic: "MinorPentatonic",
  Major: "Major",
  Minor: "Minor",
  Blues: "Blues",
} as const;

export type GuitarScaleType = keyof typeof GuitarScale;

export type ScaleDefinition = {
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

export type Scale = {
  readonly root: Note;
  readonly type: GuitarScaleType;
  readonly definition: ScaleDefinition;
  readonly pitchClasses: readonly PitchClass[];
  readonly notes: readonly Note[];
};

export const buildScale = (root: Note, type: GuitarScaleType): Scale => {
  const definition = SCALE_DEFINITIONS[type];
  const rootPc = noteToPitchClass(root);
  const pitchClasses = definition.intervals.map((iv) =>
    pitchClass(rootPc + iv)
  );
  const notes = pitchClasses.map(pitchClassToNote);
  return { root, type, definition, pitchClasses, notes };
};

export const degreeOf = (scale: Scale, pc: PitchClass): string | null => {
  const offset = pitchClass(pc - noteToPitchClass(scale.root));
  const ix = scale.definition.intervals.indexOf(offset);
  return ix >= 0 ? scale.definition.degrees[ix] : null;
};

export type LabelMode = "note" | "degree";
