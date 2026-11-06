/* PART: benchmarks (Object Recognition). Owner: Shreya.
   One question runs through this section: how do we know whether a vision system actually sees?
   A teacup recurs on every slide. Not from Ch. 50. Scenes use our own cup outline (assets/cup-mask.js). */
{
section('5. Benchmarks');

st(`
  <h1 class="t">What is a benchmark?</h1>
  <div class="flow b" data-step="1" style="margin:auto 0 2vh">
    <div class="step"><b>Dataset</b><span class="label">the images</span></div><div class="arrow">+</div>
    <div class="step"><b>Task</b><span class="label">what to predict</span></div><div class="arrow">+</div>
    <div class="step"><b>Metric</b><span class="label">how to score it</span></div><div class="arrow">+</div>
    <div class="step"><b>Test set</b><span class="label">images held out</span></div>
  </div>
  <div class="lead b" data-step="2" style="text-align:center;margin-bottom:auto">PASCAL VOC · ImageNet · COCO · ADE20K</div>
`, { notes: [
  "(draft) We have used a lot of numbers today. Where do they come from, and what do they tell us? The question for this section is: how do we know whether a vision system actually sees and understands something?",
  "(draft) A benchmark is how the field tries to answer that. It is four things fixed together: a dataset, a task definition, a metric, and a held-out test set. Everyone then gets the same test, so is it better becomes a number.",
  "(draft) Recognition has a history of them: PASCAL VOC, the ImageNet challenge, COCO for detection and masks, and ADE20K for segmentation. They give a shared yardstick, a focused community and visible progress. ImageNet shows how much that matters: in 2012 AlexNet cut top-5 error from about 26 percent to about 15 percent, and the field moved to CNNs almost overnight."
]});

sc('benchTasks', 'scenes/bench-tasks.html');
sc('benchMetrics', 'scenes/bench-metrics.html');

const P = 'assets/photos/', A4 = '../day04/assets/';
const bars = (t, a, b) => `<div class="or-bars"><div class="label or-note">${t}</div>
  <div class="or-bar label"><span>Model A</span><i style="width:${a}%"></i><b>${a}%</b></div>
  <div class="or-bar label"><span>Model B</span><i style="width:${b}%"></i><b>${b}%</b></div></div>`;

st(`
  <h1 class="t">A saturated benchmark stops measuring the skill</h1>
  <div class="or-cards or-c3">
    <div class="or-card b"><img class="or-pic" src="${A4}photos/coffee.jpg" alt="A clear photo of one cup"><div class="lead"><b>At the ceiling</b></div>${bars('Easy test', 99, 99)}</div>
    <div class="or-card b"><div class="lead"><b>Wrong labels</b></div><div class="label">At least 6% of ImageNet validation labels are wrong</div></div>
    <div class="or-card b"><img class="or-pic" src="${P}tea-table.jpg" alt="Small teacups on a table between chairs"><div class="lead"><b>Harder images</b></div>${bars('Cluttered test', 91, 62)}</div>
  </div>
  <div class="lead b" style="text-align:center;margin-bottom:5vh"><b>When every model gets the question right, the test stops telling us which model is better.</b></div>
  ${cite('Photos: Shixart1985, CC BY 2.0 · Andrey Korzun, CC BY-SA 4.0, cropped · Model A and B scores are toy numbers · Northcutt et al. (2021) · Recht et al. (2019) · Russakovsky et al. (2015) · He et al. (2016)')}
`, { notes: [
  "(draft) A benchmark score is not the same thing as a capability. Here are three ways they come apart. The two models here are made up, to show the idea.",
  "(draft) At the ceiling: on an easy set of clear cups, both models score 99 percent, so the test cannot separate them. This really happened on ImageNet. A ResNet ensemble reached 3.57 percent error in 2015, past one reported human top-5 estimate of about 5 percent, from a single expert annotator.",
  "(draft) Wrong labels: once images are ambiguous or mislabeled, the last few points measure the labels, not the model. Northcutt and colleagues estimate that at least 6 percent of ImageNet validation labels are wrong.",
  "(draft) Harder images: put the same two models on small cups in a cluttered room, and now they differ. Again the numbers are toy, but the real effect is large. Recht and colleagues rebuilt an ImageNet test set, and accuracy dropped by 11 to 14 points. The authors say this was not from reusing the test set: models struggled with slightly harder images.",
  "(draft) So when every model gets the question right, the test stops telling us which model is better. A benchmark is saturated when improving on it no longer predicts improving on what it was meant to measure."
]});

st(`
  <h1 class="t">Human findings make better tests</h1>
  <div class="or-hsplit">
    <img class="or-img b" data-step="1" src="../assets/assumptions/checker-shadow.png" alt="The checker shadow illusion">
    <table class="or-tbl">
      <tr class="b" data-step="1"><th>Humans<br>What do humans perceive?</th><th>Test<br>How can we test it?</th><th>Models<br>Same ability?</th></tr>
      <tr class="b" data-step="1"><td>A surface, despite the shadow</td><td>Change the lighting, keep the object</td><td>Does the answer hold?</td></tr>
      <tr class="b" data-step="2"><td>An object from any view</td><td>ObjectNet: controlled viewpoint, rotation, background</td><td>~40–45% drop</td></tr>
      <tr class="b" data-step="3"><td>Shape over texture</td><td>Cue-conflict images</td><td>Lean on texture</td></tr>
    </table>
  </div>
  <div class="lead b" data-step="4" style="text-align:center;margin-bottom:5vh"><b>Human perception shows what a vision system should be tested on.</b></div>
  ${cite('Checker shadow: Edward H. Adelson, 1995 · Barbu et al. (2019) · Geirhos et al. (2019)')}
`, { notes: [
  "(draft) This is the turning point. So far we have scored models on questions we happened to ask. Where should better questions come from? One good source is human vision.",
  "(draft) Remember this illusion. Squares A and B are the same gray on the screen, yet you see two different surfaces, because your visual system discounts the shadow. That is a finding about perception, and it suggests a test: change the lighting, keep the object, and ask whether the model's answer holds.",
  "(draft) People are robust to viewpoint. ObjectNet controls rotation, viewpoint and background, and its authors report a 40 to 45 percent drop in performance relative to other benchmarks.",
  "(draft) Remember: humans go with shape. Cue-conflict images showed models leaning on texture, and that led to shape-focused training data.",
  "(draft) So our understanding of human perception can reveal what a vision system should be tested on. Keep the comparison fair: match presentation time, image size and answer format. And accuracy is not the whole story. Comparing errors image by image, Geirhos and colleagues found that human and model errors overlap little more than chance."
]});

/* Agreement among people, Fleiss' kappa, from Table 1 of Kim et al. (2026), arXiv v1. */
const agree = (t, v) => `<div class="or-bar or-bar-w label"><span>${t}</span><i style="width:${v * 100}%"></i><b>${v.toFixed(2)}</b></div>`;

st(`
  <h1 class="t">A dataset may not capture what we meant to test</h1>
  <div class="or-split">
    <div class="or-list b" data-step="1" style="align-self:center">
      <div class="lead" style="text-align:center">Is cue conflict a clean test of shape vs. texture?</div>
    </div>
    <div class="or-list">
      <div class="b" data-step="2">
        <div class="lead"><b>Do people agree on what they see?</b></div>
        ${agree('Cue conflict, texture', .29)}${agree('Cue conflict, shape', .73)}
      </div>
      <div class="b" data-step="3">
        ${agree('New dataset, texture', .80)}${agree('New dataset, shape', .98)}
        <div class="label or-note">Balanced, recognizable cues</div>
      </div>
    </div>
  </div>
  <div class="lead b" data-step="4" style="text-align:center;margin-bottom:5vh"><b>The score depends on what the dataset actually contains</b></div>
  ${cite("Kim et al. (2026), arXiv:2603.10834, CC BY 4.0 (agreement: Fleiss' kappa) · Geirhos et al. (2019)")}
`, { notes: [
  "(draft) Now turn that same care on the test itself. A test built from a human finding can still miss.",
  "(draft) Remember the cat shape with elephant skin from earlier. We used it to say models lean on texture. But is it a clean test of shape against texture?",
  "(draft) Kim and colleagues asked whether people can even tell what these images show. They had 88 participants, and measured agreement with Fleiss' kappa, where 1 means perfect agreement. On the cue-conflict images, agreement is 0.73 for shape and only 0.29 for texture. Stylization mixes the two cues, and many images are hard to recognize, for people and for models.",
  "(draft) So they built a new dataset, REFINED-BIAS, with balanced and recognizable cues. Agreement rises to 0.98 for shape and 0.80 for texture. They also point out that a ratio hides how much a model uses each cue: 8 percent shape and 2 percent texture gives the same ratio as 80 percent and 20 percent.",
  "(draft) So the dataset may not capture what we meant to test, and the conclusion can move with it. Burgert and colleagues reach a related view, concluding that CNNs mainly rely on local shape. The original finding was still valuable: it revealed a gap and started the question. This does not settle it, but it shows why we have to question the test too."
]});

st(`
  <h1 class="t">Progress is only as good as the question</h1>
  <div class="or-cards or-c3">
    <div class="or-card b" data-step="1"><div class="lead"><b>Labels</b></div><div class="label">Are we measuring the right thing?</div></div>
    <div class="or-card b" data-step="2"><div class="lead"><b>Data</b></div><div class="label">Are we testing the right situations?</div></div>
    <div class="or-card b" data-step="3"><div class="lead"><b>Score</b></div><div class="label">Are we rewarding the right behavior?</div></div>
  </div>
  <div class="or-case b" data-step="4">
    <img src="${A4}photos/coffee.jpg" alt="The teacup">
    <div class="or-list">
      <div class="lead"><b>Case study: the teacup</b></div>
      <div class="label"><b>Labels:</b> does a broken cup count as a teacup?</div>
      <div class="label"><b>Data:</b> do we test new angles, lighting, backgrounds, occlusion?</div>
      <div class="label"><b>Score:</b> do we reward naming the cup, or tracing its boundary?</div>
      <div class="lead"><b>Change any one, and the best model can change</b></div>
    </div>
  </div>
  ${cite('Torralba &amp; Efros (2011) · Photo: Shixart1985, CC BY 2.0')}
`, { notes: [
  "(draft) Here is the real challenge: the benchmark itself. Three choices decide what we call progress.",
  "(draft) Labels: are we measuring the right thing? A label freezes one answer to an ambiguous question. Is a toy car a car?",
  "(draft) Data: are we testing the right situations? Datasets have signatures: Torralba and Efros showed that models can tell which dataset an image came from. And web-scale pretraining may already have seen the test images.",
  "(draft) Score: are we rewarding the right behavior? One number hides who and where a model fails. And by Goodhart's law, once we optimize the score, the score stops measuring the skill.",
  "(draft) Take our teacup. Does a broken cup count? Do we test new angles, lighting, backgrounds and occlusion? Do we reward identifying the cup, or accurately locating its boundary? Change any of these and the conclusion about which model is better can change. A benchmark is a question we have frozen into a dataset, so progress is only as good as the question. Next class: what if a model could choose which cues to pay attention to?"
]});
}
