import React, { useEffect, useState } from 'react';
import {
  isBgmMuted,
  toggleBgmMuted,
  subscribeBgm,
} from '../utils/bgm.js';
import noteImg from '../assets/ui/音符.png';

export default function BgmToggle({ className = '' }) {
  const [muted, setMuted] = useState(() => isBgmMuted());

  useEffect(() => {
    return subscribeBgm(() => setMuted(isBgmMuted()));
  }, []);

  const label = muted ? 'Play background music' : 'Mute background music';

  return (
    <button
      type="button"
      className={`bgm-toggle ${muted ? 'is-muted' : ''} ${className}`}
      onClick={toggleBgmMuted}
      aria-label={label}
      aria-pressed={!muted}
      title={label}
    >
      <img src={noteImg} alt="" aria-hidden="true" />
    </button>
  );
}
