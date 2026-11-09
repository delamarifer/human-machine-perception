/* PART: adapt (Day 6). Owner: Shreya. Section 5: Adapt over time (Foundations of Computer Vision, Ch. 37, plus
   test-time adaptation and continual learning from the papers below). Plan slides 27-31; Checkpoint 5 dropped:
   the part ends on the question that opens the wrap-up. No speaker notes.
   Published numbers checked against each paper's own text on 2026-11-09 (feedback/_day.md). Computed values are
   computed below; example inputs say so on the slide. Not used: the plan's domain-adaptation bound (Ben-David et
   al. 2010; the paper could not be opened to check it) and the GAN callback (the generative lecture is Day 7). */
{
section('Adapt over time');

const adA = (url, t) => d6Link(url, t);
const adCh37 = t => d6Link('https://visionbook.mit.edu/transfer_learning.html', `Foundations of Computer Vision, Ch. 37${t ? ', ' + t : ''}`);
const adStyle = `<style>
  .adapt-col{ display:flex; flex-direction:column; gap:2vh; justify-content:center; }
  .adapt-small .lead{ font-size:clamp(1.1rem, 1.95vw, 1.8rem); }
  .adapt-big{ font-size:clamp(2rem, 4vw, 4rem); font-weight:700; line-height:1; }
  .adapt-svg{ flex:1 1 auto; min-height:0; width:100%; display:block; }
  .adapt-svg text{ font-family:var(--font); fill:var(--ink); }
  .adapt-svg .adapt-new.shown ~ .adapt-old.shown{ opacity:0; }
</style>`;

/* ---------- Section opener ---------- */
st(`${adStyle}
  <h1 class="t">Part 5 · Adapt over time</h1>
  ${d6Roadmap(4, false)}
`);

/* ---------- 27: which adaptation, when? The plan's ladder, keyed to the data you have. ---------- */
const AD_LADDER = [
  ['some labeled examples', 'fine-tune (Day 4)', 'overfitting the few; forgetting the old setting'],
  ['many unlabeled examples', 'domain adaptation', 'aligning the wrong things'],
  ['only the live stream', 'test-time adaptation', 'confident mistakes feed themselves'],
  ['a world that keeps changing', 'continual learning', 'forgetting what it knew'],
  ['any of these, after launch', 'monitoring', 'not noticing the shift at all'],
];
st(`
  <h1 class="t">Which fix? It depends on the data you have</h1>
  <table class="d6-tbl" style="width:100%;font-size:clamp(1rem,1.6vw,1.5rem)">
    <tr><th style="text-align:left">You have…</th><th style="text-align:left">Method</th><th style="text-align:left">Main risk</th></tr>
    ${AD_LADDER.map(([h, m, r], i) => `<tr class="b" data-step="${i + 1}"><td style="text-align:left">${h}</td><td class="rowh">${m}</td><td style="text-align:left">${r}</td></tr>`).join('')}
  </table>
  ${cite(adCh37('sections 37.3 (finetuning, heads and probes) and 37.6 (domain adaptation)'))}
`);

/* ---------- 28: domain adaptation. Points are seeded examples; the error counts are computed from them. ---------- */
const adRng = (seed => () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
  t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; })(21);
