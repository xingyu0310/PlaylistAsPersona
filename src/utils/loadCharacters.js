import charactersData from '../data/characters.json';
import unicornImg from '../assets/unicorn.png';
import catImg from '../assets/cat.png';
import lambImg from '../assets/lamb.png';
import profileBgFlashbeat from '../assets/profile-bg-flashbeat.png';
import profileBgSoftframe from '../assets/profile-bg-softframe.png';
import profileBgMarshmallow from '../assets/profile-bg-marshmallow.png';
import djStandeeImg from '../assets/dj立绘.png';

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
