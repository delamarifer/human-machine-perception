/* PART: f-taskfree (Day 5). Owner: Fernanda. Hour 2 opens here (Fernanda's slides, 2026-11-06).
   Fernanda's outline for Part 2: from task to task-free; learning the underlying patterns; embeddings;
   self-supervised; contrastive loss; you can still do a lot with those embeddings; one example: CLIP
   similarity (and lab). Subsections follow Torralba, Isola & Freeman, Foundations of Computer Vision
   (visionbook.mit.edu), Ch. 30 Representation Learning and Ch. 51 Vision and Language.
   This part: the divider, "From task to task-free", "Learning the underlying patterns". The embedding scene
   (f-embedding) comes right after it. */
{
section('7. Task-free');

st(`
  <h1 class="t">Part 2 · Learning without labels</h1>
  <div class="label b" style="font-size:1.4em">From a task to the structure of images</div>
`, { notes: [
  "(draft) Part 2. In the first hour we built a transformer. Now the question is what it should learn, and whether it needs labels at all.",
  "(draft) We go from training a network for one task to letting it learn the structure of images themselves."
]});

st(`
  <h1 class="t">From task to task-free</h1>
  <div class="cols">
    <div class="card b"><div class="k">Task</div><div class="label">Image → one of 1,000 labels. The network keeps what the labels need.</div></div>
    <div class="card b"><div class="k">The cost</div><div class="label">Someone labels every image, and the labels decide what is kept.</div></div>
    <div class="card hi b"><div class="k">Task-free</div><div class="label">Learn the structure of the images themselves. Choose the task later.</div></div>
  </div>
  ${cite('Torralba, Isola &amp; Freeman, <i>Foundations of Computer Vision</i>, Ch. 30, Representation Learning')}
`, { notes: [
  "(draft) Everything so far has been trained for a task. Here is the alternative.",
  "(draft) The usual recipe: show the network an image, and ask for one of a thousand labels, the ImageNet categories. Whatever it learns, it learns because the labels need it.",
  "(draft) That has two costs. Someone has to label every image. And the labels decide what the network keeps: ImageNet has three kinds of crab and about ninety dog breeds as separate labels, so it learns to tell those apart, whether or not that matters for anything else. Konkle and Alvarez make this point in today's reading.",
  "(draft) Task-free learning flips it. Learn the structure of the images first, with no labels, and choose the task later. The book puts the trade-off simply: a good representation for one task may be a bad one for another, so the goal is a representation that serves many of the tasks people care about."
]});

st(`
  <h1 class="t">Learning the underlying patterns</h1>
  <div class="cols">
    <div class="card b"><div class="k">Compress</div><div class="label">Keep far fewer numbers than pixels. What survives has to be the structure.</div></div>
    <div class="card b"><div class="k">Predict</div><div class="label">Fill in a hidden part, the color, the next frame. To predict it, you need the pattern.</div></div>
    <div class="card hi b"><div class="k">An embedding</div><div class="label">What comes out: one vector per image, in a space where close means similar.</div></div>
  </div>
  ${cite('<i>Foundations of Computer Vision</i>, Sec. 30.2–30.3: problem setting; compression and prediction')}
`, { notes: [
  "(draft) Without a label, what tells the network it is doing well? The book gives two answers.",
  "(draft) Compression. Squeeze the image into far fewer numbers than it has pixels. You cannot keep everything, so what survives has to be the regular structure, not the noise.",
  "(draft) Prediction. Hide part of the data and predict it: the missing patch, the color of a gray photo, the next frame of a video. You can only predict well if you have picked up the pattern.",
  "(draft) Either way, what we keep is the encoder's output: an embedding, one vector per image, in a space that is smaller and better organized than pixels, where close means similar. The next slide builds one, step by step."
]});
}
