/* Day 8 Part B running order: diffusion and flow matching, then the trilemma recap (Fernanda, 2026-11-10).
   Built from three tutorials: CVPR 2022 diffusion (Kreis, Gao, Vahdat), NeurIPS 2024 flow matching
   (Lipman, Chen, Ben-Hamu) and the ICLR 2025 blog post "Diffusion Meets Flow Matching" (Gao et al.).
   All figures are drawn here from exact math on a toy 2D distribution; no slide images are copied.
   One file per part. Avoid apostrophes inside the strings. */
const ORDER = [
  ['start', 'Title'],
  ['diffusion', 'DDPM: add noise, learn to remove it (CVPR 2022 Part 1)'],
  ['score-sde', 'Score functions and the SDE view (CVPR 2022 Part 2)'],
  ['flow-matching', 'Flow matching basics (NeurIPS 2024 tutorial)'],
  ['same-coin', 'Diffusion and flow matching are the same coin (Gao et al. 2025)'],
  ['trilemma', 'The generative learning trilemma, then questions'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (only sets the widths in the progress bar). From Fernanda's plan for the hour. */
const SEC_MINUTES = {
  'Start': 1,
  'Diffusion': 15,
  'Score and SDE': 10,
  'Flow Matching': 15,
  'Same Coin': 5,
  'Trilemma': 15,
};
