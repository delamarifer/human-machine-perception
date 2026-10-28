/* PART: homework-review (Day 4). Owner: to decide (see README.md). Plan: 10 min.
   The homework is Day 3's (plan/course-plan.md): read, convolution/math practice, continue the PSET. */
{
section('Homework review');

st(`
  <h1 class="t">Homework review</h1>
  <ul class="frag">
    <li class="b">Reading: Ch. 5-7</li>
    <li class="b">Convolution practice</li>
    <li class="b">Problem set: where are you?</li>
  </ul>
  <div class="todo b">Which questions to go over: decide after reading the submissions</div>
`, { notes: [
  "(draft) Let us start with the homework from yesterday.",
  "(draft) The reading, chapters 5 to 7.",
  "(draft) The convolution and math practice.",
  "(draft) And the problem set: where is everyone, and what is blocking you?",
  "(to write) The questions we go over, once we have read the submissions."
]});

/* Bridge: a filter bank gives more numbers than the image had. */
st(`
  <h1 class="t">From yesterday to today</h1>
  <div class="flow">
    <div class="step b" data-step="1"><b>Filters</b><span class="label">yesterday</span></div>
    <div class="arrow b" data-step="2">→</div>
    <div class="step b" data-step="2"><b>Many responses per pixel</b><span class="label">a filter bank</span></div>
    <div class="arrow b" data-step="3">→</div>
    <div class="step b" data-step="3"><b>What to keep?</b><span class="label">today</span></div>
  </div>
`, { notes: [
  "(draft) How yesterday connects to today.",
  "(draft) Yesterday we built filters: blur, edges, receptive fields like the ones in V1.",
  "(draft) Run a whole bank of filters, at several orientations and sizes, and every pixel gets many numbers instead of one. We now have more numbers than the image had.",
  "(draft) So the question for today is which of these numbers to keep, and which to throw away."
]});
}
