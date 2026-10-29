/* PART: opening (Day 3). Owner: to decide (see README.md). */
{
section('Title');

st(`
  <div class="center" style="margin:auto">
    <div class="statement" style="font-weight:700;font-size:clamp(2.4rem,4.4vw,4rem)">Image Formation + Processing</div>
    <div class="lead" style="margin-top:3vh">Day 3</div>
    <div class="label" style="margin-top:1.5vh">Fernanda · Shreya</div>
  </div>
`, { blank: false, notes: "(draft) Welcome back. Day 3: image formation and image processing." });

st(`
  <div class="center">
    <div class="question" style="font-size:clamp(2.4rem,4.2vw,3.8rem)">Where does an image come from?</div>
    <div class="lead b" style="margin-top:5vh">And what can we compute from it?</div>
  </div>
`, { notes: [
  "(draft) The question for today: where does an image come from? Before a computer can see anything, light from the world has to land on a sensor and become numbers.",
  "(draft) And once we have those numbers, what can we compute from them? The answer for today is one operation, convolution, that blurs, sharpens and finds edges. It also turns out to look a lot like what neurons in your visual cortex do."
]});
}
