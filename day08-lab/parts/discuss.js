/* PART: discuss (Day 8 lab, owner: Shreya). Plan from Shreya (2026-11-12): start from yesterday's Turing test question, move to
   open questions and theories about humans and the mind; students submit questions they want to explore in a Google Form,
   to ground a future discussion. Wording is (draft). The first draft (course-linked prompts) is in _removed.js. */
{
section('Discussion');

/* The question form, from Shreya (2026-11-12). assets/form-qr.svg encodes the same link. */
const D8L_FORM = 'https://docs.google.com/forms/d/e/1FAIpQLSe3j32apg2mpBgAe5UfRdtMP3Q2J1IJ1mCPcCJ0_NfJ8dJTCw/viewform';

st(`
  <h1 class="t">From the Turing test to the mind</h1>
  <div class="d8l-col">
    <ul class="d8l-list">
      <li class="b">Yesterday: can a machine pass as human?</li>
      <li class="b">Turing judged only behavior: if you cannot tell them apart, call it thinking</li>
      <li class="b">Searle’s Chinese room: following rules is not the same as understanding</li>
    </ul>
    <div class="d8l-q b">So what does a human mind have? What do we actually know about it?</div>
  </div>
  ${cite('Turing, Computing Machinery and Intelligence, Mind (1950) · Searle, Minds, Brains, and Programs, Behavioral and Brain Sciences (1980)')}
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

/* Interactive: each project group reads up on one theory for five minutes, then reports to the room in one minute. */
const W = 'https://en.wikipedia.org/wiki/';
st(`
  <h1 class="t">Theory jigsaw · 8 minutes</h1>
  <div class="d8l-col">
    <div class="d8l-theories">
      <div class="d8l-card b" data-step="1"><small>Groups 1 and 5</small><b>Predictive processing</b><a href="${W}Predictive_coding" target="_blank" rel="noopener">Start here</a></div>
      <div class="d8l-card b" data-step="1"><small>Groups 2 and 6</small><b>Global workspace theory</b><a href="${W}Global_workspace_theory" target="_blank" rel="noopener">Start here</a></div>
      <div class="d8l-card b" data-step="1"><small>Group 3</small><b>Integrated information theory</b><a href="${W}Integrated_information_theory" target="_blank" rel="noopener">Start here</a></div>
      <div class="d8l-card b" data-step="1"><small>Group 4</small><b>Embodied cognition</b><a href="${W}Embodied_cognition" target="_blank" rel="noopener">Start here</a></div>
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
