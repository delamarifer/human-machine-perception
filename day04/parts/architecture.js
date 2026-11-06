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

/* added at Fernanda's request (2026-11-05, via the coordinator): feature maps vs metamers. Row 5's label is her
   wording. layer4 shape from result.json (stages: 512 x 7 x 7). */
const architectureMM = [
  ['Direction', 'image → activations', 'activations → a new image'],
  ['What you see', 'the model’s numbers, as heatmaps', 'a picture, the same size as the input'],
  ['How much of the stage', '4 channels out of 64 to 512, each scaled to its own range', 'every channel at once'],
  ['Who can judge it', 'you read it as a diagram', 'a person can look and say “same” or “different”'],
  ['When it comes to representation, what does it answer?', 'What does each unit respond to in this image?', 'What does the representation keep, and what does it throw away?'],
];
const l4 = stg[5].shape;
st(`
  <h1 class="t">Feature maps and metamers</h1>
  <div class="architecture-mm" style="display:grid;grid-template-columns:minmax(14vw,1fr) 1.3fr 1.3fr;gap:1.4vh 2vw;align-items:baseline;margin:auto 0;font-size:2.9vh;line-height:1.3">
    <div></div><div><b>Feature maps</b> <span style="color:var(--mute)">(previous slide)</span></div><div><b>Metamer</b></div>
    ${architectureMM.map(([k, a, b], j) => `
      <div class="label b" data-step="${j + 1}"><b>${k}</b></div>
      <div class="b" data-step="${j + 1}">${a}</div>
      <div class="b" data-step="${j + 1}">${b}</div>`).join('')}
  </div>
  <div class="label b" data-step="${architectureMM.length + 1}">By layer4: 224 × 224 × 3 = ${fmt(224 * 224 * 3)} pixel values become ${l4[1]} × ${l4[2]} × ${l4[0]} = ${fmt(l4[0] * l4[1] * l4[2])} numbers, with almost nothing left about where things are. Many different images share them.</div>
  ${cite('Feather, Leclerc, Mądry &amp; McDermott (2023), Model metamers reveal divergent invariances between biological and artificial neural networks, Nature Neuroscience · doi.org/10.1038/s41593-023-01442-0')}
`, { notes: [
  "(draft) Title only. Two ways to look inside a network: the feature maps we just saw, and the metamers from Day 3. They answer different questions.",
  "(draft) Direction. A feature map goes forward: image in, activations out. A metamer goes backward: we start from the activations and make a new image that produces the same ones.",
  "(draft) What you see. Feature maps are the model's own numbers, drawn as heatmaps. A metamer is a picture, the same size as the input.",
  "(draft) How much of the stage. On the previous slide we showed 4 channels out of 64 to 512, each stretched to its own range. A metamer has to match every channel of that stage at once.",
  "(draft) Who can judge it. A feature map you read like a diagram. A metamer you can show to a person and ask: same or different?",
  "(draft) And when it comes to representation, what does each answer? Feature maps: what does each unit respond to in this image. Metamers: what does the representation keep, and what does it throw away. Feature maps show what the network computes from this photo; a metamer shows what it ignores, and only a metamer can be tested on a person.",
  "(draft) Back to the previous slide. By layer4, the photo's 150,528 pixel values have become 7 by 7 by 512, 25,088 numbers, that keep almost nothing about where things are. So many different images share them. That is why the layer4 metamer in the Day 3 lab looked like colored noise and still got the same label. Feather and colleagues showed this for many models: metamers from late layers are often unrecognizable to people."
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
  <!-- added at Fernanda's request (2026-11-05): the same ResNet-18, the street photo's bus moved pixel by pixel.
       Every image and number from assets/shift/shift.py (shift.json). -->
  <div class="architecture-shift" style="display:grid;grid-template-columns:repeat(3,auto) 1fr;gap:.6vh 1.2vw;align-items:center;margin-top:1.5vh;min-height:0">
    ${['0', '1', '2'].map(j => `
      <img class="b" data-step="1" src="assets/shift/bus-${j}.png" alt="" style="height:17vh;border-radius:4px">`).join('')}
    <div class="b" data-step="3" style="grid-row:span 3;text-align:center"><img src="assets/shift/chart.png" alt="" style="width:100%;max-height:22vh;object-fit:contain">
      <div class="label">bus moved 1 pixel at a time, 85 positions: “minibus” 82 times, “jeep” 3 times</div></div>
    ${['0', '1', '2'].map(j => `
      <img class="b" data-step="1" src="assets/shift/fm-${j}.png" alt="" style="height:17vh;border-radius:4px;border:1px solid var(--line)">`).join('')}
    ${[50, 54, 43].map(p => `<div class="label b" data-step="2" style="text-align:center">minibus ${p}%</div>`).join('')}
  </div>
  <div class="label b" data-step="3" style="color:var(--mute)">Only roughly: strides and pooling break exact invariance, and a shift of a few pixels can change a prediction (Azulay &amp; Weiss, 2019). A good lab experiment.</div>
`, { notes: [
  "Two words worth getting right.",
  "Convolution is translation-equivariant: shift the input and the feature map shifts by the same amount. Where is preserved. (draft, added with the images) Top row: the bus from our street photo, pasted at three positions. Below each, one feature map from ResNet-18's first layer: the response moves with the bus.",
  "Global pooling and the head throw where away, so the final label is approximately translation-invariant: the bus is a bus wherever it is. (draft, added with the images) At all three positions ResNet-18 says minibus, at 50, 54 and 43 percent.",
  "Approximately. Strides and pooling sample the image on a grid, so a shift of a few pixels can change the prediction. Azulay and Weiss showed this for standard ImageNet models. That is a nice thing to test in your lab. (draft, added with the images) On the right: the probability of minibus as we move the bus one pixel at a time, 85 positions. It wobbles between 30 and 74 percent, it can jump by 21 points for a one-pixel shift, and at three positions the label flips to jeep."
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
