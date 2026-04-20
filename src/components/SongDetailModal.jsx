import { useCallback, useEffect, useRef, useState } from 'react';
import { useGame } from '../context/GameContext.jsx';
import closeImg from '../assets/ui/close.png';
import playBtnImg from '../assets/ui/play-btn.png';
import onBtnImg from '../assets/ui/on-btn.png';
import { SONG_DETAIL_ART_BY_ID } from '../utils/songDetailArt.js';
import { SONG_PREVIEW_AUDIO_BY_ID } from '../utils/songPreviewAudio.js';

const PREVIEW_MAX_SECONDS = 15;

export function SongDetailModal() {
  const { state, dispatch, characters } = useGame();
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
            title={previewUrl ? undefined : 'Preview audio not added yet'}
            aria-label={previewPlaying ? 'Pause preview' : 'Play preview'}
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
          <button type="button" className="modal-close-btn" onClick={close} aria-label="Close">
            <img src={closeImg} alt="" width={72} height={72} decoding="async" />
          </button>
        </div>
        {detailArt ? (
          <img
            className="song-detail-art"
            src={detailArt}
            alt={`${song.title} — detail`}
            decoding="async"
          />
        ) : (
          <>
            {song.playCount != null && (
              <p className="play-count">
                Played <strong>{song.playCount}</strong> times
              </p>
            )}
            <div className="song-detail-top">
              <div className="album-placeholder" aria-hidden>
                {song.albumArt ? (
                  <img src={song.albumArt} alt="" />
                ) : (
                  <span>Cover placeholder</span>
                )}
              </div>
              <div>
                <h3 className="song-title">{song.title}</h3>
                {(song.artist || song.artistHandle) && (
                  <p className="artist-line">
                    Artist{' '}
                    <span className="handle">
                      {song.artistHandle || `@${song.artist}`}
                    </span>
                  </p>
                )}
              </div>
            </div>
            {song.tags?.length ? (
              <div className="tags">
                {song.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
            {song.description ? (
              <>
                <h4 className="detail-heading">Description</h4>
                <p className="detail-body">{song.description}</p>
              </>
            ) : null}
            {song.genre ? (
              <>
                <h4 className="detail-heading">Genre</h4>
                <p className="detail-body">{song.genre}</p>
              </>
            ) : null}
            {song.lyricsFragment ? (
              <>
                <h4 className="detail-heading">Lyrics fragment</h4>
                <blockquote className="lyrics">{song.lyricsFragment}</blockquote>
              </>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
