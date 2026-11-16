/* Day 11 running order (owner: Fernanda), 2026-11-16. Topic: Jitendra Malik's talk "Vision and Robotics for
   Embodied AI" (Frontiers of Embodied AI, ETH Zurich), recreated for this class. The structure below follows
   the talk itself, section by section; see reference/malik-talk-map.md, which maps the talk from its transcript.

   The earlier version of this session was built from his Berkeley course Lecture 1 instead, which opens on the
   phylogeny of intelligence and Moravec's paradox. The talk never mentions Moravec. Those parts are still in
   parts/ (gap, paradox, why, bodies, scorecard, close) and are simply not listed here, so that version is one
   edit away, and it is also in the history at 59abf85.

   One file per part. Avoid apostrophes inside the strings. */
const ORDER = [
  ['start',     'Title'],
  ['three',     'Navigation, locomotion, manipulation, and the data gap (talk 0:00 to 7:44)'],
  ['levels',    'Aristotle, Euclid, Newton, and the case for hands (7:44 to 12:45)'],
  ['data',      'Three ways to get robot data, and what is wrong with each (12:45 to 19:12)'],
  ['child',     'Turing, the girl watching her father, and 3D from video (19:12 to 35:14)'],
  ['touch',     'Forces, tactile sensing, and his conclusion (35:14 to 42:30)'],
  ['questions', 'The two questions from the floor: Gibson, and metamerism (43:25 to 50:28)'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (only sets the widths in the progress bar). These are rough and need Fernanda's call:
   as built, the whole thing runs well over an hour. See feedback/_day.md. */
const SEC_MINUTES = {
  'Start': 1,
  'Three problems': 11,
  'Levels': 11,
  'Data': 9,
  'The child': 18,
  'Touch': 10,
  'Questions': 9,
};
