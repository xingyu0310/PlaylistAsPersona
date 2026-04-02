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
        className="modal sheet"
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
          Your task
        </h2>
        <ul className="modal-list">
          <li>Browse each character&apos;s profile.</li>
          <li>Read their object stories.</li>
          <li>Check Listening History.</li>
          <li>Pick {PLAYLIST_SIZE} songs per character for the Public Playlist.</li>
          <li>Save every character, then tap Done to submit.</li>
        </ul>
        <h3 className="modal-sub">Progress</h3>
        <ul className="progress-list">
          {characters.map((c) => {
            const n = (state.selections[c.id] ?? []).length;
            const saved = !!state.saved[c.id];
            let label = 'Not started';
            if (saved) label = 'Saved';
            else if (n > 0) label = `${n}/${PLAYLIST_SIZE} selected`;
            return (
              <li key={c.id}>
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
