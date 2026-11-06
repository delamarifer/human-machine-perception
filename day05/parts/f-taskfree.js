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

/* The text slides 'From task to task-free' and 'Learning the underlying patterns' are replaced by the
   task-free scene (scenes/taskfree.html, 2026-11-06). */
sc('taskfreeScene', 'scenes/taskfree.html');

}
