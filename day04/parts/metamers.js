/* PART: metamers (Day 4). Owner: to decide (see README.md). Plan: 15 min, including the activity.
   1. Definition   2. Julesz textons (scene)   3. Phase scrambling, computed live (scene)
   4. Portilla-Simoncelli: how it works, images TO DO   5. Activity (format TO DO) */
{
section('Metamers');

st(`
  <h1 class="t">Metamers</h1>
  <div class="statement center b" style="margin-top:auto">Physically different, perceptually the same</div>
  <div class="lead center b" style="margin-bottom:auto">For a given observer, or a given model</div>
`, { notes: [
  "(draft) Metamers.",
  "(draft) Two stimuli are metamers if they are physically different but perceived as the same. The word comes from color vision: two lights with different spectra that look exactly the same color.",
  "(draft) Metamers are always metamers for someone: a particular observer, or a particular model. Two images can be metamers for you and not for a camera, or the other way around. That is what makes them useful: the metamers of a system show what that system throws away."
]});

sc('juleszTextons', 'scenes/julesz-textons.html');

sc('metamerScramble', 'scenes/metamers-scramble.html');

st(`
  <h1 class="t">Matching more statistics</h1>
  <div class="flow">
    <div class="step b" data-step="1"><b>A texture photo</b></div>
    <div class="arrow b" data-step="2">→</div>
    <div class="step b" data-step="2"><b>Measure statistics</b><span class="label">of filter responses</span></div>
    <div class="arrow b" data-step="3">→</div>
    <div class="step b" data-step="3"><b>Start from noise</b><span class="label">adjust until the statistics match</span></div>
  </div>
  <div class="todo b" data-step="4">Original and synthesized texture, side by side. Source: to add (generate with plenoptic, or a figure from the paper with permission)</div>
  ${cite('Portilla &amp; Simoncelli, 2000')}
`, { notes: [
  "(draft) Portilla and Simoncelli asked: which statistics are enough?",
  "(draft) Start from a photograph of a texture.",
  "(draft) Measure a set of statistics of its filter responses: not just the power spectrum, but correlations between responses at neighboring positions, orientations and scales.",
  "(draft) Then start from random noise and adjust it, step by step, until its statistics match the ones measured on the photo.",
  "(to write) The result, next to the original. For many textures the two look like the same kind of stuff, even though no pixel was copied."
]});

st(`
  <h1 class="t">Your turn: make a metamer</h1>
  <div class="todo b" style="margin:auto 0">Activity format: to decide (see feedback/_day.md). Proposal: in pairs, take a photo of a texture, make a version with different pixels (scramble the phases, shuffle patches, or resynthesize), and test whether your partner can tell which one is real.</div>
`, { notes: [
  "(to write) Activity: create and compare images that differ in pixels but look perceptually similar.",
  "(to write) Instructions for the activity, once the format is decided."
]});
}
