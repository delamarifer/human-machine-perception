/* Day 11 helpers (copied from day10-part1/lib.js) shared by every part (owner: Fernanda). Loaded by deck.html before the parts,
   so any part can be previewed alone with ?only=<part>. Every class starts with d11-. */
(() => {
  const el = document.createElement('style'); el.id = 'd11-style';
  el.textContent = `
  .d11-plan{ margin:auto; padding-left:1.4em; display:flex; flex-direction:column; gap:1.5vh; max-width:48em; }
  .d11-plan > li{ font-size:clamp(1.15rem, 2.05vw, 1.85rem); line-height:1.3; }
  .d11-plan small{ color:var(--mute); font-size:.72em; white-space:nowrap; }
  .d11-tag{ text-align:center; color:var(--mute); font-size:clamp(.95rem, 1.4vw, 1.3rem); }
  .stage{ padding:7.2vh 5.2vw 9.5vh; gap:1.8vh; }
  .stage > .cite{ position:static; margin-top:auto; padding-top:.8vh; font-size:clamp(.8rem, 1.12vw, 1.15rem); color:var(--mute); }
  .stage > .cite a{ color:var(--mute); }
  .d11-body{ flex:1 1 auto; min-height:0; display:flex; flex-direction:column; justify-content:center; gap:4vh; }
  .d11-cols{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1.2fr 1fr; gap:3vw; align-items:center; }
  .d11-side{ display:flex; flex-direction:column; gap:2.4vh; justify-content:center; }
  .d11-media{ position:relative; height:100%; min-height:0; display:flex; align-items:center; justify-content:center; }
  .d11-media video, .d11-media img{ max-width:100%; max-height:58vh; border-radius:10px; }
  .d11-svg{ width:100%; height:auto; max-height:56vh; }
  .d11-svg .d11-edge{ fill:none; stroke:var(--ink); stroke-width:4; stroke-linejoin:round; }
  .d11-svg .d11-face{ fill:var(--early); fill-opacity:.35; stroke:none; }
  .d11-svg text{ font-family:var(--font); font-size:22px; fill:var(--ink); text-anchor:middle; }
  .d11-cards{ display:grid; grid-template-columns:1fr 1fr; gap:1.6vw; }
  .d11-card{ border:2px solid var(--ink); border-radius:12px; padding:1.8vh 1.2vw; display:flex; flex-direction:column; gap:1vh; }
  .d11-card b{ font-size:clamp(1.25rem, 2.1vw, 1.95rem); }
  .d11-card span{ font-size:clamp(1.05rem, 1.6vw, 1.5rem); line-height:1.35; }
  .d11-card a{ color:inherit; font-size:clamp(1rem, 1.5vw, 1.4rem); }
  .d11-flow{ display:flex; align-items:center; justify-content:center; gap:1.4vw; }
  .d11-flow > div{ border:2px solid var(--ink); border-radius:12px; padding:2vh 1.4vw; font-size:clamp(1.15rem, 2vw, 1.85rem); font-weight:600; text-align:center; }
  .d11-flow > i{ font-style:normal; font-size:clamp(1.6rem, 3vw, 2.8rem); }
  .d11-flow .d11-net{ background:var(--ink); color:#fff; }
  .d11-code{ margin:0; font-family:'SF Mono', Menlo, Consolas, monospace; font-size:clamp(.85rem, 1.45vw, 1.35rem); line-height:1.45;
    background:#f8fafc; border:1px solid var(--line); border-radius:12px; padding:2vh 1.6vw; white-space:pre; overflow:hidden; }
  .d11-grid3{ flex:1 1 auto; display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:1.6vw; align-content:center; }
  .d11-rows{ display:flex; flex-direction:column; gap:2.4vh; max-width:52em; margin:0 auto; width:100%; }
  .d11-rows > div{ display:grid; grid-template-columns:7em 1fr; gap:1.6vw; align-items:baseline; border-top:3px solid var(--ink); padding-top:1.2vh; }
  .d11-rows b{ font-size:clamp(1.3rem, 2.3vw, 2.1rem); }
  .d11-rows span{ font-size:clamp(1.15rem, 2vw, 1.85rem); line-height:1.3; }
  .d11-list{ margin:0 auto; padding-left:1.4em; display:flex; flex-direction:column; gap:2vh; max-width:44em; }
  .d11-list > li{ font-size:clamp(1.25rem, 2.3vw, 2.1rem); line-height:1.3; }
  @media (max-width: 820px), (max-aspect-ratio: 1/1){
    .stage{ padding:6vh 4vw 6.5vh; gap:1vh; }
    .d11-cols, .d11-cards, .d11-grid3{ grid-template-columns:1fr; }
  }
  `;
  document.head.appendChild(el);
})();

/* Placeholder: one slide listing the slides planned for a section, one per click.
   Each section replaces its placeholder as it gets built. */
function d11Plan(title, minutes, items){
  st(`
    <h1 class="t">${title}</h1>
    <ol class="d11-plan">${items.map(([t, m]) => `<li class="b">${t} <small>· ${m}</small></li>`).join('')}</ol>
    <div class="d11-tag">Plan, not built yet · about ${minutes} min</div>
  `, { notes: [`(draft) ${title}: plan for about ${minutes} minutes.`, ...items.map(([t]) => `(draft) ${t}.`)] });
}

/* Shared citations for Day 11. The spine of this session is Jitendra Malik's argument; every slide that
   carries it says so. Links go to the public course page and the talk recording. */
