/* PART: low-pass. Outline slides 10-14 (25 min). Follows MIT Vision Book Ch. 17 (Blur Filters):
   box, Gaussian, binomial; then noise and smoothing before reading text. */
{
section('III. Low-pass');

st(`
  <h1 class="t">What is a low-pass filter?</h1>
  ${im('freq-pipeline.png', 'Fourier transform, multiply by the filter’s frequency response, transform back', {step: 1, style: 'flex:0 0 auto;height:27vh'})}
  ${cols(
    grid(2, [
      im('crop-freq-low.jpg', 'what passes: <var>H</var> · F(<var>I</var>)'),
      im('crop-freq-high.jpg', 'what is removed: (1 − <var>H</var>) · F(<var>I</var>)'),
    ], {step: 2}),
    `${card('Low-pass', '<var>H</var> ≈ 1 near zero frequency: slow changes pass. <var>H</var> → 0 at high frequency: texture, detail, noise are attenuated. Smoothing removes detail <i>because</i> detail is high frequency.', 2)}
     ${card('DC gain = Σ <var>K</var> = 1', 'The weights sum to one, so a flat region keeps its brightness and the mean of the image is unchanged.', 3)}`,
    {ratio: '1.3fr 1fr'})}
  ${refs('ch16', 'ch17')}
`, { notes: [
  "(draft) Problem: we want to remove fine detail and noise while keeping the large-scale structure. Chapter 17 calls the filters that do this blur filters, or low-pass filters.",
  "(draft) Walk the pipeline left to right. The gray photo; its spectrum; the frequency response of a Gaussian with sigma 4, which is itself a Gaussian, bright in the center and dark outside; the product, where only the center of the spectrum survives; and the inverse transform, a blurred photo. This is the visual explanation of what a frequency response does: it is a mask over the spectrum. In practice we convolve in space instead; the result is the same, by the convolution theorem.",
  "(draft) Split the image by that mask. Left, what passes: the hut colors, sand, sky. Right, what the filter removed, which is one minus H applied to the spectrum: every outline, the people, the ripples on the sand. Ask: which of the two would you rather have, to recognize that these are beach huts? Most say the left. Which would you need to count people? The right. Low-pass is a choice about which information you need.",
  "(draft) One property to remember: the DC gain, the sum of the kernel weights, which is H at frequency zero. For a blur we want it to be exactly 1, so that a flat region stays the same brightness. The book normalizes every blur kernel this way: the box by its size, the binomial by 2 to the n, the sampled Gaussian by the sum of its samples."
]});

st(`
  <h1 class="t">Box and averaging filters</h1>
  ${cols(
    `<div class="lf-row b" data-step="1">${ker([[1, 1, 1], [1, 1, 1], [1, 1, 1]], {scale: '1/9 ×'})}
       ${eq(`<var>I</var>′(<var>x</var>, <var>y</var>) = <sup>1</sup>⁄<sub>9</sub> Σ<sub><var>i</var>=−1</sub><sup>1</sup> Σ<sub><var>j</var>=−1</sub><sup>1</sup> <var>I</var>(<var>x</var> − <var>i</var>, <var>y</var> − <var>j</var>)
         <span class="why">Every neighbor counts the same. Independent noise averages out: 9 samples cut its standard deviation by 3.</span>`, null, {style: 'flex:1 1 0'})}</div>
     ${card('Advantages', 'The simplest blur. Separable. With an integral image every box size costs the same (Viola–Jones face detection).', 3)}
     ${card('Limitations', 'The frequency response is not monotonic: some high frequencies come back with their <b>contrast flipped</b>. Box ∗ box is a triangle, not a box. Blocky, square blur.', 4)}`,
    `${grid(2, [im('crop-box3.jpg', '3 × 3 box'), im('crop-box9.jpg', '9 × 9 box')], {step: 2})}
     ${grid(2, [im('zone.png', 'zone plate: frequency grows outward'), im('zone-box.png', '7 × 7 box: rings return, flipped')], {step: 4})}`)}
  ${refs('ch17', 'viola')}
`, { notes: [
  "(draft) Problem: the simplest way to remove noise is to average. Section 17.2 of the book starts here.",
  "(draft) The 3 by 3 box: nine weights of one ninth. Read the equation: the output is the mean of the nine pixels around x, y. Why does averaging smooth? Neighboring pixels in the scene are usually similar, while the noise is independent from pixel to pixel. Averaging nine independent noise values divides the noise standard deviation by three, while a flat patch of wall stays the same.",
  "(draft) On the photo. At 3 by 3 the change is small; look at the ripples on the sand. At 9 by 9 the people dissolve and the hut edges spread over about nine pixels. A bigger box averages more neighbors, so it removes lower frequencies too.",
  "(draft) Why people still use it: it is the cheapest blur. Separable, so a row pass and a column pass. With an integral image, a table of running sums, the sum over any rectangle costs four lookups regardless of its size. Viola and Jones built real-time face detection on exactly this.",
  "(draft) The limitations, and this is the important part of the slide. The zone plate on the left has frequency increasing with distance from the center. After a Gaussian, the outer rings would just fade to gray. After the 7 by 7 box they fade, then come back, with black and white swapped. The box's frequency response goes negative and then positive again, so some high frequencies pass with flipped sign. The book's example: the box [1, 1, 1] leaves the alternating signal 1, −1, 1, −1 unchanged except for its sign and scale. A blur that lets some fine detail through, inverted, creates artifacts. Also: two boxes in a row give a triangle, so repeated box blurs are not a bigger box. The next filter fixes both problems."
]});

st(`
  <h1 class="t">Gaussian filters</h1>
  ${cols(
    `${eq(`<var>g</var>(<var>x</var>, <var>y</var>; σ) = <sup>1</sup>⁄<sub>2πσ²</sub> exp(−(<var>x</var>² + <var>y</var>²) / 2σ²)
       <span class="why">Weights fall smoothly with distance: near pixels count more than far ones. σ sets the reach. Truncate at about 3σ, so the kernel is about 6σ + 1 wide, and normalize the samples to sum to 1.</span>`, 1)}
     ${im('gauss-kernels.png', 'larger σ: wider and flatter', {step: 1})}
     ${card('Why it is everywhere', 'Its Fourier transform is a Gaussian: a smooth low-pass with no ripples, narrower as σ grows. Separable. Rotationally symmetric. Two blurs make one: σ₃² = σ₁² + σ₂² (pyramids, scale space).', 3)}`,
    grid(2, [
      im('crop-s1.jpg', 'σ = 1'), im('crop-s2.jpg', 'σ = 2'),
      im('crop-s4.jpg', 'σ = 4'), im('crop-s8.jpg', 'σ = 8'),
    ], {step: 2}))}
  ${refs('ch17', 'koend84')}
`, { notes: [
  "(draft) Problem: we want a blur without the box's artifacts, with a single knob for how much detail to remove. Section 17.3.",
  "(draft) The Gaussian. Read it: the weight depends only on the distance from the center, squared, divided by two sigma squared, inside an exponential. At the center the weight is largest; at one sigma it has dropped to about 60 percent; at three sigma to about 1 percent, so we cut it there. The front factor makes it integrate to one; for the sampled kernel we instead divide by the sum of the samples, so the DC gain is exactly 1. Sigma is the blur radius: the plot shows sigma 2, 4 and 8, with kernel widths 13, 25 and 49.",
  "(draft) On the photo. Sigma 1: the noise and the finest ripples are gone, the people still there. Sigma 2: the poles are gone. Sigma 4: the people are gone. Sigma 8: coarse layout only. Unlike the box there are no square artifacts: the blur is round and smooth. Ask: if you want to detect people in this image, what is the largest sigma you can afford? About 2: a person here is roughly 10 pixels tall.",
  "(draft) Why the Gaussian is the default. First, its Fourier transform is another Gaussian, exp of minus omega squared sigma squared over two: monotonic, no negative lobes, so no contrast flips, and the wider the kernel the narrower the passband. Second, it is separable, and it is the only rotationally symmetric kernel that is separable. Third, blurring twice with sigma 1 and sigma 2 equals blurring once with the square root of 1 plus 4: variances add. That is what makes pyramids and scale space consistent, and Koenderink showed that the Gaussian is the natural kernel for generating a scale space. One caveat from the book: these properties are exact only for the continuous Gaussian; the sampled one approximates them."
]});

st(`
  <h1 class="t">Other low-pass filters and comparisons</h1>
  ${cols(
    `${card('Binomial filters', 'Convolve [1, 1] with itself again and again: the rows of Pascal’s triangle. Integer weights, variance <var>n</var>/4, and <var>b</var><sub><var>n</var></sub> ∗ <var>b</var><sub><var>m</var></sub> = <var>b</var><sub><var>n</var>+<var>m</var></sub> exactly.', 1)}
     ${eq(`<var>b</var><sub>2</sub> = [1 2 1] / 4 &nbsp;&nbsp; <var>b</var><sub>4</sub> = [1 4 6 4 1] / 16`, 1)}
     <div class="lf-row b" data-step="1">${ker([[1, 2, 1], [2, 4, 2], [1, 2, 1]], {scale: '1/16 ×'})}
       <div class="label" style="flex:1 1 0"><var>b</var><sub>2,2</sub>: the 3 × 3 the book says to keep close to you</div></div>
     ${card('Reading the plots', '<b>Box</b>: cheap, but ripples and sign flips. <b>Sampled Gaussian</b>: smooth, but not exactly zero at the highest frequency. <b>Binomial</b>: smooth, and exactly zero at [1, −1, 1, −1 …].', 3)}`,
    im('lowpass-compare.png', 'three 5-tap blurs: weights, and gain at each frequency', {step: 2}),
    {ratio: '1fr 1.3fr'})}
  ${refs('ch17')}
`, { notes: [
  "(draft) Problem: a sampled Gaussian is only approximately Gaussian, and it is made of real numbers. Is there a discrete filter with the good properties built in? Section 17.4: binomial filters.",
  "(draft) Start with the two-tap box, [1, 1]. Convolve it with itself: [1, 2, 1]. Again: [1, 3, 3, 1]. Again: [1, 4, 6, 4, 1]. These are the rows of Pascal's triangle, and by the central limit theorem they approach a Gaussian. Divide by 2 to the n so they sum to one. Their variance is n over 4, and convolving two binomials gives another binomial exactly, which the sampled Gaussian only does approximately. In 2D, the outer product of [1, 2, 1] with itself gives the 3 by 3 kernel 1, 2, 1, 2, 4, 2, 1, 2, 1 over 16.",
  "(draft) The comparison. On the left, three 5-tap kernels with similar width: the box is flat; the binomial and the sampled Gaussian with sigma 1 are almost the same shape. On the right, their frequency responses. The box drops fastest, but crosses zero and goes negative: the sign flip from the zone plate. The Gaussian is smooth but still passes a little at 0.5 cycles per pixel, the fastest possible pattern. The binomial is smooth and reaches exactly zero there.",
  "(draft) Summary of the three. Box: fastest to compute, worst frequency behavior. Gaussian: exact control of sigma, smooth response, but only approximately zero at the top frequency after sampling. Binomial: integer weights, exact composition, and it completely cancels the 1, −1 pattern, which matters for downsampling by 2. That is why image pyramids use the binomial, often [1, 4, 6, 4, 1] over 16. Next slide: what these differences look like on the photo."
]});

st(`
  <h1 class="t">Other low-pass filters and comparisons</h1>
  <div class="lf-sub">The same photograph</div>
  ${grid(2, [
    im('crop-box9.jpg', '9 × 9 box'),
    im('crop-gauss-match9.jpg', 'Gaussian with the same variance (σ ≈ 2.6)'),
  ], {step: 1})}
  ${grid(3, [
    im('crop-checker.png', 'checkerboard noise added (zoomed 4×)', {px: true}),
    im('crop-checker-box.png', '3 × 3 box: the pattern survives', {px: true}),
    im('crop-checker-binom.png', '<var>b</var><sub>2,2</sub> binomial: the pattern is gone', {px: true}),
  ], {step: 2})}
  ${card(null, 'Need a precise σ: <b>Gaussian</b>. Downsampling by 2: <b>binomial</b>. Speed above all, artifacts acceptable: <b>box</b>.', 3)}
  ${refs('ch17')}
`, { notes: [
  "(draft) Now the same comparison on the Muizenberg photo.",
  "(draft) A 9 by 9 box and a Gaussian with the same variance, so the same amount of blur in the statistical sense. Look at the roof lines and the people. The box blur looks square and slightly streaky; small bright objects become little squares. The Gaussian blur is round and smooth. That is the box's rippling frequency response, seen in the spatial domain. Box versus Gaussian is a direct comparison the brief asked for: same blur, different artifacts.",
  "(draft) The book's Figure 17.8, on our photo. I added a checkerboard, plus and minus 0.2 alternating every pixel: the highest frequency the grid can hold. Zoomed four times so you can see single pixels. A 3 by 3 box reduces it but leaves a faint checkerboard, most visible in the sky: its 1D gain at that frequency is minus one third, so in 2D it is one ninth, not zero. The 3 by 3 binomial removes it completely, because its response at the highest frequency is exactly zero. Both blur the huts by a similar amount.",
  "(draft) Practical rule. If you need a particular scale, use a Gaussian with that sigma. If you are halving the resolution, use a binomial. If you need the fastest possible blur and can accept artifacts, for example a large box via an integral image, use the box. Next: what we use these blurs for."
]});

st(`
  <h1 class="t">Applications of low-pass filtering</h1>
  <div class="lf-sub">Real world: reading text</div>
  ${grid(4, [
    card('Number plates', 'Dirt, bugs, scratches and night grain. A plate reader must still read 7XYZ89.', 1, {style: 'align-self:center'}),
    im('plate-raw.png', 'a plate at night (simulated)', {step: 1, px: true}),
    im('plate-bin.png', 'threshold: specks become ink', {step: 1, px: true}),
    im('plate-blur-bin.png', 'Gaussian σ = 1.4, then threshold', {step: 1, px: true}),
    card('Document scanner', 'Paper texture and fibers. The app keeps only the dark text for OCR.', 2, {style: 'align-self:center'}),
    im('receipt-raw.png', 'a phone scan of a receipt (simulated)', {step: 2, px: true}),
    im('receipt-bin.png', 'threshold: fibers become ink', {step: 2, px: true}),
    im('receipt-blur-bin.png', 'Gaussian σ = 0.7, then threshold', {step: 2, px: true}),
  ], {style: 'grid-template-columns:.8fr 1fr 1fr 1fr;row-gap:2.4vh'})}
  ${card('Why it works, and its limit', 'The clutter is smaller than a letter stroke: higher frequency than the text. A small blur removes it and the letters survive. Keep σ below the stroke width, or the holes in 0, 6 and 8 fill in.', 3, {cls: 'key'})}
  ${refs('ch17')}
`, { notes: [
  "(draft) Two everyday systems that read text from noisy images. Both use the same first step: a small low-pass filter, then a threshold that turns the image into black and white for the text reader, the OCR.",
  "(draft) Number plates. A plate reader at a parking garage or a speed camera, at night. The plate is covered in dirt, bugs and road salt, it has scratches, and the sensor adds grain because it is dark. Middle: threshold the raw image, every pixel darker than a cutoff becomes ink. The specks and the grain become ink too, scattered over the plate and stuck to the letters; a character reader sees broken, noisy shapes. Right: a Gaussian with sigma 1.4 first, then the same kind of threshold. The specks are gone and 7XYZ89 is clean. Simulated plate, not a real one.",
  "(draft) Document scanner. When you scan a receipt with your phone, the camera also picks up the texture of the paper and its tiny fibers. Thresholding the raw scan turns the fibers into little strokes all over the page, and some touch the letters. A Gaussian with sigma 0.7 first: the paper texture is gone and the text is crisp. Real scanner apps also correct for uneven lighting with an adaptive threshold, which is itself a low-pass idea: compare each pixel to a blurred version of its neighborhood.",
  "(draft) Why it works: the clutter is smaller than a letter stroke, so it lives at higher spatial frequencies than the text, and a low-pass filter can separate them. The limit is the classic low-pass trade-off: noise and fine detail are both high frequency. If sigma approaches the stroke width, the text is blurred too, and the holes in 0, 6 and 8 fill in, so the reader confuses them. On the plate, an 8-pixel-wide stroke allows sigma 1.4; on the small receipt text, only 0.7."
]});
}
