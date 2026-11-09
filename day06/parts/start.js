/* PART: start (Day 6). Owner: Shreya. Quiz timer, announcements, title, the central idea.
   Plan doc: "Opening: quiz and announcements" and the Overview's central idea.
   Shared Day 6 styles and helpers are in ../lib.js. No speaker notes (Shreya's request). */
{
section('Start');


/* Quiz timer: runs only when started, never advances the slide, counts from a fixed end time.
   Turns amber at 2:00 and red at 0:30 (plan doc). Timer colors are a clock state, not data. */
const QUIZ_MINUTES = 12;
window.d6Quiz = (() => {
  let left = QUIZ_MINUTES*60*1000, end = 0, tick = 0;
  const show = () => {
    const sec = Math.ceil(left/1000), txt = `${Math.floor(sec/60)}:${String(sec%60).padStart(2, '0')}`;
    document.querySelectorAll('.start-clock').forEach(e => {
      e.textContent = left <= 0 ? 'Time' : txt;
      e.style.color = sec <= 30 ? '#b91c1c' : sec <= 120 ? '#b45309' : 'var(--ink)';
    });
    document.querySelectorAll('.start-go').forEach(e => e.textContent = tick ? 'Pause' : 'Start');
  };
  const stop = () => { clearInterval(tick); tick = 0; };
  const step = () => { left = Math.max(0, end - Date.now()); if(left === 0) stop(); show(); };
  return {
    toggle(){ if(tick){ left = Math.max(0, end - Date.now()); stop(); } else if(left > 0){ end = Date.now() + left; tick = setInterval(step, 250); } show(); },
    reset(){ stop(); left = QUIZ_MINUTES*60*1000; show(); },
  };
})();

st(`
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
      <button class="start-go" type="button" onclick="event.stopPropagation();d6Quiz.toggle();this.blur()">Start</button>
      <button type="button" onclick="event.stopPropagation();d6Quiz.reset();this.blur()">Reset</button>
    </div>
  </div>
`, { blank: false });

st(`
  <h1 class="t">Announcements</h1>
  <div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:center;gap:2.6vh">
    <div class="lead b" data-step="1"><b>Assignment 1</b> due Wednesday, Nov 11, 2pm</div>
    <div class="lead b" data-step="2"><b>Project proposal</b> due Wednesday, Nov 11, midnight</div>
    <div class="lead b" data-step="3"><b>Follow-up meetings with us</b> Thursday, Nov 12 (a Calendly link will be sent)</div>
    <div class="lead d6-todo b" data-step="4">Quiz review: when results come back, and the one or two most common mistakes (to fill in)</div>
  </div>
`);

st(`
  <div class="center" style="margin:auto">
    <div class="statement" style="font-weight:700;font-size:clamp(2rem,3.7vw,3.3rem)">Data, Generalization and Adaptation</div>
    <div class="label" style="margin-top:2.2vh">Day 6 · Visual Perception</div>
    <div class="label" style="margin-top:.8vh">Fernanda De La Torre · Shreya Pandit</div>
  </div>
`);

/* The central idea (plan doc, Overview), told as one worked example. The detector numbers are illustrative. */
st(`
  <h1 class="t">A model learns its training data, not the world</h1>
  <div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;justify-content:center;gap:3vh">
    <div class="lead b" data-step="1">A street-camera detector finds cars and people. It was trained and tested on <b>daytime</b> images.</div>
    <div class="d6-cols" style="flex:0 0 auto;align-items:stretch">
      <div class="d6-card b" data-step="2">
        <div class="lead"><b>On the test set</b></div>
        <div class="lead">all daytime, misses 2 of 100</div>
        <div style="font-size:clamp(2rem,4vw,4rem);font-weight:700">2% error</div>
      </div>
      <div class="d6-card b" data-step="3">
        <div class="lead"><b>On the road</b></div>
        <div class="lead">30% of frames are at night, and it misses half of those</div>
        <div class="lead">0.7 × 2% + 0.3 × 50%</div>
        <div class="b" data-step="4" style="font-size:clamp(2rem,4vw,4rem);font-weight:700">16.4% error</div>
      </div>
    </div>
    <div class="statement b" data-step="5"><b>Same model, eight times the error. Only the images changed.</b></div>
  </div>
  ${cite('Numbers are illustrative')}
`);

/* Today's plan: one row per click. The same list opens every section, with that section bold (d6Roadmap in lib.js). */
st(`
  <h1 class="t">Today's plan</h1>
  ${d6Roadmap(-1, true)}
`);
}
