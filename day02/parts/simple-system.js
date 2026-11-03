/* PART: simple-system (Day 2). Owner: to decide. Plan: 50-60 min, "back and forth lecturing of the simple
   system lab". Follows notebooks/day01-lab-simple-vision-system.ipynb section by section: each slide is
   the idea at the board (click 1), then the notebook section to run (click 2). Wording from the notebook.
   After Ch. 2 of Torralba, Isola & Freeman, Foundations of Computer Vision. */
{
section('Simple system lab');

const NB = 'https://colab.research.google.com/github/delamarifer/human-machine-perception/blob/main/notebooks/day01-lab-simple-vision-system.ipynb';
const go = (n) => `<div class="simple-system-go b" data-step="2"><span class="label">Notebook</span><b>Section ${n}</b></div>`;
const sec = (n, title, cues, say) => st(`
  <h1 class="t">${n} · ${title}</h1>
  <ul class="frag b" data-step="1">${cues.map(c => `<li>${c}</li>`).join('')}</ul>
  ${go(n)}
`, { notes: [`(draft) ${say[0]}`, `(draft) ${say[1]}`, `(draft) ${say[2]}`] });

st(`
  <h1 class="t">A simple vision system</h1>
  <div class="lead b">Can we recover 3D from one image of boxes on a floor?</div>
  <ul class="frag">
    <li class="b">The idea at the board, then the notebook</li>
    <li class="b"><a href="${NB}" target="_blank" rel="noopener" onclick="event.stopPropagation()" style="color:var(--ink)">Open the notebook in Colab ↗</a></li>
  </ul>
  <div class="todo b">Minutes per section (the plan gives 50-60 in total).</div>
  ${cite('After Chapter 2, A Simple Vision System, in Torralba, Isola &amp; Freeman, Foundations of Computer Vision')}
  <style>
    .simple-system-go{ position:absolute; right:6vw; top:22vh; border:2px solid var(--ink); border-radius:14px; padding:2vh 1.6vw;
      display:flex; flex-direction:column; gap:.6vh; min-width:14vw; }
    .simple-system-go b{ font-size:clamp(1.5rem, 2.4vw, 2.2rem); }
  </style>
`, { notes: [
  "(draft) Now we build something. A simple vision system, from Chapter 2 of the book.",
  "(draft) The question: from one image of colored boxes on a floor, can we recover the 3D shape of the scene?",
  "(draft) We go back and forth: an idea at the board, then you try it in the notebook.",
  "(draft) Open the notebook in Colab now, and run section 0, the setup.",
  "(to write) Timing."
]});

sec(1, 'A simple world, and how it becomes an image',
  ['White floor, colored boxes, flat faces', 'Parallel projection, camera tilted by θ', 'x = X,  y = cos θ · Y − sin θ · Z'],
  ['A simple world, and how it becomes an image.',
   'Our world is a white floor with a few colored boxes standing on it. Every face is flat, every edge is vertical or horizontal. The camera uses parallel projection: objects do not shrink with distance, and it is tilted down by an angle theta. A point at X, Y, Z lands in the image at x equals X, and y equals cos theta times Y minus sin theta times Z. Notice: height and depth get mixed into one number.',
   'Run section 1, render the world, and try the exercise.']);

sec(2, 'The image is an array of numbers',
  ['(rows, columns, 3): red, green, blue', 'image[row, col] is one pixel; rows count down', 'Average the colors: grayscale'],
  ['The image is an array of numbers.',
   'To the computer, the image is a NumPy array: rows, columns, and three color values per pixel. Rows count down from the top. For edges we only need brightness, so we average the colors into a grayscale image.',
   'Section 2.']);

sec(3, 'Edges are where the image changes',
  ['Edge: brightness changes fast', 'Derivative = difference of neighbors', 'gray[:, 1:] − gray[:, :-1]'],
  ['Edges are where the image changes.',
   'An edge is where brightness changes quickly from one pixel to the next. That change is the derivative, and with pixels a derivative is just the difference between neighbors. In NumPy, one subtraction of two shifted copies of the image does it for every pixel at once.',
   'Section 3. Look for the edges that are hard to see.']);

sec(4, 'Figure and ground; contact and occlusion',
  ['Floor: low saturation; boxes: colored', 'Saturation = largest channel − smallest', 'Contact edges vs occlusion edges'],
  ['Figure and ground; contact and occlusion.',
   'Which pixels are floor and which are boxes? Here it is easy: the floor is white, so its three channels are about equal, low saturation; the boxes are colored. Then the edges: where a box touches the floor is a contact edge; where a box hides the floor behind it is an occlusion edge. They look alike in the image, and mean very different things in 3D.',
   'Section 4.']);

sec(5, 'Generic view',
  ['Vertical in the image → vertical in the world', 'Unless the viewpoint is accidental', 'Within 15° of vertical: label it vertical'],
  ['Generic view.',
   'Some properties survive projection. For our camera, vertical edges in 3D always look vertical in the image, and horizontal ones almost never do, unless the camera sits at a special, accidental viewpoint. Assuming it does not is the generic view assumption. So we label an edge vertical when it is within 15 degrees of vertical in the image.',
   'Section 5.']);

sec(6, 'From assumptions to 3D',
  ['Each assumption becomes an equation for the height Y', 'Floor and contact edges: Y = 0; faces are flat', 'More equations than pixels: least squares'],
  ['From assumptions to 3D.',
   'Now each assumption becomes an equation about the unknown height of every pixel. Floor pixels and contact edges are at height zero. Vertical edges grow in height as we go up. Horizontal edges keep their height. Faces are flat, which carries the information from the edges into the plain regions. That is tens of thousands of equations; they cannot all hold, so we find the heights that break them the least: least squares.',
   'Section 6: solve it, and look at your 3D world.']);

sec(7, 'When the assumptions break',
  ['A box that floats', 'Nothing in the image says it floats', 'Confidently wrong'],
  ['When the assumptions break.',
   'Here is a box that floats above the floor. Nothing in the image says it floats. Our system assumes boxes rest on the floor, so it gets the shape wrong, and it has no idea it is wrong.',
   'Section 7. Then design a world that breaks the system your own way.']);

st(`
  <h1 class="t">What you built</h1>
  <ul class="frag">
    <li class="b">3D to 2D loses a dimension: ill-posed</li>
    <li class="b">Images are arrays; edges are differences</li>
    <li class="b">Assumptions fill the gap</li>
    <li class="b">Assumptions become equations; least squares</li>
    <li class="b">Outside its world: confidently wrong</li>
  </ul>
`, { notes: [
  "(draft) What you built.",
  "(draft) Image formation: going from 3D to 2D loses a dimension, so recovering 3D from one image is ill-posed.",
  "(draft) Images are arrays, and edges come from differences between neighboring pixels.",
  "(draft) Assumptions fill the gap: a flat floor, objects resting on it, a generic view, flat faces.",
  "(draft) Inference: the assumptions become equations, and least squares finds the best compromise.",
  "(draft) And outside the world it was designed for, the system can be confidently wrong. The rest of the course swaps hand-written assumptions for ones learned from data. The questions stay the same: what does the system assume, and what happens when the world disagrees?"
]});
}
