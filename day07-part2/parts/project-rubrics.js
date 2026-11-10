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
  <div class="lead b" data-step="1">${d6Link('../assets/project-proposal/proposal-template.docx', '<u>Proposal template</u>')} · ${d6Link('../assets/project-proposal/proposal-rubric.docx', '<u>Proposal rubric</u>')}</div>
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

/* ---------- Deep dive: the merged sign language and tennis project (Fernanda's request, 2026-11-10).
   Short sentences, one intuition per slide, figures from the papers. No student names or form quotes (public site).
   The expected-result slide is a drawing only, never a plot of invented numbers. ---------- */
(() => {
  if(document.getElementById('project-rubrics-style')) return;
  const el = document.createElement('style'); el.id = 'project-rubrics-style';
  el.textContent = `
  .project-rubrics-two{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1fr 1fr; gap:2.4vw; align-items:center; }
  .project-rubrics-fig{ display:flex; flex-direction:column; align-items:center; gap:1.2vh; min-height:0; }
  .project-rubrics-fig img{ width:100%; max-height:44vh; object-fit:contain; display:block; border-radius:8px; }
  .project-rubrics-fig .lead{ text-align:center; }
  .project-rubrics-say{ text-align:center; margin-top:1vh; }
  .project-rubrics-flow{ display:grid; grid-template-columns:1fr auto 1fr auto 1fr; gap:1.2vw; align-items:center; }
  .project-rubrics-flow .d6-card{ text-align:center; justify-content:center; min-height:14vh; }
  .project-rubrics-arrow{ font-size:clamp(1.8rem, 3vw, 2.8rem); color:var(--mute); }
  .project-rubrics-big{ font-size:clamp(3rem, 7vw, 6.5rem); font-weight:800; line-height:1; }
  .project-rubrics-center{ flex:1 1 auto; min-height:0; display:flex; flex-direction:column; justify-content:center; gap:3.4vh; }
  .project-rubrics-steps{ display:grid; grid-template-columns:auto 1fr; gap:2.6vh 2vw; align-items:baseline; }
  .project-rubrics-num{ font-size:clamp(2.2rem, 4vw, 3.6rem); font-weight:800; line-height:1; }
  .project-rubrics-measure{ display:grid; grid-template-columns:1.7fr 1fr; gap:2.4vw; align-items:center; }
  .project-rubrics-tag{ align-self:flex-start; border:2px solid var(--ink); border-radius:999px; padding:.15em .9em; font-weight:700; }
  .project-rubrics-sketch{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1.5fr 1fr; gap:2.4vw; align-items:center; }
  .project-rubrics-sketch svg, .project-rubrics-people svg{ width:100%; height:auto; max-height:56vh; display:block; }
  .project-rubrics-sketch text, .project-rubrics-people text{ font-family:var(--font); fill:var(--ink); }
  .project-rubrics-people{ flex:1 1 auto; min-height:0; display:flex; align-items:center; justify-content:center; }
  @media (max-width: 820px), (max-aspect-ratio: 1/1){
    .project-rubrics-two, .project-rubrics-sketch, .project-rubrics-measure{ grid-template-columns:1fr; gap:1.2vh; }
    .project-rubrics-flow{ grid-template-columns:1fr; gap:.6vh; }
    .project-rubrics-arrow{ display:none; }
    .project-rubrics-fig img{ max-height:26vh; }
  }`;
  document.head.appendChild(el);
})();

const PR_A = 'assets/project-rubrics/';
const prNotes = (...p) => p.map(t => '(draft) ' + t);
const prFig = (file, alt, cap, step) => `<div class="project-rubrics-fig b" data-step="${step}"><img src="${PR_A}${file}" alt="${alt}">${cap ? `<div class="lead">${cap}</div>` : ''}</div>`;
const prSay = (t, step, cls = 'statement') => `<div class="${cls} project-rubrics-say b" data-step="${step}">${t}</div>`;

