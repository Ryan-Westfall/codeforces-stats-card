// Self-injecting styles so the component is truly drop-in: consumers don't
// need to import a separate CSS file. Injected once, guarded for SSR.
const STYLE_ID = 'cfsc-styles';

const CSS = `
.cfsc-card {
  --cfsc-bg: #ffffff;
  --cfsc-fg: #1a1a1a;
  --cfsc-muted: #6c757d;
  --cfsc-border: #e9ecef;
  --cfsc-surface: #f5f6f8;
  --cfsc-track: #e9ecef;
  --cfsc-line: #1976d2;
  --cfsc-shadow: rgba(0, 0, 0, 0.06);
  --cfsc-shadow-hover: rgba(0, 0, 0, 0.12);

  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  background: var(--cfsc-bg);
  color: var(--cfsc-fg);
  border: 1px solid var(--cfsc-border);
  border-radius: 12px;
  padding: 1.75rem;
  text-decoration: none;
  box-shadow: 0 2px 8px var(--cfsc-shadow);
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}
.cfsc-card * { box-sizing: border-box; }

a.cfsc-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px var(--cfsc-shadow-hover);
  border-color: #dee2e6;
}

/* Header */
.cfsc-header-link { text-decoration: none; color: inherit; display: block; }
.cfsc-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.6rem;
}
.cfsc-title {
  display: inline-flex;
  align-items: baseline;
  gap: 0.55rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--cfsc-fg);
}
.cfsc-title .cfsc-logo { align-self: center; }
.cfsc-handle { font-size: 0.95rem; font-weight: 500; color: var(--cfsc-muted); }
.cfsc-logo { display: block; flex: 0 0 auto; }
.cfsc-arrow { font-size: 1.35rem; color: var(--cfsc-muted); transition: transform 0.25s ease, color 0.25s ease; }
a.cfsc-card:hover .cfsc-arrow { transform: translateX(4px); color: var(--cfsc-fg); }

/* Body: sections spread to fill the card height */
.cfsc-body {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  gap: 1.25rem;
}
.cfsc-section { display: flex; flex-direction: column; gap: 0.95rem; }
.cfsc-section + .cfsc-section { padding-top: 1.25rem; border-top: 1px solid var(--cfsc-border); }
.cfsc-section-title {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--cfsc-muted);
}

/* Section 1 — attempt stats */
.cfsc-section--attempts { flex-direction: row; justify-content: space-between; text-align: center; }
.cfsc-stat { display: flex; flex-direction: column; gap: 0.15rem; flex: 1; }
.cfsc-stat-value { font-size: 2rem; font-weight: 800; line-height: 1; color: var(--cfsc-fg); }
.cfsc-stat-label {
  font-size: 0.72rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--cfsc-muted);
}

/* Section 2 — solved-by-rating distribution */
.cfsc-dist { display: flex; flex-direction: column; gap: 0.5rem; }
.cfsc-dist-row { display: flex; align-items: center; gap: 0.6rem; }
.cfsc-dist-label {
  flex: 0 0 5.5rem;
  font-size: 0.78rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  color: var(--cfsc-fg);
}
.cfsc-dist-track {
  flex: 1 1 auto;
  height: 10px;
  background: var(--cfsc-track);
  border-radius: 999px;
  overflow: hidden;
}
.cfsc-dist-fill {
  display: block;
  height: 100%;
  min-width: 2px;
  border-radius: 999px;
  transition: width 0.4s ease;
}
.cfsc-dist-count {
  flex: 0 0 2rem;
  text-align: right;
  font-size: 0.85rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--cfsc-fg);
}
.cfsc-dist-empty { font-size: 0.85rem; color: var(--cfsc-muted); }

/* Section 3 — contest rating (current + max, no surface box) */
.cfsc-rating-grid { display: flex; justify-content: space-between; text-align: center; gap: 1rem; }
.cfsc-rating-grid .cfsc-stat-label { text-transform: capitalize; }

/* Section 4 — rating history graph (grows to fill remaining height) */
.cfsc-section--graph { flex: 1 1 auto; min-height: 150px; }
.cfsc-graph-wrap { display: flex; flex-direction: column; flex: 1 1 auto; }
.cfsc-graph-plot { display: flex; flex: 1 1 auto; min-height: 130px; }
.cfsc-graph-axis { position: relative; flex: 0 0 2.3rem; }
.cfsc-graph-axis span {
  position: absolute;
  right: 0.4rem;
  transform: translateY(-50%);
  font-size: 0.62rem;
  color: var(--cfsc-muted);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.cfsc-graph-svg-wrap { position: relative; flex: 1 1 auto; min-height: 130px; display: flex; }
.cfsc-graph {
  display: block;
  flex: 1 1 auto;
  min-height: 130px;
  background: var(--cfsc-surface);
  border-radius: 8px;
}

/* Per-contest hover tooltip */
.cfsc-tip {
  position: absolute;
  z-index: 5;
  min-width: 11rem;
  max-width: 15rem;
  padding: 0.55rem 0.7rem;
  background: var(--cfsc-bg);
  color: var(--cfsc-fg);
  border: 1px solid var(--cfsc-border);
  border-radius: 8px;
  box-shadow: 0 6px 18px var(--cfsc-shadow-hover);
  pointer-events: none;
  font-size: 0.75rem;
  line-height: 1.35;
}
.cfsc-tip-title {
  font-weight: 700;
  font-size: 0.78rem;
  margin-bottom: 0.35rem;
  white-space: normal;
}
.cfsc-tip-row { display: flex; justify-content: space-between; gap: 0.75rem; }
.cfsc-tip-row > span:first-child { color: var(--cfsc-muted); }
.cfsc-tip-row > span:last-child { font-variant-numeric: tabular-nums; text-align: right; }
.cfsc-tip-up { color: #2fa14e; font-weight: 700; }
.cfsc-tip-down { color: #d64545; font-weight: 700; }
.cfsc-graph-empty, .cfsc-graph-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.72rem;
  color: var(--cfsc-muted);
  margin-top: 0.5rem;
}
.cfsc-graph-labels { padding-left: 2.3rem; }
.cfsc-graph-empty { justify-content: center; padding: 2rem 0; }
.cfsc-graph-contests { opacity: 0.85; }

.cfsc-message { text-align: center; padding: 2.5rem 1rem; color: var(--cfsc-muted); }
.cfsc-error { color: #d64545; }
`;

export function injectStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;
  const el = document.createElement('style');
  el.id = STYLE_ID;
  el.textContent = CSS;
  document.head.appendChild(el);
}
