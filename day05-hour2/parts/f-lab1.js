/* PART: f-lab1 (Day 5). Owner: Fernanda. Hour 2, section 8 (Round 6, 2026-11-06: lab interleaved with the
   concepts). After the contrastive loss and the views (f-selfsup): what embeddings are good for; how CLIP was
   trained (its two views are an image and its caption); then code steps on zero-shot classification
   (Your turn 3, leaving classes out, Your turn 4), and a wrap-up of lab part 1.
   Notebook: notebooks/day05-lab-clip-embeddings.ipynb, Part 1, section 3. Links open the cell directly
   (#scrollTo=turn-N, or the fixed id try-classes). Code copied verbatim from the STUDENT notebook (None
   placeholders, never a solution: the repository is public); change both together.
   Sources: Foundations of Computer Vision, Sec. 51.3 (CLIP as contrastive learning with an image and its caption
   as the two views; symmetric InfoNCE; zero-shot classification with text prompts). Radford et al., 2021. */
{
section('8. Lab: CLIP');

const LAB_NB = 'https://colab.research.google.com/github/delamarifer/human-machine-perception/blob/main/notebooks/day05-lab-clip-embeddings.ipynb';
const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const CSS = `<style>
  .flab1-code{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:minmax(0, 30fr) minmax(0, 70fr); gap:3vw; align-items:center; }
  .flab1-left{ display:flex; flex-direction:column; gap:2.2vh; }
  .flab1-left .frag{ margin:0; }
  .flab1-codebox{ container-type:inline-size; min-width:0; }
  .flab1-pre{ margin:0; font-family:Menlo, Consolas, monospace; font-size:min(1.15rem, 1.7cqw); line-height:1.45;
    white-space:pre; overflow:hidden; background:#f8fafc; border:1px solid var(--line); border-radius:8px; padding:1.4vh 1.2vw; }
  .flab1-open{ align-self:flex-start; border:3px solid var(--ink); border-radius:999px; padding:1vh 1.6vw;
    font-weight:700; font-size:clamp(1rem, 1.5vw, 1.4rem); color:var(--ink); text-decoration:none; }
  .flab1-sol{ margin-top:1vh; }
  .flab1-sol summary{ cursor:pointer; color:var(--mute); font-size:clamp(.8rem, 1vw, 1rem); }
  .flab1-sol-pop{ position:fixed; left:50%; top:52%; transform:translate(-50%, -50%); z-index:50; width:min(92vw, 70rem);
    max-height:78vh; overflow:auto; background:#fff; border:2px solid var(--ink); border-radius:12px; padding:1.4vh 1.2vw;
    box-shadow:0 10px 40px rgba(0,0,0,.18); }
  .flab1-sol-pop .flab1-pre{ background:#fffbeb; overflow:visible; }
  .flab1-sol-pop .flab1-pre:empty{ display:none; }
  .flab1-sol-pop .flab1-ans{ margin-top:1vh; line-height:1.4; }
</style>`;
// Teacher-only solution: open the deck on localhost with ?teacher (e.g. deck.html?teacher). If
// notebooks/teacher/day05-lab-solutions.json exists (written by `day05_lab.py --teacher`, git-ignored), a collapsed
// Solution block appears under each Your-turn code. Never on the public site (no file there, and no fetch).
const solBox = cell => `<details class="flab1-sol" data-flab1-sol="${cell}" hidden onclick="event.stopPropagation()"><summary>Solution (teacher copy)</summary><div class="flab1-sol-pop" title="click to close" onclick="this.parentNode.open = false"><pre class="flab1-pre"></pre><div class="label flab1-ans"></div></div></details>`;
if (/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) && new URLSearchParams(location.search).has('teacher'))
  fetch('../notebooks/teacher/day05-lab-solutions.json', { cache: 'no-store' }).then(r => r.ok ? r.json() : null).then(sol => {
    if (!sol) return;
    const fill = () => document.querySelectorAll('[data-flab1-sol]').forEach(d => {
      const k = d.dataset.flab1Sol; if (!sol[k] && !sol[k + '-answer']) return;
      d.querySelector('pre').textContent = sol[k] || ''; d.querySelector('.flab1-ans').textContent = sol[k + '-answer'] || ''; d.hidden = false; });
    fill(); setTimeout(fill, 1500);
  }).catch(() => {});

