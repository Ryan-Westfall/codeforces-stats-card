import { jsxs as n, jsx as t, Fragment as L } from "react/jsx-runtime";
import { useState as B, useEffect as A, useMemo as W } from "react";
const j = "cfsc-styles", O = `
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
.cfsc-graph-wrap { display: flex; flex-direction: column; flex: 1 1 auto; min-width: 0; }
.cfsc-graph-plot { display: flex; flex: 1 1 auto; min-height: 130px; min-width: 0; }
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
.cfsc-graph-svg-wrap { position: relative; flex: 1 1 auto; min-height: 130px; min-width: 0; display: flex; }
.cfsc-graph {
  display: block;
  flex: 1 1 auto;
  width: 100%;
  min-width: 0;
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
function T() {
  if (typeof document > "u" || document.getElementById(j)) return;
  const e = document.createElement("style");
  e.id = j, e.textContent = O, document.head.appendChild(e);
}
const U = [
  { min: 3e3, name: "Legendary Grandmaster", color: "#FF0000" },
  { min: 2600, name: "International Grandmaster", color: "#FF0000" },
  { min: 2400, name: "Grandmaster", color: "#FF0000" },
  { min: 2300, name: "International Master", color: "#FF8C00" },
  { min: 2100, name: "Master", color: "#FF8C00" },
  { min: 1900, name: "Candidate Master", color: "#AA00AA" },
  { min: 1600, name: "Expert", color: "#0000FF" },
  { min: 1400, name: "Specialist", color: "#03A89E" },
  { min: 1200, name: "Pupil", color: "#008000" },
  { min: -1 / 0, name: "Newbie", color: "#808080" }
];
function k(e) {
  const s = Number(e) || 0;
  for (const a of U)
    if (s >= a.min) return a.color;
  return "#808080";
}
function P(e) {
  const s = Number(e) || 0;
  for (const a of U)
    if (s >= a.min) return a.name;
  return "Unrated";
}
const G = [1e3, 1200, 1400, 1600, 1900, 2100, 2300, 2400, 2600, 3e3];
function Y(e) {
  const s = G, a = Number(e) || 0;
  let c = 0;
  for (; c < s.length - 1 && a >= s[c + 1]; ) c++;
  c = Math.max(1, Math.min(c, s.length - 3));
  const r = s[c - 1], l = s[c], o = s[c + 1], p = s[c + 2];
  return [
    { label: `< ${r}`, min: -1 / 0, max: r - 1 },
    { label: `${r}–${l}`, min: r, max: l - 1 },
    { label: `${l}–${o}`, min: l, max: o - 1 },
    { label: `${o}–${p}`, min: o, max: p - 1 },
    { label: `${p}+`, min: p, max: 1 / 0 }
  ].map((g) => ({
    ...g,
    color: k(Number.isFinite(g.min) ? g.min : g.max)
  }));
}
const S = "https://codeforces.com/api";
async function z(e, s) {
  const a = await fetch(e, { signal: s });
  if (!a.ok) throw new Error(`Codeforces API error ${a.status}`);
  const c = await a.json();
  if (c.status !== "OK") throw new Error(c.comment || "Codeforces API returned an error");
  return c.result;
}
function _(e) {
  const s = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set(), c = /* @__PURE__ */ new Map();
  for (const r of e) {
    if (!r.problem) continue;
    const l = `${r.problem.contestId || "x"}-${r.problem.index}`;
    s.add(l), r.verdict === "OK" && !a.has(l) && (a.add(l), typeof r.problem.rating == "number" && c.set(l, r.problem.rating));
  }
  return {
    attempted: s.size,
    solved: a.size,
    solvedRatings: [...c.values()]
  };
}
function K(e, s) {
  const a = Y(e).map((c) => ({ ...c, count: 0 }));
  for (const c of s) {
    const r = a.find((l) => c >= l.min && c <= l.max);
    r && (r.count += 1);
  }
  return a;
}
function te({
  handle: e,
  title: s = "Codeforces",
  showRank: a = !0,
  maxSubmissions: c = 1e4,
  className: r = "",
  style: l
}) {
  const [o, p] = B({ status: "loading" });
  A(() => {
    T();
  }, []), A(() => {
    if (!e) {
      p({ status: "error", error: "No Codeforces handle provided." });
      return;
    }
    const C = new AbortController(), { signal: b } = C;
    return p({ status: "loading" }), (async () => {
      try {
        const [u, R, N] = await Promise.all([
          z(`${S}/user.info?handles=${encodeURIComponent(e)}`, b),
          z(`${S}/user.rating?handle=${encodeURIComponent(e)}`, b).catch(() => []),
          z(
            `${S}/user.status?handle=${encodeURIComponent(e)}&from=1&count=${c}`,
            b
          ).catch(() => [])
        ]), F = u && u[0];
        if (!F) throw new Error(`Handle "${e}" not found.`);
        p({
          status: "ready",
          info: F,
          history: R || [],
          stats: _(N || [])
        });
      } catch (u) {
        if (u.name === "AbortError") return;
        p({ status: "error", error: u.message || "Failed to load Codeforces data." });
      }
    })(), () => C.abort();
  }, [e, c]);
  const x = `cfsc-card ${r}`.trim(), g = `https://codeforces.com/profile/${encodeURIComponent(e || "")}`;
  if (o.status === "loading")
    return /* @__PURE__ */ n("div", { className: x, style: l, children: [
      /* @__PURE__ */ t(E, { title: s, handle: e, profileUrl: g }),
      /* @__PURE__ */ t("div", { className: "cfsc-message", children: "Loading Codeforces stats…" })
    ] });
  if (o.status === "error")
    return /* @__PURE__ */ n("div", { className: x, style: l, children: [
      /* @__PURE__ */ t(E, { title: s, handle: e, profileUrl: g }),
      /* @__PURE__ */ t("div", { className: "cfsc-message cfsc-error", children: o.error })
    ] });
  const { info: i, history: d, stats: m } = o, h = i.rating ?? 0, v = i.maxRating ?? h, w = i.rank || P(h), $ = m.attempted ? Math.round(m.solved / m.attempted * 100) : 0, y = K(h, m.solvedRatings);
  return /* @__PURE__ */ n("a", { className: x, style: l, href: g, target: "_blank", rel: "noopener noreferrer", children: [
    /* @__PURE__ */ t(E, { title: s, handle: i.handle || e }),
    /* @__PURE__ */ n("div", { className: "cfsc-body", children: [
      /* @__PURE__ */ n("section", { className: "cfsc-section cfsc-section--attempts", children: [
        /* @__PURE__ */ n("div", { className: "cfsc-stat", children: [
          /* @__PURE__ */ t("span", { className: "cfsc-stat-value", children: m.attempted }),
          /* @__PURE__ */ t("span", { className: "cfsc-stat-label", children: "Attempted" })
        ] }),
        /* @__PURE__ */ n("div", { className: "cfsc-stat", children: [
          /* @__PURE__ */ t("span", { className: "cfsc-stat-value", children: m.solved }),
          /* @__PURE__ */ t("span", { className: "cfsc-stat-label", children: "Solved" })
        ] }),
        /* @__PURE__ */ n("div", { className: "cfsc-stat", children: [
          /* @__PURE__ */ n("span", { className: "cfsc-stat-value", children: [
            $,
            "%"
          ] }),
          /* @__PURE__ */ t("span", { className: "cfsc-stat-label", children: "Acceptance" })
        ] })
      ] }),
      /* @__PURE__ */ n("section", { className: "cfsc-section", children: [
        /* @__PURE__ */ t("div", { className: "cfsc-section-title", children: "Solved by Problem Rating" }),
        /* @__PURE__ */ t(X, { buckets: y })
      ] }),
      /* @__PURE__ */ n("section", { className: "cfsc-section cfsc-section--graph", children: [
        /* @__PURE__ */ t("div", { className: "cfsc-section-title", children: "Contest Rating" }),
        /* @__PURE__ */ n("div", { className: "cfsc-rating-grid", children: [
          /* @__PURE__ */ n("div", { className: "cfsc-stat", children: [
            /* @__PURE__ */ t("span", { className: "cfsc-stat-value", children: h }),
            /* @__PURE__ */ n("span", { className: "cfsc-stat-label", children: [
              "Current",
              a && /* @__PURE__ */ n(L, { children: [
                " · ",
                /* @__PURE__ */ t("span", { style: { color: k(h) }, children: w })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ n("div", { className: "cfsc-stat", children: [
            /* @__PURE__ */ t("span", { className: "cfsc-stat-value", children: v }),
            /* @__PURE__ */ t("span", { className: "cfsc-stat-label", children: "Max" })
          ] })
        ] }),
        /* @__PURE__ */ t(q, { history: d })
      ] })
    ] })
  ] });
}
function X({ buckets: e }) {
  const s = Math.max(1, ...e.map((c) => c.count));
  return e.reduce((c, r) => c + r.count, 0) === 0 ? /* @__PURE__ */ t("div", { className: "cfsc-dist-empty", children: "No rated problems solved yet." }) : /* @__PURE__ */ t("div", { className: "cfsc-dist", children: e.map((c) => /* @__PURE__ */ n("div", { className: "cfsc-dist-row", children: [
    /* @__PURE__ */ t("span", { className: "cfsc-dist-label", title: c.label, style: { color: c.color }, children: c.label }),
    /* @__PURE__ */ t("span", { className: "cfsc-dist-track", children: /* @__PURE__ */ t(
      "span",
      {
        className: "cfsc-dist-fill",
        style: { width: `${c.count / s * 100}%`, background: c.color }
      }
    ) }),
    /* @__PURE__ */ t("span", { className: "cfsc-dist-count", children: c.count })
  ] }, c.label)) });
}
function E({ title: e, handle: s, profileUrl: a }) {
  const c = /* @__PURE__ */ n("div", { className: "cfsc-header", children: [
    /* @__PURE__ */ n("span", { className: "cfsc-title", children: [
      /* @__PURE__ */ t(J, {}),
      e
    ] }),
    s && /* @__PURE__ */ t("span", { className: "cfsc-handle", children: s })
  ] });
  return a ? /* @__PURE__ */ t("a", { className: "cfsc-header-link", href: a, target: "_blank", rel: "noopener noreferrer", children: c }) : c;
}
function J() {
  return /* @__PURE__ */ n("svg", { className: "cfsc-logo", width: "20", height: "20", viewBox: "0 0 24 24", "aria-hidden": "true", children: [
    /* @__PURE__ */ t("rect", { x: "1", y: "9", width: "6", height: "12", rx: "1.5", fill: "#3B5998" }),
    /* @__PURE__ */ t("rect", { x: "9", y: "4", width: "6", height: "17", rx: "1.5", fill: "#FFCC00" }),
    /* @__PURE__ */ t("rect", { x: "17", y: "9", width: "6", height: "12", rx: "1.5", fill: "#E43E3E" })
  ] });
}
function q({ history: e }) {
  const c = { top: 10, right: 8, bottom: 10, left: 8 }, [r, l] = B(null), o = W(() => {
    if (!e || e.length === 0) return null;
    const i = e.map((f) => f.newRating), d = Math.min(...i), m = Math.max(...i), h = Math.floor((d - 100) / 100) * 100, v = Math.ceil((m + 100) / 100) * 100, w = v - h || 1, $ = 400 - c.left - c.right, y = 150 - c.top - c.bottom, C = (f) => c.left + (e.length === 1 ? $ / 2 : f / (e.length - 1) * $), b = (f) => c.top + y - (f - h) / w * y, u = e.map((f, M) => ({
      x: C(M),
      y: b(f.newRating),
      r: f.newRating,
      delta: M === 0 ? 0 : f.newRating - e[M - 1].newRating
    })), R = u.map((f) => `${f.x.toFixed(1)},${f.y.toFixed(1)}`).join(" "), N = c.top + y, F = `${u[0].x.toFixed(1)},${N.toFixed(1)} ${R} ${u[u.length - 1].x.toFixed(1)},${N.toFixed(1)}`, H = Math.max(100, Math.ceil(w / 4 / 100) * 100), I = [];
    for (let f = h; f <= v; f += H)
      I.push({ value: f, top: b(f) / 150 * 100 });
    return { lo: h, hi: v, points: u, line: R, area: F, y: b, baseY: N, ticks: I };
  }, [e]);
  if (!o)
    return /* @__PURE__ */ t("div", { className: "cfsc-graph-empty", children: "No rated contests yet." });
  const p = [
    { from: 0, to: 1200, color: "#cccccc" },
    { from: 1200, to: 1400, color: "#77ff77" },
    { from: 1400, to: 1600, color: "#77ddbb" },
    { from: 1600, to: 1900, color: "#aaaaff" },
    { from: 1900, to: 2100, color: "#ff88ff" },
    { from: 2100, to: 2400, color: "#ffcc88" },
    { from: 2400, to: 4e3, color: "#ff7777" }
  ], x = e[0], g = e[e.length - 1];
  return /* @__PURE__ */ n("div", { className: "cfsc-graph-wrap", children: [
    /* @__PURE__ */ n("div", { className: "cfsc-graph-plot", children: [
      /* @__PURE__ */ t("div", { className: "cfsc-graph-axis", "aria-hidden": "true", children: o.ticks.map((i) => /* @__PURE__ */ t("span", { style: { top: `${i.top}%` }, children: i.value }, i.value)) }),
      /* @__PURE__ */ n("div", { className: "cfsc-graph-svg-wrap", children: [
        /* @__PURE__ */ n(
          "svg",
          {
            className: "cfsc-graph",
            viewBox: "0 0 400 150",
            preserveAspectRatio: "none",
            role: "img",
            "aria-label": "Codeforces contest rating history",
            children: [
              /* @__PURE__ */ t("defs", { children: /* @__PURE__ */ n("linearGradient", { id: "cfsc-area", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                /* @__PURE__ */ t("stop", { offset: "0%", stopColor: "var(--cfsc-line)", stopOpacity: "0.35" }),
                /* @__PURE__ */ t("stop", { offset: "100%", stopColor: "var(--cfsc-line)", stopOpacity: "0" })
              ] }) }),
              p.map((i, d) => {
                const m = Math.min(o.hi, i.to), h = Math.max(o.lo, i.from);
                if (m <= h) return null;
                const v = o.y(m), w = o.y(h);
                return /* @__PURE__ */ t("rect", { x: 0, y: v, width: 400, height: Math.max(0, w - v), fill: i.color, opacity: "0.28" }, d);
              }),
              /* @__PURE__ */ t("polygon", { points: o.area, fill: "url(#cfsc-area)" }),
              o.points.map((i, d) => /* @__PURE__ */ t(
                "line",
                {
                  x1: i.x,
                  y1: i.y,
                  x2: i.x,
                  y2: o.baseY,
                  stroke: k(i.r),
                  strokeWidth: "1",
                  strokeOpacity: "0.28",
                  vectorEffect: "non-scaling-stroke"
                },
                `stem-${d}`
              )),
              /* @__PURE__ */ t(
                "polyline",
                {
                  points: o.line,
                  fill: "none",
                  stroke: "var(--cfsc-line)",
                  strokeWidth: "2",
                  strokeLinejoin: "round",
                  strokeLinecap: "round",
                  vectorEffect: "non-scaling-stroke"
                }
              ),
              o.points.map((i, d) => /* @__PURE__ */ t(
                "circle",
                {
                  cx: i.x,
                  cy: i.y,
                  r: r === d ? "5" : "3.4",
                  fill: k(i.r),
                  stroke: "#fff",
                  strokeWidth: "1.5",
                  vectorEffect: "non-scaling-stroke"
                },
                `pt-${d}`
              )),
              o.points.map((i, d) => /* @__PURE__ */ t(
                "circle",
                {
                  cx: i.x,
                  cy: i.y,
                  r: "9",
                  fill: "transparent",
                  style: { cursor: "pointer" },
                  onMouseEnter: () => l(d),
                  onMouseLeave: () => l((m) => m === d ? null : m)
                },
                `hit-${d}`
              ))
            ]
          }
        ),
        r != null && e[r] && /* @__PURE__ */ t(
          Q,
          {
            entry: e[r],
            delta: o.points[r].delta,
            leftPct: o.points[r].x / 400 * 100,
            topPct: o.points[r].y / 150 * 100
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ n("div", { className: "cfsc-graph-labels", children: [
      /* @__PURE__ */ t("span", { children: D(x.ratingUpdateTimeSeconds) }),
      /* @__PURE__ */ n("span", { className: "cfsc-graph-contests", children: [
        e.length,
        " contests"
      ] }),
      /* @__PURE__ */ t("span", { children: D(g.ratingUpdateTimeSeconds) })
    ] })
  ] });
}
function Q({ entry: e, leftPct: s, topPct: a }) {
  const c = e.newRating - e.oldRating, r = c >= 0, l = a < 38, o = s < 22 ? "left" : s > 78 ? "right" : "center", p = o === "left" ? "0" : o === "right" ? "-100%" : "-50%", x = l ? "12px" : "calc(-100% - 12px)";
  return /* @__PURE__ */ n(
    "div",
    {
      className: "cfsc-tip",
      style: { left: `${s}%`, top: `${a}%`, transform: `translate(${p}, ${x})` },
      children: [
        /* @__PURE__ */ t("div", { className: "cfsc-tip-title", children: e.contestName }),
        /* @__PURE__ */ n("div", { className: "cfsc-tip-row", children: [
          /* @__PURE__ */ t("span", { children: "Rating" }),
          /* @__PURE__ */ n("span", { children: [
            e.oldRating,
            " → ",
            /* @__PURE__ */ t("strong", { style: { color: k(e.newRating) }, children: e.newRating }),
            " ",
            /* @__PURE__ */ n("span", { className: r ? "cfsc-tip-up" : "cfsc-tip-down", children: [
              "(",
              r ? "+" : "",
              c,
              ")"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ n("div", { className: "cfsc-tip-row", children: [
          /* @__PURE__ */ t("span", { children: "Rank" }),
          /* @__PURE__ */ n("span", { children: [
            "#",
            e.rank
          ] })
        ] }),
        /* @__PURE__ */ n("div", { className: "cfsc-tip-row", children: [
          /* @__PURE__ */ t("span", { children: "Date" }),
          /* @__PURE__ */ t("span", { children: V(e.ratingUpdateTimeSeconds) })
        ] })
      ]
    }
  );
}
function D(e) {
  return e ? new Date(e * 1e3).toLocaleDateString(void 0, { month: "short", year: "numeric" }) : "";
}
function V(e) {
  return e ? new Date(e * 1e3).toLocaleDateString(void 0, { month: "short", day: "numeric", year: "numeric" }) : "";
}
export {
  te as CodeforcesCard,
  te as default,
  k as rankColor,
  P as rankFromRating
};
//# sourceMappingURL=codeforces-stats-card.js.map
