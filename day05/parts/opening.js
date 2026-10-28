/* PART: opening (Day 5). Owner: to decide (see README.md). */
{
section('Title');

st(`
  <div class="center" style="margin:auto">
    <div class="statement" style="font-weight:700;font-size:clamp(2.4rem,4.4vw,4rem)">Neural Networks</div>
    <div class="lead" style="margin-top:3vh">Day 5</div>
    <div class="label" style="margin-top:1.5vh">Fernanda · Shreya</div>
  </div>
`, { blank: false, notes: "(draft) Welcome back. Day 5: neural networks." });

st(`
  <div class="question center" style="font-size:clamp(2.4rem,4.2vw,3.8rem)">How does a system learn what matters?</div>
`, { notes: "(draft) The question for today: how does a system learn what matters? Until now, we decided what a vision system should look for. Today the system decides, from examples." });

st(`
  <h1 class="t">Today</h1>
  <div class="flow" style="margin:auto 0">
    <div class="step b" data-step="1"><b>Learned filters</b><span class="label">let data pick the numbers</span></div>
    <div class="arrow b" data-step="2">→</div>
    <div class="step b" data-step="2"><b>Networks</b><span class="label">layers and nonlinearities</span></div>
    <div class="arrow b" data-step="3">→</div>
    <div class="step b" data-step="3"><b>Training</b><span class="label">forward, loss, backprop, descent</span></div>
    <div class="arrow b" data-step="4">→</div>
    <div class="step b" data-step="4"><b>PyTorch lab</b><span class="label">train your own</span></div>
  </div>
`, { notes: [
  "(draft) Here is the plan for today.",
  "(draft) First, we take the filters you built by hand on Day 3 and let the data pick their numbers instead.",
  "(draft) Then we stack simple units into a network, and see why each layer needs a nonlinearity.",
  "(draft) Then training, in four pieces: the forward pass, the loss, backpropagation, and gradient descent.",
  "(draft) And in the lab you train one yourself, in PyTorch."
]});
}
