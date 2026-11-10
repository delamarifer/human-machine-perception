/* Day 7 part 2 running order. Copied from the end of Shreya's day07 deck (Project Review onward), so Fernanda can rework these slides
   without touching day07/. One file per part, one session per part. Avoid apostrophes inside the strings. */
const ORDER = [
  ['start', 'Title'],
  ['project-review', 'Project Review: the project map and what we noticed'],
  ['project-rubrics', 'Project Plan Rubric, example plan, Project Rubric'],
  ['open-questions', 'Open Questions'],
  ['instance-level', 'Deep dive: same object, new view'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (only sets the widths in the progress bar). Guesses carried over from day07. */
const SEC_MINUTES = {
  'Start': 2,
  'Project Review': 5,
  'Both Projects': 5,
  'Tennis Strokes': 8,
  'Sign Language': 6,
  'Next Steps': 8,
  'Same Object': 12,
};
