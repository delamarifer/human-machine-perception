/* Slides that left the Google deck when Shreya reorganized it (2026-11-11). NOT in order.js, so the deck never loads this file.
   Kept so they can come back: add the part name to day08/order.js to show them again. */
{
section('Removed');

/* was Google slide 4: the four questions */
st(`
  <h1 class="t">Why generate synthetic data?</h1>
  <div class="d8-col">
    <div class="lead b">Can generated images be used to train recognition models?</div>
    <div class="lead b">What are the limitations of generated data?</div>
    <div class="lead b">How do we evaluate whether an image is realistic or meaningful?</div>
  </div>
`);

/* 6: a simple definition, then the two kinds of question a model can answer */
const d8Box = (t, cls = '') => `<div class="d8-box ${cls}">${t}</div>`;
st(`
  <style>
    .d8-pair{ flex:0 1 auto; display:grid; grid-template-columns:1fr auto 1fr; gap:2vw; align-items:center; }
    .d8-box{ border:2px solid var(--ink); border-radius:12px; padding:2.4vh 1.6vw; text-align:center;
      font-size:clamp(1rem, 1.7vw, 1.5rem); line-height:1.35; }
    .d8-arrow{ font-size:clamp(1.6rem, 3vw, 2.6rem); }
    @media (max-width: 820px), (max-aspect-ratio: 1/1){ .d8-pair{ grid-template-columns:1fr; } .d8-arrow{ transform:rotate(90deg); } }
  </style>
  <h1 class="t">What a generative model is</h1>
  <div class="d8-col">
    <div class="lead b" data-step="1">A generative model learns the distribution of the data, so it can make new examples.</div>
    <div class="d8-pair b" data-step="2">
      ${d8Box('Discriminative: image ' + d8Tex('x') + ' → label<br>learns ' + d8Tex('p(\\text{class} \\mid x)'))}
      <div class="d8-arrow">↔</div>
      ${d8Box('Generative: learns ' + d8Tex('p(x)') + ', then samples a new ' + d8Tex('x'))}
    </div>
  </div>
  <div class="d8-cite">source: to add</div>
`);

/* 7 (old 7 and 8 combined): what we are doing, and why. Both Google images, each with a ring that walks its parts.
   Ring boxes detected by script. Sample generation: curve x .049-.373 y .634-.910, samples x .117-.416 y .936-.977,
   examples column x .486-.851 y .184-.944. Rare cases: driving block x .49-.974 y .083-.421, edge cases x .46-1 y .668-.967.
   The Google deck had these two images under each other's titles; the files are named by what they show. */
st(`
  <style>
    .d8-mot{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1fr 1fr; gap:2vw; align-items:start; }
    .d8-mot > div{ display:flex; flex-direction:column; gap:1.2vh; min-width:0; }
    .d8-mot .d8-figw{ height:36vh; }
    @media (max-width: 820px), (max-aspect-ratio: 1/1){ .d8-mot{ grid-template-columns:1fr; } .d8-mot .d8-figw{ height:20vh; } }
  </style>
  <h1 class="t">What we are doing, and why</h1>
  <div class="d8-mot">
    <div class="b" data-step="1">
      <div class="lead"><b>What:</b> learn the distribution, then sample from it</div>
      ${d8Fig('assets/google/s08-sample-generation.png', 1.8876, [
        {r: [0.035, 0.62, 0.35, 0.30], k: 'ring d8-one', step: 2},
        {r: [0.10, 0.92, 0.33, 0.07], k: 'ring d8-one', step: 3},
        {r: [0.475, 0.17, 0.385, 0.79], k: 'ring d8-one', step: 4},
      ], {alt: 'A learned distribution, samples drawn from it, and generated text, images and molecules'})}
    </div>
    <div class="b" data-step="5">
      <div class="lead"><b>Why:</b> find the rare cases</div>
      ${d8Fig('assets/google/s07-rare-cases-outliers.png', 2.0919, [
        {r: [0.48, 0.07, 0.505, 0.365], k: 'ring d8-one', step: 6},
        {r: [0.45, 0.655, 0.548, 0.322], k: 'ring d8-one', step: 7},
      ], {alt: 'Most driving data is sunny highway; the tail holds edge cases, harsh weather, pedestrians'})}
    </div>
  </div>
  <div class="d8-cite">source: to add</div>
`);


/* was HTML slides 9-11 (Google 10-12): the textbook diagram, the five video frames, and "A loss with no labels".
   Replaced by one drawn slide (Shreya, 2026-11-11). Helpers they need: */
const G = f => `assets/google/${f}`;
const K = (r, step) => ({r, k: 'cov d8-k', step});
const RING = (r, step) => ({r, k: 'ring d8-one', step});
/* 13: the central question; the diagram slides in; a ring walks data space -> encoder and z -> decoder and x-hat -> the inset.
   Detected: left blob x .011-.200, encoder .217-.261, sphere .304-.426, decoder .473-.516, right blob .537-.715,
   error text to .87, inset .927-.989. */
st(`
  <h1 class="t">Compress, then reconstruct</h1>
  <div class="d8-col">
    <div class="lead b" data-step="1">Central question: Can we learn a compressed representation of an image and reconstruct the original?</div>
    ${d8Fig(G('s13-autoencoder.png'), 3.8067, [
      RING([0.003, 0.02, 0.21, 0.95], 3),
      RING([0.205, 0.03, 0.235, 0.89], 4),
      RING([0.46, 0.03, 0.42, 0.95], 5),
      RING([0.92, 0.005, 0.075, 0.99], 6),
    ], {cls: 'b d8-from-right', step: 2, style: 'height:30vh', alt: 'Data space, encoder f, representation space z, decoder g, reconstruction error'})}
  </div>
  <div class="d8-cite">Torralba, Isola and Freeman, Foundations of Computer Vision (MIT Press).</div>
`, {sub: false});

/* 14: five frames, one after another. Inside each, black covers lift in the order of the flow:
   input -> encoder (and bottleneck) -> point in latent space -> decoder and output.
   Order changed from the Google deck (1, 2, 3, 4, 5) to 1, 2, 5, 4, 3: encoder half, then decoder half, then the whole
   network last, so the input and output end side by side with the MSE loss (her comment). Flagged in feedback. */
st(`
  <h1 class="t">Compress, then reconstruct</h1>
  <div class="d8-stack" style="height:46vh">
    ${d8Fig(G('s14-frame1.png'), 1.8229, [
      K([0.179, 0.09, 0.395, 0.30], 2), K([0.37, 0.44, 0.29, 0.56], 3), K([0.574, 0.09, 0.426, 0.30], 4),
    ], {cls: 'd8-f b', step: 1, alt: 'Numbers in, encoder, bottleneck, decoder, numbers out; the encoded point in latent space'})}
    ${d8Fig(G('s14-frame2.png'), 1.7146, [
      K([0.1825, 0.10, 0.4155, 0.31], 6), K([0.36, 0.45, 0.33, 0.55], 7), K([0.598, 0.10, 0.402, 0.31], 8),
    ], {cls: 'd8-f b', step: 5, alt: 'A rabbit photo in and out; encoded rabbit, table and data in latent space'})}
    ${d8Fig(G('s14-frame5.png'), 2.2685, [
      K([0.2295, 0.20, 0.2415, 0.67], 10), K([0.471, 0.20, 0.529, 0.67], 11),
    ], {cls: 'd8-f b', step: 9, alt: 'Input digit, encoder, a point in feature space'})}
    ${d8Fig(G('s14-frame4.png'), 1.6006, [
      K([0.437, 0.30, 0.2095, 0.57], 13), K([0.6465, 0.30, 0.3535, 0.57], 14),
    ], {cls: 'd8-f b', step: 12, alt: 'A point in feature space, decoder, output digit'})}
    ${d8Fig(G('s14-frame3.png'), 2.3272, [
      K([0.211, 0.25, 0.385, 0.53], 16), K([0.596, 0.25, 0.404, 0.53], 17),
    ], {cls: 'd8-f b', step: 15, alt: 'Input digit and output digit side by side, with the network between'})}
  </div>
  <div class="d8-math b" data-step="18">${d8Tex('\\mathrm{MSE} = \\frac{1}{N}\\sum_{i=1}^{N} \\lVert x_i - \\hat{x}_i \\rVert^2', true)}<div class="label">input ${d8Tex('x_i')}, output ${d8Tex('\\hat{x}_i')}: the input is the label</div></div>
  <div class="d8-cite">source: to add</div>
`, {sub: false});

/* 15: a loss with no labels */
st(`
  <h1 class="t">A loss with no labels</h1>
  <div class="d8-col">
    <div class="lead b">The input is its own label.</div>
    <div class="d8-math b">${d8Tex('\\mathcal{L}(f, g) = \\frac{1}{N}\\sum_{i=1}^{N} \\big\\lVert x_i - g\\big(f(x_i)\\big) \\big\\rVert^2', true)}</div>
    <div class="lead b" style="text-align:center">${d8Tex('f')} = encoder, ${d8Tex('g')} = decoder, ${d8Tex('x_i')} = image ${d8Tex('i')}, ${d8Tex('N')} = number of images</div>
  </div>
`);


/* was HTML slide 22, Smooth interpolation (Google 26, Continuity and completeness). Removed by Shreya (2026-11-11). */
/* 22: smooth interpolation, drawn for this deck with real digits from our VAE (Shreya, 2026-11-11). Row 7 of the workbook's
   decoded grid (section 2.4): a 7 at one end, a 3 at the other; the codes in between decode to a 9 and an 8 on the way.
   Click 1: the two images. Click 2: encode them to z_A and z_B. Click 3: the in-between codes decode, left to right.
   Click 4: the formula and what it shows (continuity: nearby codes, similar images; completeness: every point decodes). */
const IP = i => `assets/vae-interp-${String(i).padStart(2, '0')}.png`;
const ipX = i => 44 + i * 56;
st(`
  <style>
    .d8-ipsvg text{ font-family:var(--font); fill:var(--ink); }
    .d8-morph.b{ opacity:1 !important; transform:none !important; }
    .d8-morph .m{ opacity:0; transition:opacity .35s ease; }
    .d8-morph.shown .m{ opacity:1; }
  </style>
  <h1 class="t">Smooth interpolation</h1>
  <div class="d8-col" style="gap:1.4vh">
    <div style="flex:0 0 auto;height:38vh">
      <svg class="d8-ipsvg" viewBox="0 0 760 270" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%;display:block" aria-hidden="true">
        <defs><marker id="ipA" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#0f172a"/></marker></defs>
        <g class="b" data-step="1">
          <image href="${IP(0)}" x="${ipX(0)}" y="40" width="52" height="52"/><rect x="${ipX(0)}" y="40" width="52" height="52" fill="none" stroke="#0f172a" stroke-width="2.5"/>
          <image href="${IP(11)}" x="${ipX(11)}" y="40" width="52" height="52"/><rect x="${ipX(11)}" y="40" width="52" height="52" fill="none" stroke="#0f172a" stroke-width="2.5"/>
          <text x="${ipX(0) + 26}" y="28" font-size="16" text-anchor="middle" font-weight="700">image A</text>
          <text x="${ipX(11) + 26}" y="28" font-size="16" text-anchor="middle" font-weight="700">image B</text>
        </g>
        <g class="b" data-step="2">
          <line x1="${ipX(0) + 26}" y1="96" x2="${ipX(0) + 26}" y2="178" stroke="#0f172a" stroke-width="2" marker-end="url(#ipA)"/>
          <line x1="${ipX(11) + 26}" y1="96" x2="${ipX(11) + 26}" y2="178" stroke="#0f172a" stroke-width="2" marker-end="url(#ipA)"/>
          <text x="${ipX(0) + 34}" y="140" font-size="14">encode</text><text x="${ipX(11) - 40}" y="140" font-size="14">encode</text>
          <line x1="${ipX(0) + 26}" y1="196" x2="${ipX(11) + 26}" y2="196" stroke="#94a3b8" stroke-width="3"/>
          <circle cx="${ipX(0) + 26}" cy="196" r="8" fill="#4a90d9" stroke="#0f172a" stroke-width="1.5"/>
          <circle cx="${ipX(11) + 26}" cy="196" r="8" fill="#e07a3f" stroke="#0f172a" stroke-width="1.5"/>
          <text x="${ipX(0) + 26}" y="226" font-size="17" text-anchor="middle" font-style="italic">z<tspan baseline-shift="sub" font-size="70%">A</tspan></text>
          <text x="${ipX(11) + 26}" y="226" font-size="17" text-anchor="middle" font-style="italic">z<tspan baseline-shift="sub" font-size="70%">B</tspan></text>
          <text x="380" y="256" font-size="14" text-anchor="middle">latent space</text>
        </g>
        <g class="d8-morph b" data-step="3">
          ${Array.from({length: 10}, (_, k) => k + 1).map(i => `
            <circle class="m" style="transition-delay:${(i * 0.14).toFixed(2)}s" cx="${ipX(i) + 26}" cy="196" r="5" fill="#0f172a"/>
            <image class="m" style="transition-delay:${(i * 0.14 + 0.07).toFixed(2)}s" href="${IP(i)}" x="${ipX(i)}" y="40" width="52" height="52"/>`).join('')}
          <text class="m" style="transition-delay:1.6s" x="380" y="122" font-size="15" text-anchor="middle">decode the codes in between</text>
        </g>
      </svg>
    </div>
    <div class="d8-math b" data-step="4">${d8Tex('z = (1 - \\alpha)\\, z_A + \\alpha\\, z_B, \\qquad \\alpha: 0 \\to 1', true)}
      <div class="label">Nearby codes decode to similar images (continuity), and every point on the way decodes to a digit (completeness).</div></div>
  </div>
  <div class="d8-cite">Digits: our VAE from the workbook, section 2.4 (MNIST, LeCun et al., 1998). Drawing made for this deck.</div>
`);

}