const adNorm = () => Math.sqrt(-2 * Math.log(adRng() + 1e-9)) * Math.cos(2 * Math.PI * adRng());
const AD_SD = 22, AD_N = 14, AD_BOUND = 225, AD_SHIFT = 130, AD_LEFT = 10;
const adCloud = (cx, cy) => [...Array(AD_N)].map(() => [cx + AD_SD * adNorm(), cy + AD_SD * adNorm()]);
const AD_SA = adCloud(150, 175), AD_SB = adCloud(300, 175), AD_TA = adCloud(150, 175), AD_TB = adCloud(300, 175);
const adWrong = dx => AD_TA.filter(([x]) => x + dx > AD_BOUND).length + AD_TB.filter(([x]) => x + dx <= AD_BOUND).length;
const AD_W0 = adWrong(AD_SHIFT), AD_W1 = adWrong(AD_LEFT);
const adDots = (pts, dx, filled, shape) => pts.map(([x, y]) => shape === 'sq'
  ? `<rect x="${(x + dx - 6).toFixed(1)}" y="${(y - 6).toFixed(1)}" width="12" height="12" ${filled ? 'fill="#0f172a"' : 'fill="#fff" stroke="#64748b" stroke-width="2"'}/>`
  : `<circle cx="${(x + dx).toFixed(1)}" cy="${y.toFixed(1)}" r="6.5" ${filled ? 'fill="#0f172a"' : 'fill="#fff" stroke="#64748b" stroke-width="2"'}/>`).join('');
st(`
  <h1 class="t">Domain adaptation: make the two settings look alike</h1>
  <div class="d6-cols" style="grid-template-columns:1.15fr 1fr;align-items:center">
    <svg class="adapt-svg" viewBox="70 45 450 285" style="max-height:62vh" role="img" aria-label="Feature space: labeled source points in two classes split by a vertical boundary; unlabeled target points shifted right, so one class lands on the wrong side; after alignment the target points sit on the source points">
      <g class="b" data-step="1">${adDots(AD_SA, 0, true, 'c')}${adDots(AD_SB, 0, true, 'sq')}
        <line x1="${AD_BOUND}" y1="70" x2="${AD_BOUND}" y2="290" stroke="#0f172a" stroke-width="3" stroke-dasharray="9 6"/>
        <text x="${AD_BOUND}" y="62" font-size="17" text-anchor="middle">boundary learned on source</text>
        <text x="150" y="312" font-size="17" text-anchor="middle">● car</text><text x="300" y="312" font-size="17" text-anchor="middle">■ pedestrian</text></g>
      <g class="b adapt-new" data-step="4">${adDots(AD_TA, AD_LEFT, false, 'c')}${adDots(AD_TB, AD_LEFT, false, 'sq')}</g>
      <g class="b adapt-old" data-step="2">${adDots(AD_TA, AD_SHIFT, false, 'c')}${adDots(AD_TB, AD_SHIFT, false, 'sq')}</g>
    </svg>
    <div class="adapt-col adapt-small">
      <div class="lead b" data-step="1"><b>Filled:</b> labeled source, e.g. simulated streets</div>
      <div class="lead b" data-step="2"><b>Hollow:</b> unlabeled target, real dashcam. Their features sit to the right: <b>${AD_W0} of ${2 * AD_N}</b> land on the wrong side.</div>
      <div class="lead b" data-step="3"><b>Train so a "which setting?" classifier cannot tell features apart</b>, while still classifying the source correctly (DANN: a gradient reversal layer)</div>
      <div class="lead b" data-step="4">Aligned: <b>${AD_W1} of ${2 * AD_N}</b> wrong</div>
      <div class="lead b" data-step="5"><b>Risk:</b> if the new city has far more pedestrians, forcing the clouds together can push pedestrians onto cars. Check per class on a few labeled target images.</div>
    </div>
  </div>
  ${cite('Points are a seeded example; wrong-side counts computed · ' + adA('https://arxiv.org/abs/1505.07818', 'Ganin et al., Domain-Adversarial Training of Neural Networks (JMLR 2016)') + ' · ' + adCh37('section 37.6'))}
`);

