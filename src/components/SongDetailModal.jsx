import { useGame } from '../context/GameContext.jsx';
import closeImg from '../assets/ui/close.png';
import { SONG_DETAIL_ART_BY_ID } from '../utils/songDetailArt.js';

export function SongDetailModal() {
  const { state, dispatch, characters } = useGame();
  const { songDetailId, songDetailCharacterId } = state;
  if (!songDetailId || !songDetailCharacterId) return null;

  const ch = characters.find((c) => c.id === songDetailCharacterId);
  const song = ch?.listeningHistory.find((s) => s.id === songDetailId);
  if (!song) return null;

  const close = () =>
    dispatch({ type: 'SET_SONG_DETAIL', songId: null, characterId: null });

  const detailArt = SONG_DETAIL_ART_BY_ID[song.id];

  return (
    <div className="modal-backdrop" role="presentation" onClick={close}>
      <div
        className={`modal song-detail${detailArt ? ' song-detail--art' : ''}`}
        role="dialog"
        aria-label={song.title}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal-close-btn" onClick={close} aria-label="Close">
          <img src={closeImg} alt="" width={72} height={72} decoding="async" />
        </button>
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
