/* PART: autoencoders (Day 8). Google deck "Day 8 - Generative Modeling", slides 12-20 (owner: Shreya).
   Images are the Google deck's own (day08/assets/google). Each one reveals its parts click by click:
   black covers lift off the parts of a frame, a ring moves from part to part, a cover wipes off a loss curve.
   Every cover and ring position was detected by script from the image (bands of content and the gaps between them,
   colored pixels for the curves and boxes), not placed by eye. Script: the session scratchpad, boxes.py and bands.py.
   Cite "source: to add" until checked: the frames carry a third-party logo, and the bird on slide 13 has no credit.
   Our own figures (workbook, MNIST, LeCun et al., 1998) fill in where the Google deck has none.
   Comments applied: 13 the image comes in; 14 frame to frame, with input then decoder output inside each frame,
   and input and output side by side with the MSE loss at the end; 16 title says training over time improves the output;
   17 bottleneck defined and sizes compared; 18 animated, with a short "why"; 20 models, use cases, images.
   The code slide (Google 19) was removed at Shreya's request (2026-11-11). Math is LaTeX, rendered with KaTeX.
   No speaker notes. */
{
section('Autoencoders');

const G = f => `assets/google/${f}`;
const K = (r, step) => ({r, k: 'cov d8-k', step});          // black cover that lifts on its click
const RING = (r, step) => ({r, k: 'ring d8-one', step});    // highlight ring; only the newest one shows

/* 12 */
st(`
  <h1 class="t">Autoencoders</h1>
  <div class="d8-col" style="gap:2.4vh">
    <div class="b" data-step="1" style="flex:0 0 auto;height:34vh">${d8TitleArt('ae')}</div>
    <div class="statement b" data-step="2" style="text-align:center">Learn a small code by rebuilding the input.</div>
  </div>
`);

/* 9: Compress, then reconstruct, as one slide drawn for this deck (Shreya, 2026-11-11: fewer slides, no screenshots).
   It replaces the textbook diagram, the five video frames and "A loss with no labels" (kept unused in parts/_removed.js).
   Her comments still apply: the input comes in, flows through the encoder to the code, the decoder makes the output, and at
   the end the input and output sit side by side with the MSE loss. The digits are real: a test 7 and its reconstruction
   from our workbook (convolutional autoencoder, 64-number code), cropped from ae-recon-compare.png at the detected cells. */
const AEF = `<style>
  .d8-aesvg{ width:100%; height:100%; display:block; }
  .d8-aesvg text{ font-family:var(--font); fill:var(--ink); }
</style>`;
const aeA = (x1, x2, y = 120) => `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="#0f172a" stroke-width="2.5" marker-end="url(#aeA)"/>`;
st(`${AEF}
  <h1 class="t">Compress, then reconstruct</h1>
  <div class="d8-col" style="gap:1.2vh">
    <div class="lead b" data-step="1">Can we learn a compressed representation of an image, and reconstruct the original?</div>
    <div style="flex:0 0 auto;height:36vh">
      <svg class="d8-aesvg" viewBox="0 0 760 250" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs><marker id="aeA" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#0f172a"/></marker></defs>
        <g class="b" data-step="2">
          <image href="assets/digit7-input.png" x="20" y="64" width="112" height="112"/>
          <rect x="20" y="64" width="112" height="112" fill="none" stroke="#0f172a" stroke-width="2"/>
          <text x="76" y="202" font-size="16" text-anchor="middle">input <tspan font-style="italic">x</tspan></text>
          <text x="76" y="222" font-size="13" text-anchor="middle">1024 numbers</text>
        </g>
        <g class="b" data-step="3">
          ${aeA(138, 172)}
          <polygon points="176,60 286,92 286,148 176,180" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/>
          <text x="231" y="126" font-size="17" text-anchor="middle">encoder</text>
          ${aeA(290, 330)}
          ${[0, 1, 2, 3, 4, 5].map(i => `<rect x="334" y="${84 + i * 12}" width="40" height="12" fill="#fde68a" stroke="#0f172a" stroke-width="1.5"/>`).join('')}
          <text x="354" y="70" font-size="16" text-anchor="middle">code <tspan font-style="italic">z</tspan></text>
          <text x="354" y="186" font-size="13" text-anchor="middle">a few numbers</text>
        </g>
        <g class="b" data-step="4">
          ${aeA(378, 416)}
          <polygon points="420,92 530,60 530,180 420,148" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/>
          <text x="475" y="126" font-size="17" text-anchor="middle">decoder</text>
          ${aeA(534, 568)}
          <image href="assets/digit7-code64.png" x="572" y="64" width="112" height="112"/>
          <rect x="572" y="64" width="112" height="112" fill="none" stroke="#0f172a" stroke-width="2"/>
          <text x="628" y="202" font-size="16" text-anchor="middle">output <tspan font-style="italic">x̂</tspan></text>
          <text x="628" y="222" font-size="13" text-anchor="middle">1024 numbers</text>
        </g>
        <g class="b" data-step="5">
          <path d="M 76 238 L 76 246 L 628 246 L 628 238" fill="none" stroke="#0f172a" stroke-width="2"/>
          <text x="352" y="240" font-size="15" text-anchor="middle">compare</text>
        </g>
      </svg>
    </div>
    <div class="d8-math b" data-step="5">${d8Tex('\\mathcal{L} = \\frac{1}{N}\\sum_{i=1}^{N} \\big\\lVert x_i - \\hat{x}_i \\big\\rVert^2, \\qquad \\hat{x}_i = g\\big(f(x_i)\\big)', true)}
      <div class="label">No labels needed: the input is its own target. ${d8Tex('f')} = encoder, ${d8Tex('g')} = decoder.</div></div>
  </div>
  <div class="d8-cite">Digits: our workbook, section 1.4 (MNIST, LeCun et al., 1998). Drawing made for this deck.</div>
`, {sub: false});

/* 16: early frame, then the later frame with its loss curve drawn on (a wipe from where the early curve ended),
   then a ring on the sharper output. Detected: early curve ends at x .289; later curve x .245-.779, y .607-.798;
   later output box x .828-.989, y .114-.377. */
st(`
  <h1 class="t">Training over time improves the output</h1>
  <div class="d8-stack" style="height:44vh">
    ${d8Fig(G('s16-epoch-a.png'), 1.6898, [], {cls: 'd8-f b', step: 1, alt: 'Early in training: blurry output, short loss curve'})}
    ${d8Fig(G('s16-epoch-b.png'), 1.6436, [
      {r: [0.289, 0.575, 0.51, 0.25], k: 'cov d8-wipe d8-k', step: 2},
      RING([0.818, 0.095, 0.18, 0.30], 3),
    ], {cls: 'd8-f b', step: 2, alt: 'Later in training: sharper output, longer loss curve'})}
  </div>
  <div class="d8-capstack">
    <div class="label d8-cap b" data-step="1">early in training</div>
    <div class="label d8-cap b" data-step="2">later in training: the loss keeps going down</div>
    <div class="label d8-cap b" data-step="3">and the output is sharper</div>
  </div>
  <div class="d8-cite">source: to add</div>
`, {sub: false});

/* 17: the definition; the network with a ring on the bottleneck (detected box x .443-.586, y .50-.64);
   then our comparison of code sizes covers it */
st(`
  <h1 class="t">Smaller bottleneck, blurrier reconstruction</h1>
  <div class="d8-col">
    <div class="lead b" data-step="1">The bottleneck is the narrow layer in the middle. Everything the decoder knows about the image has to pass through it.</div>
    <div class="d8-stack" style="height:36vh">
      ${d8Fig(G('s14-frame3.png'), 2.3272, [RING([0.433, 0.48, 0.163, 0.18], 3)], {cls: 'd8-f b d8-from-left', step: 2, alt: 'Encoder, bottleneck, decoder'})}
      ${d8Fig('assets/ae-recon-compare.png', 1.5822, [], {cls: 'd8-f b d8-from-right', step: 4, alt: 'Input digits, rebuilt from 2 numbers (blurry, some wrong), and from 64 numbers (sharp)'})}
    </div>
  </div>
  <div class="d8-cite">Diagram: source to add. Reconstructions: our workbook, section 1.4 (2-number MLP code vs 64-number convolutional code). MNIST, LeCun et al., 1998.</div>
`, {sub: false});

/* 14: the latent space problem, with plainer wording (Shreya, 2026-11-11). Each click says what you are looking at and why
   it matters: codes cluster, the space between is empty, codes there decode badly, random codes land there, so we cannot
   sample reliably, which VAEs fix. The cluster diagram is the Google image (its red caption covered until its click; detected
   x .257-.722, y .798-.926 in the crop); the decoded grid and the random samples are real, from our workbook. */
st(`
  <style>
    .d8-two{ flex:0 1 auto; display:grid; grid-template-columns:1fr 1fr; gap:2vw; align-items:start; }
    .d8-cell{ display:flex; flex-direction:column; align-items:center; gap:.6vh; min-width:0; }
    .d8-cell > img{ max-height:19vh; width:auto; max-width:100%; }
    .d8-cell .label{ text-align:center; }
    @media (max-width: 820px), (max-aspect-ratio: 1/1){ .d8-two{ grid-template-columns:1fr; } .d8-cell > img{ max-height:20vh; } }
  </style>
  <h1 class="t">Latent space problem</h1>
  <div class="d8-col" style="gap:1vh">
    <div class="d8-two">
      <div class="d8-cell b d8-from-left" data-step="1" style="width:100%">
        ${d8Fig(G('s18-latent-problem-crop.png'), 1.4957, [K([0.24, 0.78, 0.50, 0.16], 2)], {style: 'height:19vh;width:100%', alt: 'Clusters of codes in latent space with empty space between them'})}
        <div class="label">Each dot is one image's code. Codes of similar images cluster together.</div>
        <div class="label b" data-step="2">But the clusters sit far apart, with empty space between them.</div>
      </div>
      <div class="d8-cell">
        <img class="b" data-step="3" src="assets/ae-decode-grid.png" alt="A grid of codes, decoded">
        <div class="label b" data-step="3">To generate, pick a code and decode it. Codes in the empty space decode into blurry or meaningless shapes.</div>
      </div>
    </div>
    <div class="d8-cell b" data-step="4">
      <img src="assets/ae-prior-samples.png" alt="Images decoded from random codes" style="max-height:7vh">
      <div class="label">Codes picked at random (from ${d8Tex('\\mathcal{N}(0, I)')}) often land in a gap, so the outputs are poor.</div>
    </div>
    <div class="b" data-step="5" style="text-align:center;font-size:clamp(.95rem, 1.5vw, 1.35rem);line-height:1.35"><b>The loss only asks the autoencoder to rebuild its training images, not to fill the space between them. So we can't sample new images reliably.</b> VAEs fix this.</div>
  </div>
  <div class="d8-cite">Cluster diagram: source to add. Decoded grid and random samples: our workbook, section 1.5 (MNIST).</div>
`, {sub: false});

/* 15: applications, mostly generative, plus anomaly detection. Shreya (2026-11-11): add photos. A 2 x 2 grid of the four
   uses, each with a photo figure from its paper (cropped from the PDF above its caption), big enough to see: the model,
   then the uses, then the photos. */
st(`
  <style>
    .d8-apps{ flex:0 1 auto; display:grid; grid-template-columns:1fr 1fr; gap:1.4vh 1.4vw; }
    .d8-apps .card{ border:1px solid var(--line); border-radius:12px; padding:.8vh .8vw; background:#f8fafc;
      display:flex; flex-direction:column; gap:.5vh; align-items:center; text-align:center; }
    .d8-apps .card .nm{ font-weight:700; font-size:clamp(.95rem, 1.45vw, 1.3rem); }
    .d8-apps .card .label{ line-height:1.25; font-size:clamp(.75rem, 1.05vw, 1rem); }
    .d8-apps img{ width:100%; height:15vh; object-fit:contain; border-radius:6px; background:#fff; }
    @media (max-width: 820px), (max-aspect-ratio: 1/1){ .d8-apps{ grid-template-columns:1fr; } .d8-apps img{ height:13vh; } }
  </style>
  <h1 class="t">Applications</h1>
  <div class="d8-col" style="justify-content:flex-start;gap:1.2vh">
    <div class="d8-box b" data-step="1" style="align-self:center;padding:.8vh 1.4vw">Model: autoencoder</div>
    <div class="d8-apps">
      <div class="card b" data-step="2">
        <div class="nm">Image generators</div>
        <img class="b" data-step="3" src="assets/papers/rombach2022-fig5.png" alt="Rombach et al. 2022, Figure 5: images generated from text prompts">
        <div class="label">Stable Diffusion works on an autoencoder's code, not on pixels. Rombach et al., CVPR 2022</div>
      </div>
      <div class="card b" data-step="2">
        <div class="nm">Generating from learned codes</div>
        <img class="b" data-step="3" src="assets/papers/vqgan2021-fig1.png" alt="Esser et al. 2021, Figure 1: a synthesized high-resolution landscape">
        <div class="label">A transformer writes codes; the autoencoder's decoder paints them. Esser et al., CVPR 2021</div>
      </div>
      <div class="card b" data-step="2">
        <div class="nm">Filling in missing parts</div>
        <img class="b" data-step="3" src="assets/papers/mae2022-fig2.png" alt="He et al. 2022, Figure 2: masked image, reconstruction, original">
        <div class="label">Hide most of an image; the autoencoder fills in the rest. He et al., CVPR 2022</div>
      </div>
      <div class="card b" data-step="2">
        <div class="nm">Anomaly detection</div>
        <img class="b" data-step="3" src="assets/papers/bergmann2019-fig1.png" alt="Bergmann et al. 2019, Figure 1: defect-free and defective objects, defects outlined">
        <div class="label">High reconstruction error flags defects in factory inspection. Bergmann et al., CVPR 2019</div>
      </div>
    </div>
  </div>
  <div class="d8-cite">Figures: Rombach et al., CVPR 2022 (arXiv 2112.10752), Fig. 5; Esser et al., CVPR 2021 (arXiv 2012.09841), Fig. 1; He et al., CVPR 2022 (arXiv 2111.06377), Fig. 2; Bergmann et al., CVPR 2019, Fig. 1.</div>
`, {sub: false});
}
