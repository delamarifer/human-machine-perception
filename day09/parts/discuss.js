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

/* Four theories, one slide each, each with an animated example (examples chosen by Shreya, 2026-11-12).
   The title is the question (Shreya's claims, posed as questions at her request); the class votes with hands;
   the drawing plays the example; the last click names the theory, with Shreya's sentence for it. Not a progression:
   each slide stands on its own. Replaces the "Where do you stand?" list and the theory jigsaw. */
const W = 'https://en.wikipedia.org/wiki/';
const d8lTheory = (name, claim, href, step) => `<div class="d8l-theory b" data-step="${step}"><b>${name}</b><span>${claim}</span><a href="${href}" target="_blank" rel="noopener">Start here</a></div>`;
const d8lHands = `<div class="d8l-hands b" data-step="1">Hands up: yes · no · not sure</div>`;

/* 1. Predictive processing: the duck-rabbit. Image shared by Shreya (Fliegende Blätter, 1892, public domain).
   Positions from the image's pixels (640 x 563, drawn at x 300, y 40, scale 0.625): bill tip (66, 240) -> (341, 190);
   bill middle (170, 250) -> (406, 196); eye (393, 203) -> (546, 167); right edge of the head (526, 235) -> (629, 187). */
st(`
  <h1 class="t">Does your brain construct what you see based on what it expects to see?</h1>
  <div class="d8l-col d8l-th">
    ${d8lHands}
    <svg class="d8l-svg d8l-th-svg d8l-pp" viewBox="0 0 1000 440" role="img" aria-label="The duck-rabbit: the same drawing read as a duck looking left or a rabbit looking right">
      <g class="b" data-step="2">
        <image href="assets/duck-rabbit.png" x="300" y="40" width="400" height="352"/>
        <text x="500" y="428" class="d8l-s d8l-c d8l-ask">What do you see?</text>
      </g>
      <g class="b d8l-duck" data-step="3">
        <ellipse cx="400" cy="196" rx="72" ry="40" class="d8l-ring"/>
        <path d="M250 150 L330 180" class="d8l-arrow"/>
        <text x="245" y="128" class="d8l-q2" text-anchor="end">A duck</text>
        <text x="245" y="164" class="d8l-s" text-anchor="end">looking left</text>
        <text x="400" y="268" class="d8l-s d8l-c d8l-halo">its bill</text>
      </g>
      <g class="b d8l-rab" data-step="4">
        <ellipse cx="400" cy="196" rx="72" ry="40" class="d8l-ring"/>
        <path d="M250 150 L330 180" class="d8l-arrow"/>
        <text x="245" y="128" class="d8l-q2" text-anchor="end">A rabbit</text>
        <text x="245" y="164" class="d8l-s" text-anchor="end">looking right</text>
        <text x="400" y="268" class="d8l-s d8l-c d8l-halo">its ears</text>
        <path d="M750 150 L640 182" class="d8l-arrow"/>
        <text x="760" y="146" class="d8l-s">its nose</text>
      </g>
      <text x="500" y="428" class="d8l-t d8l-c d8l-bg b" data-step="5">The lines never change. Your guess does.</text>
    </svg>
    ${d8lTheory('Predictive processing', 'Your brain constructs what you see based on what it expects to see.', W + 'Predictive_coding', 6)}
  </div>
  ${cite('Duck-rabbit: Fliegende Blätter (1892), public domain · Jastrow, Popular Science Monthly (1899) · Rao and Ballard, Nature Neuroscience (1999)')}
`);

/* 2. Global workspace theory: the invisible gorilla, redrawn as an animation (Simons and Chabris 1999).
   Two teams pass a ball; while the class counts the white team's passes, a gorilla walks through. */
