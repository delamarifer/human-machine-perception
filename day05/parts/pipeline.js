/* PART: pipeline (Day 5). Owner: Shreya. Closing slide: the whole path, then where it is used.
   Applications are the ones named on the Transformer Explainer site. */
{
section('7. Full picture');

const plStep = (t, s) => `<div class="step b" data-step="${s}" style="padding:1.6vh .5vw"><b>${t}</b></div>`;

st(`
  <h1 class="t">From an image to a Transformer</h1>
  <div class="flow" style="margin-top:3vh;flex-wrap:wrap;gap:1vh .8vw">
    ${['Image','Patches','Tokens','Embeddings'].map(t => plStep(t, 1)).join('')}
  </div>
  <div class="flow" style="flex-wrap:wrap;gap:1vh .8vw">
    ${['Q, K, V','Attention','Self-attention','Multi-head'].map(t => plStep(t, 2)).join('')}
  </div>
  <div class="flow" style="flex-wrap:wrap;gap:1vh .8vw">
    ${['Transformer block','Applications'].map(t => plStep(t, 3)).join('')}
  </div>
  <div class="lead b" data-step="4" style="text-align:center;margin-top:3vh">Used for text, images, audio, protein structure and game playing</div>
  ${cite('Applications as listed by Transformer Explainer (Georgia Tech)')}
`);
}
