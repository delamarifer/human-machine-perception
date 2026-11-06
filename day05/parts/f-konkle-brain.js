/* PART: f-konkle-brain (Day 5). Owner: Fernanda. Hour 2, the reading, second half (after the RSA scene).
   Konkle & Alvarez (2022), Nature Communications 13, 491, CC BY 4.0. Numbers from the Results text:
   two fMRI datasets (Object Orientation: 8 items x 5 in-plane orientations; Inanimate Objects: 72 objects),
   three sectors (EarlyV, pOTC, aOTC), voxel-wise encoding RSA (veRSA); IPCL >= or not significantly different
   from category-supervised in 56/60 comparisons (Supplementary Table 2); visual diet: mean absolute difference
   from the ImageNet baseline < 0.044, faces-only the outlier; Fig. 4: top-1 from 26 to 73% across models, no
   gain in brain fit, gap to the noise ceiling in aOTC for Inanimate Objects (noise ceiling r = 0.60). */
{
section('9. Reading + lab');

const KONKLE_CITE2 = 'Konkle &amp; Alvarez, 2022, <i>Nature Communications</i> 13, 491 (CC BY 4.0)';

/* Concept next to code, after the RSA scene (same rules as the views slide in f-konkle: code copied verbatim from
   the student notebook, checked by script; the exercise shows only its blank version). */
const LAB_NB = 'https://colab.research.google.com/github/delamarifer/human-machine-perception/blob/main/notebooks/day05-lab-part2-views-rsa.ipynb';
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
// notebooks/teacher/day05-lab-part2-solutions.json exists (written by `day05_lab.py --teacher`, git-ignored), a collapsed
// Solution block appears under the Your-turn code. Never on the public site (no file there, and no fetch).
const solBox = cell => `<details class="konkle-lab-sol" data-konkle-sol="${cell}" hidden onclick="event.stopPropagation()"><summary>Solution (teacher copy)</summary><div class="konkle-lab-sol-pop"><pre class="konkle-lab-code"></pre><div class="label konkle-lab-ans"></div></div></details>`;
if (/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) && new URLSearchParams(location.search).has('teacher'))
  fetch('../notebooks/teacher/day05-lab-part2-solutions.json', { cache: 'no-store' }).then(r => r.ok ? r.json() : null).then(sol => {
    if (!sol) return;
    const fill = () => document.querySelectorAll('[data-konkle-sol]').forEach(d => {
      const k = d.dataset.konkleSol; if (!sol[k] && !sol[k + '-answer']) return;
      d.querySelector('pre').textContent = sol[k] || ''; d.querySelector('.konkle-lab-ans').textContent = sol[k + '-answer'] || ''; d.hidden = false; });
    fill(); setTimeout(fill, 1500);
  }).catch(() => {});

