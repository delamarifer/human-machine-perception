/* PART: debrief (Day 12, owner: Shreya). Built 2026-11-17. The two posts side by side, one row per click, then the
   discussion. Every figure is stated in the posts' text (none read off their charts). Sources (read 2026-11-17):
   - Walden, LBM 2.0 post (11 Nov 2026): Sage, 4.7-billion-parameter multimodal model; 100,000 hours of data (other
     robots, egocentric human recordings, UMI, simulation, intervention traces); about 6.2 h of demonstrations per task,
     then deployment with remote assistance, corrections added to training; metrics: fraction of time in autonomy and
     mean time between interventions (MTBI); Sage MTBI about 41 s after adaptation to 80 s after deployment learning,
     Sage-1k (1,000 h pretraining) 27 to 28 s.
   - Physical Intelligence, pi*0.6 post (17 Nov 2025): based on pi0.6, a 5B-parameter vision-language model plus an
     action expert; RECAP = demonstrations, expert corrections, and RL from autonomous experience (a value function,
     advantage-conditioned policy); metrics: throughput (successes per hour) and success rate; more than doubles
     throughput on some of the hardest tasks, failure rates down 2x or more.
   No speaker notes. */
{
section('Debrief');

const D12_ROWS = [
  ['The model', 'Sage: a 4.7-billion-parameter multimodal model', 'π*0.6: a 5-billion-parameter vision-language model plus an action expert'],
  ['Learns from', '100,000 hours of mixed data, then corrections from remote helpers on the job', 'Demonstrations, then expert corrections, then practice: reinforcement learning on its own attempts'],
  ['Measured by', 'Time running alone, and time between human interventions', 'Successes per hour, and success rate'],
  ['Main result', 'More pretraining, more gain on the job: about 41 → 80 s between interventions, vs 27 → 28 s for a model pretrained on 1% of the data', 'Practice more than doubles successes per hour on the hardest tasks, and cuts failures by 2× or more'],
];
st(`
  <h1 class="t">What did you find?</h1>
  <div class="d12-col">
    <div class="d12-table">
      <div class="d12-cell d12-head"></div><div class="d12-cell d12-head">Walden: LBM 2.0</div><div class="d12-cell d12-head">Physical Intelligence: π*0.6</div>
      ${D12_ROWS.map(([k, a, b]) => `
        <div class="d12-row b"><div class="d12-cell d12-key">${k}</div><div class="d12-cell">${a}</div><div class="d12-cell">${b}</div></div>`).join('')}
    </div>
    <div class="d12-callout b">Same idea, two routes: robots at work make the data that makes robots better</div>
  </div>
  ${cite('Walden, “LBM 2.0” (Nov 2026) · Physical Intelligence, “π*0.6” (Nov 2025). All numbers are reported by the companies.')}
`);

st(`
  <h1 class="t">Discussion</h1>
  <div class="d12-col">
    <ul class="d12-list">
      <li class="b">These numbers come from the companies themselves. What would you need to see to trust them?</li>
      <li class="b">Demonstrations, coaching, practice: what does a person learning a new skill have that these robots still lack?</li>
    </ul>
  </div>
`);
}
