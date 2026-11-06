/* PART: synthesis. Outline slides 26-29 (15 min). */
{
section('VI. Synthesis');

const ROWS = [
  ['Noisy image', 'Gaussian smoothing', 'Suppress high-frequency noise', 'crop-night-s1.jpg'],
  ['Fine detail enhancement', 'High-pass filtering (unsharp mask)', 'Emphasize rapid intensity changes', 'crop-phone-sharpen.jpg'],
  ['Boundary detection', 'Sobel / image gradients', 'Detect spatial changes', 'crop-grad-mag.jpg'],
  ['Local contrast and structure', 'Difference of Gaussians', 'Emphasize changes across scales', 'crop-dog-fine.jpg'],
  ['Orientation and texture', 'Gabor filters', 'Detect oriented spatial patterns', 'crop-gabor-color.jpg'],
];
st(`
  <h1 class="t">Choosing the right filter</h1>
  <div class="lf-table">
    <div class="hd">Problem</div><div class="hd">Potential approach</div><div class="hd">Reason</div><div class="hd">On the photo</div>
    ${ROWS.map((r, k) => r.map((c, j) => `<div class="b" data-step="${k + 1}">${j === 3 ? `<img src="${AS}${c}" alt="">` : (j === 0 ? `<b>${c}</b>` : c)}</div>`).join('')).join('')}
  </div>
  ${card('Start from the task', 'What information do you need, and what can you afford to lose? Every filter on this table throws something away.', 6, {cls: 'key'})}
  ${refs('ch17', 'ch18', 'sets')}
`, { notes: [
  "(draft) We have met five kinds of linear filter. This slide is about choosing between them. For each row, ask the class first, then reveal.",
  "(draft) A noisy image. Gaussian smoothing: noise is mostly high frequency, the scene mostly low. Ask what sigma: as large as the smallest structure you need allows. Lost: fine detail.",
  "(draft) Fine detail enhancement. High-pass, typically unsharp masking: add back a scaled copy of image minus blur. It emphasizes rapid intensity changes that were already there. Lost: nothing is removed, but noise is amplified and halos appear if overdone.",
  "(draft) Boundary detection. Sobel or Gaussian derivatives, then magnitude, then something like Canny. Detects spatial change and gives its direction. Lost: the flat regions and absolute brightness; and texture produces edges you did not want.",
  "(draft) Local contrast and structure, for example blobs and keypoints. DoG at one or several scales. It emphasizes changes at the chosen scale regardless of orientation. Lost: orientation, and everything outside the band.",
  "(draft) Orientation and texture, for example the ripples on the water, or fabric, or fingerprints. A Gabor bank at several orientations and frequencies. Lost: with energy, the exact phase and position; and you pay for many filters.",
  "(draft) The point of the table: filter choice depends on the task, on what information you need, and on what you can afford to sacrifice. There is no best filter, only a best filter for a question. Next: when no linear filter is good enough."
]});

st(`
  <h1 class="t">When are linear filters not enough?</h1>
  <div class="lf-sub">Edges: applications of edge-preserving smoothing</div>
  ${grid(4, [
    card('Medical CT', 'Low-dose scans are noisy. Keep the margin of a lesion and the line of a fracture.', 1, {style: 'align-self:center'}),
    im('ct-noisy.png', 'low-dose CT (simulated)', {step: 1}),
    im('ct-gauss.png', 'Gaussian: fracture closes', {step: 1}),
    im('ct-bilateral.png', 'edge-preserving: fracture kept', {step: 1}),
    card('Road signs', 'A car camera at dusk must read a small, distant sign. Keep the digits and the red ring.', 2, {style: 'align-self:center'}),
    im('sign-noisy.png', 'dashcam at dusk (simulated, 2× zoom)', {step: 2}),
    im('sign-gauss.png', 'Gaussian: digits blur', {step: 2}),
    im('sign-bilateral.png', 'edge-preserving: digits sharp', {step: 2}),
  ], {style: 'grid-template-columns:.75fr 1fr 1fr 1fr;row-gap:2.4vh'})}
  ${refs('ch17', 'tomasi', 'paris')}
`, { notes: [
  "(draft) A linear filter blurs across an edge as readily as across a flat region, because its weights ignore the image. Two applications show why that is a problem. In each row the right-hand panel uses the bilateral filter (Tomasi and Manduchi, 1998): it averages only over neighbors that are close in space and similar in brightness. Inside a flat region all neighbors are similar, so it smooths; across an edge the pixels on the other side are very different and get almost no weight, so the edge survives. Because the weights depend on the image, it is not a convolution and has no frequency response. That is all we need of it today.",
  "(draft) Medical imaging. CT uses X-rays, and lowering the radiation dose, which matters for children and for repeated scans, makes the image noisier. The diagnostic information is often at edges: the margin of a lesion, the thin line of a fracture. This is the Shepp-Logan phantom, the standard CT test image, with a small lesion and a hairline fracture through the skull added, and low-dose noise; it is simulated, not patient data. The two boxes beside each head zoom into the fracture (top) and the lesion (bottom). Gaussian: the noise is down, but the lesion's margin is soft and the fracture has nearly closed. Edge-preserving: the tissue is smooth, the lesion's margin and the fracture are still sharp. A caveat for honesty: edge-preserving filters keep high-contrast edges; a very faint lesion close to the noise level can still be smoothed away. Modern scanners use iterative reconstruction and learned denoisers, but the goal is the same: remove noise without removing edges.",
  "(draft) Road signs. A traffic-sign recognition system in a car reads speed limits from a camera, often at dusk, when the image is noisy and the sign is only a few dozen pixels across. Simulated dashcam frame, shown at 2 times zoom. Gaussian with sigma 2: the noise is down, but the strokes of the 6 and the 0 are only a few pixels wide, so they blur into each other, and the red ring bleeds into the sky. Edge-preserving: the background is smooth and the digits and the ring are still crisp, which is what the recognizer needs. The trade-off from slide 14 again: a linear filter cannot tell noise from fine detail, because both are high frequency; a filter whose weights depend on the image can. Close the slide: in both rows the fix was to let the image decide the weights. Biology is not linear either, as we said on slide 25: the visual system also adapts its processing to the local content."
]});

st(`
  <h1 class="t">Returning to the Muizenberg photograph</h1>
  ${grid(3, [
    im('crop-color.jpg', 'original'),
    im('crop-s4.jpg', 'low-pass: Gaussian σ = 4', {step: 1}),
    im('crop-grad-mag.jpg', 'gradient magnitude', {step: 2}),
    im('crop-log.jpg', 'Laplacian of Gaussian (σ = 2)', {step: 2}),
    im('crop-dog-coarse.jpg', 'Difference of Gaussians (σ<sub>c</sub> = 3)', {step: 3}),
    im('crop-gabor-color.jpg', 'Gabor orientation energy', {step: 3}),
  ])}
  ${card('What did each one keep?', 'Low-pass: layout and color. Derivatives: boundaries and their direction. DoG: blobs at one scale. Gabor: orientation. None kept everything; the visual system runs many in parallel.', 4, {cls: 'key'})}
  ${refs('ch17', 'ch18')}
`, { notes: [
  "(draft) Back to the photo we started with, the same crop under every filter we built today. Use this slide for discussion; for each pair, ask what it reveals and what it lost.",
  "(draft) Low-pass. Reveals: the layout, which hut is which color, where the sand meets the water. Lost: the people, the doors, every edge. Good enough to say this is a beach with colored huts; useless for counting people.",
  "(draft) Gradient magnitude and Laplacian of Gaussian. Both reveal boundaries: the hut outlines, the people, the rocks. The gradient keeps their strength and, in the color version, their direction. The LoG gives light and dark bands with the edge at the zero between them, the same for every orientation. Lost: the colors, the brightness of the walls; inside a wall both are zero.",
  "(draft) DoG and Gabor. The DoG reveals structure at one scale: doors, windows, people as blobs, and suppresses both the flat walls and the finest texture. The Gabor bank reveals orientation: vertical walls, horizontal roofs, the direction of the ripples. These are the two filters we used as models of the retina and V1.",
  "(draft) The connection to perception. No single filter output looks like what we see. Each keeps a different kind of information and discards the rest. The visual system computes many such representations in parallel, across scales and orientations, and later stages combine them, with plenty of nonlinearity along the way. The same is true of a CNN's first layer. Ask the room: which of these six would you hand to a system that has to find the people? And to one that has to decide whether it is a sunny day?"
]});

st(`
  <h1 class="t">Day 3 · Part 2 lab</h1>
  <div class="lf-sub">Image filtering</div>
  ${card('Your own photo, the filters from today', 'Spatial filters, a filter bank, and a pyramid. You turn a photograph into a printable name tag. Every pixel, including your name, comes from the notebook.', 1)}
  ${card('Open the notebook', `<a href="https://colab.research.google.com/github/delamarifer/human-machine-perception/blob/main/notebooks/day03-lab2-image-filtering.ipynb" target="_blank" rel="noopener">Lab 2 · Image filtering, in Colab</a>. Run the cells in order. Change only the lines under <b>EDIT</b>.`, 2, {cls: 'key'})}
`, { notes: [
  "(draft) Leave this up while they open the notebook. This is the lab for this lecture: day03-lab2-image-filtering. About 30 minutes. They pick a photo and build a trifold desk name tag from filtered versions of it.",
  "(draft) The link is the student notebook. The instructor copy, with the sample answers, is notebooks/instructor/day03-lab2-image-filtering-instructor.ipynb. Do not put that one on the screen.",
  "(draft) Whatever they do not finish is on the homework slide: before tomorrow, with the Part 1 lab."
]});

st(`
  <h1 class="t">Homework</h1>
  ${card("Yesterday's assignment", '<a href="https://forms.gle/hLbcz7Yy3YNtnBws6" target="_blank" rel="noopener">Submit the assignment from yesterday</a>.', 1)}
  ${card("Today's homework · due tomorrow", `Finish today's lab work and upload it here: <a href="https://forms.gle/urPSQVh27DA7rAC37" target="_blank" rel="noopener">homework upload form</a>. <a href="https://colab.research.google.com/github/delamarifer/human-machine-perception/blob/main/notebooks/day03-lab-metamers.ipynb" target="_blank" rel="noopener">Part 1 lab</a>. <a href="https://colab.research.google.com/github/delamarifer/human-machine-perception/blob/main/notebooks/day03-lab2-image-filtering.ipynb" target="_blank" rel="noopener">Part 2 lab</a>.`, 2, {cls: 'key'})}
  ${card('Project proposal · Friday night', '<a href="https://forms.gle/wBXHE6AFaHf8RR4T8" target="_blank" rel="noopener">Project proposal form</a>.', 3)}
`, { notes: [
  "(draft) Leave this up while they pack. Three links: yesterday's assignment, today's homework, and the project proposal.",
  "(draft) If they still owe yesterday's assignment, it goes to the first Google Form: hLbcz7Yy3YNtnBws6.",
  "(draft) Today's homework is due tomorrow. Upload it to the form ending urPSQVh27DA7rAC37. Two student notebooks: Part 1, the metamers lab, and Part 2, image filtering, which is this lecture's lab.",
  "(draft) The project proposal is due Friday night. The link is the Google Form ending wBXHE6AFaHf8RR4T8."
]});
}
