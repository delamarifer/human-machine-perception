/* PART: activity (Day 10, owner: Shreya). Google Slides 9-10 (the constraint-cards slide was removed, Shreya 2026-11-13). Everyone runs the same notebook, day10/workbook/generative-system-lab.ipynb (every stage reuses a class lab).
   The Colab link works once day10/workbook is pushed to main. No speaker notes. */
{
section('Activity');

st(`
  <h1 class="t">Step 1 · Draw it and write it down (10 min)</h1>
  <div class="d10-col">
    <ul class="d10-list">
      <li class="b">Draw the six-box pipeline: what goes in, what method, what comes out</li>
      <li class="b">Pick one stage and write it as an equation or pseudocode</li>
      <li class="b">Example: keep x if p<sub>remove</sub>(x) &lt; τ</li>
    </ul>
  </div>
`);

st(`
  <h1 class="t">Step 2 · Build it in Colab (25 min)</h1>
  <div class="d10-col">
    <div class="d10-open b"><a href="https://colab.research.google.com/github/delamarifer/human-machine-perception/blob/main/day10/workbook/generative-system-lab.ipynb" target="_blank" rel="noopener">Open the Generative System Lab</a></div>
    <ul class="d10-list">
      <li class="b">Run it top to bottom, filling in TODOs 1–5</li>
      <li class="b">At each stage, note one result that surprised you</li>
      <li class="b">A CPU runtime is fine: about 2 minutes, plus downloads</li>
    </ul>
  </div>
`);
}