// Concept cues on the left (one click each), then the notebook cell on the right, then "Try it", then the link.
const codeSlide = ({ title, cues, code, tryIt, cell, label, notes }) => {
  const n = cues.length;
  st(`
  <h1 class="t">${title}</h1>
  <div class="flab1-code">
    <div class="flab1-left">
      <ul class="frag">${cues.map((c, i) => `<li class="b" data-step="${i + 1}">${c}</li>`).join('')}</ul>
      <div class="card hi b" data-step="${n + 2}"><div class="k">Try it</div><div class="label">${tryIt}</div></div>
      <a class="flab1-open b" data-step="${n + 3}" href="${LAB_NB}#scrollTo=${cell}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${label} ↗</a>
    </div>
    <div class="flab1-codebox b" data-step="${n + 1}"><pre class="flab1-pre">${esc(code)}</pre>${cell.startsWith('turn-') ? solBox(cell) : ''}</div>
  </div>${CSS}
`, { notes });
};

/* The text slide 'You can still do a lot with those embeddings' is replaced by the uses scene (scenes/uses.html, 2026-11-06). */
sc('usesScene', 'scenes/uses.html');

/* The text slide 'One example: how CLIP was trained' is replaced by the CLIP-training scene (scenes/cliptrain.html, 2026-11-06). */
sc('clipTrainScene', 'scenes/cliptrain.html');

codeSlide({
  title: 'Your turn 3: zero-shot predictions',
  cues: ['500 test images, the same ten captions', 'Prediction: the caption with the largest similarity', 'No training: the class names do the work'],
  code: String.raw`# YOUR TURN 3 · One predicted class index per image (500 integers).
predictions = None    # replace None, using test_sims

if predictions is None:
    print("Your turn 3 is blank: using the course's answer.")
    predictions = course_predictions(test_sims)
accuracy = (predictions == test_labels).float().mean().item()
print(f"zero-shot accuracy on {N} images: {accuracy:.1%}   (chance: 10%)")`,
  tryIt: 'Run the next cell too: it shows the images CLIP got wrong. Which mistakes would a person make?',
  cell: 'turn-3', label: 'Open Your turn 3 in Colab',
  notes: [
    "(draft) Your turn 3. Zero-shot classification, on five hundred images.",
    "(draft) The cell before it embeds the first five hundred test images and scores every one against the same ten captions: a five hundred by ten matrix.",
    "(draft) The prediction for each image is the column with the largest similarity, the caption it is closest to. Again one line of code.",
    "(draft) No training happened. The ten class names, written as captions, are the whole classifier.",
    "(draft) Here is the cell. The accuracy prints against chance, which is ten percent with ten classes. In our run it is 90.6 percent, with no training on these classes.",
    "(draft) The cell after it shows twenty images CLIP got wrong, with its guess. Look at them: these images are tiny, and some of the mistakes are ones a person could make.",
    "(draft) The link opens Your turn 3."
  ]
});

codeSlide({
  title: 'The classes are the captions you write',
  cues: ['Zero-shot can only choose among your captions', 'Delete a class name: where do its images go?'],
  code: String.raw`# TRY IT · Leave classes out: delete one or two names from this list, then run.
offered = ["airplane", "automobile", "bird", "cat", "deer",
           "dog", "frog", "horse", "ship", "truck"]

offered_emb = embed_texts([f"a photo of a {c}" for c in offered])
picks = (test_emb @ offered_emb.T).argmax(dim=1)
for c in CLASSES:
    if c not in offered:
        mine = test_labels == CLASSES.index(c)          # the images of class c
        went = Counter(offered[p] for p in picks[mine].tolist())
        top = ", ".join(f"{name} {n}" for name, n in went.most_common(3))
        print(f"the {int(mine.sum())} {c} images now go to: {top}")
if len(offered) == len(CLASSES):
    print("All ten classes are offered: delete one or two names and run again.")`,
  tryIt: 'Delete “cat”, then “truck”. Do their images go where you expected?',
  cell: 'try-classes', label: 'Open this cell in Colab',
  notes: [
    "(draft) A small experiment, no code to write: just delete words.",
    "(draft) Zero-shot can only pick among the captions you give it. It never says none of these.",
    "(draft) So take a class away. Its images still have to go somewhere, and where they go tells you what CLIP thinks they are closest to.",
    "(draft) Here is the cell. The list of class names is the only thing you change.",
    "(draft) Delete cat and run it. Then put cat back and delete truck. Before you run, guess where they will go. In our run, 42 of the 49 cat images went to dog, and 55 of the 56 trucks went to automobile.",
    "(draft) The link opens this cell."
  ]
});

