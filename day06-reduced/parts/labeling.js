/* PART: labeling (Day 6 reduced). Google deck pages 14-24, one HTML slide each. No speaker notes.
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
  .labeling-stats{ display:grid; grid-template-columns:repeat(4, auto); gap:2vw; justify-content:space-between; align-items:baseline; }
  .labeling-lanes{ flex:1 1 auto; min-height:0; display:flex; flex-direction:column; justify-content:center; gap:3vh; }
  .labeling-lane{ display:grid; grid-template-columns:11vw minmax(0, 1fr) minmax(0, 1.05fr); gap:2vw; align-items:center; }
  .labeling-lane svg{ width:100%; height:12vh; display:block; }
  .labeling-names s{ color:var(--mute); }
  .labeling-stages{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1fr auto 1fr auto 1fr auto 1fr; gap:.8vw; align-items:stretch; align-content:center; }
  .labeling-stages .d6-card{ justify-content:flex-start; align-items:center; text-align:center; padding:2vh 1vw; gap:1.4vh; }
  .labeling-stages .labeling-arrow{ align-self:center; font-size:clamp(1.4rem, 2.4vw, 2.2rem); color:var(--mute); }
  .labeling-votes{ display:flex; justify-content:space-between; gap:.6vw; }
  .labeling-vote{ display:flex; flex-direction:column; align-items:center; gap:.4vh; flex:1 1 0; }
  .labeling-vote svg{ width:100%; height:9vh; display:block; }
  .labeling-prob{ display:grid; grid-template-columns:6.2em 1fr 2.8em; gap:.5vh .7vw; align-items:center; font-size:clamp(.9rem, 1.3vw, 1.25rem); }
  .labeling-prob i{ display:block; height:1.8vh; background:#64748b; border-radius:3px; }
  .labeling-thread{ display:flex; flex-direction:column; gap:1vh; }
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

/* ---------- p15: logos, grouped only where each company's own site confirms the fit ---------- */
st(`
  <h1 class="t">Many companies are trying to solve this problem</h1>
  <div class="labeling-logos">
    <div class="labeling-logo-row b" data-step="1">
      <div class="labeling-logo-set"><img src="assets/labeling/scale.png" alt="Scale AI logo"></div>
      <div class="labeling-cue"><b>Scale AI:</b> large part of the business is a platform for this</div>
    </div>
    <div class="labeling-logo-row b" data-step="2">
      <div class="labeling-logo-set"><img src="assets/labeling/appen.svg" alt="Appen logo"><img src="assets/labeling/defined.png" alt="Defined.ai logo"><span class="labeling-cue">Defined.ai</span></div>
      <div class="labeling-cue">selling data to companies</div>
    </div>
    <div class="labeling-logo-row b" data-step="3">
      <div class="labeling-logo-set"><img src="assets/labeling/imerit.svg" alt="iMerit logo"></div>
      <div class="labeling-cue">in-house “labelers” to tighten feedback and iteration</div>
    </div>
  </div>
  ${rdCite('Logos are trademarks of their owners, used only to identify the companies, from ' + lbA('https://scale.com/data-engine', 'scale.com') + ' · ' + lbA('https://www.appen.com/off-the-shelf-datasets', 'appen.com') + ' · ' + lbA('https://defined.ai/', 'defined.ai') + ' · ' + lbA('https://imerit.ai/', 'imerit.ai'))}
`);

