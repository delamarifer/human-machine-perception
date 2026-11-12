/* PART: workbooks (Day 9, owner: Shreya). Notebooks from Shreya's list (2026-11-12) plus the Day 8 workbook.
   Track A: our Day 8 workbook. Track B: our light GAN notebook, workbook/gan-lite.ipynb (2D ring, then MNIST; about 40 s of CPU training in all). It replaced the deepmancer GAN notebook, which needs about 1.5 h on a CPU. Track C: diffusion on a 2D spiral (Colab, built on smalldiffusion).
   Stretch: MIT 6.S191 Lab 2 debiasing (DB-VAE, needs a GPU), MIT diffusion course Lab 3 (conditional MNIST). Pen and paper: MIT 6.7960 HW5. */
{
section('Workbooks');

const C = 'https://colab.research.google.com/';
st(`
  <h1 class="t">Pick a track</h1>
  <div class="d8l-col">
    <div class="d8l-cards">
      <div class="d8l-card b"><small>Track A · autoencoders</small><b>Compress, then generate</b>
        <span>Build an autoencoder, then a VAE, on MNIST digits</span>
        <a href="${C}github/delamarifer/human-machine-perception/blob/main/day08/workbook/generative-models-workbook.ipynb" target="_blank" rel="noopener">Open in Colab</a></div>
      <div class="d8l-card b"><small>Track B · GANs</small><b>Generator vs discriminator</b>
        <span>Train a GAN on 2D points, then on MNIST digits. Under a minute on a CPU.</span>
        <a href="${C}github/delamarifer/human-machine-perception/blob/main/day09/workbook/gan-lite.ipynb" target="_blank" rel="noopener">Open in Colab</a></div>
      <div class="d8l-card b"><small>Track C · diffusion</small><b>From noise to a spiral</b>
        <span>Build a diffusion model from scratch on 2D points: schedule, model, train, sample</span>
        <a href="${C}drive/1gNZkGePLZmH9uGdjhroxkYe_GXA5KDSy" target="_blank" rel="noopener">Open in Colab</a></div>
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
      <li class="b"><a href="https://ocw.mit.edu/courses/6-7960-deep-learning-fall-2024/mit6_7960_f24_hw5.pdf" target="_blank" rel="noopener">Pen and paper: the ELBO and the diffusion loss</a>
        <span class="d8l-sub">MIT 6.7960 HW5 · <a href="https://diffusion.csail.mit.edu/2026/docs/lecture_notes.pdf" target="_blank" rel="noopener">diffusion lecture notes</a></span></li>
    </ul>
  </div>
`);

st(`
  <h1 class="t">By the end, show a neighbor</h1>
  <div class="d8l-col">
    <ul class="d8l-list">
      <li class="b">Track A: a reconstruction and a walk between two digits</li>
      <li class="b">Track B: all 8 clusters covered, and a walk between two digits</li>
      <li class="b">Track C: points moving from noise onto the spiral</li>
      <li class="b">Every track runs on a CPU. Stuck? Ask a neighbor.</li>
    </ul>
  </div>
`);
}