codeSlide({
  title: 'Your turn 4: the words are part of the classifier',
  cues: ['Change the caption template, keep the images', 'Watch the accuracy move'],
  code: String.raw`# YOUR TURN 4 · Write your own caption template. {} is where the class goes.
# Try a few: "{}", "a blurry photo of a {}.", "a drawing of a {}.",
# "a photo of a small {}.", ...
my_template = None    # for example "a blurry photo of a {}."

baseline = (zero_shot(test_emb, "a photo of a {}") == test_labels).float().mean().item()
print(f'"a photo of a {{}}"  ->  {baseline:.1%}')
if my_template is not None:
    mine = (zero_shot(test_emb, my_template) == test_labels).float().mean().item()
    print(f'"{my_template}"  ->  {mine:.1%}')
else:
    print("Your turn 4 is blank: write a template above and run it again.")`,
  tryIt: 'CIFAR-10 images are tiny and blurry. Does saying so in the caption help? Keep your best template.',
  cell: 'turn-4', label: 'Open Your turn 4 in Colab',
  notes: [
    "(draft) Your turn 4, the last one in part one.",
    "(draft) Same images, same model. The only thing you change is the sentence the class name goes into: just the word cat, a blurry photo of a cat, a drawing of a cat.",
    "(draft) Each template is a different classifier, and the accuracy moves.",
    "(draft) Here is the cell. Write a template with curly braces where the class name goes, and it prints your accuracy next to a photo of a.",
    "(draft) These images are tiny and blurry. Does saying so in the caption help? Try a few and keep your best one for the discussion. In our run the templates we tried ranged from 88 percent, for the bare class name, to 92 percent, for a drawing of, against 90.6 for a photo of. Small differences, but the words alone move it.",
    "(draft) The link opens Your turn 4."
  ]
});

st(`
  <h1 class="t">Lab, part 1: what you did</h1>
  <div class="flow">
    <div class="step b" data-step="1"><b>Embed</b><span class="label">images and captions, one space</span></div>
    <div class="arrow b" data-step="2">→</div>
    <div class="step b" data-step="2"><b>Compare</b><span class="label">cosine similarity</span></div>
    <div class="arrow b" data-step="3">→</div>
    <div class="step b" data-step="3"><b>The loss</b><span class="label">InfoNCE, the temperature</span></div>
    <div class="arrow b" data-step="4">→</div>
    <div class="step b" data-step="4"><b>Zero-shot</b><span class="label">the captions are the classifier</span></div>
  </div>
  <div class="label b" data-step="5" style="text-align:center">
    <a href="${LAB_NB}" target="_blank" rel="noopener" onclick="event.stopPropagation()">The whole notebook in Colab ↗</a> · what you did not finish, finish after class
  </div>
  ${f2cite('CLIP ViT-B/32 (OpenAI, through Hugging Face) · CIFAR-10 test images (Krizhevsky, 2009)')}
`, { notes: [
  "(draft) That is part one of the lab. Here is what you did.",
  "(draft) You embedded images and captions into one space.",
  "(draft) You compared them with cosine similarity, and the diagonal stood out.",
  "(draft) You computed the loss CLIP was trained with, and saw what the temperature does.",
  "(draft) And you classified images from their names alone, and saw that the words are part of the classifier.",
  "(draft) Whatever you did not finish, finish after class; the link opens the whole notebook. Now the reading: Konkle and Alvarez use the same kind of loss, with their own choice of views. (to add) The course site link, once the Day 5 card has it."
]});
}
