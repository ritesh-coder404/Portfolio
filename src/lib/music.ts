// Background music: plays /music.mp3 if you add one to the public folder,
// otherwise falls back to a soft ambient pad generated in the browser (no file needed).
let audio: HTMLAudioElement | null = null;
let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let timer: number | undefined;
let mode: "file" | "ambient" | null = null;
let playing = false;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
};
export const isPlaying = () => playing;

const chords = [
  [110, 220, 261.63, 329.63],
  [87.31, 174.61, 220, 261.63],
  [130.81, 261.63, 329.63, 392],
  [98, 196, 246.94, 293.66],
];
let step = 0;

const playChord = () => {
  if (!ctx || !master) return;
  const c = ctx;
  const out = master;
  const now = c.currentTime;
  chords[step++ % chords.length].forEach((f, i) => {
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = i === 0 ? "sine" : "triangle";
    o.frequency.value = f;
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(i === 0 ? 0.16 : 0.07, now + 1.4);
    g.gain.linearRampToValueAtTime(0, now + 4.6);
    o.connect(g);
    g.connect(out);
    o.start(now);
    o.stop(now + 4.7);
  });
};

const startAmbient = () => {
  if (mode === "ambient") return;
  mode = "ambient";
  const AC =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AC) return;
  ctx = new AC();
  master = ctx.createGain();
  master.gain.value = 0.8;
  master.connect(ctx.destination);
  playChord();
  timer = window.setInterval(playChord, 3600);
};

export const startMusic = () => {
  if (playing) return;
  playing = true;
  emit();
  if (!audio) {
    audio = new Audio("/music.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    audio.addEventListener("error", () => {
      if (playing) startAmbient();
    });
  }
  mode = mode ?? "file";
  audio.play().catch(() => {
    if (playing) startAmbient();
  });
};

export const pauseMusic = () => {
  playing = false;
  emit();
  audio?.pause();
  ctx?.suspend();
};

export const resumeMusic = () => {
  playing = true;
  emit();
  if (mode === "ambient") ctx?.resume();
  else audio?.play().catch(() => startAmbient());
};

export const toggleMusic = () => {
  if (playing) pauseMusic();
  else if (audio || ctx) resumeMusic();
  else startMusic();
};

export const disposeMusic = () => {
  if (timer) window.clearInterval(timer);
};
