/* PART: ladder (Object Recognition). Owner: Shreya.
   The four tasks on one image (scene), then classification: output, evaluation, backbones. */
{
section('3. The task ladder');

sc('taskLadder', 'scenes/task-ladder.html');

/* Real outputs from day04/assets (pipeline.py, numbers in result.js). */
const A4 = '../day04/assets/', pc = p => Math.round(p * 100) + '%';
const top = D4.resnet.top5_street, Y25 = D4.yolo.street['0.25'];

st(`
  <h1 class="t">The same ladder on a real street</h1>
  <div class="or-split">
    <div class="or-stack">
      <img class="b" data-step="1" src="${A4}photos/street.jpg" alt="Tom Mboya Street, Nairobi">
      <img class="b" data-step="3" src="${A4}yolo/street-conf25.jpg" alt="YOLO11n boxes on the street">
      <img class="b" data-step="4" src="${A4}seg/street-overlay.jpg" alt="DeepLabV3 classes on the street">
    </div>
    <div class="or-list">
      <div class="b" data-step="2"><div class="lead"><b>Classification</b></div><div class="label">ResNet-18: ${top[0].label} ${pc(top[0].p)}, ${top[1].label} ${pc(top[1].p)}</div></div>
      <div class="b" data-step="3"><div class="lead"><b>Detection</b></div><div class="label">YOLO11n: ${Y25.n} boxes at confidence 0.25</div></div>
      <div class="b" data-step="4"><div class="lead"><b>Semantic segmentation</b></div><div class="label">DeepLabV3: one class per pixel</div></div>
    </div>
  </div>
  ${cite('Tom Mboya Street, Nairobi. Bahnfrend, CC BY-SA 4.0. Real model outputs')}
`, { notes: [
  "(draft) That street was generated. Here is the same ladder on a real one, with real pretrained models.",
  "(draft) This is Tom Mboya Street in Nairobi: buses, cars, motorbikes, people.",
  `(draft) A ResNet-18 classifier gives one answer for the whole frame: ${top[0].label}, ${pc(top[0].p)}, then ${top[1].label}, ${pc(top[1].p)}. One label for a street full of objects.`,
  `(draft) YOLO11n gives ${Y25.n} boxes at a confidence threshold of 0.25. Now we know where and how many.`,
  "(draft) DeepLabV3 labels pixels. The objects take on their real outlines. We did not run an instance segmentation model on this photo, so the top rung stays with our generated street."
]});

st(`
  <h1 class="t">Classification: the output</h1>
  <div class="or-cards or-c2">
    <div class="or-card b" data-step="1"><div class="lead"><b>Exclusive classes</b></div><div class="label">Softmax, on a simplex</div><div class="label">Cross-entropy loss</div></div>
    <div class="or-card b" data-step="1"><div class="lead"><b>Multi-label</b></div><div class="label">One sigmoid per class</div><div class="label">Binary cross-entropy loss</div></div>
  </div>
  <div class="lead b" data-step="2" style="text-align:center;margin-bottom:3vh">0/1 error is not differentiable, so we train on the likelihood</div>
`, { notes: [
  "(draft) We start at the bottom of the ladder. The classifier outputs a vector of length K.",
  "(draft) If exactly one class is true, we use a softmax, so predictions lie on a simplex, and train with cross-entropy. If several classes can be present, we use one sigmoid per class and train with binary cross-entropy.",
  "(draft) What we care about is the 0/1 error, but it is not differentiable, so we minimize the negative log-likelihood instead."
]});

sc('evalClassifier', 'scenes/eval-classifier.html');

/* A schematic of the reuse idea, not a real architecture. */
const box = (x, y, w, h, t) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="#f1f5f9" stroke="#0f172a" stroke-width="2.5"/>
  <text x="${x + w / 2}" y="${y + h / 2 + 7}" text-anchor="middle" font-size="20" fill="#0f172a">${t}</text>`;
const arrow = (x1, y1, x2, y2) => `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="#64748b" stroke-width="2.5" fill="none" marker-end="url(#or-arr)"/>`;
const BACKBONE = `<svg viewBox="0 0 620 300">
  <defs><marker id="or-arr" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto"><path d="M0 0L7 3.5L0 7Z" fill="#64748b"/></marker></defs>
  <g class="b" data-step="1">
    ${box(0, 120, 90, 60, 'image')}${arrow(92, 150, 128, 150)}
    <rect x="130" y="85" width="190" height="130" rx="10" fill="#e2e8f0" stroke="#0f172a" stroke-width="3"/>
    <text x="225" y="145" text-anchor="middle" font-size="24" font-weight="700" fill="#0f172a">backbone</text>
    <text x="225" y="174" text-anchor="middle" font-size="18" fill="#0f172a">learned features</text>
    ${arrow(322, 150, 388, 42)}${box(390, 12, 220, 56, 'ImageNet classes')}
  </g>
  <g class="b" data-step="2">
    ${arrow(322, 150, 388, 112)}${box(390, 84, 220, 56, 'boxes')}
    ${arrow(322, 150, 388, 184)}${box(390, 156, 220, 56, 'class per pixel')}
    ${arrow(322, 150, 388, 256)}${box(390, 228, 220, 56, 'mask per instance')}
  </g>
</svg>`;

st(`
  <h1 class="t">A classifier becomes a backbone</h1>
  <div class="or-split">
    ${BACKBONE}
    <div class="or-list">
      <div class="lead b" data-step="1">Train on ImageNet, keep the feature layers</div>
      <div class="lead b" data-step="2">Attach a new head for a new task</div>
      <div class="b" data-step="3"><div class="lead"><b>R-CNN</b></div><div class="label">Pretrain, fine-tune for detection: 53.3% mAP on VOC 2012, over 30% better than the previous best</div></div>
    </div>
  </div>
  <div class="statement b" data-step="4" style="text-align:center;margin-bottom:5vh">Same backbone, new head.</div>
  ${cite('Girshick et al. (2014). Schematic, not a real architecture')}
`, { notes: [
  "(draft) Classification is more than the bottom rung of the ladder. It is also where the features for the other rungs come from.",
  "(draft) Train a classifier on a large dataset such as ImageNet, then keep its feature layers.",
  "(draft) Now throw away the last layer and attach a new head for a new task: boxes, a class per pixel, or a mask per instance.",
  "(draft) This is what made the field move. R-CNN pretrained on a large classification task, fine-tuned for detection, and reached 53.3 percent mAP on VOC 2012. That was more than 30 percent better, in relative terms, than the previous best, which relied on combinations of low-level image features.",
  "(draft) Every task that follows is the same story: same backbone, new head. And the next rung also answers the shortcut problem, because it makes the model say where."
]});

st(`
  <h1 class="t">What to keep, what to retrain</h1>
  <div class="or-split">
    <div class="or-list">
      <div class="or-card b" data-step="1"><div class="lead"><b>Freeze</b></div><div class="label">Small target dataset: keep the backbone, train only the head</div></div>
      <div class="or-card b" data-step="2"><div class="lead"><b>Fine-tune</b></div><div class="label">More data, or a different domain: update more layers</div></div>
    </div>
    <div class="or-list b" data-step="3">
      <img class="or-img" src="${A4}resnet/conv1-learned.png" alt="The 64 first-layer filters of ResNet-18" style="image-rendering:pixelated">
      <div class="lead"><b>Early vs. late</b></div><div class="label">Edges and color transfer well; later features are more task-specific</div>
    </div>
  </div>
  ${cite('Filters: the 64 first-layer filters of ResNet-18, trained on ImageNet (from Part 1)')}
`, { notes: [
  "(draft) How much of the backbone should we keep?",
  "(draft) If the target dataset is small, freeze the backbone and train only the head. There is not enough data to change the features safely.",
  "(draft) If there is more data, or the domain is different, fine-tune more layers.",
  "(draft) The reason is that layers differ. These are the real first-layer filters of a ResNet-18: edges and color blobs. Features like these transfer well. Later features are more specific to the task the network was trained on."
]});
}
