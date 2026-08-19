import React, { useEffect, useMemo, useState } from 'react';
import { injectStyles } from './styles.js';
import { rankColor, rankFromRating } from './ranks.js';

const API = 'https://codeforces.com/api';

async function fetchJSON(url, signal) {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Codeforces API error ${res.status}`);
  const json = await res.json();
  if (json.status !== 'OK') throw new Error(json.comment || 'Codeforces API returned an error');
  return json.result;
}

/**
 * A self-contained card showing a Codeforces user's total solved problems
 * and their contest-rating history graph.
 *
 * @param {object} props
 * @param {string} props.handle            Codeforces handle (required).
 * @param {'light'|'dark'} [props.theme]   Color theme. Default 'light'.
 * @param {string} [props.title]           Card title. Default 'Codeforces'.
 * @param {boolean} [props.showRank]       Show the rank badge + max rating. Default true.
 * @param {number} [props.maxSubmissions]  How many recent submissions to scan when
 *                                         counting solved problems. Default 10000.
 * @param {string} [props.className]       Extra class names for the root element.
 * @param {React.CSSProperties} [props.style] Inline styles for the root element.
 */
export default function CodeforcesCard({
  handle,
  theme = 'light',
  title = 'Codeforces',
  showRank = true,
  maxSubmissions = 10000,
  className = '',
  style,
}) {
  const [state, setState] = useState({ status: 'loading' });

  useEffect(() => {
    injectStyles();
  }, []);

  useEffect(() => {
    if (!handle) {
      setState({ status: 'error', error: 'No Codeforces handle provided.' });
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;
    setState({ status: 'loading' });

    (async () => {
      try {
        const [infoArr, history, submissions] = await Promise.all([
          fetchJSON(`${API}/user.info?handles=${encodeURIComponent(handle)}`, signal),
          fetchJSON(`${API}/user.rating?handle=${encodeURIComponent(handle)}`, signal).catch(() => []),
          fetchJSON(
            `${API}/user.status?handle=${encodeURIComponent(handle)}&from=1&count=${maxSubmissions}`,
            signal
          ).catch(() => []),
        ]);

        const info = infoArr && infoArr[0];
        if (!info) throw new Error(`Handle "${handle}" not found.`);

        const solvedSet = new Set();
        for (const sub of submissions) {
          if (sub.verdict === 'OK' && sub.problem) {
            solvedSet.add(`${sub.problem.contestId || 'x'}-${sub.problem.index}`);
          }
        }

        setState({
          status: 'ready',
          info,
          history: history || [],
          solved: solvedSet.size,
        });
      } catch (err) {
        if (err.name === 'AbortError') return;
        setState({ status: 'error', error: err.message || 'Failed to load Codeforces data.' });
      }
    })();

    return () => controller.abort();
  }, [handle, maxSubmissions]);

  const rootClass = `cfsc-card cfsc-theme-${theme} ${className}`.trim();
  const profileUrl = `https://codeforces.com/profile/${encodeURIComponent(handle || '')}`;

  if (state.status === 'loading') {
    return (
      <div className={rootClass} style={style}>
        <Header title={title} profileUrl={profileUrl} />
        <div className="cfsc-message">Loading Codeforces stats…</div>
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <div className={rootClass} style={style}>
        <Header title={title} profileUrl={profileUrl} />
        <div className="cfsc-message cfsc-error">{state.error}</div>
      </div>
    );
  }

  const { info, history, solved } = state;
  const rating = info.rating ?? 0;
  const maxRating = info.maxRating ?? rating;
  const rankName = info.rank || rankFromRating(rating);

  return (
    <a className={rootClass} style={style} href={profileUrl} target="_blank" rel="noopener noreferrer">
      <Header title={title} />

      <div className="cfsc-solved">
        <span className="cfsc-solved-value">{solved}</span>
        <span className="cfsc-solved-label">Problems Solved</span>
      </div>

      <div className="cfsc-rating-row">
        <div className="cfsc-rating-block">
          <span className="cfsc-rating-value" style={{ color: rankColor(rating) }}>
            {rating}
          </span>
          <span className="cfsc-rating-caption">Contest Rating</span>
        </div>
        {showRank && (
          <div className="cfsc-rank-block">
            <span className="cfsc-rank-badge" style={{ color: rankColor(rating) }}>
              {rankName}
            </span>
            <span className="cfsc-max-rating">
              Max <strong style={{ color: rankColor(maxRating) }}>{maxRating}</strong>
            </span>
          </div>
        )}
      </div>

      <RatingGraph history={history} currentRating={rating} />
    </a>
  );
}

