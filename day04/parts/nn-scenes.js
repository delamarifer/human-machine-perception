/* PART: nn-scenes (Day 4). Owner: Fernanda. Goes right after Shreya's `networks` part, in her Section 1.
   Animated scenes in the spirit of 3Blue1Brown's Deep learning series, all drawn here (no video: the room
   has no sound). Numbers come from a real network trained on real digits (assets/nn/train_digits.py,
   train_overfit.py, stability.py); the "why layers" digits and the one-weight loss curve are drawn, not data. */
{
section('1. Networks');

sc('nnDigits', 'scenes/nn-digits.html');
sc('nnLayers', 'scenes/nn-layers.html');
sc('nnDownhill', 'scenes/nn-downhill.html');
sc('nnDescent', 'scenes/nn-descent.html');
sc('nnOverfit', 'scenes/nn-overfit.html');

/* stability numbers from assets/nn/stability.py (10 left-out digits: 21, 8, 4, 8, 4, 4, 10, 10, 6, 3 of 497) */
st(`
  <h1 class="t">How do they even learn?</h1>
  <ul class="frag" style="margin:auto 0">
    <li class="b">Our network: <b>1,482 numbers</b> learned from <b>1,300 digits</b>, and still 98% right on new ones</li>
    <li class="b">Three open questions: <b>approximation</b> · <b>optimization</b> · <b>generalization</b></li>
    <li class="b"><b>Stability:</b> leave out one training digit and retrain → on average 8 of 497 answers change</li>
  </ul>
  ${cite('Poggio, Rifkin, Mukherjee & Niyogi (2004), Nature 428, 419–422 · Poggio, Banburski & Liao (2020), PNAS 117, 30039–30045')}
`, { notes: [
  "(draft) Title only. We have seen what these networks do. A fair question is: why does any of this work?",
  "(draft) Here is a puzzle on our own small network. It has 1,482 numbers to set, and only 1,300 training digits. More knobs than examples: classical statistics says it should simply memorize, like the 100-digit network on the last slide. Yet it gets 98 percent of new digits right.",
  "(draft) Tomaso Poggio and colleagues at MIT organize the theory of deep networks around three questions. Approximation: what functions can a network represent, and why do deep networks do better than shallow ones? Optimization: the loss landscape is full of valleys, so why does walking downhill find good ones? Generalization: why do huge networks, with far more parameters than examples, not just memorize? These are active research questions; there are partial answers, not a finished theory.",
  "(draft) One idea from Poggio's work is stability. A learning method generalizes when leaving out one training example barely changes what it learns. If every single example could change the answers a lot, the network would be memorizing examples, not learning the rule. We tried this on our network: we left out one of the 1,300 training digits and retrained, ten times. On average 8 of the 497 test answers changed, between 3 and 21. Mostly stable, not perfectly. (to check, Fernanda: the stability wording against Poggio et al. 2004.)"
]});
}
