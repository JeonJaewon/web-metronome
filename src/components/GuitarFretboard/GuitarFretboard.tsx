import React from 'react';
import { getNoteAt, parseNote } from '../../lib/guitar';
import styles from './GuitarFretboard.module.css';

interface GuitarFretboardProps {
  tuning: string[]; // e.g., ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']
  fretsToDisplay: number; // e.g., 12
  highlightedNotes: string[]; // e.g., ['C', 'D', 'E', 'G', 'A'] (note names without octaves)
  showOctaves?: boolean; // Optional: for debugging or future features
}

const FRET_WIDTH = 60;
const STRING_SPACING = 30;
const PADDING_X = 40; // Padding on left/right of SVG
const PADDING_Y = 30; // Padding on top/bottom of SVG
const NOTE_MARKER_RADIUS = 10;
const INLAY_DOT_RADIUS = 6;

// Standard inlay dot positions (single dots)
const SINGLE_INLAY_FRETS = [3, 5, 7, 9];
// Frets that typically get double dots (or special markers)
const DOUBLE_INLAY_FRET = 12;


const GuitarFretboard: React.FC<GuitarFretboardProps> = ({
  tuning,
  fretsToDisplay,
  highlightedNotes,
  showOctaves = false, // Default to false
}) => {
  const numStrings = tuning.length;
  const fretboardHeight = (numStrings - 1) * STRING_SPACING;
  const fretboardWidth = fretsToDisplay * FRET_WIDTH;

  const svgWidth = fretboardWidth + PADDING_X * 2 + FRET_WIDTH; // Extra FRET_WIDTH for space after last fret
  const svgHeight = fretboardHeight + PADDING_Y * 2;

  const stringNotesElements: JSX.Element[] = [];

  tuning.forEach((openStringNote, stringIndex) => {
    for (let fret = 0; fret <= fretsToDisplay; fret++) {
      const yPos = PADDING_Y + stringIndex * STRING_SPACING;
      const xPos = PADDING_X + fret * FRET_WIDTH + FRET_WIDTH / 2; // Center of the fret cell

      const currentNoteWithOctave = getNoteAt(openStringNote, fret);
      const { noteName: currentNoteNameOnly } = parseNote(currentNoteWithOctave);

      if (highlightedNotes.includes(currentNoteNameOnly)) {
        stringNotesElements.push(
          <circle
            key={`note-${stringIndex}-${fret}`}
            cx={xPos}
            cy={yPos}
            r={NOTE_MARKER_RADIUS}
            className={styles.highlightedNoteMarker}
          />
        );
        // Optional: Add text for the note name for debugging or display
        if (showOctaves) {
            stringNotesElements.push(
                <text
                key={`text-${stringIndex}-${fret}`}
                x={xPos}
                y={yPos + NOTE_MARKER_RADIUS / 2.5 } // Adjust for better centering
                className={styles.debugText}
                dominantBaseline="middle"
                >
                {currentNoteWithOctave}
                </text>
            );
        }
      }
    }
  });

  const inlayDotsElements: JSX.Element[] = [];
  // Calculate middle points for inlay dots
  const midPointY1 = PADDING_Y + (numStrings / 2 - 1) * STRING_SPACING + STRING_SPACING / 2; // Between G and D for 6 strings
  const midPointY2 = PADDING_Y + (numStrings / 2) * STRING_SPACING - STRING_SPACING / 2; // Between D and A for 6 strings (for double dots)


  for (let fret = 1; fret <= fretsToDisplay; fret++) {
    const xPos = PADDING_X + (fret -1) * FRET_WIDTH + FRET_WIDTH / 2 + FRET_WIDTH/2; // Midpoint between frets lines

    if (SINGLE_INLAY_FRETS.includes(fret)) {
      inlayDotsElements.push(
        <circle
          key={`inlay-${fret}`}
          cx={xPos}
          cy={fretboardHeight/2 + PADDING_Y} // Centered vertically
          r={INLAY_DOT_RADIUS}
          className={styles.inlayDot}
        />
      );
    }
    if (fret === DOUBLE_INLAY_FRET) {
      // 보통 12프렛은 스트링 G와 D 사이, D와 A 사이에 찍습니다. (표준 6현 기타 기준)
      // For a 6-string guitar, this is between string 2 (D) and 3 (G), and 3 (G) and 4 (B)
      // Assuming tuning is [E2, A2, D3, G3, B3, E4] (0 to 5)
      // Dot 1: between string 2 (D3) and string 3 (G3)
      // Dot 2: between string 3 (G3) and string 4 (B3)
      // This needs to be more generic for different numbers of strings.
      // A simpler way for now: place them at 1/3 and 2/3 of the fretboard height for the 12th fret.
      inlayDotsElements.push(
        <circle
          key={`inlay-${fret}-1`}
          cx={xPos}
          cy={PADDING_Y + fretboardHeight * (1/3) }
          r={INLAY_DOT_RADIUS}
          className={styles.inlayDot}
        />,
        <circle
          key={`inlay-${fret}-2`}
          cx={xPos}
          cy={PADDING_Y + fretboardHeight * (2/3) }
          r={INLAY_DOT_RADIUS}
          className={styles.inlayDot}
        />
      );
    }
  }


  return (
    <svg width={svgWidth} height={svgHeight} className={styles.fretboardSvg}>
      {/* Render Frets (vertical lines) */}
      {Array.from({ length: fretsToDisplay + 1 }).map((_, fretIndex) => (
        <line
          key={`fret-${fretIndex}`}
          x1={PADDING_X + FRET_WIDTH / 2 + fretIndex * FRET_WIDTH}
          y1={PADDING_Y}
          x2={PADDING_X + FRET_WIDTH / 2 + fretIndex * FRET_WIDTH}
          y2={PADDING_Y + fretboardHeight}
          className={fretIndex === 0 ? styles.nut : styles.fret}
        />
      ))}

      {/* Render Strings (horizontal lines) */}
      {tuning.map((_, stringIndex) => (
        <line
          key={`string-${stringIndex}`}
          x1={PADDING_X + FRET_WIDTH / 2} // Start from the nut
          y1={PADDING_Y + stringIndex * STRING_SPACING}
          x2={PADDING_X + FRET_WIDTH / 2 + fretboardWidth} // End at the last fret line
          y2={PADDING_Y + stringIndex * STRING_SPACING}
          className={styles.string}
          style={{ strokeWidth: 2 + stringIndex * 0.2 }} // Slightly thicker strings at bottom
        />
      ))}

      {/* Render Inlay Dots */}
      {inlayDotsElements}

      {/* Render Highlighted Notes */}
      {stringNotesElements}
    </svg>
  );
};

export default GuitarFretboard;
