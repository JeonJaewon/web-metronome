export const createAudioContext = () => {
  return new (window.AudioContext || (window as any).webkitAudioContext)();
};

export const audioContext = createAudioContext();

export const createOscillatorWithConfig = (audioContext: AudioContext) => {
  const osc = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  gainNode.gain.value = 0.5;
  osc.frequency.value = 500;
  osc.connect(gainNode);
  gainNode.connect(audioContext.destination);
  return osc;
};
