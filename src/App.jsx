import { useGame } from './context/GameContext.jsx';
import { StartScreen } from './screens/StartScreen.jsx';
import { IntroScreen } from './screens/IntroScreen.jsx';
import { TutorialScreen } from './screens/TutorialScreen.jsx';
import { GameplayScreen } from './screens/GameplayScreen.jsx';
import { ResultScreen } from './screens/ResultScreen.jsx';

export default function App() {
  const { state } = useGame();

  switch (state.page) {
    case 'start':
      return <StartScreen />;
    case 'intro':
      return <IntroScreen />;
    case 'tutorial':
      return <TutorialScreen />;
    case 'gameplay':
      return <GameplayScreen />;
    case 'result':
      return <ResultScreen />;
    default:
      return <StartScreen />;
  }
}
