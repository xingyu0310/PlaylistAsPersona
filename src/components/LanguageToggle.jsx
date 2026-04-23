import React from 'react';
import { useGame } from '../context/GameContext.jsx';
import toggleImg from '../assets/ui/font switch-btn.png';

export default function LanguageToggle({ className = '' }) {
  const { language, toggleLanguage, t } = useGame();
  const next = language === 'en' ? 'zh' : 'en';
  const label =
    language === 'en' ? 'Switch to 中文' : 'Switch to English';

  return (
    <button
      type="button"
      className={`lang-toggle ${className}`}
      onClick={toggleLanguage}
      aria-label={label}
      title={label}
      data-active={language}
      data-next={next}
    >
      <img src={toggleImg} alt="" aria-hidden="true" />
      <span className="sr-only">{t('ui.langToggle.current')}</span>
    </button>
  );
}
