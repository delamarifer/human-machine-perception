/* PART: images (Day 4). Owner: Fernanda · Shreya.
   Section 2, 10 min: why fully connected networks fit images poorly. Flattening, parameter count,
   the pixel permutation (computed in assets/pipeline.py), locality and weight sharing. */
{
section('2. Images');

const inputs = 224 * 224 * 3, hidden = 1000, conv = 64 * (3 * 3 * 3 + 1);

st(`
  <h1 class="t">Flatten an image into a fully connected network</h1>
  <div class="d4-cols">
    <div style="display:flex;flex-direction:column;gap:2.4vh">
      <div class="b" data-step="1"><div class="label">a ${M('224 × 224 × 3')} image becomes a vector of</div><div class="big">${fmt(inputs)}</div></div>
      <div class="b" data-step="2"><div class="label">one hidden layer of ${fmt(hidden)} units needs</div><div class="big hi-t">${fmt(inputs * hidden)}</div><div class="label">weights, before any depth</div></div>
    </div>
    <div class="pic b" data-step="1"><img src="${A}resnet/street-crop.jpg" alt="" style="max-height:52vh"><div class="label">the street, as a 224 × 224 classifier sees it</div></div>
  </div>
`, { notes: [
  "Let us try the obvious thing: feed an image straight into the network we just described.",
  "Take the street image at 224 by 224 pixels with three colour channels and flatten it into one long vector: 150,528 numbers.",
  "Connect that to a single hidden layer of a thousand neurons. Every neuron needs a weight for every input: about 150 million weights, in the first layer alone, before we have any depth at all. That is a lot of parameters to learn, and a lot of data needed to learn them."
]});

st(`
  <h1 class="t">A fully connected network does not know which pixels are neighbours</h1>
  <div class="d4-cols" style="grid-template-columns:1fr 1fr 1.1fr">
    <div class="pic"><img src="${A}resnet/street-crop.jpg" alt="" style="image-rendering:pixelated"><div class="label">the street</div></div>
    <div class="pic b" data-step="1"><img src="${A}resnet/street-permuted.png" alt="" style="image-rendering:pixelated"><div class="label">the same pixels, shuffled by one fixed permutation</div></div>
    <div class="d4-card hi b" data-step="2"><div class="label">Shuffle <b>every</b> image in the dataset the same way. A fully connected network learns the shuffled task <b>exactly as well</b>.</div>
      <div class="label b" data-step="3" style="color:var(--mute)">You cannot read the right-hand image. To the network, the two are the same problem.</div></div>
  </div>
`, { notes: [
  "Here is a stronger argument than parameter count. On the left, the street.",
  "In the middle, the same 150 thousand numbers, shuffled with one fixed random permutation. Every pixel is still there, just moved.",
  "Now imagine shuffling every image in the training set with that same permutation. A fully connected network learns the shuffled version exactly as well as the original, because it treats each input as an independent number. It has no idea which pixels are next to each other.",
  "For you, the shuffled image is unreadable. Neighbourhoods are almost everything in vision. So a fully connected network is ignoring the structure that matters most."
]});

st(`
  <h1 class="t">Two assumptions that fix this</h1>
  <div class="d4-cols">
    <div class="d4-card b" data-step="1"><h3>Locality</h3><div class="label">Useful features depend on a small neighbourhood. Each unit looks at a ${M('3 × 3')} patch, not the whole image.</div></div>
    <div class="d4-card b" data-step="2"><h3>Weight sharing</h3><div class="label">A feature useful in one place is useful everywhere. Slide the same small filter over every position.</div></div>
  </div>
  <div class="d4-card hi b" data-step="3"><div class="label">Together: <b>convolution</b>. 64 filters of ${M('3 × 3 × 3')} = ${M(`64 × (27 + 1) = ${fmt(conv)}`)} parameters, for <b>any</b> image size.</div></div>
`, { notes: [
  "Two assumptions about images fix both problems.",
  "First, locality: the features we care about, an edge, a corner, a bit of texture, depend on a small neighbourhood. So each unit only looks at a small patch.",
  "Second, weight sharing: if an edge detector is useful in the top-left corner, it is useful in the bottom-right too. So we use the same weights at every position. A cat detector learned in one place is not wasted somewhere else.",
  "Put these together and you get convolution, which you already know from yesterday. Sixty-four 3 by 3 filters over three colour channels is 1,792 parameters, compared with 150 million. And it does not depend on the image size at all."
]});

st(`
  <div class="center" style="max-width:64vw">
    <div class="question">When would locality be the wrong assumption?</div>
    <div class="label b" style="margin-top:4vh">Is it a boat or a car? Check for water far away.</div>
    <div class="label b" style="margin-top:1.2vh">Data that is not on a grid: graphs, point clouds, sets.</div>
    <div class="label b" style="margin-top:1.2vh;color:var(--mute)">Keep this for Day 5: transformers relax locality.</div>
  </div>
`, { notes: [
  "Turn to your neighbour for thirty seconds: when would locality be the wrong assumption?",
  "One answer: long-range context. Whether that shape is a boat or a car may depend on water at the other side of the image.",
  "Another: data that does not live on a grid at all, like graphs or point clouds.",
  "Keep this question. On Day 5, transformers let every patch look at every other patch, which relaxes exactly this assumption."
]});
}
