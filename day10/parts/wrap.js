/* PART: wrap (Day 10, owner: Shreya). Google Slides 17-19. No speaker notes. */
{
section('Wrap-up');

st(`
  <h1 class="t">Why does it look alive?</h1>
  <div class="d10-col">
    <ul class="d10-list">
      <li class="b">Motion perception: smooth change reads as living</li>
      <li class="b">Perception as inference: we find faces and places in noise (Day 1)</li>
    </ul>
  </div>
`);

st(`
  <h1 class="t">Whose data, what cost, and is it any good?</h1>
  <div class="d10-col">
    <ul class="d10-list">
      <li class="b">Consent: who agreed to be in the archive?</li>
      <li class="b">Cost: compute and energy</li>
      <li class="b">Evaluation: how do you judge art with no ground truth?</li>
    </ul>
  </div>
`);

const L = (href, t) => `<a href="${href}" target="_blank" rel="noopener">${t}</a>`;
st(`
  <h1 class="t">Sources</h1>
  <div class="d10-col">
    <ul class="d10-list b">
      <li>${L('https://www.dezeen.com/2019/11/20/machine-hallucination-artechouse-refik-anadol-new-york/', 'Dezeen, 2019')} · ${L('https://segd.org/?p=6270', 'SEGD')} · ${L('https://vimeo.com/450313024', 'Vimeo')}: Machine Hallucination: NYC</li>
      <li>${L('https://refikanadol.com/iconiq/', 'refikanadol.com')} · ${L('https://towardsdatascience.com/free-from-limitations-the-validation-of-machine-hallucinations-at-moma-7d56a38c335a', 'Towards Data Science')} · ${L('https://press.moma.org/wp-content/uploads/2022/11/MoMA_RefikAnadol-Unsupervised_FINAL.pdf', 'MoMA press release')}: Unsupervised</li>
      <li>${L('https://dataland.art/about/large-nature-model', 'Dataland')} · ${L('https://dataland.art/blog/large-nature-model-data-collection', 'Dataland blog')} · ${L('https://news.artnet.com/art-world/refik-anadol-living-archive-nature-2419482', 'Artnet')}: Large Nature Model</li>
    </ul>
  </div>
`);
}
