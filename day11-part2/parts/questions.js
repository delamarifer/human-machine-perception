/* PART: questions (Day 11), about 9 minutes. Owner: Fernanda. Shared styles and helpers are in ../lib.js.
   The two questions from the floor at the end of the talk, 43:25 to 50:28 (see ../reference/malik-talk-map.md).
   The second one is why this part exists: asked whether crude physics simulators are good enough, Malik answers
   with metamerism and colour vision, which is Day 3 of this course seen from the other side.

   Round 2 (2026-11-16): cut to the word budget in ../reference/check-slides.js. The questions from the floor
   are now a few words on screen and the full question in the note; the quotations are read aloud rather than
   displayed; the metamerism figure keeps its labels under six words each. It was 67 words a slide.

   Captions are auto-generated, so his wording is approximate: they spell metamerism "metamarism" and
   von Uexkull "Fonikul". All notes are drafts, for Fernanda to replace with her own words. */
{
section('Questions');

/* styles for this part only (every class starts with q-) */
(() => {
  if(document.getElementById('q-style')) return;
  const el = document.createElement('style'); el.id = 'q-style';
  el.textContent = `
  .q-ask{ margin:0 auto; border:2px dashed var(--ink); border-radius:999px; padding:1.1vh 2vw;
    font-size:clamp(1.2rem, 2.2vw, 2rem); font-weight:600; }
  `;
  document.head.appendChild(el);
})();

const TALK = 'After ' + d11Link('Jitendra Malik, "Vision and Robotics for Embodied AI" (ETH Zurich, 2026)', MALIK_TALK) + ', questions from the floor';

/* 1. The first question (3 clicks): perception for the task. Gibson and von Uexkull are named on screen and
   explained in the notes; the argument itself is spoken. */
st(`
  <h1 class="t">The first question</h1>
  <div class="d11-body">
    <div class="q-ask b" data-step="1">Shouldn't perception follow the task?</div>
    <div class="lead b" data-step="2" style="text-align:center">Gibson · von Uexkull · the Umwelt</div>
    <div class="lead b" data-step="3" style="text-align:center">A fly, yes. You, no.</div>
  </div>
  ${cite(TALK)}
`, { notes: [
  "(draft) Two questions came from the floor, and both are more useful to us than parts of the talk.",
  "(draft) The first is a real challenge. The questioner says: you defined robotics as perception connected to action, but surely it is the other way round. You have a task, and the task tells you what to look at. You do not have to perceive everything, only what the task needs.",
  "(draft) Malik says nothing he said contradicts that, and names the people who got there first. Gibson: we see in order to move and we move in order to see. And before Gibson, von Uexkull, who gave us the Umwelt, the world as it exists for a particular animal with particular senses. A tick's world is three signals wide.",
  "(draft) But then he draws the line. For a fly, yes, perception really is built for the task, directly and cheaply. For us, the range of tasks is so wide that vision ends up general purpose. And so his practical conclusion, which he says he has hard evidence for from navigation: train a vision encoder from scratch inside one task and it overfits to the handful of trajectories you happened to explore, and then it does not work. Bring a model trained on millions of images instead, and let the task steer how it is used. He adds that he does not know how to do that steering well. That is an open problem, and it would make a good project."
]});

/* 3. The answer (4 clicks). The infinite spectrum collapsing onto three cones, and the world collapsing onto a
   robot's few contacts. Every label is three words or fewer; the argument is in the notes.
   The spectrum is drawn as a band of lines: no wavelength values are claimed. */
{
  const W = 1000, H = 330;
  st(`
    <h1 class="t">Metamerism, from the other side</h1>
    <div class="q-ask b" data-step="1">Is the simulated physics good enough?</div>
    <div class="d11-big b" data-step="2">“No detailed physics”</div>
    <svg class="d11-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="An infinite spectrum collapsing onto three cone types, and the world collapsing onto a robot's few contacts">
      ${d11Arrow('q-head')}
      <g class="b" data-step="3">
        ${Array.from({length: 46}, (_, i) => `<line x1="${60 + i * 6}" y1="56" x2="${60 + i * 6}" y2="142" stroke="var(--ink)" stroke-width="2" stroke-opacity="${.18 + (i % 7) * .1}"/>`).join('')}
        <text x="190" y="176" style="font-size:22px">infinitely many spectra</text>
      </g>
      <g class="b" data-step="4">
        <path d="M 350 99 L 430 99" stroke="var(--ink)" stroke-width="3" marker-end="url(#q-head)"/>
        ${[0, 1, 2].map(i => `<circle cx="${480 + i * 78}" cy="99" r="30" fill="#fff" stroke="var(--ink)" stroke-width="3.5"/>`).join('')}
        <text x="558" y="176" style="font-size:22px">three cones</text>
      </g>
      <g class="b" data-step="5">
        <path d="M 680 99 L 760 99" stroke="var(--ink)" stroke-width="3" marker-end="url(#q-head)"/>
        <text x="865" y="107" style="font-weight:700;font-size:26px">one colour</text>
      </g>
      <g class="b" data-step="6">
        <line x1="60" y1="218" x2="940" y2="218" stroke="var(--line)" stroke-width="2"/>
        <text x="150" y="268" style="font-size:22px">the whole world</text>
        <path d="M 290 260 L 370 260" stroke="var(--ink)" stroke-width="3" marker-end="url(#q-head)"/>
        <text x="520" y="268" style="font-size:22px">feet and fingertips</text>
        <path d="M 690 260 L 770 260" stroke="var(--ink)" stroke-width="3" marker-end="url(#q-head)"/>
        <text x="865" y="268" style="font-weight:700;font-size:26px">one feel</text>
      </g>
    </svg>
    ${cite(TALK + ' · the spectrum is drawn as a band, not as measured values')}
  `, { notes: [
    "(draft) The second question is the one I brought you here for, and I am going to read both halves rather than summarise. The words are from the auto-generated captions, lightly cleaned; the raw text is in reference/metamerism-qa.md.",
    "(draft) The question, from the floor: You said that the sim-to-real gap is just an engineering problem. So my question is: do you think that we are able to model the physics and its complexity, especially for dexterous manipulation, with a classical physics engine, also for deformable objects, which are harder to model? Or do you think that through video models we could learn in latent space, extract physics by learning through video itself? And the answer begins: I think everything should be tried, certainly simulators learned from world models trained on lots of videos; we can also use physics simulators. And then: I want to make one point, which is that we do not need detailed physics. That is the claim that sounds reckless, and the explanation is something you already know. It is from Day 3.",
    "(draft) And you have seen the left half of this picture before.",
    "(draft) Light arriving at your eye is a distribution over wavelengths. It is infinite-dimensional: there are infinitely many ways to make a spectrum.",
    "(draft) And it lands on three cone types. Three numbers. That is the whole of what your visual system ever receives about colour.",
    "(draft) Which is why three primaries mix any colour, and why two completely different spectra can look identical. That is metamerism, and when we met it on Day 3 we met it as a limitation: a failure of the eye, the thing that makes colour illusions work.",
    "(draft) Now the move, and here are the actual words, so you can hear him arrive at it. Just take locomotion as an example. The simulator just used fractal terrains. Now, fractal terrains do not capture the full variety of the real world, like walking on a beach. But it turns out that these are proxies. See, the world manifests itself to the robot through a low-dimensional interface. And the low-dimensional interface is the actuators and the joints and the hands and the feet. So essentially you are going to have a metamerism problem. But metamerism here is good. In human perception, colour vision is mediated through three cone types. The distribution of light wavelengths is infinite, but it is all projected down to this three-dimensional subspace. That is why you can mix colours and create new ones with just a basis set of three. So the same thing is happening in manipulation. You have your end effectors, you are going to feel forces through them, and you have to stay balanced. So you essentially have a low-dimensional interface and a low-dimensional latent. The full complexity of the world does not matter. It is the projection onto this latent space. That is the whole answer, and it is the same mathematics as Day 3 with the opposite moral: there it was why your eye can be fooled, here it is why a robot can be trained in a world that does not exist."
  ]});
}

/* 4. The follow-up and the discussion (2 clicks). */
st(`
  <h1 class="t">And then the follow-up</h1>
  <div class="d11-body">
    <div class="q-ask b" data-step="1">But how would you know it was wrong?</div>
    <div class="question b" data-step="2" style="text-align:center">What is a metamer for your project?</div>
  </div>
  ${cite(TALK)}
`, { notes: [
  "(draft) The questioner does not let it go, and the follow-up is the right one.",
  "(draft) Again in their words. The questioner: But could one not argue that humans actually get feedback from the real world, whereas in the simulator you only get feedback from the simulator? So if the physics priors are wrong for, let us say, a deformable object. And the answer, which is the honest one rather than the clever one: The classic answer, all models are wrong but some models are useful. So the question is, are they good enough for certain purposes, and I think that depends. I cannot give a crisp, universal answer, but that is where there is some modelling to be done. In locomotion we have simulators which are very crude and yet we could train policies which worked. In dexterous manipulation the demands are much greater. So currently we could build better simulators, but they would be too slow. I think all this will get solved over time.",
  "(draft) So here is your question, two minutes in pairs, and I want you to take it into your projects. What is the low-dimensional interface in your system? What could you swap for the real thing without your model ever noticing? And then the uncomfortable half: how would you ever find out that you were wrong?"
]});

/* 5. Watch the original (1 click). The opening note promises this slide, so it has to exist. The old Moravec
   version of this session ended on it; the reorder dropped it and this puts it back. Needs internet. */
st(`
  <h1 class="t">Go and watch it</h1>
  <div class="d11-watch b">
    <div class="d11-paper">
      <b>Jitendra Malik · Vision and Robotics for Embodied AI</b>
      <span>Frontiers of Embodied AI, ETH Zurich · 50 minutes · the course it comes from: ${d11Link('robots-that-learn.github.io ↗', MALIK_COURSE)}</span>
    </div>
    <iframe class="d11-embed" src="https://www.youtube.com/embed/${'HvDU7Vk4pbc'}" title="Jitendra Malik: Vision and Robotics for Embodied AI" allowfullscreen></iframe>
  </div>
`, { notes: [
  "(draft) Last thing. This whole hour was one talk, and you should go and watch it rather than take my compression of it.",
  "(draft) Fifty minutes, and he is a good speaker. He is also one of the people who built modern computer vision, which is what makes him worth listening to on what it has not done. His whole Berkeley course on this is public as well, twenty lectures of slides, and the link is on the slide and in the notes online. If you are looking for a final project in this direction, start there. And if you disagree with him, that is the right response: two of the claims in this hour he told us himself were beliefs rather than results."
]});
}
