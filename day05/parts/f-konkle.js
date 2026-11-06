/* PART: f-konkle (Day 5). Owner: Fernanda. Hour 2: discussing the reading (assigned on Day 4).
   Konkle, T. & Alvarez, G. A. (2022). A self-supervised domain-general learning framework for human ventral
   stream representation. Nature Communications 13, 491. doi:10.1038/s41467-022-28091-4. Open access, CC BY 4.0:
   figures reused with credit. Figures cropped from the PDF (page 3, Fig. 1a and 1b; page 7, Fig. 4) at 300 dpi,
   crop boxes found by script from the rendered page (blank rows and columns), not by eye: assets/konkle/.
   Every number below is from the paper's text (Results). Split in two: f-konkle (question, model, categories)
   and f-konkle-brain (brain fit, accuracy vs brain, discussion), with the RSA scene (f-rsa) between them. */
{
section('9. Reading + lab');

const KONKLE_CITE = 'Konkle &amp; Alvarez, 2022, <i>Nature Communications</i> 13, 491 (CC BY 4.0)';

/* Concept next to code (Fernanda, 2026-11-06: "don't leave the lab for the end"). The code panels are copied
   verbatim from notebooks/day05-lab-clip-embeddings.ipynb (contiguous lines, no edits; checked by script).
   Exercise cells show only the blank student version: the deck is public, solutions stay in the teacher copy. */
const LAB_NB = 'https://colab.research.google.com/github/delamarifer/human-machine-perception/blob/main/notebooks/day05-lab-clip-embeddings.ipynb';
const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const KONKLE_LAB_CSS = `<style>
  .konkle-lab{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:.85fr 1.4fr; gap:1.6vh 2.4vw; align-content:center; align-items:start; }
  .konkle-lab-src{ font-size:clamp(.75rem, .95vw, .95rem); color:var(--mute); letter-spacing:.03em; text-transform:uppercase; margin-bottom:.3vh; }
  .konkle-lab-code{ margin:0; font-family:Menlo, Consolas, monospace; font-size:clamp(.72rem, 1.02vw, 1.02rem); line-height:1.38;
    white-space:pre; overflow:hidden; background:#f8fafc; border:1px solid var(--line); border-radius:8px; padding:.8vh .9vw; }
  .konkle-lab-go{ grid-column:1 / -1; text-align:center; }
  .konkle-lab-sol{ margin-top:.6vh; }
  .konkle-lab-sol summary{ cursor:pointer; color:var(--mute); font-size:clamp(.8rem, 1vw, 1rem); }
  .konkle-lab-go .konkle-lab-sol{ display:inline-block; margin:0 0 0 1vw; }
  .konkle-lab-sol-pop{ position:fixed; left:50%; top:52%; transform:translate(-50%, -50%); z-index:50; width:min(92vw, 70rem);
    max-height:78vh; overflow:auto; background:#fff; border:2px solid var(--ink); border-radius:12px; padding:1.4vh 1.2vw;
    box-shadow:0 10px 40px rgba(15,23,42,.18); text-align:left; }
  .konkle-lab-sol-pop .konkle-lab-code{ background:#fffbeb; overflow:visible; }
  .konkle-lab-sol-pop .konkle-lab-code:empty{ display:none; }
  .konkle-lab-sol-pop .konkle-lab-ans{ line-height:1.4; }
</style>`;
const codeBox = (src, code) => `<div><div class="konkle-lab-src">${src}</div><pre class="konkle-lab-code">${esc(code)}</pre></div>`;
// Teacher-only solution (same mechanism as f-clip, day05-s7-8): open the deck on localhost with ?teacher. If
// notebooks/teacher/day05-lab-solutions.json exists (written by `day05_lab.py --teacher`, git-ignored), a collapsed
// Solution block appears under the Your-turn code. Never on the public site (no file there, and no fetch).
const solBox = cell => `<details class="konkle-lab-sol" data-konkle-sol="${cell}" hidden onclick="event.stopPropagation()"><summary>Solution (teacher copy)</summary><div class="konkle-lab-sol-pop"><pre class="konkle-lab-code"></pre><div class="label konkle-lab-ans"></div></div></details>`;
if (/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) && new URLSearchParams(location.search).has('teacher'))
  fetch('../notebooks/teacher/day05-lab-solutions.json', { cache: 'no-store' }).then(r => r.ok ? r.json() : null).then(sol => {
    if (!sol) return;
    const fill = () => document.querySelectorAll('[data-konkle-sol]').forEach(d => {
      const k = d.dataset.konkleSol; if (!sol[k] && !sol[k + '-answer']) return;
      d.querySelector('pre').textContent = sol[k] || ''; d.querySelector('.konkle-lab-ans').textContent = sol[k + '-answer'] || ''; d.hidden = false; });
    fill(); setTimeout(fill, 1500);
  }).catch(() => {});

