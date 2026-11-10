/* PART: future (Day 6 reduced). Google deck p55-59 (as of Round 2), one HTML slide each. No speaker notes.
   Figures in assets/future/: ColorizeBot (Foundations of Computer Vision Fig. 35.2, CC BY-NC-ND 4.0, whole);
   CLEAR Fig. 1 (project page: CC BY); DROID, Open X-Embodiment, RoboCasa (arXiv: CC BY 4.0, cropped);
   hand photo (John Beans, Wikimedia Commons, CC BY 2.0, cropped). Crop boxes were measured by script from each image. */
{
section('Transfer Learning');  // end of the Transfer Learning section (Shreya, 2026-11-09)

const fuA = (href, t) => d6Link(href, t);

/* p56: her line, then two examples, a figure each. */
st(`
  <style>
    .future-ex{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1fr 1.7fr; gap:2vw; align-items:center; }
    .future-excol{ display:flex; flex-direction:column; gap:1vh; min-height:0; height:100%; justify-content:center; }
    .future-excol img{ width:100%; min-height:0; object-fit:contain; display:block; }
    .future-excol .label{ text-align:center; }
    .future-center{ flex:1 1 auto; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; gap:4vh; }
    .future-qs{ flex:1 1 auto; display:flex; flex-direction:column; justify-content:center; gap:4.5vh; }
  </style>
  <h1 class="t">Thinking about future data or uses</h1>
  <div class="lead b" data-step="1">Retroactively, as you build, can you predict forward?</div>
  <div class="future-ex">
    <div class="future-excol b" data-step="2">
      <img src="assets/future/colorizebot_examples.jpg" alt="ColorizeBot outputs on an 1849 photo of Chopin and a 1933 photo of a thylacine, both mostly sepia">
      <div class="label">ColorizeBot: ImageNet photos in training, old photographs in use</div>
    </div>
    <div class="future-excol b" data-step="3">
      <img src="assets/future/clear_teaser.jpg" alt="CLEAR: computers, cameras and cosplay changing in Flickr photos from 2004 to 2014">
      <div class="label">CLEAR: Flickr, 2004 to 2014</div>
    </div>
  </div>
  ${rdCite(fuA('https://visionbook.mit.edu/bias_and_shift.html', 'Foundations of Computer Vision, Ch. 35, Fig. 35.2'), 2)}
  <div class="cite b" data-step="3" style="margin-top:0;padding-top:0">${fuA('https://arxiv.org/abs/2201.06289', 'Lin et al., CLEAR (2021), Fig. 1')}, CC BY</div>
`);

/* p57: transition, her words. */
st(`
  <h1 class="t">Can research combat the need for real-data?</h1>
  <div class="future-center"><div class="statement b" data-step="1">Discussion</div></div>
`);

/* p57 RL Environments: removed (Shreya, 2026-11-10). It is in git history (commit 8b68aa7) if it should come back. */

/* p58: scene. Scale quotes, human vs robot hands, the gaps. */
sc('futureGap', 'scenes/future-gap.html');

/* p59: discussion, one question per click. Question wording is a draft for Fernanda. */
st(`
  <h1 class="t">Extending it to the physical world</h1>
  <div class="future-qs">
    <div class="statement b" data-step="1">Discussion</div>
    <div class="question b" data-step="1">How would you collect the data robots are missing, and what would your method still fail to cover?</div>
    <div class="question b" data-step="2">What new algorithm could let a robot learn a skill from a handful of examples, without big data at all?</div>
  </div>
`);
}
