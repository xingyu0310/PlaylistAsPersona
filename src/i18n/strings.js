/**
 * i18n strings for BurrowBeats.
 *
 * Rule (per product): song titles, character names, MBTI and profession
 * stay in English regardless of language. Everything else can switch.
 */

const en = {
  // Global / shared
  'ui.langToggle.current': 'Current: English',
  'ui.back': 'Back',
  'ui.close': 'Close',

  // Start screen
  'start.aria': 'Playlist as Persona · BurrowBeats',
  'start.cta.play': 'Start game',

  // Intro screen
  'intro.welcome': 'Welcome to',
  'intro.subtitle': 'A music social platform',
  'intro.body.p1a': 'On BurrowBeats, playlists are more than music.',
  'intro.body.p1b': 'They are how animals present themselves to the world.',
  'intro.body.p2a': 'You are a ',
  'intro.body.role': 'Playlist Detective',
  'intro.body.p2b': '.',
  'intro.body.p3a': 'By reading character clues and exploring private listening',
  'intro.body.p3b': 'histories, you will help each animal choose the songs they',
  'intro.body.p3c': 'want the world to see.',
  'intro.cta.continue': 'Continue',

  // Tutorial screen
  'tutorial.title': 'How to play',
  'tutorial.steps.0a': 'Left rail',
  'tutorial.steps.0b': ': switch between the three characters — each has its own ',
  'tutorial.steps.0c': 'assignment',
  'tutorial.steps.0d': '.',
  'tutorial.steps.1a': 'Hover',
  'tutorial.steps.1b': ' (or focus) the character portrait to read their assignment.',
  'tutorial.steps.2a': 'Center: ',
  'tutorial.steps.2b': 'profile',
  'tutorial.steps.2c': '; tap ',
  'tutorial.steps.2d': '"learn more"',
  'tutorial.steps.2e': ' for objects & stories.',
  'tutorial.steps.3a': 'Right: ',
  'tutorial.steps.3b': 'Listening History',
  'tutorial.steps.3c': ' — tap songs to add/remove from the ',
  'tutorial.steps.3d': 'Public Playlist',
  'tutorial.steps.3e': ' (up to {n}).',
  'tutorial.steps.4a': 'Tap ',
  'tutorial.steps.4b': '"Details"',
  'tutorial.steps.4c': ' beside a song for extra info when available.',
  'tutorial.steps.5a': 'After {n} picks, press ',
  'tutorial.steps.5b': 'Save',
  'tutorial.steps.5c': ' to see that character\u2019s ',
  'tutorial.steps.5d': 'ending',
  'tutorial.steps.5e': '.',
  'tutorial.steps.6a': 'When all three are saved, press ',
  'tutorial.steps.6b': 'Done',
  'tutorial.steps.6c': ' for your ',
  'tutorial.steps.6d': 'final ending',
  'tutorial.steps.6e': '.',
  'tutorial.steps.7a': 'Top-left ',
  'tutorial.steps.7b': '"!"',
  'tutorial.steps.7c': ' opens your progress · top-right ',
  'tutorial.steps.7d': '"?"',
  'tutorial.steps.7e': ' reopens this guide.',
  'tutorial.cta.play': 'Play',

  // Gameplay screen
  'gameplay.title': 'BurrowBeats',
  'gameplay.progress': 'Progress',
  'gameplay.howToPlay': 'How to play',
  'gameplay.save.aria': 'Save',
  'gameplay.done.aria': 'Done',
  'gameplay.profileTab': "{name}'s Profile",
  'gameplay.hoverForTask': 'Hover for task',
  'gameplay.artPlaceholder': 'Art placeholder',
  'gameplay.fields.name': 'Name',
  'gameplay.fields.profession': 'Profession',
  'gameplay.fields.mbti': 'MBTI',
  'gameplay.learnMore': 'learn more',
  'gameplay.learnMore.aria': 'Learn more — objects and stories',
  'gameplay.publicPlaylist': 'Public Playlist',
  'gameplay.emptySlot': 'Empty slot',
  'gameplay.listeningHistory': 'Listening History',
  'gameplay.details': 'Details',
  'gameplay.backToProfile.aria': 'Back to profile',
  'gameplay.objectsAndStories': 'Objects & stories',
  'gameplay.storiesEmptyHint':
    '(Add stories in the stories array in characters.json.)',
  'gameplay.charTab.aria': '{name}',
  'gameplay.charSaved.aria': '{name} · saved',
  'gameplay.rail.aria': 'Switch character',

  // Song detail modal
  'song.preview.play.aria': 'Play preview',
  'song.preview.pause.aria': 'Pause preview',
  'song.preview.unavailable': 'Preview audio not added yet',
  'song.playCountLine.a': 'Played ',
  'song.playCountLine.b': ' times',
  'song.artist': 'Artist',
  'song.coverPlaceholder': 'Cover placeholder',
  'song.description': 'Description',
  'song.genre': 'Genre',
  'song.lyrics': 'Lyrics fragment',
  'song.detailAlt': '{title} — detail',

  // Mission panel
  'mission.title': 'Progress',
  'mission.notStarted': 'Not started',
  'mission.saved': 'Saved',
  'mission.selected': '{n}/{total} selected',

  // Help panel
  'help.title': 'How to play',
  'help.0a': 'Use the ',
  'help.0b': 'left rail',
  'help.0c': ' to switch characters.',
  'help.1a': 'Hover',
  'help.1b': ' the character portrait to read their assignment.',
  'help.2a': 'Center: ',
  'help.2b': 'profile',
  'help.2c': '; tap ',
  'help.2d': '"learn more"',
  'help.2e': ' for objects & stories.',
  'help.3a': 'Right: ',
  'help.3b': 'Listening History',
  'help.3c': ' — tap a row to add/remove it from the ',
  'help.3d': 'Public Playlist',
  'help.3e': ' (up to {n} tracks).',
  'help.4a': 'Tap ',
  'help.4b': '"Details"',
  'help.4c': ' beside a song for extra info when available.',
  'help.5a': 'When full, ',
  'help.5b': 'Save',
  'help.5c': '; after every character is saved, tap ',
  'help.5d': 'Done',
  'help.5e': '.',

  // Toast messages
  'toast.maxSongs': 'You can add at most 3 songs.',
  'toast.saveFirst': 'Please select 3 songs before saving.',
  'toast.unsaved': 'Save these characters first: {names}',

  // Character ending
  'charEnding.eyebrow': 'Character ending {saved} / {total}',
  'charEnding.title': "{name}'s ending",
  'charEnding.titleFallback': 'Character ending',
  'charEnding.yourPlaylist': 'Your Public Playlist for {name}',
  'charEnding.noSongs': 'No songs selected.',
  'charEnding.emptySlot': 'Empty slot',
  'charEnding.continue': 'Continue',
  'charEnding.backToGameplay': 'Back to gameplay',
  'charEnding.seeFinal': 'See final ending',
  'charEnding.placeholderTitle': 'Ending (placeholder)',
  'charEnding.placeholderBody':
    '(TBD) A short ending for {name} based on the public playlist you crafted. Replace this block with the real narrative copy later.',
  'charEnding.placeholderFallbackName': 'this character',

  // Final ending
  'final.eyebrow': 'Final ending',
  'final.title': 'Your ending',
  'final.placeholderTitle': 'Your personalized ending (placeholder)',
  'final.placeholderBody':
    '(TBD) A reflective ending tailored to how you read all three personas. Replace this block with the real ending copy later.',
  'final.recap': 'Per-character recap',
  'final.match': 'Match {hits} / {total}',
  'final.replay': 'Replay',
  'final.backToStart': 'Back to Start',
};

