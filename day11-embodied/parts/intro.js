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

/* Google slide 2, her wording, reworked 2026-11-16 (Shreya: "maybe we can rework"). Her three lines kept word for word;
   the drawn loop (senses, decides, acts) and the closing line are drafts. */
st(`
  <h1 class="t">What is an embodied agent?</h1>
  <div class="d11-col">
    <div class="d11-split">
      <svg class="d11-svg" viewBox="0 0 560 400" role="img" aria-label="A loop: the agent senses the world, decides, and acts on the world, which changes">
        <defs><marker id="d11-ah1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#0f172a"/></marker></defs>
        <g class="b" data-step="2"><rect x="180" y="30" width="200" height="90" rx="14" fill="#fff" stroke="#0f172a" stroke-width="3"/>
          <text x="280" y="70" text-anchor="middle" font-size="28" font-weight="700">Agent</text>
          <text x="280" y="100" text-anchor="middle" font-size="19" fill="#64748b">makes decisions</text></g>
        <g class="b" data-step="2"><rect x="180" y="280" width="200" height="90" rx="14" fill="#fff" stroke="#0f172a" stroke-width="3"/>
          <text x="280" y="320" text-anchor="middle" font-size="28" font-weight="700">World</text>
          <text x="280" y="350" text-anchor="middle" font-size="19" fill="#64748b">changes</text></g>
        <g class="b" data-step="2"><path d="M380 75 C 480 75, 480 325, 388 325" fill="none" stroke="#0f172a" stroke-width="3" marker-end="url(#d11-ah1)"/>
          <text x="478" y="208" font-size="24" font-weight="600">acts</text></g>
        <g class="b" data-step="3"><path d="M180 325 C 80 325, 80 75, 172 75" fill="none" stroke="#0f172a" stroke-width="3" marker-end="url(#d11-ah1)"/>
          <text x="10" y="208" font-size="24" font-weight="600">senses</text></g>
      </svg>
      <div class="d11-side">
        <div class="d11-q d11-def-q b" data-step="1">Is “robot” interchangeable?</div>
        <div class="d11-step b" data-step="2">An agent that can <b>make decisions</b> and <b>take actions</b></div>
        <div class="d11-step b" data-step="3">Its actions change what it senses next</div>
        <div class="d11-step b" data-step="4">It doesn’t have to be a physical robot</div>
        <div class="d11-callout b" data-step="5">A robot is one kind of embodied agent</div>
      </div>
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
/* Small drawings for the four views (made for this deck; Shreya asked for a visual on this slide). */
const D11_VIEW_IC = {
  bat: `<svg viewBox="0 0 100 90" aria-hidden="true"><path d="M50 40 C44 30 30 24 12 30 C20 34 22 40 20 46 C28 42 34 44 38 50 C42 46 46 46 50 52 C54 46 58 46 62 50 C66 44 72 42 80 46 C78 40 80 34 88 30 C70 24 56 30 50 40 Z" fill="#0f172a"/><path d="M46 36 l-2 -6 l5 4 M54 36 l2 -6 l-5 4" stroke="#0f172a" stroke-width="2.5" fill="none"/><path d="M30 66 q20 10 40 0 M22 74 q28 14 56 0 M14 82 q36 16 72 0" stroke="#0f172a" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>`,
  broadcast: `<svg viewBox="0 0 100 90" aria-hidden="true"><circle cx="50" cy="45" r="13" fill="#0f172a"/>${[0,60,120,180,240,300].map(a => { const r = a * Math.PI / 180, x = 50 + 36 * Math.cos(r), y = 45 + 34 * Math.sin(r), x1 = 50 + 17 * Math.cos(r), y1 = 45 + 17 * Math.sin(r), x2 = 50 + 27 * Math.cos(r), y2 = 45 + 26 * Math.sin(r); return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#0f172a" stroke-width="3" stroke-linecap="round"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7" fill="#fff" stroke="#0f172a" stroke-width="3"/>`; }).join('')}</svg>`,
  look: `<svg viewBox="0 0 100 90" aria-hidden="true"><rect x="8" y="10" width="44" height="34" rx="4" fill="none" stroke="#94a3b8" stroke-width="3"/><rect x="48" y="16" width="44" height="34" rx="4" fill="none" stroke="#0f172a" stroke-width="3"/><path d="M26 72 Q50 56 74 72 Q50 88 26 72 Z" fill="none" stroke="#0f172a" stroke-width="3"/><circle cx="54" cy="72" r="6" fill="#0f172a"/><path d="M30 56 Q50 46 68 54" fill="none" stroke="#0f172a" stroke-width="3" stroke-linecap="round"/><path d="M68 54 l-8 -4 M68 54 l-5 7" stroke="#0f172a" stroke-width="3" stroke-linecap="round"/></svg>`,
  dict: `<svg viewBox="0 0 100 90" aria-hidden="true"><path d="M14 18 h30 q6 0 6 6 v52 q0 -5 -6 -5 h-30 Z M86 18 h-30 q-6 0 -6 6 v52 q0 -5 6 -5 h30 Z" fill="#fff" stroke="#0f172a" stroke-width="3"/><text x="31" y="52" text-anchor="middle" font-size="22">字</text><text x="69" y="52" text-anchor="middle" font-size="22">詞</text><path d="M30 12 Q50 -2 70 12" fill="none" stroke="#0f172a" stroke-width="2.5"/><path d="M70 12 l-8 -1 M70 12 l-3 -7" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round"/><path d="M70 82 Q50 94 30 82" fill="none" stroke="#0f172a" stroke-width="2.5"/><path d="M30 82 l8 0 M30 82 l3 7" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round"/></svg>`,
};
const D11_VIEWS = [
  ['bat', 'Philosophy', 'There is something it is like to be you',
   'A bat senses the world by echolocation. We could learn every fact about it and still not know what that is like for the bat.',
   'Thomas Nagel, 1974'],
  ['broadcast', 'Neuroscience', 'Information shared across the whole brain',
   'Most of what the brain does is unconscious. What we experience is what gets broadcast widely, so many brain systems can use it at once.',
   'Global workspace theory: Bernard Baars, 1988; Stanislas Dehaene'],
  ['look', 'Cognitive science', 'Seeing is something you do',
   'Experience is knowing how your senses change when you act: turn your head, and the view changes in a lawful way.',
   'Kevin O’Regan and Alva Noë, 2001'],
  ['dict', 'Computer science', 'Symbols need to touch the world',
   'Linking words only to other words is like learning Chinese from a Chinese-only dictionary. Meaning needs grounding in perception and action.',
   'The symbol grounding problem: Stevan Harnad, 1990'],
];
st(`
  <h1 class="t">What does it mean to experience?</h1>
  <div class="d11-col">
    <div class="d11-views">
      ${D11_VIEWS.map(([ic, field, idea, text, who]) => `
        <div class="d11-view d11-view-ic b"><div class="d11-ic">${D11_VIEW_IC[ic]}</div><small>${field}</small><b>${idea}</b><span>${text}</span><i class="d11-who">${who}</i></div>`).join('')}
    </div>
    <div class="d11-know d11-all b"><div class="d11-mary"><svg viewBox="0 0 200 80" role="img" aria-label="A gray apple, an arrow, then the same apple in red: seeing red for the first time">
        <path d="M40 22 C28 14 12 22 14 42 C16 62 30 74 40 68 C50 74 64 62 66 42 C68 22 52 14 40 22 Z" fill="#9ca3af" stroke="#0f172a" stroke-width="3"/><path d="M40 22 Q42 12 48 8" stroke="#0f172a" stroke-width="3" fill="none"/>
        <path d="M84 44 H112" stroke="#0f172a" stroke-width="3"/><path d="M112 44 l-9 -6 M112 44 l-9 6" stroke="#0f172a" stroke-width="3" stroke-linecap="round"/>
        <path d="M160 22 C148 14 132 22 134 42 C136 62 150 74 160 68 C170 74 184 62 186 42 C188 22 172 14 160 22 Z" fill="#dc2626" stroke="#0f172a" stroke-width="3"/><path d="M160 22 Q162 12 168 8" stroke="#0f172a" stroke-width="3" fill="none"/>
      </svg><b>To know vs to feel</b></div>
      <span>Mary knows every fact about color but has only ever seen black and white. When she first sees red, does she learn something new? (Frank Jackson, 1982)</span></div>
  </div>
`);
}
