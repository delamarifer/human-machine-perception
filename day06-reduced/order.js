/* Day 6 (reduced) running order: Data, Generalization and Adaptation.
   Built from the Google Slides deck Fernanda and Shreya reduced (fileId 1-OynnZhoK9D_oMjT_CGkjYtwdNXkHZi0RQjO_ZAimUs).
   One Google slide = one HTML slide (exception: Evaluating LLMs, two slides, her comment).
   Avoid apostrophes inside the strings. */
const ORDER = [
  // part         Google deck pages (deck as of 12:35 on 2026-11-09)
  ['start',       'Quiz timer, announcements, title (unchanged from day06)'],
  ['failures',    'p2-6: why models fail, dataset bias'],
  ['more-data',   'p7-13: more data, augmentation, simulators'],
  ['labeling',    'p14-19 (p15 removed): why big data, label errors (labelerrors.com embedded), annotators, annotator workflow, synthetic generator'],
  ['check-data',  'p20-29: find and check your dataset'],
  ['splits',      'p30-34: evaluating the model, splits, cross-validation, leakage, averages'],
  ['metrics',     'p35-39: classification, regression, baselines, uncertainty, beyond the test set'],
  ['llm-eval',    'p40-42: evaluating LLMs (two slides), checklist, NeuroAI Turing Test paper'],
  ['lab',         'Lab: find and check a dataset for your project (unchanged from day06)'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (only sets the widths in the progress bar). Start and Lab are the day06 values; the rest are proportional to slide count. */
const SEC_MINUTES = {
  'Start': 15,
  'Why models fail': 5,
  'More data': 8,
  'Labeling': 6,
  'Check your data': 9,
  'Evaluating the model': 17,
  'Lab': 22,
};
