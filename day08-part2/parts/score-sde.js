/* PART: score-sde (Day 8 part B). Owner: Fernanda. Score functions and the SDE view, following Part 2 of the CVPR 2022
   tutorial and Song et al. 2021. About 10 minutes. Both animations are computed exactly on the toy mixture (scenes/d8-toy.js). Notes are drafts. */
{
section('Score and SDE');
const v = d8v;

sc('d8Score', 'scenes/score.html', { notes: [
  "(draft) There is a second way to look at the same model, and it is the way that leads to flow matching.",
  "(draft) The score of a distribution is the gradient of its log density with respect to x. It is a vector field: at every point, it says in which direction the probability goes up. Here is the density of our data after a little noise.",
  "(draft) With little noise, each arrow points to its nearest cluster. Arrow lengths are compressed so that you can see them all.",
  "(draft) With much more noise, the clusters merge, and the arrows point toward where the data is overall. Coarse structure at high noise, fine structure at low noise. That is also how a diffusion model builds an image: layout first, details last.",
  "(draft) Here is the connection. The noise that the network predicts is the score, up to a scale factor. Predicting the noise is estimating the score. DDPM and score-based models are the same object, seen from two sides."
]});

st(`
  <h1 class="t">Continuous time: a stochastic differential equation</h1>
  <div class="d8-body">
    <div class="d8-row b" data-step="1"><div class="label">Forward SDE</div>
      <div class="d8-eq">d${v('x')} = ${v('f')}(${v('x')}, ${v('t')}) d${v('t')} + ${v('g')}(${v('t')}) d${v('w')}</div></div>
    <div class="d8-row b" data-step="2"><div class="label">Reverse SDE</div>
      <div class="d8-eq">d${v('x')} = [ ${v('f')}(${v('x')}, ${v('t')}) − ${v('g')}(${v('t')})<sup>2</sup> ∇<sub>${v('x')}</sub> log ${v('p','t')}(${v('x')}) ] d${v('t')} + ${v('g')}(${v('t')}) d${v('w̄')}</div></div>
    <div class="d8-row b" data-step="3"><div class="label">Probability flow ODE</div>
      <div class="d8-eq">d${v('x')} = [ ${v('f')}(${v('x')}, ${v('t')}) − ½ ${v('g')}(${v('t')})<sup>2</sup> ∇<sub>${v('x')}</sub> log ${v('p','t')}(${v('x')}) ] d${v('t')}</div></div>
    <div class="lead b" data-step="4">The only unknown is the score, and the network estimates it</div>
  </div>
  ${cite(`${D8_REF.sde}; ${D8_REF.cvpr}`)}
`, { notes: [
  "(draft) Now let the number of steps go to infinity, so that each step is infinitely small. The chain becomes a differential equation.",
  "(draft) The forward process is a stochastic differential equation: a drift f, plus noise of size g. DDPM is one particular choice of f and g, called variance preserving.",
  "(draft) A classic result, from Anderson in 1982, says this process can be run in reverse, and the reverse has a closed form. It is the same equation, with one new term: the score. Time runs backwards here, from noise to data.",
  "(draft) Song and colleagues showed there is also a deterministic version, the probability flow ODE. It has no noise term and half the score term, and at every time it has exactly the same distribution as the SDE.",
  "(draft) In both equations, everything is known except the score. And the score is what the network from the training slide estimates."
]});

sc('d8SdeOde', 'scenes/sde-ode.html', { notes: [
  "(draft) Let us see the two versions run on our toy data.",
  "(draft) Each gray line is one run of the reverse SDE: the DDPM sampler. It starts at a black dot in the noise and jitters its way to a cluster, because noise is added at every step.",
  "(draft) From the same starting dots, here is the probability flow ODE, run with the DDIM sampler. The paths are smooth, and each starting point has exactly one destination. So now noise maps to data by following a velocity field. Hold on to that idea, because it is the next section.",
  "(draft) Now 320 runs of each. The gray dots are from the SDE, and the blue dots are from the ODE. The individual paths differ, but both land on the same distribution."
]});
}
