/* PART: lnm (Day 10, owner: Shreya). A deep dive on the Large Nature Model: what was used, how, and why. Placed after
   "What tools did his studio use?" as the worked example (reordered 2026-11-15), with the "How do outputs become an
   artwork?" statement before the data-chocolate slide. Added at Shreya's request (2026-11-15), following her Google Slides 7-10 and their
   comments ("include images and specifics"; "we don't have to focus on Brazil", pull from her Large Nature Model deck).
   Sources: Refik Anadol, "Training AI to Understand Nature", DATALAND blog, 10 July 2026
   (dataland.art/blog/large-nature-model-data-collection); dataland.art/about/large-nature-model (partner logos: Smithsonian,
   Natural History Museum, Cornell Lab, Getty); Artnet, January 2024 (about 250,000 Amazon birdsongs from Cornell Lab);
   dataland.art/data-chocolate. Photos: the DATALAND blog and the data-chocolate page (Refik Anadol Studio / DATALAND).
   No speaker notes. */
{
section('Large Nature Model');

st(`
  <h1 class="t">The Large Nature Model</h1>
  <div class="d10-col">
    <div class="d10-lnm">
      <div>
        <ul class="d10-list d10-lnm-list">
          <li class="b">Most AI learns from human text and images. This one learns from nature.</li>
          <li class="b">Built by Refik Anadol Studio for DATALAND, its museum of AI art in Los Angeles</li>
          <li class="b">It makes the visuals, sounds and scents of the first exhibition, <i>Machine Dreams: Rainforest</i></li>
        </ul>
        <div class="d10-stats b">
          <div><b>1.2 billion</b><span>ecological data points</span></div>
          <div><b>100 million+</b><span>images of plants, animals and fungi</span></div>
        </div>
      </div>
      <figure class="d10-lnm-fig b" data-step="1"><img src="assets/lnm-canopy.jpg" alt="Two researchers climbing tall rainforest trees with ropes">
        <figcaption>The field team climbing into the canopy</figcaption></figure>
    </div>
  </div>
  ${cite('DATALAND blog, "Training AI to Understand Nature" (July 2026) · photo: Refik Anadol Studio')}
`);

/* four kinds of data, one per click, each replacing the one before */
const D10_KINDS = [
  ['Images', 'What does nature look like?', ['lnm-photos.jpg', 'Leaves photographed next to a color chart and a ruler'],
    'A photo on its own is isolated. The team wanted the model to know where a species lives and what it lives with.',
    'Museum and research archives: Smithsonian, Natural History Museum, Cornell Lab, Getty. AI tools on Google Cloud label each species and habitat and write a description.',
    'The realistic plants, animals and fungi in the art'],
  ['Sound', 'How does nature change over time?', ['lnm-sound.jpg', 'A 360-degree microphone recording a forest stream'],
    'Dawn choruses, insects, rain and streams show the rhythm of a day and how species respond to each other.',
    '360° (ambisonic) and binaural microphones, and recorders left running for whole day–night cycles. Cornell Lab shared about 250,000 Amazon birdsongs.',
    'The soundscapes visitors hear in the gallery'],
  ['3D scans', 'How is a forest built?', ['lnm-scanner.jpg', 'A laser scanner on a tripod in a rainforest'],
    'A forest is 3D: canopy, understory and roots stack in layers. A flat photo misses that.',
    'Laser scanners (LiDAR) record millions of points in 3D; photogrammetry builds 3D from many photos. Many scans come from Ghent University’s forest lab.',
    'Depth, scale and structure in the generated worlds'],
  ['Sensors', 'What can we not see?', ['lnm-raingauge.jpg', 'A rain gauge in the forest'],
    'Much of a forest’s life is invisible: water moving through soil and up through trees.',
    'Rainfall, soil moisture, sap flow, temperature and humidity, from researchers in Chile, Australia and California.',
    'The model’s sense of climate and how a forest behaves (the details are not published)'],
];

st(`
  <h1 class="t">What did it learn from?</h1>
  <div class="d10-col">
    <div class="d10-stack d10-kinds">
      ${D10_KINDS.map(([kind, q, [img, alt], why, how, use], k) => `
        <div class="d10-one d10-kind b" data-step="${k + 1}">
          <figure><img src="assets/${img}" alt="${alt}"></figure>
          <div class="d10-kind-text">
            <div class="d10-kind-name">${kind} <span>${q}</span></div>
            <dl>
              <dt>Why</dt><dd>${why}</dd>
              <dt>How</dt><dd>${how}</dd>
              <dt>Used for</dt><dd>${use}</dd>
            </dl>
          </div>
        </div>`).join('')}
    </div>
  </div>
  ${cite('DATALAND blog (July 2026) · dataland.art · Artnet (January 2024) · photos: Refik Anadol Studio')}
`);

st(`
  <h1 class="t">From field data to <i>Machine Dreams</i></h1>
  <div class="d10-col">
    <div class="d10-pipe5">
      <div class="b" data-step="1"><b>Collect</b><span>museum archives, field trips, sensors</span></div>
      <div class="b" data-step="2"><b>Describe</b><span>species, habitats, written descriptions</span></div>
      <div class="b" data-step="3"><b>Train</b><span>one model on every kind of data</span></div>
      <div class="b" data-step="4"><b>Generate</b><span>realistic species and abstract “dreams”</span></div>
      <div class="b" data-step="5"><b>Exhibit</b><span>images, sound and scent at DATALAND</span></div>
    </div>
    <div class="d10-callout b" data-step="6"><b>Why build it?</b> The studio wants AI to help people notice hidden patterns in nature and care about it.</div>
    <div class="d10-callout d10-callout-q b" data-step="7"><b>Not published:</b> the model’s architecture, how it was trained, and how much of each kind of data it used. <i>In the lab, you build a small version yourself.</i></div>
  </div>
  ${cite('DATALAND blog, "Training AI to Understand Nature" (July 2026)')}
`);

st(`
  <div class="center" style="margin:auto">
    <div class="statement" style="font-weight:700;font-size:clamp(2rem,3.7vw,3.3rem)">How do outputs become an artwork?</div>
  </div>
`);

st(`
  <h1 class="t">Flavor as a medium</h1>
  <div class="d10-col">
    <div class="d10-lnm">
      <ul class="d10-list d10-lnm-list">
        <li class="b"><b>Data in:</b> the genes of wild cacao, the chemistry of flavor, and sensor data from the rainforest</li>
        <li class="b"><b>The model:</b> the Large Nature Model proposed new “conceptual recipes”</li>
        <li class="b"><b>The human:</b> a chef, Valerie Gordon, chose four and made them by hand</li>
        <li class="b"><b>The visit:</b> in the gallery, “The Data Well” reads your pulse and movement and picks one for you</li>
        <li class="b"><b>Who is the artist here?</b></li>
      </ul>
      <div class="d10-choc b" data-step="1">
        <img src="assets/lnm-chocolate-pieces.jpg" alt="Four chocolates on a marble counter">
        <img src="assets/lnm-chocolate-chef.jpg" alt="A chef placing chocolates on a counter">
      </div>
    </div>
  </div>
  ${cite('dataland.art/data-chocolate (DATALAND × Valerie Confections, 2026) · photos: DATALAND')}
`);
}
