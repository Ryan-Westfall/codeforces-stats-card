import { expect, test, describe } from 'bun:test';
import { rankColor, rankFromRating } from '../src/ranks.js';

describe('rankFromRating', () => {
  test('maps ratings to Codeforces tier names', () => {
    expect(rankFromRating(0)).toBe('Newbie');
    expect(rankFromRating(1199)).toBe('Newbie');
    expect(rankFromRating(1200)).toBe('Pupil');
    expect(rankFromRating(1400)).toBe('Specialist');
    expect(rankFromRating(1600)).toBe('Expert');
    expect(rankFromRating(1900)).toBe('Candidate Master');
    expect(rankFromRating(2100)).toBe('Master');
    expect(rankFromRating(2300)).toBe('International Master');
    expect(rankFromRating(2400)).toBe('Grandmaster');
    expect(rankFromRating(3000)).toBe('Legendary Grandmaster');
  });

  test('handles non-numeric input', () => {
    expect(rankFromRating(undefined)).toBe('Newbie');
    expect(rankFromRating(null)).toBe('Newbie');
  });
});

describe('rankColor', () => {
  test('returns tier colors', () => {
    expect(rankColor(1199)).toBe('#808080'); // newbie gray
    expect(rankColor(1300)).toBe('#008000'); // pupil green
    expect(rankColor(1500)).toBe('#03A89E'); // specialist cyan
    expect(rankColor(1700)).toBe('#0000FF'); // expert blue
    expect(rankColor(2000)).toBe('#AA00AA'); // candidate master purple
    expect(rankColor(2500)).toBe('#FF0000'); // grandmaster red
  });
});

describe('built ESM bundle', () => {
  test('exposes exports', async () => {
    const mod = await import('../dist/codeforces-stats-card.js');
    expect(typeof mod.default).toBe('function');
    expect(typeof mod.CodeforcesCard).toBe('function');
    expect(typeof mod.rankColor).toBe('function');
    expect(typeof mod.rankFromRating).toBe('function');
    expect(mod.rankColor(1300)).toBe('#008000');
  });
});
