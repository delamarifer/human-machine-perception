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
  "(draft) Now generation. DDPM starts from noise and alternates two moves.",
  "(draft) Follow one point. In blue, the step the model takes along its field. In gray, a random step, which DDPM adds after every model step. The random steps start large and shrink as t goes down. The point jumps around a lot, and still lands on the spiral.",
  "(draft) Now 256 points at once. It looks like chaos at first, and then the spiral appears.",
  "(draft) Here is the surprising part. Delete the line of code that adds the random step, and run the same points again. They no longer cover the spiral: they crowd toward the middle of the data. In the video, the same deletion in Stable Diffusion turns a sharp tree in the desert into a small, blurry one. In image space, averages look blurry.",
  "(draft) The reason: for small steps, each reverse step is close to a Gaussian, and the network learns only its mean, its average. To draw a sample from that Gaussian, and not just take its average, you have to add the noise back: that is the plus sigma t z in Algorithm 2. It is not a hack; it falls out of the theory. And DDPM does this 1000 times, each a full pass through the network, while a GAN needs one pass. That cost is why diffusion did not take over right away."
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
