/* PART: attention (Day 5 Plan B). Owner: Fernanda. Video 2:53 to 3:17: what attention does.
   The second slide (one score computed) goes beyond the video: it spells out the computation the video
   only names. Symbols only, no values.
   Between them: Shreya's "Query, key, value" slide (Day 5 main deck, slide 15, day05/parts/transformer.js),
   copied here at Fernanda's request with its on-screen wording unchanged; classes renamed to planb-.
   Its toy numbers are computed below exactly as in her slide: weights = softmax(q · k), output = sum of weights × values. */
{
section('2. Attention');
sc('planbAttend', 'scenes/planb-attend.html');

/* ---- Shreya's slide 15, copied ---- */
const pbINK = '#0f172a', pbMID = '#64748b';
const pbQKV = (() => {
  const q = [1,0,1,0], keys = [[1,0,1,0],[1,0,0,0],[0,1,0,1],[0,0,1,0]], vals = [.15,.85,.5,.65];
  const dots = keys.map(k => k.reduce((t, x, i) => t + x*q[i], 0));
  const ex = dots.map(Math.exp), Z = ex.reduce((a, b) => a + b), w = ex.map(e => e/Z);
  const mix = w.reduce((t, a, i) => t + a*vals[i], 0);
  const gray = v => { const g = Math.round(255*v); return `rgb(${g},${g},${g})`; };
  const vec = (v, x, y, c = 24) => v.map((b, i) => `<rect x="${x+i*c}" y="${y}" width="${c-2}" height="${c-2}" rx="3" fill="${b ? pbINK : '#fff'}" stroke="${pbMID}" stroke-width="1.5"/>`).join('');
  const rows = [40, 110, 180, 250], qy = 145, kx = 280, vx = 575;
  const head = (x, t, sub, step) => `<g class="b" data-step="${step}"><text x="${x}" y="316" text-anchor="middle" font-size="24" font-weight="700">${t}</text><text x="${x}" y="342" text-anchor="middle" font-size="17">${sub}</text></g>`;
  return `<svg class="planb-qkv-svg" viewBox="0 0 900 352" role="img" aria-label="A query is compared with four keys. Better matches get larger weights, and the output is the weighted mix of the values.">
    <g class="b" data-step="1">${vec(q, 50, qy)}</g>
    ${head(98, 'Query', 'what a token is looking for', 1)}
    <g class="b" data-step="2">
      ${rows.map((y, i) => `<line x1="150" y1="${qy+11}" x2="${kx-8}" y2="${y+11}" stroke="${pbMID}" stroke-width="${1 + w[i]*16}"/>${vec(keys[i], kx, y)}
        <text x="${kx+112}" y="${y+18}" font-size="20">${w[i].toFixed(2)}</text>`).join('')}
    </g>
    ${head(kx+48, 'Keys', 'what each token offers', 2)}
    <g class="b" data-step="3">
      ${rows.map((y, i) => `<rect x="${vx}" y="${y-6}" width="44" height="34" rx="4" fill="${gray(vals[i])}" stroke="${pbMID}" stroke-width="1.5"/>`).join('')}
    </g>
    ${head(vx+22, 'Values', 'what each token contributes', 3)}
    <g class="b" data-step="4">
      ${rows.map((y, i) => `<line x1="${vx+44}" y1="${y+11}" x2="772" y2="${qy+11}" stroke="${pbMID}" stroke-width="${1 + w[i]*16}"/>`).join('')}
      <rect x="772" y="${qy-22}" width="74" height="66" rx="6" fill="${gray(mix)}" stroke="${pbINK}" stroke-width="2.5"/>
    </g>
    ${head(809, 'Output', 'weighted mix', 4)}
  </svg>`;
})();

st(`<style>
  .planb-qkv-svg{ width:100%; height:100%; max-height:56vh; display:block; }
  .planb-qkv-svg text{ font-family:var(--font); fill:${pbINK}; }
</style>
  <h1 class="t">Query, key, value</h1>
  <div style="flex:1 1 auto;min-height:0">${pbQKV}</div>
  <div class="lead b" data-step="5" style="text-align:center"><b>Each token compares itself with other tokens to determine which information to draw from them and how much.</b></div>
  ${cite('Toy numbers: weights are softmax(query · key), and each value is a gray level · slide by Shreya Pandit, Day 5')}
`, { notes: [
  "(draft) Title only. The video names the query, key and value but never shows what attention does with them. This slide, from Shreya's Day 5 lecture, shows it with toy numbers small enough to follow.",
  "(draft) Start with one token's query: a short vector that stands for what this token is looking for.",
  "(draft) Compare the query with the key of every token, here four of them. The better a key matches the query, the larger its weight; a softmax turns the matches into weights that add up to 1. Here 0.53 for the best match, 0.20, 0.07 and 0.20 for the others. These are toy numbers, computed on the slide.",
  "(draft) Each token also carries a value, what it contributes if someone attends to it. Here each value is just a gray level, so we can see the mixing.",
  "(draft) The output is the values mixed by those weights: thick lines count a lot, thin lines a little. So the output gray is mostly the first value, with a little of the others.",
  "(draft) That is attention in one sentence: each token compares itself with the other tokens to decide which information to draw from them, and how much. For our image, the tokens are the 64 patches. Next, the same thing written as equations."
]});

st(`<style>
  .planb-eqs{ flex:1 1 auto; min-height:0; display:flex; flex-direction:column; justify-content:center; gap:3.6vh; }
  .planb-eqrow{ display:grid; grid-template-columns:minmax(0, 1fr) minmax(0, 1.1fr); gap:3vw; align-items:center; }
  .planb-eq{ font-family:'Cambria Math', 'STIX Two Math', Georgia, serif; font-size:clamp(1.6rem, 2.8vw, 2.6rem); }
  .planb-eq sub{ font-size:.6em; }
</style>
  <h1 class="t">Inside one attention score</h1>
  <div class="planb-eqs">
    <div class="planb-eqrow b" data-step="1"><div class="planb-eq">score<sub>1j</sub> = q<sub>1</sub> · k<sub>j</sub> / √d</div>
      <div class="lead">how well patch 1’s query matches patch j’s key</div></div>
    <div class="planb-eqrow b" data-step="2"><div class="planb-eq">a<sub>1j</sub> = softmax<sub>j</sub> ( score<sub>1j</sub> )</div>
      <div class="lead">weights from 0 to 1 that sum to 1</div></div>
    <div class="planb-eqrow b" data-step="3"><div class="planb-eq">new<sub>1</sub> = Σ<sub>j</sub> a<sub>1j</sub> v<sub>j</sub></div>
      <div class="lead">a weighted average of all the values</div></div>
    <div class="statement b" data-step="4">All 64 patches at once: a 64 × 64 table of weights in every layer</div>
  </div>
  ${cite('Vaswani et al. (2017), Attention Is All You Need')}
`, { notes: [
  "(draft) Title only. The same computation as the last slide, now in symbols, for patch 1 of our image. One addition: the scores are divided by the square root of d, which the toy example left out.",
  "(draft) First a score. Take the query of patch 1 and the key of patch j, and take their dot product: it is large when the two vectors point the same way. We divide by the square root of d, the length of these vectors, to keep the numbers in a reasonable range. One score for every patch j.",
  "(draft) Then a softmax over all j turns the 64 scores into 64 weights between 0 and 1 that add up to 1. These weights are what the lines on the last slide would show if we had a trained model: how much patch 1 attends to each patch.",
  "(draft) Finally the new vector for patch 1 is the weighted average of the values of all patches, using those weights. That is the whole computation: compare with the keys, normalize, mix the values.",
  "(draft) Every patch does this at the same time, so in each layer there is one 64 by 64 table of weights. Remember that table: its size is the subject of the cost slide later."
]});
}
