/* PART: concepts (Day 13, owner: Shreya). Slide 2 of Shreya's outline: her six definitions (typos fixed), with the
   agent-environment loop from the MIT 6.S191 lecture redrawn in SVG, one piece per click. Then the total reward
   (return) and its discounted form, from the same slide. The weight bars are gamma^k for gamma = 0.9 (computed, an
   illustration, not data). The lecture writes the discounted sum as sum_i gamma^i r_i; here it is written from time t
   as sum_k gamma^k r_{t+k}, the same form as the Q-function slide. No speaker notes. */
{
section('Key concepts');

const sub = (a, b) => `${a}<tspan baseline-shift="sub" font-size="19">${b}</tspan>`;
st(`
  <h1 class="t">Reinforcement learning: key concepts</h1>
  <div class="d13-col">
    <div class="d13-split">
      <svg class="d13-svg" viewBox="0 0 660 440" aria-label="The agent-environment loop: the agent sends an action to the environment; the environment sends back an observation of the new state and a reward">
        ${d13Head('d13-h1')}
        <g class="b" data-step="1">
          <rect x="20" y="160" width="220" height="120" rx="16" class="d13-box"/>
          <text x="130" y="230" text-anchor="middle" class="d13-t">Agent</text>
        </g>
        <g class="b" data-step="2">
          <rect x="420" y="160" width="220" height="120" rx="16" class="d13-box"/>
          <text x="530" y="230" text-anchor="middle" class="d13-t">Environment</text>
        </g>
        <g class="b" data-step="3">
          <path d="M130 285 L130 350 L530 350 L530 292" class="d13-line" marker-end="url(#d13-h1)"/>
          <text x="330" y="336" text-anchor="middle">action <tspan class="d13-i">${sub('a', 't')}</tspan></text>
        </g>
        <g class="b" data-step="4">
          <text x="330" y="395" text-anchor="middle" class="d13-m">action space, for example:</text>
          <text x="330" y="428" text-anchor="middle" class="d13-m">left · stay · right</text>
        </g>
        <g class="b" data-step="5">
          <path d="M530 155 L530 90 L130 90 L130 148" class="d13-line" marker-end="url(#d13-h1)"/>
          <text x="330" y="74" text-anchor="middle">observation: new state <tspan class="d13-i">${sub('s', 't+1')}</tspan></text>
        </g>
        <g class="b" data-step="6">
          <text x="330" y="132" text-anchor="middle">reward <tspan class="d13-i">${sub('r', 't')}</tspan></text>
        </g>
      </svg>
      <ul class="d13-defs">
        <li class="b" data-step="1"><b>Agent</b> takes actions</li>
        <li class="b" data-step="2"><b>Environment</b> the world the agent lives in</li>
        <li class="b" data-step="3"><b>Action</b> a move the agent can make in the environment</li>
        <li class="b" data-step="4"><b>Action space</b> the set of all actions the agent can make</li>
        <li class="b" data-step="5"><b>Observation</b> what the agent sees of the environment after it acts</li>
        <li class="b" data-step="6"><b>Reward</b> feedback that measures the success or failure of the action</li>
      </ul>
    </div>
  </div>
  ${cite('Loop redrawn from MIT 6.S191, Introduction to Deep Learning, lecture on deep reinforcement learning')}
`);

const g = 0.9, ks = [0, 1, 2, 3, 4, 5, 6, 7];
st(`
  <h1 class="t">Total reward: the return</h1>
  <div class="d13-col d13-tight">
    <div class="b">
      <div class="d13-math">${d13Tex('R_t = r_t + r_{t+1} + r_{t+2} + \\cdots = \\sum_{i=t}^{\\infty} r_i')}</div>
      <div class="d13-words">Everything the agent will collect from time ${d13t('t')} on</div>
    </div>
    <div class="b">
      <div class="d13-math">${d13Tex('R_t = r_t + \\gamma\\, r_{t+1} + \\gamma^2 r_{t+2} + \\cdots = \\sum_{k=0}^{\\infty} \\gamma^k\\, r_{t+k}')}</div>
      <div class="d13-words">Discounted: ${d13t('\\gamma')} is the discount factor, ${d13t('0 < \\gamma < 1')}</div>
    </div>
    <div class="b">
      <div class="d13-bars" aria-label="Weights gamma to the k, for gamma 0.9, shrinking from 1 at k = 0">
        ${ks.map(k => `<div><i style="height:${(Math.pow(g, k) * 100).toFixed(1)}%"></i><span>${d13t(k ? `\\gamma^{${k}}` : '1')}</span></div>`).join('')}
      </div>
      <div class="d13-words d13-small" style="margin-top:1vh">Weights for ${d13t('\\gamma = 0.9')}: a reward now counts more than the same reward later</div>
    </div>
  </div>
  ${cite('After MIT 6.S191, Introduction to Deep Learning, lecture on deep reinforcement learning')}
`);
}
