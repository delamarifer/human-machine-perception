/* PART: limits (Object Recognition). Owner: Shreya.
   Solved and open, in five slides. The grouping is ours, not the chapter's: say so aloud. */
{
section('4. Solved or open');

/* Real photos and outputs from day04/assets (pipeline.py, numbers in result.js). */
const A4 = '../day04/assets/', pc = p => Math.round(p * 100) + '%';
const KB = D4.yolo['kampala-boda'], KP = D4.yolo['kampala-pipes'], RP = D4.resnet.top5_kampala_pipes, CT = D4.unet.case, SG = D4.seg.fractions;

st(`
  <h1 class="t">Largely solved, as engineering</h1>
  <div class="or-tiles">
    <div class="or-tile b"><img src="${A4}yolo/kampala-boda.jpg" alt="YOLO11n boxes on a street in Kampala"><div class="lead"><b>Traffic</b></div><div class="label">Detection: ${KB.n} boxes in Kampala</div></div>
    <div class="or-tile b"><img src="${A4}unet/ct-pred.png" alt="Spleen segmented on a CT slice" style="object-fit:contain"><div class="lead"><b>Medicine</b></div><div class="label">Segmentation: spleen on CT, Dice ${CT.dice.toFixed(3)}</div></div>
    <div class="or-tile b"><img src="${A4}photos/cairo-sentinel2.jpg" alt="Sentinel-2 image of Cairo"><div class="lead"><b>Earth observation</b></div><div class="label">Which pixels are city, farmland, desert?</div></div>
  </div>
  ${cite('Kampala: ObbyK, CC BY-SA 4.0 · CT: Medical Segmentation Decathlon, CC BY-SA 4.0 · Cairo: ESA, CC BY-SA 3.0 IGO')}
`, { notes: [
  "(draft) Where does this leave us? The chapter does not sort things into solved and open. This grouping is ours, built from its shortcomings sections. Classification over a closed vocabulary, and boxes and masks for common categories, work well as engineering. They share a settled set of building blocks: image classifiers, region proposals, pixelwise classifiers and bounding-box regression.",
  `(draft) Traffic: YOLO11n on a street in Kampala, ${KB.n} boxes at confidence 0.25. It was trained on COCO, with no special knowledge of this city.`,
  `(draft) Medicine: a 3D U-Net segments the spleen on a CT scan it was not trained on. Dice over this whole volume is ${CT.dice.toFixed(3)}. That is one case, not a clinical evaluation.`,
  "(draft) Earth observation: this is Sentinel-2 over Cairo. Labeling each pixel as city, farmland or desert is a segmentation problem. No model was run on this image; it shows the task."
]});

/* Ring = bounding box of the largest person region in day04/assets/seg/street-mask.png (1280 x 914),
   measured by connected components: x 803-1049, y 601-819. */
st(`
  <h1 class="t">What these outputs cannot say</h1>
  <div class="or-cards or-c2">
    <div class="or-card b" data-step="1">
      ${fig(A4 + 'yolo/kampala-pipes.jpg')}
      <div class="lead"><b>Closed vocabulary</b></div>
      <div class="label">ResNet-18: ${RP[0].label} ${pc(RP[0].p)}. YOLO11n: ${KP.n} boxes, none for the pipes</div>
    </div>
    <div class="or-card b" data-step="2">
      ${rfig(A4 + 'seg/street-overlay.jpg', 1280 / 914, [{r: [803 / 1280, 601 / 914, 246 / 1280, 218 / 914], k: 'ring', step: 2}])}
      <div class="lead"><b>One label per pixel</b></div>
      <div class="label">${(SG.__background__ * 100).toFixed(1)}% is "background"; the ringed people merge into one region</div>
    </div>
  </div>
  ${cite('Kampala: Simisa, CC BY-SA 3.0 · Nairobi: Bahnfrend, CC BY-SA 4.0 · YOLO11n, ResNet-18, DeepLabV3 (20 VOC classes)')}
`, { notes: [
  "(draft) Here is what these formulations leave out, on two real photos.",
  `(draft) A motorbike taxi in Kampala, with two people carrying long pipes across it. You understand this at once. ResNet-18 says ${RP[0].label}, ${pc(RP[0].p)}, then ${RP[1].label}, ${pc(RP[1].p)}. YOLO11n finds ${KP.n} boxes, but pipes are not one of its 80 classes, so the most important object in the picture is not reported. A fixed output of length K cannot answer an unlimited set of questions.`,
  `(draft) Our Nairobi street, labeled by DeepLabV3 with its 20 classes. ${(SG.__background__ * 100).toFixed(1)} percent of the pixels are background: buildings, road and sky share one label. In the ring, the person pixels form one region even though YOLO put two person boxes there. One label per pixel also cannot represent transparency or depth order. And class boundaries stay fuzzy: is a toy car a car? Is a pepper a fruit or a vegetable? A dataset has to pick one.`
]});

const Q = (t, q, e) => `<div class="or-card b"><div class="lead"><b>${t}</b></div><div class="label">${q}</div><div class="label or-note">${e}</div></div>`;

st(`
  <h1 class="t">Open questions in transfer</h1>
  <div class="or-cards or-c3">
    ${Q('What transfers?', 'Across tasks and domains', 'Early features usually; other domains less reliably')}
    ${Q('Does it always help?', 'When pretraining stops helping', 'Some medical imaging tasks')}
    ${Q('Biases transfer too', 'What else does a backbone carry?', 'Its dataset skews, into every system')}
  </div>
  ${cite('Raghu et al. (2019) · He et al. (2019)')}
`, { notes: [
  "(draft) Same backbone, new head works remarkably well. But it leaves real questions open.",
  "(draft) Which features transfer? Early ones usually do. Later ones depend on how close the tasks are. Can everyday-photo features help satellite, microscopy or medical images? Sometimes, and much less reliably. How much to fine-tune has no general rule. It is chosen empirically.",
  "(draft) When does pretraining stop helping? On two large medical imaging tasks, Raghu and colleagues found transfer offered little benefit, and simple lightweight models did about as well. On COCO detection, He and colleagues found that training from scratch was no worse than pretraining, although pretraining converged faster.",
  "(draft) And a warning: biases transfer too. A backbone carries the skews of its dataset into every system built on it. That is the shortcut problem again, now at the scale of a whole field."
]});

st(`
  <h1 class="t">Learning without forgetting</h1>
  <div class="lead b" data-step="1"><b>Catastrophic forgetting:</b> training on a new task can overwrite the old one</div>
  <div class="or-cards or-c3 b" data-step="2">
    <div class="or-card"><div class="lead"><b>Replay</b></div><div class="label">Mix old examples into new training</div></div>
    <div class="or-card"><div class="lead"><b>Elastic weights</b></div><div class="label">Penalize changes to weights that mattered</div></div>
    <div class="or-card"><div class="lead"><b>Distillation</b></div><div class="label">Match the old model's outputs</div></div>
    <div class="or-card"><div class="lead"><b>Parameter isolation</b></div><div class="label">Reserve separate weights for each task</div></div>
    <div class="or-card"><div class="lead"><b>Growing models</b></div><div class="label">Add new capacity instead of overwriting</div></div>
  </div>
  <div class="question b" data-step="3" style="text-align:center;margin-bottom:5vh">What should a model remember?</div>
  ${cite('McCloskey &amp; Cohen (1989) · French (1999) · Kirkpatrick et al. (2017) · Li &amp; Hoiem (2016) · Mallya &amp; Lazebnik (2018) · Rusu et al. (2016)')}
`, { notes: [
  "(draft) Fine-tuning has a cost that we have not mentioned yet.",
  "(draft) Fine-tuning on a new task can overwrite what the network knew. This is catastrophic forgetting, described by McCloskey and Cohen in 1989. Related effects are representation drift, where features shift over time, and interference, where new learning disrupts old.",
  "(draft) There are five families of fixes. Replay mixes old examples into new training. Elastic Weight Consolidation slows learning on weights that mattered for old tasks. Distillation, as in Learning without Forgetting, makes the updated model match the old model's outputs. Parameter isolation, as in PackNet, reserves weights for each task. Growing models, such as Progressive Networks, add capacity instead of overwriting; that paper tested reinforcement learning rather than vision.",
  "(draft) This is still open. What should a model remember? When should it update features, and when add new ones? Can forgotten knowledge be recovered? Should models forget selectively? Ask the room for an example where forgetting would be a good thing."
]});

st(`
  <h1 class="t">Beyond naming: a vision system like a scientist</h1>
  <div class="or-cards or-c3">
    ${Q('What is there?', 'A coherent object? What 3D shape?', 'What supports it?')}
    ${Q('How can I act on it?', 'Soft or rigid? Does it have parts?', 'How can I grasp it? What is it for?')}
    ${Q('What is its story?', 'Alive? Natural or artificial?', 'Is it stable? What will it do next?')}
  </div>
  <div class="lead b" style="text-align:center;margin-bottom:5vh"><b>Hypothesize → experiment → intervene</b></div>
  ${cite('Ch. 50, Section 50.7')}
`, { notes: [
  "(draft) All four tasks define objects through words, and these outputs are hard to act on. A robot grasping an object needs 3D shape and physical properties. A vehicle needs accurate 3D locations and dynamics. The chapter proposes other questions a recognition system should answer.",
  "(draft) First, what is there: is this a coherent object or a random arrangement of things, what is its 3D shape, and what supports it?",
  "(draft) Second, how can I act on it: is it soft or rigid, does it have parts, how can I grasp it, and what is it useful for?",
  "(draft) Third, what is its story: is it alive or edible, is it natural or artificial, how did it get here, is it stable, and what will it do next? Think of the load on that motorbike.",
  "(draft) Those are the questions a scientist asks about a new phenomenon, and that is the argument the chapter closes on. A system should form hypotheses, design experiments and intervene in the world. Language can answer some of these questions, but it need not be the only internal representation. Which leaves one question: how do we know any of this is getting better?"
]});
}
