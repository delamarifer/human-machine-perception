/* Day 10 session (owner: Shreya), 2026-11-13. One-hour activity: reverse-engineer Refik Anadol's work, then build a
   mini version in Colab (day10/workbook/). Slide text comes from Shreya's Google Slides outline and her comments on it.
   No speaker notes (Shreya's preference). Avoid apostrophes inside the strings. */
const ORDER = [
  ['start',    'Title, a video of his work, a few more works, then the pipeline as a question'],
  ['clues',    'The three works as clues'],
  ['activity', 'Step 1 (draw it, write it down), step 2 (everyone builds it in the same Colab notebook)'],
  ['reveal',   'Report back, then the technical deep dives and the shared backbone'],
  ['wrap',     'Why it looks alive, whose data and what cost, sources'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (sets the widths in the progress bar). */
const SEC_MINUTES = { 'Start': 6, 'Clues': 4, 'Activity': 35, 'Reveal': 10, 'Wrap-up': 5 };
