/* Day 10 session (owner: Shreya), 2026-11-13. Follows Shreya's edited Google Slides (2026-11-13), in her order:
   a machine that dreams, who Anadol is and what he makes, what machine hallucination means, reverse-engineering the system,
   the lab, the discussion, then the slides she kept after the discussion (two works, step 1, the pipeline, wrap-up).
   No speaker notes (Shreya's preference). Avoid apostrophes inside the strings. */
const ORDER = [
  ['start',    'Title, the NYC video, who Anadol is, what he makes, what machine hallucination means'],
  ['system',   'Reverse-engineer the system, how outputs become an artwork, from archive to artwork'],
  ['lab',      'Lab: become a generative artist (the Generative System Lab in Colab)'],
  ['discuss',  'Discussion: creativity, consent, ownership, culture, human value'],
  ['clues',    'Work 2 (Unsupervised) and Work 3 (Large Nature Model)'],
  ['activity', 'Step 1: draw it and write it down'],
  ['reveal',   'One pipeline, four builds (animated)'],
  ['wrap',     'Why it looks alive, whose data and what cost, sources'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (sets the widths in the progress bar). */
const SEC_MINUTES = { 'Start': 8, 'System': 5, 'Lab': 25, 'Discussion': 12, 'Clues': 2, 'Activity': 2, 'Reveal': 3, 'Wrap-up': 3 };
