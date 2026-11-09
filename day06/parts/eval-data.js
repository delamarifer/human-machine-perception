/* PART: eval-data (Day 6). Owner: Shreya. Section 3: Check the data. Plan slides 18-20 and 20A-20C (20D stays
   backup; its checklist goes to the lab). No checkpoint; ends on the question that opens Part 4. No speaker notes.
   Published numbers checked against the papers on 2026-11-08 (feedback/_day.md). Computed values (averages,
   weights, standard errors, sample sizes) are computed below from their inputs; example inputs say so on the slide.
   Student projects appear by title only (public site). */
{
section('Check the data');

const edA = (url, t) => d6Link(url, t);
const edStyle = `<style>
  .evaldata-rows{ flex:1 1 auto; min-height:0; display:flex; flex-direction:column; justify-content:center; gap:2.2vh; }
  .evaldata-row{ display:grid; grid-template-columns:minmax(12em, 30vw) 1fr; gap:2vw; align-items:baseline; }
  .evaldata-small .lead{ font-size:clamp(1.15rem, 2.05vw, 1.9rem); }
  .evaldata-col{ display:flex; flex-direction:column; gap:2.2vh; justify-content:center; }
  .evaldata-big{ font-size:clamp(2rem, 4vw, 4rem); font-weight:700; line-height:1; }
  .evaldata-tbl{ width:100%; border-collapse:collapse; background:#f8fafc; border:1px solid var(--line); font-size:clamp(1rem, 1.6vw, 1.5rem); }
  .evaldata-tbl th, .evaldata-tbl td{ text-align:left; padding:1.1vh 1.2vw; border-top:1px solid var(--line); vertical-align:top; }
  .evaldata-tbl th{ background:#0f172a; color:#f8fafc; border-top:none; }
  @media (max-width: 820px), (max-aspect-ratio: 1/1){ .evaldata-row{ grid-template-columns:1fr; gap:.3vh; } }
</style>`;

/* ---------- Section opener ---------- */
st(`${edStyle}
  <h1 class="t">Part 3 · Check the data</h1>
  ${d6Roadmap(2, false)}
`);

/* ---------- 18a: label errors, real numbers (Northcutt et al. 2021) ---------- */
st(`
  <h1 class="t">Even test sets have wrong labels</h1>
  <div class="evaldata-col" style="flex:1 1 auto">
    <div class="lead b" data-step="1">At least <b>6%</b> of ImageNet's validation labels are wrong</div>
    <div class="lead b" data-step="2">Across 10 popular test sets: at least <b>3.3%</b> on average</div>
    <div class="lead b" data-step="3">Fix the labels, and the ranking moves: ResNet-18 <b>beats</b> ResNet-50 if mislabeled test images rise by just 6%</div>
    <div class="statement b" data-step="4"><b>Wrong labels can change which model looks best.</b></div>
    <div class="lead b" data-step="4">See them yourself: ${edA('https://labelerrors.com', 'labelerrors.com')}</div>
  </div>
  ${cite(edA('https://arxiv.org/abs/2103.14749', 'Northcutt, Athalye and Mueller, Pervasive Label Errors in Test Sets (NeurIPS 2021)'))}
`);

/* ---------- 18b: confident learning. Threshold and probability values are an example. ---------- */
st(`
  <h1 class="t">Let the model point at suspicious labels</h1>
  <div class="evaldata-rows evaldata-small">
    <div class="evaldata-row b" data-step="1"><div class="lead"><b>1. Honest predictions</b></div><div class="lead">cross-validation, so the model has not memorized the wrong labels</div></div>
    <div class="evaldata-row b" data-step="2"><div class="lead"><b>2. A bar per class</b></div><div class="lead">how sure the model usually is on images labeled "dog": say 0.85</div></div>
    <div class="evaldata-row b" data-step="3"><div class="lead"><b>3. Flag</b></div><div class="lead">labeled "cat", but p(dog) = 0.92 ≥ 0.85 → probably a dog</div></div>
    <div class="evaldata-row b" data-step="4"><div class="lead"><b>4. A person checks</b></div><div class="lead">only the flagged images, not all of them</div></div>
  </div>
  ${cite('Probabilities are an example · ' + edA('https://arxiv.org/abs/1911.00068', 'Northcutt, Jiang and Chuang, Confident Learning (JAIR 2021)') + ' · tool: cleanlab')}
`, { sub: true });

/* ---------- 18c: bad labels beyond classification. Detection issue types from the cleanlab docs
   (overlooked, swapped, badly located; checked 2026-11-09); the agreement row is a general method, no numbers. ---------- */
st(`
  <h1 class="t">Boxes and masks: where labels and model disagree</h1>
  <table class="evaldata-tbl">
    <tr><th>Task</th><th>What goes wrong</th><th>Where to look</th></tr>
    <tr class="b" data-step="1"><td><b>Classes</b></td><td>wrong class</td><td>the model is sure of a different class</td></tr>
    <tr class="b" data-step="2"><td><b>Boxes</b> (detection)</td><td>object never boxed · right box, wrong class · box in the wrong place</td><td>a confident predicted box with no label box · a label box the model reads differently or places elsewhere</td></tr>
    <tr class="b" data-step="3"><td><b>Masks</b> (segmentation)</td><td>wrong pixels, sloppy edges</td><td>the regions where the model's mask and the label disagree</td></tr>
    <tr class="b" data-step="4"><td><b>Keypoints, captions, answers</b></td><td>no single right answer</td><td>two people label the same sample: where <b>they</b> disagree, the labels are unreliable</td></tr>
  </table>
  <div class="statement b" data-step="5" style="margin-top:2vh"><b>Rank by disagreement, then a person looks: the model only points.</b></div>
  ${cite('cleanlab finds label issues for classes, multi-label tags, detection boxes and segmentation masks · ' + edA('https://docs.cleanlab.ai/stable/tutorials/object_detection.html', 'cleanlab docs: object detection'))}
`, { sub: true });

/* ---------- 19: an average hides the group that fails. Example counts; average and weights computed. ---------- */
const ED_G = [{n: 'day', N: 900, acc: .96}, {n: 'night', N: 100, acc: .60}];
const edTot = ED_G.reduce((s, g) => s + g.N, 0), edAvg = ED_G.reduce((s, g) => s + g.N * g.acc, 0) / edTot;
const edW = g => edTot / (ED_G.length * g.N);
const edPct = v => (Math.round(v * 1000) / 10) + '%';
st(`
  <h1 class="t">An average can hide the group that fails</h1>
  <div class="d6-cols" style="align-items:center">
    <div class="evaldata-col">
      ${ED_G.map((g, i) => `<div class="b" data-step="1"><div class="lead"><b>${g.n}</b>: ${g.N} test images, accuracy ${edPct(g.acc)}</div></div>`).join('')}
      <div class="b" data-step="2"><div class="label">overall accuracy</div><div class="evaldata-big">${edPct(edAvg)}</div></div>
      <div class="lead b" data-step="3">Looks fine, but at night the model is wrong <b>4 times in 10</b></div>
    </div>
    <div class="evaldata-col evaldata-small">
      <div class="lead b" data-step="4"><b>Report the worst group</b>, not just the average</div>
      <div class="lead b" data-step="5"><b>Reweight in training</b>, so each group counts the same: weight = total ÷ (groups × group size)</div>
      <div class="d6-eq b" data-step="5">day ${edW(ED_G[0]).toFixed(2)} · night ${edW(ED_G[1]).toFixed(2)}</div>
      <div class="lead b" data-step="6">Remember Gender Shades: 34.7% vs 0.8% error, hidden inside one average</div>
    </div>
  </div>
  ${cite('Counts and accuracies are an example; average and weights computed · ' + edA('https://proceedings.mlr.press/v81/buolamwini18a.html', 'Buolamwini and Gebru (FAT* 2018)'))}
`);

/* ---------- 20a0: how copies get into the test set. CIFAR facts from Barz and Denzler 2020, sections 1-2;
   the other routes (video, bursts, merged datasets) are general mechanisms, not numbers. ---------- */
const BD = edA('https://arxiv.org/abs/1902.00423', 'Barz and Denzler, Do We Train on Test Data? Purging CIFAR of Near-Duplicates (J. Imaging 2020)');
st(`
  <h1 class="t">How copies of training images end up in the test set</h1>
  <div class="d6-cols" style="align-items:center">
    <div class="evaldata-col evaldata-small">
      <div class="lead b" data-step="1"><b>1. Collect:</b> CIFAR's images came from web image search, about 80 million of them</div>
      <div class="lead b" data-step="2"><b>2. The web repeats itself:</b> the same photo is posted many times, resized, cropped, recolored</div>
      <div class="lead b" data-step="3"><b>3. Clean:</b> the usual step removes only <b>exact</b> pixel copies</div>
      <div class="lead b" data-step="4"><b>4. Split at random:</b> one copy lands in training, another in test</div>
    </div>
    <div class="evaldata-col evaldata-small">
      <div class="lead b" data-step="5">The same thing happens with your own data:</div>
      <div class="lead b" data-step="5">· neighboring frames of one video</div>
      <div class="lead b" data-step="5">· burst photos of the same scene</div>
      <div class="lead b" data-step="5">· two datasets merged that share images</div>
      <div class="statement b" data-step="6"><b>Then the test asks the model to recall, not to generalize.</b></div>
    </div>
  </div>
  ${cite(BD)}
`);

/* ---------- 20a1: the computed demo ---------- */
sc('nearDupScene', 'scenes/near-dup.html');

/* ---------- 20a2: how much, and what it does to the score (Barz and Denzler 2020, sections 3.3 and 5) ---------- */
st(`
  <h1 class="t">Training copies in the test set inflate the score</h1>
  <div class="d6-cols" style="align-items:center">
    <div class="evaldata-col">
      <div class="b" data-step="1"><div class="evaldata-big">3.3%</div><div class="lead">of CIFAR-10 test images have a near-copy in training</div></div>
      <div class="b" data-step="2"><div class="evaldata-big">10%</div><div class="lead">of CIFAR-100 test images</div></div>
    </div>
    <div class="evaldata-col evaldata-small">
      <div class="lead b" data-step="3">On those copied test images, ResNet-110 makes <b>0%</b> error on CIFAR-10, vs 5.3% on the whole test set</div>
      <div class="lead b" data-step="4"><b>How they found them:</b> nearest training image in a network's feature space, then a person checked the pairs</div>
      <div class="lead b" data-step="5">Copies replaced with new images (ciFAIR): CIFAR-100 error rises 2.7 points on average</div>
    </div>
  </div>
  ${cite(BD)}
`);

/* ---------- 20b: split by the unit you deploy on, with the class projects ---------- */
st(`
  <h1 class="t">Split by the thing you will meet in the real world</h1>
  <div class="evaldata-rows evaldata-small">
    <div class="lead b" data-step="1">Random frames on both sides of the split: the test measures <b>memory of the person</b>, not the task</div>
    <div class="evaldata-row b" data-step="2"><div class="lead"><b>Sign language for doctors</b></div><div class="lead">split by signer</div></div>
    <div class="evaldata-row b" data-step="2"><div class="lead"><b>FocusLens webcam timer</b></div><div class="lead">split by person</div></div>
    <div class="evaldata-row b" data-step="3"><div class="lead"><b>Tennis strokes</b></div><div class="lead">split by player</div></div>
    <div class="evaldata-row b" data-step="3"><div class="lead"><b>Fall detection</b></div><div class="lead">split by person and by room</div></div>
    <div class="evaldata-row b" data-step="4"><div class="lead"><b>Saharan dust</b></div><div class="lead">split by season or region: neighboring days look alike</div></div>
  </div>
  ${cite('Projects from this class, by title')}
`, { sub: true });

/* ---------- 20A: the dataset decision ---------- */
st(`
  <h1 class="t">Is this dataset right for my task? Five questions</h1>
  <table class="evaldata-tbl">
    <tr><th>Question</th><th>Cheap test</th></tr>
    <tr class="b" data-step="1"><td><b>1. Does it label what I need?</b></td><td>read the labeling guide: same classes, same definitions, boxes or masks</td></tr>
    <tr class="b" data-step="2"><td><b>2. Does it look like my world?</b></td><td>try to tell its images from yours (next slide)</td></tr>
    <tr class="b" data-step="3"><td><b>3. Enough of my hard cases?</b></td><td>count images per condition</td></tr>
    <tr class="b" data-step="4"><td><b>4. Are the labels right?</b></td><td>check a random sample by hand</td></tr>
    <tr class="b" data-step="5"><td><b>5. Can I use it?</b></td><td>splits, duplicates, license, consent</td></tr>
  </table>
  <div class="statement b" data-step="6" style="margin-top:2vh"><b>Verdict: use it, use it and adapt, or don't use it.</b></div>
`);

/* ---------- 20B: does it look like my world? SE computed. ---------- */
const ED_N = 400, edSE = Math.sqrt(.25 / ED_N);
st(`
  <h1 class="t">Does it look like my world? Try to tell them apart</h1>
  <div class="d6-cols" style="align-items:center">
    <div class="evaldata-col evaldata-small">
      <div class="lead b" data-step="1">Take ~200 of <b>your</b> images (no labels needed) and ~200 from the dataset</div>
      <div class="lead b" data-step="2">Train a small classifier: <b>"theirs or mine?"</b> It is Name That Dataset, aimed at your data</div>
      <div class="lead b" data-step="3">Look at the images it is surest about: they show <b>what differs</b> (light, camera, place)</div>
    </div>
    <div class="evaldata-col">
      <div class="b" data-step="4"><div class="evaldata-big">≈ 50%</div><div class="lead">can't tell them apart: good news</div></div>
      <div class="b" data-step="5"><div class="evaldata-big">≈ 95%</div><div class="lead">different worlds: expect a big drop</div></div>
      <div class="label b" data-step="5">On ${ED_N} test images, 1 standard error = ${(edSE * 100).toFixed(1)} points, so 55% is only ${((.55 - .5) / edSE).toFixed(0)} standard errors above chance</div>
    </div>
  </div>
  ${cite('Standard error computed: √(0.5 × 0.5 ÷ ' + ED_N + ')')}
`);

/* ---------- 20C: enough examples, and correct labels? n and the audit interval computed. ---------- */
const edN = (p, m) => Math.ceil(p * (1 - p) * (1.96 / m) ** 2);
const ED_BAD = 12, ED_AUD = 200, edP = ED_BAD / ED_AUD, edASE = Math.sqrt(edP * (1 - edP) / ED_AUD);
st(`
  <h1 class="t">Enough examples, and correct labels? Count them</h1>
  <div class="d6-cols" style="align-items:center">
    <div class="evaldata-col">
      <div class="lead b" data-step="1">To measure accuracy within <b>±5 points</b>, you need about:</div>
      <div class="b" data-step="2"><div class="evaldata-big">${edN(.9, .05)}</div><div class="lead">images per condition, if accuracy is near 90%</div></div>
      <div class="b" data-step="3"><div class="evaldata-big">${edN(.5, .05)}</div><div class="lead">near 50%, the worst case</div></div>
    </div>
    <div class="evaldata-col evaldata-small">
      <div class="lead b" data-step="4"><b>Audit labels:</b> check ${ED_AUD} random images by hand; ${ED_BAD} are wrong</div>
      <div class="d6-eq b" data-step="5">error ${(edP * 100).toFixed(0)}%, likely between ${((edP - 1.96 * edASE) * 100).toFixed(1)}% and ${((edP + 1.96 * edASE) * 100).toFixed(1)}%</div>
      <div class="lead b" data-step="6">With ${(edP * 100).toFixed(0)}% wrong labels, a 1-point "improvement" means nothing</div>
    </div>
  </div>
  ${cite('Counts are an example · n = p(1−p)(1.96/m)², interval = p ± 1.96 √(p(1−p)/n), both computed')}
`, { sub: true });

/* ---------- 20D: checking a dataset in practice. Steps are a workflow, not data; tools named are real. ---------- */
st(`
  <h1 class="t">How to check a dataset in one afternoon</h1>
  <div class="evaldata-rows evaldata-small">
    <div class="evaldata-row b" data-step="1"><div class="lead"><b>1. Look</b></div><div class="lead">a random grid of ~50 images per class, and per split. You will see problems no number shows.</div></div>
    <div class="evaldata-row b" data-step="2"><div class="lead"><b>2. Tag, then count</b></div><div class="lead">give each image its conditions (night, device, person, place) from metadata or by hand, then count per class and per tag</div></div>
    <div class="evaldata-row b" data-step="3"><div class="lead"><b>3. Find copies</b></div><div class="lead">embed every image, find each test image's nearest training image, look at the closest pairs</div></div>
    <div class="evaldata-row b" data-step="4"><div class="lead"><b>4. Find bad labels</b></div><div class="lead">compare labels with a model's predictions, look where they disagree most, audit a random sample by hand</div></div>
    <div class="evaldata-row b" data-step="5"><div class="lead"><b>5. Compare to your world</b></div><div class="lead">"theirs or mine?" uses images only, no labels, so it works for any task</div></div>
    <div class="evaldata-row b" data-step="6"><div class="lead"><b>6. Write it down</b></div><div class="lead">a datasheet: where the data came from, who is in it, what it is not for</div></div>
  </div>
  ${cite('Tools: FiftyOne (browse and slice), cleanlab (label issues), CLIP or DINOv2 embeddings · ' + edA('https://arxiv.org/abs/1803.09010', 'Gebru et al., Datasheets for Datasets (CACM 2021)'))}
`);

/* ---------- 20D': step 3 in code. Threshold is an example; any embedding model works. ---------- */
st(`
  <h1 class="t">Finding copies takes a few lines of code</h1>
  <div class="d6-cols" style="align-items:center">
    <pre class="d6-eq b" data-step="1" style="margin:0;white-space:pre">
# rows = one embedding per image (CLIP, DINOv2, ...)
tr = train_emb / norm(train_emb, axis=1, keepdims=True)
te = test_emb  / norm(test_emb,  axis=1, keepdims=True)

sim  = te @ tr.T            # cosine similarity
best = sim.max(axis=1)      # closest training image
who  = sim.argmax(axis=1)

for i in argsort(-best)[:100]:   # most similar first
    show(test[i], train[who[i]], best[i])</pre>
    <div class="evaldata-col evaldata-small">
      <div class="lead b" data-step="2">Look at pairs from the top down, and stop when you see many different images in a row</div>
      <div class="lead b" data-step="3">A fixed cutoff alone catches look-alikes that are not copies: <b>a person decides</b></div>
      <div class="lead b" data-step="4">Run it on <b>test against test</b> too: copies inside the test set count twice</div>
    </div>
  </div>
  ${cite('Stopping rule after Barz and Denzler (they stopped after 20 "different" pairs in a row) · ' + BD)}
`, { sub: true });

/* ---------- Transition to Part 4 ---------- */
st(`
  <h1 class="t">The data looks right…</h1>
  <div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;justify-content:center;gap:4vh">
    <div class="lead b" data-step="1">Labels checked, groups counted, splits clean.</div>
    <div class="statement b" data-step="2" style="font-size:clamp(1.8rem,3.4vw,3.2rem)"><b>…but can we trust the test score?</b></div>
  </div>
`);
}
