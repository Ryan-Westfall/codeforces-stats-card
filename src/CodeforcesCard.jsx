import { useEffect, useMemo, useState } from 'react';
import { injectStyles } from './styles.js';
import { rankColor, rankFromRating, ratingBuckets } from './ranks.js';

const API = 'https://codeforces.com/api';

async function fetchJSON(url, signal) {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Codeforces API error ${res.status}`);
  const json = await res.json();
  if (json.status !== 'OK') throw new Error(json.comment || 'Codeforces API returned an error');
  return json.result;
}

// Reduce a list of submissions into attempt / solve stats plus the list of
// difficulty ratings for every distinct solved problem (used to build the
// distribution once the user's own rating is known).
function summarize(submissions) {
  const attempted = new Set();
  const solved = new Set();
  const solvedRating = new Map(); // problem key -> problem rating (if any)

  for (const sub of submissions) {
    if (!sub.problem) continue;
    const key = `${sub.problem.contestId || 'x'}-${sub.problem.index}`;
    attempted.add(key);
    if (sub.verdict === 'OK' && !solved.has(key)) {
      solved.add(key);
      if (typeof sub.problem.rating === 'number') solvedRating.set(key, sub.problem.rating);
    }
  }

  return {
    attempted: attempted.size,
    solved: solved.size,
    solvedRatings: [...solvedRating.values()],
  };
}

// Tally solved-problem ratings into the five numeric rating ranges closest to
// the user's current rating.
function distributionFor(rating, solvedRatings) {
  const buckets = ratingBuckets(rating).map((b) => ({ ...b, count: 0 }));
  for (const r of solvedRatings) {
    const bucket = buckets.find((b) => r >= b.min && r <= b.max);
    if (bucket) bucket.count += 1;
  }
  return buckets;
}

/**
 * A self-contained card showing a Codeforces user's problem-solving stats
 * (attempted, solved, a per-rating distribution), contest rating, and
 * contest-rating history graph.
 *
 * @param {object} props
 * @param {string} props.handle            Codeforces handle (required).
 * @param {string} [props.title]           Card title. Default 'Codeforces'.
 * @param {boolean} [props.showRank]       Show the rank name next to the rating. Default true.
 * @param {number} [props.maxSubmissions]  How many recent submissions to scan. Default 10000.
 * @param {string} [props.className]       Extra class names for the root element.
 * @param {React.CSSProperties} [props.style] Inline styles for the root element.
 */
export default function CodeforcesCard({
  handle,
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

        setState({
          status: 'ready',
          info,
          history: history || [],
          stats: summarize(submissions || []),
        });
      } catch (err) {
        if (err.name === 'AbortError') return;
        setState({ status: 'error', error: err.message || 'Failed to load Codeforces data.' });
      }
    })();

    return () => controller.abort();
  }, [handle, maxSubmissions]);

  const rootClass = `cfsc-card ${className}`.trim();
  const profileUrl = `https://codeforces.com/profile/${encodeURIComponent(handle || '')}`;

  if (state.status === 'loading') {
    return (
      <div className={rootClass} style={style}>
        <Header title={title} handle={handle} profileUrl={profileUrl} />
        <div className="cfsc-message">Loading Codeforces stats…</div>
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <div className={rootClass} style={style}>
        <Header title={title} handle={handle} profileUrl={profileUrl} />
        <div className="cfsc-message cfsc-error">{state.error}</div>
      </div>
    );
  }

  const { info, history, stats } = state;
  const rating = info.rating ?? 0;
  const maxRating = info.maxRating ?? rating;
  const rankName = info.rank || rankFromRating(rating);
  const acceptance = stats.attempted ? Math.round((stats.solved / stats.attempted) * 100) : 0;
  const buckets = distributionFor(rating, stats.solvedRatings);

  return (
    <a className={rootClass} style={style} href={profileUrl} target="_blank" rel="noopener noreferrer">
      <Header title={title} handle={info.handle || handle} />

      <div className="cfsc-body">
        {/* Section 1 — Problems attempted */}
        <section className="cfsc-section cfsc-section--attempts">
          <div className="cfsc-stat">
            <span className="cfsc-stat-value">{stats.attempted}</span>
            <span className="cfsc-stat-label">Attempted</span>
          </div>
          <div className="cfsc-stat">
            <span className="cfsc-stat-value">{stats.solved}</span>
            <span className="cfsc-stat-label">Solved</span>
          </div>
          <div className="cfsc-stat">
            <span className="cfsc-stat-value">{acceptance}%</span>
            <span className="cfsc-stat-label">Acceptance</span>
          </div>
        </section>

        {/* Section 2 — Solved problems by rating range */}
        <section className="cfsc-section">
          <div className="cfsc-section-title">Solved by Problem Rating</div>
          <Distribution buckets={buckets} />
        </section>

        {/* Section 3 — Contest rating (current + max) with history graph */}
        <section className="cfsc-section cfsc-section--graph">
          <div className="cfsc-section-title">Contest Rating</div>
          <div className="cfsc-rating-grid">
            <div className="cfsc-stat">
              <span className="cfsc-stat-value">{rating}</span>
              <span className="cfsc-stat-label">
                Current
                {showRank && (
                  <>
                    {' · '}
                    <span style={{ color: rankColor(rating) }}>{rankName}</span>
                  </>
                )}
              </span>
            </div>
            <div className="cfsc-stat">
              <span className="cfsc-stat-value">{maxRating}</span>
              <span className="cfsc-stat-label">Max</span>
            </div>
          </div>
          <RatingGraph history={history} />
        </section>
      </div>
    </a>
  );
}

