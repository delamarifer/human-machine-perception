/* Day 0 running order. Same format as deck/order.js (Day 1).
   Day 0 is run by Shreya alone (Fernanda is away): a short welcome, getting to know the students.
   Avoid apostrophes inside the strings. */
const ORDER = [
  // part        what
  ['opening',    'Title and welcome'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (the progress bar). */
const SEC_MINUTES = {};
