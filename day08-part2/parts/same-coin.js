/* PART: same-coin (Day 8 part B). Owner: Fernanda. "Diffusion Meets Flow Matching" (Gao, Hoogeboom, Heek, De Bortoli, Murphy, Salimans; ICLR 2025 blog track).
   About 5 minutes. WARNING for the time convention: the blog writes t = 0 for data and t = 1 for noise, the opposite of the flow matching section. Notes are drafts. */
{
section('Same Coin');
const v = d8v;

sc('d8Straight', 'scenes/straight.html', { notes: [
  "(draft) How do diffusion and flow matching relate? A very clear blog post by researchers at Google DeepMind shows that with Gaussian noise they are the same model: flow matching is diffusion with one particular noise schedule, and the DDIM sampler is the same algorithm as the flow matching Euler sampler. One warning: the post runs time the other way, with t equals zero as data. The post also clears up a common myth: that flow matching is better because its paths are straight.",
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
