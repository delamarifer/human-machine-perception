/* Day 11 session: Embodied Intelligence (owner: Shreya). Built from Shreya's Google Slides "Day 11 - Embodied Intelligence"
   (2026-11-15), slides 1-8 so far. No speaker notes (Shreya's preference). Avoid apostrophes inside the strings. */
const ORDER = [
  ['intro',  'Title, what an embodied agent is, last week\'s discussion question and your answers, what it means to experience'],
  ['agents', 'Examples of embodied agents, the video, the common problems'],
  ['labs',   'Embodied intelligence labs at MIT, the robot vacuum pipeline'],
  ['malik',  'Jitendra Malik: three central problems, why manipulation is hard, three levels of action, where robot data comes from; walk-through of teleoperation (with diffusion policy), videos of people, simulation (with reinforcement learning) and the reward problem'],
  ['tedrake', 'Russ Tedrake: academia and industry at once, how they feed each other, his path'],
  ['close',  'Learn like a child (Turing, Malik), it already works for walking, back to our opening question'],
  ['selfmodel', 'Vision for self-state, what 3D scenes miss, how robots work today, soft printed robots, control from vision, Neural Jacobian Fields'],
  ['njf',    'Body Jacobian, Jacobian fields, scene flow and optical flow, training data, self-supervised training, control along a trajectory'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (sets the widths in the progress bar). Draft: change freely. */
const SEC_MINUTES = { 'Start': 12, 'Embodied agents': 14, 'The big picture': 30, 'Academia and industry': 6, 'Closing': 8, 'Next time': 12 };
