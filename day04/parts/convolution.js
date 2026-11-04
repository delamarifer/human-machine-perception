/* PART: convolution (Day 4). Owner: Fernanda · Shreya.
   Section 3, 8 min: Day 3 convolution scene, hand-designed vs learned filters (ResNet-18 conv1 from
   assets/pipeline.py), kernel size, stride, padding and the output size. */
{
section('3. Convolution');

sc('conv', 'scenes/convolution.html', {title: 'Convolution: applying a kernel to an image (Day 3)'});

const kern = (k, cap) => `<div style="display:flex;flex-direction:column;align-items:center;gap:.6vh">
  <div style="display:grid;grid-template-columns:repeat(3,min(4.2vw,7vh));gap:3px;background:var(--line);border:2px solid var(--ink);border-radius:6px;overflow:hidden">
    ${k.map(v => `<span style="background:${v > 0 ? '#dbeafe' : v < 0 ? '#fee2e2' : '#fff'};height:min(4.2vw,7vh);display:flex;align-items:center;justify-content:center;font-family:ui-monospace,Menlo,monospace;font-weight:700;font-size:clamp(.9rem,1.4vw,1.3rem)">${v}</span>`).join('')}
  </div><div class="label">${cap}</div></div>`;
const c1 = D4.resnet.conv1;

st(`
  <h1 class="t">Hand-designed filters, learned filters</h1>
  <div class="d4-cols" style="grid-template-columns:.62fr 1.9fr;align-items:start">
    <div class="d4-card"><h3>Day 3: we chose the numbers</h3>
      <div style="display:flex;flex-direction:column;gap:2vh;margin-top:1vh">${kern([-1, 0, 1, -2, 0, 2, -1, 0, 1], 'Sobel, x')}${kern([1, 2, 1, 2, 4, 2, 1, 2, 1], 'Gaussian (÷16)')}</div>
    </div>
    <div class="d4-card hi"><h3>Day 4: the network learns them</h3>
      <div style="display:flex;flex-direction:column;gap:1.2vh;margin-top:.6vh">
        <div class="pic b" data-step="1"><img src="${A}resnet/conv1-random.png" alt="" style="image-rendering:pixelated;max-height:21vh;width:auto;max-width:100%;align-self:flex-start"><div class="label">before training (random)</div></div>
        <div class="pic b" data-step="2"><img src="${A}resnet/conv1-learned.png" alt="" style="image-rendering:pixelated;max-height:21vh;width:auto;max-width:100%;align-self:flex-start"><div class="label">after training on ImageNet</div></div>
      </div>
      <div class="label b" data-step="3">ResNet-18, first layer: ${c1[0]} filters of ${M(`${c1[2]} × ${c1[3]} × ${c1[1]}`)}. Oriented edges, Gabor-like stripes, colour blobs.</div>
    </div>
  </div>
`, { notes: [
  "Yesterday we picked the nine numbers in a kernel ourselves: Sobel to find vertical edges, a Gaussian to blur. In a CNN, those numbers are weights, and they are learned by backpropagation like any other weight.",
  "On the right are the 64 first-layer filters of ResNet-18 before training: random noise.",
  "And after training on ImageNet. Nobody told it to do this.",
  "It has found oriented edge detectors, Gabor-like stripes at different orientations and frequencies, and colour-contrast blobs. That is yesterday's filter bank, and it is also what Hubel and Wiesel found in V1 simple cells. The network rediscovered both, just by trying to classify images."
]});

const out = Math.floor((224 - 7 + 2 * 3) / 2) + 1;
st(`
  <h1 class="t">Kernel size, stride, padding</h1>
  <div class="d4-eq b" data-step="1">output size = ⌊ (<i>W</i> − <i>K</i> + 2<i>P</i>) / <i>S</i> ⌋ + 1</div>
  <div class="d4-cols" style="align-items:start">
    <div class="d4-card b" data-step="2">
      <div class="label"><b><i>K</i></b> kernel size: how big a neighbourhood each output sees</div>
      <div class="label"><b><i>S</i></b> stride: how far the kernel jumps between outputs</div>
      <div class="label"><b><i>P</i></b> padding: pixels added around the border</div>
    </div>
    <div class="d4-card hi b" data-step="3">
      <div class="label">ResNet-18's first layer: <i>W</i> = 224, <i>K</i> = 7, <i>S</i> = 2, <i>P</i> = 3</div>
      <div class="label">⌊ (224 − 7 + 6) / 2 ⌋ + 1 = <b>${out}</b></div>
      <div class="label" style="color:var(--mute)">measured: ${M(D4.resnet.stages[0].shape.join(' × '))}</div>
    </div>
  </div>
`, { notes: [
  "Three terms you need to read any CNN architecture.",
  "The output size of a convolution is the input width, minus the kernel size, plus twice the padding, divided by the stride, plus one.",
  "K is the kernel size. S, the stride, is how far the kernel moves between outputs: stride 2 halves the resolution. P, padding, is the border we add so the kernel can sit at the edges.",
  "Check it on the real thing. ResNet-18's first layer uses a 7 by 7 kernel, stride 2, padding 3 on a 224 image: that gives 112. And when we run the model, the first feature map is indeed 64 channels of 112 by 112. Transition: one learned filter finds edges. What happens when we stack them?"
]});
}
