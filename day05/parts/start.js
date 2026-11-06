/* PART: start (Day 5). Owner: Shreya. Quiz, recap, title, CNN recap (Chapter 24 figures).
   Follows Shreya's outline (Google Slides), slides 1-4. Quiz questions never go on this public site.
   Also carries the shared Day 5 styles, copied from opening.js, which is no longer loaded. */
{
section('1. Start');

const day5Style = `<style>
  .stage{ padding:7.2vh 5.2vw 9.5vh; gap:1.5vh; }
  .stage > .cite{ position:static; margin-top:auto; padding-top:.8vh; font-size:clamp(.8rem, 1.12vw, 1.15rem); color:var(--mute); }
  .d5-cols{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1fr 1fr; gap:2.4vw; align-items:center; }
  .d5-grid3{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:repeat(3, 1fr); gap:1.6vw; align-items:stretch; }
  .d5-grid4{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:repeat(4, 1fr); gap:1.3vw; align-items:stretch; }
  .d5-card{ background:#f8fafc; padding:1.4vh 1.4vw; border-radius:12px; border:1px solid var(--line); display:flex; flex-direction:column; gap:.8vh; }
  .d5-code{ background:#0f172a; color:#f8fafc; padding:1.4vh 1.4vw; border-radius:12px;
    font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; font-size:clamp(.75rem, 1.08vw, 1.02rem); line-height:1.42; }
  .d5-eq{ background:#f1f5f9; border:1px solid #cbd5e1; border-left:4px solid var(--early); border-radius:10px;
    padding:1vh 1.2vw; font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
    font-size:clamp(.88rem, 1.32vw, 1.28rem); font-weight:600; color:#0f172a; line-height:1.38; }
  .d5-tbl{ width:100%; border-collapse:collapse; font-size:clamp(.78rem, 1.12vw, 1.04rem); background:#f8fafc; border-radius:10px; overflow:hidden; border:1px solid var(--line); }
  .d5-tbl th, .d5-tbl td{ text-align:left; padding:.85vh 1vw; border-top:1px solid var(--line); vertical-align:top; }
  .d5-tbl th{ background:#0f172a; color:#f8fafc; font-weight:700; border-top:none; }
  code.m{ font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; font-size:.9em; font-weight:600;
    background:#f1f5f9; border:1px solid #cbd5e1; border-radius:5px; padding:.06em .34em; color:#0f172a; white-space:nowrap; }
  @media (max-width: 820px), (max-aspect-ratio: 1/1){
    .stage{ padding:6vh 4vw 6.5vh; gap:1vh; }
    .stage h1.t{ font-size:clamp(1.18rem, 4vw, 1.7rem); }
    .stage .statement{ font-size:clamp(1rem, 3.2vw, 1.4rem); }
    .stage .question{ font-size:clamp(1.1rem, 3.5vw, 1.6rem); }
    .stage .lead, .stage ul.frag li{ font-size:clamp(.9rem, 2.6vw, 1.2rem); line-height:1.26; }
    .stage .label{ font-size:clamp(.76rem, 2.2vw, 1rem); line-height:1.25; }
    .d5-cols, .d5-grid3, .d5-grid4{ grid-template-columns:1fr; gap:1.1vh; }
    .stage .flow{ flex-wrap:wrap; gap:.8vh 1vw; }
    .stage .flow .step{ padding:1vh 1vw; min-width:42%; }
  }
</style>`;

/* Quiz timer. It runs only when started, never advances the slide, and counts from a fixed end time,
   so it stays correct if the browser slows a background tab. */
const QUIZ_MINUTES = 12;
window.quizTimer = (() => {
  let left = QUIZ_MINUTES*60*1000, end = 0, tick = 0;
  const show = () => {
    const sec = Math.ceil(left/1000), txt = `${Math.floor(sec/60)}:${String(sec%60).padStart(2, '0')}`;
    document.querySelectorAll('.start-clock').forEach(e => e.textContent = left <= 0 ? 'Time' : txt);
    document.querySelectorAll('.start-go').forEach(e => e.textContent = tick ? 'Pause' : 'Start');
  };
  const stop = () => { clearInterval(tick); tick = 0; };
  const step = () => { left = Math.max(0, end - Date.now()); if(left === 0) stop(); show(); };
  return {
    toggle(){ if(tick){ left = Math.max(0, end - Date.now()); stop(); } else if(left > 0){ end = Date.now() + left; tick = setInterval(step, 250); } show(); },
    reset(){ stop(); left = QUIZ_MINUTES*60*1000; show(); },
  };
})();

st(`${day5Style}
  <style>
    .start-quiz{ margin:auto; display:flex; flex-direction:column; align-items:center; gap:2.5vh; text-align:center; }
    .start-quiz h1{ font-size:clamp(3rem, 7vw, 7rem); font-weight:700; line-height:1; }
    .start-clock{ font-size:clamp(6rem, 19vw, 19rem); font-weight:700; line-height:1; font-variant-numeric:tabular-nums; }
    .start-buttons{ display:flex; gap:1vw; }
    .start-buttons button{ font:inherit; font-size:clamp(1rem, 1.6vw, 1.6rem); padding:.5em 1.4em; border:2px solid var(--ink); border-radius:10px; background:#fff; color:var(--ink); cursor:pointer; }
  </style>
  <div class="start-quiz">
    <h1>Quiz</h1>
    <div class="start-clock">${QUIZ_MINUTES}:00</div>
    <div class="start-buttons">
      <button class="start-go" type="button" onclick="event.stopPropagation();quizTimer.toggle();this.blur()">Start</button>
      <button type="button" onclick="event.stopPropagation();quizTimer.reset();this.blur()">Reset</button>
    </div>
  </div>
`, { blank: false, notes: "(draft) We start with the quiz. You have 12 minutes." });

st(`
  <h1 class="t">Recap</h1>
  <div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:center;gap:2.6vh">
    <div class="lead b" data-step="1"><b>Due today:</b> <a href="https://delamarifer.github.io/human-machine-perception/#homework" target="_blank" rel="noopener" onclick="event.stopPropagation()" style="color:var(--ink)">Day 4 lab</a></div>
    <div class="lead b" data-step="2"><b>Upcoming assignments:</b> <a href="https://delamarifer.github.io/human-machine-perception/#project" target="_blank" rel="noopener" onclick="event.stopPropagation()" style="color:var(--ink)">Project proposal</a> and <a href="https://delamarifer.github.io/human-machine-perception/assignment1.html" target="_blank" rel="noopener" onclick="event.stopPropagation()" style="color:var(--ink)">Assignment 1</a></div>
  </div>
`, { notes: [
  "(draft) A few things before we begin.",
  "(draft) The homework due today should be complete.",
  "(draft) The upcoming assignments are the project proposal and Assignment 1."
]});

st(`
  <div class="center" style="margin:auto">
    <div class="statement" style="font-weight:700;font-size:clamp(2rem,3.7vw,3.3rem)">Transformers and Visual Representations</div>
    <div class="label" style="margin-top:2.2vh">Day 5 · Visual Perception</div>
    <div class="label" style="margin-top:.8vh">Fernanda De La Torre · Shreya Pandit</div>
  </div>
`, { notes: "(draft) Welcome to Day 5: Transformers and Visual Representations." });

/* CNN recap: original figures from Chapter 24 of the book, unmodified (CC BY-NC-ND), at Shreya's request.
   Files in assets/visionbook-ch24/ come straight from visionbook.mit.edu and must not be cropped or edited. */
const stFigs = 'assets/visionbook-ch24/';
const stLink = (href, t) => `<a href="${href}" target="_blank" rel="noopener" onclick="event.stopPropagation()" style="color:var(--ink)">${t}</a>`;
const stSource = stLink('https://visionbook.mit.edu/convolutional_neural_nets.html', 'Source: MIT Foundations of Computer Vision, Chapter 24.')
  + ' ' + stLink('https://creativecommons.org/licenses/by-nc-nd/4.0/', 'CC BY-NC-ND 4.0') + ', figures unmodified';

st(`
  <style>
    .start-figs{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1.75fr 1fr; gap:2.4vw; align-items:center; }
    .start-figs img{ width:100%; display:block; }
    .start-cues{ display:grid; grid-template-columns:repeat(4, 1fr); gap:1.4vw; }
  </style>
  <h1 class="t">CNNs recap</h1>
  <div class="start-figs">
    <img class="b" data-step="1" src="${stFigs}CNNs_as_patch_processing.png" alt="Figure 24.1: an image cut into patches, each patch passed through the same classifier">
    <img class="b" data-step="3" src="${stFigs}multichannel_conv.png" alt="Figure 24.5: a bank of filters applied to input channels gives output channels">
  </div>
  <div class="start-cues">
    <div class="b" data-step="1"><div class="lead"><b>Locality</b></div><div class="label">Each patch is handled alone</div></div>
    <div class="b" data-step="2"><div class="lead"><b>Shared filters</b></div><div class="label">The same function on every patch</div></div>
    <div class="b" data-step="3"><div class="lead"><b>Feature maps</b></div><div class="label">Each filter gives one output channel</div></div>
    <div class="b" data-step="4"><div class="lead"><b>Hierarchy</b></div><div class="label">Stacked layers see larger regions</div></div>
  </div>
  ${cite(stSource)}
`);

st(`
  <h1 class="t">CNNs recap: strengths and gaps</h1>
  <div class="d5-cols" style="align-items:stretch;gap:3vw">
    <div class="d5-card b" data-step="1" style="padding:2.4vh 2vw;gap:1.8vh">
      <div class="statement"><b>Strengths</b></div>
      <div class="lead">Find local patterns anywhere</div>
      <div class="lead">Few weights, shared across the image</div>
      <div class="lead">Strong on images like their training data</div>
    </div>
    <div class="d5-card b" data-step="2" style="padding:2.4vh 2vw;gap:1.8vh">
      <div class="statement"><b>Gaps</b></div>
      <div class="lead">Far-apart regions are hard to connect</div>
      <div class="lead">Can lean on texture more than shape</div>
      <div class="lead">Can fail when images differ from training</div>
    </div>
  </div>
  ${cite(stLink('https://visionbook.mit.edu/convolutional_neural_nets.html', 'MIT Foundations of Computer Vision, Chapter 24') + ' · ' + stLink('https://arxiv.org/abs/1811.12231', 'Geirhos et al. (ICLR 2019)'))}
`, { sub: true, blank: false });
}