st(`
  <h1 class="t">Deep dive: reading human movement</h1>
  <div class="project-rubrics-two">
    ${prFig('transslr-fig2-points.png', 'A signer in four video frames, with the tracked body and hand points drawn in white', 'Sign language for doctors', 1)}
    ${prFig('thetis-fig3-video.png', 'A tennis player in a sports hall preparing a forehand slice', 'Tennis strokes', 1)}
  </div>
  ${prSay('Can a model read a person it has never seen?', 2, 'question')}
  ${rdCite('Images: Yen et al., 2026 (TransSLR), Figure 2 · Gourgari et al., 2013 (THETIS), Figure 3')}
`, {notes: prNotes(
  'Now one project in more depth. Two teams are working together.',
  'One part started as sign language for doctors. The other part started as tennis strokes. Both try to understand a moving body.',
  'They share one question. Can a model read a person it has never seen? Please push back on this. It is our reading of the project.'
)});

st(`
  <h1 class="t">Same word, different sign</h1>
  <div class="project-rubrics-center">
    ${prFig('transslr-fig1-sleep.png', 'The sign for sleep in Central African Sign Language, top row, and in American Sign Language, bottom row. The two signs look different.', 'The sign for “sleep”: Central African (top), American (bottom)', 1)}
    ${prSay('A model needs data from the language it reads.', 2)}
  </div>
  ${rdCite('Yen et al., 2026 (TransSLR), Figure 1')}
`, {notes: prNotes(
  'Why can we not just use the big American datasets?',
  'Look at the word sleep. The top row is Central African Sign Language. The bottom row is American Sign Language. It is the same word, and the signs are different.',
  'So a model needs data from the language it will read. That is why this project starts from African sign language data.'
)});

st(`
  <h1 class="t">Video becomes points</h1>
  <div class="project-rubrics-center">
    ${prFig('transslr-fig2-points.png', 'Four video frames of a signer with tracked body and hand points', '', 1)}
    <div class="project-rubrics-flow">
      <div class="d6-card b" data-step="1"><div class="lead"><b>Video</b></div></div>
      <div class="project-rubrics-arrow b" data-step="2">→</div>
      <div class="d6-card b" data-step="2"><div class="lead"><b>Big model</b></div><div class="label">finds the points · we do not change it</div></div>
      <div class="project-rubrics-arrow b" data-step="3">→</div>
      <div class="d6-card b" data-step="3"><div class="lead"><b>Small model</b></div><div class="label">reads the points · we train this one</div></div>
    </div>
  </div>
  ${rdCite('Yen et al., 2026 (TransSLR), Figure 2. Tracker: MediaPipe Holistic')}
`, {notes: prNotes(
  'How do you learn from very little video? You borrow.',
  'Here is a person signing. The white lines are points on the body and the hands.',
  'A big model finds those points. Someone else trained it on a lot of video. We do not change it. This is the transfer learning from today.',
  'We only train a small model on the points. It is small enough for the data we have.'
)});

st(`
  <h1 class="t">Hand on the face</h1>
  <div class="project-rubrics-two">
    ${prFig('moryossef-fig5-photo.png', 'A signer touching the side of the face with one hand', 'A hand touches the face.', 1)}
    ${prFig('moryossef-fig5-pose.png', 'The tracked points for the same frame: the face and the arm are there, the hand is missing', 'The tracker loses the hand.', 2)}
  </div>
  ${prSay('Many health signs are made on the body.', 3)}
  ${rdCite('Moryossef et al., 2021, Figure 5', 1)}
`, {notes: prNotes(
  'This is the weak point of borrowing a big model.',
  'Here a person touches the face while signing.',
  'On the right is what the tracker returns. There is a face and an arm. There is no hand.',
  'And many signs about health are made on the body: the head, the chest, the stomach. So the tracker may fail exactly where this project needs it. The team should check this with a Deaf signer.'
)});

