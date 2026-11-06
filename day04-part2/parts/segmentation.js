/* PART: segmentation (Object Recognition). Owner: Shreya.
   Semantic segmentation, the metric trap (scene), instance segmentation. */
{
section('3. The task ladder');

const ENCDEC = `<svg viewBox="0 0 520 210">
  <g fill="#e2e8f0" stroke="#0f172a" stroke-width="3">
    <path d="M60 15L120 50V160L60 195Z"/><path d="M130 55L190 80V130L130 155Z"/>
    <path d="M330 130L390 155V55L330 80Z" transform="translate(0,0)"/><path d="M400 50L460 15V195L400 160Z"/>
    <rect x="205" y="85" width="110" height="40"/>
  </g>
  <text x="90" y="110" text-anchor="middle" font-size="18" fill="#0f172a">enc</text>
  <text x="430" y="110" text-anchor="middle" font-size="18" fill="#0f172a">dec</text>
  <text x="260" y="112" text-anchor="middle" font-size="18" fill="#0f172a">features</text>
</svg>`;

st(`
  <h1 class="t">Semantic segmentation</h1>
  <div class="or-split">
    <div class="b">${ENCDEC}<div class="label" style="text-align:center">Encoder-decoder (SegNet)</div></div>
    <div class="or-list">
      <div class="lead b">A class for every pixel</div>
      <div class="lead b">Per-pixel cross-entropy</div>
      <div class="lead b">Handles stuff and wiry objects</div>
    </div>
  </div>
  ${cite('Badrinarayanan et al. (2015) · After Ch. 50, Fig. 50.22')}
`, { notes: [
  "(draft) Boxes fit long, thin or boundary-less things badly. So the next rung drops boxes and labels pixels.",
  "(draft) The usual architecture is an encoder-decoder, for example SegNet. It maps an image to an image of the same size.",
  "(draft) The output is one class for every pixel.",
  "(draft) The loss is cross-entropy summed over pixels.",
  "(draft) It handles stuff such as grass and sky, and irregular objects that a box cannot fit."
]});

sc('pixelMetrics', 'scenes/pixel-metrics.html');

st(`
  <h1 class="t">Instance segmentation</h1>
  <div class="flow b" style="margin:auto 0 1vh">
    <div class="step"><b>Propose boxes</b></div><div class="arrow">→</div>
    <div class="step"><b>Class and box</b></div><div class="arrow">→</div>
    <div class="step"><b>Mask in each box</b></div>
  </div>
  <div class="or-eq b">L = L<sub>cls</sub> + 1(y ≠ 0) (λ<sub>1</sub> L<sub>loc</sub> + λ<sub>2</sub> L<sub>seg</sub>)</div>
  <div class="lead b" style="text-align:center;margin-bottom:auto;margin-top:1vh">Same design, richer outputs: u-v coordinates, parts, 3D shape</div>
  ${cite('He et al. (2017), Mask R-CNN · Gkioxari et al. (2019), Mesh R-CNN')}
`, { notes: [
  "(draft) Semantic segmentation cannot count touching instances. Instance segmentation outputs one mask per object.",
  "(draft) Mask R-CNN style systems first detect boxes, then predict a binary mask inside each box.",
  "(draft) The loss has a class term, a box term and a mask term. The box and mask terms are switched off for background boxes, and the lambdas balance them.",
  "(draft) The same design extends to richer outputs: per-pixel u-v coordinates in the frame of the instance, part segmentation, and 3D shape as in Mesh R-CNN."
]});
}
