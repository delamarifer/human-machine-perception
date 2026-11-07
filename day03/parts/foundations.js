/* PART: foundations. Outline slides 5-9 (20 min).
   Image as a signal, neighborhoods, linearity, convolution (scene + equation),
   then why a filter is a gain per frequency.
   Notation follows the brief: I input, K kernel, I′ output. The MIT Vision Book writes ℓ and h. */
{
section('II. Foundations');

st(`
  <h1 class="t">An image as a spatial signal</h1>
  ${cols(
    `${im('rows-on-photo.jpg', 'three rows of the gray photo', {step: 1})}
     ${eq(`<var>I</var>(<var>x</var>, <var>y</var>) = brightness at column <var>x</var>, row <var>y</var>
       <span class="why">A grayscale image is a function of two variables, sampled on a grid: one number per pixel, here 0 to 255.</span>`, 1)}`,
    `${im('rows-profiles.png', 'the same rows, read as signals', {step: 2})}
     ${card('Spatial frequency', 'How fast intensity changes as you move across the image. Sky: slow, a <b>low</b> frequency. Water: fast, a <b>high</b> frequency. A hut wall: a sudden jump, which needs many frequencies at once.', 3)}`)}
  ${refs('ch15', 'ch16')}
`, { notes: [
  "(draft) Problem: to say what a filter keeps and removes, we need a precise description of what is in an image. Today an image is a signal: a function of position.",
  "(draft) Convert the photo to gray. I of x, y is the brightness at column x and row y. It is sampled on a grid, so in practice it is a matrix, 768 rows by 1024 columns. Color is three such functions; most of today works per channel, so gray is enough. I have drawn three rows: one through the sky, one through the huts, one through the water.",
  "(draft) Read each row as a 1D signal. The blue sky row barely moves: a slow drift. The green hut row is flat over the water and sand, then jumps up and down at every hut wall. The purple water row oscillates quickly, with no single big jump. Same photo, three different kinds of signal.",
  "(draft) That difference has a name: spatial frequency. The sky row is slow, a low frequency. The water row is fast, a high frequency. The hut wall is a sudden jump. Name it here and move on; the gratings and cycles per pixel were covered earlier."
]});

st(`
  <h1 class="t">From individual pixels to neighborhoods</h1>
  ${cols(
    im('zoom-loc.jpg', 'where we zoom: the edge of a hut', {step: 1}),
    `${im('neighborhood.png', 'gray values, 0 to 255, around one pixel', {step: 2, px: true})}
     ${card('One pixel is ambiguous', 'Is 158 noise, a bright wall, or part of an edge? Only its neighbors can tell. A <b>local operation</b> computes the new center value from a small window (amber).', 3)}
     <div class="lf-row b" data-step="4">${ker([[1, 1, 1], [1, 1, 1], [1, 1, 1]], {scale: '1/9 ×'})}
       <div class="label" style="flex:1 1 0">A <b>kernel</b> is a table of weights: how much each neighbor contributes to the new value. This one averages.</div></div>`,
    {ratio: '1.25fr 1fr'})}
  ${refs('ch15')}
`, { notes: [
  "(draft) Problem: one pixel alone is not enough to decide anything. Let us zoom into the photo to see why.",
  "(draft) The amber box is on the left wall of the yellow hut: a dark strip of trim, then the bright wall.",
  "(draft) Here are the actual numbers. The left three columns are 4 to 20, dark. The right three are 200 and above, bright. The column in between is around 150. Every number on this grid is from the photo; the convolution animation on the next slide uses the same numbers.",
  "(draft) Point at the center, 158. On its own, that number could be noise, a mid-gray surface, or the middle of an edge. Looking at its neighbors answers the question: dark on the left, bright on the right, so it sits on an edge. That is why every filter today is a local operation: a new value computed from a small window around each pixel. The retina makes the same move; we will see that a ganglion cell pools a patch of photoreceptors, not one.",
  "(draft) The rule is a kernel: a small table of weights, one per neighbor. This one gives every neighbor one ninth, so the new value is the average of the window. Change the weights and you change what the filter computes. That is the next slide."
]});

st(`
  <h1 class="t">What is a linear filter?</h1>
  <div class="lf-row" style="gap:1.6vw;align-items:stretch">
    ${eq(`new pixel = Σ (weight × neighbor)
      <span class="why">The same weights at every position. Different weight patterns give different transformations.</span>`, 1, {style: 'flex:1 1 0'})}
    ${eq(`<var>F</var>(<var>a</var> <var>I</var><sub>1</sub> + <var>b</var> <var>I</var><sub>2</sub>) = <var>a</var> <var>F</var>(<var>I</var><sub>1</sub>) + <var>b</var> <var>F</var>(<var>I</var><sub>2</sub>)
      <span class="why"><b>Linear</b>: scaling and adding inputs scales and adds outputs. <b>Shift-invariant</b>: shift the input, the output shifts. Together they make the filter a convolution.</span>`, 2, {style: 'flex:1.3 1 0'})}
  </div>
  <div class="lf-grid b" data-step="3" style="grid-template-columns:repeat(4,minmax(0,1fr));grid-template-rows:auto auto;align-content:center">
    <div style="justify-self:center">${ker([[0, 0, 0], [0, 1, 0], [0, 0, 0]])}</div>
    <div style="justify-self:center">${ker([[1, 1, 1], [1, 1, 1], [1, 1, 1]], {scale: '1/9 ×'})}</div>
    <div style="justify-self:center">${ker([[0, -1, 0], [-1, 5, -1], [0, -1, 0]])}</div>
    <div style="justify-self:center">${ker([[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]])}</div>
    ${im('crop-color.jpg', '<b>identity</b>: unchanged')}
    ${im('crop-box3.jpg', '<b>box</b>: average, slight blur')}
    ${im('crop-kernel-sharpen.jpg', '<b>sharpen</b>: center minus neighbors')}
    ${im('crop-kernel-sobel.jpg', '<b>Sobel x</b>: right minus left')}
  </div>
  ${refs('ch15')}
`, { notes: [
  "(draft) Problem: we want one framework that covers blur, sharpening, and edges. The framework is the linear filter.",
  "(draft) Intuition first: the new pixel is a weighted sum of its neighbors. The weights are the kernel, and the same kernel is used at every position in the image.",
  "(draft) Two properties make this a linear, shift-invariant filter. Linear: if you double the brightness of the input, the output doubles; if you add two images and filter, you get the sum of the two filtered images. Shift-invariant: the filter treats every location the same, so moving the input moves the output. Any operation with both properties can be written as a convolution, which is what the next slide shows. Linearity is also what lets us think in frequencies: each frequency can be treated separately and the results added back together. Ask: is a median filter linear? No, the median of a sum is not the sum of the medians.",
  "(draft) Same mechanism, four weight patterns. Identity: a single 1 in the center, nothing changes. Box: equal weights, a mild blur at 3 by 3. Sharpen: 5 in the center minus the four neighbors; on a flat region the output equals the input, at an edge it overshoots. Sobel x: minus on the left, plus on the right; zero on flat regions, large where brightness increases to the right. Note the kernels sum to 1, 1, 1 and 0. The sum is the DC gain: what happens to a flat region. Smoothing and sharpening keep the mean; derivatives remove it."
]});

sc('conv', 'scenes/convolution-part2.html', {title: 'Convolution: applying a kernel to an image'});

st(`
  <h1 class="t">Convolution: applying a kernel to an image</h1>
  ${cols(
    `${eq(`<var>I</var>′(<var>x</var>, <var>y</var>) = Σ<sub><var>i</var></sub> Σ<sub><var>j</var></sub> <var>K</var>(<var>i</var>, <var>j</var>) · <var>I</var>(<var>x</var> − <var>i</var>, <var>y</var> − <var>j</var>)
      <table>
        <tr><td><var>I</var>′(<var>x</var>, <var>y</var>)</td><td>the output pixel at column <var>x</var>, row <var>y</var></td></tr>
        <tr><td><var>K</var>(<var>i</var>, <var>j</var>)</td><td>the weight at offset (<var>i</var>, <var>j</var>) from the center; <var>i</var>, <var>j</var> ∈ {−1, 0, 1} for a 3 × 3</td></tr>
        <tr><td><var>I</var>(<var>x</var> − <var>i</var>, <var>y</var> − <var>j</var>)</td><td>the input pixel at that offset. The minus signs flip the kernel.</td></tr>
        <tr><td>Σ<sub><var>i</var></sub> Σ<sub><var>j</var></sub></td><td>add all the weighted neighbors: one number out</td></tr>
      </table>`, 1)}
     ${card('Convolution or correlation?', 'With <var>I</var>(<var>x</var> + <var>i</var>, <var>y</var> + <var>j</var>) it is <b>correlation</b>: no flip. Identical for symmetric kernels (box, Gaussian); the sign flips for derivatives. PyTorch’s <code>Conv2d</code> computes correlation.', 2)}
     <div class="lf-row b" data-step="2" style="justify-content:center;flex-wrap:nowrap">
       ${ker([[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]], {cap: 'Sobel <var>x</var>, as written'})}
       <span class="lf-op">→</span>
       ${ker([[1, 0, -1], [2, 0, -2], [1, 0, -1]], {cap: 'what convolution applies'})}
     </div>`,
    `${eq(`<var>N</var>′ = ⌊(<var>N</var> + 2<var>P</var> − <var>K</var>) / <var>S</var>⌋ + 1
       <span class="why"><b>Output size.</b> Width <var>N</var> = 1024, kernel <var>K</var> = 3: no padding gives 1022; padding <var>P</var> = 1 gives 1024; stride <var>S</var> = 2 gives 512.</span>`, 3)}
     ${grid(3, [
       im('pad-zero.jpg', 'pad with <b>zeros</b>'),
       im('pad-replicate.jpg', '<b>copy</b> the edge'),
       im('pad-mirror.jpg', '<b>mirror</b> (the book)'),
     ], {step: 4})}
     ${card('Cost', '<var>K</var>² multiplications per pixel. A <b>separable</b> kernel (box, Gaussian, Sobel) is a row pass then a column pass: 2<var>K</var>.', 5)}`,
    {cls: 'roomy'})}
  ${refs('ch15')}
`, { sub: true, notes: [
  "(draft) Now the equation, after the animation, so every symbol already has a picture.",
  "(draft) Read it term by term. I prime of x, y is the output pixel. K of i, j is the weight at offset i, j from the center; for a 3 by 3 kernel, i and j run from minus 1 to 1. I of x minus i, y minus j is the input pixel at that offset. The double sum adds the nine products. The minus signs mean the kernel is flipped by 180 degrees before it is placed on the image. Why flip? With the flip, convolution is commutative and associative, so filtering with K1 then K2 equals filtering once with K1 convolved with K2, and the convolution theorem holds in its clean form. Those properties are what make separable filters and frequency analysis work.",
  "(draft) Without the flip, with plus signs, the operation is correlation: slide the kernel as written and take the dot product. For symmetric kernels, like the box and the Gaussian, the two are identical. For a derivative kernel the sign of the output flips. Deep learning libraries implement correlation and call it convolution; because the kernels are learned, the flip does not matter there. In the scene I drew the weights as they land on the pixels, which is the correlation view. Below: Sobel x as written, and rotated by 180 degrees, which is what convolution actually multiplies the pixels by. Left and right swap, so the sign of the output flips.",
  "(draft) Output size. At the edge of the photo the kernel hangs off the image. Either you shrink the output (valid convolution: 1024 minus 3 plus 1 is 1022), or you pad. Stride S skips positions: stride 2 halves the size, which is downsampling, and without blurring first it aliases. The formula N prime equals floor of N plus 2P minus K over S, plus 1, is the same one you use for CNN layers.",
  "(draft) What you pad with matters. All three are the whole photo with the same wide Gaussian blur, sigma 20; only the padding differs. Zero padding pulls black in from outside the photo, so the border goes dark, and a derivative would report that as a fake edge all around the frame. Copying the edge pixel or mirroring the image keeps the border looking like the image; the book uses mirror boundaries, and so does every figure in this lecture.",
  "(draft) Cost. A K by K kernel costs K squared multiplications per pixel. If the kernel is an outer product of a column and a row, which is called separable, you can filter the rows with the 1D kernel and then the columns: 2K. For a Gaussian with sigma 8, about 49 taps wide, that is 98 instead of 2401 per pixel. The box, Gaussian, binomial and Sobel kernels are all separable."
]});

st(`
  <h1 class="t">Why think in terms of spatial frequency?</h1>
  <div class="lf-grid b" data-step="1" style="grid-template-columns:1fr auto 1fr auto 1fr;grid-template-rows:minmax(0,1fr)">
    ${im('crop-low.jpg', 'low frequencies (blur, σ = 4)')}<div class="lf-op">+</div>
    ${im('crop-high.jpg', 'high frequencies (original − blur)')}<div class="lf-op">=</div>
    ${im('crop-color.jpg', 'the photo')}
  </div>
  ${card('Images are sums of gratings', 'Each grating has a frequency, an orientation, and a weight. A linear filter cannot mix them. It only scales each one.', 1)}
  ${cols(
    im('spectrum.jpg', 'the photo’s spectrum, log |F(I)|', {step: 2}),
    `${card('Reading a spectrum', 'Center: low frequencies. Outward: higher. Each point is one grating. The streaks through the center come from long straight edges: the horizon and the hut walls.', 2)}
     ${eq(`F(<var>K</var> ∗ <var>I</var>) = F(<var>K</var>) · F(<var>I</var>)
       <span class="why"><b>Convolution theorem.</b> In frequency, filtering is multiplication: <var>H</var>(<var>u</var>, <var>v</var>) = F(<var>K</var>) is a gain for each frequency. A filter selectively preserves, attenuates or emphasizes frequencies.</span>`, 3)}`,
    {ratio: '0.7fr 1.3fr', style: 'flex:0 0 auto;height:30vh'})}
  ${refs('ch16', 'cr68')}
`, { notes: [
  "(draft) Frequency is useful because a linear filter cannot mix those gratings. It can only scale each one. Two views of that: a split of the photo, and its spectrum.",
  "(draft) Split the photo into two images that add back up exactly. The blurred image holds the low frequencies: the wide gratings, colors and layout. The difference, original minus blur, holds the high frequencies: the narrow gratings, outlines, ripples, people, and noise. Mid-gray means zero. Nothing is lost; the information is just split by scale. Sharpening, which we saw on slide 4, adds a bit more of the right-hand image back. Fourier’s claim is the general version: any image is a weighted sum of gratings, each with its own frequency, orientation, amplitude and phase. Campbell and Robson measured human contrast sensitivity with gratings, which we come back to in Part V.",
  "(draft) The spectrum is the Fourier transform of the photo, on a log scale. The center is frequency zero, the average brightness. Moving outward means higher frequency; direction means orientation. Natural images have most of their energy near the center, falling off roughly as one over frequency. The bright horizontal and vertical streaks come from long straight edges. A vertical hut wall changes along x, so its energy lies along the horizontal axis; the horizon contributes the vertical streak.",
  "(draft) The key equation. The Fourier transform of a convolution is the product of the Fourier transforms. So in the frequency domain a filter is a gain map, H of u, v: it multiplies each grating by a number. If H is near 1 at the center and falls to zero outside, the filter is low-pass. If H is zero at the center and peaks on a ring, it is band-pass. The next part starts by doing this explicitly on the photo."
]});
}