/* ---------- 29: test-time adaptation. Feature statistics are an example (plan); z computed. ---------- */
const AD_MU = .5, AD_SDV = .1, AD_FOG = .8;
st(`
  <h1 class="t">Test-time adaptation: adjust while driving into fog</h1>
  <div class="d6-cols" style="align-items:center">
    <div class="adapt-col adapt-small">
      <div class="lead b" data-step="1">No labels, no time to collect: only the incoming test images</div>
      <div class="lead b" data-step="2">Batch norm rescales each feature with a mean and spread <b>remembered from training</b></div>
      <div class="d6-eq b" data-step="3">training: mean ${AD_MU}, sd ${AD_SDV} · fog: a typical value ${AD_FOG}<br>(${AD_FOG} − ${AD_MU}) ÷ ${AD_SDV} = ${((AD_FOG - AD_MU) / AD_SDV).toFixed(0)}: far outside what later layers saw</div>
      <div class="lead b" data-step="4"><b>Fix 1:</b> recompute the mean and spread on each fog batch → back to ${(0).toFixed(0)}</div>
      <div class="lead b" data-step="5"><b>Fix 2 (Tent):</b> also nudge each channel's scale and shift (&lt;1% of the weights) to make predictions more confident: lower their entropy</div>
    </div>
    <div class="adapt-col">
      <div class="label b" data-step="6">ResNet-50 on ImageNet-C (error, lower is better)</div>
      <table class="d6-tbl b" data-step="6" style="width:100%">
        <tr><th style="text-align:left">method</th><th>error</th></tr>
        <tr><td class="rowh">recompute batch-norm statistics</td><td>49.9%</td></tr>
        <tr><td class="rowh">Tent (online)</td><td>44.0%</td></tr>
      </table>
      <div class="lead b" data-step="7">Another paper: just recomputing the statistics takes ResNet-50 from <b>76.7</b> to <b>62.2</b> mCE</div>
    </div>
  </div>
  ${cite('Feature values are an example; z computed · ' + adA('https://arxiv.org/abs/2006.10726', 'Wang et al., Tent (ICLR 2021)') + ' · ' + adA('https://arxiv.org/abs/2006.16971', 'Schneider et al. (NeurIPS 2020)'))}
`);

st(`
  <h1 class="t">When test-time adaptation helps, and when it hurts</h1>
  <table class="d6-tbl" style="width:100%;font-size:clamp(1rem,1.65vw,1.55rem)">
    <tr><th style="text-align:left">Helps</th><th style="text-align:left">Hurts</th></tr>
    <tr class="b" data-step="1"><td style="text-align:left">the images change: weather, light, a new camera</td><td style="text-align:left">the classes change how often they appear</td></tr>
    <tr class="b" data-step="2"><td style="text-align:left">large batches from one condition</td><td style="text-align:left">tiny or mixed batches: noisy statistics</td></tr>
    <tr class="b" data-step="3"><td style="text-align:left">short shifts</td><td style="text-align:left">long runs, where confident mistakes pile up</td></tr>
  </table>
  <div class="lead b" data-step="4" style="margin-top:2vh"><b>Safeguards:</b> adapt only on confident predictions; keep the original weights and reset.</div>
  <div class="lead b" data-step="5">Like your eyes adjusting to a dark room: recalibrating to the current input, with no labels.</div>
  ${cite('From the plan, after ' + adA('https://arxiv.org/abs/2006.10726', 'Wang et al. (ICLR 2021)'))}
`, { sub: true });

