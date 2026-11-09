/* Day 6 running order: Data, Generalization and Adaptation.
   Central idea: a model learns the training distribution, not the world.
   Owner: Shreya (all parts). Plan: the "Data, Generalization & Adaptation — Lecture Plan" doc.
   Built section by section; parts not written yet are commented out.
   Avoid apostrophes inside the strings. */
const ORDER = [
  // part           what
  ['start',         'Quiz timer, announcements, title, the central idea'],
  ['problem',       'Section 1: the problem (Ch. 35), ending on the question for Part 2'],
  ['broaden',       'Section 2: get better data (Ch. 36 and modern practice), ending on the question for Part 3'],
  ['eval-data',     'Section 3: check the data (label errors, hidden groups, leakage, is this dataset right for my task), ending on the question for Part 4'],
  // ['activity',    'Group activity: data detective'],
  ['eval-models',   'Section 4: check the model (shift, robustness tests, unknown inputs, can we trust the benchmark), ending on the question for Part 5'],
  ['adapt',         'Section 5: adapt over time (Ch. 37): which method when, domain adaptation, test-time adaptation, continual learning, monitoring'],
  ['wrapup',        'Wrap-up: fixing ColorizeBot, the perception tie-ins, questions to take home'],
  ['lab',           'Lab: find and check a dataset for your project (22 minutes, no code)'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (the progress bar), from the plan's clock. */
const SEC_MINUTES = {
  'Start': 15,
  'The problem': 10,
  'Get better data': 15,
  'Check the data': 10,
  'Check the model': 10,
  'Adapt over time': 10,
  'Wrap-up': 3,
  'Lab': 22,
};
