/* PART: derivatives. Outline slides 15-21 (30 min). Follows MIT Vision Book Ch. 18 (Image Derivatives):
   discrete derivatives, gradient, Sobel, Laplacian, frequency responses, Gaussian derivatives;
   then the application and limitation tables, then filter banks (Ch. 22).
   Derivative kernels are drawn as the weights that land on the pixels (correlation form): [−1, 0, 1]
   is the book's convolution kernel [1, 0, −1]. Signed outputs: zero is mid-gray. */
{
section('IV. Derivatives');

st(`
  <h1 class="t">From smoothing to detecting change</h1>
  ${cols(
    `${im('crop-row.jpg', 'one row through the huts (green)', {step: 1})}
     ${card('Where intensity changes, something happened', 'A hut wall, the horizon, a person against the sand. The flat sky gives no change at all. A derivative turns each change into a peak.', 3)}
     ${card('Change is not the same as a boundary', 'Shadows, glints on the water, and texture change fast too. A derivative finds change; deciding which change is an object’s edge takes more than one filter.', 4)}`,
    im('row-derivative.png', 'intensity along the row, and its derivative', {step: 2}),
    {ratio: '1fr 1.1fr'})}
  ${refs('ch18')}
`, { notes: [
  "(draft) Problem: low-pass filters keep what varies slowly. Often we want the opposite: where does the image change? Object boundaries, the outline of a person, the horizon. Chapter 18 starts here.",
  "(draft) Take one row through the huts: the green line. It passes through the same hut edge we zoomed into on slide 6.",
  "(draft) Top: the intensity along the row. Long flat stretches inside each wall, and sudden jumps at every wall boundary and door. Bottom: its derivative, how much the intensity changes from one pixel to the next. Flat stretches give zero; every jump gives a spike, positive when going dark to bright, negative when going bright to dark. That is the whole idea of edge detection in one plot: change becomes a peak.",
  "(draft) Why do edges matter? Objects usually differ from their background in brightness, color or texture, so their boundaries tend to coincide with large changes. The book adds that derivatives also give access to some 3D information, for example where surfaces change orientation.",
  "(draft) A warning to carry through this part. Not every change is an object boundary. A shadow edge, a specular glint on the water, the ripples on the sand all produce large derivatives. And some real boundaries have almost no contrast, like the mountain against the sky. A derivative is a measurement of change; deciding which changes are boundaries is a later, harder step."
]});

st(`
  <h1 class="t">First-order derivatives: image gradients</h1>
  ${cols(
    `${eq(`∂<var>I</var>/∂<var>x</var> ≈ [<var>I</var>(<var>x</var> + 1) − <var>I</var>(<var>x</var> − 1)] / 2
       <span class="why">In 1D the derivative is the slope. On a grid we cannot take a limit, so we take a difference: the kernel [−1, 0, 1] / 2 as it lands on the pixels. [−1, 1] works too, but its output sits half a pixel off.</span>`, 1)}
     ${eq(`∇<var>I</var> = [∂<var>I</var>/∂<var>x</var>, ∂<var>I</var>/∂<var>y</var>]
       <table>
         <tr><td>|∇<var>I</var>| = √(<var>I</var><sub><var>x</var></sub>² + <var>I</var><sub><var>y</var></sub>²)</td><td>magnitude: how strong the change is</td></tr>
         <tr><td>θ = atan2(<var>I</var><sub><var>y</var></sub>, <var>I</var><sub><var>x</var></sub>)</td><td>orientation: the direction in which brightness increases, perpendicular to the edge</td></tr>
       </table>`, 2)}`,
    im('gradient-arrows.png', 'the gradient on the hut edge from slide 6: arrows point from the dark trim to the bright wall', {step: 3, px: true}),
    {ratio: '1.25fr 1fr'})}
  ${refs('ch18')}
`, { notes: [
  "(draft) Problem: we need a precise, computable measure of change in two dimensions.",
  "(draft) Start in 1D. The derivative is the slope: the limit of the difference quotient. The image is sampled, so there is no limit to take; we use differences between neighbors. Section 18.2 compares two choices. [−1, 1], the difference of consecutive pixels, is the most local, but its output is shifted by half a pixel because the kernel has no center. The central difference, minus the left neighbor plus the right, over two, is centered. On a constant region both give zero; on a ramp both give the slope. Ask: what does the central difference return for the pattern 1, −1, 1, −1? Zero. It ignores the very highest frequency, which we will see in the frequency plot on slide 19.",
  "(draft) In 2D, take the derivative along x and along y. Together they form the gradient vector. Its magnitude says how strong the change is, regardless of direction. Its orientation, atan2 of I y and I x, says which way brightness increases fastest. The gradient is perpendicular to the edge: on a vertical wall it points horizontally. The book also notes that the derivative along any direction t is a linear combination, cos theta times I x plus sin theta times I y, so two filters are enough to get all directions.",
  "(draft) On the hut edge we zoomed into earlier. Every arrow is the gradient at one pixel. Inside the trim and inside the wall, the arrows are tiny: no change. Along the edge they are long and all point right, from dark to bright, perpendicular to the edge. That vector field is what Sobel computes on the next slide."
]});

st(`
  <h1 class="t">Sobel and gradient filters</h1>
  ${cols(
    `<div class="lf-row b" data-step="1" style="gap:2.2vw;justify-content:center">
       ${ker([[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]], {cap: '<var>S</var><sub><var>x</var></sub>: right minus left'})}
       ${ker([[-1, -2, -1], [0, 0, 0], [1, 2, 1]], {cap: '<var>S</var><sub><var>y</var></sub>: below minus above'})}
     </div>
     ${card('Derivative across, smoothing along', '<var>S</var><sub><var>x</var></sub> = [1 2 1]ᵀ × [−1 0 1]: a central difference along <var>x</var>, the binomial [1 2 1] along <var>y</var>. The smoothing makes it less noisy and more isotropic.', 1)}
     ${card('What it is used for', 'Boundaries and silhouettes; the first stage of Canny; HOG and SIFT are histograms of gradient orientations; shape and texture descriptors.', 4)}`,
    grid(2, [
      im('crop-sobel-x.jpg', '<var>S</var><sub><var>x</var></sub>: vertical edges', {step: 2}),
      im('crop-sobel-y.jpg', '<var>S</var><sub><var>y</var></sub>: horizontal edges', {step: 2}),
      im('crop-grad-mag.jpg', 'magnitude |∇<var>I</var>|', {step: 3}),
      im('crop-grad-ori.jpg', `orientation as hue <img src="${AS}ori-wheel.png" alt="" style="height:1.6em;vertical-align:middle">`, {step: 3}),
    ]),
    {ratio: '1fr 1.35fr'})}
  ${refs('ch18', 'canny', 'hog', 'lowe')}
`, { notes: [
  "(draft) Problem: the simple difference is noisy and treats diagonal edges differently from vertical ones. Sobel (with Feldman) fixes both with a 3 by 3 kernel. Section 18.7.",
  "(draft) Sobel x: a central difference along x, minus one on the left, plus one on the right, repeated in three rows with weights 1, 2, 1. Those weights are the binomial blur from slide 13. So Sobel is a derivative in one direction and a smoothing in the other: separable, cheap, and less sensitive to noise than a plain difference. Sobel y is the same thing rotated. I have drawn the weights as they land on the pixels; the book writes the convolution kernel, which is the same thing flipped.",
  "(draft) The responses on the crop, signed: mid-gray is zero, light is positive, dark is negative. Sobel x lights up the vertical walls and door frames: light where brightness increases to the right, dark where it decreases. The horizontal roof lines and steps are nearly invisible in it. Sobel y is the opposite: roof lines, steps and the horizon, not the walls. The diagonal roofs appear in both, each with half the strength.",
  "(draft) Combine them. The magnitude, square root of the sum of squares, is large at every edge regardless of orientation: the hut outlines, the people, the rocks. The orientation, color-coded with the wheel, says which way each edge faces: walls and roofs get different hues; opposite sides of a hut get opposite colors because the gradient points from dark to bright. Brightness of the color is the magnitude, so flat regions are black.",
  "(draft) Applications: boundary detection, silhouettes, and shape analysis; the gradient is the first stage of Canny's detector; HOG, which powered pedestrian detection before deep learning, is a histogram of these orientations in small cells; SIFT descriptors are the same idea around keypoints. The book notes these simple operators are still used when efficiency matters."
]});

st(`
  <h1 class="t">Second-order derivatives: the Laplacian</h1>
  ${cols(
    `${im('deriv-1d.png', 'a soft edge, its first and second derivatives', {step: 1})}
     <div class="lf-row b" data-step="2" style="gap:1.2vw">
       ${eq(`∇²<var>I</var> = ∂²<var>I</var>/∂<var>x</var>² + ∂²<var>I</var>/∂<var>y</var>²`, null, {style: 'flex:1 1 0'})}
       ${ker([[0, 1, 0], [1, -4, 1], [0, 1, 0]], {cap: 'five-point: [1, −2, 1] in <var>x</var> plus in <var>y</var>'})}
     </div>
     ${card('Gradient or Laplacian?', 'Gradient: a vector, peaks at the edge, gives direction. Laplacian: one number, the same for every orientation, zero on a linear ramp, <b>crosses zero</b> at the edge. Two differentiations: even more noise.', 6)}`,
    grid(2, [
      im('crop-laplacian.jpg', 'five-point Laplacian: noisy', {step: 3}),
      im('crop-log.jpg', 'Laplacian of Gaussian (σ = 2)', {step: 3}),
      im('crop-zero-cross.jpg', 'zero-crossings of the LoG at strong edges', {step: 4}),
      im('crop-sharpen-lap.jpg', 'sharpening: <var>I</var> − ∇²(lightly blurred <var>I</var>)', {step: 5}),
    ]),
    {ratio: '1fr 1.25fr'})}
  ${refs('ch18', 'marr')}
`, { notes: [
  "(draft) Problem: the gradient needs two filters and gives a vector. Is there a single, orientation-independent measure of change? Differentiate twice. Section 18.9.",
  "(draft) 1D first. A soft edge on top. Its first derivative is a bump with its peak at the edge. Its second derivative is positive before the edge, negative after, and crosses zero exactly at the edge. So the first derivative locates edges by its maxima, the second by its zero-crossings. Also: on a linear ramp the first derivative is constant and nonzero, but the second derivative is zero. The second derivative measures curvature, not slope.",
  "(draft) In 2D, the Laplacian is the sum of the second derivatives along x and y. The discrete version, the five-point formula, is [1, −2, 1] along x plus the same along y: minus 4 at the center, plus 1 at the four neighbors. It sums to zero, so flat regions give zero. Because it adds the two second derivatives, it is rotationally invariant, approximately on a grid: one filter, every orientation.",
  "(draft) On the crop. The raw five-point Laplacian: the edges are there, but thin and drowned in pixel-level noise and JPEG texture, because differentiating twice amplifies high frequencies even more. Smooth first with a Gaussian of sigma 2, which is the Laplacian of Gaussian, LoG: now each edge is a clean pair of light and dark bands, with the zero in between.",
  "(draft) Marr and Hildreth proposed edges as the zero-crossings of the LoG. Here are those zero-crossings, kept only where the edge is strong. They form closed contours, which the book lists as a property; but they also wander along weak texture, which is why modern edge detection uses gradient maxima instead. The LoG is still used for blob and keypoint detection, as we see with SIFT.",
  "(draft) Sharpening with the Laplacian. Subtract the Laplacian from the image, here of a lightly blurred copy: at an edge the dark side gets darker and the bright side brighter. This is the sharpening from slide 4, and the 3 by 3 kernel on slide 7: 5 in the center, minus 1 around, is the identity minus the five-point Laplacian. The book's version, Equation 18.7, is twice the identity minus the 3 by 3 binomial: same idea, subtract the blurry part.",
  "(draft) Compare. The gradient gives magnitude and direction and peaks at the edge, with one filter per direction. The Laplacian is one filter and one number, independent of orientation, and zero on smooth ramps, which is useful: a slow illumination gradient across a wall does not register. It localizes edges by zero-crossings, but it is noisier and loses the direction. Next: why both amplify noise, explained in frequency."
]});

st(`
  <h1 class="t">Why are derivatives band-pass filters?</h1>
  ${cols(
    `${im('freq-deriv-a.png', 'gain of derivative kernels at each frequency', {step: 1})}
     ${card('Derivative = multiply by frequency', '∂/∂<var>x</var> in space is × <i>j</i>ω in frequency. Zero frequency → 0: flat regions vanish. The gain grows with frequency, so a raw derivative is <b>high-pass</b>, and the noise lives at high frequency.', 2)}`,
    `${im('noise-deriv-1d.png', 'the hut row with noise: raw difference, then a Gaussian derivative', {step: 3})}
     ${im('freq-deriv-b.png', 'multiply by a Gaussian: the gain rises, then falls', {step: 4})}
     ${card(null, '<b>Gaussian derivative: ω · <var>G</var>(ω)</b>. Zero for flat regions, small for pixel noise, largest for changes at the scale σ. That is a <b>band-pass</b> filter.', 4, {cls: 'key'})}`)}
  ${refs('ch18', 'ch23', 'burt')}
`, { notes: [
  "(draft) Problem: we keep saying derivatives amplify noise and that blurring helps. The frequency domain makes this precise, and explains why the book calls derivatives band-pass filters.",
  "(draft) The continuous derivative multiplies the Fourier transform by j omega: the gain at frequency omega is proportional to omega, the light straight line. The discrete kernels approximate it at low frequencies. The central difference, green, is sin of omega: it follows the line at first, then falls back to zero at the highest frequency, which is the 1, −1 pattern it ignores. The 1D Laplacian, purple dashed, is 4 sin squared: it grows like omega squared, and is largest at the highest frequency.",
  "(draft) What this means. Frequency zero, the flat regions, gets gain zero: a derivative removes the mean and slowly varying brightness, like the sky gradient. High frequencies get the largest gain. Images have little energy there, but noise has a lot: each pixel's noise is independent, so the noise spectrum is flat. A derivative therefore amplifies exactly the part that is mostly noise. In numbers: the difference of two independent noisy pixels has twice the variance of either one. The Laplacian is worse, because omega squared grows faster.",
  "(draft) A row through the huts in a noisy, night-time version of our photo (simulated sensor noise). Middle: the raw central difference: the edges are visible, but the noise produces spikes everywhere. Bottom: the derivative of a Gaussian with sigma 2, on the same vertical scale. The noise spikes are gone, and the edges remain as clean peaks, a little wider.",
  "(draft) Why that works: multiply the derivative's response omega by the Gaussian's response. The product, omega times G, is zero at zero frequency, rises, peaks, and falls back toward zero. It passes a band of frequencies and suppresses both ends: a band-pass filter. The Laplacian of Gaussian, omega squared times G, is also band-pass, peaking a bit higher. Sigma sets where the band is: a large sigma moves the peak to lower frequencies, coarser structures. A Laplacian pyramid is a stack of such bands, one per scale. And the derivative of Gaussian, applied in one step, is the next slide."
]});

st(`
  <h1 class="t">The Gaussian derivative</h1>
  ${cols(
    `${eq(`∂/∂<var>x</var> (<var>G</var><sub>σ</sub> ∗ <var>I</var>) = (∂<var>G</var><sub>σ</sub>/∂<var>x</var>) ∗ <var>I</var>
       <span class="why">Differentiation and convolution commute. Differentiate the smooth kernel once; then a single convolution gives a well-defined, low-noise derivative at scale σ.</span>`, 1)}
     ${im('gauss-deriv-kernels.png', 'Gaussian, its derivatives, and its Laplacian (σ = 3)', {step: 1})}
     ${card('Scale is a choice', 'σ = 1 keeps the doors, the people and the sand. σ = 4 keeps the hut walls and loses the people. No single σ is correct.', 2)}`,
    grid(2, [
      im('crop-gx-s1.jpg', '<var>g</var><sub><var>x</var></sub> ∗ <var>I</var>, σ = 1', {step: 2}),
      im('crop-gx-s2.jpg', 'σ = 2', {step: 2}),
      im('crop-gx-s4.jpg', 'σ = 4', {step: 2}),
      im('crop-canny.jpg', 'Canny (σ = 1.4)', {step: 3}),
    ]),
    {ratio: '1fr 1.2fr'})}
  ${refs('ch18', 'kvd87', 'canny', 'hog', 'lowe')}
`, { notes: [
  "(draft) Problem: in practice we always smooth before differentiating. Can we do both in one filter, and choose the scale explicitly? Section 18.5, Gaussian derivatives.",
  "(draft) The key identity: the derivative of the blurred image equals the image convolved with the derivative of the Gaussian. Both are linear and shift-invariant, so they commute. Practical consequences: you compute the derivative of the kernel once, analytically: g x is minus x over sigma squared times g. One convolution then gives a smoothed derivative. And it is always well defined, even at a step edge where the true derivative of the image does not exist. Koenderink and van Doorn popularized Gaussian derivatives as a model of receptive fields in the visual system, which we come to in Part V. The kernels: the Gaussian; g x, a positive and a negative lobe side by side; g y; and the Laplacian of Gaussian, a negative center and a positive ring, the inverted Mexican hat.",
  "(draft) The same g x at three scales, like the book's Figure 18.8. Sigma 1: fine detail, every door frame and person, and the texture of the sand. Sigma 2: the main hut walls and people. Sigma 4: only the large hut boundaries, broad and blurred; the people have merged into the background. Different scales emphasize different structures. There is no single correct sigma; that is why multi-scale methods run several.",
  "(draft) Canny, on the bottom right, is the classical detector built on this filter: Gaussian derivative, keep only the maximum across the edge so the line is one pixel thin, then two thresholds so a weak edge survives only when it connects to a strong one. The hut outlines, the people and the rocks come through, and so does the sand. Where these filters are actually used, and where a change in brightness is the wrong answer, are the next two slides."
]});

st(`
  <h1 class="t">Real-world applications</h1>
  <div class="lf-sub">What image derivatives help detect</div>
  ${grid(3, [
    card('Self-driving', 'Lane markings, cars, barriers and the road edge. The car sees brightness changes first.', 1, {style: 'align-self:center'}),
    im('drv-road.png', 'motorway camera view (real photo)', {step: 1}),
    im('drv-road-e.png', 'gradient magnitude', {step: 1}),
    card('Document scanning', 'The page border, text strokes, barcode bars and the tilt of the receipt.', 2, {style: 'align-self:center'}),
    im('drv-page.png', 'receipt on a table (real photo)', {step: 2}),
    im('drv-page-e.png', 'gradient magnitude', {step: 2}),
  ], {style: 'grid-template-columns:.85fr 1fr 1fr;row-gap:2.4vh'})}
  ${card('The same filter, a different question', 'A crack in a part, a coastline, the contour of a face, the outline of a ball. The derivative reports the change. A later step decides what the change is.', 3, {cls: 'key'})}
  ${refs('ch18', 'canny', 'hog', 'lowe', 'Road photo: David Hawgood, Average speed cameras, shadows, &amp; road markings, Geograph Britain and Ireland / Wikimedia Commons, CC BY-SA 2.0; cropped and filtered.', 'Receipt photo: Donald Trung Quoc Don, Lidl Hesel receipt, Hesel (2019) 02, Wikimedia Commons, CC BY-SA 4.0; cropped and filtered.')}
`, { notes: [
  "(draft) Two jobs, shown rather than listed. Both panels on the right are the gradient magnitude: where brightness changes, bright, and everywhere else black. Both are real photos from Wikimedia Commons, cropped and processed here. Road photo: David Hawgood / Geograph, CC BY-SA 2.0. Receipt photo: Donald Trung Quoc Don, CC BY-SA 4.0.",
  "(draft) Self-driving. A motorway camera view. The derivative lights up lane markings, car outlines, the barrier and the edge of the road. It does not know which bright curves are lanes, which are vehicles, and which are roadside structure. A later stage has to decide which edges matter for driving.",
  "(draft) Document scanning. A receipt on a table. The derivative finds the page border, so the app can crop and straighten it, and it finds text strokes and barcode bars. The same kind of map is what a face recognizer uses on a contour, what a factory camera uses on a crack, and what a satellite pass uses on a coastline. The filter does not change. The question asked of its output does."
]});

st(`
  <h1 class="t">Real-world limitations</h1>
  <div class="lf-sub">A change in brightness is not yet the thing you wanted</div>
  ${grid(3, [
    card('A camera shadow on a road', 'The dark line is not a lane marking. Its edge is still a strong brightness change.', 1, {style: 'align-self:center'}),
    im('drv-shadow.png', 'road markings and a shadow (real photo)', {step: 1}),
    im('drv-shadow-e.png', 'paint and shadow both light up', {step: 1}),
    card('A brick wall', 'Every mortar line is an edge. None of them is an object.', 2, {style: 'align-self:center'}),
    im('drv-brick.png', 'brick (simulated)', {step: 2}),
    im('drv-brick-e.png', 'edges, and no object', {step: 2}),
  ], {style: 'grid-template-columns:.85fr 1fr 1fr;row-gap:2.4vh'})}
  ${card('The mathematics finds the change. It does not know the cause.', 'Camouflage gives no edge at all. Low light invents edges. Motion blur spreads a real one out. Crowding makes two outlines cross.', 3, {cls: 'key'})}
  ${refs('ch18', 'canny', 'Road photo: David Hawgood, Average speed cameras, shadows, &amp; road markings, Geograph Britain and Ireland / Wikimedia Commons, CC BY-SA 2.0; cropped and filtered.')}
`, { notes: [
  "(draft) The same derivative as the previous slide, on two scenes where the answer is wrong. The road is a real photo from Wikimedia Commons / Geograph: Average speed cameras, shadows, and road markings, by David Hawgood, CC BY-SA 2.0. The brick is simulated.",
  "(draft) The shadow. This is a crop of a real motorway photo. The painted lane markings light up, which is what a lane detector wants. But the shadow from the overhead camera structure also lights up: a long dark-to-light boundary with roughly the same geometry as a road marking. The change in brightness is real. The cause is not paint, not a lane, and not an obstacle. A system has to use geometry, color, temporal consistency or semantics to reject it.",
  "(draft) The brick wall. Grass, fabric and brick are nothing but edges. The derivative reports every one of them, and there is no object in the picture. Point back at the sand in the Canny image: same problem. Then the line at the bottom, the cases we are not drawing: camouflage, where the object matches the background and the derivative is zero; low light, where noise becomes edges, which we already saw on the night-time row; motion blur, which spreads a true edge until a small sigma misses it; and a crowd, where two outlines cross and the derivative cannot say which piece belongs to which person."
]});

st(`
  <h1 class="t">From one filter to a filter bank</h1>
  ${cols(
    `${card('One filter, one question', 'A vertical-edge filter at σ = 2 answers: is there a vertical edge about this wide, here? The huts also have roofs, slanted edges, ripples and people, at many sizes.', 1)}
     ${eq(`<var>g</var><sub>θ</sub> = cos θ · <var>g</var><sub><var>x</var></sub> + sin θ · <var>g</var><sub><var>y</var></sub>
       <span class="why"><b>Steerable</b>: two filters give the derivative at every orientation. Filter once with <var>g</var><sub><var>x</var></sub> and <var>g</var><sub><var>y</var></sub>, then mix.</span>`, 2)}
     ${grid(2, [
       im('crop-steer-0.jpg', '0°'), im('crop-steer-45.jpg', '45°'),
       im('crop-steer-90.jpg', '90°'), im('crop-steer-135.jpg', '135°'),
     ], {step: 2})}`,
    `${im('bank-kernels.png', 'a bank: 4 orientations × 3 scales, and where each listens in frequency', {step: 3, style: 'flex:1.6 1 0'})}
     ${grid(3, [
       im('crop-energy-s1.jpg', 'energy, σ = 1'), im('crop-energy-s2.jpg', 'σ = 2'), im('crop-energy-s4.jpg', 'σ = 4'),
     ], {step: 4})}
     ${card('A description, not a single answer', 'Square each output and add: <b>energy</b>. Every pixel gets a vector of responses, one per filter: the input to texture analysis, HOG, models of V1, and CNNs.', 5, {cls: 'key'})}`,
    {ratio: '1fr 1.15fr'})}
  ${refs('sets', 'freeman', 'kvd87')}
`, { notes: [
  "(draft) Problem: every filter so far answers one narrow question. Chapter 22 of the book, Filter Banks, is the step from one filter to a set of them.",
  "(draft) A vertical-edge filter at sigma 2 tells you where there is a vertical edge about that wide. The photo has vertical walls, horizontal roofs, slanted roof edges, ripples, people, at many sizes. One filter cannot describe that. We need many filters, each tuned to a different orientation and scale.",
  "(draft) First, orientation is cheap. The derivative in direction theta is cos theta times the x derivative plus sin theta times the y derivative: Equation 18.4 in the book. So two filters give every orientation; you filter twice and mix. Freeman and Adelson called such filters steerable. The four maps are the same g x and g y at sigma 2, mixed for 0, 45, 90 and 135 degrees: the vertical walls at 0, the roof slopes at 45 and 135, the roof lines and the horizon at 90. Second derivatives need three basis filters, higher orders more.",
  "(draft) A bank: the same kernel at four orientations and three scales. On the right, where each one listens in frequency: each filter keeps a pair of lobes, at its orientation and at a distance set by its scale. Fine filters, sigma 1, listen far from the center, to high frequencies; coarse filters, sigma 4, close to it. Together they cover the frequency plane, like the book's Figure 22.8. Each output map is still a linear filter, so everything from Part II applies.",
  "(draft) Now one simple nonlinearity, the point of the chapter: square each output and add over orientations. The sign and the exact orientation drop out; what remains is how much structure there is at that scale. Sigma 1: the ripples, the sand, the people. Sigma 4: only the large hut outlines. At every pixel the bank gives a vector of numbers, one per filter: a description of local structure rather than one answer. Texture analysis, segmentation, HOG and SIFT are built on such vectors. Next part: V1 looks very much like a bank of oriented, scale-tuned filters with this kind of energy computation, and the first layer of a CNN learns one."
]});
}
