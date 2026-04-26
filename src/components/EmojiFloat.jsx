import { useMemo } from 'react';

/**
 * Floating emoji background layer.
 *
 * Each particle has two layers:
 *   outer span — handles the rise + drift + fade.
 *   inner span — handles per-emoji "personality" animations
 *                (spin for 💿, pop for 🎯, twinkle for 💎/✨, etc.)
 *                via CSS rules keyed off `data-emoji`.
 *
 * The parent must be `position: relative; overflow: hidden;` for the
 * layer to be clipped to the surrounding screen.
 *
 * Props:
 *   emojis: string[]  - candidate emoji characters.
 *   count:  number    - particle count (default 20).
 *   seed:   string    - memo key so re-renders keep the same layout.
 *   style:  object    - extra CSS vars (e.g. { '--spin-duration': '1.6s' }).
 *   mood:   string    - optional modifier appended as
 *                       `emoji-float--${mood}` on the root, used to swap
 *                       per-emoji sub-animations (e.g. 'still' for the
 *                       Diffuse mood, 'chaotic' for Marshmallow's "too
 *                       open" ending).
 */
export default function EmojiFloat({
  emojis,
  count = 20,
  seed = '',
  style,
  mood,
}) {
  const particles = useMemo(() => {
    if (!emojis?.length) return [];
    return Array.from({ length: count }, (_, i) => {
      const r = Math.random;
      return {
        key: i,
        char: emojis[Math.floor(r() * emojis.length)],
        left: r() * 100,
        size: 1 + r() * 1.2,
        duration: 6 + r() * 6,
        delay: -r() * 12,
        drift: r() * 60 - 30,
        rotate: r() * 30 - 15,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed, count, emojis?.join(',')]);

  if (!particles.length) return null;

  const cls = `emoji-float${mood ? ` emoji-float--${mood}` : ''}`;

  return (
    <div className={cls} style={style} aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.key}
          className="emoji-float__particle"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size.toFixed(2)}rem`,
            animationDuration: `${p.duration.toFixed(2)}s`,
            animationDelay: `${p.delay.toFixed(2)}s`,
            '--drift': `${p.drift.toFixed(1)}px`,
            '--rot': `${p.rotate.toFixed(1)}deg`,
          }}
        >
          <span className="emoji-float__inner" data-emoji={p.char}>
            {p.char}
          </span>
        </span>
      ))}
    </div>
  );
}
