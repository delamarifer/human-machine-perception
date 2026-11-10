/* PART: open-questions (Day 7 part 2). Owner: Fernanda. Open Questions placeholder, copied from Shreya's day07/parts/closing.js (2026-11-10). Opens on its title; one click brings the outline lines in. No speaker notes yet. */
{
section('Open Questions');
st(`
  <style>
    .open-questions-todo{ flex:1 1 auto; min-height:0; display:flex; flex-direction:column; justify-content:center; gap:2.4vh; }
    .open-questions-todo .d6-todo{ padding:2.2vh 1.6vw; }
    .open-questions-todo .open-questions-tag{ font-size:clamp(.8rem, 1.1vw, 1.05rem); text-transform:uppercase; letter-spacing:.08em; color:var(--mute); }
  </style>
  <h1 class="t">Open Questions</h1>
  <div class="open-questions-todo">
    ${['AI Review', 'How to use AI', 'How to work – tips for workspaces and such'].map(t => `<div class="d6-todo b" data-step="1"><div class="open-questions-tag">To do</div><div class="lead">${t}</div></div>`).join('')}
  </div>
`);
}
