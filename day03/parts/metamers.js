/* PART: metamers (Day 3). Owner: Fernanda. Storyline from Fernanda, 2026-11-03:
     1. Definition, then color (the knobs we can turn; metamers show the edges of the cones' representation)
     2. Beyond color it is hard: what are the knobs?
     3. Textures: statistics as knobs (McDermott & Simoncelli; Julesz; phase scramble; Portilla-Simoncelli),
        and the periphery (what human metamers are sensitive to)
     4. No knobs at all: drive and suppress stimuli (visual system, language)
     5. Neural networks: gradient descent as the knobs, the model's representation and behavior as the cones
        and the percept. From the defense: adversarial vulnerability, model metamers, adversarial training
        and robust metamers (scenes defense-*.html, Fernanda's wording kept). Feather et al. across stages.
     6. Discussion, then "now you try" into the lab
   Scenes julesz-textons and metamers-scramble are copied from day04/. */
{
/* ---------- 1. Definition, then color ---------- */
section('Metamers');

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
  <h1 class="t">In color, we have knobs</h1>
  <div class="flow" style="margin:auto 0">
    <div class="step b" data-step="1"><b>Knobs</b><span class="label">three lights we can turn</span></div>
    <div class="arrow b" data-step="2">→</div>
    <div class="step b" data-step="2"><b>Sensors</b><span class="label">three cone types</span></div>
    <div class="arrow b" data-step="3">→</div>
    <div class="step b" data-step="3"><b>What is encoded</b><span class="label">three numbers</span></div>
  </div>
`, { notes: [
  "(draft) Why is color the easy case?",
  "(draft) Because we have knobs. Three lights whose intensities we can turn, one at a time, as precisely as we like.",
  "(draft) With them we can probe the sensors directly: three types of cone, each summing the light through its own sensitivity curve.",
  "(draft) And so we can find out exactly what is represented, or encoded, in those cells: three numbers per patch of retina, and nothing else."
]});

st(`
  <h1 class="t">Metamers show the edges of a representation</h1>
  <ul class="frag" style="margin:auto 0">
    <li class="b">Some differences between spectra are not captured by the cones</li>
    <li class="b">Those differences are thrown away</li>
    <li class="b">There is no sensory machinery to make sense of them</li>
  </ul>
`, { notes: [
  "(draft) So what do metamers tell us?",
  "(draft) They show us the edges of the representation. Some differences in the real wavelengths, like the lamp's smooth spectrum against three narrow spikes, are simply not captured by those three cell types.",
  "(draft) Which means the visual system throws those differences away, right at the first step.",
  "(draft) Or, more precisely: there is no sensory machinery to make sense of them. No amount of attention or training will let you see the difference between the two halves of that field."
]});

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
  "(draft) We exploit this edge every day.",
  "(draft) Remember Shreya's Bayer mosaic: the camera records only three numbers per pixel, through red, green and blue filters.",
  "(draft) The screen never reproduces the spectrum of the scene. It lights three primaries, red, green and blue subpixels, in the amounts those numbers say: three knobs per pixel.",
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
  "(draft) One more point: metamers are always relative.",
  "(draft) Relative to a system. A camera's color filters are not the same as your cones, so two lights that match for you can look different in a photo, and the other way around.",
  "(draft) Relative to the conditions. Two paints can match under the store's light and not under daylight, because the light reaching your eye from each one changes differently when the illuminant changes.",
  "(draft) And relative to how you look. Two images can be metamers in a brief glance in your periphery and obviously different when you look straight at them. So when we say looks the same, we always mean: to this system, under these conditions."
]});

/* ---------- 2. Beyond color ---------- */
st(`
  <h1 class="t">Beyond color, it is hard</h1>
  <div class="tiles" style="grid-template-columns:repeat(4,1fr);flex:0 0 auto;margin-top:4vh">
    <div class="tile b" data-step="1"><div class="lead center">lighting</div></div>
    <div class="tile b" data-step="1"><div class="lead center">texture</div></div>
    <div class="tile b" data-step="1"><div class="lead center">shape</div></div>
    <div class="tile b" data-step="1"><div class="lead center">position, size, viewpoint</div></div>
  </div>
  <div class="question center b" data-step="2" style="margin:auto">What are the knobs?</div>
`, { notes: [
  "(draft) Beyond color, this gets hard.",
  "(draft) Images vary in so many ways at once: the lighting, the textures, the shapes of things, where they are, how big, from which viewpoint. And we do not know the sensors: after the cones, the representations are many stages deep.",
  "(draft) So what are the knobs? What could we turn, carefully and one at a time, to find the edges of those representations?"
]});

/* ---------- 3. Textures: statistics as knobs ---------- */
section('Textures');

st(`
  <h1 class="t">Textures: statistics as knobs</h1>
  <div class="flow" style="margin:auto 0">
    <div class="step b" data-step="1"><b>A sound texture</b><span class="label">rain, wind, fire</span></div>
    <div class="arrow b" data-step="2">→</div>
    <div class="step b" data-step="2"><b>A model of the ear</b><span class="label">frequency channels</span></div>
    <div class="arrow b" data-step="3">→</div>
    <div class="step b" data-step="3"><b>Statistics</b><span class="label">the knobs</span></div>
    <div class="arrow b" data-step="4">→</div>
    <div class="step b" data-step="4"><b>Synthesis</b><span class="label">noise, adjusted to match</span></div>
  </div>
  <div class="todo b" data-step="5">Sound examples: an original texture and its synthetic version, to play in class. Source: to add</div>
  ${cite('McDermott &amp; Simoncelli, 2011')}
`, { notes: [
  "(draft) For textures, there is a beautiful answer.",
  "(draft) Take a sound texture, like rain, wind or fire.",
  "(draft) Pass it through a model of the ear, the cochlea: a bank of filters, each picking out one band of frequencies.",
  "(draft) Then measure a set of statistics of those channels over time: how loud each band is on average, how much it varies, how the bands move together. Those statistics are the knobs.",
  "(draft) Start from noise and adjust it until its statistics match the original's. McDermott and Simoncelli did exactly this.",
  "(to write) Listen to the original and the synthetic version. For many textures, listeners hear them as the same kind of sound, even though the waveform is completely different: a metamer, for us. And when a synthetic sound does not sound right, it tells us which statistic we were missing: turning the knobs shows the edges of our hearing."
]});

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
  "(draft) For images, Portilla and Simoncelli asked the same question: which statistics are enough?",
  "(draft) Start from a photograph of a texture.",
  "(draft) Pass it through a bank of oriented filters at several scales, like the Gabor bank from earlier today, and measure statistics of the outputs: not just the power spectrum, but correlations between responses at neighboring positions, orientations and scales.",
  "(draft) Then start from random noise and adjust its pixels, step by step with gradient descent, until its statistics match the ones measured on the photo.",
  "(to write) The result, next to the original. Then turn the knobs one group at a time: drop a group of statistics, and see which part of the texture falls apart."
]});

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
  "(draft) Texture statistics turn out to matter far beyond textures. A quick experiment on yourselves. Keep your eyes on the cross; do not look to the right.",
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
  "(to write) Freeman and Simoncelli built a model like this, generated images that match its statistics in every region, and asked people to compare them with the original while keeping their eyes on the center. When the regions grow at about the rate of receptive fields in V2, people cannot tell the images apart: they are metamers, even though the periphery of the synthetic image is scrambled. So human metamers tell us what we are sensitive to: in the periphery, summary statistics, not exact positions.",
  "(to write) Ruth Rosenholtz and colleagues made a similar point with what they call mongrels: images synthesized to match local summary statistics. They used them to explain crowding, the effect you just tried."
]});

/* ---------- 4. No knobs: drive and suppress ---------- */
section('Networks');

st(`
  <h1 class="t">And where we have no knobs?</h1>
  <div class="cols" style="grid-template-columns:1fr 1fr">
    <div class="b" data-step="1" style="display:flex;flex-direction:column;gap:2vh">
      <div class="lead"><b>Visual cortex</b></div>
      <div class="label">images made to drive, or silence, single neurons</div>
      <div class="todo">Figure: synthesized images that drive or suppress V4 sites. Source: to add</div>
      <div class="label">Bashivan, Kar &amp; DiCarlo, 2019 (to check)</div>
    </div>
    <div class="b" data-step="2" style="display:flex;flex-direction:column;gap:2vh">
      <div class="lead"><b>Language</b></div>
      <div class="label">sentences chosen to drive, or suppress, the language network</div>
      <div class="todo">Figure: drive and suppress sentences, and the brain responses. Source: to add</div>
      <div class="label">Tuckute et al., 2024 (to check)</div>
    </div>
  </div>
  <div class="statement center b" data-step="3">A model chooses the stimulus</div>
`, { notes: [
  "(draft) And beyond textures, where we have no hand-made knobs at all?",
  "(draft) One answer from the visual system: use a model of the neurons to design the stimulus. Bashivan, Kar and DiCarlo built a model of neurons in area V4 of the monkey, then synthesized images that the model predicted would drive a site as hard as possible, or silence it, and showed them to the monkey. (check the details before class)",
  "(draft) The same idea works for language. Tuckute and colleagues used a language model to choose sentences predicted to drive, or to suppress, the human language network, and measured the brain's responses with fMRI. (check the details before class)",
  "(draft) In both cases, a model chooses the stimulus. And that is where neural networks come in."
]});

st(`
  <h1 class="t">Neural networks: gradient descent as the knobs</h1>
  <div style="margin:auto 0;display:grid;grid-template-columns:auto 1fr 1fr;gap:2.4vh 3vw;align-items:center">
    <div></div><div class="lead b" data-step="1"><b>Color</b></div><div class="lead b" data-step="1"><b>A network</b></div>
    <div class="label b" data-step="2">the knobs</div><div class="lead b" data-step="2">three lights</div><div class="lead b" data-step="2">gradient descent on the pixels</div>
    <div class="label b" data-step="3">the sensors</div><div class="lead b" data-step="3">the cones</div><div class="lead b" data-step="3">a stage's activations</div>
    <div class="label b" data-step="4">the percept</div><div class="lead b" data-step="4">the color you see</div><div class="lead b" data-step="4">the model's behavior</div>
  </div>
  <div class="statement center b" data-step="5">What does the model encode, and what does it throw away?</div>
`, { notes: [
  "(draft) Neural networks give us knobs for any representation we can compute.",
  "(draft) Compare with color.",
  "(draft) In color, the knobs are three lights. In a network, the knob is gradient descent: we can change every pixel of an image, a little at a time, in whatever direction moves the network where we want.",
  "(draft) In color, the sensors are the cones. In a network, they are the activations at one stage: the model's representation.",
  "(draft) And in color, the output is the color you see. In a network, it is the model's behavior, for example its label.",
  "(draft) So networks let us ask exactly the question we asked of the cones: what does this model encode, and what does it throw away? Here are some answers."
]});

sc('adversarialBoxes', 'scenes/defense-adversarial.html');

sc('metamerBoxes', 'scenes/defense-metamers.html');

sc('advTrainingBoxes', 'scenes/defense-adv-training.html');

/* Feather et al. (2023) Fig. 4d: CC BY 4.0 (see assets/metamers/SOURCES.md) */
st(`
  <h1 class="t">Model metamers at every stage</h1>
  <div class="b" data-step="1" style="flex:1 1 auto;min-height:0;display:flex;margin-bottom:5vh">${fig('../assets/metamers/feather2023-fig4d.jpg')}</div>
  ${cite('Feather, Leclerc, Mądry &amp; McDermott (2023), Nature Neuroscience · CC BY 4.0')}
`, { notes: [
  "(draft) The same comparison, across every stage of the network.",
  "(draft) Each row is a network, each column a deeper stage. For the standard network, the early-stage metamers still look like the bear, but from the later stages they look like colored noise to people, even though the network calls them all bear. The adversarially trained network in the middle row keeps much more of the bear. Training with random noise instead, in the bottom row, does not help. So metamers tell us not only that a model's invariances differ from ours, but where, stage by stage, and which training choices close the gap."
]});

/* ---------- 5. Discussion, then the lab ---------- */
section('Your turn');

st(`
  <div class="question center">What information can be removed while preserving perception?</div>
  <ul class="frag" style="margin:0 auto auto;text-align:center">
    <li class="b">Inside a texture?</li>
    <li class="b">In the periphery?</li>
    <li class="b">For a machine?</li>
  </ul>
`, { notes: [
  "(draft) Before you try it yourselves, a question for all of you: what information can be removed from an image while keeping what we perceive?",
  "(draft) Think about textures: what did the scrambling and the synthesis throw away?",
  "(draft) Think about the periphery: what is lost outside the center of gaze, and why don't we notice?",
  "(draft) And for a machine: would a classifier be fooled by the same changes, or by different ones?"
]});

st(`
  <h1 class="t">Now you try: make a metamer</h1>
  <div class="flow" style="margin:auto 0">
    <div class="step b" data-step="1"><b>A texture</b><span class="label">match its statistics</span></div>
    <div class="arrow b" data-step="2">→</div>
    <div class="step b" data-step="2"><b>A vision network</b><span class="label">match one stage</span></div>
    <div class="arrow b" data-step="3">→</div>
    <div class="step b" data-step="3"><b>A sound</b><span class="label">match an audio model</span></div>
  </div>
  <div class="lead center b" data-step="4">Then test a partner: which one is real?</div>
  <div class="todo b" data-step="5">Colab link: notebooks/day03-lab-metamers.ipynb (being built with plenoptic)</div>
`, { notes: [
  "(draft) Now you try. In the lab you make metamers yourselves, with a library called plenoptic.",
  "(draft) First a texture: pick a photo, and synthesize a new image that matches its statistics.",
  "(draft) Then a vision network: match the activations at one stage, early or late, and see what survives.",
  "(draft) Then a sound: the same idea with an audio model, and you can listen to the result.",
  "(draft) And then test a partner: play or show them your original and your metamer, and see whether they can tell which one is real.",
  "(to write) Where to find the notebook."
]});
}
