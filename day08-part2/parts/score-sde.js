/* PART: score-sde (Day 8 part B). Owner: Fernanda. About 13 minutes.
   Rebuilt 2026-11-11 around the Welch Labs video (16:05 to 25:00): the time-dependent vector field (the score), DDPM sampling as
   a model step plus a random step, what happens without the random step, and DDIM from the probability flow ODE.
   Animations are our own, computed exactly on the toy spiral (scenes/d8-toy.js). Notes are drafts. */
{
section('Vector Field');
const v = d8v;

sc('d8Field', 'scenes/field.html', { notes: [
  "(draft) At every point of the plane, the network learns which way leads back to the data. All those arrows together form a vector field. But the arrows depend on how much noise was added.",
  "(draft) Here is the exact field for our spiral after 100 noise steps, at t equals one. The shading shows where the noisy points are: one big blob. On the right, our picture after the same amount of noise: nothing is left of it. With this much noise, the best the network can do is point toward the middle of the data.",
  "(draft) After only one noise step, at t equals 0.01, the field is detailed: the arrows point to the nearest part of the spiral. The picture is almost clean.",
  "(draft) These two fields are very different, so the network has to know how much noise it is looking at. So we give it the time t as a second input. Back at t equals one, we write the network as f of x and t. x is the noisy point, here this dot. t is how much noise: one is all noise, zero is clean. And f is the arrow it gives back, here the bold arrow. It shows which way the field pushes this point at this noise level.",
  "(draft) Now watch t go from one down to almost zero. The picture gets cleaner, the field changes, and the bold arrow turns. For a long time nothing much happens: everything points to the middle. Then, fairly suddenly, the arrows switch to pointing at the spiral itself. The dashed line traces the tip of the bold arrow as it turns.",
  "(draft) We measured where the switch happens on our spiral: between t equals 0.25 and t equals 0.12. At 0.30, every arrow inside the spiral still points to the middle; by 0.12, most point to the nearest arm. The video sees the same kind of sudden switch for its own trained model, around t equals 0.4. Where it happens depends on the data and the noise schedule, so the two numbers need not match.",
  "(draft) This field has a name in the papers: the score. It points toward more likely, less noisy data. When the network predicts the noise, it is really giving us this direction: the way out of the noise."
]});

sc('d8Ddpm', 'scenes/ddpm.html', { notes: [
  "(draft) Now generation. DDPM starts from noise and alternates two moves.",
  "(draft) Follow one point. In blue, the step the model takes along its field. In gray, a random step, which DDPM adds after every model step. The random steps start large and shrink as t goes down. The point jumps around a lot, and still lands on the spiral.",
  "(draft) Now 256 points at once. It looks like chaos at first, and then the spiral appears.",
  "(draft) Here is the surprising part. Delete the line of code that adds the random step, and run the same points again. They no longer cover the spiral: they crowd toward the middle of the data. In the video, the same deletion in Stable Diffusion turns a sharp tree in the desert into a small, blurry one. In image space, averages look blurry.",
  "(draft) The reason: for small steps, each reverse step is close to a Gaussian, and the network learns only its mean, its average. To draw a sample from that Gaussian, and not just take its average, you have to add the noise back: that is the plus sigma t z in Algorithm 2. It is not a hack; it falls out of the theory. And DDPM does this 1000 times, each a full pass through the network, while a GAN needs one pass. That cost is why diffusion did not take over right away."
]});

sc('d8Sde', 'scenes/sde.html', { notes: [
  "(draft) A few months after DDPM, two papers showed that the random steps can be removed after all, if you do it the right way. Each DDPM step is a full pass through a big network, and it takes hundreds of them, so this mattered a lot.",
  "(draft) First, DDPM written as one equation. This kind of equation, with a random part, is called a stochastic differential equation, an SDE. Behind it is the field for our spiral at t equals 0.12, and one point.",
  "(draft) We zoom in on that point. The first term is the model term: the move along the field the network predicts. Nabla log p is the field itself, the score; f and g are set by the noise schedule. The blue arrow is this term for one real step of our run.",
  "(draft) The second term is the random term: a random kick, g times d w bar. It is the gray arrow, drawn from the tip of the blue one. I picked a step where the two are about the same size; early in a run, the random move is much bigger.",
  "(draft) Add the two head to tail, and you get d x, the total move of the point in this one step. DDPM repeats this a hundred times, or a thousand.",
  "(draft) Now the result from physics. Physicists know how a whole cloud of randomly moving points evolves; the tool is the Fokker-Planck equation. Using it, Song and colleagues found a second equation with no random term at all, and with half of the field term. It is an ordinary differential equation, an ODE. Same field, same point: the random arrow is gone, and the move along the field is half as big.",
  "(draft) Let us check that the two give the same result. First, with random steps: 256 points from noise. The shading is the noisy data at each time t. The paths are jagged, and the points land on the spiral.",
  "(draft) Now the same starting points with the ODE, no random steps. The rings are where the random version ended. The paths are smooth, the cloud stays inside the same shading at every time, and it ends on the same spiral. That is what Fokker-Planck promised: the same distributions.",
  "(draft) But not the same points. Follow one starting point: with random steps it ends here, without them it ends there. The theory only says the cloud as a whole is the same, not each point."
]});

sc('d8DdimScene', 'scenes/ddim.html', { notes: [
  "(draft) Turned into an algorithm, the equation with no random term is DDIM, from Song, Meng and Ermon. It looks almost like DDPM: no random steps, and a new scaling of the step sizes. Let us check it on our spiral and on our twelve images.",
  "(draft) First, the failure from before: the DDPM step with the random step simply deleted, and the step sizes unchanged. The arrows show the field at the current step. The points rush to the middle and stay crowded. On the right, eight different starting noises: the images stay faded for most of the run, and most runs end on the same image. With our perfect network for twelve images, the result is never blurry; in the video, with Stable Diffusion, it is a small blurry tree.",
  "(draft) DDIM uses the same trained network, with no random steps, but with smaller moves along the field: the half from the equation on the previous slide. Now the paths follow the field, and the points land on the spiral. The eight images are sharp and varied.",
  "(draft) And DDIM can take much bigger steps. With 20 steps instead of 100, the points still land on the spiral. Each noise even ends on the same image as with 100 steps: DDIM is deterministic, the same noise always gives the same image.",
  "(draft) No retraining, deterministic, and far fewer steps. DDIM generalizes to flow matching, which is what models like the open video model Wan 2.1 use. That is our next section."
]});
}
