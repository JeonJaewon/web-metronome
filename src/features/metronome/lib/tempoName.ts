type TempoMark = { bpm: number; name: string };

export const TEMPO_MARKS: readonly TempoMark[] = [
  { bpm: 40, name: "Grave" },
  { bpm: 50, name: "Largo" },
  { bpm: 60, name: "Lento" },
  { bpm: 72, name: "Adagio" },
  { bpm: 86, name: "Andante" },
  { bpm: 108, name: "Moderato" },
  { bpm: 120, name: "Allegro" },
  { bpm: 156, name: "Vivace" },
  { bpm: 176, name: "Presto" },
  { bpm: 200, name: "Prestissimo" },
];

export function tempoName(bpm: number): string {
  let last = TEMPO_MARKS[0];
  for (const m of TEMPO_MARKS) {
    if (bpm >= m.bpm) last = m;
  }
  return last.name;
}
