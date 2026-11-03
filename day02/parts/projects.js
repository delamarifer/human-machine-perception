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

/* Simple line icons, drawn here (no outside images). 48 x 48, ink stroke. */
const icon = (body) => `<svg class="projects-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2"
  stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
const ICON = {
  above: icon('<rect x="18" y="6" width="8" height="6" rx="1"/><path d="M10 9h8M26 9h8M10 6v6M34 6v6M22 12v5"/><path d="M22 20l-8 11M22 20l8 11" stroke-dasharray="2 3"/><path d="M4 36c4-3 8 3 12 0s8 3 12 0 8 3 12 0 4 0 4 0M4 42c4-3 8 3 12 0s8 3 12 0 8 3 12 0"/>'),
  medical: icon('<rect x="6" y="6" width="36" height="36" rx="4"/><path d="M24 12v24M17 17c3 2 4 6 3 12M31 17c-3 2-4 6-3 12"/><circle cx="31" cy="31" r="5" stroke-dasharray="3 2"/>'),
  outline: icon('<rect x="5" y="7" width="38" height="34" rx="1" stroke-dasharray="4 3"/><path d="M14 33c-2-6 2-12 8-14s12 0 13 5-3 10-9 11-10 2-12-2z"/>'),
  depth: icon('<path d="M24 5l16 9v20l-16 9-16-9V14z"/><path d="M8 14l16 9 16-9M24 23v20"/>'),
  generate: icon('<rect x="5" y="11" width="30" height="26" rx="2"/><path d="M5 17h30M5 31h30M11 11v6M17 11v6M23 11v6M29 11v6M11 31v6M17 31v6M23 31v6M29 31v6"/><path d="M40 6v8M36 10h8M42 22v4M40 24h4"/>'),
  assist: icon('<circle cx="15" cy="9" r="4"/><path d="M15 13v14M15 18l-8 5M15 18l9-3M15 27l-6 13M15 27l7 12"/><path d="M34 34V16l10-3v18"/><circle cx="31" cy="34" r="3"/><circle cx="41" cy="31" r="3"/>'),
  demo: icon('<rect x="5" y="8" width="38" height="26" rx="2"/><path d="M17 42h14M24 34v8"/><path d="M20 15l10 6-10 6z"/>'),
  experiment: icon('<path d="M6 6v36h36"/><path d="M14 34V24M22 34V14M30 34V20M38 34V10"/><path d="M12 18l8-8 8 6 10-10" stroke-dasharray="3 3"/>'),
};

/* One color per theme, the same on this slide and on the cards after it (fills, borders and icons only,
   never text). */
const THEME = { above:'#0ea5e9', medical:'#f43f5e', outline:'#10b981', depth:'#f97316', generate:'#d946ef', assist:'#8b5cf6' };

/* The project ideas you sent, one per answer that named one. Paraphrased, no names, no quotes
   (Fernanda, 2026-11-02: grouped data only, except the project ideas). Clustered by theme, the same groups as
   the cards on the next slide. A keyword on screen; hover it for the full idea. */
const CLUSTERS = [
  ['above', 'Climate and environment', [
    ['Flood mapping', 'Flood mapping from satellite images, with weather and geospatial data'],
    ['Ocean waste', 'Finding waste in the ocean and other large bodies of water'],
    ['Climate downscaling', 'Downscaling climate data from satellite to ground level, maybe with diffusion'],
    ['Climate change', 'Computer vision for climate change and the environment']]],
  ['medical', 'Medical images', [
    ['Abnormalities', 'Detecting abnormalities in medical images to help diagnosis'],
    ['Cancer, explained', 'Cancer detection, and explaining what the model decided']]],
  ['assist', 'Assistive and creative', [
    ['Memory aid', 'A memory aid for neurodegenerative disease, adapted to low-resource settings'],
    ['Dance into music', 'Turning a dancer\'s movement into music']]],
  ['depth', 'Beyond 2D', [['2D to 3D', 'Taking machine perception from 2D images to the 3D world']]],
  ['generate', 'Generating', [['Video generator', 'Building a video generator']]]];
st(`
  <h1 class="t">The ideas you sent us</h1>
  <div class="projects-cloud b" data-step="1">
    ${CLUSTERS.map(([ic, name, ideas]) => `<div class="projects-cluster projects-n${ideas.length}" style="--pc:${THEME[ic]}">
      <div class="projects-cluster-head">${ICON[ic]}<span class="label">${name}</span></div>
      <div class="projects-chips">${ideas.map(([k, full]) =>
        `<span class="projects-chip" tabindex="0" data-full="${full.replace(/"/g, '&quot;')}">${k}</span>`).join('')}</div>
    </div>`).join('')}
  </div>
  <div class="label projects-hint b" data-step="1">Hover over an idea to read it in full</div>
  <div class="cite">From your Day 1 survey; names left out</div>
  <style>
    .projects-cloud{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:repeat(6, minmax(0, 1fr));
      grid-template-rows:1.15fr 1fr; gap:2.2vh 1.4vw; padding-top:1vh; }
    .projects-cluster{ grid-column:span 2; background:color-mix(in srgb, var(--pc) 10%, #fff); border:2px solid color-mix(in srgb, var(--pc) 35%, #fff); border-radius:28px;
      padding:1.6vh 1.2vw; display:flex; flex-direction:column; gap:1.4vh; }
    .projects-cluster.projects-n4{ grid-column:span 4; }
    .projects-cluster-head{ display:flex; align-items:center; gap:.8vw; }
    .projects-cluster-head .projects-icon{ width:clamp(2rem, 3.4vw, 3.1rem); color:color-mix(in srgb, var(--pc) 75%, #0f172a); }
    .projects-cluster-head .label{ color:var(--mute); text-transform:uppercase; letter-spacing:.06em; font-size:clamp(.85rem, 1.1vw, 1.05rem) !important; font-weight:700; }
    .projects-chips{ flex:1 1 auto; display:flex; flex-wrap:wrap; align-content:center; justify-content:center; gap:1.4vh 1vw; }
    .projects-chip{ position:relative; background:#fff; border:2px solid var(--pc); box-shadow:0 2px 0 color-mix(in srgb, var(--pc) 45%, #fff); border-radius:999px; padding:.9vh 1.3vw;
      font-size:clamp(1.15rem, 1.9vw, 1.75rem); font-weight:700; cursor:help; white-space:nowrap;
      transition:background .2s, color .2s; }
    .projects-chip:hover, .projects-chip:focus{ background:color-mix(in srgb, var(--pc) 22%, #fff); outline:none; }
    .projects-chip::after{ content:attr(data-full); position:absolute; left:50%; bottom:calc(100% + 1.2vh); transform:translate(-50%, 6px);
      width:max-content; max-width:26vw; white-space:normal; text-align:center; background:var(--ink); color:#fff;
      font-size:clamp(.95rem, 1.35vw, 1.25rem); font-weight:400; line-height:1.3; padding:1vh 1vw; border-radius:10px;
      box-shadow:0 8px 24px rgba(15,23,42,.18); opacity:0; pointer-events:none; transition:opacity .2s, transform .2s; z-index:5; }
    .projects-chip:hover::after, .projects-chip:focus::after{ opacity:1; transform:translate(-50%, 0); }
    .projects-hint{ color:var(--mute); text-align:right; font-size:clamp(.9rem, 1.2vw, 1.1rem) !important; }
  </style>
`, { notes: [
  "(draft) Here are the project ideas you sent us.",
  "(draft) (Hover over a keyword to show the full idea.) Climate and the environment, the biggest group: flood mapping from satellite images, finding waste in the ocean, downscaling climate data, and computer vision for climate change. Medical images: finding abnormalities, detecting cancer and explaining the decision. Assistive and creative: a memory aid adapted for low-resource settings, and turning dance into music. Going from 2D to 3D. And a video generator. These are all real projects you could build in three weeks, with the tools we will cover. Next, we paired each group with tools."
]});

