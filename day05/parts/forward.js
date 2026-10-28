/* PART: forward (Day 5). Owner: to decide (see README.md). Plan: 10 min, forward pass + logits.
   1. scene: one 5x5 image through a small trained network, to logits and softmax
   2. softmax, as a formula */
{
section('Forward pass');

sc('forwardScene', 'scenes/forward.html');

st(`
  <h1 class="t">Softmax</h1>
  <div class="statement center b" style="font-size:clamp(2.2rem,3.8vw,3.4rem)">p<sub>k</sub> = e<sup>z<sub>k</sub></sup> / Σ<sub>j</sub> e<sup>z<sub>j</sub></sup></div>
  <ul class="frag" style="margin:0 auto">
    <li class="b">every p is positive</li>
    <li class="b">they add up to 1</li>
    <li class="b">the largest logit gets the largest p</li>
  </ul>
`, { notes: [
  "(draft) The softmax in one line.",
  "(draft) For each class k, take e to the power of its logit, and divide by the sum of e to the power of all the logits.",
  "(draft) The exponential makes every value positive.",
  "(draft) Dividing by the sum makes them add up to one, so we can read them as probabilities.",
  "(draft) And the order never changes: the class with the largest logit gets the largest probability. Next: how to tell the network that its probabilities were wrong."
]});
}
