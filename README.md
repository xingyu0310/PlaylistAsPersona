# BurrowBeats · Playlist as Persona

> 一个关于"音乐分享如何成为人格展示"的网页互动叙事 / 轻策略小游戏。
> 玩家扮演 **Playlist Detective**，在动物音乐社交平台 **BurrowBeats** 上，
> 通过角色资料、物品故事和私人聆听记录，为每位角色挑选他们愿意公开展示的 **Public Playlist**。

线上体验：<https://xingyu0310.github.io/PlaylistAsPersona/>

---

## 1. 项目简介

BurrowBeats 不是一个"猜歌"游戏，它在让玩家体验：

- 人们如何通过音乐进行**自我呈现**
- **私人听歌**与**公开展示**之间的差异
- 角色身份、故事、情绪与选歌之间的关系

每位动物角色都会把一段委托交给玩家："帮我从我的聆听历史中挑出 3 首，作为我对外公开的歌单。"
玩家通过观察线索做出判断，然后在结局页面看到自己的选择如何塑造了这个角色对外的形象。

这是一个艺术 / 研究向的 thesis 项目，核心命题是 **"playlist is persona"**。

---

## 2. 当前实现状态

项目已从原 PRD 的视觉原型阶段，落地为一个**可完整游玩的网页版本**。

### 已实现功能

- 完整的页面流程：Start → Intro → Tutorial → Gameplay → Character Ending（每个角色） → Final Ending
- 3 个可玩角色：**Flash Beat**（Influencer / DJ）、**Soft Frame**（艺术家）、**Marshmallow**（占星 / 治愈系）
- 角色切换栏 + Profile / Story（learn more）双视图
- Listening History 列表（点击添加 / 移除，最多 3 首）
- 单首歌曲 **Song Detail Modal**，含封面、描述与音频试听
- Public Playlist 槽位 + Save 流程（每个角色保存后立即进入该角色的 ending）
- Done 提交校验（未完成时给出 toast 提示）
- 最终结局 **Final Ending Screen**：综合三角色选择给出整体反馈
- **任务面板**（左上 `!`）与**教程回看**（右上 `?`）
- **中英双语切换**（角色名 / MBTI / 职业 / 歌名按设计保持英文，其余跟随语言）
- **背景音乐 + 全局点击音效**，可在右上角开关 BGM
- 浮动 emoji、对话气泡、轻量动画等氛围元素
- 通过 GitHub Actions 自动构建并部署到 GitHub Pages

### 与原 PRD 的几处主要差异

| 原 PRD | 当前实现 |
| --- | --- |
| 玩家身份 = Playlist **Stylist** | 现称 Playlist **Detective**（更贴近"读取线索"的玩法体验） |
| Save 后继续游玩，所有角色完成后统一看结果 | Save 后**立即进入该角色的 Character Ending**，再回到 Gameplay 切下一位 |
| 单一 Result 页 | 拆为 **Character Ending（每位）** + **Final Ending（总结）** |
| 默认仅文字反馈 | 增加了角色立绘、对话框、emoji 漂浮等视觉反馈 |

---

## 3. 技术栈

