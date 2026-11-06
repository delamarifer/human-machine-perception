/* PART: vision-transformer (Day 5). Owner: Shreya. Shreya's outline, slide 10. */
{
section('7. Full picture');

st(`
  <h1 class="t">How does a Vision Transformer work?</h1>
  <div class="flow" style="margin-top:2vh">
    <div class="step b" data-step="1"><b>Image</b><div class="label">a grid of pixels</div></div>
    <div class="step b" data-step="2"><b>Patches</b><div class="label">cut into tiles</div></div>
    <div class="step b" data-step="3"><b>Embeddings</b><div class="label">each tile becomes a vector</div></div>
    <div class="step b" data-step="4"><b>+ Position</b><div class="label">where the tile was</div></div>
    <div class="step b" data-step="5"><b>Attention</b><div class="label">tiles exchange information</div></div>
  </div>
  <div class="lead b" data-step="6" style="margin-top:3vh"><b>Classification token:</b> one extra token, with no patch of its own. Its final vector is what gets classified.</div>
  ${cite('Dosovitskiy et al. (2021), An Image is Worth 16x16 Words')}
`, { notes: [
  "(draft) We now have every piece, so a Vision Transformer takes only a few steps to describe.",
  "(draft) We start with an image, a grid of pixels.",
  "(draft) We cut it into tiles. Each tile is one token.",
  "(draft) Each tile is flattened and projected to a vector, its embedding.",
  "(draft) We add position, so that the model knows where each tile was. Without it, the tiles are a set with no layout.",
  "(draft) Then come the transformer blocks. In each one, the tiles exchange information through self-attention, exactly as we just saw.",
  "(draft) One more detail: there is an extra token with no patch of its own. It attends to the tiles, and its final vector is what gets classified."
]});
}
