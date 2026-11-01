/* PART: about-shreya. Owner: Shreya (see README.md).
   One click: the photos together, each a different size. */
{
section('Who we are');

st(`
  <h1 class="t">Shreya</h1>
  <div class="about-shreya b" data-step="1">
    <figure class="ph-scale">
      <img src="assets/about-shreya/scale.jpg" alt="">
      <figcaption class="label">Now · Scale</figcaption>
    </figure>
    <figure class="ph-meta">
      <img src="assets/about-shreya/meta-conscious-lab.jpg" alt="">
      <figcaption class="label">MIT MetaConscious Group</figcaption>
    </figure>
    <figure class="ph-aims">
      <img src="assets/about-shreya/aims-group.jpg" alt="">
      <figcaption class="label">AIMS</figcaption>
    </figure>
    <figure class="ph-door">
      <img src="assets/about-shreya/aims-door.jpg" alt="">
      <figcaption class="label">AIMS</figcaption>
    </figure>
    <figure class="ph-dust">
      <img src="assets/about-shreya/dust.jpg" alt="">
      <figcaption class="label">DUST</figcaption>
    </figure>
    <figure class="ph-holo">
      <img src="assets/about-shreya/holos.jpg" alt="">
      <figcaption class="label">Holographic art</figcaption>
    </figure>
  </div>
  <style>
    .about-shreya{ display:none; }
    .about-shreya.shown{ display:grid; flex:1 1 auto; min-height:0;
      grid-template-columns:1.25fr .72fr .78fr 1.15fr; grid-template-rows:1.2fr 1fr; gap:1vw 1vw; }
    .about-shreya figure{ margin:0; min-width:0; min-height:0; display:flex; flex-direction:column; gap:.3vh; }
    .about-shreya img{ flex:1 1 auto; min-height:0; width:100%; object-fit:cover; object-position:center 30%; display:block; }
    .ph-scale{ grid-column:1 / 3; grid-row:1; }
    .ph-scale img{ object-position:center 42%; }
    .ph-meta{ grid-column:3 / 5; grid-row:1; }
    .ph-aims{ grid-column:1; grid-row:2; }
    .ph-door{ grid-column:2; grid-row:2; }
    .ph-dust{ grid-column:3; grid-row:2; }
    .ph-holo{ grid-column:4; grid-row:2; }
  </style>
`, { notes: [
  "(draft) A short introduction. One click brings up the photos together.",
  "(draft) Scale is where I work now. One sentence on that work. Then the path, one sentence each, and do not linger: AIMS, MIT MetaConscious Group, DUST, holographic art. Each one is a reason perception became the question, not a second talk."
]});
}
