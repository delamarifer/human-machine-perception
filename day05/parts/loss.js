/* PART: loss (Day 5). Owner: to decide (see README.md). Plan: 10 min, loss functions.
   1. what a loss is; the two common ones
   2. scene: cross-entropy as a curve, three cases, their average */
{
section('Loss');

st(`
  <h1 class="t">Loss functions</h1>
  <div class="statement b">One number: how wrong was the network?</div>
  <ul class="frag">
    <li class="b"><b>Predicting a number</b>: mean squared error, (ŷ − y)²</li>
    <li class="b"><b>Predicting a class</b>: cross-entropy, −log p(correct class)</li>
  </ul>
`, { notes: [
  "(draft) To learn, the network needs feedback.",
  "(draft) A loss function turns the network's output and the right answer into one number: how wrong it was. Lower is better.",
  "(draft) When the network predicts a number, like a depth or a brightness, the usual loss is the squared error: the difference between prediction and answer, squared, averaged over examples.",
  "(draft) When it predicts a class, as in our bar example, the usual loss is the cross-entropy. Let's look at it."
]});

sc('lossScene', 'scenes/loss.html');
}
