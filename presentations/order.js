/* Final presentations deck (owner: Shreya), 2026-11-16. Introduces the presentation days and the requirements for the
   talk and the write-up, from templates.html (#presentation, #writeup), then two published examples.
   No speaker notes (Shreya's preference). Avoid apostrophes inside the strings. */
const ORDER = [
  ['setup',    'Title, when you present (Thu and Fri, 2-4 pm, 20-minute slots, sign-up doc), what you hand in'],
  ['talk',     'The talk: one five-slide outline for everyone, how it is graded'],
  ['writeup',  'The write-up: five parts and weights'],
  ['examples', 'Three formats (paper, interactive article, blog post), one real example of each, then the checklist for before Thursday and Friday'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (sets the widths in the progress bar). */
const SEC_MINUTES = { 'Setup': 3, 'Talk': 5, 'Write-up': 4, 'Examples': 5 };
