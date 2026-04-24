import React from 'react';
import LanguageToggle from './LanguageToggle.jsx';
import BgmToggle from './BgmToggle.jsx';

export default function TopRightControls({ variant = 'floating' }) {
  return (
    <div className={`top-right-controls top-right-controls--${variant}`}>
      <BgmToggle />
      <LanguageToggle />
    </div>
  );
}