st(`
  <h1 class="t">Reading: do categories have to be taught?</h1>
  <div class="cols">
    <div class="card b"><div class="k">What we know</div><div class="label">Late stages of the ventral stream carry a lot of information about object categories.</div></div>
    <div class="card b"><div class="k">Two accounts</div><div class="label">Category pressure shapes it, or it falls out of learning the structure of images.</div></div>
    <div class="card hi b"><div class="k">Their test</div><div class="label">A network that never sees a label. Does it still end up brain-like?</div></div>
  </div>
  ${cite(KONKLE_CITE)}
`, { notes: [
  "(draft) Now the reading: Konkle and Alvarez, 2022. You read it for today; let's go through it together.",
  "(draft) The starting fact: the later stages of the ventral visual stream carry a lot of information about object categories, faces, bodies, scenes, animals, objects.",
  "(draft) Two accounts of how it gets that way. One says category-level pressures shape it: the system is pushed to separate the categories that matter. The other says it is domain-general: learn the structure of natural images well, and the category structure falls out. They also point out that a CNN trained on ImageNet is not a clean test of the first account, because its labels are much finer than any theory proposes, three kinds of crab, ninety dog breeds.",
  "(draft) Their test: train a network that never sees a label, and ask whether it still ends up organized like the brain. This is the task-free idea from the start of the hour, applied to a question about the brain."
]});

st(`
  <h1 class="t">Their model: instance-prototype contrastive learning</h1>
  <img class="b" src="assets/konkle/fig1a-ipcl.png" alt="Konkle and Alvarez 2022, Figure 1a: an image, five augmented samples, a convolutional encoder, and an embedding sphere with the instance prototype and a memory queue" style="display:block;margin:0.4em auto;max-width:72%;max-height:44vh">
  <ul class="frag">
    <li class="b">Five views of each image: crops, rescaling, color changes</li>
    <li class="b">Pull the views toward their average, the instance prototype</li>
    <li class="b">Push away from the 4,096 most recent images</li>
  </ul>
  ${cite('Fig. 1a, ' + KONKLE_CITE)}
`, { notes: [
  "(draft) Their model is contrastive learning, the recipe from earlier, with a few choices of their own. They call it instance-prototype contrastive learning, IPCL.",
  "(draft) Here is the figure. An image goes in, and they make five views of it: random crops, rescaling, and color changes. Each view goes through a convolutional network, an AlexNet, into a 128-number embedding on the unit sphere.",
  "(draft) Five views, not two. So instead of pulling pairs together, they pull all five toward their average, the instance prototype, the green star in the middle.",
  "(draft) And the negatives are the embeddings of the 4,096 most recent images, kept in a memory queue. Notice what they are asking for: tell every image apart from every other image. Nothing about categories.",
  "(draft) One question to keep: which views did they choose, and what does that make the network ignore? Color changes are in the list."
]});

