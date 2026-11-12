/* PART: discuss (Day 9, owner: Shreya). Plan from Shreya (2026-11-12): start from the Turing test and the Chinese room (two builds), move to
   open questions and theories about humans and the mind; students submit questions they want to explore in a Google Form,
   to ground a future discussion. Wording is (draft). The first draft (course-linked prompts) is in _removed.js. */
{
section('Discussion');

/* The question form, from Shreya (2026-11-12). assets/form-qr.svg encodes the same link. */
const D8L_FORM = 'https://docs.google.com/forms/d/e/1FAIpQLSe3j32apg2mpBgAe5UfRdtMP3Q2J1IJ1mCPcCJ0_NfJ8dJTCw/viewform';

/* A person, drawn: head and shoulders, centered at (x, y). */
const d8lFig = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="-34" r="16" class="d8l-ln"/><path d="M-28 22 Q-28 -10 0 -12 Q28 -10 28 22 Z" class="d8l-ln"/></g>`;
const d8lBubble = (x, y, w, h, lines, cls = '', step = 1) => `<g class="${cls}" data-step="${step}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" class="d8l-bub"/>${lines.map((t, k) => `<text x="${x + 16}" y="${y + 30 + k * 26}" class="d8l-bt">${t}</text>`).join('')}</g>`;

/* A robot face, drawn, centered at (x, y). */
const d8lBot = (x, y) => `<g transform="translate(${x} ${y})" class="d8l-ln"><line x1="0" y1="-62" x2="0" y2="-46"/><circle cx="0" cy="-68" r="6"/><rect x="-34" y="-46" width="68" height="54" rx="10"/><circle cx="-13" cy="-22" r="7"/><circle cx="13" cy="-22" r="7"/><line x1="-12" y1="-4" x2="12" y2="-4"/><rect x="-24" y="8" width="48" height="12" rx="3"/><path d="M-44 40 Q-44 22 -26 22 L26 22 Q44 22 44 40"/></g>`;
/* A small chat bubble, the message that travels along the dashed lines. */
const d8lTok = (cls) => `<g class="${cls}"><rect x="-22" y="-16" width="44" height="30" rx="8" class="d8l-tokbox"/><circle cx="-10" cy="-1" r="3" class="d8l-dot"/><circle cx="0" cy="-1" r="3" class="d8l-dot"/><circle cx="10" cy="-1" r="3" class="d8l-dot"/></g>`;

/* The Turing test, redrawn after the diagram Shreya shared (2026-11-12): two hidden participants, a judge, text only. */
st(`
  <h1 class="t">The Turing test</h1>
  <div class="d8l-col">
    <svg class="d8l-svg d8l-turing" viewBox="0 0 1000 470" role="img" aria-label="The Turing test: a judge chats by text with two hidden participants, a human and a machine, and must say which is human">
      <g class="b" data-step="1">
        <rect x="400" y="300" width="200" height="140" rx="14" class="d8l-ln"/>
        ${d8lFig(500, 392, 1.1)}
        <rect x="455" y="398" width="90" height="34" rx="4" class="d8l-laptop"/>
        <text x="500" y="466" class="d8l-t d8l-c">Judge</text>
      </g>
      <g class="b" data-step="2">
        <rect x="120" y="30" width="220" height="150" rx="14" class="d8l-ln"/>
        <rect x="660" y="30" width="220" height="150" rx="14" class="d8l-ln"/>
        <text x="230" y="125" class="d8l-big d8l-c d8l-unknown">?</text>
        <text x="770" y="125" class="d8l-big d8l-c d8l-unknown">?</text>
        <path d="M230 180 V240 H470 V296" class="d8l-dash"/><path d="M770 180 V240 H530 V296" class="d8l-dash"/>
        <text x="500" y="110" class="d8l-s d8l-c">hidden participants</text>
        <text x="500" y="136" class="d8l-s d8l-c">text only: no voice, no faces</text>
      </g>
      <g class="b" data-step="3">${d8lTok('d8l-up-a')}${d8lTok('d8l-up-b')}</g>
      <g class="b" data-step="4">${d8lTok('d8l-down-a')}${d8lTok('d8l-down-b')}</g>
      <g class="b" data-step="5">
        <circle cx="626" cy="350" r="5" class="d8l-ln"/><circle cx="646" cy="334" r="8" class="d8l-ln"/>
        <rect x="664" y="282" width="270" height="76" rx="38" class="d8l-ln"/>
        <text x="799" y="327" class="d8l-t d8l-c">Which one is human?</text>
      </g>
      <g class="b d8l-reveal" data-step="6">
        ${d8lFig(230, 140, 1.3)}${d8lBot(770, 125)}
        <text x="230" y="20" class="d8l-t d8l-c">Human</text><text x="770" y="20" class="d8l-t d8l-c">Machine</text>
      </g>
      <g class="b" data-step="7">
        <rect x="30" y="286" width="340" height="168" rx="12" class="d8l-ln"/>
        <text x="54" y="326" class="d8l-t">✓ Can’t reliably tell</text><text x="88" y="356" class="d8l-s">→ the machine passes</text>
        <text x="54" y="404" class="d8l-t">✗ Can reliably tell</text><text x="88" y="434" class="d8l-s">→ the machine fails</text>
      </g>
    </svg>
    <div class="d8l-vote b" data-step="8">Is fooling a person the same as thinking?</div>
  </div>
  ${cite('Turing, Computing Machinery and Intelligence, Mind (1950) · diagram redrawn after an image Shreya shared (source: to add)')}
`);

/* The Chinese room (Searle 1980), redrawn after the cartoon Shreya shared (2026-11-12): a room with IN and OUT slots,
   a person inside with a rulebook, a Chinese speaker on each side. */
st(`
  <h1 class="t">Searle’s Chinese room</h1>
  <div class="d8l-col">
    <svg class="d8l-svg d8l-room" viewBox="0 0 1000 470" role="img" aria-label="Searle's Chinese room: a note in Chinese goes in through a slot, a person who knows no Chinese matches shapes in a rulebook, and a fluent answer comes out the other slot">
      <g class="b" data-step="1">
        <polygon points="300,70 700,70 700,330 300,330" class="d8l-back"/>
        <polygon points="240,30 760,30 700,70 300,70" class="d8l-wallp"/>
        <polygon points="240,30 300,70 300,330 240,400" class="d8l-wallp"/>
        <polygon points="760,30 700,70 700,330 760,400" class="d8l-wallp"/>
        <polygon points="300,330 700,330 760,400 240,400" class="d8l-floor"/>
        <rect x="244" y="132" width="44" height="28" rx="4" class="d8l-sign"/><text x="266" y="153" class="d8l-s d8l-c d8l-ink">IN</text>
        <ellipse cx="270" cy="200" rx="9" ry="20" class="d8l-slotp"/>
        <rect x="706" y="132" width="52" height="28" rx="4" class="d8l-sign"/><text x="732" y="153" class="d8l-s d8l-c d8l-ink">OUT</text>
        <ellipse cx="730" cy="200" rx="9" ry="20" class="d8l-slotp"/>
        <g class="d8l-ln"><line x1="610" y1="250" x2="600" y2="330"/><line x1="610" y1="250" x2="640" y2="330"/></g>
        <polygon points="540,170 610,160 680,170 680,250 610,240 540,250" class="d8l-bookp"/><line x1="610" y1="160" x2="610" y2="240" class="d8l-ln"/>
        <rect x="380" y="300" width="70" height="40" rx="3" class="d8l-bookp"/>
        <text x="392" y="328" class="d8l-tile">你</text><text x="420" y="328" class="d8l-tile">我</text>
        ${d8lFig(500, 300, 1.4)}
        <text x="500" y="428" class="d8l-s d8l-c">inside: a person who knows no Chinese</text>
      </g>
      <g class="b" data-step="2">
        ${d8lFig(120, 330, 1.3)}
        <text x="120" y="400" class="d8l-s d8l-c">asks in Chinese</text>
        <g class="d8l-note-in"><rect x="-44" y="-20" width="88" height="40" rx="5" class="d8l-notep"/><text x="0" y="8" class="d8l-zh d8l-c">你好吗？</text></g>
      </g>
      <g class="b" data-step="3">
        <text x="575" y="212" class="d8l-rule d8l-c">你好吗</text><text x="645" y="212" class="d8l-rule d8l-c">我很好</text>
        <text x="510" y="112" class="d8l-s d8l-c">rulebook: these shapes → those shapes</text>
      </g>
      <g class="b" data-step="4">
        ${d8lFig(880, 330, 1.3)}
        <text x="880" y="400" class="d8l-s d8l-c">reads the reply</text>
        <g class="d8l-note-out"><rect x="-44" y="-20" width="88" height="40" rx="5" class="d8l-notep"/><text x="0" y="8" class="d8l-zh d8l-c">我很好。</text></g>
      </g>
      <g class="b" data-step="5">
        <rect x="790" y="140" width="190" height="44" rx="22" class="d8l-bub"/>
        <text x="885" y="169" class="d8l-bt d8l-c">It understands!</text>
      </g>
      <text x="500" y="464" class="d8l-t d8l-c b" data-step="6">Inside: nobody understands a word.</text>
    </svg>
    <div class="d8l-vote b" data-step="7">Is a chatbot the person, the rulebook, or the whole room?</div>
  </div>
  ${cite('Searle, Minds, Brains, and Programs, Behavioral and Brain Sciences (1980) · drawing after a cartoon Shreya shared (source: to add)')}
`);

st(`
  <h1 class="t">Open questions about the mind</h1>
  <div class="d8l-col">
    <ul class="d8l-list">
      <li class="b">Why does seeing feel like anything at all?<span class="d8l-sub">the hard problem of consciousness</span></li>
      <li class="b">How does the brain bind color, shape and motion into one object?<span class="d8l-sub">the binding problem</span></li>
      <li class="b">Do we see the world, or the brain’s prediction of it?</li>
      <li class="b">How much of seeing is learned, and how much is built in?</li>
    </ul>
  </div>
  ${cite('Chalmers, Facing up to the problem of consciousness, J. Consciousness Studies (1995) · Treisman, The binding problem, Curr. Opin. Neurobiol. (1996)')}
`);

/* Interactive: the class votes on each claim with hands, then the next click names the theory behind it. */
const D8L_CLAIMS = [
  ['The brain is always guessing what it will see next, and learns from its mistakes.', 'Predictive processing'],
  ['You are only aware of what gets shared with the whole brain at once.', 'Global workspace theory'],
  ['A system can act intelligently without experiencing anything at all.', 'Integrated information theory'],
  ['You cannot understand the world without a body that acts in it.', 'Embodied cognition'],
];
st(`
  <h1 class="t">Where do you stand?</h1>
  <div class="d8l-col">
    <div class="d8l-vote b" data-step="1">Hands up: agree · disagree · not sure</div>
    <ul class="d8l-claims">
      ${D8L_CLAIMS.map(([c, t], k) => `<li><span class="b" data-step="${2 * k + 2}">${k + 1}. ${c}</span><em class="b" data-step="${2 * k + 3}">${t}</em></li>`).join('')}
    </ul>
  </div>
  ${cite('Rao and Ballard, Nature Neuroscience (1999) · Baars, A Cognitive Theory of Consciousness (1988) · Tononi, BMC Neuroscience (2004) · Varela, Thompson and Rosch, The Embodied Mind (1991)')}
`);

/* Interactive: each table reads up on one theory for five minutes, then reports to the room in one minute.
   Examples per theory are Shreya's (2026-11-12): duck-rabbit image (she shared it; from Fliegende Blätter, 1892, public domain),
   the invisible gorilla (Simons and Chabris 1999; video on Daniel Simons' YouTube channel), split-brain, rubber hand illusion. */
const W = 'https://en.wikipedia.org/wiki/';
st(`
  <h1 class="t">Theory jigsaw · 8 minutes</h1>
  <div class="d8l-col">
    <div class="d8l-theories">
      <div class="d8l-card d8l-ex-card b" data-step="1"><div><b>Predictive processing</b><span>Example: duck or rabbit?</span><a href="${W}Predictive_coding" target="_blank" rel="noopener">Start here</a></div><img class="d8l-ex-img" src="assets/duck-rabbit.png" alt="The duck-rabbit drawing: read as a duck facing left or a rabbit facing right"></div>
      <div class="d8l-card b" data-step="1"><b>Global workspace theory</b><span>Example: <a href="https://www.youtube.com/watch?v=vJG698U2Mvo" target="_blank" rel="noopener">The invisible gorilla</a> (video)</span><a href="${W}Global_workspace_theory" target="_blank" rel="noopener">Start here</a></div>
      <div class="d8l-card b" data-step="1"><b>Integrated information theory</b><span>Example: <a href="${W}Split-brain" target="_blank" rel="noopener">Split-brain experiments</a></span><a href="${W}Integrated_information_theory" target="_blank" rel="noopener">Start here</a></div>
      <div class="d8l-card b" data-step="1"><b>Embodied cognition</b><span>Example: <a href="${W}Rubber_hand_illusion" target="_blank" rel="noopener">The rubber hand illusion</a></span><a href="${W}Embodied_cognition" target="_blank" rel="noopener">Start here</a></div>
    </div>
    <ol class="d8l-list d8l-tasks">
      <li class="b" data-step="2">What does it claim, in one sentence?</li>
      <li class="b" data-step="3">What evidence would support it?</li>
      <li class="b" data-step="4">By this theory, what does today’s AI already have, and what is it missing?</li>
    </ol>
    <div class="d8l-vote b" data-step="5">Report back to the room in one minute</div>
  </div>
`);

st(`
  <h1 class="t">Your questions</h1>
  <div class="d8l-col">
    <div class="d8l-q b">What do you want to explore about minds and machines?</div>
    <div class="d8l-form">
      <ul class="d8l-list">
        <li class="b">Submit one to three questions</li>
        <li class="b">We will build a future discussion around them</li>
        <li class="b"><a href="${D8L_FORM}" target="_blank" rel="noopener">Open the form</a>, or scan the code</li>
      </ul>
      <img class="b" src="assets/form-qr.svg" alt="QR code that opens the question form">
    </div>
  </div>
`);
}
