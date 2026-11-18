/* PART: pi (Day 12, owner: Shreya). Why copying demonstrations is not enough (an illustration), then the pi*0.6 post
   in one slide. Videos stream from the post (website.pi-asset.com/pi06star/: box_building = pretraining data,
   intervention_example = an expert takes over, making_coffee = after RECAP). Source: Physical Intelligence, "pi*0.6: a VLA that Learns from Experience", pi.website/blog/pistar06
   (17 Nov 2025): compounding errors; RECAP = demonstrations, corrections (expert takes over), and RL from autonomous
   experience; a value function predicts progress; the policy is trained on all data conditioned on the advantage, then
   asked for high-advantage actions; more than doubles throughput on some of the hardest tasks; failure rates down 2x
   or more; espresso drinks from 5:30am to 11:30pm. No speaker notes. */
{
/* The drift illustration (why copying demonstrations is not enough) was removed on 2026-11-18 for the 60-minute
   lecture; its point is now a bullet on the lifecycle slide. It is in git history (commit 7b83579). */

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

/* RECAP, redrawn from the diagram in the pi*0.6 post (the post builds it from live page elements and videos, so it
   cannot be saved as an image). Same boxes and arrows: pretraining data -> pi0.6 VLA with an action expert -> actions
   -> autonomous episodes; episodes get reward labels and expert interventions -> RL training -> value function ->
   advantage -> back into the VLA. Added at Shreya's request: "the architecture diagram for each". One part per click. */
{
const bx = (x, y, w, h, title, sub, cls = '') => `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" class="d12-abox ${cls}"/>
  <text x="${x + w / 2}" y="${y + (sub ? h / 2 - 6 : h / 2 + 9)}" text-anchor="middle" class="d12-at">${title}</text>
  ${sub ? `<text x="${x + w / 2}" y="${y + h / 2 + 24}" text-anchor="middle" class="d12-as">${sub}</text>` : ''}`;
const ar = d => `<path d="${d}" class="d12-aline" marker-end="url(#d12-head)"/>`;
st(`
  <h1 class="t">How π*0.6 learns: RECAP</h1>
  <div class="d12-col">
    <svg class="d12-recap" viewBox="0 0 1200 520" aria-label="RECAP diagram, redrawn: pretraining data trains the pi 0.6 VLA with an action expert; its actions produce autonomous episodes; reward labels and expert interventions feed RL training; RL training trains a value function, whose advantage is fed back into the VLA">
      <defs><marker id="d12-head" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="#0f172a"/></marker></defs>
      <g class="b">
        ${bx(30, 70, 210, 130, 'Pretraining data', 'demos of many tasks')}
        ${ar('M245 135 L 300 135')}
        <rect x="305" y="70" width="300" height="130" rx="14" class="d12-abox"/>
        <text x="390" y="142" text-anchor="middle" class="d12-at">π0.6 VLA</text>
        ${bx(480, 95, 105, 80, 'Action', 'expert', 'd12-adark')}
      </g>
      <g class="b">
        ${ar('M605 135 L 690 135')}
        <text x="647" y="122" text-anchor="middle" class="d12-as">actions</text>
        ${bx(695, 70, 470, 130, 'Autonomous episodes', 'laundry · espresso · boxes')}
      </g>
      <g class="b">
        ${ar('M820 205 L 820 265')}
        ${bx(700, 270, 240, 80, 'Reward label', 'did it succeed?')}
        ${ar('M1045 205 L 1045 265')}
        ${bx(955, 270, 210, 80, 'Intervention', 'an expert takes over')}
      </g>
      <g class="b">
        ${ar('M820 355 L 820 405')}
        ${ar('M1060 355 L 1060 405')}
        ${bx(700, 410, 465, 80, 'RL training', '')}
        ${ar('M695 450 L 610 450')}
        ${bx(305, 410, 300, 80, 'Value function', 'predicts progress')}
        ${ar('M455 405 L 455 350')}
        ${bx(330, 270, 250, 75, 'Advantage', 'better than expected?')}
        ${ar('M455 265 L 455 205')}
      </g>
    </svg>
  </div>
  ${cite('Redrawn from the diagram in Physical Intelligence, “π*0.6: a VLA that learns from experience” (Nov 2025)')}
`);
}

