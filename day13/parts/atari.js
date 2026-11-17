/* PART: atari (Day 13, owner: Shreya). Slide 6 of Shreya's outline, "Dig deeper into the Q-function": the Atari
   Breakout example from the MIT 6.S191 lecture, redrawn in grays (the game's colored bricks would bring colors into
   the deck). Her second bullet, "What's an example of this in perception", is the last click, as a question for the
   class. The lecture leaves the A or B question open; so does this slide. No speaker notes. */
{
const bricks = [0, 1, 2, 3, 4].map(i => `<rect x="60" y="${70 + i * 18}" width="380" height="16" fill="${['#334155', '#475569', '#64748b', '#94a3b8', '#cbd5e1'][i]}"/>`).join('');
const panel = (x, label, ballPath, paddleX, move) => `
  <rect x="${x}" y="20" width="250" height="190" rx="6" class="d13-dark"/>
  <text x="${x + 14}" y="48" class="d13-w" font-weight="700">${label}</text>
  <rect x="${x + ballPath[0] - 7}" y="${ballPath[1] - 7}" width="14" height="14" fill="#fff"/>
  <path d="M${x + ballPath[0]} ${ballPath[1] + 12} L${x + ballPath[2]} ${ballPath[3]}" stroke="#fff" stroke-width="3" marker-end="url(#d13-hw)"/>
  <rect x="${x + paddleX}" y="168" width="90" height="10" fill="#fff"/>
  ${move ? `<path d="M${x + paddleX + 98} 173 L${x + paddleX + 130} 173" stroke="#fff" stroke-width="3" marker-end="url(#d13-hw)"/>` : ''}`;
st(`
  <h1 class="t">Dig deeper into the Q-function: Atari Breakout</h1>
  <div class="d13-col">
    <div class="d13-split" style="grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr)">
      <svg class="d13-svg b" viewBox="0 0 500 420" aria-label="Breakout: rows of bricks at the top, a ball, and a paddle at the bottom that can move left or right">
        <defs><marker id="d13-hw" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="#fff"/></marker></defs>
        <rect x="20" y="20" width="460" height="390" class="d13-dark"/>
        <rect x="40" y="40" width="420" height="370" fill="#1e293b"/>
        ${bricks}
        <rect x="292" y="300" width="10" height="10" fill="#fff"/>
        <path d="M290 315 L262 362" stroke="#fff" stroke-width="3" marker-end="url(#d13-hw)"/>
        <rect x="215" y="372" width="64" height="10" fill="#fff"/>
        <path d="M205 377 L140 377" stroke="#fff" stroke-width="3" marker-end="url(#d13-hw)"/>
        <path d="M289 377 L354 377" stroke="#fff" stroke-width="3" marker-end="url(#d13-hw)"/>
      </svg>
      <div style="display:flex;flex-direction:column;gap:2.4vh">
        <svg class="d13-svg b" viewBox="0 0 560 230" aria-label="Two states. A: the ball falls straight down onto the paddle, which stays. B: the ball comes in at an angle and the paddle moves right">
          ${panel(10, 'A', [125, 70, 125, 140], 80, false)}
          ${panel(300, 'B', [208, 70, 190, 140], 110, true)}
        </svg>
        <div class="b">
          <div class="d13-ask">Which (state, action) pair has the higher Q-value?</div>
          <div class="d13-words d13-small" style="margin-top:1vh">It can be very hard for people to estimate Q-values</div>
        </div>
        <div class="d13-callout b">What is an example of this in perception?</div>
      </div>
    </div>
  </div>
  ${cite('Redrawn from MIT 6.S191, Introduction to Deep Learning, lecture on deep reinforcement learning · Atari Breakout')}
`);
}
