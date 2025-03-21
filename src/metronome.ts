const calculateIntervalByBPM = (bpm: number) => {
  return 60 / bpm;
};

const createAudioContext = () => {
  return new (window.AudioContext || (window as any).webkitAudioContext)();
};

export class MetronomeScheduler {
  public isPlaying: boolean = false;
  private audioContext: AudioContext = createAudioContext();
  private nextNoteTime: number = this.audioContext.currentTime;
  private timer: ReturnType<typeof setTimeout> | null = null;
  private volume: number = 0.5;

  constructor(
    private bpm: number,
    private onTick: (param?: unknown[]) => void
  ) {}

  tick() {
    const osc = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    gainNode.gain.value = this.volume;
    osc.frequency.value = 500;
    osc.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    osc.start(this.nextNoteTime);
    osc.stop(this.nextNoteTime + 0.1);
    this.onTick();
  }

  scheduleNextNote() {
    if (!this.isPlaying) return;

    while (this.nextNoteTime < this.audioContext.currentTime + 0.1) {
      this.tick();
      this.nextNoteTime += calculateIntervalByBPM(this.bpm);
    }
    this.timer = setTimeout(() => this.scheduleNextNote(), 25);
  }

  startMetronome() {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.scheduleNextNote();
    }
  }

  stopMetronome() {
    if (this.timer !== null) {
      this.timer = null;
    }
    this.isPlaying = false;
  }

  setBPM(bpm: number) {
    this.bpm = bpm;
    if (this.isPlaying) {
      this.stopMetronome();
      this.startMetronome();
    }
  }

  setOnTick(onTick: (param?: unknown[]) => void) {
    this.onTick = onTick;
  }

  setVolume(volume: number) {
    this.volume = volume;
  }
}
