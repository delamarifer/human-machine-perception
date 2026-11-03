/* PART: motivation (Day 2). Owner: to decide. Plan: 30 min. "Motivation for why you should take this course:
   applications; limitations; why look to humans as a source of overcoming those limitations?; why is the
   class project-based?"
   ACT 1 APPLICATIONS (one demo per slide, each mapped to the week of syllabus.html that covers it), then all of
         them on one screen: "this is what we will cover".
   ACT 2 LIMITATIONS: our own ResNet-18 run on the elephant statue (real output), VLMs are blind, Dollar Street,
         texture bias. Numbers only from the papers' abstracts.
   ACT 3 WHY HUMANS, WHY PROJECTS, then the one-photo scene as a taste of the tools.
   Demos were checked on 2026-11-02 (links answer); pick the exact clip to play in class (feedback/_day.md).
   Links open in a new tab and do not advance the deck. */
{
section('Motivation');

const link = (url, text) => `<a class="motivation-link" href="${url}" target="_blank" rel="noopener"
  onclick="event.stopPropagation()">${text} ↗</a>`;
const demo = (o) => st(`
  <h1 class="t">${o.title}</h1>
  <div class="motivation-demo b" data-step="1">
    <div class="motivation-name">${o.name}</div>
    <div class="label">${o.who}</div>
    <ul class="frag">${o.cues.map(c => `<li>${c}</li>`).join('')}</ul>
    <div>${link(o.url, o.urlText)}</div>
  </div>
  <div class="motivation-week b" data-step="2"><span class="label">In the course</span><b>Week ${o.week}</b><span class="label">${o.topic}</span></div>
  <div class="todo b" data-step="1" style="position:absolute;right:6vw;bottom:6vh;max-width:30vw">Pick the clip to play: ${o.clip}</div>
`, { notes: [`(draft) ${o.say[0]}`, `(draft) ${o.say[1]}`, `(draft) ${o.say[2]}`] });

/* A live website on a slide, to scroll through in class (Fernanda, 2026-11-02). Only sites that allow
   embedding: checked 2026-11-02, Meta and DeepMind/Google pages refuse (X-Frame-Options / frame-ancestors).
   Needs internet in class. Inside another site the deck's keys stop working until you click outside it:
   one click on the slide, outside the site, moves on. */
const embed = (title, url, say) => st(`
  <h1 class="t">${title}</h1>
  <iframe class="motivation-site b" src="${url}" title="${title}" allow="fullscreen" referrerpolicy="no-referrer"></iframe>
  <style>.motivation-site{ flex:1 1 auto; min-height:0; width:100%; border:1px solid var(--line); border-radius:12px; background:#fff; }</style>
`, { blank: false, notes: [`(draft) ${say[0]}`, `(draft) ${say[1]}`] });

st(`
  <div class="center">
    <div class="question" style="font-size:clamp(2.4rem,4.2vw,3.8rem)">Why take this course?</div>
    <div class="lead b" style="margin-top:5vh">What vision can do now, and where it still fails</div>
  </div>
  <style>
    .motivation-demo{ margin:auto 0; max-width:62vw; display:flex; flex-direction:column; gap:1.4vh; }
    .motivation-name{ font-size:clamp(2rem, 3.4vw, 3.2rem); font-weight:700; }
    .motivation-demo ul.frag li{ margin:.4vh 0; }
    .motivation-link{ color:var(--ink); font-size:clamp(1.1rem, 1.6vw, 1.5rem); }
    .motivation-week{ position:absolute; right:6vw; top:22vh; border:2px solid var(--ink); border-radius:14px; padding:2vh 1.6vw;
      display:flex; flex-direction:column; gap:.6vh; min-width:18vw; }
    .motivation-week b{ font-size:clamp(1.5rem, 2.4vw, 2.2rem); }
  </style>
`, { notes: [
  "(draft) So why should you take this course?",
  "(draft) Let me show you what computer vision can do right now, and then where it still fails. Everything I show you, we will cover."
]});

demo({ title: 'From photos to 3D', name: 'VGGT', who: 'Meta AI and Oxford · CVPR 2025',
  cues: ['A few photos in', 'Cameras, depth and 3D points out', 'Typically under a second'],
  url: 'https://huggingface.co/spaces/facebook/vggt', urlText: 'Try it: Hugging Face demo',
  week: 1, topic: 'Image geometry, feature matching', clip: 'run the demo live on a few classroom photos, or a saved result.',
  say: ['From a handful of photos to a 3D scene.',
    'This is VGGT, from Meta AI and Oxford. You give it a few photos of a scene; it returns where each camera was, the depth of every pixel, and a cloud of 3D points, typically in under a second. You can try it in your browser.',
    'The ideas underneath, image geometry and matching points across images, are week one.'] });

/* VGGT's live demo (https://facebook-vggt.hf.space/) allows embedding, but it returned a 500 error on 2026-11-02;
   to embed it again once it works: embed('From photos to 3D', 'https://facebook-vggt.hf.space/', [...]). */
demo({ title: 'Learning to see without labels', name: 'DINOv3 → Canopy Height Maps v2', who: 'Meta and World Resources Institute · 2025–2026',
  cues: ['Features learned from images, no labels', 'Trained on satellite images', 'Tree height, mapped worldwide'],
  url: 'https://ai.meta.com/blog/world-resources-institute-dino-canopy-height-maps-v2/', urlText: 'Canopy Height Maps v2',
  week: 2, topic: 'Learned representations, transfer learning', clip: 'the map on Google Earth Engine (linked from the blog), zoomed on a forest near AIMS.',
  say: ['Learning to see without labels.',
    'DINOv3 is a model from Meta that learns visual features from images alone, without anyone labeling them. A version trained on satellite images is the backbone of Canopy Height Maps version 2, built with the World Resources Institute: the height of trees, mapped across the world, and released openly.',
    'Learned representations, and reusing them for a new task, which is transfer learning, are week two.'] });

demo({ title: 'An embedding of the planet', name: 'AlphaEarth Foundations', who: 'Google DeepMind · 2025',
  cues: ['Optical, radar, 3D laser and climate data, combined', '64 numbers for every 10 m of land', 'Each year, 2017–2024'],
  url: 'https://deepmind.google/discover/blog/alphaearth-foundations-helps-map-our-planet-in-unprecedented-detail/', urlText: 'AlphaEarth Foundations',
  week: 2, topic: 'Embeddings and similarity', clip: 'the video on the DeepMind blog post.',
  say: ['An embedding of the whole planet.',
    'AlphaEarth Foundations, from Google DeepMind, combines satellite images, radar, 3D laser scans and climate simulations into one summary: 64 numbers for every 10 meter square of land, for each year from 2017 to 2024. They are available in Google Earth Engine.',
    'What an embedding is, and how to compare things with it, is week two.'] });

demo({ title: 'Segment anything you can name', name: 'SAM 3', who: 'Meta · 2025',
  cues: ['Type a short phrase', 'Finds, outlines and tracks every match', 'In images and video'],
  url: 'https://aidemos.meta.com/segment-anything', urlText: 'Try it: Segment Anything Playground',
  week: 3, topic: 'Detection and segmentation', clip: 'run the Playground live on a classroom video.',
  say: ['Segment anything you can name.',
    'SAM 3, from Meta. You type a short phrase, and it finds every matching object, outlines it pixel by pixel, and tracks it through a video. The model is open, and there is a playground in the browser.',
    'Detection and segmentation are week three.'] });

demo({ title: 'Images and language, in medicine', name: 'MedGemma 1.5', who: 'Google · 2026 · open model',
  cues: ['CT and MRI volumes, pathology slides', 'Images and text together', 'A research model, not a doctor'],
  url: 'https://developers.google.com/health-ai-developer-foundations/medgemma', urlText: 'MedGemma',
  week: 3, topic: 'Multimodal vision-language systems', clip: 'no public demo found; an example from the model page.',
  say: ['Images and language together, in medicine.',
    'MedGemma 1.5 is an open model from Google that reads medical images, including 3D CT and MRI scans and pathology slides, together with text. It is meant for developers and researchers to build on, not to make clinical decisions on its own.',
    'Models that connect images and language are week three.'] });

demo({ title: 'Robots that see, plan and act', name: 'Gemini Robotics 1.5', who: 'Google DeepMind · 2025',
  cues: ['Sees the scene, plans in steps', 'Sorts laundry; sorts waste by local rules', 'Same skills on different robots'],
  url: 'https://deepmind.google/discover/blog/gemini-robotics-15-brings-ai-agents-into-the-physical-world/', urlText: 'Gemini Robotics 1.5',
  week: 3, topic: 'Multimodal systems, vision for action', clip: 'one of the videos on the blog post (check the laundry and waste clips).',
  say: ['Robots that see, plan and act.',
    'Gemini Robotics 1.5, from Google DeepMind: a robot looks at a scene, plans a task in steps, and acts. In their videos it sorts laundry by color, and sorts waste following a city\'s recycling rules. The same skills transfer across different robots.',
    'Vision as one part of a larger system that acts in the world is week three.'] });

demo({ title: 'Generating worlds', name: 'Genie 4', who: 'Google DeepMind · 2026 · research preview',
  cues: ['A text prompt in', 'A world you can walk through', 'Generated as you move'],
  url: 'https://deepmind.google/models/genie/', urlText: 'Genie',
  week: 3, topic: 'Image generation and diffusion models', clip: 'the video at the top of the Genie page.',
  say: ['Generating whole worlds.',
    'Genie 4, from Google DeepMind. You describe a world in text, and it generates one you can move through, frame by frame, as you move. It is a research preview: most of us can only watch the videos for now.',
    'How machines generate images is week three.'] });

/* All of it on one screen */
const col = (w, name, items, step) => `<div class="motivation-col b" data-step="${step}">
  <div class="label">Week ${w}</div><b>${name}</b>${items.map(i => `<div class="lead">${i}</div>`).join('')}</div>`;
st(`
  <h1 class="t">We will cover all of this</h1>
  <div class="motivation-cols">
    ${col(1, 'Understanding images', ['VGGT'], 1)}
    ${col(2, 'Learning representations', ['DINOv3, Canopy Height', 'AlphaEarth'], 2)}
    ${col(3, 'Building vision systems', ['SAM 3', 'MedGemma', 'Gemini Robotics', 'Genie 4'], 3)}
  </div>
  <style>
    .motivation-cols{ margin:auto 0; display:grid; grid-template-columns:repeat(3, 1fr); gap:2vw; }
    .motivation-col{ border-top:3px solid var(--ink); padding-top:2vh; display:flex; flex-direction:column; gap:1.4vh; }
    .motivation-col b{ font-size:clamp(1.4rem, 2.2vw, 2rem); }
  </style>
`, { notes: [
  "(draft) Everything you just saw, we will cover.",
  "(draft) Week one: the geometry behind going from photos to 3D.",
  "(draft) Week two: the learned representations behind DINOv3 and AlphaEarth.",
  "(draft) Week three: segmentation, vision with language, vision for robots, and generation. Not to make you an expert in each, but so you know these tools exist and how to use them for your own project."
]});

/* ---- Limitations ---- */
st(`
  <div class="center">
    <div class="question" style="font-size:clamp(2.4rem,4.2vw,3.8rem)">Where does it fail?</div>
  </div>
`, { notes: "(draft) And yet. Where does it still fail?" });

/* Real output: day02/assets/human-vs-machine/result.json (torchvision ResNet-18, see day02/assets/SOURCES.md) */
const TOP5 = [['triceratops', .2869], ['cowboy boot', .2662], ['shield', .0581], ['chain mail', .0436], ['cuirass', .0258]];
st(`
  <h1 class="t">What do you see?</h1>
  <div class="motivation-hvm">
    <div class="tile b" data-step="1"><div class="im"><img src="assets/human-vs-machine/crop.jpg" alt=""></div></div>
    <div class="b" data-step="2">
      <div class="motivation-bars">${TOP5.map(([n, p]) => `<div class="label">${n}</div>
        <div class="motivation-tr"><div style="width:${p * 100}%"></div></div><div class="label">${(p * 100).toFixed(1)}%</div>`).join('')}</div>
      <div class="label" style="text-align:center;margin-top:1.5vh"><b>ResNet-18</b>, top-5</div>
    </div>
    <div class="lead b" data-step="3" style="text-align:center">“Indian elephant”: 9th, 1.3%</div>
  </div>
  <div class="cite b" data-step="1">Photo: Carlos Valenzuela, CC BY-SA 4.0, via Wikimedia Commons (cropped)</div>
  <style>
    .motivation-hvm{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1fr 1.25fr; grid-template-rows:1fr auto; gap:2vh 4vw; }
    .motivation-hvm .tile{ grid-row:1 / 3; }
    .motivation-hvm .im img{ object-fit:contain; background:#fff; }
    .motivation-bars{ display:grid; grid-template-columns:auto 1fr auto; gap:1.8vh .8vw; align-items:center; margin-top:4vh; }
    .motivation-bars .label:nth-child(3n+1){ text-align:right; }
    .motivation-tr{ height:2.6vh; background:#f1f5f9; border-radius:4px; overflow:hidden; }
    .motivation-tr > div{ height:100%; background:var(--what); border-radius:4px; }
  </style>
`, { notes: [
  "(draft) Let's start with a photo. What do you see?",
  "(draft) Shout it out. (Most people say an elephant, a statue of an elephant.)",
  "(draft) Here is a standard image classifier, ResNet-18, trained on ImageNet's 1000 categories. We ran it on this photo: triceratops, 29 percent; cowboy boot, 27 percent; then shield, chain mail, armor.",
  "(draft) ImageNet does have elephants. Indian elephant comes ninth, at about 1 percent. Note for us: we picked this photo because the model gets it wrong; it is one example, not a failure rate."
]});

st(`
  <h1 class="t">Vision-language models are blind</h1>
  <ul class="frag">
    <li class="b" data-step="1">Do two circles overlap? How many lines cross? Which letter is circled?</li>
  </ul>
  <div class="motivation-bars b" data-step="2" style="max-width:60vw;margin:2vh 0 auto">
    <div class="label">Four VLMs, average</div><div class="motivation-tr"><div style="width:58.07%;background:var(--ink)"></div></div><div class="label">58.07%</div>
    <div class="label">Best model</div><div class="motivation-tr"><div style="width:77.84%;background:var(--ink)"></div></div><div class="label">77.84%</div>
    <div class="label">People, expected</div><div class="motivation-tr"><div style="width:100%;background:var(--ink)"></div></div><div class="label">100%</div>
  </div>
  ${cite('Rahmanzadehgervi, Bolton, Taesiri &amp; Nguyen, Vision language models are blind, ACCV 2024 (arXiv 2407.06581 v6) · vlmsareblind.github.io')}
`, { notes: [
  "(draft) Models that combine images and language can describe a photo in detail. But here is a paper titled: vision language models are blind.",
  "(draft) The authors asked questions a child can answer. Do these two circles overlap? How many times do these lines cross? Which letter is circled?",
  "(draft) Four of the best models of 2024 got 58 percent right on average. The best one, 78 percent. A person is expected to get all of them. These were the 2024 models; whether today's models still fail, and why, is exactly the kind of question you could study."
]});

embed('Vision-language models are blind', 'https://vlmsareblind.github.io/', [
  'The paper has its own website, with the tasks and the models\' answers.',
  '(Scroll through a few examples: the question, the image, and what each model answered.)']);

st(`
  <h1 class="t">Does object recognition work for everyone?</h1>
  <ul class="frag">
    <li class="b">Photos of household items from homes around the world</li>
    <li class="b">Six systems: worse on items common in low-income countries</li>
    <li class="b">Same object, different look; familiar object, different place</li>
  </ul>
  ${cite('DeVries, Misra, Wang &amp; van der Maaten, Does object recognition work for everyone?, CVPR Workshops 2019 · Images: Gapminder Dollar Street')}
`, { notes: [
  "(draft) Does object recognition work for everyone?",
  "(draft) This study used Dollar Street, a collection of photos of everyday objects in homes around the world, across income levels.",
  "(draft) They tested six object recognition systems that were publicly available. All of them did worse on household items that are common in countries with low household income.",
  "(draft) Why? The same kind of object looks different from home to home, dish soap for example, and familiar objects show up in unfamiliar places, like a toothbrush outside a bathroom. The training data did not look like these homes."
]});

embed('Does object recognition work for everyone?', 'https://www.gapminder.org/dollar-street', [
  'Dollar Street itself is online.',
  '(Scroll through: pick one object, a toothbrush or a stove, and compare homes across incomes and countries. This is the kind of variation the training data missed.)']);

st(`
  <h1 class="t">Texture, not shape</h1>
  <ul class="frag">
    <li class="b">ImageNet-trained networks: mostly texture</li>
    <li class="b">People: mostly shape</li>
    <li class="b">Train on shape: more accurate and more robust</li>
  </ul>
  ${cite('Geirhos, Rubisch, Michaelis, Bethge, Wichmann &amp; Brendel, ImageNet-trained CNNs are biased towards texture, ICLR 2019')}
`, { notes: [
  "(draft) One more, and it brings us back to people.",
  "(draft) Geirhos and colleagues showed that networks trained on ImageNet recognize objects mostly by their texture.",
  "(draft) People, tested on the same images, go mostly by shape.",
  "(draft) And when they trained the same network on images where texture was no longer a reliable cue, it relied more on shape, and became more accurate and more robust. Maybe that is part of what happened to our decorated elephant. That is a hypothesis you could test."
]});

st(`
  <h1 class="t">Why look to humans?</h1>
  <ul class="frag">
    <li class="b">You all saw the elephant</li>
    <li class="b">People go by shape</li>
    <li class="b">Human perception: a working answer to the same problems</li>
  </ul>
  <div class="todo b">Your own reasons, in your words: why human perception is a source for overcoming these limitations.</div>
`, { notes: [
  "(draft) So why look to humans?",
  "(draft) Because every one of you saw the elephant, instantly, and you have never seen this statue before.",
  "(draft) Because people go by shape where these networks go by texture.",
  "(draft) And because human perception is a working answer to the same problems these systems still struggle with: an image is ambiguous, and we see the world anyway. Studying how we do it gives us ideas, and tests, for machines.",
  "(to write) Fernanda's own framing."
]});

st(`
  <h1 class="t">Why projects?</h1>
  <ul class="frag">
    <li class="b">A high-level overview of the tools out there</li>
    <li class="b">Geared toward using them for your project</li>
  </ul>
`, { notes: [
  "(draft) Why is this class built around projects?",
  "(draft) This course is a high-level overview of the tools available out there.",
  "(draft) But it is heavily geared toward harnessing those tools for your own projects. You will not just learn about these models; you will put them to work on a problem you care about. Here is a taste of how little it takes."
]});

sc('onePhotoStack', 'scenes/one-photo-stack.html');
}
