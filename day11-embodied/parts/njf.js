/* PART: njf (Day 11, owner: Shreya). Built 2026-11-16 from Shreya's Google Slides 17-26 (Background: Body Jacobian,
   Learn Jacobian Field, 3D flow field, 2D flow is the projection of 3D flow, Training data, Self-supervised training x2,
   the predicted 3D motion, control with Jacobian fields, Given motion trajectory). Her images were photos of a talk's slides;
   Shreya asked for new images, so: drawings and animations made for this deck (lib.js), and figures from the paper,
   Li et al., Controlling diverse robots by inferring Jacobian fields with deep networks, Nature 2025 (CC BY 4.0).
   Her comments applied: "include an image and latex of formula" (17); "include image and animation for neural jacobian
   Field" (18); "animate the predicted 3D motion" (24); "include better math to explain this along w latex formulas" (25).
   The math is standard; where the paper's exact loss or solver differs, the slide says "in words" or "in the paper".
   No speaker notes. */
{
section('Jacobian fields');

const T = d11Tex;

/* Google slide 17 */
st(`
  <h1 class="t">Background: Body Jacobian</h1>
  <div class="d11-col">
    <div class="d11-split">
      <svg class="d11-svg" viewBox="0 0 560 420" data-anim="armInit" role="img" aria-label="A three-joint robot arm with a point x at its tip; arrows show how x moves when each joint turns">
        <defs><marker id="d11-ah2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#0f172a"/></marker></defs>
        <rect x="90" y="382" width="100" height="20" rx="4" fill="#cbd5e1"/>
        <g stroke="#0f172a" stroke-linecap="round"><line class="d11-link" stroke-width="22"/><line class="d11-link" stroke-width="18"/><line class="d11-link" stroke-width="14"/></g>
        <g fill="#fff" stroke="#0f172a" stroke-width="4"><circle class="d11-joint" r="14"/><circle class="d11-joint" r="12"/><circle class="d11-joint" r="10"/></g>
        <g font-size="22" font-style="italic" fill="#64748b" font-family="KaTeX_Math, serif"><text class="d11-qlab">q₁</text><text class="d11-qlab">q₂</text><text class="d11-qlab">q₃</text></g>
        <circle class="d11-tip" r="8" fill="#0f172a"/>
        <text class="d11-tiplab" font-size="26" font-weight="700" font-family="KaTeX_Main, serif">x</text>
        ${[0, 1, 2].map(k => `<g class="d11-jcol b" data-step="${k + 2}" data-k="${k}" data-anim="armWiggle"><line stroke="#0f172a" stroke-width="3.5" marker-end="url(#d11-ah2)"/><text font-size="22" font-family="KaTeX_Main, serif">J<tspan font-size="15" dy="5">${k + 1}</tspan></text></g>`).join('')}
      </svg>
      <div class="d11-side">
        <div class="d11-step b" data-step="1">A robot with points <b>x</b> in 3D space. Each joint angle <i>q</i><sub>i</sub> is a motor command</div>
        <div class="d11-note b" data-step="2">Turn one joint a little: the point moves along one arrow</div>
        <div class="d11-mathbig b" data-step="5">${T(String.raw`\dot{\mathbf x} = J(\mathbf q)\,\dot{\mathbf q}`)}</div>
        <div class="d11-step b" data-step="5">For any 3D point on the robot, we can find its body Jacobian <i>J</i>: one column per joint</div>
      </div>
    </div>
  </div>
`);

/* Google slide 17, continued: the formula in full (her comment: "latex of formula"), and her last line. */
st(`
  <h1 class="t">Body Jacobian: the formula</h1>
  <div class="d11-col">
    <div class="d11-mathbig b" data-step="1">${T(String.raw`\begin{bmatrix}\dot x\\ \dot y\\ \dot z\end{bmatrix} = \underbrace{\begin{bmatrix} | & | & & | \\ J_1 & J_2 & \cdots & J_n \\ | & | & & | \end{bmatrix}}_{J(\mathbf q)\,\in\,\mathbb R^{3\times n}} \begin{bmatrix}\dot q_1\\ \vdots\\ \dot q_n\end{bmatrix}`)}</div>
    <div class="d11-note b" data-step="1" style="text-align:center">Column <i>i</i>: how the point moves when only joint <i>i</i> turns</div>
    <div class="d11-mathbig b" data-step="2">${T(String.raw`\mathbf x(\mathbf q + \delta\mathbf q) \;\approx\; \mathbf x(\mathbf q) + J(\mathbf q)\,\delta\mathbf q, \qquad J = \frac{\partial \mathbf x}{\partial \mathbf q}`)}</div>
    <div class="d11-take b" data-step="3">A linearization of the robot: the point’s motion, expressed through the joint angles</div>
  </div>
`);

/* Google slide 18, part 1: the paper's learned Jacobian fields (Nature 2025, Fig. 2a-b). */
st(`
  <h1 class="t">Learn a Jacobian field</h1>
  <div class="d11-col">
    <figure class="d11-fig d11-wide d11-short b" data-step="1"><img src="assets/njf-fig2ab.jpg" alt="Left: from one observation of a robot hand, the model predicts depth and a Jacobian field in 3D. Right: for each command, arrows show how each part of the hand will move, prediction next to truth"></figure>
    <div class="d11-mathbig b" data-step="2">${T(String.raw`\delta\mathbf x \;=\; J_\theta(\mathbf x \mid I)\;\delta\mathbf u`)}</div>
    <div class="d11-step b" data-step="3" style="text-align:center">For every point <b>x</b> in space, a network predicts this matrix from one image <i>I</i>. It expresses that point’s motion for any command <b>u</b>: no joints needed, so soft robots work too</div>
  </div>
  ${cite('Figure: Li et al., Nature 2025 (CC BY 4.0), Fig. 2a-b')}
`);

/* Google slide 18, part 2: her comment asks for an animation of the field. Illustration made for the deck. */
st(`
  <h1 class="t">A Jacobian field on a soft finger</h1>
  <div class="d11-col">
    <div class="d11-split d11-fwrap">
      <canvas class="d11-canvas b" data-step="1" data-anim="fingerStill" width="520" height="400" aria-label="A soft finger with dots along it; arrows show how each dot moves when the bend command grows"></canvas>
      <div class="d11-side">
        <div class="d11-step b" data-step="1">A soft finger: no joints, one command <i>u</i> (how much to bend)</div>
        <div class="d11-step b" data-step="2" data-anim="fingerField">Every point gets an arrow: its Jacobian, how it moves when <i>u</i> grows</div>
        <div class="d11-step b" data-step="3" data-anim="fingerMove">Change <i>u</i>: each point follows its arrow</div>
        <div class="d11-callout b" data-step="4">How could we supervise this? We don’t have the true Jacobian for every point in space…</div>
      </div>
    </div>
  </div>
  ${cite('Illustration made for this course: one bend command, constant curvature')}
`);

/* Google slide 19: her text "3D flow field". Title is a draft. */
st(`
  <h1 class="t">The key insight: 3D flow</h1>
  <div class="d11-col">
    <div class="d11-mathbig b" data-step="1">${T(String.raw`\underbrace{\dot{\mathbf x}}_{\substack{\text{how each 3D point moves}\\ \text{(the 3D flow field)}}} \;=\; J(\mathbf x, I)\;\underbrace{\dot{\mathbf u}}_{\text{the command}}`)}</div>
    <div class="d11-take b" data-step="2">This equation links the 3D flow we can see to the actions we send</div>
    <div class="d11-note b" data-step="3" style="text-align:center">If we could measure the 3D flow for many commands, we could learn <i>J</i> from it</div>
  </div>
`);

/* Google slide 20, her words: "2D flow is the projection of 3D flow. We will supervise..." Drawing computed in lib.js. */
st(`
  <h1 class="t">Scene flow and optical flow</h1>
  <div class="d11-col">
    <div class="d11-split">
      <svg class="d11-svg" viewBox="0 0 600 430" data-anim="camInit" role="img" aria-label="A camera seen from the side: three 3D points move, and their images on the image plane move too">
        <defs><marker id="d11-ah3" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#0f172a"/></marker></defs>
        <line x1="60" y1="240" x2="540" y2="240" stroke="#0f172a" stroke-width="3"/>
        <text x="440" y="266" font-size="18" fill="#64748b">image plane</text>
        <circle cx="300" cy="410" r="7" fill="#0f172a"/><text x="314" y="416" font-size="18" fill="#64748b">camera center</text>
        ${D11_CAM.pts.map((_, i) => `<g class="d11-p${i}">
          <line class="d11-ray b" data-step="3" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5 5"/>
          <line class="d11-f3 b" data-step="2" stroke="#0f172a" stroke-width="3" marker-end="url(#d11-ah3)"/>
          <circle class="d11-pt" r="8" fill="#0f172a"/>
          <line class="d11-f2 b" data-step="3" stroke="#0f172a" stroke-width="3" marker-end="url(#d11-ah3)"/>
          <circle class="d11-ip b" data-step="3" r="5" fill="#0f172a"/></g>`).join('')}
        <g class="b" data-step="4" data-anim="camMove"></g>
        <text x="24" y="40" font-size="18" fill="#64748b">3D points</text>
      </svg>
      <div class="d11-side">
        <div class="d11-step b" data-step="2"><b>Scene flow:</b> each 3D point’s motion</div>
        <div class="d11-step b" data-step="3"><b>Optical flow:</b> the same motion, projected into the image</div>
        <div class="d11-math b" data-step="4">${T(String.raw`\mathbf u_v \;=\; \pi_v(\mathbf x + \delta\mathbf x) \;-\; \pi_v(\mathbf x)`)}</div>
        <div class="d11-note b" data-step="4">π<sub>v</sub>: projection into camera <i>v</i>. 2D flow is the projection of 3D flow</div>
        <div class="d11-callout b" data-step="5">We supervise <i>J</i> by making its predicted motion, projected, match the optical flow in every camera</div>
      </div>
    </div>
  </div>
`);

/* Google slide 21, her words. Photo: Nature 2025 Fig. 4a (the HSA platform). 12 RGB-D cameras: the paper's method figure. */
st(`
  <h1 class="t">Training data: multi-view video plus actions</h1>
  <div class="d11-col">
    <div class="d11-split">
      <figure class="d11-fig b" data-step="1"><img src="assets/njf-hsa.jpg" alt="A robot platform standing on four black spiral columns, with a motor box at the bottom"></figure>
      <div class="d11-side">
        <div class="d11-step b" data-step="1">From an MIT lab: a metamaterial robot</div>
        <div class="d11-step b" data-step="2">Each column is a spiral</div>
        <div class="d11-step b" data-step="3">The motors are at the bottom</div>
        <div class="d11-callout b" data-step="4">Send random commands, and film the result from many cameras (12 in the paper)</div>
      </div>
    </div>
  </div>
  ${cite('Photo: Li et al., Nature 2025 (CC BY 4.0), Fig. 4a')}
`);

/* Google slide 22, her words. Neural 3D reconstruction from one image: pixelNeRF (Yu et al., CVPR 2021). */
st(`
  <h1 class="t">Self-supervised training: 3D from one image</h1>
  <div class="d11-col">
    <div class="d11-pipe">
      <div class="b" data-step="1"><b>One image</b><span>of the robot, from one camera</span></div>
      <div class="b" data-step="2"><b>Neural 3D reconstruction</b><span>a NeRF from a single image (pixelNeRF)</span></div>
      <div class="b" data-step="3"><b>A field over 3D space</b><span>${T(String.raw`\mathbf x \mapsto \big(\mathbf c(\mathbf x),\, \sigma(\mathbf x),\, J(\mathbf x, I)\big)`, false)}<br>color, density, Jacobian</span></div>
      <div class="b" data-step="4"><b>Render other views</b><span>compare with the other cameras</span></div>
    </div>
    <div class="d11-pair2">
      <div class="d11-step b" data-step="4">Train with many views; at test time, one camera is enough</div>
    </div>
  </div>
  ${cite('pixelNeRF: Yu et al., CVPR 2021 · Li et al., Nature 2025')}
`);

/* Google slide 23, her words: "2 losses. Every camera view has a loss on the image. Optical flow loss." The formulas
   are the idea in symbols, not the paper's exact weighting. */
st(`
  <h1 class="t">Self-supervised training: two losses</h1>
  <div class="d11-col">
    <div class="d11-loss">
      <div class="b" data-step="1"><b>1. Image loss</b><span class="d11-note">every camera view: the rendered image should match the photo</span>
        <div class="d11-math">${T(String.raw`\mathcal L_{\text{image}} = \sum_{v} \big\| \hat I_v - I_v \big\|^2`)}</div></div>
      <div class="b" data-step="2"><b>2. Optical flow loss</b><span class="d11-note">the predicted motion, projected, should match the measured flow</span>
        <div class="d11-math">${T(String.raw`\mathcal L_{\text{flow}} = \sum_{v} \big\| \pi_v\!\big(J(\mathbf x, I)\,\delta\mathbf u\big) - \mathbf u_v \big\|^2`)}</div></div>
    </div>
    <div class="d11-mathbig b" data-step="3">${T(String.raw`\mathcal L = \mathcal L_{\text{image}} + \lambda\, \mathcal L_{\text{flow}}`)}</div>
    <div class="d11-note b" data-step="3" style="text-align:center">No labels: the robot’s own random motions supervise it. (The idea in symbols; the paper’s exact form differs in details.)</div>
  </div>
`);

/* Google slide 24 (no title there). Her comment: "animate the predicted 3D motion to show the motion of it moving".
   Frames: Nature 2025 Fig. 3a, top row, shown as a loop. Then the authors' own video (YouTube, the project page). */
st(`
  <h1 class="t">The pneumatic hand, moving</h1>
  <div class="d11-col">
    <div class="d11-swap">
      <div class="b" data-step="1" style="display:grid;grid-template-columns:auto 1fr;gap:3vw;align-items:center">
        <div class="d11-flip" data-anim="flip" style="width:min(44vh,40vw)">
          <img src="assets/njf-hand-1.jpg" alt="The pneumatic hand, with arrows for the desired motion of its fingers"><img src="assets/njf-hand-2.jpg" alt=""><img src="assets/njf-hand-3.jpg" alt="">
        </div>
        <div class="d11-side">
          <div class="d11-step">Arrows: where each point should go</div>
          <div class="d11-note">One camera, a 3D-printed soft hand, no sensors in it: the fingers follow the arrows</div>
        </div>
      </div>
      <div class="d11-yt b" data-step="2"><iframe src="https://www.youtube-nocookie.com/embed/dFZ1RvJMN7A?rel=0" title="Neural Jacobian Fields: technical summary video by the authors" allow="fullscreen; picture-in-picture" allowfullscreen></iframe></div>
    </div>
  </div>
  ${cite('Frames: Li et al., Nature 2025 (CC BY 4.0), Fig. 3a · Video: the authors, project page')}
`);

/* Google slide 25 (no title there; the talk's title was a question). Her comment: "include better math to explain this
   along w latex formulas". Least squares and its pseudo-inverse are standard; the paper solves it by gradient steps. */
st(`
  <h1 class="t">How do we control the robot with a Jacobian field?</h1>
  <div class="d11-col">
    <div class="d11-step b" data-step="1" style="text-align:center">We want each tracked point <b>x</b><sub>i</sub> to move by δ<b>x</b><sub>i</sub><sup>⋆</sup>. Which command does that?</div>
    <div class="d11-mathbig b" data-step="2">${T(String.raw`\delta\mathbf u^\star \;=\; \arg\min_{\delta\mathbf u} \;\sum_{i=1}^{N} \big\| J(\mathbf x_i, I)\,\delta\mathbf u \;-\; \delta\mathbf x_i^\star \big\|^2`)}</div>
    <div class="d11-mathbig b" data-step="3">${T(String.raw`\text{stack all points: } \mathbf J \in \mathbb R^{3N\times n} \quad\Rightarrow\quad \delta\mathbf u^\star = (\mathbf J^\top \mathbf J)^{-1}\mathbf J^\top\, \delta\mathbf x^\star = \mathbf J^{+}\,\delta\mathbf x^\star`)}</div>
    <div class="d11-note b" data-step="4" style="text-align:center">In the paper: a few gradient steps instead of the inverse, about 12 times a second. See, predict <i>J</i>, solve, move, see again</div>
  </div>
  ${cite('Li et al., Nature 2025, Fig. 1b')}
`);

/* Google slide 26, her words: "Use model to solve for everything along trajectory". Figure: Nature 2025 Fig. 3d. */
st(`
  <h1 class="t">Given a motion trajectory</h1>
  <div class="d11-col">
    <div class="d11-split">
      <figure class="d11-fig b" data-step="1"><img src="assets/njf-fig3d.jpg" alt="The pneumatic hand grasps a tool and pushes an apple: the desired path and the motion it completed"></figure>
      <div class="d11-side">
        <div class="d11-step b" data-step="1">Task: grasp a tool and push an apple</div>
        <div class="d11-step b" data-step="2">Use the model to solve for everything along the trajectory</div>
        <div class="d11-math b" data-step="3">${T(String.raw`\delta\mathbf u_t = \arg\min_{\delta\mathbf u}\big\| J(\mathbf x_t, I_t)\,\delta\mathbf u - (\mathbf x^\star_{t+1} - \mathbf x_t)\big\|^2,\quad t = 1,\dots,T`)}</div>
        <div class="d11-note b" data-step="3">At every step: a new image, a new Jacobian, the next small command</div>
      </div>
    </div>
  </div>
  ${cite('Figure: Li et al., Nature 2025 (CC BY 4.0), Fig. 3d')}
`);
}
