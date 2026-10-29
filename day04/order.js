/* Day 4 running order. Same format as deck/order.js (Day 1).
   Parts live in day04/parts/, scenes in day04/scenes/, images in day04/assets/.
   A scene in day04/scenes/ links the shared stylesheet as ../../deck/deck.css.
   Avoid apostrophes inside the strings. */
const ORDER = [
  // part                minutes  what
  ['opening',            '',      'Title, the question, objective and plan for today'],
  ['homework-review',    '10',    'Homework review and the bridge from filters to representations'],
  ['pixels-to-objects',  '15',    'What a representation is; the ladder pixels, features, textures, objects'],
  ['metamers',           '15',    'Metamers: Julesz textons, phase scrambling, Portilla-Simoncelli, activity'],
  ['invariance',         '20',    'Representation and invariance; peripheral vision and auditory metamers'],
  ['discussion',         '5',     'Discussion question and homework'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (the progress bar), from plan/course-plan.md, Day 4. */
const SEC_MINUTES = {'Homework review': 10, 'Pixels to objects': 15, 'Metamers': 15, 'Representation and invariance': 20, 'Discussion': 5};
