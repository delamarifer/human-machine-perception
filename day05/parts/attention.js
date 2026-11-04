/* PART: attention (Day 5). Owner: to decide (see README.md). Plan: 15 min, why attention for vision?
   1. scene: local view of a CNN unit vs attention weights over all patches, computed
   2. attention in one line */
{
section('Attention');

sc('attentionScene', 'scenes/attention.html');

st(`
  <h1 class="t">Attention in one line</h1>
  <div class="statement center b" style="font-size:clamp(2rem,3.4vw,3rem)">output = softmax( Q Kᵀ / √d ) V</div>
  <ul class="frag" style="margin:0 auto">
    <li class="b">Q, K, V: three learned projections of the tokens</li>
    <li class="b">softmax row by row: weights that add up to 1</li>
    <li class="b">every token mixes in every other token, in one step</li>
  </ul>
  ${cite('Vaswani et al., 2017, NeurIPS')}
`, { notes: [
  "(draft) Here is the same computation, written the way you will see it in papers and code.",
  "(draft) The output is softmax of Q times K transposed, divided by the square root of d, times V.",
  "(draft) Q, K and V are queries, keys and values. Each is the tokens multiplied by its own learned matrix. In our demo all three were just the patch features; training is what makes them useful.",
  "(draft) Q times K transposed holds every query-key dot product. Dividing by the square root of the dimension keeps the numbers in a reasonable range, and the softmax turns each row into weights.",
  "(draft) Multiplying by V mixes the values with those weights. Every token gets information from every other token in a single step. This is from the 2017 paper that introduced the transformer, for translating text."
]});
}
