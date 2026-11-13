/* PART: clues (Day 10, owner: Shreya). Google Slides 5-7. Facts as sourced in the sources slide. No speaker notes.
   The "No research needed" slide was removed (Shreya, 2026-11-13), matching the Google Slides. */
{
section('Clues');

st(`
  <h1 class="t">Work 1 · Machine Hallucination: NYC (2019)</h1>
  <div class="d10-col">
    <ul class="d10-list">
      <li class="b">Over 100 million public photos of New York, cut down to 9.5 million</li>
      <li class="b">Photos with people removed by another algorithm</li>
      <li class="b">Trained with StyleGAN; shown at Artechouse</li>
    </ul>
  </div>
`);

st(`
  <h1 class="t">Work 2 · Unsupervised, MoMA (2022)</h1>
  <div class="d10-col">
    <ul class="d10-list">
      <li class="b">Over 130,000 artworks from MoMA's collection, used with permission</li>
      <li class="b">StyleGAN2-ADA, with 1024-dimensional embeddings</li>
    </ul>
  </div>
`);

st(`
  <h1 class="t">Work 3 · Large Nature Model, Dataland</h1>
  <div class="d10-col">
    <ul class="d10-list">
      <li class="b">Data from the Smithsonian, Natural History Museum, Cornell Lab, iNaturalist</li>
      <li class="b">Hosted on Google Cloud</li>
      <li class="b">Training details are not public: you fill in the gaps</li>
    </ul>
  </div>
`);
}
