/* PART: wrapup (Day 6). Owner: Shreya. Plan slide 32 (fixing ColorizeBot), the human-perception tie-ins and the
   discussion questions. The central idea from the opening returns on the first slide. No speaker notes.
   ColorizeBot facts are Ch. 35's (as in Part 1); the fixes are the plan's, one per part of the lecture. */
{
section('Wrap-up');

const wuStyle = `<style>
  .wrapup-col{ display:flex; flex-direction:column; gap:2vh; justify-content:center; }
  .wrapup-row{ display:grid; grid-template-columns:minmax(10em, 17vw) 1fr; gap:1.6vw; align-items:baseline; }
  .wrapup-row .lead{ font-size:clamp(1.05rem, 1.85vw, 1.75rem); }
</style>`;

/* ---------- 32: fixing ColorizeBot, one fix per part ---------- */
const WU_FIX = [
  ['Get better data', 'add old family photos; fake film grain, dust and scratches on new ones'],
  ['Check the data', 'about 12% of ImageNet is dogs: count what is in it, and rebalance toward people and scenes'],
  ['Check the model', 'test on a separate set of old photos, not on ImageNet'],
  ['Adapt over time', 'fine-tune on a small set of old photos; watch what users upload'],
];
st(`${wuStyle}
  <h1 class="t">Fixing ColorizeBot, one part of today at a time</h1>
  <div class="d6-cols" style="grid-template-columns:.8fr 1.3fr;align-items:center">
    <img class="d6-img b" data-step="1" style="max-height:52vh" src="assets/visionbook-ch35/colorizebot_examples.jpg" alt="Figure 35.2: ColorizeBot outputs on old photographs, with pink smudges and wrong colors">
    <div class="wrapup-col">
      ${WU_FIX.map(([p, f], i) => `<div class="wrapup-row b" data-step="${i + 2}"><div class="lead"><b>${p}</b></div><div class="lead">${f}</div></div>`).join('')}
      <div class="statement b" data-step="6" style="margin-top:1vh"><b>A model learns its training data, not the world.</b></div>
    </div>
  </div>
  ${cite(d6Link('https://visionbook.mit.edu/bias_and_shift.html', 'Foundations of Computer Vision, Ch. 35, Fig. 35.2 and the 12% figure') + ' · ' + d6Link('https://creativecommons.org/licenses/by-nc-nd/4.0/', 'CC BY-NC-ND 4.0') + ', unmodified')}
`);

/* ---------- Human-perception tie-ins (plan table) ---------- */
st(`
  <h1 class="t">Your visual system already solves these problems</h1>
  <table class="d6-tbl" style="width:100%;font-size:clamp(1rem,1.65vw,1.55rem)">
    <tr><th style="text-align:left">In machines</th><th style="text-align:left">In people</th></tr>
    <tr class="b" data-step="1"><td style="text-align:left"><b>Photographer bias</b> (Part 1)</td><td style="text-align:left">we photograph and recognize objects best from their typical view</td></tr>
    <tr class="b" data-step="2"><td style="text-align:left"><b>Invariance</b> (Part 2)</td><td style="text-align:left">object constancy: a cup is a cup from any angle, under any light</td></tr>
    <tr class="b" data-step="3"><td style="text-align:left"><b>Test-time adaptation</b> (Part 5)</td><td style="text-align:left">light and dark adaptation, aftereffects: recalibrating to the current input</td></tr>
    <tr class="b" data-step="4"><td style="text-align:left"><b>Replay against forgetting</b> (Part 5)</td><td style="text-align:left">memory replay during sleep</td></tr>
  </table>
  ${cite('Typical views: Palmer, Rosch and Chase (1981), as in Part 1')}
`);

/* ---------- Discussion questions (plan) ---------- */
st(`
  <h1 class="t">Questions to take home</h1>
  <div class="wrapup-col" style="flex:1 1 auto">
    <div class="lead b" data-step="1">As models take over the easy labels, which human labels stay valuable?</div>
    <div class="lead b" data-step="2">A crop-disease dataset for your country: farmers, agronomists or a crowd? What do you gain and lose with each?</div>
    <div class="lead b" data-step="3">Your detector works in Cape Town. What shifts do you expect in Nairobi, and how would you notice them before users do?</div>
    <div class="lead b" data-step="4">Robustness often costs some clean accuracy. When is that trade worth it?</div>
  </div>
`);
}
