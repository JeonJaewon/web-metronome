export const createAudioContext = () => {
  return new (window.AudioContext || (window as any).webkitAudioContext)();
};

export const audioContext = createAudioContext();

const ACCENTED_BEAT_FREQUENCY = 880;
const REGULAR_BEAT_FREQUENCY = 440;

const ATTACK_TIME = 0.005; // 5ms attack to prevent click noise
const RELEASE_TIME = 0.05; // 50ms release for smooth fade out

type OscillatorConfig = {
  volume: number;
  isAccentedBeat: boolean;
  startTime: number;
  duration: number;
};

export const createOscillatorWithConfig = ({
  volume,
  isAccentedBeat,
  startTime,
  duration,
}: OscillatorConfig) => {
  const osc = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  // Set waveform type explicitly
  osc.type = "sine";

  // Set frequency
  osc.frequency.value = isAccentedBeat
    ? ACCENTED_BEAT_FREQUENCY
    : REGULAR_BEAT_FREQUENCY;

  // Apply attack/release envelope to prevent click noise
  const attackEnd = startTime + ATTACK_TIME;
  const releaseStart = startTime + duration - RELEASE_TIME;
  const endTime = startTime + duration;

  // Attack: fade in from 0 to volume
  gainNode.gain.setValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(volume, attackEnd);

  // Sustain: hold at volume
  gainNode.gain.setValueAtTime(volume, releaseStart);

  // Release: fade out to prevent click
  gainNode.gain.exponentialRampToValueAtTime(0.001, endTime);

  osc.connect(gainNode);
  gainNode.connect(audioContext.destination);
  return osc;
};
