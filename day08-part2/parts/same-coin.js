/* PART: same-coin (Day 8 part B). Owner: Fernanda. "Diffusion Meets Flow Matching" (Gao, Hoogeboom, Heek, De Bortoli, Murphy, Salimans; ICLR 2025 blog track).
   About 5 minutes. WARNING for the time convention: the blog writes t = 0 for data and t = 1 for noise, the opposite of the flow matching section. Notes are drafts. */
{
section('Same Coin');
const v = d8v;

st(`
  <h1 class="t">Two sides of the same coin</h1>
  <div class="d8-body">
    <div class="d8-row b" data-step="1"><div class="label">Diffusion</div>
      <div class="d8-eq">${v('z','t')} = ${v('α','t')} ${v('x')} + ${v('σ','t')} ${v('ε')}</div></div>
    <div class="d8-row b" data-step="2"><div class="label">Flow matching</div>
      <div class="d8-eq">${v('z','t')} = (1 − ${v('t')}) ${v('x')} + ${v('t')} ${v('ε')} &nbsp;&nbsp;(${v('α','t')} = 1 − ${v('t')}, ${v('σ','t')} = ${v('t')})</div></div>
    <div class="d8-row b" data-step="3"><div class="label">Sampling</div>
      <div class="d8-eq">DDIM sampler = flow matching Euler sampler</div></div>
    <div class="statement b" data-step="4">With a Gaussian source, they are the same model</div>
  </div>
  ${cite(`${D8_REF.coin}. Here ${v('t')} = 0 is data and ${v('t')} = 1 is noise`)}
`, { notes: [
  "(draft) You may be wondering how these two methods relate. A very clear blog post by researchers at Google DeepMind answers that. One warning: this post runs time the other way, with t equals zero as data and t equals one as noise.",
  "(draft) Diffusion mixes the data and the noise with two schedules, alpha and sigma.",
  "(draft) Flow matching with Gaussian noise does exactly the same thing, with one particular choice: alpha is one minus t, and sigma is t. It is one more noise schedule.",
  "(draft) The samplers match too. The DDIM sampler we used for the probability flow ODE is the same algorithm as the Euler sampler for flow matching.",
  "(draft) So when the source is Gaussian, diffusion and flow matching are the same model. The differences are in the specification: what the network outputs, how the noise levels are weighted, and the schedule."
]});

sc('d8Straight', 'scenes/straight.html', { notes: [
  "(draft) This also clears up a common myth: that flow matching is better because its paths are straight.",
  "(draft) If the target is a single point, the paths are exactly straight. That is the case the straight line formula describes.",
  "(draft) Here is the same schedule and the same starting noise, with a whole distribution as the target. The paths bend. The blog also shows that for wide distributions, other schedules can give straighter paths than this one."
]});

st(`
  <h1 class="t">So which one is better?</h1>
  <div class="d8-body">
    <div class="statement b" data-step="1">No single answer: the two lead to the same algorithm</div>
    <div class="d8-row b" data-step="2"><div class="label">Most important</div><div class="lead">How the loss weights each noise level</div></div>
    <div class="d8-row b" data-step="3"><div class="label">Network output</div><div class="lead">Noise, data or velocity: convertible, with different stability</div></div>
    <div class="d8-row b" data-step="4"><div class="label">Least important</div><div class="lead">The training noise schedule, apart from its endpoints</div></div>
  </div>
  ${cite(D8_REF.coin)}
`, { notes: [
  "(draft) This is the question everybody asks at this point.",
  "(draft) The blog's answer is that there is no single answer, because with Gaussian noise the two frameworks lead to the same algorithm in practice.",
  "(draft) What matters most is the weighting function: how much the loss cares about each noise level.",
  "(draft) Then there is what the network outputs. Noise, clean data and velocity can be converted into each other, but they behave differently. Predicting the noise is unstable at high noise levels, and predicting the data is unstable at low noise levels. Velocity is a heuristic that combines the two.",
  "(draft) The training noise schedule matters least: the loss depends mainly on its endpoints."
]});
}
