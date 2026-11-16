/* PART: three (Day 11), about 8 minutes. Owner: Fernanda. Shared styles and helpers are in ../lib.js.
   The opening of the ETH talk, 0:00 to 7:44 (see reference/malik-talk-map.md): the three central problems of
   robotics, navigation and locomotion as the two that have moved, the verdict on all three, and the
   arithmetic for why manipulation has not.

   Round 3 (2026-11-16): ten slides merged into FOUR, by beats rather than by cutting. Each slide is built
   from STAGES: a stage is one figure with its own clicks and its own citation, and the arrival of a stage
   hides the one before it, so only one figure is ever on screen. That keeps the on-screen word budget
   (every stage is under 25 words) while the deck gets four slide numbers instead of ten.

   How the staging works, since it is the only unusual thing in this file. Stages are written in REVERSE
   order in the DOM and ordered by data-step instead, so that plain CSS can say "hide any stage that a
   later stage has replaced" with a following-sibling selector and no :has(). The engine reveals .b by
   data-step and not by DOM order, so the clicks still run forwards.

   Note that checkSlides in ../reference/check-slides.js counts every stage of a slide, including the
   stages that are not on screen, so it reports these four slides as over budget. The per-stage counts are
   in feedback/_day.md and none of them is over.

   Every number on these slides comes from the talk or from the GOAT paper, and every slide says which.
   Every figure is drawn here; the two photographs are freely licensed and logged in assets/three/SOURCES.md.
   All notes are drafts. New CSS classes in this file all start with d11-three-. */
{
section('Three problems');

/* ---- styles that only this part uses ---- */
(() => {
  if(document.getElementById('d11-three-style')) return;
  const el = document.createElement('style'); el.id = 'd11-three-style';
  el.textContent = `
  /* a stage: one figure, its own clicks, its own citation. Hidden until its first click, and hidden
     again once a later stage has arrived. Stages sit in reverse DOM order, so one selector does it. */
  .d11-three-stage{ display:none; }
  .d11-three-stage.shown{ display:flex; flex:1 1 auto; min-height:0; flex-direction:column;
    justify-content:center; gap:2.6vh; }
  .d11-three-stage.shown ~ .d11-three-stage{ display:none; }
  .d11-three-stage > .cite{ left:6vw; right:6vw; bottom:5vh; font-size:clamp(.8rem, 1.12vw, 1.15rem);
    color:var(--mute); }
  .d11-three-stage > .cite a{ color:var(--mute); }
  .d11-three-video{ width:100%; aspect-ratio:16/9; max-height:52vh; border:2px solid var(--line);
    border-radius:12px; background:#000; }
  .d11-three-find{ display:flex; align-items:center; gap:1.2vw; }
  .d11-three-find svg{ flex:0 0 auto; width:clamp(38px, 3.8vw, 58px); height:auto; }
  .d11-three-find span{ font-size:clamp(1.25rem, 2.1vw, 1.9rem); line-height:1.25; }
  .d11-three-calc{ display:grid; grid-template-columns:auto 1fr; gap:1.6vh 2.2vw; max-width:40em;
    margin:0 auto; align-items:baseline; }
  .d11-three-calc > b{ text-align:right; font-size:clamp(1.4rem, 2.6vw, 2.4rem);
    font-variant-numeric:tabular-nums; white-space:nowrap; }
  .d11-three-calc > span{ font-size:clamp(1.1rem, 1.8vw, 1.6rem); color:var(--mute); }
  .d11-three-calc > .d11-three-rule{ border-top:3px solid var(--ink); padding-top:1.3vh; }
  .d11-three-shot{ max-height:44vh; border-radius:10px; }
  `;
  document.head.appendChild(el);
})();

const GOAT_CITE = d11Link('Chang, Gervet, Khanna, Yenamandra and colleagues, "GOAT: GO to Any Thing", RSS 2024 (arXiv 2311.06430)', 'https://arxiv.org/abs/2311.06430');
const NTP_CITE = d11Link('Radosavovic, Zhang, Shi, Rajasegaran, Kamat, Darrell, Sreenath and Malik, "Humanoid Locomotion as Next Token Prediction", Berkeley, NeurIPS 2024', 'https://humanoid-next-token-prediction.github.io/');
const threeMark = k => `<svg viewBox="0 0 60 60" aria-hidden="true">${d11Mark(k, 30, 30, 25)}</svg>`;
/* one stage of a slide: the click that brings it in, its content, its own citation */
const stage = (step, body, citation) =>
  `<div class="b d11-three-stage" data-step="${step}">${body}${cite(citation)}</div>`;

/* the three problems, drawn: a floor plan with a path, a figure on a slope, a hand over an object */
const threeIcon = i => {
  const cx = 165 + i * 335;
  if(i === 0) return `<rect x="${cx - 90}" y="140" width="180" height="96" rx="5" fill="#fff" stroke="var(--ink)" stroke-width="3"/>
    <path d="M ${cx - 20} 140 L ${cx - 20} 196" stroke="var(--ink)" stroke-width="3"/>
    <path d="M ${cx - 70} 222 L ${cx - 45} 190 L ${cx - 5} 206 L ${cx + 40} 168" fill="none"
      stroke="var(--ink)" stroke-width="2.5" stroke-dasharray="7 6"/>
    <circle cx="${cx - 70}" cy="222" r="6" fill="var(--ink)"/>
    <circle cx="${cx + 40}" cy="168" r="10" fill="#fff" stroke="var(--ink)" stroke-width="3"/>`;
  if(i === 1) return `<path d="M ${cx - 90} 236 L ${cx + 90} 170" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/>
    <circle cx="${cx}" cy="150" r="10" fill="#fff" stroke="var(--ink)" stroke-width="3"/>
    <path d="M ${cx} 160 L ${cx} 182 M ${cx} 182 L ${cx - 16} 206 M ${cx} 182 L ${cx + 14} 200
      M ${cx} 166 L ${cx - 22} 176" fill="none" stroke="var(--ink)" stroke-width="3.5"
      stroke-linecap="round" stroke-linejoin="round"/>`;
  return `<rect x="${cx - 38}" y="146" width="76" height="16" rx="6" fill="#fff" stroke="var(--ink)" stroke-width="3"/>
    <path d="M ${cx - 24} 162 L ${cx - 24} 198 M ${cx} 162 L ${cx} 202 M ${cx + 24} 162 L ${cx + 24} 198"
      stroke="var(--ink)" stroke-width="5" stroke-linecap="round"/>
    <rect x="${cx - 20}" y="206" width="40" height="30" rx="5" fill="var(--early)" fill-opacity=".35"
      stroke="var(--ink)" stroke-width="3"/>`;
};

/* ============ SLIDE 1 (14 clicks): the definition, the Airbnb test, and what they found ============
   Stage A, clicks 1-4: perception to action, then the three problems.
   Stage B, clicks 5-9: the Airbnb floor plan, ending on the partial map.
   Stage C, clicks 10-14: the Spot photograph and the three findings.
   Stages are written last-first; data-step decides the order they arrive in. */
st(`
  <h1 class="t">Connecting perception to action</h1>

  ${stage(10, `
    <div class="d11-cols">
      <div class="d11-media b" data-step="10">
        <img class="d11-three-shot" src="assets/inherited/mk-goat.jpg" alt="GOAT: goals given as an image, a sentence or a category, and the path the robot took through a home to four goals in turn">
      </div>
      <div class="d11-side">
        <div class="d11-three-find b" data-step="11">${threeMark('none')}<span>end to end</span></div>
        <div class="d11-three-find b" data-step="12">${threeMark('full')}<span>modular, best model per part</span></div>
        <div class="d11-three-find b" data-step="13">${threeMark('full')}<span>learning where to look next</span></div>
        <div class="b" data-step="14" style="font-size:clamp(1.25rem,2.1vw,1.9rem);border-top:3px solid var(--ink);padding-top:1.6vh">
          what fails is vision
        </div>
      </div>
    </div>`,
    'Figure from the GOAT work, by way of the talk · findings as stated in the talk · ' + GOAT_CITE)}

  ${stage(5, `
    <svg class="d11-svg" viewBox="0 0 1000 420" role="img"
      aria-label="A floor plan of an unknown apartment, a robot set down at the door, a goal given three ways, and a partial map">
      <g class="b" data-step="5">
        <rect x="60" y="46" width="560" height="324" rx="6" fill="#fff" stroke="var(--ink)" stroke-width="4"/>
        <path d="M 330 46 L 330 170 M 330 240 L 330 370 M 60 240 L 230 240 M 290 240 L 330 240"
          stroke="var(--ink)" stroke-width="4"/>
      </g>
      <g class="b" data-step="6">
        <path d="M 60 290 L 60 340" stroke="#fff" stroke-width="7"/>
        <path d="M 60 340 A 44 44 0 0 1 104 296" fill="none" stroke="var(--ink)" stroke-width="2.5"/>
        <circle cx="104" cy="322" r="13" fill="var(--ink)"/>
        <circle cx="104" cy="322" r="4.5" fill="#fff"/>
        <text x="186" y="356" style="fill:var(--mute);font-size:20px">put it down</text>
      </g>
      <g class="b" data-step="7">
        <text x="820" y="36" style="fill:var(--mute);font-size:21px">a goal, three ways</text>
        ${['in words', 'as a picture', 'as a place'].map((t, i) =>
          d11Box(680, 58 + i * 88, 280, 70, t, { fs: 24, fw: 600 })).join('')}
      </g>
      <g class="b" data-step="8">
        <polyline points="104,322 250,310 262,248 270,140 300,180 336,204 430,140 520,190"
          fill="none" stroke="var(--ink)" stroke-width="3" stroke-dasharray="8 7"
          stroke-linejoin="round" stroke-linecap="round"/>
        <circle cx="272" cy="138" r="10" fill="#fff" stroke="var(--ink)" stroke-width="3"/>
        <circle cx="430" cy="140" r="10" fill="#fff" stroke="var(--ink)" stroke-width="3"/>
      </g>
      <g class="b" data-step="9">
        <rect x="334" y="244" width="284" height="124" fill="var(--mute)" fill-opacity=".18"/>
        <text x="476" y="312" style="fill:var(--mute);font-size:20px">not visited</text>
        <text x="340" y="404" style="font-weight:700;font-size:25px">builds what it needs</text>
      </g>
    </svg>`,
    MALIK_CITE + ' · system described: ' + GOAT_CITE)}

  ${stage(1, `
    <svg class="d11-svg" viewBox="0 0 1000 350" role="img"
      aria-label="Perception feeding action, and under it the three central problems: navigation, locomotion, manipulation">
      ${d11Arrow('d11-three-a1')}
      <g class="b" data-step="1">
        ${d11Box(190, 14, 250, 76, 'perception', { fs: 28, fw: 600 })}
        <path d="M 452 52 L 544 52" stroke="var(--ink)" stroke-width="4" marker-end="url(#d11-three-a1)"/>
        ${d11Box(560, 14, 250, 76, 'action', { fs: 28, fw: 600 })}
      </g>
      ${[['Navigation', 'get there', 2], ['Locomotion', 'cross it', 3], ['Manipulation', 'do it', 4]]
        .map(([name, gloss, step], i) => `<g class="b" data-step="${step}">
          ${threeIcon(i)}
          <text x="${165 + i * 335}" y="286" style="font-weight:700;font-size:27px">${name}</text>
          <text x="${165 + i * 335}" y="316" style="fill:var(--mute);font-size:20px">${gloss}</text>
        </g>`).join('')}
    </svg>`,
    MALIK_CITE)}
`, { notes: [
  "(draft) Today I want to walk you through an argument that is not mine. It is Jitendra Malik, in a talk he gave this year, and I am going to rebuild it slide by slide because I think it is the clearest statement anybody has made of where machines stand with bodies.",
  "(draft) He starts with a definition, and it is a short one. Robotics is connecting perception to action. Not perception on its own, which is the part we spent the last few sessions on. The connection.",
  "(draft) And there are three central problems that most people in the field would agree on. The first is navigation. Getting to the thing. Knowing where you are, where the thing is, and finding a way between them.",
  "(draft) The second is locomotion. Crossing the ground once you have decided to. Stairs, gravel, hills, a floor with a cable on it.",
  "(draft) And the third is manipulation. Doing anything at all once you arrive. Picking it up, opening it, cutting it, putting it somewhere else. Hold on to these three, because in a few minutes each of them gets a mark, and the marks are very different.",
  "(draft) Navigation is the one he thinks is nearly finished, and here is the test he set his group. He calls it the Airbnb test, and I like it because it is a test you could actually run on a Saturday. Rent an Airbnb, somewhere you have never been. Nobody has mapped it, nobody has labelled it, there is no floor plan on file, and the robot has been told nothing about it.",
  "(draft) Open the front door, put the robot down on the floor, and that is all the help it gets. No tour, no warm-up lap.",
  "(draft) Then give it a goal, and here is the part that was new: the goal can arrive in three different shapes. In words, go find the potted plant. As a photograph, find this sink, this exact one, not any sink. Or as a location, go to this point. Same system, three kinds of goal.",
  "(draft) And it goes looking. It was trained in simulation, so it has priors about houses: it knows roughly where kitchens tend to be, that plants tend to be near windows. It explores, and while it explores it is recognising and remembering the things it passes. These two circles are the plant and the sink.",
  "(draft) And here is the sentence I want you to keep. It does not build a full map of the apartment. It builds a partial semantic map. It builds what is needed, and no more, and then he says: this is how we humans operate. You have lived in your flat for two years and you could not draw it to scale.",
  "(draft) Three scientific findings came out of building that, and all three cut against what the last few years would have led you to guess. First, the body, so you can picture it: a quadruped like this one, and also a wheeled robot with an arm. This photograph is not from the experiments, and the robot is not the point anyway. The software is the point, and it moved between bodies.",
  "(draft) Finding one. The end to end approach, one big network from pixels straight to motor commands, which is the approach everything else in this course has taught you to expect to win, did not do well here.",
  "(draft) Finding two. What did work was modular. Break the problem into parts, and put the best available vision model into each part. Which sounds old fashioned, and the argument is that it is simply wise, because you get to swap each piece out as the field moves.",
  "(draft) Finding three, and this is the one I find most interesting. The part that genuinely needed learning was not recognising things and it was not planning paths. It was exploring efficiently. Where do you look next, in a house you have never seen, given what you have seen so far.",
  "(draft) And then the consequence of being modular. When it fails, it mostly fails because the vision failed. Which means, and this is nearly a quote, if you do not like your results you just wait for the next generation of your foundation model. The robot gets better while you sleep, and you did not touch it."
]});

/* ============ SLIDE 2 (7 clicks): locomotion, and the hills ============
   Stage A, clicks 1-3: the authors own video and the recipe.
   Stage B, clicks 4-7: the two grades drawn at true angle, and a steep street. */
st(`
  <h1 class="t">Locomotion</h1>

  ${stage(4, `
    <div class="d11-cols">
      <svg class="d11-svg" viewBox="0 0 560 310" role="img"
        aria-label="Two slopes drawn to true angle from one origin: a 29 percent grade and a 41 percent grade">
        <path d="M 50 270 L 430 270" stroke="var(--ink)" stroke-width="3" stroke-dasharray="6 6"/>
        <text x="240" y="296" style="fill:var(--mute);font-size:19px">level</text>
        <g class="b" data-step="4">
          <path d="M 50 270 L 400 168.5" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/>
          <path d="M 400 270 L 400 168.5" stroke="var(--ink)" stroke-width="2" stroke-dasharray="5 5"/>
          <text x="414" y="176" style="text-anchor:start;font-weight:700;font-size:26px">29%</text>
        </g>
        <g class="b" data-step="5">
          <path d="M 50 270 L 400 126.5" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/>
          <path d="M 400 168.5 L 400 126.5" stroke="var(--ink)" stroke-width="2" stroke-dasharray="5 5"/>
          <text x="414" y="134" style="text-anchor:start;font-weight:700;font-size:26px">41%</text>
        </g>
        <g class="b" data-step="6">
          <text x="225" y="56" style="font-size:22px">outside its training range</text>
          <path d="M 225 70 L 225 190" stroke="var(--ink)" stroke-width="2" stroke-dasharray="5 5"/>
        </g>
      </svg>
      <div class="d11-media b" data-step="7">
        <img class="d11-three-shot" src="assets/inherited/mk-walk-sf.jpg" alt="Twelve photographs of a humanoid robot walking in different places around San Francisco">
      </div>
    </div>`,
    'Grades as stated in the talk; figure drawn to true angle · photographs of the robot by way of the talk · ' + MALIK_CITE)}

  ${stage(1, `
    <div class="d11-cols">
      <div class="b" data-step="1">
        <iframe class="d11-three-video" src="https://www.youtube.com/embed/ok4DHssENE4"
          title="Humanoid Locomotion as Next Token Prediction" allowfullscreen></iframe>
      </div>
      <div class="d11-side">
        <div class="b" data-step="2" style="font-size:clamp(1.35rem,2.4vw,2.1rem);line-height:1.3">
          trained in simulation<br><span style="color:var(--mute)">zero shot outdoors</span>
        </div>
        <div class="b" data-step="3" style="font-size:clamp(1.35rem,2.4vw,2.1rem);line-height:1.3">
          next token prediction, then RL
        </div>
      </div>
    </div>`,
    'Video by the paper authors, embedded from YouTube · ' + NTP_CITE + ' · ' + MALIK_CITE)}
`, { notes: [
  "(draft) The second problem is locomotion, and rather than describe it to you I would rather show you the authors own video of it. If the room has no internet, say that it is a full sized humanoid walking around San Francisco and move on.",
  "(draft) Play a minute of this. Notice there is nothing sanded flat for it. Pavements, slopes, kerbs, people. The same group walked one of these for miles along the Berkeley hiking trails.",
  "(draft) And the striking fact about it is where it learned to walk. Entirely in a simulator. Then they carried it outside and it worked, zero shot, with no fine tuning on the real world at all. That is the opposite of what robotics has historically been like.",
  "(draft) The recipe will sound familiar from the language half of this course. First a self supervised stage: predict the next token of your own sensorimotor sequence, the way a language model predicts the next word. Then a stage of reinforcement learning on top. Same shape of recipe, completely different corpus, and the corpus is where this whole session is going.",
  "(draft) Then comes the part of the story he clearly enjoys telling, which is about pushing a thing past where it was trained. They walked it down a San Francisco hill with a twenty nine percent grade. That is drawn here to the true angle, so this is genuinely what twenty nine percent looks like, and it is already more than you would willingly carry shopping down.",
  "(draft) Then he asked somebody to find the steepest street in the city. They found one at forty one percent. Also drawn true. And the robot walked it.",
  "(draft) And the reason that matters is not the stunt. It is that, in his words, it was not trained with that big a range in simulation. The simulator did not contain this hill. It generalised past the edge of its own training distribution, out in the world, with gravity switched on.",
  "(draft) If you have never stood on a San Francisco hill, this is roughly the experience. This is not the street in the video, it is another one. And the camera here is level with the road, which is why the building looks like it is falling over. The building is fine. The street is the problem."
]});

/* ============ SLIDE 3 (4 clicks): the verdict. One figure, so no stages. ============ */
st(`
  <h1 class="t">The verdict he says will offend people</h1>
  <div class="d11-body">
    <svg class="d11-svg" viewBox="0 0 1000 300" role="img"
      aria-label="Three verdicts: navigation nearly done, locomotion good progress, manipulation a long way to go">
      ${[['Navigation', 'nearly done', 'full', 1], ['Locomotion', 'good progress', 'half', 2],
         ['Manipulation', 'a long way to go', 'none', 3]].map(([name, verdict, mark, step], i) => {
        const y = 70 + i * 95;
        return `<g class="b" data-step="${step}">
          ${d11Mark(mark, 110, y, 32)}
          <text x="190" y="${y + 11}" style="text-anchor:start;font-weight:700;font-size:32px">${name}</text>
          <text x="540" y="${y + 10}" style="text-anchor:start;font-size:28px">${verdict}</text>
        </g>`; }).join('')}
    </svg>
    <div class="d11-tag b" data-step="4">a judgement, not a benchmark</div>
  </div>
  ${cite(MALIK_CITE)}
`, { notes: [
  "(draft) Now he does the thing that makes a talk worth going to. He gives all three problems a mark, and he introduces it by saying it will probably offend people, and then he says it anyway.",
  "(draft) Navigation: nearly done. That is the Airbnb test you just saw. Not finished, but no longer the hard part.",
  "(draft) Locomotion: good progress. That is the humanoid on the forty one percent street. Genuine, fast, surprising progress.",
  "(draft) Manipulation: a long way to go. And look at the shape of that list, because it is the same shape we keep running into. The further you get from moving your whole body around, and the closer you get to doing something with your hands to an object, the worse machines do.",
  "(draft) Before we go on, I want to be clear with you about what this is. There is no number behind any of it. It is a judgement, from one very experienced person, about where things stand. I am repeating it because I think it is roughly right, and because the rest of this session is about why that third line is the way it is."
]});

/* ============ SLIDE 4 (11 clicks): why, and the arithmetic ============
   Stage A, clicks 1-3: sensorimotor trajectories, sketched, and the shelf that is empty.
   Stage B, clicks 4-7: the arithmetic, done rather than announced.
   Stage C, clicks 8-11: the same two numbers on a log ruler, four steps apart. */
st(`
  <h1 class="t">The data is the wrong shape</h1>

  ${stage(8, `
    <svg class="d11-svg" viewBox="0 0 1000 310" role="img"
      aria-label="A logarithmic ruler from ten to the six to ten to the twelve, with a child marked at ten to the eight and a language model at ten to the twelve, four steps apart">
      <g class="b" data-step="8">
        <text x="500" y="34" style="font-size:22px">each step is ten times</text>
        <path d="M 80 180 L 920 180" stroke="var(--ink)" stroke-width="3.5"/>
        ${[6, 7, 8, 9, 10, 11, 12].map((e, i) => {
          const x = 80 + i * 140;
          return `<path d="M ${x} 172 L ${x} 188" stroke="var(--ink)" stroke-width="3"/>
            <text x="${x}" y="220" style="font-size:20px">10<tspan dy="-9" style="font-size:15px">${e}</tspan></text>`;
        }).join('')}
      </g>
      <g class="b" data-step="9">
        <path d="M 360 172 L 360 128" stroke="var(--ink)" stroke-width="2" stroke-dasharray="5 5"/>
        <circle cx="360" cy="180" r="10" fill="var(--ink)"/>
        <text x="360" y="116" style="font-weight:700;font-size:25px">a child by ten</text>
      </g>
      <g class="b" data-step="10">
        <path d="M 920 172 L 920 128" stroke="var(--ink)" stroke-width="2" stroke-dasharray="5 5"/>
        <circle cx="920" cy="180" r="10" fill="var(--ink)"/>
        <text x="920" y="116" style="text-anchor:end;font-weight:700;font-size:25px">a language model</text>
      </g>
      <g class="b" data-step="11">
        <path d="M 360 252 L 360 266 L 920 266 L 920 252" fill="none" stroke="var(--ink)" stroke-width="3"/>
        <text x="640" y="298" style="font-weight:700;font-size:25px">ten thousand times</text>
      </g>
    </svg>`,
    'Drawn on a log scale, because a bar chart of these two numbers would be a lie · ' + MALIK_CITE)}

  ${stage(4, `
    <div class="d11-three-calc">
      <b class="b" data-step="4">1,000,000</b>
      <span class="b" data-step="4">a child, one month</span>
      <b class="b" data-step="5">&times;12&times;10</b>
      <span class="b" data-step="5">months, years</span>
      <b class="b d11-three-rule" data-step="6">= 100,000,000</b>
      <span class="b d11-three-rule" data-step="6">a child by ten</span>
      <b class="b d11-three-rule" data-step="7">1,000,000,000,000</b>
      <span class="b d11-three-rule" data-step="7">a language model</span>
    </div>`,
    'Words heard, and words trained on. Said out loud in the talk: an order of magnitude he is willing to defend, not a figure from a study · ' + MALIK_CITE)}

  ${stage(1, `
    <div class="d11-big b" data-step="1" style="font-size:clamp(1.6rem,3.4vw,3rem)">sensorimotor trajectories</div>
    <svg class="d11-svg" viewBox="0 0 1000 310" role="img"
      aria-label="Sketched traces of joints, fingertips and cameras over time, beside a full shelf for language and an empty one for sensorimotor data">
      <g class="b" data-step="2">
        ${[['joints', 80, 105, 18, 0.0], ['fingertips', 150, 175, 14, 1.3],
           ['cameras', 220, 245, 11, 2.6]].map(([label, ly, cy, amp, ph]) => {
          const pts = Array.from({length: 49}, (_, i) => {
            const x = 40 + i * 9.6;
            const y = cy + amp * Math.sin(i * 0.55 + ph) + amp * 0.42 * Math.sin(i * 1.9 + ph * 2);
            return `${x.toFixed(1)},${y.toFixed(1)}`; }).join(' ');
          return `<text x="40" y="${ly}" style="text-anchor:start;fill:var(--mute);font-size:21px">${label}</text>
            <polyline points="${pts}" fill="none" stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round"/>`;
        }).join('')}
        <path d="M 40 275 L 505 275" stroke="var(--ink)" stroke-width="2.5"/>
        <text x="272" y="298" style="fill:var(--mute);font-size:20px">time, in one body</text>
      </g>
      <g class="b" data-step="3">
        ${d11Box(560, 70, 400, 80, 'language: already there', { fs: 23 })}
        ${d11Box(560, 178, 400, 80, 'this: nowhere, not even for people', { fs: 23, dash: true })}
      </g>
    </svg>`,
    MALIK_CITE + ' · the traces are a sketch of a shape, not data')}
`, { notes: [
  "(draft) So why is manipulation the one that has not moved? The answer is not about architectures and it is not about compute. It is about data, and specifically about what shape the data would have to be.",
  "(draft) The relevant data here is sensorimotor trajectories. Not sentences and not images. The record of what a body did, and crucially in the body that is doing it. Your trajectory of picking up a mug is not usable by a robot with different arms.",
  "(draft) Here is a sketch of what one of those looks like, and I want to be clear that it is a drawing, not real data. There is no axis and there are no numbers. The point is only the shape of the thing: what every joint was doing, what the fingertips felt, what the cameras saw, several continuous streams lined up in time, with the forces in there alongside the pictures.",
  "(draft) And then the sentence that should stop you. We do not even have sensorimotor trajectories for humans, much less for robots. For language and for pictures the pile was already lying there. Nobody wrote the internet in order to train a model. For this, there is no pile at all, for any species, including ours.",
  "(draft) Then comes a piece of arithmetic, said out loud, and I want to do it with you rather than just show you the answer, because the answer is the number everybody quotes and the arithmetic is the part that makes it mean something. These are words: words heard, against words trained on. A human child hears about a million words a month. Treat that as a round number, not a measurement.",
  "(draft) Multiply by twelve months. Multiply by ten years.",
  "(draft) A hundred million words. That is a ten year old. Everything they have ever heard, every conversation, every bedtime story, all of it, about a hundred million words.",
  "(draft) And a large language model is trained on close to a trillion. I should say clearly that both of these are his numbers on his slide, not figures I can hand you a study for. But the gap is so large that being wrong by a factor of ten in either direction would not change anything.",
  "(draft) Now I want to show you that gap honestly, which turns out to be harder than it sounds. This is a log ruler. Each tick is ten times the one before, not ten more. I am saying that out loud and it is written on the slide, because log axes let you smuggle enormous differences past an audience and I do not want to do that to you.",
  "(draft) Here is the ten year old. A hundred million words. Ten to the eight.",
  "(draft) And here is the language model. Close to a trillion, ten to the twelve, all the way at the other end of the ruler.",
  "(draft) Four steps apart. Four factors of ten. Ten thousand times. If you want to feel it rather than read it: draw a square for the language model, and the child is a speck in one corner you can barely find. And that is where this session is going. Whatever that child is doing, it is not what we are doing. We cannot afford to be as wasteful in this domain as we could afford to be with language, because for bodies there is no trillion. There is not even a billion. We are going to have to be the efficient one."
]});
}
