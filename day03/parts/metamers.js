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
/* ---------- visuals for this part (drawn here, in SVG) ----------
   Cone curves: Stockman & Sharpe (2000) 2-degree fundamentals, assets/metamers/cones.json (as in the primer),
   filled in after the deck starts. Cone numbers 1.00 / 0.87 / 0.33: the match computed by color-metamers.html.
   The lamp: Planck's law at 2856 K (CIE Illuminant A). The three primaries are drawn as equal spikes: a
   schematic of WHERE the energy is, with no energy axis (their true energies differ a lot; see slide 22). */
const MV_INK = '#0f172a', MV_MUTE = '#94a3b8', MV_CONE = ['#d23c3c', '#2e9b4f', '#2f6fd1'], MV_LMS = [1.00, .87, .33];
const mvLamp = l => 1 / (Math.pow(l, 5) * (Math.exp(1.4388e7 / (2856 * l)) - 1));
const mvSpectrum = (kind, w = 220, h = 120) => {
  const x = l => 10 + (l - 380) / 400 * (w - 20), base = h - 22;
  let body;
  if(kind === 'lamp'){ const mx = mvLamp(780); let d = '';
    for(let l = 380; l <= 780; l += 5) d += (l === 380 ? 'M' : 'L') + x(l).toFixed(1) + ',' + (base - mvLamp(l) / mx * (h - 40)).toFixed(1);
    body = `<path d="${d}L${x(780)},${base}L${x(380)},${base}Z" fill="${MV_INK}" fill-opacity=".12"/><path d="${d}" fill="none" stroke="${MV_INK}" stroke-width="3"/>`; }
  else body = [436, 546, 700].map(l => `<path d="M${x(l) - 5},${base} L${x(l)},${base - (h - 40)} L${x(l) + 5},${base} Z" fill="${MV_INK}"/>`).join('');
  return `<svg viewBox="0 0 ${w} ${h}" style="width:100%;height:auto">${body}
    <line x1="10" y1="${base}" x2="${w - 10}" y2="${base}" stroke="${MV_MUTE}" stroke-width="2"/>
    <text x="10" y="${h - 4}" font-size="15" fill="${MV_INK}">400</text><text x="${w - 10}" y="${h - 4}" font-size="15" fill="${MV_INK}" text-anchor="end">700 nm</text></svg>`;
};
const mvBars = (vals = MV_LMS, w = 200, h = 120) => {
  const bw = (w - 40) / 3;
  return `<svg viewBox="0 0 ${w} ${h}" style="width:100%;height:auto">${vals.map((v, k) => {
    const bh = v * (h - 40), x = 20 + k * bw;
    return `<rect x="${x + 8}" y="${h - 22 - bh}" width="${bw - 16}" height="${bh}" fill="${MV_CONE[k]}"/>
      <text x="${x + bw / 2}" y="${h - 4}" font-size="16" font-weight="700" fill="${MV_INK}" text-anchor="middle">${'LMS'[k]}</text>`; }).join('')}
    <line x1="14" y1="${h - 22}" x2="${w - 14}" y2="${h - 22}" stroke="${MV_MUTE}" stroke-width="2"/></svg>`;
};
const mvKnobs = (w = 220, h = 120) => `<svg viewBox="0 0 ${w} ${h}" style="width:100%;height:auto">${[0, 1, 2].map(k => {
  const cx = 40 + k * 70, cy = 52, a = [-60, 20, 70][k] * Math.PI / 180;
  return `<circle cx="${cx}" cy="${cy}" r="27" fill="#e2e8f0" stroke="${MV_MUTE}" stroke-width="2"/>
    <line x1="${cx}" y1="${cy}" x2="${(cx + 22 * Math.sin(a)).toFixed(1)}" y2="${(cy - 22 * Math.cos(a)).toFixed(1)}" stroke="${MV_INK}" stroke-width="4" stroke-linecap="round"/>
    <circle cx="${cx}" cy="${cy + 44}" r="6" fill="${MV_CONE[k]}"/>`; }).join('')}</svg>`;
