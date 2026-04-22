// Per-character single-character endings.
//
// Each resolver receives the player's picks (array of song ids) for that
// character and returns an ending object: { id, title, subtitle, description }.
// description can be a string OR an array of paragraphs.
//
// Return null when no ending matches (callers should render a placeholder).

const FLASHBEAT_IMAGE = ['song_signal', 'song_neon', 'song_pocket'];
const FLASHBEAT_PRIVATE = ['song_glitching', 'song_empty'];

function setEq(a, b) {
  if (a.size !== b.size) return false;
  for (const x of a) if (!b.has(x)) return false;
  return true;
}

function resolveFlashbeat(picks) {
  const set = new Set(picks);
  const imageHits = FLASHBEAT_IMAGE.filter((id) => set.has(id));
  const privateHits = FLASHBEAT_PRIVATE.filter((id) => set.has(id));

  // Ending A — A Rising Star: all 3 image songs
  if (imageHits.length === 3) {
    return {
      id: 'A',
      title: 'A Rising Star',
      subtitle: 'Ending A',
      description: [
        'You built a playlist that feels bold, polished, and distinctive.',
        'It gives Flash Beat the energy of a performer, the control of a serious DJ, and just enough personality to stay memorable.',
        'This is the version of himself he most wants the world to see.',
      ],
    };
  }

  // Easter Egg — Unexpected Cult Favorite: exact combo {signal, neon, glitching}
  const easterEgg = new Set(['song_signal', 'song_neon', 'song_glitching']);
  if (setEq(set, easterEgg)) {
    return {
      id: 'EASTER_EGG',
      title: 'Unexpected Cult Favorite',
      subtitle: 'Easter Egg',
      description: [
        'You gave Flash Beat a stranger, more layered image than he planned.',
        'The playlist still feels controlled and performative, but the emotional crack beneath the surface makes it unusually compelling.',
        'He may not become the loudest star in the room, but he could become the one people remember longest.',
      ],
    };
  }

  // Ending B — Almost There: 2 image + 1 private (excluding the Easter Egg)
  if (imageHits.length === 2 && privateHits.length === 1) {
    return {
      id: 'B',
      title: 'Almost There',
      subtitle: 'Ending B',
      description: [
        "You captured an important part of Flash Beat's image, but the playlist is not fully locked in yet.",
        'It has visibility and style, though some choices make his public persona feel less focused than it could be.',
        'He still feels like someone shaping his image, rather than fully owning it.',
      ],
    };
  }

  // Ending C — Private Side Leaking: both private songs + 1 image
  if (privateHits.length === 2 && imageHits.length === 1) {
    return {
      id: 'C',
      title: 'Private Side Leaking',
      subtitle: 'Ending C',
      description: [
        "This playlist reveals more of Flash Beat's inner world than he probably intended.",
        'He seems lonely, exposed, and emotional.',
        'The songs are honest, but they do not support the image he is trying to build on BurrowBeats.',
      ],
    };
  }

  return null;
}

const RESOLVERS = {
  flashbeat: resolveFlashbeat,
};

/**
 * Get the ending for a character based on the picks they saved.
 * @param {string} characterId
 * @param {string[]} picks - selected song ids for that character
 * @returns {{id:string,title:string,subtitle?:string,description:string|string[]}|null}
 */
export function getCharacterEnding(characterId, picks) {
  const resolver = RESOLVERS[characterId];
  if (!resolver) return null;
  return resolver(picks ?? []);
}
