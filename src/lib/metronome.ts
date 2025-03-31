import { useSyncExternalStore } from "react";
import { audioContext, createOscillatorWithConfig } from "./oscillator";

const calculateIntervalByBPM = (bpm: number) => 60 / bpm;

let listeners: (() => void)[] = [];

const subscribe = (listener: () => void) => {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
};

const notifyListeners = () => {
  for (const listener of listeners) {
    listener();
  }
};

type MetronomeState = {
  isPlaying: boolean;
  bpm: number;
  volume: number;
  nextNoteTime: number;
  timer: ReturnType<typeof setTimeout> | null;
};

type MetronomeAction =
  | { type: "START" }
  | { type: "STOP" }
  | { type: "SET_BPM"; bpm: number }
  | { type: "SET_VOLUME"; volume: number }
  | { type: "TICK"; nextNoteTime: number }
  | { type: "SET_TIMER"; timer: ReturnType<typeof setTimeout> | null };

const initialState: MetronomeState = {
  isPlaying: false,
  bpm: 100,
  volume: 0.5,
  nextNoteTime: audioContext.currentTime,
  timer: null,
};

let metronomeState = initialState;

const metronomeReducer = (
  state: MetronomeState,
  action: MetronomeAction
): MetronomeState => {
  switch (action.type) {
    case "START":
      return { ...state, isPlaying: true };
    case "STOP":
      return { ...state, isPlaying: false, timer: null };
    case "SET_BPM":
      return { ...state, bpm: action.bpm };
    case "SET_VOLUME":
      return { ...state, volume: action.volume };
    case "TICK":
      return { ...state, nextNoteTime: action.nextNoteTime };
    case "SET_TIMER":
      return { ...state, timer: action.timer };
    default:
      return state;
  }
};

const dispatch = (action: MetronomeAction) => {
  metronomeState = metronomeReducer(metronomeState, action);
  notifyListeners();
};

const getSnapshot = () => metronomeState;

export const useMetronomeScheduler = (onTick?: () => void) => {
  const scheduleNextNote = () => {
    if (!metronomeState.isPlaying) return;

    while (metronomeState.nextNoteTime < audioContext.currentTime + 0.1) {
      const oscillator = createOscillatorWithConfig(audioContext);
      oscillator.start(metronomeState.nextNoteTime);
      oscillator.stop(metronomeState.nextNoteTime + 0.1);
      onTick?.();
      dispatch({
        type: "TICK",
        nextNoteTime:
          metronomeState.nextNoteTime +
          calculateIntervalByBPM(metronomeState.bpm),
      });
    }

    const timer = setTimeout(() => scheduleNextNote(), 25);
    dispatch({ type: "SET_TIMER", timer });
  };

  const startMetronome = () => {
    if (!metronomeState.isPlaying) {
      dispatch({ type: "START" });
      scheduleNextNote();
    }
  };

  const stopMetronome = () => {
    if (metronomeState.timer !== null) {
      clearTimeout(metronomeState.timer);
    }
    dispatch({ type: "STOP" });
  };

  const setBPM = (bpm: number) => {
    dispatch({ type: "SET_BPM", bpm });
    if (metronomeState.isPlaying) {
      stopMetronome();
      startMetronome();
    }
  };

  const setVolume = (volume: number) => {
    dispatch({ type: "SET_VOLUME", volume });
  };

  return {
    ...useSyncExternalStore(subscribe, getSnapshot),
    startMetronome,
    stopMetronome,
    setBPM,
    setVolume,
  };
};
