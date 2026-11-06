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
  <ul class="frag">
    <li class="b">Labels are expensive: people labeled each of ImageNet's 1.28 million training images</li>
    <li class="b">Labels are narrow: one word per image, chosen for one task</li>
    <li class="b">Images are everywhere, unlabeled. Can the images be the teacher?</li>
  </ul>
  ${cite('Russakovsky et al., 2015, ImageNet Large Scale Visual Recognition Challenge')}
`, { notes: [
  "(draft) Part 2. In the first hour we built a transformer. Now the question is what it should learn, and whether it needs labels at all.",
  "(draft) Every network so far learned from labels. The ImageNet challenge set has about 1.28 million training images in 1,000 classes, and people labeled every one of them, through crowdsourcing.",
  "(draft) And a label is narrow: one word per image, picked for one task. The network keeps what that word needs. ImageNet's thousand classes include about ninety dog breeds, so a network learns dog breeds, whether or not that matters for anything else.",
  "(draft) Meanwhile there are vastly more images with no labels at all. So the question for this hour: can the images themselves be the teacher? That is self-supervised learning."
]});

/* The text slides 'From task to task-free' and 'Learning the underlying patterns' are replaced by the
   task-free scene (scenes/taskfree.html, 2026-11-06). */
sc('taskfreeScene', 'scenes/taskfree.html');

}
