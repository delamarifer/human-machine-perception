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
/* The lab loop (Fernanda, 2026-11-02/03): students try an exercise → we come back together → the concept animated →
   the solution shown on the slide, as a notebook cell with its real output (from the executed teacher notebook).
   In class: Your turn 1 and 2 only; the rest of the notebook is homework. Exercises open in the public student
   notebook at a fixed cell id (turn-N). Note: the deck is public, so these two solutions are visible on the site. */
const turnLink = n => `${NB}#scrollTo=turn-${n}`;
/* The teacher copy (with solutions) lives privately in Fernanda's Google Drive; paste its Colab URL here and the
   link appears on the first lab slide. Students who follow it can't open it (access restricted). */
const TEACHER_NB = 'https://colab.research.google.com/drive/1UI41oHAQrER-dd3BN5q7tpJACjjuC5Eh';
const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const SOLUTION = {
  1: {code: `theta = np.deg2rad(35)

def project(X, Y, Z):
    x = X
    y = np.cos(theta) * Y - np.sin(theta) * Z
    return x, y

point1 = project(10, 20, 0)
# Raise Y by 10. To keep y the same, Z must grow by 10 * cos(theta) / sin(theta).
point2 = project(10, 30, 10 * np.cos(theta) / np.sin(theta))

print(f"point 1 lands at x = {point1[0]}, y = {point1[1]:.2f}")
print(f"point 2 lands at x = {point2[0]}, y = {point2[1]:.2f}")`,
      out: `point 1 lands at x = 10, y = 16.38
point 2 lands at x = 10, y = 16.38`},
  2: {code: `dx_simple = gray[:, 1:] - gray[:, :-1]

print("shape:", dx_simple.shape, "(one column fewer than the image)")
plt.figure(figsize=(8, 5.5))
plt.imshow(dx_simple, cmap="RdBu", vmin=-0.3, vmax=0.3)
plt.colorbar(label="change in brightness, left to right")
plt.title("Horizontal derivative")
plt.show()`,
      out: `shape: (150, 219) (one column fewer than the image)`, img: 'assets/simple-system/solution-2.png'}
};
const solution = n => { const o = SOLUTION[n]; return `<div class="simple-system-sol b" data-step="99"><div class="simple-system-sol-card">
  <div class="label"><b>Solution · Your turn ${n}</b></div>
  <div class="simple-system-sol-body"><div><pre class="simple-system-code">${esc(o.code)}</pre><pre class="simple-system-out">${esc(o.out)}</pre></div>
  ${o.img ? `<img src="${o.img}" alt="">` : ''}</div></div></div>`; };
const SOL_CSS = `<style>
  .simple-system-sol{ position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(255,255,255,.88); z-index:5; }
  .simple-system-sol-card{ background:#fff; border:2px solid var(--ink); border-radius:14px; padding:2vh 1.6vw; max-width:88vw; max-height:78vh;
    box-shadow:0 10px 40px rgba(15,23,42,.12); display:flex; flex-direction:column; gap:1vh; }
  .simple-system-sol-body{ display:flex; gap:1.6vw; align-items:flex-start; min-height:0; }
  .simple-system-sol-body img{ max-height:58vh; max-width:40vw; object-fit:contain; }
  .simple-system-code, .simple-system-out{ margin:0; font-family:Menlo, Consolas, monospace; font-size:clamp(.8rem, 1.15vw, 1.1rem); line-height:1.4; white-space:pre; }
  .simple-system-code{ background:#f8fafc; border:1px solid var(--line); border-radius:8px; padding:1vh 1vw; }
  .simple-system-out{ padding:.8vh 1vw; color:var(--ink); border-left:3px solid var(--line); margin-top:1vh; }
</style>`;
const yourTurn = (n, title, cues, say) => st(`
  <h1 class="t">Your turn ${n}</h1>
  <div class="simple-system-turn">
    <div class="question b" data-step="1">${title}</div>
    <ul class="frag">${cues.map(c => `<li class="b" data-step="2">${c}</li>`).join('')}</ul>
    <a class="simple-system-open b" data-step="3" href="${turnLink(n)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">Open Your turn ${n} in Colab ↗</a>
  </div>
  <style>
    .simple-system-turn{ margin:auto 0; display:flex; flex-direction:column; gap:3vh; }
    .simple-system-open{ align-self:flex-start; border:3px solid var(--ink); border-radius:999px; padding:1.4vh 2vw;
      font-weight:700; font-size:clamp(1.2rem, 2vw, 1.8rem); color:var(--ink); text-decoration:none; }
    .simple-system-reveal{ text-decoration:none; color:var(--ink); top:auto !important; bottom:1.2vh; padding:.8vh 1.2vw; }
  </style>
`, { notes: [`(draft) Your turn ${n}.`, `(draft) ${say[0]}`, `(draft) ${say[1]}`, `(draft) ${say[2]}`] });

