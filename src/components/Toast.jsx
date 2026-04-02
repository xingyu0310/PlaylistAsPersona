import { useGame } from '../context/GameContext.jsx';

export function Toast() {
  const { state } = useGame();
  if (!state.toast) return null;
  return (
    <div className="toast" role="status">
      {state.toast}
    </div>
  );
}
