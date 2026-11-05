/* PART: start (Day 4). Owner: Fernanda. Generic opening block: quiz, recap, resources, what is due.
   Written to be copied to other days: edit only the constants below.
   Facts come from the course site on main (index.html, syllabus.html, templates.html), 2026-11-04.
   The quiz is printed: its questions never go on this public site (only in the instructors repo). */
{
section('Start');

const QUIZ_ON = 'Day 3: metamers and image filtering';
const RECAP = [
  ['Day 1', 'What does it mean to see?'],
  ['Day 2', 'Computer vision: promise, pitfalls, your project'],
  ['Day 3', 'Metamers, transformations and filters'],
];
const DUE = [
  ['Assignment 1', 'Coding and conceptual questions · 15%', 'Next week'],   // exact date: to add (Fernanda)
  ['Project proposal', '1–2 pages, from the template', 'Fri, Nov 6, midnight'],
  ['Proposal meeting', 'Book a time on Calendly', 'Mon–Wed'],
];
const SITE = 'delamarifer.github.io/human-machine-perception';
const PROPOSAL_FORM = 'forms.gle/wBXHE6AFaHf8RR4T8';

st(`
  <h1 class="t">Quiz</h1>
  <ul class="frag" style="margin:auto 0">
    <li class="b"><b>On paper</b>, first 5 to 10 minutes</li>
    <li class="b">On ${QUIZ_ON}</li>
    <li class="b">Four questions</li>
  </ul>
`, { notes: [
  "(draft) We start, as every day, with the quiz.",
  "(draft) It is on paper, and it takes the first five to ten minutes of class.",
  "(draft) It covers yesterday: " + QUIZ_ON + ".",
  "(draft) Four questions."
]});

st(`
  <h1 class="t">Where we are</h1>
  <div class="flow">
    ${RECAP.map(([d, t], k) => `${k ? `<div class="arrow b" data-step="${k + 1}">→</div>` : ''}
      <div class="step b" data-step="${k + 1}"><b>${d}</b><span class="label">${t}</span></div>`).join('')}
    <div class="arrow b" data-step="${RECAP.length + 1}">→</div>
    <div class="step b" data-step="${RECAP.length + 1}"><b>Today</b><span class="label">CNNs and visual recognition</span></div>
  </div>
`, { notes: [
  "(draft) A quick recap of where we are.",
  "(draft) Day 1: what it means to see, and why vision is an inference, not a measurement.",
  "(draft) Day 2: what computer vision can do today, where it still fails, and your project.",
  "(draft) Day 3: metamers, as a way to probe what a system represents, and filters, the basic operation on images.",
  "(draft) Today: we put filters inside networks that learn them. Convolutional networks, and what they can recognize."
]});

/* the live course homepage, so the slide never goes out of date */
st(`
  <h1 class="t">Everything is on the course site</h1>
  <div class="b" style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;align-items:center;gap:1vh">
    <iframe loading="lazy" src="../index.html" title="Course site"
      style="flex:1 1 auto;min-height:0;width:min(100%, 120vh);border:2px solid var(--line);border-radius:10px"></iframe>
    <div class="label">${SITE}</div>
  </div>
`, { notes: [
  "(draft) Everything we use is on the course site.",
  "(draft) Slides for every day, the labs, the readings, the homework forms, the project templates, and the Discord. If you are ever lost, start here."
]});

st(`
  <h1 class="t">Coming up</h1>
  <div class="start-due" style="display:grid;grid-template-columns:auto 1fr auto;gap:2.4vh 3vw;align-items:baseline;margin:auto 0">
    ${DUE.map(([what, detail, when], k) => `
      <div class="lead b" data-step="${k + 1}"><b>${what}</b></div>
      <div class="label b" data-step="${k + 1}">${detail}</div>
      <div class="lead b" data-step="${k + 1}">${when}</div>`).join('')}
  </div>
`, { notes: [
  "(draft) What is coming up.",
  "(draft) Assignment 1 is due next week (to write: the exact day and time). Coding and conceptual questions, worth 15 percent of your grade.",
  "(draft) Your project proposal is due " + DUE[1][2] + ". One to two pages, using the template. More on how to submit it on the next slide.",
  "(draft) And then you meet with one of us about your proposal, Monday to Wednesday. Book a time on Calendly."
]});

st(`
  <style>
    .flow.start-steps{ display:grid; grid-template-columns:1fr auto 1fr auto 1fr auto 1fr; gap:0 1.2vw; align-items:stretch; margin:auto 0; }
    .start-steps .arrow{ align-self:center; }
    .start-steps .step{ display:flex; flex-direction:column; align-items:center; gap:1vh; min-width:0; }
    .start-steps .label{ overflow-wrap:anywhere; }
    .start-shot{ width:100%; height:auto; max-height:34vh; object-fit:contain;
      border:2px solid var(--line); border-radius:8px; margin-top:auto; }
  </style>
  <h1 class="t">How to submit your proposal</h1>
  <div class="flow start-steps">
    <div class="step b" data-step="1"><b>1. Pick a track</b><span class="label">build a demo, or run an experiment</span>
      <img class="start-shot" src="assets/start/track.png" alt="Project templates page: the two tracks"></div>
    <div class="arrow b" data-step="2">→</div>
    <div class="step b" data-step="2"><b>2. Fill the template</b><span class="label">problem · approach · evaluation · plan, 25% each</span>
      <img class="start-shot" src="assets/start/template.png" alt="Project templates page: the detailed proposal template"></div>
    <div class="arrow b" data-step="3">→</div>
    <div class="step b" data-step="3"><b>3. Upload it</b><span class="label">${PROPOSAL_FORM}</span>
      <img class="start-shot" src="assets/start/upload.png" alt="Course site: the Project proposal upload card"></div>
    <div class="arrow b" data-step="4">→</div>
    <div class="step b" data-step="4"><b>4. Book a meeting</b><span class="label">Calendly, Mon–Wed</span>
      <img class="start-shot" src="assets/start/meeting.png" alt="Project templates page: what to bring to the meeting"></div>
  </div>
  <div class="label b" data-step="5" style="text-align:center">Templates and the upload link: course site → Project</div>
`, { notes: [
  "(draft) How to submit your proposal.",
  "(draft) First, pick a track: build a demo that someone can try, or run an experiment that explores or overcomes a limitation of a vision model.",
  "(draft) Second, fill in the template for your track. Four sections, each a quarter of the grade: the problem and why it matters, your approach, how you will evaluate it, and a realistic plan. Answer every question; short is fine.",
  "(draft) Third, upload it with the form, by Friday at midnight.",
  "(draft) Fourth, book a meeting with one of us for Monday to Wednesday, and come with your proposal and your questions.",
  "(draft) The templates and the upload link are on the course site, under Project."
]});
}
