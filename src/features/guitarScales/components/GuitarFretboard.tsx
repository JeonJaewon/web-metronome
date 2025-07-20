import { FretCell } from "@/features/guitarScales/components/FretCell";
import * as styles from "@/features/guitarScales/components/GuitarFretboard.css";
import { Flex } from "@mantine/core";
import clsx from "clsx";

// 6줄(1~6번줄), 12프렛(1~12프렛)
export const STRING_COUNT = 6;
const FRETBOARD_SIZE = 12;

// 예시: 각 줄의 개방현 음계 (6번줄~1번줄)
const OPEN_NOTES = ["E", "A", "D", "G", "B", "E"];
const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const INDICATOR_FRETS = [3, 5, 7, 9, 12];

function getNote(openNote: string, fret: number) {
  const idx = NOTES.indexOf(openNote);
  return NOTES[(idx + fret) % 12];
}

export const GuitarFretboard = () => {
  return (
    <div className={styles.fretboard}>
      {Array.from({ length: STRING_COUNT }).map((_, stringIdx) => {
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
              // 0번줄이 6번줄, 5번줄이 1번줄이므로 뒤집어서 표시
              const openNote = OPEN_NOTES[STRING_COUNT - stringIdx - 1];
              const note = getNote(openNote, fretIdx);
              return (
                <FretCell isMarked={note === "E"} stringIndex={stringIdx} />
              );
            })}
          </div>
        );
      })}
      <Flex>
        {Array.from({ length: FRETBOARD_SIZE }).map((_, fretIdx) => {
          return (
            <div className={styles.fretMarker} key={fretIdx}>
              {INDICATOR_FRETS.includes(fretIdx + 1) ? fretIdx + 1 : ""}
            </div>
          );
        })}
      </Flex>
      {/* </div> */}
    </div>
  );
};
