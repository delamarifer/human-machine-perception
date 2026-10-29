/* PART: pixels-to-objects (Day 4). Owner: to decide (see README.md). Plan: 15 min.
   1. What is a representation (static)   2. The ladder, computed live (scenes/pixels-to-objects.html) */
{
section('Pixels to objects');

st(`
  <h1 class="t">What is a representation?</h1>
  <div class="flow" style="margin:auto 10vw">
    <div class="step b" data-step="1"><b>Image</b></div>
    <div class="arrow b" data-step="1">→</div>
    <div class="step b" data-step="1"><b>f</b></div>
    <div class="arrow b" data-step="1">→</div>
    <div class="step b" data-step="1"><b>Numbers</b></div>
  </div>
  <div class="statement center b" data-step="2">Keeps some information, discards the rest</div>
`, { notes: [
  "(draft) What do we mean by a representation?",
  "(draft) A representation is a function: it takes an image and returns a list of numbers. The pixels themselves are one representation; a list of filter responses is another; a label like cat is another.",
  "(draft) Every representation except the pixels keeps some of the information in the image and discards the rest. The interesting question is what it keeps."
]});

sc('pixelsToObjects', 'scenes/pixels-to-objects.html');
}
