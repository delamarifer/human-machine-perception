/* Day 5 Hour 2 (Fernanda), published on its own so Shreya's day05/ deck stays as it is.
   Copied from claude/day05-fba377 (day05/order.js); Hour 1 rows removed.
   Day 5 running order: Transformers and Visual Representations.
   Since 2026-11-06 (feedback: too much content per class) Day 5 is two hours, one per instructor, and each hour
   has its own slides and its own lab, going back and forth.
   Hour 1 (Shreya): her transformer sections 1-6 from the instructors repo (day05 at ade0ad7, parts and wording
   unchanged, s-*), with Fernanda's attention and ViT scenes, then the language-model fine-tuning lab (f-lab).
   Hour 2 (Fernanda): Part 2, learning without labels (task-free, embeddings, self-supervised, contrastive loss,
   CLIP), lab part 1 (CLIP similarity), the reading (Konkle & Alvarez 2022), lab part 2 (views and RSA), homework.
   Not loaded now, files kept: Shreya's s-representations, s-clip, s-practical, s-rsa, s-thatcher, s-homework,
   and Fernanda's f-practical, f-space, f-human-rsa, f-thatcher (Part 2 replaces sections 7-9; sections 10 and 11
   are an open question in feedback/_day.md).
   Left out of this public deck: s-hw-questions (the start-of-class written questions, a response paper;
   those stay in the instructors repo only).
   Avoid apostrophes inside the strings. */
const ORDER = [
  // part                 what
  // ---- Hour 2 · Fernanda: learning without labels ----
  ['f-taskfree',          '7. Part 2 divider, from task to task-free, learning the underlying patterns'],
  ['f-embedding',         '7. Scene: from feature maps to an embedding'],
  ['f-ssl-scenes',        '7. Scenes: pretext tasks, contrastive circle, guessing game, views, uses of embeddings, CLIP training'],
  ['f-konkle',            '9. Reading, Konkle and Alvarez 2022: the question, IPCL, lab code for views (Your turn 4-5), categories emerge'],
  ['f-rsa',               '9. Scene: RDMs and RSA'],
  ['f-konkle-brain',      '9. Reading: lab code for RDMs and RSA (Your turn 6), brain fit, accuracy vs brain, discussion'],
  // The Part 2 scenes are loaded with sc() from inside f-ssl-scenes, f-taskfree and f-konkle-brain; their own part
  // files (f-pretext.js, f-infonce.js, f-contrastive.js, f-views.js, f-uses.js, f-cliptrain.js, ...) are not listed.
  // f-lab2 (the lab part 2 overview slide) is not loaded since 2026-11-06: its code slides sit inside section 9.
  // ---- Optional lab (Fernanda, 2026-11-06): the CLIP slide and the lab part 1 code slides ----
  ['f-clip',              'Optional lab: CLIP, the model; code: embed images and captions, Your turn 1 cosine similarity'],
  ['f-selfsup',           'Optional lab: code: Your turn 2 InfoNCE'],
  ['f-lab1',              'Optional lab: code: Your turn 3 zero-shot, leave classes out, Your turn 4 captions'],
  ['f-homework',          'Homework (copy of s-homework, labs updated): proposal tonight, detailed proposal Monday, labs, readings'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (the progress bar). Hour 1: Shreya's minutes for sections 1-6 (they add up to 64 before
   the lab, so hour 1 needs a new pass with her, see feedback/_day.md). Hour 2: 60 minutes. */
const SEC_MINUTES = {
  '7. Task-free': 18,
  '9. Reading + lab': 27,
  'Optional lab: CLIP': 10,
  'Homework': 3,
};
