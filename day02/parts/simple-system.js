/* PART: simple-system (Day 2). Owner: to decide. Plan: 50-60 min, "back and forth lecturing of the simple
   system lab". Fernanda (2026-11-02): move Day 1's simple system down here, condensed, and make it full circle:
   after the 3D reconstruction, pause and ask "What do you think would give these systems a better world model?",
   then Phase 2 of the lab tests a few of their ideas.
   ACT 1 PHASE 1 (condensed notebook sections 1-6): image → edges → labels → assumptions → 3D (real output).
   ACT 2 THE PAUSE: the question, the room brainstorms.
   ACT 3 PHASE 2: four kinds of answer, each testable in the box world; the floating box as the first test.
   Figures: day02/assets/simple-system/ (made by the notebook's own code; see day02/assets/SOURCES.md).
   After Ch. 2 of Torralba, Isola & Freeman, Foundations of Computer Vision. */
{
section('Simple system lab');

const NB = 'https://colab.research.google.com/github/delamarifer/human-machine-perception/blob/main/notebooks/day01-lab-simple-vision-system.ipynb';
const go = (s) => `<div class="simple-system-go b" data-step="99"><span class="label">Notebook</span><b>${s}</b></div>`;

st(`
  <h1 class="t">A simple vision system</h1>
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
    .simple-system-split{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1.2fr 1fr; gap:4vw; align-items:center; }
    .simple-system-split .im{ background:#fff; }
    .simple-system-split .im img{ object-fit:contain; }
    .simple-system-go{ position:absolute; right:6vw; top:9vh; border:2px solid var(--ink); border-radius:14px; padding:1.4vh 1.4vw;
      display:flex; flex-direction:column; gap:.4vh; min-width:13vw; }
    .simple-system-go b{ font-size:clamp(1.3rem, 2vw, 1.9rem); }
  </style>
`, { notes: [
  "(draft) Now we build something: a simple vision system, from Chapter 2 of the book.",
  "(draft) Here is our world, as the camera sees it: a white floor, and colored boxes standing on it.",
  "(draft) The question: from this one image, can we recover the 3D shape of the scene? Open the notebook in Colab and run the setup. We go back and forth: an idea here, then you run it there.",
  "(to write) Timing."
]});

st(`
  <h1 class="t">From world to image to edges</h1>
  <ul class="frag">
    <li class="b" data-step="1">Parallel projection: height and depth mix into one image row</li>
    <li class="b" data-step="2">The image is an array: rows × columns × 3</li>
    <li class="b" data-step="3">Edges: differences between neighboring pixels</li>
  </ul>
  ${go('Sections 1–3')}
`, { notes: [
  "(draft) Step one: from the world to an image, and from the image to edges.",
  "(draft) Our camera uses parallel projection, tilted down by an angle theta. A point's image row depends on both its height and its depth: y equals cos theta times Y, minus sin theta times Z. Raise a point and push it back by the right amount, and it lands on the same pixel. That is why one image is not enough.",
  "(draft) To the computer the image is an array: rows, columns, and three color values. We average the colors to get brightness.",
  "(draft) An edge is where brightness changes fast, and with pixels a derivative is just the difference between neighbors: one subtraction of two shifted copies of the image.",
  "(draft) Run sections 1 to 3."
]});

st(`
  <h1 class="t">What each edge means</h1>
  <ul class="frag">
    <li class="b" data-step="1">Figure and ground: boxes are colored, the floor is not</li>
    <li class="b" data-step="2">Contact or occlusion: touching the floor, or hiding it</li>
    <li class="b" data-step="3">Generic view: vertical in the image means vertical in the world</li>
  </ul>
  ${go('Sections 4–5')}
`, { notes: [
  "(draft) Step two: what does each edge mean?",
  "(draft) Figure and ground. The floor is white, so its three color channels are about equal; the boxes are colored. Saturation, the largest channel minus the smallest, separates them.",
  "(draft) Where a box meets the floor, the edge is either a contact edge, the box touching the floor, or an occlusion edge, the box hiding the floor behind it. They look alike, and mean very different things in 3D.",
  "(draft) And the generic view assumption: unless the camera sits at an accidental viewpoint, edges that look vertical in the image are vertical in the world.",
  "(draft) Run sections 4 and 5."
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
      <li class="b" data-step="4"><a href="${BOOK}" target="_blank" rel="noopener" onclick="event.stopPropagation()" style="color:var(--ink)">Turn it yourself: in the notebook, or the book's demo ↗</a></li>
    </ul>
  </div>
`, { blank: false, notes: [
  "(draft) Now let's walk around to the other side.",
  "(draft) The same reconstruction, seen from behind the boxes.",
  "(draft) The back is missing. Each box is a shell with no back face, and the white patches are floor that the boxes hid from the camera. Nothing was recovered there.",
  "(draft) We only recover what the camera saw. That is the limit of one 2D image, made visible: the image never contained the back.",
  "(draft) Now turn it yourself: in section 6 of the notebook, drag the 3D view around to the back (the book's chapter has an interactive version too). Then answer the talk-it-over question: what is missing, and why?"
]});

st(`
  <div class="center">
    <div class="question" style="font-size:clamp(2.4rem,4.2vw,3.8rem)">What do you think would give these systems a better world model?</div>
    <div class="lead b" style="margin-top:5vh">Brainstorm in pairs</div>
  </div>
`, { notes: [
  "(draft) Let's pause here. This little system works because we wrote its world model by hand: a flat floor, boxes resting on it, flat faces, a generic view. And still the back is missing: you knew the back of each box was there; the system did not. So: what do you think would give these systems a better world model?",
  "(draft) Take a few minutes in pairs, then we collect your ideas on the board. (Collect them; Phase 2 tests a few.)"
]});

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
  <div class="lead b" data-step="2" style="text-align:center">Which of your ideas would fix this?</div>
  ${go('Section 7')}
`, { notes: [
  "(draft) Here is the first test, already in the notebook.",
  "(draft) A green box floating 35 units above the floor. Nothing in the image says it floats. The system assumes boxes rest on the floor, so its recovered height, in the middle, is far too low compared with the truth on the right. And it has no idea it is wrong.",
  "(draft) Which of your ideas would fix this? A better assumption? A second view? Learning?",
  "(draft) Run section 7, then try one of your ideas."
]});

st(`
  <h1 class="t">What you built</h1>
  <ul class="frag">
    <li class="b">One image is not enough: ill-posed</li>
    <li class="b">Assumptions fill the gap: a world model</li>
    <li class="b">Outside its world: confidently wrong</li>
    <li class="b">Better world models: assumed, seen, learned, or borrowed</li>
  </ul>
`, { notes: [
  "(draft) What you built today.",
  "(draft) Going from 3D to a 2D image loses a dimension, so recovering 3D from one image is ill-posed.",
  "(draft) Assumptions fill the gap. Together they are a world model, written by hand.",
  "(draft) Outside the world it was designed for, the system can be confidently wrong.",
  "(draft) And a better world model can come from better assumptions, from more data, from learning, or from a model someone else trained. The rest of the course is about the last two; the questions stay the same: what does the system assume, and what happens when the world disagrees?"
]});
}
