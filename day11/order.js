/* Day 10 session (owner: Shreya), 2026-11-13. Follows Shreya's edited Google Slides (2026-11-13), in her order:
   a machine that dreams, who Anadol is and what he makes, what machine hallucination means, reverse-engineering the system,
   the lab, the discussion. Slides 11-17 (Work 2, Work 3, Step 1, the pipeline, why it looks alive, whose data, sources)
   were removed at Shreya's request, 2026-11-13; their part files are in git history (commit 7691365).
   No speaker notes (Shreya's preference). Avoid apostrophes inside the strings. */
const ORDER = [
  ['start',    'Title, the NYC video, who Anadol is, what he makes, what machine hallucination means'],
  ['system',   'Reverse-engineer the system, from archive to artwork (Machine Hallucination: NYC)'],
  ['lnm',      'The Large Nature Model as the worked example, four kinds of data, field data to Machine Dreams, beyond images (sound, scent, flavor), then what tools his studio used'],
  ['lab',      'Lab: become a generative artist (the Generative System Lab in Colab)'],
  ['discuss',  'Discussion: creativity, consent, ownership, culture, human value'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (sets the widths in the progress bar). */
const SEC_MINUTES = { 'Start': 15, 'System': 4, 'Large Nature Model': 14, 'Lab': 30, 'Discussion': 12 };
