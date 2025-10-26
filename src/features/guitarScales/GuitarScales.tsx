import { useFeatureContext } from "@/contexts/featureContext";
import { GuitarFretboard } from "@/features/guitarScales/components/GuitarFretboard";
import {
  getScaleNotes,
  GuitarScale,
  GuitarScaleType,
  isGuitarScaleType,
  isNote,
  Note,
  NOTES,
} from "@/features/guitarScales/scale";
import { Flex, Select } from "@mantine/core";
import { useState } from "react";

export const GuitarScales = () => {
  const { focusedFeature } = useFeatureContext();
  const [rootNote, setRootNote] = useState<Note>("C");
  const [scaleType, setScaleType] = useState<GuitarScaleType>(
    GuitarScale.MajorPentatonic
  );

  if (focusedFeature !== "guitarScales") {
    return null;
  }

  const markedNotes = getScaleNotes(rootNote, scaleType);

  return (
    <div>
      <GuitarFretboard markedNotes={markedNotes} rootNote={rootNote} />
      <Flex justify="center" gap="xl">
        <Select
          label="Scale Type"
          data={scaleTypeOptions}
          value={scaleType}
          onChange={(value) => {
            if (isGuitarScaleType(value)) setScaleType(value);
          }}
          style={{ minWidth: 180, marginTop: 40 }}
        />
        <Select
          label="Scale Root"
          data={NOTES}
          value={rootNote}
          onChange={(value) => {
            if (isNote(value)) setRootNote(value);
          }}
          style={{ minWidth: 180, marginTop: 40 }}
        />
      </Flex>
    </div>
  );
};

const scaleTypeOptions: { value: GuitarScaleType; label: string }[] = [
  { value: GuitarScale.MajorPentatonic, label: "Major Pentatonic" },
  { value: GuitarScale.MinorPentatonic, label: "Minor Pentatonic" },
  { value: GuitarScale.Major, label: "Major Scale" },
];
