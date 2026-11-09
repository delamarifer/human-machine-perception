/* PART: worksheet (Day 7). Owner: Shreya. Placeholders for the start of the Google deck "Day 7"
   (fileId 1-d7HaWYSEP3EMU8Eu3EZsc9huoF877sANLRL4F8uW2U): Data Worksheet Review, then Share.
   Each slide opens on its title; one click brings her outline lines in dashed TO DO boxes, wording as she wrote it.
   Data Worksheet Review has no body text in her deck yet, so its box says so. No speaker notes. */
{
section('Data Worksheet Review');

const WS_SLIDES = [
  ['Data Worksheet Review', ['Content to add: her slide has a title only']],
  ['Share', ['A couple guiding questions (we will have people volunteer to share out)']],
];
WS_SLIDES.forEach(([title, lines]) => st(`
  <style>
    .worksheet-todo{ flex:1 1 auto; min-height:0; display:flex; flex-direction:column; justify-content:center; gap:2.4vh; }
    .worksheet-todo .d6-todo{ padding:2.2vh 1.6vw; }
    .worksheet-todo .worksheet-tag{ font-size:clamp(.8rem, 1.1vw, 1.05rem); text-transform:uppercase; letter-spacing:.08em; color:var(--mute); }
  </style>
  <h1 class="t">${title}</h1>
  <div class="worksheet-todo">
    ${lines.map(t => `<div class="d6-todo b" data-step="1"><div class="worksheet-tag">To do</div><div class="lead">${t}</div></div>`).join('')}
  </div>
`));
}
