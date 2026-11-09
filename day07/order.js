/* Day 7 running order: Adaptation and Future Data.
   The adapt and future parts moved here from day06-reduced (Google deck pages p43-59), unchanged.
   Avoid apostrophes inside the strings. */
const ORDER = [
  ['start',  'Title'],
  ['adapt',  'Day 6 Google deck p43-55: adapting trained models, problem setup, fine-tuning, learning from a teacher, knowledge distillation (math and code), use cases, continual learning'],
  ['future', 'Day 6 Google deck p55-59: future data, RL environments, robotics data gap, discussions'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (only sets the widths in the progress bar), carried over from day06-reduced. */
const SEC_MINUTES = {
  'Start': 2,
  'Adapting models': 13,
  'Future data': 4,
};
