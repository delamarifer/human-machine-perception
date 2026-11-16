/* PART: data (Day 11), about 14 minutes. Owner: Fernanda. Shared styles and helpers are in ../lib.js.
   Covers the talk 12:45 to 19:12, chapter 4 of ../reference/malik-talk-map.md — the three standard answers to
   "where does robot data come from", and him knocking all three down. The part stops in the corner on purpose;
   Turing and the child belong to parts/child.js.

   Round 2 (2026-11-16): cut to the word budget in ../reference/check-slides.js. Every full sentence that was
   on the screen is now in the note instead, and both quotations are read aloud rather than displayed. Figure
   labels are nouns, not sentences. The sourcing and honesty lines that used to sit in the body as captions are
   now in the citation line, which is still on the slide face but is not competing with the cue for attention.
   Nothing was dropped: the reward slide lost its ten named terms and gained the thing that was the argument
   all along, which is the length of the list.

   Round 3 (2026-11-16): the part is four slides instead of ten. Nothing was deleted. The old slides are now
   beats of four builds, joined with sub:true, so they share one slide number and there is no white lead-in
   between them: the five teleoperation beats play as one slide called "Where the data comes from". Each beat
   keeps the wording of its old title as a kicker under the group title (.d11-data-head), so no idea lost its
   label. The clip of the rig at 13:38 is new, at Fernanda's request, embedded from the talk itself.

   One photograph, public domain, credited on the slide and in assets/data/SOURCES.md. One embedded video,
   from the project's own channel. Everything else is drawn here as inline SVG. All notes are drafts.
   Avoid apostrophes inside these strings: where his words need one, it is written as &#39;. */
{
section('Data');

/* Styles for this part only. Every class starts with d11-data-. */
(() => {
  if(document.getElementById('d11-data-style')) return;
  const el = document.createElement('style'); el.id = 'd11-data-style';
  el.textContent = `
  .d11-data-cue{ font-size:clamp(1.3rem, 2.3vw, 2.1rem); line-height:1.25; font-weight:600; }
  /* a kicker under the slide title: what this beat of the build is about. It carries the wording the
     old per-slide titles used to carry, now that five of those slides are one slide. */
  .d11-data-head{ text-align:center; color:var(--mute); font-weight:700; letter-spacing:.07em;
    text-transform:uppercase; font-size:clamp(.95rem, 1.5vw, 1.35rem); margin:-.6vh 0 1vh; }
  `;
  document.head.appendChild(el);
})();

/* 1. The three candidates (3 clicks). Nouns only; what each one is goes in the note. */
st(`
  <h1 class="t">Where the data comes from</h1>
  <div class="d11-body">
    <svg class="d11-svg" viewBox="0 0 1000 330" role="img"
      aria-label="Three panels: a human driving a robot, a person wearing a head camera, and a physics engine">
      ${d11Arrow('d11-data-h1')}

      <g class="b" data-step="1">
        <rect x="40" y="40" width="260" height="150" rx="14" fill="#fff" stroke="var(--ink)" stroke-width="3"/>
        <circle cx="108" cy="88" r="15" fill="#fff" stroke="var(--ink)" stroke-width="3"/>
        <path d="M 108 103 L 108 152 M 108 116 L 140 128" fill="none" stroke="var(--ink)" stroke-width="3" stroke-linecap="round"/>
        <rect x="217" y="74" width="32" height="28" rx="5" fill="#fff" stroke="var(--ink)" stroke-width="3"/>
        <path d="M 233 102 L 233 152 M 233 116 L 201 128" fill="none" stroke="var(--ink)" stroke-width="3" stroke-linecap="round"/>
        <path d="M 142 130 L 199 130" fill="none" stroke="var(--ink)" stroke-width="2.5" stroke-dasharray="7 6"/>
        <path d="M 80 158 L 260 158" fill="none" stroke="var(--line)" stroke-width="4"/>
        ${d11Box(40, 212, 260, 76, 'Teleoperation', { fs: 27 })}
      </g>

      <g class="b" data-step="2">
        <rect x="360" y="40" width="260" height="150" rx="14" fill="#fff" stroke="var(--ink)" stroke-width="3"/>
        <path d="M 496 74 L 572 52 L 572 108 Z" fill="var(--ink)" fill-opacity=".13"/>
        <circle cx="470" cy="106" r="26" fill="#fff" stroke="var(--ink)" stroke-width="3"/>
        <rect x="456" y="68" width="40" height="22" rx="4" fill="#fff" stroke="var(--ink)" stroke-width="3"/>
        <circle cx="490" cy="79" r="5.5" fill="var(--ink)"/>
        <path d="M 470 132 L 470 162" fill="none" stroke="var(--ink)" stroke-width="3" stroke-linecap="round"/>
        ${d11Box(360, 212, 260, 76, 'Videos of humans', { fs: 27 })}
      </g>

      <g class="b" data-step="3">
        <rect x="680" y="40" width="260" height="150" rx="14" fill="#fff" stroke="var(--ink)" stroke-width="3"/>
        <rect x="730" y="62" width="160" height="104" rx="8" fill="#fff" stroke="var(--ink)" stroke-width="3"/>
        <path d="M 748 142 L 872 142" fill="none" stroke="var(--line)" stroke-width="5"/>
        <rect x="794" y="82" width="34" height="34" rx="4" fill="var(--ink)" fill-opacity=".2" stroke="var(--ink)" stroke-width="3"/>
        <path d="M 811 120 L 811 136" fill="none" stroke="var(--ink)" stroke-width="2.5" marker-end="url(#d11-data-h1)"/>
        <path d="M 786 76 L 786 68 M 836 76 L 836 68" fill="none" stroke="var(--ink)" stroke-width="2.5" stroke-linecap="round"/>
        ${d11Box(680, 212, 260, 76, 'Simulation', { fs: 27 })}
      </g>
    </svg>
  </div>
  ${cite(MALIK_CITE)}
`, { notes: [
  "(draft) So the wall is data. Where would the data come from? There are three answers a roboticist would give you, and the interesting thing about this part of the talk is that Malik puts all three up and then takes all three down, one after another, and ends by saying he has argued himself into a corner. The demolition is more instructive than any of the three methods.",
  "(draft) The first and by far the most common: teleoperation. A human sits at a leader arm, the robot is the follower, and whatever the human does the robot copies. You record the robot. This is what the large manipulation datasets are made of, and there are a great many people around the world doing this right now as a job.",
  "(draft) The second: just use video of humans. Either first-person, from a camera on someone's head, or third-person. If you are a computer vision person this is the obvious answer, because the data already exists in enormous quantity.",
  "(draft) The third: simulation. Put the robot in a physics engine and let it practise. This is what worked for the two problems that are not stuck, and we will come back to that. Hold all three in your head. We are going to lose all three."
]});

/* 2. Teleoperation (4 clicks). Public domain NASA photograph; what it is and is not is now in the cite line,
      which is still on the slide face but is not competing with the cues. */
st(`
  <h1 class="t">Where the data comes from</h1>
  <div class="d11-data-head">candidate one: teleoperation</div>
  <div class="d11-cols">
    <div class="d11-media b" data-step="1">
      <img src="assets/data/teleop-robonaut2-iss.jpg" alt="An astronaut wearing a head-mounted display drives a humanoid robot whose white hands are raised in the foreground">
    </div>
    <div class="d11-side">
      <div class="d11-data-cue b" data-step="2">Leader and follower</div>
      <div class="d11-data-cue b" data-step="3">A human behaving like a robot</div>
      <div class="d11-data-cue b" data-step="4">Vision only. No touch.</div>
    </div>
  </div>
  ${cite('Photograph: NASA, ISS035-E-030791, public domain — an astronaut on the ISS, not a data-collection rig · ' + MALIK_CITE)}
`, { sub: true, notes: [
  "(draft) Start with the one that is actually working, in the sense that it is what the field is doing. Teleoperation.",
  "(draft) This photograph is not one of those rigs. It is an astronaut on the space station driving Robonaut 2, and I am using it because it is public domain and because it has exactly the right shape: a person with a display strapped to their face, hands inside controllers, and the robot's hands moving in front of them. Hold that picture.",
  "(draft) The arrangement is called leader and follower. The human moves the leader arm, the follower arm copies, and what gets recorded is the follower. So the dataset is in the robot's body, which is exactly what we said we needed.",
  "(draft) Here is Malik's objection, and notice that it is not a technical objection at all. It is about the human. To collect this data you have to make a person behave like a robot, for hours. He is blunt about how unpleasant that is, and the point underneath is serious: the job is tedious, physically awkward, and done at scale by thousands of people.",
  "(draft) And the reason it is so awkward is this: the only sense you have is vision. There is no haptic feedback. You are a puppeteer. You are reaching for a cup you cannot feel, with hands that are not yours, watching through a screen. Try to imagine doing anything delicate under those conditions for a whole afternoon."
]});

/* 2B. The rig on video (1 click). Fernanda asked for this clip. It is embedded from the talk itself, from
      13:38, which is linking and not copying: nothing of his is in this repository. The note says what to do
      if the room has no internet. */
st(`
  <h1 class="t">Where the data comes from</h1>
  <div class="d11-data-head">teleoperation on video</div>
  <div class="d11-watch b" data-step="1">
    <div class="d11-paper">
      <b>Watch someone be the robot</b>
      <span>${d11Link('the talk, from 13:38 \u2197', MALIK_TALK + '&t=818s')}</span>
    </div>
    <iframe class="d11-embed" src="https://www.youtube.com/embed/HvDU7Vk4pbc?start=818"
      title="Jitendra Malik, Vision and Robotics for Embodied AI, from 13 minutes 38 seconds" allowfullscreen></iframe>
  </div>
  ${cite('Video embedded from the talk itself, from 13:38 \u00b7 ' + MALIK_CITE)}
`, { sub: true, notes: [
  "(draft) Rather than take my word for how awkward this is, watch it.",
  "(draft) This is his own talk, from thirteen minutes thirty-eight, where he plays the rig at work. Watch the operator and not the robot: watch how long an ordinary household movement takes when the person doing it cannot feel anything and is looking at a screen. If the room has no internet, say that out loud and describe it instead, and the next beat gives you the number anyway."
]});

/* 3. The 5x speed-up (3 clicks). The single most quotable fact in the section, on its own slide. The health
      warning — his characterisation of the practice, not a measurement — has moved to the cite line. */
st(`
  <h1 class="t">Where the data comes from</h1>
  <div class="d11-data-head">the trajectories were slow</div>
  <div class="d11-body">
    <div class="d11-big b" data-step="1">5×</div>
    <svg class="d11-svg" viewBox="0 0 1000 210" role="img"
      aria-label="A long bar for what the operator did, and a bar one fifth as long for what the audience is shown">
      <g class="b" data-step="2">
        <text x="70" y="28" style="text-anchor:start;font-size:24px;font-weight:700">what was recorded</text>
        <rect x="70" y="42" width="860" height="48" rx="8" fill="#fff" stroke="var(--ink)" stroke-width="3"/>
        ${Array.from({length: 19}, (_, i) => `<path d="M ${113 + i * 43} 42 L ${113 + i * 43} 90" stroke="var(--line)" stroke-width="3"/>`).join('')}
      </g>
      <g class="b" data-step="3">
        <text x="70" y="140" style="text-anchor:start;font-size:24px;font-weight:700">what you were shown</text>
        <rect x="70" y="154" width="172" height="48" rx="8" fill="var(--ink)" fill-opacity=".5" stroke="var(--ink)" stroke-width="3"/>
      </g>
    </svg>
  </div>
  ${cite(MALIK_CITE + ' — a characterisation of how these results are presented, not a measurement of any one paper')}
`, { sub: true, notes: [
  "(draft) Now the consequence, and this is the bit I would like you to remember out of the whole session.",
  "(draft) Because the person is working under those conditions, the trajectories they produce are slow and clumsy. So when you see a teleoperation result in a paper or on a project page, what you are usually watching has been sped up. Malik puts the figure at five times. I want to be careful: that is his characterisation of the practice in general, not a measurement of any particular paper, and some groups do label their videos honestly.",
  "(draft) This is what was recorded. A long, laborious, hesitant reach for a cup, with the operator peering at a screen and feeling nothing. Each of those ticks is a second of somebody's afternoon.",
  "(draft) And this is what you were shown. The same trajectory, five times faster, and it looks crisp and purposeful. Nothing dishonest has necessarily happened — but it does mean that the smoothness you read as competence is an artifact of the edit, and that the underlying data is a record of a person struggling. If you are going to clone that behaviour, that is what you are cloning."
]});

/* 4. Strong objection against weak objection (3 clicks). The methodological point of the section: he separates
      what money can fix from what it cannot, and only the second one is a research problem. */
st(`
  <h1 class="t">Where the data comes from</h1>
  <div class="d11-data-head">two objections</div>
  <div class="d11-body">
    <svg class="d11-svg" viewBox="0 0 1000 250" role="img"
      aria-label="Two objections side by side: human sensorimotor limits, which money cannot fix, and the domain gap, which money probably can">
      <g class="b" data-step="1">
        ${d11Box(40, 30, 440, 92, 'Human sensorimotor limits', { fs: 27 })}
        ${d11Box(40, 142, 440, 72, 'money cannot fix this', { dash: true, fs: 23, color: 'var(--mute)' })}
      </g>
      <g class="b" data-step="2">
        ${d11Box(520, 30, 440, 92, 'Domain gap', { fs: 27 })}
        ${d11Box(520, 142, 440, 72, 'money can', { dash: true, fs: 23, color: 'var(--mute)' })}
      </g>
    </svg>
    <div class="lead b" data-step="3" style="text-align:center">One is research. One is a budget.</div>
  </div>
  ${cite(MALIK_CITE)}
`, { sub: true, notes: [
  "(draft) Before we leave teleoperation I want to pull out the shape of the argument, because it is a habit worth stealing and you can use it on your own project proposals.",
  "(draft) Objection one: the human. A person wearing a display and holding controllers cannot move the way a skilled hand moves. They are slow, they are clumsy, and they cannot feel the object. No amount of funding changes that, because the limit is in the human sensorimotor system and you are not going to upgrade that this decade.",
  "(draft) Objection two: the domain gap. The rig you collect on is not the robot you eventually ship, so the data does not quite transfer. This is a real problem and it is also, Malik says, basically a budget. Build better rigs, build more of them, build them to match the target robot. Expensive, but ordinary.",
  "(draft) So when you read a critique of a method, ask which kind it is. Is this a problem that money and engineering will grind down, or is it a problem that sits in the structure of the thing? He will make exactly the same move in a minute, in the opposite direction, to defend simulation."
]});

/* 5. Videos of humans (2 clicks). We embed the project's own introduction rather than lifting frames from any
      dataset. Full attribution is in the cite line; the card on the slide is a name and two links. */
st(`
  <h1 class="t">Videos of humans</h1>
  <div class="d11-data-head">the natural signal</div>
  <div class="d11-watch b" data-step="1">
    <div class="d11-paper">
      <b>Ego-Exo4D</b>
      <span>${d11Link('site ↗', 'https://ego-exo4d-data.org/')} · ${d11Link('paper ↗', 'https://arxiv.org/abs/2311.18259')}</span>
    </div>
    <iframe class="d11-embed" src="https://www.youtube.com/embed/GdooXEBAnI8" title="Ego-Exo4D Dataset and Benchmark Suite" allowfullscreen></iframe>
  </div>
  <div class="lead b" data-step="2" style="text-align:center">Nobody puppeteering. An ocean of it.</div>
  ${cite('Ego-Exo4D, Grauman and colleagues (Meta FAIR, Project Aria and 15 university partners); video embedded from the project channel · ' + MALIK_CITE)}
`, { notes: [
  "(draft) Candidate two. Videos of humans. And here Malik says something warm, which is rare in this talk: as an ex-computer-vision person, he loves this. He calls it the natural signal.",
  "(draft) This is the project's own introduction to Ego-Exo4D — over a thousand hours of people doing skilled things, filmed from their own eyes with camera glasses and from the outside at the same time, by Meta FAIR with fifteen university partners. Play thirty seconds of it. If the room has no internet, say the address out loud and describe it: cooking, bike repair, dancing, surgery, shot from the wearer's own head.",
  "(draft) And the appeal is obvious. No teleoperation rig, nobody puppeteering through a screen. The data is already there in quantities that dwarf anything a robot lab can collect, and it is data of humans being genuinely skilled rather than humans working through a screen. So why is this not the answer?"
]});

/* 6. What the human video does not have (3 clicks). The second gap lands only because the previous part set up
      the three levels, so the third click puts the three levels back on screen, as three nouns. */
st(`
  <h1 class="t">Videos of humans</h1>
  <div class="d11-data-head">two problems</div>
  <div class="d11-body">
    <svg class="d11-svg" viewBox="0 0 1000 310" role="img"
      aria-label="Left: a human hand and a robot gripper with a gap between them. Right: a gripper on a block with the forces drawn as absent. Below: the three levels, with the force level dashed">
      ${d11Arrow('d11-data-h6')}
      <g class="b" data-step="1">
        <text x="250" y="34" style="font-size:26px;font-weight:700">wrong body</text>
        <rect x="112" y="104" width="64" height="54" rx="12" fill="#fff" stroke="var(--ink)" stroke-width="3"/>
        <path d="M 122 104 L 122 72 M 136 104 L 136 62 M 150 104 L 150 60 M 164 104 L 164 68 M 176 104 L 176 80 M 112 124 L 88 108"
          fill="none" stroke="var(--ink)" stroke-width="3" stroke-linecap="round"/>
        <rect x="334" y="104" width="54" height="54" rx="6" fill="#fff" stroke="var(--ink)" stroke-width="3"/>
        <path d="M 346 104 L 346 68 M 376 104 L 376 68" fill="none" stroke="var(--ink)" stroke-width="5" stroke-linecap="round"/>
        <path d="M 196 132 L 318 132" fill="none" stroke="var(--ink)" stroke-width="2.5" stroke-dasharray="8 7" marker-end="url(#d11-data-h6)"/>
      </g>
      <g class="b" data-step="2">
        <text x="740" y="34" style="font-size:26px;font-weight:700">no forces</text>
        <rect x="700" y="100" width="84" height="64" rx="6" fill="var(--ink)" fill-opacity=".15" stroke="var(--ink)" stroke-width="3"/>
        <path d="M 706 68 L 706 100 M 778 68 L 778 100" fill="none" stroke="var(--ink)" stroke-width="5" stroke-linecap="round"/>
        <path d="M 640 132 L 692 132 M 844 132 L 792 132" fill="none" stroke="var(--mute)" stroke-width="3" stroke-dasharray="7 6" marker-end="url(#d11-data-h6)"/>
      </g>
      <g class="b" data-step="3">
        ${d11Box(40, 200, 290, 66, 'goals', { fs: 25 })}
        ${d11Box(355, 200, 290, 66, 'trajectories', { fs: 25 })}
        ${d11Box(670, 200, 290, 66, 'forces', { fs: 25, dash: true, color: 'var(--mute)' })}
        <text x="500" y="298" style="font-size:23px">manipulation lives in the third</text>
      </g>
    </svg>
  </div>
  ${cite(MALIK_CITE)}
`, { sub: true, notes: [
  "(draft) Two problems, and the second one is the one that matters.",
  "(draft) First, the embodiment gap. The video shows you a person doing the thing, and the trajectory in it belongs to their hand: five fingers, their proportions, their reach. The robot has two prongs and a different arm. You cannot simply replay what you saw. Her trajectory is in her hands, not in those. Everything has to be retargeted into a different body, and that is a lossy and unsolved operation in itself.",
  "(draft) Second, and worse: there are no forces. A camera records where things went. It never records how hard. And that is the entire difference between lifting a wine glass and breaking one. You can watch a thousand hours of someone kneading dough and never learn the pressure.",
  "(draft) And this is where the three levels from a minute ago earn their keep. Goals and plans, trajectories, forces and torques. Video is excellent at the first, workable at the second once you retarget, and gives you literally nothing at the third. The third is where manipulation actually happens. So the natural signal is missing exactly the part we came for."
]});

/* 7. Simulation (4 clicks). The turn: here he defends the thing everyone objects to. His line about engineering
      is now read aloud from the note rather than displayed; the slide keeps three words of it as a cue. */
st(`
  <h1 class="t">Simulation</h1>
  <div class="d11-data-head">the objection he refuses</div>
  <div class="d11-body">
    <svg class="d11-svg" viewBox="0 0 1000 360" role="img"
      aria-label="Navigation and locomotion both arrive at one box, cracked in simulation; below, the sim-to-real objection struck through">
      ${d11Arrow('d11-data-h7')}
      <g class="b" data-step="1">
        ${d11Box(90, 40, 320, 70, 'Navigation', { fs: 27 })}
        ${d11Box(590, 40, 320, 70, 'Locomotion', { fs: 27 })}
      </g>
      <g class="b" data-step="2">
        <path d="M 250 114 L 390 150" fill="none" stroke="var(--ink)" stroke-width="3" marker-end="url(#d11-data-h7)"/>
        <path d="M 750 114 L 610 150" fill="none" stroke="var(--ink)" stroke-width="3" marker-end="url(#d11-data-h7)"/>
        ${d11Box(300, 158, 400, 70, 'both cracked in simulation', { fs: 25 })}
      </g>
      <g class="b" data-step="3">
        ${d11Box(250, 258, 500, 58, 'sim-to-real', { dash: true, fs: 24, color: 'var(--mute)' })}
      </g>
      <g class="b" data-step="4">
        <path d="M 268 287 L 732 287" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/>
        <text x="500" y="348" style="font-size:27px;font-weight:700">just more engineering</text>
      </g>
    </svg>
  </div>
  ${cite(MALIK_CITE)}
`, { notes: [
  "(draft) Candidate three, simulation, and here the talk turns, because this is the one he defends.",
  "(draft) Start with the existence proof, because it is the strongest card he holds. Navigation and locomotion are the two problems that are not stuck. You saw the humanoid walking down a forty-one percent San Francisco hill. Neither of those was solved by collecting real-world data.",
  "(draft) Both of them were cracked in simulation and then dropped into the real world. His point is that this should be your prior. If the only two robotics problems that have gone well both went well this way, the burden of proof is on the person saying it will not work here. And a simulator is a physics engine, so unlike video it hands you exactly the thing video could not: the forces.",
  "(draft) Now the objection everyone raises, and you will raise it too: sim-to-real. The simulator is not the world, friction is wrong, contact is wrong, deformables are hopeless, so a policy trained in there will not transfer.",
  "(draft) And he simply refuses it. His words, and I will quote them because they are blunter than mine would be: I do not buy this. It is just more engineering. His analogy is from our own field: in twenty-twelve and twenty-thirteen people complained that neural networks needed far too much tuning compared with a nice clean support vector machine. That complaint was true. It was also temporary. People learned to tune them. He is betting that sim-to-real is the same kind of complaint, and if you want to disagree with him this is the place to do it."
]});

/* 8. The real problem with simulation (4 clicks). Rebuilt for round 2. The ten named reward terms are gone:
      what they were doing on the screen was being read, and what mattered was never the terms but the LENGTH
      of the list. So the list is now drawn as lines, ten readable ones against a hundred and fifty, and the
      argument is made by the shape. Nothing is claimed by the bars: 150 is his own hypothetical, said in the
      cite line and in the note. Drawing them rather than naming them also removes the earlier problem that
      the ten named terms were our invention and not his. */
{
  const A = [210, 170, 240, 150, 225, 185, 250, 160, 200, 175];
  st(`
    <h1 class="t">Simulation</h1>
    <div class="d11-data-head">the real problem</div>
    <div class="d11-body">
      <svg class="d11-svg" viewBox="0 0 1000 400" role="img"
        aria-label="Ten readable lines for a pouring reward, against a hundred and fifty lines compressed into a dense block">
        ${d11Arrow('d11-data-h8')}
        <g class="b" data-step="1">
          <text x="180" y="52" style="text-anchor:start;font-size:25px;font-weight:700">pouring</text>
          ${A.map((w, i) => `<rect x="180" y="${76 + i * 22}" width="${w}" height="14" rx="4" fill="var(--ink)" fill-opacity=".45"/>`).join('')}
          <text x="180" y="322" style="text-anchor:start;font-size:26px;font-weight:700">10 terms</text>
        </g>
        <g class="b" data-step="2">
          <text x="180" y="356" style="text-anchor:start;fill:var(--mute);font-size:22px">each one weighted</text>
        </g>
        <g class="b" data-step="3">
          <path d="M 500 200 L 556 200" fill="none" stroke="var(--ink)" stroke-width="3" marker-end="url(#d11-data-h8)"/>
          <text x="620" y="52" style="text-anchor:start;font-size:25px;font-weight:700">another task</text>
          ${Array.from({length: 150}, (_, i) => `<rect x="620" y="${(76 + i * 1.76).toFixed(2)}" width="${140 + (i * i * 31 + i * 53) % 112}" height="1.3" fill="var(--ink)" fill-opacity=".45"/>`).join('')}
          <text x="620" y="372" style="text-anchor:start;font-size:26px;font-weight:700">150 terms?</text>
        </g>
      </svg>
      <div class="lead b" data-step="4" style="text-align:center">Teleoperation has you running on day two</div>
    </div>
    ${cite(MALIK_CITE + ' — 150 is a hypothetical offered in the talk, not a reported number; the lines are drawn to count, not to be read')}
  `, { sub: true, notes: [
    "(draft) So if sim-to-real is not the real problem with simulation, what is? Here is his answer, and it is a good one because it is boring and practical rather than deep.",
    "(draft) To train in simulation you use reinforcement learning, and reinforcement learning needs a reward. For locomotion that is easy: go forward, stay upright, do not fall over. For manipulation it is not easy at all. One of his students worked on pouring, and every single stage of it had to be written down by hand: reach the cup, close the fingers, lift it clear, carry it over the glass, tilt at the right rate, keep the stream in the glass, stop at the right level, set it down. Roughly ten terms. Those are the ten lines.",
    "(draft) And it is worse than ten lines, because each line comes with a coefficient. How much is not spilling worth relative to finishing quickly? You tune those by hand, and they interact, and changing one breaks another.",
    "(draft) Now his extrapolation, and this is the picture I want you to look at rather than listen to. There might be some task, he says, where this list goes to a hundred and fifty. With a hundred and fifty coefficients. I have drawn that so you can see it rather than take my word for it, and there are exactly a hundred and fifty lines in that block. Nobody writes that. He says plainly that he thinks this is the actual reason people gave up on simulation for manipulation. Not sim-to-real. Reward specification.",
    "(draft) And compare the alternative. With teleoperation data you do behaviour cloning, which needs no reward at all. You collect demonstrations on Monday and you are training on Tuesday. That is why the field went that way, and notice it is a perfectly rational choice even if the data it rests on is a record of people working in an awkward rig."
  ]});
}

/* 9. The corner (3 clicks). The part stops here on purpose. His question is read aloud, not displayed: a quote
      on the screen is read by the room instead of being heard from Fernanda. The note carries it verbatim. */
st(`
  <h1 class="t">Three doors, all closed</h1>
  <div class="d11-body">
    <svg class="d11-svg" viewBox="0 0 1000 330" role="img"
      aria-label="The three candidates struck through, and a small figure standing in a corner">
      <g class="b" data-step="1">
        ${[['Teleoperation', 40], ['Videos of humans', 360], ['Simulation', 680]]
          .map(([t, x]) => `${d11Box(x, 34, 260, 80, t, { fs: 25 })}
            <path d="M ${x + 16} 108 L ${x + 244} 40" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/>`).join('')}
      </g>
      <g class="b" data-step="2">
        <path d="M 380 158 L 380 308 L 640 308 L 640 158" fill="none" stroke="var(--ink)" stroke-width="5" stroke-linejoin="round"/>
        <circle cx="510" cy="226" r="19" fill="#fff" stroke="var(--ink)" stroke-width="3"/>
        <path d="M 510 245 L 510 282 M 486 262 L 534 262 M 510 282 L 494 306 M 510 282 L 526 306"
          fill="none" stroke="var(--ink)" stroke-width="3" stroke-linecap="round"/>
      </g>
    </svg>
    <div class="lead b" data-step="3" style="text-align:center">So what now?</div>
  </div>
  ${cite(MALIK_CITE)}
`, { notes: [
  "(draft) Let us take stock, because he does.",
  "(draft) Teleoperation: the data is in the right body, but it is a record of a person working through a screen, and it has to be sped up five times before it looks like anything. Videos of humans: an ocean of it, and the wrong body, and no forces. Simulation: gives you the forces, and nobody can write the reward.",
  "(draft) And he says it himself, out loud, in front of the room, which is the bit I admire. His words: so now I have put myself into a corner, so what the hell am I going to do? Every door he opened he then closed. Most talks do not do this. Most talks pick the speaker's own method and present the other two as strawmen.",
  "(draft) So sit in the corner with him for a second before we go on. If you had to write the proposal tomorrow, which of those three would you take, and which of the objections would you try to beat? Take thirty seconds with the person next to you. Then I will show you his way out, and it is not a fourth method."
]});
}
