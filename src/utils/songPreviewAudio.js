// Flash Beat
import emptyDancefloorAudio from '../assets/audio/Empty Dancefloor Echo.mp3';
import glitchingHeartbeatAudio from '../assets/audio/Glitching Heartbeat.mp3';
import neonDropTheoryAudio from '../assets/audio/Neon Drop Theory.mp3';
import pocketGalaxyAudio from '../assets/audio/Pocket Galaxy (8-Bit Dream).mp3';
import signalInControlAudio from '../assets/audio/Signal in Control.mp3';

// Soft Frame
import glossOnTheWindowAudio from '../assets/audio/Gloss on the Window.mp3';
import seventeenMirrorsAudio from '../assets/audio/Seventeen Mirrors.mp3';
import cherryLipGlossTheoryAudio from '../assets/audio/Cherry Lip Gloss Theory.mp3';
import velvetPolaroidAudio from '../assets/audio/Velvet Polaroid.mp3';
import curtainCallInMyBedroomAudio from '../assets/audio/Curtain Call in My Bedroom.mp3';

// Marshmallow (only the songs currently uploaded; missing entries simply
// disable the in-modal play button)
import after4pmAudio from '../assets/audio/After 4PM.mp3';
import itsRainingAudio from '../assets/audio/It\'s raining.mp3';

/**
 * Map `listeningHistory[].id` → bundled preview audio URL.
 * 详情页播放按钮会自动播放，且在组件中限制最多 15 秒预听。
 *
 * @type {Record<string, string>}
 */
export const SONG_PREVIEW_AUDIO_BY_ID = {
  // Flash Beat
  song_empty: emptyDancefloorAudio,
  song_glitching: glitchingHeartbeatAudio,
  song_neon: neonDropTheoryAudio,
  song_pocket: pocketGalaxyAudio,
  song_signal: signalInControlAudio,

  // Soft Frame
  sf_s1: glossOnTheWindowAudio,
  sf_s2: seventeenMirrorsAudio,
  sf_s3: cherryLipGlossTheoryAudio,
  sf_s4: velvetPolaroidAudio,
  sf_s5: curtainCallInMyBedroomAudio,

  // Marshmallow (mm_s1 / mm_s3 / mm_s4 audio not uploaded yet)
  mm_s2: after4pmAudio,
  mm_s5: itsRainingAudio,
};
