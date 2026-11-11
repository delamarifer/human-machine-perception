/* PART: overview (Day 8). Google deck "Day 8 - Generative Modeling", slides 5-11 (owner: Shreya).
   Comments applied:
   - slide 5: a very basic timeline of the model families (years and citations from the original papers; check before the talk)
   - slide 6: a simple definition, and an animation
   - slides 7 and 8 combined into one motivation slide (she asked for this)
   - slide 9: the shadow analogy, drawn here (not the textbook figure)
   The latent variable models slide is as written. No speaker notes. */
{
section('Overview');

/* 5: Overview. No dates (Shreya, 2026-11-11: the timeline years were off). The model families, one per click: a chip names the
   family and the lecture's diagram for it covers the previous one; the newest chip is dark, the earlier ones fade.
   Diagrams: Kaiming He, MIT 6.7960 Lecture 14, pages 67, 70, 71, 73, 75, cropped below their titles from the PDF. */
const FAM = [
  ['Autoencoders and VAEs', 'family-p67.png', 2.869, 'Encode the data into a simple distribution, then generate it back'],
  ['GANs', 'family-p70.png', 2.4843, 'A generator against a discriminator: real or generated?'],
  ['Autoregressive', 'family-p71.png', 1.8761, 'Predict each piece from the pieces before it'],
  ['Diffusion', 'family-p73.png', 2.4177, 'Turn noise into data, one small step at a time'],
  ['Flow matching', 'family-p75.png', 1.2169, 'Move a simple distribution into the data distribution over time'],
];
st(`
  <style>
    .d8-chips{ display:flex; flex-wrap:wrap; gap:.8vw; justify-content:center; flex:0 0 auto; }
    .d8-chip{ border:2px solid var(--ink); border-radius:999px; padding:.6vh 1.2vw; font-size:clamp(.9rem, 1.5vw, 1.35rem); font-weight:700; }
    .d8-chips > .d8-chip.shown:has(~ .d8-chip.shown){ opacity:.35 !important; font-weight:400; }
  </style>
  <h1 class="t">Overview</h1>
  <div class="d8-chips">${FAM.map(([n], i) => `<div class="d8-chip b" data-step="${i + 1}">${n}</div>`).join('')}</div>
  <div class="d8-stack" style="height:44vh">
    ${FAM.map(([n, f, ar], i) => d8Fig(`assets/lecture/${f}`, ar, [], {cls: 'd8-f b', step: i + 1, alt: n + ' diagram'})).join('')}
  </div>
  <div class="d8-capstack">${FAM.map(([, , , c], i) => `<div class="label d8-cap b" data-step="${i + 1}">${c}</div>`).join('')}</div>
  <div class="d8-cite">Diagrams: Kaiming He, MIT 6.7960 Deep Learning, Lecture 14, pages 67, 70, 71, 73, 75 (flow matching figure adapted from github.com/facebookresearch/flow_matching).</div>
`);

/* 6 (Google slide 6): what is a latent variable. Shreya (2026-11-11) asked for a clearer, shorter slide. Main idea: the data
   we see comes from hidden causes, and a model can learn those few hidden factors instead of every pixel. The shadow is the
   example: only the shadow shows at first; the scrap sculpture that cast it is revealed on the third click.
   Detected: the sculpture starts at x .311 (brown pixels); the white cover starts at x .30. */
st(`
  <h1 class="t">What is a latent variable?</h1>
  <div class="d8-col" style="gap:1.6vh">
    <div class="statement b" data-step="1">A hidden cause behind the data we see.</div>
    ${d8Fig('assets/google/s09-shadow.png', 1.1579, [{r: [0.30, -0.01, 0.71, 1.02], k: 'cov', step: 3}],
      {cls: 'b d8-zoom', step: 2, style: 'height:34vh', alt: 'A shadow of a person on a wall, cast by a pile of scrap'})}
    <div class="lead b" data-step="2">We see the shadow (the data), not what cast it (the latent variable).</div>
    <div class="lead b" data-step="3">We can only infer the cause, and the guess can be wrong.</div>
    <div class="lead b" data-step="4"><b>Models learn a few hidden factors, instead of modeling every pixel.</b></div>
  </div>
  <div class="d8-cite">source: to add</div>
`);

/* 7 (Google slide 8): latent variable models. Shreya (2026-11-11): make it more interesting. Her two families, drawn as
   how each one uses the hidden code z: autoencoders and VAEs learn z by compressing real images; GANs start from a random z
   and learn to turn it into images. Drawn for this deck. */
const LV = `<style>
  .d8-lvsvg{ width:100%; height:100%; display:block; }
  .d8-lvsvg text{ font-family:var(--font); fill:var(--ink); }
</style>`;
const lvDefs = `<defs><marker id="lvA" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#0f172a"/></marker></defs>`;
const lvArr = (x1, y, x2) => `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="#0f172a" stroke-width="2.5" marker-end="url(#lvA)"/>`;
const lvTrap = (x, y, w, h, label, narrowLeft) => { const t = h * .28;
  const pts = narrowLeft ? `${x},${y + t} ${x + w},${y} ${x + w},${y + h} ${x},${y + h - t}` : `${x},${y} ${x + w},${y + t} ${x + w},${y + h - t} ${x},${y + h}`;
  return `<polygon points="${pts}" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/><text x="${x + w / 2}" y="${y + h / 2 + 6}" font-size="17" text-anchor="middle">${label}</text>`; };
const lvImg = (x, y, label) => `<rect x="${x}" y="${y}" width="64" height="64" rx="6" fill="#fff" stroke="#0f172a" stroke-width="2"/>
  <path d="M${x + 10} ${y + 52} L${x + 26} ${y + 30} L${x + 38} ${y + 42} L${x + 46} ${y + 34} L${x + 56} ${y + 52} Z" fill="#94a3b8"/><circle cx="${x + 46}" cy="${y + 18}" r="6" fill="#cbd5e1"/>
  <text x="${x + 32}" y="${y + 86}" font-size="15" text-anchor="middle">${label}</text>`;
const lvZ = (cx, cy, label) => `<circle cx="${cx}" cy="${cy}" r="26" fill="#fde68a" stroke="#0f172a" stroke-width="2.5"/><text x="${cx}" y="${cy + 7}" font-size="21" text-anchor="middle" font-style="italic">z</text>
  <text x="${cx}" y="${cy + 46}" font-size="14" text-anchor="middle">${label}</text>`;
st(`${LV}
  <h1 class="t">Latent variable models</h1>
  <div class="d8-col" style="gap:1.4vh">
    <div style="flex:0 0 auto;height:50vh">
      <svg class="d8-lvsvg" viewBox="0 0 760 360" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${lvDefs}
        <g class="b" data-step="1">
          <text x="10" y="30" font-size="19" font-weight="700">Autoencoders and VAEs</text>
          <text x="10" y="52" font-size="15">learn z by compressing real images</text>
          ${lvImg(40, 72, 'real image')}${lvArr(108, 104, 146)}${lvTrap(150, 64, 120, 80, 'encoder', false)}
          ${lvArr(274, 104, 318)}${lvZ(346, 104, 'small code')}${lvArr(374, 104, 418)}
          ${lvTrap(422, 64, 120, 80, 'decoder', true)}${lvArr(546, 104, 584)}${lvImg(588, 72, 'rebuilt image')}
        </g>
        <line x1="10" y1="190" x2="750" y2="190" stroke="#cbd5e1" stroke-width="2"/>
        <g class="b" data-step="2">
          <text x="10" y="226" font-size="19" font-weight="700">Generative Adversarial Networks (GANs)</text>
          <text x="10" y="248" font-size="15">start from a random z, learn to turn it into images</text>
          ${lvZ(346, 296, 'random noise')}${lvArr(374, 296, 418)}
          ${lvTrap(422, 256, 120, 80, 'generator', true)}${lvArr(546, 296, 584)}${lvImg(588, 264, 'new image')}
        </g>
      </svg>
    </div>
    <div class="lead b" data-step="3" style="text-align:center">Both use a small hidden code <i>z</i>. They differ in how they learn it.</div>
  </div>
`);
}
