// Codeforces rating tiers and their canonical colors.
// https://codeforces.com/blog/entry/20638
const TIERS = [
  { min: 3000, name: 'Legendary Grandmaster', color: '#FF0000' },
  { min: 2600, name: 'International Grandmaster', color: '#FF0000' },
  { min: 2400, name: 'Grandmaster', color: '#FF0000' },
  { min: 2300, name: 'International Master', color: '#FF8C00' },
  { min: 2100, name: 'Master', color: '#FF8C00' },
  { min: 1900, name: 'Candidate Master', color: '#AA00AA' },
  { min: 1600, name: 'Expert', color: '#0000FF' },
  { min: 1400, name: 'Specialist', color: '#03A89E' },
  { min: 1200, name: 'Pupil', color: '#008000' },
  { min: -Infinity, name: 'Newbie', color: '#808080' },
];

export function rankColor(rating) {
  const r = Number(rating) || 0;
  for (const tier of TIERS) {
    if (r >= tier.min) return tier.color;
  }
  return '#808080';
}

export function rankFromRating(rating) {
  const r = Number(rating) || 0;
  for (const tier of TIERS) {
    if (r >= tier.min) return tier.name;
  }
  return 'Unrated';
}
