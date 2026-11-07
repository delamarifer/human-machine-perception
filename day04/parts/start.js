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
const ASSIGNMENT = ['Assignment 1', 'Due next Wednesday', 'https://delamarifer.github.io/human-machine-perception/assignment1.html'];
const PROPOSAL_DUE = 'Monday';

/* announcements (Fernanda, 2026-11-05; replaces the 'Coming up' and 'How to submit your proposal' slides).
   Screenshots in assets/start/: her Discord post, the course-site proposal card, the idea form (cropped so no
   email address shows). */
st(`
  <style>
    .start-ann{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1fr 1.25fr 1fr; gap:2vw; align-items:stretch; }
    .start-ann > div{ display:flex; flex-direction:column; gap:1vh; min-height:0; }
    .start-ann img, .start-ann iframe{ width:100%; min-height:0; border:2px solid var(--line); border-radius:8px; }
    .start-ann img{ object-fit:contain; object-position:top; background:#fff; }
  </style>
  <h1 class="t">Announcements</h1>
  <div class="start-ann">
    <div class="b" data-step="1"><div class="lead"><b>Office hours</b></div><div class="label">Mon–Fri, 4–5pm · AIMS office 105</div>
      <img src="assets/start/discord.png" alt="Fernanda's Discord post about office hours" style="flex:1 1 auto"></div>
    <div class="b" data-step="2"><div class="lead"><b>${ASSIGNMENT[0]}</b></div><div class="label">${ASSIGNMENT[1]}</div>
      <iframe loading="lazy" src="${ASSIGNMENT[2]}" title="${ASSIGNMENT[0]}" style="flex:1 1 auto"></iframe></div>
    <div class="b" data-step="3"><div class="lead"><b>Project proposal</b></div><div class="label">${PROPOSAL_DUE} · upload it with the form</div>
      <img src="assets/start/proposal-card.png" alt="Course site: the Project proposal card" style="flex:0 1 auto;max-height:16vh">
      <img src="assets/start/idea-form.png" alt="The project Google Form" style="flex:1 1 auto"></div>
  </div>
`, { notes: [
  "(draft) A few announcements before the quiz.",
  "(draft) Office hours: I am in my office at AIMS, office 105, every day from 4 to 5pm, Monday to Friday. Come find me with questions about the course or for research advice. I posted this on Discord too. And I will come to as many lunches as I can, and some dinners.",
  "(draft) Assignment 1 is out. It is on the course site, and it is due next Wednesday.",
  "(draft) Your project proposal is due " + PROPOSAL_DUE + ". The card on the course site, under Project, takes you to the Google Form where you upload it."
]});

st(`
  <h1 class="t">Quiz</h1>
  <ul class="frag" style="margin:auto 0">
    <li class="b"><b>On paper</b>, first 5 to 10 minutes</li>
    <li class="b">On ${QUIZ_ON}</li>
  </ul>
`, { notes: [
  "(draft) We start, as every day, with the quiz.",
  "(draft) It is on paper, and it takes the first five to ten minutes of class.",
  "(draft) It covers yesterday: " + QUIZ_ON + "."
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

}
