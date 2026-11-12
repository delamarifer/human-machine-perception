/* PART: workbooks (Day 9, owner: Shreya). Three tracks, our own notebooks in day09/workbook/, each with TODOs and checks.
   Solution copies and build.py are in day09/workbook/solutions/ (in the public repo, not linked from the deck).
   Track A: autoencoders-and-vaes (from the Day 8 workbook, sections 1-2). Track B: gans-from-2d-to-digits. Track C: diffusion-on-a-spiral.
   Done early: MIT 6.S191 Lab 2 debiasing (needs a GPU), MIT diffusion course Lab 3, the MIT diffusion lecture notes.
   No graded homework is linked, so no point values appear (Shreya, 2026-11-12). */
{
section('Workbooks');

const C = 'https://colab.research.google.com/';
st(`
  <h1 class="t">Pick a track</h1>
  <div class="d8l-col">
    <div class="d8l-cards">
      <div class="d8l-card b"><small>Track A · autoencoders</small><b>Compress, then generate</b>
        <span>Build an autoencoder, then a VAE, on MNIST digits</span>
        <a href="${C}github/delamarifer/human-machine-perception/blob/main/day09/workbook/autoencoders-and-vaes.ipynb" target="_blank" rel="noopener">Open in Colab</a></div>
      <div class="d8l-card b"><small>Track B · GANs</small><b>Generator vs discriminator</b>
        <span>Train a GAN on 2D points, then on MNIST digits. Under a minute on a CPU.</span>
        <a href="${C}github/delamarifer/human-machine-perception/blob/main/day09/workbook/gans-from-2d-to-digits.ipynb" target="_blank" rel="noopener">Open in Colab</a></div>
      <div class="d8l-card b"><small>Track C · diffusion</small><b>From noise to a spiral</b>
        <span>Build a diffusion model from scratch on 2D points: add noise, train, sample</span>
        <a href="${C}github/delamarifer/human-machine-perception/blob/main/day09/workbook/diffusion-on-a-spiral.ipynb" target="_blank" rel="noopener">Open in Colab</a></div>
    </div>
  </div>
`);

st(`
  <h1 class="t">Done early?</h1>
  <div class="d8l-col">
    <ul class="d8l-list">
      <li class="b"><a href="${C}github/MITDeepLearning/introtodeeplearning/blob/master/lab2/PT_Part2_Debiasing.ipynb" target="_blank" rel="noopener">Debias a face detector with a VAE</a>
        <span class="d8l-sub">MIT 6.S191, Lab 2 · needs a GPU runtime</span></li>
      <li class="b"><a href="${C}drive/1wKeiJBN4HS-7dsHQk_zd22Zfoc3ieJn9" target="_blank" rel="noopener">Generate digits on request: guidance and latent diffusion</a>
        <span class="d8l-sub">MIT diffusion course, Lab 3 · MNIST</span></li>
      <li class="b"><a href="https://diffusion.csail.mit.edu/2026/docs/lecture_notes.pdf" target="_blank" rel="noopener">Read the math behind diffusion and flow models</a>
        <span class="d8l-sub">MIT diffusion course, lecture notes</span></li>
    </ul>
  </div>
`);

st(`
  <h1 class="t">By the end, show a neighbor</h1>
  <div class="d8l-col">
    <ul class="d8l-list">
      <li class="b">Track A: all 5 TODOs pass, and a walk from a 1 to a 7</li>
      <li class="b">Track B: all 3 TODOs pass, and all 8 clusters covered</li>
      <li class="b">Track C: 3 TODOs pass, and samples landing on the spiral</li>
    </ul>
  </div>
`);
}
