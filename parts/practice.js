/* PART: practice (Day 1). After the perception theories, open the checker-shadow image as numbers. */
{
section('Practice');

st(`
  <h1 class="t">Practice</h1>
  <div class="lead b" data-step="1">Images as arrays</div>
  <div class="label b" data-step="1">File → Save a copy in Drive. Work in that copy.</div>
  <ul class="frag">
    <li class="b" data-step="2">The checker-shadow image, as numbers</li>
    <li class="b" data-step="3">Slices and arithmetic</li>
  </ul>
  <div class="practice-site b" data-step="1"><a href="https://delamarifer.github.io/human-machine-perception/">delamarifer.github.io/human-machine-perception</a></div>
  <style>
    .practice-site{ font-size:clamp(1.2rem, 2.1vw, 1.7rem); margin-top:1vh; }
    .practice-site a{ color:inherit; }
  </style>
  ${cite('<a href="https://colab.research.google.com/github/delamarifer/human-machine-perception/blob/main/notebooks/day01-practice-numpy-images.ipynb">Images as arrays, in Colab</a>')}
`, { notes: [
  "(draft) Practice. The perception story is enough to start. The same checker shadow is now a grid of numbers.",
  "(draft) Images as arrays. The course page address is on the slide: delamarifer.github.io/human-machine-perception. They open the notebook in Colab, then File, Save a copy in Drive, and work in that copy.",
  "(draft) The picture from the illusion. They will read pixels, including squares A and B, which are the same gray.",
  "(draft) Slices, channels, brightness, contrast. Do not teach it from the front. Walk the room. Then we come back to what a computer does with pictures."
]});
}
