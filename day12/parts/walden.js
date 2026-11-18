/* PART: walden (Day 12, owner: Shreya). Walden's LBM 2.0 post in one slide.
   Every number is stated in the posts' text (none read off their charts). Sources (read 2026-11-17):
   - Walden, "LBM 2.0: Accelerating learning in deployment" (11 Nov 2026): Sage pretrained on 100,000 hours (cross-
     embodiment robot behavior, egocentric human recordings, UMI trajectories, simulation, intervention traces); about
     6.2 h of demonstrations per task; deployed for three eight-hour shifts per task with remote assistance; corrective
     data added to training. Camshaft job MTBI 22.6 s and 78.5 s (first two generations), 340.3 s (Sage). Sage MTBI
     about 41 s after adaptation, 80 s after deployment learning; Sage-1k (1,000 h) 27 to 28 s.
   Videos stream from the post: the hero clip (Sage at work) and Figure 6 (Sage-1k and Sage side by side on gearbox
   chain placement, 4x speed). No speaker notes. */
{
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
    <div class="d12-media">
      <div class="d12-mpair b">${d12Vid("https://walden-robotics.cdn.prismic.io/walden-robotics/_rc6vfea9ZGxZmJZ_lbm2v2-hero-sage-at-work.mp4", "https://images.prismic.io/walden-robotics/7BBvdAcXwaMIGbvp_lbm2v2-hero-poster.jpg")}
        <div class="d12-num"><b>22.6 s → 340.3 s</b><span>Average time between human interventions on a camshaft job, from their first model to Sage</span></div></div>
      <div class="d12-mpair b">${d12Vid("https://walden-robotics.cdn.prismic.io/walden-robotics/2-EOf6WtYt7VHiaI_lbm2v2-fig6-gearbox-4x.mp4").replace('class="d12-vid"', 'class="d12-vid d12-contain"')}
        <div class="d12-num"><b>41 → 80 s<br>vs 27 → 28 s</b><span>Gain on the job: pretrained on 100,000 hours vs 1,000 hours (video: both, side by side)</span></div></div>
    </div>
  </div>
  ${cite('Videos and numbers: Walden Robotics, “LBM 2.0: Accelerating learning in deployment” (Nov 2026), reported by the company')}
`);
}

/* Walden's own Figure 3 from the post (downloaded 2026-11-17). The original is an animation that loops every 15 s and
   fades out between loops; assets/walden-fig3.svg is a still copy with every element shown (each animation replaced
   by its fully visible value). Added at Shreya's request: "the architecture
   diagram for each". The post has no model-architecture figure; this is its system diagram. */
{
st(`
  <h1 class="t">How Sage learns: Walden’s diagram</h1>
  <div class="d12-col">
    <figure class="d12-arch b"><img src="assets/walden-fig3.svg" alt="Walden's diagram: a pretraining data mixture and task demonstrations train LBM 2.0 Sage; Sage executes the task, remote interventions produce corrective data, and the corrective data trains Sage again"></figure>
  </div>
  ${cite('Figure 3, Walden Robotics, “LBM 2.0: Accelerating learning in deployment” (Nov 2026)')}
`);
}
