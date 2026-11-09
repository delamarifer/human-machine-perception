/* PART: check-data (Day 6 reduced). Google deck pages 25-34, one HTML slide each. Titles are the Google deck's.
   Facts on the slides were checked for day06 (day06/feedback/_day.md, Rounds 6, 7, 8, 11); sources in the credit lines.
   Figures that only illustrate a mechanism are drawn or computed in the scenes and marked "example" there. No speaker notes. */
{
section('Check your data');

const cdA = (url, t) => d6Link(url, t);
const cdStyle = `<style>
  .check-data-trans{ margin:auto; text-align:center; display:flex; flex-direction:column; gap:2.4vh; }
  .check-data-find{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1fr 1.5fr; gap:3vw; align-items:center; }
  .check-data-paper{ display:flex; justify-content:center; }
  .check-data-paper svg{ width:min(21vw, 46vh); height:auto; display:block; }
  .check-data-dests{ display:flex; flex-direction:column; gap:3vh; }
  .check-data-dest{ display:grid; grid-template-columns:5vw minmax(0, 1fr); gap:1.4vw; align-items:center; }
  .check-data-arrow{ font-size:clamp(1.8rem, 3vw, 2.8rem); color:var(--mute); text-align:center; }
  .check-data-dest .lead{ font-size:clamp(1.8rem, 3.2vw, 3rem); font-weight:700; line-height:1.1; }
  .check-data-dest a{ text-decoration:none; }
  .check-data-tile{ position:relative; }
  .check-data-tile svg, .check-data-tile img{ display:block; width:100%; aspect-ratio:4/3; object-fit:cover; border-radius:6px; }
  .check-data-tile.check-data-ring{ outline:4px solid var(--ink); outline-offset:1px; border-radius:6px; }
  .check-data-tag{ position:absolute; left:5%; bottom:6%; background:#fff; border-radius:4px; padding:0 .35em; font-size:clamp(.95rem, 1.45vw, 1.4rem); font-weight:700; }
  .check-data-x{ position:absolute; right:5%; top:3%; font-weight:700; font-size:clamp(1.5rem, 2.5vw, 2.3rem); line-height:1; text-shadow:0 0 6px #fff, 0 0 6px #fff, 0 0 6px #fff; }
  .check-data-sym{ font-size:clamp(1.5rem, 2.5vw, 2.3rem); font-weight:700; line-height:1; }
  .check-data-counts{ border-collapse:collapse; font-size:clamp(.95rem, 1.45vw, 1.4rem); }
  .check-data-counts td, .check-data-counts th{ padding:.7vh .7vw; text-align:center; border:1px solid var(--line); min-width:2.8em; }
  .check-data-counts td.z{ font-weight:700; outline:3px solid var(--ink); outline-offset:-3px; }
  .check-data-qs{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:repeat(5, 1fr); gap:1.4vw; align-items:start; align-content:center; }
  .check-data-q{ display:flex; flex-direction:column; gap:1.6vh; }
  .check-data-qfig{ height:32vh; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:.6vh; }
  .check-data-qfig > .check-data-tile{ width:100%; }
  .check-data-qfig.check-data-stack > .check-data-tile{ width:18vh; }
  .check-data-cue{ font-size:clamp(1.15rem, 2.05vw, 1.9rem); line-height:1.2; font-weight:700; text-align:center; }
  .check-data-seq{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:repeat(3, 1fr); grid-template-rows:1fr 1fr; gap:1.2vh 2vw; }
  .check-data-sq{ display:flex; flex-direction:column; gap:.8vh; align-items:center; justify-content:center; min-height:0; }
  .check-data-sfig{ height:21vh; width:100%; display:flex; gap:.8vw; align-items:center; justify-content:center; }
  .check-data-sfig > .check-data-tile{ width:12.4vw; }
  .check-data-sfig.check-data-one > .check-data-tile{ width:28vh; }
  .check-data-sfig svg.check-data-page{ height:100%; width:auto; display:block; }
  .check-data-mini{ display:grid; grid-template-columns:repeat(3, 1fr); gap:4px; width:38vh; }
  @media (max-width: 820px), (max-aspect-ratio: 1/1){
    .check-data-find{ grid-template-columns:1fr; gap:.4vh; }
    .check-data-qs{ grid-template-columns:repeat(2, 1fr); }
    .check-data-seq{ grid-template-columns:repeat(2, 1fr); grid-template-rows:none; }
  }
</style>`;

/* Small figures reused from p28, p29 and p33. Tiles are our drawing; the counts are p33's toy counts. */
const CD_CAT = 'assets/check-data/june-odd-eyed-cat.jpg';
const CD_CAT_CREDIT = 'Photo: Keith Kissel, "June odd-eyed-cat" (cropped), CC BY 2.0, via Wikimedia Commons';
const cdGlyph = (kind, fg, wh) => kind === 'car'
  ? `<g transform="translate(60,52) scale(1.05)"><rect x="-30" y="0" width="60" height="22" rx="5" fill="${fg}"/><path d="M -16 0 L -8 -14 L 16 -14 L 24 0 Z" fill="${fg}"/><circle cx="-16" cy="24" r="7" fill="${wh}"/><circle cx="16" cy="24" r="7" fill="${wh}"/></g>`
  : kind === 'person' ? `<g transform="translate(60,48) scale(1.05)"><circle cx="0" cy="-16" r="8" fill="${fg}"/><rect x="-8" y="-7" width="16" height="24" rx="6" fill="${fg}"/><rect x="-7" y="15" width="6" height="18" rx="2" fill="${fg}"/><rect x="1" y="15" width="6" height="18" rx="2" fill="${fg}"/></g>` : '';
const cdExtras = ({tag, x}) => (tag ? `<div class="check-data-tag">${tag}</div>` : '') + (x ? '<div class="check-data-x">✗</div>' : '');
const cdTile = (kind, night, o = {}) => `<div class="check-data-tile${o.ring ? ' check-data-ring' : ''}"><svg viewBox="0 0 120 90" aria-hidden="true"><rect width="120" height="90" fill="${night ? '#1e293b' : '#e2e8f0'}"/><rect y="62" width="120" height="28" fill="${night ? '#0f172a' : '#cbd5e1'}"/>${cdGlyph(kind, night ? '#64748b' : '#475569', night ? '#334155' : '#1e293b')}</svg>${cdExtras(o)}</div>`;
const cdCat = (o = {}) => `<div class="check-data-tile"><img src="${CD_CAT}" alt="A cat with one blue eye and one amber eye">${cdExtras(o)}</div>`;
const cdCounts = `<table class="check-data-counts"><tr><th></th><th>day</th><th>night</th></tr><tr><th>car</th><td>6</td><td class="z">0</td></tr><tr><th>person</th><td class="z">0</td><td>6</td></tr></table>`;
const cdLines = [46, 62, 78, 94, 134, 150, 166].map(y => `<line x1="26" y1="${y}" x2="134" y2="${y}" stroke="#cbd5e1" stroke-width="5"/>`).join('');
const cdPaper = (cls = '') => `<svg class="${cls}" viewBox="0 0 160 212" role="img" aria-label="A paper">
  <rect x="6" y="6" width="148" height="200" rx="4" fill="#fff" stroke="#0f172a" stroke-width="3"/>
  <line x1="26" y1="26" x2="110" y2="26" stroke="#0f172a" stroke-width="7"/>${cdLines}
  <rect x="20" y="108" width="120" height="16" rx="3" fill="#0f172a"/></svg>`;

/* ---------- p25: transition ---------- */
st(`${cdStyle}
  <div class="check-data-trans">
    <h1 class="t">Find your dataset</h1>
    <div class="lead b" data-step="1">What can we do</div>
  </div>
`);

/* ---------- p26: her list as destinations: the paper, arrows, the names. "…" stands for her "etc". ---------- */
st(`
  <h1 class="t">Find papers that do what you want to do</h1>
  <div class="check-data-find">
    <div class="check-data-paper b" data-step="1">${cdPaper()}</div>
    <div class="check-data-dests">
      <div class="check-data-dest b" data-step="2"><div class="check-data-arrow">→</div><div class="lead">${cdA('https://huggingface.co/datasets', 'Hugging Face')}</div></div>
      <div class="check-data-dest b" data-step="3"><div class="check-data-arrow">→</div><div class="lead">${cdA('https://www.kaggle.com/datasets', 'Kaggle')}</div></div>
      <div class="check-data-dest b" data-step="4"><div class="check-data-arrow">→</div><div class="lead">…</div></div>
    </div>
  </div>
`);

/* ---------- p27: transition ---------- */
st(`
  <div class="check-data-trans">
    <h1 class="t">Check your dataset</h1>
  </div>
`);

/* ---------- p28: label errors. Scene: model looks wrong, label is what is wrong; Northcutt et al. 2021 as waffles. ---------- */
sc('checkDataLabels', 'scenes/check-data-labels.html');

/* ---------- p29: the four methods, each animated; the similarity check is day06's near-dup scene, cut to cues. ---------- */
sc('checkDataMethods', 'scenes/check-data-methods.html');

/* ---------- p30: split by item vs by person, with the WLASL split (day06 Round 11). ---------- */
sc('checkDataSplits', 'scenes/check-data-splits.html');

/* ---------- p31: transition ---------- */
st(`
  <div class="check-data-trans">
    <h1 class="t">Data evaluation- in class activity</h1>
    <div class="lead b" data-step="1">This is just as an exercise</div>
  </div>
`);

/* ---------- p32: day06's five questions as short cues, each with a small figure from p28, p29 or p33. Her "TODO -- bring it in". ---------- */
const cdQ = (step, fig, cls, cue) => `<div class="check-data-q b" data-step="${step}"><div class="check-data-qfig${cls ? ' ' + cls : ''}">${fig}</div><div class="check-data-cue">${cue}</div></div>`;
st(`
  <h1 class="t">Is this dataset right for my task?</h1>
  <div class="lead b" data-step="1">Questions to ask ourselves</div>
  <div class="check-data-qs">
    ${cdQ(1, cdTile('car', false, {tag: 'car'}), '', '1. Labels what I need?')}
    ${cdQ(2, cdTile('car', false) + '<div class="check-data-sym">≠</div>' + cdTile('car', true), 'check-data-stack', '2. Looks like my world?')}
    ${cdQ(3, cdCounts, '', '3. Enough hard cases?')}
    ${cdQ(4, cdCat({tag: 'dog', x: true}), '', '4. Labels right?')}
    ${cdQ(5, cdCat() + '<div class="check-data-sym">=</div>' + cdCat(), 'check-data-stack', '5. Can I use it?')}
  </div>
  ${rdCite('Drawings and counts: our example · ' + CD_CAT_CREDIT + ' · the "dog" label is an example')}
`);

/* ---------- p33: her example, every label tied to one condition. Scene: drawn tiles, brightness rule computed. ---------- */
sc('checkDataCondition', 'scenes/check-data-condition.html');

/* ---------- p34: day06's steps as a figure sequence, step names only. Her "TODO: add a reputable source": each step credited only
   by a source checked for day06 that supports it; the others say "source: to add". ---------- */
const cdS = (step, cls, fig, nm) => `<div class="check-data-sq b" data-step="${step}"><div class="check-data-sfig${cls ? ' ' + cls : ''}">${fig}</div><div class="check-data-cue">${step}. ${nm}</div></div>`;
const cdMini = [['car', 0, 0], ['person', 0, 1], ['car', 1, 0], ['car', 0, 1], ['person', 0, 0], ['car', 0, 0]].map(([k, n, r]) => cdTile(k, !!n, {ring: !!r})).join('');
st(`
  <h1 class="t">Check your data</h1>
  <div class="lead b" data-step="1">Steps for checking this</div>
  <div class="check-data-seq">
    ${cdS(1, '', `<div class="check-data-mini">${cdMini}</div>`, 'Look')}
    ${cdS(2, '', cdCounts, 'Tag, then count')}
    ${cdS(3, '', cdCat() + '<div class="check-data-sym">=</div>' + cdCat(), 'Find copies')}
    ${cdS(4, 'check-data-one', cdTile('empty', false, {tag: 'car', x: true}), 'Find bad labels')}
    ${cdS(5, '', cdTile('car', false) + '<div class="check-data-sym">≠</div>' + cdTile('car', true), 'Compare to your world')}
    ${cdS(6, '', cdPaper('check-data-page'), 'Write it down')}
  </div>
  ${rdCite('Step 3: ' + cdA('https://arxiv.org/abs/1902.00423', 'Barz and Denzler (J. Imaging 2020)') + ' · Step 4: ' + cdA('https://arxiv.org/abs/2103.14749', 'Northcutt et al. (NeurIPS 2021)') + ' · Step 6: ' + cdA('https://arxiv.org/abs/1803.09010', 'Gebru et al., Datasheets for Datasets (CACM 2021)') + ' · Steps 1, 2, 5: source: to add · Drawings and counts: our example · ' + CD_CAT_CREDIT)}
`);
}
