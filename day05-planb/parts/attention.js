/* PART: attention (Day 5 Plan B). Owner: Fernanda. Video 2:53 to 3:17: what attention does.
   The second slide (one score computed) goes beyond the video: it spells out the computation the video
   only names. Symbols only, no values. */
{
section('2. Attention');
sc('planbAttend', 'scenes/planb-attend.html');

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
  "(draft) Title only. The video says attention is calculated between patches but does not show the calculation. This slide is our addition, so you can see where the query, key and value go.",
  "(draft) First a score. Take the query of patch 1 and the key of patch j, and take their dot product: it is large when the two vectors point the same way. We divide by the square root of d, the length of these vectors, to keep the numbers in a reasonable range. One score for every patch j.",
  "(draft) Then a softmax over all j turns the 64 scores into 64 weights between 0 and 1 that add up to 1. These weights are what the lines on the last slide would show if we had a trained model: how much patch 1 attends to each patch.",
  "(draft) Finally the new vector for patch 1 is the weighted average of the values of all patches, using those weights. That is the whole computation: compare with the keys, normalize, mix the values.",
  "(draft) Every patch does this at the same time, so in each layer there is one 64 by 64 table of weights. Remember that table: its size is the subject of the cost slide later."
]});
}
