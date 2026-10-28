/* Day 3 running order. Same format as deck/order.js (Day 1).
   Parts live in day03/parts/, scenes in day03/scenes/, images in day03/assets/.
   A scene in day03/scenes/ links the shared stylesheet as ../../deck/deck.css.
   Avoid apostrophes inside the strings. */
const ORDER = [
  // part        what
  ['opening',    'Title and the question: Where does an image come from?'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (the progress bar). Fill in from plan/course-plan.md. */
const SEC_MINUTES = {};
