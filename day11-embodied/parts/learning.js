/* PART: learning (Day 11, owner: Shreya). Built 2026-11-16 from Shreya's Google Slides 27-29:
   "Reinforcement learning" (title and a photo of a talk slide with Allegro-hand results; replaced by a drawn loop),
   "Diffusion Policy" (her lines: Imitation Learning Methods; How can we get the target trajectories), and "data" (her
   link: Scale AI, "Expanding Our Data Engine for Physical AI", Ben Levin, 2025-09-24; numbers quoted from it).
   The RL wording follows the syllabus ("learning from rewards, by trial and error"). Diffusion Policy: Chi et al., RSS 2023.
   No speaker notes. */
{
section('Learning to act');

const T = d11Tex;

st(`
  <h1 class="t">Reinforcement learning</h1>
  <div class="d11-col">
    <div class="d11-split">
      <svg class="d11-svg" viewBox="0 0 560 380" role="img" aria-label="The reinforcement learning loop: the agent sends an action to the environment, which returns a new state and a reward">
        <defs><marker id="d11-ah4" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#0f172a"/></marker></defs>
        <g class="b" data-step="1"><rect x="190" y="30" width="180" height="80" rx="14" fill="#fff" stroke="#0f172a" stroke-width="3"/>
          <text x="280" y="68" text-anchor="middle" font-size="26" font-weight="700">Agent</text><text x="280" y="94" text-anchor="middle" font-size="17" fill="#64748b">the robot’s policy π</text></g>
        <g class="b" data-step="1"><rect x="190" y="260" width="180" height="80" rx="14" fill="#fff" stroke="#0f172a" stroke-width="3"/>
          <text x="280" y="298" text-anchor="middle" font-size="26" font-weight="700">Environment</text><text x="280" y="324" text-anchor="middle" font-size="17" fill="#64748b">the world</text></g>
        <g class="b" data-step="2"><path d="M370 70 C 470 70, 470 300, 378 300" fill="none" stroke="#0f172a" stroke-width="3" marker-end="url(#d11-ah4)"/>
          <text x="478" y="190" font-size="22" font-style="italic">action a<tspan font-size="15" dy="5">t</tspan></text></g>
        <g class="b" data-step="3"><path d="M190 300 C 90 300, 90 70, 182 70" fill="none" stroke="#0f172a" stroke-width="3" marker-end="url(#d11-ah4)"/>
          <text x="6" y="170" font-size="22" font-style="italic">state s<tspan font-size="15" dy="5">t+1</tspan></text>
          <text x="6" y="206" font-size="22" font-style="italic">reward r<tspan font-size="15" dy="5">t+1</tspan></text></g>
      </svg>
      <div class="d11-side">
        <div class="d11-step b" data-step="2">The robot acts</div>
        <div class="d11-step b" data-step="3">The world changes, and gives a reward</div>
        <div class="d11-math b" data-step="4">${T(String.raw`\max_{\pi}\; \mathbb E\Big[\sum_{t} \gamma^{t}\, r_t\Big]`)}</div>
        <div class="d11-callout b" data-step="4">Learning from rewards, by trial and error</div>
      </div>
    </div>
  </div>
`);

st(`
  <h1 class="t">Diffusion Policy</h1>
  <div class="d11-col">
    <div class="d11-split d11-fwrap">
      <canvas class="d11-canvas b" data-step="2" data-anim="noiseStill" width="620" height="400" aria-label="Dots for a sequence of robot actions, starting as random noise and becoming a smooth path from a start to a goal"></canvas>
      <div class="d11-side">
        <div class="d11-step b" data-step="1"><b>Imitation learning</b> methods: learn from demonstrations</div>
        <div class="d11-step b" data-step="2">Start from noise: a random sequence of actions</div>
        <div class="d11-step b" data-step="3" data-anim="denoise">Denoise, step by step, given what the camera sees</div>
        <div class="d11-callout b" data-step="4">How can we get the target trajectories?</div>
      </div>
    </div>
  </div>
  ${cite('Chi et al., Diffusion Policy: Visuomotor Policy Learning via Action Diffusion, RSS 2023 · Illustration made for this course')}
`);

/* Google slide 29: "data" and her link. Title is a draft. Numbers quoted from the Scale AI post (a company blog). */
st(`
  <h1 class="t">Where does robot data come from?</h1>
  <div class="d11-col">
    <div class="d11-quotes">
      <div class="d11-big b">Language models: <b>trillions of tokens</b> from the internet</div>
      <div class="d11-big b">Vision models: <b>billions of images</b></div>
      <div class="d11-big b">Robots: the open datasets DROID and Open X-Embodiment, about <b>5,000 hours</b> combined
        <small>Robot interaction data can’t be scraped from the web: it has to be collected in the real world</small></div>
      <div class="d11-callout b">So who collects it, how, and at what cost?</div>
    </div>
  </div>
  ${cite('Scale AI, “Expanding Our Data Engine for Physical AI”, Ben Levin, 24 Sept 2025 (a company blog post)')}
`);
}
