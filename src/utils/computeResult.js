import { PLAYLIST_SIZE } from '../constants.js';

/**
 * @param {import('../context/gameTypes.js').Character[]} characters
 * @param {Record<string, string[]>} selections
 */
export function computeResult(characters, selections) {
  const perCharacter = characters.map((c) => {
    const picked = selections[c.id] ?? [];
    const correct = new Set(c.correctPublicPlaylist);
    const hits = picked.filter((id) => correct.has(id)).length;
    const total = Math.min(PLAYLIST_SIZE, c.correctPublicPlaylist.length || PLAYLIST_SIZE);
    return {
      characterId: c.id,
      name: c.name,
      selectedIds: picked,
      recommendedIds: c.correctPublicPlaylist,
      hits,
      total: total || PLAYLIST_SIZE,
      note: '(TBD: copy explaining hits vs. persona dimensions.)',
    };
  });

  const avg =
    perCharacter.reduce((s, p) => s + (p.total ? p.hits / p.total : 0), 0) /
    Math.max(1, perCharacter.length);

  let summary = '(TBD: overall takeaway, e.g. You read persona through emotion.)';
  if (avg >= 0.85) summary = "You're a sharp Playlist Stylist. (placeholder)";
  else if (avg >= 0.5)
    summary = 'Solid start — keep watching the public / private tension. (placeholder)';

  return { perCharacter, summary };
}
