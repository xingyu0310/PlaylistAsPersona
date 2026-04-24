import { useEffect, useMemo, useState } from 'react';
import { useGame } from '../context/GameContext.jsx';
import noteImg from '../assets/ui/音符.png';
import note2Img from '../assets/ui/音符2.png';
import nextImg from '../assets/ui/next.png';
import backImg from '../assets/ui/back.png';
import taskBtnImg from '../assets/ui/task-btn.png';
import helpBtnImg from '../assets/ui/help-btn.png';
import saveBtnImg from '../assets/ui/save-btn.png';
import doneBtnImg from '../assets/ui/done-btn.png';
import { Toast } from '../components/Toast.jsx';
import { MissionPanel } from '../components/MissionPanel.jsx';
import { HelpPanel } from '../components/HelpPanel.jsx';
import { SongDetailModal } from '../components/SongDetailModal.jsx';
import LanguageToggle from '../components/LanguageToggle.jsx';
import BgmToggle from '../components/BgmToggle.jsx';
import { STORY_OBJECT_BY_CHARACTER } from '../utils/storyObjects.js';
import { DIALOGUE_BOX_BG, PLAYER_DIALOGUE_CHAR } from '../utils/loadCharacters.js';

function songById(character, id) {
  return character.listeningHistory.find((s) => s.id === id);
}

