/* Day 5 running order: Transformers and Visual Representations.
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
  // ---- Hour 1 · Shreya: transformers ----
  ['s-title',             'Title and the question for the day'],
  ['s-opening',           '1. How can a machine understand relationships between image regions?'],
  ['s-cnns',              '2. From CNNs to Transformers'],
  ['s-transformer',       '3. What is a transformer?'],
  ['s-attention',         '4. How does a model decide what information matters?'],
  ['f-attention',         '4. Scene: patches attending to patches, computed'],
  ['s-vit',               '5. How does a Vision Transformer work?'],
  ['f-vit',               '5. Scene: the steps of a ViT block'],
  ['s-compare',           '6. CNNs vs Vision Transformers'],
  ['f-lab',               'Lab (hour 1): MIT 6.S191 Lab 3, fine-tune a language model with LoRA'],
  // ---- Hour 2 · Fernanda: learning without labels ----
  ['f-taskfree',          '7. Part 2 divider, from task to task-free, learning the underlying patterns'],
  ['f-embedding',         '7. Scene: from feature maps to an embedding'],
  ['f-selfsup',           '7. Self-supervised, contrastive learning, the contrastive loss, the views decide'],
  ['f-clip',              '7. What embeddings are good for; one example: CLIP similarity'],
  ['f-lab1',              '8. Lab part 1: CLIP similarity and zero-shot classification'],
  ['f-konkle',            '9. Reading, Konkle and Alvarez 2022: the question, IPCL, lab code for views (Your turn 4-5), categories emerge'],
  ['f-rsa',               '9. Scene: RDMs and RSA'],
  ['f-konkle-brain',      '9. Reading: lab code for RDMs and RSA (Your turn 6), brain fit, accuracy vs brain, discussion'],
  // f-lab2 (the lab part 2 overview slide) is not loaded since 2026-11-06: its code slides sit inside section 9.
  ['f-homework',          'Homework (copy of s-homework, labs updated): proposal tonight, detailed proposal Monday, labs, readings'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (the progress bar). Hour 1: Shreya's minutes for sections 1-6 (they add up to 64 before
   the lab, so hour 1 needs a new pass with her, see feedback/_day.md). Hour 2: 60 minutes. */
const SEC_MINUTES = {
  '1. Regions': 8,
  '2. CNNs': 10,
  '3. Blocks': 12,
  '4. Attention': 12,
  '5. ViT': 12,
  '6. Compare': 10,
  'Lab: LLM': 20,
  '7. Task-free': 15,
  '8. Lab: CLIP': 15,
  '9. Reading + lab': 27,
  'Homework': 3,
};
