import * as styles from "@/features/metronome/components/VolumeController/VolumeController.css";
import { useMetronomeScheduler } from "@/features/metronome/lib/useMetronomeScheduler";
import { useKeyControl } from "@/hooks/useKeyControl";
import { Flex, Slider } from "@mantine/core";
import { useState } from "react";

const MIN_VOLUME_LEVEL = 0;
const MAX_VOLUME_LEVEL = 0.5;

const VOLUME_INPUT_STEP = MAX_VOLUME_LEVEL / 100;
const VOLUME_KEYBOARD_STEP = VOLUME_INPUT_STEP * 5;

export function VolumeController() {
  const { volume, setVolume } = useMetronomeScheduler();
  const [hovered, setHovered] = useState(false);

  const getVolumePercentage = (value: number) => {
    return Math.round((value / MAX_VOLUME_LEVEL) * 100);
  };

  useKeyControl("ArrowUp", () => {
    setVolume(Math.min(volume + VOLUME_KEYBOARD_STEP, MAX_VOLUME_LEVEL));
    setHovered(true);
  });

  useKeyControl("ArrowDown", () => {
    setVolume(Math.max(volume - VOLUME_KEYBOARD_STEP, MIN_VOLUME_LEVEL));
    setHovered(true);
  });

  return (
    <div
      className={styles.volumeController}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <VolumeIcon />
      <Slider
        ml="10px"
        className={hovered ? styles.sliderVisible : styles.sliderHidden}
        value={volume}
        min={MIN_VOLUME_LEVEL}
        max={MAX_VOLUME_LEVEL}
        step={VOLUME_INPUT_STEP}
        onChange={(value) => setVolume(value)}
        label={(value) => `${getVolumePercentage(value)}%`}
      />
    </div>
  );
}

const VolumeIcon = () => (
  <Flex>
    <svg
      stroke="currentColor"
      fill="none"
      stroke-width="2"
      viewBox="0 0 24 24"
      stroke-linecap="round"
      stroke-linejoin="round"
      height="20px"
      width="20px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
    </svg>
  </Flex>
);
