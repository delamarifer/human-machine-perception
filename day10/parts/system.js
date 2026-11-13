/* PART: system (Day 10, owner: Shreya). Google Slides 6-8 (2026-11-13): "Reverse-engineer the system" and "How do outputs
   become an artwork?" (both title only in the Google Slides, shown here as statements), then "From archive to artwork",
   posed as a question (Shreya's comment: context first, then the question), then "What tools did his studio use?"
   (added at Shreya's request, 2026-11-13). No speaker notes. */
{
section('System');

st(`
  <div class="center" style="margin:auto">
    <div class="statement" style="font-weight:700;font-size:clamp(2rem,3.7vw,3.3rem)">Reverse-engineer the system</div>
  </div>
`);

st(`
  <div class="center" style="margin:auto">
    <div class="statement" style="font-weight:700;font-size:clamp(2rem,3.7vw,3.3rem)">How do outputs become an artwork?</div>
  </div>
`);

st(`
  <h1 class="t">From archive to artwork</h1>
  <div class="d10-col">
    <div class="d10-io">
      <div class="d10-box b" data-step="1"><small>In</small>Over 100 million public photos of New York</div>
      <div class="d10-arrow b" data-step="3">→</div>
      <div class="d10-box d10-mid b" data-step="3">What happens in between?</div>
      <div class="d10-arrow b" data-step="3">→</div>
      <div class="d10-box b" data-step="2"><small>Out</small>A film across the walls of a room</div>
    </div>
    <div class="d10-flow">
      <div class="b" data-step="4">Data<span>collect it</span></div>
      <div class="b" data-step="5">Curate<span>filter it</span></div>
      <div class="b" data-step="6">Represent<span>embed it</span></div>
      <div class="b" data-step="7">Generate<span>learn to make more</span></div>
      <div class="b" data-step="8">Render<span>move through it</span></div>
      <div class="b" data-step="9">Display<span>fit it to the room</span></div>
    </div>
  </div>
`);

/* The tools, stage by stage (Shreya, 2026-11-13). Only what sources confirm: Dezeen (NYC: StyleGAN, people removed),
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
