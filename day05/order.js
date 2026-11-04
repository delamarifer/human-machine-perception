/* Day 5 running order: Transformers and Visual Representations.
   Base: Shreya's deck from the instructors repo (day05 at ade0ad7), her parts and wording unchanged (s-*).
   Fernanda's live-computed scenes (f-*) sit next to the slide each one illustrates. f-practical, f-human-rsa and
   f-homework are copies of Shreya's parts that name the new lab (MIT 6.S191 Lab 3); her originals stay, unloaded.
   Left out of this public deck: s-hw-questions (the start-of-class written questions, a response paper;
   those stay in the instructors repo only).
   Avoid apostrophes inside the strings. */
const ORDER = [
  // part                 what
  ['s-title',             'Title and the question for the day'],
  ['s-opening',           '1. How can a machine understand relationships between image regions?'],
  ['s-cnns',              '2. From CNNs to Transformers'],
  ['s-transformer',       '3. What is a transformer?'],
  ['s-attention',         '4. How does a model decide what information matters?'],
  ['f-attention',         '4. Scene: patches attending to patches, computed'],
  ['s-vit',               '5. How does a Vision Transformer work?'],
  ['f-vit',               '5. Scene: the steps of a ViT block'],
  ['s-compare',           '6. CNNs vs Vision Transformers'],
  ['s-representations',   '7. From features to visual representations'],
  ['f-embedding',         '7. Scene: from feature maps to an embedding'],
  ['s-clip',              '8. CLIP: connecting images and language'],
  ['f-practical',         '9. Exploring the representation space (copy of s-practical, lab name updated)'],
  ['f-space',             '9. Scene: neighbors, K-means, t-SNE'],
  ['f-lab',               '9. The lab: MIT 6.S191 Lab 3, fine-tune a language model with LoRA'],
  ['f-human-rsa',         '10. Human and machine representations (copy of s-rsa, lab pointers updated)'],
  ['f-rsa',               '10. Scene: RDMs and RSA'],
  ['f-thatcher',          '11. Scene: the Thatcher illusion, demonstrated first'],
  ['s-thatcher',          '11. The Thatcher effect'],
  ['f-homework',          'Homework (copy of s-homework, lab updated): proposal tonight, detailed proposal Monday, lab, readings'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (the progress bar), from Shreya's deck. 'Questions' (8 min) is in her deck only;
   the scenes add time inside their sections, so these need a new pass (see feedback/_day.md). */
const SEC_MINUTES = {
  '1. Regions': 8,
  '2. CNNs': 10,
  '3. Blocks': 12,
  '4. Attention': 12,
  '5. ViT': 12,
  '6. Compare': 10,
  '7. Space': 8,
  '8. CLIP': 8,
  '9. Lab': 8,
  '10. RSA': 10,
  '11. Faces': 6,
  'Homework': 8,
};
