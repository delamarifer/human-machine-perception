/* Day 4, Part 2: Object Recognition, a one-hour lecture, from Torralba, Isola & Freeman,
   Foundations of Computer Vision, Ch. 50. Its own page, next to the Day 4 deck in ../day04/.
   Owner: Shreya. Avoid apostrophes inside the strings. */
const ORDER = [
  // part              what
  ['opening',          'Title, what is a chair, the output defines the problem'],
  ['human',            'Recognition by components, invariance, categorization, cue conflict'],
  ['ladder',           'The four tasks on one image, classification, backbones and transfer'],
  ['localization',     'Pipeline, proposals, NMS, IoU vs L2, evaluation'],
  ['segmentation',     'Semantic and instance segmentation'],
  ['limits',           'Solved and open: applications, limits, transfer, forgetting, beyond naming'],
  ['benchmarks',       'What a benchmark is, how it is used, saturation, human-inspired tests, the benchmark as the problem'],
  ['lab',              'The Day 4 lab directions'],
  ['homework',         'Homework: lab, assignment, reading, project proposal'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (the progress bar): a planning split: 60 for the lecture, plus 2 for the lab directions. Not rehearsed. */
const SEC_MINUTES = {
  '1. What is a chair?': 4,
  '2. How humans do it': 13,
  '3. The task ladder': 24,
  '4. Solved or open': 13,
  '5. Benchmarks': 6,
  '6. Lab and homework': 2,
};
