/* PART: vae (Day 8). Google deck "Day 8 - Generative Modeling", slides 18-27 (owner: Shreya).
   Images are the Google deck's own (day08/assets/google, v19-v26), cropped where a cut-off title or a repeated title sat
   at the top (crop lines from the detected content bands). Cover positions come from the content bands and the gaps between
   them, detected by script (scratchpad bands.py), not by eye.
   Comments applied: 19 encoder outputs mu and sigma, a Gaussian in latent space, and we cannot backpropagate through
   randomness; 20 items animated; 21 the objective comes in term by term; 24 first image, then animate to the second;
   25 sample from the latent space, animated, organized space gives realistic images; 26 two images, encode, interpolate
   between the two means; 27 applications: models, examples, photos (figures from the papers).
   Shreya (2026-11-11): no screenshots of lecture slides for this part; slides 21B, 22 and 24 are now our own diagrams with
   the slides' information pulled out. The animation stills (19, 20, 21A, 23, 25, 26) stay.
   The KL term is written out in LaTeX in its standard form; the Google image of it has a sign and a sigma-squared slip
   (flagged in feedback/_day.md). No speaker notes. */
{
const G = f => `assets/google/${f}`;
const K = (r, step) => ({r, k: 'cov d8-k', step});
const RING = (r, step) => ({r, k: 'ring d8-one', step});
const SRC = 'source: to add';
const MIT = 'MIT 6.S191, Introduction to Deep Learning (introtodeeplearning.com)';

section('Variational Autoencoders');

/* 18 */
st(`
  <h1 class="t">Variational Autoencoders</h1>
  <div class="d8-col" style="gap:2.4vh">
    <div class="b" data-step="1" style="flex:0 0 auto;height:34vh">${d8TitleArt('vae')}</div>
    <div class="statement b" data-step="2" style="text-align:center">Encode to a distribution, not a point, so we can sample new images.</div>
  </div>
`);

/* 19: input, encoder, mu and sigma, then the Gaussian q(z|x). Detected columns: input .040-.194, arrow .210-.263,
   encoder .280-.434, arrows .450-.557, mu/sigma .574-.637, Gaussian .680-.985 (cuts at the gap midpoints). */
st(`
  <h1 class="t">From a point to a distribution</h1>
  <div class="d8-col" style="gap:1.6vh">
    <div class="lead b" data-step="1">Instead of mapping to points, map to probability distributions</div>
    ${d8Fig(G('v19-encoder-mu-sigma.png'), 3.0508, [
      K([0.202, 0, 0.24, 1], 3), K([0.442, 0, 0.2165, 1], 4), K([0.6585, 0, 0.3415, 1], 5),
    ], {cls: 'b', step: 2, style: 'height:24vh', alt: 'Input x, encoder, mean and standard deviation, a Gaussian q(z|x)'})}
    <div class="lead b" data-step="4">The encoder outputs a mean ${d8Tex('\\mu')} and a standard deviation ${d8Tex('\\sigma')}.</div>
    <div class="lead b" data-step="5">They define a Gaussian ${d8Tex('q(z \\mid x)')} in latent space.</div>
  </div>
  <div class="d8-cite">${SRC}</div>
`);

/* Shared SVG pieces for the rebuilt VAE slides (Shreya, 2026-11-11: no screenshots of lecture slides; pull the information
   out). Drawn for this deck; the latent-space blobs on slide 22 are a schematic. */
const VS = `<style>
  .d8-vsvg{ width:100%; height:100%; display:block; }
  .d8-vsvg text{ font-family:var(--font); fill:var(--ink); }
  .d8-vsvg .it{ font-style:italic; }
  .d8-key{ display:flex; flex-wrap:wrap; justify-content:center; gap:.4vh 1.6vw; margin-top:.6vh;
    font-size:clamp(.8rem, 1.15vw, 1.05rem); color:var(--ink); }
</style>`;
const vDefs = id => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#0f172a"/></marker></defs>`;
const vArr = (x1, y1, x2, y2, id, dash = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#0f172a" stroke-width="2.5" ${dash ? `stroke-dasharray="${dash}"` : ''} marker-end="url(#${id})"/>`;
const sub = (a, b) => `${a}<tspan baseline-shift="sub" font-size="70%">${b}</tspan>`;

/* 21A: two terms in the loss, in the style of the slides after it (Shreya, 2026-11-11): the loss written out in LaTeX,
   term by term, each with what it does, then one card per term. Same sign convention as 21B (a loss to minimize). */
st(`${VS}
  <style>
    .d8-terms{ display:flex; flex-wrap:wrap; justify-content:center; align-items:flex-start; gap:.4vw; font-size:clamp(1rem, 2vw, 1.8rem); flex:0 0 auto; }
    .d8-tcards{ display:grid; grid-template-columns:1fr 1fr; gap:1.6vw; flex:0 0 auto; }
    .d8-tcards .d8-box{ text-align:left; display:flex; flex-direction:column; gap:.8vh; }
    .d8-tcards .d8-box b{ font-size:clamp(1rem, 1.7vw, 1.5rem); }
    @media (max-width: 820px), (max-aspect-ratio: 1/1){ .d8-tcards{ grid-template-columns:1fr; } }
  </style>
  <h1 class="t">Two terms in the loss</h1>
  <div class="d8-col" style="gap:2.4vh">
    <div class="d8-terms">
      <span class="b" data-step="1">${d8Tex('\\mathcal{L} \\;=\\;', true)}</span>
      <span class="b" data-step="2">${d8Tex('\\underbrace{-\\,\\mathbb{E}_{q(z \\mid x)}\\big[\\log p(x \\mid z)\\big]}_{\\text{reconstruction}}', true)}</span>
      <span class="b" data-step="3">${d8Tex('+\\;\\underbrace{D_{KL}\\big(q(z \\mid x)\\,\\|\\,p(z)\\big)}_{\\text{regularization}}', true)}</span>
    </div>
    <div class="d8-tcards">
      <div class="d8-box b" data-step="2"><b>Reconstruction</b><span class="label">Decode the sampled code and compare with the input: the output ${d8Tex('\\hat{x}')} should look like ${d8Tex('x')}.</span></div>
      <div class="d8-box b" data-step="3"><b>Regularization</b><span class="label">Keep each image's Gaussian ${d8Tex('q(z \\mid x)')} close to the prior ${d8Tex('p(z) = \\mathcal{N}(0, I)')}, so the latent space has no gaps.</span></div>
    </div>
  </div>
`);

/* 21B: the network drawn for this deck (encoder to mu and sigma to z to decoder), then the loss, the KL term and the prior */
st(`${VS}
  <h1 class="t">Two terms in the loss</h1>
  <div class="d8-col" style="gap:1vh">
    <div style="flex:0 0 auto;height:26vh">
      <svg class="d8-vsvg" viewBox="0 0 760 210" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${vDefs('vNet')}
        <g class="b" data-step="1">
          <rect x="20" y="70" width="60" height="60" fill="#fff" stroke="#0f172a" stroke-width="2"/><text x="50" y="108" font-size="22" text-anchor="middle" class="it">x</text>
          ${vArr(84, 100, 112, 100, 'vNet')}
          <polygon points="116,40 236,72 236,128 116,160" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/><text x="176" y="106" font-size="16" text-anchor="middle">encoder</text>
          <text x="176" y="192" font-size="15" text-anchor="middle">computes ${sub('q', 'φ')}(z | x)</text>
        </g>
        <g class="b" data-step="2">
          <rect x="252" y="58" width="44" height="34" rx="6" fill="#fff" stroke="#0f172a" stroke-width="2"/><text x="274" y="81" font-size="18" text-anchor="middle" class="it">μ</text>
          <rect x="252" y="108" width="44" height="34" rx="6" fill="#fff" stroke="#0f172a" stroke-width="2"/><text x="274" y="131" font-size="18" text-anchor="middle" class="it">σ</text>
          ${vArr(300, 76, 336, 96, 'vNet')}${vArr(300, 124, 336, 104, 'vNet')}
          <circle cx="358" cy="100" r="20" fill="#fff" stroke="#0f172a" stroke-width="2"/><text x="358" y="106" font-size="18" text-anchor="middle" class="it">z</text>
        </g>
        <g class="b" data-step="3">
          ${vArr(380, 100, 404, 100, 'vNet')}
          <polygon points="408,72 528,40 528,160 408,128" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/><text x="468" y="106" font-size="16" text-anchor="middle">decoder</text>
          <text x="468" y="192" font-size="15" text-anchor="middle">computes ${sub('p', 'θ')}(x | z)</text>
          ${vArr(532, 100, 560, 100, 'vNet')}
          <rect x="564" y="70" width="60" height="60" fill="#fff" stroke="#0f172a" stroke-width="2"/><text x="594" y="108" font-size="22" text-anchor="middle" class="it">x̂</text>
        </g>
      </svg>
    </div>
    <div class="d8-math b" data-step="4">${d8Tex('\\mathcal{L}(\\phi, \\theta; x) = \\underbrace{-\\,\\mathbb{E}_{q_\\phi(z \\mid x)}\\big[\\log p_\\theta(x \\mid z)\\big]}_{\\text{reconstruction loss}} \\\;+\\\; \\underbrace{D_{KL}\\big(q_\\phi(z \\mid x)\\,\\|\\,p(z)\\big)}_{\\text{regularization term}}', true)}</div>
    <div class="d8-math b" data-step="5">${d8Tex('D_{KL} = \\frac{1}{2}\\sum_{j}\\left(\\sigma_j^2 + \\mu_j^2 - 1 - \\log \\sigma_j^2\\right), \\qquad p(z) = \\mathcal{N}(0, I)', true)}</div>
    <div class="label b" data-step="6" style="text-align:center">The regularization term spreads the codes evenly around the center of the latent space, and penalizes packing them into small regions (memorizing).</div>
  </div>
  <div class="d8-cite">Information from ${MIT}; diagram drawn for this deck.</div>
`);

/* 22: regularization intuition, drawn for this deck: what we want (continuity, completeness), then a latent space
   without regularization (small, far-apart blobs, gaps) and with a normal prior (centered, overlapping blobs). Schematic. */
const blob = (cx, cy, r, col, id) => `<radialGradient id="${id}"><stop offset="0" stop-color="${col}" stop-opacity=".85"/><stop offset="1" stop-color="${col}" stop-opacity="0"/></radialGradient><circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${id})"/>`;
const BL = ['#e07a3f', '#4a90d9', '#9bbf4a'];
st(`${VS}
  <h1 class="t">Regularization Intuition</h1>
  <div class="d8-col" style="gap:1.2vh">
    <div class="lead b" data-step="1"><b>Continuity:</b> points close in latent space decode to similar content.</div>
    <div class="lead b" data-step="2"><b>Completeness:</b> any point sampled from the latent space decodes to meaningful content.</div>
    <div style="flex:0 0 auto;height:36vh">
      <svg class="d8-vsvg" viewBox="0 0 760 300" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <g class="b" data-step="3">
          <rect x="10" y="10" width="360" height="250" rx="12" fill="#fff" stroke="#cbd5e1" stroke-width="2"/>
          ${blob(80, 70, 22, BL[0], 'vb1')}${blob(300, 90, 22, BL[1], 'vb2')}${blob(170, 215, 22, BL[2], 'vb3')}
          <text x="190" y="290" font-size="18" text-anchor="middle" font-weight="700">Not regularized</text>
        </g>
        <g class="b" data-step="4">
          <text x="190" y="140" font-size="22" text-anchor="middle">×</text>
          <text x="190" y="165" font-size="13" text-anchor="middle">a sample in a gap decodes to nothing meaningful</text>
          <text x="80" y="38" font-size="13" text-anchor="middle">small variances: pointed</text>
        </g>
        <g class="b" data-step="5">
          <rect x="390" y="10" width="360" height="250" rx="12" fill="#fff" stroke="#cbd5e1" stroke-width="2"/>
          ${blob(540, 120, 70, BL[0], 'vb4')}${blob(600, 160, 70, BL[1], 'vb5')}${blob(560, 175, 70, BL[2], 'vb6')}
          <text x="570" y="290" font-size="18" text-anchor="middle" font-weight="700">Regularized (normal prior)</text>
        </g>
        <g class="b" data-step="6">
          <text x="572" y="158" font-size="22" text-anchor="middle">×</text>
          <text x="570" y="40" font-size="13" text-anchor="middle">means centered, variances regularized: no gaps</text>
        </g>
      </svg>
    </div>
  </div>
  <div class="d8-cite">Information from ${MIT}; drawing is a schematic for this deck.</div>
`);

/* 22B: can't propagate through randomization, moved after Regularization Intuition and drawn for this deck
   (Shreya, 2026-11-11). The problem: z is sampled, so the gradient stops there. The fix: move the randomness into epsilon,
   so z = mu + sigma * epsilon is a plain formula and the gradient reaches mu and sigma. */
st(`${VS}
  <h1 class="t">Can't propagate through randomization</h1>
  <div class="d8-col" style="gap:1.2vh">
    <div style="flex:0 0 auto;height:44vh">
      <svg class="d8-vsvg" viewBox="0 0 760 330" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${vDefs('vCp')}
        <g class="b" data-step="1">
          <text x="10" y="28" font-size="18" font-weight="700">Problem</text>
          <rect x="60" y="48" width="56" height="40" rx="7" fill="#fff" stroke="#0f172a" stroke-width="2"/><text x="88" y="74" font-size="19" text-anchor="middle" class="it">μ</text>
          <rect x="60" y="100" width="56" height="40" rx="7" fill="#fff" stroke="#0f172a" stroke-width="2"/><text x="88" y="126" font-size="19" text-anchor="middle" class="it">σ</text>
          ${vArr(120, 68, 214, 88, 'vCp')}${vArr(120, 120, 214, 100, 'vCp')}
          <circle cx="250" cy="94" r="32" fill="#fde68a" stroke="#0f172a" stroke-width="2"/><text x="250" y="91" font-size="14" text-anchor="middle">sample</text><text x="250" y="108" font-size="14" text-anchor="middle">at random</text>
          ${vArr(284, 94, 338, 94, 'vCp')}
          <circle cx="362" cy="94" r="22" fill="#fff" stroke="#0f172a" stroke-width="2"/><text x="362" y="101" font-size="19" text-anchor="middle" class="it">z</text>
        </g>
        <g class="b" data-step="2">
          <path d="M 352 124 C 330 170, 160 170, 104 146" fill="none" stroke="#0f172a" stroke-width="2" stroke-dasharray="6 5" marker-end="url(#vCp)"/>
          <text x="250" y="150" font-size="30" text-anchor="middle">✕</text>
          <text x="420" y="88" font-size="15">The sample is random, so the gradient</text>
          <text x="420" y="108" font-size="15">cannot flow back to μ and σ.</text>
        </g>
        <line x1="10" y1="186" x2="750" y2="186" stroke="#cbd5e1" stroke-width="2"/>
        <g class="b" data-step="3">
          <text x="10" y="206" font-size="18" font-weight="700">Solution</text>
          <circle cx="250" cy="248" r="26" fill="#fde68a" stroke="#0f172a" stroke-width="2"/><text x="250" y="255" font-size="19" text-anchor="middle" class="it">ε</text>
          <text x="250" y="296" font-size="14" text-anchor="middle">ε ~ 𝒩(0, I)</text>
        </g>
        <g class="b" data-step="4">
          <rect x="60" y="222" width="56" height="40" rx="7" fill="#fff" stroke="#0f172a" stroke-width="2"/><text x="88" y="248" font-size="19" text-anchor="middle" class="it">μ</text>
          <rect x="60" y="274" width="56" height="40" rx="7" fill="#fff" stroke="#0f172a" stroke-width="2"/><text x="88" y="300" font-size="19" text-anchor="middle" class="it">σ</text>
          <path d="M 120 242 C 200 206, 300 212, 336 258" fill="none" stroke="#0f172a" stroke-width="2.5" marker-end="url(#vCp)"/>${vArr(120, 294, 336, 274, 'vCp')}${vArr(278, 252, 336, 266, 'vCp')}
          <rect x="340" y="246" width="150" height="40" rx="7" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/><text x="415" y="272" font-size="17" text-anchor="middle" class="it">z = μ + σ ⊙ ε</text>
        </g>
        <g class="b" data-step="5">
          <path d="M 400 290 C 380 326, 150 326, 112 314" fill="none" stroke="#0f172a" stroke-width="2" stroke-dasharray="6 5" marker-end="url(#vCp)"/>
          <text x="510" y="262" font-size="15">z is now a plain formula of μ and σ,</text>
          <text x="510" y="282" font-size="15">so the gradient reaches them.</text>
        </g>
      </svg>
    </div>
  </div>
  <div class="d8-cite">Drawn for this deck.</div>
`);

/* 23: training, as an animation drawn for this deck (Shreya, 2026-11-11: an animation instead of the two images).
   Click 1: at epoch 0 the codes are scattered. Click 2: the codes glide (2.4 s) into the prior circle and group by class.
   Positions come from a fixed pseudo-random seed; this is a schematic, not a training run. */
const TR = (() => {
  let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const gauss = () => { let u = 0, v = 0; while (!u) u = rnd(); while (!v) v = rnd(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
  const C = [[-0.5, 0.38], [0.48, 0.4], [0, -0.04], [-0.46, -0.46], [0.46, -0.46]];
  const COL = ['#e07a3f', '#4a90d9', '#9bbf4a', '#b36bc6', '#e0b73f'];
  const S = 150, cx = 380, cy = 175;            /* one latent unit = 150 px */
  const dots = [];
  C.forEach(([mx, my], k) => { for (let i = 0; i < 14; i++) {
    const x0 = (rnd() * 3.4 - 1.7) * S, y0 = (rnd() * 2.0 - 1.0) * S;
    const x1 = (mx + 0.11 * gauss()) * S, y1 = -(my + 0.11 * gauss()) * S;
    dots.push(`<circle class="d8-dot" r="5.5" fill="${COL[k]}" cx="${cx}" cy="${cy}" style="--x0:${x0.toFixed(1)}px;--y0:${y0.toFixed(1)}px;--x1:${x1.toFixed(1)}px;--y1:${y1.toFixed(1)}px"/>`);
  } });
  return `<svg viewBox="0 0 760 350" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%;display:block" aria-hidden="true">
    <line x1="${cx - 280}" y1="${cy}" x2="${cx + 280}" y2="${cy}" stroke="#94a3b8" stroke-width="2"/>
    <line x1="${cx}" y1="${cy - 165}" x2="${cx}" y2="${cy + 165}" stroke="#94a3b8" stroke-width="2"/>
    <g class="d8-move b" data-step="2">
      <circle cx="${cx}" cy="${cy}" r="${S}" fill="#fde68a" fill-opacity=".25" stroke="#0f172a" stroke-width="2" stroke-dasharray="7 6" class="d8-prior"/>
      ${dots.join('')}
      <text x="${cx + S + 10}" y="${cy - S + 12}" font-size="15" class="d8-prior" style="font-family:var(--font)">prior 𝒩(0, I)</text>
      <text x="40" y="34" font-size="20" font-weight="700" class="d8-ep0" style="font-family:var(--font)">epoch 0</text>
      <text x="40" y="34" font-size="20" font-weight="700" class="d8-ep1" style="font-family:var(--font)">epoch 50</text>
    </g>
  </svg>`;
})();
st(`
  <style>
    .d8-move.b{ opacity:1 !important; transform:none !important; }
    .d8-move .d8-dot{ transform:translate(var(--x0), var(--y0)); transition:transform 2.4s ease-in-out; }
    .d8-move.shown .d8-dot{ transform:translate(var(--x1), var(--y1)); }
    .d8-move .d8-prior, .d8-move .d8-ep1{ opacity:0; transition:opacity .8s ease; }
    .d8-move.shown .d8-prior, .d8-move.shown .d8-ep1{ opacity:1; transition-delay:1.2s; }
    .d8-move .d8-ep0{ opacity:1; transition:opacity .4s ease; }
    .d8-move.shown .d8-ep0{ opacity:0; }
  </style>
  <h1 class="t">Training</h1>
  <div class="d8-col" style="gap:1vh">
    <div class="b" data-step="1" style="flex:0 0 auto;height:46vh">${TR}</div>
    <div class="d8-capstack">
      <div class="label d8-cap b" data-step="1">Epoch 0: each image's code (one dot, colored by class) is scattered at random.</div>
      <div class="label d8-cap b" data-step="2">Training: the codes move inside the prior and group by class, with no big gaps between groups.</div>
    </div>
  </div>
  <div class="d8-cite">Animation drawn for this deck (a schematic, not a training run).</div>
`);

/* 24 (untitled in the Google deck): reparametrizing the sampling layer, drawn for this deck: the key idea, then the
   original graph (z is a stochastic node, the gradient stops there), then the reparametrized graph (epsilon is the
   stochastic node, the gradient reaches phi). Her comment: the second breaks down the first, show it after. */
const dia = (x, y, l) => `<polygon points="${x},${y - 26} ${x + 26},${y} ${x},${y + 26} ${x - 26},${y}" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/><text x="${x}" y="${y + 6}" font-size="17" text-anchor="middle" class="it">${l}</text>`;
const sto = (x, y, l) => `<circle cx="${x}" cy="${y}" r="24" fill="#fde68a" stroke="#0f172a" stroke-width="2"/><text x="${x}" y="${y + 6}" font-size="17" text-anchor="middle" class="it">${l}</text>`;
st(`${VS}
  <h1 class="t">Reparametrizing the sampling layer</h1>
  <div class="d8-col" style="gap:1vh">
    <div class="d8-math b" data-step="1">${d8Tex('z \\sim \\mathcal{N}(\\mu, \\sigma^2) \\quad \\longrightarrow \\quad z = \\mu + \\sigma \\odot \\epsilon, \\\;\\\; \\epsilon \\sim \\mathcal{N}(0, I)', true)}
      <div class="d8-key">
        <span>${d8Tex('z')}: the latent code</span>
        <span>${d8Tex('\\mu')}: mean, from the encoder</span>
        <span>${d8Tex('\\sigma')}: standard deviation, from the encoder</span>
        <span>${d8Tex('\\epsilon')}: random noise, from ${d8Tex('\\mathcal{N}(0, I)')}</span>
        <span>${d8Tex('\\odot')}: multiply each dimension</span>
        <span>${d8Tex('x')}: the input image</span>
        <span>${d8Tex('\\phi')}: the encoder's weights (what training updates)</span>
        <span>${d8Tex('f')}: the loss, computed from ${d8Tex('z')}</span>
      </div></div>
    <div style="flex:0 0 auto;height:36vh">
      <svg class="d8-vsvg" viewBox="0 0 760 300" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${vDefs('vRp')}
        <g class="b" data-step="2">
          ${vArr(100, 222, 128, 160, 'vRp')}${vArr(180, 222, 152, 160, 'vRp')}${vArr(140, 112, 140, 74, 'vRp')}
          ${dia(140, 48, 'f')}${sto(140, 136, 'z')}${dia(90, 246, 'φ')}${dia(190, 246, 'x')}
          <text x="176" y="141" font-size="15">z ~ ${sub('q', 'φ')}(z | x)</text>
          <text x="140" y="292" font-size="17" text-anchor="middle" font-weight="700">Original form</text>
        </g>
        <g class="b" data-step="3">
          <path d="M 60 60 C 20 120, 20 180, 76 232" fill="none" stroke="#0f172a" stroke-width="2" stroke-dasharray="6 5"/>
          <text x="104" y="126" font-size="30" text-anchor="middle">✕</text>
          <text x="10" y="40" font-size="13">gradient stops at the random node</text>
        </g>
        <g class="b" data-step="4">
          ${vArr(470, 222, 520, 162, 'vRp')}${vArr(550, 220, 550, 164, 'vRp')}${vArr(630, 222, 580, 162, 'vRp')}${vArr(550, 110, 550, 74, 'vRp')}
          ${dia(550, 48, 'f')}${dia(550, 136, 'z')}${dia(460, 246, 'φ')}${dia(550, 246, 'x')}${sto(640, 246, 'ε')}
          <text x="586" y="141" font-size="15">z = g(φ, x, ε)</text>
          <text x="672" y="251" font-size="15">~ 𝒩(0, I)</text>
          <text x="550" y="292" font-size="17" text-anchor="middle" font-weight="700">Reparametrized form</text>
        </g>
        <g class="b" data-step="5">
          <path d="M 520 52 C 440 90, 420 180, 446 226" fill="none" stroke="#0f172a" stroke-width="2" stroke-dasharray="6 5" marker-end="url(#vRp)"/>
          <text x="400" y="40" font-size="13">gradient reaches φ</text>
        </g>
        <g class="b" data-step="2">
          <polygon points="690,18 702,30 690,42 678,30" fill="#e2e8f0" stroke="#0f172a" stroke-width="1.5"/><text x="708" y="35" font-size="12">deterministic</text>
          <circle cx="690" cy="62" r="11" fill="#fde68a" stroke="#0f172a" stroke-width="1.5"/><text x="708" y="67" font-size="12">random</text>
        </g>
      </svg>
    </div>
  </div>
  <div class="d8-cite">Information from ${MIT}; graphs drawn for this deck.</div>
`);

/* 25: generation. Crop removed the image's own title (band ends y .197). In the crop: latent space x .048-.311,
   decoder .402-.580, generated .689-.953. Then our VAE: a grid of latent codes, decoded. */
st(`
  <style>
    .d8-gen{ display:grid; grid-template-columns:1.5fr 1fr; gap:2vw; align-items:center; flex:0 1 auto; }
    .d8-gen > div{ display:flex; flex-direction:column; align-items:center; gap:1vh; min-width:0; }
    .d8-gen img{ max-height:36vh; max-width:100%; }
    @media (max-width: 820px), (max-aspect-ratio: 1/1){ .d8-gen{ grid-template-columns:1fr; } .d8-gen img{ max-height:22vh; } }
  </style>
  <h1 class="t">Generation</h1>
  <div class="d8-col">
    <div class="lead b" data-step="1">Sample a point from the latent space, then decode it.</div>
    <div class="d8-gen">
      <div>${d8Fig(G('v25-generation.png'), 2.3585, [
        K([0.356, 0, 0.2785, 1], 3), K([0.6345, 0, 0.3655, 1], 4),
      ], {cls: 'b', step: 2, style: 'height:28vh;width:100%', alt: 'Latent space, decoder, generated image'})}</div>
      <div class="b" data-step="5"><img src="assets/vae-decode-grid.png" alt="Our VAE: a grid of latent codes decoded into digits"><div class="label">Our VAE on MNIST: a grid of codes, decoded</div></div>
    </div>
    <div class="lead b" data-step="5">The latent space is organized, so samples decode to realistic images.</div>
  </div>
  <div class="d8-cite">Diagram: ${SRC}. Grid: our workbook, section 2.4 (MNIST, LeCun et al., 1998).</div>
`);

/* 27: applications. The model, then the uses with their papers, then a figure from each paper */
st(`
  <style>
    .d8-apps3{ flex:0 1 auto; display:grid; grid-template-columns:repeat(3, 1fr); gap:1.4vw; align-items:stretch; }
    .d8-apps3 .card{ border:1px solid var(--line); border-radius:12px; padding:1.4vh 1vw; background:#f8fafc;
      display:flex; flex-direction:column; gap:.9vh; align-items:center; text-align:center; }
    .d8-apps3 .card .label{ line-height:1.3; }
    .d8-apps3 img{ width:100%; max-height:24vh; object-fit:contain; border-radius:6px; background:#fff; }
    @media (max-width: 820px), (max-aspect-ratio: 1/1){ .d8-apps3{ grid-template-columns:1fr; } .d8-apps3 img{ max-height:16vh; } }
  </style>
  <h1 class="t">Applications</h1>
  <div class="d8-col" style="justify-content:flex-start;gap:1.6vh">
    <div class="d8-box b" data-step="1" style="align-self:center;padding:1.2vh 1.6vw">Model: variational autoencoder</div>
    <div class="d8-apps3">
      <div class="card b" data-step="2">
        <div class="lead"><b>Molecule design</b></div>
        <div class="label">Encode molecules into a continuous space, then search it for better properties. Gómez-Bombarelli et al., ACS Central Science 2018</div>
        <img class="b" data-step="3" src="assets/papers/gomez2018-fig1.png" alt="Gomez-Bombarelli et al. 2018, Figure 1: molecule autoencoder and property optimization in latent space">
      </div>
      <div class="card b" data-step="2">
        <div class="lead"><b>Image generation</b></div>
        <div class="label">A deep hierarchical VAE generates high-resolution faces. Vahdat and Kautz, NeurIPS 2020 (NVAE)</div>
        <img class="b" data-step="3" src="assets/papers/nvae2020-fig1.png" alt="NVAE, Figure 1: generated 256 by 256 faces">
      </div>
      <div class="card b" data-step="2">
        <div class="lead"><b>Latent space for image generators</b></div>
        <div class="label">Stable Diffusion runs on the code of a KL-regularized autoencoder. Rombach et al., CVPR 2022</div>
        <img class="b" data-step="3" src="assets/papers/rombach2022-fig3.png" alt="Rombach et al. 2022, Figure 3: latent diffusion">
      </div>
    </div>
  </div>
  <div class="d8-cite">Figures: Gómez-Bombarelli et al., ACS Cent. Sci. 2018 (arXiv 1610.02415), Fig. 1; Vahdat and Kautz, NeurIPS 2020 (arXiv 2007.03898), Fig. 1; Rombach et al., CVPR 2022, Fig. 3.</div>
`);
}