/* "Seen today" refs: the slide number of each demo, looked up by its title once the deck has started,
   so it stays right when other parts add or move slides. (Previewing ?only=projects, no number shows.) */
const seen = (name, title) => `<span class="projects-seen-ref">${name}<span data-projects-ref="${title}"></span></span>`;
(function fillRefs(){
  if(!window.deck) return setTimeout(fillRefs, 50);
  const h1 = s => ((s.html || '').match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1];
  document.querySelectorAll('[data-projects-ref]').forEach(el => {
    const i = deck.S.findIndex(s => s.kind === 'static' && (h1(s) || '').trim() === el.dataset.projectsRef);
    el.textContent = i >= 0 ? `\u00a0· slide\u00a0${deck.LABEL[i]}` : '';
  });
})();

/* interests (our grouping of the free-text answers) → tools → the demo slide that showed them */
const idea = (ic, name, eg, tools, refs, step) => `<div class="projects-idea b" data-step="${step}" style="--pc:${THEME[ic]}">
  <div class="projects-idea-head">${ICON[ic]}<b>${name}</b></div>
  <div class="label projects-eg">${eg}</div>
  <div class="projects-path"><span class="label projects-tag">Try</span><span class="label projects-tools">${tools}</span></div>
  <div class="projects-path"><span class="label projects-tag">Seen today</span><span class="label projects-seen">${refs}</span></div></div>`;
