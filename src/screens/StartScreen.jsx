import { useGame } from '../context/GameContext.jsx';
import openingBg from '../assets/screens/opening-interface.png';
import titleImg from '../assets/ui/title.png';
import startBtnImg from '../assets/ui/start-btn.png';
import starImg from '../assets/ui/Star.png';
import noteImg from '../assets/ui/音符.png';
import note2Img from '../assets/ui/音符2.png';
import flashImg from '../assets/ui/flash.png';

export function StartScreen() {
  const { navigate } = useGame();
  return (
    <div className="screen screen-start">
      <h1 className="sr-only">Playlist as Persona · BurrowBeats</h1>
      <div
        className="start-hero"
        style={{ backgroundImage: `url(${openingBg})` }}
        role="presentation"
      />
      <div className="start-title-wrap" aria-hidden>
        <img src={titleImg} alt="" className="start-title-img" decoding="async" />
      </div>
      <div className="start-deco" aria-hidden>
        <img src={starImg} alt="" className="start-deco__img start-deco__img--star" />
        <img src={noteImg} alt="" className="start-deco__img start-deco__img--n1" />
        <img src={note2Img} alt="" className="start-deco__img start-deco__img--n2" />
        <img src={flashImg} alt="" className="start-deco__img start-deco__img--flash" />
      </div>
      <div className="start-actions">
        <button
          type="button"
          className="btn-start-overlay"
          onClick={() => navigate('intro')}
          aria-label="Start game"
        >
          <img src={startBtnImg} alt="" width={280} height={80} decoding="async" />
        </button>
      </div>
    </div>
  );
}
