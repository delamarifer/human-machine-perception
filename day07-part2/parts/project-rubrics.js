/* PART: project-rubrics (Day 7 part 2). Owner: Fernanda. Project Plan Rubric, the example plan and Project Rubric,
   copied unchanged from Shreya's day07/parts/project.js (2026-11-10); no speaker notes on those three. The deep dive at the end has draft notes. */
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

/* The two proposal documents. To move them to Google Docs, change only these two URLs. */
const PR_TEMPLATE_URL = '../assets/project-proposal/proposal-template.docx';
const PR_RUBRIC_URL = '../assets/project-proposal/proposal-rubric.docx';

/* ---------- Project Plan Rubric: the five sections and points of the proposal rubric (Fernanda's document). ---------- */
const PR_RUBRIC = [
  ['Problem and motivation', 15, 'what the work will reveal · not already solved · why it matters'],
  ['Approach and experimental design', 20, 'pipeline · models and algorithms · data · what is run'],
  ['Evaluation and expected results', 25, 'dataset evaluation · test set, success and metric · hypothesis · expected results · expected failures'],
  ['A realistic plan', 25, 'smallest working version · timeline · if there is time · risk and plan B · who does what'],
  ['Scope and resources', 15, 'doable in the time left · right size for the group · resources, price and date'],
];
st(`
  <style>
    .project-rubric{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:repeat(3, 1fr); grid-template-rows:1fr 1fr; gap:1.6vh 1.6vw; }
    .project-rubric-links{ display:flex; flex-direction:column; justify-content:center; gap:1.6vh; padding:0 1.4vw; }
    .project-rubric .d6-card{ justify-content:center; }
    .project-pct{ font-size:clamp(1.6rem, 3vw, 2.8rem); font-weight:800; line-height:1; }
    @media (max-width: 820px), (max-aspect-ratio: 1/1){ .project-rubric{ grid-template-columns:1fr; grid-template-rows:none; } }
  </style>
  <h1 class="t">Project Plan Rubric</h1>
  <div class="lead b" data-step="1">Detailed proposal: 1 to 2 pages, due Wednesday 11 November, end of day</div>
  <div class="project-rubric">
    ${PR_RUBRIC.map(([h, pts, t], i) => `<div class="d6-card b" data-step="${i + 1}"><div class="project-pct">${pts}</div><div class="lead"><b>${h}</b></div><div class="label">${t}</div></div>`).join('')}
    <div class="project-rubric-links b" data-step="1">
      <div class="lead">${d6Link(PR_TEMPLATE_URL, '<u>Proposal template</u>')}</div>
      <div class="lead">${d6Link(PR_RUBRIC_URL, '<u>Proposal rubric</u>')}</div>
      <div class="label">Points out of 100</div>
    </div>
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
  ${rdCite('Example idea: the Day 6 lab’s sign-language app for doctors · sections from the ' + d6Link(PR_TEMPLATE_URL, 'Proposal template') + ' · team size is an example')}
`);

prTodo('Project Rubric', ['The final output and how this is all evaluated']);
}
