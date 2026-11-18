/* PART: case (Day 12, owner: Shreya). Built 2026-11-18. Opens the Physical AI case study: the same robot, seen as a
   research question and as a deployment problem. The lab-side questions come from TRI's LBM-1 question and the
   evaluation lesson used earlier in this course; the factory-side questions from Walden's metrics (time between
   interventions, remote assistance; LBM 2.0 post) and Tedrake's "Why Walden?" (unit economics). No speaker notes. */
{
section('Physical AI');

st(`
  <h1 class="t">A research question vs a deployment problem</h1>
  <div class="d12-col">
    <div class="d12-two">
      <div class="b"><h2>The lab asks</h2><ul>
        <li>Does more pretraining data help?</li>
        <li>Is 80% really better than 70%?</li>
        <li>Does it work on a task it never saw?</li>
      </ul></div>
      <div class="b"><h2>The factory asks</h2><ul>
        <li>How often does it need a human?</li>
        <li>What does each hour of work cost?</li>
        <li>Is it safe next to people? Will it still work next month?</li>
      </ul></div>
    </div>
    <div class="d12-callout b">Same robot, different questions. Two companies show how that works</div>
  </div>
`);
}
