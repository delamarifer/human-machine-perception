/* PART: gans (Day 8). Google deck "Day 8 - Generative Modeling", slides 28-38 (owner: Shreya).
   Images are the Google deck's own (day08/assets/google, g29-g37), cropped where needed (crop lines from detected bands).
   Cover and ring positions are detected by script (content bands, the flamingo figure's divider row, the saturated photo
   boxes), not by eye. The intuition animation on slide 32 is our schematic (labeled as one), not data.
   Shreya (2026-11-11): no screenshots of lecture slides; slides 29, 30, 32, 34, 35B and 37 are our own diagrams with the
   MIT 6.S191 slides' information pulled out. The flamingo figure (31, 33, from Foundations of Computer Vision) and the
   training-loop stills (36) stay.
   Comments applied: 28 goal in one step; 29, 30 pull the information out and show the diagram; 31 limit the text, animate
   the diagram's parts; 32 show training bringing the fakes closer until the discriminator cannot tell; 33 indicate the goal
   without saying it; 35 formula written out and walked through, then animate between the images; 38 real applications:
   models, use cases, images (figures from the papers). No speaker notes. */
{
const G = f => `assets/google/${f}`;
const K = (r, step) => ({r, k: 'cov d8-k', step});
const W_ = (r, step) => ({r, k: 'cov', step});
const RING = (r, step) => ({r, k: 'ring d8-one', step});
const SRC = 'source: to add';
const MIT = 'MIT 6.S191, Introduction to Deep Learning (introtodeeplearning.com)';
const FCV = 'Torralba, Isola and Freeman, Foundations of Computer Vision, Ch. 32, Fig. 32.16';

section('GANs');

/* 28: the goal (her comment) */
st(`
  <h1 class="t">Generative Adversarial Networks</h1>
  <div class="d8-col" style="gap:2.4vh">
    <div class="b" data-step="1" style="flex:0 0 auto;height:34vh">${d8TitleArt('gan')}</div>
    <div class="statement b" data-step="2" style="text-align:center">Goal: in one step, output samples from the complex data distribution.</div>
  </div>
`);

/* ---------- Shared drawing pieces for the redrawn GAN slides (Shreya, 2026-11-11: no screenshots of lecture slides;
   pull the information out). Real data is green and generated data is salmon, on every GAN slide. ---------- */
const GS = `<style>
  .d8-gsvg{ width:100%; height:100%; display:block; }
  .d8-gsvg text{ font-family:var(--font); fill:var(--ink); }
  .d8-gsvg .it{ font-style:italic; }
</style>`;
const REAL = '#86c58b', FAKE = '#f2a08a';
const gDefs = id => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#0f172a"/></marker></defs>`;
const gArr = (x1, y1, x2, y2, id, dash) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#0f172a" stroke-width="2.5" ${dash ? 'stroke-dasharray="6 5"' : ''} marker-end="url(#${id})"/>`;
const gPath = (d, id, dash) => `<path d="${d}" fill="none" stroke="#0f172a" stroke-width="2.5" ${dash ? 'stroke-dasharray="6 5"' : ''} marker-end="url(#${id})"/>`;
/* trapezoid network: wide side left (G grows from noise: narrow left) */
const gNet = (x, y, w, h, label, narrowLeft) => {
  const t = h * 0.28;
  const pts = narrowLeft ? `${x},${y + t} ${x + w},${y} ${x + w},${y + h} ${x},${y + h - t}` : `${x},${y} ${x + w},${y + t} ${x + w},${y + h - t} ${x},${y + h}`;
  return `<polygon points="${pts}" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/><text x="${x + w / 2}" y="${y + h / 2 + 8}" font-size="24" text-anchor="middle" font-weight="700" class="it">${label}</text>`;
};
const gBox = (x, y, w, h, label, fill = '#fff', fs = 18) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${fill}" stroke="#0f172a" stroke-width="2"/><text x="${x + w / 2}" y="${y + h / 2 + fs / 3}" font-size="${fs}" text-anchor="middle">${label}</text>`;
const blobD = 'M0,30 C10,0 50,-10 72,10 C94,30 124,18 114,56 C104,94 62,82 42,98 C20,114 -10,72 0,30 Z';
const gBlob = (x, y, sc, fill, label) => `<g transform="translate(${x},${y}) scale(${sc})"><path d="${blobD}" fill="${fill}" stroke="#0f172a" stroke-width="${2 / sc}"/></g>${label ? `<text x="${x + 57 * sc}" y="${y + 56 * sc}" font-size="24" text-anchor="middle" class="it" font-weight="700">${label}</text>` : ''}`;
const gSub = (a, b) => `${a}<tspan baseline-shift="sub" font-size="70%">${b}</tspan>`;
const DIAG = 'Information from MIT 6.S191, Introduction to Deep Learning (introtodeeplearning.com); diagram drawn for this deck.';

/* 29 (untitled in the Google deck): what the slide says, then its diagram, redrawn: noise -> G -> a fake sample that
   lands in the learned data distribution */
st(`${GS}
  <h1 class="t">What if we just want to sample?</h1>
  <div class="d8-col" style="gap:1.2vh">
    <div class="lead b" data-step="1"><b>Idea:</b> don't model the density; just sample new instances.</div>
    <div class="lead b" data-step="2"><b>Problem:</b> we can't sample from a complex distribution directly.</div>
    <div class="lead b" data-step="3"><b>Solution:</b> sample something simple (noise), and learn a transformation to the data distribution.</div>
    <div style="flex:0 0 auto;height:26vh">
      <svg class="d8-gsvg" viewBox="0 0 760 200" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${gDefs('g29a')}
        <g class="b" data-step="4">
          ${gBox(60, 75, 56, 50, 'z', FAKE, 22)}<text x="88" y="150" font-size="15" text-anchor="middle">noise</text>
          ${gArr(120, 100, 158, 100, 'g29a')}${gNet(162, 40, 150, 120, 'G', true)}
          <text x="237" y="186" font-size="15" text-anchor="middle">generator</text>
        </g>
        <g class="b" data-step="5">
          ${gArr(316, 100, 350, 100, 'g29a')}${gBox(354, 72, 90, 56, gSub('x', 'fake'), FAKE, 18)}<text x="399" y="148" font-size="14" text-anchor="middle">a generated sample</text>
          ${gPath('M 448 100 C 500 100, 520 80, 560 92', 'g29a', true)}
          ${gBlob(560, 30, 1.25, '#dbeafe', 'X')}
          <text x="632" y="190" font-size="15" text-anchor="middle">learned data distribution</text>
        </g>
      </svg>
    </div>
  </div>
  <div class="d8-cite">${DIAG}</div>
`);

/* 30 (untitled): two networks compete, redrawn. The generator part, then the discriminator part */
st(`${GS}
  <h1 class="t">Two networks compete</h1>
  <div class="d8-col" style="gap:1.2vh">
    <div style="flex:0 0 auto;height:34vh">
      <svg class="d8-gsvg" viewBox="0 0 760 260" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${gDefs('g30a')}
        <g class="b" data-step="1">
          ${gBox(30, 160, 52, 46, 'z', FAKE, 20)}<text x="56" y="228" font-size="14" text-anchor="middle">noise</text>
          ${gArr(86, 183, 120, 183, 'g30a')}${gNet(124, 128, 130, 110, 'G', true)}
          ${gArr(258, 183, 292, 183, 'g30a')}${gBox(296, 158, 96, 50, gSub('x', 'fake'), FAKE, 18)}
        </g>
        <g class="b" data-step="2">
          ${gBox(296, 52, 96, 50, gSub('x', 'real'), REAL, 18)}
          ${gPath('M 396 77 C 440 77, 440 120, 470 128', 'g30a')}${gPath('M 396 183 C 440 183, 440 150, 470 142', 'g30a')}
          ${gNet(474, 80, 130, 110, 'D', false)}
          ${gArr(608, 135, 642, 135, 'g30a')}<circle cx="668" cy="135" r="22" fill="#fde68a" stroke="#0f172a" stroke-width="2"/><text x="668" y="142" font-size="20" text-anchor="middle" class="it">y</text>
          <text x="668" y="180" font-size="14" text-anchor="middle">real or fake?</text>
        </g>
      </svg>
    </div>
    <div class="lead b" data-step="1"><b>Generator:</b> turns noise into an imitation of the data, to trick the discriminator.</div>
    <div class="lead b" data-step="2"><b>Discriminator:</b> tries to tell real data from the generator's fakes.</div>
  </div>
  <div class="d8-cite">${DIAG}</div>
`);

/* 31: the flamingo figure, part by part. Detected: divider row y .513; top row z .086-.102, G .129-.342,
   image .381-.554, D .574-.787, output .802-.916; side label .964-.997; bottom row starts at y .517. */
st(`
  <h1 class="t">Generator and discriminator</h1>
  <div class="d8-col" style="gap:1.2vh">
    ${d8Fig(G('g31-flamingo.png'), 2.0022, [
      W_([0.565, 0, 0.39, 0.512], 2), W_([0.955, 0, 0.045, 1], 2), W_([0, 0.512, 0.955, 0.488], 3),
    ], {cls: 'b', step: 1, style: 'height:40vh', alt: 'z into G makes synthetic flamingos; D scores them 0.1; real flamingos score 0.9'})}
    <div class="lead b" data-step="4" style="text-align:center">${d8Tex('g_\\theta: \\mathcal{Z} \\to \\mathcal{X}')} makes images; ${d8Tex('d_\\phi: \\mathcal{X} \\to [0, 1]')} scores how real they look.</div>
    <div class="label b" data-step="5" style="text-align:center">The discriminator is like a teacher pointing out errors; the generator is the student.</div>
  </div>
  <div class="d8-cite">${FCV}</div>
`);

/* 32: intuition, drawn for this deck: D's task, D's output per point, then our schematic: real points stay, fake points move closer, and the
   discriminator's P(real) flattens until it outputs 1/2 everywhere. */
const SCH = (fake, c, w, flat) => {
  const real = [300, 322, 344, 366];
  const curve = flat ? 'M40 100 L560 100' : Array.from({length: 53}, (_, i) => { const x = 40 + i * 10, s = 1 / (1 + Math.exp(-(x - c) / w)); return `${i ? 'L' : 'M'}${x} ${(170 - 140 * s).toFixed(1)}`; }).join(' ');
  return `<svg viewBox="0 0 600 240" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%" aria-hidden="true">
    <line x1="40" y1="30" x2="560" y2="30" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6 6"/>
    <text x="44" y="22" font-size="14" fill="#0f172a" font-family="var(--font)">P(real) = 1</text>
    <text x="44" y="96" font-size="14" fill="#64748b" font-family="var(--font)">${flat ? 'P(real) = 1/2' : ''}</text>
    <line x1="30" y1="190" x2="570" y2="190" stroke="#0f172a" stroke-width="2"/>
    <path d="${curve}" fill="none" stroke="#0f172a" stroke-width="3"/>
    ${real.map(x => `<circle cx="${x}" cy="190" r="9" fill="${REAL}"/>`).join('')}
    ${fake.map(x => `<circle cx="${x}" cy="190" r="9" fill="#f2a08a" fill-opacity=".9"/>`).join('')}
    <circle cx="200" cy="225" r="7" fill="#86c58b"/><text x="212" y="230" font-size="14" fill="#0f172a" font-family="var(--font)">real data</text>
    <circle cx="320" cy="225" r="7" fill="#f2a08a"/><text x="332" y="230" font-size="14" fill="#0f172a" font-family="var(--font)">fake data</text>
  </svg>`;
};
/* D's task: real and fake points on a line; with bars = D's P(real) for each point (schematic) */
const TASK = bars => {
  const real = [300, 322, 344, 366], fake = [90, 112, 134, 156];
  return `<svg viewBox="0 0 600 240" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%" aria-hidden="true">
    <line x1="40" y1="30" x2="560" y2="30" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6 6"/>
    <text x="44" y="22" font-size="14" fill="#0f172a" font-family="var(--font)">P(real) = 1</text>
    <line x1="30" y1="190" x2="570" y2="190" stroke="#0f172a" stroke-width="2"/>
    ${bars ? real.map(x => `<rect x="${x - 8}" y="44" width="16" height="140" fill="#cbd5e1"/>`).join('') + fake.map(x => `<rect x="${x - 8}" y="158" width="16" height="26" fill="#cbd5e1"/>`).join('') : ''}
    ${real.map(x => `<circle cx="${x}" cy="190" r="9" fill="${REAL}"/>`).join('')}
    ${fake.map(x => `<circle cx="${x}" cy="190" r="9" fill="${FAKE}"/>`).join('')}
    <circle cx="200" cy="225" r="7" fill="${REAL}"/><text x="212" y="230" font-size="14" fill="#0f172a" font-family="var(--font)">real data</text>
    <circle cx="320" cy="225" r="7" fill="${FAKE}"/><text x="332" y="230" font-size="14" fill="#0f172a" font-family="var(--font)">fake data</text>
  </svg>`;
};
const FR = [[[80, 105, 130, 155], 230, 12], [[170, 195, 220, 245], 270, 14], [[250, 272, 294, 316], 300, 30], [[289, 311, 333, 355], 0, 0, true]];
st(`
  <h1 class="t">Intuition</h1>
  <div class="d8-stack" style="height:46vh">
    <div class="d8-f b d8-figw" data-step="1">${TASK(false)}</div>
    <div class="d8-f b d8-figw" data-step="2">${TASK(true)}</div>
    ${FR.map(([f, c, w, flat], i) => `<div class="d8-f b d8-figw" data-step="${i + 3}">${SCH(f, c, w, flat)}</div>`).join('')}
  </div>
  <div class="d8-capstack">
    <div class="label d8-cap b" data-step="1">The discriminator tries to predict what is real and what is fake.</div>
    <div class="label d8-cap b" data-step="2">Its output for each point: high for real, low for fake.</div>
    <div class="label d8-cap b" data-step="3">Training (schematic): early on, fakes are far from the real data, and the discriminator separates them easily.</div>
    <div class="label d8-cap b" data-step="4">The generator improves: the fakes move closer.</div>
    <div class="label d8-cap b" data-step="5">The discriminator has a harder and harder time telling them apart.</div>
    <div class="label d8-cap b" data-step="6">At the end the fakes match the real data, and the discriminator can only guess: 1/2.</div>
  </div>
  <div class="d8-cite">Information from ${MIT}. All frames drawn for this deck; the training frames are a schematic, not data.</div>
`);

/* 33 (untitled; her note: indicate the goal without saying it). The same figure, with a ring on the generated photos,
   then on the real ones. Photo boxes detected: generated x .381-.554 y .096-.444; real x .381-.554 y .683-.974. */
st(`
  <h1 class="t">Which one is generated?</h1>
  <div class="d8-col" style="gap:1.2vh">
    ${d8Fig(G('g31-flamingo.png'), 2.0022, [
      RING([0.372, 0.085, 0.192, 0.37], 2), RING([0.372, 0.67, 0.192, 0.315], 3),
    ], {cls: 'b', step: 1, style: 'height:44vh', alt: 'Generated and real flamingo photos'})}
    <div class="d8-capstack">
      <div class="label d8-cap b" data-step="2">made by the generator</div>
      <div class="label d8-cap b" data-step="3">real training images</div>
    </div>
  </div>
  <div class="d8-cite">${FCV}</div>
`);

/* 34 (untitled): training GANs, redrawn. The two networks and the data, then the feedback that trains them,
   then the global optimum (from the MIT slide) */
st(`${GS}
  <h1 class="t">Training GANs</h1>
  <div class="d8-col" style="gap:1.2vh">
    <div style="flex:0 0 auto;height:40vh">
      <svg class="d8-gsvg" viewBox="0 0 760 300" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${gDefs('g34a')}
        <g class="b" data-step="1">
          ${gBox(20, 160, 70, 60, 'z', '#fff', 22)}<text x="55" y="240" font-size="14" text-anchor="middle">latent space</text>
          ${gArr(94, 190, 124, 190, 'g34a')}${gNet(128, 140, 120, 100, 'G', true)}
          ${gArr(252, 190, 282, 190, 'g34a')}
          <rect x="292" y="166" width="54" height="54" fill="${FAKE}" stroke="#0f172a" stroke-width="2"/><rect x="286" y="160" width="54" height="54" fill="${FAKE}" stroke="#0f172a" stroke-width="2"/>
          <text x="316" y="244" font-size="14" text-anchor="middle">fake images</text>
          <ellipse cx="316" cy="46" rx="34" ry="10" fill="#fff" stroke="#0f172a" stroke-width="2"/><path d="M282 46 L282 96 A34 10 0 0 0 350 96 L350 46" fill="#fff" stroke="#0f172a" stroke-width="2"/>
          <text x="316" y="82" font-size="13" text-anchor="middle">dataset</text>
          <rect x="292" y="114" width="48" height="30" fill="${REAL}" stroke="#0f172a" stroke-width="2"/><text x="284" y="134" font-size="14" text-anchor="end">real images</text>
          ${gPath('M 350 190 C 390 190, 400 170, 432 164', 'g34a')}${gPath('M 344 129 C 390 129, 400 140, 432 146', 'g34a')}
          ${gNet(436, 100, 120, 110, 'D', false)}
          ${gArr(560, 135, 596, 112, 'g34a')}${gArr(560, 175, 596, 198, 'g34a')}
          <text x="604" y="112" font-size="17" font-weight="700">real</text><text x="604" y="206" font-size="17" font-weight="700">fake</text>
        </g>
        <g class="b" data-step="2">
          ${gPath('M 496 214 C 496 270, 420 280, 420 230', 'g34a', true)}<text x="520" y="262" font-size="14">discriminator loss</text>
          ${gPath('M 470 214 C 440 296, 200 296, 188 246', 'g34a', true)}<text x="250" y="292" font-size="14">generator feedback (gradients through D)</text>
        </g>
      </svg>
    </div>
    <div class="lead b" data-step="2" style="text-align:center"><b>D</b> learns to label real and fake correctly; <b>G</b> learns to make fakes that fool D.</div>
    <div class="lead b" data-step="3" style="text-align:center">Global optimum: G reproduces the true data distribution.</div>
  </div>
  <div class="d8-cite">${DIAG}</div>
`);

/* 35A: the min-max objective, written out piece by piece */
st(`
  <style>
    .d8-mm{ display:flex; flex-wrap:wrap; justify-content:center; align-items:flex-start; gap:.4vw; font-size:clamp(1rem, 1.9vw, 1.7rem); flex:0 0 auto; }
  </style>
  <h1 class="t">The min-max objective</h1>
  <div class="d8-col" style="gap:2vh">
    <div class="d8-mm">
      <span class="b" data-step="1">${d8Tex('\\min_{G}\\,\\max_{D}', true)}</span>
      <span class="b" data-step="2">${d8Tex('\\underbrace{\\mathbb{E}_{x \\sim p_{\\text{data}}}\\big[\\log D(x)\\big]}_{\\text{real images}}', true)}</span>
      <span class="b" data-step="3">${d8Tex('+\\;\\underbrace{\\mathbb{E}_{z \\sim p_z}\\big[\\log\\big(1 - D(G(z))\\big)\\big]}_{\\text{generated images}}', true)}</span>
    </div>
    <div class="lead b" data-step="4" style="text-align:center">${d8Tex('D')} maximizes: score real images near 1 and generated ones near 0.</div>
    <div class="lead b" data-step="5" style="text-align:center">${d8Tex('G')} minimizes: make ${d8Tex('D(G(z))')} close to 1, so the fakes pass as real.</div>
  </div>
  <div class="d8-cite">Goodfellow et al., NeurIPS 2014.</div>
`);

/* 35B: the objective on the network, redrawn: D's turn (maximize), then G's turn (minimize). Standard convention:
   D(x) is the probability that x is real, matching 35A. */
st(`${GS}
  <h1 class="t">The min-max objective</h1>
  <div class="d8-col" style="gap:1.2vh">
    <div style="flex:0 0 auto;height:32vh">
      <svg class="d8-gsvg" viewBox="0 0 760 250" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${gDefs('g35b')}
        ${gBox(30, 150, 52, 46, 'z', FAKE, 20)}${gArr(86, 173, 120, 173, 'g35b')}${gNet(124, 118, 130, 110, 'G', true)}
        ${gArr(258, 173, 292, 173, 'g35b')}${gBox(296, 148, 96, 50, gSub('x', 'fake'), FAKE, 18)}
        ${gBox(296, 42, 96, 50, gSub('x', 'real'), REAL, 18)}
        ${gPath('M 396 67 C 440 67, 440 110, 470 118', 'g35b')}${gPath('M 396 173 C 440 173, 440 140, 470 132', 'g35b')}
        ${gNet(474, 70, 130, 110, 'D', false)}${gArr(608, 125, 642, 125, 'g35b')}
        <circle cx="668" cy="125" r="22" fill="#fde68a" stroke="#0f172a" stroke-width="2"/><text x="668" y="132" font-size="20" text-anchor="middle" class="it">y</text>
        <rect class="b" data-step="1" x="284" y="26" width="410" height="200" rx="14" fill="none" stroke="#0f172a" stroke-width="3" stroke-dasharray="8 6"/>
        <rect class="b" data-step="2" x="18" y="104" width="384" height="138" rx="14" fill="none" stroke="#0f172a" stroke-width="3" stroke-dasharray="8 6"/>
      </svg>
    </div>
    <div class="d8-math b" data-step="1">${d8Tex('\\max_{D}\\; \\mathbb{E}_{x}\\big[\\log D(x)\\big] + \\mathbb{E}_{z}\\big[\\log\\big(1 - D(G(z))\\big)\\big]', true)}<div class="label">D's turn: push ${d8Tex('D(x_{\\text{real}})')} up and ${d8Tex('D(x_{\\text{fake}})')} down.</div></div>
    <div class="d8-math b" data-step="2">${d8Tex('\\min_{G}\\; \\mathbb{E}_{z}\\big[\\log\\big(1 - D(G(z))\\big)\\big]', true)}<div class="label">G's turn: only the fake term depends on G, so G pushes ${d8Tex('D(G(z))')} up.</div></div>
  </div>
  <div class="d8-cite">${DIAG}</div>
`);

/* 36: the training loop, drawn and animated for this deck (Shreya, 2026-11-11: improve and animate). The four steps build
   on the left, the newest one dark; on the right the network that is training lights up and the other is fixed, and a small
   curve shows D climbing the objective (ascent) and G going down it (descent). The objectives come in under the picture.
   Information from the Google slide's frames (the four steps, "k updates of D per 1 update of G keeps D ahead of G",
   "the real-data term has no G in it, so its gradient w.r.t. G is zero", D ascent and G descent on V(G, D)). */
const LOOP = (train, mode) => {   /* train: 'D' | 'G' | 'both'; mode: '' | 'ascent' | 'descent' | 'loop' */
  const on = n => train === n || train === 'both';
  const net = (x, y, w, h, l, narrowLeft, n) => {
    const t = h * .28, pts = narrowLeft ? `${x},${y + t} ${x + w},${y} ${x + w},${y + h} ${x},${y + h - t}` : `${x},${y} ${x + w},${y + t} ${x + w},${y + h - t} ${x},${y + h}`;
    return `<polygon points="${pts}" fill="${on(n) ? '#fde68a' : '#f1f5f9'}" stroke="#0f172a" stroke-width="${on(n) ? 3 : 1.5}" ${on(n) ? '' : 'stroke-dasharray="5 4"'}/>
      <text x="${x + w / 2}" y="${y + h / 2 + 2}" font-size="22" text-anchor="middle" font-weight="700" font-style="italic" fill="${on(n) ? '#0f172a' : '#94a3b8'}">${l}</text>
      <text x="${x + w / 2}" y="${y + h / 2 + 22}" font-size="13" text-anchor="middle" fill="${on(n) ? '#0f172a' : '#94a3b8'}">${train === 'both' ? '' : on(n) ? 'training' : 'fixed'}</text>`;
  };
  const curve = 'M 110 190 C 170 300, 290 300, 350 190';
  return `<svg viewBox="0 0 460 300" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%;display:block" aria-hidden="true">${gDefs('lp' + train + mode)}
    <g style="font-family:var(--font)">
    ${gBox(4, 70, 40, 34, 'z', FAKE, 17)}${gArr(46, 87, 64, 87, 'lp' + train + mode)}${net(66, 50, 96, 76, 'G', true, 'G')}
    ${gArr(164, 87, 182, 87, 'lp' + train + mode)}${gBox(184, 70, 66, 34, gSub('x', 'fake'), FAKE, 14)}
    ${gBox(184, 14, 66, 34, gSub('x', 'real'), REAL, 14)}
    ${gPath('M 252 31 C 274 31, 276 52, 292 56', 'lp' + train + mode)}${gPath('M 252 87 C 274 87, 276 72, 292 68', 'lp' + train + mode)}
    ${net(294, 26, 96, 76, 'D', false, 'D')}${gArr(392, 64, 410, 64, 'lp' + train + mode)}
    <circle cx="428" cy="64" r="15" fill="#fff" stroke="#0f172a" stroke-width="2"/><text x="428" y="70" font-size="15" text-anchor="middle" font-style="italic">y</text>
    <text x="362" y="200" font-size="14">V(G, D)</text>
    <path d="${curve}" fill="none" stroke="#0f172a" stroke-width="2.5"/>
    ${mode === 'ascent' ? `<circle cx="148" cy="239" r="6" fill="#0f172a"/>${gArr(148, 231, 148, 193, 'lp' + train + mode)}<text x="160" y="209" font-size="15" font-weight="700">D: ascent</text>` : ''}
    ${mode === 'descent' ? `<circle cx="312" cy="239" r="6" fill="#0f172a"/>${gArr(312, 195, 312, 229, 'lp' + train + mode)}<text x="212" y="209" font-size="15" font-weight="700">G: descent</text>` : ''}
    ${mode === 'loop' ? `<path d="M 330 112 C 330 150, 120 150, 114 116" fill="none" stroke="#0f172a" stroke-width="2.5" stroke-dasharray="6 5" marker-end="url(#lp${train}${mode})"/>
      <text x="222" y="166" font-size="14" text-anchor="middle">D: k steps, then G: 1 step, repeat</text>` : ''}
    </g></svg>`;
};
st(`${GS}
  <style>
    .d8-loopgrid{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1fr 1.15fr; gap:2vw; align-items:start; }
    .d8-steps{ display:flex; flex-direction:column; gap:1.1vh; }
    .d8-steps .st{ border:2px solid var(--ink); border-radius:10px; padding:.9vh 1vw; font-size:clamp(.95rem, 1.5vw, 1.35rem); background:#fff; }
    .d8-steps > .st.shown:has(~ .st.shown){ opacity:.4 !important; }
    .d8-objs{ position:relative; height:13vh; }
    .d8-objs > .d8-math{ position:absolute; left:0; right:0; top:0; }
    .d8-objs > .d8-math.shown:has(~ .d8-math.shown){ opacity:0 !important; }
    @media (max-width: 820px), (max-aspect-ratio: 1/1){ .d8-loopgrid{ grid-template-columns:1fr; } }
  </style>
  <h1 class="t">Training loop</h1>
  <div class="d8-loopgrid">
    <div class="d8-steps">
      <div class="st b" data-step="1"><b>1.</b> Fix G, train D for <i>k</i> steps</div>
      <div class="st b" data-step="2"><b>2.</b> Gradient ascent on D</div>
      <div class="st b" data-step="3"><b>3.</b> Fix D, train G one step</div>
      <div class="st b" data-step="4"><b>4.</b> Gradient descent on G</div>
      <div class="st b" data-step="5"><b>Repeat.</b> <i>k</i> updates of D per update of G keep D ahead of G.</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:1vh;min-width:0">
      <div class="d8-stack" style="height:36vh">
        <div class="d8-f b d8-figw" data-step="1">${LOOP('D', '')}</div>
        <div class="d8-f b d8-figw" data-step="2">${LOOP('D', 'ascent')}</div>
        <div class="d8-f b d8-figw" data-step="3">${LOOP('G', '')}</div>
        <div class="d8-f b d8-figw" data-step="4">${LOOP('G', 'descent')}</div>
        <div class="d8-f b d8-figw" data-step="5">${LOOP('both', 'loop')}</div>
      </div>
      <div class="d8-objs">
        <div class="d8-math b" data-step="2" style="font-size:clamp(.85rem, 1.35vw, 1.25rem)">${d8Tex('\\max_{D}\\; \\mathbb{E}_{x}\\big[\\log D(x)\\big] + \\mathbb{E}_{z}\\big[\\log\\big(1 - D(G(z))\\big)\\big]', true)}</div>
        <div class="d8-math b" data-step="4" style="font-size:clamp(.85rem, 1.35vw, 1.25rem)">${d8Tex('\\min_{G}\\; \\mathbb{E}_{z}\\big[\\log\\big(1 - D(G(z))\\big)\\big]', true)}<div class="label">The real-data term has no G in it, so its gradient with respect to G is zero.</div></div>
      </div>
    </div>
  </div>
  <div class="d8-cite">Drawn and animated for this deck from the Google slide's training-loop frames.</div>
`);

/* 37: noise to distribution, redrawn: a trained generator maps Gaussian noise to a sample in the data distribution;
   then GANs (noise to a data manifold) and CycleGANs (one data manifold to another) */
st(`${GS}
  <h1 class="t">Noise to distribution</h1>
  <div class="d8-col" style="gap:1vh">
    <div style="flex:0 0 auto;height:44vh">
      <svg class="d8-gsvg" viewBox="0 0 760 330" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${gDefs('g37a')}
        <g class="b" data-step="1">
          ${gBox(20, 40, 56, 50, 'z', FAKE, 22)}<text x="48" y="114" font-size="14" text-anchor="middle">z ~ 𝒩(0, 1)</text>
          ${gArr(80, 65, 116, 65, 'g37a')}${gNet(120, 10, 130, 110, 'G', true)}<text x="185" y="140" font-size="14" text-anchor="middle">trained generator</text>
          ${gArr(254, 65, 290, 65, 'g37a')}<rect x="294" y="40" width="50" height="50" fill="${FAKE}" stroke="#0f172a" stroke-width="2"/>
          ${gPath('M 348 65 C 390 65, 400 60, 430 62', 'g37a', true)}
          ${gBlob(420, 10, 1.1, '#dbeafe', 'X')}<circle cx="452" cy="62" r="6" fill="#0f172a"/>
          <text x="520" y="138" font-size="14" text-anchor="middle">learned target data distribution</text>
        </g>
        <line x1="20" y1="160" x2="740" y2="160" stroke="#cbd5e1" stroke-width="2"/>
        <g class="b" data-step="2">
          <text x="20" y="200" font-size="18" font-weight="700">GANs</text>
          <circle cx="160" cy="214" r="26" fill="${FAKE}" stroke="#0f172a" stroke-width="2"/><text x="160" y="221" font-size="20" text-anchor="middle" class="it">z</text>
          ${gArr(192, 214, 250, 214, 'g37a')}${gBlob(258, 166, 0.85, '#dbeafe', 'Y')}
          <text x="420" y="220" font-size="15">Gaussian noise → target data manifold</text>
        </g>
        <g class="b" data-step="3">
          <text x="20" y="290" font-size="18" font-weight="700">CycleGANs</text>
          ${gBlob(130, 250, 0.7, REAL, 'X')}${gArr(216, 290, 250, 290, 'g37a')}${gBlob(258, 250, 0.7, '#dbeafe', 'Y')}
          <text x="420" y="296" font-size="15">data manifold X → data manifold Y (Zhu et al., ICCV 2017)</text>
        </g>
      </svg>
    </div>
  </div>
  <div class="d8-cite">${DIAG}</div>
`);

/* 38: applications. Model, use cases with their papers, then a figure from each paper */
st(`
  <style>
    .d8-gapps{ flex:0 1 auto; display:grid; grid-template-columns:repeat(3, 1fr); gap:1.4vw; align-items:stretch; }
    .d8-gapps .card{ border:1px solid var(--line); border-radius:12px; padding:1.4vh 1vw; background:#f8fafc;
      display:flex; flex-direction:column; gap:.9vh; align-items:center; text-align:center; }
    .d8-gapps .card .label{ line-height:1.3; }
    .d8-gapps img{ width:100%; max-height:26vh; object-fit:contain; border-radius:6px; background:#fff; }
    @media (max-width: 820px), (max-aspect-ratio: 1/1){ .d8-gapps{ grid-template-columns:1fr; } .d8-gapps img{ max-height:16vh; } }
  </style>
  <h1 class="t">Applications</h1>
  <div class="d8-col" style="justify-content:flex-start;gap:1.6vh">
    <div class="d8-box b" data-step="1" style="align-self:center;padding:1.2vh 1.6vw">Model: GAN</div>
    <div class="d8-gapps">
      <div class="card b" data-step="2">
        <div class="lead"><b>Realistic faces</b></div>
        <div class="label">StyleGAN generates faces of people who do not exist. Karras et al., CVPR 2019</div>
        <img class="b" data-step="3" src="assets/papers/stylegan2019-fig2.png" alt="StyleGAN, Figure 2: generated faces">
      </div>
      <div class="card b" data-step="2">
        <div class="lead"><b>Image-to-image translation</b></div>
        <div class="label">CycleGAN turns horses into zebras, summer into winter, photos into paintings. Zhu et al., ICCV 2017</div>
        <img class="b" data-step="3" src="assets/papers/cyclegan2017-fig1.png" alt="CycleGAN, Figure 1: Monet to photo, zebra to horse, summer to winter">
      </div>
      <div class="card b" data-step="2">
        <div class="lead"><b>Super-resolution</b></div>
        <div class="label">SRGAN sharpens low-resolution images with realistic detail. Ledig et al., CVPR 2017</div>
        <img class="b" data-step="3" src="assets/papers/srgan2017-fig2.png" alt="SRGAN, Figure 2: bicubic, SRResNet, SRGAN and the original">
      </div>
    </div>
  </div>
  <div class="d8-cite">Figures: Karras et al., CVPR 2019 (arXiv 1812.04948), Fig. 2; Zhu et al., ICCV 2017 (arXiv 1703.10593), Fig. 1; Ledig et al., CVPR 2017 (arXiv 1609.04802), Fig. 2.</div>
`);
}
