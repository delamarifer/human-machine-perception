/* PART: project (Day 4). Owner: Fernanda · Shreya.
   Section 9, 5 min: the lab and the homework.
   2026-11-04, at Fernanda's request: the lab is the CNN part of MIT 6.S191 Lab 2 Part 1 (MNIST), and the
   reading is Konkle & Alvarez 2022. The earlier version (pretrained-models lab, failure-case homework) is
   in parts/project-pretrained.js, not loaded. */
{
section('9. Lab');

st(`
  <h1 class="t">Lab: a CNN for handwritten digits</h1>
  <div class="flow">
    <div class="step b" data-step="1"><b>MNIST</b><span class="label">28 × 28 handwritten digits, 0 to 9</span></div>
    <div class="arrow b" data-step="2">→</div>
    <div class="step b" data-step="2"><b>Fully connected</b><span class="label">flatten → dense → dense</span></div>
    <div class="arrow b" data-step="3">→</div>
    <div class="step b" data-step="3"><b>CNN</b><span class="label">conv → pool → conv → pool → dense</span></div>
    <div class="arrow b" data-step="4">→</div>
    <div class="step b" data-step="4"><b>Compare</b><span class="label">test accuracy of the two</span></div>
  </div>
  <div class="label b" data-step="5" style="text-align:center">Colab link: course site → Day 4</div>
  ${cite('Adapted from MIT Introduction to Deep Learning (6.S191), Lab 2 Part 1 · © MIT Introduction to Deep Learning, introtodeeplearning.com, MIT License')}
`, { notes: [
  "(draft) The lab today: you build a convolutional network yourselves, in PyTorch.",
  "(draft) The data is MNIST: small, 28 by 28 pictures of handwritten digits, zero to nine. Bigger than the 8 by 8 digits in our network from the start of class.",
  "(draft) First, a fully connected network, like the digit network we saw: flatten the image, then two dense layers.",
  "(draft) Then a CNN: convolution and pooling, twice, and then dense layers. Everything we built up today, in a few lines of code.",
  "(draft) And compare the two on test digits they never saw. Which does better, and why?",
  "(draft) The Colab link is on the course site, under Day 4. The lab is adapted from MIT's Introduction to Deep Learning course."
]});

st(`
  <h1 class="t">Homework</h1>
  <ul class="frag">
    <li class="b">Finish the lab</li>
    <li class="b">Read: Konkle &amp; Alvarez (2022), <i>A self-supervised domain-general learning framework for human ventral stream representation</i></li>
    <li class="b">Response paper on it, by hand, at the start of next class</li>
  </ul>
  ${cite('Konkle, T. &amp; Alvarez, G. A. (2022). Nature Communications 13, 491. doi:10.1038/s41467-022-28091-4')}
`, { notes: [
  "(draft) For next time.",
  "(draft) Finish the lab.",
  "(draft) Read Konkle and Alvarez, 2022. They train a network without any category labels: it only learns to recognize different views of the same image as the same. They ask whether category information still emerges, and how well its features match responses along the human ventral stream.",
  "(draft) You will write a short response on it by hand at the start of next class."
]});
}
