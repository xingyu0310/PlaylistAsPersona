import { useGame } from '../context/GameContext.jsx';

export function Toast() {
  const { state, t } = useGame();
  if (!state.toast) return null;
  const msg =
    typeof state.toast === 'string'
      ? state.toast
      : t(state.toast.key, state.toast.vars);
  return (
    <div className="toast" role="status">
      {msg}
    </div>
  );
}
