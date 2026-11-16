/* PART: touch (Day 11), about 10 minutes. Owner: Fernanda. Shared styles and helpers are in ../lib.js.
   Covers the talk 35:14 to 42:30, chapters 7 and 8 of ../reference/malik-talk-map.md.

   Round 2 (2026-11-16): cut to the word budget in ../reference/check-slides.js. Every full sentence that was
   on the screen is now in the note instead, including both of the quotations, which are read aloud rather than
   displayed. What is left on screen is cues and one number. The house rule is cues on screen, full sentences
   in the notes, and this part was breaking it at 56 words a slide.

   Where he gives a number in passing rather than a measurement, the slide says so. All notes are drafts. */
{
section('Touch');

const TALK = 'After ' + d11Link('Jitendra Malik, "Vision and Robotics for Embodied AI" (ETH Zurich, 2026)', MALIK_TALK);

/* 1. The third level, unfinished (3 clicks). Three places a body senses force. */
st(`
  <h1 class="t">The level we skipped</h1>
  <div class="d11-body">
    <svg class="d11-svg" viewBox="0 0 1000 250" role="img" aria-label="Three places a body senses force: skin, joints, muscles">
      ${[['skin', 1], ['joints', 2], ['muscles', 3]].map(([t, step], i) => `
        <g class="b" data-step="${step}">${d11Box(60 + i * 310, 60, 280, 100, `<b>${t}</b>`, { fs: 34 })}</g>`).join('')}
    </svg>
    <div class="d11-big b" data-step="4">Digit 360<small>amazing, and overkill</small></div>
    <div class="lead b" data-step="5" style="text-align:center">We can feel. We cannot use the feeling.</div>
    <div class="d11-big b" data-step="6">The second belief<small>no robotics without touch</small></div>
  </div>
  ${cite(TALK + ' · 37:43')}
`, { notes: [
  "(draft) We have done goals and we have done trajectories. Now the level nobody builds for, and the one he says we cannot skip.",
  "(draft) You sense force in your skin. The receptors in your fingertips fire when something slips, when an edge presses, when a texture changes under you. They have names: Merkel, Meissner.",
  "(draft) You sense it in your joints, which is how you know where your hand is in the dark, and what it is pushing against.",
  "(draft) And in your muscles, which is how you know how hard you are working. Three channels, running the whole time, and not one of them in any training set.",
  "(draft) So why has nobody solved this? Not for want of a sensor. Digit 360 is called the gold-plated Cadillac version, an amazing sensor, lineage going back to GelSight. And then, in the same breath: it is probably overkill.",
  "(draft) Because the bottleneck is not the hardware. The downstream uses of tactile sensing have been rather limited. We have sensors that can feel, and very little that knows what to do with the feeling.",
  "(draft) And then the same move as with the hands: this is marked as a belief rather than a result. No robotics without solving tactile sensing. Two beliefs in one talk, both flagged. Earlier it was that you need multi-fingered hands. Now it is that you need touch. They are the same bet made twice, from two ends: hands are the instrument, touch is the sense."
]});

/* 2b. Adelson (4 clicks). OUR connection, not his: at 37:59 Malik says only that the sensor tradition goes
   back to GelSight, and GelSight is Adelson's. That the same person made the checkershadow illusion is
   something we are adding, because it ties this session to Day 3. The slide and the notes both say so.
   Images and licences in ../assets/touch/SOURCES.md. */
(() => {
  if(document.getElementById('touch-ted-style')) return;
  const el = document.createElement('style'); el.id = 'touch-ted-style';
  el.textContent = `
  .touch-pair{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1fr 1fr; gap:3vw; align-items:center; }
  .touch-pair figure{ margin:0; display:flex; flex-direction:column; gap:1vh; align-items:center; }
  .touch-pair img{ width:100%; max-height:46vh; object-fit:contain; border-radius:8px; }
  .touch-pair b{ font-size:clamp(1.1rem, 1.8vw, 1.6rem); }
  @media (max-width: 820px), (max-aspect-ratio: 1/1){ .touch-pair{ grid-template-columns:1fr; } }
  `;
  document.head.appendChild(el);
})();
st(`
  <h1 class="t">The same person, twice</h1>
  <div class="d11-body">
    <div class="touch-pair">
      <figure class="b" data-step="1">
        <img src="assets/touch/checkershadow.svg" alt="Adelson's checkershadow illusion: square A in the light looks dark, square B in the shadow looks light">
        <b>A and B</b>
      </figure>
      <figure class="b" data-step="2">
        <img src="assets/touch/checkershadow-proof.svg" alt="The same image with a bar joining the two squares, showing they are the same grey">
        <b>the same grey</b>
      </figure>
    </div>
    <div class="d11-big b" data-step="3">He also built GelSight</div>
    <svg class="d11-svg" viewBox="0 0 1000 320" role="img" aria-label="An object presses into a soft gel; lights from two sides illuminate the coated underside; a camera below photographs the dent">
      ${d11Arrow('touch-gel2')}
      <g class="b" data-step="4">
        <path d="M 430 34 q 70 -4 140 0 l -14 40 q -56 10 -112 0 z" fill="var(--ink)" fill-opacity=".8"/>
        <text x="500" y="22" style="font-size:22px">object</text>
        <rect x="250" y="86" width="500" height="44" rx="10" fill="var(--accent)" fill-opacity=".3" stroke="var(--ink)" stroke-width="3"/>
        <path d="M 250 130 q 130 0 165 0 q 85 34 170 0 q 35 0 165 0" fill="none" stroke="var(--ink)" stroke-width="5"/>
        <text x="140" y="100" style="text-anchor:start;font-size:22px">soft gel</text>
        <text x="140" y="146" style="text-anchor:start;font-size:22px">coated skin</text>
      </g>
      <g class="b" data-step="5">
        <circle cx="150" cy="226" r="17" fill="var(--ink)"/><circle cx="850" cy="226" r="17" fill="var(--ink)"/>
        <path d="M 172 218 L 400 150" stroke="var(--ink)" stroke-width="2.5" marker-end="url(#touch-gel2)"/>
        <path d="M 828 218 L 600 150" stroke="var(--ink)" stroke-width="2.5" marker-end="url(#touch-gel2)"/>
        <text x="150" y="268" style="font-size:22px">lights</text>
        <text x="850" y="268" style="font-size:22px">lights</text>
      </g>
      <g class="b" data-step="6">
        <rect x="455" y="228" width="90" height="62" rx="8" fill="#fff" stroke="var(--ink)" stroke-width="3.5"/>
        <circle cx="500" cy="259" r="18" fill="var(--ink)"/>
        <path d="M 500 222 L 500 168" stroke="var(--ink)" stroke-width="2.5" marker-end="url(#touch-gel2)"/>
        <text x="500" y="312" style="font-size:22px">camera</text>
      </g>
    </svg>
  </div>
  ${cite('Checkershadow: ' + d11Link('Edward H. Adelson, MIT', 'http://persci.mit.edu/people/adelson/checkershadow_illusion') + ' · CC BY-SA 4.0 via Commons · GelSight drawn here after ' + d11Link('Yuan, Dong and Adelson (2017)', 'https://doi.org/10.3390/s17122762') + ', CC BY 4.0 · the Adelson link is ours, not the talk’s')}
`, { notes: [
  "(draft) One aside, and it is mine rather than his, so take it as a connection I am offering rather than something he said.",
  "(draft) You have seen this before, on Day 3. Adelson's checkershadow. Square A sits in the light and looks dark. Square B sits in the shadow and looks light. Everyone in this room knows what is coming and it does not help at all.",
  "(draft) They are the same grey. Not similar: the same. Your visual system is not reporting the light arriving at your eye, it is reporting its best guess at the surface that produced it, and it will not let you see otherwise even when you know.",
  "(draft) Now, the man who made that picture is Ted Adelson at MIT, and he is also the person behind GelSight, the tactile sensing tradition named in this talk. That connection is mine, not his, and I think it is the most interesting thing in the room.",
  "(draft) A slab of clear soft gel with an opaque coated skin on top. You press an object into it and the skin takes the shape of the object. It is a dent, nothing more. And because the skin is coated, it has the same reflectance everywhere, so you are no longer looking at the object's colour or its shininess, only at its shape.",
  "(draft) Lights come in from different directions at the sides, so the dent casts different shading depending on which light is on.",
  "(draft) And underneath, a camera. That is the whole sensor. You photograph the dent under several lights, and photometric stereo turns that shading back into a surface. The paper says it reaches one to two microns at best, and thirty to a hundred microns on a robot finger. So: a touch sensor made out of a camera, by the man who spent a career showing that seeing is inference rather than measurement. He built a way for a robot to feel by looking. Hold that against the metamerism argument at the end of the session: both are about what a sense actually delivers, which is never the world itself.",
]});

/* 3. What touch is worth (3 clicks). The bars are SCHEMATIC: the paper's numbers are not in the talk, only his
   spoken remark that without touch you reach about 85 rather than 99. The slide says so. */
{
  const COND = [['vision', .42], ['proprioception', .3], ['all three', .9], ['truth', 1]];
  const W = 900, x0 = 250, bw = 46, gap = 26, sx = 540;
  st(`
    <h1 class="t">What touch is worth</h1>
    <div class="d11-body">
      <svg class="d11-svg b" data-step="1" viewBox="0 0 ${W} ${COND.length * (bw + gap) + 60}" role="img" aria-label="Schematic: vision alone, proprioception alone, all three senses, and ground truth">
        ${COND.map(([lab, v], i) => { const y = 14 + i * (bw + gap);
          return `<text x="${x0 - 16}" y="${y + bw / 2 + 8}" style="text-anchor:end;font-size:23px">${lab}</text>
            <rect x="${x0}" y="${y}" width="${v * sx}" height="${bw}" rx="5" fill="var(--accent)" fill-opacity="${i === 2 ? 1 : .4}"/>`; }).join('')}
        
      </svg>
      <div class="d11-big b" data-step="2">85, not 99</div>
      <div class="lead b" data-step="3" style="text-align:center">Better senses beat more data</div>
      <svg class="d11-svg b" data-step="4" viewBox="0 0 1000 230" role="img" aria-label="A loop: the robot peels, a person judges, the policy learns">
      ${d11Arrow('touch-peel')}
      ${d11Box(60, 50, 250, 86, 'peel', { fs: 28 })}
      ${d11Box(375, 50, 250, 86, 'a person judges', { fs: 27 })}
      ${d11Box(690, 50, 250, 86, 'learn', { fs: 28 })}
      <path d="M 318 93 L 367 93" stroke="var(--ink)" stroke-width="3" marker-end="url(#touch-peel)"/>
      <path d="M 633 93 L 682 93" stroke="var(--ink)" stroke-width="3" marker-end="url(#touch-peel)"/>
      <path d="M 815 144 C 815 196, 185 196, 185 144" fill="none" stroke="var(--ink)" stroke-width="2.5" stroke-dasharray="8 6" marker-end="url(#touch-peel)"/>
    </svg>
      <div class="lead b" data-step="5" style="text-align:center">No reward function exists</div>
    </div>
    ${cite(TALK + ' · only the 85 and the 99 are said in the talk')}
  `, { notes: [
    "(draft) Here is the result that makes the case, and I want to be careful about what I am showing you.",
    "(draft) His group compared what a system knows from vision alone, from proprioception alone, and from the combination with touch, against ground truth. I have drawn the shape of that comparison and not its numbers, because the numbers are in the paper and not in the talk. Read the bars as a shape. The shape is that all three together come close to the truth, and any one alone does not.",
    "(draft) What he does say aloud is this. Skip touch and you will still get a demo, and you can cherry-pick it. But you will not get to ninety-nine percent. You will get to eighty-five. And that, he says, may be all the difference between being real and not.",
    "(draft) And there is a second finding that matters more for your projects than the first. With better sensing you need far fewer demonstrations: a few hundred, where a typical policy needs a few thousand. Better senses are worth more than more data.",
    "(draft) The task is peeling a vegetable with an ordinary knife, which needs position and force control together. They borrowed the trick from language models. A person looks at the result and says good job or bad job, and that judgement trains the policy.",
    "(draft) Because there is no reward function for peeling. Nobody can write one. So the human is the reward function. And his own verdict on the result, which I like: Michelin three-star restaurants do not have to worry just yet, but it is a step in the right direction.",
  ]});
}

/* 5. The conclusion (3 clicks). His sharpest claim; the quotation is spoken, not displayed. */
st(`
  <h1 class="t">Where he thinks the field is looking</h1>
  <div class="d11-body">
    <div class="d11-big b" data-step="1">“A distraction”</div>
    <div class="lead b" data-step="2" style="text-align:center">The recipe is solved. The egg is not.</div>
    <div class="d11-big b" data-step="3">99.99%<small>in a kitchen you have not seen</small></div>
  </div>
  ${cite(TALK)}
`, { notes: [
  "(draft) His closing slide, and it is a provocation aimed at the room he was standing in.",
  "(draft) He says focusing on vision-language models and vision-language-action models is a distraction for the robotics community, and that they are working on the wrong part of the problem. That is a strong thing to say at a conference full of people doing exactly that.",
  "(draft) His argument is the one we have been building all hour. A language model turns make an omelette into a recipe. That part is genuinely done, and it is the part everyone is excited about. The problem is cracking the egg.",
  "(draft) And not once, for a video. Ninety-nine point nine nine percent of the time, in a kitchen you have not seen, with an egg you have not held, on a counter with other things on it. Generalization across location, across objects in a category, across clutter. In his words: at the end we need language, because we have to talk to the robot, but that is the easy part. The hard part is the good old fight of contact, forces and trajectories. Aristotle is done. Euclid and Newton are not."
]});
}
