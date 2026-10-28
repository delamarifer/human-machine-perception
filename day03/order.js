/* Day 3 running order. Same format as deck/order.js (Day 1).
   Parts live in day03/parts/, scenes in day03/scenes/, images in day03/assets/.
   A scene in day03/scenes/ links the shared stylesheet as ../../deck/deck.css.
   Avoid apostrophes inside the strings. */
const ORDER = [
  // part               what
  ['opening',           'Title and the question: Where does an image come from?'],
  ['homework-review',   'Homework review (10 min)'],
  ['image-formation',   'Image formation: pinhole, projection, pixels, color (20 min)'],
  ['convolution',       'Convolution mathematically: slide, multiply, add; LSI (20 min)'],
  ['receptive-fields',  'Human vision: Mach bands, Hermann grid, V1 and Gabor filters (10 min)'],
  ['lab',               'Lab: 2D convolution from scratch in NumPy (45 min)'],
  ['filters',           'Edge detection, sharpening, blur; homework (15 min)'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (the progress bar), from plan/course-plan.md, Day 3. */
const SEC_MINUTES = {'Homework review': 10, 'Image formation': 20, 'Convolution': 20, 'Human vision': 10,
  'Lab': 45, 'Edges and blur': 15};
