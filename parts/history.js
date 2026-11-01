/* PART: history (Day 1). Theories from Foundations of Computer Vision, ch. 1.3,
   https://visionbook.mit.edu/taxonomy.html
   Portraits and the Gestalt diagram are public domain. The other pictures are class diagrams. */
{
section('History');

function idea(title, img, cap, who, point, take, notes) {
  st(`
    <h1 class="t">${title}</h1>
    <div class="history-row">
      <figure class="b" data-step="1">
        <img src="assets/history/${img}" alt="">
        <figcaption class="label">${cap}</figcaption>
      </figure>
      <div class="history-facts">
        <p class="history-who b" data-step="2">${who}</p>
        <p class="lead b" data-step="3">${point}</p>
        <p class="b" data-step="4">${take}</p>
      </div>
    </div>
    <style>
      .history-row{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1fr 1.15fr; gap:4vw; align-items:center; }
      .history-row figure{ margin:0; min-height:0; display:flex; flex-direction:column; gap:1vh; }
      .history-row img{ width:100%; max-height:48vh; object-fit:contain; background:#f8fafc; }
      .history-facts p{ margin:0 0 2.2vh; }
      .history-who{ font-size:clamp(1.15rem, 1.7vw, 1.45rem); letter-spacing:.01em; }
    </style>
  `, { notes });
}

idea(
  'Copies in, or rays out',
  'rays.svg',
  'Class diagram',
  'Euclid · c. 300 BCE',
  'The eye sends rays out, and those rays have a geometry. The other story is that copies come in.',
  'Either way, the question is how a picture of the world gets made.',
  [
    '(draft) The first theory. A year, a person, the point, and why it is still our question. The picture is a class diagram, not a portrait.',
    '(draft) Left, copies of objects come into the eye. Right, rays leave the eye. Euclid, around 300 BCE, gave the outgoing rays a geometry.',
    '(draft) Euclid, around 300 BCE.',
    '(draft) Extramission: the eye sends rays out. Intromission: copies come in. Euclid is the geometry of the first story.',
    '(draft) Tomorrow the picture is an array of numbers. That array is the sensor. It is not yet the scene.'
  ]
);

idea(
  'Light from the world is enough',
  'ibn-al-haytham.jpg',
  'Imagined portrait, 1647. Public domain.',
  'Ibn al-Haytham · c. 1021',
  'Light from objects is enough. A dark room with a small hole forms a picture.',
  'A picture can form and still not be the scene.',
  [
    '(draft) Hasan Ibn al-Haytham, the Book of Optics, around 1021. The face is an imagined engraving from 1647, not a sitting.',
    '(draft) The portrait. Say that it is imagined, so nobody thinks he sat for it.',
    '(draft) Ibn al-Haytham, around 1021.',
    '(draft) He rejected rays leaving the eye. Light from objects is enough, and you can test that. A pinhole in a dark room makes a picture.',
    '(draft) The picture is still not the world. Tomorrow we recover boxes from one image only by adding assumptions. The pixels do not contain the 3D scene.'
  ]
);

idea(
  'Perception is inference',
  'helmholtz.jpg',
  'Public domain photograph.',
  'Hermann von Helmholtz · 1867',
  'The mind infers the object most likely to have made the light.',
  'The inference can be wrong. A later network can be wrong the same way.',
  [
    '(draft) Hermann von Helmholtz, 1867. With Young, three receptor types in the eye, and a theory of how seeing works.',
    '(draft) The photograph.',
    '(draft) Helmholtz, 1867.',
    '(draft) Sensations are not yet the object. The viewer infers what most likely produced them. He called ordinary seeing an unconscious conclusion. Press on a closed eye and you see light. The system concludes light from a cause that was not light.',
    '(draft) The network on Day 3 is an inference machine. On the elephant statue it concludes triceratops. The percentage is how the list split, not proof that the conclusion is the scene.'
  ]
);

idea(
  'Parts become objects',
  'gestalt-proximity.svg',
  'Proximity. Public-domain diagram.',
  'Max Wertheimer · 1912',
  'Marks that sit together are seen as one group. A whole is not a list of pixels.',
  'A vision system has to decide which edges are one thing.',
  [
    '(draft) Max Wertheimer, 1912, the start of Gestalt psychology. The diagram is proximity, and it is public domain.',
    '(draft) Dots that sit near each other are seen as a group. Similarity and closure are other cues. The early theory did not say how the cues compete.',
    '(draft) Wertheimer, 1912.',
    '(draft) Colors and lines become objects. Something has to join the parts. Proximity is the cue on screen: near marks group.',
    '(draft) Tomorrow, figure and ground is this problem. Which region is the object, which edge is contact, which edge is one thing hiding another. On Day 3 the cube is grouped as a chest. The grouping ran. The object is wrong.'
  ]
);

idea(
  'The world already specifies the use',
  'path.svg',
  'Class diagram.',
  'James J. Gibson · 1979',
  'A path affords walking. An obstacle affords collision. The layout already says what you can do.',
  'Naming a thing is not the same as knowing what it lets you do.',
  [
    '(draft) James J. Gibson, 1979. The useful case is an animal moving through a layout, not one controlled photograph. The diagram is ours.',
    '(draft) A path on the ground. In his terms it affords locomotion.',
    '(draft) Gibson, 1979.',
    '(draft) The information is in the optic array, and perception can pick it up directly. He does not need Helmholtz\'s hidden conclusion if the array is already specific.',
    '(draft) Hold the disagreement. Tomorrow we recover boxes. The day after, a network names a category. Neither answers what this place lets you do.'
  ]
);

idea(
  'Separate the task from the machine',
  'levels.svg',
  'Class diagram of the three levels.',
  'David Marr · 1982',
  'Separate the task, the representation, and the machine. The same task can run on more than one machine.',
  'One day we write the task. The next day we run a trained machine.',
  [
    '(draft) David Marr, Vision, 1982, as chapter 1.3 tells it. The drawing is a class diagram of the three levels.',
    '(draft) Three stacked levels. They can be studied apart.',
    '(draft) Marr, 1982.',
    '(draft) Computational theory: what is the task, and why? Representation: which facts are made explicit? Hardware: the eye, the brain, or a computer. An algorithm sits in the middle.',
    '(draft) Tomorrow is the task written down: projection, edges, assumptions, a 3D answer. The day after does not derive that theory. It runs a pretrained network. Marr is how we tell those two days apart.'
  ]
);

st(`
  <h1 class="t">Computer vision is the late chapter</h1>
  <div class="flow">
    <div class="step b" data-step="1"><b>Geometry</b><span class="label">Day 2</span></div>
    <div class="arrow b" data-step="2">→</div>
    <div class="step b" data-step="2"><b>Designed features</b><span class="label">edges, texture</span></div>
    <div class="arrow b" data-step="3">→</div>
    <div class="step b" data-step="3"><b>Learning</b><span class="label">Day 3</span></div>
  </div>
  ${cite('Torralba, Isola &amp; Freeman, <i>Foundations of Computer Vision</i>, ch. 1.3')}
`, { notes: [
  '(draft) The book then turns to computer vision. Same question, a short recent history.',
  '(draft) Geometry and written rules. That is tomorrow: a world of boxes and equations.',
  '(draft) Then features a person designed. Edges, corners, texture. The system measures what we told it to measure.',
  '(draft) Then learning. The features are trained. Day 3. The argument about seeing is the old part. The network is the new implementation.'
]});
}
