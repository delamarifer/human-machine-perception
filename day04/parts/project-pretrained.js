/* PART: project-pretrained (Day 4). Owner: Fernanda · Shreya. NOT LOADED: the earlier Section 9 (pretrained-models lab), kept when the lab became the MIT CNN notebook (2026-11-04).
   Section 9, 5 min: the lab as an investigation, five directions, homework. */
{
section('9. Lab');

st(`
  <h1 class="t">Lab: what does it recognise, what does it miss, and why?</h1>
  <div class="d4-grid3" style="grid-template-columns:repeat(5,1fr);gap:1.4vw">
    <div class="d4-card b"><h3>Shape or texture?</h3><div class="label">Cue-conflict images: a cat shape with elephant skin.</div></div>
    <div class="d4-card b"><h3>Background</h3><div class="label">Same object, new background. Does the label change?</div></div>
    <div class="d4-card b"><h3>Robustness</h3><div class="label">Lighting, cropping, viewpoint, blur, compression, a 4-pixel shift.</div></div>
    <div class="d4-card b"><h3>Distribution shift</h3><div class="label">Local streets, household objects (Dollar Street), sketches.</div></div>
    <div class="d4-card b"><h3>Human vs machine</h3><div class="label">Where do people and models disagree? Would a person make this error?</div></div>
  </div>
  <div class="d4-card hi b"><div class="label">Pick one. <b>Write your prediction before you run anything.</b></div></div>
  ${cite('Geirhos et al. (2019), ImageNet-Trained CNNs Are Biased Towards Texture · Azulay &amp; Weiss (2019) · Gapminder Dollar Street')}
`, { notes: [
  "The lab is an investigation, not a tutorial. The goal is to move beyond running a model to asking what its predictions reveal about what it learned.",
  "Shape versus texture: does the model recognise an object by its outline or by its surface? Geirhos and colleagues found ImageNet CNNs lean on texture, unlike people.",
  "Background bias: paste the same object onto a different background. Does the prediction change?",
  "Robustness: lighting, cropping, viewpoint, blur, compression. Or just shift the image by four pixels, as we discussed.",
  "Distribution shift: images unlike the training data. Streets like the ones we used today, household objects from Dollar Street, drawings.",
  "Human versus machine: find cases where you and the model disagree, and ask whether a person would ever make the model's mistake.",
  "Pick one direction per group, and write down your prediction before you run anything. A result you predicted is evidence; a result you explain afterwards is a story."
]});

st(`
  <h1 class="t">Homework</h1>
  <ul class="frag">
    <li class="b">Finish the lab.</li>
    <li class="b">Bring <b>one failure case</b>, with</li>
    <li class="b" style="padding-left:2vw">a hypothesis: which visual feature did the model rely on?</li>
    <li class="b" style="padding-left:2vw">one follow-up test that would check it.</li>
  </ul>
`, { notes: [
  "For next time.",
  "Finish the lab.",
  "And bring one failure case you found.",
  "With a written hypothesis about why it failed: which visual feature do you think the model relied on?",
  "And one test that would confirm or rule out that hypothesis. We will start Day 5 with a few of these."
]});
}