st(`${KONKLE_LAB_CSS}
  <h1 class="t">In the lab: RDMs and RSA on CLIP</h1>
  <div class="konkle-lab">
    <div class="card b" data-step="1"><div class="k">Three RDMs</div><div class="label">The same 100 images: 1 − cosine similarity in CLIP, 1 − correlation of the pixels, and a model: same class or not.</div></div>
    <div class="b" data-step="1">${codeBox('Section 2 · given', `clip_emb = embed_images(hundred_images).numpy()
rdm_clip = 1 - clip_emb @ clip_emb.T

pixels = np.stack([np.asarray(im, dtype=float).ravel() for im in hundred_images])
rdm_pixels = 1 - np.corrcoef(pixels)

rdm_category = (hundred_labels[:, None] != hundred_labels[None, :]).astype(float)`)}</div>
    <div class="card b" data-step="2"><div class="k">Each pair once</div><div class="label">An RDM is symmetric: keep only the numbers above the diagonal.</div></div>
    <div class="b" data-step="2">${codeBox('Helper code · given', `def upper(m):
    """The numbers above the diagonal of a square matrix, as one long vector (each pair once)."""
    m = np.asarray(m)
    i, j = np.triu_indices(len(m), k=1)
    return m[i, j]`)}</div>
    <div class="card hi b" data-step="3"><div class="k">Your turn 3</div><div class="label">RSA: the rank correlation of two RDMs. CLIP vs the category model, then pixels vs the category model.</div></div>
    <div class="b" data-step="3">${codeBox('Your turn 3 · you write it', `# YOUR TURN 3 · Spearman correlation between the upper triangles of two RDMs.
def rsa(rdm_a, rdm_b):
    return None    # replace None: use upper(...) and spearmanr(...).correlation`)}${solBox('turn-3')}</div>
    <div class="label konkle-lab-go b" data-step="4">
      <a href="${LAB_NB}#scrollTo=turn-3" target="_blank" rel="noopener" onclick="event.stopPropagation()">Open part 2 in Colab (Your turn 3) ↗</a> · then back to the reading
    </div>
  </div>
  ${f2cite('Notebook: Day 5 part 2 (day05-lab-part2-views-rsa) · CLIP ViT-B/32 · CIFAR-10 test images (Krizhevsky, 2009)')}
`, { notes: [
  "(draft) Now the same comparison in the notebook, on real images and a real network.",
  "(draft) A hundred CIFAR images, ten from each class. Three dissimilarity matrices, given in the notebook: one minus the cosine similarity of the CLIP embeddings, one minus the correlation of the raw pixels, and the category model, zero for two images of the same class and one otherwise. Like the scene, that last one is a hypothesis, not a measurement.",
  "(draft) The matrix is symmetric and its diagonal is zero, so each pair counts once: the helper upper keeps only the numbers above the diagonal, as one long vector.",
  "(draft) Your turn 3 is RSA itself: the Spearman rank correlation between two of those vectors. Compare CLIP with the category model, and the pixels with the category model. CLIP never saw these ten labels.",
  "(draft) The link opens Your turn 3. Then we come back to see how Konkle and Alvarez did this with brain data."
]});

/* The text slide 'Does it match the ventral stream?' is replaced by the veRSA scene (scenes/versa.html, 2026-11-06). */
sc('versaScene', 'scenes/versa.html');

st(`
  <h1 class="t">More accuracy is not more brain-like</h1>
  <img class="b" src="assets/konkle/fig4-accuracy-vs-brain.png" alt="Konkle and Alvarez 2022, Figure 4: for EarlyV, pOTC and aOTC, brain fit (cross-validated max correlation) against ImageNet top-1 accuracy for contrastive and category-supervised models; a gap to the noise ceiling remains" style="display:block;margin:0.4em auto;max-width:86%;max-height:46vh">
  <ul class="frag">
    <li class="b">Top-1 accuracy from 26% to 73% across models: no better brain fit</li>
    <li class="b">A gap remains in anterior cortex for the 72 objects</li>
  </ul>
  ${f2cite('Fig. 4, ' + KONKLE_CITE2)}
`, { notes: [
  "(draft) Third result. Newer contrastive models, like SimCLR, MoCo version 2 and SwAV, classify much better than theirs, close to supervised models. Are they more brain-like?",
  "(draft) This figure answers it, for the 72 inanimate objects. Each point is a model. Across, its ImageNet accuracy; up, how well it fits the brain. Filled markers learned without labels; open markers were trained on labels. The black line is the noise ceiling, the best any model could do given how reliable the data are.",
  "(draft) Accuracy ranges from 26 to 73 percent, and the brain fit does not go up with it. Being better at the benchmark did not make a model more brain-like.",
  "(draft) And in anterior cortex there is a gap that none of them closes, the red arrow. Something about how the brain arranges these objects is still missing from every model, supervised or not. They also tried other visual diets, scenes, faces, mixtures, and it barely mattered, except that a diet of faces alone did worse on the eight objects at five orientations, in the later regions."
]});

st(`
  <h1 class="t">Discussion</h1>
  <ul class="frag">
    <li class="b">If the goal is not categories, what is it?</li>
    <li class="b">They chose the views. What views does a baby get?</li>
    <li class="b">Is benchmark accuracy the right yardstick for a model of the brain?</li>
    <li class="b">Their caveat: existence proofs, not models of the brain</li>
  </ul>
  ${f2cite(KONKLE_CITE2)}
`, { notes: [
  "(draft) Questions to talk over with your neighbor, then with the room. Pull from what you wrote.",
  "(draft) If categories are not the goal, what is? Their answer: tell every view of the world apart from every other, in a compact code. Do you buy it?",
  "(draft) Remember the views decide what is kept. They chose crops, rescaling and color changes by hand. What would a baby's views be? They tested one model trained on video from head cameras worn by young children, and it did not close the gap either. They point to learning over time, from video, as the open frontier.",
  "(draft) Accuracy on ImageNet did not predict brain fit. So what should we measure when we say a model is like the brain?",
  "(draft) And their own caveat, worth saying out loud: these networks are not offered as models of the brain. They are existence proofs, showing what kind of representation can be learned from images alone, without category labels."
]});
}
