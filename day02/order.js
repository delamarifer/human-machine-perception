/* Day 2 running order: Motivation and limitations. Same format as deck/order.js (Day 1).
   Parts live in day02/parts/, scenes in day02/scenes/, images in day02/assets/.
   A scene in day02/scenes/ links the shared stylesheet as ../../deck/deck.css.
   Segments and minutes: Fernanda's outline of 2026-11-02 (plan/course-plan.md, Day 2), with the paper
   review moved to the end, after "how to read a paper".
   (The earlier one-photo app parts are in git history at commit 0192428; the scene and assets stay.)
   Avoid apostrophes inside the strings. */
const ORDER = [
  // part              min      what
  ['opening',          '',      'Title and today'],
  ['syllabus',         '5',     'Syllabus review: three weeks, grading'],
  ['motivation',       '30',    'Applications, limitations, why look to humans, why projects'],
  ['projects',         '10',    'Project expectations, templates, examples; what the survey told us'],
  ['simple-system',    '50-60', 'Back and forth lecturing of the simple system lab'],
  ['research',         '5',     'Research vs building: what kinds of questions are research'],
  ['papers',           '15',    'How to read a paper, then the paper review (Pizlo 2001)'],
  ['homework',         '2',     'Finish or extend the simple system; a metamers paper'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (the progress bar widths). */
const SEC_MINUTES = {'Syllabus': 5, 'Motivation': 30, 'Project': 10, 'Lab': 55,
  'Research and papers': 20, 'Homework': 2};