/* the cone curves, from the real data once it has loaded */
const mvCones = `<svg class="metamers-cones" viewBox="0 0 220 120" style="width:100%;height:auto"></svg>`;
fetch('../assets/metamers/cones.json').then(r => r.json()).then(c => {
  const x = l => 10 + (l - 380) / 400 * 200, y = v => 98 - v * 80;
  const paths = ['L', 'M', 'S'].map((n, k) => { const mx = Math.max(...c[n]);
    return `<path d="${c.wl.map((l, i) => (i ? 'L' : 'M') + x(l).toFixed(1) + ',' + y(c[n][i] / mx).toFixed(1)).join('')}" fill="none" stroke="${MV_CONE[k]}" stroke-width="3.5"/>`; }).join('');
  const fill = () => { const svgs = document.querySelectorAll('svg.metamers-cones'); if(!svgs.length) return setTimeout(fill, 200);
    svgs.forEach(g => g.innerHTML = paths + `<line x1="10" y1="98" x2="210" y2="98" stroke="${MV_MUTE}" stroke-width="2"/>
      <text x="10" y="116" font-size="15" fill="${MV_INK}">400</text><text x="210" y="116" font-size="15" fill="${MV_INK}" text-anchor="end">700 nm</text>`); };
  fill();
}).catch(() => {});
/* objects for "Beyond color": one gray ball, changed in one way per tile (drawn, not photographed) */
const mvBall = (kind, id) => {
  const ground = `<line x1="10" y1="132" x2="190" y2="132" stroke="${MV_MUTE}" stroke-width="2"/>`;
  const grad = (gid, fx) => `<radialGradient id="${gid}" cx="${fx}" cy=".35" r=".75"><stop offset="0" stop-color="#e2e8f0"/><stop offset="1" stop-color="#475569"/></radialGradient>`;
  if(kind === 'light') return `<svg viewBox="0 0 200 140" style="width:100%;height:auto"><defs>${grad(id + 'a', '.3')}${grad(id + 'b', '.8')}</defs>${ground}
    <ellipse cx="62" cy="130" rx="34" ry="5" fill="#0f172a" fill-opacity=".18"/><circle cx="55" cy="96" r="34" fill="url(#${id}a)"/>
    <ellipse cx="146" cy="130" rx="34" ry="5" fill="#0f172a" fill-opacity=".18"/><circle cx="145" cy="96" r="34" fill="url(#${id}b)" opacity=".75"/></svg>`;
  if(kind === 'texture') return `<svg viewBox="0 0 200 140" style="width:100%;height:auto"><defs>${grad(id, '.3')}
    <pattern id="${id}p" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><rect width="6" height="12" fill="#0f172a" fill-opacity=".35"/></pattern></defs>${ground}
    <circle cx="100" cy="90" r="40" fill="url(#${id})"/><circle cx="100" cy="90" r="40" fill="url(#${id}p)"/></svg>`;
  if(kind === 'shape') return `<svg viewBox="0 0 200 140" style="width:100%;height:auto">${ground}
    <path d="M70,62 L100,48 L136,58 L106,72 Z" fill="#cbd5e1"/><path d="M70,62 L106,72 L106,130 L70,120 Z" fill="#94a3b8"/><path d="M106,72 L136,58 L136,116 L106,130 Z" fill="#64748b"/></svg>`;
  return `<svg viewBox="0 0 200 140" style="width:100%;height:auto"><defs>${grad(id, '.3')}</defs>${ground}
    <circle cx="44" cy="112" r="20" fill="url(#${id})"/><ellipse cx="150" cy="118" rx="30" ry="16" fill="url(#${id})"/></svg>`;
};
const mvCol = (inner, label, step) => `<div class="b" data-step="${step}" style="display:flex;flex-direction:column;align-items:center;gap:1vh;width:100%">
  <div style="width:100%">${inner}</div><div class="label center">${label}</div></div>`;
const mvArrow = step => `<div class="b" data-step="${step}" style="font-size:clamp(1.6rem,2.6vw,2.4rem);color:#64748b">→</div>`;

