import { useGame } from '../context/GameContext.jsx';
import { PLAYLIST_SIZE } from '../constants.js';
import closeImg from '../assets/close.png';

export function HelpPanel() {
  const { state, dispatch } = useGame();
  if (!state.helpOpen) return null;

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onClick={() => dispatch({ type: 'CLOSE_HELP' })}
    >
      <div
        className="modal sheet"
        role="dialog"
        aria-labelledby="help-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close-btn"
          onClick={() => dispatch({ type: 'CLOSE_HELP' })}
          aria-label="Close"
        >
          <img src={closeImg} alt="" width={72} height={72} decoding="async" />
        </button>
        <h2 id="help-title" className="modal-title">
          How to play
        </h2>
        <ol className="modal-list ordered">
          <li>Use the left rail to switch characters.</li>
          <li>Center: profile; tap &quot;learn more&quot; for objects &amp; stories.</li>
          <li>
            Right: Listening History — tap a row to add/remove it from the Public Playlist (up to{' '}
            {PLAYLIST_SIZE} tracks).
          </li>
          <li>Tap &quot;Details&quot; beside a song for extra info when available.</li>
          <li>When full, Save; after every character is saved, tap Done.</li>
        </ol>
      </div>
    </div>
  );
}
