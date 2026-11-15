/* Day 11 session: Embodied Intelligence (owner: Shreya). Built from Shreya's Google Slides "Day 11 - Embodied Intelligence"
   (2026-11-15), slides 1-8 so far. No speaker notes (Shreya's preference). Avoid apostrophes inside the strings. */
const ORDER = [
  ['intro',  'Title, what an embodied agent is, last week\'s discussion question and your answers, what it means to experience'],
  ['agents', 'Examples of embodied agents, the video, the common problems'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (sets the widths in the progress bar). Draft: change freely. */
const SEC_MINUTES = { 'Start': 12, 'Embodied agents': 10 };
