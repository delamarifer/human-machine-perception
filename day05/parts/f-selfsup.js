/* PART: f-selfsup (Day 5). Owner: Fernanda. Hour 2, after the embedding scene.
   Self-supervised learning, contrastive learning, the contrastive loss, and what the views decide.
   Sources: Foundations of Computer Vision, Sec. 30.6-30.8 (self-supervised, imputation, pretext tasks) and
   Sec. 30.10 (contrastive learning; 30.10.1 alignment and uniformity; 30.10.2 the shapes experiment).
   Round 6 (2026-11-06, lab interleaved): after the contrastive loss, code step 3, InfoNCE on the 10 x 10
   matrix (notebook Your turn 2). Code copied verbatim from the STUDENT notebook (None placeholders, never the
   solution); change both together. */
{
section('7. Task-free');

const LAB_NB = 'https://colab.research.google.com/github/delamarifer/human-machine-perception/blob/main/notebooks/day05-lab-clip-embeddings.ipynb';
const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const CSS = `<style>
  .fselfsup-code{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:minmax(0, 30fr) minmax(0, 70fr); gap:3vw; align-items:center; }
  .fselfsup-left{ display:flex; flex-direction:column; gap:2.2vh; }
  .fselfsup-left .frag{ margin:0; }
  .fselfsup-codebox{ container-type:inline-size; min-width:0; }
  .fselfsup-pre{ margin:0; font-family:Menlo, Consolas, monospace; font-size:min(1.15rem, 1.7cqw); line-height:1.42;
    white-space:pre; overflow:hidden; background:#f8fafc; border:1px solid var(--line); border-radius:8px; padding:1.4vh 1.2vw; }
  .fselfsup-open{ align-self:flex-start; border:3px solid var(--ink); border-radius:999px; padding:1vh 1.6vw;
    font-weight:700; font-size:clamp(1rem, 1.5vw, 1.4rem); color:var(--ink); text-decoration:none; }
  .fselfsup-out{ position:absolute; inset:0; z-index:6; background:var(--bg, #fff); display:flex; flex-direction:column;
    align-items:center; justify-content:center; gap:1.2vh; padding:5vh 4vw; }
  .fselfsup-out img{ display:block; max-width:88vw; object-fit:contain; }
  .fselfsup-out .fselfsup-pre{ background:#fff; font-size:clamp(.95rem, 1.45vw, 1.45rem); overflow:visible; }
  .fselfsup-sol{ margin-top:1vh; }
  .fselfsup-sol summary{ cursor:pointer; color:var(--mute); font-size:clamp(.8rem, 1vw, 1rem); }
  .fselfsup-sol-pop{ position:fixed; left:50%; top:52%; transform:translate(-50%, -50%); z-index:50; width:min(92vw, 70rem);
    max-height:78vh; overflow:auto; background:#fff; border:2px solid var(--ink); border-radius:12px; padding:1.4vh 1.2vw;
    box-shadow:0 10px 40px rgba(0,0,0,.18); }
  .fselfsup-sol-pop .fselfsup-pre{ background:#fffbeb; overflow:visible; }
  .fselfsup-sol-pop .fselfsup-pre:empty{ display:none; }
  .fselfsup-sol-pop .fselfsup-ans{ margin-top:1vh; line-height:1.4; }
</style>`;
// Output of a notebook cell, from a run of the solved notebook (see assets/lab1/SOURCES.md): the last click.
const outBox = (step, title, inner) => `<div class="fselfsup-out b" data-step="${step}"><div class="label"><b>${title}</b> · output from a run of the notebook</div>${inner}</div>`;
const outText = t => `<pre class="fselfsup-pre">${esc(t)}</pre>`;
// Teacher-only solution: open the deck on localhost with ?teacher (e.g. deck.html?teacher). If
// notebooks/teacher/day05-lab-solutions.json exists (written by `day05_lab.py --teacher`, git-ignored), a collapsed
// Solution block appears under each Your-turn code. Never on the public site (no file there, and no fetch).
const solBox = cell => `<details class="fselfsup-sol" data-fselfsup-sol="${cell}" hidden onclick="event.stopPropagation()"><summary>Solution (teacher copy)</summary><div class="fselfsup-sol-pop" title="click to close" onclick="this.parentNode.open = false"><pre class="fselfsup-pre"></pre><div class="label fselfsup-ans"></div></div></details>`;
if (/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) && new URLSearchParams(location.search).has('teacher'))
  fetch('../notebooks/teacher/day05-lab-solutions.json', { cache: 'no-store' }).then(r => r.ok ? r.json() : null).then(sol => {
    if (!sol) return;
    const fill = () => document.querySelectorAll('[data-fselfsup-sol]').forEach(d => {
      const k = d.dataset.fselfsupSol; if (!sol[k] && !sol[k + '-answer']) return;
      d.querySelector('pre').textContent = sol[k] || ''; d.querySelector('.fselfsup-ans').textContent = sol[k + '-answer'] || ''; d.hidden = false; });
    fill(); setTimeout(fill, 1500);
  }).catch(() => {});


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

