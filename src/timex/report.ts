// Timex report, rebuilt 1:1 from the app. This ports timex.py's _REPORT_CSS,
// _REPORT_JS and _report_html markup verbatim (black & white, forced light),
// so the page you scroll on the site is the page a client receives.
// Sync source: /Applications/Timex.app/Contents/Resources/timex.py
//   _REPORT_CSS (l.1642), _REPORT_JS (l.1721), _report_html (l.1917). See TIMEX-REPLICA.md.

export interface ReportTile { k: string; v: string; n: string; hero?: boolean }
export interface ReportLongest { name: string; dur: string; pct: string; w: number }
export interface ReportDay { label: string; h: number; on: boolean; ctx?: boolean; tip: string }
export interface ReportRow { date: string; name: string; dur: string; hours: string }

export interface ReportData {
  author: string;
  project: string;
  period: string;
  totalSecs: number;
  totalStr: string;
  tiles: ReportTile[];
  longestNote: string;
  longest: ReportLongest[];
  peakStr: string;
  days: ReportDay[];
  rows: ReportRow[];
  generatedAt: string;
}

const REPORT_CSS = `
:root{
 --page:#eeece5;--sheet:#ffffff;--line:#e9e7e0;--hair:#f1efe9;
 --ink:#1a1a17;--ink2:#6c6b63;--ink3:#9a988e;
 --accent:#161613;--onAccent:#ffffff;--track:#e7e5df;--ctx:#cfcdc6;
 --tipbg:#1a1a17;--tipink:#f7f6f2;
 color-scheme:light}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--page);color:var(--ink);-webkit-font-smoothing:antialiased;
 font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Inter,Roboto,"Helvetica Neue",Arial,sans-serif;
 font-size:16px;line-height:1.6;padding:56px 20px 120px;
 background-image:radial-gradient(46% 38% at 88% -4%,rgba(20,20,15,.05),transparent 60%),radial-gradient(42% 34% at 6% 108%,rgba(20,20,15,.05),transparent 60%);
 background-attachment:fixed}
.num{font-variant-numeric:tabular-nums;font-feature-settings:"tnum" 1}
.wrap{max-width:840px;margin:0 auto;background:var(--sheet);border:1px solid var(--line);border-radius:22px;
 box-shadow:0 1px 2px rgba(20,20,15,.04),0 30px 60px -30px rgba(20,20,15,.18);
 padding:clamp(28px,5vw,60px) clamp(22px,5vw,60px) clamp(40px,6vw,72px)}
.brand{color:var(--accent);font-size:13px;font-weight:600;letter-spacing:.14em;text-transform:uppercase}
h1{font-family:"Iowan Old Style","Palatino Linotype",Palatino,Georgia,"Times New Roman",serif;
 font-size:clamp(30px,5vw,42px);font-weight:600;margin:12px 0 8px;letter-spacing:-.01em;line-height:1.1}
.sub{color:var(--ink2);font-size:15px;line-height:1.5}
.sub b{color:var(--ink);font-weight:600}
.rule{height:1px;background:var(--line);margin:32px 0}
h2{font-size:19px;font-weight:600;margin-bottom:2px;letter-spacing:-.01em;line-height:1.3}
.note{color:var(--ink2);font-size:14px;line-height:1.5;margin-bottom:24px}
.tiles{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
@media (max-width:640px){.tiles{grid-template-columns:repeat(2,1fr)}}
@media (max-width:420px){.tiles{grid-template-columns:1fr}}
.tile{background:#faf9f5;border:1px solid var(--hair);border-radius:14px;padding:18px 18px}
.tile .k{color:var(--ink2);font-size:13px;line-height:1.35}
.tile .v{font-size:25px;font-weight:600;margin-top:7px;white-space:nowrap;letter-spacing:-.02em;line-height:1.2}
.tile .n{color:var(--ink3);font-size:13px;margin-top:5px;line-height:1.35}
.tile.hero{background:#f2f1ec;border-color:#e3e1da}
.tile.hero .v{font-size:33px;color:var(--ink)}
.tt{list-style:none}
.tt li{padding:12px 0;border-bottom:1px solid var(--hair);opacity:0;transform:translateY(4px);
 transition:opacity .4s ease,transform .4s ease}
.tt li:last-child{border-bottom:0}
.tt li.in{opacity:1;transform:none}
.tth{display:flex;gap:16px;align-items:baseline;margin-bottom:8px}
.ttn{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:500}
.ttv{color:var(--ink2);font-size:14px;white-space:nowrap}
.ttv b{color:var(--ink);font-weight:600;margin-left:10px}
.ttb{height:8px;background:var(--track);border-radius:5px;overflow:hidden}
.ttb i{display:block;width:0;height:100%;background:var(--accent);border-radius:5px;
 transition:width .8s cubic-bezier(.22,1,.36,1)}
.chart{position:relative;padding-top:22px}
.peak{position:absolute;top:0;left:0;right:0;border-top:1px dashed var(--line);color:var(--ink3);font-size:12px;padding-bottom:3px}
.bars{display:flex;align-items:flex-end;gap:5px;height:180px;border-bottom:1px solid var(--line)}
.bar{flex:1;min-width:0;display:flex;flex-direction:column;justify-content:flex-end;height:100%}
.bar i{display:block;height:0;background:var(--accent);border-radius:4px 4px 0 0;
 transition:height .7s cubic-bezier(.22,1,.36,1)}
.bar.ctx i{background:var(--ctx)}
.bar.zero i{background:var(--hair)}
.bar:hover i{filter:brightness(1.08)}
.xaxis{display:flex;gap:5px;margin-top:10px;color:var(--ink3);font-size:12px}
.xaxis span{flex:1;min-width:0;text-align:center;white-space:nowrap;overflow:hidden}
.xaxis span.on{color:var(--ink);font-weight:600}
table{width:100%;border-collapse:collapse;font-size:15px}
th,td{padding-right:18px;white-space:nowrap}
th:last-child,td:last-child{padding-right:0}
th{color:var(--ink2);font-size:13px;font-weight:600;text-align:left;padding-bottom:11px;border-bottom:1px solid var(--line)}
td{padding-top:12px;padding-bottom:12px;border-bottom:1px solid var(--hair);vertical-align:top}
tr:last-child td{border-bottom:0}
td.n,th.n{text-align:right}
td.tk,th.tk{white-space:normal;width:100%;min-width:220px}
footer{color:var(--ink3);font-size:13px;margin-top:34px}
#tip{position:fixed;pointer-events:none;opacity:0;background:var(--tipbg);border-radius:8px;padding:8px 11px;font-size:13px;color:var(--tipink);transition:opacity .12s;z-index:9;white-space:nowrap}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}
`;

