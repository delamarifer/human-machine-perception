/* PART: simple-system (Day 2). Owner: to decide. Plan: 50-60 min, "back and forth lecturing of the simple
   system lab". Fernanda (2026-11-02): move Day 1's simple system down here, condensed, and make it full circle:
   after the 3D reconstruction, pause and ask "What do you think would give these systems a better world model?",
   then Phase 2 of the lab tests a few of their ideas.
   ACT 1 PHASE 1 (condensed notebook sections 1-6), told as the book's argument: vision as a summer project →
   what the image throws away → edges → one edge, several causes → assumptions decide the cause (the generic view
   broken on purpose) → the flat parts → 3D → the back is missing → priors (light from above). A list of "Our
   assumptions" grows on screen as each one is used, and the floating box strikes one off.
   ACT 2 THE PAUSE: the question, the room brainstorms; then one answer from the brain, a world simulator.
   ACT 3 PHASE 2: four kinds of answer, each testable in the box world; the floating box as the first test.
   Figures: day02/assets/simple-system/ (made by the notebook's own code; see day02/assets/SOURCES.md).
   After Ch. 2 of Torralba, Isola & Freeman, Foundations of Computer Vision. */
{
section('Lab');

const NB = 'https://colab.research.google.com/github/delamarifer/human-machine-perception/blob/main/notebooks/day01-lab-simple-vision-system.ipynb';
const go = (s) => `<div class="simple-system-go b" data-step="99"><span class="label">Notebook</span><b>${s}</b></div>`;

st(`
  <h1 class="t">A simple vision system</h1>
  <div class="label simple-system-outcome"><b>In the lab, you will</b> · recover the 3D shape of a simple scene from one image, by writing its assumptions as equations</div>
  <div class="simple-system-split">
    <div class="tile b" data-step="1"><div class="im"><img src="assets/simple-system/world.png" alt=""></div></div>
    <div class="b" data-step="2">
      <div class="question">Can we recover its 3D shape from this one image?</div>
      <p class="lead" style="margin-top:3vh"><a href="${NB}" target="_blank" rel="noopener" onclick="event.stopPropagation()" style="color:var(--ink)">Open the notebook in Colab ↗</a></p>
    </div>
  </div>
  <div class="todo b" data-step="3" style="position:absolute;right:6vw;bottom:6vh;max-width:34vw">Minutes for Phase 1 and Phase 2 (50-60 in total).</div>
  ${cite('After Chapter 2, A Simple Vision System, in Torralba, Isola &amp; Freeman, Foundations of Computer Vision')}
  <style>
.simple-system-outcome{ color:var(--mute); } .simple-system-outcome b{ color:var(--ink); }
    .simple-system-split{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1.2fr 1fr; gap:4vw; align-items:center; }
    .simple-system-split .im{ background:#fff; }
    .simple-system-split .im img{ object-fit:contain; }
    .simple-system-go{ position:absolute; right:6vw; top:9vh; border:2px solid var(--ink); border-radius:14px; padding:1.4vh 1.4vw;
      display:flex; flex-direction:column; gap:.4vh; min-width:13vw; }
    .simple-system-go b{ font-size:clamp(1.3rem, 2vw, 1.9rem); }
  </style>
`, { notes: [
  "(draft) Now we build something: a simple vision system, from Chapter 2 of the book. In this lab, you will recover the 3D shape of a simple scene from one image, by writing its assumptions as equations.",
  "(draft) Here is our world, as the camera sees it: a white floor, and colored boxes standing on it.",
  "(draft) The question: from this one image, can we recover the 3D shape of the scene? Open the notebook in Colab and run the setup. We go back and forth: an idea here, then you run it there.",
  "(to write) Timing."
]});

// Our assumptions, as a list that grows on screen as each one is used, and gets struck when one breaks.
// ledger(known, adds, strikes): the first `known` items are listed; adds = {index: step} build in on that click;
// strikes = {index: step} strike that item on that click. The list itself appears on click 1 (title first).
const ASSUME = ['The camera: parallel projection', 'The floor is white', 'Boxes rest on the floor',
  'Generic view: no lucky angle', 'Faces are flat'];
const ledger = (known, adds = {}, strikes = {}) => `
  <div class="simple-system-ledger b" data-step="1"><div class="simple-system-ledger-h">Our assumptions</div><ol>${
    ASSUME.map((a, i) => i < known
      ? `<li>${a}${strikes[i] != null ? `<span class="simple-system-strike b" data-step="${strikes[i]}"></span>` : ''}</li>`
      : adds[i] != null ? `<li class="b" data-step="${adds[i]}">${a}</li>` : '').join('')}</ol></div>`;

// Board ↔ notebook: one cue per click on the left, and a real output for it on the right
// (each new figure covers the one before; going back uncovers it). A cue with no image keeps the last figure.
const steps = (items, led = '') => `
  <div class="simple-system-steps">
    <div class="simple-system-left">
      <ul class="frag">${items.map(([cue], k) => `<li class="b" data-step="${k + 1}">${cue}</li>`).join('')}</ul>
      ${led}
    </div>
    <div class="simple-system-stage">${items.map(([, img, cls], k) => img ?
      `<div class="simple-system-shot b" data-step="${k + 1}"><img class="${cls || ''}" src="assets/simple-system/${img}" alt=""></div>` : '').join('')}</div>
  </div>`;

st(`
  <h1 class="t">Vision as a summer project</h1>
  <div class="simple-system-split">
    <ul class="frag">
      <li class="b" data-step="1">1966: MIT's Summer Vision Project</li>
      <li class="b" data-step="2">Much harder than anyone expected</li>
      <li class="b" data-step="3">First, simplify the world: a blocks world</li>
    </ul>
    <div class="tile b" data-step="4"><div class="im"><img src="assets/simple-system/world.png" alt=""></div>
      <div class="label">Our blocks world</div></div>
  </div>
  ${cite('Papert, The Summer Vision Project, MIT AI Memo 100 (1966) · Roberts, Machine perception of three-dimensional solids, MIT PhD thesis (1963) · as told in Torralba, Isola &amp; Freeman, Ch. 2')}
  <style>
    .simple-system-steps{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1fr 1.35fr; gap:3vw; align-items:center; margin-top:2vh; }
    .simple-system-left{ display:flex; flex-direction:column; gap:4vh; }
    .simple-system-stage{ position:relative; height:100%; min-height:0; }
    .simple-system-shot{ position:absolute; inset:0; background:var(--bg); display:flex; align-items:center; justify-content:center; }
    .simple-system-shot img{ width:100%; height:100%; object-fit:contain; }
    .simple-system-shot img.simple-system-px{ image-rendering:pixelated; width:60%; height:60%; }
    .simple-system-ledger{ border:2px solid var(--line); border-radius:12px; padding:1.2vh 1.2vw; align-self:flex-start; }
    .simple-system-ledger-h{ font-weight:700; font-size:clamp(.9rem, 1.2vw, 1.15rem); color:var(--mute); }
    .simple-system-ledger ol{ margin:.6vh 0 0 1.3em; padding:0; font-size:clamp(.95rem, 1.3vw, 1.25rem); line-height:1.45; }
    .simple-system-ledger li{ position:relative; }
    .simple-system-strike.b{ position:absolute; left:-1.4em; right:-.3em; top:52%; height:3px; background:var(--ink); opacity:1;
      transform:scaleX(0); transform-origin:left; transition:transform .7s ease; }
    .simple-system-strike.b.shown{ transform:scaleX(1); }
  </style>
`, { notes: [
  "(draft) Before we build, a little history.",
  "(draft) In 1966, Seymour Papert at MIT proposed building a significant part of a visual system as a summer project, split among a group of students.",
  "(draft) It turned out to be much harder than anyone expected. Sixty years later we are still working on it, and this course is about why.",
  "(draft) So the early systems made the world simple first. Larry Roberts, in 1963, worked in a blocks world: simple geometric solids.",
  "(draft) Ours is in the same spirit: colored boxes on a white floor. Simple enough that we can build a whole vision system today, by hand."
]});

{ // What the image throws away: the notebook's two points (section 1), drawn from the side
  const th = 35 * Math.PI / 180, Z2 = 10 * Math.cos(th) / Math.sin(th);
  const px = Z => 60 + Z * 7, py = Y => 470 - Y * 7;                 // side view: Z to the right, Y up
  const ray = Y0 => [[-8, Y0 - 8 * Math.tan(th)], [52, Y0 + 52 * Math.tan(th)]];   // a line of constant image y
  const line = ([[za, ya], [zb, yb]], c) => `<line x1="${px(za)}" y1="${py(ya)}" x2="${px(zb)}" y2="${py(yb)}" class="${c}"/>`;
  const im = [52, 20 + 52 * Math.tan(th)];                             // where the ray meets the image plane
  const ux = -Math.sin(th), uy = Math.cos(th);                          // image plane direction (perpendicular)
  const plane = `<line x1="${px(im[0] - 10 * ux)}" y1="${py(im[1] - 10 * uy)}" x2="${px(im[0] + 10 * ux)}" y2="${py(im[1] + 10 * uy)}" class="simple-system-plane"/>`;
  const dot = (Z, Y, r = 7) => `<circle cx="${px(Z)}" cy="${py(Y)}" r="${r}"/>`;
  st(`
  <h1 class="t">What the image throws away</h1>
  <div class="simple-system-steps">
    <div class="simple-system-left">
      <ul class="frag">
        <li class="b" data-step="1">Point 1 lands on one pixel</li>
        <li class="b" data-step="2">Point 2, higher and farther: the same pixel</li>
        <li class="b" data-step="3">Every point on this line: the same pixel</li>
        <li class="b" data-step="4">One image is not enough: we must assume</li>
      </ul>
      ${ledger(0, {0: 1})}
    </div>
    <svg class="simple-system-ray" viewBox="0 0 560 500">
      <line x1="20" y1="470" x2="540" y2="470" class="simple-system-floor"/>
      <text x="540" y="492" text-anchor="end">Z, toward the camera</text>
      <line x1="60" y1="470" x2="60" y2="40" class="simple-system-axis"/>
      <text x="68" y="40">Y, height</text>
      <text x="20" y="492">floor</text>
      ${[-20, 0, 20, 40, 60].map(Y0 => line(ray(Y0), 'simple-system-faint')).join('')}
      ${plane}<text x="${px(im[0] + 10 * ux) - 8}" y="${py(im[1] + 10 * uy) + 4}" text-anchor="end">image</text>
      <g class="b" data-step="1">${line([[0, 20], im], 'simple-system-ink')}${dot(0, 20)}
        <text x="${px(0) + 12}" y="${py(20) + 24}">point 1: height 20, depth 0</text>
        <g class="simple-system-pix">${dot(im[0], im[1], 9)}</g>
        <text x="${px(im[0]) + 16}" y="${py(im[1]) - 20}">y = 16.38</text></g>
      <g class="b" data-step="2">${dot(Z2, 30)}
        <text x="${px(Z2) + 12}" y="${py(30) + 24}">point 2: height 30, depth ${Z2.toFixed(2)}</text>
        <text x="${px(im[0]) + 16}" y="${py(im[1]) + 2}">y = 16.38 too</text></g>
      <g class="b" data-step="3">${line(ray(20), 'simple-system-thick')}</g>
    </svg>
  </div>
  ${go('Section 1')}
  <style>
    .simple-system-ray{ width:100%; height:100%; min-height:0; }
    .simple-system-ray text{ font-size:15px; fill:var(--ink); font-family:var(--font); }
    .simple-system-ray circle{ fill:var(--ink); }
    .simple-system-ray .simple-system-floor{ stroke:var(--ink); stroke-width:3; }
    .simple-system-ray .simple-system-axis{ stroke:var(--mute); stroke-width:1.5; }
    .simple-system-ray .simple-system-faint{ stroke:var(--line); stroke-width:1.5; stroke-dasharray:4 5; }
    .simple-system-ray .simple-system-plane{ stroke:var(--ink); stroke-width:5; }
    .simple-system-ray .simple-system-ink{ stroke:var(--ink); stroke-width:2; stroke-dasharray:6 5; }
    .simple-system-ray .simple-system-thick{ stroke:var(--ink); stroke-width:5; opacity:.35; }
    .simple-system-ray .simple-system-pix circle{ fill:var(--bg); stroke:var(--ink); stroke-width:3; }
  </style>
`, { notes: [
  "(draft) First: what does the image throw away?",
  "(draft) Our camera uses parallel projection, tilted down by an angle theta of 35 degrees. A point's image row is y equals cos theta times its height Y, minus sin theta times its depth Z. Point 1, at height 20 and depth 0, lands at y equals 16.38. That projection is our first assumption, about the camera.",
  "(draft) Point 2 is ten units higher, and pushed back by 14.28. It lands on exactly the same pixel: y equals 16.38 again. These are the two points you find yourself in section 1 of the notebook.",
  "(draft) And it's not just two points: every point on this line of sight lands on the same pixel. Height and depth get mixed into one number.",
  "(draft) So the image alone cannot tell us where things are: the problem is ill-posed. To recover 3D, we have to add assumptions about the world. We'll collect them in this list as we go.",
  "(draft) Run section 1."
]});
}

st(`
  <h1 class="t">From image to edges</h1>
  ${steps([
    ['The image is an array: rows × columns × 3', 'gray.png'],
    ['Edges: differences between neighboring pixels', 'dx.png'],
    ['Strong differences become edge pixels', 'edge-pixels.png'],
  ], ledger(1))}
  ${go('Sections 2–3')}
`, { notes: [
  "(draft) Next: from the image to edges.",
  "(draft) To the computer the image is an array: rows, columns, and three color values. We average the colors to get brightness. This is the grayscale image you get in section 2.",
  "(draft) An edge is where brightness changes fast, and with pixels a derivative is just the difference between neighbors: one subtraction of two shifted copies of the image. Red, brightness goes down to the right; blue, it goes up; white, no change. Edges that run left to right nearly vanish here: they need the vertical derivative.",
  "(draft) Combine both derivatives into an edge strength, keep the pixels above a threshold you choose, and you get the edge pixels. Too low and you get noise; too high and you lose the faint edges between two faces of the same box.",
  "(draft) Run sections 2 and 3."
]});

st(`
  <h1 class="t">One edge, several causes</h1>
  ${steps([
    ['Outline: a box against the floor', 'edges-outline.png'],
    ['Fold: one face meets another', 'edges-fold.png'],
    ['Paint and shadows make edges too', null],
    ['Seeing: guessing the most likely cause', null],
  ], ledger(1))}
  ${cite('Catalog of edges after Torralba, Isola &amp; Freeman, Foundations of Computer Vision, Ch. 2')}
`, { notes: [
  "(draft) An edge pixel only says: something changes here. But what?",
  "(draft) Some edges are outlines: a box against the floor behind it.",
  "(draft) Others are folds: two faces of the same box meeting at an angle, lit differently.",
  "(draft) In a real photo, paint and shadows make edges too. Our box world has none, which is part of what makes it simple.",
  "(draft) So the edge map is a set of clues, not answers. Each edge has several possible causes, and seeing means guessing the most likely one. Assumptions are how our system guesses."
]});

st(`
  <h1 class="t">What each edge means</h1>
  ${steps([
    ['Assume a white floor: colored means box', 'figure-ground.png'],
    ['Assume boxes rest on the floor: contact or occlusion', 'contact-occlusion.png'],
    ['Assume a generic view: vertical in the image, vertical in the world', 'vertical-horizontal.png'],
  ], ledger(1, {1: 1, 2: 2, 3: 3}))}
  ${go('Sections 4–5')}
`, { notes: [
  "(draft) Now we use assumptions to decide what each edge means.",
  "(draft) Figure and ground. We assume the floor is white, so its three color channels are about equal; the boxes are colored. Saturation, the largest channel minus the smallest, separates them: boxes in white, floor in black.",
  "(draft) We assume boxes rest on the floor. Scan any column from top to bottom: going from floor to box is an occlusion edge, the box hiding the floor behind it; going from box to floor is a contact edge, where the box touches the floor at height zero. In the notebook's figure, occlusion edges are orange and contact edges are teal.",
  "(draft) And the generic view assumption: unless the camera sits at a lucky, accidental viewpoint, edges that look vertical in the image are vertical in the world. The notebook draws them in red, and every other box edge, horizontal in 3D, in blue.",
  "(draft) Run sections 4 and 5."
]});

st(`
  <h1 class="t">When the view is accidental</h1>
  ${steps([
    ['Turn every box square to the camera', 'accidental-image.png'],
    ['The tops’ side edges now look vertical', 'accidental-labels.png'],
    ['Every box comes out too tall', 'accidental-heights.png'],
  ], ledger(4))}
  ${go('Section 7 · Your turn 6')}
`, { notes: [
  "(draft) Why is the generic view only an assumption? Let's break it.",
  "(draft) The same three boxes, each turned so it faces the camera squarely: an accidental view.",
  "(draft) Now the side edges of each box's top run straight toward the camera, so in the image they are vertical. The system labels them vertical in the world, in red, and they are not.",
  "(draft) We'll see how the system turns labels into heights in a minute. Here is what it does with these wrong labels: every box comes out too tall. The red box is 45 tall and comes out 69; the blue one is 18 and comes out 36; the green one is 70 and comes out about 87.",
  "(draft) Try it yourself in section 7, your turn 6: turn a box to angle 0 or 90 and see what the system does."
]});

st(`
  <h1 class="t">The flat parts</h1>
  ${steps([
    ['A patch on its own: no clue to its shape', 'patch-alone.png', 'simple-system-px'],
    ['In context: the edges around it tell', 'patch-context.png'],
    ['Assume faces are flat: carry the edges inward', null],
  ], ledger(4, {4: 3}))}
  ${go('Section 6')}
`, { notes: [
  "(draft) Edges give us clues at a few pixels. What about everything in between?",
  "(draft) Here is a small patch of the image on its own. It is one flat color. Is it tilted, curved, near, far? On its own, there is no way to tell.",
  "(draft) Here is the same patch in context: part of the front face of the green box. The edges around it tell us about its 3D shape.",
  "(draft) So we add one more assumption: faces are flat. That carries what we know at the edges into the plain regions in between, like stretching a sheet between its edges.",
  "(draft) Section 6 turns all five assumptions into equations. That is next."
]});

st(`
  <h1 class="t">From assumptions to 3D</h1>
  <div class="simple-system-split">
    <ul class="frag">
      <li class="b" data-step="1">Each assumption: an equation for the height of every pixel</li>
      <li class="b" data-step="2">45,046 equations, 33,000 unknowns: least squares</li>
    </ul>
    <div class="tile b" data-step="3"><div class="im"><img src="assets/simple-system/recovered-front.png" alt=""></div>
      <div class="label">Tallest box: true height 70, recovered 68.6</div></div>
  </div>
  ${go('Section 6')}
`, { notes: [
  "(draft) Step three: from assumptions to 3D.",
  "(draft) Each assumption becomes an equation about the unknown height of every pixel. Floor pixels and contact edges are at height zero. Vertical edges rise. Horizontal edges keep their height. And faces are flat, which carries what we know at the edges into the plain regions in between.",
  "(draft) That gives forty-five thousand equations for thirty-three thousand unknown heights. They cannot all hold exactly, so we find the heights that break them the least: least squares.",
  "(draft) And here is the 3D world we recovered from one image, seen from a viewpoint the camera never had. The tallest box is 70 units tall; we recovered 68.6. The typical error on the boxes is about 3 units.",
  "(draft) Run section 6, and turn the 3D world around yourself."
]});

const BOOK = 'https://visionbook.mit.edu/simplesystem.html';
st(`
  <h1 class="t">From assumptions to 3D</h1>
  <div class="simple-system-split">
    <div class="tile b" data-step="1"><div class="im"><img src="assets/simple-system/recovered-behind.png" alt=""></div>
      <div class="label">The same result, from the other side</div></div>
    <ul class="frag">
      <li class="b" data-step="2">The back is missing</li>
      <li class="b" data-step="3">We recover only what the camera saw</li>
      <li class="b" data-step="4">Heights, not objects: it can't count the boxes</li>
      <li class="b" data-step="5"><a href="${BOOK}" target="_blank" rel="noopener" onclick="event.stopPropagation()" style="color:var(--ink)">Turn it yourself: in the notebook, or the book's demo ↗</a></li>
    </ul>
  </div>
`, { blank: false, notes: [
  "(draft) Now let's walk around to the other side.",
  "(draft) The same reconstruction, seen from behind the boxes.",
  "(draft) The back is missing. Each box is a shell with no back face, and the white patches are floor that the boxes hid from the camera. Nothing was recovered there.",
  "(draft) We only recover what the camera saw. That is the limit of one 2D image, made visible: the image never contained the back.",
  "(draft) And notice what the system has: a height for every pixel, but no idea that the scene is made of boxes. It can't count them, and it can't guess the back of one from its front. (After the book's closing remarks on this chapter.)",
  "(draft) Now turn it yourself: in section 6 of the notebook, drag the 3D view around to the back (the book's chapter has an interactive version too). Then answer the talk-it-over question: what is missing, and why?"
]});

{ // Priors, after Helmholtz: the light-from-above classic. The distributions are drawn for illustration.
  const X = e => 150 + (e + 90) / 180 * 400;                  // light direction: −90 (from below) … +90 (from above)
  const prior = e => Math.exp(-0.5 * ((e - 60) / 35) ** 2);
  const curve = (base, amp) => Array.from({length: 91}, (_, i) => { const e = -90 + 2 * i;
    return `${i ? 'L' : 'M'}${X(e).toFixed(1)},${(base - prior(e) * amp).toFixed(1)}`; }).join('');
  const pa = prior(60), pb = prior(-60), post = [pa / (pa + pb), pb / (pa + pb)];
  const spike = (e, base, h) => `<rect x="${X(e) - 9}" y="${base - h}" width="18" height="${h}"/>`;
  const row = (y, name) => `<line x1="150" y1="${y}" x2="550" y2="${y}" class="simple-system-base"/>
    <text x="138" y="${y - 30}" text-anchor="end" class="simple-system-rowname">${name}</text>`;
  const hyp = (y, a, b) => `<text x="${X(60)}" y="${y}" text-anchor="middle">${a}</text><text x="${X(-60)}" y="${y}" text-anchor="middle">${b}</text>`;
  const disks = [0, 1, 2].flatMap(c => [0, 1].map(r => `<circle cx="${70 + c * 90}" cy="${70 + r * 100}" r="34" fill="url(#simple-system-shade)"/>`)).join('');
  st(`
  <h1 class="t">Priors: how the brain fills the gap</h1>
  <div class="simple-system-priors">
    <div class="simple-system-left">
      <svg class="simple-system-disks b" data-step="1" viewBox="0 0 320 240">
        <defs><linearGradient id="simple-system-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#f8fafc"/><stop offset="1" stop-color="#334155"/></linearGradient></defs>
        <rect width="320" height="240" rx="12" fill="#94a3b8"/><g class="simple-system-flipme">${disks}</g>
      </svg>
      <ul class="frag">
        <li class="b" data-step="1">Bumps or dents?</li>
        <li class="b" data-step="2">The image alone: both fit equally</li>
        <li class="b" data-step="3">Prior: light usually comes from above</li>
        <li class="b" data-step="4">Likelihood × prior: you see bumps</li>
        <li class="b simple-system-flip" data-step="5">Turn the picture over: dents</li>
        <li class="b" data-step="6">Our box assumptions are priors too</li>
      </ul>
    </div>
    <div class="simple-system-chartbox">
      <svg class="simple-system-chart" viewBox="0 0 570 420">
        <g class="b" data-step="2">${row(110, 'Image alone')}${spike(60, 110, 70)}${spike(-60, 110, 70)}
          <g class="simple-system-up">${hyp(28, 'bump', 'dent')}</g><g class="simple-system-down">${hyp(28, 'dent', 'bump')}</g></g>
        <g class="b simple-system-prior" data-step="3">${row(240, 'Prior')}<path d="${curve(240, 90)}"/></g>
        <g class="b simple-system-post" data-step="4">${row(370, 'What you see')}${spike(60, 370, post[0] * 72)}${spike(-60, 370, Math.max(post[1] * 72, 2))}
          <g class="simple-system-up">${hyp(284, 'bump', 'dent')}</g><g class="simple-system-down">${hyp(284, 'dent', 'bump')}</g></g>
        <g class="b" data-step="2"><text x="${X(-60)}" y="405" text-anchor="middle">light from below</text>
          <text x="${X(60)}" y="405" text-anchor="middle">light from above</text></g>
      </svg>
      <div class="label simple-system-note b" data-step="2">Distributions drawn for illustration, not measured</div>
    </div>
  </div>
  ${cite('Helmholtz, unconscious inference (Handbuch der physiologischen Optik, 1867) · Ramachandran, Perception of shape from shading, Nature (1988)')}
  <style>
    .simple-system-priors{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1fr 1.3fr; gap:3vw; align-items:start; margin-top:1vh; }
    .simple-system-priors ul.frag li{ font-size:clamp(1.1rem, 1.8vw, 1.7rem); }
    .simple-system-priors ul.frag{ gap:.8vh; }
    .simple-system-disks{ width:70%; }
    .simple-system-flipme{ transform-box:view-box; transform-origin:160px 120px; transition:transform 1.4s ease; }
    .slide:has(.simple-system-flip.shown) .simple-system-flipme{ transform:rotate(180deg); }
    .simple-system-chartbox{ display:flex; flex-direction:column; gap:.5vh; height:100%; min-height:0; }
    .simple-system-chart{ width:100%; flex:1 1 auto; min-height:0; }
    .simple-system-chart text{ font-size:17px; fill:var(--ink); font-family:var(--font); }
    .simple-system-chart .simple-system-rowname{ font-weight:700; }
    .simple-system-chart .simple-system-base{ stroke:var(--ink); stroke-width:1.5; }
    .simple-system-chart rect{ fill:var(--ink); }
    .simple-system-prior path{ fill:none; stroke:var(--ink); stroke-width:3; stroke-dasharray:900; stroke-dashoffset:900; transition:stroke-dashoffset 1.6s ease; }
    .simple-system-prior.shown path{ stroke-dashoffset:0; }
    .simple-system-post rect{ transform-box:fill-box; transform-origin:bottom; transform:scaleY(0); transition:transform 1.2s ease .3s; }
    .simple-system-post.shown rect{ transform:scaleY(1); }
    .simple-system-down{ opacity:0; } .simple-system-up, .simple-system-down{ transition:opacity .6s ease .6s; }
    .slide:has(.simple-system-flip.shown) .simple-system-up{ opacity:0; }
    .slide:has(.simple-system-flip.shown) .simple-system-down{ opacity:1; }
    .simple-system-note{ color:var(--mute); font-size:clamp(.85rem, 1.1vw, 1.05rem); text-align:right; }
  </style>
`, { notes: [
  "(draft) Our system filled the gap with assumptions. Your brain does the same, all the time. Helmholtz, in the 1860s, called it unconscious inference.",
  "(draft) Look at these disks. Do you see bumps or dents? Most people see bumps.",
  "(draft) The image alone can't decide. A bump lit from above and a dent lit from below make exactly the same picture. On their own, the two explanations fit the image equally well: that's the likelihood.",
  "(draft) But your brain knows something about the world: light usually comes from above, from the sun and from ceiling lights. That is a prior: before you even look, light from above is much more likely than light from below.",
  "(draft) Multiply the two, likelihood times prior, and one explanation wins by far: bumps, lit from above. That's what you see, without ever deciding to.",
  "(draft) Now let's turn the same picture upside down. The bright side is now at the bottom. The same prior, light from above, now says: dents. Nothing changed but the image; the prior did the rest.",
  "(draft) Our box system works the same way. A white floor, boxes resting on it, a generic view, flat faces: those are its priors, written by hand, and they let it pick one 3D world out of all the ones that fit the image. And like any prior, they can be wrong."
]});
}

st(`
  <div class="center">
    <div class="question" style="font-size:clamp(2.4rem,4.2vw,3.8rem)">What do you think would give these systems a better world model?</div>
    <div class="lead b" style="margin-top:5vh">Brainstorm in pairs</div>
  </div>
`, { notes: [
  "(draft) Let's pause here. This little system works because we wrote its world model by hand: a flat floor, boxes resting on it, flat faces, a generic view. And still the back is missing: you knew the back of each box was there; the system did not. So: what do you think would give these systems a better world model?",
  "(draft) Take a few minutes in pairs, then we collect your ideas on the board. (Collect them; Phase 2 tests a few.)"
]});

{ // A world simulator: sample many towers you might be seeing, run each forward, count the ones that fall.
  // A toy we compute here (static stability of a stack), in the spirit of Battaglia, Hamrick & Tenenbaum (2013).
  let seed = 7; const rnd = () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  const gauss = () => Math.sqrt(-2 * Math.log(1 - rnd())) * Math.cos(2 * Math.PI * rnd());
  const W = 90, H = 30, SEEN = [0, 24, 44, 60], N = 24, SD = 6;
  // the lowest level where the blocks above stick out past their support, or -1 if the tower stands
  const falls = xs => { for(let k = 1; k < xs.length; k++){ const above = xs.slice(k), com = above.reduce((a, b) => a + b) / above.length;
    if(Math.abs(com - xs[k - 1]) > W / 2) return {k, dir: Math.sign(com - xs[k - 1])}; } return null; };
  const tower = (xs, cls = '') => { const f = falls(xs), blocks = (a, b) => xs.slice(a, b).map((x, j) =>
      `<rect x="${x - W / 2}" y="${-(a + j + 1) * H}" width="${W}" height="${H}" rx="3"/>`).join('');
    if(!f) return `<g class="${cls}">${blocks(0, xs.length)}</g>`;
    const px = xs[f.k - 1] + f.dir * W / 2, py = -f.k * H;
    return `<g class="${cls}">${blocks(0, f.k)}<g class="simple-system-topple" style="transform-origin:${px}px ${py}px; --rot:${f.dir * 75}deg">${blocks(f.k, xs.length)}</g></g>`; };
  const samples = Array.from({length: N}, () => SEEN.map(x => x + SD * gauss()));
  const nFall = samples.filter(falls).length;
  const grid = samples.map((xs, i) => `<g transform="translate(${70 + (i % 6) * 125},${110 + Math.floor(i / 6) * 125}) scale(.6)">
      <line x1="-80" y1="0" x2="160" y2="0" class="simple-system-ground"/>${tower(xs)}</g>`).join('');
  st(`
  <h1 class="t">A world simulator in the brain?</h1>
  <div class="simple-system-sim">
    <div class="simple-system-left">
      <svg viewBox="-120 -170 320 200" class="simple-system-seen b" data-step="1">
        <line x1="-110" y1="0" x2="190" y2="0" class="simple-system-ground"/>${tower(SEEN)}</svg>
      <ul class="frag">
        <li class="b" data-step="1">Will it fall?</li>
        <li class="b" data-step="2">What you see is a little uncertain: ${N} possible towers</li>
        <li class="b simple-system-run" data-step="3">Run each one forward in your head</li>
        <li class="b" data-step="4">${nFall} of ${N} fall: a probability, not a yes or no</li>
        <li class="b" data-step="5">People's judgments follow a simulator like this</li>
      </ul>
    </div>
    <svg viewBox="0 0 760 640" class="simple-system-grid b" data-step="2">${grid}
      <g class="b" data-step="4"><rect x="40" y="580" width="${680 * nFall / N}" height="26" class="simple-system-fallbar"/>
        <rect x="${40 + 680 * nFall / N}" y="580" width="${680 * (N - nFall) / N}" height="26" class="simple-system-standbar"/>
        <text x="46" y="630">fall: ${nFall}</text><text x="714" y="630" text-anchor="end">stand: ${N - nFall}</text></g>
    </svg>
  </div>
  ${cite('Battaglia, Hamrick &amp; Tenenbaum, Simulation as an engine of physical scene understanding, PNAS (2013) · towers here: our own toy simulation')}
  <style>
    .simple-system-sim{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1fr 1.5fr; gap:2vw; align-items:center; }
    .simple-system-sim ul.frag li{ font-size:clamp(1.1rem, 1.8vw, 1.7rem); }
    .simple-system-sim ul.frag{ gap:.8vh; }
    .simple-system-seen{ width:70%; }
    .simple-system-grid{ width:100%; height:100%; min-height:0; }
    .simple-system-sim rect{ fill:#cbd5e1; stroke:var(--ink); stroke-width:2; }
    .simple-system-seen rect{ fill:#94a3b8; }
    .simple-system-sim .simple-system-ground{ stroke:var(--ink); stroke-width:3; }
    .simple-system-sim text{ font-size:20px; fill:var(--ink); font-family:var(--font); }
    .simple-system-sim .simple-system-fallbar{ fill:var(--ink); }
    .simple-system-sim .simple-system-standbar{ fill:var(--line); }
    .simple-system-grid .simple-system-topple{ transform-box:view-box; transition:transform 1.4s cubic-bezier(.5,0,.9,.6); }
    .slide:has(.simple-system-run.shown) .simple-system-grid .simple-system-topple{ transform:rotate(var(--rot)); }
  </style>
`, { notes: [
  "(draft) Here is one idea from the brain about a better world model.",
  "(draft) Look at this tower of blocks. Will it fall? You can answer in a fraction of a second.",
  "(draft) One proposal: your eyes give you a slightly uncertain picture, so your brain considers many towers that could be out there, each a little different from the others.",
  "(draft) And it runs each one forward, like a physics engine in a video game: which of these towers stays up, and which tips over?",
  `(draft) Here, ${nFall} of our ${N} towers fall. So the answer is a probability, not a yes or no. This is our own small simulation, just to show the idea.`,
  "(draft) Battaglia, Hamrick and Tenenbaum proposed exactly this kind of intuitive physics engine in 2013: people's judgments about towers like these followed a simulator with noisy perception. A world model like that knows that boxes are solid and need support, which our box system never knew."
]});
}

st(`
  <h1 class="t">Phase 2: test your ideas</h1>
  <div class="simple-system-ideas">
    <div class="simple-system-idea b" data-step="1"><b>Better assumptions</b><div class="label">Boxes are closed; a box can rest on another box</div></div>
    <div class="simple-system-idea b" data-step="2"><b>More data</b><div class="label">A second view of the same scene</div></div>
    <div class="simple-system-idea b" data-step="3"><b>Learn them</b><div class="label">Many rendered worlds with known heights</div></div>
    <div class="simple-system-idea b" data-step="4"><b>Borrow them</b><div class="label">A pretrained depth model on our image</div></div>
  </div>
  <div class="todo b" data-step="5">Phase 2 notebook cells are not built yet. Pick which ideas to test (see day02/feedback/_day.md).</div>
  <style>
    .simple-system-ideas{ margin:auto 0; display:grid; grid-template-columns:repeat(4, 1fr); gap:1.4vw; }
    .simple-system-idea{ border:2px solid var(--ink); border-radius:14px; padding:2.6vh 1.2vw; display:flex; flex-direction:column; gap:1.2vh; }
    .simple-system-idea b{ font-size:clamp(1.3rem, 2vw, 1.9rem); }
  </style>
`, { notes: [
  "(draft) Phase 2: we test some of your ideas. Most of them fall into four kinds.",
  "(draft) Better hand-written assumptions. For example: boxes are closed, so fill in the back; and a box may rest on the floor, or on top of another box.",
  "(draft) More data at test time: a second photo of the same scene from another angle. VGGT, which we saw earlier today, does this at scale.",
  "(draft) Learn the assumptions from data: we can render hundreds of box worlds where we know the true heights, and fit a model to them. That is where the rest of this course goes.",
  "(draft) Or borrow them: run a pretrained depth model, trained on millions of real photos, on our box world, and compare.",
  "(to write) Which ones we run in class."
]});

st(`
  <h1 class="t">The first test: a box that floats</h1>
  <figure class="fig b" data-step="1"><div class="well"><img src="assets/simple-system/floating-box.png" alt=""></div></figure>
  <div class="simple-system-float">${ledger(5, {}, {2: 2})}
    <div class="lead b" data-step="3">Which of your ideas would fix this?</div></div>
  <style>.simple-system-float{ display:flex; align-items:center; justify-content:space-between; gap:3vw; margin-top:2vh; }</style>
  ${go('Section 7')}
`, { notes: [
  "(draft) Here is the first test, already in the notebook.",
  "(draft) A green box floating 35 units above the floor. Nothing in the image says it floats. The system assumes boxes rest on the floor, so its recovered height, in the middle, is far too low compared with the truth on the right. And it has no idea it is wrong.",
  "(draft) The assumption it broke: boxes rest on the floor. Strike it from our list.",
  "(draft) Which of your ideas would fix this? A better assumption? A second view? Learning?",
  "(draft) Run section 7, then try one of your ideas."
]});

/* What you built: one visual per point. 1 = Day 1's ill-posed scene (Fernanda's scenes/ill-posed-shapes.html),
   shown live at its "infinitely many 3D shapes" beat, title and caption hidden; 2 and 3 = our own lab results
   (assets/simple-system, SOURCES.md); 4 = the four kinds of answer from Phase 2. */
const illPosedLive = `try{ const w = this.contentWindow, d = this.contentDocument;
  const st = d.createElement('style'); st.textContent = '.deck-title, .cap, .dots, .pop{ display:none !important } .wrap{ padding:2vh 2vw !important }';
  d.head.appendChild(st);
  for(let k = 0; k < 7; k++) w.illPosed.advance(); }catch(e){}`;
const built = (step, vis, text) => `<div class="simple-system-built b" data-step="${step}"><div class="simple-system-built-vis">${vis}</div><div class="simple-system-built-text">${text}</div></div>`;
st(`
  <h1 class="t">What you built</h1>
  <div class="simple-system-builts">
    ${built(1, `<iframe src="../scenes/ill-posed-shapes.html" title="Many 3D shapes, one image" tabindex="-1" onload="${illPosedLive.replace(/"/g, '&quot;')}"></iframe>`,
      '<b>One image is not enough</b><span class="label">Many 3D worlds, the same picture: ill-posed</span>')}
    ${built(2, `<img src="assets/simple-system/recovered-front.png" alt="">`,
      '<b>Assumptions fill the gap</b><span class="label">Flat floor, boxes on it, flat faces: a world model</span>')}
    ${built(3, `<img src="assets/simple-system/floating-box.png" alt="">`,
      '<b>Outside its world: confidently wrong</b><span class="label">A floating box, recovered too low</span>')}
    ${built(4, `<div class="simple-system-four"><span>assumed</span><span>seen</span><span>learned</span><span>borrowed</span></div>`,
      '<b>Better world models</b><span class="label">Where the rest of the course goes</span>')}
  </div>
  <style>
    .simple-system-builts{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:repeat(4, 1fr); gap:1.4vw; }
    .simple-system-built{ border:2px solid var(--line); border-radius:14px; padding:1.6vh 1vw; display:flex; flex-direction:column; gap:1.2vh; min-height:0; }
    .simple-system-built-vis{ flex:1 1 auto; min-height:0; display:flex; align-items:center; justify-content:center; }
    .simple-system-built-vis img{ max-width:100%; max-height:100%; object-fit:contain; }
    .simple-system-built-vis iframe{ width:100%; height:100%; border:0; pointer-events:none; }
    .simple-system-built-text{ display:flex; flex-direction:column; gap:.6vh; }
    .simple-system-built-text b{ font-size:clamp(1.15rem, 1.8vw, 1.6rem); line-height:1.2; }
    .simple-system-four{ display:grid; grid-template-columns:1fr 1fr; gap:.8vw; width:90%; }
    .simple-system-four span{ border:2px solid var(--ink); border-radius:10px; padding:1.6vh .4vw; text-align:center; font-weight:700;
      font-size:clamp(.95rem, 1.4vw, 1.3rem); }
  </style>
`, { notes: [
  "(draft) What you built today.",
  "(draft) Going from 3D to a 2D image loses a dimension: this is Day 1's figure, where many different 3D shapes all give the same picture. Recovering 3D from one image is ill-posed.",
  "(draft) Assumptions fill the gap: a flat floor, boxes resting on it, flat faces. Together they are a world model, written by hand, and with it you recovered this 3D scene.",
  "(draft) Outside the world it was designed for, the system can be confidently wrong: the floating box comes out far too low, and nothing tells the system it is wrong.",
  "(draft) And a better world model can come from better assumptions, from more data, from learning, or from a model someone else trained. The rest of the course is about the last two; the questions stay the same: what does the system assume, and what happens when the world disagrees?"
]});
}