export function GameplayScreen() {
  const {
    state,
    dispatch,
    characters,
    currentCharacter,
    selectedIds,
    playlistSize,
    t,
    pick,
  } = useGame();
  const [assignmentOpen, setAssignmentOpen] = useState(false);
  const [dialogueStep, setDialogueStep] = useState(0);

  const dialogueSteps = useMemo(() => {
    if (!currentCharacter?.assignment) return [];
    const custom = currentCharacter.assignmentDialogue;
    if (Array.isArray(custom) && custom.length) {
      return custom
        .map((s) => ({ speaker: s.speaker || 'self', text: pick(s.text) }))
        .filter((s) => s.text);
    }
    const body = pick(currentCharacter.assignment.body);
    const paragraphs = Array.isArray(body) ? body : body ? [body] : [];
    const steps = paragraphs
      .filter(Boolean)
      .map((text) => ({ speaker: 'self', text }));
    steps.push({ speaker: 'player', text: t('dialogue.playerFallback') });
    return steps;
  }, [currentCharacter, pick, t]);

  const openAssignment = () => {
    setDialogueStep(0);
    setAssignmentOpen(true);
  };
  const closeAssignment = () => setAssignmentOpen(false);
  const advanceDialogue = () => {
    setDialogueStep((i) => {
      if (i >= dialogueSteps.length - 1) {
        setAssignmentOpen(false);
        return 0;
      }
      return i + 1;
    });
  };

  useEffect(() => {
    if (!assignmentOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        closeAssignment();
      } else if (
        e.key === 'Enter' ||
        e.key === ' ' ||
        e.key === 'ArrowRight'
      ) {
        const target = e.target;
        if (target instanceof Element && target.closest('button')) return;
        e.preventDefault();
        advanceDialogue();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignmentOpen, dialogueSteps.length]);

  useEffect(() => {
    setAssignmentOpen(false);
    setDialogueStep(0);
  }, [state.currentCharacterId, state.storyMode]);

  if (!currentCharacter) return null;

  const inStory = state.storyMode;
  const tornProfile = !!currentCharacter.profilePanelBg;
  const tagline = currentCharacter.tagline ? pick(currentCharacter.tagline) : '';

  return (
    <div className="screen screen-gameplay">
      <Toast />
      <MissionPanel />
      <HelpPanel />
      <SongDetailModal />

      {assignmentOpen && currentCharacter.assignment && dialogueSteps.length ? (
        (() => {
          const step = dialogueSteps[Math.min(dialogueStep, dialogueSteps.length - 1)];
          const isPlayer = step.speaker === 'player';
          const speakerName = isPlayer ? t('dialogue.you') : currentCharacter.name;
          const charImg = isPlayer ? PLAYER_DIALOGUE_CHAR : currentCharacter.dialogueChar;
          const speakerKey = isPlayer ? 'player' : currentCharacter.id;
          return (
            <div
              className="dialogue-backdrop"
              role="presentation"
              onClick={closeAssignment}
            >
              <div
                className={`dialogue-wrap dialogue-wrap--${speakerKey}`}
                role="dialog"
                aria-modal="true"
                aria-label={t('gameplay.assignmentModal.aria')}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={DIALOGUE_BOX_BG}
                  alt=""
                  className="dialogue-box-img"
                  decoding="async"
                />
                {charImg ? (
                  <img
                    src={charImg}
                    alt=""
                    className="dialogue-char-img"
                    decoding="async"
                  />
                ) : null}
                <div className="dialogue-text" aria-live="polite">
                  <p className={`dialogue-speaker${isPlayer ? '' : ' lang-en-inline'}`}>
                    {speakerName}:
                  </p>
                  <p className="dialogue-message">
                    {step.text.split('\n').map((line, i, arr) => (
                      <span key={i}>
                        {line}
                        {i < arr.length - 1 ? <br /> : null}
                      </span>
                    ))}
                  </p>
                </div>
                <button
                  type="button"
                  className="dialogue-advance"
                  onClick={advanceDialogue}
                  aria-label={t('dialogue.next.aria')}
                >
                  <img
                    src={nextImg}
                    alt=""
                    decoding="async"
                  />
                </button>
                <div className="dialogue-steps" aria-hidden="true">
                  {dialogueSteps.map((_, i) => (
                    <span
                      key={i}
                      className={`dialogue-step-dot ${i === dialogueStep ? 'is-active' : ''} ${i < dialogueStep ? 'is-done' : ''}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })()
      ) : null}

      <header className="game-header">
        <button
          type="button"
          className="btn-icon btn-icon--asset"
          aria-label={t('gameplay.progress')}
          onClick={() => dispatch({ type: 'OPEN_MISSION' })}
        >
          <img src={taskBtnImg} alt="" width={48} height={48} decoding="async" />
        </button>
        <div className="game-title-wrap">
          <img src={note2Img} alt="" className="game-deco game-deco--l" width={32} height={32} />
          <h1 className="game-title">{t('gameplay.title')}</h1>
          <img src={noteImg} alt="" className="game-deco game-deco--r" width={32} height={32} />
        </div>
        <div className="game-header-right">
          <BgmToggle className="bgm-toggle--inline" />
          <LanguageToggle className="lang-toggle--inline" />
          <button
            type="button"
            className="btn-icon btn-icon--asset"
            aria-label={t('gameplay.howToPlay')}
            onClick={() => dispatch({ type: 'OPEN_HELP' })}
          >
            <img src={helpBtnImg} alt="" width={48} height={48} decoding="async" />
          </button>
        </div>
      </header>

      <div className="game-columns">
        <aside className="char-rail" aria-label={t('gameplay.rail.aria')}>
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
                aria-label={
                  saved
                    ? t('gameplay.charSaved.aria', { name: c.name })
                    : t('gameplay.charTab.aria', { name: c.name })
                }
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
          <div className="panel-tab">
            {t('gameplay.profileTab', { name: currentCharacter.name })}
          </div>
          {!inStory ? (
            <>
              <div className="profile-layout">
                <div className="profile-art-col">
                  <div
                    className="profile-art"
                    aria-label={currentCharacter.name}
                  >
                    {currentCharacter.profileImage ? (
                      <img src={currentCharacter.profileImage} alt="" />
                    ) : (
                      <span className="art-placeholder">
                        {t('gameplay.artPlaceholder')}
                      </span>
                    )}
                  </div>
                </div>
                <div className="profile-main-col">
                  {currentCharacter.assignment ? (
                    <button
                      type="button"
                      className="btn-accept-task"
                      onClick={openAssignment}
                      aria-label={t('gameplay.acceptTask.aria')}
                    >
                      <span className="btn-accept-task__label">
                        {t('gameplay.acceptTask')}
                      </span>
                    </button>
                  ) : null}
                  <div className="profile-fields" data-character-id={currentCharacter.id}>
                    <p>
                      <span className="label">{t('gameplay.fields.name')}</span>{' '}
                      <span className="lang-en-inline">{currentCharacter.name}</span>
                    </p>
                    <p>
                      <span className="label">{t('gameplay.fields.profession')}</span>{' '}
                      <span className="lang-en-inline">{currentCharacter.profession}</span>
                    </p>
                    <p>
                      <span className="label">{t('gameplay.fields.mbti')}</span>{' '}
                      <span className="lang-en-inline">{currentCharacter.mbti}</span>
                    </p>
                    {tagline ? <p className="tagline">{tagline}</p> : null}
                  </div>
                  <button
                    type="button"
                    className="link-learn"
                    onClick={() => dispatch({ type: 'SET_STORY', value: true })}
                    aria-label={t('gameplay.learnMore.aria')}
                  >
                    <span className="link-learn__text">{t('gameplay.learnMore')}</span>
                    <img
                      src={nextImg}
                      alt=""
                      className="link-learn__img"
                      width={80}
                      height={80}
                      decoding="async"
                    />
                  </button>
                  <section className="public-pl">
                    <h2 className="subheading">{t('gameplay.publicPlaylist')}</h2>
                    <ul className="slots">
                      {Array.from({ length: playlistSize }).map((_, i) => {
                        const id = selectedIds[i];
                        const song = id ? songById(currentCharacter, id) : null;
                        return (
                          <li key={i} className="slot">
                            {song ? (
                              <button
                                type="button"
                                className="slot-fill lang-en-inline"
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
                              <span className="slot-empty">{t('gameplay.emptySlot')}</span>
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
                aria-label={t('gameplay.backToProfile.aria')}
              >
                <img src={backImg} alt="" width={80} height={80} decoding="async" />
              </button>
              <h2 className="subheading">{t('gameplay.objectsAndStories')}</h2>
              {(() => {
                const artMap = STORY_OBJECT_BY_CHARACTER[currentCharacter.id];
                const hasArt =
                  artMap &&
                  (currentCharacter.stories || []).some((s) => artMap[s.id]);
                if (hasArt) {
                  return (
                    <ul className={`story-grid story-grid--${currentCharacter.id}`}>
                      {(currentCharacter.stories || []).map((s, i) => {
                        const art = artMap[s.id];
                        const iconRight = i % 2 === 1;
                        const storyText = pick(s.text) || '';
                        return (
                          <li
                            key={s.id}
                            className={`story-row ${iconRight ? 'story-row--icon-right' : 'story-row--icon-left'}`}
                          >
                            {art ? (
                              <img
                                className="story-object-img"
                                src={art}
                                alt=""
                                width={64}
                                height={64}
                                decoding="async"
                              />
                            ) : null}
                            <div className="story-bubble">
                              <p className="story-text">
                                {storyText.split('\n').map((line, j, arr) => (
                                  <span key={j}>
                                    {line}
                                    {j < arr.length - 1 ? <br /> : null}
                                  </span>
                                ))}
                              </p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  );
                }
                return (
                  <ul className="story-grid">
                    {(currentCharacter.stories?.length ? currentCharacter.stories : []).map((s) => (
                      <li key={s.id} className="story-card">
                        <span className="story-obj">{pick(s.object)}</span>
                        <p>{pick(s.text)}</p>
                      </li>
                    ))}
                  </ul>
                );
              })()}
              {(!currentCharacter.stories || currentCharacter.stories.length === 0) && (
                <p className="muted">{t('gameplay.storiesEmptyHint')}</p>
              )}
            </div>
          )}
        </main>
        <section
          className="panel panel-history"
          aria-labelledby="listening-history-heading"
        >
          <h2 id="listening-history-heading" className="panel-history-heading">
            {t('gameplay.listeningHistory')}
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
                    <span className="time lang-en-inline">{song.time}</span>
                    <span className="dash">—</span>
                    <span className="song-name lang-en-inline">{song.title}</span>
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
                    {t('gameplay.details')}
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
          className="btn-icon btn-icon--asset"
          aria-label={t('gameplay.save.aria')}
          onClick={() => dispatch({ type: 'SAVE_CHARACTER' })}
        >
          <img src={saveBtnImg} alt="" width={48} height={48} decoding="async" />
        </button>
        <button
          type="button"
          className="btn-icon btn-icon--asset"
          aria-label={t('gameplay.done.aria')}
          onClick={() => dispatch({ type: 'SUBMIT' })}
        >
          <img src={doneBtnImg} alt="" width={48} height={48} decoding="async" />
        </button>
      </footer>
    </div>
  );
}
