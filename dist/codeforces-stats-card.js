// src/CodeforcesCard.jsx
import React, { useEffect, useMemo, useState } from "react";

// src/styles.js
var STYLE_ID = "cfsc-styles";
var CSS = `
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
function injectStyles() {
  if (typeof document === "undefined")
    return;
  if (document.getElementById(STYLE_ID))
    return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = CSS;
  document.head.appendChild(el);
}

// src/ranks.js
var TIERS = [
  { min: 3000, name: "Legendary Grandmaster", color: "#FF0000" },
  { min: 2600, name: "International Grandmaster", color: "#FF0000" },
  { min: 2400, name: "Grandmaster", color: "#FF0000" },
  { min: 2300, name: "International Master", color: "#FF8C00" },
  { min: 2100, name: "Master", color: "#FF8C00" },
  { min: 1900, name: "Candidate Master", color: "#AA00AA" },
  { min: 1600, name: "Expert", color: "#0000FF" },
  { min: 1400, name: "Specialist", color: "#03A89E" },
  { min: 1200, name: "Pupil", color: "#008000" },
  { min: -Infinity, name: "Newbie", color: "#808080" }
];
function rankColor(rating) {
  const r = Number(rating) || 0;
  for (const tier of TIERS) {
    if (r >= tier.min)
      return tier.color;
  }
  return "#808080";
}
function rankFromRating(rating) {
  const r = Number(rating) || 0;
  for (const tier of TIERS) {
    if (r >= tier.min)
      return tier.name;
  }
  return "Unrated";
}

// src/CodeforcesCard.jsx
import { jsxDEV } from "react/jsx-dev-runtime";
var API = "https://codeforces.com/api";
async function fetchJSON(url, signal) {
  const res = await fetch(url, { signal });
  if (!res.ok)
    throw new Error(`Codeforces API error ${res.status}`);
  const json = await res.json();
  if (json.status !== "OK")
    throw new Error(json.comment || "Codeforces API returned an error");
  return json.result;
}
function CodeforcesCard({
  handle,
  theme = "light",
  title = "Codeforces",
  showRank = true,
  maxSubmissions = 1e4,
  className = "",
  style
}) {
  const [state, setState] = useState({ status: "loading" });
  useEffect(() => {
    injectStyles();
  }, []);
  useEffect(() => {
    if (!handle) {
      setState({ status: "error", error: "No Codeforces handle provided." });
      return;
    }
    const controller = new AbortController;
    const { signal } = controller;
    setState({ status: "loading" });
    (async () => {
      try {
        const [infoArr, history2, submissions] = await Promise.all([
          fetchJSON(`${API}/user.info?handles=${encodeURIComponent(handle)}`, signal),
          fetchJSON(`${API}/user.rating?handle=${encodeURIComponent(handle)}`, signal).catch(() => []),
          fetchJSON(`${API}/user.status?handle=${encodeURIComponent(handle)}&from=1&count=${maxSubmissions}`, signal).catch(() => [])
        ]);
        const info2 = infoArr && infoArr[0];
        if (!info2)
          throw new Error(`Handle "${handle}" not found.`);
        const solvedSet = new Set;
        for (const sub of submissions) {
          if (sub.verdict === "OK" && sub.problem) {
            solvedSet.add(`${sub.problem.contestId || "x"}-${sub.problem.index}`);
          }
        }
        setState({
          status: "ready",
          info: info2,
          history: history2 || [],
          solved: solvedSet.size
        });
      } catch (err) {
        if (err.name === "AbortError")
          return;
        setState({ status: "error", error: err.message || "Failed to load Codeforces data." });
      }
    })();
    return () => controller.abort();
  }, [handle, maxSubmissions]);
  const rootClass = `cfsc-card cfsc-theme-${theme} ${className}`.trim();
  const profileUrl = `https://codeforces.com/profile/${encodeURIComponent(handle || "")}`;
  if (state.status === "loading") {
    return /* @__PURE__ */ jsxDEV("div", {
      className: rootClass,
      style,
      children: [
        /* @__PURE__ */ jsxDEV(Header, {
          title,
          profileUrl
        }, undefined, false, undefined, this),
        /* @__PURE__ */ jsxDEV("div", {
          className: "cfsc-message",
          children: "Loading Codeforces stats…"
        }, undefined, false, undefined, this)
      ]
    }, undefined, true, undefined, this);
  }
  if (state.status === "error") {
    return /* @__PURE__ */ jsxDEV("div", {
      className: rootClass,
      style,
      children: [
        /* @__PURE__ */ jsxDEV(Header, {
          title,
          profileUrl
        }, undefined, false, undefined, this),
        /* @__PURE__ */ jsxDEV("div", {
          className: "cfsc-message cfsc-error",
          children: state.error
        }, undefined, false, undefined, this)
      ]
    }, undefined, true, undefined, this);
  }
  const { info, history, solved } = state;
  const rating = info.rating ?? 0;
  const maxRating = info.maxRating ?? rating;
  const rankName = info.rank || rankFromRating(rating);
  return /* @__PURE__ */ jsxDEV("a", {
    className: rootClass,
    style,
    href: profileUrl,
    target: "_blank",
    rel: "noopener noreferrer",
    children: [
      /* @__PURE__ */ jsxDEV(Header, {
        title
      }, undefined, false, undefined, this),
      /* @__PURE__ */ jsxDEV("div", {
        className: "cfsc-solved",
        children: [
          /* @__PURE__ */ jsxDEV("span", {
            className: "cfsc-solved-value",
            children: solved
          }, undefined, false, undefined, this),
          /* @__PURE__ */ jsxDEV("span", {
            className: "cfsc-solved-label",
            children: "Problems Solved"
          }, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this),
      /* @__PURE__ */ jsxDEV("div", {
        className: "cfsc-rating-row",
        children: [
          /* @__PURE__ */ jsxDEV("div", {
            className: "cfsc-rating-block",
            children: [
              /* @__PURE__ */ jsxDEV("span", {
                className: "cfsc-rating-value",
                style: { color: rankColor(rating) },
                children: rating
              }, undefined, false, undefined, this),
              /* @__PURE__ */ jsxDEV("span", {
                className: "cfsc-rating-caption",
                children: "Contest Rating"
              }, undefined, false, undefined, this)
            ]
          }, undefined, true, undefined, this),
          showRank && /* @__PURE__ */ jsxDEV("div", {
            className: "cfsc-rank-block",
            children: [
              /* @__PURE__ */ jsxDEV("span", {
                className: "cfsc-rank-badge",
                style: { color: rankColor(rating) },
                children: rankName
              }, undefined, false, undefined, this),
              /* @__PURE__ */ jsxDEV("span", {
                className: "cfsc-max-rating",
                children: [
                  "Max ",
                  /* @__PURE__ */ jsxDEV("strong", {
                    style: { color: rankColor(maxRating) },
                    children: maxRating
                  }, undefined, false, undefined, this)
                ]
              }, undefined, true, undefined, this)
            ]
          }, undefined, true, undefined, this)
        ]
      }, undefined, true, undefined, this),
      /* @__PURE__ */ jsxDEV(RatingGraph, {
        history,
        currentRating: rating
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
function Header({ title, profileUrl }) {
  const content = /* @__PURE__ */ jsxDEV("div", {
    className: "cfsc-header",
    children: [
      /* @__PURE__ */ jsxDEV("span", {
        className: "cfsc-title",
        children: [
          /* @__PURE__ */ jsxDEV(CodeforcesLogo, {}, undefined, false, undefined, this),
          title
        ]
      }, undefined, true, undefined, this),
      /* @__PURE__ */ jsxDEV("span", {
        className: "cfsc-arrow",
        "aria-hidden": "true",
        children: "→"
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
  if (profileUrl) {
    return /* @__PURE__ */ jsxDEV("a", {
      className: "cfsc-header-link",
      href: profileUrl,
      target: "_blank",
      rel: "noopener noreferrer",
      children: content
    }, undefined, false, undefined, this);
  }
  return content;
}
function CodeforcesLogo() {
  return /* @__PURE__ */ jsxDEV("svg", {
    className: "cfsc-logo",
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    "aria-hidden": "true",
    children: [
      /* @__PURE__ */ jsxDEV("rect", {
        x: "1",
        y: "9",
        width: "6",
        height: "12",
        rx: "1.5",
        fill: "#3B5998"
      }, undefined, false, undefined, this),
      /* @__PURE__ */ jsxDEV("rect", {
        x: "9",
        y: "4",
        width: "6",
        height: "17",
        rx: "1.5",
        fill: "#FFCC00"
      }, undefined, false, undefined, this),
      /* @__PURE__ */ jsxDEV("rect", {
        x: "17",
        y: "9",
        width: "6",
        height: "12",
        rx: "1.5",
        fill: "#E43E3E"
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
function RatingGraph({ history, currentRating }) {
  const W = 400;
  const H = 130;
  const PAD = { top: 8, right: 8, bottom: 8, left: 8 };
  const model = useMemo(() => {
    if (!history || history.length === 0)
      return null;
    const ratings = history.map((h) => h.newRating);
    const dataMin = Math.min(...ratings);
    const dataMax = Math.max(...ratings);
    const lo = Math.floor((dataMin - 100) / 100) * 100;
    const hi = Math.ceil((dataMax + 100) / 100) * 100;
    const range = hi - lo || 1;
    const innerW = W - PAD.left - PAD.right;
    const innerH = H - PAD.top - PAD.bottom;
    const x = (i) => PAD.left + (history.length === 1 ? innerW / 2 : i / (history.length - 1) * innerW);
    const y = (r) => PAD.top + innerH - (r - lo) / range * innerH;
    const points = history.map((h, i) => ({ x: x(i), y: y(h.newRating), r: h.newRating, h }));
    const line = points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
    const area = `${PAD.left + 0},${(PAD.top + innerH).toFixed(1)} ${line} ${points[points.length - 1].x.toFixed(1)},${(PAD.top + innerH).toFixed(1)}`;
    return { lo, hi, points, line, area, innerH, y };
  }, [history]);
  if (!model) {
    return /* @__PURE__ */ jsxDEV("div", {
      className: "cfsc-graph-wrap",
      children: /* @__PURE__ */ jsxDEV("div", {
        className: "cfsc-graph-empty",
        children: "No rated contests yet."
      }, undefined, false, undefined, this)
    }, undefined, false, undefined, this);
  }
  const bands = [
    { from: 0, to: 1200, color: "#cccccc" },
    { from: 1200, to: 1400, color: "#77ff77" },
    { from: 1400, to: 1600, color: "#77ddbb" },
    { from: 1600, to: 1900, color: "#aaaaff" },
    { from: 1900, to: 2100, color: "#ff88ff" },
    { from: 2100, to: 2400, color: "#ffcc88" },
    { from: 2400, to: 4000, color: "#ff7777" }
  ];
  const first = history[0];
  const last = history[history.length - 1];
  return /* @__PURE__ */ jsxDEV("div", {
    className: "cfsc-graph-wrap",
    children: [
      /* @__PURE__ */ jsxDEV("svg", {
        className: "cfsc-graph",
        viewBox: `0 0 ${W} ${H}`,
        preserveAspectRatio: "none",
        role: "img",
        "aria-label": "Codeforces contest rating history",
        children: [
          /* @__PURE__ */ jsxDEV("defs", {
            children: /* @__PURE__ */ jsxDEV("linearGradient", {
              id: "cfsc-area",
              x1: "0",
              y1: "0",
              x2: "0",
              y2: "1",
              children: [
                /* @__PURE__ */ jsxDEV("stop", {
                  offset: "0%",
                  stopColor: "var(--cfsc-line)",
                  stopOpacity: "0.35"
                }, undefined, false, undefined, this),
                /* @__PURE__ */ jsxDEV("stop", {
                  offset: "100%",
                  stopColor: "var(--cfsc-line)",
                  stopOpacity: "0"
                }, undefined, false, undefined, this)
              ]
            }, undefined, true, undefined, this)
          }, undefined, false, undefined, this),
          bands.map((b, i) => {
            const top = Math.min(model.hi, b.to);
            const bottom = Math.max(model.lo, b.from);
            if (top <= bottom)
              return null;
            const yTop = model.y(top);
            const yBottom = model.y(bottom);
            return /* @__PURE__ */ jsxDEV("rect", {
              x: 0,
              y: yTop,
              width: W,
              height: Math.max(0, yBottom - yTop),
              fill: b.color,
              opacity: "0.28"
            }, i, false, undefined, this);
          }),
          /* @__PURE__ */ jsxDEV("polygon", {
            points: model.area,
            fill: "url(#cfsc-area)"
          }, undefined, false, undefined, this),
          /* @__PURE__ */ jsxDEV("polyline", {
            points: model.line,
            fill: "none",
            stroke: "var(--cfsc-line)",
            strokeWidth: "2",
            strokeLinejoin: "round",
            strokeLinecap: "round"
          }, undefined, false, undefined, this),
          model.points.map((p, i) => /* @__PURE__ */ jsxDEV("circle", {
            cx: p.x,
            cy: p.y,
            r: "2.6",
            fill: rankColor(p.r),
            stroke: "#fff",
            strokeWidth: "1"
          }, i, false, undefined, this))
        ]
      }, undefined, true, undefined, this),
      /* @__PURE__ */ jsxDEV("div", {
        className: "cfsc-graph-labels",
        children: [
          /* @__PURE__ */ jsxDEV("span", {
            children: formatDate(first.ratingUpdateTimeSeconds)
          }, undefined, false, undefined, this),
          /* @__PURE__ */ jsxDEV("span", {
            className: "cfsc-graph-contests",
            children: [
              history.length,
              " contests"
            ]
          }, undefined, true, undefined, this),
          /* @__PURE__ */ jsxDEV("span", {
            children: formatDate(last.ratingUpdateTimeSeconds)
          }, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
function formatDate(seconds) {
  if (!seconds)
    return "";
  const d = new Date(seconds * 1000);
  return d.toLocaleDateString(undefined, { month: "short", year: "numeric" });
}

// src/index.js
var src_default = CodeforcesCard;
export {
  rankFromRating,
  rankColor,
  src_default as default,
  CodeforcesCard
};

//# debugId=E16F12D343D5CFBD64756E2164756E21
//# sourceMappingURL=codeforces-stats-card.js.map
