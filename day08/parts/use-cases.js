/* PART: use-cases (Day 8). Google deck "Day 8 - Generative Modeling", slides 3-4, as reorganized on 2026-11-11 (owner: Shreya).
   Slide 3 (Use Cases): her note "Pull a few examples from here" points to Kaiming He, MIT 6.7960 Deep Learning,
   Lecture 14 "Generative Models: Introduction" (lec14_gen_intro.pdf). Examples come from its pages 4, 5, 6, 8 ("The GenAI Era")
   and its page 14 ("What do these scenarios have in common?"), the same pages she pasted into the Google slide.
   Slide 4 (What is a generative model?): her comment asks for the definition simply, with an animation or image.
   The definition and the two lines under it follow her note (a distribution, not a single label; softmax already gives
   p(class | x)). The animation uses the lecture's page 15 (discriminative vs generative) and pages 26-29
   (generative modeling is probabilistic modeling), cropped from the PDF. Bullet and panel positions come from the PDF's
   own text and image coordinates. No speaker notes. */
{
const L = f => `assets/lecture/${f}`;
const HE = 'Kaiming He, MIT 6.7960 Deep Learning, Lecture 14: Generative Models: Introduction';

section('Use Cases');

/* 3A: four examples, one per click */
st(`
  <style>
    .d8-ex{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:repeat(4, 1fr); gap:1.4vw; align-items:start; }
    .d8-ex .card{ display:flex; flex-direction:column; align-items:center; gap:1vh; text-align:center; min-width:0; }
    .d8-ex img{ width:100%; height:30vh; object-fit:contain; border-radius:8px; background:#fff; }
    @media (max-width: 820px), (max-aspect-ratio: 1/1){ .d8-ex{ grid-template-columns:1fr 1fr; } .d8-ex img{ height:16vh; } }
  </style>
  <h1 class="t">Use Cases</h1>
  <div class="d8-col">
    <div class="d8-ex">
      <div class="card b"><img src="${L('ex-chatbot.png')}" alt="A chatbot answering what generative models are"><div class="lead">Chatbots</div></div>
      <div class="card b"><img src="${L('ex-text-to-image.png')}" alt="A teddy bear teaching, generated from a text prompt"><div class="lead">Text to image</div><div class="label">Stable Diffusion</div></div>
      <div class="card b"><img src="${L('ex-text-to-video.png')}" alt="A frame of a generated video of paper planes over trees"><div class="lead">Text to video</div><div class="label">Sora</div></div>
      <div class="card b"><img src="${L('ex-protein.png')}" alt="A generated protein structure"><div class="lead">Protein design</div><div class="label">RFdiffusion, Watson et al., Nature 2023</div></div>
    </div>
  </div>
  <div class="d8-cite">${HE}, pages 4, 5, 6 and 8.</div>
`);

/* 3B: what the scenarios share. The lecture page, with its four bullets uncovered one per click.
   Bullet boxes from the PDF text (page fractions, then mapped into the crop y .15-.88). */
st(`
  <h1 class="t">What do these scenarios have in common?</h1>
  <div class="d8-col">
    ${d8Fig(L('scenarios.png'), 2.4341, [
      {r: [0.005, 0.115, 0.575, 0.105], k: 'cov', step: 1},
      {r: [0.005, 0.254, 0.575, 0.106], k: 'cov', step: 2},
      {r: [0.005, 0.395, 0.575, 0.106], k: 'cov', step: 3},
      {r: [0.005, 0.536, 0.575, 0.185], k: 'cov', step: 4},
    ], {style: 'height:52vh', alt: 'Multiple predictions to one input; some are more plausible; training data may contain no solution; output may be more complex and higher-dimensional'})}
  </div>
  <div class="d8-cite">${HE}, page 14.</div>
`, {sub: true});

section('What is a generative model?');

/* 4A: the definition, then discriminative vs generative (the generative half is covered until its click),
   then her note: the output is a distribution. Crop x .05-.96, y .15-.97 of page 15. */
st(`
  <h1 class="t">What is a generative model?</h1>
  <div class="d8-col" style="gap:1.4vh">
    <div class="lead b" data-step="1">A generative model learns the distribution of the data, ${d8Tex('p(x)')}, so it can sample new data.</div>
    ${d8Fig(L('disc-vs-gen.png'), 1.972, [
      {r: [0.005, 0.50, 0.42, 0.26], k: 'cov', step: 3},
      {r: [0.735, 0, 0.265, 1], k: 'cov', step: 3},
    ], {cls: 'b', step: 2, style: 'height:40vh', alt: 'Discriminative: image x in, label y out. Generative: label y in, image x out'})}
    <div class="lead b" data-step="4">The output is now a distribution, not a single label. A softmax classifier already outputs ${d8Tex('p(\\text{class} \\mid x)')}.</div>
  </div>
  <div class="d8-cite">${HE}, page 15.</div>
`);

/* 4B: generative modeling is probabilistic modeling. Pages 26-29 as one stack: data, the data distribution,
   the estimated distribution (fit with a loss), then a new sample x' ~ p(x). */
st(`
  <h1 class="t">What is a generative model?</h1>
  <div class="lead" style="flex:0 0 auto">Generative modeling is probabilistic modeling</div>
  <div class="d8-stack" style="height:50vh">
    ${[26, 27, 28, 29].map((n, i) => d8Fig(L(`prob-model-${n}.png`), 1.9287, [], {cls: 'd8-f b', step: i + 1,
      alt: ['Data: three dog photos', 'The data distribution behind them', 'An estimated distribution, fit by optimizing a loss', 'Sample new data from the estimate'][i]})).join('')}
  </div>
  <div class="d8-cite">${HE}, pages 26 to 29.</div>
`, {sub: true});
}
