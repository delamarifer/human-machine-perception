/* PART: quiz-review (Day 7 part 2). Owner: Fernanda. Quiz Review placeholder, copied from Shreya's day07/parts/closing.js (2026-11-10). Opens on its title; one click brings the outline lines in. No speaker notes yet. */
{
section('Quiz Review');
st(`
  <style>
    .quiz-review-todo{ flex:1 1 auto; min-height:0; display:flex; flex-direction:column; justify-content:center; gap:2.4vh; }
    .quiz-review-todo .d6-todo{ padding:2.2vh 1.6vw; }
    .quiz-review-todo .quiz-review-tag{ font-size:clamp(.8rem, 1.1vw, 1.05rem); text-transform:uppercase; letter-spacing:.08em; color:var(--mute); }
  </style>
  <h1 class="t">Quiz Review</h1>
  <div class="quiz-review-todo">
    ${['Content to add: her slide has a title only'].map(t => `<div class="d6-todo b" data-step="1"><div class="quiz-review-tag">To do</div><div class="lead">${t}</div></div>`).join('')}
  </div>
`);
}
