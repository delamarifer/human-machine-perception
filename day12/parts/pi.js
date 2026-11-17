/* PART: pi (Day 12, owner: Shreya). Why copying demonstrations is not enough (an illustration), then the pi*0.6 post
   in one slide. Videos stream from the post (website.pi-asset.com/pi06star/: box_building = pretraining data,
   intervention_example = an expert takes over, making_coffee = after RECAP). Source: Physical Intelligence, "pi*0.6: a VLA that Learns from Experience", pi.website/blog/pistar06
   (17 Nov 2025): compounding errors; RECAP = demonstrations, corrections (expert takes over), and RL from autonomous
   experience; a value function predicts progress; the policy is trained on all data conditioned on the advantage, then
   asked for high-advantage actions; more than doubles throughput on some of the hardest tasks; failure rates down 2x
   or more; espresso drinks from 5:30am to 11:30pm. The drift drawing is an illustration, not data. No speaker notes. */
{
st(`
  <h1 class="t">Why copying demonstrations is not enough</h1>
  <div class="d12-col">
    <svg class="d12-drift" viewBox="0 0 1000 430" aria-label="A demonstrated path from start to goal, and a robot path that drifts further and further away from it">
      <circle cx="80" cy="300" r="16" fill="#0f172a"/><text x="52" y="350">start</text>
      <rect x="884" y="124" width="32" height="32" fill="none" stroke="#0f172a" stroke-width="4"/><text x="878" y="108">goal</text>
      <g class="b" data-step="1">
        <path class="d12-path d12-demo" d="M80 300 C 350 300, 600 140, 900 140"/>
        <text x="100" y="255" class="d12-mute">the demonstration</text>
      </g>
      <g class="b" data-step="2">
        <path class="d12-path d12-robot" pathLength="1" d="M80 300 C 200 302, 300 300, 400 286"/>
        <circle cx="400" cy="286" r="9" fill="#0f172a"/>
        <text x="300" y="335">a small mistake</text>
      </g>
      <g class="b" data-step="3">
        <path class="d12-path d12-robot" pathLength="1" d="M400 286 C 500 272, 600 290, 700 330 S 840 400, 890 400"/>
        <text x="890" y="410" font-size="40" text-anchor="middle">✕</text>
        <text x="850" y="426" text-anchor="end">a situation the demonstrations never showed</text>
      </g>
    </svg>
    <div class="d12-callout b" data-step="4">The fix: train on the mistakes the robot actually makes</div>
  </div>
  ${cite('Illustration. Idea from Physical Intelligence, “π*0.6: a VLA that learns from experience” (Nov 2025)')}
`);

st(`
  <h1 class="t">Physical Intelligence’s π*0.6: instruction, coaching, practice</h1>
  <div class="d12-col">
    <div class="d12-loop" style="--n:3">
      <div class="b">${d12Vid("https://website.pi-asset.com/pi06star/box_building.mp4")}<small>1 · Instruction</small><b>Demonstrations</b><span>People drive the robot through the task</span></div>
      <div class="b">${d12Vid("https://website.pi-asset.com/pi06star/intervention_example.mp4")}<small>2 · Coaching</small><b>Corrections</b><span>An expert takes over when the robot makes a mistake</span></div>
      <div class="b">${d12Vid("https://website.pi-asset.com/pi06star/making_coffee.mp4")}<small>3 · Practice</small><b>Reinforcement learning</b><span>The robot learns from its own attempts (after practice: espresso)</span></div>
    </div>
    <div class="d12-callout b">How practice works: a value function predicts progress toward the goal. Actions that raise it are good. Train on everything, labeled good or bad, then ask for the good actions.</div>
    <div class="d12-nums" style="--n:3">
      <div class="d12-num b"><b>More than 2×</b><span>successes per hour on the hardest tasks, like making espresso</span></div>
      <div class="d12-num b"><b>2× fewer</b><span>failures, or better</span></div>
      <div class="d12-num b"><b>5:30am – 11:30pm</b><span>making espresso drinks, without interruption</span></div>
    </div>
  </div>
  ${cite('Videos and numbers: Physical Intelligence, “π*0.6: a VLA that learns from experience” (Nov 2025), reported by the company')}
`);
}
