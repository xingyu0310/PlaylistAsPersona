import { useGame } from '../context/GameContext.jsx';
import { PLAYLIST_SIZE } from '../constants.js';
import closeImg from '../assets/ui/close.png';

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
        className="modal sheet help-sheet"
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
          <li>
            Use the <span className="kw">left rail</span> to switch characters.
          </li>
          <li>
            <span className="kw">Hover</span> the character portrait to read their assignment.
          </li>
          <li>
            Center: <span className="kw">profile</span>; tap{' '}
            <span className="kw">&quot;learn more&quot;</span> for objects &amp; stories.
          </li>
          <li>
            Right: <span className="kw">Listening History</span> — tap a row to add/remove it from
            the <span className="kw">Public Playlist</span> (up to {PLAYLIST_SIZE} tracks).
          </li>
          <li>
            Tap <span className="kw">&quot;Details&quot;</span> beside a song for extra info when
            available.
          </li>
          <li>
            When full, <span className="kw">Save</span>; after every character is saved, tap{' '}
            <span className="kw">Done</span>.
          </li>
        </ol>
      </div>
    </div>
  );
}
