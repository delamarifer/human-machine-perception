/* Day 1 running order. Class starts at Day 1. No Day 0.
   Avoid apostrophes inside the strings. */
const ORDER = [
  // part            outline   what
  ['opening',       '',       'Welcome and the question: what does it mean to see'],
  ['about-shreya',  '',       'About me: AIMS, research, Scale AI, DUST, holographic art'],
  ['ill-posed',     '',       'Why vision is difficult'],
  ['assumptions',   '',       'Light versus the scene: checker shadow, size and depth'],
  ['visual-system', '',       'Human vision, briefly'],
  ['history',       '',       'Optics, camera obscura, a science of perception'],
  ['bridge',        '',       'From human vision to computer vision'],
  ['can-computers', '',       'Applications, then where vision is used'],
  ['group',         '',       'Groups of four pick one and answer'],
  ['course',        '',       'Course overview'],
  ['discuss',       '',       'Share group ideas. Tomorrow: numbers, then boxes'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes for the progress bar. Seeing covers the challenge and human vision.
   Assumptions sits inside that stretch of class and has its own label. */
const SEC_MINUTES = {
  'Title': 3,
  'Who we are': 3,
  'Seeing': 12,
  'Assumptions': 6,
  'History': 7,
  'Machines': 4,
  'Computers': 8,
  'Groups': 23,
  'The course': 4,
  'Discussion': 20
};
