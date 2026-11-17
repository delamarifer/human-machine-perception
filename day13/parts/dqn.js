/* PART: dqn (Day 13, owner: Shreya). Slide 7 of Shreya's outline: Deep Q Networks, training. The two ways to model Q
   with a network (state + action in, one Q out; or state in, one Q per action out) are redrawn in grays from the
   MIT 6.S191 lecture, with its question "What happens if we take all the best actions?". Her outline also shows the
   target r + gamma max_a' Q(s', a'); the second slide adds the prediction and the squared-error loss of the DQN
   paper (Mnih et al. 2015). No speaker notes. */
{
section('Deep Q networks');

const nn = (x) => `
  <path d="M${x} 90 L${x + 160} 150 L${x + 160} 240 L${x} 300 Z" class="d13-box"/>
  <text x="${x + 72}" y="190" text-anchor="middle" class="d13-t">Deep</text>
  <text x="${x + 72}" y="224" text-anchor="middle" class="d13-t">NN</text>`;
const q = (x, y, a) => `<text x="${x}" y="${y}" class="d13-i">Q(s, ${a})</text>`;
st(`
  <h1 class="t">Deep Q networks: a network learns Q</h1>
  <div class="d13-col">
    <svg class="d13-svg" viewBox="0 0 1200 400" aria-label="Two networks. Left: state and action go in, one Q-value comes out. Right: the state goes in, one Q-value for each action comes out">
      ${d13Head('d13-h2')}
      <g class="b">
        <rect x="6" y="6" width="568" height="388" rx="20" class="d13-box" style="stroke:#94a3b8;stroke-width:2"/>
        <text x="290" y="50" text-anchor="middle" class="d13-t">State + action → expected return</text>
        <rect x="36" y="100" width="140" height="80" rx="8" class="d13-soft"/>
        <text x="106" y="148" text-anchor="middle">state <tspan class="d13-i">s</tspan></text>
        <rect x="36" y="220" width="140" height="80" rx="8" class="d13-soft"/>
        <text x="106" y="255" text-anchor="middle" font-style="italic">“move right”</text>
        <text x="106" y="285" text-anchor="middle">action <tspan class="d13-i">a</tspan></text>
        <path d="M180 140 L232 140" class="d13-line" marker-end="url(#d13-h2)"/>
        <path d="M180 260 L232 260" class="d13-line" marker-end="url(#d13-h2)"/>
        ${nn(240)}
        <path d="M404 195 L446 195" class="d13-line" marker-end="url(#d13-h2)"/>
        ${q(454, 204, 'a')}
        <text x="106" y="360" text-anchor="middle" class="d13-m">input</text>
        <text x="312" y="360" text-anchor="middle" class="d13-m">agent</text>
        <text x="500" y="360" text-anchor="middle" class="d13-m">output</text>
      </g>
      <g class="b">
        <rect x="626" y="6" width="568" height="388" rx="20" class="d13-box" style="stroke:#94a3b8;stroke-width:2"/>
        <text x="910" y="50" text-anchor="middle" class="d13-t">State → expected return for each action</text>
        <rect x="656" y="155" width="140" height="80" rx="8" class="d13-soft"/>
        <text x="726" y="203" text-anchor="middle">state <tspan class="d13-i">s</tspan></text>
        <path d="M800 195 L852 195" class="d13-line" marker-end="url(#d13-h2)"/>
        ${nn(860)}
        <path d="M1024 195 L1040 195 M1040 120 L1040 280 M1040 120 L1066 120 M1040 180 L1066 180 M1040 280 L1066 280" class="d13-line"/>
        ${q(1072, 129, '<tspan>a</tspan><tspan baseline-shift="sub" font-size="18">1</tspan>')}
        ${q(1072, 189, '<tspan>a</tspan><tspan baseline-shift="sub" font-size="18">2</tspan>')}
        <text x="1110" y="238" text-anchor="middle">⋮</text>
        ${q(1072, 289, '<tspan>a</tspan><tspan baseline-shift="sub" font-size="18">n</tspan>')}
        <text x="726" y="360" text-anchor="middle" class="d13-m">input</text>
        <text x="932" y="360" text-anchor="middle" class="d13-m">agent</text>
        <text x="1120" y="360" text-anchor="middle" class="d13-m">output</text>
      </g>
    </svg>
    <div class="d13-ask b">What happens if we take all the best actions?</div>
  </div>
  ${cite('Redrawn from MIT 6.S191, Introduction to Deep Learning, lecture on deep reinforcement learning')}
`);

st(`
  <h1 class="t">Training a deep Q network</h1>
  <div class="d13-col d13-tight">
    <div class="b">
      <div class="d13-math">${d13Tex('\\underbrace{\\Big(\\, r + \\gamma \\max_{a\'} Q(s\', a\') \\,\\Big)}_{\\text{target}}')}</div>
      <div class="d13-words">Target: the reward now, plus the best Q-value from the next state</div>
    </div>
    <div class="b">
      <div class="d13-math">${d13Tex('\\underbrace{Q(s, a)}_{\\text{predicted}}')}</div>
      <div class="d13-words">Prediction: what the network says now</div>
    </div>
    <div class="b">
      <div class="d13-math">${d13Tex('\\mathcal{L} = \\mathbb{E}\\Big[\\, \\big\\| \\big(r + \\gamma \\max_{a\'} Q(s\', a\')\\big) - Q(s, a) \\big\\|^2 \\,\\Big]')}</div>
      <div class="d13-words">Loss: train the network to close the gap</div>
    </div>
  </div>
  ${cite('After MIT 6.S191, Introduction to Deep Learning, lecture on deep reinforcement learning · DQN: Mnih et al., Nature (2015)')}
`);
}
