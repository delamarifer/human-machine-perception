/* PART: why (Day 11), about 9 minutes. Owner: Fernanda. Shared styles and helpers are in ../lib.js.
   Two explanations for the paradox. The first is Moravec's own; the second is the one Malik prefers, and he
   says so in his Lecture 1 ("I think a better argument is that of available digitized data on the web").
   The timeline on slide 1 is drawn to scale: the bar is 540 million years wide and the 50,000 year sliver is
   0.0093 percent of it, which is why it cannot be seen. That is the point of the drawing, and the slide says so.
   All notes are drafts, for Fernanda to replace with her own words. */
{
section('Why');

/* 1. The evolution answer (3 clicks). 540 Mya: Cambrian explosion. 50 Ky: modern human language and symbolic behaviour. */
{
  const W = 1000, X0 = 60, X1 = 960, Y = 120, H = 54;
  const span = X1 - X0;
  const langX = X1 - span * (50e3 / 540e6);   /* drawn to scale: 0.0093 percent of the bar */
  st(`
    <h1 class="t">Moravec answer: it is old</h1>
    <div class="d11-body">
      <svg class="d11-svg b" data-step="1" viewBox="0 0 ${W} 300" role="img" aria-label="A bar spanning 540 million years of perception and action, with the last 50,000 years of language too thin to see">
        <rect x="${X0}" y="${Y}" width="${span}" height="${H}" rx="8" fill="var(--ink)" fill-opacity=".14" stroke="var(--ink)" stroke-width="3"/>
        <text x="${X0 + span / 2}" y="${Y + H / 2 + 8}">perception and action</text>
        <text x="${X0}" y="${Y - 18}" style="text-anchor:start;fill:var(--mute)">540 million years ago</text>
        <text x="${X1}" y="${Y - 18}" style="text-anchor:end;fill:var(--mute)">now</text>
        <line x1="${langX}" y1="${Y - 6}" x2="${langX}" y2="${Y + H + 6}" stroke="var(--ink)" stroke-width="3"/>
        <line x1="${langX}" y1="${Y + H + 6}" x2="${langX - 150}" y2="${Y + H + 60}" stroke="var(--ink)" stroke-width="2"/>
        <text x="${langX - 156}" y="${Y + H + 66}" style="text-anchor:end">language: the last 50,000 years</text>
        <text x="${langX - 156}" y="${Y + H + 96}" style="text-anchor:end;fill:var(--mute);font-size:19px">drawn to scale, which is why it is a line and not a band</text>
      </svg>
      <div class="lead b" data-step="2" style="text-align:center">The skills we call easy are the ones evolution spent longest on</div>
      <div class="lead b" data-step="3" style="text-align:center">The ones we call hard, we have barely had time to build in. So they are shallow, and we can rebuild them</div>
    </div>
    ${cite(MALIK_CITE + ' · Cambrian and hominid dates after Parker, In the Blink of an Eye, 2003')}
  `, { notes: [
    "(draft) Two explanations for the paradox. Here is the first, which is Moravec's own.",
    "(draft) This bar is five hundred and forty million years, from the Cambrian explosion to now. That is roughly how long animals have been seeing and moving. The thin line near the right-hand end is language and symbolic thought, the last fifty thousand years. It is drawn to scale. That is why it is a line and not a band: it is about one part in ten thousand of the bar.",
    "(draft) Moravec's argument is that the skills we think of as easy are the ones evolution has been refining for essentially the whole of that bar. They feel effortless to us precisely because they are so thoroughly built in that we have no introspective access to them at all. Ask yourself how you catch a ball and you will say something useless.",
    "(draft) And the things we call hard, arithmetic, chess, formal logic, sit in that thin line at the end. We have hardly had time to evolve any special machinery for them, so we do them slowly and badly with general-purpose equipment. Which means they are shallow enough that we can work out how to rebuild them. That is Moravec's explanation, and it is a good one."
  ]});
}

/* 2. The data answer (4 clicks). This is the move Malik makes away from Moravec. */
{
  /* Two bins: one full of what people typed out, one empty. The marks in the full bin are a texture, not a
     count: they stand for "a great many", and the slide does not put a number on either side. */
  const BIN = (x, label, sub, filled, step) => {
    const W = 360, H = 210, Y = 96;
    const fill = filled ? Array.from({length: 54}, (_, i) => {
      const cx = x + 26 + (i % 9) * 38, cy = Y + H - 24 - Math.floor(i / 9) * 30;
      return `<rect x="${cx}" y="${cy}" width="26" height="18" rx="4" fill="var(--ink)" fill-opacity="${.22 + (i % 3) * .14}"/>`;
    }).join('') : `<text x="${x + W / 2}" y="${Y + H / 2 + 8}" style="fill:var(--mute);font-size:24px">nothing</text>`;
    return `<g class="b" data-step="${step}">
      <path d="M ${x} ${Y} L ${x} ${Y + H} L ${x + W} ${Y + H} L ${x + W} ${Y}" fill="none"
        stroke="var(--ink)" stroke-width="3.5" ${filled ? '' : 'stroke-dasharray="10 8"'}/>
      ${fill}
      <text x="${x + W / 2}" y="${Y - 34}" style="font-weight:700;font-size:25px">${label}</text>
      <text x="${x + W / 2}" y="${Y - 8}" style="fill:var(--mute);font-size:19px">${sub}</text>
    </g>`;
  };
  st(`
    <h1 class="t">Malik answer: it was never written down</h1>
    <div class="d11-body">
      <svg class="d11-svg" viewBox="0 0 1000 340" role="img" aria-label="One bin full of text, photographs and code; an empty dashed bin for forces and contact">
        ${BIN(80, 'what people typed out', 'text · photographs · code · speech', true, 1)}
        ${BIN(560, 'what hands know', 'forces · contact · how a thing pushes back', false, 2)}
      </svg>
      <div class="question b" data-step="3" style="text-align:center">Is the gap in the problems, or only in the data?</div>
    </div>
    ${cite(MALIK_CITE + ' · the marks are a texture, not a count')}
  `, { notes: [
  "(draft) Here is the second explanation, and it is the one Malik says he prefers to Moravec's. It is much less romantic and it has sharper consequences.",
  "(draft) What did the last fifteen years of progress actually run on? Text, photographs, code, recorded speech. Everything that human beings happened to type out, photograph and upload. The web is not a sample of the world. It is a sample of what people wrote down.",
  "(draft) And here is the other bin. The force in your fingers when you pick up an egg without crushing it. The way a dough pushes back when it is ready. What your ankle did, without consulting you, when the kerb turned out to be lower than you thought. None of this was ever written down. There is no internet of torques, and the bin is empty. So on this account the paradox is not really about which problems are deep and which are shallow. It is about which problems happened to come with a corpus attached.",
  "(draft) And that is the live question for this session. Is this a difference in the problems themselves, or only a difference in the data we happen to have? Hold on to whichever answer you lean toward, because the two predict very different futures."
]});
}
}
