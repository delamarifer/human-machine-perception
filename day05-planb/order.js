/* Day 5 (Plan B) running order: a standalone backup deck on the Vision Transformer.
   It follows one YouTube explainer, "Vision Transformer" by AGI Lambda (https://www.youtube.com/watch?v=vJF3TBI8esQ),
   concept by concept, with every animation rebuilt from scratch. Owner: Fernanda.
   Avoid apostrophes inside the strings. */
const ORDER = [
  // part           what (video time in brackets)
  ['title',         'Title and credit'],
  ['tokens',        'Image to tokens: patches, pixel values, flatten, embed (0:00 to 1:15)'],
  ['qkv',           'Query, key and value from one embedding (1:15 to 1:38)'],
  ['position',      'Why position matters, and adding it (1:38 to 2:11)'],
  ['blocks',        'Attention blocks, classifier, class token (2:11 to 2:53)'],
  ['attention',     'What attention does, and one score computed (2:53 to 3:17)'],
  ['vs-cnn',        'Global vs local receptive field, texture vs shape (3:17 to 4:10)'],
  ['limits',        'Cost of attention at high resolution, and data hunger (4:10 to 5:05)'],
  ['recap',         'The whole pipeline in one picture'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (the progress bar), for a talk of about 45 minutes. */
const SEC_MINUTES = {
  '1. Image to tokens': 10,
  '2. Attention': 18,
  '3. ViT and CNN': 12,
  '4. Recap': 4,
};