/* ---------- 1. Definition, then color ---------- */
section('Metamers');

st(`
  <h1 class="t">Metamers</h1>
  <div class="statement center b" data-step="1">x₁ ≠ x₂ &nbsp;&nbsp;but&nbsp;&nbsp; f(x₁) = f(x₂)</div>
  <div style="margin:auto 0;display:grid;grid-template-columns:1fr 1fr auto 1fr auto 1fr;gap:2vw;align-items:center">
    ${mvCol(mvSpectrum('lamp'), 'x₁: a lamp', 1)}${mvCol(mvSpectrum('spikes'), 'x₂: three lights', 1)}
    ${mvArrow(2)}<div class="b" data-step="2" style="border:2px solid ${MV_INK};border-radius:14px;padding:3vh 1vw;text-align:center"><b class="lead">f</b><div class="label">the cones</div></div>
    ${mvArrow(2)}${mvCol(mvBars(), 'f(x₁) = f(x₂)', 2)}
  </div>
  <div class="lead center b" data-step="3">They show what f throws away</div>
`, { notes: [
  "(draft) You read about metamers in the primer. Here is the short version, in the language we just set up.",
  "(draft) Two inputs, x one and x two, that are physically different. Here, the light of a lamp, with energy at every wavelength, and a mix of three single wavelengths.",
  "(draft) A representation f, here the cones, maps them to exactly the same three numbers. The system cannot tell them apart: physically different, the same to the system.",
  "(draft) And that is what makes them useful: whatever differs between two metamers is information f has thrown away. Let's see this happen."
]});

sc('colorMetamers', 'scenes/color-metamers.html');

st(`
  <h1 class="t">In color, we have knobs</h1>
  <div style="margin:auto 0;display:grid;grid-template-columns:1fr auto 1fr auto 1fr;gap:2vw;align-items:center">
    ${mvCol(mvKnobs(), '<b>Knobs</b>: three lights we can turn', 1)}
    ${mvArrow(2)}${mvCol(mvCones, '<b>Sensors</b>: three cone types', 2)}
    ${mvArrow(3)}${mvCol(mvBars(), '<b>What is encoded</b>: three numbers', 3)}
  </div>
  ${cite('Cone sensitivities: Stockman &amp; Sharpe (2000), via the CVRL database')}
`, { notes: [
  "(draft) Why is color the easy case?",
  "(draft) Because we have knobs. Three lights whose intensities we can turn, one at a time, as precisely as we like.",
  "(draft) With them we can probe the sensors directly: three types of cone, each summing the light through its own sensitivity curve. These are the measured curves.",
  "(draft) And so we can find out exactly what is represented, or encoded, in those cells: three numbers per patch of retina, and nothing else."
]});

/* the lamp's spectrum as 41 numbers (every 10 nm), squeezed into three */
const mvMany = (() => { const mx = mvLamp(780), n = 41, w = 420, h = 130;
  const bars = [...Array(n)].map((_, i) => { const l = 380 + i * 10, bh = mvLamp(l) / mx * (h - 30);
    return `<rect x="${10 + i * (w - 20) / n}" y="${h - 20 - bh}" width="${(w - 20) / n - 2}" height="${bh}" fill="${MV_INK}" fill-opacity=".55"/>`; }).join('');
  return `<svg viewBox="0 0 ${w} ${h}" style="width:100%;height:auto">${bars}<line x1="8" y1="${h - 20}" x2="${w - 8}" y2="${h - 20}" stroke="${MV_MUTE}" stroke-width="2"/></svg>`; })();