/* ---------- p16: how a wrong label inflates a score. Toy test set; every score is computed below. ---------- */
const LB_TRUE = [0,1,1,0,1,0,0,1,0,1,1,0,1,0,0,1,0,1,1,0];   /* 0 cat, 1 dog */
const LB_WRONG = [2, 7, 11, 16], LB_AERR = [4, 13], LB_BERR = [9];
const lbGiven = LB_TRUE.map((t, i) => LB_WRONG.includes(i) ? 1 - t : t);
const lbAnsA = LB_TRUE.map((t, i) => LB_WRONG.includes(i) ? lbGiven[i] : LB_AERR.includes(i) ? 1 - t : t);   /* A repeats the wrong labels */
const lbAnsB = LB_TRUE.map((t, i) => LB_BERR.includes(i) ? 1 - t : t);                                       /* B answers what is in the image */
const lbScore = (ans, ref) => ans.filter((a, i) => a === ref[i]).length / ref.length;
const lbPct = v => Math.round(v * 100) + '%';
const LB_NAME = ['cat', 'dog'];
const lbFace = (kind) => kind === 0
  ? `<path d="M 16 34 L 18 8 L 32 22 Q 42 18 52 22 L 66 8 L 68 34 Q 68 62 42 62 Q 16 62 16 34 Z" fill="#cbd5e1" stroke="#0f172a" stroke-width="2.5"/>
     <circle cx="32" cy="36" r="3.5" fill="#0f172a"/><circle cx="52" cy="36" r="3.5" fill="#0f172a"/><path d="M 37 46 L 42 50 L 47 46" fill="none" stroke="#0f172a" stroke-width="2.5"/>`
  : `<ellipse cx="42" cy="36" rx="24" ry="26" fill="#94a3b8" stroke="#0f172a" stroke-width="2.5"/>
     <path d="M 20 18 C 6 18 6 46 14 52 C 22 46 24 30 22 20 Z" fill="#475569" stroke="#0f172a" stroke-width="2.5"/><path d="M 64 18 C 78 18 78 46 70 52 C 62 46 60 30 62 20 Z" fill="#475569" stroke="#0f172a" stroke-width="2.5"/>
     <circle cx="33" cy="32" r="3.5" fill="#0f172a"/><circle cx="51" cy="32" r="3.5" fill="#0f172a"/><ellipse cx="42" cy="47" rx="6" ry="4.5" fill="#0f172a"/>`;
