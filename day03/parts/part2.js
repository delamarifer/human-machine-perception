/* PART: part2 (Day 3). Owner: Shreya (the image half). The Part 2 divider, then the image half's opening
   question, moved here from parts/opening.js when Day 3 started with metamers (2026-11-03). */
{
section('Title');

st(`
  <div class="center" style="margin:auto">
    <div class="label">Part 2</div>
    <div class="statement" style="font-weight:700;font-size:clamp(2.4rem,4.4vw,4rem);margin-top:1vh">Image formation and processing</div>
  </div>
`, { notes: "(draft) Part 2: where images come from, and what we can compute from them." });

st(`
  <div class="center">
    <div class="question" style="font-size:clamp(2.4rem,4.2vw,3.8rem)">Where does an image come from?</div>
    <div class="lead b" style="margin-top:5vh">And what can we compute from it?</div>
  </div>
`, { notes: [
  "(draft) The question for this part: where does an image come from? Before a computer can see anything, light from the world has to land on a sensor and become numbers.",
  "(draft) And once we have those numbers, what can we compute from them? The answer for today is one operation, convolution, that blurs, sharpens and finds edges. It also turns out to look a lot like what neurons in your visual cortex do."
]});
}
