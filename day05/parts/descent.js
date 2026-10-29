/* PART: descent (Day 5). Owner: to decide (see README.md). Plan: 10 min, gradient descent + optimizers.
   1. scene: a real loss surface over two weights; small steps, too-large steps, momentum, Adam
   2. the training loop, putting the day together */
{
section('Gradient descent');

sc('descentScene', 'scenes/descent.html');

st(`
  <h1 class="t">The training loop</h1>
  <div class="flow" style="margin:auto 0">
    <div class="step b" data-step="1"><b>Forward</b><span class="label">a batch of images → logits</span></div>
    <div class="arrow b" data-step="2">→</div>
    <div class="step b" data-step="2"><b>Loss</b><span class="label">how wrong, one number</span></div>
    <div class="arrow b" data-step="3">→</div>
    <div class="step b" data-step="3"><b>Backward</b><span class="label">a gradient for every weight</span></div>
    <div class="arrow b" data-step="4">→</div>
    <div class="step b" data-step="4"><b>Step</b><span class="label">w ← w − lr · gradient</span></div>
  </div>
  <div class="lead center b" data-step="5">repeat</div>
`, { notes: [
  "(draft) Now we have all four pieces. Together they make the training loop.",
  "(draft) Forward: run a small batch of images through the network to get logits.",
  "(draft) Loss: compare them with the labels, and average into one number.",
  "(draft) Backward: backpropagation gives the gradient of that number for every weight.",
  "(draft) Step: the optimizer moves every weight a little against its gradient.",
  "(draft) And repeat, batch after batch, until the loss stops going down. Every network you will train in this course, small or huge, is trained with this loop."
]});
}
