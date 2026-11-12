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

/* The imitation game (Turing 1950). The sonnet exchange is quoted from the paper. */
st(`
  <h1 class="t">The Turing test</h1>
  <div class="d8l-col">
    <svg class="d8l-svg" viewBox="0 0 1000 430" role="img" aria-label="Turing's imitation game: an interrogator types questions to two hidden players, a person and a machine, and must say which is which">
      <g class="b" data-step="1">
        ${d8lFig(110, 250, 1.3)}
        <text x="110" y="315" class="d8l-t d8l-c">Interrogator</text>
        <text x="110" y="342" class="d8l-s d8l-c">types questions, reads answers</text>
        <line x1="520" y1="30" x2="520" y2="400" class="d8l-wall"/>
        <text x="520" y="425" class="d8l-s d8l-c">a wall: text only, no voice, no faces</text>
        <rect x="640" y="40" width="300" height="160" rx="14" class="d8l-ln"/>
        <rect x="640" y="230" width="300" height="160" rx="14" class="d8l-ln"/>
        <text x="670" y="76" class="d8l-t">A</text><text x="670" y="266" class="d8l-t">B</text>
        ${d8lFig(790, 140)}${d8lFig(790, 330)}
      </g>
      ${d8lBubble(180, 40, 310, 64, ['“Please write me a sonnet on', 'the subject of the Forth Bridge.”'], 'b d8l-fly-r', 2)}
      ${d8lBubble(180, 130, 310, 64, ['“Count me out on this one.', 'I never could write poetry.”'], 'b d8l-fly-l', 3)}
      <text x="120" y="388" class="d8l-q2 d8l-c b" data-step="4">Which one is</text>
      <text x="120" y="418" class="d8l-q2 d8l-c b" data-step="4">the machine?</text>
      <g class="b" data-step="5">
        <rect x="830" y="56" width="98" height="34" rx="8" class="d8l-tag"/><text x="879" y="80" class="d8l-s d8l-c d8l-inv">machine</text>
        <rect x="830" y="246" width="98" height="34" rx="8" class="d8l-tag"/><text x="879" y="270" class="d8l-s d8l-c d8l-inv">person</text>
      </g>
    </svg>
    <div class="d8l-q b" data-step="6">If you cannot tell them apart, Turing says: call it thinking.</div>
    <div class="d8l-vote b" data-step="7">Is fooling a person the same as thinking?</div>
  </div>
  ${cite('Turing, Computing Machinery and Intelligence, Mind (1950). The question and the answer are from the paper.')}
`);

/* The Chinese room (Searle 1980), built one step at a time. */
st(`
  <h1 class="t">Searle’s Chinese room</h1>
  <div class="d8l-col">
    <svg class="d8l-svg" viewBox="0 0 1000 430" role="img" aria-label="Searle's Chinese room: notes in Chinese go in, a person who knows no Chinese follows a rulebook, and fluent answers come out">
      <g class="b" data-step="1">
        <rect x="330" y="40" width="340" height="320" rx="16" class="d8l-wall2"/>
        ${d8lFig(450, 250, 1.3)}
        <text x="500" y="345" class="d8l-s d8l-c">inside: a person who knows no Chinese</text>
        <line x1="330" y1="150" x2="330" y2="190" class="d8l-slot"/><line x1="670" y1="150" x2="670" y2="190" class="d8l-slot"/>
      </g>
      <g class="b d8l-fly-r" data-step="2">
        <rect x="70" y="135" width="190" height="70" rx="8" class="d8l-bub"/>
        <text x="165" y="170" class="d8l-zh d8l-c">你好吗？</text>
        <text x="165" y="195" class="d8l-s d8l-c">“How are you?”</text>
        <text x="165" y="235" class="d8l-s d8l-c">a question comes in</text>
      </g>
      <g class="b" data-step="3">
        <rect x="520" y="185" width="110" height="80" rx="6" class="d8l-book"/>
        <line x1="575" y1="185" x2="575" y2="265" class="d8l-ln"/>
        <text x="575" y="290" class="d8l-s d8l-c">rulebook, in English</text>
        <text x="500" y="85" class="d8l-s d8l-c">“when you see these shapes,</text>
        <text x="500" y="110" class="d8l-s d8l-c">send back those shapes”</text>
      </g>
      <g class="b d8l-fly-r" data-step="4">
        <rect x="740" y="135" width="210" height="70" rx="8" class="d8l-bub"/>
        <text x="845" y="170" class="d8l-zh d8l-c">我很好，谢谢。</text>
        <text x="845" y="195" class="d8l-s d8l-c">“I am fine, thanks.”</text>
        <text x="845" y="235" class="d8l-s d8l-c">a fluent answer goes out</text>
      </g>
      <text x="845" y="290" class="d8l-t d8l-c b" data-step="5">Outside: it understands!</text>
      <text x="500" y="400" class="d8l-t d8l-c b" data-step="6">Inside: nobody understands a word.</text>
    </svg>
    <div class="d8l-q b" data-step="7">Following the right rules is not the same as understanding.</div>
    <div class="d8l-vote b" data-step="8">Is a chatbot the person, the rulebook, or the whole room?</div>
  </div>
  ${cite('Searle, Minds, Brains, and Programs, Behavioral and Brain Sciences (1980)')}
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

/* Interactive: each table reads up on one theory for five minutes, then reports to the room in one minute. */
const W = 'https://en.wikipedia.org/wiki/';
st(`
  <h1 class="t">Theory jigsaw · 8 minutes</h1>
  <div class="d8l-col">
    <div class="d8l-theories">
      <div class="d8l-card b" data-step="1"><b>Predictive processing</b><a href="${W}Predictive_coding" target="_blank" rel="noopener">Start here</a></div>
      <div class="d8l-card b" data-step="1"><b>Global workspace theory</b><a href="${W}Global_workspace_theory" target="_blank" rel="noopener">Start here</a></div>
      <div class="d8l-card b" data-step="1"><b>Integrated information theory</b><a href="${W}Integrated_information_theory" target="_blank" rel="noopener">Start here</a></div>
      <div class="d8l-card b" data-step="1"><b>Embodied cognition</b><a href="${W}Embodied_cognition" target="_blank" rel="noopener">Start here</a></div>
    </div>
    <ol class="d8l-list d8l-tasks">
      <li class="b" data-step="2">What does it claim, in one sentence?</li>
      <li class="b" data-step="3">What evidence would support it?</li>
      <li class="b" data-step="4">Could a GAN, a chatbot or a robot have a mind under it? Report back in one minute.</li>
    </ol>
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
