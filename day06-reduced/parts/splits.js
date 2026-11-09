/* PART: splits (Day 6 reduced). Google p35-39: Evaluating the model, splits, cross-validation, leakage, averages.
   One Google slide = one slide. Everything that moves is a seeded scene in scenes/splits-*.html;
   shared toy data and drawing in assets/splits/folds.js. */
{
section('Evaluating the model');

/* p35: transition, her title. The sentence is hers, moved here from p36 (technical slides carry cues only). */
st(`
  <h1 class="t">Evaluating the model</h1>
  <div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;justify-content:center">
    <div class="statement b" data-step="1">We know why evaluation is important for any real-world application</div>
  </div>
`);

sc('splitsTts', 'scenes/splits-tts.html');    /* p36 */
sc('splitsCv', 'scenes/splits-cv.html');      /* p37 */
sc('splitsLeak', 'scenes/splits-leak.html');  /* p38 */
sc('splitsAvg', 'scenes/splits-avg.html');    /* p39 */
}
