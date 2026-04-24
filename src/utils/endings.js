// Per-character single-character endings.
//
// Each resolver receives the player's picks (array of song ids) for that
// character and returns an ending object: { id, title, subtitle, description }.
// title / subtitle / description support a plain string or a { en, zh }
// bilingual object. description can also be an array of paragraphs.
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

  if (imageHits.length === 3) {
    return {
      id: 'A',
      tag: 'IMAGE',
      title: { en: 'A Rising Star', zh: '冉冉升起的明星' },
      subtitle: { en: 'Ending A', zh: '结局 A' },
      description: {
        en: [
          'You built a playlist that feels bold, polished, and distinctive.',
          'It gives Flash Beat the energy of a performer, the control of a serious DJ, and just enough personality to stay memorable.',
          'This is the version of himself he most wants the world to see.',
        ],
        zh: [
          '你挑出的这份歌单大胆、精致，又有辨识度。',
          '它让 Flash Beat 同时拥有了表演者的能量、专业 DJ 的掌控感，还有恰到好处的个性。',
          '这就是他最想让世界看见的那个自己。',
        ],
      },
    };
  }

  const easterEgg = new Set(['song_signal', 'song_neon', 'song_glitching']);
  if (setEq(set, easterEgg)) {
    return {
      id: 'EASTER_EGG',
      tag: 'INTERPRET',
      title: { en: 'Unexpected Cult Favorite', zh: '意料之外的小众收藏' },
      subtitle: { en: 'Easter Egg', zh: '彩蛋结局' },
      description: {
        en: [
          'You gave Flash Beat a stranger, more layered image than he planned.',
          'The playlist still feels controlled and performative, but the emotional crack beneath the surface makes it unusually compelling.',
          'He may not become the loudest star in the room, but he could become the one people remember longest.',
        ],
        zh: [
          '你给 Flash Beat 构建了一个比他预想中更奇怪、也更有层次的形象。',
          '歌单依然掌控、依然表演，但表层之下那道情绪裂缝，让一切显得格外耐听。',
          '他也许不会成为房间里最响亮的那颗星，但可能会成为让人记最久的那一个。',
        ],
      },
    };
  }

  if (imageHits.length === 2 && privateHits.length === 1) {
    return {
      id: 'B',
      tag: 'BALANCE',
      title: { en: 'Almost There', zh: '差一点点' },
      subtitle: { en: 'Ending B', zh: '结局 B' },
      description: {
        en: [
          "You captured an important part of Flash Beat's image, but the playlist is not fully locked in yet.",
          'It has visibility and style, though some choices make his public persona feel less focused than it could be.',
          'He still feels like someone shaping his image, rather than fully owning it.',
        ],
        zh: [
          '你抓到了 Flash Beat 形象里重要的一块，但整份歌单还没完全锁定。',
          '它有存在感、有风格，但某些选择让他的公开形象还不够聚焦。',
          '他看起来仍在塑造自己的形象，而不是完全把它据为己有。',
        ],
      },
    };
  }

  if (privateHits.length === 2 && imageHits.length === 1) {
    return {
      id: 'C',
      tag: 'TRUTH',
      title: { en: 'Private Side Leaking', zh: '私人的一面泄了出来' },
      subtitle: { en: 'Ending C', zh: '结局 C' },
      description: {
        en: [
          "This playlist reveals more of Flash Beat's inner world than he probably intended.",
          'He seems lonely, exposed, and emotional.',
          'The songs are honest, but they do not support the image he is trying to build on BurrowBeats.',
        ],
        zh: [
          '这份歌单暴露了 Flash Beat 比他原本打算分享的还要多的内心世界。',
          '他显得孤独、袒露、情绪化。',
          '这些歌很诚实，却并不支撑他在 BurrowBeats 上想要塑造的形象。',
        ],
      },
    };
  }

  return null;
}

// --- Soft Frame ---------------------------------------------------------
// IMAGE  = sf_s3 Cherry Lip Gloss Theory, sf_s2 Seventeen Mirrors, sf_s4 Velvet Polaroid
// PRIVATE = sf_s1 Gloss on the Window, sf_s5 Curtain Call in My Bedroom
const SOFTFRAME_IMAGE = ['sf_s3', 'sf_s2', 'sf_s4'];
const SOFTFRAME_PRIVATE = ['sf_s1', 'sf_s5'];

