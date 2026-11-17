/* Day 12 session: Embodied AI today (owner: Shreya). Built 2026-11-17, adapted from Shreya's Slides artifact
   "From Research to Industry" into a short deck: lab to industry, then two blog posts, one slide each
   (Walden LBM 2.0, Physical Intelligence pi*0.6). Not linked from the home page yet.
   No speaker notes (Shreya's preference). Avoid apostrophes inside the strings. */
const ORDER = [
  ['start',   'Title'],
  ['tedrake', 'Russ Tedrake: MIT, Toyota Research Institute, Walden; why leave the lab'],
  ['walden',  'Walden LBM 2.0 in one slide'],
  ['finn',    'Chelsea Finn: Berkeley, Google, Stanford, Physical Intelligence'],
  ['pi',      'Why copying demonstrations is not enough, then Physical Intelligence pi*0.6 in one slide'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (sets the widths in the progress bar). Draft: change freely. */
const SEC_MINUTES = { 'Russ Tedrake and Walden': 7, 'Chelsea Finn and Physical Intelligence': 7 };
