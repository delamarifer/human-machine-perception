/* PART: limits (Day 5 Plan B). Owner: Fernanda. Video 4:10 to 5:05: cost at high resolution; data hunger. */
{
section('3. ViT and CNN');
sc('planbCost', 'scenes/planb-cost.html');

st(`<style>
  .planb-two{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1fr 1fr; gap:3vw; align-items:stretch; margin:auto 0; flex:0 0 auto; }
  .planb-card{ border:2px solid var(--ink); border-radius:16px; padding:3.4vh 2vw; display:flex; flex-direction:column; gap:1.6vh; }
  .planb-card > b{ font-size:clamp(1.5rem, 2.4vw, 2.2rem); }
</style>
  <h1 class="t">Vision Transformers need a lot of data</h1>
  <div class="planb-two">
    <div class="planb-card b" data-step="1"><b>Small dataset</b><div class="lead">CNNs do better</div>
      <div class="label">locality is built in, so less has to be learned</div></div>
    <div class="planb-card b" data-step="2"><b>Very large dataset</b><div class="lead">Vision Transformers catch up and pass them</div>
      <div class="label">they learn from data what a CNN assumes</div></div>
  </div>
  <div class="question b" data-step="3">What might this say about how people learn to see?</div>
  ${cite('Dosovitskiy et al. (2021), An Image is Worth 16x16 Words')}
`, { notes: [
  "(draft) Title only. The video's last point is about data.",
  "(draft) With a small amount of training data, Vision Transformers cannot compete with CNNs. The CNN's built-in assumption, that nearby pixels belong together, does part of the work for it, so it has less to learn.",
  "(draft) With a very large dataset, Vision Transformers catch up and pass them. The original paper showed this: trained on ImageNet alone, the Vision Transformer did worse than comparable CNNs, but pretrained on much larger datasets it did better. The idea: given enough data, the model learns for itself what the CNN had to assume.",
  "(draft) A question for discussion, in the spirit of this course, and not from the video: a newborn does not see millions of labeled images. What does that suggest about the assumptions built into human vision?"
]});
}
