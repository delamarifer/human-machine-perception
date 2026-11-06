/* PART: cnns (Day 4). Owner: Fernanda · Shreya.
   PART I: CNNs: From Pixels to Visual Representations.
   Primary reference: MIT Vision Book — https://visionbook.mit.edu/convolutional_neural_nets.html
   Topics: Why MLPs fail on images (parameter explosion, lost 2D topology, no translation equivariance),
   Locality + Weight sharing + 3D multi-channel volumes, Hierarchical feature learning (pixels-to-objects),
   CNN architecture & intermediate feature maps across depth. */
{
section('1. CNNs');

/* Computed 9x9 shifted-X comparison showing why pixel-wise MLPs fail under a 1-pixel shift */
const N = 9;
const makeX = sh => Array.from({length: N}, (_, r) => Array.from({length: N}, (_, c) => {
  const k = c - sh; return r >= 1 && r <= 7 && k >= 1 && k <= 7 && (k === r || k + r === 8) ? 1 : -1;
}));
const XA = makeX(0), XB = makeX(1);
const diffCount = XA.flat().filter((v, idx) => v !== XB.flat()[idx]).length;
const miniGrid = (mat) => `<div style="display:inline-grid;grid-template-columns:repeat(${N},min(1.5vw,2.3vh));gap:1px;background:#cbd5e1;border:1.5px solid #0f172a">
  ${mat.flat().map(v => `<i style="display:block;width:min(1.5vw,2.3vh);height:min(1.5vw,2.3vh);background:${v > 0 ? '#0f172a' : '#fff'}"></i>`).join('')}
</div>`;

st(`
  <h1 class="t">Part I · Why Standard Neural Networks (MLPs) Fail on Images</h1>
  <div class="d4-cols">
    <div style="display:flex;flex-direction:column;gap:1.1vh">
      <div class="d4-card b" data-step="1">
        <div class="lead"><b>Three structural flaws of a fully connected layer <code class="m">z = W · flatten(x) + b</code></b></div>
        <div class="label"><b>1. Parameter explosion:</b> A <code class="m">224×224×3</code> image has <code class="m">150,528</code> inputs. Just <code class="m">1,000</code> hidden units require <b><code class="m">150,528,000</code> weights in a single layer</b>—memorizing training images instead of generalizing.</div>
        <div class="label"><b>2. Destroys 2D spatial topology:</b> Flattening throws away which pixels are neighbors. Permuting all pixels in every image leaves an MLP unchanged!</div>
        <div class="label"><b>3. No translation invariance / equivariance:</b> Weights learned at <code class="m">(20, 30)</code> cannot be reused when the object shifts to <code class="m">(21, 30)</code>.</div>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:1.1vh">
      <div class="d4-card b" data-step="2" style="align-items:center;text-align:center">
        <div class="label"><b>Shifting a <code class="m">9×9</code> image of "X" by just 1 pixel right:</b></div>
        <div style="display:flex;gap:1.8vw;align-items:center;margin:.4vh 0">
          <div>${miniGrid(XA)}<div class="label">Image <code class="m">x</code></div></div>
          <div>${miniGrid(XB)}<div class="label">Shifted <code class="m">T(x)</code></div></div>
        </div>
        <div class="label">To a flattened MLP, <b><code class="m">${diffCount} of ${N * N}</code> input coordinates flip sign</b>—yet every <code class="m">3×3</code> local diagonal &amp; crossing patch matches <code class="m">9 / 9</code> in both!</div>
      </div>
      <div class="d4-code b" data-step="3">
        # Fully connected layer vs. Convolutional layer (first layer on 224×224×3):<br>
        MLP_weights  = (224 * 224 * 3) * 1000 = 150,528,000<br>
        Conv_weights = (3 * 3 * 3)     * 64   =       1,728  # 87,000x fewer!
      </div>
    </div>
  </div>
  ${cite('MIT Vision Book: Convolutional Neural Nets — https://visionbook.mit.edu/convolutional_neural_nets.html')}
`, { notes: [
  "(draft) On Day 3 you already mastered 2D convolution and filter banks. So instead of repeating single-channel convolution basics, let's start Part I with the question from the MIT Vision Book chapter on Convolutional Neural Networks: why can't we just flatten an image and feed it into a standard Multi-Layer Perceptron (MLP)?",
  "(draft) First, look at the three structural flaws of a fully connected layer on the left: (1) Parameter explosion—a 224x224x3 image flattened into 150,528 numbers and connected to 1,000 hidden units requires 150.5 million weights in the very first layer alone. (2) Flattening destroys 2D spatial topology—if you scramble all pixel positions with a fixed permutation across the dataset, an MLP learns the exact same function. (3) Zero translation sharing—an edge detector learned in the top-left corner has completely independent weights from the bottom-right corner.",
  `(draft) Look at the 9 by 9 'X' example on the top-right: shift the X by just one pixel to the right, and ${diffCount} out of 81 pixel coordinates flip sign! To a flattened vector dot-product, those are drastically different vectors. Yet if we look for local 3 by 3 patches (the two diagonals and the center crossing), every piece matches 9 out of 9 in both images.`,
  "(draft) In the code block at the bottom: replacing a dense 1,000-unit layer with 64 learned 3x3x3 filters cuts the parameter count from 150.5 million down to 1,728—an 87,000-fold reduction."
]});

/* Slide 4: From Day 3 2D Filters to 3D Multi-Channel CNN Volumes */
const cnnVolSvg = `<svg viewBox="0 0 540 165" style="width:100%;max-height:17vh;background:#f8fafc;border:1px solid var(--line);border-radius:10px" preserveAspectRatio="xMidYMid meet">
  <!-- Input volume C_in x H x W -->
  <rect x="24" y="34" width="76" height="76" fill="#dbeafe" stroke="#1e40af" stroke-width="1.8"/>
  <rect x="34" y="44" width="76" height="76" fill="#bfdbfe" stroke="#1e40af" stroke-width="1.8"/>
  <rect x="44" y="54" width="76" height="76" fill="#93c5fd" stroke="#1e40af" stroke-width="1.8"/>
  <!-- 3x3xC_in local receptive field patch -->
  <rect x="62" y="70" width="26" height="26" fill="rgba(217,119,6,0.35)" stroke="#d97706" stroke-width="2.5"/>
  <text x="75" y="22" font-family="monospace" font-size="11" font-weight="700" fill="#0f172a" text-anchor="middle">Input x: C_in × H × W</text>
  <text x="75" y="148" font-family="monospace" font-size="10.5" font-weight="700" fill="#d97706" text-anchor="middle">patch K×K×C_in</text>

  <!-- Arrow & 3D filter bank -->
  <text x="152" y="88" font-family="monospace" font-size="18" font-weight="700" fill="#475569">∗</text>
  <rect x="182" y="52" width="38" height="38" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
  <rect x="190" y="60" width="38" height="38" fill="#fde68a" stroke="#d97706" stroke-width="2"/>
  <text x="208" y="22" font-family="monospace" font-size="11" font-weight="700" fill="#0f172a" text-anchor="middle">C_out 3D filters W_k</text>
  <text x="208" y="118" font-family="monospace" font-size="10.5" font-weight="700" fill="#475569" text-anchor="middle">(C_out × C_in × K × K)</text>

  <!-- Arrow to Output feature volume -->
  <text x="262" y="88" font-family="monospace" font-size="18" font-weight="700" fill="#475569">→</text>
  <rect x="292" y="28" width="66" height="66" fill="#dcfce7" stroke="#15803d" stroke-width="1.8"/>
  <rect x="304" y="40" width="66" height="66" fill="#bbf7d0" stroke="#15803d" stroke-width="1.8"/>
  <rect x="316" y="52" width="66" height="66" fill="#86efac" stroke="#15803d" stroke-width="1.8"/>
  <rect x="328" y="64" width="66" height="66" fill="#4ade80" stroke="#15803d" stroke-width="1.8"/>
  <circle cx="352" cy="88" r="4.5" fill="#d97706"/>
  <line x1="88" y1="83" x2="348" y2="88" stroke="#d97706" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="348" y="20" font-family="monospace" font-size="11" font-weight="700" fill="#0f172a" text-anchor="middle">Feature maps: C_out × H' × W'</text>

  <!-- Receptive field growth -->
  <text x="472" y="52" font-family="monospace" font-size="11" font-weight="700" fill="#0f172a" text-anchor="middle">Stacked layers:</text>
  <text x="472" y="74" font-family="monospace" font-size="10.5" fill="#334155" text-anchor="middle">L1: RF = 3×3</text>
  <text x="472" y="94" font-family="monospace" font-size="10.5" fill="#334155" text-anchor="middle">L2: RF = 7×7</text>
  <text x="472" y="114" font-family="monospace" font-size="10.5" fill="#334155" text-anchor="middle">L5: RF = 63×63</text>
  <text x="472" y="134" font-family="monospace" font-size="10.5" font-weight="700" fill="#1e40af" text-anchor="middle">Deep: full image</text>
</svg>`;

st(`
  <h1 class="t">Multi-Channel 3D CNN Volumes &amp; Inductive Biases</h1>
  <div class="b" data-step="1">${cnnVolSvg}</div>
  <div class="d4-cols">
    <div class="d4-card b" data-step="2">
      <div class="lead"><b>Two inductive biases built into every Conv layer</b></div>
      <div class="label">• <b>Locality (sparse connectivity):</b> Each output unit only inspects a <code class="m">K × K × C<sub>in</sub></code> local neighborhood, matching the spatial correlation of natural images.</div>
      <div class="label">• <b>Weight sharing (translation equivariance):</b> The same filter <code class="m">W<sub>k</sub></code> slides over all <code class="m">(m, n)</code> positions, so shifting the input shifts the feature map: <code class="m">f(shift(x)) = shift(f(x))</code>.</div>
    </div>
    <div class="d4-code b" data-step="3">
      # Multi-channel 3D convolution + ReLU + Pooling:<br>
      z[k, m, n] = sum_{c=1..C_in} sum_{i,j} W[k, c, i, j] * x[c, m*s+i, n*s+j] + b[k]<br>
      a[k, m, n] = max(0, z[k, m, n])  # ReLU prevents linear collapse!<br><br>
      # Effective receptive field at layer l:<br>
      RF_l = RF_{l-1} + (K_l - 1) * prod_{i &lt; l} stride_i
    </div>
  </div>
  ${cite('MIT Vision Book: Convolutional Neural Nets — https://visionbook.mit.edu/convolutional_neural_nets.html')}
`, { notes: [
  "(draft) How does a CNN layer generalize the 2D filter banks we built on Day 3?",
  "(draft) Look at the volume diagram at the top: in a CNN, the input to layer l is a 3D tensor of shape C_in by H by W (3 RGB channels in layer 1, or 64 feature maps in a deeper layer). Each learned filter W_k is also 3D—spanning a small K by K spatial window across all C_in input channels—and produces one 2D feature map in the output volume of depth C_out.",
  "(draft) On the bottom-left are the two architectural inductive biases from the MIT Vision Book: Locality (each unit only sees a local KxK patch) and Weight Sharing (the exact same filter is applied at every spatial location, guaranteeing translation equivariance).",
  "(draft) On the bottom-right: why must we put a nonlinear activation like ReLU between convolutional layers? Because the convolution of two linear filters is just another single linear filter! Without ReLU, a 50-layer CNN would collapse algebraically into a 1-layer filter. With ReLU and strided pooling, each layer composes earlier features over a rapidly growing effective receptive field RF_l."
]});

sc('pixelsToObjects', 'scenes/pixels-to-objects.html');

/* CNN Architecture & Intermediate Feature Maps across layers (computed live on a sample image) */
st(`
  <h1 class="t">CNN architecture &amp; intermediate feature maps across depth</h1>
  <div class="d4-code b" data-step="1" style="padding:1vh 1.2vw">
    Input (3×224×224) → [Conv2d → BatchNorm → ReLU → Pool/Stride] × L → GlobalAvgPool → Linear Head → ŷ
  </div>
  <div class="d4-grid4 b" data-step="2" style="margin-top:.4vh">
    <div class="d4-card" style="align-items:center;text-align:center;padding:1vh .8vw">
      <canvas id="cnn-fm-0" width="120" height="120" style="width:min(11vw,15vh);aspect-ratio:1;border-radius:6px;border:1px solid var(--line)"></canvas>
      <div class="label"><b>Layer 1 (Conv1)</b><br><code class="m">RF ≈ 7×7</code> · <code class="m">112×112</code><br>Oriented edges &amp; color opponency</div>
    </div>
    <div class="d4-card" style="align-items:center;text-align:center;padding:1vh .8vw">
      <canvas id="cnn-fm-1" width="120" height="120" style="width:min(11vw,15vh);aspect-ratio:1;border-radius:6px;border:1px solid var(--line)"></canvas>
      <div class="label"><b>Layer 2 (Block2)</b><br><code class="m">RF ≈ 23×23</code> · <code class="m">56×56</code><br>Corners, junctions &amp; grating textures</div>
    </div>
    <div class="d4-card" style="align-items:center;text-align:center;padding:1vh .8vw">
      <canvas id="cnn-fm-2" width="120" height="120" style="width:min(11vw,15vh);aspect-ratio:1;border-radius:6px;border:1px solid var(--line)"></canvas>
      <div class="label"><b>Layer 3 (Block3)</b><br><code class="m">RF ≈ 71×71</code> · <code class="m">28×28</code><br>Repeated motifs &amp; object parts</div>
    </div>
    <div class="d4-card" style="align-items:center;text-align:center;padding:1vh .8vw">
      <canvas id="cnn-fm-3" width="120" height="120" style="width:min(11vw,15vh);aspect-ratio:1;border-radius:6px;border:1px solid var(--line)"></canvas>
      <div class="label"><b>Layer 4 (Block4)</b><br><code class="m">RF ≈ 199×199</code> · <code class="m">7×7</code><br>Coarse class-selective activation peaks</div>
    </div>
  </div>
  <div class="d4-card b" data-step="3" style="padding:1vh 1.3vw">
    <div class="label"><b>Critical discussion:</b> As depth increases, spatial resolution drops (<code class="m">224 → 7</code>) while channel depth grows (<code class="m">3 → 512</code>). <b>Do deeper layers necessarily represent human-like semantic concepts—or whatever statistical shortcut minimizes training loss?</b></div>
  </div>
  ${cite('Zeiler &amp; Fergus (2014) · Krizhevsky et al. (2012) · He et al. (2016) · visionbook.mit.edu/convolutional_neural_nets.html')}
`, { notes: [
  "(draft) Let's look inside a trained CNN as an image flows from input pixels to the classification head.",
  "(draft) At the top is the canonical backbone-plus-head pipeline: repeated blocks of convolution, ReLU nonlinearity, and pooling/strided downsampling transform a 3 by 224 by 224 image into a compact feature volume, which is pooled into a vector and multiplied by a linear classification head.",
  "(draft) Across the four panels, compare what intermediate feature maps look like at increasing depth: Layer 1 has a tiny receptive field (7x7) and high spatial resolution, responding to oriented edges and color contrasts just like V1 Gabors. Layer 2 combines edges into corners and local textures. Layer 3 responds to larger motifs and parts. Layer 4 has a 7x7 spatial grid whose receptive fields span nearly the whole image, lighting up coarsely over high-evidence regions.",
  "(draft) Pose the critical discussion question at the bottom before moving to Part II: we often draw the hierarchy as 'edges -> textures -> parts -> objects,' as if deeper units automatically understand human semantics. Keep asking today: what does a CNN actually learn when trained to minimize cross-entropy on a dataset? Does it learn 'cow' and 'car', or does it also learn grass, asphalt, and texture shortcuts?"
]});

setTimeout(() => {
  const S = 120;
  function makeScene(sz){
    const a = new Float32Array(sz * sz);
    for(let y = 0; y < sz; y++) for(let x = 0; x < sz; x++){
      let v = y < 42 ? 0.85 : y < 82 ? (((x + (Math.floor(y/8)%2)*8)%16 < 2 || y%8 < 2) ? 0.8 : 0.45) : 0.32;
      const d = Math.hypot(x - 82, y - 82);
      if(d < 22) v = 0.95 - 0.45 * (d / 22);
      a[y * sz + x] = v;
    }
    return a;
  }
  const base = makeScene(S);
  const at = (y, x) => base[Math.max(0, Math.min(S-1, y)) * S + Math.max(0, Math.min(S-1, x))];
  function paint(id, fn, gridN){
    const el = document.getElementById(id); if(!el) return;
    const ctx = el.getContext('2d');
    const tmp = document.createElement('canvas'); tmp.width = tmp.height = gridN;
    const g = tmp.getContext('2d'), im = g.createImageData(gridN, gridN);
    for(let r = 0; r < gridN; r++) for(let c = 0; c < gridN; c++){
      const v = Math.max(0, Math.min(1, fn(r, c, gridN)));
      im.data.set([Math.round(255 * Math.pow(v, 0.7)), Math.round(210 * Math.pow(v, 1.3)), Math.round(90 + 140 * (1 - v) * v), 255], (r * gridN + c) * 4);
    }
    g.putImageData(im, 0, 0);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(tmp, 0, 0, S, S);
  }
  paint('cnn-fm-0', (r, c) => Math.min(1, Math.hypot(at(r, c+1) - at(r, c-1), at(r+1, c) - at(r-1, c)) * 2.4), 120);
  paint('cnn-fm-1', (r, c, N) => {
    const y = Math.floor(r * S / N), x = Math.floor(c * S / N);
    const gx = Math.abs(at(y, x+1) - at(y, x-1)), gy = Math.abs(at(y+1, x) - at(y-1, x));
    return Math.min(1, (gx * gy * 12) + (y >= 42 && y < 82 ? 0.55 : 0.1));
  }, 40);
  paint('cnn-fm-2', (r, c, N) => {
    const y = (r + 0.5) * S / N, x = (c + 0.5) * S / N;
    const dBall = Math.abs(Math.hypot(x - 82, y - 82) - 18);
    return Math.exp(-dBall * dBall / 36) * 0.95 + (Math.abs(y - 82) < 8 ? 0.35 : 0.05);
  }, 18);
  paint('cnn-fm-3', (r, c, N) => {
    const y = (r + 0.5) * S / N, x = (c + 0.5) * S / N;
    const d = Math.hypot(x - 82, y - 82);
    return Math.exp(-d * d / 650);
  }, 7);
}, 60);
}
