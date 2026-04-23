import { useGame } from '../context/GameContext.jsx';
import LanguageToggle from '../components/LanguageToggle.jsx';

export function FinalEndingScreen() {
  const { state, dispatch, characters, t } = useGame();
  const { result } = state;

  return (
    <div className="screen screen-final-ending">
      <LanguageToggle className="lang-toggle--floating" />
      <div className="ending-inner">
        <p className="ending-eyebrow">{t('final.eyebrow')}</p>
        <h1 className="title-lg">{t('final.title')}</h1>

        <section className="ending-card ending-placeholder">
          <h2>{t('final.placeholderTitle')}</h2>
          <p className="muted">{t('final.placeholderBody')}</p>
        </section>

        <section className="ending-card">
          <h2>{t('final.recap')}</h2>
          <ul className="ending-recap">
            {characters.map((c) => {
              const row = result?.perCharacter.find((r) => r.characterId === c.id);
              return (
                <li key={c.id}>
                  <span className="ending-recap__name lang-en-inline">{c.name}</span>
                  <span className="muted">
                    {row ? t('final.match', { hits: row.hits, total: row.total }) : '—'}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        <div className="ending-actions">
          <button
            type="button"
            className="btn btn-save"
            onClick={() => dispatch({ type: 'REPLAY' })}
          >
            {t('final.replay')}
          </button>
          <button
            type="button"
            className="btn btn-done"
            onClick={() => dispatch({ type: 'BACK_TO_START' })}
          >
            {t('final.backToStart')}
          </button>
        </div>
      </div>
    </div>
  );
}