st(`
  <h1 class="t">A simple vision system</h1>
  <div class="label simple-system-outcome"><b>In the lab, you will</b> · recover the 3D shape of a simple scene from one image, by writing its assumptions as equations</div>
  <div class="simple-system-split">
    <div class="tile b" data-step="1"><div class="im"><img src="assets/simple-system/world.png" alt=""></div></div>
    <div class="b" data-step="2">
      <div class="question">Can we recover its 3D shape from this one image?</div>
      <div class="simple-system-nbs">
        <a class="simple-system-nb" href="${NB}" target="_blank" rel="noopener" onclick="event.stopPropagation()"><span class="label">For students</span><b>Open the lab in Colab ↗</b></a>
        ${TEACHER_NB ? `<a class="simple-system-nb simple-system-nb-t" href="${TEACHER_NB}" target="_blank" rel="noopener" onclick="event.stopPropagation()"><span class="label">For teachers (private)</span><b>Teacher copy, with solutions ↗</b></a>` : ''}
      </div>
    </div>
  </div>
  ${cite('After Chapter 2, A Simple Vision System, in Torralba, Isola &amp; Freeman, Foundations of Computer Vision')}
  <style>
.simple-system-outcome{ color:var(--mute); } .simple-system-outcome b{ color:var(--ink); }
    .simple-system-split{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1.2fr 1fr; gap:4vw; align-items:center; }
    .simple-system-split .im{ background:#fff; }
    .simple-system-nbs{ margin-top:3vh; display:flex; flex-direction:column; gap:1.4vh; }
    .simple-system-nb{ align-self:flex-start; border:3px solid var(--ink); border-radius:14px; padding:1.2vh 1.4vw; color:var(--ink); text-decoration:none;
      display:flex; flex-direction:column; gap:.2vh; }
    .simple-system-nb b{ font-size:clamp(1.15rem, 1.8vw, 1.6rem); }
    .simple-system-nb-t{ border-style:dashed; }
    .simple-system-split .im img{ object-fit:contain; }
    .simple-system-go{ position:absolute; right:6vw; top:9vh; border:2px solid var(--ink); border-radius:14px; padding:1.4vh 1.4vw;
      display:flex; flex-direction:column; gap:.4vh; min-width:13vw; }
    .simple-system-go b{ font-size:clamp(1.3rem, 2vw, 1.9rem); }
  </style>
`, { notes: [
  "(draft) Now we build something: a simple vision system, from Chapter 2 of the book. In this lab, you will recover the 3D shape of a simple scene from one image, by writing its assumptions as equations.",
  "(draft) Here is our world, as the camera sees it: a white floor, and colored boxes standing on it.",
  "(draft) The question: from this one image, can we recover the 3D shape of the scene? Open the notebook in Colab and run the setup. We go back and forth: an idea here, then you run it there."
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

yourTurn(1, 'Two different 3D points, one pixel', ['Write the projection: y = cos θ · Y − sin θ · Z', 'Find a different 3D point that lands on the same pixel'], [
  'Two different 3D points that land on exactly the same pixel. Can you find them?',
  'In the notebook, first write the projection: y equals cos theta times Y, minus sin theta times Z. Then find a second 3D point that lands on the same pixel as the first. Hint: raise it a little, and change its depth to make up for it.',
  'Open Your turn 1 in Colab, and take a few minutes. Then we come back together.']);

{ // What the image throws away: the notebook's two points (section 1), drawn from the side
  const th = 35 * Math.PI / 180, Z2 = 10 * Math.cos(th) / Math.sin(th);
  const px = Z => 60 + Z * 6, py = Y => 470 - Y * 6;                 // side view: Z to the right, Y up (scaled so the camera fits)
  const ray = Y0 => [[-8, Y0 - 8 * Math.tan(th)], [52, Y0 + 52 * Math.tan(th)]];   // a line of constant image y
  const line = ([[za, ya], [zb, yb]], c) => `<line x1="${px(za)}" y1="${py(ya)}" x2="${px(zb)}" y2="${py(yb)}" class="${c}"/>`;
  const im = [52, 20 + 52 * Math.tan(th)];                             // where the ray meets the image plane
  const ux = -Math.sin(th), uy = Math.cos(th);                          // image plane direction (perpendicular)
  const plane = `<line x1="${px(im[0] - 10 * ux)}" y1="${py(im[1] - 10 * uy)}" x2="${px(im[0] + 10 * ux)}" y2="${py(im[1] + 10 * uy)}" class="simple-system-plane"/>`;
  const dot = (Z, Y, r = 7) => `<circle cx="${px(Z)}" cy="${py(Y)}" r="${r}"/>`;
  /* the camera (our eye) sits behind the image plane, looking back down the lines of sight (Fernanda, 2026-11-03) */
  const cam = [im[0] + 10 * Math.cos(th), im[1] + 10 * Math.sin(th)];
  const camera = `<g transform="translate(${px(cam[0])} ${py(cam[1])}) rotate(${-35})" class="simple-system-cam">
    <rect x="-4" y="-17" width="46" height="34" rx="6"/><path d="M-4,-10 L-20,-16 L-20,16 L-4,10 Z"/><circle cx="25" cy="-17" r="5"/></g>`;
  const box = (z0, z1, h, cls) => `<rect x="${px(z0)}" y="${py(h)}" width="${px(z1) - px(z0)}" height="${py(0) - py(h)}" class="${cls}"/>`;
  st(`
  <h1 class="t">What the image throws away</h1>
  <div class="simple-system-steps">
    <div class="simple-system-left">
      <ul class="frag">
        <li class="b" data-step="1">Point 1 lands on one pixel</li>
        <li class="b" data-step="2">Point 2, higher and nearer the camera: the same pixel</li>
        <li class="b" data-step="3">Every point on this line: the same pixel</li>
        <li class="b" data-step="4">One image is not enough: we must assume</li>
      </ul>
      ${ledger(0, {0: 1})}
    </div>
    <svg class="simple-system-ray" viewBox="0 0 560 500">
      <defs><marker id="simple-system-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#0f172a"/></marker></defs>
      <line x1="20" y1="470" x2="540" y2="470" class="simple-system-floor"/>
      <text x="540" y="492" text-anchor="end">Z, toward the camera</text>
      <line x1="60" y1="470" x2="60" y2="40" class="simple-system-axis"/>
      <text x="68" y="40">Y, height</text>
      <text x="20" y="492">floor</text>
      ${[-20, 0, 20, 40, 60].map(Y0 => line(ray(Y0), 'simple-system-faint')).join('')}
      ${plane}<text x="${px(im[0] + 10 * ux) - 8}" y="${py(im[1] + 10 * uy) + 4}" text-anchor="end">image</text>
      ${camera}<text x="${px(cam[0]) - 30}" y="${py(cam[1]) - 34}" class="simple-system-camlab">camera (our eye)</text>
      <g class="b" data-step="1">${box(-6, 0, 20, 'simple-system-box')}<text x="${px(-3)}" y="${py(10)}" text-anchor="middle">box</text>
        ${line([[0, 20], im], 'simple-system-ink simple-system-light')}${dot(0, 20)}
        <text x="${px(0) + 12}" y="${py(20) + 24}">point 1: height 20, depth 0</text>
        <g class="simple-system-pix">${dot(im[0], im[1], 9)}</g>
        <text x="${px(im[0]) - 18}" y="${py(im[1]) + 30}" text-anchor="end">y = 16.38</text></g>
      <g class="b" data-step="2">${box(Z2 - 6, Z2, 30, 'simple-system-box2')}<text x="${px(Z2 - 3)}" y="${py(4)}" text-anchor="middle">or this box?</text>
        ${dot(Z2, 30)}
        <text x="${px(Z2) + 12}" y="${py(30) + 24}">point 2: height 30, ${Z2.toFixed(2)} nearer</text>
        <text x="${px(im[0]) - 18}" y="${py(im[1]) + 50}" text-anchor="end">y = 16.38 too</text></g>
      <g class="b" data-step="3">${line(ray(20), 'simple-system-thick')}</g>
    </svg>
  </div>
  ${solution(1)}${SOL_CSS}
  <style>
    .simple-system-ray{ width:100%; height:100%; min-height:0; }
    .simple-system-ray text{ font-size:15px; fill:var(--ink); font-family:var(--font); paint-order:stroke; stroke:#fff; stroke-width:5px; stroke-linejoin:round; }
    .simple-system-ray circle{ fill:var(--ink); }
    .simple-system-ray .simple-system-floor{ stroke:var(--ink); stroke-width:3; }
    .simple-system-ray .simple-system-axis{ stroke:var(--mute); stroke-width:1.5; }
    .simple-system-ray .simple-system-faint{ stroke:var(--line); stroke-width:1.5; stroke-dasharray:4 5; }
    .simple-system-ray .simple-system-plane{ stroke:var(--ink); stroke-width:5; }
    .simple-system-ray .simple-system-ink{ stroke:var(--ink); stroke-width:2; stroke-dasharray:6 5; }
    .simple-system-ray .simple-system-thick{ stroke:var(--ink); stroke-width:5; opacity:.35; }
    .simple-system-ray .simple-system-pix circle{ fill:var(--bg); stroke:var(--ink); stroke-width:3; }
    .simple-system-ray .simple-system-cam rect, .simple-system-ray .simple-system-cam path{ fill:#e2e8f0; stroke:var(--ink); stroke-width:2.5; }
    .simple-system-ray .simple-system-cam circle{ fill:var(--ink); }
    .simple-system-ray .simple-system-camlab{ font-weight:700; }
    .simple-system-ray .simple-system-light{ marker-end:url(#simple-system-arrow); }
    .simple-system-ray .simple-system-box{ fill:#f1f5f9; stroke:var(--ink); stroke-width:2; }
    .simple-system-ray .simple-system-box2{ fill:none; stroke:var(--ink); stroke-width:2; stroke-dasharray:6 5; }
  </style>
`, { notes: [
  "(draft) Let's come back together. What does the image throw away?",
  "(draft) Here is the camera, our eye, up and to the right, looking down at the floor at an angle theta of 35 degrees. Light travels from the scene to the camera along these parallel lines of sight, and hits the image plane just in front of it. Take the corner of this box: point 1, at height 20 and depth 0. Its image row is y equals cos theta times Y, minus sin theta times Z: 16.38. That projection is our first assumption, about the camera.",
  "(draft) Now point 2: ten units higher, and 14.28 nearer the camera. It could be the corner of a different, taller box. It lands on exactly the same pixel: y equals 16.38 again. These are the two points you found in Your turn 1.",
  "(draft) And it's not just two points: every point on this line of sight lands on the same pixel. Height and depth get mixed into one number.",
  "(draft) So the image alone cannot tell us where things are: the problem is ill-posed. To recover 3D, we have to add assumptions about the world. We'll collect them in this list as we go.",
  "(draft) And here is the solution: the formula for y, and the second point, ten units higher and 14.28 nearer the camera. Both print y equals 16.38."
]});
}

yourTurn(2, 'Where does the image change?', ['Each pixel minus its left neighbor', 'One subtraction of two shifted copies of the image'], [
  'Edges are where the image changes. Can you find them?',
  'In the notebook, compute the horizontal difference: every pixel minus its left neighbor. With NumPy you can do it for the whole image at once, by subtracting two copies of the image shifted by one column.',
  'Open Your turn 2 in Colab, run section 2 first, and take a few minutes. Then we come back together.']);

st(`
  <h1 class="t">From image to edges</h1>
  ${steps([
    ['The image is an array: rows × columns × 3', 'gray.png'],
    ['Edges: differences between neighboring pixels', 'dx.png'],
    ['Strong differences become edge pixels', 'edge-pixels.png'],
  ], ledger(1))}
  ${solution(2)}${SOL_CSS}
`, { notes: [
  "(draft) Let's come back together: from the image to edges.",
  "(draft) To the computer the image is an array: rows, columns, and three color values. We average the colors to get brightness. This is the grayscale image you get in section 2.",
  "(draft) An edge is where brightness changes fast, and with pixels a derivative is just the difference between neighbors: one subtraction of two shifted copies of the image. Red, brightness goes down to the right; blue, it goes up; white, no change. Edges that run left to right nearly vanish here: they need the vertical derivative.",
  "(draft) Combine both derivatives into an edge strength, keep the pixels above a threshold you choose, and you get the edge pixels. Too low and you get noise; too high and you lose the faint edges between two faces of the same box.",
  "(draft) And here is the solution to Your turn 2: one line, the image without its first column minus the image without its last column. The result has one column fewer than the image."
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
  ${go('Sections 3–7 · homework')}
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

// Priors and the world simulator, back at Fernanda's request (2026-11-03), as they were before b1b9d92.
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
