/* PART: check-data (Day 6 reduced). Google deck pages 25-34, one HTML slide each. Titles are the Google deck's.
   Facts on the slides were checked for day06 (day06/feedback/_day.md, Rounds 6, 7, 8, 11); sources in the credit lines.
   Figures that only illustrate a mechanism are drawn or computed in the scenes and marked "example" there. No speaker notes. */
{
section('Check your data');

const cdA = (url, t) => d6Link(url, t);
const cdStyle = `<style>
  .check-data-trans{ margin:auto; text-align:center; display:flex; flex-direction:column; gap:2.4vh; }
  .check-data-find{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1fr 2.1fr; gap:2.4vw; align-items:center; }
  .check-data-paper{ display:flex; flex-direction:column; align-items:center; gap:1vh; }
  .check-data-paper svg{ width:min(19vw, 40vh); height:auto; display:block; }
  .check-data-dests{ display:flex; flex-direction:column; gap:1.8vh; }
  .check-data-dest{ display:grid; grid-template-columns:2.6vw minmax(0, 1fr); gap:1vw; align-items:center; }
  .check-data-dest .check-data-arrow{ font-size:clamp(1.6rem, 2.6vw, 2.4rem); color:var(--mute); text-align:center; }
  .check-data-card{ border:2px solid var(--ink); border-radius:12px; padding:1.4vh 1.4vw; display:flex; flex-direction:column; gap:.3vh; }
  .check-data-card .lead{ font-weight:700; line-height:1.15; }
  .check-data-card code{ font-family:ui-monospace,SFMono-Regular,Menlo,monospace; font-size:.92em; }
  .check-data-tbl{ width:100%; border-collapse:collapse; background:#f8fafc; border:1px solid var(--line); font-size:clamp(1.1rem, 1.95vw, 1.8rem); }
  .check-data-tbl th, .check-data-tbl td{ text-align:left; padding:1.5vh 1.2vw; border-top:1px solid var(--line); vertical-align:top; }
  .check-data-tbl th{ background:#0f172a; color:#f8fafc; border-top:none; }
  .check-data-verdict{ font-weight:700; margin-top:1.4vh; }
  .check-data-steps{ flex:1 1 auto; min-height:0; display:flex; flex-direction:column; justify-content:center; gap:1.9vh; }
  .check-data-step{ display:grid; grid-template-columns:minmax(11em, 25vw) 1fr; gap:2vw; align-items:baseline; }
  .check-data-step .lead{ font-size:clamp(1.15rem, 2.05vw, 1.9rem); line-height:1.25; }
  @media (max-width: 820px), (max-aspect-ratio: 1/1){
    .check-data-find, .check-data-step{ grid-template-columns:1fr; gap:.4vh; }
  }
</style>`;

/* ---------- p25: transition ---------- */
st(`${cdStyle}
  <div class="check-data-trans">
    <h1 class="t">Find your dataset</h1>
    <div class="lead b" data-step="1">What can we do</div>
  </div>
`);

/* ---------- p26: her list as destinations. Facts from day06 "Before you collect, look for data that already exists"
   (each place checked 2026-11-09; the Hugging Face count is what its page showed that day). ---------- */
const cdLines = [46, 62, 78, 94].map(y => `<line x1="26" y1="${y}" x2="134" y2="${y}" stroke="#cbd5e1" stroke-width="5"/>`).join('')
  + [134, 150, 166].map(y => `<line x1="26" y1="${y}" x2="134" y2="${y}" stroke="#cbd5e1" stroke-width="5"/>`).join('');
st(`
  <h1 class="t">Find papers that do what you want to do</h1>
  <div class="check-data-find">
    <div class="check-data-paper b" data-step="1">
      <svg viewBox="0 0 160 212" role="img" aria-label="A paper with a dataset link in it">
        <rect x="6" y="6" width="148" height="200" rx="4" fill="#fff" stroke="#0f172a" stroke-width="3"/>
        <line x1="26" y1="26" x2="110" y2="26" stroke="#0f172a" stroke-width="7"/>
        ${cdLines}
        <rect x="20" y="108" width="120" height="16" rx="3" fill="#0f172a"/>
      </svg>
      <div class="label center">the paper's project page or GitHub</div>
    </div>
    <div class="check-data-dests">
      <div class="check-data-dest b" data-step="2"><div class="check-data-arrow">→</div>
        <div class="check-data-card"><div class="lead">Hugging Face</div>
          <div class="label">${cdA('https://huggingface.co/datasets', 'huggingface.co/datasets')} · about 1.1 million datasets · <code>load_dataset("name")</code></div></div></div>
      <div class="check-data-dest b" data-step="3"><div class="check-data-arrow">→</div>
        <div class="check-data-card"><div class="lead">Kaggle</div>
          <div class="label">${cdA('https://www.kaggle.com/datasets', 'kaggle.com/datasets')} · competitions and users, often with example notebooks</div></div></div>
      <div class="check-data-dest b" data-step="4"><div class="check-data-arrow">→</div>
        <div class="check-data-card"><div class="lead">etc</div>
          <div class="label">${cdA('https://datasetsearch.research.google.com/', 'Google Dataset Search')} · NeurIPS datasets track · your field's archives</div></div></div>
    </div>
  </div>
  ${rdCite('Hugging Face count as shown on 2026-11-09', 2)}
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

/* ---------- p32: day06's five-question check. Her "TODO -- bring it in". ---------- */
st(`
  <h1 class="t">Is this dataset right for my task?</h1>
  <div class="lead b" data-step="1">Questions to ask ourselves</div>
  <table class="check-data-tbl">
    <tr class="b" data-step="1"><th>Question</th><th>Cheap test</th></tr>
    <tr class="b" data-step="2"><td><b>1. Does it label what I need?</b></td><td>the labeling guide: same classes, same definitions, boxes or masks</td></tr>
    <tr class="b" data-step="3"><td><b>2. Does it look like my world?</b></td><td>try to tell its images from yours</td></tr>
    <tr class="b" data-step="4"><td><b>3. Enough of my hard cases?</b></td><td>count images per condition</td></tr>
    <tr class="b" data-step="5"><td><b>4. Are the labels right?</b></td><td>check a random sample by hand</td></tr>
    <tr class="b" data-step="6"><td><b>5. Can I use it?</b></td><td>splits, duplicates, license, consent</td></tr>
  </table>
  <div class="lead check-data-verdict b" data-step="7">Verdict: use it · use it and adapt · don't use it</div>
`);

/* ---------- p33: her example, every label tied to one condition. Scene: drawn tiles, brightness rule computed. ---------- */
sc('checkDataCondition', 'scenes/check-data-condition.html');

/* ---------- p34: day06 "How to check a dataset in one afternoon". Her "TODO: add a reputable source": Datasheets for Datasets. ---------- */
st(`
  <h1 class="t">Check your data</h1>
  <div class="check-data-steps">
    <div class="check-data-step b" data-step="1"><div class="lead"><b>1. Look</b></div><div class="lead">random grid of ~50 images per class, and per split</div></div>
    <div class="check-data-step b" data-step="2"><div class="lead"><b>2. Tag, then count</b></div><div class="lead">conditions per image (night, device, person, place), count per class and per tag</div></div>
    <div class="check-data-step b" data-step="3"><div class="lead"><b>3. Find copies</b></div><div class="lead">embed every image, nearest training image for each test image, closest pairs</div></div>
    <div class="check-data-step b" data-step="4"><div class="lead"><b>4. Find bad labels</b></div><div class="lead">labels vs a model's predictions, biggest disagreements, audit a random sample by hand</div></div>
    <div class="check-data-step b" data-step="5"><div class="lead"><b>5. Compare to your world</b></div><div class="lead">a "theirs or mine?" classifier: images only, no labels</div></div>
    <div class="check-data-step b" data-step="6"><div class="lead"><b>6. Write it down</b></div><div class="lead">datasheet: where the data came from, who is in it, what it is not for</div></div>
  </div>
  ${rdCite('Tools: FiftyOne, cleanlab, CLIP or DINOv2 embeddings · ' + cdA('https://arxiv.org/abs/1803.09010', 'Gebru et al., Datasheets for Datasets (CACM 2021)'))}
`);
}
