/* PART: opening (Day 2). Owner: to decide (see README.md). */
{
section('Title');

st(`
  <div class="center" style="margin:auto">
    <div class="statement" style="font-weight:700;font-size:clamp(2.4rem,4.4vw,4rem)">Motivation and limitations</div>
    <div class="lead" style="margin-top:3vh">Day 2</div>
    <div class="label" style="margin-top:1.5vh">Fernanda de la Torre · Shreya Pandit</div>
  </div>
`, { blank: false, notes: "(draft) Welcome back. Day 2: motivation and limitations." });

/* Today: one row per segment. Row titles are the syllabus's own Day 2 outcomes ("By the end, you can", and
   "In the lab, you will"), in syllabus.html #schedule; the label is the segment and its minutes (plan, Day 2).
   The syllabus review has no outcome of its own. Each row has a small visual taken from later in the deck.
   The bar on top is the class, segment widths in minutes; each segment fills in with its row. */
const SEG = [
  {min: 5, label: 'Syllabus<br><span class=\"opening-mins\">5 min</span>', title: ['The plan for the three weeks'],
   vis: `<div class="opening-weeks"><i>1</i><i>2</i><i>3</i></div>`},
  {min: 30, label: 'Motivation<br><span class=\"opening-mins\">30 min</span>', title: ['Say what today\'s vision systems do well and where they fail', 'Explain why we look to human vision to get past those limits'],
   vis: `<div class="opening-pair"><img src="assets/one-photo/crop.jpg" alt=""><img src="assets/human-vs-machine/crop.jpg" alt=""></div>`},
  {min: 10, label: 'Project<br><span class=\"opening-mins\">10 min</span>', title: ['Know the two project tracks'],
   vis: `<div class="opening-weeks opening-kinds"><i>Demo</i><i>Exp.</i></div>`},
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
  "(draft) Ten minutes on your project. You will know the two project tracks: build a demo, or run an experiment.",
  "(draft) The biggest piece, about an hour, is the lab: you recover the 3D shape of a simple scene from one image, by writing its assumptions as equations. And at the end, a question for you: what would give it a better world model?",
  "(draft) To close, twenty minutes. You can tell a research question from a building project, and read a research paper efficiently. Then we discuss one: perception as an inverse problem."
]});
}