const lbMark = (x, y, name, ok, cls = '', step = 0) => `<text ${cls ? `class="${cls}" data-step="${step}"` : ''} x="${x}" y="${y}" font-size="19" font-weight="700">${name} ${ok ? '✓' : '✗'}</text>`;
const lbTile = (i) => {
  const x = (i % 5) * 124 + 2, y = Math.floor(i / 5) * 114 + 2, wrong = LB_WRONG.includes(i);
  const okA = lbAnsA[i] === lbGiven[i], okB = lbAnsB[i] === lbGiven[i], okA2 = lbAnsA[i] === LB_TRUE[i], okB2 = lbAnsB[i] === LB_TRUE[i];
  return `<g transform="translate(${x},${y})">
    <rect width="118" height="108" rx="7" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
    <g transform="translate(-6,4) scale(.95)">${lbFace(LB_TRUE[i])}</g>
    ${wrong
      ? `<text class="labeling-old b" data-step="5" x="36" y="94" font-size="21" text-anchor="middle">${LB_NAME[lbGiven[i]]}</text><text class="b" data-step="5" x="36" y="94" font-size="21" font-weight="700" text-anchor="middle">${LB_NAME[LB_TRUE[i]]}</text>`
      : `<text x="36" y="94" font-size="21" text-anchor="middle">${LB_NAME[lbGiven[i]]}</text>`}
    <g class="b" data-step="2">${wrong ? lbMark(76, 34, 'A', okA, 'labeling-old b', 5) + lbMark(76, 34, 'A', okA2, 'b', 5) : lbMark(76, 34, 'A', okA)}</g>
    <g class="b" data-step="3">${wrong ? lbMark(76, 64, 'B', okB, 'labeling-old b', 5) + lbMark(76, 64, 'B', okB2, 'b', 5) : lbMark(76, 64, 'B', okB)}</g>
    ${wrong ? `<rect class="b" data-step="4" x="-1" y="-1" width="120" height="110" rx="8" fill="none" stroke="#0f172a" stroke-width="5"/>` : ''}
  </g>`;
};
const lbBar = (name, v, step, light) => `<div class="labeling-bar-row b${light ? ' light' : ''}" data-step="${step}"><div class="label">${name}</div><div style="display:flex;align-items:center;gap:.6vw"><i style="width:${(v * 76).toFixed(1)}%"></i><span class="label"><b>${lbPct(v)}</b></span></div></div>`;
st(`
  <h1 class="t">The ground truth labeling can go wrong</h1>
  <div class="d6-cols" style="grid-template-columns:1.32fr 1fr;align-items:center">
    <svg class="labeling-svg b" data-step="1" viewBox="0 0 622 460" style="max-height:60vh" role="img" aria-label="Twenty drawn cat and dog test images, each with a given label; four labels are wrong">
      ${LB_TRUE.map((_, i) => lbTile(i)).join('')}
    </svg>
    <div class="labeling-col">
      <div class="label b" data-step="2"><b>Scored on the given labels</b></div>
      ${lbBar('Model A', lbScore(lbAnsA, lbGiven), 2)}
      ${lbBar('Model B', lbScore(lbAnsB, lbGiven), 3, true)}
      <div class="label b" data-step="5" style="margin-top:1.2vh"><b>Scored on the corrected labels</b></div>
      ${lbBar('Model A', lbScore(lbAnsA, LB_TRUE), 5)}
      ${lbBar('Model B', lbScore(lbAnsB, LB_TRUE), 5, true)}
      <div class="labeling-cue b" data-step="5" style="margin-top:1.2vh"><b>Mislabeled ground truth can inflate the performance</b></div>
    </div>
  </div>
  <div class="labeling-stats b" data-step="6">
    <div class="label"><b>≥ 6%</b> of ImageNet validation labels wrong</div>
    <div class="label"><b>≥ 3.3%</b> average, 10 test sets</div>
    <div class="label">ResNet-18 beats ResNet-50 at <b>+6%</b> mislabeled</div>
    <div class="label">${lbA('https://labelerrors.com/', '<b>labelerrors.com</b>')}</div>
  </div>
  ${rdCite('Our drawing; the test set and both models are an example, scores computed · ' + LB_NORTH)}
`);

/* ---------- p17: the annotator workflow, one drawn driving scene ---------- */
sc('labelingWorkflow', 'scenes/labeling-workflow.html');

/* ---------- p18: a fixed hour of labeling. Times from Segment Anything section 5: 14 s per mask is
   6.5x faster than COCO masks and 2x slower than boxes with extreme points. Everything else computed. ---------- */
const LB_MASK_S = 14 * 6.5, LB_BOX_S = 14 / 2, LB_HOUR = 3600;
const LB_NBOX = Math.floor(LB_HOUR / LB_BOX_S), LB_NMASK = Math.floor(LB_HOUR / LB_MASK_S);
const lbDots = (x0, y0, n) => { const cols = 36, s = 11, g = 2; let o = '';
  for(let i = 0; i < n; i++) o += `<rect x="${x0 + (i % cols) * (s + g)}" y="${y0 + Math.floor(i / cols) * (s + g)}" width="${s}" height="${s}" rx="2" fill="#0f172a"/>`;
  return o; };
