/* PART: opening (Day 2). Owner: to decide (see README.md). */
{
section('Title');

st(`
  <div class="center" style="margin:auto">
    <div class="statement" style="font-weight:700;font-size:clamp(2.4rem,4.4vw,4rem)">Computer Vision:<br>Promise, Pitfalls, and Your Place in It</div>
    <div class="lead" style="margin-top:3vh">Day 2</div>
    <div class="label" style="margin-top:1.5vh">Fernanda de la Torre · Shreya Pandit</div>
  </div>
`, { blank: false, notes: "(draft) Welcome back. Day 2: Computer Vision: promise, pitfalls, and your place in it." });

/* About me (Fernanda, 2026-11-03), right after the title. The visual is borrowed from her thesis defense, "Models as
   candidates of computational accounts" (thesis-defense/outline/parts/intro.js): a model and the brain, joined by her
   question. The brain is her own render (thesis-defense/assets/outline/intro-cortex/handoff-brain.png, resized). */
const NET = `<svg viewBox="0 0 160 110" class="opening-net" aria-hidden="true">
  ${[[8, 20, 14, 80], [30, 28, 12, 64], [48, 28, 12, 64], [70, 36, 12, 48], [88, 36, 12, 48], [110, 44, 12, 32], [132, 50, 14, 20]].map(([x, y, w, h]) =>
    `<path d="M${x},${y} l6,-6 l${w},0 l-6,6 z M${x + w},${y} l6,-6 l0,${h} l-6,6 z" fill="#e2e8f0" stroke="#64748b" stroke-width="2"/>
     <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#f8fafc" stroke="#64748b" stroke-width="2"/>`).join('')}
</svg>`;
st(`
  <h1 class="t">About me</h1>
  <div class="opening-about">
    <div class="opening-me">
      <div class="lead b" data-step="1"><b>Just defended: PhD, Brain and Cognitive Sciences, MIT</b></div>
      <div class="lead b" data-step="2">Looking into how AI models can serve as hypotheses for the brain, and other questions</div>
      <div class="opening-help b" data-step="3">
        <div class="label opening-help-head">How I can help</div>
        <ul class="frag">
          <li class="b" data-step="3">Questions and advice about PhD programs</li>
          <li class="b" data-step="4">Connections to MIT or other academics</li>
        </ul>
      </div>
    </div>
    <div class="opening-hyp b" data-step="2">
      <div class="opening-hyp-model">${NET}<div class="label">AI model</div></div>
      <div class="opening-hyp-link"><span>A good computational account?</span></div>
      <div class="opening-hyp-brain"><img src="assets/about/brain.png" alt=""><div class="label">Brain</div></div>
    </div>
  </div>
  ${cite('Visual: from my thesis defense (brain: my render of auditory cortex)')}
  <style>
    .opening-about{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1fr 1.15fr; gap:3vw; align-items:center; }
    .opening-me{ display:flex; flex-direction:column; gap:2.4vh; }
    .opening-help{ border:2px solid var(--line); border-radius:14px; padding:1.6vh 1.4vw; }
    .opening-help-head{ font-weight:700; color:var(--mute); text-transform:uppercase; letter-spacing:.06em; }
    .opening-help ul.frag{ margin:.6vh 0 0; }
    .opening-hyp{ display:grid; grid-template-columns:1fr 1.1fr 1.2fr; align-items:center; gap:.6vw; }
    .opening-hyp-model, .opening-hyp-brain{ display:flex; flex-direction:column; align-items:center; gap:1vh; text-align:center; }
    .opening-hyp-model{ border:3px solid #334155; border-radius:18px; padding:2vh .8vw; }
    .opening-net{ width:100%; }
    .opening-hyp-brain img{ width:100%; }
    .opening-hyp-link{ position:relative; border-top:3px solid #64748b; }
    .opening-hyp-link span{ position:absolute; left:-1vw; right:-1vw; bottom:.5em; text-align:center; font-weight:700; font-style:italic;
      font-size:clamp(1.05rem, 1.6vw, 1.5rem); line-height:1.2; }
  </style>
`, { notes: [
  "(draft) A little about me.",
  "(draft) I just defended my PhD in Brain and Cognitive Sciences at MIT.",
  "(draft) My research looks at how AI models can serve as hypotheses for the brain: if a model is a good computational account of what the brain does, it should line up with people's behavior and with brain responses, and we can test that. And other questions along the way.",
  "(draft) How I can help you: if you have questions about PhD programs, or want advice on applying, come talk to me.",
  "(draft) And I'm happy to help with connections to MIT or to other academics working on what you care about."
]});

/* Today: one row per segment. Row titles are the syllabus's own Day 2 outcomes ("By the end, you can", and
   "In the lab, you will"), in syllabus.html #schedule; the label is the segment and its minutes (plan, Day 2).
   The syllabus review has no outcome of its own. Each row has a small visual taken from later in the deck.
   The bar on top is the class, segment widths in minutes; each segment fills in with its row. */
const SEG = [
  {min: 5, label: 'Syllabus<br><span class=\"opening-mins\">5 min</span>', title: ['The plan for the three weeks'],
   vis: `<div class="opening-weeks"><i>1</i><i>2</i><i>3</i></div>`},
  {min: 30, label: 'Motivation<br><span class=\"opening-mins\">30 min</span>', title: ['Say what today\'s vision systems do well and where they fail', 'Explain why we look to human vision to get past those limits'],
   vis: `<div class="opening-pair"><img src="assets/one-photo/crop.jpg" alt=""><img src="assets/human-vs-machine/crop.jpg" alt=""></div>`},
  {min: 10, label: 'Project<br><span class=\"opening-mins\">10 min</span>', title: ['Know what a project can look like'],
   vis: `<div class="opening-weeks opening-kinds"><i>Demo</i><i>Exp.</i><i>…</i></div>`},
  {min: 55, label: 'Lab<br><span class=\"opening-mins\">50–60 min</span>', title: ['Recover the 3D shape of a simple scene from one image, by writing its assumptions as equations'],
   vis: `<div class="opening-pair"><img src="assets/simple-system/world.png" alt=""><img src="assets/simple-system/recovered-behind.png" alt=""></div>`},
  {min: 20, label: 'Research and papers<br><span class=\"opening-mins\">20 min</span>', title: ['Tell a research question from a building project', 'Read a research paper efficiently, then discuss one: perception as an inverse problem'],
   vis: `<div class="opening-weeks opening-kinds"><i>1</i><i>2</i><i>3</i></div>`},
];
const TOTAL = SEG.reduce((a, x) => a + x.min, 0);
st(`
  <h1 class="t">Today</h1>
  <div class="label opening-lead">By the end, you can</div>
  <div class="opening-bar">${SEG.map((x, k) => `<div class="b" data-step="${k + 1}" style="flex:${x.min}"></div>`).join('')}</div>
  <div class="opening-rows">${SEG.map((x, k) => `
    <div class="opening-row b" data-step="${k + 1}">
      <div class="label opening-min">${x.label}</div>
      <div class="opening-vis">${x.vis}</div>
      <div>${x.title.map(t => `<div class="opening-title">${t}</div>`).join('')}</div>
    </div>`).join('')}</div>
  <style>
    .opening-bar{ display:flex; gap:4px; height:1.2vh; }
    .opening-bar > div{ background:var(--ink); border-radius:3px; }
    .opening-rows{ flex:1 1 auto; min-height:0; display:grid; grid-template-rows:repeat(${SEG.length}, 1fr); gap:1.2vh; }
    .opening-lead{ color:var(--mute); margin-top:-1.4vh; }
    .opening-row{ display:grid; grid-template-columns:11vw 15vw 1fr; gap:1.6vw; align-items:center; border-top:1px solid var(--line); padding-top:1vh; }
    .opening-min{ font-weight:700; line-height:1.3; }
    .opening-mins{ font-weight:400; color:var(--mute); }
    .opening-title{ font-size:clamp(1.1rem, 1.75vw, 1.6rem); font-weight:700; line-height:1.25; }
    .opening-title + .opening-title{ margin-top:.6vh; }
    .opening-kinds i{ font-size:clamp(.8rem, 1.1vw, 1.05rem); }
    .opening-vis{ height:9vh; display:flex; align-items:center; }
    .opening-pair{ display:flex; gap:.5vw; height:100%; }
    .opening-pair img{ height:100%; aspect-ratio:1; object-fit:cover; border-radius:6px; border:1px solid var(--line); }
    .opening-weeks{ display:flex; gap:.5vw; height:70%; }
    .opening-weeks i{ font-style:normal; font-weight:700; aspect-ratio:1; height:100%; border:2px solid var(--ink); border-radius:8px;
      display:flex; align-items:center; justify-content:center; font-size:clamp(1rem, 1.5vw, 1.4rem); }
    .opening-mini{ display:flex; align-items:flex-end; gap:.4vw; height:80%; }
    .opening-mini b{ width:1.4vw; background:var(--ink); border-radius:3px 3px 0 0; }
  </style>
`, { notes: [
  "(draft) Here is today, and what you will be able to do by the end of it. The bar on top is the whole class; each piece fills in as we go.",
  "(draft) First, five minutes on the plan for the next three weeks: week by week, day by day, and how you are graded.",
  "(draft) Then about thirty minutes of motivation. By the end, you can say what today's vision systems do well and where they fail, and explain why we look to human vision to get past those limits.",
  "(draft) Ten minutes on your project. You will know what a project can look like, for example a demo or an experiment, and its steps.",
  "(draft) The biggest piece, about an hour, is the lab: you recover the 3D shape of a simple scene from one image, by writing its assumptions as equations. And at the end, a question for you: what would give it a better world model?",
  "(draft) To close, twenty minutes. You can tell a research question from a building project, and read a research paper efficiently. Then we discuss one: perception as an inverse problem."
]});
}
