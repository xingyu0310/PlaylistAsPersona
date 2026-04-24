import bgmUrl from '../assets/audio/background music.mp3';

const STORAGE_KEY = 'bb.bgm.muted';
const DEFAULT_VOLUME = 0.28;

let audio = null;
let started = false;
let muted = false;
const listeners = new Set();

function readMutedFromStorage() {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === '1';
  } catch (_) {
    return false;
  }
}

muted = readMutedFromStorage();

function ensureAudio() {
  if (audio) return audio;
  if (typeof Audio === 'undefined') return null;
  audio = new Audio(bgmUrl);
  audio.loop = true;
  audio.volume = DEFAULT_VOLUME;
  audio.preload = 'auto';
  return audio;
}

function notify() {
  listeners.forEach((l) => {
    try {
      l();
    } catch (_) {
      /* ignore */
    }
  });
}

export function isBgmMuted() {
  return muted;
}

export function setBgmMuted(next) {
  muted = !!next;
  try {
    window.localStorage.setItem(STORAGE_KEY, muted ? '1' : '0');
  } catch (_) {
    /* ignore */
  }
  const a = ensureAudio();
  if (a) {
    if (muted) {
      a.pause();
    } else if (started) {
      const p = a.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    }
  }
  notify();
}

export function toggleBgmMuted() {
  setBgmMuted(!muted);
}

export function subscribeBgm(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * Try to start BGM on the very first user gesture (browser autoplay policy
 * requires a gesture before audio can play).
 */
export function startBgmOnFirstGesture() {
  if (typeof window === 'undefined') return;
  if (started) return;

  const start = () => {
    if (started) return;
    started = true;
    const a = ensureAudio();
    if (a && !muted) {
      const p = a.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    }
    window.removeEventListener('pointerdown', start, true);
    window.removeEventListener('keydown', start, true);
    window.removeEventListener('touchstart', start, true);
  };

  window.addEventListener('pointerdown', start, true);
  window.addEventListener('keydown', start, true);
  window.addEventListener('touchstart', start, true);
}
