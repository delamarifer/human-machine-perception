/* PART: f-selfsup (Day 5). Owner: Fernanda. Hour 2, after the embedding scene.
   Self-supervised learning, contrastive learning, the contrastive loss, and what the views decide.
   Sources: Foundations of Computer Vision, Sec. 30.6-30.8 (self-supervised, imputation, pretext tasks) and
   Sec. 30.10 (contrastive learning; 30.10.1 alignment and uniformity; 30.10.2 the shapes experiment). */
{
section('7. Task-free');

st(`
  <h1 class="t">Self-supervised: the data makes its own labels</h1>
  <ul class="frag">
    <li class="b">Hide the right half, predict it from the left</li>
    <li class="b">Remove the color, predict it back</li>
    <li class="b">Rotate the image, predict whether it was turned</li>
    <li class="b">No person wrote the answer: it was already in the image</li>
  </ul>
  ${cite('<i>Foundations of Computer Vision</i>, Sec. 30.6–30.8: self-supervised learning, imputation, pretext tasks')}
`, { notes: [
  "(draft) How do you get a training signal with no labels? Make the data label itself.",
  "(draft) Cut the image in two and predict the right half from the left half.",
  "(draft) Turn a photo gray and predict the colors back. The book shows that a network trained only to colorize ends up with units that respond to objects.",
  "(draft) Rotate the image and ask whether it was turned. To answer, the network has to know, for example, that clouds tend to be near the top.",
  "(draft) In each case the answer was in the image all along. That is what self-supervised means: the targets come from the raw data, not from a person."
]});

st(`
  <h1 class="t">Contrastive learning</h1>
  <div class="flow">
    <div class="step b" data-step="1"><b>Two views</b><span class="label">random crops and color changes of one image</span></div>
    <div class="arrow b" data-step="2">→</div>
    <div class="step b" data-step="2"><b>Pull together</b><span class="label">two views of the same image: a positive pair</span></div>
    <div class="arrow b" data-step="3">→</div>
    <div class="step b" data-step="3"><b>Push apart</b><span class="label">views of other images: negatives</span></div>
  </div>
  <div class="card hi b" data-step="4"><div class="k">On a sphere</div><div class="label">Every embedding is scaled to length 1, so similarity is the cosine of the angle.</div></div>
  ${cite('<i>Foundations of Computer Vision</i>, Sec. 30.10, Contrastive Learning')}
`, { notes: [
  "(draft) The self-supervised idea that took over is contrastive learning. Today's reading uses it, and so does CLIP.",
  "(draft) Take one image and make two views of it: two random crops, with the colors shifted a little. Same content, different pixels.",
  "(draft) Ask the network to map the two views close together. They are a positive pair. On its own this fails: the network can map every image to the same point, and every pair is close.",
  "(draft) So also push the views of other images away. Those are the negatives. Now the only way to win is to keep what makes this image this image.",
  "(draft) One more detail: every embedding is scaled to length one, so all the points live on a sphere and similarity is just the cosine of the angle between them. Otherwise the network could push negatives infinitely far away."
]});

st(`
  <h1 class="t">The contrastive loss</h1>
  <div class="cols">
    <div class="card b"><div class="k">A guessing game</div><div class="label">Here is one view. Which of these N images is its partner?</div></div>
    <div class="card b"><div class="k">Softmax over similarities</div><div class="label">Low loss when the partner has the highest cosine similarity (InfoNCE).</div></div>
    <div class="card hi b"><div class="k">Alignment and uniformity</div><div class="label">Partners land together; everything else spreads out over the sphere.</div></div>
  </div>
  ${cite('<i>Foundations of Computer Vision</i>, Sec. 30.10–30.10.1 · van den Oord, Li &amp; Vinyals, 2018 · Wang &amp; Isola, 2020')}
`, { notes: [
  "(draft) The loss most methods use is easier to say as a game than as a formula.",
  "(draft) Give the network one view and a lineup of N other images, one of which is the other view of the same image. Its job is to pick the partner.",
  "(draft) Score every candidate by cosine similarity and put the scores through a softmax, the same softmax as a classifier, with a temperature. The loss is low when the partner gets the highest score. This is called InfoNCE, from van den Oord and colleagues, 2018.",
  "(draft) Wang and Isola, 2020, showed what this loss does to the space: alignment, partners land together, and uniformity, everything else spreads out evenly over the sphere."
]});

st(`
  <h1 class="t">The views decide what is kept</h1>
  <div class="cols">
    <div class="card b"><div class="k">Crops only</div><div class="label">In the book's toy shapes, the embedding groups by color.</div></div>
    <div class="card b"><div class="k">Crops + color changes</div><div class="label">Now color varies between partners. The embedding ignores it and groups by shape.</div></div>
    <div class="card hi b"><div class="k">The design choice</div><div class="label">Whatever the two views differ in, the embedding learns to ignore.</div></div>
  </div>
  ${cite('<i>Foundations of Computer Vision</i>, Sec. 30.10.2, experiment on a toy dataset of colored shapes')}
`, { notes: [
  "(draft) Here is the catch, and it matters for the reading. The views are a choice we make.",
  "(draft) The book trains a small contrastive network on toy images of colored shapes. If the two views differ only by cropping, the embedding groups the images by color: color is the easiest thing to keep that tells images apart.",
  "(draft) Add random changes of hue, brightness and saturation to the views. Now two partners can have different colors, so color stops helping. The embedding becomes blind to color and groups by shape instead.",
  "(draft) So contrastive learning is not free of assumptions. Whatever the two views are allowed to differ in, the embedding learns to ignore. Keep that in mind when we read how Konkle and Alvarez chose theirs."
]});
}
