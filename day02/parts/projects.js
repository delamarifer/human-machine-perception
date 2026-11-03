/* PART: projects (Day 2). Owner: to decide. Plan: 10 min, "Project expectations, templates, examples".
   Survey: "Visual Perception - Day 1" form, 14 responses (exported 2026-11-02). Only counts from the
   multiple-choice questions are shown; no names, no quotes. Interests are grouped by us from the free-text
   answers and paired with tools from the motivation demos. Expectations: syllabus.html (Final project, Grading). */
{
section('Project');

/* familiarity: [comfortable, some experience, heard of it, never encountered], n = 14 */
const FAM = [
  ['CNNs', 7, 4, 3, 0], ['Image classification', 5, 6, 3, 0], ['Image processing', 3, 7, 4, 0],
  ['Object detection', 3, 6, 5, 0], ['Image segmentation', 2, 4, 5, 3], ['Visual embeddings', 1, 3, 8, 2],
  ['Vision transformers', 1, 1, 8, 4], ['Image generation, diffusion', 0, 3, 11, 0], ['Vision-language (CLIP)', 0, 2, 9, 3],
  ['Style transfer, editing', 0, 2, 7, 5], ['Video generation', 0, 1, 13, 0]];
const SHADE = ['var(--ink)', '#64748b', '#cbd5e1', '#f1f5f9'];
const LEVEL = ['Comfortable', 'Some experience', 'Heard of it', 'Never encountered'];
st(`
  <h1 class="t">Where you are starting</h1>
  <div class="projects-fam b" data-step="1">
    ${FAM.map(([n, ...v]) => `<div class="label">${n}</div><div class="projects-stack">${v.map((x, k) =>
      x ? `<div style="flex:${x};background:${SHADE[k]}"></div>` : '').join('')}</div>`).join('')}
  </div>
  <div class="projects-key b" data-step="1">${LEVEL.map((l, k) => `<span class="label"><i style="background:${SHADE[k]}"></i>${l}</span>`).join('')}</div>
  <div class="cite">Your Day 1 survey, 14 responses</div>
  <style>
    .projects-fam{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:auto 1fr; gap:.9vh 1.2vw; align-items:center; }
    .projects-fam > .label{ text-align:right; font-size:clamp(1rem, 1.4vw, 1.3rem); }
    .projects-stack{ display:flex; height:2.6vh; gap:2px; }
    .projects-stack > div{ border-radius:3px; }
    .projects-key{ display:flex; gap:2vw; justify-content:center; }
    .projects-key i{ display:inline-block; width:1.4vh; height:1.4vh; border-radius:3px; margin-right:.5vw; border:1px solid #cbd5e1; }
  </style>
`, { notes: [
  "(draft) Thank you for the survey. Here is where you are starting.",
  "(draft) Each row is a topic; each bar is all fourteen of you. Most of you are comfortable or have some experience with CNNs and image classification. Almost everyone has heard of image and video generation, vision transformers and models like CLIP, but few have used them. That is exactly where weeks two and three go."
]});

const F = [['Understanding the theory and methods', 11], ['Building practical applications', 10], ['Research and exploration', 10], ['Creative experimentation', 4]];
st(`
  <h1 class="t">What you want to focus on</h1>
  <div class="projects-focus">
    ${F.map(([n, c], k) => `<div class="label b" data-step="${k + 1}">${n}</div>
      <div class="projects-tr b" data-step="${k + 1}"><div style="width:${c / 14 * 100}%"></div></div>
      <div class="lead b" data-step="${k + 1}">${c}</div>`).join('')}
  </div>
  <div class="cite">Your Day 1 survey, 14 responses; you could pick more than one</div>
  <style>
    .projects-focus{ margin:auto 0; display:grid; grid-template-columns:auto 1fr auto; gap:2.6vh 1.2vw; align-items:center; }
    .projects-focus > .label{ text-align:right; font-size:clamp(1.2rem, 1.9vw, 1.7rem); }
    .projects-tr{ height:3.4vh; background:#f1f5f9; border-radius:4px; overflow:hidden; }
    .projects-tr > div{ height:100%; background:var(--ink); border-radius:4px; }
  </style>
`, { notes: [
  "(draft) What you want to focus on. You could pick more than one.",
  "(draft) Eleven of you want to understand the theory and methods.",
  "(draft) Ten want to build practical applications.",
  "(draft) Ten want to do research and exploration.",
  "(draft) And four want creative experimentation. The project is where all four meet."
]});

/* The project ideas you sent, one per answer that named one. Paraphrased, no names, no quotes
   (Fernanda, 2026-11-02: grouped data only, except the project ideas). */
const IDEAS = [
  'Flood mapping from satellite images, with weather and geospatial data',
  'Finding waste in the ocean and other large bodies of water',
  'Downscaling climate data from satellite to ground level, maybe with diffusion',
  'Computer vision for climate change and the environment',
  'Detecting abnormalities in medical images to help diagnosis',
  'Cancer detection, and explaining what the model decided',
  'A memory aid for neurodegenerative disease, adapted to low-resource settings',
  'Turning a dancer\'s movement into music',
  'Taking machine perception from 2D images to the 3D world',
  'Building a video generator'];
st(`
  <h1 class="t">The ideas you sent us</h1>
  <div class="projects-sent b">${IDEAS.map(i => `<div>${i}</div>`).join('')}</div>
  <div class="cite">From your Day 1 survey; names left out</div>
  <style>
    .projects-sent{ margin:auto 0; display:grid; grid-template-columns:1fr 1fr; gap:2.6vh 4vw; }
    .projects-sent > div{ font-size:clamp(1.1rem, 1.7vw, 1.6rem); line-height:1.3; padding-left:1.2vw; border-left:3px solid var(--line); }
  </style>
`, { notes: [
  "(draft) Here are the project ideas you sent us.",
  "(draft) Flood mapping from satellite images. Finding waste in the ocean. Downscaling climate data. Medical images: finding abnormalities, detecting cancer, explaining the decision. A memory aid adapted for low-resource settings. Turning dance into music. Going from 2D to 3D. A video generator. These are all real projects you could build in three weeks, with the tools we will cover. Next, we grouped them, and paired each group with tools."
]});

/* interests (our grouping of the free-text answers) → tools from today's demos */
const idea = (name, eg, tools, step) => `<div class="projects-idea b" data-step="${step}">
  <b>${name}</b><div class="label">${eg}</div><div class="label projects-tools">Try: ${tools}</div></div>`;
st(`
  <h1 class="t">Your ideas, and tools for them</h1>
  <div class="projects-ideas">
    ${idea('Climate and disasters, from above', 'Flood mapping, change detection, downscaling, waste in the water', 'AlphaEarth embeddings · DINOv3 · SAM 3', 1)}
    ${idea('Medical images', 'Finding abnormalities, cancer, explaining a decision', 'MedGemma · MedSigLIP · transfer learning', 2)}
    ${idea('Find and outline objects', 'Detection and segmentation', 'SAM 3 · RF-DETR · YOLO', 3)}
    ${idea('Beyond 2D', '3D, robots, self-driving', 'VGGT · Depth Anything · Gemini Robotics-ER', 4)}
    ${idea('Generate images and video', 'Diffusion, video generation', 'Hugging Face diffusers · open video models', 5)}
    ${idea('Assistive and creative', 'Memory aids, movement into music', 'Vision-language models · pose estimation', 6)}
  </div>
  <style>
    .projects-ideas{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:repeat(3, 1fr); grid-template-rows:1fr 1fr; gap:2vh 1.6vw; }
    .projects-idea{ border:2px solid var(--line); border-radius:14px; padding:1.8vh 1.2vw; display:flex; flex-direction:column; gap:1vh; }
    .projects-idea b{ font-size:clamp(1.3rem, 2vw, 1.8rem); line-height:1.2; }
    .projects-tools{ margin-top:auto; font-weight:700; }
  </style>
`, { notes: [
  "(draft) You also told us what you would like to work on. We grouped your answers, and paired each group with tools you just saw.",
  "(draft) Several of you want to work on climate and disasters from satellite images: flood mapping, change detection, downscaling climate data, finding waste in the water. AlphaEarth embeddings, DINOv3 trained on satellite images, and SAM 3 for outlining are all places to start.",
  "(draft) Medical images: finding abnormalities, explaining what a model decided. MedGemma and MedSigLIP are open models built for this, and transfer learning is week two.",
  "(draft) Finding and outlining objects: SAM 3, or a detector such as RF-DETR or YOLO.",
  "(draft) Going beyond 2D: 3D, robots, driving. VGGT and Depth Anything for geometry; Gemini Robotics-ER is available to developers.",
  "(draft) Generating images and video: the Hugging Face diffusers library, and open video models.",
  "(draft) And assistive and creative ideas, like memory aids or turning movement into music: vision-language models and pose estimation."
]});

st(`
  <h1 class="t">Two project tracks</h1>
  <div class="label projects-outcome"><b>By the end, you can</b> · know the two project tracks</div>
  <ul class="frag">
    <li class="b"><b>Build a demo</b>: a working application someone can try</li>
    <li class="b"><b>Run an experiment</b>: explore or overcome a limitation, and answer with a measurement</li>
    <li class="b">Friday: general idea · Monday: detailed proposal</li>
    <li class="b">Week 2, Wednesday: meet with us</li>
    <li class="b">Last day: presentation · end of course: write-up</li>
    <li class="b">45% of the grade</li>
  </ul>
  <style>.projects-outcome{ color:var(--mute); } .projects-outcome b{ color:var(--ink); }</style>
`, { notes: [
  "(draft) The final project comes in two tracks. By the end of this part, you know both.",
  "(draft) Build a demo: a working computer vision application that someone can try.",
  "(draft) Or run an experiment: explore a limitation of a vision model, or try to overcome one, and answer with a measurement. It is a small rehearsal for a research project.",
  "(draft) The steps are the same for both. By Friday, your general idea, through a short Google form; we share them so you can find teammates. By Monday, a detailed proposal.",
  "(draft) By Wednesday of week two, a meeting with one of us about your proposal.",
  "(draft) On the last day, a presentation to the class; and at the end of the course, a short write-up. Show it working, and show honestly where it fails.",
  "(draft) Altogether, the project is 45 percent of your grade."
]});

/* The course's project templates page, live (Fernanda, 2026-11-02). Same-origin, so the right and left
   arrows still change slides after a click inside it; scroll with the trackpad or up and down. */
const keys = `try{ this.contentWindow.addEventListener('keydown', e => {
  if(e.key === 'ArrowRight' || e.key === 'PageDown'){ e.preventDefault(); deck.fwd(); }
  if(e.key === 'ArrowLeft' || e.key === 'PageUp'){ e.preventDefault(); deck.bwd(); } }); }catch(e){}`;
st(`
  <h1 class="t">Project templates</h1>
  <iframe class="projects-site b" src="../templates.html" title="Project templates" onload="${keys.replace(/"/g, '&quot;')}"></iframe>
  <style>.projects-site{ flex:1 1 auto; min-height:0; width:100%; border:1px solid var(--line); border-radius:12px; }</style>
`, { notes: [
  "(draft) Every step has a template, on the course website.",
  "(draft) (Scroll through.) Two tracks, pick the one that fits. Build a demo: a working computer vision application someone can try. Or run an experiment: explore a limitation of a vision model, or try to overcome one, and answer with a measurement. Then one template per step: the general idea by Friday, the detailed proposal by Monday, the meeting with us in week two, the presentation on the last day, and the write-up."
]});

st(`
  <h1 class="t">Example projects</h1>
  <div class="todo b">Two or three example projects (our own, as in the Day 1 plan): one for each track, build a demo and run an experiment.</div>
`, { notes: [
  "(draft) A few examples to get you started.",
  "(to write) The examples."
]});
}
