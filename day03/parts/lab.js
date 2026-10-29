/* PART: lab (Day 3). Owner: to decide (see README.md). Plan: "Implement 2D convolution from scratch
   in NumPy", 45 min. Brainstorm: "Lab: convolution from scratch, edges, hybrid image from your own photos". */
{
section('Lab');

st(`
  <h1 class="t">Lab: convolution from scratch</h1>
  <div class="flow" style="margin:auto 0">
    <div class="step b" data-step="1"><b>conv2d</b><span class="label">two loops in NumPy</span></div>
    <div class="arrow b" data-step="2">→</div>
    <div class="step b" data-step="2"><b>Padding, stride</b><span class="label">control the output size</span></div>
    <div class="arrow b" data-step="3">→</div>
    <div class="step b" data-step="3"><b>Kernels</b><span class="label">blur, sharpen, edges</span></div>
    <div class="arrow b" data-step="4">→</div>
    <div class="step b" data-step="4"><b>Hybrid image</b><span class="label">optional, your own photos</span></div>
  </div>
  <div class="todo b" data-step="5">Colab link: notebooks/day03-lab-convolution.ipynb (to build)</div>
`, { notes: [
  "(draft) Now it's your turn. In the lab you write convolution yourself.",
  "(draft) First, a function conv2d that takes an image and a kernel and returns the filtered image, using plain loops in NumPy. Check it against the numbers we computed by hand on the slide.",
  "(draft) Then padding and stride: what to do at the border, and how to skip positions to make the output smaller.",
  "(draft) Then you try kernels on a real image: blur, sharpen and edges, and see what each one does.",
  "(draft) If you have time: a hybrid image, made from two of your own photos.",
  "(to write) Where to find the notebook."
]});
}
