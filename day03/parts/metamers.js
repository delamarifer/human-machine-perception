/* PART: metamers (Day 3). Owner: Fernanda. Storyline from Fernanda, 2026-11-03:
     1. Definition, then color (the knobs we can turn; metamers show the edges of the cones' representation)
     2. Beyond color it is hard: what are the knobs?
     3. Textures: Julesz; phase scramble; statistics as knobs (Portilla-Simoncelli, real plenoptic syntheses);
        the same knobs for sound (McDermott & Simoncelli);
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

/* The definition, general (Fernanda, 2026-11-04: just the function; then x1, x2 can be images, sounds or any
   sensory input, and f the human visual system, an AI model or any system that does inference).
   Each slot swaps in place: later items stack on top of earlier ones (white background). */
const mvWave = (seed, n = 90) => { let r = seed; const rnd = () => (r = (r * 16807) % 2147483647) / 2147483647;
  const pts = [...Array(n)].map((_, i) => { const env = .25 + .75 * Math.abs(Math.sin(i / n * Math.PI * (2 + seed % 3)));
    return `${(i / (n - 1) * 200).toFixed(1)},${(40 + (rnd() * 2 - 1) * 34 * env).toFixed(1)}`; });
  return `<svg viewBox="0 0 200 80" style="width:100%;height:auto"><polyline points="${pts.join(' ')}" fill="none" stroke="${MV_INK}" stroke-width="1.6" stroke-linejoin="round"/></svg>`; };
const mvPair = (a, b, step, cap) => `<div class="b mvdef-item" data-step="${step}">
  <div class="mvdef-pair"><div><div class="label mvdef-sub">x₁</div>${a}</div><div><div class="label mvdef-sub">x₂</div>${b}</div></div>
  <div class="label mvdef-cap">${cap}</div></div>`;
const mvF = (step, text) => `<div class="b mvdef-item mvdef-f" data-step="${step}"><b class="lead">f</b><div class="label">${text}</div></div>`;

