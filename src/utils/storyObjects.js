// Pixel object art for each character's `stories[].id`.
// Keep the keys here in sync with `stories[].id` in `characters.json`.

import mic from '../assets/objects/unicorn/microphone.png';
import eyes from '../assets/objects/unicorn/eyes.png';
import tamagotchi from '../assets/objects/unicorn/tamagotchi.png';
import heart from '../assets/objects/unicorn/broken heart.png';
import guitar from '../assets/objects/unicorn/electric guitar.png';
import synth from '../assets/objects/unicorn/合成器.png';

import opera from '../assets/objects/cat/歌剧.png';
import palette from '../assets/objects/cat/调色板.png';
import camera from '../assets/objects/cat/camera.png';
import lightstick from '../assets/objects/cat/应援棒.png';

import yarn from '../assets/objects/lamb/毛线球.png';
import pillow from '../assets/objects/lamb/枕头.png';
import metro from '../assets/objects/lamb/地铁卡.png';
import tarot from '../assets/objects/lamb/taro card.png';

export const STORY_OBJECT_BY_CHARACTER = {
  flashbeat: {
    mic,
    eyes,
    console: tamagotchi,
    heart,
    guitar,
    synth,
  },
  softframe: {
    opera,
    palette,
    camera,
    lightstick,
  },
  marshmallow: {
    yarn,
    pillow,
    metro,
    tarot,
  },
};

/** Convenience lookup: story art for a given character + story id. */
export function storyObjectFor(characterId, storyId) {
  return STORY_OBJECT_BY_CHARACTER[characterId]?.[storyId];
}
