/* PART: detect-segment (Day 4). Owner: Fernanda · Shreya.
   Section 6, 25 min (about 12 detection, 13 segmentation): keeping "where", YOLO (grids, backbone/neck/head,
   thresholds, NMS), segmentation, encoder-decoder, U-Net skips, the CT example, residual vs U-Net skips,
   and the filled-in running-example table. All outputs from assets/pipeline.py. */
{
section('6. YOLO & U-Net');

const Y = D4.yolo, G = D4.seg, U = D4.unet, stg = D4.resnet.stages;
const st25 = Y.street['0.25'];

st(`
  <div class="center" style="max-width:66vw">
    <div class="statement">The classification head averages away <b>where</b>.</div>
    <div class="label b" style="margin-top:3vh">${M(stg[5].shape.join(' × '))} → global average pool → ${M('512')} → one label</div>
    <div class="question b" style="margin-top:4vh">How do we keep the spatial information?</div>
  </div>
`, { notes: [
  "Both tasks in this section answer one question.",
  "The classifier's last step averages the 7 by 7 grid into one vector. Every bit of where is gone.",
  "Detection and segmentation are two ways of keeping it."
]});

st(`
  <h1 class="t">Object detection: what, where, how sure</h1>
  <div class="d4-cols wide-r">
    <div class="d4-code b" data-step="1">[ (<span style="color:#fbbf24">"bus"</span>,    [x1, y1, x2, y2], 0.74),
  (<span style="color:#fbbf24">"person"</span>, [x1, y1, x2, y2], 0.50),
  (<span style="color:#fbbf24">"motorcycle"</span>, [ … ],       0.68),
  … ]</div>
    <div style="display:flex;flex-direction:column;gap:1.6vh">
      <div class="d4-card b" data-step="2"><div class="label">A <b>variable-length</b> list: the network decides how many objects there are.</div></div>
      <div class="d4-card b" data-step="3"><div class="label">Each box is four numbers. Each has a class and a confidence.</div></div>
    </div>
  </div>
`, { notes: [
  "Detection's output is a different kind of object from a class score.",
  "It is a list of detections: a class label, a box given by four numbers such as the top-left and bottom-right corners, and a confidence.",
  "The length of the list is not fixed. The street has fifteen objects, a quiet road might have two.",
  "So the network has to predict boxes, classes, and how many, all at once."
]});

const grids = [80, 40, 20], strides = [8, 16, 32];
st(`
  <h1 class="t">YOLO: You Only Look Once</h1>
  <div class="d4-card b" data-step="1"><div class="label">Old approach: propose thousands of regions, classify each crop. Slow.</div></div>
  <div class="d4-card hi b" data-step="2"><div class="label">YOLO: one forward pass. At <b>every location</b> of a feature grid, predict a box and class scores.</div></div>
  <div class="d4-grid3 b" data-step="3" style="flex:0 0 auto">
    ${grids.map((g, k) => `<div><div class="big">${g} × ${g}</div><div class="label">grid at stride ${strides[k]}: ${fmt(g * g)} locations</div></div>`).join('')}
  </div>
  <div class="label b" data-step="4">On a ${M('640 × 640')} input: ${grids.map(g => fmt(g * g)).join(' + ')} = <b>${fmt(Y.raw_candidates)}</b> candidate boxes, measured from YOLO11n's raw output.</div>
  ${cite('Redmon, Divvala, Girshick &amp; Farhadi (2016), You Only Look Once: Unified, Real-Time Object Detection')}
`, { notes: [
  "How do you predict a variable number of boxes?",
  "Earlier detectors proposed thousands of candidate regions, cropped each one, and ran a classifier on every crop. Accurate, but slow.",
  "YOLO, You Only Look Once, turns detection into one forward pass. The network outputs a feature grid, and at every grid location it predicts a box and class scores. That single pass is what makes it real-time.",
  "Modern YOLO predicts at three grid sizes. On a 640 input: 80 by 80 cells for small objects, 40 by 40, and 20 by 20 for big ones.",
  `That is ${fmt(Y.raw_candidates)} candidate boxes for every image. We measured that from YOLO11n's raw output. Most of them are junk, which is the next problem.`
]});

st(`
  <h1 class="t">Backbone, neck, head</h1>
  <div class="flow">
    <div class="step b" data-step="1"><b>backbone</b><span class="label">a CNN feature extractor<br>${fmt(Y.params_backbone)} params</span></div>
    <div class="arrow b" data-step="2">→</div>
    <div class="step b" data-step="2"><b>neck</b><span class="label">merges fine and coarse maps<br>${fmt(Y.params_neck)} params</span></div>
    <div class="arrow b" data-step="3">→</div>
    <div class="step b hi" data-step="3"><b>head</b><span class="label">box + ${Y.n_classes} class scores per cell<br>${fmt(Y.params_head)} params</span></div>
  </div>
  <div class="d4-card b" data-step="4"><div class="label">The neck is Day 3's image pyramid, learned: small, distant people use the fine 80 × 80 map; the bus uses the coarse 20 × 20 one.</div></div>
  <div class="label b" data-step="4" style="color:var(--mute)">YOLO11n: ${fmt(Y.params)} parameters in total, ${Y.gflops} GFLOPs. ResNet-18 has ${fmt(D4.resnet.params)}.</div>
`, { notes: [
  "Detectors have three parts.",
  "The backbone is the same idea as Section 4: a CNN that turns pixels into feature maps at several resolutions.",
  "The neck merges those maps, passing coarse, meaningful features down to the fine maps and fine detail up to the coarse ones.",
  "The head predicts, at each cell of each map, box coordinates and scores for the 80 COCO classes.",
  "If the neck sounds familiar, it should: it is a learned version of yesterday's image pyramid. Small, distant pedestrians are found on the fine map, the bus on the coarse one. And note the size: YOLO11n is a quarter of the size of ResNet-18."
]});

st(`
  <h1 class="t">YOLO11n on the street</h1>
  <div class="d4-cols wide-l">
    <div class="pic"><img src="${A}yolo/street-conf25.jpg" alt="" style="max-height:60vh"></div>
    <div style="display:flex;flex-direction:column;gap:1.8vh">
      <div class="b" data-step="1"><div class="big">${st25.n}</div><div class="label">detections at confidence ≥ ${st25.conf}</div></div>
      <div class="label b" data-step="1">${counts(st25.counts)}</div>
      <div class="d4-card hi b" data-step="2"><div class="label">Counts and locations, several classes at once: what the classifier could not give us.</div></div>
    </div>
  </div>
`, { notes: [
  "Here is YOLO11n, the smallest model of the current Ultralytics family, on the full street photo.",
  `At the default threshold of 0.25 it finds ${st25.n} objects: ${counts(st25.counts)}.`,
  "Compare with ResNet's one label, police van. We now know how many things there are, what they are, and where. Look closely, though: some boxes overlap, some motorbikes are labelled as people with motorbikes, and the far-away crowd is mostly missed."
]});

const lv = ['0.1', '0.25', '0.6'];
st(`
  <h1 class="t">The threshold is a choice, not a fact about the image</h1>
  <div class="pics" style="grid-template-columns:repeat(3,1fr)">
    ${lv.map((c, k) => `<div class="pic b" data-step="${k + 1}"><img src="${A}yolo/street-conf${String(Math.round(c * 100)).padStart(2, '0')}.jpg" alt=""><div class="label"><b>conf ≥ ${c}</b>: ${Y.street[c].n} boxes</div></div>`).join('')}
  </div>
  <div class="d4-cols" style="align-items:start;flex:0 0 auto">
    <div class="d4-card b" data-step="4"><div class="label"><b>IoU</b> = area of overlap / area of union. Two boxes on one bus overlap a lot.</div></div>
    <div class="d4-card hi b" data-step="5"><div class="label"><b>Non-maximum suppression</b>: keep the most confident box, drop the ones that overlap it, repeat.</div></div>
  </div>
`, { notes: [
  `From ${fmt(Y.raw_candidates)} candidates to a short list takes two steps. First, a confidence threshold.`,
  `At 0.1: ${Y.street['0.1'].n} boxes, more people found in the distance, and more mistakes.`,
  `At 0.25, the default: ${Y.street['0.25'].n}.`,
  `At 0.6: only ${Y.street['0.6'].n}. Same image, same model. The threshold trades missed objects against false alarms, and someone has to choose it for the application. A pedestrian-safety system and a traffic counter would choose differently.`,
  "Second, many neighbouring cells fire on the same bus. Intersection over union measures how much two boxes overlap.",
  "Non-maximum suppression keeps the most confident box and removes others that overlap it by more than a set IoU, then repeats. Both steps run after the network, and both have settings you can change."
]});

st(`
  <div class="center" style="max-width:64vw">
    <div class="question">What can a box still not tell us?</div>
    <div class="label b" style="margin-top:4vh">The exact outline of the bus.</div>
    <div class="label b" style="margin-top:1.2vh">Where the road is, where the sky is: regions without a box.</div>
    <div class="label b" style="margin-top:1.2vh">Where one overlapping person ends and the next begins.</div>
  </div>
`, { notes: [
  "Before moving on: what can a box still not tell us?",
  "The exact outline of an object. A box around a person is mostly background.",
  "Regions that are not objects: the road, the sky, the buildings. Nobody draws a box around the road.",
  "And where overlapping objects separate. For all of these we need a label for every pixel."
]});

st(`
  <h1 class="t">Segmentation: a label for every pixel</h1>
  <div class="d4-cols">
    <div class="d4-card b" data-step="1"><h3>Semantic</h3><div class="label">Every pixel gets a class. All buses are “bus”.</div></div>
    <div class="d4-card b" data-step="2"><h3>Instance</h3><div class="label">Every object gets its own mask: bus 1, bus 2.</div></div>
  </div>
  <div class="d4-card hi b" data-step="3"><div class="label">The output is an image the same size as the input. We focus on semantic segmentation.</div></div>
`, { notes: [
  "Segmentation labels every pixel.",
  "Semantic segmentation gives each pixel a class: all bus pixels are bus, whichever bus they belong to.",
  "Instance segmentation also separates the objects: this bus, that bus.",
  "Either way, the output is an image with the same height and width as the input. Today we focus on semantic segmentation."
]});

st(`
  <h1 class="t">The problem: the backbone throws resolution away</h1>
  <div class="flow">
    ${[0, 2, 3, 4, 5].map((k, j) => `${j ? '<div class="arrow b" data-step="1">→</div>' : ''}<div class="step b ${k === 5 ? 'hi' : ''}" data-step="1"><b>${stg[k].shape[1]} × ${stg[k].shape[2]}</b><span class="label">${stg[k].name}</span></div>`).join('')}
  </div>
  <div class="d4-cols" style="align-items:start;flex:0 0 auto">
    <div class="d4-card b" data-step="2"><div class="label">Deep: we know <b>what</b>.</div></div>
    <div class="d4-card hi b" data-step="2"><div class="label">Shallow: we know <b>where</b>, precisely.</div></div>
  </div>
  <div class="question b" data-step="3" style="text-align:center">How do we get both, at full resolution?</div>
`, { notes: [
  "Here is the difficulty.",
  "ResNet-18 shrinks the street from 112 by 112 down to 7 by 7. Each step down buys meaning and costs resolution.",
  "The deep layers know what is there. The shallow layers know exactly where the edges are. Neither alone gives a sharp, correct label per pixel.",
  "So: how do we combine them, at full resolution?"
]});

const ch = U.network_def.channels;
const unet = (() => {
  const n = ch.length, wid = k => 24 + k * 6, Ydn = k => 30 + k * 46;
  const X = k => k === n - 1 ? 380 - wid(k) / 2 : 40 + k * 75;      // the bottom of the U sits in the middle
  let s = `<svg viewBox="0 0 760 290" style="width:100%;max-height:50vh">
    <defs><marker id="ua" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#64748b"/></marker></defs>`;
  const xd = k => k === n - 1 ? X(k) + wid(k) / 2 : 720 - X(k) - wid(k) / 2;      // decoder box centre (the bottom is shared)
  for(let k = 0; k < n - 1; k++){
    s += `<line x1="${X(k) + wid(k) / 2}" y1="${Ydn(k) + 34}" x2="${X(k + 1) + wid(k + 1) / 2 - 4}" y2="${Ydn(k + 1) - 2}" stroke="#64748b" stroke-width="2" marker-end="url(#ua)" class="b" data-step="1"/>
          <line x1="${xd(k + 1) + 4}" y1="${Ydn(k + 1) - 2}" x2="${xd(k)}" y2="${Ydn(k) + 34}" stroke="#64748b" stroke-width="2" marker-end="url(#ua)" class="b" data-step="2"/>`;
  }
  for(let k = 0; k < n; k++){
    const y = Ydn(k), w = wid(k);
    s += `<rect x="${X(k)}" y="${y}" width="${w}" height="34" rx="4" fill="#dbeafe" stroke="#1e3a8a" stroke-width="1.6" class="b" data-step="1"/>
          <text x="${X(k) + w / 2}" y="${y + 22}" text-anchor="middle" font-size="14" class="b" data-step="1">${ch[k]}</text>`;
    if(k < n - 1){
      const xr = 720 - X(k) - wid(k);
      s += `<rect x="${xr}" y="${y}" width="${w}" height="34" rx="4" fill="#dcfce7" stroke="#15803d" stroke-width="1.6" class="b" data-step="2"/>
            <text x="${xr + w / 2}" y="${y + 22}" text-anchor="middle" font-size="14" class="b" data-step="2">${ch[k]}</text>
            <line x1="${X(k) + w + 6}" y1="${y + 17}" x2="${xr - 8}" y2="${y + 17}" stroke="#d97706" stroke-width="2.5" stroke-dasharray="7,5" class="b" data-step="3"/>
            <polygon points="${xr - 8},${y + 11} ${xr},${y + 17} ${xr - 8},${y + 23}" fill="#d97706" class="b" data-step="3"/>`;
    }
  }
  s += `<text x="120" y="282" text-anchor="middle" font-size="15" fill="#1e3a8a" class="b" data-step="1">encoder: downsample</text>
        <text x="640" y="282" text-anchor="middle" font-size="15" fill="#15803d" class="b" data-step="2">decoder: upsample</text>
        <text x="380" y="18" text-anchor="middle" font-size="15" fill="#d97706" class="b" data-step="3">skip connections: copy and concatenate</text></svg>`;
  return s;
})();

st(`
  <h1 class="t">U-Net: encoder, decoder, skip connections</h1>
  <div>${unet}</div>
  <div class="d4-card hi b" data-step="4"><div class="label">The decoder gets deep meaning from below and sharp detail from across. Numbers: channels per level of the MONAI spleen U-Net.</div></div>
  ${cite('Ronneberger, Fischer &amp; Brox (2015), U-Net: Convolutional Networks for Biomedical Image Segmentation')}
`, { notes: [
  "U-Net's answer has three parts. Read the numbers as channels per level, from the medical model we will run.",
  `The encoder is an ordinary downsampling CNN: ${ch.join(', ')} channels, halving resolution at each step. This is the backbone.`,
  "The decoder climbs back up, upsampling step by step to full resolution.",
  "And the key idea: skip connections. At each resolution, the encoder's feature map is copied across and concatenated with the decoder's. Upsampling alone gives blurry boundaries, because the fine detail was lost on the way down. The skips put it back.",
  "So every decoder level combines deep meaning coming up from below with sharp, early-layer detail coming across. Draw the U, with the horizontal arrows clearly marked: that drawing is the whole idea."
]});

const fr = G.fractions, show = ['bus', 'person', 'motorbike', 'car'].filter(k => fr[k]);
st(`
  <h1 class="t">Segmenting the street</h1>
  <div class="d4-cols wide-l">
    <div class="pic"><img src="${A}seg/street-overlay.jpg" alt="" style="max-height:58vh"></div>
    <div style="display:flex;flex-direction:column;gap:1.6vh">
      ${table([['class', 'share of pixels'], ...show.map(k => [k, pct(fr[k])]), ['background', pct(fr.__background__)]], {cls: 'num'})}
      <div class="d4-card hi b"><div class="label">An encoder-decoder (DeepLabV3), trained on ${G.classes.length - 1} classes. No road, no building, no sky: those are all “background”.</div></div>
      <div class="label b" style="color:var(--mute)">There is no standard pretrained U-Net for street scenes. This is U-Net-<i>style</i>, not U-Net.</div>
    </div>
  </div>
`, { notes: [
  `On the street we use DeepLabV3, another encoder-decoder segmenter, trained with ${G.classes.length - 1} object classes. Purple is bus, orange is person, green is motorbike, blue is car. Buses cover ${pct(fr.bus)} of the pixels.`,
  "Notice what is missing. The model has no class for road, building or sky, so most of the image is background. Again: the label set decides what the model can see.",
  "And to be precise: this is U-Net-style, an encoder-decoder, not U-Net itself. There is no standard pretrained U-Net for street scenes. Where U-Net really shines is the next slide."
]});

const C = U.case;
st(`
  <h1 class="t">Why precise segmentation matters: a CT scan</h1>
  ${C ? `<div class="pics" style="grid-template-columns:repeat(3,1fr);max-width:78vw;margin:0 auto">
    <div class="pic b" data-step="1"><img src="${A}unet/ct-slice.png" alt=""><div class="label">one axial CT slice</div></div>
    <div class="pic b" data-step="2"><img src="${A}unet/ct-pred.png" alt=""><div class="label">U-Net: spleen</div></div>
    <div class="pic b" data-step="3"><img src="${A}unet/ct-truth.png" alt=""><div class="label">radiologist's label</div></div>
  </div>
  <div class="label b" data-step="4">Dice over the whole 3D scan = ${M(C.dice.toFixed(3))}, on a scan the model did not train on. Dice = 2|A ∩ B| / (|A| + |B|).</div>` : `<div class="todo">Run assets/pipeline.py with --spleen to make the CT images.</div>`}
  ${cite('MONAI spleen_ct_segmentation bundle ' + U.bundle_version + ' · Medical Segmentation Decathlon, Task09 Spleen (CC BY-SA 4.0), case ' + (C ? C.id : '') + ' · Simpson et al. (2019)')}
`, { notes: [
  "U-Net was introduced for biomedical images, where training sets are small and boundaries matter.",
  "Here is a 3D CT scan of an abdomen, one slice shown. The liver is the big organ on the left of the image; the spleen is on the right.",
  "The MONAI U-Net's prediction for the spleen, in orange.",
  "And the label drawn by an expert.",
  `Overlap is measured with the Dice score: twice the intersection over the total size. Across the whole 3D volume, ${C ? C.dice.toFixed(3) : ''}, on a scan from the validation split that it did not train on. Why the precision matters: spleen volume is a clinical measurement, and a radiotherapy plan around a tumour depends on millimetres. A box would be useless here.`
]});

st(`
  <h1 class="t">Two kinds of skip connection</h1>
  <div class="d4-cols" style="align-items:start">
    <div class="d4-card b" data-step="1"><h3>ResNet: add</h3>
      <div class="d4-eq"><i>y</i> = <i>F</i>(<i>x</i>) + <i>x</i></div>
      <div class="label">Within one stage, same resolution. Lets gradients flow through very deep networks.</div></div>
    <div class="d4-card hi b" data-step="2"><h3>U-Net: concatenate</h3>
      <div class="d4-eq">[ decoder ; encoder ]</div>
      <div class="label">Across the U, encoder to decoder. Brings back spatial detail lost on the way down.</div></div>
  </div>
`, { notes: [
  "Students often mix these two up, so let us name the difference.",
  "In ResNet, a residual connection adds a block's input to its output, inside one stage, at the same resolution. It is there to make very deep networks trainable.",
  "In U-Net, a skip connection concatenates an encoder map onto the decoder at the same resolution, across the U. It is there to recover spatial detail. Add versus concatenate; optimisation versus detail."
]});

st(`
  <h1 class="t">Back to the street: four outputs</h1>
  ${table([['Task', 'Model', 'Output on the street'],
    ['Classification', 'ResNet-18', `${D4.resnet.top5_street[0].label}, ${pct(D4.resnet.top5_street[0].p)}`],
    ['Visual search', 'ResNet-18 embedding', `${D4.search.ranking.slice(0, 5).filter(d => /nairobi|accra|kampala/.test(d.file)).length} of 5 nearest images are street scenes`],
    ['Detection', 'YOLO11n', `${st25.n} boxes: ${counts(st25.counts)}`],
    ['Segmentation', 'DeepLabV3 (U-Net-style)', `a mask: ${pct(fr.bus)} bus, ${pct(fr.person)} person`]], {build: true})}
  <div class="d4-card hi b" data-step="5"><div class="label">Same principles (local, shared, stacked filters). Different heads: a pooled vector, a grid of boxes, an upsampling decoder.</div></div>
`, { notes: [
  "Let us fill in the table from Section 4.",
  `Classification: one label, ${D4.resnet.top5_street[0].label}.`,
  "Visual search: the same features, used to find other street scenes.",
  `Detection: ${st25.n} labelled boxes.`,
  "Segmentation: a class for every pixel.",
  "The same principles underneath all four: local filters, shared across positions, stacked into a hierarchy. What differs is what we put on top: a pooled vector for classification and search, predictions on a grid for detection, an upsampling decoder with skips for segmentation."
]});
}