function Distribution({ buckets }) {
  const max = Math.max(1, ...buckets.map((b) => b.count));
  const total = buckets.reduce((sum, b) => sum + b.count, 0);

  if (total === 0) {
    return <div className="cfsc-dist-empty">No rated problems solved yet.</div>;
  }

  return (
    <div className="cfsc-dist">
      {buckets.map((b) => (
        <div className="cfsc-dist-row" key={b.label}>
          <span className="cfsc-dist-label" title={b.label} style={{ color: b.color }}>{b.label}</span>
          <span className="cfsc-dist-track">
            <span
              className="cfsc-dist-fill"
              style={{ width: `${(b.count / max) * 100}%`, background: b.color }}
            />
          </span>
          <span className="cfsc-dist-count">{b.count}</span>
        </div>
      ))}
    </div>
  );
}

function Header({ title, handle, profileUrl }) {
  const content = (
    <div className="cfsc-header">
      <span className="cfsc-title">
        <CodeforcesLogo />
        {title}
      </span>
      {handle && <span className="cfsc-handle">{handle}</span>}
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

function RatingGraph({ history }) {
  const W = 400;
  const H = 150;
  const PAD = { top: 10, right: 8, bottom: 10, left: 8 };
  const [hover, setHover] = useState(null);

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

    // Each contest carries its rating change ("vector") vs. the previous one.
    const points = history.map((h, i) => ({
      x: x(i),
      y: y(h.newRating),
      r: h.newRating,
      delta: i === 0 ? 0 : h.newRating - history[i - 1].newRating,
    }));
    const line = points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
    const baseY = PAD.top + innerH;
    const area = `${points[0].x.toFixed(1)},${baseY.toFixed(1)} ${line} ${points[points.length - 1].x.toFixed(1)},${baseY.toFixed(1)}`;

    // Y-axis ticks (rating labels), positioned as a % of the svg height so the
    // HTML overlay lines up with the stretched svg.
    const step = Math.max(100, Math.ceil((range / 4) / 100) * 100);
    const ticks = [];
    for (let v = lo; v <= hi; v += step) {
      ticks.push({ value: v, top: (y(v) / H) * 100 });
    }

    return { lo, hi, points, line, area, y, baseY, ticks };
  }, [history]);

  if (!model) {
    return <div className="cfsc-graph-empty">No rated contests yet.</div>;
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
      <div className="cfsc-graph-plot">
        <div className="cfsc-graph-axis" aria-hidden="true">
          {model.ticks.map((t) => (
            <span key={t.value} style={{ top: `${t.top}%` }}>{t.value}</span>
          ))}
        </div>
        <div className="cfsc-graph-svg-wrap">
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
            <rect key={i} x={0} y={yTop} width={W} height={Math.max(0, yBottom - yTop)} fill={b.color} opacity="0.28" />
          );
        })}

        {/* Area under the curve */}
        <polygon points={model.area} fill="url(#cfsc-area)" />

        {/* Per-contest markers: a vertical stem down to the baseline for each
            competition, so every contest shows as its own "vector". */}
        {model.points.map((p, i) => (
          <line
            key={`stem-${i}`}
            x1={p.x}
            y1={p.y}
            x2={p.x}
            y2={model.baseY}
            stroke={rankColor(p.r)}
            strokeWidth="1"
            strokeOpacity="0.28"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {/* Rating line — non-scaling stroke stays crisp when the svg is stretched */}
        <polyline
          points={model.line}
          fill="none"
          stroke="var(--cfsc-line)"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* Per-contest points, colored by the rating tier reached */}
        {model.points.map((p, i) => (
          <circle
            key={`pt-${i}`}
            cx={p.x}
            cy={p.y}
            r={hover === i ? '5' : '3.4'}
            fill={rankColor(p.r)}
            stroke="#fff"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {/* Transparent, larger hit targets for easier hovering */}
        {model.points.map((p, i) => (
          <circle
            key={`hit-${i}`}
            cx={p.x}
            cy={p.y}
            r="9"
            fill="transparent"
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover((h) => (h === i ? null : h))}
          />
        ))}
        </svg>

        {hover != null && history[hover] && (
          <ContestTooltip
            entry={history[hover]}
            delta={model.points[hover].delta}
            leftPct={(model.points[hover].x / W) * 100}
            topPct={(model.points[hover].y / H) * 100}
          />
        )}
        </div>
      </div>

      <div className="cfsc-graph-labels">
        <span>{formatDate(first.ratingUpdateTimeSeconds)}</span>
        <span className="cfsc-graph-contests">{history.length} contests</span>
        <span>{formatDate(last.ratingUpdateTimeSeconds)}</span>
      </div>
    </div>
  );
}

function ContestTooltip({ entry, leftPct, topPct }) {
  const delta = entry.newRating - entry.oldRating;
  const up = delta >= 0;
  // Flip the tooltip below the point when near the top, and anchor its
  // horizontal edge inward near the left/right of the plot.
  const below = topPct < 38;
  const anchorX = leftPct < 22 ? 'left' : leftPct > 78 ? 'right' : 'center';
  const tx = anchorX === 'left' ? '0' : anchorX === 'right' ? '-100%' : '-50%';
  const ty = below ? '12px' : 'calc(-100% - 12px)';

  return (
    <div
      className="cfsc-tip"
      style={{ left: `${leftPct}%`, top: `${topPct}%`, transform: `translate(${tx}, ${ty})` }}
    >
      <div className="cfsc-tip-title">{entry.contestName}</div>
      <div className="cfsc-tip-row">
        <span>Rating</span>
        <span>
          {entry.oldRating} → <strong style={{ color: rankColor(entry.newRating) }}>{entry.newRating}</strong>{' '}
          <span className={up ? 'cfsc-tip-up' : 'cfsc-tip-down'}>({up ? '+' : ''}{delta})</span>
        </span>
      </div>
      <div className="cfsc-tip-row">
        <span>Rank</span>
        <span>#{entry.rank}</span>
      </div>
      <div className="cfsc-tip-row">
        <span>Date</span>
        <span>{formatFullDate(entry.ratingUpdateTimeSeconds)}</span>
      </div>
    </div>
  );
}

function formatDate(seconds) {
  if (!seconds) return '';
  const d = new Date(seconds * 1000);
  return d.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
}

function formatFullDate(seconds) {
  if (!seconds) return '';
  const d = new Date(seconds * 1000);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}
