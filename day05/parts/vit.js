/* PART: vit (Day 5). Owner: to decide (see README.md). Plan: 15 min, ViT: patches, tokens, self-attention, representation.
   1. scene: the steps of a ViT on a toy image (random weights, labeled as such)
   2. CNN vs ViT, side by side */
{
section('Vision Transformer');

sc('vitScene', 'scenes/vit.html');

st(`
  <h1 class="t">CNN vs Vision Transformer</h1>
  <div style="display:grid;grid-template-columns:auto 1fr 1fr;gap:2.4vh 3vw;align-items:baseline;margin:auto 0" class="lead">
    <div></div><b class="b" data-step="1">CNN</b><b class="b" data-step="1">ViT</b>
    <span class="label b" data-step="2">first layer sees</span><span class="b" data-step="2">a small neighborhood</span><span class="b" data-step="2">every patch</span>
    <span class="label b" data-step="3">built in</span><span class="b" data-step="3">locality, shared filters</span><span class="b" data-step="3">very little: learns it</span>
    <span class="label b" data-step="4">data</span><span class="b" data-step="4">works with less</span><span class="b" data-step="4">shines with a lot</span>
  </div>
  ${cite('Dosovitskiy et al., 2021, ICLR')}
`, { notes: [
  "(draft) So how do the two compare?",
  "(draft) A CNN on the left, a Vision Transformer on the right.",
  "(draft) In its first layer, a CNN unit sees a small neighborhood; a ViT token can attend to every patch from the very first block.",
  "(draft) A CNN has assumptions built in: nearby pixels matter together, and the same filter is used everywhere. A ViT has very few such assumptions; it has to learn them from data.",
  "(draft) That has a cost. In the original ViT paper, trained only on ImageNet, ViTs did slightly worse than comparable CNNs. Pre-trained on much larger datasets, they matched or beat the best CNNs. Fewer assumptions means more data is needed, but less is ruled out."
]});
}
