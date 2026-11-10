/* PART: project-review (Day 7 part 2). Owner: Fernanda. Copied from Shreya's day07/parts/project.js (2026-11-10), placeholders as she wrote them.
   Public repo: never student names or faces here. No speaker notes yet. */
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
}
