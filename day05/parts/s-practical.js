/* PART: s-practical (Day 5). Owner: Fernanda · Shreya.
   9. Extract embeddings, similarity, neighbors, clusters. The lab. */
{
section('9. Lab');

st(`
  <h1 class="t">Exploring the representation space</h1>
  <div class="flow">
    <div class="step b" data-step="1"><b>Extract</b><span class="label">one embedding per image</span></div>
    <div class="arrow b" data-step="2">→</div>
    <div class="step b" data-step="2"><b>Similarity</b><span class="label">cosine, pairwise</span></div>
    <div class="arrow b" data-step="3">→</div>
    <div class="step b" data-step="3"><b>Neighbors</b><span class="label">the nearest images</span></div>
    <div class="arrow b" data-step="4">→</div>
    <div class="step hi b" data-step="4"><b>Clusters</b><span class="label">who sits together</span></div>
  </div>
  <div class="card b" style="margin-top:1vh"><div class="label">Lab: <b>day05-lab-vit-embeddings</b>. The questions to keep: what is shared by neighbors? Object, layout, color, or texture?</div></div>
`, { notes: [
  "This is the hands-on part. The notebook is day05-lab-vit-embeddings. Point them at it and then stay on these four operations.",
  "First, extract. Run the images through a pretrained Vision Transformer and keep the embedding, not the class label.",
  "Second, similarity. Compute cosine similarity between embeddings. You now have a number for every pair.",
  "Third, neighbors. For one image, sort the others by similarity and look at the nearest. This is the same visual search as yesterday, read out of a transformer.",
  "Fourth, clusters. Reduce the vectors enough to plot them, and see which images land together.",
  "The question while they look: what do the neighbors share? The same object, a similar layout, a color, a texture? The answer is a clue to what the representation encoded. Whatever they do not finish is the natural homework."
]});
}
