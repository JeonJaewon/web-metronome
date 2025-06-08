import styles from "@/components/BeatSelector/BeatSelector.module.css";

interface Props {
  setBeatsPerMeasure: (beats: number) => void;
}

export const BeatSelector = ({ setBeatsPerMeasure }: Props) => {
  return (
    <div className={styles.beatSelector}>
      <select>
        {[2, 3, 4, 5, 6].map((beats) => (
          <option key={beats} onClick={() => setBeatsPerMeasure(beats)}>
            {beats} Beats
          </option>
        ))}
      </select>
    </div>
  );
};