function resolveSoftframe(picks) {
  const set = new Set(picks);
  const imageHits = SOFTFRAME_IMAGE.filter((id) => set.has(id));
  const privateHits = SOFTFRAME_PRIVATE.filter((id) => set.has(id));

  // Ending A — It-Girl Signal: all 3 image songs
  if (imageHits.length === 3) {
    return {
      id: 'A',
      tag: 'IMAGE',
      title: { en: 'It-Girl Signal', zh: 'It-Girl 信号' },
      subtitle: { en: 'Ending A', zh: '结局 A' },
      description: {
        en: [
          'You built a playlist that feels stylish and selective in exactly the right way.',
          "It shows Soft Frame's visual taste while quietly signaling to the kind of K-pop listener she wants to attract.",
        ],
        zh: [
          '你搭出的这份歌单，有型、有挑剔感，而且挑剔得刚刚好。',
          '它既展示了 Soft Frame 的视觉品味，又悄悄向她想吸引的那类 K-pop 听众发出了信号。',
        ],
      },
    };
  }

  // Easter Egg — Main Character in Her Own Edit:
  // exact combo {Seventeen Mirrors, Cherry Lip Gloss Theory, Curtain Call in My Bedroom}
  const easterEgg = new Set(['sf_s2', 'sf_s3', 'sf_s5']);
  if (setEq(set, easterEgg)) {
    return {
      id: 'EASTER_EGG',
      tag: 'INTERPRET',
      title: {
        en: 'Main Character in Her Own Edit',
        zh: '她自己剪辑里的主角',
      },
      subtitle: { en: 'Easter Egg', zh: '彩蛋结局' },
      description: {
        en: [
          'Your playlist turns Soft Frame into someone who feels like the main character of her own little movie.',
          'It is slightly dramatic, slightly cute, and just a bit extra.',
          'Behind the polished image, it lets people glimpse a more imaginative and emotionally rich inner world.',
        ],
        zh: [
          '你挑出的这份歌单，让 Soft Frame 看起来像是她自己那部小电影里的女主角。',
          '略带戏剧感，有点可爱，也有点过火。',
          '在那张精致的外壳之下，让人得以窥见一个更富想象力、情绪更浓的内心世界。',
        ],
      },
    };
  }

  // Ending B — Almost the Right Crowd: 2 image + 1 private (excluding Easter Egg)
  if (imageHits.length === 2 && privateHits.length === 1) {
    return {
      id: 'B',
      tag: 'BALANCE',
      title: { en: 'Almost the Right Crowd', zh: '差一点对上那群人' },
      subtitle: { en: 'Ending B', zh: '结局 B' },
      description: {
        en: [
          'This playlist feels appealing, but its message is slightly less precise than Soft Frame might want.',
          'It communicates parts of her taste and identity. The right people may still notice her, but the signal is softer and less exact.',
        ],
        zh: [
          '这份歌单依然好听，但它要传达的讯息，比 Soft Frame 想要的稍微模糊了一点。',
          '它说出了她品味和身份里的一部分。对的人也许依然能注意到她，只是信号会更柔、更不精准。',
        ],
      },
    };
  }

  // Ending C — Too Private, Too Diffuse: 1 image + 2 private
  if (imageHits.length === 1 && privateHits.length === 2) {
    return {
      id: 'C',
      tag: 'TRUTH',
      title: { en: 'Too Private, Too Diffuse', zh: '太私密，也太散' },
      subtitle: { en: 'Ending C', zh: '结局 C' },
      description: {
        en: [
          "The playlist captures Soft Frame's softer interior world.",
          'Instead of clearly presenting her taste to others, it leaves her image blurred and harder to read.',
        ],
        zh: [
          '这份歌单捕捉到了 Soft Frame 更柔软的内心世界。',
          '只是它没能把她的品味清晰地呈现给别人，反而让她的形象变得朦胧、难以读懂。',
        ],
      },
    };
  }

  return null;
}

// --- Marshmallow --------------------------------------------------------
// Songs:
//   mm_s1 Thread Through Summer
//   mm_s2 After 4PM
//   mm_s3 The Meaning of Leaving
//   mm_s4 Stone in Her Sugar Cup
//   mm_s5 It's raining
//
// Ending A — Gentle and Approachable:
//   { mm_s2, mm_s3 } + exactly one of { mm_s1, mm_s4, mm_s5 }
// Ending C — More Than She Meant to Show:
//   { mm_s4, mm_s5 } + exactly one of { mm_s1, mm_s2, mm_s3 }
// Ending B — Soft but Distant: all remaining 3-song combos.
const MARSHMALLOW_APPROACH_CORE = ['mm_s2', 'mm_s3'];
const MARSHMALLOW_APPROACH_SOFT = ['mm_s1', 'mm_s4', 'mm_s5'];
const MARSHMALLOW_DIARY_CORE = ['mm_s4', 'mm_s5'];
const MARSHMALLOW_DIARY_SOFT = ['mm_s1', 'mm_s2', 'mm_s3'];

