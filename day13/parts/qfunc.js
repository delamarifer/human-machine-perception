/* PART: qfunc (Day 13, owner: Shreya). Slides 3 to 5 of Shreya's outline: defining the Q-function; how to take
   actions given a Q-function (her bullets: "is there an optimal case? we want to maximize the Q function", "policy");
   value learning vs policy learning. From the MIT 6.S191 deep RL lecture, set as text and math. The lecture marks
   state and action in blue and green; here they are named in words instead (no colored words).
   The Q bars on the policy slide are an illustration with no values. No speaker notes. */
{
section('The Q-function');

st(`
  <h1 class="t">The Q-function</h1>
  <div class="d13-col">
    <div class="b">
      <div class="d13-math">${d13Tex('Q(s_t, a_t) = \\mathbb{E}\\left[\\, R_t \\mid s_t, a_t \\,\\right]')}</div>
    </div>
    <div class="d13-words b">The <b>expected total future reward</b> an agent in <b>state ${d13t('s')}</b> can get by taking <b>action ${d13t('a')}</b></div>
    <div class="d13-callout b">A score for every action, in every state</div>
  </div>
  ${cite('After MIT 6.S191, Introduction to Deep Learning, lecture on deep reinforcement learning')}
`);

const acts = [['left', 45], ['stay', 70], ['right', 92]];
st(`
  <h1 class="t">How to take actions given a Q-function?</h1>
  <div class="d13-col">
    <div class="d13-words b">The agent needs a <b>policy</b> ${d13t('\\pi(s)')}: the best action to take in state ${d13t('s')}</div>
    <div class="b">
      <div class="d13-bars" aria-label="Illustration: three actions in one state, with Q-values; right is the highest">
        ${acts.map(([a, h], i) => `<div class="${i === 2 ? 'd13-top' : ''}"><i style="height:${h}%"></i><span>${d13t(`Q(s, \\text{${a}})`)}</span></div>`).join('')}
      </div>
      <div class="d13-words d13-small" style="margin-top:1vh">Illustration: one state, three actions</div>
    </div>
    <div class="b">
      <div class="d13-math">${d13Tex('\\pi^*(s) = \\underset{a}{\\operatorname{argmax}}\\; Q(s, a)')}</div>
      <div class="d13-words">The optimal policy: pick the action with the highest Q-value</div>
    </div>
  </div>
  ${cite('After MIT 6.S191, Introduction to Deep Learning, lecture on deep reinforcement learning')}
`);

st(`
  <h1 class="t">Two ways to learn to act</h1>
  <div class="d13-col">
    <div class="d13-cards" style="--n:2">
      <div class="d13-card b">
        <b>Value learning</b>
        <span>Find ${d13t('Q(s, a)')}</span>
        <div class="d13-math">${d13Tex('a = \\underset{a}{\\operatorname{argmax}}\\; Q(s, a)')}</div>
      </div>
      <div class="d13-card b">
        <b>Policy learning</b>
        <span>Find ${d13t('\\pi(s)')}</span>
        <div class="d13-math">${d13Tex('a \\sim \\pi(s)')}</div>
      </div>
    </div>
    <div class="d13-callout b">Today: value learning, with a deep network for Q</div>
  </div>
  ${cite('After MIT 6.S191, Introduction to Deep Learning, lecture on deep reinforcement learning')}
`);
}
