/* Day 8 running order. Follows the Google deck "Day 8 - Generative Modeling"
   (fileId 1qIlpyaBiQpmEiLnd4ELaAvdTLj_W8zBCzgfWixt2rns), all of it (Google slides 1-46), with these HTML changes:
   the code slide and the Latent Space slide are gone, the timeline became an animated overview of the model families,
   and a few Google slides are split into A and B. Removed slides are kept, unused, in parts/_removed.js.
   Avoid apostrophes inside the strings. */
const ORDER = [
  ['start',         'Google deck slides 1-2: announcements, title'],
  ['use-cases',     'Google deck slides 3-4: Use Cases (lecture examples, what they share), what is a generative model'],
  ['overview',      'Google deck slides 5-8: overview of the model families, latent variable, latent variable models'],
  ['autoencoders',  'Google deck slides 9-17: Autoencoders, compress then reconstruct, the loss, training over time, bottleneck, latent space, applications'],
  ['vae',           'Google deck slides 18-27: VAEs, from a point to a distribution, reparameterization, the two loss terms, regularization, training, generation, interpolation, applications'],
  ['gans',          'Google deck slides 28-38: GANs, sampling, generator and discriminator, intuition, training, the min-max objective, training loop, noise to distribution, applications'],
  ['autoregressive','Google deck slides 39-46: autoregressive models, main idea, how it works, probability model, next word and pixel, training, sampling, recap'],
];
const PARTS = ORDER.map(r => r[0]);

/* Minutes per section (only sets the widths in the progress bar). Guesses, to set. */
const SEC_MINUTES = {
  'Start': 2,
  'Use Cases': 5,
  'What is a generative model?': 6,
  'Overview': 12,
  'Autoencoders': 20,
  'Variational Autoencoders': 15,
  'GANs': 15,
  'Autoregressive': 12,
};
