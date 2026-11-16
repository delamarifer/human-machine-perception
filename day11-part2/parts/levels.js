/* PART: levels (Day 11), about 11 minutes. Owner: Fernanda. Shared styles and helpers are in ../lib.js.

   Source: Jitendra Malik, "Vision and Robotics for Embodied AI" (Frontiers of Embodied AI, ETH Zurich, 2026),
   7:44 to 12:45, with the naming of the three levels taken from 42:02. Mapped in reference/malik-talk-map.md.
   The map was made from YouTube auto-generated captions, so his exact wording is approximate; nothing here is
   set in quotation marks, and the lines that are recognisably his are spoken from the notes, not displayed.

   Round 2 (2026-11-16): cut to the word budget in ../reference/check-slides.js. Every full sentence came off
   the screen and into the note; the photograph attributions moved into the citation line.

   Round 3 (2026-11-16): eight slides merged down to five, because the session as a whole read as repetitive.
   Nothing was deleted: each merge turns two slides into one slide with more clicks.
     1 + 2  -> Three levels                   (the journey, then the stack)
     3 + 4  -> The top level is solved         (the omelette, then action = movement + goal)
     5      -> Two words of English            (untouched by request; the best slide in the part)
     6      -> What lifting a glass takes      (untouched; the plot needs the full width of the screen)
     7 + 8  -> Touch, and the case for hands   (the receptors, then the credo)
   The forces plot and the receptor images could not share a screen at 1280x720 without shrinking the plot
   until its own labels stopped being readable, so the receptors merged into the credo instead. Same number
   of slides, and all seven image credits survive. See ../feedback/_day.md.

   No figure of his is used. The drawings are ours; the photographs are freely licensed and every one of them
   is logged in ../assets/levels/SOURCES.md with its author and licence, printed in the citation line as well.

   All notes are drafts. Every new class starts with lv-. */
{
section('Levels');

const LV_CITE = 'After ' + d11Link('Jitendra Malik, "Vision and Robotics for Embodied AI" (ETH Zurich, 2026)', MALIK_TALK);
const CC = {
  egg: 'photo Shixart1985, CC BY 2.0',
  sugar: 'photos Uwe Hermann (CC BY-SA 3.0) and Shixart1985 (CC BY 2.0)',
  skin: 'illustrations BruceBlaus, Blausen.com staff 2014, CC BY 3.0',
  hands: 'photos Gustavo A. Casañ (CC BY-SA 4.0) and Greenhill and Elias, Shadow Robot (CC BY-SA 3.0)'
};
const JF = d11Link('Johansson and Flanagan (2009)', 'https://doi.org/10.1038/nrn2621');

/* Local styles. Photographs are the colour in this part: the house rule forbids colouring words. */
if(!document.getElementById('lv-style')){
  const el = document.createElement('style'); el.id = 'lv-style';
  el.textContent = `
  .lv-pair{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1fr 1fr; gap:2.6vw; align-items:stretch; }
  .lv-quad{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1fr 1fr; grid-template-rows:1fr 1fr; gap:1.6vh 2.6vw; align-items:stretch; }
  .lv-shot{ min-height:0; display:flex; flex-direction:column; gap:1.1vh; }
  .lv-im{ flex:1 1 auto; min-height:0; border-radius:12px; overflow:hidden; background:#f1f5f9; border:1px solid var(--line); }
  .lv-im img{ width:100%; height:100%; object-fit:cover; display:block; }
  .lv-im img.lv-grip{ object-position:26% 34%; }
  .lv-im img.lv-hand{ object-position:50% 18%; }
  .lv-im img.lv-fit{ object-fit:contain; background:#fff; }
  .lv-shot b{ text-align:center; font-size:clamp(1.05rem, 1.85vw, 1.6rem); line-height:1.2; }
  .lv-eq{ display:flex; justify-content:center; align-items:center; gap:1.4vw; flex-wrap:nowrap; }
  .lv-eq > b, .lv-eq > span{ font-size:clamp(1.4rem, 2.7vw, 2.4rem); line-height:1.05; white-space:nowrap; }
  .lv-eq > span{ font-weight:300; }
  .lv-fma{ font-weight:700; font-size:clamp(2rem, 4vw, 3.6rem); line-height:1; text-align:center; }
  .lv-cue{ text-align:center; font-weight:700; font-size:clamp(1.3rem, 2.4vw, 2.1rem); line-height:1.2; }
  .lv-half{ min-height:0; display:flex; flex-direction:column; justify-content:center; gap:3vh; }
  @media (max-width: 820px), (max-aspect-ratio: 1/1){
    .lv-pair, .lv-quad{ grid-template-columns:1fr; grid-template-rows:auto; }
  }
  `;
  document.head.appendChild(el);
}

/* ---------------------------------------------------------------- 1. Why a hierarchy at all, and what the
   three levels are. Merged in round 3 from two slides: his trip to New York, which cannot be planned in
   muscle commands, and then the stack with his own names for the levels (the names come from 42:02).
   One drawing, seven clicks: the journey builds across the top, the stack builds underneath it. */
st(`
  <h1 class="t">Three levels</h1>
  <div class="d11-body">
    <svg class="d11-svg" viewBox="0 0 1000 470" role="img"
      aria-label="A journey drawn twice, as three plan steps and as a dense strip of muscle commands, and then the three levels of description stacked">
      ${d11Arrow('lv-trip-head')}
      <g class="b" data-step="1">
        ${d11Box(40, 18, 270, 68, 'to the airport', { fs: 25, fw: 600 })}
        <path d="M 322 52 L 358 52" fill="none" stroke="var(--ink)" stroke-width="3.5" marker-end="url(#lv-trip-head)"/>
        ${d11Box(366, 18, 270, 68, 'fly', { fs: 25, fw: 600 })}
        <path d="M 648 52 L 684 52" fill="none" stroke="var(--ink)" stroke-width="3.5" marker-end="url(#lv-trip-head)"/>
        ${d11Box(692, 18, 270, 68, 'across town', { fs: 25, fw: 600 })}
      </g>
      <g class="b" data-step="2">
        <text x="500" y="136" style="font-size:23px;font-weight:700">in muscle commands</text>
        <g stroke="var(--ink)" stroke-width="2" opacity=".75">
          ${Array.from({ length: 150 }, (_, i) => {
            const x = 44 + i * 6.1, h = 8 + ((i * 37) % 12);
            return `<line x1="${x.toFixed(1)}" y1="${180 - h}" x2="${x.toFixed(1)}" y2="${180 + h}"/>`; }).join('')}
        </g>
        <path d="M 44 208 L 960 208" fill="none" stroke="var(--ink)" stroke-width="2.5"/>
      </g>
      ${[['Goals and plans', 'Aristotle', 3], ['Motion in 4D', 'Euclid', 4], ['Forces and torques', 'Newton', 5]]
        .map(([a, name, step], i) => { const y = 238 + i * 78;
          return `<g>
            <g class="b" data-step="${step}">${d11Box(60, y, 420, 70, `<div><b>${a}</b></div>`, { fs: 28 })}</g>
            <g class="b" data-step="6"><text x="512" y="${y + 47}" style="text-anchor:start;font-size:30px;font-weight:700">${name}</text></g>
          </g>`; }).join('')}
      <g class="b" data-step="7">
        <path d="M 700 318 L 722 318 L 722 462 L 700 462" fill="none" stroke="var(--ink)" stroke-width="4"/>
        <text x="738" y="398" style="text-anchor:start;font-size:25px;font-weight:700">most of the action</text>
      </g>
    </svg>
  </div>
  ${cite(LV_CITE + ' · 7:44, and the three names at 42:02 · the strip of marks is a texture, not a count')}
`, { notes: [
  "(draft) This next part is the heart of the talk, and it is the bit I most want you to leave with, because it is a way of carving up the problem that works for anything a body does.",
  "(draft) Malik starts with a question about his own day. Suppose I want to go from here to New York. I can plan that. Get to the airport, fly, get across town. Three steps, and I can say the whole plan out loud in about four seconds. A language model could have written it for me.",
  "(draft) Now here is the same journey written out at the level his muscles actually work at. Every tick is a command to a muscle. This strip is a texture, not a count, so do not read a number off it. The point is the shape: it runs for two days, it is enormous, and not one piece of it is a sentence. He says it plainly: I cannot plan it at the level of muscle commands. So the plan and the movement cannot live at the same level of description. That is not a modelling convenience, it is forced on you, and anything that does both has to be a hierarchy.",
  "(draft) So he gives you three levels, and the rest of the hour hangs off them. Top: goals and plans. What counts as breakfast. What has to happen before what. This is where it joins up with everything we have called cognitive vision, understanding a scene as a situation rather than as a pile of pixels.",
  "(draft) Middle: motion trajectories in four dimensions. Three of space and one of time. Where the hand actually goes, and when it gets there. Not what you are doing, but the path.",
  "(draft) Bottom: forces and torques. How hard to squeeze, how hard to push, and when to give way because the thing is pushing back at you.",
  "(draft) At the very end of the talk he gives them names, and the names are good enough that I am going to use them from here on. The level of Aristotle, the level of Euclid, the level of Newton. Plans, geometry, forces.",
  "(draft) And his verdict is the sentence to take home: most of the action is at the level of Euclid and Newton. Not at the level of Aristotle. Which is awkward, because Aristotle is the only one of the three that our models are currently any good at."
]});

/* ---------------------------------------------------------------- 2. The top level, which really is solved,
   and then where language stops. Merged in round 3 from two slides: the omelette, and his fake equation.
   Left column is what language gives you, right column is what it leaves out. The recipe is five words
   because a recipe is already a compression of a skill, which is this slide's own argument. The steps are
   our own paraphrase of a standard method, not a transcript of any model. */
st(`
  <h1 class="t">The top level is solved</h1>
  <div class="d11-cols" style="align-items:stretch">
    <div class="lv-half">
      <div class="d11-chips b" data-step="1">
        <span>crack</span><span>whisk</span><span>butter</span><span>pour</span><span>fold</span>
      </div>
      <div class="lv-cue b" data-step="2">All of it correct</div>
      <div class="lv-shot b" data-step="3" style="flex:1 1 auto">
        <div class="lv-im"><img src="assets/levels/egg-crack.jpg" alt="Two hands breaking an egg open over a bowl"></div>
        <b>with a body?</b>
      </div>
    </div>
    <div class="lv-half">
      <div class="lv-eq b" data-step="4">
        <b>action</b><span>=</span><b>movement</b><span>+</span><b>goal</b>
      </div>
      <div class="lv-cue b" data-step="5">Good at the goal</div>
      <div class="lv-cue b" data-step="6">Language compresses</div>
      <div class="lv-cue b" data-step="7">Never the path</div>
    </div>
  </div>
  ${cite(LV_CITE + ' · 8:11 and 8:52 · he calls it a fake equation himself · the recipe steps are our own paraphrase of a standard method, not a model transcript · ' + CC.egg)}
`, { notes: [
  "(draft) He makes the top level concrete with breakfast, and so will I.",
  "(draft) Here is how you make an omelette. Crack the eggs into the bowl. Season them, and whisk until just frothy. Butter in the pan, medium high. Pour, and let it set a few seconds. Shake the pan while you pull the set edges in. Filling on one half, then tilt, fold, roll it out. Five words on the screen, and I just said the whole method in twenty seconds, which should already tell you something.",
  "(draft) In the talk he puts a language model answer on the screen, and the honest thing to say about it is that it is correct. Not nearly correct. Correct, complete, in the right order. For the level of Aristotle, large language models genuinely are the right tool, and they genuinely have the knowledge. This is not the part of the problem that is broken.",
  "(draft) And then he picks out one line of it. Crack the eggs into the bowl. Six words. Everyone in this room knows what they mean. His question is the whole talk in one sentence: how do you operationalise that in the body of a robot? Look at what those two hands are doing. Two contacts, a controlled fracture, a release that has to be fast enough that nothing drips and gentle enough that no shell goes in. The sentence does not contain any of that, and no amount of rereading it will put it there.",
  "(draft) So he writes down what he calls a fake equation. His phrase, not mine. It is not mathematics and there is nothing to solve; it is a way of splitting one word in two. Action equals movement plus goal. An action is a thing you did. A movement is the path your body took through space and time. A goal is what you were trying to bring about. Behaviour is goal directed, but it is achieved by moving in the physical world, and those are two different kinds of fact.",
  "(draft) Language is good at the goal half. Of course it is. A goal is exactly the kind of thing a sentence is built to carry. Make breakfast. Open the door. Pass me that.",
  "(draft) Language is bad at the movement half, and here is the part I want you to sit with, because it is not a bug anyone can fix. Language is a compression device. The whole value of the word breakfast is that it does not make you say the other million things. Compression is what it is for.",
  "(draft) Which means a sentence never specifies a trajectory. It was built to leave that out. So when you train a model on all the text there has ever been, the movement half of every action in that text was deleted before you got there. It is not missing from your dataset. It was never in any dataset."
]});

/* ---------------------------------------------------------------- 3. Why verbs under-specify. His own
   example: a one centimetre sugar cube and a big heavy tray, both "pick up". Two photographs, three words
   between them, and the argument spoken. LEFT EXACTLY AS IT WAS in round 3, by request. */
st(`
  <h1 class="t">Two words of English</h1>
  <div class="d11-body">
    <div class="d11-big b" data-step="1">pick up</div>
    <div class="lv-pair">
      <div class="lv-shot b" data-step="2">
        <div class="lv-im"><img src="assets/levels/sugar-cubes.jpg" alt="Close photograph of sugar cubes on a dark cloth"></div>
        <b>one centimetre</b>
      </div>
      <div class="lv-shot b" data-step="3">
        <div class="lv-im"><img src="assets/levels/tray-waiter.jpg" alt="A waiter carrying a loaded tray of coffee cups on one hand"></div>
        <b>a loaded tray</b>
      </div>
    </div>
    <div class="lv-cue b" data-step="4">Same words. Different problem.</div>
  </div>
  ${cite(LV_CITE + ' · 9:32 · ' + CC.sugar)}
`, { notes: [
  "(draft) And then he gives the example that I think is the best teaching object in the whole talk, and it is two words long.",
  "(draft) Pick up. One verb. One entry in the dictionary. In English it is a single thing you can ask someone to do, and nobody is ever confused about what you meant.",
  "(draft) Here is picking up a sugar cube. One centimetre. Two fingertips, almost no force at all, and a grip that has to be gentle enough not to crumble it and firm enough not to drop it, and the gap between those two is small.",
  "(draft) And here is picking up a loaded tray. Same two words. Now it is a whole arm and a shoulder, it is heavy, the load shifts as the cups move, and it is a balance problem that keeps changing while you walk. Nothing about this trajectory resembles the other one.",
  "(draft) So here is the lesson. The semantics is what the word captures: in both cases, something is now off the surface and in your hand, and that is genuinely the same fact. The motion trajectory is not in the word at all, and it varies enormously. Which is why a model that has read everything knows perfectly well what picking up is, and has never once been told how. Hold on to this when you read a paper that claims a verb as a unit of action."
]});

/* ---------------------------------------------------------------- 4. Forces: the bottom level. The plot
   is a SCHEMATIC drawn here. No axis carries a number, because no measurement of ours is behind it; the
   real measurements are Johansson and Flanagan's and the citation line says so. Left unmerged in round 3:
   the plot needs the full width of the screen, or its own labels stop being readable from the back. */
st(`
  <h1 class="t">What lifting a glass takes</h1>
  <div class="d11-body">
    <div class="b" data-step="1">
      <div class="lv-fma">F = ma</div>
      <div class="d11-tag">force moves mass</div>
    </div>
    <svg class="d11-svg" viewBox="0 0 1000 440" role="img"
      aria-label="Schematic plot of grip force and load force over time during a lift, with contact events marked">
      ${d11Arrow('lv-force-head')}
      <path d="M 110 352 L 110 44" fill="none" stroke="var(--ink)" stroke-width="3" marker-end="url(#lv-force-head)"/>
      <path d="M 110 352 L 962 352" fill="none" stroke="var(--ink)" stroke-width="3" marker-end="url(#lv-force-head)"/>
      <text x="72" y="200" transform="rotate(-90 72 200)" style="font-size:21px">force</text>
      <text x="946" y="386" style="text-anchor:end;font-size:21px">time</text>
      <g class="b" data-step="2">
        <path d="M 118 340 L 268 340 C 320 340, 380 240, 436 230 L 760 230 C 800 230, 830 340, 862 340 L 930 340"
          fill="none" stroke="var(--ink)" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M 132 134 L 184 134" fill="none" stroke="var(--ink)" stroke-width="3.5"/>
        <text x="196" y="141" style="text-anchor:start;font-size:23px">load force</text>
      </g>
      <g class="b" data-step="3">
        <path d="M 118 340 L 268 340 C 320 340, 380 162, 436 150 L 760 150 C 800 150, 830 340, 866 340 L 930 340"
          fill="none" stroke="var(--ink)" stroke-width="5.5" stroke-linecap="round"/>
        <path d="M 132 78 L 184 78" fill="none" stroke="var(--ink)" stroke-width="5.5"/>
        <text x="196" y="85" style="text-anchor:start;font-size:23px;font-weight:700">grip force</text>
        <path d="M 268 195 L 800 195" fill="none" stroke="var(--ink)" stroke-width="2.5" stroke-dasharray="10 8"/>
        <path d="M 132 106 L 184 106" fill="none" stroke="var(--ink)" stroke-width="2.5" stroke-dasharray="10 8"/>
        <text x="196" y="113" style="text-anchor:start;font-size:23px;fill:var(--mute)">it slips below this</text>
      </g>
      <g class="b" data-step="4">
        ${[[268, 'touch'], [436, 'lift off'], [760, 'set down']].map(([x, t]) =>
          `<path d="M ${x} 160 L ${x} 352" fill="none" stroke="var(--ink)" stroke-width="2" stroke-dasharray="3 7"/>
           <text x="${x}" y="378" style="font-size:21px">${t}</text>`).join('')}
      </g>
      <text x="500" y="424" style="font-size:19px;fill:var(--mute)">schematic, no numbers</text>
    </svg>
  </div>
  ${cite(LV_CITE + ' · 10:14 · shape of the curves after ' + JF + ', which is where the real measurements are')}
`, { notes: [
  "(draft) Bottom of the stack. The level of Newton, and this is where he spends the rest of the hour.",
  "(draft) F equals m a. Force is mass times acceleration, which in words means: if you want to change how something is moving, something has to push on it. That is the whole of the physics in this session, and I am not going to do any more of it, because the interesting thing is not the equation. The interesting thing is what your hand is quietly solving every time you pick up a glass. Four things at once. Hold it hard enough that friction stops it slipping out. But not so hard that you crush it, which for a paper cup is a genuinely narrow window. Carry its weight against gravity the entire time. And start the whole calculation again at every contact event.",
  "(draft) Here is the shape of it, and this is a schematic I drew, not data, which is why there are no numbers on either axis. The lower curve is load force: the weight you are actually taking. It is zero while the glass is on the table, it climbs as you start to lift, and it is flat while you carry.",
  "(draft) The upper curve is grip force, how hard you are squeezing. Notice two things. It tracks the load force, and it rises before the load does, because you grip first and lift second. And it stays above that dashed line, which is the force below which the glass slips. Your nervous system keeps a margin there. Not a huge one, because squeezing hard is expensive and things break, but never zero.",
  "(draft) And these vertical lines are the contact events: touch, lift off, set down. Each one is a discontinuity. The physics of the situation changes in a few milliseconds, and your hand has already changed what it is doing. Nothing at the level of Aristotle knows these moments exist. The real measurements of all this are in Johansson and Flanagan, and the link is on the slide."
]});

/* ---------------------------------------------------------------- 5. The skin signal, and the credo.
   Merged in round 3 from two slides. Top row is what a hand has: Malik names Merkel and Meissner receptors
   at 10:14, and the receptor roles themselves are textbook touch physiology, cited in the citation line.
   Bottom row is what robots have, and what he thinks they should have. He explicitly refuses to argue the
   last one and calls it an article of faith; the note keeps that framing rather than the slide presenting
   it as a result. The wine bottle is spoken. */
st(`
  <h1 class="t">Touch, and the case for hands</h1>
  <div class="d11-body">
    <div class="lv-quad">
      <div class="lv-shot b" data-step="1">
        <div class="lv-im"><img class="lv-fit" src="assets/levels/skin-merkel.jpg" alt="Diagram of a section of skin with a Merkel cell shown enlarged"></div>
        <b>Merkel: steady pressure</b>
      </div>
      <div class="lv-shot b" data-step="2">
        <div class="lv-im"><img class="lv-fit" src="assets/levels/skin-meissner.jpg" alt="Diagram of a section of skin with a Meissner tactile corpuscle shown enlarged"></div>
        <b>Meissner: the first slip</b>
      </div>
      <div class="lv-shot b" data-step="3">
        <div class="lv-im"><img class="lv-grip" src="assets/levels/gripper-jaw.jpg" alt="The two fingered parallel jaw gripper of a Baxter robot in a laboratory"></div>
        <b>two points, neither signal</b>
      </div>
      <div class="lv-shot b" data-step="4">
        <div class="lv-im"><img class="lv-hand" src="assets/levels/hand-bulb.jpg" alt="A multi fingered robot hand holding a light bulb"></div>
        <b>a power grasp</b>
      </div>
    </div>
    <div class="lv-cue b" data-step="5">A belief, he says: you need hands</div>
  </div>
  ${cite(LV_CITE + ' · 10:14 and 11:42 · receptor roles after ' + JF + ' · ' + CC.skin + ' · ' + CC.hands)}
`, { notes: [
  "(draft) So how does your hand know any of that? Not by looking. You can do all of it in the dark, and you can do it with the glass hidden behind a newspaper.",
  "(draft) It knows because the skin of your fingertip is an instrument. Malik names two of the receptors, and they divide the job between them. Merkel endings report steady pressure that is being held: how hard you are squeezing at this instant, and the shape of the thing pressing into you.",
  "(draft) Meissner corpuscles, which this illustration calls tactile corpuscles, report change. Flutter, the moment of first contact, and crucially the first tiny slip, before the object has actually gone anywhere. That is the signal that makes you tighten your grip without ever deciding to.",
  "(draft) Now compare the robot. Here is the standard hand. Two jaws, two points of contact, and it opens and closes, and almost everything you have ever seen a robot arm do was done with one of these. It has neither of those receptors. It has a position, and sometimes a single number for how hard the jaws are closed, and it finds out that the glass slipped by watching it fall. Keep that gap in your head when we talk, in a few minutes, about where robot training data is supposed to come from, because the usual answers do not contain this signal either. And the reason he raises the gripper at all is that everyday tasks done this way have high failure rates. Not exotic tasks. Everyday ones.",
  "(draft) And here is the other kind. Many fingers, many contacts spread around the object, and a margin: if one contact gives, the others are still there. Look at what that hand is holding. A light bulb is thin glass, it is slippery, and it is the wrong shape for two jaws.",
  "(draft) Last thing in this section, and he is unusually honest about what kind of claim it is. This is the first of two beliefs he flags as beliefs: this one is about hands, and the second one, much later, is about touch. He says, more or less: I am going to state this as an article of faith, and I am not going to argue for it. I am repeating that framing rather than quietly upgrading it into a finding, because you should know which claims in a talk are evidence and which are a bet. His line is about wine. If that bottle were worth 250 dollars, you would want a power grasp rather than a two point grasp. You would want your whole hand around it. And then the sentence that tells you he means it: everything we do in my lab, we do not do parallel jaw grippers. Whether he is right is one of the genuinely open questions in the field, and it is also an argument about what kind of body a thing needs before it can be said to understand the physical world at all."
]});
}
