/* PART: scorecard (Day 11), about 9 minutes. Owner: Fernanda. Shared styles and helpers are in ../lib.js.
   Malik's three central problems of robotics and his own scorecard on them, then the data wall. The scorecard
   wording ("good progress", "nearly done", "long way to go") and the 10,000x claim are his, from Lecture 1;
   they are his judgements, not measurements, and the slide and the notes both say so. All notes are drafts. */
{
section('Scorecard');

/* 1. The three problems and where they stand (4 clicks). */
st(`
  <h1 class="t">Where it actually stands</h1>
  <div class="d11-body">
    <svg class="d11-svg" viewBox="0 0 1000 350" role="img" aria-label="One errand in three stages: find it, cross the ground, do the thing, each with a verdict mark">
      ${d11Arrow('d11-sc-head')}
      <text class="b" data-step="1" x="500" y="36" style="fill:var(--mute);font-size:21px">one errand, three problems</text>
      ${[['Navigation', 'find the thing', 'full', 2], ['Locomotion', 'cross the ground', 'half', 3], ['Manipulation', 'do the thing', 'none', 4]]
        .map(([name, sub, mark, step], i) => { const x = 60 + i * 320;
          return `<g class="b" data-step="${step}">
            ${d11Box(x, 110, 250, 92, `<b>${name}</b><br><span style="font-size:.82em;color:var(--mute)">${sub}</span>`, { fs: 25 })}
            ${d11Mark(mark, x + 125, 252, 30)}
            <text x="${x + 125}" y="${312}" style="font-size:20px">${mark === 'full' ? 'nearly done' : mark === 'half' ? 'good progress' : 'a long way to go'}</text>
          </g>${i < 2 ? `<path class="b" data-step="${step}" d="M ${x + 262} 156 L ${x + 306} 156" stroke="var(--ink)" stroke-width="3" marker-end="url(#d11-sc-head)"/>` : ''}`; }).join('')}
    </svg>
    <div class="d11-tag">the three verdicts are Malik's judgement, not a benchmark</div>
  </div>
  ${cite(MALIK_CITE + ' (the three verdicts are a judgement, not a benchmark)')}
`, { notes: [
  "(draft) So where does it actually stand? Malik splits the problem of connecting perception to action into three, and gives each one a mark. These are his judgements, not scores off a benchmark, and I am repeating them because I think they are roughly right.",
  "(draft) The three problems: navigation, locomotion, manipulation. Getting to the thing, crossing the ground to get there, and doing anything at all once you arrive.",
  "(draft) Navigation: nearly done. A robot can be shown a photograph of a sink and find that sink in a house it has never been in. Not a map of the house, a photograph of the thing.",
  "(draft) Locomotion: good progress, and genuinely startling progress. There are humanoids now that walk down San Francisco hills at a forty-one percent grade, outdoors, over roots and gravel, with the controller trained the way a language model is trained, predicting the next token of its own motion.",
  "(draft) Manipulation: a long way to go. Back to the kitchen verbs. This is the one that has not moved, and notice it is the one that needs hands."
]});

/* 1b. Watch the locomotion one (2 clicks). We embed the authors' own video rather than copying frames from it.
   Paper: Radosavovic, Zhang, Shi, Rajasegaran, Kamat, Darrell, Sreenath and Malik, "Humanoid Locomotion as Next
   Token Prediction", NeurIPS 2024 (arXiv 2402.19469); video from the project page, needs internet. */
st(`
  <h1 class="t">What good progress looks like</h1>
  <div class="d11-watch b" data-step="1">
    <div class="d11-paper">
      <b>Humanoid Locomotion as Next Token Prediction</b>
      <span>Radosavovic, Zhang, Shi, Rajasegaran, Kamat, Darrell, Sreenath and Malik · Berkeley · NeurIPS 2024 · ${d11Link('project page ↗', 'https://humanoid-next-token-prediction.github.io/')}</span>
    </div>
    <iframe class="d11-embed" src="https://www.youtube.com/embed/ok4DHssENE4" title="Humanoid Locomotion as Next Token Prediction" allowfullscreen></iframe>
  </div>
  <div class="lead b" data-step="2" style="text-align:center">Trained the way a language model is trained: predict the next token of your own motion</div>
  ${cite('Video by the paper authors, embedded from YouTube · ' + MALIK_CITE)}
`, { notes: [
  "(draft) Rather than tell you about the locomotion progress, here it is. This is the authors' own video.",
  "(draft) A full-sized humanoid, outdoors, in San Francisco, on terrain nobody sanded flat for it. The same group walked one over four miles of Berkeley hiking trails and up some of the steepest streets in the city. Play a minute of it. If the room has no internet, say the address out loud and move on.",
  "(draft) And the reason it is in this session rather than a robotics one: the controller is trained the way a language model is trained. It predicts the next token of its own sensorimotor sequence. Same recipe, different corpus, and the corpus is the whole difficulty, which is the next slide."
]});

/* 2. The data wall (3 clicks). The 10,000x figure is Malik's own statement on his Lecture 1 slide. */
st(`
  <h1 class="t">The wall is data</h1>
  <div class="d11-body">
    <div class="d11-big b" data-step="1">10,000×<small>Malik's estimate of how much more data a language model needs than a human child · a figure said aloud, not a measurement from a study</small></div>
    <svg class="d11-svg" viewBox="0 0 1000 250" role="img" aria-label="Language and vision scoop from a pile that already existed; contact is collected one hour at a time">
      ${d11Arrow('d11-wall-head')}
      <g class="b" data-step="2">
        <text x="250" y="38" style="font-weight:700;font-size:24px">language and vision</text>
        ${Array.from({length: 40}, (_, i) => {
          const cx = 90 + (i % 10) * 33, cy = 190 - Math.floor(i / 10) * 26;
          return `<rect x="${cx}" y="${cy}" width="24" height="17" rx="4" fill="var(--ink)" fill-opacity="${.2 + (i % 4) * .13}"/>`; }).join('')}
        <text x="250" y="232" style="fill:var(--mute);font-size:20px">the pile was already there. Nobody collected it for this</text>
      </g>
      <g class="b" data-step="3">
        <text x="740" y="38" style="font-weight:700;font-size:24px">contact and force</text>
        <text x="740" y="100" style="font-size:21px">one hour of a real robot</text>
        <text x="740" y="126" style="fill:var(--mute);font-size:19px">touching real things, sometimes breaking them</text>
        <path d="M 740 142 L 740 166" stroke="var(--ink)" stroke-width="2.5" marker-end="url(#d11-wall-head)"/>
        <rect x="728" y="173" width="24" height="17" rx="4" fill="var(--ink)" fill-opacity=".55"/>
        <text x="740" y="232" style="fill:var(--mute);font-size:20px">= one hour of data</text>
      </g>
    </svg>
  </div>
  ${cite(MALIK_CITE)}
`, { notes: [
  "(draft) And his diagnosis of why manipulation is stuck is the same as the explanation we met earlier. The wall is data.",
  "(draft) He puts a number on the inefficiency: a language model needs at least ten thousand times more data than a human child. I want to be careful here, because this is his estimate on a slide, not a measurement I can hand you a study for. Treat it as the order of magnitude he is willing to defend, and notice that even if he is off by a factor of ten in either direction the point survives.",
  "(draft) For language and for vision, that did not matter, because the data was already lying there. Nobody collected the web in order to train a model. It was collected for other reasons and then it turned out to be a training set.",
  "(draft) For contact and force, there is no such pile. Every hour of it has to be paid for with an hour of a real robot touching real objects and sometimes breaking them. That is the actual bottleneck, and it is a much more boring and much more stubborn kind of problem than anything about architectures."
]});
}