st(`
  <h1 class="t">Metamers</h1>
  <div class="statement center b" data-step="1">x₁ ≠ x₂ &nbsp;&nbsp;but&nbsp;&nbsp; f(x₁) = f(x₂)</div>
  <div class="mvdef-row">
    <div class="mvdef-stack">
      ${mvPair('<img src="assets/ps-textures/brick-original.png" alt="">', '<img src="assets/ps-textures/brick-all.png" alt="">', 2, 'images')}
      ${mvPair(mvWave(7), mvWave(4242), 3, 'sounds')}
      <div class="b mvdef-item" data-step="4"><div class="lead mvdef-any">any sensory input</div><div class="label mvdef-cap">touch, smell, …</div></div>
    </div>
    <div class="b mvdef-arrow" data-step="5">→</div>
    <div class="mvdef-stack">
      ${mvF(5, 'the human visual system')}
      ${mvF(6, 'an AI model')}
      ${mvF(7, 'any system that does inference over the stimuli')}
    </div>
    <div class="b mvdef-arrow" data-step="5">→</div>
    <div class="b lead" data-step="5">f(x₁) = f(x₂)</div>
  </div>
  <div class="lead center b" data-step="8">They show what f throws away</div>
  <style>
    .mvdef-row{ margin:auto 0; display:grid; grid-template-columns:min(40vw, 62vh) auto minmax(0, 1fr) auto auto; gap:2vw; align-items:center; }
    .mvdef-stack{ display:grid; align-items:center; }
    .mvdef-stack > .mvdef-item{ grid-area:1 / 1; align-self:center; }
    .mvdef-stack > .mvdef-item:has(~ .mvdef-item.shown){ opacity:0 !important; }   /* a later item replaces it */
    .mvdef-pair{ display:grid; grid-template-columns:1fr 1fr; gap:1.4vw; align-items:end; }
    .mvdef-pair img{ width:100% !important; height:auto !important; max-height:none !important; aspect-ratio:1 / 1; object-fit:cover; display:block; border-radius:6px; }
    .mvdef-sub{ text-align:center; margin-bottom:.6vh; }
    .mvdef-cap{ text-align:center; margin-top:1.2vh; }
    .mvdef-any{ text-align:center; padding:6vh 0; }
    .mvdef-f{ border:2px solid ${MV_INK}; border-radius:14px; padding:3vh 1.2vw; text-align:center; }
    .mvdef-arrow{ font-size:clamp(1.6rem,2.6vw,2.4rem); color:#64748b; }
  </style>
  <div class="cite b" data-step="2">Images: a brick-wall photo and its Portilla–Simoncelli texture metamer, made with plenoptic</div>
`, { notes: [
  "(draft) You read about metamers in the primer. Here is the short version, in the language we just set up.",
  "(draft) Two inputs, x one and x two, that are physically different, and a function f that maps them to exactly the same output.",
  "(draft) The inputs can be images. Here, a photo of a brick wall, and a new image synthesized to match its texture statistics: every pixel is different.",
  "(draft) They can be sounds: two different waveforms.",
  "(draft) Or any sensory input at all: touch, smell, anything a system takes in.",
  "(draft) And f can be the human visual system: two images that look the same to us.",
  "(draft) It can be an AI model: two inputs that produce the same activations, or the same answer.",
  "(draft) Or any system that does inference over the stimuli. If its output is the same, the two inputs are metamers for that system.",
  "(draft) And that is what makes them useful: whatever differs between two metamers is information f has thrown away. Let's see this happen, first in color."
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
/* The negative space (Fernanda, 2026-11-04): spectra that differ in the world but are the same for the cones.
   Computed from the cone curves (cones.json): start from the lamp, add smooth random patterns with everything the
   three cones respond to projected out, so L, M and S stay exactly the same. The differences are the negative
   space of the representation: patterns of energy no cone responds to. Checked in the console on load. */
const mvNeg = { spectra:`<div style="position:relative"><svg class="metamers-neg-sp" viewBox="0 0 440 150" style="width:100%;height:auto;display:block"></svg>
  <div class="b" data-step="2" style="position:absolute;inset:0"><svg class="metamers-neg-mt" viewBox="0 0 440 150" style="width:100%;height:auto;display:block"></svg></div></div>`,
                diffs:`<svg class="metamers-neg-df" viewBox="0 0 440 120" style="width:100%;height:auto"></svg>` };
fetch('../assets/metamers/cones.json').then(r => r.json()).then(c => {
  const wl = c.wl.map((l, i) => [l, i]).filter(([l]) => l >= 400 && l <= 700), idx = wl.map(([, i]) => i), lam = wl.map(([l]) => l);
  const C = ['L', 'M', 'S'].map(n => idx.map(i => c[n][i]));
  const base = (() => { const b = lam.map(mvLamp), mx = Math.max(...b); return b.map(v => v / mx); })();
  const dot = (a, b) => a.reduce((s, v, i) => s + v * b[i], 0);
  // project out the span of the three cone curves (Gram-Schmidt), so the cones' responses do not change
  const Q = []; C.forEach(v => { let u = v.slice(); Q.forEach(q => { const d = dot(u, q); u = u.map((x, i) => x - d * q[i]); });
    const n = Math.sqrt(dot(u, u)); Q.push(u.map(x => x / n)); });
  const nul = r => { let u = r.slice(); Q.forEach(q => { const d = dot(u, q); u = u.map((x, i) => x - d * q[i]); }); return u; };
  const smooth = seed => lam.map(l => [1, 2, 3].reduce((s, k) => s + Math.sin(l / (18 + 9 * k + seed) + seed * k) / k, 0));
  const diffs = [1.3, 4.1, 7.7].map(seed => { const d = nul(smooth(seed));
    let sc = Infinity; d.forEach((v, i) => { if(v < 0) sc = Math.min(sc, (base[i] - .03) / -v); }); return d.map(v => v * .9 * sc); });
  const mets = diffs.map(d => base.map((v, i) => v + d[i]));
  const resp = sp => C.map(cv => dot(cv, sp));
  console.log('negative space check, cone responses (lamp, then metamers):', [base, ...mets].map(sp => resp(sp).map(v => v.toFixed(4)).join(' ')).join(' | '));
  const X = l => 14 + (l - 400) / 300 * 412, grays = ['#64748b', '#94a3b8', '#475569'];
  const line = (sp, Y) => sp.map((v, i) => (i ? 'L' : 'M') + X(lam[i]).toFixed(1) + ',' + Y(v).toFixed(1)).join('');
  const mx = Math.max(...base, ...mets.flat()), Ys = v => 124 - v / mx * 110;
  const axis = (y, lab) => `<line x1="14" y1="${y}" x2="426" y2="${y}" stroke="${MV_MUTE}" stroke-width="1.5"/>` +
    (lab ? `<text x="14" y="${y + 18}" font-size="14" fill="${MV_INK}">400</text><text x="426" y="${y + 18}" font-size="14" fill="${MV_INK}" text-anchor="end">700 nm</text>` : '');
  const lampPath = `<path d="${line(base, Ys)}" fill="none" stroke="${MV_INK}" stroke-width="3"/>`;
  const sp = axis(124, true) + lampPath;
  const mt = mets.map((m, k) => `<path d="${line(m, Ys)}" fill="none" stroke="${grays[k]}" stroke-width="2.2"/>`).join('') + lampPath;
  const dm = Math.max(...diffs.flat().map(Math.abs)), Yd = v => 56 - v / dm * 46;
  const df = `<line x1="14" y1="56" x2="426" y2="56" stroke="${MV_MUTE}" stroke-width="1.5" stroke-dasharray="4 4"/>` +
    diffs.map((d, k) => `<path d="${line(d, Yd)}L${X(700)},56L${X(400)},56Z" fill="${grays[k]}" fill-opacity=".14"/><path d="${line(d, Yd)}" fill="none" stroke="${grays[k]}" stroke-width="2"/>`).join('') +
    `<text x="14" y="116" font-size="14" fill="${MV_INK}">400</text><text x="426" y="116" font-size="14" fill="${MV_INK}" text-anchor="end">700 nm</text>`;
  const fill = () => { const a = document.querySelectorAll('svg.metamers-neg-sp'); if(!a.length) return setTimeout(fill, 200);
    a.forEach(g => g.innerHTML = sp); document.querySelectorAll('svg.metamers-neg-mt').forEach(g => g.innerHTML = mt); document.querySelectorAll('svg.metamers-neg-df').forEach(g => g.innerHTML = df); };
  fill();
}).catch(() => {});
st(`
  <h1 class="t">Metamers show the edges of a representation</h1>
  <div class="metamers-neg">
    <div class="b" data-step="1">${mvNeg.spectra}<div class="label center">a spectrum: hundreds of numbers</div><div class="label center b" data-step="2">many different spectra in the world</div></div>
    <div class="b metamers-neg-arrow" data-step="1">→</div>
    <div class="b" data-step="1">${mvBars()}<div class="label center">the cones: three</div><div class="label center b" data-step="2">the same three numbers</div></div>
    <div class="b metamers-neg-diff" data-step="3">${mvNeg.diffs}<div class="label center">what differs between them: the negative space, patterns no cone responds to</div></div>
    <div class="b metamers-neg-arrow" data-step="3">→</div>
    <div class="b label center" data-step="3"><b class="lead">0, 0, 0</b><br>the cones’ response</div>
  </div>
  <ul class="frag" style="list-style:disc;padding-left:1.4em;margin-top:1vh">
    <li class="b" data-step="2">Some differences between spectra are not captured by the cones</li>
    <li class="b" data-step="3">Those differences are thrown away</li>
    <li class="b" data-step="4">There is no sensory machinery to make sense of them</li>
  </ul>
  <style>
    .metamers-neg{ margin:auto 0; display:grid; grid-template-columns:2fr auto 1fr; column-gap:2vw; row-gap:2vh; align-items:center; width:64%; margin-left:auto; margin-right:auto; }
    .metamers-neg-arrow{ font-size:clamp(1.6rem,2.6vw,2.4rem); color:#64748b; }
  </style>
`, { notes: [
  "(draft) So what do metamers tell us?",
  "(draft) A spectrum has energy at hundreds of wavelengths; the cones keep three numbers.",
  "(draft) And many different spectra give exactly the same three numbers. These gray curves are not drawn by hand: I computed them from the cone sensitivities, so that each one gives exactly the same L, M and S as the lamp. Different in the physical world; identical in the representation.",
  "(draft) Here is what differs between them: patterns of energy, going up at some wavelengths and down at others, that no cone responds to at all. That is the negative space of the representation: everything outside the three numbers. Those differences are thrown away.",
  "(draft) There is no sensory machinery to make sense of them. No amount of attention or training will let you see the difference between the two halves of that field."
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

/* ---------- 2. Metamers reveal what is represented (Fernanda, 2026-11-04: replaces "Beyond color, it is hard") ---------- */
/* the three knobs of the color animation, turning on their own (a loop, only on this slide; it never advances) */
const mvKnobsLive = (() => {
  const nm = ['700 nm', '546.1 nm', '435.8 nm'], dur = [5.2, 6.7, 8.1], amp = [70, 95, 60];
  return `<svg viewBox="0 0 420 170" style="width:min(46vw, 70vh);height:auto">
    <defs><radialGradient id="mvkl-g" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#f8fafc"/><stop offset=".6" stop-color="#cbd5e1"/><stop offset="1" stop-color="#64748b"/></radialGradient></defs>
    ${[0, 1, 2].map(k => { const cx = 70 + k * 140, cy = 70;
      return `<circle cx="${cx}" cy="${cy}" r="50" fill="#e2e8f0"/><circle cx="${cx}" cy="${cy}" r="42" fill="url(#mvkl-g)" stroke="#475569" stroke-width="2"/>
        <g class="mvkl-turn" style="transform-origin:${cx}px ${cy}px;animation:mvkl-${k} ${dur[k]}s ease-in-out infinite alternate">
          <path d="M${cx},${cy - 38} l7,12 h-14 z" fill="${MV_CONE[k]}" stroke="#fff" stroke-width="1"/></g>
        <text x="${cx}" y="${cy + 78}" font-size="17" fill="${MV_INK}" text-anchor="middle">${nm[k]}</text>`; }).join('')}
  </svg>
  <style>${[0, 1, 2].map(k => `@keyframes mvkl-${k}{ from{ transform:rotate(${-amp[k]}deg); } to{ transform:rotate(${amp[k]}deg); } }`).join(' ')}
    .mvkl-turn{ transform-box:view-box; }</style>`; })();
st(`
  <h1 class="t">Metamers reveal what is represented</h1>
  <div class="lead b" data-step="1" style="margin-top:4vh">RGB knobs allow us to probe those representations. But what about other types of perception?</div>
  <div class="b center" data-step="2" style="margin:auto">${mvKnobsLive}</div>
  <div class="question center b" data-step="3" style="margin-bottom:6vh">Are there knobs for other types of perception?</div>
`, { notes: [
  "(draft) Metamers reveal what is represented.",
  "(draft) In color, three knobs, red, green and blue, let us probe that representation directly. But what about other types of perception?",
  "(draft) Remember the knobs from the animation: we could turn each one, precisely, and watch the match appear and break.",
  "(draft) So: are there knobs for other types of perception? For texture, for shape, for objects, for sounds? That is where textures come in."
]});

/* ---------- 3. Textures: statistics as knobs ---------- */
section('Textures');

/* Fernanda, 2026-11-04: go right into the defense's texture intro (textures are stationary; a few statistics describe
   them), then the knobs question, then the model. The Julesz and phase-scramble slides are out of the running order
   (scenes kept: julesz-textons.html, metamers-scramble.html). */
sc('texturesIntro', 'scenes/defense-textures-intro.html');

st(`
  <div class="question center b" data-step="1" style="margin:auto;max-width:22em">Can these knobs be thought of as our “knobs” for texture perception?</div>
`, { notes: [
  "(draft) So a texture can be described by a few statistics.",
  "(draft) Can these statistics be thought of as our knobs for texture perception? If we could set them, one at a time, would we find the edges of texture perception the way the RGB knobs found the edges of color? That is what a texture model lets us try."
]});

sc('textureKnobs', 'scenes/texture-knobs.html');

st(`
  <h1 class="t">The same knobs, for sound</h1>
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
  "(draft) The same idea works for sound, and it is where McDermott and Simoncelli started.",
  "(draft) Take a sound texture, like rain, wind or fire: sounds made of many similar events.",
  "(draft) Pass it through a model of the ear: the cochlea splits the sound into frequency channels, the way the image model split the photo into filters.",
  "(draft) Then measure a set of statistics of those channels over time: how loud each band is on average, how much it varies, how the bands move together. Those statistics are the knobs.",
  "(draft) Start from noise and adjust it until its statistics match the original's. McDermott and Simoncelli did exactly this.",
  "(to write) Listen to the original and the synthetic version. For many textures, listeners hear them as the same kind of sound, even though the waveform is completely different: a metamer, for us. And when a synthetic sound does not sound right, it tells us which statistic we were missing: turning the knobs shows the edges of our hearing."
]});

/* Crowding: the target letter sits at the same distance from the cross in both rows. */
/* Crowding, then (Fernanda, 2026-11-04) the pooling regions grow out from the same cross, instead of a separate slide.
   Schematic (not data): regions whose size grows with distance from the cross; all sizes in vh so circles stay round. */
const mvPool = (() => { const out = []; let ri = 0;
  for(let e = 4; e < 120; e *= 1.45, ri++){ const r = e * .28, n = Math.max(6, Math.floor(2 * Math.PI * e / (r * 1.85)));
    for(let k = 0; k < n; k++){ const a = (k + (ri % 2) * .5) / n * 2 * Math.PI;
      out.push(`<i style="left:calc(14% + ${(e * Math.cos(a) - r).toFixed(2)}vh);top:${(24 + e * Math.sin(a) - r).toFixed(2)}vh;width:${(2 * r).toFixed(2)}vh;height:${(2 * r).toFixed(2)}vh;transition-delay:${(ri * .22).toFixed(2)}s"></i>`); } }
  return out.join(''); })();
st(`
  <style>
    .metamers-row{ position:relative; height:16vh; }
    .metamers-row span{ position:absolute; top:50%; transform:translate(-50%, -50%); font-size:clamp(2.6rem, 4.4vw, 4.2rem); font-weight:700; }
  </style>
  <style>
    .metamers-crowd{ position:relative; margin:auto 0; }
    .metamers-pool{ position:absolute; left:0; right:0; top:-14vh; height:66vh; overflow:hidden; pointer-events:none; }
    .metamers-pool > div{ position:absolute; left:0; right:0; top:14vh; height:0; }
    .metamers-pool i{ position:absolute; border:2px solid #94a3b8; border-radius:50%; opacity:0; transform:scale(.4); transition:opacity .5s ease, transform .5s ease; }
    .metamers-pool.shown i{ opacity:.9; transform:none; }
  </style>
  <h1 class="t">Try it: keep your eyes on the cross</h1>
  <div class="metamers-crowd">
    <div class="b metamers-pool" data-step="3"><div>${mvPool}</div></div>
    <div class="metamers-row b" data-step="1"><span style="left:14%">+</span><span style="left:76%">R</span></div>
    <div class="metamers-row b" data-step="2"><span style="left:14%">+</span><span style="left:76%;letter-spacing:.04em">SRH</span></div>
  </div>
  <div class="label b" data-step="3" style="text-align:center">Pooling regions grow with distance from where you look</div>
  ${cite('Bouma, 1970 · Freeman &amp; Simoncelli, 2011 · Balas, Nakano &amp; Rosenholtz, 2009 · Deza &amp; Konkle, arXiv 2006.07991')}
`, { notes: [
  "(draft) Texture statistics turn out to matter far beyond textures. A quick experiment on yourselves. Keep your eyes on the cross; do not look to the right.",
  "(draft) Without moving your eyes, can you read the letter on the right? Most people can.",
  "(draft) Now the same letter, at the same distance from the cross, with a neighbor on each side. Keep looking at the cross. It is much harder to say what the middle letter is. This is called crowding; Bouma measured it for letters in 1970. The letters are all there, but the periphery seems to keep a summary of the region rather than every detail.",
  "(draft) Why? One account: the visual system computes texture-like statistics over pooling regions, and these regions grow with the distance from where you are looking. This picture is a schematic, not measured data. Near the cross the regions are small; out where the letters are, one region covers all three letters, so it only keeps their statistics. Freeman and Simoncelli built a model like this, generated images that match its statistics in every region, and people could not tell them from the original while keeping their eyes on the center: metamers, even though the periphery was scrambled. Ruth Rosenholtz and colleagues used the same idea to explain crowding. And the idea works in models too: Deza and Konkle gave a neural network a texture-based foveated front end, pooling that grows with eccentricity like this, and it became more robust and generalized better across datasets than a network with the same resources and no fovea. (Deza &amp; Konkle, Emergent properties of foveated perceptual systems, arXiv 2006.07991)"
]});

/* ---------- 4. No knobs: drive and suppress ---------- */
section('Networks');

st(`
  <h1 class="t">What do we do while we find good models (or “knobs”) for the rest of perception?</h1>
  <div class="cols" style="grid-template-columns:1fr 1fr">
    <div class="b" data-step="1" style="display:flex;flex-direction:column;gap:2vh">
      <div class="lead"><b>Visual cortex</b></div>
      <div class="label">images synthesized to drive one V4 site beyond any natural image</div>
      <div style="display:flex;gap:.6vw;align-items:flex-end">
        ${[1, 2, 3, 4, 5].map(k => `<img src="assets/papers/bashivan2019/stretch-site04-synth-${k}.png" alt="" style="width:6.4vw;border-radius:4px">`).join('')}
        <div style="margin-left:1vw;text-align:center"><img src="assets/papers/bashivan2019/stretch-site04-natural-best.png" alt="" style="width:6.4vw;border-radius:4px"><div class="label" style="font-size:clamp(.8rem,1vw,1rem)">best of 640 natural</div></div>
      </div>
      <div class="label">site 4 responds 5.4 to 7.6 to these, at most 2.1 to any natural image</div>
      <div class="label" style="font-size:clamp(.85rem,1.05vw,1.05rem)">Bashivan, Kar &amp; DiCarlo, 2019, Science · images and responses: github.com/dicarlolab/npc (MIT License)</div>
    </div>
    <div class="b" data-step="2" style="display:flex;flex-direction:column;gap:2vh">
      <div class="lead"><b>Language</b></div>
      <div class="label">sentences chosen by a model to drive, or suppress, the human language network</div>
      <div class="label" style="font-size:clamp(.85rem,1.05vw,1.05rem)">Tuckute, Sathe, Srikant, Taliaferro, Wang, Schrimpf, Kay &amp; Fedorenko, 2024, Nature Human Behaviour</div>
    </div>
  </div>
  <div class="statement center b" data-step="3">A model chooses the stimulus</div>
`, { notes: [
  "(draft) And beyond textures, where we have no hand-made knobs at all?",
  "(draft) One answer from the visual system: use a model of the neurons to design the stimulus. Bashivan, Kar and DiCarlo built a model of neurons in area V4 of the monkey, then synthesized images that the model predicted would drive one recording site as hard as possible, and showed them to the monkey. These are the real images from their data release, for one site: the site responded 5.4 to 7.6 to these five, and at most 2.1 to any of 640 natural images. They also made images that drive one site while keeping the others quiet.",
  "(draft) The same idea works for language. Tuckute and colleagues used a language model to choose sentences predicted to drive, or to suppress, the human language network, and measured the brain's responses with fMRI: the drive sentences raised the response and the suppress sentences lowered it.",
  "(draft) In both cases, a model chooses the stimulus. And that is where neural networks come in."
]});

/* Fernanda, 2026-11-04: the network again (from the start of Part 1), then the parallel, drawn with pictures */
sc('nnModels', 'scenes/defense-nn-models.html');

/* the parallel, in pictures. Network column: a real gradient-descent result (the lab's Your turn 3 solution: the
   café photo and its ResNet-18 layer3 metamer, run fresh) and the network's real answer for it (espresso 62%). */
const mvAct = (() => { const cols = 5, rows = 7, out = [];
  for(let k = 0; k < cols; k++) for(let i = 0; i < rows; i++){ const t = (Math.sin(k * 2.1 + i * 1.7) + Math.sin(k * .7 + i * 2.9) + 2) / 4;
    out.push(`<rect x="${10 + k * 26}" y="${8 + i * 14 - k * 4 + 16}" width="20" height="14" fill="#4f6d9a" fill-opacity="${(.15 + .85 * t).toFixed(2)}" stroke="#0f172a" stroke-width="1"/>`); }
  return `<svg viewBox="0 0 150 130" style="height:14vh;width:auto">${out.join('')}</svg>`; })();
const mvField = `<svg viewBox="0 0 120 120" style="height:14vh;width:auto"><rect width="120" height="120" rx="10" fill="#0b0d10"/>
  <circle cx="60" cy="60" r="40" fill="#f3b670"/><line x1="60" y1="20" x2="60" y2="100" stroke="#475569" stroke-width="1.5"/></svg>`;
st(`
  <h1 class="t">Gradient descent on model representations as the ‘knobs’ for looking into inner mechanisms</h1>
  <div class="metamers-par">
    <div></div><div class="lead b" data-step="1"><b>Color</b></div><div class="lead b" data-step="1"><b>A network</b></div>
    <div class="label b" data-step="2">the knobs</div>
    <div class="b metamers-par-cell" data-step="2"><div style="height:14vh">${mvKnobs()}</div><span class="label">three lights</span></div>
    <div class="b metamers-par-cell" data-step="2"><img src="assets/lab-solutions/solution-3.png" alt="" style="height:14vh"><span class="label">gradient descent on the pixels</span></div>
    <div class="label b" data-step="3">the sensors</div>
    <div class="b metamers-par-cell" data-step="3"><div style="height:14vh">${mvCones}</div><span class="label">the cones</span></div>
    <div class="b metamers-par-cell" data-step="3">${mvAct}<span class="label">a stage’s activations</span></div>
    <div class="label b" data-step="4">the percept</div>
    <div class="b metamers-par-cell" data-step="4">${mvField}<span class="label">the color you see</span></div>
    <div class="b metamers-par-cell" data-step="4"><div class="metamers-par-say">“espresso, 62%”</div><span class="label">the model’s behavior</span></div>
  </div>
  <div class="statement center b" data-step="5" style="margin-bottom:2vh">What does the model encode, and what does it throw away?</div>
  <style>
    .metamers-par{ margin:auto 0; display:grid; grid-template-columns:auto 1fr 1fr; gap:1.2vh 3vw; align-items:center; }
    .metamers-par-cell{ display:flex; align-items:center; gap:1.4vw; }
    .metamers-par-cell svg{ height:14vh; width:auto; }
    .metamers-par-say{ height:14vh; display:flex; align-items:center; padding:0 1.2vw; border:2px solid var(--ink); border-radius:14px; font-size:clamp(1.3rem, 2.2vw, 2rem); font-weight:700; }
  </style>
`, { notes: [
  "(draft) Gradient descent on model representations gives us knobs for looking into a model's inner mechanisms.",
  "(draft) Compare with color.",
  "(draft) In color, the knobs are three lights. In a network, the knob is gradient descent: we change every pixel of an image, a little at a time, in whatever direction moves the network where we want. Here, the café photo, and an image made this way to match the network's third stage. You will make this one yourselves in the lab.",
  "(draft) In color, the sensors are the cones. In a network, they are the activations at one stage: the model's representation.",
  "(draft) And in color, the output is the color you see. In a network, it is the model's behavior: for that scrambled image, the network still answers espresso, 62 percent.",
  "(draft) So networks let us ask exactly the question we asked of the cones: what does this model encode, and what does it throw away? Here are some answers."
]});

/* Fernanda, 2026-11-04: straight into model metamers; the adversarial-vulnerability slide is out of the running order
   (scene kept: defense-adversarial.html) */

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
    <div class="step b" data-step="1"><img src="assets/lab-solutions/solution-2.png" alt="" style="height:13vh;width:auto;margin-bottom:1vh"><b>A texture</b><span class="label">match its statistics</span></div>
    <div class="arrow b" data-step="2">→</div>
    <div class="step b" data-step="2"><img src="assets/lab-solutions/solution-3.png" alt="" style="height:13vh;width:auto;margin-bottom:1vh"><b>A vision network</b><span class="label">match one stage</span></div>
    <div class="arrow b" data-step="3">→</div>
    <div class="step b" data-step="3"><div style="height:13vh;width:16vw;display:flex;align-items:center;margin-bottom:1vh">${mvWave(11)}</div><b>A sound</b><span class="label">match an audio model</span></div>
  </div>
  <a class="b" data-step="4" href="https://colab.research.google.com/github/delamarifer/human-machine-perception/blob/main/notebooks/day03-lab-metamers.ipynb" target="_blank" rel="noopener" onclick="event.stopPropagation()" style="align-self:center;margin-bottom:8vh;border:3px solid var(--ink);border-radius:999px;padding:1.2vh 2vw;font-weight:700;font-size:clamp(1.2rem,2vw,1.8rem);color:var(--ink);text-decoration:none">Open the lab in Colab ↗</a>
`, { notes: [
  "(draft) Now you try. In the lab you make metamers yourselves, with a library called plenoptic.",
  "(draft) First a texture: pick a photo, and synthesize a new image that matches its statistics.",
  "(draft) Then a vision network: match the activations at one stage, early or late, and see what survives.",
  "(draft) Then a sound: the same idea with an audio model, and you can listen to the result.",
  "(draft) Open the lab in Colab from this link. The images on these boxes are the solutions you will reach: the brick texture, and the café photo matched at the network's third stage."
]});
/* The lab loop, as on Day 2 (Fernanda, 2026-11-04: "screenshots of the solutions after the exercise of try it
   yourself for at least 2 or 3 parts"): Your turn N, then its solution as a notebook cell with its real output.
   Outputs: the instructor notebook's solution cells, run fresh by the lab session (day03/assets/lab-solutions/,
   from claude/day03-metamer-lab-d865a4 64830d1). The deck is public, so these three solutions are visible on the site. */
const LAB_NB = 'https://colab.research.google.com/github/delamarifer/human-machine-perception/blob/main/notebooks/day03-lab-metamers.ipynb';
const labEsc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const LAB_SOL = {
  1: {code: `# Your turn 1: set block to 2, 4, 16 or 32 and write your prediction first.
block = 32
my_prediction = "Worse: 32 x 32 blocks keep only 64 numbers, so the metamer is mostly noise with a dark and a light region."

if block is None:
    print("Set block to a number, then run this cell again.")
else:
    model = lambda x: block_model(x, block)
    mine = metamer_by_hand(photo, model)
    show([photo, mine], ["target", f"metamer, {block} x {block} blocks"])
    print("You predicted:", my_prediction)`,
      out: `You predicted: Worse: 32 x 32 blocks keep only 64 numbers, so the metamer is mostly noise with a dark and a light region.`, img: 'assets/lab-solutions/solution-1.png'},
  2: {code: `brick = load_gray("notebooks/data/day03/brick.jpg")
# Your turn 2: set choice to brick or photo, and write your prediction first.
choice = brick
my_prediction = "Brick-like at a glance, but the long straight rows of mortar may bend: the statistics are local."

if choice is None:
    print("Set choice to brick or photo, then run this cell again.")
else:
    met_choice = texture_metamer(choice)
    show([choice, met_choice.metamer], ["target", "texture metamer"], size=4)
    print("You predicted:", my_prediction)`,
      out: `30 steps in 23.7 s; loss 8.25 -> 0.0625
You predicted: Brick-like at a glance, but the long straight rows of mortar may bend: the statistics are local.`, img: 'assets/lab-solutions/solution-2.png'},
  3: {code: `# Your turn 3: set stage to "layer2" or "layer3", and write your prediction first.
stage = "layer3"
my_prediction = "Between the two: some color and blobs of the cup, mostly texture-like; the network still says espresso or cup."

if stage is None:
    print('Set stage to "layer2" or "layer3", then run this cell again.')
else:
    model = po.models.DeepNetFeatures(net, stage, normalize)
    stage_metamers[stage] = synthesize(photo_rgb, model, steps=300).metamer
    show([photo_rgb, stage_metamers[stage]], ["target", f"metamer from {stage}"], size=3.6)
    print(f"The network sees the {stage} metamer as:", top3(stage_metamers[stage]))
    print("You predicted:", my_prediction)`,
      out: `300 steps in 7.3 s; loss 0.0577 -> 0.00315
The network sees the layer3 metamer as: espresso 62%, cup 17%, coffee mug 9%
You predicted: Between the two: some color and blobs of the cup, mostly texture-like; the network still says espresso or cup.`, img: 'assets/lab-solutions/solution-3.png'},
};
const LAB_CSS = `<style>
  .metamers-turn{ margin:auto 0; display:flex; flex-direction:column; gap:3vh; }
  .metamers-open{ align-self:flex-start; border:3px solid var(--ink); border-radius:999px; padding:1.4vh 2vw;
    font-weight:700; font-size:clamp(1.2rem, 2vw, 1.8rem); color:var(--ink); text-decoration:none; }
  .metamers-sol{ margin:auto 0; display:flex; gap:1.6vw; align-items:center; min-height:0; }
  .metamers-sol > div{ flex:0 1 36%; min-width:0; }
  .metamers-sol-img{ flex:1 1 auto; min-width:0; max-height:64vh; max-width:56vw; object-fit:contain; }
  .metamers-code, .metamers-out{ margin:0; font-family:Menlo, Consolas, monospace; font-size:clamp(.62rem, .92vw, .95rem); line-height:1.4; white-space:pre-wrap; }
  .metamers-code{ background:#f8fafc; border:1px solid var(--line); border-radius:8px; padding:1vh 1vw; }
  .metamers-out{ padding:.8vh 1vw; color:var(--ink); border-left:3px solid var(--line); margin-top:1vh; }
</style>`;
const labTurn = (n, title, cues, say) => st(`
  <h1 class="t">Your turn ${n}</h1>
  <div class="metamers-turn">
    <div class="question b" data-step="1">${title}</div>
    <ul class="frag">${cues.map(c => `<li class="b" data-step="2">${c}</li>`).join('')}</ul>
    <a class="metamers-open b" data-step="3" href="${LAB_NB}#scrollTo=turn-${n}" target="_blank" rel="noopener" onclick="event.stopPropagation()">Open Your turn ${n} in Colab ↗</a>
  </div>${LAB_CSS}
`, { notes: [`(draft) Your turn ${n}.`, `(draft) ${say[0]}`, `(draft) ${say[1]}`, `(draft) ${say[2]}`] });
const labSolution = (n, say) => { const o = LAB_SOL[n]; return st(`
  <h1 class="t">Solution · Your turn ${n}</h1>
  <div class="metamers-sol b" data-step="1">
    <div><pre class="metamers-code">${labEsc(o.code)}</pre><pre class="metamers-out">${labEsc(o.out)}</pre></div>
    <img class="metamers-sol-img" src="${o.img}" alt="">
  </div>${LAB_CSS}
`, { notes: [`(draft) Let us look at one solution for Your turn ${n}.`, `(draft) ${say}`] }); };

labTurn(1, 'Bigger or smaller blocks', ['Pick a block size: 2, 4, 16 or 32', 'Predict first: more or less like the photo than with 8?'], [
  'The metamer by hand: the model keeps only the average of each block. What happens when the blocks change size?',
  'Pick a block size, 2, 4, 16 or 32, and before you run it, predict: will the metamer look more or less like the photo than with 8? At which block size could you no longer tell what the photo shows?',
  'Open Your turn 1 in Colab and take a few minutes. Then we come back together.']);
labSolution(1, 'With 32 by 32 blocks the model keeps only 64 numbers. The metamer matches all of them, and it is mostly noise over a pattern of dark and light blocks: everything inside a block is thrown away.');

labTurn(2, 'A texture that is not so easy', ['A brick wall, or the café photo (a scene, not a texture)', 'Predict first: will it pass at a glance? What will be lost?'], [
  'Now the texture model, on something harder than pebbles.',
  'Choose the brick wall or the café photo, which is a scene, not a texture. Predict first: will its texture metamer pass for the original at a glance? What will be lost?',
  'Open Your turn 2 in Colab. It takes about half a minute to run.']);
labSolution(2, 'For the brick wall, at a glance it is brick: the right grays, the bricks, the mortar. But the long straight rows of mortar bend and break. The statistics are local, so nothing forces a row to stay straight across the whole image.');

labTurn(3, 'The stages in between', ['Pick "layer2" or "layer3"', 'Predict first: will it look like the photo to you? What will the network call it?'], [
  'Last, the network: we saw layer 1 and layer 4. What about the stages in between?',
  'Pick layer 2 or layer 3. Predict first: will its metamer look like the photo to you? And what will the network call it?',
  'Open Your turn 3 in Colab and take a few minutes.']);
labSolution(3, 'From layer 3, the metamer looks mostly like colored noise to us, with a faint trace of the cup. The network still calls it espresso, 62 percent, then cup and coffee mug. What makes it a cup to you is already thrown away by layer 3.');

/* Fernanda, 2026-11-04: follow Your turn 3 with the robust parallel. The lab's section 4b, run fresh by the lab session
   (claude/day03-metamer-lab-d865a4 91dffa0): standard vs robust ResNet-50 (Madry lab checkpoints), both matched at layer4. */
st(`
  <h1 class="t">The same metamer, from a robust network</h1>
  <img class="b" data-step="1" src="assets/lab-solutions/robust-4b.png" alt="" style="width:min(80vw, 150vh);max-height:38vh;object-fit:contain;align-self:center;margin-top:1vh">
  <div class="b" data-step="2" style="display:grid;grid-template-columns:1.2fr 1fr;gap:1.6vw;margin-top:2vh">
    <pre class="metamers-code">${labEsc(`late = {}
for name, network in nets.items():
    print(name, end=": ")
    late[name] = synthesize(photo_rgb, po.models.DeepNetFeatures(network, "layer4", normalize),
                            steps=600, lr=0.02).metamer

show([photo_rgb, late["standard"], late["robust"]],
     ["target", "standard ResNet-50, layer4", "robust ResNet-50, layer4"], size=3.6)
for name, network in nets.items():
    print(f"The {name} network sees its own layer4 metamer as:", top3_of(network, late[name]))`)}</pre><pre class="metamers-out">${labEsc(`standard: 440 steps in 25.7 s; loss 0.751 -> 0.0385
robust: 600 steps in 36.1 s; loss 1.01 -> 0.0448
The standard network sees its own layer4 metamer as: espresso 59%, cup 26%, coffee mug 5%
The robust network sees its own layer4 metamer as: espresso 37%, cup 26%, coffee mug 6%`)}</pre>
  </div>${LAB_CSS}
`, { notes: [
  "(draft) One more, from the lab: the same café photo, matched at the last stage, layer 4, of two networks.",
  "(draft) On the left, the photo. In the middle, the metamer for a standard ResNet-50: colored noise to us. On the right, the metamer for a robust ResNet-50, trained with adversarial training: you can still see the cup, the saucer and the hand. Same recipe, same stage; the robust network throws away much less of what matters to us.",
  "(draft) Both networks still call their own metamer espresso: 59 percent for the standard one, 37 percent for the robust one. You can run this in section 4b of the lab."
]});
}
