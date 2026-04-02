/**
 * @typedef {Object} StoryItem
 * @property {string} id
 * @property {string} object
 * @property {string} text
 */

/**
 * @typedef {Object} Song
 * @property {string} id
 * @property {string} title
 * @property {string} time
 * @property {string} [description]
 * @property {number} [playCount]
 * @property {string} [artist]
 * @property {string} [artistHandle]
 * @property {string[]} [tags]
 * @property {string} [genre]
 * @property {string} [lyricsFragment]
 * @property {string} [albumArt]
 * @property {string} [artistAvatar]
 */

/**
 * @typedef {Object} Character
 * @property {string} id
 * @property {string} name
 * @property {string} profession
 * @property {string} mbti
 * @property {string} [tagline]
 * @property {string} [avatar]
 * @property {string} [profilePanelBg] Ripped-paper panel PNG stretched with game background showing through transparent areas.
 * @property {string} [profileImage]
 * @property {string} [taskBlurb]
 * @property {StoryItem[]} stories
 * @property {Song[]} listeningHistory
 * @property {string[]} correctPublicPlaylist
 */

/**
 * @typedef {'start'|'intro'|'tutorial'|'gameplay'|'result'} PageId
 */

export {};