const lbPanel = (x, name, sec, over, n) => `<g transform="translate(${x},0)">
  <g class="b" data-step="1">
    <rect x="20" y="4" width="470" height="168" rx="8" fill="#f1f5f9" stroke="#cbd5e1"/><rect x="20" y="130" width="470" height="42" fill="#e2e8f0"/>
    <g transform="translate(255,84) scale(2.4)">${LB_CAR}${over}</g>
    <text x="255" y="212" font-size="32" font-weight="700" text-anchor="middle">${name} · ${sec} s</text>
  </g>
  <g class="b" data-step="2">
    ${lbDots(21, 236, n)}
    <text x="255" y="462" font-size="32" font-weight="700" text-anchor="middle">${n} ${name === 'box' ? 'boxes' : 'masks'} in one hour</text>
  </g>
</g>`;
st(`
  <h1 class="t">Labeling - limited resources</h1>
  <svg class="labeling-svg b" data-step="1" viewBox="0 0 1040 470" style="max-height:62vh" role="img" aria-label="A box takes 7 seconds and a mask 91 seconds; one labeler in one hour makes ${LB_NBOX} boxes or ${LB_NMASK} masks">
    ${lbPanel(0, 'box', LB_BOX_S, `<rect x="-30" y="-14" width="60" height="45" fill="none" stroke="#0f172a" stroke-width="1.6"/>`, LB_NBOX)}
    ${lbPanel(530, 'mask', LB_MASK_S, `<polygon points="${LB_POLY}" fill="#0f172a" opacity=".78"/>`, LB_NMASK)}
  </svg>
  <div class="labeling-cue b" data-step="3" style="text-align:center"><b>The cheapest label that answers your question</b></div>
  ${rdCite('Our drawing · times computed from ' + LB_SAM + ', section 5: 14 s per assisted mask, 6.5× faster than COCO masks, 2× slower than boxes with extreme points')}
`);

/* ---------- p19: where to get labels. Each name checked on its own site, 2026-11-09. Trade-offs as in broaden.js (Scale guide). ---------- */
const LB_LANE1 = `<svg viewBox="0 0 170 110" aria-hidden="true">${lbPerson(52, 60, 1.5)}<rect x="96" y="44" width="60" height="42" rx="4" fill="#fff" stroke="#0f172a" stroke-width="4"/><rect x="106" y="54" width="26" height="20" fill="none" stroke="#0f172a" stroke-width="3" stroke-dasharray="5 3"/><line x1="88" y1="92" x2="164" y2="92" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/></svg>`;
const LB_LANE2 = `<svg viewBox="0 0 170 110" aria-hidden="true">${[[34, 40], [85, 34], [136, 40], [58, 82], [112, 82]].map(([x, y]) => lbPerson(x, y, .85)).join('')}</svg>`;
const LB_LANE3 = `<svg viewBox="0 0 170 110" aria-hidden="true"><rect x="50" y="10" width="70" height="92" fill="#94a3b8" stroke="#0f172a" stroke-width="4"/>${[0, 1, 2].map(r => [0, 1].map(c => `<rect x="${62 + c * 26}" y="${22 + r * 24}" width="18" height="14" fill="#fff" stroke="#0f172a" stroke-width="2"/>`).join('')).join('')}</svg>`;
st(`
  <h1 class="t">Labeling - platforms you can use to get labeled data</h1>
  <div class="labeling-lanes">
    <div class="labeling-lane b" data-step="1">${LB_LANE1}<div class="labeling-cue labeling-names"><b>Your own team</b><br>CVAT · Label Studio (open source)</div><div class="labeling-cue">full control; you train and manage the labelers</div></div>
    <div class="labeling-lane b" data-step="2">${LB_LANE2}<div class="labeling-cue labeling-names"><b>A crowd</b><br>Prolific · <s>Mechanical Turk</s> (closed 30 Sep 2026)</div><div class="labeling-cue">many labelers, fast; uneven quality</div></div>
    <div class="labeling-lane b" data-step="3">${LB_LANE3}<div class="labeling-cue labeling-names"><b>A labeling company</b><br>Scale AI · Appen · iMerit</div><div class="labeling-cue">trained labelers, tools, checks; less control</div></div>
  </div>
  ${rdCite(lbA('https://www.cvat.ai/', 'cvat.ai') + ' · ' + lbA('https://labelstud.io/', 'labelstud.io') + ' · ' + lbA('https://www.prolific.com/', 'prolific.com') + ' · ' + lbA('https://www.mturk.com/', 'mturk.com') + ' · trade-offs from ' + LB_SCALE)}
`);

