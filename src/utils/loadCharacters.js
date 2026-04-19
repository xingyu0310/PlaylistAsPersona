import charactersData from '../data/characters.json';
import unicornImg from '../assets/characters/unicorn.png';
import catImg from '../assets/characters/cat.png';
import lambImg from '../assets/characters/lamb.png';
import profileBgFlashbeat from '../assets/characters/profile-bg-flashbeat.png';
import profileBgSoftframe from '../assets/characters/profile-bg-softframe.png';
import profileBgMarshmallow from '../assets/characters/profile-bg-marshmallow.png';
import djStandeeImg from '../assets/characters/dj立绘.png';
import catStandeeImg from '../assets/characters/cat立绘.png';
import lambStandeeImg from '../assets/characters/小羊立绘.png';

const avatarById = {
  flashbeat: unicornImg,
  softframe: catImg,
  marshmallow: lambImg,
};

const profilePanelBgById = {
  flashbeat: profileBgFlashbeat,
  softframe: profileBgSoftframe,
  marshmallow: profileBgMarshmallow,
};

const profileImageById = {
  flashbeat: djStandeeImg,
  softframe: catStandeeImg,
  marshmallow: lambStandeeImg,
};

/** @returns {import('../context/gameTypes.js').Character[]} */
export function loadCharacters() {
  return charactersData.map((c) => ({
    ...c,
    avatar: c.avatar || avatarById[c.id] || '',
    profilePanelBg: profilePanelBgById[c.id] ?? '',
    profileImage: c.profileImage || profileImageById[c.id] || '',
  }));
}