function resolveMarshmallow(picks) {
  const set = new Set(picks);
  if (set.size !== 3) return null;

  const approachCore = MARSHMALLOW_APPROACH_CORE.every((id) => set.has(id));
  const approachSoft = MARSHMALLOW_APPROACH_SOFT.filter((id) => set.has(id));
  if (approachCore && approachSoft.length === 1) {
    return {
      id: 'A',
      tag: 'BALANCE',
      title: { en: 'Gentle and Approachable', zh: '温柔且容易靠近' },
      subtitle: { en: 'Ending A', zh: '结局 A' },
      description: {
        en: [
          'Your playlist makes Marshmallow feel warm and approachable.',
          'She still comes across as quiet, but now there is a softness that invites people in.',
          'These songs make it easier for the right person to say hello.',
        ],
        zh: [
          '你挑出的这份歌单，让 Marshmallow 显得温暖、容易靠近。',
          '她依然是安静的那种人，但如今那份安静里有一种邀请人走近的柔软。',
          '这些歌，让合适的那个人更容易开口说一声你好。',
        ],
      },
    };
  }

  const diaryCore = MARSHMALLOW_DIARY_CORE.every((id) => set.has(id));
  const diarySoft = MARSHMALLOW_DIARY_SOFT.filter((id) => set.has(id));
  if (diaryCore && diarySoft.length === 1) {
    return {
      id: 'C',
      tag: 'TRUTH',
      title: { en: 'More Than She Meant to Show', zh: '比她原本想露出的更多' },
      subtitle: { en: 'Ending C', zh: '结局 C' },
      description: {
        en: [
          'Your playlist reveals more of Marshmallow than she planned.',
          'The songs are beautiful and honest, but they feel closer to a private diary.',
          'Someone might understand her more deeply through them, but she may not feel fully ready to be seen that clearly.',
        ],
        zh: [
          '这份歌单暴露了 Marshmallow 比她原本想要的更多一层自己。',
          '歌是好听的、诚实的，但更像一本私密的日记。',
          '也许会有人因此更深地理解她，但她自己可能还没准备好被这样清楚地看见。',
        ],
      },
    };
  }

  return {
    id: 'B',
    tag: 'OBSERVER',
    title: { en: 'Soft but Distant', zh: '柔软，却有距离' },
    subtitle: { en: 'Ending B', zh: '结局 B' },
    description: {
      en: [
        "Your playlist captures Marshmallow's softness, but keeps her at a distance.",
        'She feels thoughtful, tender, and a little hard to reach.',
        'Some people may be curious about her, but few will know how to step closer.',
      ],
      zh: [
        '你挑出的这份歌单，捕捉到了 Marshmallow 的柔软，却也让她保持在一段距离之外。',
        '她显得细腻、温柔，又有一点难以靠近。',
        '或许会有人对她产生好奇，但很少有人知道该怎么再走近一步。',
      ],
    },
  };
}

const RESOLVERS = {
  flashbeat: resolveFlashbeat,
  softframe: resolveSoftframe,
  marshmallow: resolveMarshmallow,
};

/**
 * Get the ending for a character based on the picks they saved.
 * @param {string} characterId
 * @param {string[]} picks
 */
export function getCharacterEnding(characterId, picks) {
  const resolver = RESOLVERS[characterId];
  if (!resolver) return null;
  return resolver(picks ?? []);
}