st(`
  <h1 class="t">Your ideas, and tools for them</h1>
  <div class="projects-ideas">
    ${idea('above', 'Climate and disasters, from above', 'Flood mapping, change detection, downscaling, waste in the water', 'AlphaEarth embeddings · DINOv3 · SAM 3',
      seen('AlphaEarth', 'An embedding of the planet') + seen('DINOv3', 'Learning to see without labels'), 1)}
    ${idea('medical', 'Medical images', 'Finding abnormalities, cancer, explaining a decision', 'MedGemma · MedSigLIP · transfer learning',
      seen('MedGemma', 'Images and language, in medicine'), 2)}
    ${idea('outline', 'Find and outline objects', 'Detection and segmentation', 'SAM 3 · RF-DETR · YOLO',
      seen('SAM 3', 'Segment anything you can name'), 3)}
    ${idea('depth', 'Beyond 2D', '3D, robots, self-driving', 'VGGT · Depth Anything · Gemini Robotics-ER',
      seen('VGGT', 'From photos to 3D') + seen('Gemini Robotics', 'Robots that see, plan and act'), 4)}
    ${idea('generate', 'Generate images and video', 'Diffusion, video generation', 'Hugging Face diffusers · open video models',
      seen('Genie 4', 'Generating worlds'), 5)}
    ${idea('assist', 'Assistive and creative', 'Memory aids, movement into music', 'Vision-language models · pose estimation',
      seen('Where they are blind', 'Vision-language models are blind'), 6)}
  </div>
  <style>
    .projects-ideas{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); grid-template-rows:1fr 1fr; gap:2vh 1.6vw; }
    .projects-idea{ border:2px solid color-mix(in srgb, var(--pc) 40%, #fff); background:color-mix(in srgb, var(--pc) 6%, #fff); box-shadow:inset 0 5px 0 var(--pc); border-radius:14px; padding:1.6vh 1.1vw; display:flex; flex-direction:column; gap:.9vh; min-height:0; }
    .projects-idea-head{ display:flex; align-items:center; gap:.9vw; }
    .projects-idea-head b{ font-size:clamp(1.15rem, 1.8vw, 1.65rem); line-height:1.15; }
    .projects-icon{ flex:0 0 auto; width:clamp(2.4rem, 4.2vw, 3.8rem); height:auto; color:var(--ink); }
    .projects-idea .projects-icon{ color:color-mix(in srgb, var(--pc) 75%, #0f172a); }
    .projects-eg{ color:var(--mute); line-height:1.25; }
    .projects-path{ display:grid; grid-template-columns:auto 1fr; gap:.7vw; align-items:baseline; }
    .projects-eg{ margin-bottom:auto; }
    .projects-tag{ font-size:clamp(.8rem, 1vw, .95rem) !important; text-transform:uppercase; letter-spacing:.06em; color:var(--mute);
      border:1px solid var(--line); border-radius:999px; padding:.1vh .5vw; white-space:nowrap; }
    .projects-tools{ font-weight:700; line-height:1.25; }
    .projects-seen{ display:flex; flex-direction:column; line-height:1.25; }
  </style>
`, { notes: [
  "(draft) You also told us what you would like to work on. We grouped your answers, and paired each group with tools you just saw. On each card: your idea, tools to try, and the slide where you saw one of them today.",
  "(draft) Several of you want to work on climate and disasters from satellite images: flood mapping, change detection, downscaling climate data, finding waste in the water. AlphaEarth embeddings, DINOv3 trained on satellite images, and SAM 3 for outlining are all places to start. You saw AlphaEarth and DINOv3 earlier today.",
  "(draft) Medical images: finding abnormalities, explaining what a model decided. MedGemma and MedSigLIP are open models built for this, and transfer learning is week two. MedGemma was one of today's demos.",
  "(draft) Finding and outlining objects: SAM 3, which you saw today, or a detector such as RF-DETR or YOLO.",
  "(draft) Going beyond 2D: 3D, robots, driving. VGGT and Depth Anything for geometry; Gemini Robotics-ER is available to developers. You saw VGGT and Gemini Robotics today.",
  "(draft) Generating images and video: the Hugging Face diffusers library, and open video models. Genie, today, was the far end of this.",
  "(draft) And assistive and creative ideas, like memory aids or turning movement into music: vision-language models and pose estimation. Earlier we saw where vision-language models are blind; a project here would test for that too."
]});

