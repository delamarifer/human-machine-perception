/* PART: intro (Day 11, owner: Shreya). Built 2026-11-15 from Shreya's Google Slides "Day 11 - Embodied Intelligence",
   slides 1-5. Her comments applied: slide 1 "dont include this in the slide" (the Panopto link is gone); slide 4 "pull out
   insights from this form" (the Day 10 Reflection form, 25 answers, counted from the sheet on 2026-11-15; quotes are short,
   word for word, and anonymous). Slide 5 asked for "a few different definitions / modern theories of what experience
   means" from philosophy, computer science, neuroscience: four views, each with its source. No speaker notes. */
{
section('Start');

st(`
  <div class="center" style="margin:auto">
    <div class="statement" style="font-weight:700;font-size:clamp(2.2rem,4.2vw,3.8rem)">Embodied Intelligence</div>
    <div class="label" style="margin-top:2.2vh">Day 11</div>
  </div>
`);

/* Google slide 2, her wording */
st(`
  <h1 class="t">What is an embodied agent?</h1>
  <div class="d11-col">
    <div class="d11-def">
      <div class="d11-q b">Is “robot” interchangeable?</div>
      <div class="d11-ans b">An agent that can <b>make decisions</b> and <b>take actions</b></div>
      <div class="d11-ans b">It doesn’t have to be a physical robot</div>
    </div>
  </div>
`);

/* Google slide 3 */
st(`
  <h1 class="t">Discussion question from last week</h1>
  <div class="d11-col">
    <div class="popquote b">“An AI does not need to experience the world to understand it”</div>
  </div>
`);

/* Google slide 4 (no title there): the poll. Counts from the Day 10 Reflection sheet, 25 answers:
   strongly disagree 3, disagree 14, neutral 2, agree 6, strongly agree 0 (matches her pie chart: 12 / 56 / 8 / 24 %). */
const D11_POLL = [['Strongly disagree', 3], ['Disagree', 14], ['Neutral', 2], ['Agree', 6], ['Strongly agree', 0]];
const D11_N = D11_POLL.reduce((s, [, n]) => s + n, 0), D11_MAX = Math.max(...D11_POLL.map(r => r[1]));
st(`
  <h1 class="t">What did you say?</h1>
  <div class="d11-col">
    <div class="d11-poll b" data-step="1">
      ${D11_POLL.map(([lab, n]) => `
        <div class="d11-plab">${lab}</div>
        <div class="d11-track"><div class="d11-bar" style="--w:${(100 * n / D11_MAX).toFixed(1)}%"></div></div>
        <div class="d11-n">${n} <small>${Math.round(100 * n / D11_N)}%</small></div>`).join('')}
    </div>
    <div class="d11-sum b" data-step="2"><b>17 of 25</b> disagreed: most of you think AI <b>does</b> need to experience the world</div>
  </div>
  ${cite('Day 10 reflection form, 25 answers')}
`);

/* Insights from the written answers. One theme per click; earlier ones fade (lib.js). */
st(`
  <h1 class="t">What did your answers say?</h1>
  <div class="d11-col">
    <div class="d11-themes">
      <div class="d11-theme b"><b>It depends on what “experience” means</b>
        <div class="d11-quote">“Firstly, what does it mean to experience the world?”<small>several of you started here</small></div></div>
      <div class="d11-theme b"><b>Is training on data a kind of experience?</b>
        <div class="d11-quote">“AI models do experience the world by watching human data.”</div></div>
      <div class="d11-theme b"><b>Understanding as making good decisions</b>
        <div class="d11-quote">“autopilots ‘understand’ the world enough to command airplanes.”</div></div>
      <div class="d11-theme b"><b>Same example, opposite answers: gravity</b>
        <div class="d11-pair">
          <div class="d11-quote">“an AI can understand how gravity works without physically falling”<small>agree</small></div>
          <div class="d11-quote">“knowing what gravity means is not enough to interact with the world”<small>disagree</small></div>
        </div></div>
      <div class="d11-theme b"><b>Feelings and consequences</b>
        <div class="d11-quote">“there is a limit to AI understanding if it hasn’t experienced it.”</div></div>
    </div>
  </div>
`);

/* Google slide 5: "What does it mean to experience". Four views (one per click), then her line "To know vs to feel",
   told with Jackson's Mary's room. Sources:
   Nagel, T. (1974). What is it like to be a bat? The Philosophical Review 83(4).
   Baars, B. (1988). A Cognitive Theory of Consciousness. Cambridge Univ. Press; Dehaene, S. (2014). Consciousness and the Brain.
   O'Regan, J. K. & Noe, A. (2001). A sensorimotor account of vision and visual consciousness. Behavioral and Brain Sciences 24(5).
   Harnad, S. (1990). The symbol grounding problem. Physica D 42 (the Chinese/Chinese dictionary example is his).
   Jackson, F. (1982). Epiphenomenal qualia. The Philosophical Quarterly 32(127). */
const D11_VIEWS = [
  ['Philosophy', 'There is something it is like to be you',
   'A bat senses the world by echolocation. We could learn every fact about it and still not know what that is like for the bat.',
   'Thomas Nagel, 1974'],
  ['Neuroscience', 'Information shared across the whole brain',
   'Most of what the brain does is unconscious. What we experience is what gets broadcast widely, so many brain systems can use it at once.',
   'Global workspace theory: Bernard Baars, 1988; Stanislas Dehaene'],
  ['Cognitive science', 'Seeing is something you do',
   'Experience is knowing how your senses change when you act: turn your head, and the view changes in a lawful way.',
   'Kevin O’Regan and Alva Noë, 2001'],
  ['Computer science', 'Symbols need to touch the world',
   'Linking words only to other words is like learning Chinese from a Chinese-only dictionary. Meaning needs grounding in perception and action.',
   'The symbol grounding problem: Stevan Harnad, 1990'],
];
st(`
  <h1 class="t">What does it mean to experience?</h1>
  <div class="d11-col">
    <div class="d11-views">
      ${D11_VIEWS.map(([field, idea, text, who]) => `
        <div class="d11-view b"><small>${field}</small><b>${idea}</b><span>${text}</span><i class="d11-who">${who}</i></div>`).join('')}
    </div>
    <div class="d11-know d11-all b"><b>To know vs to feel</b>
      <span>Mary knows every fact about color but has only ever seen black and white. When she first sees red, does she learn something new? (Frank Jackson, 1982)</span></div>
  </div>
`);
}