const REPORT_JS = `
var tip=document.getElementById('tip');
document.querySelectorAll('[data-tip]').forEach(function(el){
  el.addEventListener('mouseenter',function(){tip.textContent=el.dataset.tip;tip.style.opacity=1});
  el.addEventListener('mousemove',function(e){
    var x=e.clientX+14,y=e.clientY+14;
    if(x+tip.offsetWidth>innerWidth-8){x=e.clientX-tip.offsetWidth-14}
    tip.style.left=x+'px';tip.style.top=y+'px'});
  el.addEventListener('mouseleave',function(){tip.style.opacity=0});
});
function paint(){
  document.querySelectorAll('.tt li').forEach(function(el,i){
    setTimeout(function(){el.classList.add('in');
      var b=el.querySelector('.ttb i');if(b)b.style.width=b.dataset.w},90+i*70)});
  document.querySelectorAll('[data-h]').forEach(function(el,i){
    setTimeout(function(){el.style.height=el.dataset.h},220+i*16)});
  var hero=document.getElementById('hero');
  if(!hero)return;
  var end=parseFloat(hero.dataset.secs),t0=null,done=false;
  function pad(n){return String(n).padStart(2,'0')}
  function f(s){s=Math.floor(s);return pad(Math.floor(s/3600))+':'+pad(Math.floor(s%3600/60))+':'+pad(s%60)}
  function land(){done=true;hero.textContent=f(end)}
  function step(ts){if(done)return;if(!t0)t0=ts;var p=Math.min(1,(ts-t0)/800);
    if(p>=1){land();return}
    hero.textContent=f(end*(1-Math.pow(1-p,3)));requestAnimationFrame(step)}
  requestAnimationFrame(step);
  setTimeout(land,900);
}
if(matchMedia('(prefers-reduced-motion:reduce)').matches){
  document.querySelectorAll('[data-h]').forEach(function(el){el.style.height=el.dataset.h});
  document.querySelectorAll('.ttb i').forEach(function(el){el.style.width=el.dataset.w});
  document.querySelectorAll('.tt li').forEach(function(el){el.classList.add('in')});
}else{addEventListener('load',paint)}
`;

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function buildReportHtml(d: ReportData): string {
  const tiles = d.tiles
    .map(
      (t) =>
        `<div class="tile${t.hero ? " hero" : ""}"><div class="k">${esc(t.k)}</div>` +
        `<div class="v num">${t.hero ? `<span id="hero" data-secs="${d.totalSecs}">${esc(t.v)}</span>` : esc(t.v)}</div>` +
        `<div class="n num">${esc(t.n)}</div></div>`,
    )
    .join("");

  const longest = d.longest
    .map(
      (l) =>
        `<li><div class="tth"><span class="ttn">${esc(l.name)}</span>` +
        `<span class="ttv num">${esc(l.dur)}<b>${esc(l.pct)}</b></span></div>` +
        `<div class="ttb"><i data-w="${l.w.toFixed(1)}%"></i></div></li>`,
    )
    .join("");

  const bars = d.days
    .map(
      (day) =>
        `<div class="bar${day.ctx ? " ctx" : ""}${day.h <= 0 ? " zero" : ""}" data-tip="${esc(day.tip)}">` +
        `<i data-h="${Math.max(2, day.h).toFixed(1)}%"></i></div>`,
    )
    .join("");

  const axis = d.days
    .map((day) => `<span class="num${day.on ? " on" : ""}">${esc(day.label)}</span>`)
    .join("");

  const rows = d.rows
    .map(
      (r, i) =>
        `<tr><td class="n num">${i + 1}</td><td class="num">${esc(r.date)}</td>` +
        `<td class="tk">${esc(r.name)}</td><td class="n num">${esc(r.dur)}</td>` +
        `<td class="n num">${esc(r.hours)}</td></tr>`,
    )
    .join("");

  return (
    `<!doctype html><html lang="en"><head><meta charset="utf-8">` +
    `<meta name="viewport" content="width=device-width,initial-scale=1">` +
    `<title>Time Report · ${esc(d.project)} · ${esc(d.period)}</title><style>${REPORT_CSS}</style></head>` +
    `<body><div id="tip"></div><div class="wrap">` +
    `<div class="brand">⏱ Timex</div><h1>Report on Hours</h1>` +
    `<div class="sub"><b>${esc(d.author)}</b> · ${esc(d.project)} · ${esc(d.period)}</div>` +
    `<div class="rule"></div><div class="tiles">${tiles}</div>` +
    `<div class="rule"></div><h2>Longest tasks</h2>` +
    `<div class="note">${esc(d.longestNote)}</div>` +
    `<ul class="tt">${longest}</ul>` +
    `<div class="rule"></div><h2>Hours per day</h2>` +
    `<div class="note">One bar per calendar day.</div>` +
    `<div class="chart"><div class="peak num">peak ${esc(d.peakStr)}</div>` +
    `<div class="bars">${bars}</div></div><div class="xaxis">${axis}</div>` +
    `<div class="rule"></div><h2>Detail</h2>` +
    `<div class="note">Every tracked task, in order.</div><table><thead><tr>` +
    `<th class="n">#</th><th>Date</th><th class="tk">Task</th><th class="n">Duration</th><th class="n">Hours</th></tr></thead>` +
    `<tbody>${rows}</tbody></table>` +
    `<footer>Generated by Timex · ${esc(d.generatedAt)}</footer>` +
    `</div><script>${REPORT_JS}<\/script></body></html>`
  );
}

