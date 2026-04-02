import { useGame } from '../context/GameContext.jsx';
import starImg from '../assets/ui/Star.png';
import noteImg from '../assets/ui/音符.png';
import note2Img from '../assets/ui/音符2.png';
import flashImg from '../assets/ui/flash.png';
import lineImg from '../assets/ui/Line.png';
import continueBtnImg from '../assets/ui/continue-btn.png';

export function IntroScreen() {
  const { navigate } = useGame();
  return (
    <div className="screen screen-intro">
      <div className="intro-inner">
        <h1 className="intro-header">
          <span className="intro-deco intro-deco--left" aria-hidden>
            <span className="intro-deco-note-stack">
              <img src={starImg} alt="" className="intro-deco__img intro-deco__star-top" />
              <img src={noteImg} alt="" className="intro-deco__img intro-deco__img--delay" />
            </span>
          </span>
          <span className="intro-welcome">Welcome to</span>
          <span className="intro-title-stack">
            <span className="title-intro title-intro__burrow">BurrowBeats!!</span>
            <img src={lineImg} alt="" className="intro-line-img" decoding="async" />
            <span className="subtitle-intro muted">A music social platform</span>
          </span>
          <span className="intro-deco intro-deco--right" aria-hidden>
            <img src={flashImg} alt="" className="intro-deco__img" />
            <img src={note2Img} alt="" className="intro-deco__img intro-deco__img--delay" />
          </span>
        </h1>
        <div className="intro-body">
          <p>
            On BurrowBeats, playlists are more than music.
            <br />
            They are how animals present themselves to the world.
          </p>
          <p>
            Some animals know exactly what image they want to show.
            <br />
            Others need help curating their <strong className="hl">public playlist</strong>.
          </p>
          <p>
            As a <strong className="hl">Playlist Stylist</strong>, your job is to help them choose
            <br />
            the songs they want others to see.
          </p>
        </div>
      </div>
      <div className="intro-actions">
        <button
          type="button"
          className="btn-continue-img"
          onClick={() => navigate('tutorial')}
          aria-label="Continue"
        >
          <img src={continueBtnImg} alt="" width={280} height={88} decoding="async" />
        </button>
      </div>
    </div>
  );
}
