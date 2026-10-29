/* PART: demo (Day 2). Owner: to decide (see README.md). Plan: 10 min.
   ACT: title · what goes in, what comes out · the live run (setup to fill). */
{
section('Demo');

st(`
  <h1 class="t">Demo</h1>
  <div class="flow" style="margin:auto 6vw">
    <div class="step b" data-step="1"><b>One photo in</b><span class="label">from a phone</span></div>
    <div class="arrow b" data-step="2">→</div>
    <div class="step b" data-step="2"><b>Top-5 labels</b><span class="label">torchvision</span></div>
    <div class="step b" data-step="3"><b>Depth map</b><span class="label">Hugging Face</span></div>
  </div>
  <div class="todo b" data-step="4">Where the demo runs (Colab or a laptop), whose photo we use, and the fallback if the network is slow (models pre-downloaded, CPU only).</div>
`, { notes: [
  "(draft) Before you build it, let's watch it run once.",
  "(draft) One photo goes in. Someone in the room, lend us a photo from your phone.",
  "(draft) Out come the five labels the classifier thinks are most likely, with how confident it is in each.",
  "(draft) And a depth map: an estimate of how far away each pixel is, from this one image.",
  "(to write) The live demo itself."
]});
}
