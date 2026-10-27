/* PART: course. Owner: Shreya (see README.md). Outline slides 18-20.
   Most of this is still to write: replace each .todo with a few cue words, and put the
   full explanation in the notes (one passage per click). */
{
section('The course');

st(`
  <div class="statement center" style="font-weight:700">Course philosophy &amp; structure</div>
`, { notes: "(draft) Now that we've seen why vision is hard, and why it's an exciting time, let's talk about how this course works." });

st(`
  <h1 class="t">Course philosophy</h1>
  <ul class="frag">
    <li class="b"><b>Our approach to vision</b><div class="todo">brains and machines side by side?</div></li>
    <li class="b"><b>Goals and outcomes</b><div class="todo">what you can do by the end</div></li>
    <li class="b"><b>Co-design</b><div class="todo">how students shape the course</div></li>
    <li class="b"><b>AI in this course</b><div class="todo">how to use it, and how not to</div></li>
  </ul>
`, { notes: [
  "(to write) Course philosophy.",
  "(to write) Approach to vision.",
  "(to write) Goals and outcomes for the class.",
  "(to write) Co-design.",
  "(to write) AI in this course and how to go about using it."
]});

/* What a class day looks like: one stage per click. */
st(`
  <h1 class="t">What a day looks like</h1>
  <div class="flow">
    <div class="step b" data-step="1"><b>Intro question</b><span class="label">to start thinking</span></div>
    <div class="arrow b" data-step="2">→</div>
    <div class="step b" data-step="2"><b>Lecture</b><span class="label">the concepts</span></div>
    <div class="arrow b" data-step="3">→</div>
    <div class="step b" data-step="3"><b>Lab</b><span class="label">build it in code</span></div>
    <div class="arrow b" data-step="4">→</div>
    <div class="step b" data-step="4"><b>Exit question</b><span class="label">what stuck?</span></div>
  </div>
`, { notes: [
  "(draft) Every class follows the same rhythm.",
  "(draft) We start with an intro question.",
  "(draft) Then a short lecture on the concepts.",
  "(draft) Then a lab, where you build what we just talked about.",
  "(draft) And we close with an exit question."
]});

st(`
  <h1 class="t">Course structure</h1>
  <ul class="frag">
    <li class="b"><b>Topics by week</b><div class="todo">week-by-week list</div></li>
    <li class="b"><b>Resources</b><div class="todo">readings, tutorial practice</div></li>
    <li class="b"><b>Website and help</b><div class="todo">URL, office hours, where to ask</div></li>
  </ul>
`, { notes: [
  "(to write) Course structure.",
  "(to write) Topics per week.",
  "(to write) Resources: readings, tutorial practice, etc.",
  "(to write) Website, and where to go for help."
]});
}
