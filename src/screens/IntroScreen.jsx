import { useGame } from '../context/GameContext.jsx';
import starImg from '../assets/ui/Star.png';
import noteImg from '../assets/ui/音符.png';
import note2Img from '../assets/ui/音符2.png';
import flashImg from '../assets/ui/flash.png';
import lineImg from '../assets/ui/Line.png';
import continueBtnImg from '../assets/ui/continue-btn.png';
import detectiveImg from '../assets/characters/detective.png';
import LanguageToggle from '../components/LanguageToggle.jsx';

export function IntroScreen() {
  const { navigate, t } = useGame();
  return (
    <div className="screen screen-intro">
      <LanguageToggle className="lang-toggle--floating" />
      <div className="intro-inner">
        <h1 className="intro-header">
          <span className="intro-deco intro-deco--left" aria-hidden>
            <span className="intro-deco-note-stack">
              <img src={starImg} alt="" className="intro-deco__img intro-deco__star-top" />
              <img src={noteImg} alt="" className="intro-deco__img intro-deco__img--delay" />
            </span>
          </span>
          <span className="intro-welcome">{t('intro.welcome')}</span>
          <span className="intro-title-stack">
            <span className="title-intro title-intro__burrow">BurrowBeats!!</span>
            <img src={lineImg} alt="" className="intro-line-img" decoding="async" />
            <span className="subtitle-intro muted">{t('intro.subtitle')}</span>
          </span>
          <span className="intro-deco intro-deco--right" aria-hidden>
            <img src={flashImg} alt="" className="intro-deco__img" />
            <img src={note2Img} alt="" className="intro-deco__img intro-deco__img--delay" />
          </span>
        </h1>
        <div className="intro-body intro-body--with-mascot">
          <img
            src={detectiveImg}
            alt=""
            className="intro-mascot"
            decoding="async"
            aria-hidden
          />
          <div className="intro-body__text">
            <p>
              {t('intro.body.p1a')}
              <br />
              {t('intro.body.p1b')}
            </p>
            <p>
              {t('intro.body.p2a')}
              <strong className="hl lang-en-inline">{t('intro.body.role')}</strong>
              {t('intro.body.p2b')}
              <br />
              {t('intro.body.p3a')}
              <br />
              {t('intro.body.p3b')}
              <br />
              {t('intro.body.p3c')}
            </p>
          </div>
        </div>
      </div>
      <div className="intro-actions">
        <button
          type="button"
          className="btn-continue-img"
          onClick={() => navigate('tutorial')}
          aria-label={t('intro.cta.continue')}
        >
          <img src={continueBtnImg} alt="" width={280} height={88} decoding="async" />
        </button>
      </div>
    </div>
  );
}
