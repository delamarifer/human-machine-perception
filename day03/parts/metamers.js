/* PART: metamers (Day 3). Owner: Fernanda.
   Plan: "Pixels -> features -> textures -> objects", "Metamers activity", "Representation + invariance",
   "Discussion". Organized as Fernanda's outline (2026-11-03); students read the metamers primer before class.
     1. (the representation part, parts/representation.js, comes just before this one)
     2. Metamers, formally: f(x1) = f(x2); color (Fernanda's defense scene); the screen; relative to a system
     3. Texture: Julesz textons; phase scramble; Portilla-Simoncelli
     4. Activity: make or test a metamer (format to decide)
     5. The periphery: crowding; pooling windows; Freeman & Simoncelli, Rosenholtz
     6. Metamers as a test of models: Feather et al. 2023 (vision, then hearing); sound textures
     7. Invariance; discussion
   Scenes in steps 3 and 7 are copied from day04/ (built there before metamers moved to Day 3). */
{
section('Metamers');

/* ---------- 2. Metamers, formally, with color as the solved case ---------- */
st(`
  <h1 class="t">Metamers</h1>
  <div style="margin:auto 0;display:flex;flex-direction:column;gap:4vh;align-items:center">
    <div class="statement b" data-step="1">x₁ ≠ x₂ &nbsp;&nbsp;but&nbsp;&nbsp; f(x₁) = f(x₂)</div>
    <div class="lead b" data-step="2">Physically different, the same to the system</div>
    <div class="lead b" data-step="3">They show what f throws away</div>
  </div>
`, { notes: [
  "(draft) You read about metamers in the primer. Here is the short version, in the language we just set up.",
  "(draft) Two inputs, x one and x two, that are physically different, but that the representation f maps to exactly the same numbers.",
  "(draft) The system cannot tell them apart. They are physically different, but the same to the system.",
  "(draft) And that is what makes them useful: whatever differs between two metamers is information f has thrown away. The classic case, where we know f exactly, is color."
]});

sc('colorMetamers', 'scenes/color-metamers.html');

st(`
  <h1 class="t">Every screen is a metamer machine</h1>
  <div class="flow" style="margin:auto 0">
    <div class="step b" data-step="1"><b>Camera</b><span class="label">red, green, blue filters</span></div>
    <div class="arrow b" data-step="2">→</div>
    <div class="step b" data-step="2"><b>Screen</b><span class="label">three lights per pixel</span></div>
    <div class="arrow b" data-step="3">→</div>
    <div class="step b" data-step="3"><b>Eye</b><span class="label">three cone types</span></div>
  </div>
  <div class="statement center b" data-step="4">Three numbers in, three numbers out</div>
`, { notes: [
  "(draft) This is why color photography works at all.",
  "(draft) Remember Shreya's Bayer mosaic: the camera records only three numbers per pixel, through red, green and blue filters.",
  "(draft) The screen never reproduces the spectrum of the scene. It lights three primaries, red, green and blue subpixels, in the amounts those numbers say.",
  "(draft) And your three cone types compare that light with what the real scene would have sent. If the three cone responses agree, you see the same color.",
  "(draft) Three numbers in, three numbers out. A banana on your screen is a metamer of the real banana, for you."
]});

st(`
  <h1 class="t">A metamer is always a metamer for someone</h1>
  <ul class="frag" style="margin:auto 0">
    <li class="b"><b>For a system:</b> a match for your cones need not be a match for a camera</li>
    <li class="b"><b>Under conditions:</b> a match under one light can break under another</li>
    <li class="b"><b>For a task:</b> a glance in the periphery, or a careful look</li>
  </ul>
`, { notes: [
  "(draft) One point the primer only touched: metamers are always relative.",
  "(draft) Relative to a system. A camera's color filters are not the same as your cones, so two lights that match for you can look different in a photo, and the other way around.",
  "(draft) Relative to the conditions. Two paints can match under the store's light and not under daylight, because the light reaching your eye from each one changes differently when the illuminant changes.",
  "(draft) And relative to how you look. Two images can be metamers in a brief glance in your periphery and obviously different when you look straight at them. We will see exactly that in a few minutes. So when we say looks the same, we always mean: to this system, under these conditions."
]});

/* ---------- 3. Texture: which statistics are enough? ---------- */
sc('juleszTextons', 'scenes/julesz-textons.html');

sc('metamerScramble', 'scenes/metamers-scramble.html');

st(`
  <h1 class="t">Matching more statistics</h1>
  <div class="flow">
    <div class="step b" data-step="1"><b>A texture photo</b></div>
    <div class="arrow b" data-step="2">→</div>
    <div class="step b" data-step="2"><b>Measure statistics</b><span class="label">of a filter bank's outputs</span></div>
    <div class="arrow b" data-step="3">→</div>
    <div class="step b" data-step="3"><b>Start from noise</b><span class="label">adjust until the statistics match</span></div>
  </div>
  <div class="todo b" data-step="4">Original and synthesized texture, side by side; then the same synthesis with groups of statistics dropped. Generate with plenoptic (the lab session can make these).</div>
  ${cite('Portilla &amp; Simoncelli, 2000')}
`, { notes: [
  "(draft) Portilla and Simoncelli asked: which statistics are enough?",
  "(draft) Start from a photograph of a texture.",
  "(draft) Pass it through a bank of oriented filters at several scales, like the Gabor bank from earlier today, and measure statistics of the outputs: not just the power spectrum, but correlations between responses at neighboring positions, orientations and scales.",
  "(draft) Then start from random noise and adjust its pixels, step by step with gradient descent, until its statistics match the ones measured on the photo.",
  "(to write) The result, next to the original. Then the deeper question: drop one group of statistics at a time, and see which part of the texture falls apart."
]});

/* ---------- 4. Activity ---------- */
section('Activity');

st(`
  <h1 class="t">Your turn: make a metamer</h1>
  <div class="todo b" style="margin:auto 0">Activity format: to decide. Proposal: in pairs, one person makes an image with different pixels (scramble the phases, shuffle patches, or resynthesize a texture), the other tries to tell which one is real.</div>
`, { notes: [
  "(to write) Activity: create and compare images that differ in pixels but look perceptually similar.",
  "(to write) Instructions for the activity, once the format is decided."
]});

/* ---------- 5. Where vision pools: the periphery ---------- */
section('Beyond texture');

/* Crowding: the target letter sits at the same distance from the cross in both rows. */
st(`
  <style>
    .metamers-row{ position:relative; height:16vh; }
    .metamers-row span{ position:absolute; top:50%; transform:translate(-50%, -50%); font-size:clamp(2.6rem, 4.4vw, 4.2rem); font-weight:700; }
  </style>
  <h1 class="t">Try it: keep your eyes on the cross</h1>
  <div style="margin:auto 0">
    <div class="metamers-row b"><span style="left:14%">+</span><span style="left:76%">R</span></div>
    <div class="metamers-row b"><span style="left:14%">+</span><span style="left:76%;letter-spacing:.04em">SRH</span></div>
  </div>
  ${cite('Bouma, 1970')}
`, { notes: [
  "(draft) A quick experiment on yourselves. Keep your eyes on the cross; do not look to the right.",
  "(draft) Without moving your eyes, can you read the letter on the right? Most people can.",
  "(draft) Now the same letter, at the same distance from the cross, with a neighbor on each side. Keep looking at the cross. It is much harder to say what the middle letter is. This is called crowding; Bouma measured it for letters in 1970. The letters are all there, but the periphery seems to keep a summary of the region rather than every detail."
]});

/* Schematic (not data): pooling windows whose size grows with distance from the fixation point. */
const ring = (() => {
  const cx = 800, cy = 330, out = [];
  for(let e = 60, ri = 0; e < 900; e *= 1.5, ri++){
    const r = e * .2, n = Math.floor(2 * Math.PI * e / (r * 1.9));
    for(let k = 0; k < n; k++){ const a = (k + (ri % 2) * .5) / n * 2 * Math.PI, x = cx + e * Math.cos(a), y = cy + e * Math.sin(a);
      if(x > -r && x < 1600 + r && y > -r && y < 660 + r) out.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}"/>`); }
  }
  return `<svg viewBox="0 0 1600 660" style="width:100%;height:100%" preserveAspectRatio="xMidYMid meet">
    <g fill="none" stroke="#94a3b8" stroke-width="3">${out.join('')}</g>
    <g stroke="#0f172a" stroke-width="7"><line x1="782" y1="330" x2="818" y2="330"/><line x1="800" y1="312" x2="800" y2="348"/></g></svg>`;
})();
st(`
  <h1 class="t">Pooling grows with distance from the center of gaze</h1>
  <div class="b" style="flex:1 1 auto;min-height:0">${ring}</div>
  <div class="todo b">Freeman &amp; Simoncelli metamer: original and synthesized image, viewed with fixation at the center. Source: to add (or generate with plenoptic)</div>
  <div class="todo b">Rosenholtz mongrel of a scene. Source: to add</div>
  ${cite('Freeman &amp; Simoncelli, 2011 · Balas, Nakano &amp; Rosenholtz, 2009')}
`, { notes: [
  "(draft) Why is the periphery like that?",
  "(draft) One account: the visual system computes texture-like statistics over pooling regions, and these regions grow with the distance from where you are looking. This picture is a schematic, not measured data: each circle is a pooling region.",
  "(to write) Freeman and Simoncelli built a model like this, generated images that match its statistics in every region, and asked people to compare them with the original while keeping their eyes on the center. When the regions grow at about the rate of receptive fields in V2, people cannot tell the images apart: they are metamers, even though the periphery of the synthetic image is scrambled.",
  "(to write) Ruth Rosenholtz and colleagues made a similar point with what they call mongrels: images synthesized to match local summary statistics. They used them to explain crowding, the effect you just tried."
]});

/* ---------- 6. Metamers as a test of models (figures: CC BY 4.0, see assets/metamers/SOURCES.md) ---------- */
const FEATHER = 'Feather, Leclerc, Mądry &amp; McDermott (2023), Nature Neuroscience · CC BY 4.0';
st(`
  <h1 class="t">Model metamers: does a network throw away what we do?</h1>
  <div class="flow b" data-step="1" style="margin:0">
    <div class="step"><b>An image</b></div><div class="arrow">→</div>
    <div class="step"><b>Network stage</b><span class="label">its activations</span></div><div class="arrow">→</div>
    <div class="step"><b>Noise, adjusted</b><span class="label">until they match</span></div><div class="arrow">→</div>
    <div class="step"><b>Ask people</b><span class="label">same or not?</span></div>
  </div>
  <div class="b" data-step="2" style="flex:1 1 auto;min-height:0;display:flex;margin-bottom:5vh">${fig('../assets/metamers/feather2023-fig4d.jpg')}</div>
  ${cite(FEATHER)}
`, { notes: [
  "(draft) Now turn the tool around and use it on our models.",
  "(draft) The recipe is the same as for textures. Take an image, run it through a trained network, and record the activations at one stage. Start from noise and adjust it until the network's activations match. The result is a model metamer: an image the network treats as identical to the original. Then show it to people.",
  "(draft) Here is what Jenelle Feather and colleagues found for image classifiers. Each row is a network, each column a deeper stage. For a standard network, the early-stage metamers still look like the bear, but from the later stages they look like colored noise to people, even though the network calls them all bear. The adversarially trained network in the middle row keeps much more of the bear. So these standard networks throw away information that people use: their invariances are not ours."
]});

st(`
  <h1 class="t">The same test, for hearing</h1>
  <div class="b" data-step="1" style="flex:1 1 auto;min-height:0;display:flex;margin-bottom:5vh">${fig('../assets/metamers/feather2023-fig5d.jpg')}</div>
  <div class="todo b" data-step="2">Sound examples: original and model metamers, to play in class. Source: to add (from the paper's materials, or generated in the lab)</div>
  ${cite(FEATHER)}
`, { notes: [
  "(draft) The same test works in hearing.",
  "(draft) These are cochleagrams: frequency going up, time going across, like a spectrogram shaped by the ear. For speech networks with standard training, late-stage metamers turn into texture, and people can no longer make out the word. Adversarial training helps here too, though less than for images.",
  "(to write) Listen to an original and its metamers."
]});

/* ---------- 7. Invariance, then discussion ---------- */
section('Invariance');

sc('invariance', 'scenes/invariance.html');

st(`
  <div class="question center">What information can be removed while preserving perception?</div>
  <ul class="frag" style="margin:0 auto auto;text-align:center">
    <li class="b">Inside a texture?</li>
    <li class="b">In the periphery?</li>
    <li class="b">For a machine?</li>
  </ul>
`, { notes: [
  "(draft) To finish, a question for all of you: what information can be removed from an image while keeping what we perceive?",
  "(draft) Think about textures: what did the scrambling and the synthesis throw away?",
  "(draft) Think about the periphery: what is lost outside the center of gaze, and why don't we notice?",
  "(draft) And for a machine: would a classifier be fooled by the same changes, or by different ones? That is the question we take into Day 4, on CNNs."
]});
}