// --- Final ending -------------------------------------------------------
//
// Each per-character ending carries a `tag` (IMAGE / BALANCE / TRUTH /
// INTERPRET / OBSERVER). We tally those tags across the three characters
// and pick one of five final endings.
//
// Rules (from design):
//   1. If INTERPRET >= 2 → Over-Interpreter (easter-egg style priority).
//   2. Otherwise take the tag with the highest count.
//   3. On a tie, use the priority order: TRUTH, INTERPRET, IMAGE, BALANCE,
//      OBSERVER.
const FINAL_ENDINGS = {
  IMAGE: {
    id: 'IMAGE',
    tag: 'IMAGE',
    title: { en: 'The Image Builder', zh: '形象建构者' },
    subtitle: { en: 'Ending 1', zh: '结局 1' },
    description: {
      en: [
        'You are a Playlist Detective who understands performance.',
        'You know that what people show is not always what they feel, and you help them shape that difference carefully.',
        'You help them be seen the way they want to be seen.',
      ],
      zh: [
        '你是一位懂得「表演」的歌单侦探。',
        '你知道人们所展示的，并不总是他们真正感受到的，而你会小心地帮他们拿捏这之间的分寸。',
        '你让他们以自己想要被看见的方式，被别人看见。',
      ],
    },
  },
  BALANCE: {
    id: 'BALANCE',
    tag: 'BALANCE',
    title: { en: 'The Connector', zh: '连接者' },
    subtitle: { en: 'Ending 2', zh: '结局 2' },
    description: {
      en: [
        'You look for the version of people that others can reach.',
        'Not too hidden, not too exposed.',
        'Your choices make connection feel possible.',
      ],
      zh: [
        '你在寻找的是那个别人能够触碰到的版本的他们。',
        '不至于太过隐藏，也不至于太过暴露。',
        '你的选择让「走近彼此」这件事，变得可能。',
      ],
    },
  },
  OBSERVER: {
    id: 'OBSERVER',
    tag: 'OBSERVER',
    title: { en: 'The Observer', zh: '观察者' },
    subtitle: { en: 'Ending 3', zh: '结局 3' },
    description: {
      en: [
        "You don't rush to define people. You let them remain a little unclear.",
        'Your playlists feel like observations.',
        "You see people, but you don't force them into shape.",
      ],
      zh: [
        '你不急着给人下定义。你允许他们保留一点模糊。',
        '你的歌单更像是一种观察。',
        '你看得见他们，但不会硬要把他们塑成某种形状。',
      ],
    },
  },
  TRUTH: {
    id: 'TRUTH',
    tag: 'TRUTH',
    title: { en: 'The Truth Seeker', zh: '真相探寻者' },
    subtitle: { en: 'Ending 4', zh: '结局 4' },
    description: {
      en: [
        'You are drawn to what feels real, even when it is not meant to be shown.',
        'Your choices often reveal more than people intended.',
        'You uncover their inner selves.',
      ],
      zh: [
        '你被那种真实的感觉吸引，哪怕它本不该被展示出来。',
        '你的选择，常常让人暴露出比他们本意更多的东西。',
        '你揭开了他们内心的那个自己。',
      ],
    },
  },
  INTERPRET: {
    id: 'INTERPRET',
    tag: 'INTERPRET',
    title: { en: 'The Over-Interpreter', zh: '过度解读者' },
    subtitle: { en: 'Ending 5', zh: '结局 5' },
    description: {
      en: [
        'You turn people into stories.',
        'Sometimes more dramatic than they ever meant to be.',
        'Sometimes more beautiful, too.',
      ],
      zh: [
        '你把人都变成了故事。',
        '有时候，比他们本意要戏剧化得多。',
        '有时候，也比他们本意要美得多。',
      ],
    },
  },
};

const FINAL_TIE_PRIORITY = ['TRUTH', 'INTERPRET', 'IMAGE', 'BALANCE', 'OBSERVER'];

/**
 * Resolve the overall final ending from each character's per-character
 * ending. `perCharacterEndings` is an array of ending objects (or null),
 * typically produced via `getCharacterEnding` for each character.
 *
 * Returns one of the FINAL_ENDINGS entries, or null if nothing can be
 * decided (e.g. the player saved nothing).
 */
export function resolveFinalEnding(perCharacterEndings) {
  const counts = { IMAGE: 0, BALANCE: 0, TRUTH: 0, INTERPRET: 0, OBSERVER: 0 };
  let hasAny = false;
  for (const e of perCharacterEndings ?? []) {
    const tag = e?.tag;
    if (tag && counts[tag] !== undefined) {
      counts[tag]++;
      hasAny = true;
    }
  }
  if (!hasAny) return null;

  if (counts.INTERPRET >= 2) return FINAL_ENDINGS.INTERPRET;

  const max = Math.max(...Object.values(counts));
  if (max === 0) return null;
  for (const tag of FINAL_TIE_PRIORITY) {
    if (counts[tag] === max) return FINAL_ENDINGS[tag];
  }
  return null;
}
