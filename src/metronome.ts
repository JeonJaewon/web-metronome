const calculateIntervalByBPM = (bpm: number) => {
  return 60 / bpm;
};

export const scheduleNote = (
  time: number,
  audioContextRef: React.MutableRefObject<AudioContext | null>,
  setTick: React.Dispatch<React.SetStateAction<number>>,
  beatsPerMeasure: number
) => {
  const osc = audioContextRef.current!.createOscillator();
  osc.connect(audioContextRef.current!.destination);
  osc.start(time);
  osc.stop(time + 0.1);
  setTick((prev) => (prev + 1) % beatsPerMeasure); // Update tick for visual tracking
};

export const scheduler = (
  bpm: number,
  nextNoteTimeRef: React.MutableRefObject<number>,
  audioContextRef: React.MutableRefObject<AudioContext | null>,
  setTick: React.Dispatch<React.SetStateAction<number>>,
  beatsPerMeasure: number
) => {
  while (nextNoteTimeRef.current < audioContextRef.current!.currentTime + 0.1) {
    scheduleNote(
      nextNoteTimeRef.current,
      audioContextRef,
      setTick,
      beatsPerMeasure
    );
    nextNoteTimeRef.current += calculateIntervalByBPM(bpm);
  }
  window.setTimeout(
    () =>
      scheduler(
        bpm,
        nextNoteTimeRef,
        audioContextRef,
        setTick,
        beatsPerMeasure
      ),
    25
  );
};

export const startMetronome = (
  isPlaying: boolean,
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>,
  audioContextRef: React.MutableRefObject<AudioContext | null>,
  nextNoteTimeRef: React.MutableRefObject<number>,
  scheduler: (
    bpm: number,
    nextNoteTimeRef: React.MutableRefObject<number>,
    audioContextRef: React.MutableRefObject<AudioContext | null>,
    setTick: React.Dispatch<React.SetStateAction<number>>,
    beatsPerMeasure: number
  ) => void,
  bpm: number,
  setTick: React.Dispatch<React.SetStateAction<number>>,
  beatsPerMeasure: number
) => {
  if (!isPlaying) {
    audioContextRef.current = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    nextNoteTimeRef.current = audioContextRef.current.currentTime;
    scheduler(bpm, nextNoteTimeRef, audioContextRef, setTick, beatsPerMeasure);
    setIsPlaying(true);
  }
};

export const stopMetronome = (
  isPlaying: boolean,
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>,
  intervalRef: React.MutableRefObject<number | null>,
  audioContextRef: React.MutableRefObject<AudioContext | null>,
  setTick: React.Dispatch<React.SetStateAction<number>>
) => {
  if (isPlaying) {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
    }
    audioContextRef.current?.close();
    audioContextRef.current = null;
    setIsPlaying(false);
    setTick(0); // Reset tick when stopping
  }
};
