/* Day 2. How can we extract information from an image?
   Avoid apostrophes inside the strings. */
const ORDER = [
  ['papers',   '', 'Discussion of the Day 1 readings'],
  ['opening',  '', 'Title and the question'],
  ['recap',    '', 'What an image contains, and what we must infer'],
  ['images',   '', 'Pixels, channels, color, resolution, arrays'],
  ['practice', '', 'Checker-shadow notebook'],
  ['problem',  '', 'Summer Vision Project: boxes from one image'],
  ['lab',      '', 'The simple vision system notebook'],
  ['discuss',  '', 'Which assumptions worked, and where they broke'],
  ['preview',  '', 'Tomorrow: a model you did not write'],
];
const PARTS = ORDER.map(r => r[0]);

const SEC_MINUTES = {
  'Readings': 10,
  'Title': 2,
  'Recap': 4,
  'Images': 15,
  'Practice': 20,
  'Problem': 10,
  'Lab': 50,
  'Discussion': 10,
  'Tomorrow': 5
};
