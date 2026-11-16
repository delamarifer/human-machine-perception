/* PART: selfmodel (Day 11, owner: Shreya). Built 2026-11-16 from Shreya's Google Slides, slides 11-16:
   Vision for Self-State Estimation; What is missing in the 3D Scene Representation?; How do Robots Work Today (her TODO:
   a robot arm with arrows to segments and sensors: drawn here, and it moves); the untitled 3D-printed hands slide;
   Robot State Estimation & Control From Vision Alone; Robots that know themselves (her CSAIL news link).
   Her images (photos of a talk's slides) are cropped to the figures; sources are the ones printed on them.
   Neural Jacobian Fields facts from MIT News, 2025-07-24, "Robot, know thyself" (the CSAIL page refuses automated reads).
   No speaker notes. */
{
section('Robots that know themselves');

/* Google slide 11, her words, one per click */
st(`
  <h1 class="t">Vision for Self-State Estimation</h1>
  <div class="d11-col">
    <ul class="d11-list">
      <li class="b">Not a well established research direction in the community</li>
      <li class="b">What do you think is your visual representation of your own embodiment?</li>
      <li class="b">Look at your hand, and think about how it will move when you activate different muscles</li>
    </ul>
    <div class="d11-take b">Your visual system can predict what can happen when you take an action.</div>
  </div>
`);

/* Google slide 12. Image: Shen et al. 2023, Distilled Feature Fields Enable Few-Shot Language-Guided Manipulation (F3RM). */
st(`
  <h1 class="t">What is missing in the 3D Scene Representation?</h1>
  <div class="d11-col">
    <div class="d11-split">
      <figure class="d11-fig b" data-step="1"><img src="assets/f3rm-fig1.jpg" alt="Left: a robot arm scans a table of objects with a camera from many angles. Right: the 3D feature field of the table, with the robot gone"></figure>
      <div class="d11-side">
        <div class="d11-step b" data-step="1"><b>1.</b> Scan Scene</div>
        <div class="d11-step b" data-step="2"><b>2.</b> Train NeRF and Distill Features</div>
        <div class="d11-callout b" data-step="3">First frame has a robot. Second frame has <b>no robot</b>.</div>
        <div class="d11-split2 b" data-step="4">
          <div><small>Robotics</small>the robot’s state</div>
          <div><small>Vision</small>the state of the environment</div>
        </div>
      </div>
    </div>
  </div>
  ${cite('Figure: Shen et al., Distilled Feature Fields Enable Few-Shot Language-Guided Manipulation, CoRL 2023 (CC BY 4.0), panels 1-2')}
`);

/* Google slide 13: her TODO "insert image of a robot arm, include arrows pointing to the different parts (segments and
   sensors)". Drawn arm (lib.js moves it): the joints turn and the sensor readout updates.
   Her "$25,000" line was removed at her request (2026-11-16) for a broader point (draft) that leads into the next
   slide: knowing your pose from joint sensors needs a body built to match an exact model. */
st(`
  <h1 class="t">How do robots work today?</h1>
  <div class="d11-col">
    <div class="d11-split">
      <div class="d11-armbox b" data-step="1">
        <svg class="d11-arm" viewBox="0 0 560 420" role="img" aria-label="A drawing of a robot arm: three rigid segments joined by three joints, each with an angle sensor">
          <rect x="190" y="372" width="140" height="22" rx="4" fill="#cbd5e1"/>
          <g class="d11-j0" data-o="260 360">
            <line x1="260" y1="360" x2="260" y2="210" stroke="#0f172a" stroke-width="26" stroke-linecap="round"/>
            <circle cx="260" cy="360" r="20" fill="#fff" stroke="#0f172a" stroke-width="5"/><circle cx="260" cy="360" r="6" fill="#0f172a"/>
            <g class="d11-j1" data-o="260 210">
              <line x1="260" y1="210" x2="400" y2="210" stroke="#0f172a" stroke-width="22" stroke-linecap="round"/>
              <circle cx="260" cy="210" r="18" fill="#fff" stroke="#0f172a" stroke-width="5"/><circle cx="260" cy="210" r="5" fill="#0f172a"/>
              <g class="d11-j2" data-o="400 210">
                <line x1="400" y1="210" x2="400" y2="290" stroke="#0f172a" stroke-width="18" stroke-linecap="round"/>
                <path d="M384 296 h32 M384 296 v26 M416 296 v26" stroke="#0f172a" stroke-width="7" fill="none" stroke-linecap="round"/>
                <circle cx="400" cy="210" r="16" fill="#fff" stroke="#0f172a" stroke-width="5"/><circle cx="400" cy="210" r="5" fill="#0f172a"/>
              </g>
            </g>
          </g>
          <g class="d11-armlab b" data-step="2" font-family="inherit" font-size="22" fill="#0f172a">
            <text x="20" y="290">Rigid segments</text>
            <line x1="180" y1="284" x2="236" y2="284" stroke="#0f172a" stroke-width="2.5" marker-end="url(#d11-ah)"/>
          </g>
          <g class="d11-armlab b" data-step="3" font-family="inherit" font-size="22" fill="#0f172a">
            <text x="400" y="80" text-anchor="middle">Joints with precise sensors</text>
            <line x1="420" y1="92" x2="404" y2="182" stroke="#0f172a" stroke-width="2.5" marker-end="url(#d11-ah)"/>
            <line x1="360" y1="92" x2="280" y2="190" stroke="#0f172a" stroke-width="2.5" marker-end="url(#d11-ah)"/>
          </g>
          <defs><marker id="d11-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#0f172a"/></marker></defs>
        </svg>
      </div>
      <div class="d11-side">
        <div class="d11-readout b" data-step="4">
          <small>Joint sensors report</small>
          <div><span>θ<sub>1</sub></span><b class="d11-r0">0°</b></div>
          <div><span>θ<sub>2</sub></span><b class="d11-r1">0°</b></div>
          <div><span>θ<sub>3</sub></span><b class="d11-r2">0°</b></div>
        </div>
        <div class="d11-step d11-arm-go b" data-step="4">Each sensor reports the angle of its joint</div>
        <div class="d11-callout b" data-step="5">It’s basically <b>blind</b>: it knows its pose from the sensors at the joints, not from vision</div>
        <div class="d11-step b" data-step="6">This only works because the body is built to match an exact model: rigid parts, precise sensors</div>
      </div>
    </div>
  </div>
`);

/* Google slide 14 (no title there; this one is a draft taken from the point of the image). */
st(`
  <h1 class="t">What about cheap, soft, 3D-printed robots?</h1>
  <div class="d11-col">
    <div class="d11-duo">
      <figure class="d11-fig b" data-step="1"><img src="assets/vcj-hand.jpg" alt="A robot hand with bones, tendons and ligaments, 3D printed in one piece"><figcaption>A hand with bones and tendons</figcaption></figure>
      <figure class="d11-fig b" data-step="2"><img src="assets/vcj-walker.jpg" alt="A six-legged walking robot with a gripper, 3D printed in one piece, with air tubes connected"><figcaption>A walking robot driven by air</figcaption></figure>
    </div>
    <div class="d11-pair2">
      <div class="d11-step b" data-step="2">3D printed in one piece, no assembly. Connect tubes to each of the joints</div>
      <div class="d11-callout b" data-step="3">No precise joint sensors, no exact model: how do we <b>model</b> and <b>control</b> them?</div>
    </div>
  </div>
  ${cite('Photos: Buchner et al., Vision-controlled jetting for composite systems and robots, Nature 2023 (ETH Zurich, Inkbit, MIT; CC BY 4.0), Figs 1e and 4a')}
`);

/* Google slide 15, her words. Her first line ends "solve for the actions the": shown as "solve for the actions". */
st(`
  <h1 class="t">Robot State Estimation &amp; Control From Vision Alone</h1>
  <div class="d11-col">
    <div class="d11-split d11-njf">
      <div class="d11-swap">
        <figure class="d11-fig b" data-step="1"><img src="assets/njf-fig1a.jpg" alt="From one camera image, a network predicts how each point of a robot hand moves for a motor command"></figure>
        <figure class="d11-fig b" data-step="2"><img src="assets/njf-fig1b.jpg" alt="An optimizer finds the command that produces a desired motion, and the hand executes it"></figure>
      </div>
      <div class="d11-side">
        <div class="d11-step b" data-step="1">From one image: how each point moves for each command</div>
        <div class="d11-step b" data-step="2">Given motion trajectories, solve for the actions</div>
        <div class="d11-callout b" data-step="3">Cannot predict what happens if you apply a certain amount of pressure</div>
      </div>
    </div>
  </div>
  ${cite('Figure: Li et al., Controlling diverse robots by inferring Jacobian fields with deep networks, Nature 2025 (CC BY 4.0), Fig. 1a and 1b')}
`);

/* Google slide 16: her CSAIL news link. Facts from MIT News (2025-07-24) and the paper in Nature (2025-06-25):
   Li, S. L., Zhang, A., Chen, B., Matusik, H., Liu, C., Rus, D., Sitzmann, V. Neural Jacobian Fields (NJF). */
st(`
  <h1 class="t">Robots that know themselves</h1>
  <div class="d11-col">
    <div class="d11-themes">
      <div class="d11-theme b"><b>Train</b>
        <div class="d11-quote">The robot makes random motions while several cameras film it</div></div>
      <div class="d11-theme b"><b>Learn</b>
        <div class="d11-quote">Its 3D shape, and how each point of its body moves for each motor command. No body sensors, no hand-built model</div></div>
      <div class="d11-theme b"><b>Use</b>
        <div class="d11-quote">One ordinary camera is enough for closed-loop control, about 12 times a second</div></div>
      <div class="d11-theme b"><b>Tested on</b>
        <div class="d11-quote">A soft pneumatic hand, a rigid Allegro hand, a 3D-printed arm, a rotating platform with no sensors</div></div>
      <div class="d11-theme b"><b>Limits</b>
        <div class="d11-quote">Retrain for each robot. No sense of force or touch</div></div>
    </div>
  </div>
  ${cite('Neural Jacobian Fields: Li, Sitzmann, Rus et al., Nature, 2025 · MIT News, July 2025')}
`);
}
