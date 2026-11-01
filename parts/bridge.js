/* PART: bridge (Day 1). 55–70 min: what computer vision is, and how its methods changed. */
{
section('Machines');

st(`
  <h1 class="t">What is computer vision?</h1>
  <div class="lead b">Getting information about the world from images</div>
`, { notes: [
  "(draft) Computer vision is the attempt to get information about the world from images.",
  "(draft) The input is a picture. The output is something the picture does not store: a name, a distance, a shape."
]});

st(`
  <h1 class="t">How the methods changed</h1>
  <div class="flow">
    <div class="step b" data-step="1"><b>Geometry</b><span class="label">rules about the world</span></div>
    <div class="arrow b" data-step="2">→</div>
    <div class="step b" data-step="2"><b>Designed features</b><span class="label">edges, corners, texture</span></div>
    <div class="arrow b" data-step="3">→</div>
    <div class="step b" data-step="3"><b>Learned models</b><span class="label">deep learning, generative AI</span></div>
  </div>
`, { notes: [
  "(draft) Three eras. We will do the first one tomorrow, and a learned model the day after.",
  "(draft) Geometry: write the rules. A camera, a floor, boxes that sit on it.",
  "(draft) Designed features: a person decides what to measure. Edges, corners, texture.",
  "(draft) Learned models: the features are trained, not written. Deep learning, and systems that generate images as well as read them."
]});
}
