// Per-ending emoji presets used by EmojiFloat on the ending screens.
//
// Keyed first by characterId, then by ending.id (matches the `id`
// returned from `getCharacterEnding` / `endings.js`).
//
// Each entry has:
//   emojis: string[]   - candidate emoji to spawn.
//   count:  number     - how many particles.
//   style?: object     - extra CSS vars on the layer
//                        (e.g. { '--spin-duration': '1.6s' } to make 💿
//                        spin faster).
//   mood?:  string     - extra modifier class `emoji-float--${mood}` used
//                        to swap per-emoji sub-animations.
//                        Currently used moods:
//                          'still'      — 💿 stops spinning (Soft Frame C).
//                          'chaotic'    — 🫧 pops, 🌱 grows too fast
//                                         (Marshmallow C, "too open").
//                          'drift'      — every emoji wanders sideways,
//                                         "never fully converging"
//                                         (Final: Observer).
//                          'revealing'  — 🫧 pops, ❤️ pulses bigger
//                                         (Final: Truth Seeker).
//                          'frenzy'     — everything spins / wobbles,
//                                         💿 spins faster
//                                         (Final: Over-Interpreter).
//
// ─── Flash Beat / Unicorn ─────────────────────────────────────────────
//   Two axes — Attention (👁/✨/📈) vs Authenticity (❤️/💔/🫧/🎭).
//
//   A   Rising Star          → high attention   → eyes / sparkles / chart-up
//   B   Almost There         → mixed signals    → eyes + sparkle + heart
//   C   Private Side Leaking → too authentic    → hearts breaking, bubbles
//   EE  Cult Favorite        → mask & subtle    → drama mask, bubbles, sparkle
//
// ─── Soft Frame / Cat ─────────────────────────────────────────────────
//   Two axes — Recognition (🎯/💬/👥/🔗) vs Taste (💿/💎/🪞/🖼️).
//
//   A   It-Girl Signal              → seen by the right people
//                                      → 💿 spins, 🎯 lands, 💬 floats
//   B   Almost the Right Crowd      → fewer hits, softer signal
//   C   Too Private, Too Diffuse    → 💿 stops, mirror + bubble (fewer 💬)
//   EE  Main Character in Her Edit  → 💿 spins faster, 💎✨✨✨
//
// ─── Marshmallow / Lamb ───────────────────────────────────────────────
//   Two axes — Protection (🧷/🫧/🌙) vs Connection (🌱/💌).
//
//   A   Gentle and Approachable     → 🌱 grows slowly, 💌 floats softly,
//                                      🫧 gentle wobble, 🧷 anchors
//   B   Soft but Distant            → 🫧 dominates, 🌙 quiet, 🧷 protects;
//                                      no 💌 (no warm reach-out)
//   C   More Than She Meant to Show → 🫧 pop, 🌱 grows too fast, 💌 unfolds
//                                      (everything spilling open)

export const ENDING_EMOJIS = {
  flashbeat: {
    A: { emojis: ['👁', '👀', '✨', '📈'], count: 28 },
    B: { emojis: ['👁', '✨', '❤️'], count: 18 },
    C: { emojis: ['❤️', '💔', '🫧'], count: 22 },
    EASTER_EGG: { emojis: ['🎭', '🫧', '✨'], count: 22 },
  },
  softframe: {
    A: { emojis: ['💿', '🎯', '💬', '💎'], count: 24 },
    B: { emojis: ['🎯', '💿', '💬'], count: 16 },
    C: { emojis: ['🪞', '💿', '🫧'], count: 12, mood: 'still' },
    EASTER_EGG: {
      emojis: ['💿', '💎', '✨'],
      count: 22,
      style: { '--spin-duration': '1.6s' },
    },
  },
  marshmallow: {
    A: { emojis: ['🌱', '💌', '🫧', '🧷'], count: 22 },
    B: { emojis: ['🫧', '🌙', '🧷'], count: 26 },
    C: { emojis: ['🫧', '💌', '🌱'], count: 28, mood: 'chaotic' },
  },
};

// ─── Final endings ────────────────────────────────────────────────────
//
// Keyed by the `id` of the FINAL_ENDINGS entries from endings.js
// (IMAGE / BALANCE / OBSERVER / TRUTH / INTERPRET).
//
//   IMAGE      — Image Builder.       ✨ multiplies, 👁 steady, 💿 glows
//   BALANCE    — Connector.           🌱 grows, 💌 floats, 💬 emerges
//   OBSERVER   — Observer.            never quite converges, just drifts
//   TRUTH      — Truth Seeker.        ❤️ pulses, 🫧 keeps popping, no ✨
//   INTERPRET  — Over-Interpreter.    everything spins, 🎭 surfaces, ✨ pops

export const FINAL_ENDING_EMOJIS = {
  IMAGE: { emojis: ['✨', '👁', '💿'], count: 28 },
  BALANCE: { emojis: ['🌱', '💌', '💬'], count: 22 },
  OBSERVER: { emojis: ['👁', '🫧', '🌙'], count: 18, mood: 'drift' },
  TRUTH: { emojis: ['❤️', '🫧', '💔'], count: 22, mood: 'revealing' },
  INTERPRET: {
    emojis: ['🎭', '💿', '✨', '👁', '❤️'],
    count: 26,
    mood: 'frenzy',
    style: { '--spin-duration': '1.4s' },
  },
};

export function getEndingEmojis(characterId, endingId) {
  return ENDING_EMOJIS[characterId]?.[endingId] ?? null;
}

export function getFinalEndingEmojis(finalEndingId) {
  return FINAL_ENDING_EMOJIS[finalEndingId] ?? null;
}
