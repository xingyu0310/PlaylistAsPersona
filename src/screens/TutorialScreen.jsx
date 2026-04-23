import { useGame } from '../context/GameContext.jsx';
import { PLAYLIST_SIZE } from '../constants.js';
import noteImg from '../assets/ui/音符.png';
import LanguageToggle from '../components/LanguageToggle.jsx';

export function TutorialScreen() {
  const { navigate, t } = useGame();
  return (
    <div className="screen screen-tutorial">
      <LanguageToggle className="lang-toggle--floating" />
      <div className="tutorial-inner">
        <h1 className="title-lg title-lg--with-deco">
          <img src={noteImg} alt="" className="tutorial-title-deco" width={36} height={36} />
          {t('tutorial.title')}
        </h1>
        <ol className="tutorial-steps">
          <li>
            <span className="kw">{t('tutorial.steps.0a')}</span>
            {t('tutorial.steps.0b')}
            <span className="kw">{t('tutorial.steps.0c')}</span>
            {t('tutorial.steps.0d')}
          </li>
          <li>
            <span className="kw">{t('tutorial.steps.1a')}</span>
            {t('tutorial.steps.1b')}
          </li>
          <li>
            {t('tutorial.steps.2a')}
            <span className="kw">{t('tutorial.steps.2b')}</span>
            {t('tutorial.steps.2c')}
            <span className="kw lang-en-inline">{t('tutorial.steps.2d')}</span>
            {t('tutorial.steps.2e')}
          </li>
          <li>
            {t('tutorial.steps.3a')}
            <span className="kw lang-en-inline">{t('tutorial.steps.3b')}</span>
            {t('tutorial.steps.3c')}
            <span className="kw lang-en-inline">{t('tutorial.steps.3d')}</span>
            {t('tutorial.steps.3e', { n: PLAYLIST_SIZE })}
          </li>
          <li>
            {t('tutorial.steps.4a')}
            <span className="kw lang-en-inline">{t('tutorial.steps.4b')}</span>
            {t('tutorial.steps.4c')}
          </li>
          <li>
            {t('tutorial.steps.5a', { n: PLAYLIST_SIZE })}
            <span className="kw">{t('tutorial.steps.5b')}</span>
            {t('tutorial.steps.5c')}
            <span className="kw">{t('tutorial.steps.5d')}</span>
            {t('tutorial.steps.5e')}
          </li>
          <li>
            {t('tutorial.steps.6a')}
            <span className="kw">{t('tutorial.steps.6b')}</span>
            {t('tutorial.steps.6c')}
            <span className="kw">{t('tutorial.steps.6d')}</span>
            {t('tutorial.steps.6e')}
          </li>
          <li>
            {t('tutorial.steps.7a')}
            <span className="kw">{t('tutorial.steps.7b')}</span>
            {t('tutorial.steps.7c')}
            <span className="kw">{t('tutorial.steps.7d')}</span>
            {t('tutorial.steps.7e')}
          </li>
        </ol>
        <button type="button" className="btn btn-primary" onClick={() => navigate('gameplay')}>
          {t('tutorial.cta.play')}
        </button>
      </div>
    </div>
  );
}
