/* PART: perception. Outline slides 22-26 (20 min).
   Retinal center-surround and DoG, V1 orientation selectivity and Gabor filters, CNN first layers.
   Framing throughout: these filters are computational models of aspects of early vision, not
   a claim that the visual system applies fixed kernels. */
{
section('V. Perception');

st(`
  <h1 class="t">Does the human visual system filter images?</h1>
  ${cols(
    `${im('rgc-rf.png', 'retinal ganglion cell receptive fields', {step: 1})}
     ${card('Receptive field', 'The patch of retina where light changes a cell’s firing. Kuffler (1953): a center and an antagonistic surround, in two kinds, <b>ON</b>-center and <b>OFF</b>-center.', 1)}`,
    `${im('rgc-spot.png', 'model ON-center cell, bright spots of growing size', {step: 2})}
     ${card('Local contrast, not brightness', 'ON-center: light in the center excites, light in the surround inhibits. A spot that just fills the center drives it best; uniform light drives it weakly.', 2)}`)}
  ${card('As a model', 'Response ≈ weighted sum of light over the receptive field: a <b>linear spatial filter</b>, followed by nonlinearities: firing cannot go negative, and gain adapts to the mean light level. ON and OFF cells carry the two signs.', 3, {cls: 'key'})}
  ${refs('kuffler', 'ecr', 'ratliff')}
`, { notes: [
  "(draft) Problem: we have built filters that keep slow changes, or changes at one scale. Does biological vision do anything similar? Part V connects the mathematics to the retina and V1. I will present each filter as a model of some aspect of the biology, and say where the model fails.",
  "(draft) Retinal ganglion cells are the output neurons of the eye; their axons form the optic nerve. Each cell responds to light in a small region of the retina, its receptive field. Kuffler, recording in the cat in 1953, found that these fields have a center and a surround with opposite effects. ON-center cells: light in the center increases firing, light in the surround decreases it. OFF-center cells: the reverse. The two populations together signal both increments and decrements of light.",
  "(draft) What does such a cell respond to? Shine a centered spot and make it bigger. Small spot: weak response. Spot that fills the center: strongest. Bigger still: the spot now covers the inhibitory surround too, and the response falls. Uniform light over the whole field: a weak response, because center and surround nearly cancel. The cell signals local contrast, the difference between a spot and its surroundings, not absolute brightness. This is the same thing a band-pass filter does: it ignores the flat regions and responds to structure at a particular scale.",
  "(draft) As a model: a ganglion cell's response is approximately a weighted sum of light over its receptive field, with positive weights in the center and negative weights in the surround. That is a linear filter, a kernel, and a population of such cells tiling the retina approximates a convolution. But be careful with the word approximately. Real cells rectify, because firing rates cannot be negative, which is one reason for separate ON and OFF cells. They adapt their gain to the mean light level and to contrast. And the linear model fits some cell types, like cat X cells (Enroth-Cugell and Robson), much better than others. It is a useful model of one aspect, not a description of the retina."
]});

sc('hermann', 'scenes/hermann.html', {title: 'The Hermann grid'});

st(`
  <h1 class="t">Center-surround receptive fields and Difference of Gaussians</h1>
  ${cols(
    im('dog-kernel.png', 'a narrow center minus a wide surround', {step: 1}),
    eq(`DoG = <var>G</var><sub>σ<sub>c</sub></sub> − <var>w</var> · <var>G</var><sub>σ<sub>s</sub></sub>, &nbsp; σ<sub>s</sub> > σ<sub>c</sub>
      <span class="why">The ON-center profile (Rodieck 1965). With <var>w</var> = 1 the weights sum to zero, so uniform light gives no response; in frequency the difference of two low-passes is a band-pass.</span>`, 1),
    {ratio: '1.6fr 1fr', style: 'flex:0 0 auto;height:25vh'})}
  ${grid(3, [
    im('crop-dog-fine.jpg', 'DoG, σ<sub>c</sub> = 1: fine contrast', {step: 2}),
    im('crop-dog-coarse.jpg', 'σ<sub>c</sub> = 3: coarse blobs', {step: 2}),
    im('dog-edge-1d.png', 'across an edge: a dip and a peak, like Mach bands', {step: 3}),
  ])}
  ${card('Why it matters', '<b>Biology</b>: fits the spatial tuning of many ganglion cells (Enroth-Cugell &amp; Robson 1966). <b>Computation</b>: DoG ≈ Laplacian of Gaussian (Marr &amp; Hildreth); SIFT finds keypoints as DoG extrema across scales; a Laplacian pyramid is a stack of DoGs.', 4)}
  ${refs('rodieck', 'ecr', 'marr', 'lowe', 'burt', 'ratliff')}
`, { notes: [
  "(draft) Problem: we want a filter with the center-surround shape. The standard model is the difference of Gaussians, DoG.",
  "(draft) Take a narrow Gaussian for the center and a wider one for the surround, and subtract. The 1D section shows the two Gaussians dashed and the difference solid: positive in the middle, negative on the flanks, zero far away. Rodieck proposed this model for cat ganglion cells in 1965. In frequency, it is one low-pass minus a wider low-pass: the difference passes a band, and with equal weights it is exactly zero at frequency zero. So the DoG ignores uniform light, and it ignores fine pixel noise. Same band-pass logic as the Gaussian derivative, but rotationally symmetric.",
  "(draft) On the photo, signed, mid-gray is zero. A fine DoG, center sigma 1: it outlines every boundary and small object with a light and a dark band, and ignores the flat interiors of the walls and the sky. A coarse DoG, center sigma 3: blob-sized structures, whole doors, people as blobs, the boundary between sand and water. Two scales, two different descriptions of the same scene. The retina has cells of many sizes, smaller in the fovea and larger in the periphery.",
  "(draft) Across a step edge, the DoG output dips just before the edge and peaks just after. This is the classic account of Mach bands: at the edge of a luminance ramp or step we see a darker band and a lighter band that are not in the stimulus. Lateral inhibition in the retina was the original explanation (Ratliff). The book shows a related model, minus the Laplacian of Gaussian plus a small constant, explaining the Vasarely illusion and matching the shape of the human contrast sensitivity function. Caution: perceived lightness is not explained by retinal filtering alone; many illusions need cortical explanations.",
  "(draft) Why it matters. For biology, DoG fits the spatial frequency tuning of many ganglion cells well, which is why it is the standard model. For computation, the DoG with a ratio of about 1.6 is a good approximation of the Laplacian of Gaussian, which Marr and Hildreth used for edges. Lowe's SIFT finds keypoints as maxima and minima of DoG across space and scale. And the Laplacian pyramid from slide 19 is a stack of DoGs at successive scales. One shape, three communities."
]});

st(`
  <h1 class="t">Orientation selectivity in V1</h1>
  ${cols(
    im('hubel-wiesel.png', 'Hubel &amp; Wiesel: a bar of light, one orientation at a time (schematic)', {step: 1}),
    `${card('V1 simple cells', 'Respond to a bar or edge at one orientation and position; rotate it and the response falls. Elongated ON and OFF subregions lie side by side (Hubel &amp; Wiesel 1959, 1962).', 1)}
     ${im('gabor-kernels.png', 'Gabor filters: four orientations, two wavelengths', {step: 2})}
     ${eq(`<var>g</var> = exp(−(<var>x</var>′² + γ²<var>y</var>′²) / 2σ²) · cos(2π<var>x</var>′/λ + ψ)
       <span class="why">A grating (wavelength λ, orientation θ, phase ψ) under a Gaussian window; <var>x</var>′, <var>y</var>′ are rotated by θ. Fits simple-cell receptive fields well (Jones &amp; Palmer 1987).</span>`, 2)}`,
    {ratio: '1fr 1.15fr'})}
  ${refs('hw59', 'hw62', 'daugman', 'jp87', 'sets', 'Hubel &amp; Wiesel schematic: source: to add.')}
`, { notes: [
  "(draft) Problem: center-surround cells respond to contrast in all orientations equally. But the huts are made of vertical walls and horizontal roofs, and the water of ripples at many angles. Orientation matters. The next stage, primary visual cortex, V1, is where orientation selectivity appears.",
  "(draft) Hubel and Wiesel, recording in cat V1 in 1959 and 1962, projected bars of light. Many cells responded strongly to a bar at one orientation and position, and less and less as the bar was rotated away. They called the ones with separate ON and OFF subregions simple cells: an elongated excitatory strip flanked by inhibitory strips, or the reverse. That is an oriented receptive field: a kernel that is long in one direction and alternates sign in the other. Hubel and Wiesel's model built these by lining up center-surround inputs from the LGN; how exactly that wiring arises is still studied.",
  "(draft) A Gabor filter is the standard mathematical model of a simple cell: a sinusoidal grating multiplied by a Gaussian envelope. The parameters are the orientation theta, the wavelength lambda, which sets the preferred spatial frequency, the phase psi, which decides whether it looks like a bar (cosine) or an edge (sine), the envelope width sigma, and the aspect ratio gamma. Daugman showed that Gabors achieve the best possible joint resolution in space and spatial frequency. Jones and Palmer fit Gabors to measured cat simple-cell receptive fields and found good fits for most cells. Compare with slide 20: Gaussian derivatives of order 1 and 2 look much like Gabors with few lobes; both are models in use."
]});

st(`
  <h1 class="t">Orientation selectivity in V1</h1>
  <div class="lf-sub">The same four filters (λ = 8 px) on the photograph</div>
  ${grid(4, [
    im('crop-gabor-0.jpg', 'vertical'),
    im('crop-gabor-45.jpg', '45°'),
    im('crop-gabor-90.jpg', 'horizontal'),
    im('crop-gabor-135.jpg', '135°'),
  ], {step: 1})}
  ${cols(
    im('crop-gabor-color.jpg', 'strongest orientation as color: red vertical, green 45°, cyan horizontal, violet 135°', {step: 2}),
    `${im('gabor-tuning.png', 'one vertical Gabor against gratings', {step: 3})}
     ${card('Tuning', 'Each filter answers to a band of orientations and of spatial frequencies: V1 is often modeled as a filter bank like slide 23, built from Gabors. Shown is <b>energy</b>, √(even² + odd²), which ignores phase, like a complex cell.', 3)}`,
    {ratio: '1fr 1.25fr', style: 'flex:0 0 auto;height:36vh'})}
  ${refs('hw62', 'daugman', 'jp87', 'cr68', 'sets')}
`, { notes: [
  "(draft) Now apply the bank to the photo.",
  "(draft) Four orientations, same wavelength, eight pixels. Vertical: the hut walls, door frames, poles, people standing upright. Horizontal: the roof lines, the steps, the horizon, and the ripples at the water's edge, which run mostly horizontally. The diagonals: the pitched roofs, one side each. Each filter is silent where its orientation is absent. Ask: which filter would you use to find the people? Vertical, at a wavelength close to their width.",
  "(draft) Put the four together: at each pixel, color by the orientation of the strongest filter and brightness by its strength. Huts are mostly red and cyan, vertical walls and horizontal roofs, with green and violet along the roof slopes. The sand and water are dominated by horizontal structure. This is a crude version of an orientation map, the representation V1 provides to later areas.",
  "(draft) Tuning curves of one vertical Gabor, measured the way a physiologist would, with gratings. Rotate the grating: the response peaks at the preferred orientation and falls to near zero about 40 degrees away. Change the spatial frequency: the response peaks at one eighth of a cycle per pixel, the filter's own frequency, with about one octave of bandwidth. Real V1 cells have tuning curves of this general shape, with a range of bandwidths. The maps I showed are energy: the square root of the sum of squares of a cosine and a sine Gabor. That removes the dependence on exact position and phase, which is the classic energy model of V1 complex cells. Campbell and Robson's channels idea, that vision analyzes the image in several spatial-frequency bands, fits this picture."
]});

st(`
  <h1 class="t">From biological receptive fields to computer vision</h1>
  ${cols(
    im('alexnet-conv1.png', 'all 64 first-layer filters of AlexNet, learned from ImageNet', {step: 1, px: true}),
    im('alexnet-responses.png', 'four of the most Gabor-like, run on the crop (after ReLU)', {step: 2}),
    {ratio: '1fr 1.15fr'})}
  <div class="lf-grid" style="grid-template-columns:repeat(3,minmax(0,1fr));flex:0 0 auto">
    ${card('Similar', 'Local, oriented, band-pass, some color-opponent blobs; learned from data, not designed. Sparse coding of natural images finds similar shapes (Olshausen &amp; Field 1996).', 3)}
    ${card('Different', 'Biology adds normalization, adaptation, feedback, a fovea, time and noise. A CNN layer is exact weight sharing plus ReLU, trained by backpropagation for a task.', 4)}
    ${card('Why classical filters still matter', 'They are the vocabulary for reading learned representations: deeper layers combine edges into textures, parts and objects (Zeiler &amp; Fergus 2014; Olah et al. 2020).', 5, {cls: 'key'})}
  </div>
  ${refs('alexnet', 'zf14', 'olah', 'of96', 'ch12', 'cnn')}
`, { notes: [
  "(draft) Problem: so far we designed every kernel by hand. A convolutional network learns its kernels from data. What does it learn?",
  "(draft) These are the 64 first-layer filters of AlexNet, from torchvision's ImageNet weights; the 2012 paper's version had 96. Each is 11 by 11 by 3, shown as color. Nobody designed them; they come from training to classify ImageNet. Ask what they see. Oriented stripes at many angles and several frequencies, which look like Gabors. Edge detectors, like derivative kernels. And color blobs and color-opponent patterns, like center-surround cells for color. The book's chapter on derivatives ends with exactly this remark: it is not surprising that such filters emerge in CNNs.",
  "(draft) Four of the most oriented filters, picked automatically, run on our crop, and then passed through a ReLU like in the network. They behave like the Gabor bank on the previous slide: one responds to diagonal roof edges, one to horizontal lines, two to vertical walls and doors at different widths.",
  "(draft) Similarities: local, oriented, band-pass, tiled across the image by weight sharing, which is convolution. Olshausen and Field showed in 1996 that just asking for a sparse code of natural image patches also produces Gabor-like filters. So similar filters emerge from very different objectives, which suggests they reflect the statistics of natural images rather than the particulars of one system.",
  "(draft) Differences, so we do not over-claim. V1 neurons are not linear filters followed by a ReLU. Their responses are divisively normalized by the activity of their neighbors (Carandini and Heeger), they adapt, they receive feedback from higher areas, they respond to time as well as space, they are noisy, and receptive fields grow with distance from the fovea. A CNN layer has exactly the same weights at every position and is trained by backpropagation for a task. Similar first-layer filters do not make the systems equivalent.",
  "(draft) Why classical filtering still matters for learned systems. It explains what the first layer computes and why. It gives us the language to interpret deeper layers: Zeiler and Fergus, and Olah and colleagues in the Distill circuits work, show units in early layers that are edge, curve, and texture detectors, and in later layers parts and objects. And it gives design tools: anti-aliasing, scale, and choosing what invariances to build in. Next, Part VI: putting the filters side by side."
]});
}
