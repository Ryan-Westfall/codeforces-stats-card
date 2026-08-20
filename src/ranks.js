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

// Problem-rating range boundaries aligned to Codeforces rank thresholds.
const RATING_BOUNDARIES = [1000, 1200, 1400, 1600, 1900, 2100, 2300, 2400, 2600, 3000];

// Return five numeric rating ranges centered on the user's current rating.
// Boundaries follow the rank thresholds, and the window's lowest range is an
// unbounded "< X" and the highest an unbounded "X+", so every solved problem
// lands somewhere. Each range is colored by the rank tier of its lower bound.
export function ratingBuckets(rating) {
  const B = RATING_BOUNDARIES;
  const r = Number(rating) || 0;

  // Find p so that B[p] <= r < B[p+1] (the lower of the centered pair),
  // then clamp so the four cut points A < Bc < Cc < D all exist.
  let p = 0;
  while (p < B.length - 1 && r >= B[p + 1]) p++;
  p = Math.max(1, Math.min(p, B.length - 3));
  const A = B[p - 1];
  const Bc = B[p];
  const Cc = B[p + 1];
  const D = B[p + 2];

  const raw = [
    { label: `< ${A}`, min: -Infinity, max: A - 1 },
    { label: `${A}–${Bc}`, min: A, max: Bc - 1 },
    { label: `${Bc}–${Cc}`, min: Bc, max: Cc - 1 },
    { label: `${Cc}–${D}`, min: Cc, max: D - 1 },
    { label: `${D}+`, min: D, max: Infinity },
  ];
  return raw.map((x) => ({
    ...x,
    color: rankColor(Number.isFinite(x.min) ? x.min : x.max),
  }));
}
