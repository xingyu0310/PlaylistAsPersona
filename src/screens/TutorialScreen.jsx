import { useGame } from '../context/GameContext.jsx';
import { PLAYLIST_SIZE } from '../constants.js';
import noteImg from '../assets/ui/音符.png';

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
          <li>
            <span className="kw">Left rail</span>: switch between the three characters — each has
            its own <span className="kw">assignment</span>.
          </li>
          <li>
            <span className="kw">Hover</span> (or focus) the character portrait to read their
            assignment.
          </li>
          <li>
            Center: <span className="kw">profile</span>; tap{' '}
            <span className="kw">&quot;learn more&quot;</span> for objects &amp; stories.
          </li>
          <li>
            Right: <span className="kw">Listening History</span> — tap songs to add/remove from the{' '}
            <span className="kw">Public Playlist</span> (up to {PLAYLIST_SIZE}).
          </li>
          <li>
            Tap <span className="kw">&quot;Details&quot;</span> beside a song for extra info when
            available.
          </li>
          <li>
            After {PLAYLIST_SIZE} picks, press <span className="kw">Save</span> to see that
            character&apos;s <span className="kw">ending</span>.
          </li>
          <li>
            When all three are saved, press <span className="kw">Done</span> for your{' '}
            <span className="kw">final ending</span>.
          </li>
          <li>
            Top-left <span className="kw">&quot;!&quot;</span> opens your progress · top-right{' '}
            <span className="kw">&quot;?&quot;</span> reopens this guide.
          </li>
        </ol>
        <button type="button" className="btn btn-primary" onClick={() => navigate('gameplay')}>
          Play
        </button>
      </div>
    </div>
  );
}
