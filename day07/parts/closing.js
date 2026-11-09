/* PART: closing (Day 7). Owner: Shreya. Placeholders for the end of the Google deck "Day 7"
   (fileId 1-d7HaWYSEP3EMU8Eu3EZsc9huoF877sANLRL4F8uW2U): Open Questions, then Quiz Review, each its own section.
   Each slide opens on its title; one click brings her outline lines in dashed TO DO boxes, wording as she wrote it.
   Quiz Review has no body text in her deck yet, so its box says so. No speaker notes. */
{
const CL_SLIDES = [
  ['Open Questions', 'Open Questions', ['AI Review', 'How to use AI', 'How to work – tips for workspaces and such']],
  ['Quiz Review', 'Quiz Review', ['Content to add: her slide has a title only']],
];
CL_SLIDES.forEach(([sec, title, lines]) => { section(sec); st(`
  <style>
    .closing-todo{ flex:1 1 auto; min-height:0; display:flex; flex-direction:column; justify-content:center; gap:2.4vh; }
    .closing-todo .d6-todo{ padding:2.2vh 1.6vw; }
    .closing-todo .closing-tag{ font-size:clamp(.8rem, 1.1vw, 1.05rem); text-transform:uppercase; letter-spacing:.08em; color:var(--mute); }
  </style>
  <h1 class="t">${title}</h1>
  <div class="closing-todo">
    ${lines.map(t => `<div class="d6-todo b" data-step="1"><div class="closing-tag">To do</div><div class="lead">${t}</div></div>`).join('')}
  </div>
`); });
}
