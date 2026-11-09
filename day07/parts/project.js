/* PART: project (Day 7). Owner: Shreya. The project slides in the Google deck "Day 7"
   (fileId 1-d7HaWYSEP3EMU8Eu3EZsc9huoF877sANLRL4F8uW2U): Project Review (two slides), Project Plan Rubric, Project Rubric.
   Project Review and Project Rubric are still placeholders: her outline lines in dashed TO DO boxes, wording as she wrote it.
   Project Plan Rubric (Shreya, 2026-11-10: "a few draft plans for examples, showing 1 vs multi people"):
   - the rubric is the detailed proposal's four sections, 25% each, from templates.html (Step 2, "Build a demo" track);
   - then one example idea planned twice, solo and as a team of three, row by row in the same four sections. The idea is the
     Day 6 lab's fallback project (a sign-language app for doctors). It is an EXAMPLE, labelled as one; no team-size rule exists
     yet (logged in feedback/_day.md). Days 13 to 15 are the syllabus's project days. No speaker notes. */
{
section('Project Review');

const prTodo = (title, lines) => st(`
  <style>
    .project-todo{ flex:1 1 auto; min-height:0; display:flex; flex-direction:column; justify-content:center; gap:2.4vh; }
    .project-todo .d6-todo{ padding:2.2vh 1.6vw; }
    .project-todo .project-tag{ font-size:clamp(.8rem, 1.1vw, 1.05rem); text-transform:uppercase; letter-spacing:.08em; color:var(--mute); }
  </style>
  <h1 class="t">${title}</h1>
  <div class="project-todo">
    ${lines.map(t => `<div class="d6-todo b" data-step="1"><div class="project-tag">To do</div><div class="lead">${t}</div></div>`).join('')}
  </div>
`);

prTodo('Project Review', ['Overview of the project ideas (topics, field, tools etc)', 'Things we noticed that we liked', 'Things we noticed that people didn’t consider']);
prTodo('Project Review', ['Potential Groupings + Ideas', 'What goes into the project plan']);

/* ---------- Project Plan Rubric: the four sections of the detailed proposal (templates.html, Step 2). ---------- */
const PR_RUBRIC = [
  ['Problem and motivation', 'what it does, for whom, and why it is hard for a computer'],
  ['Approach', 'input → steps → output; which pretrained models, which data'],
  ['Evaluation', 'a test set, what counts as success, one number you report'],
  ['A realistic plan', 'smallest working version and its day · what you add if there is time · biggest risk and plan B · who does what'],
];
st(`
  <style>
    .project-rubric{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1fr 1fr; grid-template-rows:1fr 1fr; gap:1.6vh 1.6vw; }
    .project-rubric .d6-card{ justify-content:center; }
    .project-pct{ font-size:clamp(1.6rem, 3vw, 2.8rem); font-weight:800; line-height:1; }
    @media (max-width: 820px), (max-aspect-ratio: 1/1){ .project-rubric{ grid-template-columns:1fr; grid-template-rows:none; } }
  </style>
  <h1 class="t">Project Plan Rubric</h1>
  <div class="lead b" data-step="1">Detailed proposal: 1–2 pages, four sections</div>
  <div class="project-rubric">
    ${PR_RUBRIC.map(([h, t], i) => `<div class="d6-card b" data-step="${i + 1}"><div class="project-pct">25%</div><div class="lead"><b>${h}</b></div><div class="label">${t}</div></div>`).join('')}
  </div>
  ${rdCite(d6Link('../templates.html', 'Project templates') + ', Step 2 · Detailed proposal')}
`);

/* ---------- Example plan: one idea, one person vs a team of three. Same core; the team adds in parallel, with named owners. ---------- */
const PR_ROWS = [
  ['Problem', 'a doctor and a Deaf patient with no interpreter: recognize a few common signs from a phone video', null],
  ['Approach', 'hand keypoints from a pretrained pose model → a small classifier → a Colab notebook', '+ a Gradio app anyone can try on a phone video'],
  ['Evaluation', 'accuracy on signers not seen in training; expect look-alike signs to fail', '+ a test set the team records: other phones, other lighting'],
  ['Smallest version', '3 signs, end to end, by Day 13', null],
  ['If there is time', 'grow to 10 signs', '10 signs, the recorded test set and the app, one person each'],
  ['Risk → plan B', 'keypoints fail on blurry video → fewer signs, clearer clips', '+ the pieces do not fit → agree on one keypoint file format on day one'],
  ['Who does what', '—', 'A: data and test set · B: model · C: app and evaluation'],
];
st(`
  <style>
    .project-ex{ width:100%; border-collapse:collapse; font-size:clamp(.9rem, 1.5vw, 1.45rem); }
    .project-ex th, .project-ex td{ padding:.9vh .9vw; border-top:1px solid var(--line); text-align:left; vertical-align:top; line-height:1.3; }
    .project-ex th{ background:#0f172a; color:#f8fafc; border-top:none; }
    .project-ex td.rowh{ font-weight:700; white-space:nowrap; width:14%; }
    .project-ex td.same{ text-align:center; color:var(--mute); }
    .project-ex .project-who td{ font-weight:600; }
    .project-flag{ display:inline-block; font-size:clamp(.7rem, 1vw, .95rem); text-transform:uppercase; letter-spacing:.08em; border:1.5px solid var(--ink); border-radius:999px; padding:.15em .7em; margin-left:.8vw; vertical-align:middle; }
  </style>
  <h1 class="t">Example plan: one person vs a team</h1>
  <div><span class="project-flag" style="margin-left:0">an example, not a template to copy</span></div>
  <table class="project-ex">
    <tr class="b" data-step="1"><th></th><th style="width:43%">Solo</th><th>Team of three</th></tr>
    ${PR_ROWS.map(([h, solo, team], i) => `<tr class="b${h === 'Who does what' ? ' project-who' : ''}" data-step="${i < 3 ? 1 : i - 1}"><td class="rowh">${h}</td>${team === null
      ? `<td colspan="2">${solo} <span style="color:var(--mute)">(same for both)</span></td>`
      : `<td>${solo}</td><td>${team}</td>`}</tr>`).join('')}
  </table>
  <div class="lead b" data-step="${PR_ROWS.length - 1}" style="margin-top:1.4vh"><b>Same core for both</b> · a team adds work in parallel, with an owner for each piece, not three times the idea</div>
  ${rdCite('Example idea: the Day 6 lab’s sign-language app for doctors · sections from ' + d6Link('../templates.html', 'Project templates') + ', Step 2 · team size is an example')}
`);

prTodo('Project Rubric', ['The final output and how this is all evaluated']);
}
