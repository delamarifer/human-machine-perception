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
    <li class="b"><b>Our approach</b> Human vision and machine vision, side by side</li>
    <li class="b"><b>By the end</b> Build a system, and say where it fails</li>
    <li class="b"><b>Co-design</b> Your interests shape what we do next</li>
  </ul>
`, { notes: [
  "(draft) How the three weeks actually run. Three ideas. The syllabus is the longer version.",
  "(draft) Hands-on, from pixels to learned models. At each step we ask the question from this morning: what does the system actually receive, and what does it infer. You build the thing, and you also say where it fails.",
  "(draft) By the end you can load and change images in Python, use a pretrained model, and build an application of your own. You present the design, the result, and the limits. Labs, homework, and that project are the work of the course.",
  "(draft) Co-design means we learn what you already know and what you want to build. The questionnaire today is the start. Later days, and the final project, bend toward those interests. We shape the class together."
]});

/* What a class day looks like: one stage per click. */
st(`
  <h1 class="t">What a day looks like</h1>
  <div class="flow">
    <div class="step b" data-step="1"><b>Intro question</b><span class="label">to start thinking</span></div>
    <div class="arrow b" data-step="2">→</div>
    <div class="step b" data-step="2"><b>Lecture</b><span class="label">the concepts</span></div>
    <div class="arrow b" data-step="3">→</div>
    <div class="step b" data-step="3"><b>Lab</b><span class="label">notebook today</span></div>
    <div class="arrow b" data-step="4">→</div>
    <div class="step b" data-step="4"><b>Exit question</b><span class="label">what stuck?</span></div>
  </div>
`, { notes: [
  "(draft) Every class follows the same rhythm.",
  "(draft) We start with an intro question.",
  "(draft) Then a short lecture on the concepts.",
  "(draft) Then a lab. Today that is the checker-shadow image as an array. Tomorrow is the system that recovers boxes.",
  "(draft) And we close with an exit question."
]});

}
