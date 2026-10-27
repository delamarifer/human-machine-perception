/* PART: opening. Owner: Fernanda (see README.md).
   Everything sits inside { … } so constants stay local to this part. */
{
section('Title');

st(`
  <div class="center" style="margin:auto">
    <div class="statement" style="font-weight:700;font-size:clamp(2.4rem,4.4vw,4rem)">Intro to Computer Perception</div>
    <div class="lead" style="margin-top:3vh">Day 1</div>
    <div class="label" style="margin-top:1.5vh">Fernanda · Shreya</div>
  </div>
`, { blank: false, notes:
  "(draft) Welcome, everyone. This is Day 1 of Intro to Computer Perception."
});

/* The question the whole class keeps coming back to. Title first, then the question. */
st(`
  <div class="question center" style="font-size:clamp(2.4rem,4.2vw,3.8rem)">What does it mean to see?</div>
`, { notes:
  "(draft) Before anything else, a question we will come back to all semester: what does it actually mean to see? " +
  "Seeing feels effortless, but today we will see why it is one of the hardest problems a brain, or a computer, has to solve."
});
}
