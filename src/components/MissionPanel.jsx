import { useGame } from '../context/GameContext.jsx';
import { PLAYLIST_SIZE } from '../constants.js';
import closeImg from '../assets/ui/close.png';

export function MissionPanel() {
  const { state, dispatch, characters } = useGame();
  if (!state.missionOpen) return null;

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onClick={() => dispatch({ type: 'CLOSE_MISSION' })}
    >
      <div
        className="modal sheet mission-sheet"
        role="dialog"
        aria-labelledby="mission-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close-btn"
          onClick={() => dispatch({ type: 'CLOSE_MISSION' })}
          aria-label="Close"
        >
          <img src={closeImg} alt="" width={72} height={72} decoding="async" />
        </button>

        <h2 id="mission-title" className="modal-title">
          Progress
        </h2>
        <ul className="progress-list">
          {characters.map((c) => {
            const n = (state.selections[c.id] ?? []).length;
            const saved = !!state.saved[c.id];
            let label = 'Not started';
            if (saved) label = 'Saved';
            else if (n > 0) label = `${n}/${PLAYLIST_SIZE} selected`;
            const isCurrent = c.id === state.currentCharacterId;
            return (
              <li key={c.id} className={isCurrent ? 'is-current' : undefined}>
                <strong>{c.name}</strong>
                <span className="muted">{label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
