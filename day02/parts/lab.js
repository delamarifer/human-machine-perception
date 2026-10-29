/* PART: lab (Day 2). Owner: to decide (see README.md). Plan: 45 min.
   Lab goal, from the plan: the pretrained model workflow. Load an image, preprocess it, run a model you
   did not train, read the output, wrap it in a demo. Build it on your own photo, then a classmate's. */
{
section('Lab');

st(`
  <h1 class="t">Lab: a one-image vision app</h1>
  <div class="flow" style="margin:auto 0">
    <div class="step b" data-step="1"><b>Load</b></div>
    <div class="arrow b" data-step="2">→</div>
    <div class="step b" data-step="2"><b>Preprocess</b></div>
    <div class="arrow b" data-step="3">→</div>
    <div class="step b" data-step="3"><b>Run a model</b><span class="label">you did not train</span></div>
    <div class="arrow b" data-step="4">→</div>
    <div class="step b" data-step="4"><b>Read the output</b></div>
    <div class="arrow b" data-step="5">→</div>
    <div class="step b" data-step="5"><b>Wrap it in a demo</b></div>
  </div>
`, { notes: [
  "(draft) Now you build it. The goal of the lab is one workflow: the pretrained model workflow.",
  "(draft) Load an image.",
  "(draft) Preprocess it: crop, resize, and turn it into numbers in the shape the model expects.",
  "(draft) Run a model you did not train. Someone else spent the data and the compute; you get to use it.",
  "(draft) Read the output: what do these numbers mean, and how much should you trust them?",
  "(draft) And wrap it in a small demo, so anyone can try it. Classification and depth are our two examples, but these skills transfer to any pretrained model."
]});

st(`
  <h1 class="t">Lab: a one-image vision app</h1>
  <ul class="frag">
    <li class="b">Build it on your own phone photo</li>
    <li class="b">Then point it at a classmate’s</li>
  </ul>
  <p class="b"><a href="https://colab.research.google.com/github/delamarifer/human-machine-perception/blob/main/notebooks/day02-lab.ipynb">Open the Day 2 lab in Colab</a></p>
  <p class="b">Upload a photo from your phone in the last section. For a classmate’s photo, use their laptop, or upload the picture they send you.</p>
`, { blank: false, notes: [
  "(draft) Two steps.",
  "(draft) First, build the app on a photo from your own phone.",
  "(draft) Then trade: point your app at a classmate's photo, and see where it agrees with what you see, and where it doesn't.",
  "The notebook is notebooks/day02-lab.ipynb. The upload box stays in the notebook. It does not publish a public link."
]});
}
