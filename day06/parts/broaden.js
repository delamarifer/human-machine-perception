/* PART: broaden (Day 6). Owner: Shreya. Section 2: Get better data (Foundations of Computer Vision, Ch. 36 +
   modern practice). Plan slides 6A, 7, 9-11, 13-15, 17; slides 8, 12 and 16 stay backup. No checkpoint: the
   section ends on the question that opens Part 3. No speaker notes.
   Real examples (Shreya, round 6): every published number below was checked against the paper's own text on
   2026-11-08 (see feedback/_day.md). Computed values (votes, entropy, trial counts) are computed here from their
   inputs; inputs that are only examples say so on the slide. Student projects appear by title only (public site). */
{
section('Get better data');

const brCh36 = t => d6Link('https://visionbook.mit.edu/data_augmentation.html', `Foundations of Computer Vision, Ch. 36${t ? ', ' + t : ''}`);
const brA = (url, t) => d6Link(url, t);
const brCat = 'assets/broaden/june-odd-eyed-cat.jpg';
const brCatCredit = 'Photo: Keith Kissel, "June odd-eyed-cat" (cropped), CC BY 2.0, via Wikimedia Commons';
const BR_SCALE = d6Link('https://scale.com/guides/data-labeling-annotation-guide', 'Scale AI, Data Labeling guide');

const brStyle = `<style>
  .broaden-rows{ flex:1 1 auto; min-height:0; display:flex; flex-direction:column; justify-content:center; gap:1.8vh; }
  .broaden-row{ display:grid; grid-template-columns:minmax(11em, 24vw) 1fr; gap:2vw; align-items:baseline; }
  .broaden-row .lead{ font-size:clamp(1.15rem, 2.05vw, 1.9rem); }
  .broaden-three{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:repeat(3, 1fr); gap:2vw; align-items:stretch; }
  .broaden-three .d6-card{ justify-content:flex-start; padding:2.2vh 1.6vw; gap:1.4vh; }
  .broaden-glyph{ font-size:clamp(3rem, 7vw, 7rem); font-weight:700; line-height:1; text-align:center; font-family:Georgia, 'Times New Roman', serif; }
  .broaden-pair{ display:flex; justify-content:center; align-items:center; gap:1.4vw; }
  .broaden-pair img{ width:42%; aspect-ratio:1; object-fit:cover; border-radius:8px; }
  .broaden-verdict{ font-size:clamp(1.6rem, 2.8vw, 2.6rem); font-weight:700; text-align:center; }
  .broaden-svg{ flex:1 1 auto; min-height:0; width:100%; display:block; }
  .broaden-svg text{ font-family:var(--font); fill:var(--ink); }
  .broaden-bars{ display:grid; grid-template-columns:auto 1fr; gap:.8vh 1vw; align-items:center; }
  .broaden-bars i{ display:block; height:2.4vh; background:var(--ink); border-radius:3px; }
  .broaden-prob{ display:grid; grid-template-columns:7em 1fr 3.5em; gap:.6vh .8vw; align-items:center; font-size:clamp(.9rem, 1.3vw, 1.25rem); }
  .broaden-prob i{ display:block; height:1.9vh; background:#64748b; border-radius:3px; }
  .broaden-small .lead{ font-size:clamp(1.15rem, 2.05vw, 1.9rem); }
  .broaden-big{ font-size:clamp(2rem, 4vw, 4rem); font-weight:700; line-height:1; }
  .broaden-col{ display:flex; flex-direction:column; gap:2.2vh; justify-content:center; }
  @media (max-width: 820px), (max-aspect-ratio: 1/1){
    .broaden-row, .broaden-three{ grid-template-columns:1fr; gap:.4vh; }
  }
</style>`;

/* ---------- Section opener ---------- */
st(`${brStyle}
  <h1 class="t">Part 2 · Get better data</h1>
  ${d6Roadmap(1, false)}
`);

/* ---------- 6A: more data vs better data, one real example per lever ---------- */
st(`
  <h1 class="t">More data is not the same as better data</h1>
  <div class="broaden-rows">
    <div class="broaden-row b" data-step="1"><div class="lead"><b>Cleaner labels</b></div><div class="lead">at least <b>6%</b> of ImageNet's validation labels are wrong</div></div>
    <div class="broaden-row b" data-step="2"><div class="lead"><b>Data like the real world</b></div><div class="lead">ColorizeBot: ImageNet photos in training, old film photos in use</div></div>
    <div class="broaden-row b" data-step="3"><div class="lead"><b>More of the rare cases</b></div><div class="lead">face analysis: up to <b>34.7%</b> error for darker-skinned women, <b>0.8%</b> for lighter-skinned men</div></div>
    <div class="broaden-row b" data-step="4"><div class="lead"><b>Less, but chosen</b></div><div class="lead">filtering a 12.8-billion pool <b>beat</b> training on all of it, by 6.9 points</div></div>
    <div class="statement b" data-step="5" style="margin-top:1.4vh"><b>Images are cheap. Good labels and good coverage are the expensive part.</b></div>
  </div>
  ${cite(brA('https://arxiv.org/abs/2103.14749', 'Northcutt et al. (NeurIPS 2021)') + ' · ' + brA('https://proceedings.mlr.press/v81/buolamwini18a.html', 'Buolamwini and Gebru, Gender Shades (FAT* 2018)') + ' · ' + brA('https://arxiv.org/abs/2304.14108', 'Gadre et al., DataComp (NeurIPS 2023)'))}
`);

/* ---------- Few labels: callback to Day 5 Hour 2, then pseudo-labels with a real result ---------- */
st(`
  <h1 class="t">Few labels? Start from what you learned on Day 5</h1>
  <div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;justify-content:center;gap:3.2vh">
    <div class="d6-card b" data-step="1" style="padding:2.2vh 1.8vw">
      <div class="label">Remember Day 5</div>
      <div class="lead">Self-supervised models and CLIP learn features <b>without our labels</b>. On top of them, a few labels go a long way.</div>
    </div>
    <div class="lead b" data-step="2"><b>New: pseudo-labels.</b> The model labels unlabeled images itself, and keeps only the ones it is sure about.</div>
    <div class="lead b" data-step="3">Real example: pseudo-labels for <b>300 million</b> unlabeled images took ImageNet accuracy to <b>88.4%</b></div>
  </div>
  ${cite(brA('https://arxiv.org/abs/1911.04252', 'Xie et al., Self-training with Noisy Student (CVPR 2020)'))}
`);

/* ---------- 7: augmentation (scene, computed from one CC BY photo) ---------- */
sc('augScene', 'scenes/augment.html');

/* ---------- 9: invariance ---------- */
st(`
  <h1 class="t">Only use changes that keep the label true</h1>
  <div class="broaden-three">
    <div class="d6-card b" data-step="1">
      <div class="broaden-pair"><img src="${brCat}" alt="The cat photo"><span class="lead">→</span><img src="${brCat}" style="transform:scaleX(-1)" alt="The same photo mirrored"></div>
      <div class="lead center">mirror a cat: still a cat</div>
      <div class="broaden-verdict">✓ safe</div>
    </div>
    <div class="d6-card b" data-step="2">
      <div class="broaden-pair"><span class="broaden-glyph">b</span><span class="lead">→</span><span class="broaden-glyph" style="transform:scaleX(-1);display:inline-block">b</span></div>
      <div class="lead center">mirror a "b": it reads "d"</div>
      <div class="broaden-verdict">✗ unsafe</div>
    </div>
    <div class="d6-card b" data-step="3">
      <div class="broaden-pair"><span class="broaden-glyph">6</span><span class="lead">→</span><span class="broaden-glyph" style="transform:rotate(180deg);display:inline-block">6</span></div>
      <div class="lead center">turn a "6" upside down: it reads "9"</div>
      <div class="broaden-verdict">✗ unsafe</div>
    </div>
  </div>
  <div class="lead center b" data-step="4">Your turn: is an upside-down flip safe for street scenes? For satellite images?</div>
  ${cite(brCh36('section 36.2 (the b and d example)') + ' · ' + brCatCredit + ', mirrored')}
`);

/* ---------- 10: equivariance. Frame 640 wide; a box from x = 100 to 200 moves to 640 - x. ---------- */
const brFrame = (x0, flip) => {
  const W = 640, H = 300, bx = flip ? W - 200 : 100, car = flip ? W - 150 : 150;
  return `<g transform="translate(${x0},40)">
    <rect width="${W}" height="${H}" fill="#f1f5f9" stroke="#64748b" stroke-width="2"/>
    <line x1="0" y1="230" x2="${W}" y2="230" stroke="#cbd5e1" stroke-width="2"/>
    <g transform="translate(${car},0) scale(${flip ? -1 : 1},1)">
      <rect x="-45" y="175" width="90" height="40" rx="8" fill="#64748b"/>
      <path d="M -25 175 L -12 150 L 25 150 L 38 175 Z" fill="#64748b"/>
      <circle cx="-25" cy="218" r="12" fill="#0f172a"/><circle cx="25" cy="218" r="12" fill="#0f172a"/>
    </g>
    <rect x="${bx}" y="140" width="100" height="95" fill="none" stroke="#0f172a" stroke-width="5"/>
    <text x="${bx}" y="268" font-size="26" text-anchor="middle">${bx}</text>
    <text x="${bx + 100}" y="268" font-size="26" text-anchor="middle">${bx + 100}</text>
    <text x="0" y="${H + 30}" font-size="24">0</text><text x="${W}" y="${H + 30}" font-size="24" text-anchor="end">640</text>
  </g>`;
};
st(`
  <h1 class="t">Boxes and masks must move with the image</h1>
  <svg class="broaden-svg" viewBox="0 0 1400 400" role="img" aria-label="A car box from x 100 to 200 in a 640-pixel-wide image; after a mirror flip the box spans 440 to 540">
    <g class="b" data-step="1">${brFrame(20, false)}<text x="340" y="25" font-size="28" font-weight="700" text-anchor="middle">original: car box from 100 to 200</text></g>
    <g class="b" data-step="2">${brFrame(740, true)}<text x="1060" y="25" font-size="28" font-weight="700" text-anchor="middle">mirrored: box from 440 to 540</text></g>
  </svg>
  <div class="d6-eq b" data-step="3" style="align-self:center">mirror: x → 640 − x &nbsp;·&nbsp; 100 → 540 and 200 → 440, so the left and right edges swap</div>
  <div class="lead center b" data-step="4">Flip the image but not the box, and the label points at empty road.</div>
  ${cite(brCh36('section 36.2 (equivariance: apply the same change to the image and its label)') + ' · our drawing')}
`, { sub: true });

/* ---------- 11: domain randomization (Tobin et al. 2017) + generative augmentation (Ch. 36). Tiles: our sketch. ---------- */
const brTiles = (() => {
  let s = 11; const r = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
  const skies = ['#cbd5e1', '#94a3b8', '#e2e8f0', '#475569', '#f1f5f9', '#64748b'];
  const roads = ['#334155', '#64748b', '#475569', '#1e293b'];
  let out = '';
  for(let k = 0; k < 8; k++){
    const x = (k % 4) * 255, y = Math.floor(k / 4) * 175, sky = skies[Math.floor(r()*skies.length)], road = roads[Math.floor(r()*roads.length)];
    const hz = 70 + r()*30, cx = 50 + r()*130, fog = r()*0.6, stripes = 3 + Math.floor(r()*6), cam = 0.8 + r()*0.5;
    let st = ''; for(let i = 0; i < stripes; i++) st += `<line x1="${i*240/stripes}" y1="${hz}" x2="${i*240/stripes - 30}" y2="160" stroke="#f8fafc" stroke-opacity=".25" stroke-width="3"/>`;
    out += `<g transform="translate(${x},${y})"><clipPath id="brc${k}"><rect width="240" height="160" rx="6"/></clipPath><g clip-path="url(#brc${k})">
      <rect width="240" height="160" fill="${sky}"/><rect y="${hz}" width="240" height="${160 - hz}" fill="${road}"/>${st}
      <circle cx="${20 + r()*200}" cy="${15 + r()*35}" r="${8 + r()*10}" fill="#f8fafc" opacity=".8"/>
      <g transform="translate(${cx},${hz + 25}) scale(${cam})"><rect x="-30" y="0" width="60" height="22" rx="5" fill="#0f172a"/>
        <path d="M -16 0 L -8 -14 L 16 -14 L 24 0 Z" fill="#0f172a"/><circle cx="-16" cy="24" r="7" fill="#0f172a"/><circle cx="16" cy="24" r="7" fill="#0f172a"/></g>
      <rect width="240" height="160" fill="#f8fafc" opacity="${fog.toFixed(2)}"/></g></g>`;
  }
  return out;
})();
st(`
  <h1 class="t">Randomize the simulator to cover the real world</h1>
  <div class="d6-cols" style="grid-template-columns:1.4fr 1fr">
    <svg class="broaden-svg b" data-step="1" viewBox="0 0 1010 340" style="max-height:50vh" role="img" aria-label="Sketch: eight rendered street scenes with random sky, road, sun, camera height and fog">${brTiles}</svg>
    <div style="display:flex;flex-direction:column;gap:1.8vh" class="broaden-small">
      <div class="lead b" data-step="1">Each render: random lighting, textures, camera, distractors</div>
      <div class="lead b" data-step="2">Real result: a robot's object detector trained <b>only on simulated images</b>, with unrealistic random textures, located real objects to <b>1.5 cm</b></div>
      <div class="lead b" data-step="3"><b>Or a generative model:</b> nudge an image's latent code, decode a variant</div>
      <div class="lead b" data-step="4">Best when the generator was <b>trained on other, larger data</b></div>
    </div>
  </div>
  ${cite('Tiles: our sketch · ' + brA('https://arxiv.org/abs/1703.06907', 'Tobin et al. (2017), domain randomization') + ' · ' + brCh36('section 36.2.1 (generative augmentation)'))}
`);

/* ---------- 11A: the tools that make simulated data, and a real result (Richter et al. 2016). Each tool's
   description is from its own docs or README (checked 2026-11-09). Unity Perception left out: discontinued. ---------- */
st(`
  <h1 class="t">Simulators label every pixel for free</h1>
  <table class="d6-tbl" style="width:100%;font-size:clamp(.95rem,1.5vw,1.4rem)">
    <tr><th style="text-align:left">Tool</th><th style="text-align:left">What it renders</th><th style="text-align:left">Labels it writes</th></tr>
    <tr class="b" data-step="1"><td class="rowh">CARLA</td><td style="text-align:left">open-source driving simulator: cameras, LIDAR, GPS</td><td style="text-align:left">depth, semantic segmentation</td></tr>
    <tr class="b" data-step="2"><td class="rowh">NVIDIA Replicator (Isaac Sim)</td><td style="text-align:left">random assets, materials, lighting, camera positions</td><td style="text-align:left">2D and 3D boxes, depth, normals</td></tr>
    <tr class="b" data-step="2"><td class="rowh">BlenderProc</td><td style="text-align:left">photorealistic scenes in Blender</td><td style="text-align:left">depth, normals, segmentation; COCO format</td></tr>
    <tr class="b" data-step="2"><td class="rowh">Kubric (Google)</td><td style="text-align:left">multi-object videos (Blender + PyBullet physics)</td><td style="text-align:left">instance masks, depth, optical flow</td></tr>
  </table>
  <div class="lead b" data-step="3" style="margin-top:1.6vh"><b>Even a video game works:</b> 25,000 game frames with pixel labels. Game data + <b>1/3</b> of the real CamVid training set beat <b>all</b> of CamVid.</div>
  <div class="statement b" data-step="4"><b>The simulator knows what is in every pixel, so the labels are exact.</b></div>
  ${cite(brA('https://carla.org/', 'CARLA') + ' · ' + brA('https://docs.omniverse.nvidia.com/extensions/latest/ext_replicator.html', 'Omniverse Replicator') + ' · ' + brA('https://github.com/DLR-RM/BlenderProc', 'BlenderProc') + ' · ' + brA('https://github.com/google-research/kubric', 'Kubric') + ' · ' + brA('https://arxiv.org/abs/1608.02192', 'Richter et al., Playing for Data (ECCV 2016)'))}
`, { sub: true });

/* ---------- 13: collection and curation, DINOv2's real pipeline (1.2B unique images -> LVD-142M) + DataComp ---------- */
const brBar = (label, n, max, txt, step) => `<div class="b" data-step="${step}" style="display:grid;grid-template-columns:8em 1fr;gap:1vw;align-items:center">
  <div class="lead">${label}</div>
  <div style="display:flex;align-items:center;gap:.8vw"><i style="display:block;height:2.4vh;background:var(--ink);border-radius:3px;width:${(n/max*65).toFixed(1)}%;min-width:4px"></i><span class="lead" style="white-space:nowrap">${txt}</span></div></div>`;
st(`
  <h1 class="t">More images only help if they add something new</h1>
  <div class="d6-cols" style="align-items:center">
    <div style="display:flex;flex-direction:column;gap:3vh">
      ${brBar('web pool', 1.2e9, 1.2e9, '1.2 billion', 1)}
      ${brBar('kept', 142e6, 1.2e9, '142 million', 4)}
    </div>
    <div class="broaden-col broaden-small">
      <div class="lead b" data-step="1"><b>DINOv2's data:</b> 1.2 billion unique web images, no labels</div>
      <div class="lead b" data-step="2"><b>Remove</b> near-duplicates</div>
      <div class="lead b" data-step="3"><b>Retrieve</b> images that look like those in trusted datasets (ImageNet-22k, Google Landmarks, …)</div>
      <div class="lead b" data-step="4">Result: <b>142 million</b> images, about 1 in 8, and better features</div>
      <div class="lead b" data-step="5">Same lesson in DataComp: a filtered subset of a 12.8-billion pool beat the whole pool</div>
    </div>
  </div>
  ${cite(brA('https://arxiv.org/abs/2304.07193', 'Oquab et al., DINOv2 (2023), section 3 (LVD-142M)') + ' · ' + brA('https://arxiv.org/abs/2304.14108', 'Gadre et al., DataComp (NeurIPS 2023)'))}
`);

/* ---------- Labeling 1: label types, one drawn scene labeled six ways. Every overlay is drawn in the same
   coordinate frame as the car it labels, so it lines up by construction. Types from the Scale AI labeling guide. ---------- */
const BR_CAR = '<rect x="-30" y="0" width="60" height="22" rx="5" fill="#475569"/><path d="M -16 0 L -8 -14 L 16 -14 L 24 0 Z" fill="#475569"/><circle cx="-16" cy="24" r="7" fill="#1e293b"/><circle cx="16" cy="24" r="7" fill="#1e293b"/>';
const BR_POLY = '-30,3 -26,0 -16,0 -8,-14 16,-14 24,0 26,0 30,3 30,22 23,31 9,31 -9,31 -23,31 -30,22';
const BR_CARS = [[72, 96, 1.4], [180, 104, 1.1]];
const brTile = (x, y, name, over) => `<g transform="translate(${x},${y})">
  <rect width="240" height="160" rx="6" fill="#f1f5f9" stroke="#cbd5e1"/><rect y="118" width="240" height="42" fill="#e2e8f0"/>
  ${BR_CARS.map(([cx, cy, s], i) => `<g transform="translate(${cx},${cy}) scale(${s})">${BR_CAR}${over(i, s)}</g>`).join('')}
  <text x="120" y="190" font-size="21" font-weight="700" text-anchor="middle">${name}</text></g>`;
const BR_TYPES = [
  ['class tag', () => '', '<text x="12" y="28" font-size="20" font-weight="700">"car"</text>'],
  ['boxes', (i, s) => `<rect x="-30" y="-14" width="60" height="45" fill="none" stroke="#0f172a" stroke-width="${3 / s}"/>`],
  ['polygons', (i, s) => `<polygon points="${BR_POLY}" fill="none" stroke="#0f172a" stroke-width="${2.5 / s}"/>`],
  ['semantic mask', () => `<polygon points="${BR_POLY}" fill="#0f172a" opacity=".75"/>`],
  ['instance masks', (i) => `<polygon points="${BR_POLY}" fill="${i ? '#94a3b8' : '#0f172a'}" opacity=".85"/>`],
  ['keypoints', (i, s) => [[-16, 24], [16, 24], [-30, 8], [30, 8]].map(([px, py]) => `<circle cx="${px}" cy="${py}" r="${4.5 / s}" fill="#f8fafc" stroke="#0f172a" stroke-width="${2 / s}"/>`).join('')],
];
st(`
  <h1 class="t">Pick the label your task needs</h1>
  <div class="d6-cols" style="grid-template-columns:1.25fr 1fr;align-items:center">
  <svg class="broaden-svg" viewBox="0 0 770 410" style="max-height:60vh" role="img" aria-label="One street scene with two cars, labeled six ways: a class tag, boxes, polygons, a semantic mask, instance masks and keypoints">
    ${BR_TYPES.map(([nm, over, extra], k) => { const x = (k % 3) * 265, y = Math.floor(k / 3) * 210;
      return `<g class="b" data-step="${k < 2 ? 1 : k < 5 ? 2 : 3}">${brTile(x, y, nm, over)}${extra ? `<g transform="translate(${x},${y})">${extra}</g>` : ''}</g>`; }).join('')}
  </svg>
  <div class="broaden-col broaden-small" style="gap:1.8vh">
    <div class="lead b" data-step="1"><b>Tag or box:</b> is it there, and roughly where? Fast to draw.</div>
    <div class="lead b" data-step="2"><b>Polygon or mask:</b> the exact outline. Instance masks also say <b>which</b> car.</div>
    <div class="lead b" data-step="3"><b>Keypoints:</b> named points, like joints for pose. Video adds tracking; LiDAR adds 3D boxes.</div>
    <div class="lead b" data-step="4">More detail costs more time: <b>use the cheapest label that answers your question.</b></div>
  </div>
  </div>
  ${cite('Our drawing · label types from ' + BR_SCALE)}
`);

/* ---------- Labeling 2: who labels. Trade-offs as the Scale AI guide states them. ---------- */
st(`
  <h1 class="t">Who labels? Trade quality, cost and control</h1>
  <table class="d6-tbl" style="width:100%;font-size:clamp(1rem,1.6vw,1.5rem)">
    <tr><th style="text-align:left">Who</th><th style="text-align:left">Good</th><th style="text-align:left">Watch out</th></tr>
    <tr class="b" data-step="1"><td class="rowh">You or your team</td><td style="text-align:left">expertise, full control</td><td style="text-align:left">expensive; you train and manage the labelers</td></tr>
    <tr class="b" data-step="2"><td class="rowh">A crowd</td><td style="text-align:left">many labelers, fast</td><td style="text-align:left">quality is uneven: needs checks (next slides)</td></tr>
    <tr class="b" data-step="3"><td class="rowh">A labeling company</td><td style="text-align:left">trained labelers, tools, quality checks</td><td style="text-align:left">you give up control of the process</td></tr>
    <tr class="b" data-step="4"><td class="rowh">A model</td><td style="text-align:left">fast and cheap</td><td style="text-align:left">needs good labels to learn from first; copies its own mistakes</td></tr>
  </table>
  <div class="statement b" data-step="5" style="margin-top:2vh"><b>Usually: a model proposes, people correct.</b></div>
  ${cite('Trade-offs from ' + BR_SCALE + ' (sections "Choose between humans vs. machines" and "Assemble your labeling workforce") · "copies its own mistakes" is ours')}
`);

/* ---------- Labeling 3: instructions, a small trial batch, and checks. Pedestrian rule is the guide's example. ---------- */
st(`
  <h1 class="t">Write rules, try a batch, check the labelers</h1>
  <div class="broaden-rows">
    <div class="broaden-row b" data-step="1"><div class="lead"><b>1. Write the rules</b></div><div class="lead">clear classes, pictures of good and bad labels, and the edge cases</div></div>
    <div class="d6-eq b" data-step="2" style="margin-left:1.2vw">e.g. "pedestrian": include what they carry, not a stroller or suitcase they push or pull</div>
    <div class="broaden-row b" data-step="3"><div class="lead"><b>2. Try a small batch</b></div><div class="lead">label a few hundred, read the disagreements, fix the rules, then scale up</div></div>
    <div class="broaden-row b" data-step="4"><div class="lead"><b>3. Hide known answers</b></div><div class="lead">mix "gold" items with known labels into the work; retrain or remove labelers who miss them</div></div>
    <div class="broaden-row b" data-step="5"><div class="lead"><b>4. Check, again and again</b></div><div class="lead">several labels per item, a review layer, random audits; add new edge cases to the rules</div></div>
  </div>
  ${cite('Steps and the pedestrian example from ' + BR_SCALE + ' ("Best practices for high-quality labels") · "a few hundred" is our example size')}
`);

/* ---------- Labeling 4: agreement on boxes is measured with IoU. Boxes are an example; IoU computed. ---------- */
/* car drawn at (166,118) scale 1.55 spans x 119.5-212.5, y 96.3-166 (BR_CAR extents × 1.55); box 1 hugs it, box 2 is shifted */
const BR_BA = [116, 92, 216, 170], BR_BB = [130, 100, 232, 180];
const brIoU = (a, b) => { const w = Math.max(0, Math.min(a[2], b[2]) - Math.max(a[0], b[0])), h = Math.max(0, Math.min(a[3], b[3]) - Math.max(a[1], b[1]));
  const i = w * h, ar = r => (r[2] - r[0]) * (r[3] - r[1]); return {i, u: ar(a) + ar(b) - i, v: i / (ar(a) + ar(b) - i)}; };
const BR_IOU = brIoU(BR_BA, BR_BB);
const brRect = (r, dash) => `<rect x="${r[0]}" y="${r[1]}" width="${r[2] - r[0]}" height="${r[3] - r[1]}" fill="none" stroke="#0f172a" stroke-width="2.5"${dash ? ' stroke-dasharray="7 5"' : ''}/>`;
st(`
  <h1 class="t">Two people box the same car: do they agree?</h1>
  <div class="d6-cols" style="align-items:center">
    <svg class="broaden-svg" viewBox="96 74 152 122" style="max-height:52vh" role="img" aria-label="Two overlapping boxes around one car, one solid and one dashed, with the overlap shaded">
      <rect class="b" data-step="2" x="${Math.max(BR_BA[0], BR_BB[0])}" y="${Math.max(BR_BA[1], BR_BB[1])}" width="${Math.min(BR_BA[2], BR_BB[2]) - Math.max(BR_BA[0], BR_BB[0])}" height="${Math.min(BR_BA[3], BR_BB[3]) - Math.max(BR_BA[1], BR_BB[1])}" fill="#64748b" opacity=".22"/>
      <g transform="translate(166,118) scale(1.55)">${BR_CAR}</g>
      <g class="b" data-step="1">${brRect(BR_BA, false)}</g>
      <g class="b" data-step="1">${brRect(BR_BB, true)}</g>
      
    </svg>
    <div class="broaden-col broaden-small">
      <div class="lead b" data-step="1">Labeler 1: solid box · Labeler 2: dashed box</div>
      <div class="d6-eq b" data-step="2">IoU = overlap ÷ union = ${BR_IOU.i.toLocaleString('en-US')} ÷ ${BR_IOU.u.toLocaleString('en-US')} = ${BR_IOU.v.toFixed(2)}</div>
      <div class="lead b" data-step="3">1 = the same box, 0 = no overlap. The same number scores a model's boxes later.</div>
      <div class="lead b" data-step="4">How close is close enough depends on the task: the guide's examples ask for <b>0.95</b> on faces, <b>0.70</b> on dogs</div>
    </div>
  </div>
  ${cite('Boxes are an example (pixels); IoU computed · thresholds from ' + BR_SCALE)}
`, { sub: true });

/* ---------- 14-15: crowd and expert labels. P(majority of 5 right) computed from p. ---------- */
const brChoose = (n, k) => { let c = 1; for(let i = 1; i <= k; i++) c = c * (n - k + i) / i; return c; };
const brMaj = (p, n = 5) => { let s = 0; for(let k = Math.ceil((n + 1)/2); k <= n; k++) s += brChoose(n, k) * p**k * (1 - p)**(n - k); return s; };
const brPct = v => Math.round(v * 100) + '%';
const brPlot = (marks) => {
  const X = p => 90 + p * 560, Y = v => 330 - v * 290;
  let one = '', five = '';
  for(let i = 0; i <= 100; i++){ const p = i/100; one += `${i ? 'L' : 'M'}${X(p).toFixed(1)},${Y(p).toFixed(1)} `; five += `${i ? 'L' : 'M'}${X(p).toFixed(1)},${Y(brMaj(p)).toFixed(1)} `; }
  const ax = `<line x1="90" y1="330" x2="650" y2="330" stroke="#94a3b8" stroke-width="2"/><line x1="90" y1="40" x2="90" y2="330" stroke="#94a3b8" stroke-width="2"/>
    ${[0, .5, 1].map(v => `<text x="${X(v)}" y="362" font-size="24" text-anchor="middle">${v}</text><text x="78" y="${Y(v) + 8}" font-size="24" text-anchor="end">${v}</text>`).join('')}
    <text x="370" y="395" font-size="24" text-anchor="middle">how often one person is right</text>
    <text x="90" y="25" font-size="24">chance the label is right</text>
    <line x1="${X(.5)}" y1="40" x2="${X(.5)}" y2="330" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="6 6"/>`;
  return `<svg class="broaden-svg" viewBox="0 0 700 410" role="img" aria-label="Chance a majority vote of 5 is right, against one person">
    <g class="b" data-step="${marks.axes}">${ax}<path d="${one}" fill="none" stroke="#94a3b8" stroke-width="4"/>
      <path d="${five}" fill="none" stroke="#0f172a" stroke-width="4"/>
      <text x="${X(1)}" y="${Y(.55)}" font-size="22" text-anchor="end">grey: one person</text>
      <text x="${X(1)}" y="${Y(.55) + 30}" font-size="22" font-weight="700" text-anchor="end">black: vote of 5</text></g>
    ${marks.pts.map(([p, step]) => `<g class="b" data-step="${step}"><circle cx="${X(p)}" cy="${Y(brMaj(p))}" r="9" fill="#0f172a"/><circle cx="${X(p)}" cy="${Y(p)}" r="9" fill="#fff" stroke="#0f172a" stroke-width="3"/>
      <line x1="${X(p)}" y1="${Y(p)}" x2="${X(p)}" y2="${Y(brMaj(p))}" stroke="#0f172a" stroke-width="2" stroke-dasharray="4 4"/></g>`).join('')}
  </svg>`;
};

st(`
  <h1 class="t">Crowds: many cheap votes beat one</h1>
  <div class="d6-cols" style="grid-template-columns:1fr 1.1fr">
    <div class="broaden-col broaden-small">
      <div class="lead b" data-step="1"><b>ImageNet</b> was labeled by crowd workers on Amazon Mechanical Turk</div>
      <div class="lead b" data-step="2">At least <b>10 people</b> voted on each seed image, and harder classes needed more agreement ("Burmese cat" more than "cat")</div>
      <div class="lead b" data-step="3">Why it works: if each person is right 70% of the time, a majority of 5 is right <b>${brPct(brMaj(.7))}</b></div>
    </div>
    ${brPlot({axes: 3, pts: [[.7, 3]]})}
  </div>
  ${cite(brA('https://arxiv.org/abs/1409.0575', 'Russakovsky et al., ImageNet Large Scale Visual Recognition Challenge (2015), section 3.1.3') + ' · vote computed from the binomial; 70% is an example')}
`);

st(`
  <h1 class="t">Hard tasks need experts, not votes</h1>
  <div class="d6-cols" style="grid-template-columns:1fr 1.1fr">
    <div class="broaden-col broaden-small">
      <div class="lead b" data-step="1">If each person is right only 40% of the time, a vote of 5 is right <b>${brPct(brMaj(.4))}</b>. Voting amplifies.</div>
      <div class="lead b" data-step="2">Chest X-rays need radiologists. In CheXNet, <b>4 radiologists</b> read 420 X-rays for pneumonia; scored against each other, their average F1 was only <b>0.387</b></div>
      <div class="lead b" data-step="3">So measure how much experts agree <b>beyond chance</b> (Cohen's kappa) before you call it ground truth</div>
    </div>
    ${brPlot({axes: 1, pts: [[.4, 1]]})}
  </div>
  ${cite(brA('https://arxiv.org/abs/1711.05225', 'Rajpurkar et al., CheXNet (2017), section 4.1') + ' · vote computed from the binomial; 40% is an example')}
`, { sub: true });

/* ---------- 17: active learning + model in the loop (SAM's data engine). Entropy computed. ---------- */
const brEnt = ps => -ps.reduce((s, p) => s + (p > 0 ? p * Math.log(p) : 0), 0);
const BR_DAY = [.98, .01, .01], BR_NIGHT = [.40, .35, .25], BR_CLS = ['car', 'pedestrian', 'cyclist'];
const brProbs = ps => `<div class="broaden-prob">${ps.map((p, i) => `<span>${BR_CLS[i]}</span><i style="width:${p*100}%"></i><span>${p.toFixed(2)}</span>`).join('')}</div>`;
st(`
  <h1 class="t">Spend people's time where the model is unsure</h1>
  <div class="d6-cols" style="align-items:stretch;flex:0 0 auto">
    <div class="d6-card b" data-step="1">
      <div class="lead"><b>Clear day</b> · uncertainty ${brEnt(BR_DAY).toFixed(2)}</div>${brProbs(BR_DAY)}
    </div>
    <div class="d6-card b" data-step="1">
      <div class="lead"><b>Night</b> · uncertainty ${brEnt(BR_NIGHT).toFixed(2)} (max ${Math.log(3).toFixed(2)})</div>${brProbs(BR_NIGHT)}
    </div>
  </div>
  <div class="lead b" data-step="2"><b>Send the night frame to a person.</b> The confident frame would teach the model little.</div>
  <div class="lead b" data-step="3"><b>Model in the loop, for real:</b> building Segment Anything, the model proposed masks and people fixed them. Time per mask fell from <b>34 s to 14 s</b>.</div>
  <div class="lead b" data-step="4">By the end, <b>99.1%</b> of its 1.1 billion masks were made fully automatically</div>
  ${cite('Probabilities are an example; uncertainty = entropy, natural log · ' + brA('https://arxiv.org/abs/2304.02643', 'Kirillov et al., Segment Anything (2023), sections 4 and 5'))}
`);

/* ---------- New: when people are the data (human studies; the class projects that compare models with people) ---------- */
const brTrials = (p, m) => Math.ceil(p * (1 - p) * (1.96 / m) ** 2);
st(`
  <h1 class="t">When your data is people's answers</h1>
  <div class="d6-cols" style="grid-template-columns:1fr 1.15fr;align-items:start">
    <div class="d6-card b" data-step="1">
      <div class="label">Projects in this class that compare models with people</div>
      <div class="lead" style="font-size:clamp(1.05rem,1.8vw,1.7rem)">Scrambled drawings: people vs ViTs<br>Blur and object recognition<br>Instance-level models vs human errors<br>Metamers: do people recognize them?<br>Decoding imagined pictures (fMRI)</div>
    </div>
    <div class="broaden-col broaden-small">
      <div class="lead b" data-step="2"><b>Fix the task:</b> pick 1 of n answers, so chance is 1/n; shuffle trial order</div>
      <div class="lead b" data-step="3"><b>Measure people against people first.</b> That agreement is the ceiling for any model.</div>
      <div class="lead b" data-step="4"><b>Enough trials:</b> to measure 50% accuracy within ±10 points, about <b>${brTrials(.5, .1)}</b> trials per condition</div>
      <div class="lead b" data-step="5">Real example: <b>85,120 trials from 90 people</b>, comparing which images people and models get wrong (error consistency, a Cohen's kappa)</div>
    </div>
  </div>
  ${cite(brA('https://arxiv.org/abs/2106.07411', 'Geirhos et al., Partial success in closing the gap between human and machine vision (NeurIPS 2021)') + ' · trial count computed: n = p(1−p)(1.96/m)²')}
`);

/* ---------- Physical AI: robot data cannot be scraped. Scale blog (2025-09-24) for the framing only (its hour
   figures are unsourced and not used); DROID, Open X-Embodiment and Ego4D numbers from their own abstracts and
   text (checked 2026-11-09). Bars drawn to scale from the hour counts. ---------- */
st(`
  <h1 class="t">Robots need data nobody has posted online</h1>
  <div class="d6-cols" style="align-items:center;grid-template-columns:1fr 1fr">
    <div class="broaden-col broaden-small" style="gap:1.8vh">
      <div class="lead b" data-step="1">Photos can be scraped. Robot data <b>can't</b>: it is collected one grasp at a time.</div>
      <div class="lead b" data-step="2"><b>DROID:</b> people steer a robot arm with a VR controller: <b>76k</b> demos, 564 scenes.</div>
      <div class="lead b" data-step="3"><b>Open X-Embodiment:</b> 60 lab datasets, <b>22</b> robot types pooled; RT-2-X about <b>3×</b> better than RT-2 on new skills.</div>
      <div class="b" data-step="4" style="display:grid;grid-template-columns:max-content 1fr;gap:1vh 1vw;align-items:center">
        ${[['DROID, robot', 350], ['Ego4D, people', 3670]].map(([nm, h]) => `<div class="label" style="white-space:nowrap">${nm}, ${h.toLocaleString('en-US')} h</div>
          <div><i style="display:block;height:2.2vh;background:var(--ink);border-radius:3px;width:${(h / 3670 * 100).toFixed(1)}%"></i></div>`).join('')}
      </div>
    </div>
    <div class="broaden-col broaden-small" style="gap:1.8vh">
      <div class="lead b" data-step="5"><b>The gaps, in today's words:</b></div>
      <div class="lead b" data-step="5"><b>Coverage:</b> hundreds of scenes, while robots will meet millions of homes</div>
      <div class="lead b" data-step="6"><b>Shift:</b> a new robot, room or object is a new test set (Part 1)</div>
      <div class="lead b" data-step="7"><b>Simulation:</b> cheap labels, but sim looks unlike the real world (randomize it)</div>
      <div class="lead b" data-step="8"><b>Human video:</b> plenty of hands, but no robot actions: a hand is not a gripper</div>
      <div class="lead b" data-step="9"><b>Labels:</b> not just what is seen, but the action, the goal, the steps, and what failed</div>
    </div>
  </div>
  ${cite(brA('https://scale.com/blog/physical-ai', 'Scale AI blog, Physical AI (2025)') + ' · ' + brA('https://arxiv.org/abs/2403.12945', 'Khazatsky et al., DROID (2024)') + ' · ' + brA('https://arxiv.org/abs/2310.08864', 'Open X-Embodiment Collaboration (2023)') + ' · ' + brA('https://arxiv.org/abs/2110.07058', 'Grauman et al., Ego4D (CVPR 2022)'))}
`);

/* ---------- Where to find data. Each place checked 2026-11-09; the Hugging Face count is what its page showed.
   Roboflow Universe left out: its page refused the fetch, so nothing about it was verified. ---------- */
st(`
  <h1 class="t">Before you collect, look for data that already exists</h1>
  <div class="broaden-rows">
    <div class="broaden-row b" data-step="1"><div class="lead"><b>Hugging Face</b></div><div class="lead">about 1.1 million datasets; one line loads one: <code>load_dataset("name")</code></div></div>
    <div class="broaden-row b" data-step="2"><div class="lead"><b>Papers</b></div><div class="lead">the project page or GitHub linked from the paper; the NeurIPS datasets track (since 2021)</div></div>
    <div class="broaden-row b" data-step="3"><div class="lead"><b>Kaggle</b></div><div class="lead">datasets from competitions and users, often with example notebooks</div></div>
    <div class="broaden-row b" data-step="3"><div class="lead"><b>Google Dataset Search</b></div><div class="lead">searches dataset pages across the web</div></div>
    <div class="broaden-row b" data-step="4"><div class="lead"><b>Your field's archives</b></div><div class="lead">medical, satellite, wildlife, sign language: ask someone in the field</div></div>
    <div class="lead b" data-step="5" style="margin-top:1vh">Found one? Read its <b>license</b> and its <b>datasheet</b> before you train.</div>
  </div>
  ${cite(brA('https://huggingface.co/datasets', 'huggingface.co/datasets') + ' (count as shown on 2026-11-09) · ' + brA('https://www.kaggle.com/datasets', 'kaggle.com/datasets') + ' · ' + brA('https://datasetsearch.research.google.com/', 'Google Dataset Search') + ' · paperswithcode.com now redirects to Hugging Face Papers')}
`);

/* ---------- Worked example: a dataset for the class's sign-language project. WLASL facts from the paper
   (arXiv 1910.11006 v2: counts, sources, 4:1:1 split per gloss) and its README (expired links, C-UDA,
   no commercial use), checked 2026-11-09. "Your world" is the project's setting, not data. ---------- */
st(`
  <h1 class="t">Example: data for a sign-language app for doctors</h1>
  <div class="broaden-rows">
    <div class="broaden-row b" data-step="1"><div class="lead"><b>Found</b></div><div class="lead">WLASL: <b>2,000</b> words, <b>21,083</b> videos, <b>119</b> signers</div></div>
    <div class="broaden-row b" data-step="2"><div class="lead"><b>Where from?</b></div><div class="lead">sign-language teaching websites and YouTube tutorials; links expire, so your copy may be missing videos</div></div>
    <div class="broaden-row b" data-step="3"><div class="lead"><b>Can I use it?</b></div><div class="lead">academic and computational use only, no commercial use</div></div>
    <div class="broaden-row b" data-step="4"><div class="lead"><b>How is it split?</b></div><div class="lead">4 : 1 : 1 within each word, not by signer → re-split by signer</div></div>
    <div class="broaden-row b" data-step="5"><div class="lead"><b>Like my world?</b></div><div class="lead">clear teaching videos vs a patient on a clinic webcam → test on a few of your own clips</div></div>
    <div class="statement b" data-step="6" style="margin-top:1vh"><b>Verdict: use it and adapt. It is a start, not the answer.</b></div>
  </div>
  ${cite(brA('https://arxiv.org/abs/1910.11006', 'Li et al., Word-level Deep Sign Language Recognition from Video (WACV 2020)') + ' · ' + brA('https://github.com/dxli94/WLASL', 'WLASL README (license: C-UDA)'))}
`, { sub: true });

/* ---------- Activity: a short dataset hunt for each student's own task ---------- */
st(`
  <h1 class="t">Your turn: find one dataset for your project</h1>
  <div class="d6-cols" style="grid-template-columns:1.2fr 1fr;align-items:center">
    <table class="d6-tbl b" data-step="1" style="width:100%;font-size:clamp(1.05rem,1.9vw,1.8rem)">
      <tr><th style="text-align:left">Write down</th></tr>
      <tr><td style="text-align:left">Name, where you found it, size</td></tr>
      <tr><td style="text-align:left">What it labels: classes, boxes, masks, answers?</td></tr>
      <tr><td style="text-align:left">Where the images came from, and who is in them</td></tr>
      <tr><td style="text-align:left">License: can you use it?</td></tr>
      <tr><td style="text-align:left">How it is split</td></tr>
    </table>
    <div class="broaden-col broaden-small">
      <div class="lead b" data-step="2"><b>5 minutes</b>, alone or with your project group</div>
      <div class="lead b" data-step="3">Then tell a neighbor: <b>use it, use it and adapt, or don't use it?</b></div>
      <div class="lead b" data-step="4">Nothing found? That is an answer too: you will collect or simulate.</div>
    </div>
  </div>
`);

/* ---------- Transition to Part 3 ---------- */
st(`
  <h1 class="t">We can get more data…</h1>
  <div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;justify-content:center;gap:4vh">
    <div class="lead b" data-step="1">Find it, augment it, simulate it, collect it, label it.</div>
    <div class="statement b" data-step="2" style="font-size:clamp(1.8rem,3.4vw,3.2rem)"><b>…but how do we know a dataset is right for my task?</b></div>
  </div>
`);
}
