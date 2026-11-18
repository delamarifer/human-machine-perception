/* Day 12 session: ML in Industry (owner: Shreya). A 60-minute lecture, extended on 2026-11-18 from the short deck
   "Embodied AI today" (2026-11-17), which is now the Physical AI case study. Not linked from the home page.
   No speaker notes (Shreya's preference). Avoid apostrophes inside the strings. */
const ORDER = [
  ['start',     'Title, the opening question: what does research mean to you?'],
  ['why',       'Why do research'],
  ['where',     'Five places research happens, research happening near you'],
  ['case',      'Physical AI: a research question vs a deployment problem'],
  ['tedrake',   'Russ Tedrake: MIT, Toyota Research Institute, Walden; why leave the lab'],
  ['walden',    'Walden LBM 2.0, and how Sage learns'],
  ['finn',      'Chelsea Finn: Berkeley, Google, Stanford, Physical Intelligence'],
  ['pi',        'Physical Intelligence pi*0.6, and RECAP'],
  ['lifecycle', 'The lifecycle loop, with diabetic retinopathy screening as the running example'],
  ['acad',      'Academia and industry: goals, everyday reliability, not either/or'],
  ['roles',     'Six roles from research to product, how to start'],
  ['open',      'Open questions, opportunities, discussion'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (sets the widths in the progress bar). Draft: change freely. */
const SEC_MINUTES = { 'Opening': 3, 'Why research': 6, 'Where research happens': 6, 'Physical AI': 14, 'The ML lifecycle': 10, 'Academia and industry': 7, 'Roles': 6, 'Open questions': 8 };
