/* PART: localization (Object Recognition). Owner: Shreya.
   Three-step pipeline, proposal strategies, NMS (scene), evaluation (scene). */
{
section('3. The task ladder');

st(`
  <h1 class="t">Localization: a common pipeline</h1>
  <div class="flow">
    <div class="step b" data-step="1"><b>Propose</b><span class="label">candidate boxes</span></div>
    <div class="arrow b" data-step="2">→</div>
    <div class="step b" data-step="2"><b>Classify</b><span class="label">each box</span></div>
    <div class="arrow b" data-step="3">→</div>
    <div class="step b" data-step="3"><b>Post-process</b><span class="label">remove redundant boxes</span></div>
  </div>
`, { notes: [
  "(draft) Localization outputs a set of boxes with classes. The common recipe has three steps.",
  "(draft) First, propose candidate boxes.",
  "(draft) Second, loop over the boxes and classify each patch.",
  "(draft) Third, post-process to remove redundant detections."
]});

st(`
  <h1 class="t">Where do the boxes come from?</h1>
  <div class="or-cards or-c2">
    <div class="or-card b"><div class="lead"><b>Window scanning</b></div><div class="label">Every position, over an image pyramid</div></div>
    <div class="or-card b"><div class="lead"><b>Selective search</b></div><div class="label">A cheap stage proposes, a strong classifier checks</div></div>
    <div class="or-card b"><div class="lead"><b>Cascades</b></div><div class="label">Spend computation where the object is likely. Scanning: 1 level. Selective search: 2</div></div>
    <div class="or-card b"><div class="lead"><b>Whole image at once</b></div><div class="label">YOLO: predict from the full image</div></div>
  </div>
  ${cite('Uijlings et al. (2013) · Viola &amp; Jones (2001) · Fleuret &amp; Geman (2001) · Redmon et al. (2016)')}
`, { notes: [
  "(draft) Four strategies, in roughly historical order.",
  "(draft) Window scanning runs a classifier at every position, over an image pyramid. Invariance to translation and scale comes from the search itself.",
  "(draft) Selective search uses a cheap first stage to propose regions, and a stronger classifier checks only those. The book says this is loosely motivated by human visual attention: Treisman and Gelade, Wolfe, and Koch and Ullman.",
  "(draft) Cascades, as in Viola and Jones or Fleuret and Geman, spend computation on regions likely to contain the object. The book treats window scanning as a cascade with one level and selective search as a cascade with two.",
  "(draft) YOLO looks at the whole image at once. The book notes it can be less accurate than some scanning methods but more efficient."
]});

sc('nms', 'scenes/nms.html');

sc('prCurve', 'scenes/pr-curve.html');
sc('threshold', 'scenes/threshold.html');
}