const zh = {
  'ui.langToggle.current': '当前：中文',
  'ui.back': '返回',
  'ui.close': '关闭',

  'start.aria': 'Playlist as Persona · BurrowBeats',
  'start.cta.play': '开始游戏',

  'intro.welcome': '欢迎来到',
  'intro.subtitle': '一个关于音乐的社交平台',
  'intro.body.p1a': '在 BurrowBeats，歌单不只是歌。',
  'intro.body.p1b': '它们是每只小动物向世界介绍自己的方式。',
  'intro.body.p2a': '你是一位',
  'intro.body.role': 'Playlist Detective',
  'intro.body.p2b': '。',
  'intro.body.p3a': '通过阅读角色的线索、翻看他们私下的聆听记录，',
  'intro.body.p3b': '你将帮助每一只动物，挑出他们',
  'intro.body.p3c': '想让世界看见的那几首歌。',
  'intro.cta.continue': '继续',

  'tutorial.title': '怎么玩',
  'tutorial.steps.0a': '左侧栏',
  'tutorial.steps.0b': '：可以在三位角色之间切换——每人都有自己的',
  'tutorial.steps.0c': '任务',
  'tutorial.steps.0d': '。',
  'tutorial.steps.1a': '悬停',
  'tutorial.steps.1b': '（或聚焦）角色头像，就能看到对他的任务描述。',
  'tutorial.steps.2a': '中间：',
  'tutorial.steps.2b': '角色档案',
  'tutorial.steps.2c': '；点击 ',
  'tutorial.steps.2d': '"learn more"',
  'tutorial.steps.2e': ' 可以看物件与故事。',
  'tutorial.steps.3a': '右侧：',
  'tutorial.steps.3b': 'Listening History',
  'tutorial.steps.3c': ' — 点击歌曲可以把它加入或移出 ',
  'tutorial.steps.3d': 'Public Playlist',
  'tutorial.steps.3e': '（最多 {n} 首）。',
  'tutorial.steps.4a': '点击歌曲旁边的 ',
  'tutorial.steps.4b': '"Details"',
  'tutorial.steps.4c': '，可以查看这首歌更多信息。',
  'tutorial.steps.5a': '挑满 {n} 首之后，点 ',
  'tutorial.steps.5b': '保存',
  'tutorial.steps.5c': '，就能看到这位角色的 ',
  'tutorial.steps.5d': '结局',
  'tutorial.steps.5e': '。',
  'tutorial.steps.6a': '三位都保存之后，点 ',
  'tutorial.steps.6b': '完成',
  'tutorial.steps.6c': '，就能看到你的 ',
  'tutorial.steps.6d': '最终结局',
  'tutorial.steps.6e': '。',
  'tutorial.steps.7a': '左上角的 ',
  'tutorial.steps.7b': '"!"',
  'tutorial.steps.7c': ' 可以打开进度；右上角的 ',
  'tutorial.steps.7d': '"?"',
  'tutorial.steps.7e': ' 可以重新打开这篇指引。',
  'tutorial.cta.play': '开始玩',

  'gameplay.title': 'BurrowBeats',
  'gameplay.progress': '进度',
  'gameplay.howToPlay': '怎么玩',
  'gameplay.save.aria': '保存',
  'gameplay.done.aria': '完成',
  'gameplay.profileTab': '{name} 的档案',
  'gameplay.hoverForTask': '悬停查看任务',
  'gameplay.artPlaceholder': '美术占位',
  'gameplay.fields.name': 'Name',
  'gameplay.fields.profession': 'Profession',
  'gameplay.fields.mbti': 'MBTI',
  'gameplay.learnMore': '查看更多',
  'gameplay.learnMore.aria': '查看更多——物件与故事',
  'gameplay.publicPlaylist': 'Public Playlist',
  'gameplay.emptySlot': '空位',
  'gameplay.listeningHistory': 'Listening History',
  'gameplay.details': '详情',
  'gameplay.backToProfile.aria': '返回档案',
  'gameplay.objectsAndStories': '物件与故事',
  'gameplay.storiesEmptyHint':
    '（可以在 characters.json 的 stories 数组里添加故事。）',
  'gameplay.charTab.aria': '{name}',
  'gameplay.charSaved.aria': '{name} · 已保存',
  'gameplay.rail.aria': '切换角色',

  'song.preview.play.aria': '试听',
  'song.preview.pause.aria': '暂停试听',
  'song.preview.unavailable': '试听音频暂未提供',
  'song.playCountLine.a': '播放 ',
  'song.playCountLine.b': ' 次',
  'song.artist': 'Artist',
  'song.coverPlaceholder': '封面占位',
  'song.description': '描述',
  'song.genre': '风格',
  'song.lyrics': '歌词片段',
  'song.detailAlt': '{title} — 详情',

  'mission.title': '进度',
  'mission.notStarted': '还没开始',
  'mission.saved': '已保存',
  'mission.selected': '已选 {n}/{total}',

  'help.title': '怎么玩',
  'help.0a': '使用 ',
  'help.0b': '左侧栏',
  'help.0c': ' 在三位角色之间切换。',
  'help.1a': '悬停',
  'help.1b': '角色头像，可以看见对他的任务描述。',
  'help.2a': '中间：',
  'help.2b': '角色档案',
  'help.2c': '；点 ',
  'help.2d': '"learn more"',
  'help.2e': ' 可以看物件与故事。',
  'help.3a': '右侧：',
  'help.3b': 'Listening History',
  'help.3c': ' — 点击一行可把这首歌加入或移出 ',
  'help.3d': 'Public Playlist',
  'help.3e': '（最多 {n} 首）。',
  'help.4a': '点击歌曲旁边的 ',
  'help.4b': '"Details"',
  'help.4c': ' 可查看更多信息。',
  'help.5a': '歌单选满后点 ',
  'help.5b': '保存',
  'help.5c': '；三位都保存后，点 ',
  'help.5d': '完成',
  'help.5e': '。',

  'toast.maxSongs': '公开歌单最多只能放 3 首歌哦。',
  'toast.saveFirst': '请先选满 3 首歌再保存。',
  'toast.unsaved': '请先保存这些角色：{names}',

  'charEnding.eyebrow': '角色结局 {saved} / {total}',
  'charEnding.title': '{name} 的结局',
  'charEnding.titleFallback': '角色结局',
  'charEnding.yourPlaylist': '你为 {name} 挑选的公开歌单',
  'charEnding.noSongs': '还没选歌。',
  'charEnding.emptySlot': '空位',
  'charEnding.continue': '继续',
  'charEnding.backToGameplay': '返回游戏',
  'charEnding.seeFinal': '查看最终结局',
  'charEnding.placeholderTitle': '结局（占位）',
  'charEnding.placeholderBody':
    '（待定）根据你为 {name} 挑选的公开歌单生成的小段结局。之后再替换为正式文案。',
  'charEnding.placeholderFallbackName': '这位角色',

  'final.eyebrow': '最终结局',
  'final.title': '你的结局',
  'final.placeholderTitle': '为你量身定制的结局（占位）',
  'final.placeholderBody':
    '（待定）一段回顾你如何读懂这三位角色的反思式结局。之后再替换为正式文案。',
  'final.recap': '每位角色回顾',
  'final.match': '命中 {hits} / {total}',
  'final.replay': '再玩一次',
  'final.backToStart': '回到首页',
};

const dicts = { en, zh };

function interpolate(str, vars) {
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (_, k) =>
    vars[k] === undefined || vars[k] === null ? `{${k}}` : String(vars[k])
  );
}

export function translate(lang, key, vars) {
  const dict = dicts[lang] ?? dicts.en;
  const raw = dict[key] ?? dicts.en[key] ?? key;
  return interpolate(raw, vars);
}

export function pickLocalized(value, lang) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value;
  if (typeof value === 'object') {
    const primary = value[lang];
    if (primary !== undefined && primary !== null) return primary;
    const fallback = value.en;
    if (fallback !== undefined && fallback !== null) return fallback;
    return '';
  }
  return value;
}

export const SUPPORTED_LANGUAGES = ['en', 'zh'];
