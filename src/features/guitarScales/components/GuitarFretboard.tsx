import { FretCell } from "@/features/guitarScales/components/FretCell";
import * as styles from "@/features/guitarScales/components/GuitarFretboard.css";
import { NOTES, OPEN_NOTES, OpenNote } from "@/features/guitarScales/scale";
import { Flex } from "@mantine/core";
import clsx from "clsx";

export const STRING_COUNT = 6;
const FRETBOARD_SIZE = 12;
const INDICATOR_FRETS = [3, 5, 7, 9, 12];

function getNote(openNote: OpenNote, fret: number) {
  const idx = NOTES.indexOf(openNote);
  return NOTES[(idx + fret) % 12];
}

export interface GuitarFretboardProps {
  markedNotes: string[];
  rootNote: string;
}

export const GuitarFretboard = ({ markedNotes, rootNote }: GuitarFretboardProps) => {
  return (
    <div className={styles.fretboard}>
      {Array.from({ length: STRING_COUNT }).map((_, stringIdx) => {
        const openNote = OPEN_NOTES[STRING_COUNT - stringIdx - 1];
        return (
          <div
            className={clsx(
              styles.string,
              stringIdx === 0 && styles.firstString,
              stringIdx === 5 && styles.sixthString
            )}
            key={stringIdx}
          >
            {Array.from({ length: FRETBOARD_SIZE }).map((_, fretIdx) => {
              const note = getNote(openNote, fretIdx + 1);
              const isMarked = markedNotes.includes(note);
              const isRoot = note === rootNote;
              return <FretCell isMarked={isMarked} isRoot={isRoot} stringIndex={stringIdx} />;
            })}
          </div>
        );
      })}
      <Flex>
        {Array.from({ length: FRETBOARD_SIZE }).map((_, fretIdx) => (
          <div className={styles.fretMarker} key={fretIdx}>
            {INDICATOR_FRETS.includes(fretIdx + 1) ? fretIdx + 1 : ""}
          </div>
        ))}
      </Flex>
    </div>
  );
};
