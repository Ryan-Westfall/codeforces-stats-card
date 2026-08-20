"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const e=require("react/jsx-runtime"),N=require("react"),I="cfsc-styles",L=`
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
`;function O(){if(typeof document>"u"||document.getElementById(I))return;const t=document.createElement("style");t.id=I,t.textContent=L,document.head.appendChild(t)}const D=[{min:3e3,name:"Legendary Grandmaster",color:"#FF0000"},{min:2600,name:"International Grandmaster",color:"#FF0000"},{min:2400,name:"Grandmaster",color:"#FF0000"},{min:2300,name:"International Master",color:"#FF8C00"},{min:2100,name:"Master",color:"#FF8C00"},{min:1900,name:"Candidate Master",color:"#AA00AA"},{min:1600,name:"Expert",color:"#0000FF"},{min:1400,name:"Specialist",color:"#03A89E"},{min:1200,name:"Pupil",color:"#008000"},{min:-1/0,name:"Newbie",color:"#808080"}];function j(t){const c=Number(t)||0;for(const r of D)if(c>=r.min)return r.color;return"#808080"}function B(t){const c=Number(t)||0;for(const r of D)if(c>=r.min)return r.name;return"Unrated"}const T=[1e3,1200,1400,1600,1900,2100,2300,2400,2600,3e3];function W(t){const c=T,r=Number(t)||0;let s=0;for(;s<c.length-1&&r>=c[s+1];)s++;s=Math.max(1,Math.min(s,c.length-3));const n=c[s-1],i=c[s],a=c[s+1],m=c[s+2];return[{label:`< ${n}`,min:-1/0,max:n-1},{label:`${n}–${i}`,min:n,max:i-1},{label:`${i}–${a}`,min:i,max:a-1},{label:`${a}–${m}`,min:a,max:m-1},{label:`${m}+`,min:m,max:1/0}].map(h=>({...h,color:j(Number.isFinite(h.min)?h.min:h.max)}))}const S="https://codeforces.com/api";async function M(t,c){const r=await fetch(t,{signal:c});if(!r.ok)throw new Error(`Codeforces API error ${r.status}`);const s=await r.json();if(s.status!=="OK")throw new Error(s.comment||"Codeforces API returned an error");return s.result}function P(t){const c=new Set,r=new Set,s=new Map;for(const n of t){if(!n.problem)continue;const i=`${n.problem.contestId||"x"}-${n.problem.index}`;c.add(i),n.verdict==="OK"&&!r.has(i)&&(r.add(i),typeof n.problem.rating=="number"&&s.set(i,n.problem.rating))}return{attempted:c.size,solved:r.size,solvedRatings:[...s.values()]}}function G(t,c){const r=W(t).map(s=>({...s,count:0}));for(const s of c){const n=r.find(i=>s>=i.min&&s<=i.max);n&&(n.count+=1)}return r}function U({handle:t,title:c="Codeforces",showRank:r=!0,maxSubmissions:s=1e4,className:n="",style:i}){const[a,m]=N.useState({status:"loading"});N.useEffect(()=>{O()},[]),N.useEffect(()=>{if(!t){m({status:"error",error:"No Codeforces handle provided."});return}const $=new AbortController,{signal:v}=$;return m({status:"loading"}),(async()=>{try{const[x,C,y]=await Promise.all([M(`${S}/user.info?handles=${encodeURIComponent(t)}`,v),M(`${S}/user.rating?handle=${encodeURIComponent(t)}`,v).catch(()=>[]),M(`${S}/user.status?handle=${encodeURIComponent(t)}&from=1&count=${s}`,v).catch(()=>[])]),R=x&&x[0];if(!R)throw new Error(`Handle "${t}" not found.`);m({status:"ready",info:R,history:C||[],stats:P(y||[])})}catch(x){if(x.name==="AbortError")return;m({status:"error",error:x.message||"Failed to load Codeforces data."})}})(),()=>$.abort()},[t,s]);const u=`cfsc-card ${n}`.trim(),h=`https://codeforces.com/profile/${encodeURIComponent(t||"")}`;if(a.status==="loading")return e.jsxs("div",{className:u,style:i,children:[e.jsx(z,{title:c,handle:t,profileUrl:h}),e.jsx("div",{className:"cfsc-message",children:"Loading Codeforces stats…"})]});if(a.status==="error")return e.jsxs("div",{className:u,style:i,children:[e.jsx(z,{title:c,handle:t,profileUrl:h}),e.jsx("div",{className:"cfsc-message cfsc-error",children:a.error})]});const{info:o,history:f,stats:d}=a,p=o.rating??0,g=o.maxRating??p,b=o.rank||B(p),k=d.attempted?Math.round(d.solved/d.attempted*100):0,w=G(p,d.solvedRatings);return e.jsxs("a",{className:u,style:i,href:h,target:"_blank",rel:"noopener noreferrer",children:[e.jsx(z,{title:c,handle:o.handle||t}),e.jsxs("div",{className:"cfsc-body",children:[e.jsxs("section",{className:"cfsc-section cfsc-section--attempts",children:[e.jsxs("div",{className:"cfsc-stat",children:[e.jsx("span",{className:"cfsc-stat-value",children:d.attempted}),e.jsx("span",{className:"cfsc-stat-label",children:"Attempted"})]}),e.jsxs("div",{className:"cfsc-stat",children:[e.jsx("span",{className:"cfsc-stat-value",children:d.solved}),e.jsx("span",{className:"cfsc-stat-label",children:"Solved"})]}),e.jsxs("div",{className:"cfsc-stat",children:[e.jsxs("span",{className:"cfsc-stat-value",children:[k,"%"]}),e.jsx("span",{className:"cfsc-stat-label",children:"Acceptance"})]})]}),e.jsxs("section",{className:"cfsc-section",children:[e.jsx("div",{className:"cfsc-section-title",children:"Solved by Problem Rating"}),e.jsx(_,{buckets:w})]}),e.jsxs("section",{className:"cfsc-section cfsc-section--graph",children:[e.jsx("div",{className:"cfsc-section-title",children:"Contest Rating"}),e.jsxs("div",{className:"cfsc-rating-grid",children:[e.jsxs("div",{className:"cfsc-stat",children:[e.jsx("span",{className:"cfsc-stat-value",children:p}),e.jsxs("span",{className:"cfsc-stat-label",children:["Current",r&&e.jsxs(e.Fragment,{children:[" · ",e.jsx("span",{style:{color:j(p)},children:b})]})]})]}),e.jsxs("div",{className:"cfsc-stat",children:[e.jsx("span",{className:"cfsc-stat-value",children:g}),e.jsx("span",{className:"cfsc-stat-label",children:"Max"})]})]}),e.jsx(q,{history:f})]})]})]})}function _({buckets:t}){const c=Math.max(1,...t.map(s=>s.count));return t.reduce((s,n)=>s+n.count,0)===0?e.jsx("div",{className:"cfsc-dist-empty",children:"No rated problems solved yet."}):e.jsx("div",{className:"cfsc-dist",children:t.map(s=>e.jsxs("div",{className:"cfsc-dist-row",children:[e.jsx("span",{className:"cfsc-dist-label",title:s.label,style:{color:s.color},children:s.label}),e.jsx("span",{className:"cfsc-dist-track",children:e.jsx("span",{className:"cfsc-dist-fill",style:{width:`${s.count/c*100}%`,background:s.color}})}),e.jsx("span",{className:"cfsc-dist-count",children:s.count})]},s.label))})}function z({title:t,handle:c,profileUrl:r}){const s=e.jsxs("div",{className:"cfsc-header",children:[e.jsxs("span",{className:"cfsc-title",children:[e.jsx(Y,{}),t]}),c&&e.jsx("span",{className:"cfsc-handle",children:c})]});return r?e.jsx("a",{className:"cfsc-header-link",href:r,target:"_blank",rel:"noopener noreferrer",children:s}):s}function Y(){return e.jsxs("svg",{className:"cfsc-logo",width:"20",height:"20",viewBox:"0 0 24 24","aria-hidden":"true",children:[e.jsx("rect",{x:"1",y:"9",width:"6",height:"12",rx:"1.5",fill:"#3B5998"}),e.jsx("rect",{x:"9",y:"4",width:"6",height:"17",rx:"1.5",fill:"#FFCC00"}),e.jsx("rect",{x:"17",y:"9",width:"6",height:"12",rx:"1.5",fill:"#E43E3E"})]})}function q({history:t}){const s={top:10,right:8,bottom:10,left:8},[n,i]=N.useState(null),a=N.useMemo(()=>{if(!t||t.length===0)return null;const o=t.map(l=>l.newRating),f=Math.min(...o),d=Math.max(...o),p=Math.floor((f-100)/100)*100,g=Math.ceil((d+100)/100)*100,b=g-p||1,k=400-s.left-s.right,w=150-s.top-s.bottom,$=l=>s.left+(t.length===1?k/2:l/(t.length-1)*k),v=l=>s.top+w-(l-p)/b*w,x=t.map((l,F)=>({x:$(F),y:v(l.newRating),r:l.newRating,delta:F===0?0:l.newRating-t[F-1].newRating})),C=x.map(l=>`${l.x.toFixed(1)},${l.y.toFixed(1)}`).join(" "),y=s.top+w,R=`${x[0].x.toFixed(1)},${y.toFixed(1)} ${C} ${x[x.length-1].x.toFixed(1)},${y.toFixed(1)}`,H=Math.max(100,Math.ceil(b/4/100)*100),E=[];for(let l=p;l<=g;l+=H)E.push({value:l,top:v(l)/150*100});return{lo:p,hi:g,points:x,line:C,area:R,y:v,baseY:y,ticks:E}},[t]);if(!a)return e.jsx("div",{className:"cfsc-graph-empty",children:"No rated contests yet."});const m=[{from:0,to:1200,color:"#cccccc"},{from:1200,to:1400,color:"#77ff77"},{from:1400,to:1600,color:"#77ddbb"},{from:1600,to:1900,color:"#aaaaff"},{from:1900,to:2100,color:"#ff88ff"},{from:2100,to:2400,color:"#ffcc88"},{from:2400,to:4e3,color:"#ff7777"}],u=t[0],h=t[t.length-1];return e.jsxs("div",{className:"cfsc-graph-wrap",children:[e.jsxs("div",{className:"cfsc-graph-plot",children:[e.jsx("div",{className:"cfsc-graph-axis","aria-hidden":"true",children:a.ticks.map(o=>e.jsx("span",{style:{top:`${o.top}%`},children:o.value},o.value))}),e.jsxs("div",{className:"cfsc-graph-svg-wrap",children:[e.jsxs("svg",{className:"cfsc-graph",viewBox:"0 0 400 150",preserveAspectRatio:"none",role:"img","aria-label":"Codeforces contest rating history",children:[e.jsx("defs",{children:e.jsxs("linearGradient",{id:"cfsc-area",x1:"0",y1:"0",x2:"0",y2:"1",children:[e.jsx("stop",{offset:"0%",stopColor:"var(--cfsc-line)",stopOpacity:"0.35"}),e.jsx("stop",{offset:"100%",stopColor:"var(--cfsc-line)",stopOpacity:"0"})]})}),m.map((o,f)=>{const d=Math.min(a.hi,o.to),p=Math.max(a.lo,o.from);if(d<=p)return null;const g=a.y(d),b=a.y(p);return e.jsx("rect",{x:0,y:g,width:400,height:Math.max(0,b-g),fill:o.color,opacity:"0.28"},f)}),e.jsx("polygon",{points:a.area,fill:"url(#cfsc-area)"}),a.points.map((o,f)=>e.jsx("line",{x1:o.x,y1:o.y,x2:o.x,y2:a.baseY,stroke:j(o.r),strokeWidth:"1",strokeOpacity:"0.28",vectorEffect:"non-scaling-stroke"},`stem-${f}`)),e.jsx("polyline",{points:a.line,fill:"none",stroke:"var(--cfsc-line)",strokeWidth:"2",strokeLinejoin:"round",strokeLinecap:"round",vectorEffect:"non-scaling-stroke"}),a.points.map((o,f)=>e.jsx("circle",{cx:o.x,cy:o.y,r:n===f?"5":"3.4",fill:j(o.r),stroke:"#fff",strokeWidth:"1.5",vectorEffect:"non-scaling-stroke"},`pt-${f}`)),a.points.map((o,f)=>e.jsx("circle",{cx:o.x,cy:o.y,r:"9",fill:"transparent",style:{cursor:"pointer"},onMouseEnter:()=>i(f),onMouseLeave:()=>i(d=>d===f?null:d)},`hit-${f}`))]}),n!=null&&t[n]&&e.jsx(K,{entry:t[n],delta:a.points[n].delta,leftPct:a.points[n].x/400*100,topPct:a.points[n].y/150*100})]})]}),e.jsxs("div",{className:"cfsc-graph-labels",children:[e.jsx("span",{children:A(u.ratingUpdateTimeSeconds)}),e.jsxs("span",{className:"cfsc-graph-contests",children:[t.length," contests"]}),e.jsx("span",{children:A(h.ratingUpdateTimeSeconds)})]})]})}function K({entry:t,leftPct:c,topPct:r}){const s=t.newRating-t.oldRating,n=s>=0,i=r<38,a=c<22?"left":c>78?"right":"center",m=a==="left"?"0":a==="right"?"-100%":"-50%",u=i?"12px":"calc(-100% - 12px)";return e.jsxs("div",{className:"cfsc-tip",style:{left:`${c}%`,top:`${r}%`,transform:`translate(${m}, ${u})`},children:[e.jsx("div",{className:"cfsc-tip-title",children:t.contestName}),e.jsxs("div",{className:"cfsc-tip-row",children:[e.jsx("span",{children:"Rating"}),e.jsxs("span",{children:[t.oldRating," → ",e.jsx("strong",{style:{color:j(t.newRating)},children:t.newRating})," ",e.jsxs("span",{className:n?"cfsc-tip-up":"cfsc-tip-down",children:["(",n?"+":"",s,")"]})]})]}),e.jsxs("div",{className:"cfsc-tip-row",children:[e.jsx("span",{children:"Rank"}),e.jsxs("span",{children:["#",t.rank]})]}),e.jsxs("div",{className:"cfsc-tip-row",children:[e.jsx("span",{children:"Date"}),e.jsx("span",{children:X(t.ratingUpdateTimeSeconds)})]})]})}function A(t){return t?new Date(t*1e3).toLocaleDateString(void 0,{month:"short",year:"numeric"}):""}function X(t){return t?new Date(t*1e3).toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}):""}exports.CodeforcesCard=U;exports.default=U;exports.rankColor=j;exports.rankFromRating=B;
//# sourceMappingURL=codeforces-stats-card.cjs.map
