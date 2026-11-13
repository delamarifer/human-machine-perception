/* PART: reveal (Day 10, owner: Shreya). Report back, then ONE animated pipeline slide (Shreya, 2026-11-13) that replaces the
   three deep-dive tables, the backbone slide and "You already know every stage". Click 1: the six stages. Clicks 2-4: each
   work fills the stages, replacing the one before. Click 5: our lab fills the same stages. Upright text is documented;
   italic text is our reconstruction. No day labels (Shreya). No speaker notes. */
{
section('Reveal');

st(`
  <h1 class="t">Report back</h1>
  <div class="d10-col">
    <ul class="d10-list">
      <li class="b">Show one result, one equation and one finding</li>
      <li class="b">Which lab did each piece come from?</li>
    </ul>
  </div>
`);

/* each row: [name, [Data, Curate, Represent, Generate, Render, Display]]; wrap a guess in <i> */
const D10_ROWS = [
  ['Machine Hallucination: NYC (2019)', [
    'over 100M public photos of New York',
    'people removed by an algorithm: 9.5M left',
    '<i>embeddings, clustered by place</i>',
    'StyleGAN',
    '<i>a walk between clusters</i>, a 16K film',
    '<i>projectors, one homography each</i>']],
  ['Unsupervised, MoMA (2022)', [
    'over 130,000 artworks, with permission',
    '<i>crop and clean the scans</i>',
    '1024-dimensional embeddings',
    'StyleGAN2-ADA',
    'real time, steered by a camera and the weather',
    'one giant screen in the lobby']],
  ['Large Nature Model, Dataland', [
    'museum and citizen-science archives, plus live feeds',
    '<i>species labels, balance rare species</i>',
    '<i>one embedding for images and sounds</i>',
    '<i>a generator conditioned on that embedding</i>',
    '<i>live data steers what it makes</i>',
    '<i>room-sized LED screens</i>']],
  ['Our lab, today', [
    'Fashion-MNIST: 60,000 clothes',
    'a CNN and CLIP remove the shirts',
    'CNN and CLIP embeddings, compared with RSA',
    'a VAE or a GAN',
    'slerp, steered toward dresses',
    'a homography onto a wall']],
];
const D10_STAGES = ['Data', 'Curate', 'Represent', 'Generate', 'Render', 'Display'];

st(`
  <h1 class="t">One pipeline, four builds</h1>
  <div class="d10-col">
    <div class="d10-pipe">
      <div class="d10-pipe-head b" data-step="1">${D10_STAGES.map(s => `<div>${s}</div>`).join('')}</div>
      <div class="d10-layers">
        ${D10_ROWS.map(([name, cells], k) => `
          <div class="d10-layer b${k === D10_ROWS.length - 1 ? ' d10-ours' : ''}" data-step="${k + 2}">
            <div class="d10-layer-name">${name}</div>
            <div class="d10-layer-cells">${cells.map(c => `<div>${c}</div>`).join('')}</div>
          </div>`).join('')}
      </div>
    </div>
  </div>
  ${cite('Upright: documented by the studio or the press. <i>Italic: our reconstruction.</i>')}
`);
}
