import { useGame } from '../context/GameContext.jsx';
import { PLAYLIST_SIZE } from '../constants.js';
import noteImg from '../assets/音符.png';

export function TutorialScreen() {
  const { navigate } = useGame();
  return (
    <div className="screen screen-tutorial">
      <div className="tutorial-inner">
        <h1 className="title-lg title-lg--with-deco">
          <img src={noteImg} alt="" className="tutorial-title-deco" width={36} height={36} />
          How to play
        </h1>
        <ol className="tutorial-steps">
          <li>Left: switch between the three characters.</li>
          <li>Center: profile; &quot;learn more&quot; opens objects &amp; stories.</li>
          <li>
            Right: Listening History — tap songs to add/remove from the Public Playlist (tap again to
            remove).
          </li>
          <li>After {PLAYLIST_SIZE} picks per character, press Save.</li>
          <li>When all three are saved, press Done to see results.</li>
          <li>Top-left &quot;!&quot; opens the task list · top-right &quot;?&quot; reopens this guide.</li>
        </ol>
        <button type="button" className="btn btn-primary" onClick={() => navigate('gameplay')}>
          Play
        </button>
      </div>
    </div>
  );
}
