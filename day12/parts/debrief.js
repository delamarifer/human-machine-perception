/* PART: debrief (Day 12, owner: Shreya). Rebuilt 2026-11-17 at Shreya's request: "for the blog posts we can break
   each one down in a slide" (the side-by-side table and the discussion slide were removed). One slide per post.
   Every number is stated in the posts' text (none read off their charts). Sources (read 2026-11-17):
   - Walden, "LBM 2.0: Accelerating learning in deployment" (11 Nov 2026): Sage pretrained on 100,000 hours (cross-
     embodiment robot behavior, egocentric human recordings, UMI trajectories, simulation, intervention traces); about
     6.2 h of demonstrations per task; deployed for three eight-hour shifts per task with remote assistance; corrective
     data added to training. Camshaft job MTBI 22.6 s and 78.5 s (first two generations), 340.3 s (Sage). Sage MTBI
     about 41 s after adaptation, 80 s after deployment learning; Sage-1k (1,000 h) 27 to 28 s.
   - Physical Intelligence, "pi*0.6: a VLA that Learns from Experience" (17 Nov 2025): RECAP = demonstrations,
     corrections (expert takes over), and RL from autonomous experience; a value function predicts progress; the policy
     is trained on all data conditioned on the advantage, then asked for high-advantage actions; more than doubles
     throughput on some of the hardest tasks; failure rates down 2x or more; espresso drinks from 5:30am to 11:30pm.
   No speaker notes. */
{
section('The two posts');

st(`
  <h1 class="t">Walden’s LBM 2.0: learning on the job</h1>
  <div class="d12-col">
    <div class="d12-loop">
      <div class="b"><small>1 · Pretrain</small><b>100,000 hours</b><span>Other robots, first-person human video, handheld-gripper demos, simulation, past corrections</span></div>
      <div class="b"><small>2 · Adapt</small><b>About 6 hours per task</b><span>Demonstrations of the new job</span></div>
      <div class="b"><small>3 · Deploy</small><b>Eight-hour shifts</b><span>A remote person helps when the robot needs it</span></div>
      <div class="b"><small>4 · Learn</small><b>Corrections → training</b><span>The next model learns from the help it needed</span></div>
    </div>
    <div class="d12-back b">↺ and again</div>
    <div class="d12-nums">
      <div class="d12-num b"><b>22.6 s → 340.3 s</b><span>Average time between human interventions on a camshaft job, from their first model to Sage</span></div>
      <div class="d12-num b"><b>41 → 80 s, vs 27 → 28 s</b><span>Gain from deployment: Sage, pretrained on 100,000 hours, vs the same model pretrained on 1,000 hours</span></div>
    </div>
    <div class="d12-callout b">More pretraining, more learned on the job</div>
  </div>
  ${cite('Walden Robotics, “LBM 2.0: Accelerating learning in deployment” (Nov 2026). Numbers reported by the company.')}
`);

st(`
  <h1 class="t">Physical Intelligence’s π*0.6: instruction, coaching, practice</h1>
  <div class="d12-col">
    <div class="d12-loop" style="--n:3">
      <div class="b"><small>1 · Instruction</small><b>Demonstrations</b><span>People drive the robot through the task</span></div>
      <div class="b"><small>2 · Coaching</small><b>Corrections</b><span>An expert takes over when the robot makes a mistake</span></div>
      <div class="b"><small>3 · Practice</small><b>Reinforcement learning</b><span>The robot learns from its own attempts</span></div>
    </div>
    <div class="d12-callout b">How practice works: a value function predicts progress toward the goal. Actions that raise it are good. Train on everything, labeled good or bad, then ask for the good actions.</div>
    <div class="d12-nums" style="--n:3">
      <div class="d12-num b"><b>More than 2×</b><span>successes per hour on the hardest tasks, like making espresso</span></div>
      <div class="d12-num b"><b>2× fewer</b><span>failures, or better</span></div>
      <div class="d12-num b"><b>5:30am – 11:30pm</b><span>making espresso drinks, without interruption</span></div>
    </div>
  </div>
  ${cite('Physical Intelligence, “π*0.6: a VLA that learns from experience” (Nov 2025). Numbers reported by the company.')}
`);
}
