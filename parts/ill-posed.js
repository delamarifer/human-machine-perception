/* PART: ill-posed. Owner: Fernanda (see README.md).
   Outline slide 7 asked: "animate the different versions". The scene turns one line drawing into
   several 3D shapes along the lines of sight, then collapses them back to the same image.
   It opens on the classic figure and rebuilds it in the same layout (eye below, vertical lines of sight). */
{
section('Seeing');

/* From Fernanda's "Untitled presentation.pptx" (2026-10-28): the question, then what the machine gets. */
st(`
  <div class="center">
    <div class="question" style="font-size:clamp(2.4rem,4.2vw,3.8rem)">Why is vision hard?</div>
  </div>
`, { title: 'Why is vision hard?', notes: [
  "(to write) Why is vision hard?"
]});

/* The input: the numbers first (what the machine gets), then the same patch as we see it, then the point. */
st(`
  <style>
    .ill-posed-input{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1fr 1.55fr; gap:4vw; align-items:center;
      transition:opacity .9s ease, filter .9s ease; }
    .ill-posed-input .col{ height:100%; min-height:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:1.5vh; }
    .ill-posed-input img{ max-width:100%; max-height:52vh; object-fit:contain; display:block; }
    .ill-posed-input .label{ text-align:center; }
    .stage:has(.ill-posed-pop.shown) .ill-posed-input{ opacity:.22; filter:blur(2px); }
    .ill-posed-pop{ position:absolute; left:50%; top:55%; translate:-50% -50%; width:80vw; }
  </style>
  <h1 class="t">The input</h1>
  <div class="ill-posed-input">
    <div class="col b" data-step="2">
      <div class="label">What we see</div>
      <img src="assets/ill-posed/input-what-we-see.png" alt="A small grayscale image patch on m, n axes">
    </div>
    <div class="col b" data-step="1">
      <div class="label">What the machine gets</div>
      <img src="assets/ill-posed/input-pixel-values.png" alt="The same patch as a matrix I of pixel values">
    </div>
  </div>
  <div class="popquote ill-posed-pop b" data-step="3">The camera is a measurement device, not a vision system</div>
  ${cite('Figure: source to add')}
`, { notes: [
  "(to write) The input.",
  "(draft) This is what the machine gets: a grid of numbers, one brightness value per pixel.",
  "(draft) And this is what we see when those same numbers are drawn as gray levels.",
  "(draft) The camera is a measurement device, not a vision system."
]});

sc('illPosed', 'scenes/ill-posed-shapes.html');

/* The classic figure now opens the scene (beat 1), so the scene's own animation can mirror its layout. */
}