st(`
  <h1 class="t">Metamers show the edges of a representation</h1>
  <div class="b" data-step="1" style="display:grid;grid-template-columns:2fr auto 1fr;gap:2vw;align-items:center;width:80%;margin:2vh auto 0">
    <div>${mvMany}<div class="label center">a spectrum: hundreds of numbers</div></div>
    <div style="font-size:clamp(1.6rem,2.6vw,2.4rem);color:#64748b">→</div>
    <div>${mvBars()}<div class="label center">the cones: three</div></div>
  </div>
  <ul class="frag" style="margin:auto 0;list-style:disc;padding-left:1.4em">
    <li class="b" data-step="1">Some differences between spectra are not captured by the cones</li>
    <li class="b" data-step="2">Those differences are thrown away</li>
    <li class="b" data-step="3">There is no sensory machinery to make sense of them</li>
  </ul>
`, { notes: [
  "(draft) So what do metamers tell us?",
  "(draft) They show us the edges of the representation. A spectrum has energy at hundreds of wavelengths; the cones keep three numbers. Some differences in the real wavelengths, like the lamp's smooth spectrum against three narrow spikes, are simply not captured by those three cell types.",
  "(draft) Which means the visual system throws those differences away, right at the first step.",
  "(draft) Or, more precisely: there is no sensory machinery to make sense of them. No amount of attention or training will let you see the difference between the two halves of that field."
]});

/* screen subpixels showing yellow: red and green lit, blue off (a sketch; real layouts vary) */
const mvSub = (() => { const px = [], cols = 6, rows = 4, s = 30;
  for(let r = 0; r < rows; r++) for(let c = 0; c < cols; c++) ['#e53935', '#43a047', '#1e2a4a'].forEach((f, k) =>
    px.push(`<rect x="${c * s + k * s / 3 + 1}" y="${r * s + 1}" width="${s / 3 - 2}" height="${s - 2}" rx="2" fill="${f}"/>`));
  return `<svg viewBox="0 0 ${cols * s} ${rows * s}" style="height:16vh;width:auto;background:#0b0d10">${px.join('')}</svg>`; })();
st(`
  <h1 class="t">Every screen is a metamer machine</h1>
  <div class="flow" style="margin:2vh 0 0">
    <div class="step b" data-step="1"><b>Camera</b><span class="label">red, green, blue filters</span></div>
    <div class="arrow b" data-step="2">→</div>
    <div class="step b" data-step="2"><b>Screen</b><span class="label">three lights per pixel</span></div>
    <div class="arrow b" data-step="3">→</div>
    <div class="step b" data-step="3"><b>Eye</b><span class="label">three cone types</span></div>
  </div>
  <div class="b" data-step="2" style="display:flex;justify-content:center;align-items:center;gap:3vw;margin:auto 0">
    <div style="text-align:center">${mvSub}<div class="label">up close: red and green lit, blue off</div></div>
    <div style="text-align:center"><div style="height:16vh;aspect-ratio:1.5;background:#e8c32e;margin:auto"></div><div class="label">from a normal distance: yellow</div></div>
  </div>
  <div class="statement center b" data-step="4">Three numbers in, three numbers out</div>
`, { notes: [
  "(draft) We exploit this edge every day.",
  "(draft) Remember Shreya's Bayer mosaic: the camera records only three numbers per pixel, through red, green and blue filters.",
  "(draft) The screen never reproduces the spectrum of the scene. It lights three primaries, red, green and blue subpixels, in the amounts those numbers say: three knobs per pixel. Your screen has no yellow pixels: up close, yellow is red and green subpixels lit, blue off. This is a sketch; real layouts vary.",
  "(draft) And your three cone types compare that light with what the real scene would have sent. If the three cone responses agree, you see the same color.",
  "(draft) Three numbers in, three numbers out. A banana on your screen is a metamer of the real banana, for you."
]});

st(`
  <h1 class="t">A metamer is always a metamer for someone</h1>
  <ul class="frag" style="margin:auto 0;list-style:disc;padding-left:1.4em">
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
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:3vw;margin-top:4vh">
    ${mvCol(mvBall('light', 'mvb1'), 'lighting', 1)}${mvCol(mvBall('texture', 'mvb2'), 'texture', 1)}
    ${mvCol(mvBall('shape', 'mvb3'), 'shape', 1)}${mvCol(mvBall('where', 'mvb4'), 'position, size, viewpoint', 1)}
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
