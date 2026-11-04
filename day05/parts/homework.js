/* PART: homework (Day 5). Owner: to decide (see README.md). Plan: 10 min, homework review.
   The reading assigned for Day 5 (readings.html): Geirhos et al., ICLR 2019, texture vs shape bias. */
{
section('Homework review');

st(`
  <h1 class="t">Homework review: texture or shape?</h1>
  <ul class="frag">
    <li class="b">A cat shape with elephant skin: people say cat, ImageNet CNNs tend to say elephant</li>
    <li class="b">Train on style-transferred images: more shape bias, better accuracy and robustness</li>
    <li class="b"><div class="todo">2 or 3 student questions or answers from the reading</div></li>
  </ul>
  <div class="statement b" style="margin-top:auto">Today: what does a model keep, and what does it throw away?</div>
  ${cite('Geirhos et al., 2019, ICLR')}
`, { notes: [
  "(draft) Let's start with the reading: Geirhos and colleagues, 2019.",
  "(draft) They made cue-conflict images: the shape of one object with the texture of another, like a cat filled with elephant skin. People mostly answer by shape: a cat. ImageNet-trained CNNs mostly answer by texture: an elephant.",
  "(draft) When they trained the same kind of network on Stylized-ImageNet, where style transfer scrambles each image's texture, the network relied more on shape, and it also got more accurate and more robust to distortions.",
  "(draft) (to write once we read your answers) A few of your questions.",
  "(draft) The reading asks what a model actually uses. Today we get tools to look inside a model and see what its representation keeps and what it throws away."
]});
}