/* ---------- p20: double checks. Boxes are an example (same as broaden.js), IoU computed; vote computed from the binomial. ---------- */
const LB_BA = [116, 92, 216, 170], LB_BB = [130, 100, 232, 180];
const lbIoU = (a, b) => { const w = Math.max(0, Math.min(a[2], b[2]) - Math.max(a[0], b[0])), h = Math.max(0, Math.min(a[3], b[3]) - Math.max(a[1], b[1]));
  const i = w * h, ar = r => (r[2] - r[0]) * (r[3] - r[1]); return {i, u: ar(a) + ar(b) - i, v: i / (ar(a) + ar(b) - i)}; };
const LB_IOU = lbIoU(LB_BA, LB_BB);
const lbRect = (r, dash) => `<rect x="${r[0]}" y="${r[1]}" width="${r[2] - r[0]}" height="${r[3] - r[1]}" fill="none" stroke="#0f172a" stroke-width="2.5"${dash ? ' stroke-dasharray="7 5"' : ''}/>`;
const lbChoose = (n, k) => { let c = 1; for(let i = 1; i <= k; i++) c = c * (n - k + i) / i; return c; };
const lbMaj = (p, n = 5) => { let s = 0; for(let k = Math.ceil((n + 1) / 2); k <= n; k++) s += lbChoose(n, k) * p ** k * (1 - p) ** (n - k); return s; };
const LB_P = .7, LB_VOTES = ['car', 'car', 'truck', 'car', 'car'];
const lbVoteFig = v => `<div class="labeling-vote"><svg viewBox="0 0 80 80" aria-hidden="true">${lbPerson(40, 50, 1.25)}</svg><div class="label"><b>${v}</b></div></div>`;
st(`
  <h1 class="t">Labeling - have to do double checks</h1>
  <div class="d6-cols" style="align-items:center">
    <div class="labeling-col" style="align-items:center">
      <svg class="labeling-svg b" data-step="1" viewBox="96 74 152 122" style="max-height:48vh" role="img" aria-label="Two overlapping boxes around one car, one solid and one dashed, with the overlap shaded">
        <rect class="b" data-step="2" x="${Math.max(LB_BA[0], LB_BB[0])}" y="${Math.max(LB_BA[1], LB_BB[1])}" width="${Math.min(LB_BA[2], LB_BB[2]) - Math.max(LB_BA[0], LB_BB[0])}" height="${Math.min(LB_BA[3], LB_BB[3]) - Math.max(LB_BA[1], LB_BB[1])}" fill="#64748b" opacity=".25"/>
        <g transform="translate(166,118) scale(1.55)">${LB_CAR}</g>
        ${lbRect(LB_BA, false)}${lbRect(LB_BB, true)}
      </svg>
      <div class="labeling-cue b" data-step="1" style="text-align:center">two people, one car</div>
      <div class="d6-eq b" data-step="2" style="align-self:stretch;text-align:center">IoU = overlap ÷ union = ${LB_IOU.i.toLocaleString('en-US')} ÷ ${LB_IOU.u.toLocaleString('en-US')} = ${LB_IOU.v.toFixed(2)}</div>
    </div>
    <div class="labeling-col">
      <div class="labeling-votes b" data-step="3">${LB_VOTES.map(lbVoteFig).join('')}</div>
      <div class="labeling-cue b" data-step="3" style="text-align:center">each right ${lbPct(LB_P)} of the time</div>
      <div class="b" data-step="4" style="display:flex;flex-direction:column;gap:1vh">
        <div class="labeling-bar-row light"><div class="label">one person</div><div style="display:flex;align-items:center;gap:.6vw"><i style="width:${(LB_P * 76).toFixed(1)}%"></i><span class="label"><b>${lbPct(LB_P)}</b></span></div></div>
        <div class="labeling-bar-row"><div class="label">vote of 5</div><div style="display:flex;align-items:center;gap:.6vw"><i style="width:${(lbMaj(LB_P) * 76).toFixed(1)}%"></i><span class="label"><b>${lbPct(lbMaj(LB_P))}</b></span></div></div>
      </div>
    </div>
  </div>
  ${rdCite('Our drawing; boxes (pixels) and the 70% are an example; IoU and the vote computed (binomial, majority of 5)')}
`);