/* ---------- 30: continual learning. Accuracies and importances are examples (plan); computed. ---------- */
const AD_PEAK = 95, AD_NOW = 60;
const AD_EWC = [['A', 10, .1], ['B', .01, 1]];
st(`
  <h1 class="t">Continual learning: learn without forgetting</h1>
  <div class="d6-cols" style="align-items:center">
    <div class="adapt-col adapt-small">
      <div class="lead b" data-step="1">Train on day, then on night: day accuracy falls from ${AD_PEAK}% to ${AD_NOW}%</div>
      <div class="d6-eq b" data-step="1">forgetting = best ever − now = ${AD_PEAK - AD_NOW} points</div>
      <div class="lead b" data-step="2">Why: the night updates move shared weights with no reason to keep what day needed</div>
      <div class="lead b" data-step="3"><b>Too plastic:</b> forgets. <b>Too stable:</b> cannot learn night.</div>
    </div>
    <div class="adapt-col adapt-small">
      <div class="lead b" data-step="4"><b>Replay:</b> keep a small memory of day images in every batch</div>
      <div class="lead b" data-step="5"><b>EWC:</b> a spring on each weight, stiff where it mattered for day</div>
      <div class="d6-eq b" data-step="5">${AD_EWC.map(([w, F, d]) => `weight ${w}: importance ${F}, moved ${d} → penalty ${(F * d * d).toFixed(2)}`).join('<br>')}</div>
      <div class="lead b" data-step="6"><b>Separate parts:</b> a small adapter per setting; no forgetting, but it must know the setting</div>
      <div class="lead b" data-step="7">In this class: <b>How ViTs forget</b> studies new classes arriving over time</div>
    </div>
  </div>
  ${cite('Accuracies and importances are an example; forgetting and penalties computed · ' + adA('https://arxiv.org/abs/1612.00796', 'Kirkpatrick et al., EWC (PNAS)'))}
`);

/* ---------- 30B-C: a real run. Numbers copied from assets/adapt/cl_results.json (Shreya's run of
   assets/adapt/continual_learning_demo.py, 3 seeds; rerun 2026-11-09 agreed within 0.03 on every mean).
   Rotated-Digits fine-tune accuracy matrix, seed 0: row i = after training on task i, column j = tested on task j. ---------- */
const AD_ANG = [0, 30, 60, 90, 120];
const AD_R = [[.983, .426, .235, .111, .102], [.652, .972, .543, .256, .109], [.231, .663, .98, .57, .187],
  [.165, .241, .656, .976, .446], [.178, .176, .261, .737, .967]];
const adForget = AD_R[0].slice(0, 4).map((_, j) => Math.max(...AD_R.slice(0, 4).map(r => r[j])) - AD_R[4][j]).reduce((a, b) => a + b, 0) / 4;
const adCell = (v, i, j) => { const g = Math.round(248 - v * 200), dark = v > .55;
  const step = i === j ? 1 : j < i ? 2 : 3;
  return `<rect class="b" data-step="${step}" x="${j * 92}" y="${i * 62}" width="90" height="60" rx="4" fill="rgb(${g},${g + 3},${g + 6})"/>
    <text class="b" data-step="${step}" x="${j * 92 + 45}" y="${i * 62 + 38}" font-size="22" font-weight="700" text-anchor="middle" style="fill:${dark ? '#f8fafc' : '#0f172a'}">${v.toFixed(2)}</text>`; };
st(`
  <h1 class="t">Watch a network forget rotated digits</h1>
  <div class="d6-cols" style="grid-template-columns:1.2fr 1fr;align-items:center">
    <svg class="adapt-svg" viewBox="-150 -60 620 380" style="max-height:60vh" role="img" aria-label="Accuracy matrix: rows are after training on 0, 30, 60, 90, 120 degrees; columns are the test rotation; the diagonal is high, values below it fall, values above it fall with angle">
<g class="b" data-step="1">
      ${AD_ANG.map((a, j) => `<text x="${j * 92 + 45}" y="-14" font-size="20" text-anchor="middle">${a}°</text>`).join('')}
      <text x="228" y="-40" font-size="19" text-anchor="middle">tested on</text>
      ${AD_ANG.map((a, i) => `<text x="-12" y="${i * 62 + 37}" font-size="20" text-anchor="end">after ${a}°</text>`).join('')}
      </g>
      ${AD_R.map((r, i) => r.map((v, j) => adCell(v, i, j)).join('')).join('')}
    </svg>
    <div class="adapt-col adapt-small">
      <div class="lead b" data-step="1"><b>Diagonal:</b> each new rotation is learned well (0.97–0.98)</div>
      <div class="lead b" data-step="2"><b>Below:</b> the 0° task falls from ${AD_R[0][0].toFixed(2)} to ${AD_R[4][0].toFixed(2)} as training moves on</div>
      <div class="d6-eq b" data-step="2">forgetting = best ever − at the end, averaged = ${adForget.toFixed(2)}</div>
      <div class="lead b" data-step="3"><b>Above:</b> untrained rotations get worse the further they are. Part 1's shift, one row at a time.</div>
    </div>
  </div>
  ${cite('Our run, seed 0: plain fine-tuning, 8×8 digits (scikit-learn), small MLP · forgetting computed from the matrix · script: ' + adA('assets/adapt/continual_learning_demo.py', 'continual_learning_demo.py') + ', about a minute on a laptop')}
`, { sub: true });

