/* PART: f-konkle (Day 5). Owner: Fernanda. Hour 2: discussing the reading (assigned on Day 4).
   Konkle, T. & Alvarez, G. A. (2022). A self-supervised domain-general learning framework for human ventral
   stream representation. Nature Communications 13, 491. doi:10.1038/s41467-022-28091-4. Open access, CC BY 4.0:
   figures reused with credit. Figures cropped from the PDF (page 3, Fig. 1a and 1b; page 7, Fig. 4) at 300 dpi,
   crop boxes found by script from the rendered page (blank rows and columns), not by eye: assets/konkle/.
   Every number below is from the paper's text (Results). Split in two: f-konkle (question, model, categories)
   and f-konkle-brain (brain fit, accuracy vs brain, discussion), with the RSA scene (f-rsa) between them. */
{
section('9. Reading');

const KONKLE_CITE = 'Konkle &amp; Alvarez, 2022, <i>Nature Communications</i> 13, 491 (CC BY 4.0)';

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
