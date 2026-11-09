/* Day 6 (reduced) running order: Data, Generalization and Adaptation.
   Built from the Google Slides deck Fernanda and Shreya reduced (fileId 1-OynnZhoK9D_oMjT_CGkjYtwdNXkHZi0RQjO_ZAimUs).
   One Google slide = one HTML slide (exception: Evaluating LLMs, two slides, her comment).
   Avoid apostrophes inside the strings. */
const ORDER = [
  // part         Google deck pages (PDF export of 2026-11-09)
  ['start',       'Quiz timer, announcements, title (unchanged from day06)'],
  ['failures',    'p2-6: why models fail, dataset bias'],
  ['more-data',   'p7-13: more data, augmentation, simulators'],
  ['labeling',    'p14-24: why big data, companies, label errors, annotator workflow, labeling'],
  ['check-data',  'p25-34: find and check your dataset'],
  ['splits',      'p35-39: evaluating the model, splits, cross-validation, leakage, averages'],
  ['metrics',     'p40-44: classification, regression, baselines, uncertainty, beyond the test set'],
  ['llm-eval',    'p45-47: evaluating LLMs (two slides), checklist, NeuroAI Turing Test paper'],
  ['adapt',       'p48-55: adapting trained models, fine-tuning, continual learning'],
  ['future',      'p56-59: future data, robotics data gap, discussions'],
  ['lab',         'Lab: find and check a dataset for your project (unchanged from day06)'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (only sets the widths in the progress bar). Start and Lab are the day06 values; the rest are proportional to slide count. */
const SEC_MINUTES = {
  'Start': 15,
  'Why models fail': 5,
  'More data': 8,
  'Labeling': 10,
  'Check your data': 9,
  'Evaluating the model': 17,
  'Adapting models': 8,
  'Future data': 4,
  'Lab': 22,
};
