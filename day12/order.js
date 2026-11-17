/* Day 12 session: Embodied AI today (owner: Shreya). Built 2026-11-17, adapted from Shreya's Slides artifact
   "From Research to Industry" into a short deck: lab to industry, then students read two blog posts in class
   (Walden LBM 2.0, Physical Intelligence pi*0.6) and the class compares them. Not linked from the home page yet.
   No speaker notes (Shreya's preference). Avoid apostrophes inside the strings. */
const ORDER = [
  ['start',   'Title, three paths from the lab to industry, why leave the lab'],
  ['read',    'Why copying demonstrations is not enough, then reading the two posts in class'],
  ['debrief', 'What the two posts found, side by side, and the discussion'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (sets the widths in the progress bar). Draft: change freely. */
const SEC_MINUTES = { 'Lab to industry': 6, 'Reading': 18, 'Debrief': 8 };
