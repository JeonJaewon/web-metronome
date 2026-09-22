import { GuitarScales } from "@/features/guitarScales/GuitarScales";
import { Metronome } from "@/features/metronome/Metronome";
import { MantineProvider } from "@mantine/core";

export default function App() {
  return (
    <MantineProvider>
      <Metronome />
      <GuitarScales />
    </MantineProvider>
  );
}
