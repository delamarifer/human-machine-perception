/* PART: case (Day 12, owner: Shreya). Built 2026-11-18. Opens the Physical AI case study: three kinds of questions about
   one robot (lab research, research that needs scale, engineering to deploy; Shreya, 2026-11-18). The middle column
   comes from Walden's LBM 2.0 post (100,000 hours, data recipe, learning from interventions) and PI's RECAP. The lab-side questions come from TRI's LBM-1 question and the
   evaluation lesson used earlier in this course; the factory-side questions from Walden's metrics (time between
   interventions, remote assistance; LBM 2.0 post) and Tedrake's "Why Walden?" (unit economics). No speaker notes. */
{
section('Physical AI');

st(`
  <h1 class="t">Three kinds of questions about one robot</h1>
  <div class="d12-col">
    <div class="d12-two" style="grid-template-columns:repeat(3, minmax(0,1fr))">
      <div class="b"><h2>Lab research</h2><ul>
        <li>Does more pretraining data help?</li>
        <li>Is 80% really better than 70%?</li>
        <li>Does it work on a task it never saw?</li>
      </ul></div>
      <div class="b"><h2>Research at scale</h2><ul>
        <li>What happens at 100,000 hours of data?</li>
        <li>Can a robot learn from its own mistakes on the job?</li>
        <li>Which mix of data matters most?</li>
      </ul></div>
      <div class="b"><h2>Engineering to deploy</h2><ul>
        <li>How often does it need a human?</li>
        <li>What does each hour of work cost?</li>
        <li>Is it safe next to people?</li>
      </ul></div>
    </div>
  </div>
`);
}
