/* PART: labeling (Day 6 reduced). Google deck pages 14-19 (as of 12:35 on 2026-11-09), one HTML slide each. No speaker notes.
   Published numbers come from day06/parts/broaden.js, eval-data.js and feedback/_day.md (checked there) or were checked
   against the source named in the credit line on 2026-11-09. Computed values are computed here from their inputs;
   example inputs say so in the credit line. Logos are trademarks, used only to identify the companies. */
{
section('Labeling');

const lbA = d6Link;
const LB_SCALE = lbA('https://scale.com/guides/data-labeling-annotation-guide', 'Scale AI, Data Labeling guide');
const LB_SAM = lbA('https://arxiv.org/abs/2304.02643', 'Kirillov et al., Segment Anything (2023)');
const LB_NORTH = lbA('https://arxiv.org/abs/2103.14749', 'Northcutt, Athalye and Mueller (NeurIPS 2021)');

const lbStyle = `<style>
  .labeling-three{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:repeat(3, 1fr); gap:2vw; align-items:stretch; align-content:center; }
  .labeling-three .d6-card{ justify-content:center; align-items:center; padding:2.2vh 1.6vw; gap:2vh; text-align:center; }
  .labeling-cue{ font-size:clamp(1.15rem, 2vw, 1.85rem); line-height:1.25; }
  .labeling-icon{ width:100%; height:17vh; display:block; }
  .labeling-svg{ flex:1 1 auto; min-height:0; width:100%; display:block; }
  .labeling-svg text{ font-family:var(--font); fill:var(--ink); }
  .labeling-col{ display:flex; flex-direction:column; gap:1.8vh; justify-content:center; min-height:0; }
  .labeling-logos{ flex:1 1 auto; min-height:0; display:flex; flex-direction:column; justify-content:center; gap:4.4vh; }
  .labeling-logo-row{ display:grid; grid-template-columns:minmax(0, 1fr) minmax(0, 1.05fr); gap:3vw; align-items:center; }
  .labeling-logo-set{ display:flex; align-items:center; gap:3vw; min-height:11vh; }
  .labeling-logo-set img{ height:10vh; width:auto; display:block; }
  .labeling-logo-set span{ font-weight:700; }
  .labeling-old.b{ opacity:1; transform:none; }
  .labeling-old.b.shown{ opacity:0; }
  .labeling-bar-row .label{ white-space:nowrap; }
  .labeling-bar-row{ display:grid; grid-template-columns:7.2em 1fr; gap:.7vw; align-items:center; }
  .labeling-bar-row i{ display:block; height:2.5vh; background:var(--ink); border-radius:3px; }
  .labeling-bar-row.light i{ background:#94a3b8; }
  .labeling-lanes{ flex:1 1 auto; min-height:0; display:flex; flex-direction:column; justify-content:center; gap:3vh; }
  .labeling-lane{ display:grid; grid-template-columns:11vw minmax(0, 1fr) minmax(0, 1.05fr); gap:2vw; align-items:center; }
  .labeling-lane svg{ width:100%; height:12vh; display:block; }
  .labeling-platform{ grid-template-columns:11vw 17vw minmax(0, 1fr); }
  .labeling-platform .labeling-logo-set{ gap:3.2vw; min-height:0; }
  .labeling-platform .labeling-logo-set img{ height:6.6vh; }
  .labeling-stages{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1fr auto 1fr auto 1fr auto 1fr; gap:.8vw; align-items:stretch; align-content:center; }
  .labeling-stages .d6-card{ justify-content:flex-start; align-items:center; text-align:center; padding:2vh 1vw; gap:1.4vh; }
  .labeling-stages .labeling-arrow{ align-self:center; font-size:clamp(1.4rem, 2.4vw, 2.2rem); color:var(--mute); }
  .labeling-votes{ display:flex; justify-content:space-between; gap:.6vw; }
  .labeling-vote{ display:flex; flex-direction:column; align-items:center; gap:.4vh; flex:1 1 0; }
  .labeling-vote svg{ width:100%; height:9vh; display:block; }
  .labeling-thread{ display:flex; flex-direction:column; gap:1vh; }
  .labeling-embed{ flex:1 1 auto; min-height:0; border:1.5px solid var(--line); border-radius:10px; overflow:hidden; }
  .labeling-embed iframe{ width:100%; height:100%; border:0; display:block; }
  .labeling-ann{ flex:1 1 auto; min-height:0; display:flex; flex-direction:column; justify-content:center; gap:1.6vh; }
  .labeling-ann-h{ margin-bottom:1vh; }
  .labeling-ann-stages .labeling-icon{ height:7vh; }
  .labeling-ann-stages .d6-card{ padding:1vh .8vw; gap:.6vh; }
  .labeling-ann-lanes{ gap:.6vh; flex:0 0 auto; }
  .labeling-ann-lanes svg{ height:6vh; }
  .labeling-ann-lanes .labeling-logo-set img{ height:5vh; }
  @media (max-width: 820px), (max-aspect-ratio: 1/1){
    .labeling-three, .labeling-stages{ grid-template-columns:1fr; }
    .labeling-stages .labeling-arrow{ display:none; }
    .labeling-logo-row, .labeling-lane{ grid-template-columns:1fr; gap:.6vh; }
  }
</style>`;

/* Drawn car, shared by the box, mask and agreement figures (same shapes as day06/parts/broaden.js). */
const LB_CAR = '<rect x="-30" y="0" width="60" height="22" rx="5" fill="#475569"/><path d="M -16 0 L -8 -14 L 16 -14 L 24 0 Z" fill="#475569"/><circle cx="-16" cy="24" r="7" fill="#1e293b"/><circle cx="16" cy="24" r="7" fill="#1e293b"/>';
const LB_POLY = '-30,3 -26,0 -16,0 -8,-14 16,-14 24,0 26,0 30,3 30,22 23,31 9,31 -9,31 -23,31 -30,22';
const lbPerson = (x, y, s = 1, fill = '#475569') => `<g transform="translate(${x},${y}) scale(${s})"><circle cx="0" cy="-22" r="11" fill="${fill}"/><path d="M -16 22 C -16 -6, 16 -6, 16 22 Z" fill="${fill}"/></g>`;

/* ---------- p14: transition slide, her sentences ---------- */
const LB_ICON_COST = `<svg class="labeling-icon" viewBox="0 0 240 140" aria-hidden="true">
  <circle cx="82" cy="70" r="54" fill="#f8fafc" stroke="#0f172a" stroke-width="6"/>
  <line x1="82" y1="70" x2="82" y2="34" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
  <line x1="82" y1="70" x2="110" y2="84" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
  ${[0, 1, 2, 3].map(i => `<ellipse cx="186" cy="${116 - i * 18}" rx="34" ry="12" fill="#94a3b8" stroke="#0f172a" stroke-width="4"/>`).join('')}
</svg>`;
const LB_NOISY_BAD = [2, 7];
const LB_ICON_NOISY = `<svg class="labeling-icon" viewBox="0 0 240 140" aria-hidden="true">
  ${[...Array(12)].map((_, k) => { const x = 28 + (k % 4) * 50, y = 8 + Math.floor(k / 4) * 44, bad = LB_NOISY_BAD.includes(k);
    return `<rect x="${x}" y="${y}" width="42" height="36" rx="4" fill="${bad ? '#fff' : '#cbd5e1'}" stroke="#0f172a" stroke-width="${bad ? 4 : 2}"/>` +
      (bad ? `<path d="M ${x + 12} ${y + 9} L ${x + 30} ${y + 27} M ${x + 30} ${y + 9} L ${x + 12} ${y + 27}" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/>` : ''); }).join('')}
</svg>`;
const LB_ICON_IDEA = `<svg class="labeling-icon" viewBox="0 0 240 140" aria-hidden="true">
  <path d="M 120 12 C 88 12 68 36 68 62 C 68 84 84 94 92 112 L 148 112 C 156 94 172 84 172 62 C 172 36 152 12 120 12 Z" fill="#f8fafc" stroke="#0f172a" stroke-width="6"/>
  <line x1="98" y1="124" x2="142" y2="124" stroke="#0f172a" stroke-width="7" stroke-linecap="round"/>
  <path d="M 104 66 L 120 84 L 136 66" fill="none" stroke="#0f172a" stroke-width="5" stroke-linejoin="round"/><line x1="120" y1="84" x2="120" y2="110" stroke="#0f172a" stroke-width="5"/>
</svg>`;
st(`${lbStyle}
  <h1 class="t">Why am I telling you about big data?</h1>
  <div class="labeling-three">
    <div class="d6-card b" data-step="1">${LB_ICON_COST}<div class="labeling-cue">Data collection is slow and costly</div></div>
    <div class="d6-card b" data-step="2">${LB_ICON_NOISY}<div class="labeling-cue">Data collection can be noisy and not necessarily clean</div></div>
    <div class="d6-card b" data-step="3">${LB_ICON_IDEA}<div class="labeling-cue">There’s room for innovation in this space</div></div>
  </div>
  <div class="statement b" data-step="4" style="text-align:center"><b>The expense motivates innovation</b></div>
`);

/* ---------- p15 "Many companies are trying to solve this problem": removed at Shreya's request (2026-11-09, Round 2). ---------- */

/* ---------- p16: her note says "Embed from https://labelerrors.com/ instead of making": the site itself, live,
   in a frame (it sends no frame-blocking header). Clicks inside the frame stay in the site; the deck advances from outside it. ---------- */
st(`
  <h1 class="t">The ground truth labeling can go wrong</h1>
  <div class="labeling-embed b" data-step="1"><iframe src="https://labelerrors.com/" title="labelerrors.com: label errors in ten benchmark test sets" loading="lazy" referrerpolicy="no-referrer"></iframe></div>
  <div class="labeling-cue b" data-step="2" style="text-align:center"><b>Mislabeled ground truth can inflate the performance during evaluation</b></div>
  ${rdCite(lbA('https://labelerrors.com/', 'labelerrors.com') + ' (embedded live) · ' + LB_NORTH)}
`);

/* ---------- p17: Annotators. Her page replaced six "Labeling - ..." pages: setup (orientation for onboarding annotators),
   then the platform they work on. Onboarding steps from the Scale guide; platforms checked on each company's own site, 2026-11-09. ---------- */
const LB_LANE1 = `<svg viewBox="0 0 170 110" aria-hidden="true">${lbPerson(52, 60, 1.5)}<rect x="96" y="44" width="60" height="42" rx="4" fill="#fff" stroke="#0f172a" stroke-width="4"/><rect x="106" y="54" width="26" height="20" fill="none" stroke="#0f172a" stroke-width="3" stroke-dasharray="5 3"/><line x1="88" y1="92" x2="164" y2="92" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/></svg>`;
const LB_LANE2 = `<svg viewBox="0 0 170 110" aria-hidden="true">${[[34, 40], [85, 34], [136, 40], [58, 82], [112, 82]].map(([x, y]) => lbPerson(x, y, .85)).join('')}</svg>`;
const LB_LANE3 = `<svg viewBox="0 0 170 110" aria-hidden="true"><rect x="50" y="10" width="70" height="92" fill="#94a3b8" stroke="#0f172a" stroke-width="4"/>${[0, 1, 2].map(r => [0, 1].map(c => `<rect x="${62 + c * 26}" y="${22 + r * 24}" width="18" height="14" fill="#fff" stroke="#0f172a" stroke-width="2"/>`).join('')).join('')}</svg>`;
const LB_ST_RULES = `<svg class="labeling-icon" viewBox="0 0 170 130" aria-hidden="true"><rect x="45" y="8" width="80" height="112" rx="6" fill="#fff" stroke="#0f172a" stroke-width="4"/>${[28, 46, 64, 82, 100].map(y => `<line x1="58" y1="${y}" x2="${y === 100 ? 90 : 112}" y2="${y}" stroke="#64748b" stroke-width="5" stroke-linecap="round"/>`).join('')}</svg>`;
const LB_ST_BATCH = `<svg class="labeling-icon" viewBox="0 0 170 130" aria-hidden="true">${[0, 1, 2].map(i => `<rect x="${30 + i * 16}" y="${16 + i * 16}" width="84" height="66" rx="5" fill="${i === 2 ? '#cbd5e1' : '#fff'}" stroke="#0f172a" stroke-width="4"/>`).join('')}</svg>`;
const LB_ST_GOLD = `<svg class="labeling-icon" viewBox="0 0 170 130" aria-hidden="true">${[0, 1, 2, 3, 4, 5].map(k => { const x = 26 + (k % 3) * 42, y = 18 + Math.floor(k / 3) * 50, g = k === 4;
  return `<rect x="${x}" y="${y}" width="36" height="42" rx="4" fill="${g ? '#0f172a' : '#fff'}" stroke="#0f172a" stroke-width="3.5"/>` + (g ? `<path d="M ${x + 18} ${y + 7} l 4.4 9.4 10 1.2 -7.4 7 2 10 -9 -5 -9 5 2 -10 -7.4 -7 10 -1.2 z" fill="#fff"/>` : ''); }).join('')}</svg>`;
const LB_ST_KEEP = `<svg class="labeling-icon" viewBox="0 0 170 130" aria-hidden="true">${[[36, 58], [85, 58]].map(([x, y]) => lbPerson(x, y, 1.15, '#0f172a')).join('')}${lbPerson(134, 58, 1.15, '#cbd5e1')}<path d="M 120 86 L 148 114 M 148 86 L 120 114" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/></svg>`;
st(`
  <h1 class="t">Annotators</h1>
  <div class="labeling-ann">
    <div class="b" data-step="1">
      <div class="labeling-cue labeling-ann-h"><b>Setup:</b> orientation for onboarding annotators</div>
      <div class="labeling-stages labeling-ann-stages">
        <div class="d6-card">${LB_ST_RULES}<div class="labeling-cue"><b>Rules</b></div></div>
        <div class="labeling-arrow">→</div>
        <div class="d6-card">${LB_ST_BATCH}<div class="labeling-cue"><b>Small batch</b></div></div>
        <div class="labeling-arrow">→</div>
        <div class="d6-card">${LB_ST_GOLD}<div class="labeling-cue"><b>Gold items</b></div></div>
        <div class="labeling-arrow">→</div>
        <div class="d6-card">${LB_ST_KEEP}<div class="labeling-cue"><b>Retrain or remove</b></div></div>
      </div>
    </div>
    <div class="b" data-step="2">
      <div class="labeling-cue labeling-ann-h"><b>Platform</b> for them to do this on</div>
      <div class="labeling-lanes labeling-ann-lanes">
    <div class="labeling-lane labeling-platform"><div>${LB_LANE1}</div><div class="labeling-cue"><b>Your own team</b></div><div class="labeling-logo-set"><img src="assets/labeling/cvat.svg" alt="CVAT logo"><img src="assets/labeling/labelstudio.svg" alt="Label Studio logo"></div></div>
    <div class="labeling-lane labeling-platform"><div>${LB_LANE2}</div><div class="labeling-cue"><b>A crowd</b></div><div class="labeling-logo-set"><img src="assets/labeling/prolific.svg" alt="Prolific logo"></div></div>
    <div class="labeling-lane labeling-platform"><div>${LB_LANE3}</div><div class="labeling-cue"><b>A labeling company</b></div><div class="labeling-logo-set"><img src="assets/labeling/scale.png" alt="Scale AI logo"><img src="assets/labeling/appen.svg" alt="Appen logo"><img src="assets/labeling/imerit.svg" alt="iMerit logo"></div></div>
      </div>
    </div>
  </div>
  ${rdCite('Our drawings · onboarding steps from ' + LB_SCALE + ' (“Best Practices for Achieving High-Quality Labels”) · Logos are trademarks of their owners, used only to identify them, from ' + lbA('https://www.cvat.ai/', 'cvat.ai') + ' · ' + lbA('https://labelstud.io/', 'labelstud.io') + ' · ' + lbA('https://www.prolific.com/', 'prolific.com') + ' · ' + lbA('https://scale.com/data-engine', 'scale.com') + ' · ' + lbA('https://www.appen.com/', 'appen.com') + ' · ' + lbA('https://imerit.ai/', 'imerit.ai'))}
`);

/* ---------- p18: the annotator workflow, one drawn driving scene ---------- */
sc('labelingWorkflow', 'scenes/labeling-workflow.html');

/* ---------- p19: her three points as cues; drawings only illustrate them ---------- */
const LB_S_CLOCK = `<svg viewBox="0 0 170 110" aria-hidden="true"><circle cx="85" cy="55" r="44" fill="#f8fafc" stroke="#0f172a" stroke-width="5"/><line x1="85" y1="55" x2="85" y2="24" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/><line x1="85" y1="55" x2="108" y2="66" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/></svg>`;
const LB_S_THREAD = `<svg viewBox="0 0 170 110" aria-hidden="true">
  <rect x="8" y="6" width="96" height="28" rx="10" fill="#cbd5e1"/><rect x="66" y="42" width="96" height="28" rx="10" fill="#94a3b8"/><rect x="8" y="78" width="96" height="28" rx="10" fill="#cbd5e1"/>
  <path d="M 112 12 L 120 22 L 136 4" fill="none" stroke="#0f172a" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="128" y="106" font-size="38" font-weight="700" text-anchor="middle" font-family="var(--font)" fill="#0f172a">?</text></svg>`;
const LB_S_EXPERT = `<svg viewBox="0 0 170 110" aria-hidden="true">${lbPerson(85, 62, 1.5)}<path d="M 50 24 L 85 10 L 120 24 L 85 38 Z" fill="#0f172a"/><line x1="112" y1="27" x2="112" y2="48" stroke="#0f172a" stroke-width="4"/></svg>`;
st(`
  <h1 class="t">Synthetic generator</h1>
  <div class="labeling-lanes">
    <div class="labeling-lane b" data-step="1" style="grid-template-columns:11vw minmax(0, 1fr)">${LB_S_CLOCK}<div class="labeling-cue">The tasks take forever</div></div>
    <div class="labeling-lane b" data-step="2" style="grid-template-columns:11vw minmax(0, 1fr)">${LB_S_THREAD}<div class="labeling-cue">Multi-turn thread: even if a model does well, how does it do on the following turn</div></div>
    <div class="labeling-lane b" data-step="3" style="grid-template-columns:11vw minmax(0, 1fr)">${LB_S_EXPERT}<div class="labeling-cue">Subject expert</div></div>
  </div>
`);
}
