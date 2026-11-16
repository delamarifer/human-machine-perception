/* PART: bodies (Day 11), about 9 minutes. Owner: Fernanda. Shared styles and helpers are in ../lib.js.
   Malik opens his Lecture 1 with this: the phylogeny of intelligence, Gibson on the perception-action loop,
   and Anaxagoras on hands. The two quotations are short and attributed. All notes are drafts. */
{
section('Bodies');

/* 1. The Cambrian and Gibson (3 clicks). 540 Mya and the claim that vision drove the radiation are from
   Parker, In the Blink of an Eye (2003), which is the source Malik cites on this slide. */
st(`
  <h1 class="t">Vision came first, and it came with moving</h1>
  <div class="d11-body">
    <svg class="d11-svg" viewBox="0 0 1000 330" role="img" aria-label="An eye appears, and everything else has to hide, flee or armour itself">
      ${d11Arrow('d11-camb-head')}
      <g class="b" data-step="1">
        <text x="500" y="38" style="font-weight:700;font-size:26px">540 million years ago</text>
        <text x="500" y="66" style="fill:var(--mute);font-size:20px">almost every animal body plan we still have, in a geological instant</text>
      </g>
      <g class="b" data-step="2">
        <ellipse cx="190" cy="178" rx="96" ry="58" fill="#fff" stroke="var(--ink)" stroke-width="4"/>
        <circle cx="190" cy="178" r="30" fill="var(--ink)"/><circle cx="202" cy="166" r="9" fill="#fff"/>
        <text x="190" y="272" style="font-weight:700;font-size:23px">something can see</text>
      </g>
      ${['hide', 'flee', 'armour yourself'].map((t, i) => {
        const cy = 118 + i * 62;
        return `<g class="b" data-step="3">
          <path d="M 294 178 L 462 ${cy}" stroke="var(--ink)" stroke-width="2.5" marker-end="url(#d11-camb-head)"/>
          ${d11Box(470, cy - 22, 300, 44, t, { fs: 21, r: 10, sw: 2.5 })}
        </g>`; }).join('')}
      <text class="b" data-step="3" x="790" y="272" style="fill:var(--mute);font-size:20px;text-anchor:middle">everything else, under pressure to move differently</text>
    </svg>
  </div>
  ${cite(MALIK_CITE + ' · Cambrian account after Parker, In the Blink of an Eye, 2003')}
`, { notes: [
  "(draft) If perception is the old part, it is worth knowing how old, and what it arrived attached to.",
  "(draft) Five hundred and forty million years ago, the Cambrian explosion. In a window that is a geological instant, almost every animal body plan we still have today shows up in the fossil record.",
  "(draft) There is an argument, Andrew Parker's, that the trigger was the eye. The first animal that could see was the first animal that could hunt at a distance, and from that moment everything else in the ocean was under selection pressure to move differently: to hide, to flee, to armour itself.",
  "(draft) So vision did not arrive as a way of contemplating the world. It arrived as part of an argument about movement. Which is the thing the next slide is about."
]});

/* 1b. Gibson's loop (5 clicks), drawn here: four nodes revealed clockwise, then the whole cycle closes.
   This is our own diagram of Gibson's line, not a figure from anywhere. */
{
  const N = [
    [120,  60, 'you look somewhere'],
    [560,  60, 'you see only what is there to see'],
    [560, 270, 'you move: eyes, head, body'],
    [120, 270, 'the world shows you something else']
  ];
  const nodes = N.map(([x, y, t], i) => `
    <g class="b" data-step="${i + 1}">
      <rect class="d11-node" x="${x}" y="${y}" width="320" height="104" rx="16"/>
      <foreignObject x="${x + 14}" y="${y + 14}" width="292" height="76">
        <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:var(--font);font-size:21px;line-height:1.25;color:var(--ink);text-align:center;display:flex;align-items:center;justify-content:center;height:100%">${t}</div>
      </foreignObject>
    </g>`).join('');
  /* arcs run clockwise between the four boxes; each appears with the box it points at */
  const arcs = [
    ['M 448 112 L 552 112', 2],
    ['M 720 172 L 720 262', 3],
    ['M 552 322 L 448 322', 4],
    ['M 280 262 L 280 172', 5]
  ].map(([d, s]) => `<path class="d11-arc b" data-step="${s}" d="${d}" marker-end="url(#d11-loop-head)"/>`).join('');
  st(`
    <h1 class="t">One loop, not two systems</h1>
    <svg class="d11-svg" viewBox="0 0 900 400" role="img" aria-label="A four step cycle: you look, you see what is there, you move, the world shows you something else">
      <defs><marker id="d11-loop-head" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--ink)"/></marker></defs>
      ${arcs}${nodes}
    </svg>
    <div class="d11-quote b" data-step="5">“We see in order to move and we move in order to see.”<small>James J. Gibson</small></div>
    ${cite(MALIK_CITE)}
  `, { notes: [
    "(draft) Here is the shape of the thing, and it is worth drawing because it is so easy to say and so easy to forget.",
    "(draft) You look somewhere. Not everywhere: somewhere. Already a choice, and already a movement.",
    "(draft) And you see only what is there to be seen from where you happen to be standing. Half the room is behind the sofa, or behind your own head.",
    "(draft) So you move. Eyes, head, body, a step to the side. Usually without deciding to, and usually without noticing.",
    "(draft) And the world shows you something else. Which is the point: the moving was not a separate act that happened after the seeing. It was part of the seeing.",
    "(draft) Gibson said it in one line, and it is the line I want you to carry out of this room: we see in order to move and we move in order to see. Not two systems bolted together. One loop. Now hold that against yesterday: LLMR gets handed a list of objects, once, and never moves. There is no loop at all. Nothing it could do would show it anything new."
  ]});
}

/* 2. Hands (3 clicks). Anaxagoras is quoted in short; the three hominid traits are from Malik's Lecture 1. */
st(`
  <h1 class="t">Then hands</h1>
  <div class="d11-body">
    <svg class="d11-svg" viewBox="0 0 1000 300" role="img" aria-label="A five million year strip: upright, thumb, tools, and language only in the last fifty thousand years">
      ${(() => { const X0 = 70, X1 = 930, AY = 150;
        const px = m => X0 + (5 - m) / 5 * (X1 - X0);   /* m = millions of years ago, so 5 Mya is at the left */
        const MS = [[4, 'standing up frees the hands'], [2.6, 'an opposable thumb'], [1.8, 'tools, made with tools']];
        return `${d11Arrow('d11-hand-head')}
        <line x1="${X0}" y1="${AY}" x2="${X1}" y2="${AY}" stroke="var(--ink)" stroke-width="3.5" marker-end="url(#d11-hand-head)"/>
        <text x="${X0}" y="${AY - 24}" style="text-anchor:start;fill:var(--mute);font-size:19px">5 million years ago</text>
        <text x="${X1}" y="${AY - 24}" style="text-anchor:end;fill:var(--mute);font-size:19px">now</text>
        ${MS.map(([m, t], i) => `<g class="b" data-step="1">
          <circle cx="${px(m)}" cy="${AY}" r="8" fill="var(--ink)"/>
          <line x1="${px(m)}" y1="${AY + 10}" x2="${px(m)}" y2="${AY + 30 + i * 30}" stroke="var(--ink)" stroke-width="2"/>
          <text x="${px(m)}" y="${AY + 50 + i * 30}" style="font-size:21px">${t}</text></g>`).join('')}
        <g class="b" data-step="2">
          <line x1="${px(0.05)}" y1="${AY - 58}" x2="${px(0.05)}" y2="${AY + 10}" stroke="var(--ink)" stroke-width="3"/>
          <text x="${px(0.05) - 12}" y="${AY - 68}" style="text-anchor:end;font-weight:700;font-size:21px">language, abstract thought</text>
          <text x="${px(0.05) - 12}" y="${AY - 44}" style="text-anchor:end;fill:var(--mute);font-size:19px">the last 50,000 years · one percent of this strip</text>
        </g>`; })()}
    </svg>
    <div class="d11-quote b" data-step="3">“It is because of his being armed with hands that man is the most intelligent animal.”<small>Anaxagoras, as reported by Aristotle</small></div>
  </div>
  ${cite(MALIK_CITE)}
`, { notes: [
  "(draft) Then, very recently by the standards of that bar, hands.",
  "(draft) In the last five million years: standing up, which frees the hands from walking. An opposable thumb, which turns a paw into something that can hold a thin object precisely. And tool use, and then the strange recursive step of making tools with tools.",
  "(draft) And only in the last fifty thousand: language, abstract thinking, symbolic behaviour. That is the sliver from the previous slide. It is also, more or less exactly, the part of ourselves we have succeeded in building machines out of.",
  "(draft) Anaxagoras got there two and a half thousand years ago, and Aristotle reports him disapprovingly: it is because of his being armed with hands that man is the most intelligent animal. Aristotle thought it was the other way round, that we got hands because we were intelligent enough to use them. I would not bet on Aristotle. Hold that disagreement in mind for the rest of the session, because it is the same disagreement we are still having."
]});
}
