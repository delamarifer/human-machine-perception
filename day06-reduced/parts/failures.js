/* PART: failures (Day 6 reduced). Google deck p2-6. Her text and the images only; no speaker notes.
   Book figures in assets/failures/ are copied from day06/assets/visionbook-ch35/ (CC BY-NC-ND 4.0): shown whole;
   covers only fade away to reveal parts, and rings sit on top of the figure. Never crop or edit them.
   All figure coordinates below were measured from the image files with a script, not by eye. */
{
section('Why models fail');

const failFig = 'assets/failures/';
const failSrc = (fig) => d6Link('https://visionbook.mit.edu/bias_and_shift.html', `Foundations of Computer Vision, Ch. 35, ${fig}`)
  + ' · ' + d6Link('https://creativecommons.org/licenses/by-nc-nd/4.0/', 'CC BY-NC-ND 4.0') + ', unmodified';

const failStyle = `<style>
  .failures-region{ position:relative; flex:1 1 auto; min-height:0; container-type:size; }
  .failures-cic{ position:absolute; left:0; top:0; width:100%; height:100%; object-fit:contain; object-position:left center;
    transition:opacity .6s ease, transform .6s ease, width .7s ease; }
  .failures-region:has(.failures-bot.shown) .failures-cic{ width:41cqw; }
  .failures-bot{ --w:min(56cqw, 168.19cqh); position:absolute; right:0; top:0; bottom:0; margin:auto 0; width:var(--w); height:calc(var(--w) / 1.6819); }
  .failures-bot img{ width:100%; height:100%; display:block; }
  .failures-cover{ position:absolute; background:#fff; }
  .failures-cover.b{ opacity:1; transform:none; transition:opacity .7s ease; }
  .failures-cover.b.shown{ opacity:0; }
  .failures-figwrap{ flex:1 1 auto; min-height:0; display:flex; flex-direction:column; }
  .fw .failures-ring{ position:absolute; border:3px solid var(--ink); border-radius:50%; box-shadow:0 0 0 2px #fff, inset 0 0 0 2px #fff; }
  .failures-side{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1.75fr 1fr; grid-template-rows:minmax(0, 1fr); gap:2.6vw; align-items:center; }
  .failures-side .failures-figwrap{ height:100%; }
  .failures-transition{ margin:auto; text-align:center; font-size:clamp(2rem, 3.7vw, 3.3rem); }
</style>`;

/* p2: one street corner, each parameter changes it. A scene, so the same photo can move between beats. */
sc('failuresParams', 'scenes/failures-params.html');

/* p3: colorization on the photos it knows, then on the ones the public sent.
   colorizebot_examples.jpg: white gap between the two photos spans x = 936 to 1142 of 2400; the cover starts inside it. */
st(`${failStyle}
  <h1 class="t">Why do models fail in the real world?<br>Incomplete dataset</h1>
  <div class="failures-region">
    <img class="failures-cic b" data-step="1" src="${failFig}CIC_teaser_v5.jpg" alt="Figure 35.1: pairs of a grayscale photo and the model's colorized output: croquet balls, a photographer, a mountain, a boy with a cockatoo, a ladybug, a fish, a rooster, a dog, a butterfly">
    <div class="failures-bot b" data-step="2">
      <img src="${failFig}colorizebot_examples.jpg" alt="Figure 35.2: ColorizeBot outputs for a photo of Chopin and a photo of a thylacine, both mostly sepia">
      <div class="failures-cover b" data-step="3" style="left:43.33%;top:0;width:56.67%;height:100%"></div>
    </div>
  </div>
  ${rdCite(failSrc('Fig. 35.1, from Zhang, Isola and Efros (ECCV 2016) · Fig. 35.2 (Reddit ColorizeBot)'))}
`);

/* p4: pink under every dog's mouth, then the training dogs it came from.
   dogs_with_tongues.jpg is 2400 x 913. The divider is at x = 1418 and the column is white from 1346, so the cover starts at 1400.
   Tongue boxes [x0, y0, x1, y1] are the pink pixels found by the detection script. */
const failRing = ([x0, y0, x1, y1], pad, step) => ({ k: 'failures-ring', step,
  r: [(x0 - pad)/2400, (y0 - pad)/913, (x1 - x0 + 2*pad)/2400, (y1 - y0 + 2*pad)/913] });
const failColorized = [[206, 531, 281, 583], [1136, 480, 1213, 550]];
const failTraining = [[1621, 365, 1653, 381], [1857, 394, 1892, 426], [2230, 330, 2276, 380], [1806, 713, 1823, 729], [2162, 642, 2194, 672]];

st(`
  <h1 class="t">Why do models fail in the real world?<br>Misapplied parameter</h1>
  <div class="failures-figwrap b" data-step="1">
    ${rfig(failFig + 'dogs_with_tongues.jpg', 2400/913, [
      { k: 'cov', r: [1400/2400, 0, 1000/2400, 1], step: 3 },
      ...failColorized.map(b => failRing(b, 30, 2)),
      ...failTraining.map(b => failRing(b, 24, 4)),
    ])}
  </div>
  ${rdCite(failSrc('Fig. 35.3'))}
`);

/* p5: Name That Dataset. datasetsJeopardy.jpg is 2400 x 1703; the white gap before the names spans x = 1852 to 1989, the cover starts inside it. */
st(`
  <h1 class="t">This is where the concept of dataset-biases come in</h1>
  <div class="failures-side">
    <div class="failures-figwrap b" data-step="1">
      ${rfig(failFig + 'datasetsJeopardy.jpg', 2400/1703, [{ k: 'cov', r: [1900/2400, 0, 500/2400, 1], step: 2 }])}
    </div>
    <div class="statement b" data-step="3"><b>bias is present in all datasets</b></div>
  </div>
  ${rdCite(failSrc('Fig. 35.8, modified from Torralba and Efros (CVPR 2011)'))}
`);

/* p6: transition, her title only. */
st(`<h1 class="t failures-transition">How do we improve these failure modes?</h1>`);
}
