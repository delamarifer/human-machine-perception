/* Day 5 running order. Same format as deck/order.js (Day 1).
   Parts live in day05/parts/, scenes in day05/scenes/, images in day05/assets/.
   A scene in day05/scenes/ links the shared stylesheet as ../../deck/deck.css.
   Avoid apostrophes inside the strings.
   Day 5 follows the public syllabus: Transformers and visual representations. Segments and minutes come
   from the plan block "Transformers + Visual Representation" (plan/course-plan.md). */
const ORDER = [
  // part          what
  ['opening',      'Title, the question, the plan for today'],
  ['homework',     'Homework review: Geirhos et al. 2019, texture vs shape'],
  ['embeddings',   'From CNN feature maps to embeddings (scene: a filter bank, pooled)'],
  ['attention',    'Why attention for vision? (scene: patches attending to patches)'],
  ['vit',          'Vision Transformer: patches, tokens, self-attention (scene), CNN vs ViT'],
  ['encode',       'What does an embedding encode? (scene: k-NN, K-means, t-SNE)'],
  ['compare',      'Comparing representations: RDMs and RSA (scene), models and brains'],
  ['human-link',   'Human connection: the Thatcher illusion and face inversion (scene)'],
  ['lab',          'ViT and representation lab'],
  ['project',      'Project connection and homework'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (the progress bar), from the plan. human-link shares the Comparing section. */
const SEC_MINUTES = {
  'Homework review': 10,
  'Embeddings': 15,
  'Attention': 15,
  'Vision Transformer': 15,
  'What embeddings encode': 10,
  'Comparing representations': 10,
  'Lab': 40,
  'Project': 5,
};