/* ---------- p21: onboarding. Steps and the pedestrian rule from the Scale guide, as in broaden.js. ---------- */
const LB_ST_RULES = `<svg class="labeling-icon" viewBox="0 0 170 130" aria-hidden="true"><rect x="45" y="8" width="80" height="112" rx="6" fill="#fff" stroke="#0f172a" stroke-width="4"/>${[28, 46, 64, 82, 100].map(y => `<line x1="58" y1="${y}" x2="${y === 100 ? 90 : 112}" y2="${y}" stroke="#64748b" stroke-width="5" stroke-linecap="round"/>`).join('')}</svg>`;
const LB_ST_BATCH = `<svg class="labeling-icon" viewBox="0 0 170 130" aria-hidden="true">${[0, 1, 2].map(i => `<rect x="${30 + i * 16}" y="${16 + i * 16}" width="84" height="66" rx="5" fill="${i === 2 ? '#cbd5e1' : '#fff'}" stroke="#0f172a" stroke-width="4"/>`).join('')}</svg>`;
const LB_ST_GOLD = `<svg class="labeling-icon" viewBox="0 0 170 130" aria-hidden="true">${[0, 1, 2, 3, 4, 5].map(k => { const x = 26 + (k % 3) * 42, y = 18 + Math.floor(k / 3) * 50, g = k === 4;
  return `<rect x="${x}" y="${y}" width="36" height="42" rx="4" fill="${g ? '#0f172a' : '#fff'}" stroke="#0f172a" stroke-width="3.5"/>` + (g ? `<path d="M ${x + 18} ${y + 7} l 4.4 9.4 10 1.2 -7.4 7 2 10 -9 -5 -9 5 2 -10 -7.4 -7 10 -1.2 z" fill="#fff"/>` : ''); }).join('')}</svg>`;
const LB_ST_KEEP = `<svg class="labeling-icon" viewBox="0 0 170 130" aria-hidden="true">${[[36, 58], [85, 58]].map(([x, y]) => lbPerson(x, y, 1.15, '#0f172a')).join('')}${lbPerson(134, 58, 1.15, '#cbd5e1')}<path d="M 120 86 L 148 114 M 148 86 L 120 114" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/></svg>`;
st(`
  <h1 class="t">Labeling - companies, onboarding trainers</h1>
  <div class="labeling-stages">
    <div class="d6-card b" data-step="1">${LB_ST_RULES}<div class="labeling-cue"><b>Rules</b></div><div class="label">classes, good and bad examples, edge cases</div></div>
    <div class="labeling-arrow b" data-step="2">→</div>
    <div class="d6-card b" data-step="2">${LB_ST_BATCH}<div class="labeling-cue"><b>Small batch</b></div><div class="label">read the disagreements, fix the rules</div></div>
    <div class="labeling-arrow b" data-step="3">→</div>
    <div class="d6-card b" data-step="3">${LB_ST_GOLD}<div class="labeling-cue"><b>Gold items</b></div><div class="label">known answers hidden in the work</div></div>
    <div class="labeling-arrow b" data-step="4">→</div>
    <div class="d6-card b" data-step="4">${LB_ST_KEEP}<div class="labeling-cue"><b>Retrain or remove</b></div><div class="label">labelers who miss them</div></div>
  </div>
  <div class="d6-eq b" data-step="1" style="align-self:center">“pedestrian”: include what they carry, not a stroller or suitcase they push or pull</div>
  ${rdCite('Our drawing · steps and the pedestrian rule from ' + LB_SCALE + ' (“Best practices for high-quality labels”)')}
`);

