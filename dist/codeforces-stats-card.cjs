"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const e=require("react/jsx-runtime"),F=require("react"),E="cfsc-styles",P=`
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
`;function L(){if(typeof document>"u"||document.getElementById(E))return;const r=document.createElement("style");r.id=E,r.textContent=P,document.head.appendChild(r)}const A=[{min:3e3,name:"Legendary Grandmaster",color:"#FF0000"},{min:2600,name:"International Grandmaster",color:"#FF0000"},{min:2400,name:"Grandmaster",color:"#FF0000"},{min:2300,name:"International Master",color:"#FF8C00"},{min:2100,name:"Master",color:"#FF8C00"},{min:1900,name:"Candidate Master",color:"#AA00AA"},{min:1600,name:"Expert",color:"#0000FF"},{min:1400,name:"Specialist",color:"#03A89E"},{min:1200,name:"Pupil",color:"#008000"},{min:-1/0,name:"Newbie",color:"#808080"}];function y(r){const t=Number(r)||0;for(const s of A)if(t>=s.min)return s.color;return"#808080"}function z(r){const t=Number(r)||0;for(const s of A)if(t>=s.min)return s.name;return"Unrated"}const R="https://codeforces.com/api";async function S(r,t){const s=await fetch(r,{signal:t});if(!s.ok)throw new Error(`Codeforces API error ${s.status}`);const h=await s.json();if(h.status!=="OK")throw new Error(h.comment||"Codeforces API returned an error");return h.result}function U({handle:r,theme:t="light",title:s="Codeforces",showRank:h=!0,maxSubmissions:n=1e4,className:a="",style:v}){const[u,x]=F.useState({status:"loading"});F.useEffect(()=>{L()},[]),F.useEffect(()=>{if(!r){x({status:"error",error:"No Codeforces handle provided."});return}const w=new AbortController,{signal:b}=w;return x({status:"loading"}),(async()=>{try{const[l,k,$]=await Promise.all([S(`${R}/user.info?handles=${encodeURIComponent(r)}`,b),S(`${R}/user.rating?handle=${encodeURIComponent(r)}`,b).catch(()=>[]),S(`${R}/user.status?handle=${encodeURIComponent(r)}&from=1&count=${n}`,b).catch(()=>[])]),c=l&&l[0];if(!c)throw new Error(`Handle "${r}" not found.`);const N=new Set;for(const C of $)C.verdict==="OK"&&C.problem&&N.add(`${C.problem.contestId||"x"}-${C.problem.index}`);x({status:"ready",info:c,history:k||[],solved:N.size})}catch(l){if(l.name==="AbortError")return;x({status:"error",error:l.message||"Failed to load Codeforces data."})}})(),()=>w.abort()},[r,n]);const o=`cfsc-card cfsc-theme-${t} ${a}`.trim(),f=`https://codeforces.com/profile/${encodeURIComponent(r||"")}`;if(u.status==="loading")return e.jsxs("div",{className:o,style:v,children:[e.jsx(M,{title:s,profileUrl:f}),e.jsx("div",{className:"cfsc-message",children:"Loading Codeforces stats…"})]});if(u.status==="error")return e.jsxs("div",{className:o,style:v,children:[e.jsx(M,{title:s,profileUrl:f}),e.jsx("div",{className:"cfsc-message cfsc-error",children:u.error})]});const{info:d,history:m,solved:g}=u,i=d.rating??0,j=d.maxRating??i,p=d.rank||z(i);return e.jsxs("a",{className:o,style:v,href:f,target:"_blank",rel:"noopener noreferrer",children:[e.jsx(M,{title:s}),e.jsxs("div",{className:"cfsc-solved",children:[e.jsx("span",{className:"cfsc-solved-value",children:g}),e.jsx("span",{className:"cfsc-solved-label",children:"Problems Solved"})]}),e.jsxs("div",{className:"cfsc-rating-row",children:[e.jsxs("div",{className:"cfsc-rating-block",children:[e.jsx("span",{className:"cfsc-rating-value",style:{color:y(i)},children:i}),e.jsx("span",{className:"cfsc-rating-caption",children:"Contest Rating"})]}),h&&e.jsxs("div",{className:"cfsc-rank-block",children:[e.jsx("span",{className:"cfsc-rank-badge",style:{color:y(i)},children:p}),e.jsxs("span",{className:"cfsc-max-rating",children:["Max ",e.jsx("strong",{style:{color:y(j)},children:j})]})]})]}),e.jsx(W,{history:m,currentRating:i})]})}function M({title:r,profileUrl:t}){const s=e.jsxs("div",{className:"cfsc-header",children:[e.jsxs("span",{className:"cfsc-title",children:[e.jsx(O,{}),r]}),e.jsx("span",{className:"cfsc-arrow","aria-hidden":"true",children:"→"})]});return t?e.jsx("a",{className:"cfsc-header-link",href:t,target:"_blank",rel:"noopener noreferrer",children:s}):s}function O(){return e.jsxs("svg",{className:"cfsc-logo",width:"20",height:"20",viewBox:"0 0 24 24","aria-hidden":"true",children:[e.jsx("rect",{x:"1",y:"9",width:"6",height:"12",rx:"1.5",fill:"#3B5998"}),e.jsx("rect",{x:"9",y:"4",width:"6",height:"17",rx:"1.5",fill:"#FFCC00"}),e.jsx("rect",{x:"17",y:"9",width:"6",height:"12",rx:"1.5",fill:"#E43E3E"})]})}function W({history:r,currentRating:t}){const n={top:8,right:8,bottom:8,left:8},a=F.useMemo(()=>{if(!r||r.length===0)return null;const o=r.map(c=>c.newRating),f=Math.min(...o),d=Math.max(...o),m=Math.floor((f-100)/100)*100,g=Math.ceil((d+100)/100)*100,i=g-m||1,j=400-n.left-n.right,p=130-n.top-n.bottom,w=c=>n.left+(r.length===1?j/2:c/(r.length-1)*j),b=c=>n.top+p-(c-m)/i*p,l=r.map((c,N)=>({x:w(N),y:b(c.newRating),r:c.newRating,h:c})),k=l.map(c=>`${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(" "),$=`${n.left+0},${(n.top+p).toFixed(1)} ${k} ${l[l.length-1].x.toFixed(1)},${(n.top+p).toFixed(1)}`;return{lo:m,hi:g,points:l,line:k,area:$,innerH:p,y:b}},[r]);if(!a)return e.jsx("div",{className:"cfsc-graph-wrap",children:e.jsx("div",{className:"cfsc-graph-empty",children:"No rated contests yet."})});const v=[{from:0,to:1200,color:"#cccccc"},{from:1200,to:1400,color:"#77ff77"},{from:1400,to:1600,color:"#77ddbb"},{from:1600,to:1900,color:"#aaaaff"},{from:1900,to:2100,color:"#ff88ff"},{from:2100,to:2400,color:"#ffcc88"},{from:2400,to:4e3,color:"#ff7777"}],u=r[0],x=r[r.length-1];return e.jsxs("div",{className:"cfsc-graph-wrap",children:[e.jsxs("svg",{className:"cfsc-graph",viewBox:"0 0 400 130",preserveAspectRatio:"none",role:"img","aria-label":"Codeforces contest rating history",children:[e.jsx("defs",{children:e.jsxs("linearGradient",{id:"cfsc-area",x1:"0",y1:"0",x2:"0",y2:"1",children:[e.jsx("stop",{offset:"0%",stopColor:"var(--cfsc-line)",stopOpacity:"0.35"}),e.jsx("stop",{offset:"100%",stopColor:"var(--cfsc-line)",stopOpacity:"0"})]})}),v.map((o,f)=>{const d=Math.min(a.hi,o.to),m=Math.max(a.lo,o.from);if(d<=m)return null;const g=a.y(d),i=a.y(m);return e.jsx("rect",{x:0,y:g,width:400,height:Math.max(0,i-g),fill:o.color,opacity:"0.28"},f)}),e.jsx("polygon",{points:a.area,fill:"url(#cfsc-area)"}),e.jsx("polyline",{points:a.line,fill:"none",stroke:"var(--cfsc-line)",strokeWidth:"2",strokeLinejoin:"round",strokeLinecap:"round"}),a.points.map((o,f)=>e.jsx("circle",{cx:o.x,cy:o.y,r:"2.6",fill:y(o.r),stroke:"#fff",strokeWidth:"1"},f))]}),e.jsxs("div",{className:"cfsc-graph-labels",children:[e.jsx("span",{children:I(u.ratingUpdateTimeSeconds)}),e.jsxs("span",{className:"cfsc-graph-contests",children:[r.length," contests"]}),e.jsx("span",{children:I(x.ratingUpdateTimeSeconds)})]})]})}function I(r){return r?new Date(r*1e3).toLocaleDateString(void 0,{month:"short",year:"numeric"}):""}exports.CodeforcesCard=U;exports.default=U;exports.rankColor=y;exports.rankFromRating=z;
//# sourceMappingURL=codeforces-stats-card.cjs.map