- **构建工具**：[Vite 6](https://vitejs.dev/)
- **框架**：React 18（函数组件 + Hooks）
- **状态管理**：`useReducer` + `Context`（见 `src/context/GameContext.jsx`）
- **样式**：原生 CSS（`src/index.css`），手写像素 / 手账风格 UI
- **数据**：纯 JSON（`src/data/characters.json`），与 UI 完全解耦
- **音频**：浏览器原生 `Audio`，BGM 与点击音效封装在 `src/utils/`
- **部署**：GitHub Actions → GitHub Pages（见 `.github/workflows/deploy-github-pages.yml`）
- **语言**：English / 中文，i18n 字典见 `src/i18n/strings.js`

无任何后端、数据库或第三方付费服务。

---

## 4. 本地运行

### 环境要求

- Node.js **>= 20**（与 CI 环境一致）
- npm 9+

### 启动步骤

```bash
npm install
npm run dev          # 本地开发，默认 http://localhost:5173
npm run build        # 产出 dist/，与 GitHub Pages 部署一致
npm run preview      # 预览生产构建
```

> Vite 配置：在 production 下 `base` 自动设为 `/PlaylistAsPersona/`，
> 以适配 GitHub Pages 项目站点路径。本地开发使用 `/`，无需手动切换。

---

## 5. 目录结构

```
.
├── .github/workflows/        # GitHub Pages 自动部署
├── docs/                     # （历史）GitHub Pages 静态产物，已改用 Actions
├── public/                   # 公共资源（字体等）
├── src/
│   ├── App.jsx               # 顶层路由（按 state.page 切屏）
│   ├── main.jsx              # 入口；挂载全局点击音效与 BGM
│   ├── index.css             # 全局样式
│   ├── constants.js          # PLAYLIST_SIZE = 3
│   ├── context/
│   │   ├── GameContext.jsx   # 全局状态 + reducer + i18n helpers
│   │   └── gameTypes.js
│   ├── screens/              # 六个主屏幕
│   │   ├── StartScreen.jsx
│   │   ├── IntroScreen.jsx
│   │   ├── TutorialScreen.jsx
│   │   ├── GameplayScreen.jsx
│   │   ├── CharacterEndingScreen.jsx
│   │   └── FinalEndingScreen.jsx
│   ├── components/           # 可复用 UI（HelpPanel / MissionPanel / SongDetailModal …）
│   ├── data/
│   │   └── characters.json   # 全部游戏内容数据
│   ├── i18n/strings.js       # 中 / 英文文案字典
│   ├── utils/                # 音频、结局计算、emoji、文案高亮等工具
│   └── assets/               # 角色立绘、歌曲封面、音频、UI 图等
├── index.html
├── vite.config.js
└── package.json
```

---

## 6. 游戏流程（实现版）

1. **Start Screen**：进入游戏。
2. **Intro Screen**：交代世界观与玩家身份（Playlist Detective）。
3. **Tutorial Screen**：图文步骤说明，首次进入会展示一次。
4. **Gameplay Screen**（核心循环，对每位角色重复）：
   1. 在左侧切换角色。
   2. 中间区域阅读 Profile，点击 *learn more* 进入 Story 视图查看物品故事。
   3. 右侧 Listening History 中点击歌曲，加入 / 移除 Public Playlist（上限 3 首）。
   4. 任意歌曲可打开 **Song Detail** 试听并阅读描述。
   5. 选满 3 首后点 **Save** → 立即进入该角色的 Character Ending。
5. **Character Ending Screen**：基于该角色选择给出反馈与对话，点 Continue 回到 Gameplay。
6. 三位角色全部 Save 后，点 **Done** 进入 **Final Ending Screen**，看到整体评价；
   可选择 Replay 或 Back to Start。

辅助交互：

- 左上 `!` 打开 **Mission Panel**，查看每位角色当前进度。
- 右上 `?` 打开 **Help Panel**，回看教程。
- 右上 BGM / 语言开关，可随时切换音乐和中英文。

---

## 7. 数据结构

所有可玩内容都集中在 `src/data/characters.json`。
每位角色大致结构如下（节选 / 简化）：

```json
{
  "id": "flashbeat",
  "name": "Flash Beat",
  "profession": "Influencer / DJ",
  "mbti": "ESFP",
  "tagline":  { "en": "...", "zh": "..." },
  "taskBlurb":{ "en": "...", "zh": "..." },
  "assignment": {
    "title": { "en": "...", "zh": "..." },
    "body":  { "en": ["..."], "zh": ["..."] }
  },
  "assignmentDialogue": [
    { "speaker": "self",   "text": { "en": "...", "zh": "..." } },
    { "speaker": "player", "text": { "en": "...", "zh": "..." } }
  ],
  "stories": [
    {
      "id": "mic",
      "object": { "en": "Microphone", "zh": "麦克风" },
      "text":   { "en": "...", "zh": "..." }
    }
  ],
  "listeningHistory": [
    {
      "id": "song_glitching",
      "title": "Glitching Heartbeat",
      "time": "02:05 AM",
      "description": { "en": "...", "zh": "..." }
    }
  ],
  "correctPublicPlaylist": ["song_x", "song_y", "song_z"]
}
```

要点：

- 凡是双语字段都以 `{ "en": "...", "zh": "..." }` 形式存在，由 `pickLocalized`（见 `GameContext.jsx`）按当前语言取值。
- 角色名、MBTI、职业、歌名为单一英文字符串（产品规则：保持英文）。
- 文本中可使用 `**...**` 进行强调，由 `src/utils/formatInlineEmphasis.js` 解析。
- `correctPublicPlaylist` 是用于 Final Ending 计算"匹配度"的参考答案。
- 结局文案另存在 `src/utils/endings.js`，与角色数据分离，方便单独迭代。

### 添加新内容

| 想做的事 | 改动位置 |
| --- | --- |
| 添加一首歌 | 在对应角色的 `listeningHistory` 中加一项；放置音频到 `src/assets/audio/`、封面到 `src/assets/songs/` |
| 添加一段物品故事 | 对应角色的 `stories` 数组加一项 |
| 添加一个新角色 | `characters.json` 末尾追加；准备立绘、profile-bg；视情况扩展 `endings.js` |
| 修改 UI 文案 | `src/i18n/strings.js` |
| 调整选歌数量 | `src/constants.js` 中的 `PLAYLIST_SIZE` |

---

## 8. 部署

每次推送到 `main` / `master` 时，GitHub Actions 会自动：

1. `npm ci`
2. `npm run build`（输出 `dist/`，`base = /PlaylistAsPersona/`）
3. 通过 `actions/deploy-pages` 发布到 GitHub Pages

仓库设置中需将 **Settings → Pages → Source** 设为 *GitHub Actions*。
工作流文件：`.github/workflows/deploy-github-pages.yml`。

---

## 9. 后续可能的迭代方向

### 内容层
- 进一步 speculative 化歌曲（描述、封面、情绪标签）
- 增加更多角色或 alt 路线
- 强化"私人 vs 公开"对照

### 机制层
- 加入"观众反馈"或"平台算法偏好"等新维度
- 拖拽选歌（目前为点击）
- 多结局分支

### 展览层
- 安装式展示版本（更强的音效与空间感）
- 旁观者观看模式
- 触摸屏 / 移动端适配

---

## 10. 致谢与说明

- 本项目源自一项关于"音乐分享行为如何塑造数字身份"的研究 / thesis。
- 所有音乐为 speculative 创作，仅用于本作品内的叙事，不涉及任何真实歌曲版权。
- 角色立绘、UI 图标与字体（Gaegu / Kalam）共同构建出一种手帐 + 像素的混合风格，用来对应 BurrowBeats 这个"动物音乐社交平台"的虚构世界。
