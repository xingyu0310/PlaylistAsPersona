import { useGame } from '../context/GameContext.jsx';
import { PLAYLIST_SIZE } from '../constants.js';
import closeImg from '../assets/ui/close.png';

export function HelpPanel() {
  const { state, dispatch, t } = useGame();
  if (!state.helpOpen) return null;

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onClick={() => dispatch({ type: 'CLOSE_HELP' })}
    >
      <div
        className="modal sheet help-sheet"
        role="dialog"
        aria-labelledby="help-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close-btn"
          onClick={() => dispatch({ type: 'CLOSE_HELP' })}
          aria-label={t('ui.close')}
        >
          <img src={closeImg} alt="" width={72} height={72} decoding="async" />
        </button>
        <h2 id="help-title" className="modal-title">
          {t('help.title')}
        </h2>
        <ol className="modal-list ordered">
          <li>
            {t('help.0a')}
            <span className="kw">{t('help.0b')}</span>
            {t('help.0c')}
          </li>
          <li>
            <span className="kw">{t('help.1a')}</span>
            {t('help.1b')}
          </li>
          <li>
            {t('help.2a')}
            <span className="kw">{t('help.2b')}</span>
            {t('help.2c')}
            <span className="kw lang-en-inline">{t('help.2d')}</span>
            {t('help.2e')}
          </li>
          <li>
            {t('help.3a')}
            <span className="kw lang-en-inline">{t('help.3b')}</span>
            {t('help.3c')}
            <span className="kw lang-en-inline">{t('help.3d')}</span>
            {t('help.3e', { n: PLAYLIST_SIZE })}
          </li>
          <li>
            {t('help.4a')}
            <span className="kw lang-en-inline">{t('help.4b')}</span>
            {t('help.4c')}
          </li>
          <li>
            {t('help.5a')}
            <span className="kw">{t('help.5b')}</span>
            {t('help.5c')}
            <span className="kw">{t('help.5d')}</span>
            {t('help.5e')}
          </li>
        </ol>
      </div>
    </div>
  );
}
