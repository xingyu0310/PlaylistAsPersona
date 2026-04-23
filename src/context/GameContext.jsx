import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useEffect,
} from 'react';
import { loadCharacters } from '../utils/loadCharacters.js';
import { computeResult } from '../utils/computeResult.js';
import { PLAYLIST_SIZE } from '../constants.js';
import {
  translate,
  pickLocalized,
  SUPPORTED_LANGUAGES,
} from '../i18n/strings.js';

const LANG_STORAGE_KEY = 'bb.lang';

function detectInitialLanguage() {
  if (typeof window === 'undefined') return 'en';
  try {
    const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (saved && SUPPORTED_LANGUAGES.includes(saved)) return saved;
  } catch (_) {
    /* ignore */
  }
  const nav = (window.navigator?.language || '').toLowerCase();
  if (nav.startsWith('zh')) return 'zh';
  return 'en';
}

const GameContext = createContext(null);

const CHARACTERS = loadCharacters();
const FIRST_ID = CHARACTERS[0]?.id ?? null;

const initialState = {
  page: 'start',
  currentCharacterId: FIRST_ID,
  storyMode: false,
  selections: {},
  saved: {},
  missionOpen: false,
  helpOpen: false,
  songDetailId: null,
  songDetailCharacterId: null,
  result: null,
  endingCharacterId: null,
  toast: null,
  language: 'en',
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'NAVIGATE':
      return { ...state, page: action.page, ...(action.extra ?? {}) };
    case 'SET_CHARACTER':
      return {
        ...state,
        currentCharacterId: action.id,
        storyMode: false,
        songDetailId: null,
        songDetailCharacterId: null,
      };
    case 'TOGGLE_STORY':
      return { ...state, storyMode: !state.storyMode };
    case 'SET_STORY':
      return { ...state, storyMode: action.value };
    case 'TOGGLE_SONG': {
      const { characterId, songId } = action;
      const cur = state.selections[characterId] ?? [];
      const idx = cur.indexOf(songId);
      let nextList;
      if (idx >= 0) {
        nextList = cur.filter((id) => id !== songId);
      } else if (cur.length >= PLAYLIST_SIZE) {
        return { ...state, toast: { key: 'toast.maxSongs' } };
      } else {
        nextList = [...cur, songId];
      }
      return {
        ...state,
        selections: { ...state.selections, [characterId]: nextList },
        saved: { ...state.saved, [characterId]: false },
        toast: null,
      };
    }
    case 'SAVE_CHARACTER': {
      const id = state.currentCharacterId;
      if (!id) return state;
      const sel = state.selections[id] ?? [];
      if (sel.length < PLAYLIST_SIZE) {
        return { ...state, toast: { key: 'toast.saveFirst' } };
      }
      return {
        ...state,
        saved: { ...state.saved, [id]: true },
        endingCharacterId: id,
        page: 'characterEnding',
        toast: null,
      };
    }
    case 'CONTINUE_FROM_CHARACTER_ENDING': {
      return {
        ...state,
        page: 'gameplay',
        endingCharacterId: null,
      };
    }
    case 'OPEN_MISSION':
      return { ...state, missionOpen: true };
    case 'CLOSE_MISSION':
      return { ...state, missionOpen: false };
    case 'OPEN_HELP':
      return { ...state, helpOpen: true };
    case 'CLOSE_HELP':
      return { ...state, helpOpen: false };
    case 'SET_SONG_DETAIL':
      return {
        ...state,
        songDetailId: action.songId,
        songDetailCharacterId: action.characterId,
      };
    case 'CLEAR_TOAST':
      return { ...state, toast: null };
    case 'SUBMIT': {
      const incomplete = CHARACTERS.filter((c) => !state.saved[c.id]);
      if (incomplete.length > 0) {
        const names = incomplete.map((c) => c.name).join(', ');
        return {
          ...state,
          toast: { key: 'toast.unsaved', vars: { names } },
        };
      }
      const result = computeResult(CHARACTERS, state.selections);
      return {
        ...state,
        page: 'finalEnding',
        result,
        toast: null,
      };
    }
    case 'REPLAY':
      return {
        ...initialState,
        currentCharacterId: FIRST_ID,
        page: 'start',
        language: state.language,
      };
    case 'BACK_TO_START':
      return {
        ...initialState,
        currentCharacterId: FIRST_ID,
        page: 'start',
        language: state.language,
      };
    case 'SET_LANGUAGE': {
      if (!SUPPORTED_LANGUAGES.includes(action.language)) return state;
      return { ...state, language: action.language };
    }
    case 'TOGGLE_LANGUAGE': {
      const next = state.language === 'en' ? 'zh' : 'en';
      return { ...state, language: next };
    }
    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState, (base) => ({
    ...base,
    language: detectInitialLanguage(),
  }));

  useEffect(() => {
    if (!state.toast) return;
    const t = setTimeout(() => dispatch({ type: 'CLEAR_TOAST' }), 2200);
    return () => clearTimeout(t);
  }, [state.toast]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = state.language;
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, state.language);
    } catch (_) {
      /* ignore */
    }
  }, [state.language]);

  const currentCharacter = useMemo(
    () => CHARACTERS.find((c) => c.id === state.currentCharacterId) ?? null,
    [state.currentCharacterId]
  );

  const selectedIds = useMemo(() => {
    if (!state.currentCharacterId) return [];
    return state.selections[state.currentCharacterId] ?? [];
  }, [state.selections, state.currentCharacterId]);

  const navigate = useCallback((page, extra) => {
    dispatch({ type: 'NAVIGATE', page, extra });
  }, []);

  const setLanguage = useCallback((lang) => {
    dispatch({ type: 'SET_LANGUAGE', language: lang });
  }, []);

  const toggleLanguage = useCallback(() => {
    dispatch({ type: 'TOGGLE_LANGUAGE' });
  }, []);

  const t = useCallback(
    (key, vars) => translate(state.language, key, vars),
    [state.language]
  );

  const pick = useCallback(
    (value) => pickLocalized(value, state.language),
    [state.language]
  );

  const value = useMemo(
    () => ({
      characters: CHARACTERS,
      state,
      dispatch,
      currentCharacter,
      selectedIds,
      playlistSize: PLAYLIST_SIZE,
      navigate,
      language: state.language,
      setLanguage,
      toggleLanguage,
      t,
      pick,
    }),
    [
      state,
      currentCharacter,
      selectedIds,
      navigate,
      setLanguage,
      toggleLanguage,
      t,
      pick,
    ]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
