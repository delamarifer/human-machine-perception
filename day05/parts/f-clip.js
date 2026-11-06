/* PART: f-clip (Day 5). Owner: Fernanda. Hour 2: what embeddings are good for, and one example, CLIP.
   Sources: Foundations of Computer Vision, Sec. 51.3, Learning Visual Representations from Language
   Supervision (CLIP as contrastive learning with an image and its caption as the two views; symmetric
   InfoNCE; zero-shot classification with text prompts). Radford et al., 2021. */
{
section('7. Task-free');

st(`
  <h1 class="t">You can still do a lot with those embeddings</h1>
  <ul class="frag">
    <li class="b">Neighbors: search for similar images</li>
    <li class="b">Clusters: groups that nobody named</li>
    <li class="b">A small classifier on top: a few labels go a long way</li>
    <li class="b">Compare with people and brains</li>
  </ul>
`, { notes: [
  "(draft) No task during training. So what is the embedding good for afterwards? A lot.",
  "(draft) Nearest neighbors: give it an image, get back the most similar images. That is image search.",
  "(draft) Clustering: groups appear that nobody labeled.",
  "(draft) A small classifier trained on top of the frozen embedding. With a good embedding, a handful of labels is enough.",
  "(draft) And the one we care about in this course: compare the geometry of the space with human judgments and brain responses. That is the reading, after the lab."
]});

st(`
  <h1 class="t">One example: CLIP similarity</h1>
  <div class="flow">
    <div class="step b" data-step="1"><b>Image encoder</b><span class="label">image → vector</span></div>
    <div class="arrow b" data-step="2">+</div>
    <div class="step b" data-step="2"><b>Text encoder</b><span class="label">caption → vector</span></div>
    <div class="arrow b" data-step="3">→</div>
    <div class="step b" data-step="3"><b>Two views</b><span class="label">an image and its caption are the positive pair</span></div>
  </div>
  <div class="card hi b" data-step="4"><div class="k">Zero-shot</div><div class="label">Write each class as a caption, "a photo of a dog". Pick the caption closest to the image.</div></div>
  ${cite('Radford et al., 2021, Learning Transferable Visual Models From Natural Language Supervision · <i>Foundations of Computer Vision</i>, Sec. 51.3')}
`, { notes: [
  "(draft) One example, and the one you will use in the lab: CLIP.",
  "(draft) It has an image encoder. In the version we use, it is a Vision Transformer, the one from the first hour.",
  "(draft) And a text encoder, a transformer over the words of a caption. Both give a vector of the same length, scaled onto the same sphere.",
  "(draft) Training is contrastive learning, with one twist: the two views are an image and its caption. In a batch of image and caption pairs, each image should be closest to its own caption, and far from all the others. The book describes it exactly this way, as a symmetric version of the same loss.",
  "(draft) Once trained, you can classify with no training at all. Write each class name as a caption, a photo of a dog, a photo of a cat, embed the captions, and pick the one closest to the image. That is called zero-shot classification. Let's try it."
]});
}
