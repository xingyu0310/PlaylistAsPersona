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

const RESOLVERS = {
  flashbeat: resolveFlashbeat,
  softframe: resolveSoftframe,
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
