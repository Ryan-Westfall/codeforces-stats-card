import { jsxs as o, jsx as r } from "react/jsx-runtime";
import { useState as U, useEffect as E, useMemo as L } from "react";
const A = "cfsc-styles", P = `
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
function W() {
  if (typeof document > "u" || document.getElementById(A)) return;
  const e = document.createElement("style");
  e.id = A, e.textContent = P, document.head.appendChild(e);
}
const j = [
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
function F(e) {
  const s = Number(e) || 0;
  for (const c of j)
    if (s >= c.min) return c.color;
  return "#808080";
}
function B(e) {
  const s = Number(e) || 0;
  for (const c of j)
    if (s >= c.min) return c.name;
  return "Unrated";
}
const S = "https://codeforces.com/api";
async function I(e, s) {
  const c = await fetch(e, { signal: s });
  if (!c.ok) throw new Error(`Codeforces API error ${c.status}`);
  const u = await c.json();
  if (u.status !== "OK") throw new Error(u.comment || "Codeforces API returned an error");
  return u.result;
}
function T({
  handle: e,
  theme: s = "light",
  title: c = "Codeforces",
  showRank: u = !0,
  maxSubmissions: a = 1e4,
  className: i = "",
  style: y
}) {
  const [x, b] = U({ status: "loading" });
  E(() => {
    W();
  }, []), E(() => {
    if (!e) {
      b({ status: "error", error: "No Codeforces handle provided." });
      return;
    }
    const k = new AbortController(), { signal: v } = k;
    return b({ status: "loading" }), (async () => {
      try {
        const [l, N, R] = await Promise.all([
          I(`${S}/user.info?handles=${encodeURIComponent(e)}`, v),
          I(`${S}/user.rating?handle=${encodeURIComponent(e)}`, v).catch(() => []),
          I(
            `${S}/user.status?handle=${encodeURIComponent(e)}&from=1&count=${a}`,
            v
          ).catch(() => [])
        ]), t = l && l[0];
        if (!t) throw new Error(`Handle "${e}" not found.`);
        const C = /* @__PURE__ */ new Set();
        for (const $ of R)
          $.verdict === "OK" && $.problem && C.add(`${$.problem.contestId || "x"}-${$.problem.index}`);
        b({
          status: "ready",
          info: t,
          history: N || [],
          solved: C.size
        });
      } catch (l) {
        if (l.name === "AbortError") return;
        b({ status: "error", error: l.message || "Failed to load Codeforces data." });
      }
    })(), () => k.abort();
  }, [e, a]);
  const n = `cfsc-card cfsc-theme-${s} ${i}`.trim(), d = `https://codeforces.com/profile/${encodeURIComponent(e || "")}`;
  if (x.status === "loading")
    return /* @__PURE__ */ o("div", { className: n, style: y, children: [
      /* @__PURE__ */ r(M, { title: c, profileUrl: d }),
      /* @__PURE__ */ r("div", { className: "cfsc-message", children: "Loading Codeforces stats…" })
    ] });
  if (x.status === "error")
    return /* @__PURE__ */ o("div", { className: n, style: y, children: [
      /* @__PURE__ */ r(M, { title: c, profileUrl: d }),
      /* @__PURE__ */ r("div", { className: "cfsc-message cfsc-error", children: x.error })
    ] });
  const { info: m, history: p, solved: g } = x, f = m.rating ?? 0, w = m.maxRating ?? f, h = m.rank || B(f);
  return /* @__PURE__ */ o("a", { className: n, style: y, href: d, target: "_blank", rel: "noopener noreferrer", children: [
    /* @__PURE__ */ r(M, { title: c }),
    /* @__PURE__ */ o("div", { className: "cfsc-solved", children: [
      /* @__PURE__ */ r("span", { className: "cfsc-solved-value", children: g }),
      /* @__PURE__ */ r("span", { className: "cfsc-solved-label", children: "Problems Solved" })
    ] }),
    /* @__PURE__ */ o("div", { className: "cfsc-rating-row", children: [
      /* @__PURE__ */ o("div", { className: "cfsc-rating-block", children: [
        /* @__PURE__ */ r("span", { className: "cfsc-rating-value", style: { color: F(f) }, children: f }),
        /* @__PURE__ */ r("span", { className: "cfsc-rating-caption", children: "Contest Rating" })
      ] }),
      u && /* @__PURE__ */ o("div", { className: "cfsc-rank-block", children: [
        /* @__PURE__ */ r("span", { className: "cfsc-rank-badge", style: { color: F(f) }, children: h }),
        /* @__PURE__ */ o("span", { className: "cfsc-max-rating", children: [
          "Max ",
          /* @__PURE__ */ r("strong", { style: { color: F(w) }, children: w })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ r(O, { history: p, currentRating: f })
  ] });
}
function M({ title: e, profileUrl: s }) {
  const c = /* @__PURE__ */ o("div", { className: "cfsc-header", children: [
    /* @__PURE__ */ o("span", { className: "cfsc-title", children: [
      /* @__PURE__ */ r(H, {}),
      e
    ] }),
    /* @__PURE__ */ r("span", { className: "cfsc-arrow", "aria-hidden": "true", children: "→" })
  ] });
  return s ? /* @__PURE__ */ r("a", { className: "cfsc-header-link", href: s, target: "_blank", rel: "noopener noreferrer", children: c }) : c;
}
function H() {
  return /* @__PURE__ */ o("svg", { className: "cfsc-logo", width: "20", height: "20", viewBox: "0 0 24 24", "aria-hidden": "true", children: [
    /* @__PURE__ */ r("rect", { x: "1", y: "9", width: "6", height: "12", rx: "1.5", fill: "#3B5998" }),
    /* @__PURE__ */ r("rect", { x: "9", y: "4", width: "6", height: "17", rx: "1.5", fill: "#FFCC00" }),
    /* @__PURE__ */ r("rect", { x: "17", y: "9", width: "6", height: "12", rx: "1.5", fill: "#E43E3E" })
  ] });
}
function O({ history: e, currentRating: s }) {
  const a = { top: 8, right: 8, bottom: 8, left: 8 }, i = L(() => {
    if (!e || e.length === 0) return null;
    const n = e.map((t) => t.newRating), d = Math.min(...n), m = Math.max(...n), p = Math.floor((d - 100) / 100) * 100, g = Math.ceil((m + 100) / 100) * 100, f = g - p || 1, w = 400 - a.left - a.right, h = 130 - a.top - a.bottom, k = (t) => a.left + (e.length === 1 ? w / 2 : t / (e.length - 1) * w), v = (t) => a.top + h - (t - p) / f * h, l = e.map((t, C) => ({ x: k(C), y: v(t.newRating), r: t.newRating, h: t })), N = l.map((t) => `${t.x.toFixed(1)},${t.y.toFixed(1)}`).join(" "), R = `${a.left + 0},${(a.top + h).toFixed(1)} ${N} ${l[l.length - 1].x.toFixed(1)},${(a.top + h).toFixed(1)}`;
    return { lo: p, hi: g, points: l, line: N, area: R, innerH: h, y: v };
  }, [e]);
  if (!i)
    return /* @__PURE__ */ r("div", { className: "cfsc-graph-wrap", children: /* @__PURE__ */ r("div", { className: "cfsc-graph-empty", children: "No rated contests yet." }) });
  const y = [
    { from: 0, to: 1200, color: "#cccccc" },
    { from: 1200, to: 1400, color: "#77ff77" },
    { from: 1400, to: 1600, color: "#77ddbb" },
    { from: 1600, to: 1900, color: "#aaaaff" },
    { from: 1900, to: 2100, color: "#ff88ff" },
    { from: 2100, to: 2400, color: "#ffcc88" },
    { from: 2400, to: 4e3, color: "#ff7777" }
  ], x = e[0], b = e[e.length - 1];
  return /* @__PURE__ */ o("div", { className: "cfsc-graph-wrap", children: [
    /* @__PURE__ */ o(
      "svg",
      {
        className: "cfsc-graph",
        viewBox: "0 0 400 130",
        preserveAspectRatio: "none",
        role: "img",
        "aria-label": "Codeforces contest rating history",
        children: [
          /* @__PURE__ */ r("defs", { children: /* @__PURE__ */ o("linearGradient", { id: "cfsc-area", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ r("stop", { offset: "0%", stopColor: "var(--cfsc-line)", stopOpacity: "0.35" }),
            /* @__PURE__ */ r("stop", { offset: "100%", stopColor: "var(--cfsc-line)", stopOpacity: "0" })
          ] }) }),
          y.map((n, d) => {
            const m = Math.min(i.hi, n.to), p = Math.max(i.lo, n.from);
            if (m <= p) return null;
            const g = i.y(m), f = i.y(p);
            return /* @__PURE__ */ r(
              "rect",
              {
                x: 0,
                y: g,
                width: 400,
                height: Math.max(0, f - g),
                fill: n.color,
                opacity: "0.28"
              },
              d
            );
          }),
          /* @__PURE__ */ r("polygon", { points: i.area, fill: "url(#cfsc-area)" }),
          /* @__PURE__ */ r("polyline", { points: i.line, fill: "none", stroke: "var(--cfsc-line)", strokeWidth: "2", strokeLinejoin: "round", strokeLinecap: "round" }),
          i.points.map((n, d) => /* @__PURE__ */ r("circle", { cx: n.x, cy: n.y, r: "2.6", fill: F(n.r), stroke: "#fff", strokeWidth: "1" }, d))
        ]
      }
    ),
    /* @__PURE__ */ o("div", { className: "cfsc-graph-labels", children: [
      /* @__PURE__ */ r("span", { children: z(x.ratingUpdateTimeSeconds) }),
      /* @__PURE__ */ o("span", { className: "cfsc-graph-contests", children: [
        e.length,
        " contests"
      ] }),
      /* @__PURE__ */ r("span", { children: z(b.ratingUpdateTimeSeconds) })
    ] })
  ] });
}
function z(e) {
  return e ? new Date(e * 1e3).toLocaleDateString(void 0, { month: "short", year: "numeric" }) : "";
}
export {
  T as CodeforcesCard,
  T as default,
  F as rankColor,
  B as rankFromRating
};
//# sourceMappingURL=codeforces-stats-card.js.map
