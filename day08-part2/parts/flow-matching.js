/* PART: flow matching (Day 8 part B). Owner: Fernanda. Flow matching basics, following the opening section of the NeurIPS 2024
   tutorial (Lipman, Chen, Ben-Hamu). About 15 minutes. Time convention here: t = 0 is noise, t = 1 is data, as in that tutorial.
   Animations are computed exactly on the toy mixture (scenes/d8-toy.js). Notes are drafts. */
{
section('Flow Matching');
const v = d8v;

st(`
  <h1 class="t">Flow matching: learn a velocity from noise to data</h1>
  <div class="d8-body">
    <div class="d8-row b" data-step="1"><div class="label">Start and end</div>
      <div class="d8-eq">${v('X','0')} ~ ${v('p')} (noise) &nbsp;→&nbsp; ${v('X','1')} ~ ${v('q')} (data)</div></div>
    <div class="d8-row b" data-step="2"><div class="label">The model</div>
      <div class="d8-eq">d${v('X','t')} / d${v('t')} = ${v('u','t','θ')}(${v('X','t')})</div></div>
    <div class="statement b" data-step="3">Train by regressing a velocity, sample by following it</div>
  </div>
  ${cite(D8_REF.fmtut)}
`, { notes: [
  "(draft) We just saw that the ODE view turns generation into following a velocity field. Flow matching starts from that idea directly, and leaves out the noising process and the score.",
  "(draft) We have a source distribution p, which is usually Gaussian noise, and a target distribution q, which is the data. Notice the direction of time: in this section, t equals zero is noise and t equals one is data.",
  "(draft) The model is a velocity field, a neural network. It says: if you are at this point at this time, move in this direction. Generating an image means solving this ODE, starting from noise.",
  "(draft) That is the whole recipe, in the tutorial's own summary: train by regressing a velocity, and sample by following it. The question is what to regress onto, because we do not know the true velocity."
]});

st(`
  <h1 class="t">The simplest version</h1>
  <div class="d8-body">
    <div class="d8-row b" data-step="1"><div class="label">A straight line</div>
      <div class="d8-eq">${v('X','t')} = (1 − ${v('t')}) ${v('X','0')} + ${v('t')} ${v('X','1')}</div></div>
    <div class="d8-row b" data-step="2"><div class="label">Its velocity</div>
      <div class="d8-eq">d${v('X','t')} / d${v('t')} = ${v('X','1')} − ${v('X','0')}</div></div>
    <div class="d8-row b" data-step="3"><div class="label">The loss</div>
      <div class="d8-eq">𝔼<sub>${v('t')}, ${v('X','0')}, ${v('X','1')}</sub> ‖ ${v('u','t','θ')}(${v('X','t')}) − (${v('X','1')} − ${v('X','0')}) ‖<sup>2</sup></div></div>
  </div>
  ${cite(`${D8_REF.fmtut}; Lipman et al. 2023, Liu et al. 2023, Albergo and Vanden-Eijnden 2023`)}
`, { notes: [
  "(draft) Here is the simplest version, and it fits on a whiteboard. Three papers proposed it at about the same time: Lipman and colleagues, Liu and colleagues with rectified flow, and Albergo and Vanden-Eijnden.",
  "(draft) Take one noise sample and one data sample, and join them with a straight line. X t is the point on that line at time t.",
  "(draft) The velocity along a straight line is constant. It is just the end minus the start.",
  "(draft) So the loss is a regression: at a random time, on a random line, predict the direction of that line. Compare it with DDPM's loss. Same shape: pick a sample, pick a time, mix with noise, and regress."
]});

sc('d8Fm', 'scenes/fm.html', { notes: [
  "(draft) But why would that work? Each training line goes to one specific data point, and at test time we do not know which data point we are heading to.",
  "(draft) Here is the noise in gray and the data in blue, with random pairs joined by straight lines. This is what the training loop sees. Notice that the lines cross all over the place.",
  "(draft) Look at one point, halfway through time. Many lines pass through it, going in many different directions. Each arrow is the direction of one pair that passes through this point.",
  "(draft) The network gets this same input with all these different targets. With a squared error loss, the best it can do is predict their average. That average is the thick arrow. The formula says the same thing: the expected direction, given that you are at x at time t.",
  "(draft) Do that at every point, and you get a velocity field. This is the field at time one half.",
  "(draft) Now follow the field from the noise. The paths curve, and they do not cross, because a field has only one direction per point. They land on the clusters. So we train on straight lines that cross, and we get a flow that generates the whole distribution."
]});

st(`
  <h1 class="t">Why regressing on single pairs is enough</h1>
  <div class="d8-body">
    <div class="d8-row b" data-step="1"><div class="label">The loss we want</div>
      <div class="d8-eq">ℒ<sub>FM</sub>(θ) = 𝔼 ‖ ${v('u','t','θ')}(${v('X','t')}) − ${v('u','t')}(${v('X','t')}) ‖<sup>2</sup></div></div>
    <div class="d8-row b" data-step="2"><div class="label">The loss we can compute</div>
      <div class="d8-eq">ℒ<sub>CFM</sub>(θ) = 𝔼 ‖ ${v('u','t','θ')}(${v('X','t')}) − ${v('u','t')}(${v('X','t')} | ${v('X','1')}) ‖<sup>2</sup></div></div>
    <div class="d8-row b" data-step="3"><div class="label">The theorem</div>
      <div class="d8-eq">∇<sub>θ</sub> ℒ<sub>FM</sub>(θ) = ∇<sub>θ</sub> ℒ<sub>CFM</sub>(θ)</div></div>
  </div>
  ${cite(`${D8_REF.fm}; ${D8_REF.fmtut}`)}
`, { notes: [
  "(draft) Here is the same argument as a theorem.",
  "(draft) What we want is to regress onto the true marginal velocity, the thick arrow. But to compute it, we would need the whole dataset at every training step.",
  "(draft) What we can compute is the conditional version: the velocity of one path, given its data point. That is the straight line from before.",
  "(draft) The theorem says the two losses have the same gradients with respect to the network parameters. They differ only by a constant. So training on single pairs is exactly as good as training on the intractable target."
]});

sc('d8Euler', 'scenes/euler.html', { notes: [
  "(draft) Once the network is trained, sampling means solving an ODE. Any solver works; the simplest is Euler's method.",
  "(draft) With one step, you take the velocity at the noise and jump all the way. At t equals zero, the velocity is the mean of the data minus x, so every sample lands on the mean of the data. For our spiral, that is its center, where there is no data at all: the blurry average again.",
  "(draft) With four steps, the clusters begin to appear.",
  "(draft) With forty steps, the samples match the data. Here too the number of network evaluations is the cost of a sample, and paths that bend need more steps."
]});
}
