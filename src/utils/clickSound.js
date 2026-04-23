import clickUrl from '../assets/audio/soundEffect/click.mp3';

// Small pool so rapid successive clicks don't cut each other off.
const POOL_SIZE = 4;
const DEFAULT_VOLUME = 0.55;

let pool = [];
let idx = 0;
let attached = false;
let enabled = true;

function init() {
  if (pool.length) return;
  if (typeof Audio === 'undefined') return;
  for (let i = 0; i < POOL_SIZE; i++) {
    const a = new Audio(clickUrl);
    a.preload = 'auto';
    a.volume = DEFAULT_VOLUME;
    pool.push(a);
  }
}

/** Play the click SFX once. Safe to call many times in a row. */
export function playClick() {
  if (!enabled) return;
  init();
  if (!pool.length) return;
  const a = pool[idx];
  idx = (idx + 1) % pool.length;
  try {
    a.currentTime = 0;
    const p = a.play();
    if (p && typeof p.catch === 'function') p.catch(() => {});
  } catch (_) {
    /* ignore */
  }
}

export function setClickSoundEnabled(next) {
  enabled = !!next;
}

/**
 * Attach a single delegated listener so every <button> (and element with
 * role="button") triggers the click SFX. Add data-no-click-sound to opt out.
 */
export function attachGlobalClickSound() {
  if (attached) return;
  if (typeof document === 'undefined') return;
  attached = true;

  document.addEventListener(
    'pointerdown',
    (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      const target = e.target;
      if (!(target instanceof Element)) return;
      const btn = target.closest('button, [role="button"], a[data-click-sound]');
      if (!btn) return;
      if (btn.hasAttribute('disabled')) return;
      if (btn.getAttribute('aria-disabled') === 'true') return;
      if (btn.hasAttribute('data-no-click-sound')) return;
      playClick();
    },
    true
  );
}
