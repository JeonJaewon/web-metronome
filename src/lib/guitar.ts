import { noteNames } from './scales'; // Assuming noteNames is ['C', 'C#', ..., 'B']

export const standardTuning: string[] = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'];
export const fretsToDisplay: number = 12;

/**
 * Parses a note string (e.g., "E2", "C#4") into its name and octave.
 * @param noteString The note string to parse.
 * @returns An object containing the note name and octave.
 */
export function parseNote(noteString: string): { noteName: string, octave: number } {
  const match = noteString.match(/([A-G]#?)([0-9]+)/);
  if (!match) {
    throw new Error(`Invalid note string format: ${noteString}`);
  }
  const noteName = match[1];
  const octave = parseInt(match[2], 10);
  return { noteName, octave };
}

/**
 * Calculates the note at a specific fret on a given string.
 * @param openStringNote The note of the open string (e.g., "E2").
 * @param fret The fret number (0 for open string).
 * @returns The note at the specified fret (e.g., "F2", "C4").
 */
export function getNoteAt(openStringNote: string, fret: number): string {
  const { noteName: openNoteName, octave: openOctave } = parseNote(openStringNote);

  const openNoteIndex = noteNames.indexOf(openNoteName);
  if (openNoteIndex === -1) {
    throw new Error(`Invalid open string note name: ${openNoteName}`);
  }

  const totalSemitones = openNoteIndex + fret;

  const resultingNoteName = noteNames[totalSemitones % 12];
  const octaveOffset = Math.floor(totalSemitones / 12);
  const resultingOctave = openOctave + octaveOffset;

  return `${resultingNoteName}${resultingOctave}`;
}

// Example Usage (for testing purposes, can be commented out or removed)
// console.log("Standard Tuning:", standardTuning);
// console.log("Frets to Display:", fretsToDisplay);
// console.log("Note E2, Fret 0:", getNoteAt('E2', 0)); // E2
// console.log("Note E2, Fret 1:", getNoteAt('E2', 1)); // F2
// console.log("Note E2, Fret 12:", getNoteAt('E2', 12)); // E3
// console.log("Note A2, Fret 3:", getNoteAt('A2', 3)); // C3
// console.log("Note B3, Fret 1:", getNoteAt('B3', 1)); // C4
// console.log("Note G3, Fret 5:", getNoteAt('G3', 5)); // C4
// console.log("Note C4, Fret 0:", getNoteAt('C4',0)); // C4

/*
// Test parseNote
try {
  console.log(parseNote("E2"));
  console.log(parseNote("C#4"));
  console.log(parseNote("Gb5")); // Gb will be recognized, though not in standard `noteNames`
  // console.log(parseNote("X9")); // Should throw error
} catch (e) {
  if (e instanceof Error) {
    console.error(e.message);
  } else {
    console.error("An unknown error occurred during parseNote testing.");
  }
}
*/
