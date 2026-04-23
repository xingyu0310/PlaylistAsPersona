import { useGame } from '../context/GameContext.jsx';
import { PLAYLIST_SIZE } from '../constants.js';
import closeImg from '../assets/ui/close.png';

export function MissionPanel() {
  const { state, dispatch, characters, t } = useGame();
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
          aria-label={t('ui.close')}
        >
          <img src={closeImg} alt="" width={72} height={72} decoding="async" />
        </button>

        <h2 id="mission-title" className="modal-title">
          {t('mission.title')}
        </h2>
        <ul className="progress-list">
          {characters.map((c) => {
            const n = (state.selections[c.id] ?? []).length;
            const saved = !!state.saved[c.id];
            let label = t('mission.notStarted');
            if (saved) label = t('mission.saved');
            else if (n > 0)
              label = t('mission.selected', { n, total: PLAYLIST_SIZE });
            const isCurrent = c.id === state.currentCharacterId;
            return (
              <li key={c.id} className={isCurrent ? 'is-current' : undefined}>
                <strong className="lang-en-inline">{c.name}</strong>
                <span className="muted">{label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
