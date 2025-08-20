export const GuitarScale = {
  MajorPentatonic: "MajorPentatonic",
  MinorPentatonic: "MinorPentatonic",
  Major: "Major",
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

export const getScaleNotes = (root: Note, type: GuitarScaleType) => {
  const idx = NOTES.indexOf(root);
  switch (type) {
    case GuitarScale.MajorPentatonic:
      // 메이저 펜타토닉: 1, 2, 3, 5, 6도
      return [0, 2, 4, 7, 9].map((i) => NOTES[(idx + i) % NOTES.length]);
    case GuitarScale.MinorPentatonic:
      // 마이너 펜타토닉: 1, b3, 4, 5, b7도
      return [0, 3, 5, 7, 10].map((i) => NOTES[(idx + i) % NOTES.length]);
    case GuitarScale.Major:
      // 메이저 스케일: 1, 2, 3, 4, 5, 6, 7도
      return [0, 2, 4, 5, 7, 9, 11].map((i) => NOTES[(idx + i) % NOTES.length]);
  }
};
