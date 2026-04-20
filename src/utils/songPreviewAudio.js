/**
 * Map `listeningHistory[].id` → bundled preview audio URL (~15s clips).
 * Place files under `src/assets/audio/previews/` (or similar), import each, then add a line below.
 *
 * @example
 * import previewPocket from '../assets/audio/previews/pocket-galaxy.mp3';
 * export const SONG_PREVIEW_AUDIO_BY_ID = { song_pocket: previewPocket };
 *
 * @type {Record<string, string>}
 */
export const SONG_PREVIEW_AUDIO_BY_ID = {};
