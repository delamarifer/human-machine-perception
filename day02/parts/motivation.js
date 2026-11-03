/* PART: motivation (Day 2). Owner: to decide. Plan: 30 min. "Motivation for why you should take this course:
   applications; limitations; why look to humans as a source of overcoming those limitations?; why is the
   class project-based?"
   ACT 1 APPLICATIONS (one demo per slide, each mapped to the week of syllabus.html that covers it), then all of
         them on one screen: "this is what we will cover".
   ACT 2 LIMITATIONS: our own ResNet-18 run on the elephant statue (real output), VLMs are blind,
         texture bias. Numbers only from the papers' abstracts.
   ACT 3 WHY HUMANS, WHY PROJECTS, then the one-photo scene as a taste of the tools.
   Demos were checked on 2026-11-02 (links answer). VGGT, Gemini Robotics and Genie carry the maker's own video.
   Links open in a new tab and do not advance the deck. */
{
section('Motivation');

const link = (url, text) => `<a class="motivation-link" href="${url}" target="_blank" rel="noopener"
  onclick="event.stopPropagation()">${text} ↗</a>`;
/* A demo slide: the card (name, who, cues, link, the week that covers it) and, where the maker publishes one
   that can be embedded, their own video next to it (checked 2026-11-02; needs internet in class).
   o.video = a video file from the maker's site; o.youtube = the id of the maker's own YouTube video. */
const media = (o) => o.site
  ? `<iframe class="motivation-video" src="${o.site}" title="${o.name}" referrerpolicy="no-referrer"></iframe>`
  : o.image
  ? `<img class="motivation-video motivation-still" src="${o.image}" alt="" referrerpolicy="no-referrer">`
  : o.video
  ? `<video class="motivation-video" src="${o.video}" controls muted loop playsinline preload="metadata" onclick="event.stopPropagation()"></video>`
  : o.youtube
  ? `<iframe class="motivation-video" src="https://www.youtube-nocookie.com/embed/${o.youtube}?rel=0" title="${o.name} video" allow="fullscreen; encrypted-media; picture-in-picture"></iframe>`
  : '';
const demo = (o) => st(`
  <h1 class="t">${o.title}</h1>
  <div class="motivation-row ${media(o) ? '' : 'motivation-solo'}">
    <div class="motivation-demo">
      <div class="b" data-step="1"><div class="motivation-name">${o.name}</div><div class="label">${o.who}</div></div>
      <div class="motivation-say b" data-step="1"><div class="label">What it does</div><div class="motivation-line">${o.does}</div></div>
      <div class="motivation-say b" data-step="2"><div class="label">What it enables that we could not do before</div><div class="motivation-line">${o.enables}</div></div>
      <div class="b" data-step="1">${link(o.url, o.urlText)}</div>
    </div>
    ${media(o) ? `<div class="motivation-media b" data-step="1">${media(o)}<div class="label">${o.video || o.youtube ? 'Video' : o.site ? 'Live' : 'Image'}: ${o.credit}</div></div>` : ''}
  </div>
`, { notes: [`(draft) ${o.say[0]}`, `(draft) ${o.say[1]}`, `(draft) ${o.takeaway.replace(/^What is new: /, '')}`] });

/* A live website on a slide, to scroll through in class (Fernanda, 2026-11-02). Only sites that allow
   embedding: checked 2026-11-02, Meta and DeepMind/Google pages refuse (X-Frame-Options / frame-ancestors).
   Needs internet in class. Inside another site the deck's keys stop working until you click outside it:
   one click on the slide, outside the site, moves on. */
const embed = (title, url, say, opts = {}) => st(`
  <h1 class="t">${title}</h1>
  <iframe class="motivation-site b" src="${url}" title="${title}" allow="fullscreen" referrerpolicy="no-referrer"></iframe>
  <style>.motivation-site{ flex:1 1 auto; min-height:0; width:100%; border:1px solid var(--line); border-radius:12px; background:#fff; }</style>
`, { blank: opts.blank ?? false, notes: [`(draft) ${say[0]}`, `(draft) ${say[1]}`] });

st(`
  <div class="center">
    <div class="label motivation-outcome"><b>By the end, you can</b> · say what today&#39;s vision systems do well and where they fail</div>
    <div class="question" style="font-size:clamp(2.4rem,4.2vw,3.8rem);margin-top:4vh">What can this course give you?</div>
    <div class="lead b" style="margin-top:5vh">Where computer vision can take you, and where it can&#39;t yet</div>
  </div>
  <style>
    .motivation-outcome{ color:var(--mute); } .motivation-outcome b{ color:var(--ink); }
    .motivation-row{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:minmax(0, 1fr) minmax(0, 1.35fr); gap:3vw; align-items:center; }
    .motivation-row.motivation-solo{ grid-template-columns:minmax(0, 1fr); max-width:62vw; }
    .motivation-demo{ display:flex; flex-direction:column; gap:2vh; }
    .motivation-media{ display:flex; flex-direction:column; gap:.8vh; min-height:0; }
    .motivation-video{ width:100%; aspect-ratio:16/9; border:0; border-radius:10px; background:#0f172a; }
    .motivation-still{ object-fit:contain; background:#fff; border:1px solid var(--line); }
    .motivation-name{ font-size:clamp(1.8rem, 3vw, 2.8rem); font-weight:700; }
    .motivation-link{ color:var(--ink); font-size:clamp(1.1rem, 1.6vw, 1.5rem); }
    .motivation-say{ border-left:4px solid var(--line); padding-left:1vw; }
    .motivation-say .label{ color:var(--mute); font-weight:700; }
    .motivation-line{ font-size:clamp(1.15rem, 1.85vw, 1.65rem); line-height:1.3; margin-top:.3vh; }
  </style>
`, { notes: [
  "(draft) So what can this course give you? By the end of this part, you can say what today's vision systems do well and where they fail.",
  "(draft) Where computer vision can take you, and where it can't yet. First what it can do right now; then where it still fails. Everything I show you, we will cover, and the failures are open problems you could work on."
]});

demo({ title: 'From photos to 3D', name: 'VGGT', does: 'Turns a few photos of a scene into where each camera was, the depth of every pixel, and a 3D point cloud.', enables: '3D from photos in one pass, typically under a second, where it used to take a slow chain of matching and optimization.', takeaway: 'What is new: before, getting 3D from a set of photos meant a long chain of steps: match points between images, solve for the cameras, then refine everything with an optimization that could take minutes or more. VGGT does it in one pass of one network, typically in under a second.', video: 'https://vgg-t.github.io/resources/teaser_video_v3_compressed_short.mp4', credit: 'VGGT project page (vgg-t.github.io)', who: 'Meta AI and Oxford · CVPR 2025',
  url: 'https://huggingface.co/spaces/facebook/vggt', urlText: 'Try it: Hugging Face demo',
  say: ['From a handful of photos to a 3D scene.',
    'This is VGGT, from Meta AI and Oxford. You give it a few photos of a scene; it returns where each camera was, the depth of every pixel, and a cloud of 3D points, typically in under a second. Here is their video; you can also try it in your browser.',
    'The ideas underneath, image geometry and matching points across images, are week one.'] });

/* VGGT's live demo (https://facebook-vggt.hf.space/) allows embedding, but it returned a 500 error on 2026-11-02;
   to embed it again once it works: embed('From photos to 3D', 'https://facebook-vggt.hf.space/', [...]). */
demo({ title: 'Learning to see without labels', name: 'DINOv3 → Canopy Height Maps v2', site: 'https://meta-forest-monitoring-okw37.projects.earthengine.app/view/canopyheight', credit: 'the live tree-height map, Meta and WRI on Google Earth Engine (drag and zoom)', does: 'Learns visual features from images alone, with no labels; trained on satellite images, it maps the height of trees.', enables: "Reusing one model's features for new tasks without labeled data, like mapping the height of the world's trees.", takeaway: "What is new: before, each new task needed its own pile of labeled examples. DINOv3 learns its features from images alone, with no labels, and those same features carry over to new tasks: here, the height of the world's trees from satellite images.", who: 'Meta and World Resources Institute · 2025–2026',
  url: 'https://ai.meta.com/blog/world-resources-institute-dino-canopy-height-maps-v2/', urlText: 'Canopy Height Maps v2',
  say: ['Learning to see without labels.',
    'DINOv3 is a model from Meta that learns visual features from images alone, without anyone labeling them. A version trained on satellite images is the backbone of Canopy Height Maps version 2, built with the World Resources Institute: the height of trees, mapped across the world, and released openly.',
    'Learned representations, and reusing them for a new task, which is transfer learning, are week two.'] });

demo({ title: 'An embedding of the planet', name: 'AlphaEarth Foundations', image: 'https://lh3.googleusercontent.com/7vH7h8I8REIlyuvVWa6rIBAuFi8Wgx2YNE5j2F1tcym5UCjH6e6KcDji_ZHvYutiLFypKUuHK-fvJ2LaGTTp_8Fxs-qLf_ul74zLW-Y5pMWiYwfskg=w1200-h630-n-nu-rw', credit: 'Google DeepMind, AlphaEarth Foundations blog post', does: 'Summarizes every 10 m square of land, each year, as 64 numbers, combining satellite, radar, 3D laser and climate data.', enables: 'One ready-made description of every place on Earth that many mapping tasks can reuse, without retraining.', takeaway: 'What is new: before, every mapping project started over from raw satellite images, full of clouds and gaps. AlphaEarth gives one ready-made summary of every 10 meter square, from many kinds of data at once, and in the paper it beat earlier approaches across mapping tasks without retraining.', who: 'Google DeepMind · 2025',
  url: 'https://deepmind.google/discover/blog/alphaearth-foundations-helps-map-our-planet-in-unprecedented-detail/', urlText: 'AlphaEarth Foundations',
  say: ['An embedding of the whole planet.',
    'AlphaEarth Foundations, from Google DeepMind, combines satellite images, radar, 3D laser scans and climate simulations into one summary: 64 numbers for every 10 meter square of land, for each year from 2017 to 2024. They are available in Google Earth Engine.',
    'What an embedding is, and how to compare things with it, is week two.'] });

demo({ title: 'Segment anything you can name', name: 'SAM 3', image: 'https://raw.githubusercontent.com/facebookresearch/sam3/main/assets/dog.gif', credit: 'Meta, SAM 3 repository (facebookresearch/sam3)', does: 'Finds, outlines and tracks every object that matches a short text phrase, in images and video.', enables: 'Segmenting any concept you can name, not just a fixed list of categories or one click per object.', takeaway: 'What is new: before, segmentation models knew a fixed list of categories, or, like the earlier Segment Anything models, needed you to click on each object. SAM 3 takes a short phrase, any concept, and finds every match, in images and video.', who: 'Meta · 2025',
  url: 'https://aidemos.meta.com/segment-anything', urlText: 'Try it: Segment Anything Playground',
  say: ['Segment anything you can name.',
    'SAM 3, from Meta. You type a short phrase, and it finds every matching object, outlines it pixel by pixel, and tracks it through a video. The model is open, and there is a playground in the browser.',
    'Detection and segmentation are week three.'] });

demo({ title: 'Images and language, in medicine', name: 'MedGemma 1.5', image: 'https://storage.googleapis.com/gweb-research2023-media/images/MedGemma15-3-CT.width-1250.png', credit: 'Google Research, MedGemma 1.5 blog post (CT example, with a radiologist checking the answer)', does: 'An open model that reads medical images, including 3D CT and MRI scans and pathology slides, together with text.', enables: 'One open model to build on across kinds of scans and questions, instead of a separate narrow model for each.', takeaway: 'What is new: before, medical imaging AI meant a narrow model for each kind of scan and question. MedGemma 1.5 is one open model that reads 3D CT and MRI volumes, whole pathology slides and text together; Google describes it as the first open model of its kind for high-dimensional medical data.', who: 'Google · 2026 · open model',
  url: 'https://developers.google.com/health-ai-developer-foundations/medgemma', urlText: 'MedGemma',
  say: ['Images and language together, in medicine.',
    'MedGemma 1.5 is an open model from Google that reads medical images, including 3D CT and MRI scans and pathology slides, together with text. It is meant for developers and researchers to build on, not to make clinical decisions on its own.',
    'Models that connect images and language are week three.'] });

demo({ title: 'Robots that see, plan and act', name: 'Gemini Robotics 1.5', does: 'Looks at a scene, plans a task in steps, and controls a robot to carry it out.', enables: 'Robots that plan multi-step tasks from what they see, with skills that transfer between different robots.', takeaway: 'What is new: before, robots were programmed task by task, for one particular robot. Gemini Robotics 1.5 looks at the scene, plans a multi-step task, and acts, and skills learned on one robot transfer to robots with different bodies.', youtube: 'AMRxbIO04kQ', credit: 'Google DeepMind, Gemini Robotics 1.5: Using agentic capabilities', who: 'Google DeepMind · 2025',
  url: 'https://deepmind.google/discover/blog/gemini-robotics-15-brings-ai-agents-into-the-physical-world/', urlText: 'Gemini Robotics 1.5',
  say: ['Robots that see, plan and act.',
    'Gemini Robotics 1.5, from Google DeepMind: a robot looks at a scene, plans a task in steps, and then acts. Here is one of their videos. The same skills transfer across different robots.',
    'Vision as one part of a larger system that acts in the world is week three.'] });

demo({ title: 'Generating worlds', name: 'Genie 4', does: 'Generates an interactive world from a text prompt, frame by frame as you move through it.', enables: 'Not a clip to watch but a world to explore and change, generated as you go.', takeaway: 'What is new: before, video generators made a clip you watch. A world model like Genie makes a world you can move through and change, generated frame by frame as you act. Genie 4 adds sound to it.', video: 'https://storage.googleapis.com/gdm-deepmind-com-prod-public/media/0XTXKGGiuw14X2EL/genie4_hero_tokyo-mirage__alt-3__16x9__261027.webm', credit: 'Google DeepMind, Genie page', who: 'Google DeepMind · 2026 · research preview',
  url: 'https://deepmind.google/models/genie/', urlText: 'Genie',
  say: ['Generating whole worlds.',
    'Genie 4, from Google DeepMind. You describe a world in text, and it generates one you can move through, frame by frame, as you move. It is a research preview: most of us can only watch the videos for now.',
    'How machines generate images is week three.'] });

/* All of it on one screen: we teach the fundamentals these tools are built on, not the tools themselves
   (Fernanda, 2026-11-02). Fundamentals are worded from syllabus.html, Weeks; each names the demo it powers. */
const col = (w, name, items, step) => `<div class="motivation-col b" data-step="${step}">
  <div class="label">Week ${w}</div><b>${name}</b>${items.map(([f, tool]) =>
    `<div class="motivation-fund"><div class="lead">${f}</div><div class="label">→ ${tool}</div></div>`).join('')}</div>`;
st(`
  <h1 class="t">The fundamentals behind all of this</h1>
  <div class="motivation-cols">
    ${col(1, 'Understanding images', [['Image geometry, feature matching', 'VGGT']], 1)}
    ${col(2, 'Learning representations', [['Learned features, transfer learning', 'DINOv3, Canopy Height'], ['Embeddings and similarity', 'AlphaEarth']], 2)}
    ${col(3, 'Building vision systems', [['Detection and segmentation', 'SAM 3'], ['Vision and language together', 'MedGemma, Gemini Robotics'], ['Image generation', 'Genie 4']], 3)}
  </div>
  <style>
    .motivation-cols{ margin:auto 0; display:grid; grid-template-columns:repeat(3, 1fr); gap:2vw; }
    .motivation-col{ border-top:3px solid var(--ink); padding-top:2vh; display:flex; flex-direction:column; gap:1.6vh; }
    .motivation-col b{ font-size:clamp(1.4rem, 2.2vw, 2rem); }
    .motivation-fund .lead{ line-height:1.2; }
    .motivation-fund .label{ color:var(--mute); margin-top:.3vh; }
  </style>
`, { notes: [
  "(draft) We will not teach you each of these tools. We will teach you the fundamentals they are built on, so you can understand them, use them, and see where they break.",
  "(draft) Week one: image geometry and matching features across images, the ideas underneath going from photos to 3D, as VGGT does.",
  "(draft) Week two: how networks learn their own features and reuse them for new tasks, as DINOv3 does for tree height; and embeddings, how to compare things by their learned summaries, as AlphaEarth does for every place on Earth.",
  "(draft) Week three: detection and segmentation, behind SAM 3; vision and language together, behind MedGemma and Gemini Robotics; and image generation, behind Genie. With these fundamentals, you can pick up the next tool, which will be out before the course ends, and put it to work on your project."
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


embed('What vision models are still “blind” to', 'https://vlmsareblind.github.io/', [
  "Models that combine images and language can describe a photo in detail. But here is a paper titled: vision language models are blind. (Rahmanzadehgervi et al., ACCV 2024.)",
  "(Scroll through the examples.) The authors asked questions a child can answer: do two circles overlap, how many times do these lines cross, which letter is circled. Four of the best models of 2024 got 58 percent right on average; the best one, 78 percent. A person is expected to get all of them. Whether today's models still fail, and why, is exactly the kind of question you could study."], { blank: true })

/* Texture or shape: the paper's finding, then the same idea tested on our two photos with our ResNet-18. Shuffling
   the patches destroys the shape and keeps the texture. Real outputs: day02/assets/shuffle/(coffee, elephant)/result.json, made by
   day02/assets/shuffle.py from the same crops as the earlier slides (so "intact" matches them). Two photos, one
   seed: a probe, not a measurement; the notes say so. */
const SHUF = {"coffee": [["espresso", "85.9%"], ["toilet tissue", "30.5%"], ["wardrobe", "14.2%"]], "elephant": [["triceratops", "28.7%"], ["sock", "40.7%"], ["wine bottle", "24.0%"]]};
const shufRow = (name, step) => `<div class="label motivation-shuf-name b" data-step="${step}">${name === 'coffee' ? 'Coffee' : 'Elephant'}</div>` +
  ['intact', 'shuffled-4', 'shuffled-8'].map((k, j) => `<div class="motivation-shuf-cell b" data-step="${step}">
    <img src="assets/shuffle/${name}/${k}.png" alt=""><div class="label"><b>${SHUF[name][j][0]}</b> ${SHUF[name][j][1]}</div></div>`).join('');
st(`
  <h1 class="t">Texture, not shape?</h1>
  <div class="lead b" data-step="1">ImageNet-trained networks go mostly by texture; people by shape</div>
  <div class="motivation-shuf">
    <div></div><div class="label motivation-shuf-head b" data-step="2">Intact</div>
    <div class="label motivation-shuf-head b" data-step="2">Shuffled 4 × 4</div><div class="label motivation-shuf-head b" data-step="2">Shuffled 8 × 8</div>
    ${shufRow('coffee', 2)}${shufRow('elephant', 3)}
  </div>
  <div class="lead b" data-step="4" style="text-align:center">Shape gone, texture kept: the answers change</div>
  ${cite('Geirhos, Rubisch, Michaelis, Bethge, Wichmann &amp; Brendel, ImageNet-trained CNNs are biased towards texture, ICLR 2019 · Our test: ResNet-18 · Photos (cropped, shuffled): Shixart1985, CC BY 2.0; Carlos Valenzuela, CC BY-SA 4.0')}
  <style>
    .motivation-shuf{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:auto repeat(3, 1fr); grid-template-rows:auto 1fr 1fr;
      gap:1vh 1.6vw; align-items:center; justify-items:center; }
    .motivation-shuf-head{ font-weight:700; }
    .motivation-shuf-name{ font-weight:700; justify-self:end; }
    .motivation-shuf-cell{ height:100%; min-height:0; display:flex; flex-direction:column; align-items:center; gap:.5vh; }
    .motivation-shuf-cell img{ flex:1 1 auto; min-height:0; aspect-ratio:1; object-fit:cover; border-radius:6px; border:1px solid var(--line); }
  </style>
`, { notes: [
  "(draft) Texture, not shape? One more failure, and it brings us back to people.",
  "(draft) Geirhos and colleagues showed that networks trained on ImageNet recognize objects mostly by their texture, while people, tested on the same images, go mostly by shape. Training the same network to rely on shape made it more accurate and more robust.",
  "(draft) We tried a quick version on our own photo, with the same ResNet-18. Cut the image into pieces and shuffle them: the shape is gone, the texture is still there. Intact, it says espresso, 86 percent. Shuffled into 16 pieces, it says toilet tissue; into 64 pieces, wardrobe. Espresso drops out. So here, the arrangement mattered to the model too.",
  "(draft) The elephant. Intact: triceratops. Shuffled into 16 pieces: sock, with cowboy boot still second, just as it was for the intact statue. Into 64: wine bottle, then barrel and quilt. The guesses follow the patterns on the surface, not the animal.",
  "(draft) Shape gone, texture kept, and the answers change, but not always in the same way. This is two photos and one shuffle, not a measurement. Testing it properly, on many images, against people, is exactly the kind of question you could take on in a project."
]});

/* Emmert's law, copied from Day 1 (Shreya did not cover it there; Fernanda, 2026-11-02). */
sc('emmert', 'scenes/emmert.html');

/* Why we look to human vision: three reasons, each the Vision Book's own argument (Torralba, Isola & Freeman,
   Foundations of Computer Vision, Ch. 1 "The Challenge of Vision": the brain's performance "still unmatched by
   any artificial system"; Sec. 1.3.5, neuroscience inspired RGB encoding, filter-based representations, neural
   networks and attention; Sec. 1.3.3, Gestalt grouping and completion, e.g. the Kanizsa triangle, influenced
   segmentation). The elephant is our own ResNet-18 run; the chain and the Kanizsa triangle are drawn here. */
const why = (step, vis, head, line) => `<div class="motivation-why b" data-step="${step}">
  <div class="motivation-why-vis">${vis}</div><b>${head}</b><div class="label">${line}</div></div>`;
const chain = `<svg viewBox="0 0 300 90" class="motivation-why-svg" aria-hidden="true">
  <g fill="none" stroke="#0f172a" stroke-width="3">
    <circle cx="35" cy="45" r="22"/><circle cx="35" cy="45" r="8" fill="#0f172a"/>
    <circle cx="110" cy="45" r="22"/><circle cx="110" cy="45" r="10"/>
    <rect x="160" y="23" width="44" height="44" rx="6"/>
    <circle cx="245" cy="25" r="6"/><circle cx="245" cy="65" r="6"/><circle cx="280" cy="45" r="6"/>
    <path d="M251 25 L274 45 M251 65 L274 45"/>
  </g>
  <g stroke="#0f172a" stroke-width="5"><path d="M170 60 L194 30"/><path d="M162 50 L180 28"/><path d="M182 64 L202 40"/></g>
  <g fill="#64748b" font-size="11" font-family="Helvetica, Arial" text-anchor="middle">
    <text x="35" y="86">eye</text><text x="110" y="86">cells</text><text x="182" y="86">filters</text><text x="262" y="86">networks</text>
  </g></svg>`;
const kanizsa = `<svg viewBox="0 0 200 180" class="motivation-why-svg" aria-hidden="true">
  ${[[100, 25], [30, 150], [170, 150]].map(([x, y], k) => {
    const a = [90, 330, 210][k] * Math.PI / 180, r = 28, w = 60 * Math.PI / 180;
    const x1 = x + r * Math.cos(a - w / 2), y1 = y + r * Math.sin(a - w / 2), x2 = x + r * Math.cos(a + w / 2), y2 = y + r * Math.sin(a + w / 2);
    return `<path d="M${x} ${y} L${x1.toFixed(1)} ${y1.toFixed(1)} A${r} ${r} 0 1 0 ${x2.toFixed(1)} ${y2.toFixed(1)} Z" fill="#0f172a"/>`; }).join('')}
  </svg>`;
st(`
  <h1 class="t">Why we look to human vision</h1>
  <div class="label motivation-outcome"><b>By the end, you can</b> · explain why we look to human vision to get past those limits</div>
  <div class="motivation-whys">
    ${why(1, `<img src="assets/human-vs-machine/crop.jpg" alt="">`, 'People still see better', 'You: an elephant · ResNet-18: triceratops')}
    ${why(2, chain, 'Many tools came from the brain', 'Color channels, filters, neural networks, attention')}
    ${why(3, kanizsa, 'Perception shows what to build', 'Grouping and completion: a triangle that is not there')}
  </div>
  ${cite('Torralba, Isola &amp; Freeman, Foundations of Computer Vision, Ch. 1, The Challenge of Vision · Elephant: our ResNet-18 run · Photo: Carlos Valenzuela, CC BY-SA 4.0')}
  <style>
    .motivation-whys{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:repeat(3, 1fr); gap:2vw; margin-bottom:3vh; }
    .motivation-why{ border:2px solid var(--line); border-radius:14px; padding:2vh 1.2vw; display:flex; flex-direction:column; gap:1vh; min-height:0; }
    .motivation-why b{ font-size:clamp(1.3rem, 2.1vw, 1.9rem); line-height:1.2; }
    .motivation-why-vis{ flex:1 1 auto; min-height:0; display:flex; align-items:center; justify-content:center; }
    .motivation-why-vis img{ max-height:100%; max-width:100%; object-fit:contain; border-radius:8px; }
    .motivation-why-svg{ width:90%; max-height:100%; }
  </style>
`, { notes: [
  "(draft) So why do we look to human vision? By the end of this part, you can explain why we look to human vision to get past the limits we just saw.",
  "(draft) First, because people still see better. Every one of you saw the elephant at a glance; the classifier said triceratops. Our textbook puts it this way: seeing feels effortless, but the brain solves problems that are still unmatched by any artificial system.",
  "(draft) Second, because many of the tools in this course came from studying the brain. Color images with three channels, filters modeled on cells in the visual cortex that respond to spots and to edges at particular orientations, neural networks themselves, and attention: the textbook traces each of them to neuroscience. You will build some of these filters on Day 3.",
  "(draft) Third, because human perception shows what to build, and how to test it. You see a white triangle here, though none is drawn: your visual system groups the pieces and completes the shape. Principles like this, studied by perception scientists, shaped methods such as image segmentation, and they give us tests to run on models: does a vision model see the triangle?"
]});

/* Why projects: Fernanda's own wording (2026-11-02), centered. Click 1 draws the path from an idea to progress;
   click 2, the project-based course; click 3, topics as inspiration to harness. (The one-photo scene that used
   to follow was removed at her request; scenes/one-photo-stack.html stays in the repo, unused.) */
st(`
  <div class="motivation-proj">
    <h1 class="t">Why projects?</h1>
    <div class="motivation-goal b" data-step="1">
      <div class="label">Our goal is to help you get from</div>
      <div class="motivation-path">
        <span class="motivation-node"><i>an idea</i></span>
        <span class="motivation-arrow"><span></span></span>
        <span class="motivation-node">meaningful progress on that idea</span>
      </div>
    </div>
    <div class="lead b" data-step="2">That is why the course is heavily <b>project-based</b></div>
    <div class="lead b motivation-harness" data-step="3">We cover topics at a high level, to inspire you, and to <i><b>harness</b></i> them for your purposes</div>
  </div>
  <style>
    .motivation-proj{ margin:auto; text-align:center; display:flex; flex-direction:column; align-items:center; gap:5vh; max-width:80vw; }
    .motivation-goal{ display:flex; flex-direction:column; align-items:center; gap:2vh; }
    .motivation-goal > .label{ font-size:clamp(1.2rem, 1.9vw, 1.7rem); color:var(--mute); }
    .motivation-path{ display:flex; align-items:center; gap:1.4vw; }
    .motivation-node{ border:3px solid var(--ink); border-radius:999px; padding:1.4vh 1.8vw; font-weight:700;
      font-size:clamp(1.4rem, 2.4vw, 2.2rem); white-space:nowrap; }
    .motivation-arrow{ position:relative; width:10vw; height:4px; }
    .motivation-arrow > span{ position:absolute; left:0; top:0; height:4px; width:0; background:var(--ink); transition:width 1.4s ease .5s; }
    .motivation-arrow > span::after{ content:''; position:absolute; right:-2px; top:-8px; border-left:14px solid var(--ink);
      border-top:10px solid transparent; border-bottom:10px solid transparent; opacity:0; transition:opacity .3s ease 1.8s; }
    .motivation-goal.shown .motivation-arrow > span{ width:100%; }
    .motivation-goal.shown .motivation-arrow > span::after{ opacity:1; }
    .motivation-goal .motivation-node:last-child{ opacity:0; transform:translateX(-12px); transition:opacity .8s ease 1.7s, transform .8s ease 1.7s; }
    .motivation-goal.shown .motivation-node:last-child{ opacity:1; transform:none; }
    .motivation-harness{ max-width:60vw; }
  </style>
`, { notes: [
  "(draft) Why is this class built around projects?",
  "(draft) Our goal is to help you get from an idea to meaningful progress on that idea.",
  "(draft) That is why the course is heavily project-based.",
  "(draft) We cover the topics at a high level, to inspire you, and so that you can harness them for your own purposes."
]});
}
