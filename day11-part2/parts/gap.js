/* PART: gap (Day 11), about 9 minutes. Owner: Fernanda. Shared styles and helpers are in ../lib.js.
   Both slides follow Malik's opening move: set an ordinary human skill against the state of the art.
   The kitchen verbs and the twenty hours claim are from his Lecture 1; the list of verbs is our own typesetting,
   not his figure. All notes are drafts, for Fernanda to replace with her own words. */
{
section('The gap');

/* 1. Kitchen verbs (3 clicks). The verbs are ordinary English cooking words; nothing here is a measurement. */
const VERBS = ['grate', 'whisk', 'peel', 'pinch', 'pour', 'scramble', 'toast', 'simmer', 'slice', 'spread',
  'stir', 'taste', 'beat', 'bake', 'blend', 'boil', 'sift', 'roast', 'chop', 'dip', 'fry', 'roll', 'knead', 'measure'];
st(`
  <h1 class="t">Things a twelve year old can do</h1>
  <div class="d11-body">
    <div class="d11-chips b" data-step="1">${VERBS.map(v => `<span>${v}</span>`).join('')}</div>
    <div class="d11-big b" data-step="2">Today no robot can do all of these<small>and not for want of trying</small></div>
  </div>
  ${cite(MALIK_CITE)}
`, { notes: [
  "(draft) Start with something that sounds like nothing. Here are twenty-four things people do in a kitchen.",
  "(draft) Grate, whisk, peel, pinch, pour, scramble, toast. Read a few of them and picture your hands doing it. Each one is a different relationship between a hand, a tool, and a material that pushes back: an egg that cracks, a dough that resists, a sauce that has to be folded and not stirred. A twelve year old does all of these without being taught most of them.",
  "(draft) And today no robot can do all of these. Not one. There are robots that can do one or two in a laboratory, with the lighting right and the bowl in the same place every time. That is where we are, after fifteen years of deep learning and a great deal of money."
]});

/* 2. Twenty hours (3 clicks). The twenty hours claim is Malik's. */
{
  /* The milestones are drawn on a real 1980-2026 axis, each at its own year. The dates are from the public
     record of the field (Dickmanns at UniBW Munich; the VaMP Paris drive, 1994; CMU No Hands Across America,
     1995; the 2019 Tesla autonomy day claim), and Malik walks the same list in his Lecture 1. */
  const Y0 = 1980, Y1 = 2027, X0 = 70, X1 = 940, AY = 150;
  const px = y => X0 + (y - Y0) / (Y1 - Y0) * (X1 - X0);
  /* [year, label, dy from the axis, text-anchor]. The offsets are staggered by hand so that 1986 and 1995,
     which are nine years apart on a 47 year axis, do not collide, and so the 2026 label does not run off
     the right edge. Checked in the browser at 16:9. */
  const MS = [[1986, 'first robot cars', -34, 'middle'], [1995, 'no hands across America', -66, 'middle'],
              [1994, 'drives the Paris ring road', 64, 'middle'], [2019, 'full self-driving “next year”', 64, 'end'],
              [2026, 'still not a profitable industry', -34, 'end']];
  st(`
    <h1 class="t">Twenty hours</h1>
    <div class="d11-body">
      <svg class="d11-svg b" data-step="1" viewBox="0 0 1000 340" role="img" aria-label="A timeline from 1980 to 2026 of self-driving milestones, against a twenty hour tick">
        ${d11Arrow('d11-gap-head')}
        <line x1="${X0}" y1="${AY}" x2="${X1}" y2="${AY}" stroke="var(--ink)" stroke-width="3.5" marker-end="url(#d11-gap-head)"/>
        ${[1980, 1990, 2000, 2010, 2020].map(y => `<line x1="${px(y)}" y1="${AY - 7}" x2="${px(y)}" y2="${AY + 7}" stroke="var(--ink)" stroke-width="2"/>
          <text x="${px(y)}" y="${AY + 30}" style="fill:var(--mute);font-size:19px">${y}</text>`).join('')}
        ${MS.map(([y, t, dy, anchor]) => { const x = px(y), ty = AY + dy;
          const tx = anchor === 'end' ? x + 10 : x;
          return `<circle cx="${x}" cy="${AY}" r="7" fill="var(--ink)"/>
            <line x1="${x}" y1="${AY + (dy < 0 ? -10 : 10)}" x2="${x}" y2="${ty + (dy < 0 ? 8 : -20)}" stroke="var(--ink)" stroke-width="2"/>
            <text x="${tx}" y="${ty}" style="font-size:19px;text-anchor:${anchor}">${t}</text>`; }).join('')}
        <g class="b" data-step="2">
          <line x1="${X0}" y1="262" x2="${X0 + 12}" y2="262" stroke="var(--ink)" stroke-width="9" stroke-linecap="round"/>
          <text x="${X0 + 28}" y="268" style="text-anchor:start;font-weight:700;font-size:25px">twenty hours</text>
          <text x="${X0 + 28}" y="296" style="text-anchor:start;fill:var(--mute);font-size:19px">a sixteen year old, with a parent in the passenger seat · not the same units as the axis above</text>
        </g>
      </svg>
      <div class="question b" data-step="3" style="text-align:center">What does the sixteen year old already have?</div>
    </div>
    ${cite(MALIK_CITE + ' · milestone dates from the public record of the field')}
  `, { notes: [
  "(draft) Same shape of fact, with a bigger number attached to it, and this time I want you to look at the picture before I say the number.",
  "(draft) Forty years of the field, on one line. Ernst Dickmanns and his group in Munich build the first real robot cars in the mid eighties. By ninety-four one of them is driving the Paris ring road on its own at a hundred and thirty kilometres an hour, overtaking. In ninety-five, no hands across America. In twenty nineteen we are promised a million self-driving cars by next year. And here we are, with it still not a profitable industry. Four decades. Enormous money. Some of the best engineers alive.",
  "(draft) Now the other mark, down here, and notice I have put it on its own line and not on the axis, because it is not the same units. Twenty hours. That is a sixteen year old with a parent in the passenger seat, flinching. Forty years of a field against twenty hours of a teenager. You cannot put those on one scale honestly, and you do not need to.",
  "(draft) So hold the obvious question. The sixteen year old is not better at engineering than the industry. What do they bring to that first lesson that the car does not? Keep your answer. We will come back to it at the end, and I want to know whether it survives the next forty minutes."
]});
}
}
