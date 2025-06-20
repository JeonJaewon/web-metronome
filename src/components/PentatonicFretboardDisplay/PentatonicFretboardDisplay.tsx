import React from 'react';
import { getPentatonicScale } from '../../lib/scales';
import { standardTuning, fretsToDisplay as defaultFrets } from '../../lib/guitar';
import GuitarFretboard from '../GuitarFretboard/GuitarFretboard';
import styles from './PentatonicFretboardDisplay.module.css';

interface PentatonicFretboardDisplayProps {
  rootNote?: string;
  fretsToDisplay?: number;
  tuning?: string[];
}

const PentatonicFretboardDisplay: React.FC<PentatonicFretboardDisplayProps> = ({
  rootNote = 'C', // Default to C
  fretsToDisplay = defaultFrets, // Default from guitar.ts (12)
  tuning = standardTuning, // Default from guitar.ts
}) => {
  const scaleNotes = getPentatonicScale(rootNote);
  const title = `${rootNote} Major Pentatonic Scale`;

  return (
    <div className={styles.fretboardDisplayContainer}>
      <h2 className={styles.title}>{title}</h2>
      <GuitarFretboard
        tuning={tuning}
        fretsToDisplay={fretsToDisplay}
        highlightedNotes={scaleNotes}
        showOctaves={false} // Explicitly not showing octaves on the note markers themselves for this view
      />
    </div>
  );
};

export default PentatonicFretboardDisplay;
