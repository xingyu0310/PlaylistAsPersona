import { useGame } from '../context/GameContext.jsx';
import TopRightControls from '../components/TopRightControls.jsx';
import EmojiFloat from '../components/EmojiFloat.jsx';
import { getFinalEndingEmojis } from '../utils/endingEmojis.js';
import replayBtnImg from '../assets/ui/replay.png';
import backToStartBtnImg from '../assets/ui/back to start.png';

export function FinalEndingScreen() {
  const { state, dispatch, characters, t, pick } = useGame();
  const { result } = state;
  const finalEnding = result?.finalEnding ?? null;
  const emojiCfg = finalEnding ? getFinalEndingEmojis(finalEnding.id) : null;
  const endingParagraphs = finalEnding
    ? (() => {
        const desc = pick(finalEnding.description);
        if (Array.isArray(desc)) return desc;
        if (typeof desc === 'string' && desc.length) return [desc];
        return [];
      })()
    : [];

  return (
    <div className="screen screen-final-ending">
      {emojiCfg ? (
        <EmojiFloat {...emojiCfg} seed={`final-${finalEnding.id}`} />
      ) : null}
      <TopRightControls />
      <div className="ending-inner">
        <p className="ending-eyebrow">{t('final.eyebrow')}</p>
        <h1 className="title-lg">{t('final.title')}</h1>

        {finalEnding ? (
          <section className="ending-card">
            {finalEnding.subtitle ? (
              <p className="ending-tag">{pick(finalEnding.subtitle)}</p>
            ) : null}
            <h2 className="ending-title">{pick(finalEnding.title)}</h2>
            {endingParagraphs.map((p, i) => (
              <p key={i} className="ending-description">
                {p}
              </p>
            ))}
          </section>
        ) : (
          <section className="ending-card ending-placeholder">
            <h2>{t('final.placeholderTitle')}</h2>
            <p className="muted">{t('final.placeholderBody')}</p>
          </section>
        )}

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
            className="btn-img-action"
            onClick={() => dispatch({ type: 'REPLAY' })}
            aria-label={t('final.replay')}
          >
            <img src={replayBtnImg} alt="" decoding="async" />
          </button>
          <button
            type="button"
            className="btn-img-action"
            onClick={() => dispatch({ type: 'BACK_TO_START' })}
            aria-label={t('final.backToStart')}
          >
            <img src={backToStartBtnImg} alt="" decoding="async" />
          </button>
        </div>
      </div>
    </div>
  );
}
