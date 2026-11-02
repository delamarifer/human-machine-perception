/* PART: history (Day 1). Theories from Foundations of Computer Vision, ch. 1.3,
   https://visionbook.mit.edu/taxonomy.html
   Portraits and the Gestalt diagram are public domain. The other pictures are class diagrams. */
{
section('History');

function idea(title, img, cap, who, direction, mechanism, legacy, notes) {
  st(`
    <h1 class="t">${title}</h1>
    <div class="history-row">
      <figure class="b" data-step="1">
        <img src="assets/history/${img}" alt="">
        <figcaption class="label">${cap}</figcaption>
      </figure>
      <div class="history-facts">
        <p class="history-who b" data-step="2">${who}</p>
        <p class="label b" data-step="2">${direction}</p>
        <p class="lead b" data-step="3">${mechanism}</p>
        <p class="b" data-step="4">${legacy}</p>
      </div>
    </div>
    <style>
      .history-row{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1fr 1.15fr; gap:4vw; align-items:center; }
      .history-row figure{ margin:0; min-height:0; display:flex; flex-direction:column; gap:1vh; }
      .history-row img{ width:100%; max-height:46vh; object-fit:contain; background:#f8fafc; }
      .history-facts p{ margin:0 0 1.8vh; }
      .history-who{ font-size:clamp(1.15rem, 1.7vw, 1.45rem); letter-spacing:.01em; margin-bottom:.4vh; }
    </style>
  `, { notes });
}

idea(
  'Early intromission',
  'intromission.svg',
  'Class diagram',
  'Ancient atomists · c. 400–50 BCE',
  'Object to eye',
  'Objects shed tiny copies. Those copies enter the pupil.',
  'The eye receives something from the world. It does not shine on the world.',
  [
    '(draft) First theory, and the first direction. Object to eye. Not one named author. The ancient atomists, roughly 400 to 50 BCE. The picture is a class diagram.',
    '(draft) Small copies travel from the object into the eye.',
    '(draft) Ancient atomists. Direction: object to eye.',
    '(draft) They called the copies eidola, tiny skins the object gives off. The eye is a receiver.',
    '(draft) This is the ancestor of treating sight as something physical that arrives. It is not yet a camera, and it is not modern physics.'
  ]
);

idea(
  'Extramission',
  'extramission.svg',
  'Class diagram',
  'Euclid · c. 300 BCE',
  'Eye to object',
  'The eye sends rays out. The rays touch objects and measure distance.',
  'Perspective drawing and geometric optics still use this geometry.',
  [
    '(draft) Second theory. The direction reverses. Euclid, around 300 BCE. Another class diagram.',
    '(draft) Rays leave the eye and reach the object.',
    '(draft) Euclid. Direction: eye to object. This is extramission, and only extramission.',
    '(draft) The rays are a measuring tool. They give angles and distance. That is the first mathematical account of perspective.',
    '(draft) We still draw with that geometry. The picture on a page, and a camera model, inherit the angles. The rays do not actually leave the eye. The next slide is the correction.'
  ]
);

idea(
  'Mathematical intromission',
  'ibn-al-haytham.jpg',
  'Imagined portrait, 1647. Public domain.',
  'Ibn al-Haytham · c. 1011',
  'Object to eye',
  'Light from each point of an object enters the eye. Straight rays make the clear image.',
  'A dark room with a small hole shows the light coming in. Optics, and the camera, follow from that.',
  [
    '(draft) Hasan Ibn al-Haytham, Book of Optics, around 1011. The face is an imagined engraving from 1647, not a sitting.',
    '(draft) The portrait. Say that it is imagined.',
    '(draft) Ibn al-Haytham. Direction: object to eye, again. This time with geometry.',
    '(draft) Light reflects from every point of an object into the eye. The rays that come in straight are the ones that form a clear image. He rejected rays leaving the eye.',
    '(draft) A dark room with a small hole shows the light coming in and forming a picture. He used that, a camera obscura, as the demonstration. Do not say he invented it. The picture still is not the scene. Tomorrow we only recover boxes by adding assumptions.'
  ]
);

idea(
  'Unconscious inference',
  'helmholtz.jpg',
  'Public domain photograph.',
  'Hermann von Helmholtz · 1867',
  'Brain, from the retinal image',
  'The brain uses what it already knows to guess the object that made the light.',
  'Seeing is a best guess. A generative model does that too, and the guess can be wrong.',
  [
    '(draft) Hermann von Helmholtz, 1867, the handbook of physiological optics. The direction is no longer eye versus object. The brain builds the percept.',
    '(draft) The photograph.',
    '(draft) Helmholtz, 1867.',
    '(draft) The retina delivers a messy signal. The brain applies past experience and picks the best guess. He called ordinary seeing an unconscious conclusion. Press on a closed eye and you see light. The guess was wrong about the cause.',
    '(draft) Predictive processing, and a generative model, are this idea in a new machine. On Day 3 the network can name the elephant statue a triceratops. The percentage is the guess, not proof.'
  ]
);

idea(
  'Gestalt theory',
  'gestalt-proximity.svg',
  'Proximity. Public-domain diagram.',
  'Max Wertheimer · 1912',
  'Brain, grouping the parts',
  'The mind groups marks into wholes, using laws such as proximity, before it lists the parts.',
  'Layout, interface design, and pattern recognition still use these grouping laws.',
  [
    '(draft) Max Wertheimer, 1912. Gestalt theory. The diagram is proximity, and it is public domain.',
    '(draft) Dots that sit near each other are seen as one group.',
    '(draft) Wertheimer, 1912. Direction: the brain organizes the input.',
    '(draft) Raw marks are not yet objects. The mind applies grouping laws: proximity, continuity, closure. The whole is available before the parts are listed. The early theory did not say how the laws compete.',
    '(draft) A vision system still has to decide which edges are one thing. Tomorrow that is figure and ground. On Day 3 the cube is grouped as a chest. The grouping ran. The object is wrong.'
  ]
);

idea(
  'Ecological psychology',
  'path.svg',
  'Class diagram.',
  'James J. Gibson · 1979',
  'Environment and body, both ways',
  'A moving observer picks up structure in the light. A path affords walking. An obstacle affords collision.',
  'He rejected the hidden guess. Navigation and a robot that has to act are closer to this question.',
  [
    '(draft) James J. Gibson, 1979. The diagram is ours: a path on the ground.',
    '(draft) The path. In his terms it affords locomotion.',
    '(draft) Gibson, 1979. Direction: environment and body, together. Not a one-way ray.',
    '(draft) As you move, the optic array changes in a structured way, and that structure specifies the layout. You do not need Helmholtz\'s hidden conclusion if the light already says what the place lets you do.',
    '(draft) Hold the disagreement. A car that must drive, or a robot that must reach, needs the use of the scene, not only a name. Tomorrow we still recover boxes. That is a task we chose, not an affordance.'
  ]
);

idea(
  'Computational vision',
  'levels.svg',
  'Class diagram of the three levels.',
  'David Marr · 1982',
  'From the image to a 3D model',
  'Three levels: what the task is, which algorithm does it, and which machine runs it.',
  'The same task can run on an eye or on a computer. That is how Day 2 and Day 3 differ.',
  [
    '(draft) David Marr, the book Vision, 1982. The drawing is a class diagram. The book is 1982, after his death in 1980.',
    '(draft) Three levels, stacked, and they can be studied apart.',
    '(draft) Marr, 1982. Direction: from the image, through a computation, to a model of the shape.',
    '(draft) Computational: what is the task, and why. Algorithm: which facts are made explicit, and by what steps. Implementation: the eye, the brain, or a computer. Raw intensities become a 3D description. Edge finding is one of the early steps.',
    '(draft) Tomorrow writes the task: projection, edges, assumptions, boxes. The day after does not derive that theory. It runs a pretrained network. Marr is how we tell those two days apart.'
  ]
);

st(`
  <h1 class="t">Computer vision is the late chapter</h1>
  <div class="flow">
    <div class="step b" data-step="1"><b>Geometry</b><span class="label">rules about the world</span></div>
    <div class="arrow b" data-step="2">→</div>
    <div class="step b" data-step="2"><b>Designed features</b><span class="label">edges, texture</span></div>
    <div class="arrow b" data-step="3">→</div>
    <div class="step b" data-step="3"><b>Learning</b><span class="label">features from data</span></div>
  </div>
  ${cite('Torralba, Isola &amp; Freeman, <i>Foundations of Computer Vision</i>, ch. 1.3')}
`, { notes: [
  '(draft) The book then turns to computer vision. Same question, a short recent history.',
  '(draft) Geometry and written rules. A world of boxes, a camera, and equations.',
  '(draft) Then features a person designed. Edges, corners, texture. The system measures what we told it to measure.',
  '(draft) Then learning. The features come from data, not from a person writing the rule. The argument about seeing is the old part. The network is the new implementation.'
]});
}