/* Mean average accuracy over 3 seeds, from cl_results.json. Class-incremental: tasks {0,1}, {2,3}, ..., {8,9},
   one shared 10-way output. Memory per class: 10 (class-incremental), 5 per task (domain-incremental). */
const AD_RES = [['fine-tune only', .196, .450], ['EWC', .197, .622], ['LwF (distill old outputs)', .189, .455],
  ['replay (tiny memory)', .886, .880], ['all data at once (upper bound)', .974, .971]];
const AD_MEM = 80, AD_TRAIN = Math.round(1797 * .7);
st(`
  <h1 class="t">Which fix works depends on what changes</h1>
  <div class="d6-cols" style="grid-template-columns:1.25fr 1fr;align-items:center">
    <table class="d6-tbl" style="width:100%;font-size:clamp(1rem,1.6vw,1.5rem)">
      <tr><th class="b" data-step="1" style="text-align:left">average accuracy, end of training</th><th class="b" data-step="1">digits rotate</th><th class="b" data-step="2">new digits arrive</th></tr>
      ${AD_RES.map(([nm, c, d]) => `<tr><td class="rowh b" data-step="1">${nm}</td><td class="b" data-step="1">${d.toFixed(2)}</td><td class="b" data-step="2">${c.toFixed(2)}</td></tr>`).join('')}
    </table>
    <div class="adapt-col adapt-small">
      <div class="lead b" data-step="1"><b>Same digits, new angle:</b> EWC helps (0.45 → 0.62)</div>
      <div class="lead b" data-step="2"><b>New digits, one shared output:</b> fine-tune, EWC and LwF all end near 0.20: every earlier task drops to 0%</div>
      <div class="d6-eq b" data-step="3">old class c is never the label, so its gradient is +p<sub>c</sub>: its score is only ever pushed down</div>
      <div class="lead b" data-step="4"><b>Replay wins both</b> with ${AD_MEM} stored images, about ${Math.round(AD_MEM / AD_TRAIN * 100)}% of the training set</div>
    </div>
  </div>
  ${cite('Our run, mean of 3 seeds (sd ≤ 0.045) · ' + adA('assets/adapt/continual_learning_demo.py', 'continual_learning_demo.py') + ' · EWC: Kirkpatrick et al.; LwF: Li and Hoiem (2016)')}
`, { sub: true });

/* ---------- 30A: a real decade of change (CLEAR) and Wild-Time ---------- */
st(`
  <h1 class="t">Real data changes over years, so test on the future</h1>
  <div class="d6-cols" style="align-items:center">
    <div class="adapt-col adapt-small">
      <div class="lead b" data-step="1"><b>CLEAR:</b> Flickr photos from <b>2004 to 2014</b>, cut into <b>11</b> time buckets of 700K images each</div>
      <div class="lead b" data-step="2">11 classes, 300 labeled images per class in each bucket</div>
      <div class="lead b" data-step="3">Testing on random images from the same years <b>inflates</b> the score. Train on the past, test on the near future.</div>
    </div>
    <div class="adapt-col">
      <div class="lead b" data-step="4"><b>Wild-Time:</b> 5 datasets that change over time (yearbook photos, satellite images, hospital records, news, papers)</div>
      <div class="b" data-step="5"><div class="adapt-big">≈ 20%</div><div class="lead">average drop from in-distribution to out-of-distribution data</div></div>
    </div>
  </div>
  ${cite(adA('https://arxiv.org/abs/2201.06289', 'Lin et al., CLEAR (2021)') + ' · ' + adA('https://arxiv.org/abs/2211.14238', 'Yao et al., Wild-Time (NeurIPS 2022 Datasets and Benchmarks)'))}
`, { sub: true });

