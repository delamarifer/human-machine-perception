/* Day 8 Part B running order: diffusion, guidance, flow matching, same coin and the trilemma, then two projects students could join (Fernanda, 2026-11-11).
   Built from three tutorials: CVPR 2022 diffusion (Kreis, Gao, Vahdat), NeurIPS 2024 flow matching
   (Lipman, Chen, Ben-Hamu) and the ICLR 2025 blog post "Diffusion Meets Flow Matching" (Gao et al.).
   All figures are drawn here from exact math on a toy 2D distribution; no slide images are copied.
   One file per part. Avoid apostrophes inside the strings. */
const ORDER = [
  ['start', 'Title'],
  ['diffusion', 'Images as points, noise as a random walk, the DDPM target (after the Welch Labs video, with CVPR 2022 Part 1)'],
  ['score-sde', 'The time-dependent field, DDPM sampling, DDIM (after the Welch Labs video, with CVPR 2022 Part 2)'],
  ['guidance', 'Conditioning, classifier-free guidance, negative prompts (after the Welch Labs video)'],
  ['flow-matching', 'Flow matching basics (NeurIPS 2024 tutorial)'],
  ['same-coin', 'Diffusion and flow matching are the same coin (Gao et al. 2025)'],
  ['trilemma', 'The generative learning trilemma, then questions'],
  ['projects', 'Potential projects and mentors for modeling cognition'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (only sets the widths in the progress bar). From Fernanda's plan for the hour. */
const SEC_MINUTES = {
  'Start': 1,
  'Diffusion': 12,
  'Vector Field': 13,
  'Guidance': 8,
  'Flow Matching': 15,
  'Same Coin': 5,
  'Trilemma': 15,
  'Projects': 4,
};
