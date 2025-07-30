import { useFeatureContext } from "@/contexts/featureContext";
import { GuitarFretboard } from "@/features/guitarScales/components/GuitarFretboard";
import {
  getScaleNotes,
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
  const [scaleType, setScaleType] =
    useState<GuitarScaleType>("majorPentatonic");

  if (focusedFeature !== "guitarScales") {
    return null;
  }

  const markedNotes = getScaleNotes(rootNote, scaleType);

  return (
    <div>
      <Flex justify="center" gap="xl" mb={24}>
        <Select
          label="Scale Type"
          data={scaleTypeOptions}
          value={scaleType}
          onChange={(value) => {
            if (isGuitarScaleType(value)) setScaleType(value);
          }}
          style={{ minWidth: 180 }}
        />
        <Select
          label="Scale Root"
          data={NOTES}
          value={rootNote}
          onChange={(value) => {
            if (isNote(value)) setRootNote(value);
          }}
          style={{ minWidth: 180 }}
        />
      </Flex>
      <GuitarFretboard markedNotes={markedNotes} />
    </div>
  );
};

const scaleTypeOptions = [
  { value: "majorPentatonic", label: "Major Pentatonic" },
  { value: "minorPentatonic", label: "Minor Pentatonic" },
  { value: "major", label: "Major Scale" },
];
