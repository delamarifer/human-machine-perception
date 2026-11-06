/* PART: f-lab2 (Day 5). Owner: Fernanda. Hour 2, lab block 2 of 2, after the reading.
   Notebook: notebooks/day05-lab-clip-embeddings.ipynb, Part 2 (Your turn 5-7): views and instance
   discrimination (the reading's objective, tested on CLIP), then an RDM and RSA on 100 images.
   NOT LOADED since 2026-11-06: the lab is no longer left for the end; concept + code slides for Your turn 5-7 sit
   inside section 9 (f-konkle after IPCL, f-konkle-brain after the RSA scene). File kept. */
{
section('10. Lab: views');

const LAB_NB2 = 'https://colab.research.google.com/github/delamarifer/human-machine-perception/blob/main/notebooks/day05-lab-clip-embeddings.ipynb';

st(`
  <h1 class="t">Lab, part 2: views and representations</h1>
  <div class="flow">
    <div class="step b" data-step="1"><b>Make views</b><span class="label">crop and recolor 20 images, 5 views each</span></div>
    <div class="arrow b" data-step="2">→</div>
    <div class="step b" data-step="2"><b>Find the partner</b><span class="label">is each view closest to its own image?</span></div>
    <div class="arrow b" data-step="3">→</div>
    <div class="step b" data-step="3"><b>Compare spaces</b><span class="label">dissimilarity matrices: CLIP, pixels, categories</span></div>
  </div>
  <div class="label b" data-step="4" style="text-align:center">
    <a href="${LAB_NB2}#scrollTo=turn-5" target="_blank" rel="noopener" onclick="event.stopPropagation()">Open part 2 in Colab ↗</a> · about 15 minutes
  </div>
`, { notes: [
  "(draft) Lab, part two. You test the reading's idea on CLIP.",
  "(draft) Make views the way Konkle and Alvarez did: crops and color changes, five views of each of twenty images.",
  "(draft) Then their objective as a test: for every view, find its nearest neighbor among all the other views. Is it a view of the same image? Try crops only, then color only, then both, and see which views CLIP tolerates.",
  "(draft) Last, the brain-style comparison without a brain: a dissimilarity matrix for a hundred images from CLIP, one from raw pixels, and a model that says only same category or not. Which space has the category structure? CLIP was trained on captions, never on these ten class labels.",
  "(draft) The link opens part two directly. Whatever you do not finish is homework."
]});
}
