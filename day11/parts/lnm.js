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
          <li class="b" data-step="1">Most AI learns from human text and images. This one learns from nature.</li>
          <li class="b" data-step="2">Built by Refik Anadol Studio for DATALAND, its museum of AI art in Los Angeles</li>
          <li class="b" data-step="3">Data from field trips to 16 rainforests, and from institutions like the Smithsonian and the Natural History Museum, London</li>
          <li class="b" data-step="4">It makes the visuals, sounds and scents of the first exhibition, <i>Machine Dreams: Rainforest</i></li>
        </ul>
        <div class="d10-stats b" data-step="5">
          <div><b>1.2 billion</b><span>ecological data points</span></div>
          <div><b>100 million+</b><span>images of plants, animals and fungi</span></div>
        </div>
      </div>
      <figure class="d10-lnm-fig b" data-step="3"><img src="assets/lnm-canopy.jpg" alt="Two researchers climbing tall rainforest trees with ropes">
        <figcaption>The field team climbing into the canopy</figcaption></figure>
    </div>
  </div>
  ${cite('DATALAND blog, "Training AI to Understand Nature" (July 2026) · refikanadol.com · photo: Refik Anadol Studio')}
`);

/* four kinds of data, one per click, each replacing the one before */
const D10_KINDS = [
  ['Images', 'What does nature look like?', ['lnm-photos.jpg', 'Leaves photographed next to a color chart and a ruler'],
    'A photo on its own is isolated. The team wanted the model to know where a species lives and what it lives with.',
    'Museum and research archives: Smithsonian, Natural History Museum (London), Cornell Lab, Getty. AI tools on Google Cloud label each species and habitat and write a description.',
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
    <div class="d10-callout d10-callout-q b" data-step="6"><b>Not published:</b> the model’s architecture, how it was trained, and how much of each kind of data it used. <i>In the lab, you build a small version yourself.</i></div>
  </div>
  ${cite('DATALAND blog, "Training AI to Understand Nature" (July 2026)')}
`);

/* One worked example: the sound pipeline (Shreya, 2026-11-16, with her sources). Checked 2026-11-16 against
   refikanadol.com/iconiq ("pre-trained audio neural networks and a custom audio latent diffusion model trained on a broad
   spectrum of complex nature sounds"), the NVIDIA AI Art Gallery page (Macaulay Library recordings, "particularly of
   Amazonian birds"; ambisonic audio from 16 rainforests; audio tagging; latent diffusion "trained on ... unlabeled audio")
   and Studio International's review (16 rainforests; a "250-channel sound system"). Not found in those sources, so left
   out: "100,000 hours", real-time audio generation, and audio driven by visitor biometrics (biometrics drive the visuals). */
st(`
  <h1 class="t">Example: the sound pipeline</h1>
  <div class="d10-col">
    <div class="d10-pipe5 d10-pipe4">
      <div class="b" data-step="1"><b>Record</b><span>360° microphones in 16 rainforests, plus Cornell’s Macaulay Library, mostly Amazonian birds</span></div>
      <div class="b" data-step="2"><b>Tag</b><span>pre-trained audio networks label what is in each recording</span></div>
      <div class="b" data-step="3"><b>Generate</b><span>an audio latent diffusion model, trained on unlabeled nature sounds, makes new sound</span></div>
      <div class="b" data-step="4"><b>Play</b><span>a 250-channel sound system in the gallery</span></div>
    </div>
    <div class="d10-callout d10-callout-q b" data-step="5"><b>Not published:</b> how many hours of sound, and the model’s details. <i>Same idea as the images: diffusion in a latent space, but for audio.</i></div>
  </div>
  ${cite('refikanadol.com/iconiq · NVIDIA AI Art Gallery · Studio International (Aug 2026)')}
`);

/* 16 rainforests, the Smithsonian and NHM London, and the scent details (L'Oreal's Fragrance Metier turned the ecological
   data into twelve olfactory concepts; headspace capture, Osmobloom, eco-extraction, synthetic molecules; the moonflower
   captured without harvesting): Shreya's text, 2026-11-16, with her sources refikanadol.com/iconiq, GCI Magazine,
   Personal Care Insights and dataland.art/data-scent.
   Beyond images (Shreya, 2026-11-16): the point is the other creative modalities, sound first, then scent, then flavor.
   Scent: dataland.art/data-scent, read 2026-11-16: twelve "Living Scents" for Machine Dreams: Rainforest, made with
   L'Oreal Luxe's fragrance experts, built from "headspace capture" (sampling the air around a living plant, analysed by
   GC-MS). That page does not say how much the model chose, so the slide says so. Photo: g-lab.jpg from that page
   ("The Data.Scent botanical laboratory", no credit given). Flavor: dataland.art/data-chocolate. */
st(`
  <div class="center" style="margin:auto">
    <div class="statement" style="font-weight:700;font-size:clamp(2rem,3.7vw,3.3rem)">Beyond images: what else can a model make?</div>
  </div>
`);

