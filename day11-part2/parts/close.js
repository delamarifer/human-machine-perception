/* PART: close (Day 11), about 6 minutes. Owner: Fernanda. Shared styles and helpers are in ../lib.js.
   Malik closes his Lecture 1 with a three-level hierarchy and with a language model's omelette recipe. The
   recipe text here is our own paraphrase of an ordinary omelette method, not a quotation of any model output:
   if Fernanda wants a real model transcript on the slide, she should generate one and we will label it.
   All notes are drafts. */
{
section('Close');

/* 1. Three levels (4 clicks). The pairing of levels with senses is Malik's, from Lecture 1. */
st(`
  <h1 class="t">Three levels, three senses</h1>
  <div class="d11-body">
    <svg class="d11-svg" viewBox="0 0 1000 340" role="img" aria-label="Three stacked levels with their senses, and a bracket showing our models are good only at the top">
      ${[['Goals, plans', 'what counts as breakfast', 'cognitive vision', 1],
         ['Motion in 4D', 'where the hand goes, and when', 'spatial vision · proprioception', 2],
         ['Forces, torques', 'how hard, and when to give way', 'touch · proprioception', 3]]
        .map(([a, b, c, step], i) => { const y = 40 + i * 94;
          return `<g class="b" data-step="${step}">
            ${d11Box(60, y, 470, 78, `<b>${a}</b><br><span style="font-size:.78em;color:var(--mute)">${b}</span>`, { fs: 25 })}
            <text x="560" y="${y + 46}" style="text-anchor:start;font-size:21px">${c}</text>
          </g>`; }).join('')}
      <g class="b" data-step="4">
        <path d="M 40 44 L 24 44 L 24 114 L 40 114" fill="none" stroke="var(--ink)" stroke-width="3.5"/>
        <text x="18" y="86" transform="rotate(-90 18 86)" style="text-anchor:middle;font-weight:700;font-size:21px">models are good here</text>
        <text x="500" y="330" style="fill:var(--mute);font-size:21px">and this is the row you can write down</text>
      </g>
    </svg>
  </div>
  ${cite(MALIK_CITE)}
`, { notes: [
  "(draft) One more frame before we finish, and this is the one I find most useful for thinking about your own projects.",
  "(draft) Any physical task decomposes into three levels. At the top, goals and plans: what counts as breakfast, what order things have to happen in. That is cognitive vision, understanding a scene as a situation.",
  "(draft) In the middle, motion trajectories in four dimensions, three of space and one of time: where the hand actually goes, and when. That needs spatial vision and proprioception, the sense of where your own limbs are.",
  "(draft) At the bottom, forces and torques: how hard to squeeze, and when to give way because the thing is pushing back. That is touch, and proprioception again.",
  "(draft) And here is the pattern. Our models are excellent at the top row and poor at the bottom one. Which is exactly the prediction of the data explanation, because the top row is the row you can write down. People write recipes. Nobody writes down the force."
]});

/* 2. The omelette (3 clicks). The six steps are our own plain paraphrase of a standard omelette method. */
st(`
  <h1 class="t">It can write the recipe</h1>
  <div class="d11-two">
    <ol class="d11-list b" data-step="1" style="font-size:.8em">
      <li>Crack the eggs, season, whisk until just frothy</li>
      <li>Butter in the pan, medium-high</li>
      <li>Pour, let it set a few seconds</li>
      <li>Shake the pan while pulling the set edges in</li>
      <li>Filling on one half</li>
      <li>Tilt, fold, roll it onto the plate</li>
    </ol>
    <div class="d11-col">
      <div class="lead b" data-step="2">Correct. Complete. In the right order.</div>
      <div class="lead b" data-step="3">And not one line of it says how hard to shake, or how to know that “just frothy” has happened</div>
    </div>
  </div>
  ${cite(MALIK_CITE + ' · the six steps are our own paraphrase of a standard method, not a model transcript')}
`, { notes: [
  "(draft) Malik ends on a joke that is not really a joke, and I am going to end on it too.",
  "(draft) Ask a language model how to make an omelette and you get this. I have written these steps out plainly rather than pasting a transcript. Crack and season and whisk until just frothy. Butter, medium-high. Pour and let it set. Shake the pan with one hand while pulling the set edges in with the other. Filling on one half. Tilt, fold, roll it out.",
  "(draft) It is correct. It is complete. It is in the right order. If you knew how to cook already, you could follow it.",
  "(draft) And there is not one line in it that tells you how hard to shake the pan, or how to recognise that just frothy has happened and not gone past, or what to do with your wrist at the moment of the fold. Every one of those is a force or a contact, and every one of them is the thing the recipe cannot contain. The model has all the language about cooking that has ever been written, and it is exactly as unable to cook as it was before."
]});

/* 3. Discussion (3 clicks), back to the question from the opening. */
st(`
  <h1 class="t">So what did the sixteen year old have?</h1>
  <div class="d11-body">
    <div class="question b" data-step="1" style="text-align:center">In pairs, two minutes</div>
    <svg class="d11-svg" viewBox="0 0 1000 300" role="img" aria-label="One question forking into two futures">
      ${d11Arrow('d11-fork-head')}
      ${d11Box(40, 110, 250, 72, 'sixteen years<br>of having a body', { fs: 23, fw: 600 })}
      <g class="b" data-step="2">
        <path d="M 300 136 C 400 136, 420 68, 520 68" fill="none" stroke="var(--ink)" stroke-width="3" marker-end="url(#d11-fork-head)"/>
        ${d11Box(530, 26, 440, 86, '<b>it was data</b><br><span style="font-size:.8em;color:var(--mute)">enough robots touching enough things closes the gap</span>', { fs: 23 })}
      </g>
      <g class="b" data-step="3">
        <path d="M 300 158 C 400 158, 420 228, 520 228" fill="none" stroke="var(--ink)" stroke-width="3" marker-end="url(#d11-fork-head)"/>
        ${d11Box(530, 186, 440, 86, '<b>it was more than data</b><br><span style="font-size:.8em;color:var(--mute)">a body does work no corpus replaces. What work?</span>', { fs: 23 })}
      </g>
    </svg>
  </div>
  ${cite(MALIK_CITE)}
`, { notes: [
  "(draft) Back to where we started. The sixteen year old learns to drive in twenty hours. What did they bring to the first lesson?",
  "(draft) Two minutes in pairs, then a few of you tell me. And I want you to take a side, because the two sides predict different futures.",
  "(draft) If the answer is data, that sixteen years of falling over, catching things, judging gaps, is just a very large pre-training set, then the story ends well and dully. Put enough robots in enough kitchens, collect enough contact, and manipulation falls the way chess fell and vision fell.",
  "(draft) If the answer is more than data, then having a body is doing work that no amount of recorded experience replaces, and the interesting question is what that work actually is. Say what you think it is. Those are the answers I want to hear, because that is the question your own projects are standing on."
]});

/* 4. Watch the original (1 click). The talk this whole session is built on, embedded; needs internet. */
st(`
  <h1 class="t">If interested, watch it...</h1>
  <div class="d11-watch b">
    <div class="d11-paper">
      <b>Jitendra Malik · Vision and Robotics for Embodied AI</b>
      <span>Frontiers of Embodied AI, ETH Zurich, 2026 · the course this is drawn from: ${d11Link('robots-that-learn.github.io ↗', MALIK_COURSE)}</span>
    </div>
    <iframe class="d11-embed" src="https://www.youtube.com/embed/HvDU7Vk4pbc" title="Jitendra Malik: Vision and Robotics for Embodied AI" allowfullscreen></iframe>
  </div>
`, { notes: [
  "(draft) Last thing. Everything in this hour came from one talk, and you should go and watch it yourselves rather than take my compression of it.",
  "(draft) Jitendra Malik, Vision and Robotics for Embodied AI, at ETH Zurich. He is one of the people who built modern computer vision, and he is the right person to be telling you what it has not done. His whole Berkeley course on this is public too, twenty lectures of slides, and the link is on the slide and in the notes online. If you are looking for a final project in this direction, start there."
]});
}
