/* PART: lab (Day 6). Owner: Shreya. Plan: "Lab: dataset and benchmark hunt (22 minutes, no code)". Each team finds
   a dataset and a benchmark for its own project, checks them by hand and turns what it sees into numbers.
   Nothing is handed in. The worked numbers are the plan's example tallies, computed below. No speaker notes. */
{
section('Lab');

const LAB_MIN = 22;
window.d6Lab = window.d6Lab || (() => {
  let left = LAB_MIN * 60 * 1000, end = 0, tick = 0;
  const show = () => {
    const sec = Math.ceil(left / 1000), txt = `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;
    document.querySelectorAll('.lab-clock').forEach(e => { e.textContent = left <= 0 ? 'Time' : txt;
      e.style.color = sec <= 30 ? '#b91c1c' : sec <= 120 ? '#b45309' : 'var(--ink)'; });
    document.querySelectorAll('.lab-go').forEach(e => e.textContent = tick ? 'Pause' : 'Start');
  };
  const stop = () => { clearInterval(tick); tick = 0; };
  const step = () => { left = Math.max(0, end - Date.now()); if(left === 0) stop(); show(); };
  return {
    toggle(){ if(tick){ left = Math.max(0, end - Date.now()); stop(); } else if(left > 0){ end = Date.now() + left; tick = setInterval(step, 250); } show(); },
    reset(){ stop(); left = LAB_MIN * 60 * 1000; show(); },
  };
})();
const labClock = `<div class="lab-timer"><span class="lab-clock">${LAB_MIN}:00</span>
  <button class="lab-go" type="button" onclick="event.stopPropagation();d6Lab.toggle();this.blur()">Start</button>
  <button type="button" onclick="event.stopPropagation();d6Lab.reset();this.blur()">Reset</button></div>`;
const labStyle = `<style>
  .lab-timer{ position:absolute; top:2.6vh; right:2.4vw; display:flex; align-items:center; gap:.6vw; }
  .lab-clock{ font-size:clamp(1.4rem, 2.6vw, 2.6rem); font-weight:700; font-variant-numeric:tabular-nums; }
  .lab-timer button{ font:inherit; font-size:clamp(.8rem, 1.1vw, 1.1rem); padding:.3em .9em; border:2px solid var(--ink); border-radius:8px; background:#fff; color:var(--ink); cursor:pointer; }
  .lab-rows{ flex:1 1 auto; min-height:0; display:flex; flex-direction:column; justify-content:center; gap:1.8vh; }
  .lab-row{ display:grid; grid-template-columns:minmax(12em, 24vw) 1fr; gap:1.8vw; align-items:baseline; }
  .lab-row .lead{ font-size:clamp(1.1rem, 1.95vw, 1.8rem); }
  .lab-col{ display:flex; flex-direction:column; gap:2vh; justify-content:center; }
  @media (max-width: 820px), (max-aspect-ratio: 1/1){ .lab-row{ grid-template-columns:1fr; gap:.3vh; } .lab-timer{ position:static; } }
</style>`;

/* ---------- Opener ---------- */
st(`${labStyle}
  <h1 class="t">Lab · Find and check a dataset for your project</h1>
  ${d6Roadmap(5, false)}
`);

/* ---------- The plan, with the shared timer ---------- */
const LAB_STEPS = [['Write the task spec', 3], ['Hunt', 6], ['Inspect by hand', 6], ['Turn tallies into numbers', 5], ['Fill in the card', 2]];
st(`
  ${labClock}
  <h1 class="t">22 minutes, in your project team, no code</h1>
  <div class="lab-rows">
    ${LAB_STEPS.map(([s, m], i) => `<div class="lab-row b" data-step="${i + 1}"><div class="lead"><b>${i + 1}. ${s}</b></div><div class="lead">${m} min</div></div>`).join('')}
    <div class="lead b" data-step="6" style="margin-top:1vh">No project yet? Use the sign-language app for doctors from Part 2.</div>
  </div>
`);

/* ---------- Steps 1 and 2 ---------- */
st(`
  ${labClock}
  <h1 class="t">1. Write the task, then 2. hunt for data</h1>
  <div class="d6-cols" style="align-items:start">
    <div class="lab-col">
      <div class="label b" data-step="1">1 · Task spec (3 min)</div>
      <div class="lead b" data-step="1">input · output label · where it will be used · the metric that matters · the worst mistake it could make</div>
    </div>
    <div class="lab-col">
      <div class="label b" data-step="2">2 · Hunt (6 min): two datasets and one benchmark</div>
      <div class="lead b" data-step="2">results tables in two recent papers on your task</div>
      <div class="lead b" data-step="3">Hugging Face: search the task, filter by modality</div>
      <div class="lead b" data-step="4">the dataset's own website</div>
      <div class="lead b" data-step="5">Write down where you found each one.</div>
    </div>
  </div>
`);

/* ---------- Step 3 ---------- */
st(`
  ${labClock}
  <h1 class="t">3. Inspect your best candidate by hand</h1>
  <div class="d6-cols" style="align-items:start">
    <div class="lab-col">
      <div class="label b" data-step="1">Read its card or paper</div>
      <div class="lead b" data-step="1">size · classes and counts · how it was collected · where the labels came from · license · how it is split</div>
    </div>
    <div class="lab-col">
      <div class="label b" data-step="2">Look at 30 random examples and tally</div>
      <div class="lead b" data-step="2">labels that look wrong</div>
      <div class="lead b" data-step="3">how often your hardest case appears: night, phone photos, darker skin, a new region…</div>
    </div>
  </div>
`);

/* ---------- Step 4: the plan's example tallies, computed ---------- */
const labCI = (k, n) => { const p = k / n, h = 1.96 * Math.sqrt(p * (1 - p) / n); return [p, Math.max(0, p - h), p + h, h]; };
const [labP, labLo, labHi] = labCI(3, 30), labH200 = labCI(.1 * 200, 200)[3];
const LAB_DS = 10000, labCov = 2 / 30, labNeed = Math.ceil(.9 * .1 * (1.96 / .05) ** 2);
st(`
  ${labClock}
  <h1 class="t">4. Turn your tallies into numbers</h1>
  <div class="lab-rows">
    <div class="lab-row b" data-step="1"><div class="lead"><b>Wrong labels</b></div><div class="lead">3 of 30 → about ${Math.round(labP * 100)}%, but likely anywhere from ${Math.round(labLo * 100)}% to ${Math.round(labHi * 100)}%. With 200 checked: ± ${(labH200 * 100).toFixed(0)} points.</div></div>
    <div class="lab-row b" data-step="2"><div class="lead"><b>Your hard case</b></div><div class="lead">2 of 30 (${(labCov * 100).toFixed(0)}%) in a ${LAB_DS.toLocaleString('en-US')}-image dataset → about ${Math.round(labCov * LAB_DS / 10) * 10}. You need about ${labNeed} to measure accuracy within ±5 points.</div></div>
    <div class="lab-row b" data-step="3"><div class="lead"><b>The benchmark</b></div><div class="lead">best score and test-set size → the smallest gap you can trust (Part 4). Is the best score near the wrong-label rate?</div></div>
  </div>
  ${cite('Tallies are an example; percentages, intervals and counts computed (Part 3 and Part 4 formulas)')}
`);

/* ---------- Step 5: the card ---------- */
const LAB_CARD = [['Task', 'input, label, where used, metric, worst mistake'], ['Datasets', 'two, and where you found them'],
  ['Benchmark', 'name, best score, test-set size, trustworthy gap'], ['Audit', 'wrong labels in 30, with the rough range'],
  ['Hard case', 'share in your sample, estimated count'], ['Split by', 'person, patient, signer, region, season…'],
  ['Verdict', 'use / use and adapt / don\'t use, and the weakest answer'], ['We will collect', 'what, how many, who labels it']];
st(`
  ${labClock}
  <h1 class="t">5. Fill in your card</h1>
  <table class="d6-tbl" style="width:100%;font-size:clamp(.95rem,1.5vw,1.4rem)">
    ${LAB_CARD.map(([k, v], i) => `<tr class="b" data-step="${i < 4 ? 1 : 2}"><td class="rowh" style="width:28%">${k}</td><td style="text-align:left">${v}</td></tr>`).join('')}
  </table>
  <div class="lead b" data-step="3" style="margin-top:1.4vh">Last minute: two teams read their verdict aloud.</div>
`);
}