const turn2 = String.raw`# YOUR TURN 2 · CLIP's contrastive loss (InfoNCE) on the 10 x 10 matrix.
# Row i: image i against every caption. Its partner is caption i.
temperature = 0.07    # TRY IT: 0.01, 0.07, 0.5, 1.0
logits = similarity / temperature
partners = torch.arange(10)

loss_images = None      # replace None: each image (row) vs its partner
loss_captions = None    # replace None: each caption (column) vs its partner

if loss_images is None or loss_captions is None:
    print("Your turn 2 is blank: using the course's answer.")
    loss_images, loss_captions = course_infonce(logits)
loss = (loss_images + loss_captions) / 2
shifted = sum(course_infonce(logits.roll(1, dims=1))) / 2    # wrong partners
print(f"temperature {temperature}")
print(f"  loss, true pairs:     {loss:.3f}")
print(f"  loss, shifted pairs:  {shifted:.3f}")
print(f"  loss, pure guessing:  {np.log(10):.3f}   (log 10)")
clip_temperature = 1 / model.logit_scale.exp().item()
print(f"CLIP's own temperature, learned in training: {clip_temperature:.3f}")`;

st(`
  <h1 class="t">Your turn 2: the contrastive loss</h1>
  <div class="fselfsup-code">
    <div class="fselfsup-left">
      <ul class="frag">
        <li class="b" data-step="1">Each row of the 10 × 10 matrix is one guessing game</li>
        <li class="b" data-step="2">Divide by a temperature, softmax, −log of the partner</li>
        <li class="b" data-step="3">Both ways: images pick captions, captions pick images</li>
      </ul>
      <div class="card hi b" data-step="5"><div class="k">Try it</div><div class="label">Change the temperature: 0.01, 0.07, 0.5, 1.0. Compare true pairs, shifted pairs and guessing.</div></div>
      <a class="fselfsup-open b" data-step="6" href="${LAB_NB}#scrollTo=turn-2" target="_blank" rel="noopener" onclick="event.stopPropagation()">Open Your turn 2 in Colab ↗</a>
    </div>
    <div class="fselfsup-codebox b" data-step="4"><pre class="fselfsup-pre">${esc(turn2)}</pre>${solBox('turn-2')}</div>
  </div>${outBox(7, 'Your turn 2 · the loss at three temperatures', outText(String.raw`temperature 0.01
  loss, true pairs:     0.275
  loss, shifted pairs:  6.589
  loss, pure guessing:  2.303   (log 10)

temperature 0.07
  loss, true pairs:     1.594
  loss, shifted pairs:  2.496
  loss, pure guessing:  2.303   (log 10)

temperature 1.0
  loss, true pairs:     2.249
  loss, shifted pairs:  2.312
  loss, pure guessing:  2.303   (log 10)
CLIP's own temperature, learned in training: 0.010`))}${CSS}
`, { notes: [
  "(draft) Your turn 2. You already have the matrix that this loss is computed on.",
  "(draft) The similarity matrix from Your turn 1 is a batch of ten images and their ten captions. Each row is one round of the guessing game: here is image i, which caption is its partner? The answer is caption i.",
  "(draft) Divide the similarities by a temperature, a small number that makes the differences bigger. A softmax over the row turns them into probabilities, and the loss is minus the log of the probability on the partner. That is exactly a classifier's cross-entropy, where the classes are the captions in the batch.",
  "(draft) CLIP plays it both ways. Each image picks its caption, along the rows, and each caption picks its image, down the columns. The loss is the average of the two.",
  "(draft) Here is the cell. You fill in the two losses; PyTorch's cross_entropy does the softmax and the log for every row at once. The cell then prints three numbers: the loss for the true pairs, the loss if every image were paired with the wrong caption, and the loss of pure guessing, the log of ten.",
  "(draft) Then change the temperature. At 0.07, in our run, the true pairs give 1.59 against 2.30 for guessing, and the shifted pairs 2.50: below and above, but not by much, because CLIP's cosine similarities are all close together. At 1.0 all three sit near 2.3. At 0.01, which is the temperature CLIP itself learned, the true pairs drop to 0.28 and the shifted pairs jump to 6.59. The temperature decides how much small differences in similarity count.",
  "(draft) The link opens Your turn 2. A few minutes, then back to the slides: training pushes this number down, and what it learns depends on the views.",
  "(draft) From our run, the same cell at three temperatures. At 0.01, the true pairs give a loss of 0.28 and the shifted pairs 6.59, far apart. At 0.07, 1.59 and 2.50. At 1.0, both sit near guessing, 2.30. And the last line: 0.01 is the temperature CLIP itself learned. Small differences in cosine only count when the temperature is small."
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
