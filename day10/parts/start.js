/* PART: start (Day 10, owner: Shreya). From the Google Slides outline, slides 1-3, with Shreya's comments (2026-11-12):
   slide 2 "insert a video from this", and "the following slide can be a few of just his work";
   slide 3 "I will pose this as a question to get students to participate. but they probably need context before".
   Videos are the studio's own Vimeo uploads (titles checked with Vimeo oEmbed, 2026-11-12). No speaker notes. */
{
section('Start');

st(`
  <div class="center" style="margin:auto">
    <div class="statement" style="font-weight:700;font-size:clamp(2rem,3.7vw,3.3rem)">Reverse-Engineering Refik Anadol</div>
    <div class="label" style="margin-top:2.2vh">Day 10 · From finished artwork back to the pipeline</div>
  </div>
`);

/* Slide 2: the hook. Machine Hallucination: NYC, 5 min 36 s on Vimeo; play about 2 minutes. */
st(`
  <h1 class="t">What would you need to build this?</h1>
  <div class="d10-col">
    ${d10Vimeo('450313024', 'Machine Hallucination: NYC (Refik Anadol Studio)', 'Machine Hallucination: NYC <small>Refik Anadol Studio, 2019</small>')}
  </div>
`);

/* Slide 2b (Shreya's reply on slide 2): a few of his works, one per click. */
st(`
  <h1 class="t">A few more of his works</h1>
  <div class="d10-col">
    <div class="d10-gallery">
      ${d10Vimeo('778348607', 'Unsupervised, MoMA (Refik Anadol Studio)', 'Unsupervised <small>MoMA, New York, 2022</small>')}
      ${d10Vimeo('952896412', 'Large Nature Model: Rainforest (Refik Anadol Studio)', 'Large Nature Model: Rainforest <small>NVIDIA GTC, 2024</small>')}
      ${d10Vimeo('952230679', 'Echoes of the Earth: Living Archive (Refik Anadol Studio)', 'Echoes of the Earth: Living Archive <small>Serpentine North, London</small>')}
    </div>
  </div>
`);

/* Slide 3, posed as a question: context first (what goes in, what comes out), then the question, then the six stages one per click. */
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
}
