import { useGame } from '../context/GameContext.jsx';
import { getCharacterEnding } from '../utils/endings.js';

export function CharacterEndingScreen() {
  const { state, dispatch, characters, playlistSize } = useGame();
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
    ? Array.isArray(ending.description)
      ? ending.description
      : [ending.description]
    : [];

  return (
    <div className="screen screen-character-ending">
      <div className="ending-inner">
        <p className="ending-eyebrow">
          Character ending {savedCount} / {totalCount}
        </p>
        <h1 className="title-lg">
          {character ? `${character.name}'s ending` : 'Character ending'}
        </h1>

        {ending ? (
          <section className="ending-card ending-result" data-ending-id={ending.id}>
            {ending.subtitle ? (
              <p className="ending-tag">{ending.subtitle}</p>
            ) : null}
            <h2 className="ending-title">{ending.title}</h2>
            {endingParagraphs.map((p, i) => (
              <p key={i} className="ending-body">
                {p}
              </p>
            ))}
          </section>
        ) : (
          /* TODO: 其他角色的结局文案待填充 */
          <section className="ending-card ending-placeholder">
            <h2>Ending (placeholder)</h2>
            <p className="muted">
              (TBD) A short ending for {character?.name ?? 'this character'} based
              on the public playlist you crafted. Replace this block with the real
              narrative copy later.
            </p>
          </section>
        )}

        <section className="ending-card">
          <h2>Your Public Playlist for {character?.name ?? '—'}</h2>
          {selectedSongs.length ? (
            <ul className="ending-songs">
              {selectedSongs.map((song) => (
                <li key={song.id}>
                  <span className="song-name">{song.title}</span>
                  {song.time ? <span className="time">{song.time}</span> : null}
                </li>
              ))}
              {Array.from({ length: Math.max(0, playlistSize - selectedSongs.length) }).map(
                (_, i) => (
                  <li key={`empty-${i}`} className="muted">
                    Empty slot
                  </li>
                ),
              )}
            </ul>
          ) : (
            <p className="muted">No songs selected.</p>
          )}
        </section>

        <div className="ending-actions">
          <button
            type="button"
            className="btn btn-save"
            onClick={() => dispatch({ type: 'CONTINUE_FROM_CHARACTER_ENDING' })}
          >
            {allSaved ? 'Back to gameplay' : 'Continue'}
          </button>
          {allSaved ? (
            <button
              type="button"
              className="btn btn-done"
              onClick={() => dispatch({ type: 'SUBMIT' })}
            >
              See final ending
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
