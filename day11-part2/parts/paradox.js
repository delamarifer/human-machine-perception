/* PART: paradox (Day 11), about 4 minutes. Owner: Fernanda. Shared styles and helpers are in ../lib.js.
   Moravec (1988, "Mind Children") and Pinker (1994, "The Language Instinct") are quoted in short, with
   attribution; the rest is paraphrase. Malik puts both on one slide in his Lecture 1.
   Round 3: the "Which problems fell first" slide that used to open this part was cut for time (Fernanda), and
   its point — chess and theorem proving fell decades ago, picking up an unfamiliar mug did not — is now carried
   by the first two notes here. All notes are drafts. */
{
section('Moravec');

/* 1. Moravec and Pinker (3 clicks). Short quotations with attribution; the surrounding text is ours. */
{
  /* The inversion, drawn: what we expected to be hard on the left, what turned out to be hard on the right,
     with the crossing arrows. The ordering is the claim; nothing here is a measurement. */
  const L = ['chess', 'theorem proving', 'intelligence tests', 'walking', 'picking things up'];
  const R = ['picking things up', 'walking', 'intelligence tests', 'theorem proving', 'chess'];
  const BW = 290, BH = 56, GAP = 14, XL = 50, XR = 660, Y0 = 70;
  const col = (items, x, step) => items.map((t, i) =>
    `<g class="b" data-step="${step}">${d11Box(x, Y0 + i * (BH + GAP), BW, BH, t, { fs: 21 })}</g>`).join('');
  /* each left row joins the row holding the same word on the right */
  const links = L.map((t, i) => { const j = R.indexOf(t);
    const y1 = Y0 + i * (BH + GAP) + BH / 2, y2 = Y0 + j * (BH + GAP) + BH / 2;
    return `<path class="b" data-step="3" d="M ${XL + BW + 8} ${y1} C ${XL + BW + 150} ${y1}, ${XR - 150} ${y2}, ${XR - 10} ${y2}"
      fill="none" stroke="var(--ink)" stroke-width="2.5" stroke-opacity=".55" marker-end="url(#d11-par-head)"/>`; }).join('');
  st(`
    <h1 class="t">The order came out backwards</h1>
    <svg class="d11-svg" viewBox="0 0 1000 420" role="img" aria-label="What we expected to be hard, against what turned out to be hard, with the order inverted">
      ${d11Arrow('d11-par-head')}
      <text x="${XL + BW / 2}" y="46" style="fill:var(--mute);font-size:20px;letter-spacing:.06em">EXPECTED TO BE HARD, 1960</text>
      <text x="${XR + BW / 2}" y="46" style="fill:var(--mute);font-size:20px;letter-spacing:.06em">TURNED OUT TO BE HARD</text>
      ${links}${col(L, XL, 1)}${col(R, XR, 2)}
    </svg>
    ${cite(MALIK_CITE)}
  `, { notes: [
    "(draft) Step back from kitchens and cars and look at the whole history of the field, and ask which problems fell first.",
    "(draft) Here is what anyone in nineteen sixty would have ranked, hardest at the top. Chess. Proving theorems. Intelligence tests. And down at the bottom, barely worth listing, walking across a room and picking things up.",
    "(draft) And here is how it actually went. Read it from the top: the hardest thing we have is picking up an object we have not seen before. Then walking over uneven ground. Chess is at the bottom, finished, decades ago.",
    "(draft) The list did not get shuffled. It got turned upside down. Every single line crosses. That is the thing to notice, and it is why this has a name rather than being filed as a surprise."
  ]});
}

st(`
  <h1 class="t">Moravec names it</h1>
  <div class="d11-body">
    <div class="d11-quote b" data-step="1">Easy to give a computer adult performance on an intelligence test; “difficult or impossible to give them the skills of a one-year-old when it comes to perception and mobility”.<small>Hans Moravec, Mind Children, 1988</small></div>
    <div class="d11-quote b" data-step="2">“The hard problems are easy and the easy problems are hard.”<small>Steven Pinker, The Language Instinct, 1994</small></div>
    <div class="lead b" data-step="3" style="text-align:center">Pinker: the analysts and the engineers are the ones at risk. The gardeners and the cooks are safe for decades.</div>
  </div>
  ${cite(MALIK_CITE)}
`, { notes: [
  "(draft) That inversion has a name. Hans Moravec wrote it down in nineteen eighty-eight, in a book called Mind Children, and it has been called Moravec's paradox ever since.",
  "(draft) His formulation: it is comparatively easy to make a computer perform like an adult on an intelligence test, and difficult or impossible to give it the skills of a one year old when it comes to perception and mobility.",
  "(draft) Pinker put it more sharply six years later, in The Language Instinct: the hard problems are easy and the easy problems are hard.",
  "(draft) And he drew the conclusion out loud, which is the part worth sitting with. He said the people at risk from intelligent machines would be the stock analysts, the petrochemical engineers, the parole board members. The gardeners, receptionists and cooks, he wrote, are secure in their jobs for decades to come. That was nineteen ninety-four. Thirty years on, look at which of those predictions is holding up."
]});
}
