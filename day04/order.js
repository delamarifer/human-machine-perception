/* Day 4 running order. Same format as deck/order.js (Day 1).
   Parts live in day04/parts/, scenes in day04/scenes/, images in day04/assets/.
   A scene in day04/scenes/ links the shared stylesheet as ../../deck/deck.css.
   Avoid apostrophes inside the strings. */
const ORDER = [
  // part        what
  ['opening',    'Title and the question: What information is represented in an image?'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (the progress bar). Fill in from plan/course-plan.md. */
const SEC_MINUTES = {};
