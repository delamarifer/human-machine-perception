/* PART: backprop (Day 5). Owner: to decide (see README.md). Plan: 15 min, backpropagation.
   1. scene: forward values, then gradients flowing backward through a small graph, a check, a step
   2. the chain rule, in words */
{
section('Backprop');

sc('backpropScene', 'scenes/backprop.html');

st(`
  <h1 class="t">The chain rule, in words</h1>
  <ul class="frag">
    <li class="b">Each operation knows its own local slope</li>
    <li class="b">Gradient here = gradient from above × local slope</li>
    <li class="b">One backward sweep gives the gradient for every weight</li>
  </ul>
  ${cite('Rumelhart, Hinton &amp; Williams, 1986, Nature')}
`, { notes: [
  "(draft) Let's say what we just did in words.",
  "(draft) Every operation, a multiply, a ReLU, a square, only needs to know its own local slope: how its output changes when its input changes.",
  "(draft) Going backward, the gradient at any point is the gradient arriving from above, times that local slope. That is the chain rule.",
  "(draft) So one backward sweep, from the loss to the input, gives us the gradient for every weight at once, even with millions of weights. This was popularized for neural networks by Rumelhart, Hinton and Williams in 1986, and it is what loss.backward() does in PyTorch."
]});
}