/* ---------- 31: monitoring and the data loop. Drift numbers are an example (plan). ---------- */
const AD_LOOP = ['watch', 'flag failures', 'label them', 'check labels', 'retrain', 'test on recent data'];
const adLoop = (() => {
  /* two rows of three boxes, clockwise: top row left to right, down the right side, bottom row right to left, up the left */
  const W = 190, H = 46, X = [105, 345, 585], Y = [60, 230];
  const pos = [[X[0], Y[0]], [X[1], Y[0]], [X[2], Y[0]], [X[2], Y[1]], [X[1], Y[1]], [X[0], Y[1]]];
  const arrow = (i) => { const [x, y] = pos[i], [x2, y2] = pos[(i + 1) % 6];
    if(y === y2){ const d = Math.sign(x2 - x); return [x + d * (W / 2 + 6), y, x2 - d * (W / 2 + 10), y2]; }
    const d = Math.sign(y2 - y); return [x, y + d * (H / 2 + 6), x2, y2 - d * (H / 2 + 10)]; };
  return AD_LOOP.map((nm, i) => { const [x, y] = pos[i], [ax, ay, bx, by] = arrow(i);
    return `<g class="b" data-step="${i + 1}"><rect x="${x - W / 2}" y="${y - H / 2}" width="${W}" height="${H}" rx="10" fill="#f1f5f9" stroke="#0f172a" stroke-width="2"/>
      <text x="${x}" y="${y + 7}" font-size="20" font-weight="700" text-anchor="middle">${nm}</text>
      <line x1="${ax}" y1="${ay}" x2="${bx}" y2="${by}" stroke="#64748b" stroke-width="3.5" marker-end="url(#adArr)"/></g>`; }).join(''); })();
st(`
  <h1 class="t">You can only adapt to a shift you notice</h1>
  <div class="d6-cols" style="grid-template-columns:1.2fr 1fr;align-items:center">
    <svg class="adapt-svg" viewBox="0 25 690 240" style="max-height:50vh" role="img" aria-label="A loop: watch, flag failures, label them, check labels, retrain, test on recent data, and back to watch">
      <defs><marker id="adArr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#64748b"/></marker></defs>
      ${adLoop}
    </svg>
    <div class="adapt-col adapt-small">
      <div class="lead b" data-step="7"><b>Watch:</b> drift in the average embedding, the share of "I don't know" inputs, per-group accuracy on a small labeled sample, user corrections</div>
      <div class="d6-eq b" data-step="8">drift sits near 0.05 for months, then jumps to 0.8 when the rainy season starts → review</div>
      <div class="lead b" data-step="9"><b>Decide in advance</b> when to act, test the new model before it replaces the old, and keep the old one to roll back to</div>
    </div>
  </div>
  ${cite('Drift values are an example · our diagram of the plan\'s loop')}
`);

/* ---------- Transition to the wrap-up ---------- */
st(`
  <h1 class="t">Back to where we started…</h1>
  <div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;justify-content:center;gap:4vh">
    <div class="lead b" data-step="1">Better data, checked data, an honest score, and a way to adapt.</div>
    <div class="statement b" data-step="2" style="font-size:clamp(1.8rem,3.4vw,3.2rem)"><b>…so how would we fix ColorizeBot?</b></div>
  </div>
`);
}
