/* PART: talk (Final presentations, owner: Shreya), 2026-11-16. One talk outline for everyone (Shreya, 2026-11-16: the
   two tracks are similar and every project has a setup, so no separate demo and experiment outlines). Merged from the two
   outlines on templates.html #presentation, keeping its weights. One step per click. No speaker notes. */
{
section('Talk');

const PR_TALK = [
  ['The idea', '20%', 'Your question or problem, and why the room should care, in the first minute. One example image.'],
  ['Setup', '', 'Your data, the models, and what you measured. The pipeline or the conditions as boxes.'],
  ['Results', '35%', 'Your main number or figure, said in one sentence. A live demo if you have one. Two or three examples.'],
  ['Where it fails', '20%', 'Two or three failures, and what your setup cannot tell you.'],
  ['What it means', '', 'For how models see, for how people see, and what you would do with another week.'],
];

st(`
  <h1 class="t">Cover these ideas</h1>
  <div class="pr-col">
    <p style="margin:0;text-align:center;color:var(--mute);font-size:clamp(1.05rem,1.7vw,1.5rem)">In this order. As many slides as you need.</p>
    <ol class="pr-steps">${PR_TALK.map(([t, w, cue], k) =>
      `<li class="b"><b><em>${k + 1}</em>${t}${w ? `<span class="pr-w">${w}</span>` : ''}</b><span>${cue}</span></li>`).join('')}</ol>
  </div>
`);

const PR_GRADE = [
  ['The idea', 'Clear in the first minute', 20],
  ['Results', 'The main finding, shown well', 35],
  ['Where it fails', 'Honest about what does not work', 20],
  ['Delivery', 'Clear slides, within time', 15],
  ['Questions', 'Your answers to the class', 10],
];
st(`
  <h1 class="t">How is the talk graded?</h1>
  <div class="pr-col">
    <table class="pr-tbl">
      <tr><th>Part</th><th>What we look for</th><th></th><th class="pr-num">Weight</th></tr>
      ${PR_GRADE.map(([p, w, n]) => `<tr class="b"><td>${p}</td><td>${w}</td><td style="width:22%"><div class="pr-bar" style="width:${n / 35 * 100}%"></div></td><td class="pr-num">${n}%</td></tr>`).join('')}
    </table>
  </div>
`);
}
