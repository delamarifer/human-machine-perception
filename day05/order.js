/* Day 5 running order: Transformers and Visual Representations.
   "From pixels to representations: How do machines organize visual information, and how does that compare to the way humans see?"
   Instructors: Fernanda De La Torre and Shreya Pandit.
   Avoid apostrophes inside the strings. */
const ORDER = [
  // part                 what (a 45-minute lecture after the quiz and recap, built on four questions)
  ['start',               'Quiz, recap, title, CNN recap'],
  ['cnn-limits',          'From CNNs to Transformers: far-apart patches and the two ways to reach farther'],
  ['transformer',         'Four questions: tokenization, attention, self-attention, multi-head, with four exercises, then the block'],
  ['vision-transformer',  'How a Vision Transformer works'],
  ['explore-transformer', 'Checkpoint: Transformer Explainer'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (the progress bar). 45-minute lecture plus the 12-minute quiz and the recap.
   Not loaded, files kept: pipeline, backup, opening, vit, transformer-v1, cnn-limits-demo, return-to-cat, and the parts from embeddings onward. */
const SEC_MINUTES = {
  '1. Start': 19,
  '2. From CNNs': 3,
  '3. Tokenization': 9,
  '4. Attention': 13,
  '5. Self-attention': 7,
  '6. Multi-head': 5,
  '7. Full picture': 5,
};
