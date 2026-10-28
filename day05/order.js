/* Day 5 running order. Same format as deck/order.js (Day 1).
   Parts live in day05/parts/, scenes in day05/scenes/, images in day05/assets/.
   A scene in day05/scenes/ links the shared stylesheet as ../../deck/deck.css.
   Avoid apostrophes inside the strings. */
const ORDER = [
  // part        what
  ['opening',    'Title and the question: How does a system learn what matters?'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (the progress bar). Fill in from plan/course-plan.md. */
const SEC_MINUTES = {};
