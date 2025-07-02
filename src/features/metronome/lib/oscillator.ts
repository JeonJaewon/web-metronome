export const createAudioContext = () => {
  return new (window.AudioContext || (window as any).webkitAudioContext)();
};

export const audioContext = createAudioContext();

const ACCENTED_BEAT_FREQUENCY = 880;
const REGULAR_BEAT_FREQUENCY = 440;

export const createOscillatorWithConfig = (
  volume: number,
  isAccentedBeat?: boolean
) => {
  const osc = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  gainNode.gain.value = volume;
  osc.frequency.value = isAccentedBeat
    ? ACCENTED_BEAT_FREQUENCY
    : REGULAR_BEAT_FREQUENCY;
  osc.connect(gainNode);
  gainNode.connect(audioContext.destination);
  return osc;
};
