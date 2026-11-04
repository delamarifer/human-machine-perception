/* PART: s-clip (Day 5). Owner: Fernanda · Shreya.
   8. Contrastive learning, image and text in one space. */
{
section('8. CLIP');

st(`
  <h1 class="t">CLIP: connecting images and language</h1>
  <div class="flow">
    <div class="step b" data-step="1"><b>Image encoder</b><span class="label">image → vector</span></div>
    <div class="step b" data-step="1"><b>Text encoder</b><span class="label">caption → vector</span></div>
  </div>
  <div class="cols">
    <div class="card b" data-step="2"><div class="k">Contrastive learning</div><div class="label">A matched image and caption are pulled together. The other pairings in the batch are pushed apart.</div></div>
    <div class="card hi b" data-step="3"><div class="k">One shared space</div><div class="label">After training, an image and the words that describe it land near each other.</div></div>
  </div>
  <div class="cite">Radford et al., 2021. Learning Transferable Visual Models From Natural Language Supervision.</div>
`, { notes: [
  "CLIP is the same idea of a representation space, with a second kind of point in it: language.",
  "Two encoders. One turns an image into a vector. One turns a caption into a vector of the same length. Either encoder can be a transformer. The image encoder is often a Vision Transformer.",
  "The training signal is contrastive. In a batch of image and caption pairs, the correct pairs should have high similarity, and every mismatched pair should have low similarity. There are no class labels. The caption is the supervision.",
  "What you get is one space that holds both. Retrieve an image with a sentence, or a sentence with an image, by nearest neighbor in that space. That is the alignment. The paper is Radford and colleagues, 2021. One caution if the room goes there: the space reflects the captions it was trained on, including their gaps."
]});
}
