/* PART: pretrained (Day 4). Owner: Fernanda · Shreya.
   Section 8, 20 min: architecture vs weights, the five questions, ResNet-18, YOLO11n and the MONAI U-Net
   (code to run live, facts measured by assets/pipeline.py), an unfamiliar input, and a DINOv2 teaser.
   Pacing: ResNet-18 7 min, YOLO11n 6, U-Net 5, DINOv2 2 (or move it to Day 5). */
{
section('8. Pretrained');

const R = D4.resnet, Y = D4.yolo, U = D4.unet;

st(`
  <h1 class="t">An architecture is not a model</h1>
  <div class="d4-cols" style="align-items:start">
    <div class="d4-card b" data-step="1"><h3>${M('resnet18(weights=None)')}</h3><div class="label" style="color:var(--mute)">same code, random weights</div>
      ${bars(R.top5_street_random_weights.slice(0, 3))}</div>
    <div class="d4-card hi b" data-step="2"><h3>${M('resnet18(weights=IMAGENET1K_V1)')}</h3><div class="label" style="color:var(--mute)">same code, ImageNet weights</div>
      ${bars(R.top5_street.slice(0, 3))}</div>
  </div>
  <div class="label b" data-step="3"><b>Architecture</b>: the code that defines layers and connections. <b>Weights</b>: ${fmt(R.params)} numbers learned on one dataset for one task. A pretrained model is both, plus the preprocessing it expects.</div>
`, { notes: [
  "Before we open real models, one distinction matters more than any other.",
  `Here is ResNet-18 with random weights, on the street. Its top guess is ${R.top5_street_random_weights[0].label} at ${pct(R.top5_street_random_weights[0].p)}: essentially a uniform guess over a thousand classes.`,
  `Exactly the same code, with the weights learned on ImageNet: ${R.top5_street[0].label}, ${pct(R.top5_street[0].p)}.`,
  "The architecture is the code: layers, shapes, connections. The weights are 11.7 million numbers learned from a particular dataset for a particular task. Fine-tune the same architecture on chest X-rays and you get a different model. When someone says 'pretrained model', they mean architecture plus weights plus the exact preprocessing used in training."
]});

st(`
  <h1 class="t">Five questions for any pretrained model</h1>
  <ul class="frag">
    <li class="b">1. What does it take as <b>input</b>?</li>
    <li class="b">2. What <b>architecture</b> does it use?</li>
    <li class="b">3. What <b>task and data</b> was it trained on?</li>
    <li class="b">4. What does it <b>output</b>?</li>
    <li class="b" style="color:var(--hi)">5. What happens with an <b>unfamiliar</b> or challenging example?</li>
  </ul>
`, { notes: [
  "We will open three models, and ask each the same five questions. These are also the questions for your lab.",
  "What does it take as input: size, channels, normalisation?",
  "What architecture?",
  "What task and what data was it trained on? This decides what it can even name.",
  "What does it output, and how do we read that output?",
  "And the one that matters most for research: what happens when we give it something unfamiliar?"
]});

st(`
  <h1 class="t">Three models, five questions</h1>
  ${table([['', 'ResNet-18 · torchvision', 'YOLO11n · Ultralytics', 'U-Net · MONAI'],
    ['Input', 'RGB, resize 256, crop 224, ImageNet mean/std', 'RGB, letterboxed to 640 × 640', `CT volume, HU −57…164 → 0…1, ${U.roi_size.join('×')} patches`],
    ['Architecture', `stem + 4 residual stages + fc; ${fmt(R.params)} params`, `backbone, neck, head; ${fmt(Y.params)} params`, `3D encoder-decoder, channels ${U.network_def.channels.join('-')}; ${fmt(U.params)} params`],
    ['Task, data', `ImageNet-1k classification (top-1 ${R.acc_top1.toFixed(1)}%)`, `COCO detection, ${Y.n_classes} classes`, 'spleen segmentation, Medical Segmentation Decathlon'],
    ['Output', `${fmt(R.n_classes)} logits → softmax`, 'boxes, classes, confidences after NMS', 'a class per voxel: spleen or background'],
    ['Unfamiliar', 'a spectrogram; a local street', 'motorbike taxis, loads, night', 'a chest CT; an MRI']], {build: true})}
`, { notes: [
  "Here is the whole comparison. We fill it in row by row as we go; the next three slides are the live demos.",
  "Inputs differ in size, channels, and normalisation. Get the preprocessing wrong and a good model gives garbage.",
  "Three architectures. Note the sizes: the detector is the smallest.",
  "Three tasks, three datasets. ImageNet, COCO, and a few dozen spleen CT scans.",
  "Three kinds of output: class scores, a list of boxes, a mask.",
  "And for each, an unfamiliar input to try. That last row is your lab."
]});

const L = R.stages;
st(`
  <h1 class="t">Live: ResNet-18</h1>
  <div class="d4-cols wide-l" style="align-items:start">
    <div class="d4-code b" data-step="1">from torchvision.models import resnet18, ResNet18_Weights

w = ResNet18_Weights.IMAGENET1K_V1
model = resnet18(weights=w).eval()
print(model)                  <span class="c"># conv1 … layer4, avgpool, fc</span>
print(model.layer1[0])        <span class="c"># one BasicBlock</span>

x = w.transforms()(img).unsqueeze(0)
probs = model(x).softmax(-1)
probs.topk(5)

model.fc = torch.nn.Identity() <span class="c"># → embedding</span></div>
    <div style="display:flex;flex-direction:column;gap:1.4vh">
      <div class="d4-card b" data-step="2"><div class="label">${fmt(R.params)} parameters; ${fmt(L[5].params)} of them in ${M('layer4')}</div></div>
      <div class="d4-card b" data-step="3"><div class="label">A ${M('BasicBlock')}: conv, BN, ReLU, conv, BN, then ${M('+ x')}</div></div>
      <div class="d4-card hi b" data-step="4"><div class="label">Ask: why does ${M('w.transforms()')} matter? Try skipping it.</div></div>
    </div>
  </div>
`, { notes: [
  "Live demo one, about seven minutes. Students ran this model on Day 2; today we open it up.",
  "Load it with its weights, print it, and point at the structure: the stem, layer1 to layer4, average pool, fc. Then print one BasicBlock.",
  `Count parameters: ${fmt(R.params)}. Ask where they are: ${fmt(L[5].params)} of them in layer4 alone, because that is where the channel count is 512.`,
  "In the BasicBlock, find the residual connection: the input is added back after the second convolution. That is the y equals F of x plus x from the previous section.",
  "Then the instructive failure: run it without the weights' own transforms, on an un-normalised image, and watch the predictions change. Preprocessing is part of the model."
]});

st(`
  <h1 class="t">Live: YOLO11n</h1>
  <div class="d4-cols wide-l" style="align-items:start">
    <div class="d4-code b" data-step="1">from ultralytics import YOLO

model = YOLO("yolo11n.pt")
model.info()          <span class="c"># layers, params, GFLOPs</span>
print(model.model.yaml["backbone"])

r = model("street.jpg", conf=0.25)[0]
r.boxes.xyxy, r.boxes.cls, r.boxes.conf
[r.names[int(c)] for c in r.boxes.cls]
r.save("street_yolo.jpg")</div>
    <div style="display:flex;flex-direction:column;gap:1.4vh">
      <div class="d4-card b" data-step="2"><div class="label">${Y.layers} layers, ${fmt(Y.params)} parameters, ${Y.gflops} GFLOPs</div></div>
      <div class="d4-card b" data-step="3"><div class="label">${Y.modules_backbone} backbone modules, ${Y.modules_neck} neck modules, 1 detection head</div></div>
      <div class="d4-card hi b" data-step="4"><div class="label">Change ${M('conf')} to 0.1 and 0.6. Same image, ${Y.street['0.1'].n} vs ${Y.street['0.6'].n} boxes.</div></div>
    </div>
  </div>
`, { notes: [
  "Live demo two, about six minutes.",
  "Load YOLO11n and print its summary.",
  `${Y.layers} layers, about 2.6 million parameters, ${Y.gflops} billion operations per image.`,
  "Print the backbone section of its config to show the three parts we drew. Then run it on the street and look at the raw result object: the boxes as numbers, the class indices, the confidences.",
  "Then change the threshold live, as on the earlier slide. Students should leave with the sense that a detector's output depends on settings someone chose."
]});

st(`
  <h1 class="t">Live: U-Net from MONAI</h1>
  <div class="d4-cols wide-l" style="align-items:start">
    <div class="d4-code b" data-step="1">from monai.bundle import download, load

download(name="spleen_ct_segmentation",
         bundle_dir="./bundles")
net = load(name="spleen_ct_segmentation",
           bundle_dir="./bundles")
print(net)            <span class="c"># down path, up path, skips</span>

<span class="c"># configs/inference.json holds the preprocessing</span>
<span class="c"># and the 96³ sliding-window inferer</span></div>
    <div style="display:flex;flex-direction:column;gap:1.4vh">
      <div class="d4-card b" data-step="2"><div class="label">${fmt(U.params)} parameters, ${U.network_def.spatial_dims}D, ${U.network_def.in_channels} input channel, ${U.network_def.out_channels} output classes</div></div>
      <div class="d4-card b" data-step="3"><div class="label">The bundle ships the network, the weights <b>and</b> the preprocessing config together</div></div>
      <div class="d4-card hi b" data-step="4"><div class="label">Full-volume inference is slow on a CPU. Cache the prediction before class.</div></div>
    </div>
  </div>
`, { notes: [
  "Live demo three, about five minutes.",
  "MONAI distributes models as bundles. Download the spleen bundle and load it.",
  `It is a 3D U-Net: one input channel, because CT is grayscale, two outputs, spleen and background, ${fmt(U.params)} parameters. Print it and find the down path, the up path, and where the skips join.`,
  "Open configs/inference.json: the bundle stores the preprocessing and the sliding-window settings next to the weights. That is the architecture-plus-weights-plus-preprocessing point, made concrete.",
  "Practical note: running a whole 3D volume on a laptop CPU takes a while. Show the cached result from earlier rather than waiting."
]});

const P = Y['kampala-pipes'];
st(`
  <h1 class="t">An unfamiliar example</h1>
  <div class="d4-cols wide-l">
    <div class="pic"><img src="${A}yolo/kampala-pipes.jpg" alt="" style="max-height:56vh"><div class="label">Kampala. Simisa, CC BY-SA 3.0</div></div>
    <div style="display:flex;flex-direction:column;gap:1.6vh">
      <div class="b" data-step="1"><div class="label"><b>ResNet-18</b></div>${bars(R.top5_kampala_pipes.slice(0, 3))}</div>
      <div class="b" data-step="2"><div class="label"><b>YOLO11n</b>: ${P.n} boxes</div><div class="label">${counts(P.counts)}</div></div>
      <div class="d4-card hi b" data-step="3"><div class="label">Neither has a word for “motorbike taxi carrying pipes”. What did each one rely on?</div></div>
    </div>
  </div>
`, { notes: [
  "Question five: something unfamiliar. A motorbike taxi in Kampala, carrying long pipes across two passengers.",
  `ResNet-18 says ${R.top5_kampala_pipes[0].label}, ${pct(R.top5_kampala_pipes[0].p)}, then ${R.top5_kampala_pipes[1].label}, ${pct(R.top5_kampala_pipes[1].p)}. Unicycle! Ask the room why.`,
  `YOLO finds ${P.n} boxes: ${counts(P.counts)}. Look at what it does with the pipes, and with the people on the bike.`,
  "Neither model has a category for what is actually happening. The interesting question is not that they fail, but what visual evidence each one used. That is exactly what your lab asks."
]});

st(`
  <h1 class="t">Optional: a model that learned without labels</h1>
  <div class="d4-cols" style="align-items:start">
    <div class="d4-code b" data-step="1">dino = torch.hub.load("facebookresearch/dinov2",
                      "dinov2_vits14")
z = dino(x)    <span class="c"># 384-d embedding</span></div>
    <div class="d4-card hi b" data-step="2"><div class="label"><b>DINOv2</b>: a Vision Transformer, trained self-supervised. No class labels at all.</div>
      <div class="label b" data-step="3">Rerun the visual search with it. Why might a model with no labels give better neighbours?</div>
      <div class="label b" data-step="3" style="color:var(--mute)">That is Day 5.</div></div>
  </div>
  ${cite('Oquab et al. (2024), DINOv2: Learning Robust Visual Features without Supervision')}
`, { notes: [
  "If there is time, two minutes. Otherwise this opens Day 5.",
  "DINOv2 loads in one line from torch hub and gives a 384-number embedding.",
  "It is a Vision Transformer, not a CNN, and it was trained without any class labels, by learning to match different views of the same image.",
  "Swap it in for ResNet in the visual search. Its neighbours often reflect object identity and layout better. Why might a model trained with no labels give better similarity? Hold that thought for tomorrow."
]});
}
