/* PART: convolution (Day 3). Owner: to decide (see README.md). Plan: "Convolution mathematically", 20 min.
   Slides: slide-multiply-add (scene) · the formula, correlation vs convolution · why: linear + shift-invariant · Fourier (to decide) */
{
section('Convolution');

sc('conv', 'scenes/convolution.html');

st(`
  <h1 class="t">Convolution, mathematically</h1>
  <div style="margin:auto 0;display:flex;flex-direction:column;gap:5vh">
    <div class="b" data-step="1"><div class="label">Correlation: what we just did</div>
      <div class="statement">g[m, n] = Σ<sub>k</sub> Σ<sub>l</sub> h[k, l] · f[m + k, n + l]</div></div>
    <div class="b" data-step="2"><div class="label">Convolution: flip the kernel first</div>
      <div class="statement">g[m, n] = Σ<sub>k</sub> Σ<sub>l</sub> h[k, l] · f[m − k, n − l]</div></div>
    <div class="b" data-step="3"><div class="statement">g = f ∗ h</div></div>
  </div>
`, { notes: [
  "(draft) Now let's write down what we just did.",
  "(draft) For every output position m, n, we lay the kernel h over the image f, multiply each kernel weight with the pixel under it, and add everything up. The indices k and l run over the kernel, here from minus one to one. Strictly, this is called correlation.",
  "(draft) Convolution is the same thing with the kernel flipped: minus k and minus l instead of plus. For a symmetric kernel, like a blur, the two are identical. Most deep learning libraries actually compute correlation and still call it convolution, so do not be surprised when you see that.",
  "(draft) We write convolution with a star: g equals f convolved with h."
]});

st(`
  <h1 class="t">Why convolution?</h1>
  <ul class="frag" style="margin:auto 0">
    <li class="b"><b>Linear:</b> filter(a f₁ + b f₂) = a filter(f₁) + b filter(f₂)</li>
    <li class="b"><b>Shift-invariant:</b> shift the input, the output shifts the same way</li>
    <li class="b"><b>Linear + shift-invariant</b> = a convolution with some kernel</li>
  </ul>
`, { notes: [
  "(draft) Why this operation and not some other one?",
  "(draft) First, it is linear. Filtering a sum of two images gives the sum of the filtered images, and scaling the input scales the output.",
  "(draft) Second, it is shift-invariant. The same kernel is applied everywhere, so if you move something in the image, its filtered version moves with it and does not change. A cat in the corner gets the same treatment as a cat in the middle.",
  "(draft) And the important fact: any operation that is both linear and shift-invariant can be written as a convolution with some kernel. So the kernel completely describes the filter. To understand a filter, look at its kernel."
]});

st(`
  <h1 class="t">Another view: frequencies</h1>
  <div class="todo b" style="margin:auto 0">Fourier transform: convolution in space = multiplication in frequency. Keep it for today, or move it to the problem set? (brainstorm: "image processing, filtering, Fourier"; coding practice lists the Fourier transform)</div>
`, { notes: [
  "(to write) Fourier view of filtering, if it stays in this lecture.",
  "(to write)"
]});
}
