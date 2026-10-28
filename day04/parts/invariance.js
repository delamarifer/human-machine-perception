/* PART: invariance (Day 4). Owner: to decide (see README.md). Plan: 20 min.
   1. Invariance, computed live (scenes/invariance.html)   2. Invariances we want
   3. Crowding demo   4. Pooling in the periphery (schematic; metamer images TO DO)   5. Auditory metamers */
{
section('Representation and invariance');

sc('invariance', 'scenes/invariance.html');

st(`
  <h1 class="t">Invariances we want</h1>
  <ul class="frag">
    <li class="b">Position</li>
    <li class="b">Size</li>
    <li class="b">Lighting</li>
    <li class="b">Viewpoint</li>
  </ul>
`, { notes: [
  "(draft) For recognizing objects, which changes should not matter?",
  "(draft) Where the object is in the image.",
  "(draft) How big it is, which mostly means how far away it is.",
  "(draft) The lighting. We saw this on Day 1 with the checker-shadow illusion: the visual system discounts the shadow and reports the surface.",
  "(draft) And the viewpoint: the same mug from the side or from above. Each of these changes the pixels a lot, and none of them changes what the object is."
]});

/* Crowding: the target letter sits at the same distance from the cross in both rows. */
st(`
  <style>
    .invariance-row{ position:relative; height:16vh; }
    .invariance-row span{ position:absolute; top:50%; transform:translate(-50%, -50%); font-size:clamp(2.6rem, 4.4vw, 4.2rem); font-weight:700; }
  </style>
  <h1 class="t">Try it: keep your eyes on the cross</h1>
  <div style="margin:auto 0">
    <div class="invariance-row b"><span style="left:14%">+</span><span style="left:76%">R</span></div>
    <div class="invariance-row b"><span style="left:14%">+</span><span style="left:76%;letter-spacing:.04em">SRH</span></div>
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
  for(let e = 70; e < 900; e *= 1.45){
    const r = e * .26, n = Math.floor(2 * Math.PI * e / (r * 1.7));
    for(let k = 0; k < n; k++){ const a = (k + (out.length % 2) * .5) / n * 2 * Math.PI, x = cx + e * Math.cos(a), y = cy + e * Math.sin(a);
      if(x > -r && x < 1600 + r && y > -r && y < 660 + r) out.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}"/>`); }
  }
  return `<svg viewBox="0 0 1600 660" style="width:100%;height:100%" preserveAspectRatio="xMidYMid meet">
    <g fill="none" stroke="#94a3b8" stroke-width="3">${out.join('')}</g>
    <g stroke="#0f172a" stroke-width="7"><line x1="782" y1="330" x2="818" y2="330"/><line x1="800" y1="312" x2="800" y2="348"/></g></svg>`;
})();
st(`
  <h1 class="t">Pooling grows with distance from the center of gaze</h1>
  <div class="b" style="flex:1 1 auto;min-height:0">${ring}</div>
  <div class="todo b">Freeman &amp; Simoncelli metamer: original and synthesized image, viewed with fixation at the center. Source: to add</div>
  <div class="todo b">Rosenholtz mongrel of a scene. Source: to add</div>
  ${cite('Freeman &amp; Simoncelli, 2011 · Balas, Nakano &amp; Rosenholtz, 2009')}
`, { notes: [
  "(draft) Why is the periphery like that?",
  "(draft) One account: the visual system computes texture-like statistics over pooling regions, and these regions grow with the distance from where you are looking. This picture is a schematic, not measured data: each circle is a pooling region.",
  "(to write) Freeman and Simoncelli built a model like this, generated images that match its statistics in every region, and asked people to compare them with the original while keeping their eyes on the center. When the regions grow at about the rate of receptive fields in V2, people cannot tell the images apart: they are metamers, even though the periphery of the synthetic image is scrambled.",
  "(to write) Ruth Rosenholtz and colleagues made a similar point with what they call mongrels: images synthesized to match local summary statistics. They used them to explain crowding, the effect you just tried."
]});

st(`
  <h1 class="t">Metamers in hearing</h1>
  <div class="flow">
    <div class="step b" data-step="1"><b>A sound texture</b><span class="label">rain, wind</span></div>
    <div class="arrow b" data-step="2">→</div>
    <div class="step b" data-step="2"><b>Statistics</b><span class="label">of a model of the cochlea</span></div>
    <div class="arrow b" data-step="3">→</div>
    <div class="step b" data-step="3"><b>Synthetic sound</b><span class="label">same statistics</span></div>
  </div>
  <div class="todo b" data-step="4">Sound examples: original and synthetic. Source: to add</div>
  ${cite('McDermott &amp; Simoncelli, 2011')}
`, { notes: [
  "(draft) The same idea works in hearing.",
  "(draft) Take a sound texture, like rain or wind.",
  "(draft) Measure statistics of its representation in a model of the cochlea, the first stage of hearing, in the same spirit as Portilla and Simoncelli did for images.",
  "(draft) Then synthesize a new sound with the same statistics, starting from noise.",
  "(to write) Listen to the original and the synthetic version. For many sound textures, listeners recognize the synthetic one as the same kind of sound, even though the waveform is completely different: an auditory metamer."
]});
}
