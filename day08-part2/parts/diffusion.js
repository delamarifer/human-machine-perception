/* PART: diffusion (Day 8 part B). Owner: Fernanda. About 12 minutes.
   Rebuilt 2026-11-11 at Fernanda's request around the explanation in the Welch Labs guest video for 3Blue1Brown,
   "But how do AI images and videos actually work?" (2025, https://www.youtube.com/watch?v=iv-5mZ_9CPY), 8:20 to 16:10:
   an image as a point, a 2D spiral as the toy data, adding noise as a random walk, and why DDPM predicts the total noise.
   The animations are our own, computed exactly on our own spiral (scenes/d8-toy.js); nothing is copied from the video.
   Equations follow Ho et al. 2020. All notes are drafts for Fernanda. */
{
section('Diffusion');
const v = d8v;

sc('d8Pixels', 'scenes/pixels.html', { notes: [
  "(draft) To understand what a diffusion model learns, we first need a picture of where images live.",
  "(draft) Take an image with only two pixels. The first pixel's brightness is the x coordinate, and the second pixel's brightness is the y coordinate. A black pixel next to a white pixel is the point zero, one. Two white pixels are the point one, one. Every two-pixel image is a point.",
  "(draft) A real image works the same way, with one axis per pixel and per color channel. A 512 by 512 color image is one point in 786,432 dimensions.",
  "(draft) Almost every point in that space looks like static. Real images fill a tiny, very structured part of it. We cannot draw that, so we use a toy version in two dimensions: our data is a spiral. Each dot is one image. This toy example comes from a video by Welch Labs for 3Blue1Brown, which I recommend; the animations here are our own, computed exactly."
]});

sc('d8Walk', 'scenes/walk.html', { notes: [
  "(draft) Diffusion models start by destroying the data with noise.",
  "(draft) Here is our spiral.",
  "(draft) Adding a little Gaussian noise to an image changes every pixel by a small random amount. For a point, that is a small step in a random direction. Do it 100 times, and the point goes on a random walk. In DDPM, each step also shrinks the point slightly toward the center, so the walk does not wander off forever.",
  "(draft) This is Brownian motion, the same process that makes ink diffuse in water. That is where diffusion models get their name.",
  "(draft) Let every point walk 100 steps. The spiral is gone, and what is left is a standard Gaussian cloud. Generating an image means running this film backwards: start from the cloud and recover the spiral."
]});

sc('d8Target', 'scenes/target.html', { notes: [
  "(draft) Now the network has to learn to reverse this. What exactly should it predict?",
  "(draft) One training example: a clean point on the spiral, and the same point after 12 of the 100 noise steps.",
  "(draft) The natural idea is to undo one step: given the point at step 12, predict where it was at step 11. That arrow is short, and its direction is mostly the random step we happened to draw.",
  "(draft) Many walks pass through this neighborhood. Here are the one-step-back arrows of walks that ended near the same point. They point every which way. Their average, drawn four times longer, does point back toward the data. So a network trained this way can learn, but each training example is very noisy.",
  "(draft) What the DDPM paper does instead is predict the total noise added over the whole walk. With the one-jump formula, that is the same as pointing straight back to the clean point. Here are those arrows for the same walks.",
  "(draft) Their average points the same way as before. In fact one can show the two targets agree on average: the one-step target is the total-noise target plus the fresh noise of that single step. Dropping that extra noise gives the network much cleaner examples, without changing what it learns. This is the surprising choice in DDPM: it skips all the intermediate steps."
]});

st(`
  <h1 class="t">Training: show a noisy image, ask for the noise</h1>
  <div class="d8-body">
    <div class="d8-terms b" data-step="1">
      <div><div class="d8-word">noisy image</div><div class="d8-sym">${v('x','t')}</div></div>
      <div class="d8-op">=</div>
      <div><div class="d8-word">faded clean image</div><div class="d8-sym">√${v('ᾱ','t')} ${v('x','0')}</div></div>
      <div class="d8-op">+</div>
      <div><div class="d8-word">noise</div><div class="d8-sym">√(1 − ${v('ᾱ','t')}) ${v('ε')}</div></div>
    </div>
    <div class="d8-row b" data-step="2"><div class="label">The network sees</div><div class="lead">the noisy image and the time ${v('t')}</div></div>
    <div class="d8-row b" data-step="3"><div class="label">It must say</div><div class="lead">which noise was added</div></div>
    <div class="d8-row b" data-step="4"><div class="label">The loss</div><div class="lead">how far its guess is from the true noise (squared error)</div></div>
  </div>
  ${cite(`${D8_REF.ddpm}, Algorithm 1`)}
`, { notes: [
  "(draft) Here is the whole training recipe, almost without equations.",
  "(draft) Take a clean image from the dataset and pick a random time t. The noisy image is the clean image, faded, plus noise. How much it fades and how much noise is added is fixed in advance: the larger t, the more noise. Because of this formula we never have to run the 100 or 1000 small steps one by one; we jump straight to time t.",
  "(draft) The network gets two inputs: the noisy image, and the time t, so it knows how much noise to expect.",
  "(draft) Its job is to say which noise was added: the total noise from the last slide.",
  "(draft) The loss is the squared distance between its guess and the noise we really added. That is all: a regression problem, repeated over many images and every value of t. There is no adversary, as in a GAN, and no encoder, as in a VAE."
]});
}
