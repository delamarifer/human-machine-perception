/* PART: cnn-limits (Day 5). Owner: Shreya.
   Part 2 opener: the transition from CNNs to Transformers.
   Source: MIT Vision Book, section 26.2, "A Limitation of CNNs: Independence between Far Apart Patches"
   (https://visionbook.mit.edu/transformers.html).
   Iris positions were detected from the photo's pixels, not placed by eye. */
{
section('2. From CNNs');

const CL_AMBER = 'rgb(217,153,26)', CL_BLUE = 'rgb(51,128,230)';   /* the demo's two eye colors, nothing else */

const clStyle = `<style>
  .cnnlim-two{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1.05fr 1fr; gap:3vw; align-items:center; }
  .cnnlim-two .fig{ height:100%; min-height:0; }
  .cnnlim-col{ display:flex; flex-direction:column; gap:2.2vh; justify-content:center; min-height:0; }
  .cnnlim-eyes{ display:grid; grid-template-columns:1fr 1fr; gap:1.4vw; }
  .cnnlim-eyes figure{ margin:0; text-align:center; }
  .cnnlim-eyes img{ width:100%; max-height:27vh; object-fit:contain; display:block; border-radius:8px; }
  .cnnlim-net{ width:100%; height:100%; max-height:62vh; display:block; }
  .cnnlim-net text{ font-family:var(--font); fill:var(--ink); }
  .cnnlim-code, .cnnlim-out{ margin:0; padding:1.4vh 1.4vw; border-radius:12px; white-space:pre; overflow:hidden;
    font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; font-size:clamp(.8rem, 1.2vw, 1.15rem); line-height:1.42; }
  .cnnlim-code{ background:#0f172a; color:#f8fafc; }
  .cnnlim-out{ background:#f1f5f9; border:1px solid #cbd5e1; color:#0f172a; }
  .cnnlim-heat{ border-collapse:separate; border-spacing:3px; width:100%; table-layout:fixed; }
  .cnnlim-heat td, .cnnlim-heat th{ text-align:center; padding:1.1vh 0; font-size:clamp(.85rem, 1.3vw, 1.25rem); font-weight:600; border-radius:4px; }
  .cnnlim-heat th{ font-weight:600; color:var(--ink); }
  .cnnlim-heat td.reach{ box-shadow:inset 0 0 0 3px transparent; transition:box-shadow .6s ease; }
  .cnnlim-grid2{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1fr 1fr; gap:2vw; align-items:stretch; }
  .cnnlim-grid2 ul{ margin:.6vh 0 0 1.2em; padding:0; display:flex; flex-direction:column; gap:.9vh; }
  .cnnlim-photo{ position:relative; height:100%; max-height:66vh; aspect-ratio:1858/1565; max-width:100%; margin:0 auto; }
  .cnnlim-photo img, .cnnlim-photo svg{ position:absolute; inset:0; width:100%; height:100%; border-radius:8px; }
  .cnnlim-big{ font-size:clamp(3rem, 6.4vw, 6rem); font-weight:700; line-height:1; }
  .cnnlim-pair{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1fr 1fr; gap:4vw; align-items:center; }
  .cnnlim-pair figure{ margin:0; display:flex; flex-direction:column; align-items:center; gap:1.4vh; text-align:center; }
  .cnnlim-stim{ height:44vh; aspect-ratio:1; image-rendering:pixelated; border-radius:6px; display:block; }
</style>`;

/* ---------- The question ---------- */
const CL_A = {cx:.3436, cy:.5610}, CL_B = {cx:.6292, cy:.5243};     /* detected iris centers, 0..1 */
const clAx = CL_A.cx*1858, clAy = CL_A.cy*1565, clBx = CL_B.cx*1858, clBy = CL_B.cy*1565;
const CL_PX = 1565/224;                                              /* photo pixels per pixel at the 224 scale */
const clPhoto = (svg = '') => `<div class="cnnlim-photo">
  <img src="assets/cnn-limits/june-odd-eyed-cat.jpg" alt="White cat with one amber eye and one blue eye">
  <svg viewBox="0 0 1858 1565" aria-hidden="true">${svg}</svg></div>`;
const clCredit = 'Photo: Keith Kissel, "June odd-eyed-cat" (cropped), CC BY 2.0, via Wikimedia Commons';

st(`${clStyle}
  <h1 class="t">Do the two eyes match?</h1>
  <div class="cnnlim-two">
    <div class="b" data-step="1" style="height:100%;min-height:0">${clPhoto()}</div>
    <div class="cnnlim-col">
      <div class="cnnlim-eyes b" data-step="2">
        <figure><img src="assets/cnn-limits/eye-amber.jpg" alt="Crop of the amber eye"></figure>
        <figure><img src="assets/cnn-limits/eye-blue.jpg" alt="Crop of the blue eye"></figure>
      </div>
      <div class="statement b" data-step="3"><b>Neither patch alone holds the answer.</b></div>
    </div>
  </div>
  ${cite(clCredit)}
`);

/* ---------- Figure 26.1 ---------- */
/* ---------- Slide 2: Figure 26.1, redrawn, with connections computed ---------- */
const clNet = (() => {
  const N = 7, rows = [250, 150, 50], X = i => 60 + i*80;
  const reach = (i, l) => { const out = []; for(let j = 0; j < N; j++) if(Math.abs(i - j) <= l) out.push(j); return out; };
  const edges = (from, l, color, cls, step) => {
    let s = '';
    for(let layer = 1; layer <= 2; layer++)
      for(const a of reach(from, layer - 1))
        for(let b = a - 1; b <= a + 1; b++)
          if(b >= 0 && b < N)
            s += `<line x1="${X(a)}" y1="${rows[layer-1]}" x2="${X(b)}" y2="${rows[layer]}" stroke="${color}" stroke-width="4"/>`;
    return `<g class="b" data-step="${step}">${s}${[1,2].map(l2 => reach(from, l2).map(j =>
      `<circle cx="${X(j)}" cy="${rows[l2]}" r="17" fill="${color}"/>`).join('')).join('')}
      <circle cx="${X(from)}" cy="${rows[0]}" r="17" fill="${color}"/></g>`;
  };
  let base = '';
  for(let r = 0; r < 2; r++) for(let i = 0; i < N; i++) for(let j = i-1; j <= i+1; j++)
    if(j >= 0 && j < N) base += `<line x1="${X(i)}" y1="${rows[r]}" x2="${X(j)}" y2="${rows[r+1]}" stroke="#cbd5e1" stroke-width="1.5"/>`;
  for(const y of rows) for(let i = 0; i < N; i++) base += `<circle cx="${X(i)}" cy="${y}" r="17" fill="#fff" stroke="#64748b" stroke-width="2"/>`;
  for(let i = 0; i < N; i++) base += `<text x="${X(i)}" y="296" text-anchor="middle" font-size="24">x${'₁₂₃₄₅₆₇'[i]}</text>`;
  const rowLabels = ['input','layer 1','layer 2'].map((t, i) => `<text x="600" y="${rows[i]+8}" font-size="22">${t}</text>`).join('');
  return `<svg class="cnnlim-net" viewBox="20 20 680 290" role="img" aria-label="Seven inputs, two layers with kernel size 3. The neurons reached by x1 and by x7 do not overlap.">
    <g class="b" data-step="1">${base}${rowLabels}</g>
    ${edges(0, 2, CL_AMBER, '', 2)}
    ${edges(6, 2, CL_BLUE, '', 3)}
  </svg>`;
})();

st(`
  <h1 class="t">Is any neuron connected to both?</h1>
  <div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;align-items:center;gap:1.6vh">
    <div style="flex:1 1 auto;min-height:0;width:100%">${clNet}</div>
    <div class="statement b" data-step="4"><b>No neuron is connected to both.</b></div>
  </div>
  ${cite('After Fig. 26.1, MIT Vision Book Ch. 26 (visionbook.mit.edu/transformers.html)')}
`);

/* ---------- To scale on the photo. 5x5 window of two 3x3 layers; pupils detected from the image, 76 px apart at 224 ---------- */
const clW = 5*CL_PX;
st(`
  <h1 class="t">How far can two layers see?</h1>
  <div class="cnnlim-two">
    <div style="height:100%;min-height:0">${clPhoto(`
      <line class="b" data-step="2" x1="${clAx}" y1="${clAy}" x2="${clBx}" y2="${clBy}" stroke="#fff" stroke-width="10" stroke-dasharray="26 18"/>
      <rect class="b" data-step="1" x="${clAx - clW/2}" y="${clAy - clW/2}" width="${clW}" height="${clW}" fill="#fff" stroke="#0f172a" stroke-width="7"/>`)}</div>
    <div class="cnnlim-col" style="gap:4vh">
      <div class="b" data-step="1"><div class="cnnlim-big">5 pixels</div><div class="lead">what one neuron sees</div></div>
      <div class="b" data-step="2"><div class="cnnlim-big">76 pixels</div><div class="lead">between the eyes</div></div>
    </div>
  </div>
  ${cite('Photo resized to 224 pixels, window drawn to scale · ' + clCredit)}
`);

/* ---------- The two options in section 26.2. A kernel reaching both pupils spans 77 pixels; 2L + 1 = 77 gives L = 38 ---------- */
const clK = 77*CL_PX, clMx = (clAx + clBx)/2, clMy = (clAy + clBy)/2;
const clStack = `<svg viewBox="0 0 400 300" style="width:100%;height:100%;display:block" role="img" aria-label="A stack of 38 layers">
  ${[...Array(38)].map((_, i) => `<rect x="40" y="${4 + i*7.75}" width="320" height="5" rx="2" fill="#64748b"/>`).join('')}</svg>`;

st(`
  <h1 class="t">A convolution has two ways to reach farther</h1>
  <div class="cnnlim-pair">
    <figure class="b" data-step="1">
      <div style="height:40vh;width:100%">${clPhoto(`<rect x="${clMx - clK/2}" y="${clMy - clK/2}" width="${clK}" height="${clK}" fill="none" stroke="#fff" stroke-width="12"/>`)}</div>
      <div class="lead"><b>A larger kernel</b></div>
      <div class="label">77 × 77, not 3 × 3</div>
    </figure>
    <figure class="b" data-step="2">
      <div style="height:40vh;width:70%">${clStack}</div>
      <div class="lead"><b>More layers</b></div>
      <div class="label">38 layers of 3 × 3, at stride 1</div>
    </figure>
  </div>
  ${cite('MIT Vision Book, section 26.2 · ' + clCredit)}
`);

}
