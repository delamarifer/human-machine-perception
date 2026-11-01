/* PART: history (Day 1). Theories from Foundations of Computer Vision, ch. 1.3,
   https://visionbook.mit.edu/taxonomy.html
   Portraits and the Gestalt diagram are public domain. The other pictures are class diagrams. */
{
section('History');

function idea(title, img, cap, mean, why, notes) {
  st(`
    <h1 class="t">${title}</h1>
    <div class="history-row">
      <figure class="b" data-step="1">
        <img src="assets/history/${img}" alt="">
        <figcaption class="label">${cap}</figcaption>
      </figure>
      <div>
        <p class="lead b" data-step="2">${mean}</p>
        <p class="b" data-step="3">${why}</p>
      </div>
    </div>
    <style>
      .history-row{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1fr 1.15fr; gap:4vw; align-items:center; }
      .history-row figure{ margin:0; min-height:0; display:flex; flex-direction:column; gap:1vh; }
      .history-row img{ width:100%; max-height:52vh; object-fit:contain; background:#f8fafc; }
      .history-row p{ margin:0 0 2vh; }
    </style>
  `, { notes });
}

idea(
  'Copies in, or rays out',
  'rays.svg',
  'Class diagram, not a historical figure',
  'How does the world reach the eye?',
  'Tomorrow that eye is an array of numbers.',
  [
    '(draft) Two thousand years of arguing about seeing, from chapter 1.3 of the vision book. A brochure.',
    '(draft) The picture is a class diagram. Left: intromission, copies of objects come into the eye. Right: extramission, the eye sends rays out. Euclid gave those rays a geometry.',
    '(draft) The question is already the course question. How does a picture of the world get made?',
    '(draft) Day 2 begins after that question is settled enough to store the picture as pixels. The array is the modern sensor. It is not yet an understanding of the scene.'
  ]
);

idea(
  'Light from the world is enough',
  'ibn-al-haytham.jpg',
  'Imagined portrait, Selenographia, 1647. Public domain.',
  'Light from objects is enough.',
  'A picture can form and still not be the scene.',
  [
    '(draft) Hasan Ibn al-Haytham, Latinized Alhazen, late tenth century. The portrait is an imagined engraving from 1647, not a sitting.',
    '(draft) He rejected rays leaving the eye. Light from objects is enough to explain sight. Optics becomes something you can test.',
    '(draft) That is why a dark room with a small hole shows a picture. Light makes the picture.',
    '(draft) The picture is not the world. Day 2 tries to recover boxes from one image, and only by adding assumptions. The pixels alone do not contain the 3D scene.'
  ]
);

idea(
  'Perception is inference',
  'helmholtz.jpg',
  'Hermann von Helmholtz. Public domain photograph.',
  'The mind infers the object from the light.',
  'Day 3 does this with a network. The name can be wrong.',
  [
    '(draft) Hermann von Helmholtz, nineteenth century. With Young, three receptor types in the eye. And a theory of perception.',
    '(draft) Sensations are not yet perceptions. The viewer infers the object most likely to have produced them. He called ordinary seeing an unconscious conclusion.',
    '(draft) Press on a closed eye and you see light. The system concludes "light" from a cause that was not light. Seeing is an explanation, not a copy.',
    '(draft) The ResNet on Day 3 is an inference machine. On the elephant statue it concludes triceratops. The percentage is how the list split, not proof that the conclusion is the scene.'
  ]
);

idea(
  'Parts become objects',
  'gestalt-proximity.svg',
  'Proximity. Public-domain diagram.',
  'Marks get grouped into objects.',
  'Day 2 must decide which edges are one box.',
  [
    '(draft) Gestalt psychology, from Wertheimer around 1912. Perceptual organization: colors and lines become objects.',
    '(draft) This diagram is proximity. Marks that sit together are seen as a group. Similarity and closure are other cues. They are not equally strong, and the early theory did not say how they compete.',
    '(draft) A whole is not a list of pixels. Something has to join them.',
    '(draft) In the boxes lab, figure and ground is this problem. Which region is the object, which edge is contact, which edge is one thing hiding another. On Day 3 the cube is grouped as chest. The grouping ran. The object is wrong.'
  ]
);

idea(
  'The world already specifies the use',
  'path.svg',
  'Class diagram.',
  'A path affords walking.',
  'Our models name a thing. They do not say what you can do.',
  [
    '(draft) James J. Gibson. He thought the useful case was an animal moving through a layout, not a camera taking one controlled picture.',
    '(draft) The diagram is ours. A path on the ground. In his terms, the path affords locomotion. An obstacle affords collision. The information is in the optic array, and perception can pick it up directly.',
    '(draft) This disagrees with Helmholtz. Gibson does not need a hidden conclusion if the array is already specific.',
    '(draft) Hold the disagreement. Day 2 and Day 3 both answer a question we chose: recover boxes, or name an ImageNet category. Neither answers "what does this place let me do?"'
  ]
);

idea(
  'Separate the task from the machine',
  'levels.svg',
  'Class diagram of Marr\'s three levels.',
  'Separate the task, the representation, and the machine.',
  'Day 2 writes the task. Day 3 runs a trained machine.',
  [
    '(draft) David Marr, Vision, 1982, as chapter 1.3 tells it. Influenced by computer vision and by neuroscience.',
    '(draft) Three levels, and they can be studied apart. Computational theory: what is the task and why? For vision, derive useful properties of the world from images. Representation: which facts are made explicit? Hardware: the eye, the brain, or a computer.',
    '(draft) An algorithm is the middle. The same task can be implemented more than one way.',
    '(draft) Day 2 is the task written down: projection, edges, assumptions, a 3D answer. Day 3 does not derive that theory. It runs a pretrained network. Marr is how we tell those two days apart.'
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
