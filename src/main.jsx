import React from 'react';
import ReactDOM from 'react-dom/client';
import { GameProvider } from './context/GameContext.jsx';
import App from './App.jsx';
import { attachGlobalClickSound } from './utils/clickSound.js';
import './index.css';

attachGlobalClickSound();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
  </React.StrictMode>
);
