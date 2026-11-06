/* PART: networks (Day 4). Owner: Fernanda · Shreya.
   Section 1, 10 min: neurons, weights, activations, layers, forward pass, loss, backpropagation,
   learned representations. A shared vocabulary, not a full neural-networks lecture. */
{
section('1. Networks');

const neuron = `<svg viewBox="0 0 420 220" style="width:100%;max-height:38vh">
  ${[40, 90, 140, 190].map((y, k) => `
    <circle cx="40" cy="${y}" r="15" fill="#fff" stroke="#0f172a" stroke-width="2"/>
    <text x="40" y="${y + 6}" text-anchor="middle" font-size="16">x${k + 1}</text>
    <line x1="56" y1="${y}" x2="214" y2="115" stroke="#4f6d9a" stroke-width="${[3, 1.2, 2.2, .8][k]}"/>
    <text x="120" y="${(y + 115) / 2 - 6}" font-size="14" fill="#4f6d9a">w${k + 1}</text>`).join('')}
  <circle cx="240" cy="115" r="28" fill="#f1f5f9" stroke="#0f172a" stroke-width="2"/>
  <text x="240" y="122" text-anchor="middle" font-size="20">Σ</text>
  <line x1="268" y1="115" x2="310" y2="115" stroke="#0f172a" stroke-width="2"/>
  <rect x="310" y="90" width="50" height="50" rx="8" fill="#fff" stroke="#d97706" stroke-width="2.5"/>
  <polyline points="318,128 335,128 352,100" fill="none" stroke="#d97706" stroke-width="2.5"/>
  <line x1="360" y1="115" x2="400" y2="115" stroke="#0f172a" stroke-width="2"/>
  <text x="408" y="121" font-size="18">y</text>
  <text x="240" y="170" text-anchor="middle" font-size="14" fill="#64748b">weighted sum + b</text>
  <text x="335" y="160" text-anchor="middle" font-size="14" fill="#64748b">ReLU</text>
</svg>`;

st(`
  <h1 class="t">One neuron</h1>
  <div class="d4-cols">
    <div>${neuron}</div>
    <div style="display:flex;flex-direction:column;gap:2vh">
      <div class="d4-eq b"><i>y</i> = σ(<b>w</b>·<b>x</b> + <i>b</i>)</div>
      <div class="d4-card b"><div class="label"><b>Weights</b> say which inputs matter, and how much.</div></div>
      <div class="d4-card b"><div class="label"><b>Bias</b> shifts the point where the neuron turns on.</div></div>
      <div class="d4-card b hi"><div class="label"><b>Nonlinearity</b> σ, here ReLU: max(0, <i>z</i>). Without it, stacking layers gains nothing.</div></div>
    </div>
  </div>
`, { notes: [
  "Most of you have seen this before, so this is a quick refresher to agree on words we will use all session. A neuron takes some inputs.",
  "It multiplies each input by a weight, adds them up with a bias, and passes the result through a nonlinearity sigma.",
  "The weights say which inputs matter. A big weight means that input pushes the output a lot.",
  "The bias shifts the threshold: how much evidence the neuron needs before it responds.",
  "And the nonlinearity. Today almost always ReLU: negative values become zero, positive values pass through. Hold on to why we need it; it comes back in a minute."
]});

st(`
  <h1 class="t">Layers and the forward pass</h1>
  <div class="d4-eq b" data-step="1"><i>f</i>(<b>x</b>) = <i>f</i><sub>L</sub>( … <i>f</i><sub>2</sub>( <i>f</i><sub>1</sub>(<b>x</b>) ) )</div>
  <div class="flow" style="margin:2vh 0 0">
    <div class="step b" data-step="2"><b>input</b><span class="label">pixels, a vector</span></div>
    <div class="arrow b" data-step="2">→</div>
    <div class="step b" data-step="2"><b>hidden layers</b><span class="label">many neurons share an input</span></div>
    <div class="arrow b" data-step="3">→</div>
    <div class="step b" data-step="3"><b>logits</b><span class="label">one score per class</span></div>
    <div class="arrow b" data-step="4">→</div>
    <div class="step b hi" data-step="4"><b>softmax</b><span class="label">scores → probabilities that sum to 1</span></div>
  </div>
`, { notes: [
  "One neuron is not much. The power comes from many of them.",
  "A layer is many neurons that all look at the same input. A network is layers composed: the output of one is the input of the next.",
  "Running an input through all the layers, start to end, is the forward pass.",
  "The last layer gives one number per class. These raw scores are called logits.",
  "Softmax turns the logits into numbers between zero and one that sum to one. We read those as class probabilities. Keep that 'sum to one' in mind: it will bite us in Section 5."
]});

st(`
  <h1 class="t">How it learns</h1>
  <div class="flow">
    <div class="step b" data-step="1"><b>1. Predict</b><span class="label">forward pass</span></div>
    <div class="arrow b" data-step="2">→</div>
    <div class="step b" data-step="2"><b>2. Score</b><span class="label">loss: cross-entropy for classes</span></div>
    <div class="arrow b" data-step="3">→</div>
    <div class="step b" data-step="3"><b>3. Blame</b><span class="label">backpropagation: ∂<i>L</i>/∂<i>w</i> for every weight</span></div>
    <div class="arrow b" data-step="4">→</div>
    <div class="step b hi" data-step="4"><b>4. Nudge</b><span class="label"><i>w</i> ← <i>w</i> − η ∇<sub><i>w</i></sub><i>L</i></span></div>
  </div>
  <div class="d4-card b" data-step="5" style="margin-top:2vh"><div class="label"><b>Quick check.</b> Delete every nonlinearity from a 10-layer network. What is left?</div></div>
  <div class="d4-card hi b" data-step="6"><div class="label">One linear layer. A product of matrices is one matrix.</div></div>
`, { notes: [
  "Where do the weights come from? Learning is a loop of four steps.",
  "First, predict: run the forward pass.",
  "Second, score the prediction with a loss. For classification, cross-entropy: small when the network puts high probability on the right class.",
  "Third, backpropagation. The chain rule tells us, for every single weight, how much the loss would change if we moved that weight a little.",
  "Fourth, nudge every weight a small step downhill, scaled by the learning rate eta. Repeat over millions of examples.",
  "Quick check, think for ten seconds: if I delete all the nonlinearities from a ten-layer network, what do I have?",
  "One linear layer. Ten matrices multiplied together are one matrix. That is why the nonlinearity matters."
]});

st(`
  <div class="center" style="max-width:62vw">
    <div class="statement">Nobody programs the hidden layers. They become whatever features make the loss small.</div>
    <div class="question b" style="margin-top:5vh">So what features does a network learn when its input is an image?</div>
  </div>
`, { notes: [
  "Here is the idea that drives the rest of the session. We never tell a hidden layer what to compute. Training shapes it into whatever intermediate features help reduce the loss. Those are learned representations.",
  "So the question for today: when the input is an image, what features does a network learn? And does it matter how we wire the network? It turns out it matters a great deal."
]});
}
