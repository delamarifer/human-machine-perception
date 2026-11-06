/* Day 3 running order. Same format as deck/order.js (Day 1).
   Parts live in day03/parts/, scenes in day03/scenes/, images in day03/assets/.
   A scene in day03/scenes/ links the shared stylesheet as ../../deck/deck.css.
   Avoid apostrophes inside the strings. */
const ORDER = [
  // part               what
  ['opening',           'Title: Day 3 in two parts'],
  // Part 1 (Fernanda): metamers first (decided 2026-11-03)
  ['part1',             'Part 1 divider'],
  ['representation',    'What a representation is: decoding from a network or the brain; pixels to objects'],
  ['metamers',          'Metamers: color knobs, textures, drive and suppress, model metamers, into the lab'],
  // Part 2 (Shreya): linear image filtering, from the instructors repo day03-part2 (2026-11-06)
  ['intro',             'Part 2: phone filters and the Muizenberg photo'],
  ['foundations',       'Part 2: signal, convolution, spatial frequency'],
  ['low-pass',          'Part 2: low-pass, box, Gaussian, binomial'],
  ['derivatives',       'Part 2: gradients, Sobel, Laplacian'],
  ['perception',        'Part 2: center-surround, Hermann grid, V1'],
  ['synthesis',         'Part 2: choosing a filter, the lab, homework'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (the progress bar), from plan/course-plan.md, Day 3. */
const SEC_MINUTES = {'Representation': 10, 'Metamers': 10, 'Textures': 12, 'Networks': 15, 'Your turn': 5,   // Fernanda's storyline, 2026-11-03 (minutes are a first guess)
  'I. Everyday filters': 10, 'II. Foundations': 20, 'III. Low-pass': 25, 'IV. Derivatives': 30, 'V. Perception': 20, 'VI. Synthesis': 15};
