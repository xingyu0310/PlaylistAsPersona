import { useGame } from '../context/GameContext.jsx';

function songTitle(character, id) {
  return character?.listeningHistory.find((s) => s.id === id)?.title ?? id;
}

export function ResultScreen() {
  const { state, dispatch, characters } = useGame();
  const { result } = state;
  if (!result) {
    return (
      <div className="screen screen-result">
        <p>No result data.</p>
        <button type="button" className="btn" onClick={() => dispatch({ type: 'BACK_TO_START' })}>
          Back to Start
        </button>
      </div>
    );
  }

  return (
    <div className="screen screen-result">
      <div className="result-inner">
        <h1 className="title-lg">Results</h1>
        <p className="result-summary">{result.summary}</p>

        {result.perCharacter.map((row) => {
          const ch = characters.find((c) => c.id === row.characterId);
          return (
            <section key={row.characterId} className="result-card">
              <h2>{row.name}</h2>
              <p className="scoreline">
                Match {row.hits} / {row.total}
              </p>
              <div className="result-cols">
                <div>
                  <h3>Your picks</h3>
                  <ul>
                    {row.selectedIds.map((id) => (
                      <li key={id}>{songTitle(ch, id)}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>Suggested Public Playlist</h3>
                  <ul>
                    {row.recommendedIds.map((id) => (
                      <li key={id}>{songTitle(ch, id)}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="muted small">{row.note}</p>
            </section>
          );
        })}

        <div className="result-actions">
          <button type="button" className="btn btn-save" onClick={() => dispatch({ type: 'REPLAY' })}>
            Replay
          </button>
          <button
            type="button"
            className="btn btn-done"
            onClick={() => dispatch({ type: 'BACK_TO_START' })}
          >
            Back to Start
          </button>
        </div>
      </div>
    </div>
  );
}
