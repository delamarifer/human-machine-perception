/* Day 1 running order: the single source of truth for both decks.
   deck.html (working drafts) and final.html (pushed parts) load parts in exactly this order.

   Owners are in README.md. Change this file only when you both agree (it moves slides for everyone).
   Avoid apostrophes inside the strings: publish.py reads this file with a simple pattern. */
const ORDER = [
  // part              outline   what
  ['opening',          '1-2',    'Title and the question: what does it mean to see'],
  ['about-fernanda',   '4',      'Fernanda: background and interests'],
  ['about-shreya',     '5',      'Shreya: background and interests'],
  ['ill-posed',        '7',      'Perception is ill-posed: one image, many 3D shapes'],
  ['visual-system',    '8-9',    'How the brain solves this: retina to the two streams'],
  ['can-computers',    '10-14',  'Can computers do the same: applications, a cup of cat, not long ago'],
  ['assumptions',      '15-16',  'Assumptions about the world: checker shadow and size and depth'],
  ['course',           '18-20',  'Course philosophy and structure'],
  ['today',            '21-24',  'Goals for today, project intro, lab, homework'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section: the progress bar widths show how long each part of the class takes. */
const SEC_MINUTES = {'Who we are': 6, 'Seeing': 10, 'Computers': 8, 'Assumptions': 6, 'The course': 8, 'Today': 4};
