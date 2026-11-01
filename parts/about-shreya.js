/* PART: about-shreya. Owner: Shreya (see README.md).
   First click: where she works now (Scale), one large photo.
   Second click: the path, each photo a different size. */
{
section('Who we are');

st(`
  <h1 class="t">Shreya</h1>
  <figure class="about-shreya-now b" data-step="1">
    <img src="assets/about-shreya/scale.jpg" alt="">
    <figcaption class="label">Now · Scale</figcaption>
  </figure>
  <div class="about-shreya-past b" data-step="2">
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
    .about-shreya-now{ margin:0; flex:1 1 auto; min-height:0; display:flex; flex-direction:column; align-items:center; gap:.6vh; }
    .about-shreya-now img{ flex:1 1 auto; min-height:0; max-width:100%; width:auto; height:100%; object-fit:contain; display:block; }
    .about-shreya-past{ display:none; }
    .about-shreya-past.shown{ display:grid; flex:1 1 auto; min-height:0;
      grid-template-columns:1.25fr .72fr .78fr 1.15fr; grid-template-rows:1.2fr 1fr; gap:1vw 1vw; }
    .stage:has(.about-shreya-past.shown) .about-shreya-now{ display:none; }
    .about-shreya-past figure{ margin:0; min-width:0; min-height:0; display:flex; flex-direction:column; gap:.3vh; }
    .about-shreya-past img{ flex:1 1 auto; min-height:0; width:100%; object-fit:cover; object-position:center 30%; display:block; }
    .ph-scale{ grid-column:1 / 3; grid-row:1; }
    .ph-scale img{ object-position:center 42%; }
    .ph-meta{ grid-column:3 / 5; grid-row:1; }
    .ph-aims{ grid-column:1; grid-row:2; }
    .ph-door{ grid-column:2; grid-row:2; }
    .ph-dust{ grid-column:3; grid-row:2; }
    .ph-holo{ grid-column:4; grid-row:2; }
  </style>
`, { notes: [
  "(draft) A short introduction. Where I work now, then what led there.",
  "(draft) I work at Scale. One sentence on what that work is. Do not linger.",
  "(draft) The rest is the path. AIMS. MIT MetaConscious Group. DUST. Holographic art. Each one is a reason perception became the question, not a second talk."
]});
}
