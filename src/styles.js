// Self-injecting styles so the component is truly drop-in: consumers don't
// need to import a separate CSS file. Injected once, guarded for SSR.
const STYLE_ID = 'cfsc-styles';

const CSS = `
.cfsc-card {
  --cfsc-bg: #ffffff;
  --cfsc-fg: #1a1a1a;
  --cfsc-muted: #6c757d;
  --cfsc-border: #e9ecef;
  --cfsc-surface: #f8f9fa;
  --cfsc-line: #1976d2;
  --cfsc-shadow: rgba(0, 0, 0, 0.06);
  --cfsc-shadow-hover: rgba(0, 0, 0, 0.12);

  display: block;
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

.cfsc-theme-dark {
  --cfsc-bg: #1e1e24;
  --cfsc-fg: #f5f5f7;
  --cfsc-muted: #9aa0a6;
  --cfsc-border: #2f2f38;
  --cfsc-surface: #26262e;
  --cfsc-line: #4da3ff;
  --cfsc-shadow: rgba(0, 0, 0, 0.4);
  --cfsc-shadow-hover: rgba(0, 0, 0, 0.55);
}

.cfsc-header-link { text-decoration: none; color: inherit; display: block; }
.cfsc-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}
.cfsc-title {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--cfsc-fg);
}
.cfsc-logo { display: block; flex: 0 0 auto; }
.cfsc-arrow { font-size: 1.35rem; color: var(--cfsc-muted); transition: transform 0.25s ease, color 0.25s ease; }
a.cfsc-card:hover .cfsc-arrow { transform: translateX(4px); color: var(--cfsc-fg); }

.cfsc-solved { text-align: center; margin-bottom: 1.25rem; }
.cfsc-solved-value {
  display: block;
  font-size: 3rem;
  font-weight: 800;
  line-height: 1;
  color: var(--cfsc-fg);
}
.cfsc-solved-label {
  display: block;
  margin-top: 0.35rem;
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--cfsc-muted);
}

.cfsc-rating-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 1rem;
  background: var(--cfsc-surface);
  border-radius: 10px;
  margin-bottom: 1.1rem;
}
.cfsc-rating-block { display: flex; flex-direction: column; }
.cfsc-rating-value { font-size: 1.6rem; font-weight: 800; line-height: 1.1; }
.cfsc-rating-caption { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--cfsc-muted); }
.cfsc-rank-block { display: flex; flex-direction: column; align-items: flex-end; gap: 0.2rem; }
.cfsc-rank-badge { font-weight: 700; font-size: 0.95rem; }
.cfsc-max-rating { font-size: 0.78rem; color: var(--cfsc-muted); }

.cfsc-graph-wrap { margin-top: 0.25rem; }
.cfsc-graph {
  display: block;
  width: 100%;
  height: 130px;
  background: var(--cfsc-surface);
  border-radius: 8px;
}
.cfsc-graph-empty, .cfsc-graph-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.72rem;
  color: var(--cfsc-muted);
  margin-top: 0.5rem;
}
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
