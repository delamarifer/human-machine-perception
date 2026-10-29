/* Day 5 running order. Same format as deck/order.js (Day 1).
   Parts live in day05/parts/, scenes in day05/scenes/, images in day05/assets/.
   A scene in day05/scenes/ links the shared stylesheet as ../../deck/deck.css.
   Avoid apostrophes inside the strings. */
const ORDER = [
  // part         what
  ['opening',     'Title, the question, the plan for today'],
  ['homework',    'Homework review: the Day 4 reflection'],
  ['filters',     'Fixed to learned filters (scene: a 5x5 filter learned live)'],
  ['human-link',  'Human connection: learned filters and the visual system'],
  ['layers',      'Linear layer to nonlinear network (scene: a 2D classifier trained live)'],
  ['forward',     'Forward pass, logits and softmax (scene: a small trained network)'],
  ['loss',        'Loss functions (scene: cross-entropy)'],
  ['backprop',    'Backpropagation (scene: gradients through a small graph)'],
  ['descent',     'Gradient descent and optimizers (scene: a real loss surface)'],
  ['lab',         'The training loop in PyTorch, the lab, homework'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (the progress bar), from plan/course-plan.md, Day 5.
   human-link shares the Learned filters section (the plan gives it no minutes of its own). */
const SEC_MINUTES = {
  'Homework review': 10,
  'Learned filters': 15,
  'Linear to nonlinear': 15,
  'Forward pass': 10,
  'Loss': 10,
  'Backprop': 15,
  'Gradient descent': 10,
  'PyTorch lab': 30,
};
