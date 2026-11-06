/* PART: transformer (Day 5). Owner: Shreya.
   The four questions: tokenization, attention, self-attention, multi-head attention. 45-minute lecture.
   Concepts follow MIT Vision Book Ch. 26 (CC BY-NC-ND). Fig. 26.7 is reproduced unmodified on the attention slide, at Shreya's
   decision. Every other diagram here is an original simplified drawing that cites the book as its conceptual source.
   Exercise outputs are pasted from a run of notebooks/day05-lab-transformer-exercises.ipynb.
   Instructor answers live only in the git-ignored teacher notebook, never in this public deck.
   No speaker notes on new slides (Shreya's request). The worked example keeps the notes it had.
   The attention map is computed from mean color, as in Fig. 26.12: not learned, and labeled so on the slide. */
{
const trBook = 'https://visionbook.mit.edu/transformers.html';
const trColab = 'https://colab.research.google.com/github/delamarifer/human-machine-perception/blob/main/notebooks/day05-lab-transformer-exercises.ipynb';
const trA = (href, text) => `<a href="${href}" target="_blank" rel="noopener" onclick="event.stopPropagation()" style="color:var(--ink)">${text}</a>`;
const trFig = (id, n) => trA(`${trBook}#${id}`, `Fig. ${n}`);
const trPhoto = 'Photo: Elite Jac, "Goats feeding on leaves in the bush in Kuria East Kenya", CC BY-SA 4.0, cropped and resized';
const INK = '#0f172a', MID = '#64748b', SOFT = '#cbd5e1', PALE = '#f1f5f9';

const trStyle = `<style>
  .transformer-list{ flex:1 1 auto; min-height:0; display:flex; flex-direction:column; justify-content:center; gap:2.4vh; }
  .transformer-two{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1fr 1fr; gap:3vw; align-items:center; }
  .transformer-col{ display:flex; flex-direction:column; gap:1.8vh; justify-content:center; min-height:0; }
  .transformer-img{ width:100%; max-height:58vh; object-fit:contain; display:block; border-radius:8px; }
  .transformer-pair{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1fr 1fr; gap:3vw; align-items:center; }
  .transformer-pair figure{ margin:0; display:flex; flex-direction:column; align-items:center; gap:1vh; text-align:center; min-height:0; }
  .transformer-block{ border-radius:10px; overflow:hidden; border:1px solid ${SOFT}; min-width:0; }
  .transformer-bar{ display:flex; justify-content:space-between; align-items:center; padding:.5vh .9vw; font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
    font-size:clamp(.8rem,1.15vw,1.2rem); }
  .transformer-block.is-code .transformer-bar{ background:#1e293b; color:#cbd5e1; }
  .transformer-block.is-out .transformer-bar{ background:#e2e8f0; color:#334155; }
  .transformer-copy{ font:inherit; color:inherit; background:none; border:1px solid currentColor; border-radius:5px; padding:.1em .6em; cursor:pointer; }
  .transformer-block pre{ margin:0; padding:1.1vh 1vw; white-space:pre; overflow-x:auto; line-height:1.32; }
  .transformer-block code{ font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; font-size:clamp(1rem, 1.9vw, 2.1rem); user-select:text; }
  .transformer-block.is-code pre{ background:${INK}; color:#f8fafc; }
  .transformer-block.is-out pre{ background:${PALE}; color:${INK}; }
  .transformer-formula{ background:#fff; border:2px solid ${INK}; border-radius:10px; padding:1.1vh 1.2vw; text-align:center; font-size:clamp(1.1rem,2.1vw,2.3rem); font-weight:600; font-family:Georgia,'Times New Roman',serif; }
  .transformer-four{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:repeat(4,1fr); gap:1.8vw; align-items:center; text-align:center; }
  .transformer-cover.b{ position:absolute; top:0; right:0; bottom:0; background:#fff; opacity:1; transform:none; transition:opacity .7s ease; }
  .transformer-cover.b.shown{ opacity:0; }
  .tok-kw{ color:#93c5fd; } .tok-str{ color:#fcd34d; } .tok-num{ color:#fdba74; } .tok-fn{ color:#c4b5fd; } .tok-com{ color:#a8bbd0; }
  .transformer-tag{ font-size:clamp(.8rem,1.05vw,1rem); font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:${MID}; }
  .transformer-steps{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:repeat(4,1fr); gap:1.2vw; align-items:stretch; }
  .transformer-step{ border:2px solid ${INK}; border-radius:14px; padding:2vh 1vw; display:flex; flex-direction:column; gap:1.2vh; text-align:center; justify-content:center; }
  .transformer-svg{ width:100%; height:100%; max-height:60vh; display:block; }
  .transformer-svg text{ font-family:var(--font); fill:${INK}; }
</style>`;

/* Real code blocks: <pre><code>, Python syntax highlighting, and a Copy button that does not advance the slide. */
const trEsc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const trPy = src => {
  const re = /(#.*$)|("[^"\n]*"|'[^'\n]*')|\b(def|return|for|in|import|from|lambda|if|else|with|None|True|False)\b|\b(\d+\.?\d*(?:e-?\d+)?)\b|\b([A-Za-z_]\w*)(?=\()/gm;
  let out = '', last = 0;
  for(const m of src.matchAll(re)){
    const cls = m[1] ? 'com' : m[2] ? 'str' : m[3] ? 'kw' : m[4] ? 'num' : 'fn';
    out += trEsc(src.slice(last, m.index)) + `<span class="tok-${cls}">${trEsc(m[0])}</span>`;
    last = m.index + m[0].length;
  }
  return out + trEsc(src.slice(last));
};
const trCopy = `onclick="event.stopPropagation();const b=this;navigator.clipboard.writeText(b.closest('.transformer-block').querySelector('code').textContent).then(()=>{b.textContent='Copied';setTimeout(()=>b.textContent='Copy',1200)})"`;
const trCode = (src, step) => `<div class="transformer-block is-code${step ? ' b' : ''}"${step ? ` data-step="${step}"` : ''}>
  <div class="transformer-bar"><span>Python</span><button class="transformer-copy" type="button" ${trCopy}>Copy</button></div>
  <pre><code class="language-python" onclick="event.stopPropagation()">${trPy(src)}</code></pre></div>`;
const trOut = (src, step) => `<div class="transformer-block is-out${step ? ' b' : ''}"${step ? ` data-step="${step}"` : ''}>
  <div class="transformer-bar"><span>Output</span></div><pre><code>${trEsc(src)}</code></pre></div>`;

/* a generic scene of 6 x 6 tiles: a dark object on a pale background. No photo, no named object. */
const OBJ = new Set(['2,3','3,2','3,3','3,4','4,3']);
const trTiles = ({x0 = 0, y0 = 0, c = 40, pick = () => false, dim = false} = {}) => {
  let s = '';
  for(let r = 0; r < 6; r++) for(let q = 0; q < 6; q++){
    const obj = OBJ.has(`${r},${q}`), on = pick(r, q);
    s += `<rect x="${x0+q*c+1}" y="${y0+r*c+1}" width="${c-2}" height="${c-2}" rx="3" fill="${obj ? INK : r < 2 ? '#e2e8f0' : SOFT}" opacity="${dim && !on ? .22 : 1}" ${on ? `stroke="${MID}" stroke-width="3"` : ''}/>`;
  }
  return s;
};

/* Each exercise is two screens: A = prediction, then code with a comment on each step. B = output, takeaway. Text is sized for the back of the room. */
const trExercise = ({n, title, ask, say, code, code2, code2Head, out, after}) => {
  st(`
    <h1 class="t">Exercise ${n}: ${title}</h1>
    <div class="transformer-col" style="flex:1 1 auto;gap:1.8vh">
      <div class="lead b" data-step="1">${say ? `<b>${say}</b>` : `<span class="transformer-tag">Predict first</span><br><b><i>${ask}</i></b>`}</div>
      ${trCode(code, 2)}
    </div>
    ${cite(trA(trColab, 'Open the notebook in Colab') + ', exercise ' + n)}
  `);
  if(code2) st(`
    <h1 class="t">Exercise ${n}: ${title}</h1>
    <div class="transformer-col" style="flex:1 1 auto;gap:1.8vh">
      <div class="lead b" data-step="1"><b>${code2Head}</b></div>
      ${trCode(code2, 2)}
    </div>
    ${cite(trA(trColab, 'Open the notebook in Colab') + ', exercise ' + n)}
  `, { sub: true, blank: false });
  st(`
    <h1 class="t">Exercise ${n}: ${title}</h1>
    <div class="transformer-col" style="flex:1 1 auto;gap:2.4vh">
      ${trOut(out, 1)}
      <div class="statement b" data-step="2" style="text-align:center"><b>${after}</b></div>
    </div>
    ${cite('Output from the notebook. Weights are random: nothing here is trained.')}
  `, { sub: true, blank: false });
};

/* ---------- Roadmap ---------- */
section('3. Tokenization');

/* The whole pipeline, one stage per question. Schematic: line weights are drawn by hand. */
const trRing = (cx, cy, r, n = 6, nr = 9) => [...Array(n)].map((_, i) => [cx + r*Math.cos(i*2*Math.PI/n - Math.PI/2), cy + r*Math.sin(i*2*Math.PI/n - Math.PI/2), nr]);
const trNodes = (P, on = -1) => P.map((p, i) => `<circle cx="${p[0]}" cy="${p[1]}" r="${p[2]}" fill="${i === on ? INK : '#fff'}" stroke="${MID}" stroke-width="2"/>`).join('');
const trLink = (p, q, w, c = MID) => `<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" stroke="${c}" stroke-width="${w}"/>`;
const trStage = (() => {
  let grid = '';
  for(let i = 1; i < 6; i++){ const t = 12 + i*22; grid += `<line x1="${t}" y1="35" x2="${t}" y2="167" stroke="#fff"/><line x1="12" y1="${23+i*22}" x2="144" y2="${23+i*22}" stroke="#fff"/>`; }
  const one = `<image href="assets/transformer/photo.jpg" x="12" y="35" width="132" height="132"/>${grid}
    ${[0,1,2,3,4].map(i => `<rect x="172" y="${40 + i*26}" width="62" height="16" rx="3" fill="${INK}"/>`).join('')}
    <text x="154" y="108" text-anchor="middle" font-size="20">→</text>`;
  const R = trRing(125, 100, 78), w = [0, 7, 1.5, 4, 1.5, 2.5];
  const two = R.slice(1).map((p, i) => trLink(R[0], p, w[i+1])).join('') + trNodes(R, 0);
  let all = ''; for(let i = 0; i < 6; i++) for(let j = i+1; j < 6; j++) all += trLink(R[i], R[j], 2);
  const three = all + trNodes(R);
  const heads = [[52, 62, [[0,2],[1,4]]], [188, 62, [[0,3],[2,5]]], [120, 150, [[1,3],[4,5]]]].map(([x, y, L]) => {
    const Q = trRing(x, y, 40, 6, 6); return L.map(([a, b]) => trLink(Q[a], Q[b], 4)).join('') + trNodes(Q); }).join('');
  return [one, two, three, heads].map((g, i) => `<svg viewBox="0 0 250 200" style="width:100%;display:block" role="img" aria-label="Stage ${i+1} of the pipeline">${g}</svg>`);
})();
const trAsk = [
  ['Tokenization', 'How do we represent an image as a sequence?'],
  ['Attention', 'How does a token gather relevant information?'],
  ['Self-attention', 'How do tokens build context from one another?'],
  ['Multi-head attention', 'What if we look for different relationships at the same time?'],
];

st(`${trStyle}
  <h1 class="t">Four questions</h1>
  <div class="transformer-four">
    ${trAsk.map(([name, q], i) => `<div class="b" data-step="${i+1}">
      ${trStage[i]}
      <div class="lead" style="margin-top:1vh"><b>${i+1}. ${name}</b></div>
      <div class="label">${q}</div>
    </div>`).join('')}
  </div>
`);

/* ---------- 1. Tokenization (concept of Fig. 26.2, drawn with our photo) ---------- */
const trTokenize = (() => {
  const line = (x, c = SOFT) => `<line x1="${x}" y1="20" x2="${x}" y2="300" stroke="${c}" stroke-width="1"/>`;
  let grid = '';
  for(let i = 1; i < 14; i++){ const p = 20 + i*20; grid += `<line x1="${p}" y1="20" x2="${p}" y2="300" stroke="#fff" stroke-width="1"/><line x1="20" y1="${p}" x2="300" y2="${p}" stroke="#fff" stroke-width="1"/>`; }
  const bars = (x, w, cols, step) => `<g class="b" data-step="${step}">${[0,1,2,3,4,5].map(i =>
    `<rect x="${x}" y="${40 + i*42}" width="${w}" height="24" rx="3" fill="${cols}"/>`).join('')}
    <text x="${x + w/2}" y="${40 + 6*42 + 6}" text-anchor="middle" font-size="26">⋮</text></g>`;
  return `<svg class="transformer-svg" viewBox="0 0 900 376" role="img" aria-label="An image is cut into a grid of patches. Each patch becomes a flat vector, and a learned projection turns it into a token.">
    <image href="assets/transformer/photo.jpg" x="20" y="20" width="280" height="280"/>
    <g class="b" data-step="1">${grid}</g>
    <text x="62" y="330" text-anchor="middle" font-size="20">image</text>
    <text class="b" data-step="1" x="205" y="330" text-anchor="middle" font-size="20">16 × 16 patches</text>
    <text x="160" y="362" text-anchor="middle" font-size="22" font-weight="700">3 × 224 × 224</text>
    ${bars(370, 170, SOFT, 2)}
    <g class="b" data-step="2"><text x="455" y="330" text-anchor="middle" font-size="20">flat patches: 16 × 16 × 3 = 768</text><text x="455" y="362" text-anchor="middle" font-size="22" font-weight="700">N × 768</text></g>
    <g class="b" data-step="3"><text x="605" y="160" text-anchor="middle" font-size="24">W</text><text x="605" y="192" text-anchor="middle" font-size="26">→</text></g>
    ${bars(660, 110, INK, 3)}
    <g class="b" data-step="3"><text x="735" y="330" text-anchor="middle" font-size="20">tokens: 64 is our choice</text><text x="735" y="362" text-anchor="middle" font-size="22" font-weight="700">N × 64</text></g>
  </svg>`;
})();

st(`
  <h1 class="t">How do we represent an image as a sequence?</h1>
  <div style="flex:1 1 auto;min-height:0">${trTokenize}</div>
  <div class="lead b" data-step="4" style="text-align:center"><b>We divide an image into patches and turn each patch into a numerical representation, or token.</b></div>
  ${cite('N = number of patches · Simplified from ' + trFig('fig-transformers-tokenization', '26.2') + ', MIT Vision Book · ' + trPhoto)}
`);

/* Position sits with tokenization: it is part of how tokens are made. Fig. 26.20 is reproduced unmodified (CC BY-NC-ND).
   No token count on these slides: Exercise 1 asks students to predict it. */
st(`
  <h1 class="t">Why do tokens need a position?</h1>
  <div class="transformer-pair">
    <figure class="b" data-step="1"><img class="transformer-img" style="max-height:46vh" src="assets/transformer/photo.jpg" alt="Goats on a green hillside"></figure>
    <figure class="b" data-step="2"><img class="transformer-img" style="max-height:46vh" src="assets/transformer/photo-shuffled.jpg" alt="The same photo with its patches shuffled"></figure>
  </div>
  <div class="lead b" data-step="3" style="text-align:center"><b>Same patches. A list of tokens does not say where each one was.</b></div>
  ${cite(trPhoto + '; right panel shuffled by us')}
`);

st(`
  <h1 class="t">Positional encoding: a code for each place</h1>
  <img class="b" data-step="1" src="assets/visionbook-ch26/positional_codes.png" alt="Figure 26.20: sinusoidal codes across the image; each location gets its own vector of values" style="width:100%;display:block">
  <div class="lead b" data-step="2" style="text-align:center"><b>Each location reads off its own pattern of values.</b></div>
  ${cite(trFig('fig-transformers-positional_codes', '26.20') + ', Torralba, Isola &amp; Freeman, Foundations of Computer Vision (2024). ' + trA('https://creativecommons.org/licenses/by-nc-nd/4.0/', 'CC BY-NC-ND 4.0') + ', reproduced unmodified.')}
`);

trExercise({
  n: 1, title: 'from image to sequence',
  ask: 'A 224 × 224 image, cut into 16 × 16 patches. How many tokens?',
  code: `# image to tensor: (channels, height, width)
x = torch.tensor(np.array(img)).float().permute(2, 0, 1) / 255
P = 16                                    # patch size in pixels
# cut the image into a grid of patches
grid = x.unfold(1, P, P).unfold(2, P, P)
# flatten each patch: one row X per patch
patches = grid.permute(1, 2, 0, 3, 4).reshape(-1, 3 * P * P)
# embed each patch: X W
tokens = nn.Linear(3 * P * P, 64)(patches)
T = tokens + position                     # add position: X W + E_pos`,
  out: `image tensor       (3, 224, 224)
grid of patches    (3, 14, 14, 16, 16)
flattened patches  (196, 768)
embedded tokens    (196, 64)
tokens + position  (196, 64)`,
  after: '14 × 14 = 196 tokens',
});

/* ---------- 2. Attention ---------- */
section('4. Attention');

/* Fig. 26.7 of the book, reproduced unmodified, at Shreya's decision, under CC BY-NC-ND with full credit. The file must not be
   cropped or edited. The white cover over the right panel is a slide build, not a change to the image; its edge was detected
   from the whitespace between the panels. */
st(`
  <h1 class="t">How does a token gather relevant information?</h1>
  <div class="b" data-step="1" style="position:relative;height:60vh;aspect-ratio:2000/1437;margin:0 auto;flex:0 0 auto">
    <img src="assets/transformer/visionbook-fig-26-7.webp" alt="Figure 26.7 of the Vision Book: two questions about a safari photo, each attending to different patches" style="display:block;width:100%;height:100%">
    <div class="transformer-cover b" data-step="2" style="left:49.98%"></div>
  </div>
  <div class="lead b" data-step="3" style="text-align:center"><b>Same tokens, different question, different weights.</b></div>
  ${cite(trFig('fig-transformers-attention_layer_safari_query_cartoon', '26.7') + ', Torralba, Isola &amp; Freeman, Foundations of Computer Vision (2024). ' + trA('https://creativecommons.org/licenses/by-nc-nd/4.0/', 'CC BY-NC-ND 4.0') + ', reproduced unmodified.')}
`);

/* Toy numbers, computed here: weights = softmax(q · k), output = sum of weights × values. Values are gray levels. */
const trQKV = (() => {
  const q = [1,0,1,0], keys = [[1,0,1,0],[1,0,0,0],[0,1,0,1],[0,0,1,0]], vals = [.15,.85,.5,.65];
  const dots = keys.map(k => k.reduce((t, x, i) => t + x*q[i], 0));
  const ex = dots.map(Math.exp), Z = ex.reduce((a, b) => a + b), w = ex.map(e => e/Z);
  const mix = w.reduce((t, a, i) => t + a*vals[i], 0);
  const gray = v => { const g = Math.round(255*v); return `rgb(${g},${g},${g})`; };
  const vec = (v, x, y, c = 24) => v.map((b, i) => `<rect x="${x+i*c}" y="${y}" width="${c-2}" height="${c-2}" rx="3" fill="${b ? INK : '#fff'}" stroke="${MID}" stroke-width="1.5"/>`).join('');
  const rows = [40, 110, 180, 250], qy = 145, kx = 280, vx = 575;
  const head = (x, t, sub, step) => `<g class="b" data-step="${step}"><text x="${x}" y="316" text-anchor="middle" font-size="24" font-weight="700">${t}</text><text x="${x}" y="342" text-anchor="middle" font-size="17">${sub}</text></g>`;
  return `<svg class="transformer-svg" style="max-height:56vh" viewBox="0 0 900 352" role="img" aria-label="A query is compared with four keys. Better matches get larger weights, and the output is the weighted mix of the values.">
    <g class="b" data-step="1">${vec(q, 50, qy)}</g>
    ${head(98, 'Query', 'what a token is looking for', 1)}
    <g class="b" data-step="2">
      ${rows.map((y, i) => `<line x1="150" y1="${qy+11}" x2="${kx-8}" y2="${y+11}" stroke="${MID}" stroke-width="${1 + w[i]*16}"/>${vec(keys[i], kx, y)}
        <text x="${kx+112}" y="${y+18}" font-size="20">${w[i].toFixed(2)}</text>`).join('')}
    </g>
    ${head(kx+48, 'Keys', 'what each token offers', 2)}
    <g class="b" data-step="3">
      ${rows.map((y, i) => `<rect x="${vx}" y="${y-6}" width="44" height="34" rx="4" fill="${gray(vals[i])}" stroke="${MID}" stroke-width="1.5"/>`).join('')}
    </g>
    ${head(vx+22, 'Values', 'what each token contributes', 3)}
    <g class="b" data-step="4">
      ${rows.map((y, i) => `<line x1="${vx+44}" y1="${y+11}" x2="772" y2="${qy+11}" stroke="${MID}" stroke-width="${1 + w[i]*16}"/>`).join('')}
      <rect x="772" y="${qy-22}" width="74" height="66" rx="6" fill="${gray(mix)}" stroke="${INK}" stroke-width="2.5"/>
    </g>
    ${head(809, 'Output', 'weighted mix', 4)}
  </svg>`;
})();

st(`
  <h1 class="t">Query, key, value</h1>
  <div style="flex:1 1 auto;min-height:0">${trQKV}</div>
  <div class="lead b" data-step="5" style="text-align:center"><b>Each token compares itself with other tokens to determine which information to draw from them and how much.</b></div>
  ${cite('Toy numbers: weights are softmax(query · key), and each value is a gray level')}
`);

st(`
  <h1 class="t">Attention in four steps</h1>
  <div class="transformer-steps">
    <div class="transformer-step b" data-step="1"><div class="lead"><b>1. Q Kᵀ</b></div><div class="label">how well each query matches each key</div><code class="m">196 × 196</code></div>
    <div class="transformer-step b" data-step="2"><div class="lead"><b>2. ÷ √d<sub>k</sub></b></div><div class="label">keeps the scores in a workable range</div><code class="m">196 × 196</code></div>
    <div class="transformer-step b" data-step="3"><div class="lead"><b>3. softmax</b></div><div class="label">each row becomes weights that sum to 1</div><code class="m">196 × 196</code></div>
    <div class="transformer-step b" data-step="4"><div class="lead"><b>4. × V</b></div><div class="label">each token becomes a weighted mix of values</div><code class="m">196 × 64</code></div>
  </div>
  <div class="d5-eq b" data-step="5" style="text-align:center">Attention(Q, K, V) = softmax( Q Kᵀ / √d<sub>k</sub> ) V</div>
  ${cite('Vaswani et al. (2017) · MIT Vision Book, Eq. 26.6, where d<sub>k</sub> is written m')}
`);

/* The same function as the Build a Transformer notebook, section 2. */
st(`
  <h1 class="t">Attention by hand</h1>
  <div class="transformer-col" style="flex:1 1 auto;gap:2.2vh">
    ${trCode(`def attention_by_hand(Q, K, V):
    # compare: every query against every key
    scores = Q @ K.transpose(-1, -2)
    # scale: divide by the square root of the key size
    scaled = scores / K.shape[-1] ** 0.5
    # softmax along each row: weights that sum to 1
    weights = torch.softmax(scaled, dim=-1)
    # mix: each output row is a weighted sum of the values
    output = weights @ V
    return output, weights`, 1)}
    <div class="lead b" data-step="2" style="text-align:center"><b>Compare, scale, softmax, mix.</b></div>
  </div>
`);

trExercise({
  n: 2, title: 'attention as a module',
  say: '196 tokens give a 196 × 196 attention matrix.',
  code: `class SingleHeadAttention(nn.Module):

    def __init__(self, embedding_dim, attention_dim):
        super().__init__()
        # three learned projections: the weights a model trains
        self.query = nn.Linear(embedding_dim, attention_dim, bias=False)
        self.key = nn.Linear(embedding_dim, attention_dim, bias=False)
        self.value = nn.Linear(embedding_dim, attention_dim, bias=False)`,
  code2Head: 'What happens to the tokens',
  code2: `    def forward(self, queries_from, tokens):
        # queries from one sequence; keys and values from the other
        q = self.query(queries_from)
        k, v = self.key(tokens), self.value(tokens)
        # Q Kᵀ divided by √d_k: how well each query matches each key
        scores = q @ k.transpose(1, 2) / k.shape[-1] ** 0.5
        # softmax: each row becomes weights that sum to 1
        weights = torch.softmax(scores, dim=-1)
        # A V: each query gets a weighted mix of values
        return weights @ v`,
  out: `tokens in      (1, 196, 64)
1. Q K^T       (196, 196)
2. scaled      (196, 196)
3. softmax     (196, 196)  row 0 sums to 1.0
4. weighted V  (196, 64)
tokens out     (1, 196, 64)`,
  after: 'One weight for every pair of tokens',
});

st(`
  <h1 class="t">Checkpoint: what does one row of the matrix mean?</h1>
  <div class="transformer-steps" style="grid-template-columns:1fr 1fr 1fr;gap:2vw;align-items:center;flex:1 1 auto">
    <figure class="b" data-step="1" style="margin:0;text-align:center"><img class="transformer-img" style="max-height:42vh" src="assets/transformer/attn-matrix.png" alt="A 196 by 196 attention matrix with one row marked"><div class="label">Attention matrix, one row marked</div></figure>
    <figure class="b" data-step="2" style="margin:0;text-align:center"><img class="transformer-img" style="max-height:42vh" src="assets/transformer/attn-query.jpg" alt="The goat photo with the query patch outlined"><div class="label">The query patch</div></figure>
    <figure class="b" data-step="3" style="margin:0;text-align:center"><img class="transformer-img" style="max-height:42vh" src="assets/transformer/attn-map.jpg" alt="The photo, bright where the weights in that row are high"><div class="label">That row, over the patches</div></figure>
  </div>
  <div class="lead b" data-step="4" style="text-align:center"><b>One row: how one token mixes all 196 tokens.</b></div>
  <div class="label b" data-step="1" style="text-align:center">Illustrative: computed from mean color, as in Fig. 26.12. Not learned by a model.</div>
  ${cite('After ' + trFig('fig-transformers-transformers_attn_ex', '26.12') + ', MIT Vision Book · ' + trPhoto)}
`);

st(`
  <h1 class="t">In practice: one library call</h1>
  <div class="transformer-col" style="flex:1 1 auto;gap:1.5vh">
    ${trCode(`# by hand: Q Kᵀ, divide by √d_k
scaled = (Q @ K.T) / K.shape[-1] ** 0.5
# softmax, then A V
out = torch.softmax(scaled, dim=-1) @ V`, 1)}
    ${trCode(`# the library does all of it in one call
library = F.scaled_dot_product_attention(Q, K, V)`, 2)}
    ${trOut(`largest difference from our version: 6.0e-08`, 3)}
  </div>
<div class="lead b" data-step="4" style="text-align:center"><b>Same computation. Learn the math, use the library.</b></div>
`);

/* ---------- 3. Self-attention ---------- */
section('5. Self-attention');

const trBox = (x, y, w, h, t, fill = '#fff', ink = INK, fs = 26) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${fill}" stroke="${INK}" stroke-width="2"/>
   <text x="${x+w/2}" y="${y+h/2+fs*.35}" text-anchor="middle" font-size="${fs}" style="fill:${ink}">${t}</text>`;
const trArrow = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${MID}" stroke-width="3" marker-end="url(#trHead)"/>`;
const trDefs = `<defs><marker id="trHead" markerWidth="9" markerHeight="9" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8z" fill="${MID}"/></marker></defs>`;

st(`
  <h1 class="t">Where do Q, K and V come from?</h1>
  <div style="flex:1 1 auto;min-height:0">
    <svg class="transformer-svg" viewBox="0 0 800 300" role="img" aria-label="One token sequence T is projected three ways into Q, K and V.">
      ${trDefs}
      <g class="b" data-step="1">${trBox(30, 110, 130, 80, 'T', INK, '#fff', 34)}
        <text x="95" y="222" text-anchor="middle" font-size="22">tokens</text>
        <text x="95" y="250" text-anchor="middle" font-size="22" font-weight="700">N × 64</text></g>
      <g class="b" data-step="2">
        ${[40, 150, 260].map((y, i) => trArrow(160, 150, 290, y)).join('')}
        ${trBox(300, 12, 110, 56, 'W_q', PALE)}${trBox(300, 122, 110, 56, 'W_k', PALE)}${trBox(300, 232, 110, 56, 'W_v', PALE)}
      </g>
      <g class="b" data-step="3">
        ${[40, 150, 260].map(y => trArrow(410, y, 530, y)).join('')}
        ${trBox(540, 12, 90, 56, 'Q')}${trBox(540, 122, 90, 56, 'K')}${trBox(540, 232, 90, 56, 'V')}
      </g>
    </svg>
  </div>
  <div class="lead b" data-step="4" style="text-align:center"><b>Queries, keys and values are derived from the same sequence, allowing every token to update its representation using information from the others.</b></div>
  <div class="label b" data-step="5" style="text-align:center">Cross-attention: queries from one sequence, keys and values from another.</div>
  ${cite('Simplified from ' + trFig('fig-transformers-self_attn_layer', '26.9') + ' and ' + trFig('fig-transformers-attn_arch', '26.10') + ', MIT Vision Book')}
`);

/* The idea of Fig. 26.11 on the generic tiles: one patch gathers from patches of the same object. */
const trGather = (() => {
  const c = 44, ctr = (r, q) => [q*c + c/2, r*c + c/2], [qx, qy] = ctr(3, 3);
  const links = [...OBJ].filter(k => k !== '3,3').map(k => { const [r, q] = k.split(',').map(Number), [x, y] = ctr(r, q);
    return `<line x1="${qx}" y1="${qy}" x2="${x}" y2="${y}" stroke="#fff" stroke-width="5"/>`; }).join('');
  return `<svg viewBox="0 0 264 264" style="height:46vh;display:block;margin:0 auto" role="img" aria-label="One tile is linked to the other tiles of the same object.">
    ${trTiles({c})}
    <g class="b" data-step="2">${links}<circle cx="${qx}" cy="${qy}" r="10" fill="#fff"/></g>
  </svg>`;
})();

st(`
  <h1 class="t">How do tokens build context from one another?</h1>
  <div class="transformer-two">
    <div class="b" data-step="1">${trGather}</div>
    <div class="transformer-col">
      <div class="lead b" data-step="1">One patch sees only a piece of the object.</div>
      <div class="lead b" data-step="2">It can read other patches of the same object.</div>
      <div class="lead b" data-step="3"><b>Its new vector describes more than itself.</b></div>
      <div class="label b" data-step="2">Schematic: one way this could work, not a learned map</div>
    </div>
  </div>
  ${cite('After ' + trFig('fig-attention_layer_cartoon', '26.11') + ', MIT Vision Book')}
`);

/* ---------- 4. Multi-head ---------- */
section('6. Multi-head');

st(`
  <h1 class="t">What if we look for different relationships at the same time?</h1>
  <div style="flex:1 1 auto;min-height:0">
    <svg class="transformer-svg" viewBox="0 0 900 300" role="img" aria-label="Tokens go through several attention heads in parallel, are concatenated, and pass through an output projection.">
      ${trDefs}
      <g class="b" data-step="1">${trBox(10, 115, 120, 70, 'Tokens', INK, '#fff', 24)}</g>
      <g class="b" data-step="2">
        ${[35, 150, 265].map(y => trArrow(130, 150, 225, y)).join('')}
        ${trBox(235, 8, 160, 54, 'Head 1', PALE, INK, 23)}${trBox(235, 123, 160, 54, 'Head 2', PALE, INK, 23)}${trBox(235, 238, 160, 54, 'Head H', PALE, INK, 23)}
        <text x="315" y="215" text-anchor="middle" font-size="24">⋮</text>
      </g>
      <g class="b" data-step="3">
        ${[35, 150, 265].map(y => trArrow(395, y, 505, 150)).join('')}
        ${trBox(515, 115, 130, 70, 'Concat', '#fff', INK, 23)}
      </g>
      <g class="b" data-step="4">
        ${trArrow(645, 150, 690, 150)}
        ${trBox(700, 115, 80, 70, 'W_o', PALE, INK, 23)}
        ${trArrow(780, 150, 815, 150)}
        <text x="856" y="158" text-anchor="middle" font-size="23">Output</text>
      </g>
    </svg>
  </div>
  <div class="lead b" data-step="5" style="text-align:center"><b>Multiple attention heads operate in parallel, allowing the model to capture different patterns and relationships between tokens.</b></div>
  <div class="label b" data-step="5" style="text-align:center">Heads can learn different relationships. No head is guaranteed a role with a name.</div>
  ${cite('Original diagram · MIT Vision Book, section 26.6.3')}
`);

trExercise({
  n: 3, title: 'splitting into heads',
  ask: 'D = 64 and H = 4. How big is each head? What shape comes out?',
  code: `d_h = D // H                              # size of each head
# reshape (N, D) into H heads: (H, N, d_h)
split = lambda Z: Z.view(N, H, d_h).transpose(0, 1)
# Q_i, K_i, V_i for every head at once
Q, K, V = split(W_q(T)), split(W_k(T)), split(W_v(T))
# attention in each head, independently
A = torch.softmax(Q @ K.transpose(-1, -2) / d_h ** 0.5, dim=-1)
# Concat(head_1 ... head_H): heads side by side again
concat = (A @ V).transpose(0, 1).reshape(N, D)
final = W_o(concat)                       # project back with W_o`,
  out: `per head Q         (4, 196, 16)
attention per head (4, 196, 196)
output per head    (4, 196, 16)
concatenated       (196, 64)
after projection   (196, 64)`,
  after: 'In real code: nn.MultiheadAttention',
});

/* ---------- The full block (concept of Fig. 26.14, redrawn) ---------- */
section('7. Full picture');

st(`
  <h1 class="t">The Transformer block</h1>
  <div class="transformer-two">
    <svg class="transformer-svg" viewBox="0 0 420 400" role="img" aria-label="Tokens pass through layer norm, multi-head attention and a residual add, then layer norm, an MLP and a residual add. The block repeats L times.">
      ${trDefs}
      <g class="b" data-step="1">
        <rect x="20" y="58" width="290" height="280" rx="14" fill="${PALE}" stroke="${SOFT}" stroke-width="2"/>
        ${trBox(70, 345, 190, 44, 'Tokens', INK, '#fff', 20)}
        ${trArrow(165, 345, 165, 322)}
        ${trBox(55, 268, 220, 50, 'Multi-head attention', '#fff', INK, 19)}
        ${trArrow(165, 268, 165, 240)}
        ${trBox(135, 200, 60, 38, '+', '#fff', INK, 22)}
        <path d="M165 333 H292 V219 H199" fill="none" stroke="${MID}" stroke-width="3" marker-end="url(#trHead)"/>
      </g>
      <g class="b" data-step="2">
        ${trArrow(165, 200, 165, 172)}
        ${trBox(55, 118, 220, 50, 'MLP', '#fff', INK, 19)}
        ${trArrow(165, 118, 165, 104)}
        ${trBox(135, 66, 60, 36, '+', '#fff', INK, 22)}
        <path d="M165 186 H292 V84 H199" fill="none" stroke="${MID}" stroke-width="3" marker-end="url(#trHead)"/>
        ${trArrow(165, 66, 165, 30)}
        <text x="165" y="20" text-anchor="middle" font-size="19">Tokens out</text>
      </g>
      <text class="b" data-step="3" x="330" y="205" font-size="26">× L</text>
    </svg>
    <div class="transformer-col">
      <div class="lead b" data-step="1"><b>Attention</b> mixes tokens.</div>
      <div class="lead b" data-step="2"><b>The MLP</b> transforms each token on its own.</div>
      <div class="label b" data-step="2">MLP (multilayer perceptron): linear layer, nonlinearity, linear layer. The same weights for every token.</div>
      <div class="lead b" data-step="3"><b>Repeat L times.</b></div>
      <div class="label b" data-step="3">Side arrows: residual connections. Layer normalization not shown.</div>
    </div>
  </div>
  ${cite('Simplified from ' + trFig('fig-transformers-ViT_arch', '26.14') + ', MIT Vision Book')}
`);
}