const d8lPl = (x, y, team) => `<g transform="translate(${x} ${y})" class="d8l-p${team}"><circle cx="0" cy="-30" r="13"/><path d="M-22 18 Q-22 -6 0 -8 Q22 -6 22 18 Z"/></g>`;
const d8lGorilla = `<g class="d8l-gor-fig"><circle cx="0" cy="-70" r="20"/><ellipse cx="0" cy="-16" rx="34" ry="42"/><path d="M-30 -40 Q-62 -10 -52 30 M30 -40 Q62 -10 52 30" class="d8l-arm"/><path d="M-16 20 L-20 62 M16 20 L20 62" class="d8l-arm"/></g>`;
st(`
  <h1 class="t">Can you process information without being consciously aware of it?</h1>
  <div class="d8l-col d8l-th">
    ${d8lHands}
    <svg class="d8l-svg d8l-th-svg d8l-gw" viewBox="0 0 1000 440" role="img" aria-label="Two teams pass balls; while you count the white team's passes, a gorilla walks through the middle">
      <g class="b" data-step="2">
        <rect x="130" y="20" width="740" height="370" rx="12" class="d8l-court"/>
        ${d8lPl(300, 150, 'w')}${d8lPl(520, 330, 'w')}${d8lPl(730, 140, 'w')}
        ${d8lPl(420, 110, 'b')}${d8lPl(660, 300, 'b')}${d8lPl(260, 320, 'b')}
        <circle r="9" class="d8l-ball d8l-ball-w"/>
        <circle r="9" class="d8l-ball d8l-ball-b"/>
        <g class="d8l-gor-walk">${d8lGorilla}</g>
        <text x="500" y="428" class="d8l-t d8l-c d8l-ask">Count the passes between the players in white</text>
      </g>
      <g class="b d8l-gor-reveal" data-step="3">
        <rect x="132" y="22" width="736" height="366" rx="11" class="d8l-veil"/>
        <g transform="translate(520 225)">${d8lGorilla}</g>
        <circle cx="520" cy="205" r="96" class="d8l-dash"/>
        <text x="500" y="76" class="d8l-q2 d8l-c d8l-halo">Did you see the gorilla?</text>
      </g>
      <text x="500" y="428" class="d8l-t d8l-c d8l-bg b" data-step="4">In the original video, about half of viewers missed it.</text>
    </svg>
    ${d8lTheory('Global workspace theory', 'You can process information without being consciously aware of it. <a href="https://www.youtube.com/watch?v=vJG698U2Mvo" target="_blank" rel="noopener">The original video</a>', W + 'Global_workspace_theory', 5)}
  </div>
  ${cite('Simons and Chabris, Gorillas in our midst, Perception (1999) · Baars, A Cognitive Theory of Consciousness (1988)')}
`);

/* 3. Integrated information theory: the split-brain experiments (Gazzaniga, Bogen and Sperry 1962).
   Viewed from behind the head: the left half is on the left. A word shown on the left reaches only the right half,
   which cannot speak but controls the left hand. */
st(`
  <h1 class="t">Can a system behave intelligently without being conscious?</h1>
  <div class="d8l-col d8l-th">
    ${d8lHands}
    <svg class="d8l-svg d8l-th-svg d8l-sb" viewBox="0 0 1000 440" role="img" aria-label="Split brain: with the bridge between the two halves cut, a word seen on the left reaches only the right half; the person says they saw nothing, yet the left hand picks out the object">
      <g class="b" data-step="2">
        <rect x="300" y="14" width="400" height="64" rx="8" class="d8l-ln"/>
        <circle cx="500" cy="46" r="5" class="d8l-dot"/>
        <rect x="470" y="196" width="60" height="64" rx="10" class="d8l-bridge"/>
        <ellipse cx="385" cy="230" rx="100" ry="118" class="d8l-hemi"/>
        <ellipse cx="615" cy="230" rx="100" ry="118" class="d8l-hemi"/>
        <text x="385" y="236" class="d8l-bt d8l-c">left half</text>
        <text x="385" y="260" class="d8l-s d8l-c">speaks</text>
        <text x="615" y="236" class="d8l-bt d8l-c">right half</text>
        <text x="615" y="262" class="d8l-s d8l-c">moves the</text>
        <text x="615" y="290" class="d8l-s d8l-c">left hand</text>
        <text x="500" y="378" class="d8l-s d8l-c d8l-ask">the bridge between them</text>
      </g>
      <g class="b d8l-cut" data-step="3">
        <rect x="486" y="190" width="28" height="76" class="d8l-gap"/>
        <path d="M500 150 V310" class="d8l-dash"/>
        <text x="845" y="300" class="d8l-s d8l-c">bridge cut by surgery,</text>
        <text x="845" y="330" class="d8l-s d8l-c">to treat epilepsy</text>
      </g>
      <g class="b" data-step="4">
        <text x="390" y="58" class="d8l-q2 d8l-c d8l-flash">KEY</text>
        <path d="M390 80 Q520 110 590 140" class="d8l-arrow"/>
      </g>
      <g class="b" data-step="5">
        <rect x="60" y="150" width="210" height="60" rx="12" class="d8l-bub"/>
        <path d="M270 180 L304 196" class="d8l-ln"/>
        <text x="165" y="188" class="d8l-bt d8l-c">“I saw nothing.”</text>
      </g>
      <g class="b" data-step="6">
        <path d="M640 330 Q560 420 300 410" class="d8l-arrow"/>
        <g transform="translate(240 400)" class="d8l-key"><circle cx="0" cy="0" r="14"/><path d="M14 0 H58 M44 0 V12 M54 0 V10"/></g>
        <text x="120" y="360" class="d8l-bt d8l-c">yet the left hand</text>
        <text x="120" y="384" class="d8l-bt d8l-c">picks out the key</text>
      </g>
      <text x="830" y="160" class="d8l-q2 d8l-c b" data-step="7">One head,</text>
      <text x="830" y="194" class="d8l-q2 d8l-c b" data-step="7">two minds?</text>
    </svg>
    ${d8lTheory('Integrated information theory', 'Not all information-processing systems are conscious, even if they behave intelligently.', W + 'Integrated_information_theory', 8)}
  </div>
  ${cite('Gazzaniga, Bogen and Sperry, PNAS (1962) · Tononi, BMC Neuroscience (2004)')}
`);

