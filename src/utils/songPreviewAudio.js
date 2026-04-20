import emptyDancefloorAudio from '../assets/audio/Empty Dancefloor Echo.mp3';
import glitchingHeartbeatAudio from '../assets/audio/Glitching Heartbeat.mp3';
import neonDropTheoryAudio from '../assets/audio/Neon Drop Theory.mp3';
import pocketGalaxyAudio from '../assets/audio/Pocket Galaxy (8-Bit Dream).mp3';
import signalInControlAudio from '../assets/audio/Signal in Control.mp3';

/**
 * Map `listeningHistory[].id` → bundled preview audio URL.
 * 详情页播放按钮会自动播放，且在组件中限制最多 15 秒预听。
 *
 * @type {Record<string, string>}
 */
export const SONG_PREVIEW_AUDIO_BY_ID = {
  song_empty: emptyDancefloorAudio,
  song_glitching: glitchingHeartbeatAudio,
  song_neon: neonDropTheoryAudio,
  song_pocket: pocketGalaxyAudio,
  song_signal: signalInControlAudio,
};