/* The two tracks: templates.html (hero) and syllabus.html (Final project, Grading). Step weights from
   templates.html: 2 + 5 + 3 + 15 + 20 = 45. Examples: syllabus.html "Possible directions include" (the five
   building ones under the demo, the perception one under the experiment) and the experiment proposal template's
   own example (normal images vs. images with texture swapped). Colors are the course site's: each track and
   each step keeps the color it has on templates.html (fills and dots only, never text). Each step links to
   its template. */
const PC = { demo:'#14b8a6', experiment:'#f59e0b', idea:'#14b8a6', proposal:'#8b5cf6', meeting:'#3b82f6', presentation:'#ec4899', writeup:'#f59e0b' };
const track = (ic, name, what, eg, step) => `<div class="projects-track b" data-step="${step}" style="--pc:${PC[ic]}">
  <div class="projects-track-head">${ICON[ic]}<div><b>${name}</b><div class="label">${what}</div></div></div>
  <div class="projects-eg-list"><span class="label projects-tag">For example</span>${eg.map(e => `<span class="label projects-egchip">${e}</span>`).join('')}</div></div>`;
const stepT = (id, when, what, w, step) => `<a class="projects-step b" data-step="${step}" style="--pc:${PC[id]}" href="../templates.html#${id}"
  target="_blank" rel="noopener" onclick="event.stopPropagation()"><span class="projects-dot"></span><span class="label projects-when">${when}</span>
  <span class="label projects-what">${what} ↗</span><span class="label projects-w b" data-step="6">${w}</span></a>`;
