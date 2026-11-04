/* PART: project (Day 5). Owner: to decide (see README.md). Plan: 5 min, project connection; then homework.
   Deadline from the syllabus: project proposal due Fri, Nov 6, midnight. */
{
section('Project');

st(`
  <h1 class="t">Your project</h1>
  <ul class="frag">
    <li class="b">Proposal due Friday, November 6, at midnight</li>
    <li class="b">A first baseline: embed your images with a pretrained model</li>
    <li class="b">Nearest neighbors or a simple classifier on the embeddings</li>
  </ul>
`, { notes: [
  "(draft) A word about your projects.",
  "(draft) Your project proposal is due this Friday, November 6, at midnight.",
  "(draft) Whatever your project, today's tools give you a quick first baseline: embed your images with a pretrained model, the code from the lab.",
  "(draft) Then try nearest neighbors, or a simple classifier on top of the embeddings. If that already works well, you know where the bar is; if it fails, the failures tell you what the embedding is missing."
]});

st(`
  <h1 class="t">Homework</h1>
  <ul class="frag">
    <li class="b">Reading<div class="todo">to confirm: the plan says Ch. 30 of the Vision Book</div></li>
    <li class="b">Embed a small image set with a pretrained model</li>
    <li class="b">Which properties show up in the embedding space, and which do not?</li>
  </ul>
`, { notes: [
  "(draft) Homework for next time.",
  "(draft) (to write) The reading.",
  "(draft) Use a pretrained vision model to extract embeddings for a small image set of your choice.",
  "(draft) And investigate: which properties of the images are reflected in the embedding space, and which are not? Write down how you tested it."
]});
}
