/* PART: read (Day 12, owner: Shreya). Built 2026-11-17. Shreya: "maybe we can just give students time to read it in
   class too ... just not have a lot of slides". One slide sets up the shared problem, one hands out the reading.
   Sources (read 2026-11-17):
   - Physical Intelligence, "pi*0.6: a VLA that Learns from Experience", pi.website/blog/pistar06 (17 Nov 2025):
     why imitation is not enough; small mistakes lead to situations unlike the training data, then bigger mistakes,
     "compounding errors"; the fix is training on data from the robot's own behavior.
   - Walden Robotics, "LBM 2.0: Accelerating learning in deployment",
     waldenrobotics.com/news/lbm-2-0-accelerating-learning-in-deployment (11 Nov 2026).
   The drift drawing is an illustration, not data. Reading time is not set; Shreya to choose. No speaker notes. */
{
section('Reading');

/* An illustration: the dashed path is the demonstration; the robot copies it, makes a small mistake, and drifts. */
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
  <h1 class="t">Read: two companies, one problem</h1>
  <div class="d12-col">
    <div class="d12-cards" style="--n:2">
      <div class="d12-card b"><small>Walden Robotics · Nov 2026</small><b>LBM 2.0: Accelerating learning in deployment</b>
        <a href="https://www.waldenrobotics.com/news/lbm-2-0-accelerating-learning-in-deployment" target="_blank">waldenrobotics.com/news/lbm-2-0-accelerating-learning-in-deployment</a></div>
      <div class="d12-card b"><small>Physical Intelligence · Nov 2025</small><b>π*0.6: a VLA that learns from experience</b>
        <a href="https://www.pi.website/blog/pistar06" target="_blank">pi.website/blog/pistar06</a></div>
    </div>
    <div class="d12-qs b">
      <div>What data does the robot learn from?</div>
      <div>How does it learn from its own mistakes?</div>
      <div>How do they measure success?</div>
      <div>What is the main result, and would you trust it?</div>
    </div>
  </div>
`);
}
