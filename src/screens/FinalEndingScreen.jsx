import { useGame } from '../context/GameContext.jsx';

export function FinalEndingScreen() {
  const { state, dispatch, characters } = useGame();
  const { result } = state;

  return (
    <div className="screen screen-final-ending">
      <div className="ending-inner">
        <p className="ending-eyebrow">Final ending</p>
        <h1 className="title-lg">Your ending</h1>

        {/* TODO: 最终总结局正文（之后填充） */}
        <section className="ending-card ending-placeholder">
          <h2>Your personalized ending (placeholder)</h2>
          <p className="muted">
            (TBD) A reflective ending tailored to how you read all three personas.
            Replace this block with the real ending copy later.
          </p>
        </section>

        {/* 占位：保留每个角色的小结，方便后续基于结果填充结局文案 */}
        <section className="ending-card">
          <h2>Per-character recap</h2>
          <ul className="ending-recap">
            {characters.map((c) => {
              const row = result?.perCharacter.find((r) => r.characterId === c.id);
              return (
                <li key={c.id}>
                  <span className="ending-recap__name">{c.name}</span>
                  <span className="muted">
                    {row ? `Match ${row.hits} / ${row.total}` : '—'}
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
