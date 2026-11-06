/* PART: f-clip (Day 5). Owner: Fernanda. Hour 2, right after the embedding scene (Round 6, 2026-11-06:
   lab interleaved with the concepts; CLIP is introduced first, so the lab code can use its encoders).
   This part: CLIP as the model we use (two encoders, one space); code step 1, embed images and captions
   (notebook section 1, cell id embed); code step 2, cosine similarity (Your turn 1).
   How CLIP was trained comes later, in f-lab1, after the contrastive loss.
   Code on the code slides is copied verbatim from the STUDENT notebook (notebooks/build/day05_lab.py, Part 1):
   given code and None placeholders only, never a solution (the repository is public). Change both together.
   Sources: Radford et al., 2021; Foundations of Computer Vision, Sec. 51.3. */
{
section('7. Task-free');

const LAB_NB = 'https://colab.research.google.com/github/delamarifer/human-machine-perception/blob/main/notebooks/day05-lab-clip-embeddings.ipynb';
const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const CSS = `<style>
  .fclip-code{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:minmax(0, 30fr) minmax(0, 70fr); gap:3vw; align-items:center; }
  .fclip-left{ display:flex; flex-direction:column; gap:2.2vh; }
  .fclip-left .frag{ margin:0; }
  .fclip-codebox{ container-type:inline-size; min-width:0; }
  .fclip-pre{ margin:0; font-family:Menlo, Consolas, monospace; font-size:min(1.15rem, 1.7cqw); line-height:1.45;
    white-space:pre; overflow:hidden; background:#f8fafc; border:1px solid var(--line); border-radius:8px; padding:1.4vh 1.2vw; }
  .fclip-open{ align-self:flex-start; border:3px solid var(--ink); border-radius:999px; padding:1vh 1.6vw;
    font-weight:700; font-size:clamp(1rem, 1.5vw, 1.4rem); color:var(--ink); text-decoration:none; }
  .fclip-sol{ margin-top:1vh; }
  .fclip-sol summary{ cursor:pointer; color:var(--mute); font-size:clamp(.8rem, 1vw, 1rem); }
  .fclip-sol-pop{ position:fixed; left:50%; top:52%; transform:translate(-50%, -50%); z-index:50; width:min(92vw, 70rem);
    max-height:78vh; overflow:auto; background:#fff; border:2px solid var(--ink); border-radius:12px; padding:1.4vh 1.2vw;
    box-shadow:0 10px 40px rgba(0,0,0,.18); }
  .fclip-sol-pop .fclip-pre{ background:#fffbeb; overflow:visible; }
  .fclip-sol-pop .fclip-pre:empty{ display:none; }
  .fclip-sol-pop .fclip-ans{ margin-top:1vh; line-height:1.4; }
</style>`;
// Teacher-only solution: open the deck on localhost with ?teacher (e.g. deck.html?teacher). If
// notebooks/teacher/day05-lab-solutions.json exists (written by `day05_lab.py --teacher`, git-ignored), a collapsed
// Solution block appears under each Your-turn code. Never on the public site (no file there, and no fetch).
const solBox = cell => `<details class="fclip-sol" data-fclip-sol="${cell}" hidden onclick="event.stopPropagation()"><summary>Solution (teacher copy)</summary><div class="fclip-sol-pop" title="click to close" onclick="this.parentNode.open = false"><pre class="fclip-pre"></pre><div class="label fclip-ans"></div></div></details>`;
if (/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) && new URLSearchParams(location.search).has('teacher'))
  fetch('../notebooks/teacher/day05-lab-solutions.json', { cache: 'no-store' }).then(r => r.ok ? r.json() : null).then(sol => {
    if (!sol) return;
    const fill = () => document.querySelectorAll('[data-fclip-sol]').forEach(d => {
      const k = d.dataset.fclipSol; if (!sol[k] && !sol[k + '-answer']) return;
      d.querySelector('pre').textContent = sol[k] || ''; d.querySelector('.fclip-ans').textContent = sol[k + '-answer'] || ''; d.hidden = false; });
    fill(); setTimeout(fill, 1500);
  }).catch(() => {});

// Concept cues on the left (one click each), then the notebook cell on the right, then "Try it", then the link.
const codeSlide = ({ title, cues, code, tryIt, cell, label, notes }) => {
  const n = cues.length;
  st(`
  <h1 class="t">${title}</h1>
  <div class="fclip-code">
    <div class="fclip-left">
      <ul class="frag">${cues.map((c, i) => `<li class="b" data-step="${i + 1}">${c}</li>`).join('')}</ul>
      <div class="card hi b" data-step="${n + 2}"><div class="k">Try it</div><div class="label">${tryIt}</div></div>
      <a class="fclip-open b" data-step="${n + 3}" href="${LAB_NB}#scrollTo=${cell}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${label} ↗</a>
    </div>
    <div class="fclip-codebox b" data-step="${n + 1}"><pre class="fclip-pre">${esc(code)}</pre>${cell.startsWith('turn-') ? solBox(cell) : ''}</div>
  </div>${CSS}
`, { notes });
};

