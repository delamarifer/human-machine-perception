/* PART: malik (Day 11, owner: Shreya). Added 2026-11-16 at Shreya's request: the opening of Jitendra Malik's talk
   "Vision and Robotics for Embodied AI" (ETH Zurich, "Frontiers of Embodied AI", posted June 2026,
   youtube.com/watch?v=HvDU7Vk4pbc), "it really shows the actual uses of robots ... what and how ... the hierarchy, data".
   Follows the talk's first 19 minutes, in its order. Everything said here is his; claims are attributed to him on screen.
   - 0:24 central problems: navigation, locomotion, manipulation. 6:01 his status: navigation nearly done, locomotion good
     progress, manipulation a long way to go.
   - Navigation, 0:42-4:08: GOAT, "the Airbnb test". Paper: Chang et al., GOAT: GO to Any Thing, arXiv 2311.06430
     (CC BY 4.0): goals as category, image or language; lifelong memory; Spot and Stretch; 9 homes, 90+ hours, 675 goals,
     200+ objects, 83% success, 60% at the first goal to 90% after exploration. Figure: goat_task.png.
   - Locomotion, 4:08-6:00: a humanoid (Agility Digit) walking in San Francisco, trained in simulation, zero-shot; in the
     talk, a 29% slope and then a 41% hill (his figures). Paper: Radosavovic et al., Humanoid Locomotion as Next Token
     Prediction, arXiv 2402.19469 (CC BY 4.0): walks in San Francisco zero-shot, trained on as little as 27 hours of
     walking data. Figure: deployment grid.
   - Data, 6:17-7:28: sensorimotor trajectories in the robot's body; a child hears about a million words a month, about
     100 million by age 10; LLMs are trained on close to a trillion; about 10,000 times more (his estimates).
   - Hierarchy, 7:34-11:27: goals and plans / motion trajectories / forces; "action = movement + goal"; the omelette and
     "crack eggs into the bowl"; grip force and gravity; at 42:02 he names the levels Aristotle, Euclid, Newton.
   - Data sources, 13:04-18:39: teleoperation, videos of humans, simulation, with his critiques.
   Titles and the callouts marked (draft) in feedback are mine. Clips are the talk itself, embedded from YouTube with
   start and end times (need internet). No speaker notes. */
{
section('The big picture');

const MK_CITE = 'Jitendra Malik, “Vision and Robotics for Embodied AI”, talk at ETH Zurich, 2026';
const mkClip = (start, end, title) => `<div class="d11-yt d11-mk-clip b"><iframe src="https://www.youtube-nocookie.com/embed/HvDU7Vk4pbc?start=${start}&end=${end}&rel=0" title="${title}" allow="fullscreen; picture-in-picture" allowfullscreen></iframe></div>`;

/* 0:24 and 6:01 */
st(`
  <h1 class="t">Connecting perception to action: three central problems</h1>
  <div class="d11-col">
    <div class="d11-mk-three">
      <figure class="d11-mk-card b"><img src="assets/mk-goat-map.jpg" alt="A floor plan of a home with the path a robot took to four goals" class="d11-mk-contain"><figcaption><b>Navigation</b><span>Find your way to a goal</span><i>“Nearly done”</i></figcaption></figure>
      <figure class="d11-mk-card b"><img src="assets/mk-walk-panel.jpg" alt="A humanoid robot walking outdoors in San Francisco"><figcaption><b>Locomotion</b><span>Move your body through the world</span><i>“Good progress”</i></figcaption></figure>
      <figure class="d11-mk-card b"><img src="assets/njf-hand-1.jpg" alt="A soft robot hand"><figcaption><b>Manipulation</b><span>Change the world with your hands</span><i>“A long way to go”</i></figcaption></figure>
    </div>
  </div>
  ${cite(MK_CITE + ' · Figures: GOAT (Chang et al. 2023), Radosavovic et al. 2024, Li et al. 2025, all CC BY 4.0')}
`);

/* 0:42-4:08 */
st(`
  <h1 class="t">Navigation: the Airbnb test</h1>
  <div class="d11-col">
    <div class="d11-split d11-mk-split">
      <div class="d11-swap">
        <figure class="d11-fig b" data-step="1"><img src="assets/mk-goat.jpg" alt="GOAT: goals given as an image, a sentence or a category, and the robot's path through a home to four goals in turn"></figure>
        ${mkClip(42, 205, 'Malik talk: the GOAT robot finding objects in a home it has never seen').replace('class="d11-yt d11-mk-clip b"', 'class="d11-yt d11-mk-clip b" data-step="5"')}
      </div>
      <div class="d11-side">
        <div class="d11-step b" data-step="1">Rent a home the robot has never seen. Put it down, give it a goal</div>
        <div class="d11-step b" data-step="2">The goal can be a <b>word</b>, a <b>photo</b> or a <b>sentence</b>: “the red cup on the brown leather chair”</div>
        <div class="d11-step b" data-step="3">It builds a memory of the objects it sees, so the next search is faster</div>
        <div class="d11-callout b" data-step="4">9 homes, 675 goals: 83% success. 60% on the first goal, 90% once it had explored</div>
      </div>
    </div>
  </div>
  ${cite('GOAT: GO to Any Thing, Chang et al. (with Malik), arXiv 2023, CC BY 4.0 · Clip: ' + MK_CITE)}
`);

/* 4:08-6:00 */
st(`
  <h1 class="t">Locomotion: walking in San Francisco</h1>
  <div class="d11-col">
    <div class="d11-split d11-mk-split">
      <div class="d11-swap">
        <figure class="d11-fig b" data-step="1"><img src="assets/mk-walk-sf.jpg" alt="Twelve photos of a humanoid robot walking in different places around San Francisco"></figure>
        ${mkClip(268, 330, 'Malik talk: a humanoid robot walking up steep San Francisco hills').replace('class="d11-yt d11-mk-clip b"', 'class="d11-yt d11-mk-clip b" data-step="4"')}
      </div>
      <div class="d11-side">
        <div class="d11-step b" data-step="1">A full-size humanoid, trained in <b>simulation</b>, then walking in the city with no extra training</div>
        <div class="d11-step b" data-step="2">It can learn from as little as 27 hours of walking data. Its data includes simulation, motion capture and videos of people</div>
        <div class="d11-callout b" data-step="3">Malik’s test: the steepest hill in San Francisco, a 41% slope</div>
      </div>
    </div>
  </div>
  ${cite('Radosavovic et al. (with Malik), Humanoid Locomotion as Next Token Prediction, arXiv 2024, CC BY 4.0 · Clip: ' + MK_CITE)}
`);

/* 6:17-7:28 */
st(`
  <h1 class="t">Manipulation: why is it so hard?</h1>
  <div class="d11-col">
    <div class="d11-take b" data-step="1">The data we need: what the robot sensed and how it moved, recorded <b>in the robot’s own body</b></div>
    <div class="d11-mk-data b" data-step="2">
      <svg viewBox="0 0 202 202" role="img" aria-label="A grid of 10,000 small squares. One dark square is what a child hears by age 10; the whole grid is what a language model is trained on">
        <defs><pattern id="d11-mk-cell" width="2" height="2" patternUnits="userSpaceOnUse"><rect x="0.2" y="0.2" width="1.6" height="1.6" fill="#cbd5e1"/></pattern></defs>
        <rect x="1" y="1" width="200" height="200" fill="url(#d11-mk-cell)"/>
        <rect x="1.2" y="1.2" width="1.6" height="1.6" fill="#0f172a"/>
      </svg>
      <div class="d11-mk-key">
        <div><span class="d11-mk-sq d11-mk-dark"></span><b>One square</b>: the words a child hears by age 10, about 100 million</div>
        <div><span class="d11-mk-sq"></span><b>All 10,000 squares</b>: what a large language model is trained on, close to a trillion</div>
      </div>
    </div>
    <div class="d11-callout b" data-step="3">About 10,000 times more data than a child. Robots can’t afford to be that wasteful: we don’t even have these recordings for humans</div>
  </div>
  ${cite(MK_CITE + ' (his estimates); grid to scale')}
`);

/* 7:34-11:27, names of the levels from 42:02 */
st(`
  <h1 class="t">Action has three levels</h1>
  <div class="d11-col">
    <div class="d11-mk-levels">
      <div class="d11-mk-level b"><small>Goals and plans · Aristotle</small><b>“Make an omelette” → “crack eggs into the bowl”</b><span>Language models are good at this level</span></div>
      <div class="d11-mk-level b"><small>Motion through space · Euclid</small><b>The path of the hand as it picks up an egg</b><span>A sugar cube or a heavy tray: same words, very different motions</span></div>
      <div class="d11-mk-level b"><small>Forces · Newton</small><b>Grip hard enough that it doesn’t slip, gently enough that it doesn’t break</b><span>Felt through touch sensors in the skin</span></div>
    </div>
    <div class="d11-callout b">Action = movement + goal. Language helps with the goal, not the movement</div>
  </div>
  ${cite(MK_CITE)}
`);

/* Shreya's Google slide 29 ("data" and her link), moved here from learning.js on 2026-11-16: it shows how limited
   robot data is, then the next slide gives the three ways to get more. Title is a draft. Numbers quoted from the
   Scale AI post (a company blog). */
st(`
  <h1 class="t">Where does robot data come from?</h1>
  <div class="d11-col">
    <div class="d11-quotes">
      <div class="d11-big b">Language models: <b>trillions of tokens</b> from the internet</div>
      <div class="d11-big b">Vision models: <b>billions of images</b></div>
      <div class="d11-big b">Robots: the open datasets DROID and Open X-Embodiment, about <b>5,000 hours</b> combined
        <small>Robot interaction data can’t be scraped from the web: it has to be collected in the real world</small></div>
      <div class="d11-callout b">So who collects it, how, and at what cost?</div>
    </div>
  </div>
  ${cite('Scale AI, “Expanding Our Data Engine for Physical AI”, Ben Levin, 24 Sept 2025 (a company blog post)')}
`);

/* 13:04-18:39: his walk-through of the three standard answers, one slide each, in his order. Each ends with the clip
   of that part of the talk. Shreya's own slides "Diffusion Policy" (behavior cloning on teleoperation data, his 18:30
   remark) and "Reinforcement learning" (training in simulation) move here from learning.js, where they answer him. */
const T = d11Tex;
st(`
  <h1 class="t">1. Teleoperation</h1>
  <div class="d11-col">
    <div class="d11-split d11-mk-split">
      <div class="d11-swap">
        <figure class="d11-fig b" data-step="1"><img src="assets/mk-droid.jpg" alt="The DROID data-collection setup: a robot arm on a portable desk with cameras, and a VR headset the operator uses to drive it"></figure>
        ${mkClip(793, 936, 'Malik talk: teleoperation').replace('class="d11-yt d11-mk-clip b"', 'class="d11-yt d11-mk-clip b" data-step="5"')}
      </div>
      <div class="d11-side">
        <div class="d11-step b" data-step="1">A person drives the robot, here with a VR headset, and we record what it sees and does</div>
        <div class="d11-step b" data-step="2">The data is in the robot’s own body: exactly what we need</div>
        <div class="d11-step b" data-step="3">But it makes a person behave like a robot: the operator can see, but can’t <b>feel</b></div>
        <div class="d11-callout b" data-step="4">So the motions come out slow and clumsy. Demo videos are often sped up about 5×</div>
      </div>
    </div>
  </div>
  ${cite('Photo: DROID, Khazatsky et al., 2024 (CC BY 4.0) · ' + MK_CITE)}
`);

/* Shreya's slide, moved from learning.js: what people train on teleoperation data. */
st(`
  <h1 class="t">Diffusion Policy</h1>
  <div class="d11-col">
    <div class="d11-split d11-fwrap">
      <canvas class="d11-canvas b" data-step="2" data-anim="noiseStill" width="620" height="400" aria-label="Dots for a sequence of robot actions, starting as random noise and becoming a smooth path from a start to a goal"></canvas>
      <div class="d11-side">
        <div class="d11-step b" data-step="1"><b>Imitation learning</b> methods: learn from demonstrations</div>
        <div class="d11-step b" data-step="2">Start from noise: a random sequence of actions</div>
        <div class="d11-step b" data-step="3" data-anim="denoise">Denoise, step by step, given what the camera sees</div>
        <div class="d11-callout b" data-step="4">How can we get the target trajectories?</div>
      </div>
    </div>
  </div>
  ${cite('Chi et al., Diffusion Policy: Visuomotor Policy Learning via Action Diffusion, RSS 2023 · Illustration made for this course')}
`);

st(`
  <h1 class="t">2. Videos of people</h1>
  <div class="d11-col">
    <div class="d11-split d11-mk-split d11-mk-wide">
      <div class="d11-swap">
        <figure class="d11-fig b" data-step="1"><img src="assets/mk-dexmv.jpg" alt="Top row: video of a person's hand moving objects. Middle: the hand and object recovered in 3D. Bottom: a robot hand doing the same tasks in a simulator"></figure>
        ${mkClip(936, 1006, 'Malik talk: learning from videos of people').replace('class="d11-yt d11-mk-clip b"', 'class="d11-yt d11-mk-clip b" data-step="5"')}
      </div>
      <div class="d11-side">
        <div class="d11-step b" data-step="1">Film people doing the task: natural, and there is a lot of it</div>
        <div class="d11-step b" data-step="2">Recover the hand in 3D, then turn its motion into robot motion</div>
        <div class="d11-step b" data-step="3">Problem 1: a different body. The motion has to be translated</div>
        <div class="d11-callout b" data-step="4">Problem 2: a video shows no forces</div>
      </div>
    </div>
  </div>
  ${cite('Figure: DexMV, Qin et al., 2022 (CC BY 4.0) · ' + MK_CITE)}
`);

st(`
  <h1 class="t">3. Simulation</h1>
  <div class="d11-col">
    <div class="d11-split d11-mk-split">
      <div class="d11-swap">
        <figure class="d11-fig b" data-step="1"><img src="assets/ex-sim.jpg" alt="Simulated robots learning in a physics simulator: a humanoid, an arm, a legged robot and a hand"></figure>
        ${mkClip(1006, 1119, 'Malik talk: simulation').replace('class="d11-yt d11-mk-clip b"', 'class="d11-yt d11-mk-clip b" data-step="5"')}
      </div>
      <div class="d11-side">
        <div class="d11-step b" data-step="1">Practice in a physics simulator: everything is there, forces included</div>
        <div class="d11-step b" data-step="2">It already worked: navigation and locomotion were both trained this way</div>
        <div class="d11-step b" data-step="3">Too different from the real world? Malik: “just more engineering”</div>
        <div class="d11-callout b" data-step="4">The real problem: telling the robot what “good” means</div>
      </div>
    </div>
  </div>
  ${cite('Figure: Isaac Gym, Makoviychuk et al., 2021 (CC BY 4.0) · ' + MK_CITE)}
`);

/* Shreya's slide, moved from learning.js: how a robot practices in simulation. */
st(`
  <h1 class="t">Reinforcement learning</h1>
  <div class="d11-col">
    <div class="d11-split">
      <svg class="d11-svg" viewBox="0 0 560 380" role="img" aria-label="The reinforcement learning loop: the agent sends an action to the environment, which returns a new state and a reward">
        <defs><marker id="d11-ah4" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#0f172a"/></marker></defs>
        <g class="b" data-step="1"><rect x="190" y="30" width="180" height="80" rx="14" fill="#fff" stroke="#0f172a" stroke-width="3"/>
          <text x="280" y="68" text-anchor="middle" font-size="26" font-weight="700">Agent</text><text x="280" y="94" text-anchor="middle" font-size="17" fill="#64748b">the robot’s policy π</text></g>
        <g class="b" data-step="1"><rect x="190" y="260" width="180" height="80" rx="14" fill="#fff" stroke="#0f172a" stroke-width="3"/>
          <text x="280" y="298" text-anchor="middle" font-size="26" font-weight="700">Environment</text><text x="280" y="324" text-anchor="middle" font-size="17" fill="#64748b">the world</text></g>
        <g class="b" data-step="2"><path d="M370 70 C 470 70, 470 300, 378 300" fill="none" stroke="#0f172a" stroke-width="3" marker-end="url(#d11-ah4)"/>
          <text x="478" y="190" font-size="22" font-style="italic">action a<tspan font-size="15" dy="5">t</tspan></text></g>
        <g class="b" data-step="3"><path d="M190 300 C 90 300, 90 70, 182 70" fill="none" stroke="#0f172a" stroke-width="3" marker-end="url(#d11-ah4)"/>
          <text x="6" y="170" font-size="22" font-style="italic">state s<tspan font-size="15" dy="5">t+1</tspan></text>
          <text x="6" y="206" font-size="22" font-style="italic">reward r<tspan font-size="15" dy="5">t+1</tspan></text></g>
      </svg>
      <div class="d11-side">
        <div class="d11-step b" data-step="2">The robot acts</div>
        <div class="d11-step b" data-step="3">The world changes, and gives a reward</div>
        <div class="d11-math b" data-step="4">${T(String.raw`\max_{\pi}\; \mathbb E\Big[\sum_{t} \gamma^{t}\, r_t\Big]`)}</div>
        <div class="d11-callout b" data-step="4">Learning from rewards, by trial and error</div>
      </div>
    </div>
  </div>
`);

/* 17:43-18:39: the reward problem. The reward terms are an illustration, not his slide. */
st(`
  <h1 class="t">The catch: writing the reward</h1>
  <div class="d11-col">
    <div class="d11-step b" data-step="1">Malik’s example: a robot learning to pour. Every stage needs its own term in the reward</div>
    <div class="d11-math d11-mk-reward b" data-step="2">${T(String.raw`r \;=\; w_1\, r_{\text{reach}} + w_2\, r_{\text{grasp}} + w_3\, r_{\text{lift}} + w_4\, r_{\text{tilt}} + \dots + w_{10}\, r_{\text{pour}}`)}<small>illustration</small></div>
    <div class="d11-step b" data-step="3">About 10 terms here. For some tasks, 150. And every weight <i>w</i> has to be tuned by hand</div>
    <div class="d11-callout b" data-step="4">So many people gave up and copied teleoperation data instead: with Diffusion Policy you are running on day two</div>
  </div>
  ${cite(MK_CITE)}
`);

st(`
  <h1 class="t">Three ways to get robot data: which would you bet on?</h1>
  <div class="d11-col">
    <div class="d11-mk-three d11-mk-src">
      <div class="d11-mk-srccard b"><b>Teleoperation</b><span>A person drives the robot and we record it</span>
        <em>+ The right body</em><em>− Slow and clumsy: the operator sees but can’t feel</em></div>
      <div class="d11-mk-srccard b"><b>Videos of people</b><span>Millions of hours already exist</span>
        <em>+ Natural, plentiful</em><em>− A different body, and no forces</em></div>
      <div class="d11-mk-srccard b"><b>Simulation</b><span>Practice in a physics simulator</span>
        <em>+ Everything, forces included. It worked for walking and navigation</em><em>− Writing rewards for manipulation is hard</em></div>
    </div>
  </div>
  ${cite(MK_CITE)}
`);
}