// Representative sample (One Page, mirrors the real report Kostya shared).
export const SAMPLE_REPORT: ReportData = {
  author: "Kostiantyn Halynskyi",
  project: "One Page",
  period: "July 13 – 18, 2026",
  totalSecs: 53282,
  totalStr: "14:48:02",
  tiles: [
    { k: "Tracked", v: "14:48:02", n: "14.80 h", hero: true },
    { k: "Days worked", v: "2", n: "of 6 in period" },
    { k: "Tasks", v: "14", n: "logged" },
    { k: "Avg / day", v: "7:24:01", n: "7.40 h" },
    { k: "Longest task", v: "2:10:00", n: "2.17 h" },
    { k: "Busiest day", v: "Thu 17 Jul", n: "8:32:10" },
  ],
  longestNote: "The 5 single tasks that took the most time, of 14 logged. Percentages are of tracked time.",
  longest: [
    { name: "Все страницы целиком, создаю HiFi страницы", dur: "2:10:00", pct: "14.6%", w: 100 },
    { name: "Case studies Page", dur: "1:38:20", pct: "11.1%", w: 75.6 },
    { name: "About Page", dur: "0:58:20", pct: "6.6%", w: 44.9 },
    { name: "Services Page", dur: "0:46:40", pct: "5.3%", w: 35.9 },
    { name: "Reviewing the client feedback thread", dur: "0:41:05", pct: "4.6%", w: 31.6 },
  ],
  peakStr: "8:32:10",
  days: [
    { label: "Mon 13", h: 2, on: true, tip: "Mon 13 Jul · 0:00:00" },
    { label: "Tue 14", h: 74, on: true, tip: "Tue 14 Jul · 6:19:52" },
    { label: "Wed 15", h: 2, on: true, tip: "Wed 15 Jul · 0:00:00" },
    { label: "Thu 16", h: 2, on: true, tip: "Thu 16 Jul · 0:00:00" },
    { label: "Fri 17", h: 100, on: true, tip: "Fri 17 Jul · 8:32:10" },
    { label: "Sat 18", h: 2, on: true, tip: "Sat 18 Jul · 0:00:00" },
    { label: "Sun 19", h: 2, on: false, tip: "Sun 19 Jul · 0:00:00" },
  ],
  rows: [
    { date: "2026-07-17", name: "Все страницы целиком, создаю HiFi страницы", dur: "2:10:00", hours: "2.17" },
    { date: "2026-07-17", name: "Case studies Page", dur: "1:38:20", hours: "1.64" },
    { date: "2026-07-17", name: "About Page", dur: "0:58:20", hours: "0.97" },
    { date: "2026-07-17", name: "Services Page", dur: "0:46:40", hours: "0.78" },
    { date: "2026-07-16", name: "Reviewing the client feedback thread", dur: "0:41:05", hours: "0.68" },
    { date: "2026-07-16", name: "Wiring the contact form", dur: "0:33:12", hours: "0.55" },
    { date: "2026-07-16", name: "Homepage hero polish", dur: "0:28:44", hours: "0.48" },
  ],
  generatedAt: "2026-07-18 12:40",
};
