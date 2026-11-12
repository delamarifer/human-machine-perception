/* Day 9 session (owner: Shreya), 2026-11-12. Two hours: 30 min open discussion, 50 min workbooks, 40 min project work.
   Plan from Shreya's message: "a combination of open discussion on ai and human intelligence/philosophy, some workbooks to
   actually practice, and then some project work time". Avoid apostrophes inside the strings. */
const ORDER = [
  ['start',     'Announcements, title, the plan for the two hours'],
  ['discuss',   'Discussion: from the Turing test to the mind, open questions, four theories, students submit questions in a Google Form'],
  ['workbooks', 'Workbook practice: pick a track (autoencoders and VAEs, GANs, diffusion), stretch notebooks, checkpoints'],
  ['projects',  'Project work time: the proposal rubric as a checklist, groups, Calendly'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (sets the widths in the progress bar). */
const SEC_MINUTES = { 'Start': 3, 'Discussion': 30, 'Workbooks': 50, 'Project Work': 40 };
