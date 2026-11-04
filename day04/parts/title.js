/* PART: title (Day 4). Owner: Fernanda · Shreya.
   Title, the running example (one street, four questions), and the path through today. */
{
section('Title');

st(`
  <div class="d4-cols wide-r roomy" style="align-items:center">
    <div class="copy">
      <div class="statement">CNNs and Visual Recognition</div>
      <div class="lead" style="margin-top:2vh;color:var(--mute)">How networks learn filters, and what they do with them</div>
      <div class="label" style="margin-top:4vh">Day 4 · Visual Perception</div>
      <div class="label" style="margin-top:.6vh">Fernanda De La Torre · Shreya Pandit</div>
    </div>
    <div class="pic"><img src="${A}photos/street.jpg" alt="Tom Mboya Street, Nairobi"><div class="label">Tom Mboya Street, Nairobi. Bahnfrend, CC BY-SA 4.0</div></div>
  </div>
`, { blank: false, notes: "Welcome to Day 4. Yesterday we designed filters by hand: blurs, edge detectors, Gabors. Today the question is what happens when a network learns its own filters, stacks them, and uses them to answer questions about images. We will keep coming back to this one photograph of Tom Mboya Street in Nairobi." });

st(`
  <h1 class="t roomy">One image, four questions</h1>
  <div class="d4-cols wide-l">
    <div class="pic"><img src="${A}photos/street.jpg" alt=""></div>
    <div class="q4 copy">
      <div class="q b"><b>Classification</b><span>What is in this image?</span></div>
      <div class="q b"><b>Visual search</b><span>Which other images look like it?</span></div>
      <div class="q b"><b>Detection</b><span>What objects are here, and where?</span></div>
      <div class="q b"><b>Segmentation</b><span>Which pixels belong to what?</span></div>
      <div class="label b" style="margin-top:2vh;border-left:4px solid var(--hi);padding-left:1vw">Same visual features underneath. A different architecture and a different output on top.</div>
    </div>
  </div>
`, { notes: [
  "Here is the plan for the whole session in one slide. Look at the street. There are buses, cars, motorbikes, people, buildings. What could a vision system tell us about it?",
  "First: what is in this image? That is classification. One answer for the whole picture.",
  "Second: which other images look like this one? That is visual search.",
  "Third: what objects are present, and where are they? That is detection: boxes, labels, confidences.",
  "Fourth: which pixels belong to each object or region? That is segmentation.",
  "The point to hold on to: all four rest on the same kind of learned visual features. What changes is the architecture around them and what the last layer is asked to produce. By the end of today you will have seen a real model answer each question about this exact image."
]});

st(`
  <h1 class="t roomy">Today</h1>
  <div class="flow">
    <div class="step b" data-step="1"><b>Networks</b><span class="label">how a network learns</span></div>
    <div class="arrow b" data-step="2">→</div>
    <div class="step b" data-step="2"><b>Convolution</b><span class="label">why images need a different network</span></div>
    <div class="arrow b" data-step="3">→</div>
    <div class="step b" data-step="3"><b>CNNs</b><span class="label">layers that build features</span></div>
    <div class="arrow b" data-step="4">→</div>
    <div class="step b" data-step="4"><b>Four tasks</b><span class="label">ResNet, YOLO, U-Net</span></div>
    <div class="arrow b" data-step="5">→</div>
    <div class="step b hi" data-step="5"><b>In practice</b><span class="label">run them, then break them</span></div>
  </div>
`, { notes: [
  "Five stops today.",
  "We start with a quick refresher on how a neural network learns.",
  "Then we ask why an ordinary network is a poor fit for images, and how convolution fixes that, building directly on yesterday.",
  "Then the parts of a convolutional network and how its layers build up features.",
  "Then the four tasks, with the models that do them: ResNet for classification and search, YOLO for detection, U-Net for segmentation.",
  "And finally we open real pretrained models, run them, and start finding where they fail. That is where your lab and project begin."
]});
}
