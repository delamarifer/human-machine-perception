/* PART: today. Owner: Fernanda (see README.md). Outline slides 21-24.
   (Outline slide 17, "foreshadow that this is a project-based course", lives in the notes here
   and at the end of can-computers. Outline slide 23, the action plan, is in TODO.md: it is
   the to-do list for building this class, not a slide for students.) */
{
section('Today');

st(`
  <h1 class="t">Goals for today</h1>
  <div class="flow" style="margin:auto 8vw">
    <div class="step b" data-step="1"><b>Project intro</b><span class="label">what you will build</span></div>
    <div class="arrow b" data-step="2">→</div>
    <div class="step b" data-step="2"><b>Code setup + lab</b><span class="label">get running today</span></div>
  </div>
`, { notes: [
  "(draft) For the rest of today, two goals.",
  "(draft) First, an introduction to the project. This is a project-based course: everything we cover feeds into something you build.",
  "(draft) Second, getting your code set up, and starting the first lab."
]});

/* LAB: a simple vision system. Goes with notebooks/day01-lab-simple-vision-system.ipynb, which follows
   Torralba, Isola & Freeman, Foundations of Computer Vision, Ch. 2. Figures from Fernanda's
   "Untitled presentation (1).pptx" (2026-10-28), boxes-world figures only: no personal photos.
   Five slides, in the order of the notebook: world and goal, projection, pixels to cues, equations, results. */
const LAB_CITE = cite('Source: Torralba, Isola &amp; Freeman, <i>Foundations of Computer Vision</i>, Ch. 2');
const labPanel = (src, label, step) => `<div class="today-panel b" data-step="${step}">
  <img src="assets/today/${src}" alt=""><div class="label">${label}</div></div>`;
st(`
  <style>
    .today-row{ flex:1 1 auto; min-height:0; display:grid; gap:2vh 3vw; align-items:center; }
    .today-panel{ min-height:0; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:1vh; }
    .today-panel img{ max-width:100%; min-height:0; max-height:100%; object-fit:contain; display:block; }
    .today-panel .label{ text-align:center; }
    .today-eq{ font-family:'Cambria Math', 'STIX Two Math', Georgia, serif; font-size:clamp(1.6rem, 2.6vw, 2.4rem); text-align:center; }
    .today-rules{ display:grid; grid-template-columns:auto auto auto; gap:2.2vh 3vw; margin:auto; align-items:baseline; }
    .today-rules .b{ display:contents; }
    .today-rules .b > *{ opacity:0; transition:opacity .6s ease; white-space:nowrap; }
    .today-rules .b.shown > *{ opacity:1; }
    .today-row{ transition:opacity .9s ease, filter .9s ease; }
    .stage:has(.today-pop.shown) .today-row{ opacity:.22; filter:blur(2px); }
  </style>
  <h1 class="t">Lab: a simple vision system</h1>
  <div class="today-row" style="grid-template-columns:1.2fr 1fr">
    ${labPanel('lab-world.png', 'A simple world: colored boxes on a white floor', 1)}
    <div class="statement b" data-step="2">Goal: recover the 3D shape of the scene from one image</div>
  </div>
  ${LAB_CITE}
`, { notes: [
  "(draft) Now you will build a vision system yourself, for a deliberately simple world.",
  "(draft) Our world: a white floor, and a few boxes of colored paper standing on it. Every face is flat, and every edge is vertical or horizontal.",
  "(draft) The goal: from one image, recover the 3D shape of the scene."
]});

st(`
  <h1 class="t">How the world becomes an image</h1>
  <div class="today-row" style="grid-template-columns:1.1fr 1fr">
    ${labPanel('lab-camera.png', 'Parallel projection, camera tilted down by θ', 1)}
    <div style="display:flex;flex-direction:column;gap:5vh">
      <div class="today-eq b" data-step="2"><i>x</i> = <i>X</i><br><i>y</i> = cos(<i>θ</i>) <i>Y</i> − sin(<i>θ</i>) <i>Z</i></div>
      <div class="lead b" data-step="3" style="text-align:center">Height <i>Y</i> and depth <i>Z</i> mix into one number: ill-posed</div>
    </div>
  </div>
  ${LAB_CITE}
`, { notes: [
  "(draft) First, how this world becomes an image.",
  "(draft) The camera uses parallel projection: light rays reach it in parallel, so objects don't shrink with distance. It is tilted down by an angle theta.",
  "(draft) A point at X, Y, Z lands in the image at x equals X, and y equals cos theta times Y minus sin theta times Z.",
  "(draft) The world has three coordinates and the image has two. Height and depth get mixed into the single number y: the same ill-posed problem we saw with the line drawing."
]});

st(`
  <h1 class="t">From pixels to cues</h1>
  <div class="today-row" style="grid-template-columns:repeat(4, 1fr)">
    ${labPanel('lab-image-surface.png', 'The image: numbers <i>I</i>(<i>x</i>, <i>y</i>)', 1)}
    ${labPanel('lab-edges.png', 'Edges: where <i>I</i> changes', 2)}
    ${labPanel('lab-figure-ground.png', 'Figure / ground', 3)}
    <div class="today-panel b" data-step="4" style="gap:1.5vh">
      <img src="assets/today/lab-occlusion-edges.png" alt="" style="max-height:40%">
      <img src="assets/today/lab-contact-edges.png" alt="" style="max-height:40%">
      <div class="label">Occlusion edges (top), contact edges (bottom)</div>
    </div>
  </div>
  ${LAB_CITE}
`, { notes: [
  "(draft) From the image, the system pulls out a few cues.",
  "(draft) The image is just an array of numbers: a brightness at every pixel, which we can draw as a surface.",
  "(draft) Edges are where the brightness changes quickly from one pixel to the next: the image gradient, computed as differences between neighbors.",
  "(draft) Figure and ground: the floor is white and the boxes are colored, so we can tell them apart pixel by pixel.",
  "(draft) Scanning down the image, going from floor to box is an occlusion edge: the box is in front. Going from box to floor is a contact edge: the box touches the floor, so its height there is zero."
]});

st(`
  <h1 class="t">Assumptions become equations</h1>
  <div class="today-rules lead">
    <div class="b" data-step="1"><span>Floor and contact edges</span><span>objects rest on a flat floor</span><span class="today-eq"><i>Y</i> = 0</span></div>
    <div class="b" data-step="2"><span>Vertical edges</span><span>vertical in 3D (generic view)</span><span class="today-eq">∂<i>Y</i>/∂<i>y</i> = 1/cos(<i>θ</i>)</span></div>
    <div class="b" data-step="3"><span>Horizontal edges</span><span>horizontal in 3D</span><span class="today-eq">∂<i>Y</i>/∂<i>t</i> = 0</span></div>
    <div class="b" data-step="4"><span>Inside a face</span><span>faces are flat</span><span class="today-eq">second derivatives of <i>Y</i> = 0</span></div>
  </div>
  <div class="statement center b" data-step="5">Least squares: <span class="today-eq"><i>A</i> <i>Y</i> = <i>b</i></span></div>
  ${LAB_CITE}
`, { notes: [
  "(draft) Now each assumption becomes an equation about the unknown height Y of every pixel.",
  "(draft) On the floor, and on contact edges, the height is zero: objects rest on a flat floor.",
  "(draft) On vertical edges, by the generic view assumption, the edge is vertical in 3D: going up one row in the image, Y grows by one over cos theta.",
  "(draft) On horizontal edges, Y does not change as we walk along the edge.",
  "(draft) Inside a face, where there are no edges, we assume the face is flat: the second derivatives of Y are zero. This is how information spreads from the edges into the plain regions.",
  "(draft) All of these are linear in Y, so we stack them into one system, A Y equals b, and solve it with least squares."
]});

st(`
  <h1 class="t">Did it work?</h1>
  <div class="today-row" style="grid-template-columns:1fr">
    ${labPanel('lab-new-views.png', 'The recovered 3D, seen from viewpoints the camera never had', 1)}
  </div>
  <div class="popquote today-pop b" data-step="2" style="position:absolute;left:50%;top:55%;translate:-50% -50%;width:80vw">Outside its world, the system can be confidently wrong</div>
  ${LAB_CITE}
`, { notes: [
  "(draft) Did it work?",
  "(draft) Here is the recovered 3D shape, seen from viewpoints the camera never had. It works well, because this world obeys every assumption we made.",
  "(draft) But in the lab you will also break those assumptions, for example with a box floating above the floor. Nothing in the image says it floats, so the system puts it on the floor, confidently and wrongly. The rest of the course swaps hand-written assumptions for ones learned from data, and the questions stay the same: what does the system assume, and what happens when the world disagrees?"
]});

st(`
  <h1 class="t">Homework</h1>
  <ul class="frag">
    <li class="b">Finish the in-class lab</li>
    <li class="b">End of the week: problem set</li>
    <li class="b">Find an application of today's ideas</li>
    <li class="b">Optional: NumPy coding practice</li>
  </ul>
`, { notes: [
  "(draft) Homework for this week.",
  "(draft) First, finish the lab we start in class.",
  "(draft) At the end of the week, a problem set that drives the concepts home.",
  "(draft) For example: find an application, an applied version of the concepts from class.",
  "(draft) And optionally, some coding practice with NumPy."
]});
}
