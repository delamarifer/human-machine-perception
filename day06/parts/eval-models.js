/* PART: eval-models (Day 6). Owner: Shreya. Section 4: Check the model. Plan slides 21-26A (Checkpoint 4 dropped:
   the part ends on the question that opens Part 5). No speaker notes.
   Published numbers checked against each paper's own text on 2026-11-09 (feedback/_day.md). Computed values (gaps,
   weights, CE, softmax, energy, standard errors) are computed below from their inputs; inputs that are only examples
   say so on the slide. Not used, could not verify: the plan's "EarthShift (2026)" numbers; the story of how
   Papers with Code closed (only its redirect to Hugging Face is observed). */
{
section('Check the model');

const emA = (url, t) => d6Link(url, t);
const emStyle = `<style>
  .evalmodels-col{ display:flex; flex-direction:column; gap:2.2vh; justify-content:center; }
  .evalmodels-small .lead{ font-size:clamp(1.15rem, 2.05vw, 1.9rem); }
  .evalmodels-big{ font-size:clamp(2rem, 4vw, 4rem); font-weight:700; line-height:1; }
  .evalmodels-bars{ display:grid; grid-template-columns:max-content 1fr max-content; gap:1.4vh 1vw; align-items:center; }
  .evalmodels-bars i{ display:block; height:3.2vh; background:var(--ink); border-radius:3px; }
  .evalmodels-rows{ flex:1 1 auto; min-height:0; display:flex; flex-direction:column; justify-content:center; gap:1.8vh; }
  .evalmodels-row{ display:grid; grid-template-columns:minmax(11em, 26vw) 1fr; gap:2vw; align-items:baseline; }
  .evalmodels-row .lead{ font-size:clamp(1.15rem, 2.05vw, 1.9rem); }
  @media (max-width: 820px), (max-aspect-ratio: 1/1){ .evalmodels-row{ grid-template-columns:1fr; gap:.3vh; } }
</style>`;

/* ---------- Section opener ---------- */
st(`${emStyle}
  <h1 class="t">Part 4 · Check the model</h1>
  ${d6Roadmap(3, false)}
`);

/* ---------- 21: three numbers, two gaps. Accuracies are an example (plan doc); gaps computed. ---------- */
const EM_ACC = [['training', 99], ['test, same kind of images', 94], ['test, new place', 70]];
const emGap1 = EM_ACC[0][1] - EM_ACC[1][1], emGap2 = EM_ACC[1][1] - EM_ACC[2][1];
st(`
  <h1 class="t">Measure three numbers, not one</h1>
  <div class="d6-cols" style="align-items:center">
    <div class="evalmodels-bars">
      ${EM_ACC.map(([nm, a], i) => `<div class="lead b" data-step="${i + 1}">${nm}</div>
        <div class="b" data-step="${i + 1}"><i style="width:${a}%"></i></div><div class="lead b" data-step="${i + 1}"><b>${a}%</b></div>`).join('')}
    </div>
    <div class="evalmodels-col evalmodels-small">
      <div class="lead b" data-step="4"><b>${emGap1} points:</b> ordinary overfitting. More of the same data shrinks it.</div>
      <div class="lead b" data-step="5"><b>${emGap2} points:</b> distribution shift. More of the same data <b>does not</b>.</div>
      <div class="statement b" data-step="6"><b>A test set from the same source only shows the first gap.</b></div>
    </div>
  </div>
  ${cite('Accuracies are an example; gaps computed')}
`);

/* ---------- 22: types of shift. Highway / campus shares and night shares are examples; weights computed. ---------- */
const EM_TR = .05, EM_DEP = .50;
const emWNight = EM_DEP / EM_TR, emWDay = (1 - EM_DEP) / (1 - EM_TR);
st(`
  <h1 class="t">Name the shift by what changed</h1>
  <div class="d6-cols" style="align-items:center">
    <div class="evalmodels-col evalmodels-small">
      <div class="lead b" data-step="1"><b>Covariate shift:</b> the images change, the labels mean the same. Day → night.</div>
      <div class="lead b" data-step="2"><b>Label shift:</b> how often each class appears. Highway: 90% cars → campus: 30% cars.</div>
      <div class="lead b" data-step="3"><b>New class:</b> something never in training. An animal crosses the road.</div>
    </div>
    <div class="evalmodels-col evalmodels-small">
      <div class="lead b" data-step="4"><b>A fix for covariate shift:</b> count each training image by how common it will be</div>
      <div class="d6-eq b" data-step="4">weight = share in deployment ÷ share in training</div>
      <div class="lead b" data-step="5">Night: ${EM_TR * 100}% of training, ${EM_DEP * 100}% of deployment</div>
      <div class="d6-eq b" data-step="5">night ${emWNight.toFixed(0)} · day ${emWDay.toFixed(2)}</div>
    </div>
  </div>
  ${cite('Shares are an example; weights computed')}
`);

/* ---------- 23: robustness tests. Scene first, then three kinds of hard test with real numbers. ---------- */
sc('corruptScene', 'scenes/corrupt.html');

st(`
  <h1 class="t">Three kinds of harder test set</h1>
  <div class="d6-grid3">
    <div class="d6-card b" data-step="1">
      <div class="label">Corrupted on purpose</div>
      <div class="lead"><b>ImageNet-C</b></div>
      <div class="lead">15 corruptions × 5 strengths</div>
    </div>
    <div class="d6-card b" data-step="2">
      <div class="label">Real shifts in the world</div>
      <div class="lead"><b>WILDS</b>: 10 datasets</div>
      <div class="lead">across hospitals, camera traps, time and place</div>
      <div class="lead"><b>ObjectNet</b>: 50,000 photos with rotation, background and viewpoint controlled</div>
    </div>
    <div class="d6-card b" data-step="3">
      <div class="label">Made hard by a generator</div>
      <div class="lead"><b>ImageNet-D</b>: 4,835 diffusion images: odd backgrounds, textures, materials</div>
      <div class="lead">ViT-B/16: <b>72.1%</b> → <b>12.0%</b></div>
    </div>
  </div>
  <div class="lead b" data-step="4" style="margin-top:1.6vh"><b>Passing one kind is not passing the others:</b> in a test of 204 ImageNet models, robustness to synthetic corruptions gave little or no robustness to natural shifts. Larger, more diverse training data helped most.</div>
  ${cite(emA('https://arxiv.org/abs/1903.12261', 'Hendrycks and Dietterich (ICLR 2019)') + ' · ' + emA('https://arxiv.org/abs/2012.07421', 'Koh et al., WILDS') + ' · ' + emA('https://objectnet.dev/', 'Barbu et al., ObjectNet (NeurIPS 2019)') + ' · ' + emA('https://arxiv.org/abs/2403.18775', 'Zhang et al., ImageNet-D (CVPR 2024)') + ' · ' + emA('https://arxiv.org/abs/2007.00644', 'Taori et al. (2020)'))}
`);

/* ---------- 23 math: corruption error. Error sums are an example; CE computed. ---------- */
const EM_OURS = 150, EM_REF = 300;
st(`
  <h1 class="t">Corruption error: compare with a reference model</h1>
  <div class="evalmodels-col evalmodels-small" style="flex:1 1 auto">
    <div class="lead b" data-step="1">Add up the model's error over the 5 strengths of one corruption, say fog</div>
    <div class="lead b" data-step="2">Divide by the same sum for a fixed reference model (ImageNet-C uses AlexNet)</div>
    <div class="d6-eq b" data-step="3">CE(fog) = ${EM_OURS} ÷ ${EM_REF} = ${(EM_OURS / EM_REF).toFixed(1)}</div>
    <div class="lead b" data-step="4">Below 1: more robust than the reference. Average over all 15 corruptions: <b>mCE</b>.</div>
  </div>
  ${cite('Error sums are an example; CE computed · definition from ' + emA('https://arxiv.org/abs/1903.12261', 'Hendrycks and Dietterich (ICLR 2019)'))}
`, { sub: true });

/* ---------- 24: OOD detection. Logits are the plan's examples; softmax and energy computed. ---------- */
const emSoft = z => { const m = Math.max(...z), e = z.map(v => Math.exp(v - m)), s = e.reduce((a, b) => a + b, 0); return e.map(v => v / s); };
const emEnergy = z => -Math.log(z.reduce((a, v) => a + Math.exp(v), 0));
const EM_Z = [[5, 1, 0], [2, 1.9, 1.8]];
st(`
  <h1 class="t">A model should be able to say "I don't know"</h1>
  <div class="d6-cols" style="align-items:center">
    <div class="evalmodels-col evalmodels-small">
      <div class="lead b" data-step="1">Give every input a <b>familiarity score</b>. Below a threshold: flag it for a person.</div>
      <div class="lead b" data-step="2"><b>Simplest score:</b> the top softmax probability</div>
      <div class="d6-eq b" data-step="2">scores (${EM_Z[0].join(', ')}) → ${Math.max(...emSoft(EM_Z[0])).toFixed(2)} · scores (${EM_Z[1].join(', ')}) → ${Math.max(...emSoft(EM_Z[1])).toFixed(2)}</div>
      <div class="lead b" data-step="3"><b>Energy:</b> −log Σ e<sup>score</sup>, lower = more familiar</div>
      <div class="d6-eq b" data-step="3">${emEnergy(EM_Z[0]).toFixed(1)} vs ${emEnergy(EM_Z[1]).toFixed(1)}</div>
    </div>
    <div class="evalmodels-col evalmodels-small">
      <div class="lead b" data-step="4">Energy instead of softmax: <b>18%</b> fewer false alarms on CIFAR-10 (WideResNet, at 95% of known images kept)</div>
      <div class="lead b" data-step="5"><b>Distance:</b> how far the features are from the nearest class center, in that class's spread (Mahalanobis)</div>
      <div class="lead b" data-step="6"><b>Judge a detector by:</b> false alarms when 95% of known images are kept</div>
    </div>
  </div>
  ${cite('Scores are an example; probabilities and energies computed · ' + emA('https://arxiv.org/abs/1610.02136', 'Hendrycks and Gimpel (ICLR 2017)') + ' · ' + emA('https://arxiv.org/abs/2010.03759', 'Liu et al., energy score (2020)') + ' · ' + emA('https://arxiv.org/abs/1807.03888', 'Lee et al., Mahalanobis (NeurIPS 2018)'))}
`);

/* ---------- 25: can we trust the benchmark? ImageNetV2 (Recht et al.), plus the Liu and He callback. ---------- */
st(`
  <h1 class="t">Same recipe, new test set: scores still drop</h1>
  <div class="d6-cols" style="align-items:center">
    <div class="evalmodels-col">
      <div class="lead b" data-step="1">New test sets collected by following the original recipe exactly</div>
      <div class="b" data-step="2"><div class="evalmodels-big">−11 to −14%</div><div class="lead">ImageNet accuracy</div></div>
      <div class="b" data-step="2"><div class="evalmodels-big">−3 to −15%</div><div class="lead">CIFAR-10 accuracy</div></div>
    </div>
    <div class="evalmodels-col evalmodels-small">
      <div class="lead b" data-step="3">The order of models is <b>almost exactly preserved</b></div>
      <div class="lead b" data-step="4">The cause: slightly <b>harder images</b>, not years of tuning on the test set</div>
      <div class="lead b" data-step="5">Remember Name That Dataset: a classifier tells ImageNet from the new set <b>81.8%</b> of the time</div>
      <div class="statement b" data-step="6"><b>Every new test set is a shifted test set.</b></div>
    </div>
  </div>
  ${cite(emA('https://arxiv.org/abs/1902.10811', 'Recht et al., Do ImageNet Classifiers Generalize to ImageNet? (2019)') + ' · ' + emA('https://arxiv.org/abs/2403.08632', 'Liu and He (ICLR 2025), appendix B'))}
`);

/* ---------- 25 math: is a gain real? SE and the trustworthy gap computed. ---------- */
const emSE = (p, n) => Math.sqrt(p * (1 - p) / n);
const EM_P = .90, emCI = n => 1.96 * emSE(EM_P, n) * 100, emGap = n => 2.77 * emSE(EM_P, n) * 100;
st(`
  <h1 class="t">Is a 0.6-point gain real? Count the test images</h1>
  <div class="d6-cols" style="align-items:center">
    <div class="evalmodels-col evalmodels-small">
      <div class="lead b" data-step="1">Model A: 91.0% · Model B: 90.4% · on 1,000 test images</div>
      <div class="d6-eq b" data-step="2">standard error = √(p(1 − p) ÷ n) = √(0.9 × 0.1 ÷ 1,000) = ${(emSE(EM_P, 1000) * 100).toFixed(2)} points</div>
      <div class="lead b" data-step="3">Each score is ± ${emCI(1000).toFixed(1)} points. A difference between two needs about <b>${emGap(1000).toFixed(1)}</b> points.</div>
      <div class="statement b" data-step="4"><b>No evidence that A is better.</b></div>
    </div>
    <div class="evalmodels-col evalmodels-small">
      <div class="lead b" data-step="5">With 10,000 images: a difference needs about <b>${emGap(10000).toFixed(1)}</b> points</div>
      <div class="lead b" data-step="6">Choose models on a validation set. Look at the final test set <b>once</b>.</div>
    </div>
  </div>
  ${cite('Scores are an example; standard errors computed · difference threshold = 1.96 × √2 × SE ≈ 2.77 SE')}
`, { sub: true });

/* ---------- 26A: finding and choosing benchmarks. ---------- */
st(`
  <h1 class="t">Choose benchmarks the way you chose your data</h1>
  <div class="d6-cols" style="align-items:start;grid-template-columns:1fr 1.15fr">
    <div class="evalmodels-col evalmodels-small">
      <div class="label b" data-step="1">Where to look</div>
      <div class="lead b" data-step="1">results tables in 2–3 recent papers on your task</div>
      <div class="lead b" data-step="1">a dataset's official leaderboard</div>
      <div class="lead b" data-step="1">Hugging Face; the NeurIPS datasets track</div>
    </div>
    <div class="evalmodels-col evalmodels-small">
      <div class="label b" data-step="2">Keep it only if</div>
      <div class="lead b" data-step="2">same task, labels and metric as yours</div>
      <div class="lead b" data-step="3">it looks like your world ("theirs or mine?")</div>
      <div class="lead b" data-step="4">its labels are clean enough: at 97% with ~3% wrong labels, the rest may be label mistakes</div>
      <div class="lead b" data-step="5">your pretrained model has not already seen its test images on the web</div>
    </div>
  </div>
  <div class="statement b" data-step="6" style="margin-top:1.2vh"><b>Then add a small test set from your own setting. That is the one that decides.</b></div>
  ${cite('The 97% / 3% case is an example (test sets average at least 3.3% wrong labels: ' + emA('https://arxiv.org/abs/2103.14749', 'Northcutt et al. 2021') + ') · paperswithcode.com now redirects to Hugging Face')}
`);

/* ---------- 26: the checklist for projects ---------- */
st(`
  <h1 class="t">Checklist for your project's results</h1>
  <div class="evalmodels-rows">
    <div class="evalmodels-row b" data-step="1"><div class="lead"><b>Split</b></div><div class="lead">by person, place, camera or video; check for copies (Part 3)</div></div>
    <div class="evalmodels-row b" data-step="2"><div class="lead"><b>Report three numbers</b></div><div class="lead">training, same-kind test, and a shifted or corrupted test</div></div>
    <div class="evalmodels-row b" data-step="3"><div class="lead"><b>Report the worst group</b></div><div class="lead">not just the average (Part 3)</div></div>
    <div class="evalmodels-row b" data-step="4"><div class="lead"><b>Error bars</b></div><div class="lead">and a simple baseline to compare with</div></div>
    <div class="evalmodels-row b" data-step="5"><div class="lead"><b>Unknown inputs</b></div><div class="lead">decide what the model does when it should say "I don't know"</div></div>
  </div>
`);

/* ---------- Transition to Part 5 ---------- */
st(`
  <h1 class="t">The score is honest now…</h1>
  <div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;justify-content:center;gap:4vh">
    <div class="lead b" data-step="1">Three numbers, the worst group, error bars, a test set from your own world.</div>
    <div class="statement b" data-step="2" style="font-size:clamp(1.8rem,3.4vw,3.2rem)"><b>…but what do we do when the world changes?</b></div>
  </div>
`);
}
