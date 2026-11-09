/* PART: project (Day 7). Owner: Shreya. Placeholders for the project slides in the Google deck "Day 7"
   (fileId 1-d7HaWYSEP3EMU8Eu3EZsc9huoF877sANLRL4F8uW2U): Project Review (two slides), Project Plan Rubric, Project Rubric.
   Each slide opens on its title; the first click brings her outline lines in dashed TO DO boxes (the course plan's style for
   unfilled content). Her wording is kept as written. Nothing here is real content yet. No speaker notes. */
{
section('Project Review');

const PR_SLIDES = [
  ['Project Review', ['Overview of the project ideas (topics, field, tools etc)', 'Things we noticed that we liked', 'Things we noticed that people didn’t consider']],
  ['Project Review', ['Potential Groupings + Ideas', 'What goes into the project plan']],
  ['Project Plan Rubric', ['Rubric', 'Maybe example project plan?']],
  ['Project Rubric', ['The final output and how this is all evaluated']],
];
PR_SLIDES.forEach(([title, lines]) => st(`
  <style>
    .project-todo{ flex:1 1 auto; min-height:0; display:flex; flex-direction:column; justify-content:center; gap:2.4vh; }
    .project-todo .d6-todo{ padding:2.2vh 1.6vw; }
    .project-todo .project-tag{ font-size:clamp(.8rem, 1.1vw, 1.05rem); text-transform:uppercase; letter-spacing:.08em; color:var(--mute); }
  </style>
  <h1 class="t">${title}</h1>
  <div class="project-todo">
    ${lines.map(t => `<div class="d6-todo b" data-step="1"><div class="project-tag">To do</div><div class="lead">${t}</div></div>`).join('')}
  </div>
`));
}
