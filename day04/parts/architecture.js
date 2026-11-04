/* PART: architecture (Day 4). Owner: Fernanda · Shreya.
   Section 4, 17 min: channels, conv-ReLU-pool, receptive fields, hierarchical features, the
   classification head, equivariance vs invariance, a quick check, and the running-example table.
   Shapes, receptive fields, parameter counts and feature maps are measured on ResNet-18 (assets/pipeline.py). */
{
section('4. CNNs');

const R = D4.resnet, stg = R.stages;

const volume = `<svg viewBox="0 0 620 210" style="width:100%;max-height:34vh">
  ${[0, 1, 2].map(k => `<rect x="${30 + k * 10}" y="${40 + k * 10}" width="110" height="110" fill="${['#dbeafe', '#bfdbfe', '#93c5fd'][k]}" stroke="#1e3a8a" stroke-width="1.6"/>`).join('')}
  <rect x="72" y="82" width="30" height="30" fill="rgba(217,119,6,.35)" stroke="#d97706" stroke-width="2.5"/>
  <text x="95" y="28" text-anchor="middle" font-size="17" font-weight="700">input H × W × C<tspan font-size="12">in</tspan></text>
  <text x="95" y="190" text-anchor="middle" font-size="15" fill="#d97706">one patch: K × K × C<tspan font-size="11">in</tspan></text>
  <text x="200" y="112" font-size="26" fill="#64748b">∗</text>
  ${[0, 1, 2, 3].map(k => `<rect x="${236 + k * 9}" y="${70 + k * 9}" width="40" height="40" fill="#fef3c7" stroke="#d97706" stroke-width="1.8"/>`).join('')}
  <text x="275" y="28" text-anchor="middle" font-size="17" font-weight="700">C<tspan font-size="12">out</tspan> filters</text>
  <text x="275" y="190" text-anchor="middle" font-size="15" fill="#64748b">each K × K × C<tspan font-size="11">in</tspan></text>
  <text x="340" y="112" font-size="26" fill="#64748b">→</text>
  ${[0, 1, 2, 3, 4, 5].map(k => `<rect x="${384 + k * 9}" y="${44 + k * 9}" width="90" height="90" fill="${k === 5 ? '#4ade80' : '#dcfce7'}" stroke="#15803d" stroke-width="1.6"/>`).join('')}
  <circle cx="${384 + 45 * 9 / 9 + 45}" cy="${44 + 45 + 45}" r="5" fill="#d97706"/>
  <text x="474" y="28" text-anchor="middle" font-size="17" font-weight="700">feature maps H′ × W′ × C<tspan font-size="12">out</tspan></text>
  <text x="474" y="205" text-anchor="middle" font-size="15" fill="#64748b">one map per filter</text>
</svg>`;

st(`
  <h1 class="t">Real conv layers: many filters, all channels</h1>
  <div class="b" data-step="1">${volume}</div>
  <div class="d4-cols" style="align-items:start">
    <div class="d4-card b" data-step="2"><div class="label">Each filter spans <b>every</b> input channel: a ${M('K × K × C_in')} block, not a 2D kernel.</div></div>
    <div class="d4-card hi b" data-step="3"><div class="label">One output value = one patch · one filter. One feature map per filter: ${M('C_out')} maps.</div></div>
  </div>
`, { notes: [
  "On Day 3 a kernel was a flat 3 by 3 grid on a grayscale image. Real conv layers are three-dimensional.",
  "The input has height, width and C_in channels: three for RGB, or 64 if this is a deeper layer.",
  "Each filter covers a small K by K window, but through every input channel at once. This is the part students most often miss: after the first layer, a filter is combining 64 or 128 feature maps, not looking at colours.",
  "One filter at one position gives one number. Sliding it everywhere gives one feature map. A layer with C_out filters produces C_out feature maps, stacked into the next volume."
]});

const pool = [[1, 3, 2, 0], [4, 6, 1, 1], [0, 2, 9, 5], [3, 1, 4, 7]];
const cell = (v, hi) => `<span style="height:min(3.4vw,5.6vh);display:flex;align-items:center;justify-content:center;font-family:ui-monospace,Menlo,monospace;font-weight:700;font-size:clamp(.95rem,1.4vw,1.3rem);background:${hi ? '#fde68a' : '#fff'}">${v}</span>`;
const grid = (m, n, hiF) => `<div style="display:grid;grid-template-columns:repeat(${n},min(3.4vw,5.6vh));gap:3px;background:var(--line);border:2px solid var(--ink);border-radius:6px;overflow:hidden">${m.flat().map((v, k) => cell(v, hiF && hiF(k))).join('')}</div>`;
const mx = [0, 2].map(r => [0, 2].map(c => Math.max(pool[r][c], pool[r][c + 1], pool[r + 1][c], pool[r + 1][c + 1])));
const isMax = k => { const r = Math.floor(k / 4), c = k % 4, br = r - r % 2, bc = c - c % 2; return pool[r][c] === mx[br / 2][bc / 2]; };

st(`
  <h1 class="t">The building block: convolve, ReLU, pool</h1>
  <div class="flow" style="margin:0">
    <div class="step b" data-step="1"><b>conv</b><span class="label">learned filters</span></div>
    <div class="arrow b" data-step="1">→</div>
    <div class="step b" data-step="1"><b>ReLU</b><span class="label">max(0, z)</span></div>
    <div class="arrow b" data-step="2">→</div>
    <div class="step b hi" data-step="2"><b>pool</b><span class="label">keep the largest in each 2 × 2</span></div>
  </div>
  <div style="display:flex;gap:3vw;align-items:center;justify-content:center" class="b" data-step="2">
    ${grid(pool, 4, isMax)}<span style="font-size:2.4rem;color:var(--mute)">→</span>${grid(mx, 2)}
    <div class="d4-card" style="max-width:30vw"><div class="label">Half the height and width. A small shift inside a 2 × 2 window does not change the output.</div></div>
  </div>
`, { notes: [
  "A CNN repeats one block.",
  "Convolve with learned filters, then apply ReLU.",
  "Then, in many architectures, pool. Max-pooling keeps the largest value in each 2 by 2 window. That halves height and width, so later layers are cheaper, and it buys a little tolerance: if the strongest response moves by a pixel inside the window, the output stays the same. Modern networks often use a stride-2 convolution instead of pooling, with the same effect on size."
]});

const show = [0, 2, 3, 4];               // conv1, layer1, layer2, layer3 drawn on the 224 crop
const box = s => { const rf = Math.min(s.receptive_field, 224), c = 112;
  return `<div class="b" data-step="${show.indexOf(stg.indexOf(s)) + 1}" style="position:absolute;left:${(c - rf / 2) / 224 * 100}%;top:${(c - rf / 2) / 224 * 100}%;width:${rf / 224 * 100}%;height:${rf / 224 * 100}%;border:3px solid var(--hi);box-shadow:0 0 0 2px rgba(255,255,255,.7)"></div>`; };
st(`
  <h1 class="t">Receptive fields grow with depth</h1>
  <div class="d4-cols wide-r">
    <div style="position:relative;width:min(38vw,58vh);aspect-ratio:1;margin:auto">
      <img src="${A}resnet/street-crop.jpg" alt="" style="width:100%;height:100%;display:block;border-radius:6px">
      ${show.map(k => box(stg[k])).join('')}
    </div>
    <div>
      ${table([['ResNet-18 stage', 'output (C × H × W)', 'receptive field'],
        ...stg.map(s => [s.name, s.shape.join(' × '), `${s.receptive_field} × ${s.receptive_field} px`])], {cls: 'num'})}
      <div class="label b" data-step="5" style="margin-top:1.6vh">Two stacked ${M('3 × 3')} convs see ${M('5 × 5')}; three see ${M('7 × 7')}. Every stride doubles how fast it grows. By ${M('layer4')} one unit sees more than the whole ${M('224 × 224')} image.</div>
    </div>
  </div>
`, { notes: [
  "Every filter is small, so how can a CNN recognise a whole bus? Because receptive fields grow. The receptive field is the patch of the input image that can influence one unit.",
  "After ResNet-18's first layer, it is 7 by 7 pixels: the small square in the middle.",
  "After the first stage of residual blocks, 43 pixels.",
  "After layer2, 99 pixels.",
  "After layer3, 211: almost the whole image.",
  "The rule: two stacked 3 by 3 convolutions see 5 by 5, three see 7 by 7, and every stride or pooling step doubles the rate of growth. By layer4 the theoretical receptive field is 435 pixels, bigger than the image. Meanwhile look at the shapes: resolution falls from 112 to 7 while channels grow from 64 to 512. Space is traded for features."
]});

const fms = [['conv1', 0], ['layer1', 2], ['layer2', 3], ['layer3', 4], ['layer4', 5]];
st(`
  <h1 class="t">What the layers respond to</h1>
  <div style="display:flex;flex-direction:column;gap:1.1vh;flex:1 1 auto;min-height:0">
    ${fms.map(([n, k], j) => `<div class="b" data-step="${j + 1}" style="display:grid;grid-template-columns:13vw 1fr;gap:1.4vw;align-items:center">
      <div class="label"><b>${n}</b><br><span style="color:var(--mute)">${stg[k].shape.slice(1).join(' × ')} · RF ${stg[k].receptive_field}</span></div>
      <img src="${A}resnet/fm-${n}.png" alt="" style="height:min(11vh,7.5vw);image-rendering:pixelated;border-radius:4px">
    </div>`).join('')}
  </div>
  <div class="label b" data-step="6">Early: edges and colour, at full detail. Late: coarse maps of where the evidence is. Zeiler &amp; Fergus (2014) show the middle layers respond to textures and object parts.</div>
  ${cite('The 4 most active channels per stage for the street photo, ResNet-18, each scaled to its own range (assets/pipeline.py) · Zeiler &amp; Fergus (2014), Visualizing and Understanding Convolutional Networks')}
`, { notes: [
  "Here is what ResNet-18 actually computes on our street. Each row will show the four most active channels at one stage.",
  "After conv1, at 112 by 112: the maps still look like the photo, picking out edges, the sky, the dark road, colour contrasts.",
  "layer1: still detailed, but now textures, like the building facades.",
  "layer2, 28 by 28: harder to name. Combinations of edges, corners, repeated patterns.",
  "layer3, 14 by 14: coarse blobs over particular regions.",
  "layer4, 7 by 7: a coarse map of where the evidence for something sits.",
  "So the hierarchy goes from local, detailed, generic features to coarse, large, more specific ones. Zeiler and Fergus visualised what drives units at each depth: edges, then textures, then parts, then object-like configurations. You can compare it to the ventral stream from Day 1, V1 to V4 to IT, but treat the analogy as suggestive, not exact."
]});

const fc = R.head.fc_params, bb = R.params - fc;
st(`
  <h1 class="t">Backbone and head</h1>
  <div class="flow">
    <div class="step b" data-step="1"><b>backbone</b><span class="label">conv1 … layer4<br>${fmt(bb)} params</span></div>
    <div class="arrow b" data-step="2">→</div>
    <div class="step b" data-step="2"><b>${stg[5].shape.join(' × ')}</b><span class="label">feature volume</span></div>
    <div class="arrow b" data-step="3">→</div>
    <div class="step b" data-step="3"><b>global avg pool</b><span class="label">one ${R.head.pooled}-d vector</span></div>
    <div class="arrow b" data-step="4">→</div>
    <div class="step b hi" data-step="4"><b>head</b><span class="label">fc: ${R.head.pooled} → ${fmt(R.n_classes)} logits<br>${fmt(fc)} params</span></div>
  </div>
  <div class="d4-card hi b" data-step="5"><div class="label">Keep the backbone, swap the head: that is how one set of features serves many tasks.</div></div>
`, { notes: [
  "Now the end of the network.",
  "Everything from conv1 to layer4 is the backbone, or feature extractor: about 11.2 million parameters.",
  "It produces a 512 by 7 by 7 volume for our street.",
  "Global average pooling averages each of the 512 maps over all positions, giving one 512-number vector for the whole image.",
  "And the head: a single fully connected layer from 512 numbers to 1,000 logits, one per ImageNet class. Half a million parameters.",
  "Hold on to this split. Keep the backbone and replace the head, and the same features can do a different job. That is the story of Sections 5 and 6."
]});

st(`
  <h1 class="t">Equivariant layers, approximately invariant labels</h1>
  <div class="d4-cols" style="align-items:start">
    <div class="d4-card b" data-step="1"><h3>Convolution is equivariant</h3>
      <div class="d4-eq" style="font-size:clamp(1.1rem,1.8vw,1.6rem)"><i>f</i>(shift(<b>x</b>)) = shift(<i>f</i>(<b>x</b>))</div>
      <div class="label">Move the bus; its feature-map response moves with it.</div></div>
    <div class="d4-card hi b" data-step="2"><h3>Pooling + head: roughly invariant</h3>
      <div class="d4-eq" style="font-size:clamp(1.1rem,1.8vw,1.6rem)"><i>g</i>(shift(<b>x</b>)) ≈ <i>g</i>(<b>x</b>)</div>
      <div class="label">Move the bus; the label should stay the same.</div></div>
  </div>
  <div class="label b" data-step="3" style="color:var(--mute)">Only roughly: strides and pooling break exact invariance, and a shift of a few pixels can change a prediction (Azulay &amp; Weiss, 2019). A good lab experiment.</div>
`, { notes: [
  "Two words worth getting right.",
  "Convolution is translation-equivariant: shift the input and the feature map shifts by the same amount. Where is preserved.",
  "Global pooling and the head throw where away, so the final label is approximately translation-invariant: the bus is a bus wherever it is.",
  "Approximately. Strides and pooling sample the image on a grid, so a shift of a few pixels can change the prediction. Azulay and Weiss showed this for standard ImageNet models. That is a nice thing to test in your lab."
]});

st(`
  <h1 class="t">Quick check</h1>
  <div class="lead">Input ${M('56 × 56 × 64')}. 128 filters of ${M('3 × 3')}, stride 2, padding 1.</div>
  <div class="lead">What is the output shape? How many weights?</div>
  <div class="d4-card hi b" data-step="1"><div class="label">⌊ (56 − 3 + 2) / 2 ⌋ + 1 = 28, so ${M('28 × 28 × 128')}</div></div>
  <div class="d4-card hi b" data-step="2"><div class="label">${M(`3 · 3 · 64 · 128 = ${fmt(3 * 3 * 64 * 128)}`)} weights, plus 128 biases. Each filter spans all 64 input channels.</div></div>
`, { notes: [
  "Work this out with your neighbour. One minute.",
  "Output: 56 minus 3 plus 2, over 2, floored, plus 1: 28. So 28 by 28 by 128.",
  "Weights: each filter is 3 by 3 by 64, because it spans all 64 input channels, and there are 128 filters: 73,728 weights plus 128 biases. If someone said 1,152, they forgot the input channels."
]});

st(`
  <h1 class="t">Back to the street</h1>
  ${table([['Task', 'Question', 'Output'],
    ['Classification', 'What is in this image?', '?'],
    ['Visual search', 'Which other images look similar?', '?'],
    ['Detection', 'What objects are present, and where?', '?'],
    ['Segmentation', 'Which pixels belong to each object?', '?']], {build: true})}
  <div class="label" style="color:var(--mute)">We now have a backbone that turns pixels into features. Next: what each task puts on top.</div>
`, { notes: [
  "Let us return to the four questions about the street.",
  "Classification: what is in this image?",
  "Visual search: which other images look like it?",
  "Detection: what objects, and where?",
  "Segmentation: which pixels belong to what? We will fill in the output column as we meet each model. We now have the backbone. Next: classification and search, which both use it almost unchanged."
]});
}
