/* Day 13 session: Reinforcement learning (owner: Shreya). Built 2026-11-17 from Shreya's Google Slides outline "RL".
   Figures from that outline (screenshots of the MIT 6.S191 deep RL lecture) are redrawn, not copied.
   Not linked from the home page yet. No speaker notes (Shreya's preference). */
const ORDER = [
  ['start',    'Title'],
  ['review',   'Review: supervised, unsupervised, reinforcement learning'],
  ['concepts', 'Key concepts: the agent-environment loop, then the total reward (return)'],
  ['qfunc',    'The Q-function, how to act given it, value vs policy learning'],
  ['atari',    'Dig deeper: Atari Breakout, which (s, a) has a higher Q-value'],
  ['dqn',      'Deep Q networks: two ways to model Q, then the training target'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (sets the widths in the progress bar). Draft: change freely. */
const SEC_MINUTES = { 'Review': 5, 'Key concepts': 10, 'The Q-function': 12, 'Deep Q networks': 10 };