st(`
  <h1 class="t">What is lost stays lost</h1>
  <div class="project-rubrics-center">
    ${prSay('The small model never sees the missing hand.', 1)}
    <div class="project-rubrics-two b" data-step="2" style="flex:0 0 auto">
      <div class="project-rubrics-fig"><div class="project-rubrics-big">85%</div><div class="lead">right answers</div></div>
      <div class="project-rubrics-fig"><div class="project-rubrics-big">80%</div><div class="lead">wrong answers</div></div>
    </div>
    <div class="label project-rubrics-say b" data-step="2">Frames where the hand was found</div>
    ${prSay('A link only. Not yet a cause.', 3)}
  </div>
  ${rdCite('Moryossef et al., 2021, Figure 6: 85.13% vs 79.78%, Turkish signs (AUTSL), dominant hand', 2)}
`, {notes: prNotes(
  'Why not fix this later, with more training?',
  'Because training only changes the small model. If a point is not there, the small model has nothing to learn from.',
  'One paper checked this on Turkish signs. When the model was right, the hand was found in about 85 percent of frames. When it was wrong, about 80 percent.',
  'But this is only a link. Nobody changed anything to see what happens. That is the opening for this project.'
)});

const prPerson = (x, solid) => `<circle cx="${x}" cy="62" r="24" fill="${solid ? 'var(--ink)' : '#fff'}" stroke="var(--ink)" stroke-width="4"/><path d="M${x - 38} 182 C${x - 38} 112 ${x + 38} 112 ${x + 38} 182 Z" fill="${solid ? 'var(--ink)' : '#fff'}" stroke="var(--ink)" stroke-width="4"/>`;
st(`
  <h1 class="t">The real test: a new person</h1>
  <div class="project-rubrics-people">
    <svg viewBox="0 0 960 250" role="img" aria-label="Four people the model trains on, and one new person it is tested on">
      <g class="b" data-step="1">${[70, 190, 310, 430].map(x => prPerson(x, true)).join('')}<text x="250" y="232" text-anchor="middle" font-size="34" font-weight="700">Train</text></g>
      <g class="b" data-step="2"><path d="M545 110 L640 110" stroke="var(--mute)" stroke-width="4" fill="none"/><path d="M625 96 L645 110 L625 124" stroke="var(--mute)" stroke-width="4" fill="none"/>${prPerson(760, false)}<text x="760" y="232" text-anchor="middle" font-size="34" font-weight="700">Test: someone new</text></g>
    </svg>
  </div>
  ${prSay('The next patient is not in your data.', 3)}
`, {notes: prNotes(
  'How do we know if it really works?',
  'We train on some people.',
  'And we test on a person the model has never seen. If the same person is in training and in the test, the test is too easy. Split by person, never by clip.',
  'This is the test that matters. The next patient is not in your data. The next tennis player is not either.'
)});

st(`
  <h1 class="t">Tennis: the same question</h1>
  <div class="project-rubrics-two">
    ${prFig('thetis-fig1-players.png', 'Four tennis players in different indoor settings', '55 players, 12 shots', 1)}
    ${prFig('thetis-fig3-points.png', 'A tennis player seen by a depth camera, with the tracked skeleton drawn on the body', 'Video becomes points, again.', 2)}
  </div>
  ${prSay('Does the tracker lose body parts here too?', 3, 'question')}
  ${rdCite('Gourgari et al., 2013 (THETIS), Figures 1 and 3')}
`, {notes: prNotes(
  'Now the second half of the team.',
  'This tennis dataset has 55 players and 12 kinds of shot. Some are amateurs and some are experienced.',
  'It uses the same idea. The video becomes points on the body, and a small model reads them.',
  'So we can ask the same question. An arm can pass behind the body. Does the tracker lose it? We do not know yet. And can the model read a new player?'
)});

