/* PART: f-lab1 (Day 5). Owner: Fernanda. Hour 2, lab block 1 of 2 (slides and lab alternate, 2026-11-06).
   Notebook: notebooks/day05-lab-clip-embeddings.ipynb (built by notebooks/build/day05_lab.py), Part 1,
   Your turn 1-3. Links open the exercise cell directly (#scrollTo=turn-N). */
{
section('8. Lab: CLIP');

const LAB_NB = 'https://colab.research.google.com/github/delamarifer/human-machine-perception/blob/main/notebooks/day05-lab-clip-embeddings.ipynb';

st(`
  <h1 class="t">Lab, part 1: CLIP similarity</h1>
  <div class="flow">
    <div class="step b" data-step="1"><b>Embed</b><span class="label">ten images and ten captions</span></div>
    <div class="arrow b" data-step="2">→</div>
    <div class="step b" data-step="2"><b>Compare</b><span class="label">cosine similarity, every image × every caption</span></div>
    <div class="arrow b" data-step="3">→</div>
    <div class="step b" data-step="3"><b>Zero-shot</b><span class="label">classify 500 images from their class names</span></div>
    <div class="arrow b" data-step="4">→</div>
    <div class="step b" data-step="4"><b>Your captions</b><span class="label">change the words, watch the accuracy</span></div>
  </div>
  <div class="label b" data-step="5" style="text-align:center">
    <a href="${LAB_NB}#scrollTo=turn-1" target="_blank" rel="noopener" onclick="event.stopPropagation()">Open the lab in Colab ↗</a> · about 15 minutes, then back to slides
  </div>
  ${cite('CLIP ViT-B/32 (OpenAI, through Hugging Face) · CIFAR-10 test images (Krizhevsky, 2009)')}
`, { notes: [
  "(draft) Lab time, part one. About fifteen minutes, then we come back for the reading.",
  "(draft) You load CLIP and embed ten images, one from each class of a small dataset, and ten captions, a photo of an airplane, a photo of a cat, and so on.",
  "(draft) You compute the cosine similarity between every image and every caption. If CLIP works, the diagonal lights up.",
  "(draft) Then zero-shot classification on five hundred images: for each one, pick the closest caption, and score it against the true label. No training.",
  "(draft) Last, change the captions. A blurry photo of a cat, a drawing of a cat, just the word cat. Does the accuracy move? The words are part of the classifier now.",
  "(draft) The link opens the first exercise directly. (to add) The course site link, once the Day 5 card has it."
]});
}
