/* Day 2 running order. Same format as deck/order.js (Day 1).
   Parts live in day02/parts/, scenes in day02/scenes/, images in day02/assets/.
   A scene in day02/scenes/ links the shared stylesheet as ../../deck/deck.css.
   Avoid apostrophes inside the strings. */
const ORDER = [
  // part        what
  ['opening',    'Title and the question: What can a machine see from one image?'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (the progress bar). Fill in from plan/course-plan.md. */
const SEC_MINUTES = {};
