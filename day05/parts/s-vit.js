/* PART: s-vit (Day 5). Owner: Fernanda · Shreya.
   5. Image patches, embeddings, position, self-attention, the classification token. */
{
section('5. ViT');

st(`
  <h1 class="t">How does a Vision Transformer work?</h1>
  <div class="flow">
    <div class="step b" data-step="1"><b>Image</b><span class="label">a grid of pixels</span></div>
    <div class="arrow b" data-step="1">→</div>
    <div class="step b" data-step="1"><b>Patches</b><span class="label">cut into tiles</span></div>
    <div class="arrow b" data-step="2">→</div>
    <div class="step b" data-step="2"><b>Embeddings</b><span class="label">each tile becomes a vector</span></div>
    <div class="arrow b" data-step="3">→</div>
    <div class="step b" data-step="3"><b>+ position</b><span class="label">where the tile was</span></div>
    <div class="arrow b" data-step="4">→</div>
    <div class="step hi b" data-step="4"><b>Attention</b><span class="label">tiles exchange information</span></div>
  </div>
  <div class="card hi b" style="margin-top:1vh"><div class="k">Classification token</div><div class="label">One extra token, with no patch of its own. It attends to the tiles, and its final vector is what gets classified.</div></div>
  <div class="cite">Dosovitskiy et al., 2021. An Image is Worth 16x16 Words.</div>
`, { notes: [
  "Same architecture as the language model. The only change is what counts as a token. The citation along the bottom is Dosovitskiy and colleagues, 2021, An Image is Worth 16 by 16 Words.",
  "Start from the image, a grid of pixels. Cut it into patches. In the original Vision Transformer a common choice is 16 by 16 pixels. Each patch is one token, the way a word was a token.",
  "A linear map turns each patch into an embedding, a vector.",
  "Add a positional encoding so the model knows which tile was where. Without that, the set of patches would have no layout.",
  "Then self-attention, exactly as before. Every patch can draw on every other patch.",
  "One extra token is prepended, the classification token. It does not come from a patch. Across the layers it attends to the image tokens, and at the end its vector is the one passed to the classifier. That vector is the image representation we will use later."
]});
}