/* 4. Embodied cognition: the rubber hand illusion (Botvinick and Cohen 1998). Seen from behind the person.
   The real left hand is hidden behind a screen; a rubber hand lies in view; both are brushed at the same time. */
const d8lHand = (x, y, cls) => `<g transform="translate(${x} ${y})" class="${cls}"><rect x="-32" y="-30" width="64" height="72" rx="18"/><rect x="-30" y="-84" width="13" height="58" rx="6"/><rect x="-14" y="-94" width="13" height="68" rx="6"/><rect x="2" y="-90" width="13" height="64" rx="6"/><rect x="18" y="-74" width="12" height="50" rx="6"/><rect x="28" y="-8" width="40" height="13" rx="6" transform="rotate(-30 28 -2)"/></g>`;
const d8lBrush = (x, cls) => `<g class="${cls}"><g transform="translate(${x} 0)"><rect x="-10" y="-60" width="20" height="18" rx="3" class="d8l-bristle"/><path d="M0 -60 L0 -118" class="d8l-handle"/></g></g>`;
st(`
  <h1 class="t">Can you fully understand the world without interacting with it through your body?</h1>
  <div class="d8l-col d8l-th">
    ${d8lHands}
    <svg class="d8l-svg d8l-th-svg d8l-rh" viewBox="0 0 1000 440" role="img" aria-label="Rubber hand illusion: the real hand is hidden behind a screen, a rubber hand lies in view, both are brushed together, and the person comes to feel the rubber hand as their own">
      <g class="b" data-step="2">
        <rect x="120" y="20" width="560" height="300" rx="12" class="d8l-court"/>
        <rect x="372" y="34" width="16" height="276" rx="4" class="d8l-screen"/>
        ${d8lHand(260, 190, 'd8l-hand')}
        ${d8lHand(540, 190, 'd8l-hand d8l-rubber')}
        <path d="M500 250 L470 340 L640 340 L586 250 Z" class="d8l-cloth"/>
        ${d8lFig(555, 392, 1.1)}
        <text x="250" y="300" class="d8l-s d8l-c">real hand, hidden</text>
        <text x="380" y="436" class="d8l-s d8l-c">a screen between</text>
        <text x="850" y="70" class="d8l-bt d8l-c">rubber hand,</text>
        <text x="850" y="100" class="d8l-bt d8l-c">in plain view</text>
        <path d="M740 90 L600 140" class="d8l-arrow"/>
      </g>
      <g class="b" data-step="3">
        ${d8lBrush(260, 'd8l-brush')}${d8lBrush(540, 'd8l-brush')}
        <text x="850" y="170" class="d8l-bt d8l-c">both brushed at</text>
        <text x="850" y="200" class="d8l-bt d8l-c">the same time</text>
      </g>
      <g class="b" data-step="4">
        <rect x="700" y="340" width="250" height="56" rx="12" class="d8l-bub"/>
        <path d="M700 368 L612 372" class="d8l-ln"/>
        <text x="825" y="376" class="d8l-bt d8l-c">“That’s my hand.”</text>
      </g>
      <g class="b d8l-threat" data-step="5">
        <g class="d8l-hammer"><rect x="510" y="20" width="60" height="30" rx="5"/><path d="M570 35 L660 35"/></g>
        <text x="500" y="410" class="d8l-q2 d8l-flinch" text-anchor="end">!</text>
      </g>
      <text x="850" y="260" class="d8l-bt d8l-c b" data-step="6">Many people flinch,</text>
      <text x="850" y="290" class="d8l-bt d8l-c b" data-step="6">as if it were their own</text>
    </svg>
    ${d8lTheory('Embodied cognition', 'You cannot fully understand the world without interacting with it through your body.', W + 'Embodied_cognition', 7)}
  </div>
  ${cite('Botvinick and Cohen, Nature (1998) · Armel and Ramachandran, Proc. R. Soc. B (2003) · Varela, Thompson and Rosch, The Embodied Mind (1991)')}
`);

/* Close the four theories with one question for the room. */
st(`
  <h1 class="t">Does today’s AI have any of this?</h1>
  <div class="d8l-col">
    <ul class="d8l-list">
      <li class="b">Does it see what it expects to see?</li>
      <li class="b">Can it process information without being aware of it?</li>
      <li class="b">Is its information integrated, one whole?</li>
      <li class="b">Can it understand the world without a body?</li>
    </ul>
    <div class="d8l-vote b">Hands up: yes · no · not sure</div>
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
