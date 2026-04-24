import { useGame } from '../context/GameContext.jsx';
import { getCharacterEnding } from '../utils/endings.js';
import TopRightControls from '../components/TopRightControls.jsx';

export function CharacterEndingScreen() {
  const { state, dispatch, characters, playlistSize, t, pick } = useGame();
  const character =
    characters.find((c) => c.id === state.endingCharacterId) ?? null;

  const selectedIds = character ? state.selections[character.id] ?? [] : [];
  const selectedSongs = character
    ? selectedIds
        .map((id) => character.listeningHistory.find((s) => s.id === id))
        .filter(Boolean)
    : [];

  const savedCount = characters.filter((c) => state.saved[c.id]).length;
  const totalCount = characters.length;
  const allSaved = savedCount >= totalCount;

  const ending = character ? getCharacterEnding(character.id, selectedIds) : null;
  const endingParagraphs = ending
    ? (() => {
        const desc = pick(ending.description);
        if (Array.isArray(desc)) return desc;
        if (typeof desc === 'string') return [desc];
        return [];
      })()
    : [];

  const fallbackName =
    character?.name ?? t('charEnding.placeholderFallbackName');

  return (
    <div className="screen screen-character-ending">
      <TopRightControls />
      <div className="ending-inner">
        <p className="ending-eyebrow">
          {t('charEnding.eyebrow', { saved: savedCount, total: totalCount })}
        </p>
        <h1 className="title-lg">
          {character
            ? t('charEnding.title', { name: character.name })
            : t('charEnding.titleFallback')}
        </h1>

        {ending ? (
          <section className="ending-card ending-result" data-ending-id={ending.id}>
            {ending.subtitle ? (
              <p className="ending-tag">{pick(ending.subtitle)}</p>
            ) : null}
            <h2 className="ending-title">{pick(ending.title)}</h2>
            {endingParagraphs.map((p, i) => (
              <p key={i} className="ending-body">
                {p}
              </p>
            ))}
          </section>
        ) : (
          <section className="ending-card ending-placeholder">
            <h2>{t('charEnding.placeholderTitle')}</h2>
            <p className="muted">
              {t('charEnding.placeholderBody', { name: fallbackName })}
            </p>
          </section>
        )}

        <section className="ending-card">
          <h2>{t('charEnding.yourPlaylist', { name: fallbackName })}</h2>
          {selectedSongs.length ? (
            <ul className="ending-songs">
              {selectedSongs.map((song) => (
                <li key={song.id}>
                  <span className="song-name lang-en-inline">{song.title}</span>
                  {song.time ? (
                    <span className="time lang-en-inline">{song.time}</span>
                  ) : null}
                </li>
              ))}
              {Array.from({ length: Math.max(0, playlistSize - selectedSongs.length) }).map(
                (_, i) => (
                  <li key={`empty-${i}`} className="muted">
                    {t('charEnding.emptySlot')}
                  </li>
                ),
              )}
            </ul>
          ) : (
            <p className="muted">{t('charEnding.noSongs')}</p>
          )}
        </section>

        <div className="ending-actions">
          <button
            type="button"
            className="btn btn-save"
            onClick={() => dispatch({ type: 'CONTINUE_FROM_CHARACTER_ENDING' })}
          >
            {allSaved ? t('charEnding.backToGameplay') : t('charEnding.continue')}
          </button>
          {allSaved ? (
            <button
              type="button"
              className="btn btn-done"
              onClick={() => dispatch({ type: 'SUBMIT' })}
            >
              {t('charEnding.seeFinal')}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
