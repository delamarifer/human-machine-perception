/* PART: autoregressive (Day 8). Google deck "Day 8 - Generative Modeling", slides 39-46, with the Recap (owner: Shreya).
   Shreya (2026-11-11): the autoregressive slides should not be screenshots of the lecture slides; pull the information out
   and drop that background. So every diagram here is ours, in HTML, SVG and LaTeX, built click by click:
   the predictor, training pairs and a learner, sampling with a loop, the chain rule, a next-word classifier, the same idea
   for pixels, the cross-entropy score, and pixel-by-pixel training and sampling. The example sentences follow the Google
   slides. The pixel image, the color palette and every bar length are a schematic (labeled on the slides), not model output.
   Comments applied: 42 each formula comes in separately; 43 the example in text and in images. No speaker notes. */
{
section('Autoregressive');

/* ---------- shared pieces ---------- */
const AR_CSS = `<style>
  .d8-ar-row{ display:flex; align-items:center; justify-content:center; gap:1.2vw; flex-wrap:wrap; flex:0 0 auto; }
  .d8-ar-box{ border:2px solid var(--ink); border-radius:10px; padding:1.4vh 1.4vw; font-size:clamp(1rem, 1.7vw, 1.55rem); background:#fff; }
  .d8-ar-arr{ font-size:clamp(1.3rem, 2.4vw, 2.1rem); line-height:1; }
  .d8-ar-mono{ font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; font-size:clamp(.95rem, 1.55vw, 1.4rem); }
  .d8-ar-out{ font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; font-size:clamp(1.05rem, 1.8vw, 1.6rem); font-weight:700;
    border-bottom:3px solid var(--ink); padding:0 .4vw; }
  .d8-ar-pairs{ border-collapse:collapse; }
  .d8-ar-pairs td, .d8-ar-pairs th{ padding:.35vh .9vw; font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
    font-size:clamp(.85rem, 1.35vw, 1.25rem); text-align:left; }
  .d8-ar-pairs th{ font-family:inherit; border-bottom:2px solid var(--ink); }
  .d8-ar-pairs td + td{ border-left:2px solid var(--ink); font-weight:700; }
  .d8-ar-side{ writing-mode:vertical-rl; transform:rotate(180deg); font-weight:700; color:var(--mute); font-size:clamp(.85rem, 1.3vw, 1.2rem); }
  .d8-ar-block{ display:flex; align-items:center; gap:1.4vw; border:1px solid var(--line); border-radius:12px; padding:1.4vh 1.4vw; background:#f8fafc; }
  .d8-ar-svg{ width:100%; height:100%; display:block; }
  .d8-ar-svg text{ font-family:var(--font); fill:var(--ink); }
</style>`;
const ARR = '<span class="d8-ar-arr">⟶</span>';
const PAIRS = [['Once upon a', 'time'], ['There and back', 'again'], ['The slow brown', 'fox'], ['To be or not to', 'be']];
const pairsTable = () => `<table class="d8-ar-pairs">
  <tr><th>${d8Tex('x_1, \\dots, x_{n-1}')}</th><th>${d8Tex('x_n')}</th></tr>
  ${PAIRS.map(([a, b]) => `<tr><td>${a}</td><td>${b}</td></tr>`).join('')}
  <tr><td>⋮</td><td>⋮</td></tr></table>`;

/* a schematic 6 x 6 "image" and its palette (letters -> colors) */
const PAL = {w: '#ffffff', l: '#cbd5e1', g: '#94a3b8', d: '#475569', o: '#c2410c', y: '#d4a017', t: '#14b8a6', b: '#2563eb'};
const KEYS = ['w', 'l', 'g', 'd', 'o', 'y', 't', 'b'];
const IMG = ['wwwwwg', 'wwwwgd', 'wwwgdo', 'wwgdod', 'wgddgo', 'gdoddd'].join('');
const IMG2 = ['wwwwww', 'wwwbbw', 'wwbbbt', 'wbbtbw', 'wwbbww', 'wwwgww'].join('');
/* grid: the first k pixels of img are known; cur = index of the pixel being predicted (dashed outline) */
const grid = (img, k, x, y, s = 18, cur = -1) => `<g transform="translate(${x},${y})">
  ${img.split('').map((c, i) => { const cx = (i % 6) * s, cy = Math.floor(i / 6) * s, known = i < k;
    return `<rect x="${cx}" y="${cy}" width="${s}" height="${s}" fill="${known ? PAL[c] : '#f8fafc'}" stroke="${known ? '#0f172a' : '#cbd5e1'}" stroke-width="1"/>`; }).join('')}
  ${cur >= 0 ? `<rect x="${(cur % 6) * s}" y="${Math.floor(cur / 6) * s}" width="${s}" height="${s}" fill="none" stroke="#0f172a" stroke-width="3" stroke-dasharray="4 3"/>` : ''}
</g>`;
/* bars over the palette: swatch, then a bar of length v * w */
const PROBS = [0.04, 0.08, 0.14, 0.12, 0.42, 0.10, 0.05, 0.05];   /* schematic */
const bars = (vals, x, y, w = 120, h = 14, gap = 6) => vals.map((v, i) =>
  `<rect x="${x}" y="${y + i * (h + gap)}" width="${h}" height="${h}" fill="${PAL[KEYS[i]]}" stroke="#0f172a" stroke-width="1"/>
   <rect x="${x + h + 8}" y="${y + i * (h + gap) + 2}" width="${(w * v).toFixed(1)}" height="${h - 4}" fill="#0f172a"/>`).join('');
const arrow = (x1, y1, x2, y2, id) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#0f172a" stroke-width="2.5" marker-end="url(#${id})"/>`;
const defs = id => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#0f172a"/></marker></defs>`;
const svgBox = (x, y, w, h, label) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="#fff" stroke="#0f172a" stroke-width="2"/><text x="${x + w / 2}" y="${y + h / 2 + 6}" font-size="17" text-anchor="middle">${label}</text>`;

/* 39 */
st(`
  <h1 class="t">Autoregressive Models</h1>
  <div class="d8-col" style="gap:2.4vh">
    <div class="b" data-step="1" style="flex:0 0 auto;height:34vh">${d8TitleArt('ar')}</div>
    <div class="statement b" data-step="2" style="text-align:center">Generate one piece at a time, each from the pieces before it.</div>
  </div>
`);

/* 40: main idea. Her two lines; the predictor fills a blank; then where the predictor comes from (pairs -> learner) */
st(`${AR_CSS}
  <h1 class="t">Main idea</h1>
  <div class="d8-col" style="gap:2.2vh">
    <div class="lead b" data-step="1">Sequential content generation</div>
    <div class="lead b" data-step="2">Predicts next element based on previous element</div>
    <div class="d8-ar-row b" data-step="3">
      <span class="d8-ar-mono">Once upon ____</span>${ARR}<span class="d8-ar-box">Predictor</span>${ARR}
      <span class="d8-ar-out b" data-step="4">a</span>
    </div>
    <div class="d8-ar-row b" data-step="5">
      ${pairsTable()}${ARR}<span class="d8-ar-box">Learner</span>${ARR}<span class="d8-ar-box">Predictor</span>
    </div>
  </div>
`);

/* 41: how it works. Training, then sampling, then the loop: append the prediction and predict again */
st(`${AR_CSS}
  <h1 class="t">How it works</h1>
  <div class="d8-col" style="gap:2vh">
    <div class="d8-ar-block b" data-step="1">
      <span class="d8-ar-side">Training</span>${pairsTable()}${ARR}<span class="d8-ar-box">Learner</span>${ARR}<span class="d8-ar-box">Predictor</span>
    </div>
    <div class="d8-ar-block b" data-step="2">
      <span class="d8-ar-side">Sampling</span>
      <div style="display:flex;flex-direction:column;gap:1.2vh">
        <div class="d8-ar-row" style="justify-content:flex-start">
          <span class="d8-ar-mono">Colorless green ideas sleep</span>${ARR}<span class="d8-ar-box">Predictor</span>${ARR}<span class="d8-ar-out">furiously</span>
        </div>
        <div class="d8-ar-row b" data-step="3" style="justify-content:flex-start">
          <span class="d8-ar-mono">Colorless green ideas sleep <b>furiously</b></span>${ARR}<span class="d8-ar-box">Predictor</span>${ARR}<span class="d8-ar-out">.</span>
        </div>
        <div class="label b" data-step="3">Append the prediction to the input and predict again, one element at a time.</div>
      </div>
    </div>
  </div>
`);

/* 42: the probability model, one formula per click (her comment) */
st(`
  <h1 class="t">Probability Model</h1>
  <div class="d8-col" style="gap:2.4vh">
    <div class="d8-math b">${d8Tex('p(\\mathbf{X}) = p(x_n \\mid x_1, \\dots, x_{n-1})\\; p(x_{n-1} \\mid x_1, \\dots, x_{n-2}) \\cdots p(x_2 \\mid x_1)\\; p(x_1)', true)}</div>
    <div class="d8-math b">${d8Tex('p(\\mathbf{X}) = \\prod_{i=1}^{n} p(x_i \\mid x_1, \\dots, x_{i-1})', true)}</div>
    <div class="d8-math b">${d8Tex('p(\\text{Once upon a time}) = p(\\text{Once})\\; p(\\text{upon} \\mid \\text{Once})\\; p(\\text{a} \\mid \\text{Once, upon})\\; p(\\text{time} \\mid \\text{Once, upon, a})', true)}</div>
  </div>
`);

/* 43: the example in text (a next-word classifier), then the same idea for pixels (her comment). All bars schematic. */
st(`${AR_CSS}
  <style>
    .d8-nw{ display:grid; grid-template-columns:auto 1fr; gap:.6vh 1vw; align-items:center; width:min(30vw, 100%); }
    .d8-nw .w{ font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; font-size:clamp(.9rem, 1.4vw, 1.3rem); text-align:right; }
    .d8-nw .bar{ height:1.6vh; background:var(--ink); border-radius:3px; }
  </style>
  <h1 class="t">Next word, next pixel</h1>
  <div class="d8-col" style="gap:1.6vh">
    <div class="lead b" data-step="1" style="text-align:center">How to model ${d8Tex('p(\\text{time} \\mid \\text{Once, upon, a})')}? Treat it as a next-word classifier.</div>
    <div class="d8-ar-row b" data-step="2">
      <span class="d8-ar-mono">Once upon a</span>${ARR}<span class="d8-ar-box"><i>f</i></span>${ARR}
      <div class="d8-nw">${[['year', 6], ['time', 72], ['day', 9], ['elephant', 3], ['…', 0]].map(([w, v]) => `<div class="w">${w}</div><div><div class="bar" style="width:${v}%"></div></div>`).join('')}</div>
    </div>
    <div style="flex:0 0 auto;height:30vh" class="b" data-step="3">
      <svg class="d8-ar-svg" viewBox="0 0 760 210" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${defs('arP')}
        ${grid(IMG, 21, 20, 40, 22, 21)}
        <text x="86" y="28" font-size="15" text-anchor="middle">pixels so far</text>
        ${arrow(160, 106, 210, 106, 'arP')}
        ${svgBox(215, 80, 70, 52, '<tspan font-style="italic">f</tspan><tspan font-size="12" baseline-shift="sub">θ</tspan>')}
        ${arrow(290, 106, 330, 106, 'arP')}
        <g class="b" data-step="4">${bars(PROBS, 340, 26, 150)}<text x="430" y="196" font-size="14" text-anchor="middle">a probability for each color</text></g>
        <g class="b" data-step="5">${arrow(560, 106, 610, 106, 'arP')}<text x="585" y="94" font-size="14" text-anchor="middle">sample</text>
          <rect x="625" y="92" width="28" height="28" fill="${PAL.o}" stroke="#0f172a" stroke-width="2"/>
          <text x="690" y="111" font-size="14">place it, repeat</text></g>
      </svg>
    </div>
    <div class="label" style="text-align:center">Bars, pixels and colors: a schematic, not model output.</div>
  </div>
`);

/* 44: training is classification. The prediction, the one-hot ground truth, their elementwise product, then the loss */
st(`${AR_CSS}
  <h1 class="t">Training: score the prediction</h1>
  <div class="d8-col" style="gap:1.4vh">
    <div style="flex:0 0 auto;height:38vh">
      <svg class="d8-ar-svg" viewBox="0 0 780 230" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${defs('arT')}
        <g class="b" data-step="1">${grid(IMG, 21, 10, 50, 20, 21)}${arrow(135, 110, 175, 110, 'arT')}${svgBox(180, 86, 60, 48, '<tspan font-style="italic">f</tspan><tspan font-size="12" baseline-shift="sub">θ</tspan>')}${arrow(245, 110, 285, 110, 'arT')}
          <text x="350" y="20" font-size="15" text-anchor="middle">prediction</text>${bars(PROBS, 295, 34, 130)}</g>
        <g class="b" data-step="2"><text x="525" y="20" font-size="15" text-anchor="middle">ground truth</text>${bars([0, 0, 0, 0, 1, 0, 0, 0], 470, 34, 90)}</g>
        <g class="b" data-step="3"><text x="690" y="20" font-size="15" text-anchor="middle">truth × log prediction</text>
          ${KEYS.map((k, i) => `<rect x="640" y="${34 + i * 20}" width="14" height="14" fill="${PAL[k]}" stroke="#0f172a" stroke-width="1"/>`).join('')}
          <rect x="662" y="${34 + 4 * 20 + 2}" width="${(60 * Math.abs(Math.log(0.42))).toFixed(1)}" height="10" fill="#0f172a"/>
          <text x="${662 + 60 * Math.abs(Math.log(0.42)) + 6}" y="${34 + 4 * 20 + 12}" font-size="13">log 0.42</text></g>
      </svg>
    </div>
    <div class="d8-math b" data-step="4">${d8Tex('\\mathcal{L} = -\\sum_{k} x_{n,k}\\, \\log \\hat{x}_{n,k}', true)}<div class="label">Cross-entropy: the one-hot ground truth picks out the log probability of the right color. Numbers are a schematic.</div></div>
  </div>
`);

/* 45: pixels. Training on images read pixel by pixel; then sampling a new image one pixel at a time */
st(`${AR_CSS}
  <h1 class="t">Pixels: training, then sampling</h1>
  <div class="d8-col" style="gap:1.4vh">
    <div class="d8-ar-block b" data-step="1" style="justify-content:center">
      <span class="d8-ar-side">Training</span>
      <svg viewBox="0 0 300 150" style="height:17vh;width:auto" aria-hidden="true">
        ${grid(IMG, 21, 10, 10, 20, 21)}<text x="148" y="78" font-size="18">,</text>
        <rect x="165" y="${10 + 3 * 20}" width="20" height="20" fill="${PAL[IMG[21]]}" stroke="#0f172a" stroke-width="2"/>
        ${grid(IMG2, 16, 200, 10, 15, 16)}<text x="200" y="140" font-size="12">⋮ many images</text>
      </svg>${ARR}<span class="d8-ar-box">Learner</span>${ARR}<span class="d8-ar-box">Predictor</span>
    </div>
    <div class="d8-ar-block b" data-step="2" style="justify-content:center">
      <span class="d8-ar-side">Sampling</span>
      <svg viewBox="0 0 640 140" style="height:17vh;width:auto" aria-hidden="true">${defs('arS')}
        ${grid(IMG2, 9, 10, 10, 20, 9)}
        ${arrow(135, 70, 175, 70, 'arS')}${svgBox(180, 46, 110, 48, 'Predictor')}${arrow(295, 70, 335, 70, 'arS')}
        ${grid(IMG2, 10, 340, 10, 20)}
        <g class="b" data-step="3">${arrow(465, 70, 505, 70, 'arS')}<text x="485" y="58" font-size="13" text-anchor="middle">repeat</text>${grid(IMG2, 36, 510, 10, 20)}</g>
      </svg>
    </div>
    <div class="label b" data-step="3" style="text-align:center">Each new pixel is fed back in, until the whole image is generated. Pixels are a schematic.</div>
  </div>
`);

/* 46: recap, one family per click */
st(`
  <style>
    .d8-recap{ border-collapse:collapse; width:100%; font-size:clamp(.85rem, 1.3vw, 1.2rem); }
    .d8-recap th, .d8-recap td{ text-align:left; padding:1.1vh .9vw; border-top:1px solid var(--line); vertical-align:top; line-height:1.3; }
    .d8-recap th{ background:#0f172a; color:#f8fafc; border-top:none; }
    .d8-recap td:first-child{ font-weight:700; white-space:nowrap; }
  </style>
  <h1 class="t">Recap</h1>
  <div class="d8-col">
    <table class="d8-recap">
      <tr><th>Family</th><th>How it makes an image</th><th>Trained with</th><th>Strength</th><th>Watch out</th></tr>
      <tr class="b"><td>Autoencoder</td><td>Decode a code</td><td>Reconstruction loss</td><td>Compression, denoising</td><td>Gaps in the code space; not reliable to sample</td></tr>
      <tr class="b"><td>VAE</td><td>Decode a sample from ${d8Tex('\\mathcal{N}(0, I)')}</td><td>Reconstruction + KL</td><td>Smooth, complete latent space</td><td>Samples can be blurry</td></tr>
      <tr class="b"><td>GAN</td><td>Generator maps noise to an image in one step</td><td>Min-max game with a discriminator</td><td>Sharp samples</td><td>Training can be unstable</td></tr>
      <tr class="b"><td>Autoregressive</td><td>Predict the next element, one at a time</td><td>Next-element classification (cross-entropy)</td><td>Exact likelihood</td><td>Slow sampling, one step at a time</td></tr>
    </table>
  </div>
`);
}
