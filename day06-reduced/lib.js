/* Day 6 helpers shared by every part (owner: Shreya). Loaded by deck.html before the parts,
   so any part can be previewed alone with ?only=<part>. The Day 6 styles go into the page head once. */
(() => {
  const el = document.createElement('style'); el.id = 'd6-style';
  el.textContent = `
  .stage{ padding:7.2vh 5.2vw 9.5vh; gap:1.5vh; }
  .stage > .cite{ position:static; margin-top:auto; padding-top:.8vh; font-size:clamp(.8rem, 1.12vw, 1.15rem); color:var(--mute); }
  .stage > .cite a{ color:var(--mute); }
  .d6-cols{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1fr 1fr; gap:2.4vw; align-items:center; }
  .d6-grid3{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:repeat(3, 1fr); gap:1.6vw; align-items:stretch; }
  .d6-card{ background:#f8fafc; padding:1.6vh 1.4vw; border-radius:12px; border:1px solid var(--line); display:flex; flex-direction:column; gap:1vh; }
  .d6-eq{ background:#f1f5f9; border:1px solid #cbd5e1; border-left:4px solid var(--ink); border-radius:10px;
    padding:1.1vh 1.2vw; font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
    font-size:clamp(.88rem, 1.32vw, 1.28rem); font-weight:600; color:#0f172a; line-height:1.45; }
  .d6-tbl{ border-collapse:collapse; font-size:clamp(.9rem, 1.35vw, 1.3rem); background:#f8fafc; border:1px solid var(--line); }
  .d6-tbl th, .d6-tbl td{ text-align:center; padding:1vh 1.4vw; border-top:1px solid var(--line); }
  .d6-tbl th{ background:#0f172a; color:#f8fafc; font-weight:700; border-top:none; }
  .d6-tbl td.rowh{ text-align:left; font-weight:700; }
  .d6-img{ width:100%; height:100%; min-height:0; object-fit:contain; display:block; }
  .d6-todo{ border:2px dashed #94a3b8; border-radius:10px; padding:1vh 1vw; color:var(--mute); }
  @media (max-width: 820px), (max-aspect-ratio: 1/1){
    .stage{ padding:6vh 4vw 6.5vh; gap:1vh; }
    .stage h1.t{ font-size:clamp(1.18rem, 4vw, 1.7rem); }
    .stage .statement{ font-size:clamp(1rem, 3.2vw, 1.4rem); }
    .stage .lead, .stage ul.frag li{ font-size:clamp(.9rem, 2.6vw, 1.2rem); line-height:1.26; }
    .stage .label{ font-size:clamp(.76rem, 2.2vw, 1rem); line-height:1.25; }
    .d6-cols, .d6-grid3{ grid-template-columns:1fr; gap:1.1vh; }
  }
  .d6-road{ flex:1 1 auto; min-height:0; display:flex; flex-direction:column; justify-content:center; gap:2vh; }
  .d6-road-row{ display:grid; grid-template-columns:minmax(14em, 26vw) 1fr; gap:2vw; align-items:baseline;
    padding:.6vh 0 .6vh 1.2vw; border-left:4px solid transparent; }
  .d6-road-row.now{ border-left-color:var(--ink); }
  .d6-road-row.off{ opacity:.32; }
  .d6-road-row .nm{ font-weight:700; }
  @media (max-width: 820px), (max-aspect-ratio: 1/1){ .d6-road-row{ grid-template-columns:1fr; gap:.2vh; } }
`;
  document.head.appendChild(el);
})();
window.d6Link = (href, t) => `<a href="${href}" target="_blank" rel="noopener" onclick="event.stopPropagation()" style="color:inherit">${t}</a>`;

/* Today's plan: one row per block of the class, with the question it answers (plan doc's clock). */
window.D6_AGENDA = [
  ['The problem',      'Why do models that test well fail in the real world?'],
  ['Get better data',  'How do we get data that covers the real world?'],
  ['Check the data',   'Is this dataset right for my task?'],
  ['Check the model',  'Can we trust the test score?'],
  ['Lab',              ''],
];
/* cur = index of the block now starting (-1 = none). build = one row per click; otherwise the whole list on click 1. */
window.d6Roadmap = (cur, build) => `<div class="d6-road">${D6_AGENDA.map(([nm, q], i) => `
  <div class="d6-road-row b ${i === cur ? 'now' : cur >= 0 ? 'off' : ''}" data-step="${build ? i + 1 : 1}">
    <div class="lead nm">${nm}</div><div class="lead">${q}</div>
  </div>`).join('')}</div>`;

/* Day 6 reduced: a citation that arrives with the content, so the slide still opens on its title alone. */
window.rdCite = (t, step = 1) => `<div class="cite b" data-step="${step}">${t}</div>`;
