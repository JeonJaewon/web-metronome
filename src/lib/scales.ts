export const majorPentatonicIntervals: number[] = [0, 2, 4, 7, 9];

export const noteNames: string[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export function getPentatonicScale(rootNoteName: string): string[] {
  const rootNoteIndex = noteNames.indexOf(rootNoteName);

  if (rootNoteIndex === -1) {
    // Handle the case where the root note name is not found
    console.error(`Root note "${rootNoteName}" not found.`);
    return [];
  }

  const scaleNotes: string[] = majorPentatonicIntervals.map(interval => {
    const noteIndex = (rootNoteIndex + interval) % 12;
    return noteNames[noteIndex];
  });

  return scaleNotes;
}

// Example usage (optional, can be removed or commented out)
// console.log(`C Major Pentatonic: ${getPentatonicScale('C')}`);
// console.log(`G Major Pentatonic: ${getPentatonicScale('G')}`);
// console.log(`D# Major Pentatonic: ${getPentatonicScale('D#')}`);
// console.log(`F# Major Pentatonic: ${getPentatonicScale('F#')}`);