st(`
  <h1 class="t">What we suggest: measure first</h1>
  <div class="project-rubrics-center">
    <div class="project-rubrics-measure">
    <div class="project-rubrics-steps">
      <div class="project-rubrics-num b" data-step="1">1</div><div class="b" data-step="1"><div class="lead"><b>Count the lost points.</b></div><div class="label">No training needed.</div></div>
      <div class="project-rubrics-num b" data-step="2">2</div><div class="b" data-step="2"><div class="lead"><b>Remove points on purpose.</b></div><div class="label">We did not find this test in the papers.</div></div>
      <div class="project-rubrics-num b" data-step="3">3</div><div class="b" data-step="3"><div class="lead"><b>Train the small model with gaps.</b></div><div class="label">Does it learn to cope?</div></div>
    </div>
    ${prFig('moryossef-fig5-pose.png', 'Tracked points with the hand missing', 'A lost hand', 1)}
    </div>
    ${prSay('Build later. First find what is broken.', 4)}
  </div>
  ${rdCite('Image: Moryossef et al., 2021, Figure 5')}
`, {notes: prNotes(
  'So here is our suggestion. It is smaller than the first idea, and it helps the first idea.',
  'First, count. Run the big model on the videos. How often are the points lost? There is no training, so this can be done this week.',
  'Second, remove points on purpose and see how much the score falls. Now we change one thing and watch the result. We searched and did not find this test, but our search was not complete.',
  'Third, train the small model with some points removed. Careful: the model can learn that a missing hand is itself a clue. The team needs a control for this.',
  'Translation and a tool for clinics are good long-term goals. They do not fit in two weeks. First find what is broken.'
)});

st(`
  <h1 class="t">Example of what is expected to be reported</h1>
  <div class="project-rubrics-tag label b" data-step="1">Drawing only. Not data.</div>
  <div class="project-rubrics-sketch">
    <svg viewBox="0 0 640 400" role="img" aria-label="A hand-drawn sketch with no numbers. Score on a new person against points removed. The line for signs away from the body falls a little. The dashed line for signs on the body falls more.">
      <g class="b" data-step="1">
        <path d="M72 28 C70 130 74 240 71 340 C200 343 420 338 610 341" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/>
        <text x="340" y="385" text-anchor="middle" font-size="27">more points removed →</text>
        <text transform="translate(38 190) rotate(-90)" text-anchor="middle" font-size="27">score on a new person →</text>
      </g>
      <g class="b" data-step="2">
        <path d="M84 84 C210 88 300 104 420 112 C490 118 540 132 596 142" fill="none" stroke="var(--ink)" stroke-width="6" stroke-linecap="round"/>
        <text x="420" y="84" text-anchor="middle" font-size="27" font-weight="700">away from the body</text>
      </g>
      <g class="b" data-step="3">
        <path d="M84 132 C190 168 280 206 380 252 C450 280 520 300 596 314" fill="none" stroke="var(--ink)" stroke-width="6" stroke-linecap="round" stroke-dasharray="16 13"/>
        <text x="240" y="272" text-anchor="middle" font-size="27" font-weight="700">on the body</text>
      </g>
    </svg>
    <div style="display:flex; flex-direction:column; gap:3vh">
      <div class="lead b" data-step="4"><b>Big drop:</b> improve the tracker.</div>
      <div class="lead b" data-step="5"><b>Small drop:</b> look somewhere else.</div>
    </div>
  </div>
`, {notes: prNotes(
  'This is what we hope to see in the final report. No experiment has been run.',
  'This is a drawing, not data. There are no numbers on purpose. Going right, we remove more points. Going up, the score on a new person is higher.',
  'One line is for signs made away from the body.',
  'The dashed line is for signs made on the body. This shape is only a guess. The team should write its own prediction before running anything.',
  'If the score falls a lot, the tracker is the problem. A year of work should go to a better tracker.',
  'If the score falls very little, the tracker is not the problem. That is a useful answer too, and we would look somewhere else.'
)});

st(`
  <h1 class="t">Questions for the team</h1>
  <div class="project-rubrics-center">
    <div class="question b" data-step="1">How many different people signed?</div>
    <div class="b" data-step="2"><div class="question">Did each person agree?</div><div class="label">Sign videos show faces.</div></div>
    <div class="question b" data-step="3">Did a Deaf signer check the signs?</div>
  </div>
`, {notes: prNotes(
  'We end with three questions. These can change the plan.',
  'How many different people are in your videos? With only one or two, you cannot test on a new person.',
  'Did each person agree? You cannot blur a face in sign language, because the face is part of the language. Agreeing to be filmed is not the same as agreeing to training, cloud storage or a public talk. Ask about each one.',
  'Did a Deaf signer check the signs? They know if the signs are right. Then we open the floor. Please push back on us.'
)});
}