st(`
  <h1 class="t">The model we will use: CLIP</h1>
  <div class="flow">
    <div class="step b" data-step="1"><b>Image encoder</b><span class="label">image → 512 numbers</span></div>
    <div class="arrow b" data-step="2">+</div>
    <div class="step b" data-step="2"><b>Text encoder</b><span class="label">caption → 512 numbers</span></div>
    <div class="arrow b" data-step="3">→</div>
    <div class="step b" data-step="3"><b>One space</b><span class="label">both scaled to length 1, on the same sphere</span></div>
  </div>
  <div class="card hi b" data-step="4"><div class="k">Close means similar</div><div class="label">An image and a caption that match land near each other. How it learned that comes later today.</div></div>
  ${f2cite('Radford et al., 2021, Learning Transferable Visual Models From Natural Language Supervision · <i>Foundations of Computer Vision</i>, Sec. 51.3')}
`, { notes: [
  "(draft) Before we ask how to learn an embedding without labels, let us get our hands on one. The model for today's lab is CLIP.",
  "(draft) CLIP has an image encoder. In the version we use, it is a Vision Transformer, the one from the first hour. An image goes in, 512 numbers come out.",
  "(draft) And a text encoder, a transformer over the words of a caption. A caption goes in, 512 numbers come out.",
  "(draft) Both vectors are scaled to length one, so they live on the same sphere, and we can compare an image with a sentence directly.",
  "(draft) An image and a caption that describe the same thing land close together. How CLIP learned to do that is the second half of today: it never saw a class label. First, let us see it work."
]});

codeSlide({
  title: 'In code: embed images and captions',
  cues: ['Ten images, one per class', 'Ten captions: “a photo of a …”', 'Each one → 512 numbers, length 1'],
  code: String.raw`# 1 · Ten images, one per class, and ten captions
start = 0    # TRY IT: start = 100 or 5000 picks ten other test images
ten = first_of_each_class(per_class=1, start=start)
ten_images = [cifar[i][0] for i in ten]
ten_labels = [CLASSES[cifar.targets[i]] for i in ten]
show_images(ten_images, ten_labels)

captions = [f"a photo of a {c}" for c in CLASSES]
image_emb = embed_images(ten_images)
text_emb = embed_texts(captions)
print("image embeddings:", tuple(image_emb.shape))
print("text embeddings: ", tuple(text_emb.shape))
print("length of the first image embedding:", round(image_emb[0].norm().item(), 3))
print("its first five numbers:", image_emb[0, :5].numpy().round(3))`,
  tryIt: 'Run section 0, then this cell. Look at the first five numbers: do they mean anything on their own?',
  cell: 'embed', label: 'Open section 1 in Colab',
  notes: [
    "(draft) Here is that in code. This is the first cell of the lab, exactly as it is in the notebook.",
    "(draft) We take ten images from a small dataset called CIFAR-10, one from each of its ten classes: airplane, car, bird, cat, and so on. They are tiny, 32 by 32 pixels.",
    "(draft) And ten captions, one per class: a photo of an airplane, a photo of a cat.",
    "(draft) embed_images and embed_texts run CLIP's two encoders. Each image and each caption becomes 512 numbers, scaled to length one. The helper code does the plumbing; you do not need to read it.",
    "(draft) This is the cell. The setup cell above it loads CLIP and the images; the first run downloads them, so start now.",
    "(draft) Run it and look at the first five numbers of an image's embedding. They mean nothing on their own. An embedding is only useful when you compare it with another one, which is the next step.",
    "(draft) The link opens this cell in Colab. Take a couple of minutes."
  ]
});

codeSlide({
  title: 'Your turn 1: cosine similarity',
  cues: ['Length 1 on both sides: cosine = dot product', 'Every image × every caption: a 10 × 10 matrix', 'If CLIP works, the diagonal stands out'],
  code: String.raw`# YOUR TURN 1 · A 10 x 10 matrix:
# similarity[i, j] = cosine similarity of image i and caption j.
similarity = None    # replace None, using image_emb and text_emb

if similarity is None:
    print("Your turn 1 is blank: using the course's answer.")
    similarity = course_similarity(image_emb, text_emb)
show_matrix(similarity, ten_labels, captions, "CLIP: every image x every caption")`,
  tryIt: 'Set <code>start = 100</code> in section 1 and run both cells again. Ten new images: is the diagonal still the strongest?',
  cell: 'turn-1', label: 'Open Your turn 1 in Colab',
  notes: [
    "(draft) Your turn 1. How close is each image to each caption?",
    "(draft) Similarity on the sphere is the cosine of the angle between two vectors. Because both have length one, the cosine is just the dot product: multiply number by number and add.",
    "(draft) Do it for every image against every caption at once, and you get a ten by ten matrix, one row per image, one column per caption. One line of code does it.",
    "(draft) If CLIP works, each image is closest to its own caption, so the diagonal stands out. The cells off the diagonal tell you which mistakes are close: cat and dog, car and truck.",
    "(draft) Here is the cell. Replace the None. If you leave it blank, the notebook uses the course's answer, so the rest still runs.",
    "(draft) Then change start to a hundred in the first cell and run both again. Ten different images. If the diagonal still holds, CLIP is not tied to these pictures. In our run it does: with start at a hundred, every one of the ten images is still closest to its own caption.",
    "(draft) The link opens Your turn 1. A few minutes, then we come back to ask how a network learns a space like this with no labels."
  ]
});
}