function Header({ title, profileUrl }) {
  const content = (
    <div className="cfsc-header">
      <span className="cfsc-title">
        <CodeforcesLogo />
        {title}
      </span>
      <span className="cfsc-arrow" aria-hidden="true">→</span>
    </div>
  );
  if (profileUrl) {
    return (
      <a className="cfsc-header-link" href={profileUrl} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return content;
}

function CodeforcesLogo() {
  // Codeforces mark: three ascending bars (blue, yellow, red).
  return (
    <svg className="cfsc-logo" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="1" y="9" width="6" height="12" rx="1.5" fill="#3B5998" />
      <rect x="9" y="4" width="6" height="17" rx="1.5" fill="#FFCC00" />
      <rect x="17" y="9" width="6" height="12" rx="1.5" fill="#E43E3E" />
    </svg>
  );
}

function RatingGraph({ history, currentRating }) {
  const W = 400;
  const H = 130;
  const PAD = { top: 8, right: 8, bottom: 8, left: 8 };

  const model = useMemo(() => {
    if (!history || history.length === 0) return null;
    const ratings = history.map((h) => h.newRating);
    const dataMin = Math.min(...ratings);
    const dataMax = Math.max(...ratings);
    // Pad the visible range so points don't sit on the edges.
    const lo = Math.floor((dataMin - 100) / 100) * 100;
    const hi = Math.ceil((dataMax + 100) / 100) * 100;
    const range = hi - lo || 1;

    const innerW = W - PAD.left - PAD.right;
    const innerH = H - PAD.top - PAD.bottom;

    const x = (i) =>
      PAD.left + (history.length === 1 ? innerW / 2 : (i / (history.length - 1)) * innerW);
    const y = (r) => PAD.top + innerH - ((r - lo) / range) * innerH;

    const points = history.map((h, i) => ({ x: x(i), y: y(h.newRating), r: h.newRating, h }));
    const line = points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
    const area = `${PAD.left + 0},${(PAD.top + innerH).toFixed(1)} ${line} ${points[points.length - 1].x.toFixed(1)},${(PAD.top + innerH).toFixed(1)}`;

    return { lo, hi, points, line, area, innerH, y };
  }, [history]);

  if (!model) {
    return (
      <div className="cfsc-graph-wrap">
        <div className="cfsc-graph-empty">No rated contests yet.</div>
      </div>
    );
  }

  // Rating-tier bands (Codeforces colors) clipped to the visible range.
  const bands = [
    { from: 0, to: 1200, color: '#cccccc' },
    { from: 1200, to: 1400, color: '#77ff77' },
    { from: 1400, to: 1600, color: '#77ddbb' },
    { from: 1600, to: 1900, color: '#aaaaff' },
    { from: 1900, to: 2100, color: '#ff88ff' },
    { from: 2100, to: 2400, color: '#ffcc88' },
    { from: 2400, to: 4000, color: '#ff7777' },
  ];

  const first = history[0];
  const last = history[history.length - 1];

  return (
    <div className="cfsc-graph-wrap">
      <svg
        className="cfsc-graph"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        role="img"
        aria-label="Codeforces contest rating history"
      >
        <defs>
          <linearGradient id="cfsc-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--cfsc-line)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--cfsc-line)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Tier bands */}
        {bands.map((b, i) => {
          const top = Math.min(model.hi, b.to);
          const bottom = Math.max(model.lo, b.from);
          if (top <= bottom) return null;
          const yTop = model.y(top);
          const yBottom = model.y(bottom);
          return (
            <rect
              key={i}
              x={0}
              y={yTop}
              width={W}
              height={Math.max(0, yBottom - yTop)}
              fill={b.color}
              opacity="0.28"
            />
          );
        })}

        {/* Area under the curve */}
        <polygon points={model.area} fill="url(#cfsc-area)" />

        {/* Rating line */}
        <polyline points={model.line} fill="none" stroke="var(--cfsc-line)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />

        {/* Points */}
        {model.points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="2.6" fill={rankColor(p.r)} stroke="#fff" strokeWidth="1" />
        ))}
      </svg>

      <div className="cfsc-graph-labels">
        <span>{formatDate(first.ratingUpdateTimeSeconds)}</span>
        <span className="cfsc-graph-contests">{history.length} contests</span>
        <span>{formatDate(last.ratingUpdateTimeSeconds)}</span>
      </div>
    </div>
  );
}

function formatDate(seconds) {
  if (!seconds) return '';
  const d = new Date(seconds * 1000);
  return d.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
}