/* ---------- p22: the labeling process as a loop. Steps from the Scale guide, as in broaden.js. ---------- */
const LB_NODES = [
  ['Rules', 1, x => `<rect x="${x - 22}" y="62" width="44" height="58" rx="4" fill="#fff" stroke="#0f172a" stroke-width="3.5"/>${[76, 90, 104].map(y => `<line x1="${x - 13}" y1="${y}" x2="${x + 13}" y2="${y}" stroke="#64748b" stroke-width="4" stroke-linecap="round"/>`).join('')}`],
  ['Several labels per item', 1, x => [-46, 0, 46].map(d => `<rect x="${x + d - 20}" y="66" width="40" height="50" rx="4" fill="none" stroke="#0f172a" stroke-width="3.5" transform="rotate(${d / 8} ${x + d} 91)"/>`).join('')],
  ['Consensus', 2, x => `<circle cx="${x}" cy="91" r="30" fill="#f1f5f9" stroke="#0f172a" stroke-width="3.5"/><path d="M ${x - 15} 91 L ${x - 4} 103 L ${x + 16} 79" fill="none" stroke="#0f172a" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`],
  ['Review layer', 3, x => `<circle cx="${x - 6}" cy="85" r="22" fill="#fff" stroke="#0f172a" stroke-width="5"/><line x1="${x + 10}" y1="101" x2="${x + 30}" y2="121" stroke="#0f172a" stroke-width="7" stroke-linecap="round"/>`],
  ['Random audits', 4, x => `<rect x="${x - 28}" y="63" width="56" height="56" rx="10" fill="#fff" stroke="#0f172a" stroke-width="4"/>${[[-14, 77], [14, 77], [0, 91], [-14, 105], [14, 105]].map(([d, y]) => `<circle cx="${x + d}" cy="${y}" r="5" fill="#0f172a"/>`).join('')}`],
];
const LB_NX = k => 140 + k * 280;
st(`
  <h1 class="t">Labeling - companies, labeling processes</h1>
  <svg class="labeling-svg b" data-step="1" viewBox="0 0 1400 400" style="max-height:64vh" role="img" aria-label="Loop: rules, several labels per item, consensus, a review layer and random audits, with new edge cases fed back into the rules">
    <defs><marker id="labeling-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M 0 0 L 10 5 L 0 10 Z" fill="#0f172a"/></marker></defs>
    ${LB_NODES.map(([nm, step, g], k) => { const x = LB_NX(k), two = nm.length > 14, w = nm.split(' ');
      return `<g class="b" data-step="${step}">
        <rect x="${x - 118}" y="40" width="236" height="210" rx="14" fill="#f8fafc" stroke="#0f172a" stroke-width="2.5"/>${g(x)}
        ${two ? `<text x="${x}" y="178" font-size="29" font-weight="700" text-anchor="middle">${w.slice(0, 2).join(' ')}</text><text x="${x}" y="214" font-size="29" font-weight="700" text-anchor="middle">${w.slice(2).join(' ')}</text>`
              : `<text x="${x}" y="194" font-size="29" font-weight="700" text-anchor="middle">${nm}</text>`}
        ${k ? `<line x1="${x - 158}" y1="145" x2="${x - 124}" y2="145" stroke="#0f172a" stroke-width="4" marker-end="url(#labeling-arrow)"/>` : ''}
      </g>`; }).join('')}
    <g class="b" data-step="5">
      <path d="M ${LB_NX(4)} 252 C ${LB_NX(4)} 372, ${LB_NX(0)} 372, ${LB_NX(0)} 256" fill="none" stroke="#0f172a" stroke-width="4" stroke-dasharray="11 8" marker-end="url(#labeling-arrow)"/>
      <rect x="538" y="316" width="324" height="56" fill="#fff"/>
      <text x="700" y="355" font-size="32" font-weight="700" text-anchor="middle">new edge cases</text>
    </g>
  </svg>
  ${rdCite('Our drawing · steps from ' + LB_SCALE + ' (“Best practices for high-quality labels”)')}
`);

