/* PART: lab (Object Recognition). Owner: Shreya.
   The Day 4 lab directions. Moved here from day04/parts/project.js, which is no longer loaded
   now that the Day 4 deck ends with Section 4. The slide names no file: the link is on the course site. */
{
section('6. Lab and homework');

st(`
  <h1 class="t">Lab: a CNN for handwritten digits</h1>
  <div class="flow">
    <div class="step b" data-step="1"><b>MNIST</b><span class="label">28 × 28 handwritten digits, 0 to 9</span></div>
    <div class="arrow b" data-step="2">→</div>
    <div class="step b" data-step="2"><b>Build</b><span class="label">conv → pool → conv → pool → dense</span></div>
    <div class="arrow b" data-step="3">→</div>
    <div class="step b" data-step="3"><b>Train</b><span class="label">forward, loss, backward, update</span></div>
    <div class="arrow b" data-step="4">→</div>
    <div class="step b" data-step="4"><b>Test</b><span class="label">accuracy on digits it never saw</span></div>
  </div>
  <div class="label b" data-step="5" style="text-align:center">Colab link: course site → Day 4</div>
  ${cite('Adapted from MIT Introduction to Deep Learning (6.S191), Lab 2 Part 1 · © MIT Introduction to Deep Learning, introtodeeplearning.com, MIT License')}
`, { notes: [
  "(draft) The lab today: you build a convolutional network yourselves, in PyTorch.",
  "(draft) The data is MNIST: small, 28 by 28 pictures of handwritten digits, zero to nine.",
  "(draft) You build a CNN: convolution and pooling, twice, and then dense layers.",
  "(draft) You train it: a forward pass, the loss, a backward pass, and an update to the weights.",
  "(draft) And you test it on digits it never saw during training. How accurate is it, and where does it go wrong?",
  "(draft) The Colab link is on the course site, under Day 4. The lab is adapted from MIT's Introduction to Deep Learning course."
]});
}