st(`
  <h1 class="t">Sound, scent and flavor</h1>
  <div class="d10-col">
    <div class="d10-senses">
      <div class="d10-sense b" data-step="1">
        <img src="assets/lnm-sound.jpg" alt="A 360-degree microphone recording a forest stream">
        <b>Sound</b>
        <span>Field recordings over whole days and nights, and about 250,000 Amazon birdsongs, become the soundscapes in the gallery.</span>
      </div>
      <div class="d10-sense b" data-step="2">
        <img src="assets/lnm-scent.jpg" alt="Plants and glass vials in a lab in front of the exhibition screens">
        <b>Scent</b>
        <span>L’Oréal’s perfumers turned the same ecological data into twelve scents. They captured living plants without cutting them, like a rare Amazonian moonflower, and used new molecules for abstract ideas.</span>
      </div>
      <div class="d10-sense b" data-step="3">
        <img src="assets/lnm-chocolate-pieces.jpg" alt="Four chocolates on a marble counter">
        <b>Flavor</b>
        <span>From cacao genes and flavor chemistry, the model proposed recipes. A chef, Valerie Gordon, chose four and made them by hand.</span>
      </div>
    </div>
    <div class="d10-gnote b" data-step="4">Who is the artist here?</div>
  </div>
  ${cite('dataland.art/data-scent · GCI Magazine · dataland.art/data-chocolate · Artnet (Jan 2024) · photos: Refik Anadol Studio, DATALAND')}
`);

/* Purpose (Shreya, 2026-11-16: "a revised version"). Why build it: the studio's stated aim (DATALAND blog), the moonflower
   ("blooms for a single night") and zero-harvest capture (headspace capture, Osmobloom) from dataland.art/data-scent.
   Beyond art: general uses of the same kinds of tools, not the studio's own work: acoustic monitoring for chainsaws and
   species (e.g. Rainforest Connection); terrestrial LiDAR for tree biomass and carbon (e.g. Calders et al., Methods in
   Ecology and Evolution, 2015); smell loss as an early sign of Parkinson's (e.g. Doty, Nature Reviews Neurology, 2012). */
st(`
  <h1 class="t">Why build it?</h1>
  <div class="d10-col">
    <div class="d10-crea-kinds d10-purpose">
      <div class="b" data-step="1"><b>Feel the data</b><span>1.2 billion data points become something you can see, hear and smell</span></div>
      <div class="b" data-step="2"><b>Archive what is disappearing</b><span>record rare plants, like a moonflower that blooms for a single night, before they are gone</span></div>
      <div class="b" data-step="3"><b>Collect without harm</b><span>capture a scent from the air around a flower, without picking it</span></div>
    </div>
  </div>
  ${cite('DATALAND blog (July 2026) · dataland.art/data-scent')}
`);

st(`
  <h1 class="t">The same tools, beyond art</h1>
  <div class="d10-col">
    <table class="d10-tbl d10-beyond">
      <tr><th>Data</th><th>Another use</th></tr>
      <tr class="b" data-step="1"><td>Sound</td><td>Microphones in the canopy count endangered species and detect chainsaws or gunshots in real time</td></tr>
      <tr class="b" data-step="2"><td>3D scans</td><td>Laser scans measure each tree, to estimate how much carbon a forest stores</td></tr>
      <tr class="b" data-step="3"><td>Scent</td><td>Losing the sense of smell can be an early sign of Parkinson’s, so precise smell tests could help early screening</td></tr>
    </table>
    <div class="d10-gnote b" data-step="4">Which of these would you build?</div>
  </div>
  ${cite('Examples of the same kinds of tools in other fields, not the studio’s work: Rainforest Connection · Calders et al. (2015) · Doty (2012)')}
`);

/* The tools, stage by stage (Shreya, 2026-11-13; moved here from system.js on 2026-11-16 so it closes the LNM section). Only what sources confirm: Dezeen (NYC: StyleGAN, people removed),
   refikanadol.com and Towards Data Science (Unsupervised: StyleGAN2-ADA, 1024-d embeddings), MoMA press release (camera,
   weather station, media wall), Google Cloud case study (Large Nature Model: Vertex AI, Cloud Storage, BigQuery, GPUs),
   the studio's own GTC video (NVIDIA Picasso fine-tuned), AV Interactive (DGX A100 at GTC 2024), Vimeo (16K film). */
const D10_TOOLS = [
  ['Data', 'Google Cloud Storage and BigQuery hold the archive', 'Large Nature Model'],
  ['Curate', 'an algorithm removed every photo with a person (which one is not public)', 'Machine Hallucination: NYC'],
  ['Represent', '1024-dimensional embeddings of the collection', 'Unsupervised'],
  ['Generate', 'StyleGAN · StyleGAN2-ADA · NVIDIA Picasso, fine-tuned on nature', 'NYC · Unsupervised · Large Nature Model'],
  ['Render', 'live data from a ceiling camera and a weather station steers it', 'Unsupervised'],
  ['Compute', 'Google Cloud GPUs and Vertex AI · NVIDIA DGX A100', 'Large Nature Model'],
  ['Display', 'a 16K film on the walls · a giant LED wall in the lobby', 'NYC · Unsupervised'],
];
st(`
  <h1 class="t">What tools did his studio use?</h1>
  <div class="d10-col">
    <table class="d10-tbl d10-tools">
      <tr><th>Stage</th><th>Tool</th><th>Work</th></tr>
      ${D10_TOOLS.map(r => `<tr class="b"><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}
    </table>
  </div>
  ${cite('Not public: their rendering software, the people-removal model, and their training settings.')}
`);
}
