/* PART: intro. Outline slides 1-4 (10 min).
   We already use image filters every day. The Muizenberg photo is introduced here and used on every slide. */
{
section('I. Everyday filters');

st(`
  <h1 class="t">How do we change what we see?</h1>
  <div class="lf-sub">Linear image filtering, spatial frequency, and visual perception · Fernanda De La Torre · Shreya Pandit</div>
  ${cols(`
    ${card('Tap <i>Blur</i>', 'The ripples, the people and the hut outlines fade. The sky, the sand and the colors stay.', 1)}
    ${card('Tap <i>Sharpen</i> instead', 'The opposite: the ripples and outlines get louder.', 2)}
    ${card('Same beach, same photo', 'No new picture was taken. A filter rewrites the pixel values we already have, so some structure gets louder and some quieter.', 3)}
    ${card('Today’s question', 'How can we manipulate an image to <b>reveal</b>, <b>suppress</b>, or <b>extract</b> particular visual information?', 4, {cls: 'key'})}
  `, `<div class="lf-stack">
    ${im('photo.jpg', 'Muizenberg, Cape Town')}
    ${im('phone-blur.jpg', 'after <b>Blur</b>', {step: 1})}
    ${im('phone-sharpen.jpg', 'after <b>Sharpen</b>, applied to the original', {step: 2})}
  </div>`, {ratio: '1fr 1.25fr'})}
  ${refs('part')}
`, { notes: [
  "(draft) Open with the photo on screen and let it sit. This is a phone picture of the beach huts at Muizenberg, and it is the only photo we use today. Every filter you see will run on this image, so you can compare like with like. Ask the room: who has tapped Blur, Sharpen, or a Clarity or Structure slider on a phone?",
  "(draft) Tap Blur. Ask what is gone. The ripples on the water, the people, the sharp outline of each hut. What survives: the blue of the sky, the sand, the color of each hut, the line of the horizon. Small, fast detail went; large, slow structure stayed.",
  "(draft) Now Sharpen, on the original photo. The opposite happens: the ripples and the hut outlines are louder, the colors look crisper. Sharpening looks like new detail, but it only amplifies detail that was already there.",
  "(draft) Did we change the scene? No: the beach did not move and no new photo was taken. Both buttons rewrite the same pixel values with a fixed rule. A filter changes the representation, not the scene: it makes some structure stand out and some fade, and it cannot invent information that was not measured.",
  "(draft) This is the question for the next two hours: how can we manipulate an image to reveal, suppress, or extract particular visual information? We follow the MIT Vision Book, Part on Linear Filters: low-pass filters first (Chapter 17), then derivatives and band-pass filters (Chapter 18), then what the retina and V1 do that looks like these filters. Filtering is the first computation in almost every vision system, biological or artificial."
]});

st(`
  <h1 class="t">From smartphone filters to computer vision</h1>
  ${grid(3, [
    im('phone-blur.jpg', '<b>Blur</b> → smoothing, a <b>low-pass</b> filter', {step: 1}),
    im('phone-sharpen.jpg', '<b>Sharpen</b> → boost the <b>high</b> frequencies', {step: 2}),
    im('phone-edges.jpg', '<b>Edges</b> → <b>image derivatives</b>', {step: 3}),
  ])}
  ${card('The same three operations, inside computer vision', 'Denoising, image pyramids, Canny edges, SIFT and HOG features, and the first layer of every CNN are built from these.', 4)}
  ${refs('ch17', 'ch18', 'canny', 'lowe', 'hog')}
`, { notes: [
  "(draft) Three buttons on a phone, three ideas for today. We will connect each button to the mathematical operation underneath it.",
  "(draft) Blur. Portrait mode, background blur, and the noise reduction your phone runs at night all replace each pixel by an average of its neighbors. That average keeps slow changes, like the sky gradient and the big hut shapes, and removes fast ones. We will call it a low-pass filter, because the low spatial frequencies pass through.",
  "(draft) Sharpen. The slider subtracts a blurred copy of the image from the image. What is left is the fine detail, and the phone adds it back, louder. That boosts high spatial frequencies. The book builds exactly this filter in Section 18.11.",
  "(draft) Edges. A document scanner finds the page border; a lane assistant finds the lane line. Both look for places where brightness changes fast. That is a derivative. On the right: white where the change is large, black where nothing changes. The sky is black. The hut outlines are bright.",
  "(draft) These are not consumer gimmicks. The same operations sit inside computer vision pipelines: Gaussian smoothing before detection, image pyramids, Canny edges, the gradients inside SIFT and HOG, and, as we will see near the end, the first layer of a trained CNN. You have an undergraduate background in vision, so you have used most of these. Today the aim is to understand why they work, what each keeps, and what each throws away."
]});

/* Marks are in normalized photo coordinates (1024 × 768). The last ring is the crop used for every comparison. */
st(`
  <h1 class="t">Our example: a photograph from Muizenberg</h1>
  ${cols(
    rfig('assets/photo.jpg', 4 / 3, [
      {r: [0.04, 0.04, 0.52, 0.34], k: 'ring', step: 1},
      {r: [0.00, 0.62, 0.64, 0.37], k: 'ring', step: 2},
      {r: [0.65, 0.35, 0.35, 0.17], k: 'ring', step: 3},
      {r: [0.19, 0.48, 0.045, 0.08], k: 'ring', step: 4},
      {r: [0.755, 0.49, 0.04, 0.10], k: 'ring', step: 4},
      {r: [0.24, 0.45, 0.37, 0.08], k: 'ring', step: 5},
      {r: [0.547, 0.298, 0.453, 0.34], k: 'ring', step: 7},
    ]),
    `${card(null, '<b>Sky</b>: smooth, slowly varying', 1)}
     ${card(null, '<b>Water</b>: ripples and glints, fine texture at many orientations', 2)}
     ${card(null, '<b>Huts</b>: sharp vertical and horizontal boundaries', 3)}
     ${card(null, '<b>People</b>: small objects, a few pixels across', 4)}
     ${card(null, '<b>Horizon and mountain</b>: long, low-contrast edges', 5)}
     ${card('What would you emphasize? What could you throw away?', '', 6, {cls: 'key'})}
     ${card(null, '<b>The crop</b>: every comparison uses this region, at the same scale', 7)}`,
    {ratio: '1.6fr 1fr'})}
`, { notes: [
  "(draft) Spend a minute here. Every later slide refers back to these regions, so name them now.",
  "(draft) The sky. Almost no change from pixel to pixel, only a slow gradient from deep blue at the top to lighter blue at the horizon. Remember this as slow variation: low spatial frequency.",
  "(draft) The water. Ripples, caustics, glints on the sand underneath. Fast changes, repeated, in every orientation. This is texture, and it is high spatial frequency.",
  "(draft) The huts. Strong boundaries, mostly vertical walls and horizontal roof lines and steps, plus diagonal roofs. Large jumps in brightness and color over one or two pixels.",
  "(draft) The people: the man standing in the water on the left, the child near the rock on the right. Small objects, only a few pixels across. They are the first thing a strong blur destroys.",
  "(draft) The horizon and the mountain silhouette. Long edges, but with low contrast. A filter tuned to strong edges may miss them.",
  "(draft) Ask: if you were building a system to count people on the beach, what would you keep? And if you wanted to estimate the weather or the time of day? For people you need small, high-frequency structure and boundaries; for weather you could blur the image heavily and lose almost nothing. Filtering is choosing what to keep for the task.",
  "(draft) The outlined region is our crop: huts, people, sand, and the water edge. Every comparison from now on filters the full photo first and then shows this same crop at the same scale, so differences between slides come from the filter, not from the framing."
]});

st(`
  <h1 class="t">What happens when we apply different filters?</h1>
  ${cols(
    grid(2, [
      im('crop-color.jpg', 'original'),
      im('crop-phone-blur.jpg', 'Gaussian blur (σ = 4)', {step: 1}),
      im('crop-phone-sharpen.jpg', 'sharpening (unsharp mask)', {step: 2}),
      im('crop-phone-edges.jpg', 'edges (gradient magnitude)', {step: 3}),
    ]),
    `${card('Describe the differences', 'What is gone in each one? What got louder?', 1)}
     ${card('Filters respond to spatial structure', 'Blur keeps slow changes: the color of each hut, sky, sand. Sharpening and edges keep the fast ones: outlines, people, ripples.', 3)}
     ${card('Two families for today', '<b>Low-pass</b>: keeps broad, gradual changes; removes fine details and sharp variations. <b>Band-pass</b>: keeps changes within a particular range of scales; removes both broad, gradual variations and fine details.', 4, {cls: 'key'})}`,
    {ratio: '1.5fr 1fr'})}
  ${refs('ch17', 'ch18')}
`, { notes: [
  "(draft) Same crop, four versions. Do not explain anything yet; ask the students to describe.",
  "(draft) Gaussian blur. Ask what is gone. The people are almost gone, the poles are gone, the hut doors merge into the walls. What survives: the colors and the rough layout. Write on the board: blur keeps slow changes.",
  "(draft) Sharpening. Edges are crisper, the ripples on the sand look more textured, and you can see halos at the strongest edges, a light line on one side and a dark line on the other. Point at the halo on the red hut. The filter added overshoot; it did not add information.",
  "(draft) Edges. Only the places where brightness changes survive. The sky is black, the walls are black, the outlines are white. Ask: is every white line an object boundary? No: the ripples and shadows on the sand also light up. Keep that thought for Part IV.",
  "(draft) The common idea: each filter responds to a different spatial structure. That is why we organize today by frequency and not by filter names. Low-pass filters keep the slow changes; band-pass filters, which include derivatives, keep changes at a particular scale. Next: what an image is, mathematically, so that we can say precisely what slow and fast mean."
]});
}
