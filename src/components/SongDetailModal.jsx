import { useCallback, useEffect, useRef, useState } from 'react';
import { useGame } from '../context/GameContext.jsx';
import closeImg from '../assets/ui/close.png';
import playBtnImg from '../assets/ui/play-btn.png';
import onBtnImg from '../assets/ui/on-btn.png';
import { SONG_DETAIL_ART_BY_ID } from '../utils/songDetailArt.js';
import { SONG_PREVIEW_AUDIO_BY_ID } from '../utils/songPreviewAudio.js';

const PREVIEW_MAX_SECONDS = 15;

export function SongDetailModal() {
  const { state, dispatch, characters, t, pick } = useGame();
  const { songDetailId, songDetailCharacterId } = state;
  const audioRef = useRef(null);
  const [previewPlaying, setPreviewPlaying] = useState(false);

  const stopPreview = useCallback(() => {
    const a = audioRef.current;
    if (a) {
      a.pause();
      a.removeAttribute('src');
      a.load();
      audioRef.current = null;
    }
    setPreviewPlaying(false);
  }, []);

  useEffect(() => {
    return () => stopPreview();
  }, [songDetailId, songDetailCharacterId, stopPreview]);

  if (!songDetailId || !songDetailCharacterId) return null;

  const ch = characters.find((c) => c.id === songDetailCharacterId);
  const song = ch?.listeningHistory.find((s) => s.id === songDetailId);
  if (!song) return null;

  const previewUrl = SONG_PREVIEW_AUDIO_BY_ID[song.id];

  const close = () => {
    stopPreview();
    dispatch({ type: 'SET_SONG_DETAIL', songId: null, characterId: null });
  };

  const togglePreview = () => {
    if (!previewUrl) return;

    let a = audioRef.current;
    if (a && !a.paused) {
      a.pause();
      setPreviewPlaying(false);
      return;
    }
    if (a && a.paused) {
      a.play()
        .then(() => setPreviewPlaying(true))
        .catch(() => setPreviewPlaying(false));
      return;
    }

    a = new Audio(previewUrl);
    audioRef.current = a;

    const onTimeUpdate = () => {
      if (a.currentTime >= PREVIEW_MAX_SECONDS) {
        a.pause();
        a.currentTime = 0;
        setPreviewPlaying(false);
      }
    };

    const onEnded = () => setPreviewPlaying(false);

    a.addEventListener('timeupdate', onTimeUpdate);
    a.addEventListener('ended', onEnded);

    a.play()
      .then(() => setPreviewPlaying(true))
      .catch(() => setPreviewPlaying(false));
  };

  const detailArt = SONG_DETAIL_ART_BY_ID[song.id];

  return (
    <div className="modal-backdrop" role="presentation" onClick={close}>
      <div
        className={`modal song-detail${detailArt ? ' song-detail--art' : ''}`}
        role="dialog"
        aria-label={song.title}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="song-detail-actions">
          <button
            type="button"
            className={`modal-play-btn${previewPlaying ? ' is-playing' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              togglePreview();
            }}
            disabled={!previewUrl}
            title={previewUrl ? undefined : t('song.preview.unavailable')}
            aria-label={
              previewPlaying
                ? t('song.preview.pause.aria')
                : t('song.preview.play.aria')
            }
            aria-pressed={previewPlaying}
          >
            <img
              src={previewPlaying ? onBtnImg : playBtnImg}
              alt=""
              width={72}
              height={72}
              decoding="async"
            />
          </button>
          <button
            type="button"
            className="modal-close-btn"
            onClick={close}
            aria-label={t('ui.close')}
          >
            <img src={closeImg} alt="" width={72} height={72} decoding="async" />
          </button>
        </div>
        {detailArt ? (
          <img
            className="song-detail-art"
            src={detailArt}
            alt={t('song.detailAlt', { title: song.title })}
            decoding="async"
          />
        ) : (
          <>
            {song.playCount != null && (
              <p className="play-count">
                {t('song.playCountLine.a')}
                <strong>{song.playCount}</strong>
                {t('song.playCountLine.b')}
              </p>
            )}
            <div className="song-detail-top">
              <div className="album-placeholder" aria-hidden>
                {song.albumArt ? (
                  <img src={song.albumArt} alt="" />
                ) : (
                  <span>{t('song.coverPlaceholder')}</span>
                )}
              </div>
              <div>
                <h3 className="song-title lang-en-inline">{song.title}</h3>
                {(song.artist || song.artistHandle) && (
                  <p className="artist-line">
                    <span className="lang-en-inline">{t('song.artist')}</span>{' '}
                    <span className="handle lang-en-inline">
                      {song.artistHandle || `@${song.artist}`}
                    </span>
                  </p>
                )}
              </div>
            </div>
            {song.tags?.length ? (
              <div className="tags lang-en-inline">
                {song.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
            {pick(song.description) ? (
              <>
                <h4 className="detail-heading">{t('song.description')}</h4>
                <p className="detail-body">{pick(song.description)}</p>
              </>
            ) : null}
            {song.genre ? (
              <>
                <h4 className="detail-heading">{t('song.genre')}</h4>
                <p className="detail-body lang-en-inline">{song.genre}</p>
              </>
            ) : null}
            {song.lyricsFragment ? (
              <>
                <h4 className="detail-heading">{t('song.lyrics')}</h4>
                <blockquote className="lyrics lang-en-inline">
                  {song.lyricsFragment}
                </blockquote>
              </>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
