import React from 'react';
import { getPentatonicScale } from '../../lib/scales';
import styles from './PentatonicScaleDisplay.module.css';

const PentatonicScaleDisplay: React.FC = () => {
  const notes = getPentatonicScale('C');

  return (
    <div className={styles.scaleContainer}>
      {notes.map(note => (
        <span key={note} className={styles.noteItem}>
          {note}
        </span>
      ))}
    </div>
  );
};

export default PentatonicScaleDisplay;