const MALIK_COURSE = 'https://robots-that-learn.github.io/';
const MALIK_TALK = 'https://www.youtube.com/watch?v=HvDU7Vk4pbc';
const d11Link = (t, href) => `<a href="${href}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${t}</a>`;
const MALIK_CITE = 'After ' + d11Link('Jitendra Malik, "Robots that Learn" (CS 294-277, Berkeley, Spring 2026), Lecture 1', MALIK_COURSE)
  + ' and ' + d11Link('"Vision and Robotics for Embodied AI" (ETH Zurich, 2026)', MALIK_TALK);

/* Extra styles for Day 11 (every class starts with d11-). */
(() => {
  if(document.getElementById('d11-extra')) return;
  const el = document.createElement('style'); el.id = 'd11-extra';
  el.textContent = `
  .d11-chips{ display:flex; flex-wrap:wrap; gap:.8vh .7vw; justify-content:center; align-content:center; max-width:52em; margin:0 auto; }
  .d11-chips > span{ border:2px solid var(--ink); border-radius:999px; padding:.7vh 1.1vw; font-size:clamp(.95rem, 1.6vw, 1.5rem); font-weight:600; }
  .d11-two{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1fr 1fr; gap:3vw; align-items:center; }
  .d11-col{ display:flex; flex-direction:column; gap:1.4vh; }
  .d11-col > b{ font-size:clamp(1.1rem, 1.8vw, 1.6rem); text-transform:uppercase; letter-spacing:.06em; color:var(--mute); }
  .d11-col > span{ font-size:clamp(1.15rem, 2vw, 1.8rem); line-height:1.3; }
  .d11-quote{ max-width:40em; margin:0 auto; border-left:10px solid var(--ink); padding:1.4vh 1.6vw; font-size:clamp(1.2rem, 2.1vw, 1.95rem); line-height:1.35; }
  .d11-quote small{ display:block; margin-top:1vh; color:var(--mute); font-size:.68em; }
  .d11-score{ display:flex; flex-direction:column; gap:2.2vh; max-width:46em; margin:0 auto; width:100%; }
  .d11-score > div{ display:grid; grid-template-columns:10em 1fr; gap:1.4vw; align-items:center; }
  .d11-score b{ font-size:clamp(1.3rem, 2.2vw, 2rem); }
  .d11-score span{ font-size:clamp(1.1rem, 1.8vw, 1.6rem); color:var(--mute); }
  .d11-big{ text-align:center; font-weight:700; font-size:clamp(2rem, 4.6vw, 4.2rem); line-height:1; }
  .d11-big small{ display:block; font-weight:400; font-size:.26em; color:var(--mute); margin-top:1.4vh; line-height:1.3; }
  /* embedded video: we link to other people's recordings rather than copying their figures */
  .d11-watch{ flex:1 1 auto; min-height:0; display:flex; flex-direction:column; gap:1.4vh; }
  .d11-embed{ flex:1 1 auto; min-height:0; width:100%; border:2px solid var(--line); border-radius:12px; background:#000; }
  .d11-paper{ align-self:stretch; border:2px solid var(--ink); border-left:10px solid var(--what); border-radius:12px;
    padding:1.4vh 1.4vw; display:flex; flex-direction:column; gap:.6vh; }
  .d11-paper b{ font-size:clamp(1.15rem, 1.9vw, 1.7rem); line-height:1.25; }
  .d11-paper span, .d11-paper a{ font-size:clamp(1rem, 1.5vw, 1.4rem); color:var(--ink); }
  .d11-svg .d11-node{ fill:#fff; stroke:var(--ink); stroke-width:3; }
  .d11-svg .d11-arc{ fill:none; stroke:var(--ink); stroke-width:3.5; }
  `;
  document.head.appendChild(el);
})();

/* ---- drawing helpers (Day 11) ----
   Every figure in this deck is drawn here, not copied from anywhere. Each SVG carries its own arrowhead
   marker, keyed by a unique id, so a slide still draws correctly when it is previewed on its own. */
const d11Arrow = id => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7"
  orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--ink)"/></marker></defs>`;
/* a box of text inside an SVG, wrapped by the browser rather than by us guessing line breaks */
const d11Box = (x, y, w, h, t, o = {}) => `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r ?? 14}" fill="${o.fill || '#fff'}"
    stroke="var(--ink)" stroke-width="${o.sw ?? 3}" ${o.dash ? 'stroke-dasharray="9 7"' : ''}/>
  <foreignObject x="${x + 10}" y="${y + 8}" width="${w - 20}" height="${h - 16}">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:var(--font);font-size:${o.fs || 21}px;line-height:1.22;
      color:${o.color || 'var(--ink)'};text-align:center;display:flex;align-items:center;justify-content:center;
      height:100%;font-weight:${o.fw || 400}">${t}</div>
  </foreignObject>`;
/* a tick, a half-filled circle and a cross: qualitative marks, never standing in for a measured quantity */
const d11Mark = (kind, cx, cy, r = 26) => {
  const c = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" stroke="var(--ink)" stroke-width="3.5"/>`;
  if(kind === 'full') return c + `<path d="M ${cx - r * .48} ${cy} l ${r * .34} ${r * .36} l ${r * .64} ${-r * .72}"
    fill="none" stroke="var(--ink)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;
  if(kind === 'half') return c + `<path d="M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} Z" fill="var(--ink)"/>`;
  return c + `<path d="M ${cx - r * .42} ${cy - r * .42} l ${r * .84} ${r * .84} M ${cx + r * .42} ${cy - r * .42} l ${-r * .84} ${r * .84}"
    fill="none" stroke="var(--ink)" stroke-width="5" stroke-linecap="round"/>`;
};
