/* Day 2 running order. Same format as deck/order.js (Day 1).
   Parts live in day02/parts/, scenes in day02/scenes/, images in day02/assets/.
   A scene in day02/scenes/ links the shared stylesheet as ../../deck/deck.css.
   Segments and minutes follow plan/course-plan.md, Day 2.
   Avoid apostrophes inside the strings. */
const ORDER = [
  // part               min   what
  ['opening',           '',   'Title and the question: What can a machine see from one image?'],
  ['homework-review',   '10', 'Homework review: Day 1 homework'],
  ['many-ways',         '15', 'One image has many ways to see: one photo through the whole stack'],
  ['demo',              '10', 'Demo: the one-image app, live'],
  ['lab',               '45', 'Lab: build the app on your own photo, then a classmate photo'],
  ['human-vs-machine',  '15', 'Human vs machine: a classifier top-5 on a photo it gets wrong vs what the room sees'],
  ['pset',              '10', 'Week 1 PSET, project brainstorm and homework'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (the progress bar widths), from the plan's segment table. */
const SEC_MINUTES = {'Homework review': 10, 'Many ways to see': 15, 'Demo': 10, 'Lab': 45,
  'Human vs machine': 15, 'Week 1 PSET': 10};
