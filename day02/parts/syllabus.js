/* PART: syllabus (Day 2). Owner: to decide. Plan: 5 min, "the plan for the next 3 weeks, and the grading
   details". Content from syllabus.html (Weeks, Grading), not invented. */
{
section('Syllabus');

const week = (n, name, goal, step) => `<div class="syllabus-week b" data-step="${step}">
  <div class="label">Week ${n}</div><b>${name}</b><div class="label">${goal}</div></div>`;
st(`
  <h1 class="t">Three weeks</h1>
  <div class="syllabus-weeks">
    ${week(1, 'Understanding images', 'How images encode visual information; structure from pixels', 1)}
    ${week(2, 'Learning visual representations', 'How models learn meaningful representations of images', 2)}
    ${week(3, 'Building vision systems', 'Modern models combined into applications', 3)}
  </div>
  <div class="cite">Full syllabus: delamarifer.github.io/human-machine-perception/syllabus.html</div>
  <style>
    .syllabus-weeks{ margin:auto 0; display:grid; grid-template-columns:repeat(3, 1fr); gap:2vw; }
    .syllabus-week{ border:2px solid var(--ink); border-radius:14px; padding:3vh 1.4vw; display:flex; flex-direction:column; gap:1.2vh; }
    .syllabus-week b{ font-size:clamp(1.5rem, 2.4vw, 2.2rem); line-height:1.2; }
  </style>
`, { notes: [
  "(draft) The plan for the next three weeks.",
  "(draft) Week one, understanding images: how images encode visual information, and how we pull structure out of pixels. Image processing, edges, geometry, matching.",
  "(draft) Week two, learning visual representations: neural networks, transfer learning, embeddings, and vision-language models like CLIP.",
  "(draft) Week three, building vision systems: foundation models, detection and segmentation, multimodal systems, image generation, and how to evaluate where a system fails."
]});

const W = [['Final project', 45], ['Daily response papers', 24], ['Assignment 1', 15], ['Assignment 2', 15], ['Final-day question', 1]];
st(`
  <h1 class="t">Grading</h1>
  <div class="syllabus-grade">
    ${W.map(([n, p], k) => `<div class="label b" data-step="${k + 1}">${n}</div>
      <div class="syllabus-tr b" data-step="${k + 1}"><div style="width:${p / 45 * 100}%"></div></div>
      <div class="lead b" data-step="${k + 1}">${p}%</div>`).join('')}
  </div>
  <style>
    .syllabus-grade{ margin:auto 0; display:grid; grid-template-columns:auto 1fr auto; gap:2.4vh 1.2vw; align-items:center; }
    .syllabus-grade > .label{ text-align:right; font-size:clamp(1.3rem, 2vw, 1.8rem); }
    .syllabus-tr{ height:3.4vh; }
    .syllabus-tr > div{ height:100%; background:var(--ink); border-radius:4px; }
  </style>
`, { notes: [
  "(draft) How you are graded.",
  "(draft) The final project is the biggest piece: 45 percent. That is the proposal, the write-up and the presentation on the last day.",
  "(draft) Daily response papers: 24 percent. Twelve of them, 2 percent each. Each has one high-level question about the day's paper and three conceptual questions about the take-home lab.",
  "(draft) Assignment 1: 15 percent, coding and conceptual questions.",
  "(draft) Assignment 2: another 15 percent.",
  "(draft) And 1 percent for one short, easy question on the last day. Any genuine answer gets full credit."
]});
}
