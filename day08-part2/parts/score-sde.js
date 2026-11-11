/* PART: score-sde (Day 8 part B). Owner: Fernanda. About 13 minutes.
   Rebuilt 2026-11-11 around the Welch Labs video (16:10 to 25:00): the time-dependent vector field (the score), DDPM sampling as
   a model step plus a random step, what happens without the random step, and DDIM from the probability flow ODE.
   Animations are our own, computed exactly on the toy spiral (scenes/d8-toy.js). Notes are drafts. */
{
section('Vector Field');
const v = d8v;

sc('d8Field', 'scenes/field.html', { notes: [
  "(draft) If we ask, at every point of the plane, which way leads back to the data, the answers form a vector field. That field is what the network learns.",
  "(draft) Here is the exact field for our spiral after 100 noise steps, at t equals one. The shading is the density of the noisy points. With this much noise, the best the network can do is point toward the middle of the data.",
  "(draft) After only five steps, at t equals 0.05, the field is detailed: the arrows point to the nearest part of the spiral.",
  "(draft) These two fields are very different, so the network needs to know how much noise it is looking at. That is why it takes the time t as a second input. Watch the field as t goes from one to almost zero: first everything points to the middle, and then, fairly suddenly, the arrows switch to pointing at the spiral itself.",
  "(draft) This field has a name in the papers: the score. It points toward more likely, less noisy data. When the network predicts the noise, it is really telling us this direction: the way out of the noise."
]});

sc('d8Ddpm', 'scenes/ddpm.html', { notes: [
  "(draft) Now generation. DDPM starts from pure noise and repeats two moves. We will follow them in the paper's Algorithm 2.",
  "(draft) Follow one point, starting from noise. First the model step, in blue: a small step in the direction the network gives. That is the highlighted part of line 4, built around the network's prediction epsilon theta, which takes the point x t and the time t.",
  "(draft) Then the random step, in gray: line 3 draws fresh noise z, and the end of line 4 adds it, scaled by sigma t. The random step can look large, but it gets smaller as t goes down.",
  "(draft) Now the whole loop of line 2: 100 steps. The point jumps around a lot, because the field changes with time and because of the random steps, and still lands on the spiral. On the right, the same algorithm runs on an image from our dataset of 12 images: noise at first, then a clear image.",
  "(draft) Now 256 points at once. It looks like chaos at first, and then most points land on the spiral.",
  "(draft) Now the surprising part. Delete the random step: line 3 and the end of line 4. Run the same points again. They rush to the middle of the spiral, then drift to one inner edge. They no longer cover the spiral. On the right, the same image without the random step stays a faded, low-contrast average for most of the run, and sharpens only near the end.",
  "(draft) Why does this happen? For small steps, each step backward is close to a bell curve, a Gaussian, and the network learns only its center, the average. That is where the blue arrow ends. To draw a point from that bell curve, and not just take its center, we add zero-mean noise: plus sigma t z. The dashed circle has radius sigma t, and the gray dots are possible next points. So the random step is not a hack; it comes straight out of the theory. This is the very first step again: far from the spiral, the arrow points toward the middle of the data, which is the average showing."
]});

sc('d8DdpmGrid', 'scenes/ddpm-grid.html', { notes: [
  "(draft) What does deleting the random step do to images?",
  "(draft) First a picture to keep in mind, and this one is an illustration, not a computation. Imagine each part of the spiral is a different image from our dataset, and the middle of the spiral is their average. The average of our 12 images, on the right, is a gray blur. In the video, deleting the random step in Stable Diffusion turned a sharp tree in the desert into a sad, blurry one: an image that looks like an average. That example is from Welch Labs for 3Blue1Brown, 2025.",
  "(draft) Now computed. Top row: eight starting noise images. Second row: where DDPM, with its random steps, takes each one, using the ideal denoiser for our 12 images. They end on five different images. On the left, the 256 points from the last slide, spread along the spiral.",
  "(draft) Third row: the same eight noises with the random step deleted. All eight end on the same image, and it is the one closest to the average of the 12. That matches the spiral: the points crowd at one inner edge, near the middle. Our ideal denoiser always ends on a real image, so there is no blur here, just much less variety. The video says the same about its spiral. Its blurry tree comes from a real network, which on this path never quite reaches realistic images."
]});

st(`
  <h1 class="t">Removing the random steps the right way</h1>
  <div class="d8-body">
    <div class="d8-row b" data-step="1"><div class="label">DDPM</div><div class="lead">model step, then random step</div></div>
    <div class="d8-row b" data-step="2"><div class="label">A result from physics</div><div class="lead">a version with no random steps moves the whole cloud of points through the same distributions</div></div>
    <div class="d8-row b" data-step="3"><div class="label">DDIM</div><div class="lead">that version: same trained network, no random steps, different step sizes</div></div>
  </div>
  ${cite(`${D8_REF.sde}; Song, Meng and Ermon, DDIM, ICLR 2021`)}
`, { notes: [
  "(draft) A few months after DDPM, two papers showed that the random steps can be removed after all, if you change the step sizes.",
  "(draft) DDPM alternates a model step and a random step. Mathematically, that is a stochastic differential equation: motion along the field plus random motion.",
  "(draft) Physicists know how a whole cloud of such randomly moving particles evolves; the tool is the Fokker-Planck equation. Using it, Song and colleagues showed there is a version with no randomness at all that moves the cloud through exactly the same distributions. Individual points take different paths, but the final cloud is the same.",
  "(draft) Turned into an algorithm, this is DDIM, from Song, Meng and Ermon. It needs no retraining: same network, no random steps, different step sizes."
]});

sc('d8DdimScene', 'scenes/ddim.html', { notes: [
  "(draft) Let us check that on our spiral.",
  "(draft) First, the failure from before: the DDPM model step with the random step deleted, and the step sizes unchanged. The points crowd together.",
  "(draft) DDIM uses the same trained network, with no random steps, but with step sizes that come from the ODE. The paths are smooth, and the points land on the spiral.",
  "(draft) And DDIM can take much bigger steps. With 20 steps instead of 100, the points still land on the spiral.",
  "(draft) No retraining, deterministic, and far fewer steps. DDIM generalizes to flow matching, which is what models like the open video model Wan 2.1 use. That is our next section."
]});
}