/* ---------- p23: model plus person. Segment Anything numbers as in broaden.js; probabilities are an example, entropy computed. ---------- */
const lbEnt = ps => -ps.reduce((s, p) => s + (p > 0 ? p * Math.log(p) : 0), 0);
const LB_DAY = [.98, .01, .01], LB_NIGHT = [.40, .35, .25], LB_CLS = ['car', 'pedestrian', 'cyclist'];
const lbProbs = ps => `<div class="labeling-prob">${ps.map((p, i) => `<span>${LB_CLS[i]}</span><i style="width:${p * 100}%"></i><span>${p.toFixed(2)}</span>`).join('')}</div>`;
const LB_PROP = '-34,-2 -30,-8 -18,-8 -10,-20 20,-20 30,-6 36,0 36,26 28,36 12,38 -12,38 -28,36 -36,24';
st(`
  <h1 class="t">Labeling - an existing model (in combination with a human)</h1>
  <div class="d6-cols" style="align-items:center;grid-template-columns:1fr 1.05fr">
    <div class="labeling-col">
      <svg class="labeling-svg b" data-step="1" viewBox="0 0 430 250" style="max-height:34vh" role="img" aria-label="A drawn car with a dashed outline proposed by a model and a solid outline corrected by a person">
        <rect x="2" y="2" width="426" height="246" rx="8" fill="#f1f5f9" stroke="#cbd5e1"/><rect x="2" y="190" width="426" height="58" fill="#e2e8f0"/>
        <g transform="translate(215,118) scale(3)">${LB_CAR}
          <polygon class="labeling-old b" data-step="2" points="${LB_PROP}" fill="none" stroke="#0f172a" stroke-width="1" stroke-dasharray="3.2 2.2"/>
          <polygon class="b" data-step="2" points="${LB_POLY}" fill="#0f172a" fill-opacity=".14" stroke="#0f172a" stroke-width="1.3"/>
        </g>
        <text class="labeling-old b" data-step="2" x="215" y="34" font-size="26" font-weight="700" text-anchor="middle">model proposes</text>
        <text class="b" data-step="2" x="215" y="34" font-size="26" font-weight="700" text-anchor="middle">person corrects</text>
      </svg>
      <div class="b" data-step="3" style="display:flex;flex-direction:column;gap:.9vh">
        <div class="label"><b>time per mask</b></div>
        <div class="labeling-bar-row light"><div class="label">start</div><div style="display:flex;align-items:center;gap:.6vw"><i style="width:80%"></i><span class="label"><b>34 s</b></span></div></div>
        <div class="labeling-bar-row"><div class="label">improved</div><div style="display:flex;align-items:center;gap:.6vw"><i style="width:${(14 / 34 * 80).toFixed(1)}%"></i><span class="label"><b>14 s</b></span></div></div>
      </div>
    </div>
    <div class="labeling-col">
      <div class="d6-card b" data-step="4"><div class="label"><b>Clear day</b> · uncertainty ${lbEnt(LB_DAY).toFixed(2)}</div>${lbProbs(LB_DAY)}</div>
      <div class="d6-card b" data-step="4" style="border:3px solid var(--ink)"><div class="label"><b>Night</b> · uncertainty ${lbEnt(LB_NIGHT).toFixed(2)} → to a person</div>${lbProbs(LB_NIGHT)}</div>
      <div class="b" data-step="5" style="text-align:center"><div class="statement" style="line-height:1.1"><b>99.1%</b></div><div class="labeling-cue">of 1.1 billion masks fully automatic</div></div>
    </div>
  </div>
  ${rdCite(LB_SAM + ', sections 4 and 5 · probabilities are an example; uncertainty = entropy (natural log), computed')}
`);

/* ---------- p24: her three points as cues; drawings only illustrate them ---------- */
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