st(`${KONKLE_LAB_CSS}
  <h1 class="t">In the lab: their views, on CLIP</h1>
  <div class="konkle-lab">
    <div class="card b" data-step="1"><div class="k">Views</div><div class="label">Each kind of view changes the image in one way: a crop, a color change, or both.</div></div>
    <div class="b" data-step="1">${codeBox('Section 4 · given', `VIEWS = {
    "crop":  T.RandomResizedCrop(32, scale=(0.4, 1.0)),
    "color": T.ColorJitter(brightness=0.5, contrast=0.5, saturation=0.8, hue=0.3),
    "both":  T.Compose([T.RandomResizedCrop(32, scale=(0.4, 1.0)),
                        T.ColorJitter(brightness=0.5, contrast=0.5, saturation=0.8, hue=0.3)]),
}`)}</div>
    <div class="card b" data-step="2"><div class="k">The instance test</div><div class="label">For each view, find the most similar other view. Is it from the same image?</div></div>
    <div class="b" data-step="2">${codeBox('Helper code · given', `def nearest_other(emb):
    """For each row, the index of the most similar OTHER row (by cosine similarity)."""
    sims = emb @ emb.T
    sims.fill_diagonal_(-2)
    return sims.argmax(dim=1)`)}</div>
    <div class="card hi b" data-step="3"><div class="k">Your turn 5</div><div class="label">Score it: the fraction of views whose neighbor comes from the same image. Chance is about 4%.</div></div>
    <div class="b" data-step="3">${codeBox('Your turn 5 · you write it', `# YOUR TURN 5 · The fraction of views whose nearest other view comes from the same image.
def instance_accuracy(emb, owner):
    return None    # replace None: use nearest_other(emb) and owner`)}${solBox('turn-5')}</div>
    <div class="label konkle-lab-go b" data-step="4">
      <a href="${LAB_NB}#scrollTo=turn-5" target="_blank" rel="noopener" onclick="event.stopPropagation()">Open Your turn 5 in Colab ↗</a> · then talk it over (Your turn 6) · then back to the reading
      ${solBox('turn-6')}
    </div>
  </div>
  ${cite('Notebook: day05-lab-clip-embeddings, Part 2 · CLIP ViT-B/32 · CIFAR-10 test images (Krizhevsky, 2009)')}
`, { notes: [
  "(draft) Before the results, let's try their objective ourselves. Not on their network: on CLIP, the model from the first lab.",
  "(draft) First, views, the way Konkle and Alvarez made them. In the notebook this is given: a random crop that keeps 40 to 100 percent of the image area and scales it back up, a color change, or both at once. Each image gets five views of each kind.",
  "(draft) Their objective becomes a test. For every view, find the most similar other view among all the views. If it is a view of the same image, the embedding kept what makes that image itself. The helper nearest_other does the search: a similarity matrix, the diagonal pushed down so a view cannot pick itself, then the largest in each row.",
  "(draft) Your turn 5 is the score: what fraction of views have a neighbor from their own image. Twenty images, five views each, so chance is four out of ninety-nine, about four percent. Run it for crops, for color, and for both.",
  "(draft) The link opens Your turn 5. Then Your turn 6, talk it over with your neighbor: which views does CLIP tolerate, and what would a network trained on color changes be blind to? Then we come back for the paper's results."
]});

st(`
  <h1 class="t">Do categories emerge without labels?</h1>
  <img class="b" src="assets/konkle/fig1b-tsne.png" alt="Konkle and Alvarez 2022, Figure 1b: t-SNE of 500 ImageNet images from ten categories in the IPCL embedding; images of the same category cluster" style="display:block;margin:0.4em auto;max-width:48%;max-height:40vh">
  <table class="tbl b">
    <thead><tr><th>ImageNet, 1,000 classes, by neighbors</th><th>Top-1</th></tr></thead>
    <tbody>
      <tr><td>Untrained network</td><td>3.5%</td></tr>
      <tr><td>IPCL, no labels</td><td>37.3%</td></tr>
      <tr><td>Same network, trained on the labels</td><td>58.8%</td></tr>
    </tbody>
  </table>
  ${cite('Fig. 1b and Results, ' + KONKLE_CITE)}
`, { notes: [
  "(draft) First result: is there category information in a space that was never asked for it?",
  "(draft) The picture is a t-SNE map of 500 images from ten ImageNet categories, placed by the IPCL embedding. The colors are the true categories, added afterwards. Images of the same category land together.",
  "(draft) Numbers. They classify by nearest neighbors in the embedding, out of 1,000 classes, where chance is a tenth of a percent. An untrained network gets 3.5 percent. IPCL gets 37.3 percent with no labels at all. The same network trained on the labels gets 58.8. So the labels still help, but a lot of category structure emerges without them."
]});
}