st(`
  <h1 class="t">Two project tracks</h1>
  <div class="label projects-outcome"><b>By the end, you can</b> · know the two project tracks</div>
  <div class="projects-tracks">
    ${track('demo', 'Build a demo', 'A working application someone can try',
      ['Visual search, an image memory', 'A creative image generation tool', 'A multimodal assistant', 'Detection or segmentation', 'An app for your own field'], 1)}
    <div class="projects-or label b" data-step="2">or</div>
    ${track('experiment', 'Run an experiment', 'Explore or overcome a limitation, and answer with a measurement',
      ['Human perception and vision models', 'Ambiguity or hallucination', 'Normal images vs. texture swapped'], 2)}
  </div>
  <div class="projects-time">
    <div class="label projects-same b" data-step="3">Same steps for both · each has a template</div>
    <div class="projects-line">
      <div class="projects-rail b" data-step="3"></div>
      ${stepT('idea', 'Friday', 'General idea', '2%', 3)}${stepT('proposal', 'Monday', 'Detailed proposal', '5%', 3)}
      ${stepT('meeting', 'Week 2, Wednesday', 'Meet with us', '3%', 4)}
      ${stepT('presentation', 'Last day', 'Presentation', '15%', 5)}${stepT('writeup', 'End of course', 'Write-up', '20%', 5)}
    </div>
    <div class="projects-total b" data-step="6"><span></span><b>45% of the grade</b><span></span></div>
  </div>
  <style>
    .projects-outcome{ color:var(--mute); } .projects-outcome b{ color:var(--ink); }
    .projects-tracks{ display:grid; grid-template-columns:1fr auto 1fr; gap:1.6vw; align-items:stretch; margin-top:auto; }
    .projects-track{ border:2px solid var(--pc); background:color-mix(in srgb, var(--pc) 9%, #fff); border-radius:16px;
      padding:2vh 1.5vw; display:flex; flex-direction:column; gap:1.6vh; box-shadow:inset 6px 0 0 var(--pc); }
    .projects-track-head{ display:flex; gap:1.2vw; align-items:center; }
    .projects-track .projects-icon{ width:clamp(3rem, 5vw, 4.6rem); color:var(--ink); }
    .projects-track b{ display:block; font-size:clamp(1.4rem, 2.3vw, 2.1rem); margin-bottom:.4vh; }
    .projects-track .label{ line-height:1.3; }
    .projects-eg-list{ display:flex; flex-wrap:wrap; gap:.8vh .5vw; align-items:center; }
    .projects-egchip{ background:#fff; border:1px solid color-mix(in srgb, var(--pc) 55%, #fff); border-radius:999px; padding:.3vh .8vw;
      font-size:clamp(.85rem, 1.15vw, 1.1rem) !important; }
    .projects-tag{ font-size:clamp(.75rem, .95vw, .9rem) !important; text-transform:uppercase; letter-spacing:.06em; color:var(--mute); }
    .projects-or{ align-self:center; color:var(--mute); }
    .projects-time{ margin:auto 0; display:flex; flex-direction:column; gap:1.4vh; }
    .projects-same{ color:var(--mute); }
    .projects-line{ display:grid; grid-template-columns:repeat(5, 1fr); position:relative; }
    .projects-rail{ position:absolute; left:0; right:0; top:1.1vh; height:3px; border-radius:2px;
      background:linear-gradient(90deg, ${[PC.idea, PC.proposal, PC.meeting, PC.presentation, PC.writeup].map(c => `color-mix(in srgb, ${c} 40%, #fff)`).join(', ')}); }
    .projects-step{ position:relative; display:flex; flex-direction:column; gap:.4vh; padding-right:1vw; color:var(--ink); text-decoration:none; }
    .projects-step:hover .projects-what{ text-decoration:underline; }
    .projects-dot{ width:2.4vh; height:2.4vh; border-radius:50%; background:var(--pc); margin-bottom:.8vh; box-shadow:0 0 0 4px #fff; }
    .projects-when{ color:var(--mute); }
    .projects-what{ font-weight:700; }
    .projects-w{ font-variant-numeric:tabular-nums; align-self:flex-start; background:color-mix(in srgb, var(--pc) 16%, #fff);
      border-radius:6px; padding:0 .5vw; }
    .projects-total{ display:grid; grid-template-columns:1fr auto 1fr; align-items:center; gap:1vw; }
    .projects-total span{ height:2px; background:var(--ink); }
    .projects-total b{ font-size:clamp(1.4rem, 2.3vw, 2.1rem); }
  </style>
`, { notes: [
  "(draft) The final project comes in two tracks. By the end of this part, you know both.",
  "(draft) Build a demo: a working computer vision application that someone can try. For example, from the syllabus: visual search or an image memory, a creative image generation tool, a multimodal assistant, detection or segmentation, or an application for your own field.",
  "(draft) Or run an experiment: explore a limitation of a vision model, or try to overcome one, and answer with a measurement. It is a small rehearsal for a research project. For example, from the syllabus: human perception and vision models, ambiguity, or hallucination; or, from the proposal template, the same model on normal images and on images with their texture swapped.",
  "(draft) The steps are the same for both, and each one has a template on the course website. By Friday, your general idea, through a short Google form; we share them so you can find teammates. By Monday, a detailed proposal.",
  "(draft) By Wednesday of week two, a meeting with one of us about your proposal.",
  "(draft) On the last day, a presentation to the class; and at the end of the course, a short write-up. Show it working, and show honestly where it fails.",
  "(draft) Altogether, the project is 45 percent of your grade: two percent for the idea, five for the proposal, three for the meeting, fifteen for the presentation and twenty for the write-up."
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

/* Placeholder until Fernanda picks our own examples (Day 1 plan): one slot per track. */
st(`
  <h1 class="t">Example projects</h1>
  <div class="projects-examples b">
    <div class="projects-example">${ICON.demo}<b>Build a demo</b><div class="todo">An example project of ours for this track: what it does, the tools, one picture.</div></div>
    <div class="projects-example">${ICON.experiment}<b>Run an experiment</b><div class="todo">An example project of ours for this track: the question, the measurement, one result.</div></div>
  </div>
  <style>
    .projects-examples{ margin:auto 0; display:grid; grid-template-columns:1fr 1fr; gap:3vw; }
    .projects-example{ border:2px dashed var(--line); border-radius:16px; padding:3vh 2vw; display:flex; flex-direction:column; gap:1.6vh; align-items:flex-start; }
    .projects-example b{ font-size:clamp(1.5rem, 2.5vw, 2.3rem); }
    .projects-example .projects-icon{ width:clamp(3rem, 5vw, 4.6rem); }
  </style>
`, { notes: [
  "(draft) A few examples to get you started.",
  "(to write) The examples."
]});
}
