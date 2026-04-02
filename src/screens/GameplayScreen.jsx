import { useGame } from '../context/GameContext.jsx';
import noteImg from '../assets/ui/音符.png';
import note2Img from '../assets/ui/音符2.png';
import nextImg from '../assets/ui/next.png';
import backImg from '../assets/ui/back.png';
import taskBtnImg from '../assets/ui/task-btn.png';
import helpBtnImg from '../assets/ui/help-btn.png';
import { Toast } from '../components/Toast.jsx';
import { MissionPanel } from '../components/MissionPanel.jsx';
import { HelpPanel } from '../components/HelpPanel.jsx';
import { SongDetailModal } from '../components/SongDetailModal.jsx';

function songById(character, id) {
  return character.listeningHistory.find((s) => s.id === id);
}

export function GameplayScreen() {
  const { state, dispatch, characters, currentCharacter, selectedIds, playlistSize } = useGame();
  if (!currentCharacter) return null;

  const inStory = state.storyMode;
  const tornProfile = !!currentCharacter.profilePanelBg;

  return (
    <div className="screen screen-gameplay">
      <Toast />
      <MissionPanel />
      <HelpPanel />
      <SongDetailModal />

      <header className="game-header">
        <button
          type="button"
          className="btn-icon btn-icon--asset"
          aria-label="Mission list"
          onClick={() => dispatch({ type: 'OPEN_MISSION' })}
        >
          <img src={taskBtnImg} alt="" width={48} height={48} decoding="async" />
        </button>
        <div className="game-title-wrap">
          <img src={note2Img} alt="" className="game-deco game-deco--l" width={32} height={32} />
          <h1 className="game-title">BurrowBeats</h1>
          <img src={noteImg} alt="" className="game-deco game-deco--r" width={32} height={32} />
        </div>
        <button
          type="button"
          className="btn-icon btn-icon--asset"
          aria-label="How to play"
          onClick={() => dispatch({ type: 'OPEN_HELP' })}
        >
          <img src={helpBtnImg} alt="" width={48} height={48} decoding="async" />
        </button>
      </header>

      <div className="game-columns">
        <aside className="char-rail" aria-label="Switch character">
          {characters.map((c) => {
            const active = c.id === state.currentCharacterId;
            const saved = !!state.saved[c.id];
            return (
              <button
                key={c.id}
                type="button"
                className={`char-tab ${active ? 'active' : ''}`}
                onClick={() => dispatch({ type: 'SET_CHARACTER', id: c.id })}
                title={c.name}
              >
                <span className="char-avatar">
                  {c.avatar ? <img src={c.avatar} alt="" /> : c.name.slice(0, 1)}
                </span>
                {saved ? <span className="char-saved" aria-hidden>✓</span> : null}
              </button>
            );
          })}
        </aside>
        <main
          className={`panel panel-profile${tornProfile ? ' panel-profile--torn' : ''}`}
          style={
            tornProfile
              ? { backgroundImage: `url(${currentCharacter.profilePanelBg})` }
              : undefined
          }
        >
          <div className="panel-tab">{currentCharacter.name}&apos;s Profile</div>
          {!inStory ? (
            <>
              <button
                type="button"
                className="link-learn"
                onClick={() => dispatch({ type: 'SET_STORY', value: true })}
                aria-label="Learn more — objects and stories"
              >
                <span className="link-learn__text">learn more</span>
                <img
                  src={nextImg}
                  alt=""
                  className="link-learn__img"
                  width={80}
                  height={80}
                  decoding="async"
                />
              </button>
              <div className="profile-layout">
                <div className="profile-art">
                  {currentCharacter.profileImage ? (
                    <img src={currentCharacter.profileImage} alt="" />
                  ) : (
                    <span className="art-placeholder">Art placeholder</span>
                  )}
                </div>
                <div className="profile-main-col">
                  <div className="profile-fields">
                    <p>
                      <span className="label">Name</span> {currentCharacter.name}
                    </p>
                    <p>
                      <span className="label">Profession</span> {currentCharacter.profession}
                    </p>
                    <p>
                      <span className="label">MBTI</span> {currentCharacter.mbti}
                    </p>
                    {currentCharacter.tagline ? (
                      <p className="tagline">{currentCharacter.tagline}</p>
                    ) : null}
                  </div>
                  <section className="public-pl">
                    <h2 className="subheading">Public Playlist</h2>
                    <ul className="slots">
                      {Array.from({ length: playlistSize }).map((_, i) => {
                        const id = selectedIds[i];
                        const song = id ? songById(currentCharacter, id) : null;
                        return (
                          <li key={i} className="slot">
                            {song ? (
                              <button
                                type="button"
                                className="slot-fill"
                                onClick={() =>
                                  dispatch({
                                    type: 'TOGGLE_SONG',
                                    characterId: currentCharacter.id,
                                    songId: id,
                                  })
                                }
                              >
                                {song.title}
                              </button>
                            ) : (
                              <span className="slot-empty">Empty slot</span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                </div>
              </div>
            </>
          ) : (
            <div className="story-mode">
              <button
                type="button"
                className="btn-back"
                onClick={() => dispatch({ type: 'SET_STORY', value: false })}
                aria-label="Back to profile"
              >
                <img src={backImg} alt="" width={80} height={80} decoding="async" />
              </button>
              <h2 className="subheading">Objects &amp; stories</h2>
              <ul className="story-grid">
                {(currentCharacter.stories?.length ? currentCharacter.stories : []).map((s) => (
                  <li key={s.id} className="story-card">
                    <span className="story-obj">{s.object}</span>
                    <p>{s.text}</p>
                  </li>
                ))}
              </ul>
              {(!currentCharacter.stories || currentCharacter.stories.length === 0) && (
                <p className="muted">(Add stories in the stories array in characters.json.)</p>
              )}
            </div>
          )}
        </main>
        <section
          className="panel panel-history"
          aria-labelledby="listening-history-heading"
        >
          <h2 id="listening-history-heading" className="panel-history-heading">
            Listening History
          </h2>
          <ul className="history-list">
            {currentCharacter.listeningHistory.map((song) => {
              const on = selectedIds.includes(song.id);
              return (
                <li key={song.id}>
                  <button
                    type="button"
                    className={`history-row ${on ? 'selected' : ''}`}
                    onClick={() =>
                      dispatch({
                        type: 'TOGGLE_SONG',
                        characterId: currentCharacter.id,
                        songId: song.id,
                      })
                    }
                  >
                    <span className="time">{song.time}</span>
                    <span className="dash">—</span>
                    <span className="song-name">{song.title}</span>
                  </button>
                  <button
                    type="button"
                    className="btn-detail"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch({
                        type: 'SET_SONG_DETAIL',
                        songId: song.id,
                        characterId: currentCharacter.id,
                      });
                    }}
                  >
                    Details
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <footer className="game-footer">
        <button
          type="button"
          className="btn btn-save"
          onClick={() => dispatch({ type: 'SAVE_CHARACTER' })}
        >
          Save
        </button>
        <button type="button" className="btn btn-done" onClick={() => dispatch({ type: 'SUBMIT' })}>
          Done
        </button>
      </footer>
    </div>
  );
}
